import {
    createSourceFile,
    forEachChild,
    isCallExpression,
    isIdentifier,
    isPropertyAccessExpression,
    isVariableDeclaration,
    isVariableStatement,
    ScriptTarget,
    SyntaxKind
} from 'typescript';
import type { CallExpression, Node, SourceFile, VariableDeclaration } from 'typescript'

type Position = { line: number, column: number, charPos: number }
export type Extracted = {
    method: string,
    base?: string | null,
    expression: string,
    children?: Extracted[],
    /** Array of tuples representing method calls in the chain */
    chain: [
        /** Name of the method being called */
        methodName: string,
        /** Array of arguments passed to the method */
        methodArgs: any[],
        /** Line number where this method appears in source (optional) */
        lineNumber?: number
    ][],
    start?: Position,
    end?: Position
}
type Opts = {
    positions?: boolean,
    chain?: boolean,
    targetMethods?: string[] | null
}

const _primitiveInitializer = (e: VariableDeclaration['initializer']) => {
    return e.kind === SyntaxKind.StringLiteral || e.kind === SyntaxKind.NumericLiteral || e.kind === SyntaxKind.TrueKeyword || e.kind === SyntaxKind.FalseKeyword
        || e.kind === SyntaxKind.NullKeyword || e.kind === SyntaxKind.UndefinedKeyword || e.kind === SyntaxKind.RegularExpressionLiteral || e.kind === SyntaxKind.ObjectLiteralExpression || e.kind === SyntaxKind.ArrayLiteralExpression
}

export const extractPrimitiveAssignations = (text: string, _opts: Opts = {}) => {
    const sourceFile = createSourceFile('temp.ts', text, ScriptTarget.Latest, true);
    const assignations = {}

    function visit(node: Node) {
        if (isVariableStatement(node)) {
            const declarationList = node.declarationList;
            declarationList.declarations.forEach(declaration => {
                // declaration
                // if (primitiveInitializer(declaration.initializer)) {
                const name = declaration.name.getText()
                // declaration.initializer.
                if (declaration.initializer.getFirstToken()?.kind === SyntaxKind.AwaitKeyword) {
                    return
                }
                assignations[name] = declaration.initializer.getText()
                // }
            })
            // console.log({ assignations })
        }
    }
    forEachChild(sourceFile, visit);
    return assignations;
}

export const extractAssignations = (text: string, opts: Opts = {}) => {
    const sourceFile = createSourceFile('temp.ts', text, ScriptTarget.Latest, true);
    const assignations = {}

    function visit(node: Node) {
        if (isVariableStatement(node)) {
            const declarationList = node.declarationList;
            declarationList.declarations.forEach(declaration => {
                if (isVariableDeclaration(declaration) && isCallExpression(declaration.initializer)) {
                    const name = declaration.name.getText(sourceFile);
                    // const value = declaration.initializer.getText(sourceFile);
                    const val = handleCallExpression(sourceFile, declaration.initializer, { targetMethods: null, ...opts })
                    if (val?.length)
                        assignations[name] = val[0]
                    // assignations.push([name, value]);
                }
            });
        }
        forEachChild(node, visit);
    }

    forEachChild(sourceFile, visit);
    return assignations;
}




export const extractReconciledCalls = (testCode: string, opts: Opts = {}): Extracted[] => {
    const result = extractSpecialCalls(testCode, opts)
    const assignations = extractAssignations(testCode, opts)
    return result.map(e => {
        if ((/*e.base === null ||*/ e.base === 'MemoryDB')) {
            return {
                ...e,
                expression: 'Buck().' + e.expression.replace(/MemoryDB\s*\./img, ''),
                chain: [['Buck', [], e.chain[0]?.[2]]].concat(e.chain),
            }
        }
        if (e.base && assignations[e.base]) {
            return {
                ...e,
                expression: e.expression.replace(e.base, assignations[e.base].expression),
                chain: assignations[e.base].chain.concat(e.chain)
            }
        }
        if (e.base && !assignations[e.base]) {
            return null
        }
        return e
    }).filter(e => e !== null)
}
export const reconstituteAssignations = (assignations: [string, string][]) => {
    const assignationMap = new Map<string, string>();
    const result = new Map<string, string>();

    // First pass: populate the map with variable names and their values
    assignations.forEach(([name, value]) => {
        assignationMap.set(name, value);
    });

    // Second pass: build concatenated expressions for variables that reference others
    assignations.forEach(([name, value]) => {
        let finalValue = value;
        let replaced = true;
        while (replaced) {
            replaced = false;
            for (const [varName, varValue] of assignationMap) {
                if (finalValue.includes(varName) && varName !== name) {
                    finalValue = finalValue.replace(new RegExp(`\\b${varName}\\b`), varValue);
                    replaced = true;
                }
            }
        }
        result.set(name, finalValue);
    });

    return result;
}

function getPosition(sourceFile: SourceFile, node: Node, isStart: boolean = true) {
    const pos = isStart ? node.getStart(sourceFile) : node.getEnd();
    const lineAndChar = sourceFile.getLineAndCharacterOfPosition(pos);
    return {
        line: lineAndChar.line + 1, // Lines are 0-based in TypeScript, so add 1
        column: lineAndChar.character + 1, // Characters are 0-based, so add 1
        charPos: pos
    };
}
function isTranscluded(parentPos: Extracted, childPos: Extracted) {
    return parentPos.start.charPos <= childPos.start.charPos && parentPos.end.charPos >= childPos.end.charPos
}

