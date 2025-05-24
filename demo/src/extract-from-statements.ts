import * as ts from 'typescript'

// Helper function to find the relevant initializer text (potentially recursively)
export function findVariableInitializerText(
    identifier: ts.Identifier,
    sourceFile: ts.SourceFile,
    visitedIdentifiers: Set<string> = new Set(), // To prevent infinite recursion
): string | null {
    const identifierName = identifier.text

    if (visitedIdentifiers.has(identifierName)) {
        return null
    }
    visitedIdentifiers.add(identifierName)

    let scope: ts.Node | undefined = identifier
    while (scope) {
        if (ts.isBlock(scope) || ts.isSourceFile(scope) || ts.isModuleBlock(scope)) {
            const statements = scope.statements
            const declarations = statements?.filter(ts.isVariableStatement)
                .flatMap(stmt => stmt.declarationList.declarations) ?? []

            for (const declaration of declarations) {
                if (ts.isIdentifier(declaration.name) && declaration.name.text === identifierName && declaration.initializer) {
                    const initializer = declaration.initializer
                    const initializerText = initializer.getText(sourceFile)

                    if (ts.isCallExpression(initializer) && ts.isIdentifier(initializer.expression) && initializer.expression.text === 'Buck') {
                        return initializerText
                    } else if (ts.isIdentifier(initializer)) {
                        const recursiveResult = findVariableInitializerText(initializer, sourceFile, new Set(visitedIdentifiers))
                        if (recursiveResult) {
                            return recursiveResult
                        }
                    }
                    return null
                }
            }
        }
        scope = scope.parent
        if (!scope) break
    }
    return null
}

export interface FromStatementParts {
    chain: string | null
    param: string
    resource: string | null
    fromChain: string
    cleanFromChain: string
    lineStart: number
    lineEnd: number
}

export interface BuckStatementParts {
    resource: string | null
    options: Record<string, any> | null
    fullCall: string
    lineStart: number
    lineEnd: number
}

function getUnquotedText(node: ts.Node, sourceFile: ts.SourceFile): string {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        return node.text
    }
    return node.getText(sourceFile).trim()
}

function evaluateLiteralNode(node: ts.Expression, sourceFile: ts.SourceFile): any {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
    if (ts.isNumericLiteral(node)) return parseFloat(node.text)
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false
    if (node.kind === ts.SyntaxKind.NullKeyword) return null
    if (ts.isObjectLiteralExpression(node)) return evaluateObjectLiteral(node, sourceFile)
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(element => evaluateLiteralNode(element, sourceFile))
    console.warn(`Unsupported node type in literal evaluation: ${ts.SyntaxKind[node.kind]}`)
    return undefined
}

function evaluateObjectLiteral(node: ts.ObjectLiteralExpression, sourceFile: ts.SourceFile): Record<string, any> | null {
    const obj: Record<string, any> = {}
    let success = true
    node.properties.forEach(prop => {
        if (ts.isPropertyAssignment(prop)) {
            let propName: string | null = ts.isIdentifier(prop.name) ? prop.name.text : (ts.isStringLiteral(prop.name) ? prop.name.text : null)
            if (propName) {
                const value = evaluateLiteralNode(prop.initializer, sourceFile)
                if (value !== undefined) obj[propName] = value
                else success = false
            } else {
                console.warn(`Unsupported property name type: ${ts.SyntaxKind[prop.name.kind]}`)
                success = false
            }
        } else if (ts.isShorthandPropertyAssignment(prop)) {
            console.warn(`Shorthand property assignment '${prop.name.text}' is not supported for static evaluation.`)
            success = false
        } else {
            console.warn(`Unsupported property type: ${ts.SyntaxKind[prop.kind]}`)
            success = false
        }
    })
    return success ? obj : null
}

interface BuckFromDefinition {
    identifierName: string
    buckInitializerText: string | null // Text like "Buck(':memory:')" or "someOtherBuckVar.settings(...)"
    fromParameterText: string // Text like "'duckdb_functions()'" (raw, quoted)
    fromParameterUnquoted: string // Text like "duckdb_functions()" (unquoted)
    buckResource: string | null // Text like ":memory:" (unquoted)
    originalFromCallSiteNode: ts.CallExpression // The .from() call node in the definition
    isUsedInExecutableChain: boolean // Flag to track if this definition was used
}

