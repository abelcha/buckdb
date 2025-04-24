import ts from "typescript";
import fs from "fs";
import path from "path";

// Input data structure
const inputData = {
  "root": {
    "data/test.csv": {
      "name": "DVarchar",
      "age": "DNumeric",
      "total": "DNumeric"
    },
    "data/people.parquet": {
      "name": "DVarchar",
      "age": "DNumeric",
      "total": "DNumeric"
    },
  }
};

// Helper function to create nested property signatures
function createPropertySignaturesFromObject(obj: Record<string, any>): ts.PropertySignature[] {
  return Object.entries(obj).map(([key, value]) => {
    let typeNode: ts.TypeNode;
    if (typeof value === 'string') {
      // Map string value to t.<Value>Field type
      typeNode = ts.factory.createTypeReferenceNode(
        ts.factory.createQualifiedName(
          ts.factory.createIdentifier("t"), // Alias 't'
          ts.factory.createIdentifier(`${value}Field`) // Type name like DVarcharField
        )
      );
    } else if (typeof value === 'object' && value !== null) {
      // Recursively create type literal for nested objects
      typeNode = ts.factory.createTypeLiteralNode(createPropertySignaturesFromObject(value));
    } else {
      // Handle other types if necessary, defaulting to 'any' for simplicity here
      typeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    }

    return ts.factory.createPropertySignature(
      undefined, // No modifiers
      ts.factory.createComputedPropertyName(ts.factory.createStringLiteral(key)), // Use computed property name for keys like "data/test.csv"
      undefined, // No question token
      typeNode // The determined type node
    );
  });
}

// 1. Create the import statement: import * as t from "./types.ts";
function createImportStatement(moduleName: string): ts.ImportDeclaration {
  return ts.factory.createImportDeclaration(
    undefined, // decorators (not needed)
    ts.factory.createImportClause(
      false, // isTypeOnly
      undefined, // namedBindings (not needed for namespace import)
      ts.factory.createNamespaceImport(ts.factory.createIdentifier('t')) // * as t
    ),
    ts.factory.createStringLiteral(moduleName), // module specifier, e.g., 'module'
    undefined // assertClause (not needed)
  );
}

export const generateInterface = (inputData: Record<string, Record<string, any>>) => {

  const importDeclaration = createImportStatement("./types.ts");

  // 2. Create the interface declaration: export interface Models { ... }
  const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
    // undefined, // decorators - Removing this based on TS error "Expected 5 arguments, but got 6"
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)], // modifiers: export
    ts.factory.createIdentifier("Models"), // interface name
    undefined, // type parameters
    undefined, // heritage clauses
    createPropertySignaturesFromObject(inputData) // members from input data
  );
  // 3. Create a source file containing the nodes
  const sourceFile = ts.factory.createSourceFile(
    [importDeclaration, interfaceDeclaration], // Statements
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken), // EndOfFile token
    ts.NodeFlags.None // Flags
  );

  // 4. Create a printer
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // 5. Print the source file node to a string
  return printer.printNode(
    ts.EmitHint.Unspecified, // Hint
    sourceFile, // Node to print
    sourceFile // Pass the source file itself again for context
  );
}

if (import.meta.main) {
  // Example usage
  const resultCode = generateInterface(inputData);
  console.log(resultCode);
}

// // 6. Write the result to a file
// const outputPath = path.join(__dirname, "generated.ts");
// // Assumption: A file named t.ts exists in the same directory and exports the necessary *Field types (e.g., DVarcharField).
// fs.writeFileSync(outputPath, resultCode);

// console.log(`Successfully generated ${outputPath} with Models interface.`);