const handleCallExpression = (sourceFile: SourceFile, node: CallExpression, opts: any): Extracted[] => {
    const expressionText = node.expression.getText(sourceFile);
    const targetMethods = opts.targetMethods || ['from', 'create'];
    let method: string | null = null;
    // let resource: string | null = null;
    let fullExpression: string = '';
    const isOK = name => opts.targetMethods === null ? true : targetMethods.includes(name);

    if (isPropertyAccessExpression(node.expression)) {
        const name = node.expression.name.getText(sourceFile);
        if (isOK(name)) {
            method = name;
            // resource = node.expression.expression.getText(sourceFile).trim();

            // Start with the current node
            let currentNode: Node = node;
            // If parent is a property access expression or call expression, go up to capture full chain
            while (currentNode.parent && (isPropertyAccessExpression(currentNode.parent) || isCallExpression(currentNode.parent))) {
                currentNode = currentNode.parent;
            }
            const chainProps = opts.chain !== false ? collectChain(currentNode) : {}
            fullExpression = currentNode.getText(sourceFile)//.substring(resourceText.length + 1 + leadingSpaces)
            const positions = opts.positions === false ? {} :
                { start: getPosition(sourceFile, node, true), end: getPosition(sourceFile, currentNode, false) }
            return [{ expression: fullExpression, method, ...positions, ...chainProps }] as Extracted[]
        }
    } else if (isCallExpression(node) && isIdentifier(node.expression) && isOK(expressionText)) {
        method = expressionText;
        // resource = null;
        // Start with the current node
        let currentNode: Node = node;
        // If parent is a property access expression or call expression, go up to capture full chain
        while (currentNode.parent && (isPropertyAccessExpression(currentNode.parent) || isCallExpression(currentNode.parent))) {
            currentNode = currentNode.parent;
        }
        const chains = opts.chain !== false ? collectChain(currentNode) : {}
        fullExpression = currentNode.getText(sourceFile);
        const positions = opts.positions === false ? {} :
            { start: getPosition(sourceFile, node, true), end: getPosition(sourceFile, currentNode, false) }
        return [{ expression: fullExpression, ...positions, method, ...chains }] as Extracted[]
    }
    return []
}


export const extractSpecialCalls = (text: string, opts: Opts = { positions: true, chain: false }): Extracted[] => {
    const sourceFile = createSourceFile('temp.ts', text, ScriptTarget.Latest, true);
    const specialCalls: Extracted[] = [];
    const pOmiter = (x: Extracted) => {
        const { ...rest } = x;
        return opts.positions === false ? rest : x
    }


    function visit(node: Node) {
        if (isCallExpression(node)) {
            const items = handleCallExpression(sourceFile, node, { ...opts, positions: true })
            for (const item of items) {
                if (specialCalls.length && isTranscluded(specialCalls[specialCalls.length - 1], item)) {
                    specialCalls[specialCalls.length - 1].children ??= []
                    specialCalls[specialCalls.length - 1].children.push(item)
                } else {
                    specialCalls.push(item)
                }
            }
        }
        forEachChild(node, visit);
    }

    forEachChild(sourceFile, visit);

    return specialCalls.map(e => !e.children ? pOmiter(e) : ({
        ...pOmiter(e),
        children: e.children.map(pOmiter),
    }))
}
function collectChain(node: Node, chain: [string, any[], number?][] = [], opts: Opts = {}) {
    const pushArgs = (method: string, n: CallExpression) => {
        chain.unshift([method, n.arguments.map(e => e.getText())])
        if (opts?.positions !== false)
            chain[0].push(n.expression.getSourceFile().getLineAndCharacterOfPosition(n.expression.getEnd()).line)

    }
    if (isCallExpression(node)) {
        let method = '';
        if (isPropertyAccessExpression(node.expression)) {
            method = node.expression.name.getText();
            pushArgs(method, node)
            return collectChain(node.expression.expression, chain);
        } else if (isIdentifier(node.expression)) {
            method = node.expression.getText();
            pushArgs(method, node)
        }
    } else {
        return { chain, base: node.getText() }
    }
    return { chain, base: null };
}


export const extractChains = (text: string) => {
    const sourceFile = createSourceFile('temp.ts', text, ScriptTarget.Latest, true);
    const chains: { method: string, params: any[] }[] = [];



    function visit(node: Node) {
        if (isCallExpression(node)) {
            if (!node.parent || !isPropertyAccessExpression(node.parent) || !isCallExpression(node.parent.parent)) {
                // This is the outermost call in the chain
                // const chain: Extracted['chain'] = [];
                return collectChain(node);
                // chains.push(...chain);
            }
        }
        forEachChild(node, visit);
    }

    forEachChild(sourceFile, visit);
    return chains;
}

export function cleanEval(s: string, logErrors = false) {
    try {
        return new Function(`return ${s}`)()
    } catch (err) {
        if (logErrors)
            console.warn('cleanEval error', err)
        return ''
    }
}

export function buildChain(chain: Extracted['chain']) {
    return chain.map(([method, params]) => `${method}(${params.join(',')})`).join('.')
}

export function evalChain(chain: Extracted['chain'], context: Record<string, string>) {
    const contextString = Object.entries(context)
        .map(([key, value]) => `const ${key} = ${value};`)
        .join('\n')
    // if (Object.entries(context).length)
    //     debugger
    const s = buildChain(chain)
    const body = `${contextString}; \n return ${s}`
    return new Function(body)()
}