export function extractFromStatementsAST(text: string): FromStatementParts[] {
    const sourceFile = ts.createSourceFile('tempFile.ts', text, ts.ScriptTarget.Latest, true)
    const fromStatements: FromStatementParts[] = []
    const buckFromDefinitions = new Map<string, BuckFromDefinition>()

    // --- Pass 1: Collect Buck(...).from(...) definitions ---
    function collectDefinitions(node: ts.Node) {
        if (ts.isVariableDeclaration(node) && node.initializer) {
            let currentInitializer = node.initializer
            if (
                ts.isCallExpression(currentInitializer)
                && ts.isPropertyAccessExpression(currentInitializer.expression)
                && (currentInitializer.expression as ts.PropertyAccessExpression).name.text === 'from'
                && currentInitializer.arguments.length > 0
            ) {
                const fromCallNode = currentInitializer // This is the .from(...) CallExpression
                const expressionBeforeFrom = (fromCallNode.expression as ts.PropertyAccessExpression).expression // The part before .from, e.g., Buck('') or someVar
                const fromParameterNode = fromCallNode.arguments[0]
                const fromParameterUnquoted = getUnquotedText(fromParameterNode, sourceFile)
                let buckResource: string | null = null
                let buckInitializerText: string | null = expressionBeforeFrom.getText(sourceFile) // Default to its text

                let ultimateBuckCallText: string | null = null
                if (ts.isCallExpression(expressionBeforeFrom) && ts.isIdentifier(expressionBeforeFrom.expression) && expressionBeforeFrom.expression.text === 'Buck') {
                    ultimateBuckCallText = expressionBeforeFrom.getText(sourceFile) // It's directly Buck().from()
                } else if (ts.isIdentifier(expressionBeforeFrom)) { // It's someVar.from(), try to find someVar's Buck() initializer
                    ultimateBuckCallText = findVariableInitializerText(expressionBeforeFrom, sourceFile)
                }
                // If expressionBeforeFrom is more complex (e.g. anotherVar.settings().from()), ultimateBuckCallText might remain null or be the var

                if (ultimateBuckCallText && ultimateBuckCallText.startsWith('Buck(')) {
                    const tempSource = ts.createSourceFile('tempBuck.ts', ultimateBuckCallText, ts.ScriptTarget.Latest, true)
                    ts.forEachChild(tempSource, n => {
                        let buckNodeToParse: ts.CallExpression | null = null
                        if (ts.isExpressionStatement(n) && ts.isCallExpression(n.expression)) buckNodeToParse = n.expression
                        else if (ts.isCallExpression(n)) buckNodeToParse = n

                        if (buckNodeToParse && ts.isIdentifier(buckNodeToParse.expression) && buckNodeToParse.expression.text === 'Buck' && buckNodeToParse.arguments.length > 0) {
                            if (!ts.isObjectLiteralExpression(buckNodeToParse.arguments[0])) {
                                buckResource = getUnquotedText(buckNodeToParse.arguments[0], tempSource)
                            }
                        }
                    })
                    buckInitializerText = ultimateBuckCallText // Update initializer to the resolved Buck() call
                } else if (!ultimateBuckCallText && ts.isIdentifier(expressionBeforeFrom)) {
                    // It's someVar.from() but someVar is not initialized by Buck()
                    // buckInitializerText remains someVar.getText()
                    buckResource = null
                }

                if (ts.isIdentifier(node.name)) {
                    buckFromDefinitions.set(node.name.text, {
                        identifierName: node.name.text,
                        buckInitializerText,
                        fromParameterText: fromParameterNode.getText(sourceFile),
                        fromParameterUnquoted,
                        buckResource,
                        originalFromCallSiteNode: fromCallNode,
                        isUsedInExecutableChain: false,
                    })
                }
            }
        }
        ts.forEachChild(node, collectDefinitions)
    }
    collectDefinitions(sourceFile)

    const processedStatementNodes = new Set<ts.Node>() // Tracks statement nodes (e.g. ExpressionStatement)

    // --- Pass 2: Extract executable chains ---
    function visitExecutableChains(node: ts.Node) {
        if (processedStatementNodes.has(node)) return

        let executableChainNode: ts.CallExpression | null = null
        let currentStatementNode: ts.Node = node // The node that will be marked as processed

        // We are interested in top-level expression statements that are call expressions
        if (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression)) {
            executableChainNode = node.expression
            // currentStatementNode is already 'node' (the ExpressionStatement)
        } else if (ts.isCallExpression(node)) { // If node itself is a CallExpression
            // This handles cases like `return from().select()` or `const x = from().select()`
            // We need to ensure this 'node' is the outermost call in its statement.
            let parent = node.parent
            let isOutermost = true
            while (parent && !ts.isBlock(parent) && !ts.isSourceFile(parent)) {
                if (ts.isCallExpression(parent) && parent.expression !== node && parent.arguments.includes(node as ts.Expression)) {
                    isOutermost = false
                    break
                }
                if (ts.isPropertyAccessExpression(parent) && parent.expression === node) {
                    isOutermost = false
                    break
                }
                if (ts.isExpressionStatement(parent) || ts.isVariableDeclaration(parent) || ts.isReturnStatement(parent)) break
                parent = parent.parent
            }
            if (isOutermost && ts.isCallExpression(node)) { // Re-check ts.isCallExpression here for the compiler
                executableChainNode = node
            }
            // currentStatementNode is 'node' (the CallExpression) by default.
            // The following loop will try to find a more encompassing statement.
            let stmtParentSearch: ts.Node | undefined = node.parent // Start search from parent
            while (stmtParentSearch && !ts.isBlock(stmtParentSearch) && !ts.isSourceFile(stmtParentSearch)) {
                if (ts.isExpressionStatement(stmtParentSearch) || ts.isVariableStatement(stmtParentSearch) || ts.isReturnStatement(stmtParentSearch)) {
                    currentStatementNode = stmtParentSearch // Found a larger statement
                    break
                }
                stmtParentSearch = stmtParentSearch.parent
            }
            // If no larger statement was found, currentStatementNode remains 'node' (the CallExpression itself)
        }
        // After this, currentStatementNode is set. Check if it was processed.
        // Note: if node was not an ExpressionStatement or a CallExpression, executableChainNode is null.
        if (processedStatementNodes.has(currentStatementNode)) return

        if (executableChainNode) {
            let baseIdentifierOfChain: ts.Identifier | null = null
            let currentExprForTrace: ts.Expression = executableChainNode.expression
            while (true) {
                if (ts.isCallExpression(currentExprForTrace)) {
                    currentExprForTrace = currentExprForTrace.expression
                } else if (ts.isPropertyAccessExpression(currentExprForTrace)) {
                    currentExprForTrace = currentExprForTrace.expression
                } else {
                    break // No longer a Call or PAE, so we stop.
                }
            }
            // After the loop, currentExprForTrace is the base of the chain.
            if (ts.isIdentifier(currentExprForTrace)) {
                baseIdentifierOfChain = currentExprForTrace
            }

            // Case 1: Chain is based on a collected definition (e.g., g.select().execute())
            if (baseIdentifierOfChain && buckFromDefinitions.has(baseIdentifierOfChain.text)) {
                const definition = buckFromDefinitions.get(baseIdentifierOfChain.text)!
                definition.isUsedInExecutableChain = true // Mark definition as used

                const chainPart = definition.buckInitializerText
                const paramPart = definition.fromParameterUnquoted
                const resourcePart = definition.buckResource

                const fullChainText = executableChainNode.getText(sourceFile)
                const identifierEndPosInChain = baseIdentifierOfChain.getEnd() - executableChainNode.getStart(sourceFile)
                const actualChainSuffix = fullChainText.substring(identifierEndPosInChain).trim() // e.g. ".select().execute()"

                const fromChainPart = `from(${definition.fromParameterText})${actualChainSuffix.startsWith('.') ? '' : '.'}${actualChainSuffix}`

                let cleanFromChainPart = fromChainPart
                const trailingMethodsToRemove = ['.execute()', '.show()', '.toSql()']
                for (const method of trailingMethodsToRemove) {
                    while (cleanFromChainPart.endsWith(method)) cleanFromChainPart = cleanFromChainPart.substring(0, cleanFromChainPart.length - method.length).trim()
                }
                cleanFromChainPart = cleanFromChainPart.replace(/(?:^|\s+)\/\/.*$/gm, '').trim().replace(/\s*\.\s*/g, '.').replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim()

                const lineStart = sourceFile.getLineAndCharacterOfPosition(executableChainNode.getStart(sourceFile)).line + 1
                const lineEnd = sourceFile.getLineAndCharacterOfPosition(executableChainNode.getEnd()).line + 1

                fromStatements.push({ chain: chainPart, param: paramPart, resource: resourcePart, fromChain: fromChainPart, cleanFromChain: cleanFromChainPart, lineStart, lineEnd })
                processedStatementNodes.add(currentStatementNode)
                return // Processed this chain
            } // Case 2: Direct from() or someOtherVar.from() that is an executable statement itself
            // This case handles chains not starting with a variable found in buckFromDefinitions.
            else { // Not based on a known definition, or baseIdentifierOfChain is null
                let fromCallTargetNode: ts.CallExpression | null = null
                let expressionLeadingToFrom: ts.Expression | null = null

                // Trace down executableChainNode to find the core 'from' call
                let tracer: ts.Expression = executableChainNode
                while (true) {
                    if (ts.isCallExpression(tracer)) {
                        if (ts.isIdentifier(tracer.expression) && tracer.expression.text === 'from') {
                            fromCallTargetNode = tracer
                            expressionLeadingToFrom = null
                            break
                        }
                        if (ts.isPropertyAccessExpression(tracer.expression) && tracer.expression.name.text === 'from') {
                            fromCallTargetNode = tracer
                            expressionLeadingToFrom = tracer.expression.expression
                            break
                        }
                        // If it's a call but not 'from', continue with its expression part
                        if (ts.isCallExpression(tracer.expression) || ts.isPropertyAccessExpression(tracer.expression)) {
                            tracer = tracer.expression
                            continue
                        }
                    } else if (ts.isPropertyAccessExpression(tracer)) {
                        // If we have a PAE, its expression might be a call or another PAE
                        if (ts.isCallExpression(tracer.expression) || ts.isPropertyAccessExpression(tracer.expression)) {
                            tracer = tracer.expression
                            continue
                        }
                    }
                    break // Cannot trace further or not a structure we are looking for
                }

                if (fromCallTargetNode && fromCallTargetNode.arguments.length > 0) {
                    const paramPart = getUnquotedText(fromCallTargetNode.arguments[0], sourceFile)
                    let chainPart: string | null = null
                    let resourcePart: string | null = null

                    if (expressionLeadingToFrom) { // e.g., buckCon.settings({ endpoint: 'xxx' })
                        const originalLeadingText = expressionLeadingToFrom.getText(sourceFile)
                        chainPart = originalLeadingText // Default

                        // Trace to the base identifier of expressionLeadingToFrom
                        let baseOfLeadingExpr: ts.Expression = expressionLeadingToFrom
                        while (ts.isPropertyAccessExpression(baseOfLeadingExpr) || ts.isCallExpression(baseOfLeadingExpr)) {
                            baseOfLeadingExpr = ts.isCallExpression(baseOfLeadingExpr) ? baseOfLeadingExpr.expression : baseOfLeadingExpr.expression
                        }

                        if (ts.isIdentifier(baseOfLeadingExpr)) { // e.g., baseOfLeadingExpr is 'buckCon'
                            const buckInitializer = findVariableInitializerText(baseOfLeadingExpr, sourceFile) // e.g., "Buck(':memory:')"
                            if (buckInitializer && buckInitializer.startsWith('Buck(')) {
                                // Replace the base identifier part of originalLeadingText with buckInitializer
                                chainPart = originalLeadingText.replace(baseOfLeadingExpr.getText(sourceFile), buckInitializer)

                                const tempSourceBuck = ts.createSourceFile('tempBuck.ts', buckInitializer, ts.ScriptTarget.Latest, true)
                                ts.forEachChild(tempSourceBuck, n => {
                                    let bn: ts.CallExpression | null = null
                                    if (ts.isExpressionStatement(n) && ts.isCallExpression(n.expression)) bn = n.expression
                                    else if (ts.isCallExpression(n)) bn = n
                                    if (bn && ts.isIdentifier(bn.expression) && bn.expression.text === 'Buck' && bn.arguments.length > 0 && !ts.isObjectLiteralExpression(bn.arguments[0])) {
                                        resourcePart = getUnquotedText(bn.arguments[0], tempSourceBuck)
                                    }
                                })
                            }
                        }
                    }

                    // Construct fromChainPart starting from the 'from' keyword
                    let actualFromChainText: string
                    if (ts.isPropertyAccessExpression(fromCallTargetNode.expression)) { // something.from()
                        const fromKeywordNode = fromCallTargetNode.expression.name // This is the 'from' identifier in '.from'
                        actualFromChainText = sourceFile.text.substring(fromKeywordNode.getStart(sourceFile), executableChainNode.getEnd())
                    } else { // direct from()
                        actualFromChainText = executableChainNode.getText(sourceFile)
                    }

                    let cleanFromChainPart = actualFromChainText
                    const trailingMethodsToRemove = ['.execute()', '.show()', '.toSql()']
                    for (const method of trailingMethodsToRemove) {
                        while (cleanFromChainPart.endsWith(method)) cleanFromChainPart = cleanFromChainPart.substring(0, cleanFromChainPart.length - method.length).trim()
                    }
                    cleanFromChainPart = cleanFromChainPart.replace(/(?:^|\s+)\/\/.*$/gm, '').trim().replace(/\s*\.\s*/g, '.').replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim()

                    const lineStart = sourceFile.getLineAndCharacterOfPosition(executableChainNode.getStart(sourceFile)).line + 1
                    const lineEnd = sourceFile.getLineAndCharacterOfPosition(executableChainNode.getEnd()).line + 1

                    fromStatements.push({ chain: chainPart, param: paramPart, resource: resourcePart, fromChain: actualFromChainText, cleanFromChain: cleanFromChainPart, lineStart, lineEnd })
                    processedStatementNodes.add(currentStatementNode)
                    return // Processed
                }
            }
        }
        ts.forEachChild(node, visitExecutableChains)
    }
    visitExecutableChains(sourceFile)

    // Pass 3: Add definitions that were not used in any executable chain
    // These are like `const x = Buck().from('file');` where x is never used.
    buckFromDefinitions.forEach(def => {
        if (!def.isUsedInExecutableChain) {
            const fromCallNode = def.originalFromCallSiteNode // The .from() call in the definition
            // Find the full statement for this definition
            let stmtNode: ts.Node = fromCallNode
            while (stmtNode.parent && !ts.isBlock(stmtNode.parent) && !ts.isSourceFile(stmtNode.parent)) {
                if (ts.isVariableStatement(stmtNode.parent) || ts.isExpressionStatement(stmtNode.parent)) {
                    stmtNode = stmtNode.parent // stmtNode is now the VariableStatement or ExpressionStatement
                    break
                }
                stmtNode = stmtNode.parent
            }
            // Only add if this definition was NOT used to form an executable chain.
            // The processedStatementNodes.has(stmtNode) check was removed as it's not the primary gate.
            // The primary gate is def.isUsedInExecutableChain.

            const chainPart = def.buckInitializerText
            const paramPart = def.fromParameterUnquoted
            const resourcePart = def.buckResource
            // fromChain is just the .from(...) part of the definition
            const fromChainPart = fromCallNode.getText(sourceFile)

            let cleanFromChainPart = fromChainPart
            // If fromChainPart is just "from('param')", clean version is the same.
            // If it's "Buck().from('param').select()", then clean it.
            // The originalFromCallSiteNode is the .from() call. If it's part of a longer chain in the definition itself,
            // we need to get the text of that longer chain.
            // For `const g = Buck().from().select()`, originalFromCallSiteNode is `.from()`.
            // We need the full `Buck().from().select()` for fromChainPart.
            // The `fromCallNode.getText()` might be too short if the definition itself is chained.
            // Let's assume `def.originalFromCallSiteNode` is the outermost call in the initializer if chained.
            // This needs to be ensured by `collectDefinitions`.
            // Revisit: `currentInitializer` in `collectDefinitions` is the full initializer.
            // If `currentInitializer` is `Buck().from().select()`, then `fromCallNode` is `.from()`.
            // This means `fromChainPart` for unused defs needs to be the full initializer text if it's a from chain.

            // Let's assume the `fromCallNode` is the specific `.from()` call.
            // The `fromChain` for an unused definition should be the chain starting from `from`.
            // If `const g = Buck().settings().from('file')`, then `fromChain` is `from('file')`.
            // `chain` is `Buck().settings()`.
            // This seems correct with current def.

            const fromChainTextForUnusedDef = `from(${def.fromParameterText})` // Simplest form
            cleanFromChainPart = fromChainTextForUnusedDef // No .execute() etc. on simple def

            const lineStart = sourceFile.getLineAndCharacterOfPosition((fromCallNode.expression as ts.PropertyAccessExpression).name.getStart(sourceFile)).line + 1 // Start of 'from'
            const lineEnd = sourceFile.getLineAndCharacterOfPosition(fromCallNode.getEnd()).line + 1 // End of from(...) call

            fromStatements.push({ chain: chainPart, param: paramPart, resource: resourcePart, fromChain: fromChainTextForUnusedDef, cleanFromChain: cleanFromChainPart, lineStart, lineEnd })
            processedStatementNodes.add(stmtNode)
        }
    })

    // Sort by lineStart for consistent output, important for tests
    fromStatements.sort((a, b) => a.lineStart - b.lineStart || a.fromChain.localeCompare(b.fromChain))

    return fromStatements
}

