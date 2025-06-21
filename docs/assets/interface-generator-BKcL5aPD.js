const e=`import ts from 'typescript'
import * as t from '.buck/types' // Import the types namespace for TS API generation target
import { mapTypes } from './typedef'
// import { mapTypes } from "./sync-types";

// --- Intermediate Schema Definition (Implicit) ---
// serializeSchema output: { colName: MappedTypeString | StructObject, ... }
// generateInterface input: { resourceKey: { tableName: { colName: MappedTypeString | StructObject, ... }, ... }, ... }
type MappedTypeString = string // e.g., "DVarchar", "DNumeric", "DArray", "DJson"
interface IntermediateStructObject {
    __type: 'struct'
    [fieldName: string]: IntermediateColumnValue // Allows nesting of any intermediate type
}
interface IntermediateJsonObject {
    __type: 'json'
    // Allow fields if defined using non-standard JSON(field: type, ...) syntax
    [fieldName: string]: IntermediateColumnValue
}
interface IntermediateArrayObject {
    __type: 'array'
    elementType: IntermediateColumnValue
}
type IntermediateColumnValue = MappedTypeString | IntermediateStructObject | IntermediateJsonObject | IntermediateArrayObject
type IntermediateTableSchema = Record<string, IntermediateColumnValue>

// --- Parsing Logic (Statement -> Intermediate Schema for ONE table) ---

/**
 * Parses the column definitions string (handles nesting).
 * Reusing the robust parser.
 */
function parseColumnsRaw(columnsString: string): Record<string, string> {
    const columns: Record<string, string> = {}
    let balance = 0
    let currentSegment = ''
    let segments: string[] = []
    let inQuotes = false

    for (let i = 0; i < columnsString.length; i++) {
        const char = columnsString[i]
        const prevChar = i > 0 ? columnsString[i - 1] : null
        if (char === '"' && prevChar !== '\\\\') inQuotes = !inQuotes
        currentSegment += char
        if (!inQuotes) {
            if (char === '(' || char === '[') balance++
            else if (char === ')' || char === ']') balance--
            else if (char === ',' && balance === 0) {
                segments.push(currentSegment.slice(0, -1).trim())
                currentSegment = ''
            }
        }
    }
    segments.push(currentSegment.trim())

    for (const segment of segments) {
        if (!segment) continue
        let name = '', type = '', i = 0
        if (segment.startsWith('"')) {
            let nameEndQuoteIndex = -1
            for (let j = 1; j < segment.length; j++) {
                if (segment[j] === '"' && segment[j - 1] !== '\\\\') {
                    nameEndQuoteIndex = j
                    break
                }
            }
            if (nameEndQuoteIndex !== -1) {
                name = segment.substring(0, nameEndQuoteIndex + 1)
                i = nameEndQuoteIndex + 1
            } else {
                console.warn(\`Malformed quoted name: "\${segment}"\`)
                name = segment
                type = 'UNKNOWN'
                columns[name] = type
                continue
            }
        } else {
            let firstSpaceIndex = -1
            for (let j = 0; j < segment.length; j++) {
                if (segment[j] === ' ' || segment[j] === '\\t') {
                    const potentialType = segment.substring(j + 1).trim()
                    if (potentialType.match(/^([A-Z_]+(\\(.*\\)|\\[\\])?|STRUCT\\(|JSON|LIST\\()/i) || potentialType.endsWith('[]')) {
                        firstSpaceIndex = j
                        break
                    }
                }
            }
            if (firstSpaceIndex !== -1) {
                name = segment.substring(0, firstSpaceIndex).trim()
                i = firstSpaceIndex
            } else {
                console.warn(\`No clear name/type split: "\${segment}"\`)
                if (!segment.match(/^([A-Z_]+(\\(.*\\)|\\[\\])?|STRUCT\\(|JSON|LIST\\()/i) && !segment.endsWith('[]')) {
                    name = segment
                    type = 'UNKNOWN'
                } else continue
            }
        }
        while (i < segment.length && (segment[i] === ' ' || segment[i] === '\\t')) i++
        type = segment.substring(i).trim()
        if (name && type && type !== 'UNKNOWN') columns[name] = type
        else if (name && type === 'UNKNOWN') columns[name] = type
    }
    return columns
}

/**
 * Parses a DuckDB type string into the intermediate format for serializeSchema.
 * Unwraps arrays, marks structs.
 */
function parseTypeToIntermediateValue(duckdbType: string): IntermediateColumnValue {
    let baseType = duckdbType.trim()
    let isArray = false

    // Handle arrays first
    if (baseType.endsWith('[]')) {
        isArray = true
        baseType = baseType.slice(0, -2).trim()
    } else if (baseType.toUpperCase().startsWith('LIST(') && baseType.endsWith(')')) {
        isArray = true
        baseType = baseType.slice(5, -1).trim()
    }

    // Get the intermediate representation of the base type (element type if it was an array)
    const elementIntermediateValue = parseBaseTypeToIntermediateValue(baseType)

    // If it was an array, wrap the element type representation
    if (isArray) {
        return { __type: 'array', elementType: elementIntermediateValue }
    } else {
        return elementIntermediateValue // Not an array, return the base type's representation
    }
}

/**
 * Parses the non-array base type string (e.g., "VARCHAR", "STRUCT(...)", "JSON")
 * into its intermediate representation. Helper for parseTypeToIntermediateValue.
 */
function parseBaseTypeToIntermediateValue(baseType: string): IntermediateColumnValue {
    // Now process the baseType
    const upperBaseType = baseType.toUpperCase()

    // Handle STRUCT -> generates nested object with __type marker
    if (upperBaseType.startsWith('STRUCT(') && baseType.endsWith(')')) {
        let openParenIndex = baseType.indexOf('(')
        if (openParenIndex !== -1) {
            let balance = 1, closeParenIndex = -1
            for (let i = openParenIndex + 1; i < baseType.length; i++) {
                if (baseType[i] === '(') balance++
                else if (baseType[i] === ')') balance--
                if (balance === 0) {
                    closeParenIndex = i
                    break
                }
            }
            if (closeParenIndex === baseType.length - 1) {
                const structFieldsString = baseType.substring(openParenIndex + 1, closeParenIndex).trim()
                const rawStructColumns = parseColumnsRaw(structFieldsString)
                const intermediateFields: IntermediateStructObject = { __type: 'struct' }
                for (const [name, type] of Object.entries(rawStructColumns)) {
                    const cleanName = name.replace(/^"(.*)"$/, '$1') // Clean name for key
                    intermediateFields[cleanName] = parseTypeToIntermediateValue(type) // Recursive call
                }
                return intermediateFields
            } else {
                console.warn(\`No matching parenthesis for STRUCT: \${baseType}\`)
                return mapTypes(baseType)
            }
        } else {
            console.warn(\`No opening parenthesis for STRUCT?: \${baseType}\`)
            return mapTypes(baseType)
        }
    } else if (upperBaseType === 'STRUCT') {
        console.warn(\`STRUCT keyword without parentheses: \${baseType}\`)
        return mapTypes(baseType)
    }

    // Handle JSON -> potentially with inline structure definition (non-standard)
    if (upperBaseType.startsWith('JSON(') && baseType.endsWith(')')) {
        let openParenIndex = baseType.indexOf('(')
        if (openParenIndex !== -1) {
            let balance = 1, closeParenIndex = -1
            for (let i = openParenIndex + 1; i < baseType.length; i++) {
                if (baseType[i] === '(') balance++
                else if (baseType[i] === ')') balance--
                if (balance === 0) {
                    closeParenIndex = i
                    break
                }
            }
            if (closeParenIndex === baseType.length - 1) {
                const jsonFieldsString = baseType.substring(openParenIndex + 1, closeParenIndex).trim()
                const rawJsonColumns = parseColumnsRaw(jsonFieldsString)
                const intermediateFields: IntermediateJsonObject = { __type: 'json' }
                for (const [name, type] of Object.entries(rawJsonColumns)) {
                    const cleanName = name.replace(/^"(.*)"$/, '$1') // Clean name for key
                    intermediateFields[cleanName] = parseTypeToIntermediateValue(type) // Recursive call
                }
                return intermediateFields
            } else {
                console.warn(\`No matching parenthesis for JSON(...): \${baseType}\`)
                return { __type: 'json' }
            } // Fallback
        } else {
            console.warn(\`No opening parenthesis for JSON(...): \${baseType}\`)
            return { __type: 'json' }
        } // Fallback
    } else if (upperBaseType === 'JSON') {
        // Standard JSON type without inline structure
        return { __type: 'json' }
    }

    // Otherwise, map the simple type string (e.g., "VARCHAR" -> "DVarchar")
    return mapTypes(baseType)
}

/**
 * STEP 1: Parses a CREATE TABLE statement into an intermediate schema object for that table.
 */
export function serializeSchema(createStatement: string): IntermediateTableSchema {
    const match = createStatement.match(
        /CREATE(?:\\s+OR\\s+REPLACE)?(?:\\s+TEMP(?:ORARY)?)?\\s+TABLE(?:\\s+IF\\s+NOT\\s+EXISTS)?\\s+([\`"']?[\\w\\s.-]+[\`"']?|\\w+)\\s*\\(([\\s\\S]*)\\)\\s*;?/is,
    )
    if (!match) throw new Error('Invalid or unsupported CREATE TABLE statement format')

    const columnsString = match[2]
    const schema: IntermediateTableSchema = {}

    if (columnsString.trim()) {
        const rawColumns = parseColumnsRaw(columnsString)
        for (const [name, type] of Object.entries(rawColumns)) {
            const cleanName = name.replace(/^"(.*)"$/, '$1') // Use cleaned name for key
            schema[cleanName] = parseTypeToIntermediateValue(type)
        }
    }
    return schema
}

/**
 * Input type for serializeDescribe, representing DESCRIBE output.
 */
export type DescribeOutputItem = {
    column_name: string
    column_type: string
    // Other describe columns like null, key, default, extra are ignored for interface generation
    [key: string]: any
}

/**
 * STEP 1 (Alternative): Parses DESCRIBE output array into an intermediate schema object.
 */
export function serializeDescribe(describeOutput: DescribeOutputItem[]): IntermediateTableSchema {
    const schema: IntermediateTableSchema = {}
    for (const column of describeOutput) {
        if (column.column_name && column.column_type) {
            // Use the existing parser for the type string
            schema[column.column_name] = parseTypeToIntermediateValue(column.column_type)
        } else {
            console.warn('Skipping describe item due to missing name or type:', column)
        }
    }
    return schema
}

// --- Generation Logic (Intermediate Schema -> TypeScript String using TS API) ---

/**
 * Creates a ts.TypeNode from an IntermediateColumnValue.
 * Handles simple types, structs, JSON, and arrays recursively.
 */
function createTypeNodeFromIntermediate(value: IntermediateColumnValue, key?: string): ts.TypeNode {
    if (typeof value === 'string') {
        // Simple mapped type string (e.g., "DVarchar")
        return ts.factory.createTypeReferenceNode(
            ts.factory.createQualifiedName(ts.factory.createIdentifier('t'), ts.factory.createIdentifier(\`\${value}Field\`)),
        )
    } else if (typeof value === 'object' && value !== null) {
        if (value.__type === 'struct' || value.__type === 'json') {
            const fieldTypeName = value.__type === 'struct' ? 'DStructField' : 'DJsonField'
            const fields = { ...value }
            // @ts-ignore
            delete fields.__type // Remove marker

            // Check if 'elementType' exists - it shouldn't for struct/json, indicates potential issue
            if ('elementType' in fields) {
                console.warn(\`Unexpected 'elementType' found in struct/json object for key: \${key ?? 'unknown'}\`, value)
                delete fields.elementType // Attempt to clean up
            }

            if (Object.keys(fields).length > 0) {
                // Struct or JSON with defined fields -> generate t.D<Type>Field<{...}>
                const nestedProperties = createPropertySignaturesRecursive(fields) // Use existing recursive func for properties
                const typeLiteral = ts.factory.createTypeLiteralNode(nestedProperties)
                return ts.factory.createTypeReferenceNode(
                    ts.factory.createQualifiedName(ts.factory.createIdentifier('t'), ts.factory.createIdentifier(fieldTypeName)),
                    [typeLiteral],
                )
            } else {
                // Only JSON can have no fields defined (standard JSON type)
                if (value.__type === 'json') {
                    return ts.factory.createTypeReferenceNode(
                        ts.factory.createQualifiedName(ts.factory.createIdentifier('t'), ts.factory.createIdentifier(fieldTypeName)),
                    )
                } else {
                    // Empty struct? Should not happen.
                    console.warn(\`Encountered struct-like object with no fields for key: \${key ?? 'unknown'}\`)
                    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                }
            }
        } else if (value.__type === 'array') {
            // Generate t.DArrayField<ElementType> by recursively calling this function for the element type
            const elementTypeNode = createTypeNodeFromIntermediate(value.elementType, key) // Recursive call for element type
            return ts.factory.createTypeReferenceNode(
                ts.factory.createQualifiedName(ts.factory.createIdentifier('t'), ts.factory.createIdentifier('DArrayField')),
                [elementTypeNode],
            )
        } else {
            // It's a table or resource level object (shouldn't happen here, handled by caller)
            // Or an intermediate object missing a __type marker
            console.warn(\`Unexpected object without __type marker or unknown __type at type generation level for key: \${key ?? 'unknown'}\`, value)
            return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
        }
    } else {
        // Fallback for null/undefined/etc.
        console.warn(\`Unexpected value type at type generation level for key: \${key ?? 'unknown'}\`, value)
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
    }
}

/**
 * Creates TS PropertySignatures from various levels of the input data.
 * Handles resource keys, table names, and column definitions.
 */
function createPropertySignaturesRecursive(obj: Record<string, any>): ts.PropertySignature[] {
    return Object.entries(obj).map(([key, value]) => {
        let typeNode: ts.TypeNode

        // Determine if 'value' represents a column type or a nested structure (table/resource)
        if (typeof value === 'string' || (typeof value === 'object' && value !== null && value.__type)) {
            // It's an IntermediateColumnValue (string or object with __type marker)
            // Generate the specific field type node using the helper
            typeNode = createTypeNodeFromIntermediate(value as IntermediateColumnValue, key)
        } else if (typeof value === 'object' && value !== null) {
            // It's a nested object (likely a table or resource level)
            // Create a TypeLiteral by recursively calling this function
            typeNode = ts.factory.createTypeLiteralNode(createPropertySignaturesRecursive(value))
        } else if (value === null) {
            // create Record<string, any>
            typeNode = ts.factory.createTypeReferenceNode('Record', [ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword), ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)])
        } else {
            // Fallback for unexpected types (null, undefined, etc.)
            console.warn(\`Unexpected value type in recursive generation for key: \${key}\`, value)
            typeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
        }

        // Use computed property name for all keys to match the target format .buck/models.ts
        const propertyName: ts.PropertyName = ts.factory.createComputedPropertyName(ts.factory.createStringLiteral(key))

        return ts.factory.createPropertySignature(undefined, propertyName, undefined, typeNode)
    })
}

/**
 * Creates the 'import * as t from "./types";' statement.
 */
function createImportStatement(moduleName: string): ts.ImportDeclaration {
    return ts.factory.createImportDeclaration(undefined, ts.factory.createImportClause(false, undefined, ts.factory.createNamespaceImport(ts.factory.createIdentifier('t'))), ts.factory.createStringLiteral(moduleName), undefined)
}

/**
 * STEP 2: Generates the Models interface string from a structure like .buck/models.json.
 */
export const generateInterface = (inputData: Record<string, Record<string, any>>) => {
    const importDeclaration = createImportStatement('./types') // Adjusted path

    // createPropertySignaturesRecursive now handles all levels correctly
    const modelProperties = createPropertySignaturesRecursive(inputData)

    const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        ts.factory.createIdentifier('Models'),
        undefined,
        undefined,
        modelProperties, // Use properties generated by the recursive function
    )

    const sourceFile = ts.factory.createSourceFile([importDeclaration, interfaceDeclaration], ts.factory.createToken(ts.SyntaxKind.EndOfFileToken), ts.NodeFlags.None)
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
    return printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile)
}

// --- Optional Main Execution Block ---
/*
if (import.meta.main) {
  const exampleStatement = \`CREATE TABLE invoices(id INT, items STRUCT(product_id INT, quantity INT)[], notes VARCHAR)\`;
  const intermediateSchema = serializeSchema(exampleStatement);
  console.log("Intermediate Schema:", JSON.stringify(intermediateSchema, null, 2));
  // Output: { id: 'DNumeric', items: { __type: 'struct', product_id: 'DNumeric', quantity: 'DNumeric' }, notes: 'DVarchar' }

  const modelsData = { "": { "invoices": intermediateSchema } };
  const finalTs = generateInterface(modelsData);
  console.log("\\nFinal TypeScript:\\n", finalTs);
  // Example for serializeDescribe
  const describeExample: DescribeOutputItem[] = [
    {"column_name":"activities","column_type":"VARCHAR[]", "null": "YES", "key": null, "default": null, "extra": null},
    {"column_name":"ownerCount","column_type":"BIGINT", "null": "YES", "key": null, "default": null, "extra": null},
    {"column_name":"owners","column_type":"STRUCT(roleEntreprise VARCHAR, typeDePersonne VARCHAR, representantId UUID, qualiteArtisan VARCHAR, \\"type\\" VARCHAR, dateDeNaissance VARCHAR, \\"role\\" VARCHAR, nom VARCHAR, prenoms VARCHAR[], genre VARCHAR, nationalite VARCHAR, codeNationalite VARCHAR, situationMatrimoniale VARCHAR, pays VARCHAR, codePays VARCHAR, codePostal VARCHAR, commune VARCHAR, codeInseeCommune VARCHAR, rolename VARCHAR, nomUsage VARCHAR, secondRoleEntreprise VARCHAR, libelleSecondRoleEntreprise VARCHAR, dateEffetRoleDeclarant DATE)[]", "null": "YES", "key": null, "default": null, "extra": null},
    {"column_name":"primarySiret","column_type":"VARCHAR", "null": "YES", "key": null, "default": null, "extra": null},
    {"column_name":"enseigne","column_type":"VARCHAR", "null": "YES", "key": null, "default": null, "extra": null}
  ];
  const intermediateSchemaFromDescribe = serializeDescribe(describeExample);
  console.log("\\nIntermediate Schema from Describe:", JSON.stringify(intermediateSchemaFromDescribe, null, 2));
  // Output should be similar structure to serializeSchema's output for equivalent types

  const modelsDataFromDescribe = { "": { "described_table": intermediateSchemaFromDescribe } };
  const finalTsFromDescribe = generateInterface(modelsDataFromDescribe);
  console.log("\\nFinal TypeScript from Describe:\\n", finalTsFromDescribe);


  // Original serializeSchema Output:
  // import * as t from "./types";
  // export interface Models {
  //     [""]: {
  //         ["invoices"]: {
  //             ["id"]: t.DNumericField;
  //             ["items"]: t.DStructField<{
  //                 product_id: t.DNumericField;
  //                 quantity: t.DNumericField;
  //             }>;
  //             ["notes"]: t.DVarcharField;
  //         };
  //     };
  // }
}
*/
`;export{e as default};
