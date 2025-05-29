import * as ts from 'typescript'

const getParents = function* (node: ts.Node): Generator<ts.Node> {
    let current = node.parent
    while (current) {
        yield current
        current = current.parent
    }
}

const pipe = <T>(...fns: Array<(x: T) => T>) => (value: T): T => fns.reduce((acc, fn) => fn(acc), value)

const removeTrailingMethods = (methods: string[]) => (text: string): string =>
    methods.reduce((acc, method) => {
        while (acc.endsWith(method)) acc = acc.substring(0, acc.length - method.length).trim()
        return acc
    }, text)

const normalizeSpacing = (text: string): string =>
    text.replace(/(?:^|\s+)\/\/.*$/gm, '').trim().replace(/\s*\.\s*/g, '.').replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim()

export function findVariableInitializerText(identifier: ts.Identifier, sourceFile: ts.SourceFile, visitedIdentifiers = new Set<string>()): string | null {
    const name = identifier.text
    if (visitedIdentifiers.has(name)) return null
    visitedIdentifiers.add(name)

    const scope = Array.from(getParents(identifier)).find(p => ts.isBlock(p) || ts.isSourceFile(p) || ts.isModuleBlock(p))
    if (!scope || !('statements' in scope)) return null

    const declaration = scope.statements?.filter(ts.isVariableStatement)
        .flatMap(stmt => stmt.declarationList.declarations)
        .find(decl => ts.isIdentifier(decl.name) && decl.name.text === name && decl.initializer)

    if (!declaration?.initializer) return null
    
    const init = declaration.initializer
    if (ts.isCallExpression(init) && ts.isIdentifier(init.expression) && init.expression.text === 'Buck') {
        return init.getText(sourceFile)
    }
    if (ts.isIdentifier(init)) {
        return findVariableInitializerText(init, sourceFile, new Set(visitedIdentifiers))
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

const getUnquotedText = (node: ts.Node, sourceFile: ts.SourceFile): string =>
    ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) ? node.text : node.getText(sourceFile).trim()

const evaluateLiteralNode = (node: ts.Expression, sourceFile: ts.SourceFile): any => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
    if (ts.isNumericLiteral(node)) return parseFloat(node.text)
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false
    if (node.kind === ts.SyntaxKind.NullKeyword) return null
    if (ts.isObjectLiteralExpression(node)) return evaluateObjectLiteral(node, sourceFile)
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(el => evaluateLiteralNode(el, sourceFile))
    return undefined
}

const evaluateObjectLiteral = (node: ts.ObjectLiteralExpression, sourceFile: ts.SourceFile): Record<string, any> | null => {
    const props = node.properties.filter(ts.isPropertyAssignment)
    if (props.length !== node.properties.length) return null
    
    const entries = props.map(prop => {
        const propName = ts.isIdentifier(prop.name) ? prop.name.text : ts.isStringLiteral(prop.name) ? prop.name.text : null
        if (!propName) return null
        const value = evaluateLiteralNode(prop.initializer, sourceFile)
        return value === undefined ? null : [propName, value] as const
    })
    
    return entries.every(e => e !== null) ? Object.fromEntries(entries) : null
}

interface BuckFromDefinition {
    identifierName: string
    buckInitializerText: string | null
    fromParameterText: string
    fromParameterUnquoted: string
    buckResource: string | null
    originalFromCallSiteNode: ts.CallExpression
    isUsedInExecutableChain: boolean
}