// Function to extract 'Buck' statements using TypeScript AST
export function extractBuckStatement(text: string): BuckStatementParts[] {
    const sourceFile = ts.createSourceFile('tempFile.ts', text, ts.ScriptTarget.Latest, true)
    const buckStatements: BuckStatementParts[] = []
    const processedCalls = new Set<number>()

    function visit(node: ts.Node) {
        if (ts.isCallExpression(node)) {
            const expression = node.expression
            if (ts.isIdentifier(expression) && expression.text === 'Buck') {
                const callStartPos = node.getStart(sourceFile)
                if (processedCalls.has(callStartPos)) return

                let resource: string | null = null
                let options: Record<string, any> | null = null

                if (node.arguments.length > 0) {
                    const arg0 = node.arguments[0]
                    if (ts.isObjectLiteralExpression(arg0)) {
                        options = evaluateObjectLiteral(arg0, sourceFile)
                    } else if (ts.isStringLiteral(arg0) || ts.isNoSubstitutionTemplateLiteral(arg0)) {
                        resource = getUnquotedText(arg0, sourceFile)
                        if (node.arguments.length > 1) {
                            const arg1 = node.arguments[1]
                            if (ts.isObjectLiteralExpression(arg1)) {
                                options = evaluateObjectLiteral(arg1, sourceFile)
                            }
                        }
                    }
                }
                const fullCall = node.getText(sourceFile)
                const lineStart = sourceFile.getLineAndCharacterOfPosition(callStartPos).line + 1
                const lineEnd = sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line + 1
                buckStatements.push({ resource, options, fullCall, lineStart, lineEnd })
                processedCalls.add(callStartPos)
            }
        }
        ts.forEachChild(node, visit)
    }
    visit(sourceFile)
    return buckStatements
}