export function extractFromStatementsAST(text: string): FromStatementParts[] {
    const sourceFile = ts.createSourceFile('tempFile.ts', text, ts.ScriptTarget.Latest, true)
    const fromStatements: FromStatementParts[] = []
    const buckFromDefinitions = new Map<string, BuckFromDefinition>()

    function collectDefinitions(node: ts.Node) {
        if (ts.isVariableDeclaration(node) && node.initializer && ts.isCallExpression(node.initializer) && ts.isPropertyAccessExpression(node.initializer.expression) && node.initializer.expression.name.text === 'from' && node.initializer.arguments.length > 0) {
            const fromCallNode = node.initializer
            const propAccess = fromCallNode.expression as ts.PropertyAccessExpression
            const expressionBeforeFrom = propAccess.expression
            const fromParameterNode = fromCallNode.arguments[0]!
            const fromParameterUnquoted = getUnquotedText(fromParameterNode, sourceFile)
            let buckResource: string | null = null
            let buckInitializerText: string | null = expressionBeforeFrom.getText(sourceFile)

            let ultimateBuckCallText: string | null = null
            if (ts.isCallExpression(expressionBeforeFrom) && ts.isIdentifier(expressionBeforeFrom.expression) && expressionBeforeFrom.expression.text === 'Buck') {
                ultimateBuckCallText = expressionBeforeFrom.getText(sourceFile);
            } else if (ts.isIdentifier(expressionBeforeFrom)) {
                ultimateBuckCallText = findVariableInitializerText(expressionBeforeFrom, sourceFile);
            } else if (ts.isPropertyAccessExpression(expressionBeforeFrom) || ts.isCallExpression(expressionBeforeFrom)) {
                let currentToBase: ts.Expression = expressionBeforeFrom;
                // Traverse down to the base of the chain (e.g., the Buck() call or an identifier)
                while (ts.isPropertyAccessExpression(currentToBase) || ts.isCallExpression(currentToBase)) {
                    currentToBase = currentToBase.expression;
                }
                // Check if the base is a Buck() call
                if (ts.isCallExpression(currentToBase) && ts.isIdentifier(currentToBase.expression) && currentToBase.expression.text === 'Buck') {
                    ultimateBuckCallText = currentToBase.getText(sourceFile);
                } else if (ts.isIdentifier(currentToBase)) { // Check if the base is an identifier that might resolve to Buck()
                    ultimateBuckCallText = findVariableInitializerText(currentToBase, sourceFile);
                }
            }

            if (ultimateBuckCallText?.startsWith('Buck(')) {
                const tempSource = ts.createSourceFile('tempBuck.ts', ultimateBuckCallText, ts.ScriptTarget.Latest, true);
                ts.forEachChild(tempSource, n => {
                    const buckNode = ts.isExpressionStatement(n) && ts.isCallExpression(n.expression) ? n.expression : ts.isCallExpression(n) ? n : null;
                    if (buckNode && ts.isIdentifier(buckNode.expression) && buckNode.expression.text === 'Buck') {
                        if (buckNode.arguments.length > 0) {
                            const firstArg = buckNode.arguments[0];
                            // Ensure it's a string or template literal, not an object for resource
                            if (ts.isStringLiteral(firstArg) || ts.isNoSubstitutionTemplateLiteral(firstArg)) {
                                buckResource = firstArg.text; // Direct assignment of .text
                            }
                            // If firstArg is an object or other non-string type, buckResource remains null (or its previous value if any)
                        } else {
                            // Buck() called with no arguments, resource is explicitly null
                            buckResource = null;
                        }
                    }
                });
                buckInitializerText = ultimateBuckCallText; // Correct: chain starts with the Buck call
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
        ts.forEachChild(node, collectDefinitions)
    }
    collectDefinitions(sourceFile)

    const processedStatementNodes = new Set<ts.Node>()

    function visitExecutableChains(node: ts.Node) {
        if (processedStatementNodes.has(node)) return

        let executableChainNode: ts.CallExpression | null = null
        let currentStatementNode: ts.Node = node

        if (ts.isExpressionStatement(node) && ts.isCallExpression(node.expression)) {
            executableChainNode = node.expression
        } else if (ts.isCallExpression(node)) {
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
            if (isOutermost) executableChainNode = node

            let stmtParentSearch: ts.Node | undefined = node.parent
            while (stmtParentSearch && !ts.isBlock(stmtParentSearch) && !ts.isSourceFile(stmtParentSearch)) {
                if (ts.isExpressionStatement(stmtParentSearch) || ts.isVariableStatement(stmtParentSearch) || ts.isReturnStatement(stmtParentSearch)) {
                    currentStatementNode = stmtParentSearch
                    break
                }
                stmtParentSearch = stmtParentSearch.parent
            }
        }

        if (processedStatementNodes.has(currentStatementNode)) return

        if (executableChainNode) {
            let baseIdentifierOfChain: ts.Identifier | null = null
            let currentExprForTrace: ts.Expression = executableChainNode.expression
            while (ts.isCallExpression(currentExprForTrace) || ts.isPropertyAccessExpression(currentExprForTrace)) {
                currentExprForTrace = currentExprForTrace.expression
            }
            if (ts.isIdentifier(currentExprForTrace)) {
                baseIdentifierOfChain = currentExprForTrace
            }

            if (baseIdentifierOfChain && buckFromDefinitions.has(baseIdentifierOfChain.text)) {
                const definition = buckFromDefinitions.get(baseIdentifierOfChain.text)!
                definition.isUsedInExecutableChain = true

                const chainPart = definition.buckInitializerText
                const paramPart = definition.fromParameterUnquoted
                const resourcePart = definition.buckResource
                const fullChainText = executableChainNode.getText(sourceFile)
                const identifierEndPosInChain = baseIdentifierOfChain.getEnd() - executableChainNode.getStart(sourceFile)
                const actualChainSuffix = fullChainText.substring(identifierEndPosInChain).trim()
                const fromChainPart = `from(${definition.fromParameterText})${actualChainSuffix.startsWith('.') ? '' : '.'}${actualChainSuffix}`
                const cleanFromChainPart = pipe(
                    removeTrailingMethods(['.execute()', '.exec()', '.show()', '.toSql()']),
                    normalizeSpacing
                )(fromChainPart)

                const lineStart = sourceFile.getLineAndCharacterOfPosition(executableChainNode.getStart(sourceFile)).line + 1
                const lineEnd = sourceFile.getLineAndCharacterOfPosition(executableChainNode.getEnd()).line + 1

                fromStatements.push({ chain: chainPart, param: paramPart, resource: resourcePart, fromChain: fromChainPart, cleanFromChain: cleanFromChainPart, lineStart, lineEnd })
                processedStatementNodes.add(currentStatementNode)
                return
            } else {
                let fromCallTargetNode: ts.CallExpression | null = null
                let expressionLeadingToFrom: ts.Expression | null = null

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
                        if (ts.isCallExpression(tracer.expression) || ts.isPropertyAccessExpression(tracer.expression)) {
                            tracer = tracer.expression
                            continue
                        }
                    } else if (ts.isPropertyAccessExpression(tracer)) {
                        if (ts.isCallExpression(tracer.expression) || ts.isPropertyAccessExpression(tracer.expression)) {
                            tracer = tracer.expression
                            continue
                        }
                    }
                    break
                }

                if (fromCallTargetNode?.arguments.length) {
                    const paramPart = getUnquotedText(fromCallTargetNode.arguments[0]!, sourceFile)
                    let chainPart: string | null = null
                    let resourcePart: string | null = null

                    if (expressionLeadingToFrom) {
                        const originalLeadingText = expressionLeadingToFrom.getText(sourceFile)
                        chainPart = originalLeadingText

                        let baseOfLeadingExpr: ts.Expression = expressionLeadingToFrom
                        while (ts.isPropertyAccessExpression(baseOfLeadingExpr) || ts.isCallExpression(baseOfLeadingExpr)) {
                            baseOfLeadingExpr = baseOfLeadingExpr.expression
                        }

                        if (ts.isIdentifier(baseOfLeadingExpr)) {
                            const buckInitializer = findVariableInitializerText(baseOfLeadingExpr, sourceFile)
                            if (buckInitializer?.startsWith('Buck(')) {
                                chainPart = originalLeadingText.replace(baseOfLeadingExpr.getText(sourceFile), buckInitializer)

                                const tempSourceBuck = ts.createSourceFile('tempBuck.ts', buckInitializer, ts.ScriptTarget.Latest, true)
                                ts.forEachChild(tempSourceBuck, n => {
                                    const bn = ts.isExpressionStatement(n) && ts.isCallExpression(n.expression) ? n.expression : ts.isCallExpression(n) ? n : null
                                    if (bn && ts.isIdentifier(bn.expression) && bn.expression.text === 'Buck' && bn.arguments.length > 0) {
                                        const firstArg = bn.arguments[0]
                                        if (firstArg && !ts.isObjectLiteralExpression(firstArg)) {
                                            resourcePart = getUnquotedText(firstArg, tempSourceBuck)
                                        }
                                    }
                                })
                            }
                        }
                    }

                    let actualFromChainText: string
                    if (ts.isPropertyAccessExpression(fromCallTargetNode.expression)) {
                        const fromKeywordNode = fromCallTargetNode.expression.name
                        actualFromChainText = sourceFile.text.substring(fromKeywordNode.getStart(sourceFile), executableChainNode.getEnd())
                    } else {
                        actualFromChainText = executableChainNode.getText(sourceFile)
                    }

                    const cleanFromChainPart = pipe(
                        removeTrailingMethods(['.execute()', '.exec()', '.show()', '.toSql()']),
                        normalizeSpacing
                    )(actualFromChainText)

                    const lineStart = sourceFile.getLineAndCharacterOfPosition(executableChainNode.getStart(sourceFile)).line + 1
                    const lineEnd = sourceFile.getLineAndCharacterOfPosition(executableChainNode.getEnd()).line + 1

                    fromStatements.push({ chain: chainPart, param: paramPart, resource: resourcePart, fromChain: actualFromChainText, cleanFromChain: cleanFromChainPart, lineStart, lineEnd })
                    processedStatementNodes.add(currentStatementNode)
                    return
                }
            }
        }
        ts.forEachChild(node, visitExecutableChains)
    }
    visitExecutableChains(sourceFile)

    buckFromDefinitions.forEach(def => {
        if (!def.isUsedInExecutableChain) {
            const fromCallNode = def.originalFromCallSiteNode
            const stmtNode = Array.from(getParents(fromCallNode))
                .find(p => ts.isVariableStatement(p) || ts.isExpressionStatement(p)) || fromCallNode

            const chainPart = def.buckInitializerText
            const paramPart = def.fromParameterUnquoted
            const resourcePart = def.buckResource
            const fromChainTextForUnusedDef = `from(${def.fromParameterText})`

            const lineStart = sourceFile.getLineAndCharacterOfPosition((fromCallNode.expression as ts.PropertyAccessExpression).name.getStart(sourceFile)).line + 1
            const lineEnd = sourceFile.getLineAndCharacterOfPosition(fromCallNode.getEnd()).line + 1

            fromStatements.push({ chain: chainPart, param: paramPart, resource: resourcePart, fromChain: fromChainTextForUnusedDef, cleanFromChain: fromChainTextForUnusedDef, lineStart, lineEnd })
            processedStatementNodes.add(stmtNode)
        }
    })

    fromStatements.sort((a, b) => a.lineStart - b.lineStart || a.fromChain.localeCompare(b.fromChain))
    return fromStatements
}

export function extractBuckStatement(text: string): BuckStatementParts[] {
    const sourceFile = ts.createSourceFile('tempFile.ts', text, ts.ScriptTarget.Latest, true)
    const buckStatements: BuckStatementParts[] = []
    const processedCalls = new Set<number>()

    function visit(node: ts.Node) {
        if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'Buck') {
            const callStartPos = node.getStart(sourceFile)
            if (processedCalls.has(callStartPos)) return

            let resource: string | null = null
            let options: Record<string, any> | null = null

            if (node.arguments.length > 0) {
                const arg0 = node.arguments[0]!
                if (ts.isObjectLiteralExpression(arg0)) {
                    options = evaluateObjectLiteral(arg0, sourceFile)
                } else if (ts.isStringLiteral(arg0) || ts.isNoSubstitutionTemplateLiteral(arg0)) {
                    resource = getUnquotedText(arg0, sourceFile)
                    if (node.arguments.length > 1) {
                        const arg1 = node.arguments[1]!
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
        ts.forEachChild(node, visit)
    }
    visit(sourceFile)
    return buckStatements
}
