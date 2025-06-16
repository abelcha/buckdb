import * as ts from 'typescript';
type Position = { line: number, column: number, charPos: number }
export type Extracted = {
    method: string,
    base?: string | null,
    expression: string,
    children?: Extracted[],
    chain?: [string, any[], number?][],
    start?: Position,
    end?: Position
}
type Opts = {
    positions?: boolean,
    chain?: boolean,
    targetMethods?: string[] | null
}
export const extractAssignations = (text: string, opts: Opts = {}) => {
    const sourceFile = ts.createSourceFile('temp.ts', text, ts.ScriptTarget.Latest, true);
    const assignations = {}

    function visit(node: ts.Node) {
        if (ts.isVariableStatement(node)) {
            const declarationList = node.declarationList;
            declarationList.declarations.forEach(declaration => {
                if (ts.isVariableDeclaration(declaration) && ts.isCallExpression(declaration.initializer)) {
                    const name = declaration.name.getText(sourceFile);
                    // const value = declaration.initializer.getText(sourceFile);
                    const val = handleCallExpression(sourceFile, declaration.initializer, { targetMethods: null, ...opts })
                    if (val?.length)
                        assignations[name] = val[0]
                    // assignations.push([name, value]);
                }
            });
        }
        ts.forEachChild(node, visit);
    }

    ts.forEachChild(sourceFile, visit);
    return assignations;
}

const BuckAssign = {
    expression: 'Buck()',
    chain: [['Buck',]]
}


export const extractReconciledCalls = (testCode: string, opts: Opts = {}) => {
    const result = extractSpecialCalls(testCode, opts)
    // console.log(result)
    const assignations = extractAssignations(testCode, opts)
    // console.log({ assignations })
    // console.log(result)
    // return result
    return result.map(e => {
        // console.log('resssssssssssss', e)
        // console.log('EBVASSSE', e.base)
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

function getPosition(sourceFile: ts.SourceFile, node: ts.Node, isStart: boolean = true) {
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

const handleCallExpression = (sourceFile: ts.SourceFile, node: ts.CallExpression, opts: any) => {
    const expressionText = node.expression.getText(sourceFile);
    const targetMethods = opts.targetMethods || ['from', 'create'];
    let method: string | null = null;
    // let resource: string | null = null;
    let fullExpression: string = '';
    const isOK = name => opts.targetMethods === null ? true : targetMethods.includes(name);

    if (ts.isPropertyAccessExpression(node.expression)) {
        const name = node.expression.name.getText(sourceFile);
        if (isOK(name)) {
            method = name;
            // resource = node.expression.expression.getText(sourceFile).trim();

            // Start with the current node
            let currentNode: ts.Node = node;
            // If parent is a property access expression or call expression, go up to capture full chain
            while (currentNode.parent && (ts.isPropertyAccessExpression(currentNode.parent) || ts.isCallExpression(currentNode.parent))) {
                currentNode = currentNode.parent;
            }
            // const resourceText = node.expression.expression.getText(sourceFile);
            // const leadingSpaces = ((currentNode as ts.PropertyAccessChain).expression).getChildAt(1).getLeadingTriviaWidth()
            // console.log({leadingSpaces})
            // const chain: { method: string, params: any[] }[] = [];
            // console.log('--------', collectChain(node))
            // ts.forEachChild(currentNode.expression, (child) => {
            //     console.log('FEEEEE', [child.getText()])
            // })
            // console.log('====>>>=', [(currentNode as ts.PropertyAccessChain).expression.getChildAt(1).getText()])
            // console.log('====>>>=', nb(currentNode.getChildAt(0).getChildAt(0).getChildAt(0).getChildAt(1)))
            // console.log('==>', method, [node.   expression.getChildren().map(c => c.getText())])
            const chainProps = opts.chain !== false ? collectChain(currentNode) : {}
            fullExpression = currentNode.getText(sourceFile)//.substring(resourceText.length + 1 + leadingSpaces)
            const positions = opts.positions === false ? {} :
                { start: getPosition(sourceFile, node, true), end: getPosition(sourceFile, currentNode, false) }
            return [{ expression: fullExpression, method, ...positions, ...chainProps }]
        }
    } else if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && isOK(expressionText)) {
        method = expressionText;
        // resource = null;
        // Start with the current node
        let currentNode: ts.Node = node;
        // If parent is a property access expression or call expression, go up to capture full chain
        while (currentNode.parent && (ts.isPropertyAccessExpression(currentNode.parent) || ts.isCallExpression(currentNode.parent))) {
            currentNode = currentNode.parent;
        }
        // console.log('=======>', )
        const chains = opts.chain !== false ? collectChain(currentNode) : {}
        fullExpression = currentNode.getText(sourceFile);
        const positions = opts.positions === false ? {} :
            { start: getPosition(sourceFile, node, true), end: getPosition(sourceFile, currentNode, false) }
        return [{ expression: fullExpression, ...positions, method, ...chains }]
    }
    return []
}


export const extractSpecialCalls = (text: string, opts: Opts = { positions: true, chain: false }): Extracted[] => {
    const sourceFile = ts.createSourceFile('temp.ts', text, ts.ScriptTarget.Latest, true);
    const specialCalls: Extracted[] = [];
    const pOmiter = (x: Extracted) => {
        const { start, end, ...rest } = x;
        return opts.positions === false ? rest : x
    }


    function visit(node: ts.Node) {
        if (ts.isCallExpression(node)) {
            const items = handleCallExpression(sourceFile, node, { ...opts, positions: true })
            // console.log('PUSSSSSSG', items)
            for (const item of items) {
                if (specialCalls.length && isTranscluded(specialCalls[specialCalls.length - 1], item)) {
                    specialCalls[specialCalls.length - 1].children ??= []
                    specialCalls[specialCalls.length - 1].children.push(item)
                } else {
                    specialCalls.push(item)
                }
            }
            // specialCalls.push(...items)
        }
        ts.forEachChild(node, visit);
    }

    ts.forEachChild(sourceFile, visit);

    return specialCalls.map(e => !e.children ? pOmiter(e) : ({
        ...pOmiter(e),
        children: e.children.map(pOmiter),
    }))
}
function collectChain(node: ts.Node, chain: [string, any[], number?][] = [], opts: Opts = {}) {
    const pushArgs = (method: string, n: ts.CallExpression) => {
        chain.unshift([method, n.arguments.map(e => e.getText())])
        if (opts?.positions !== false)
            chain[0].push(n.expression.getSourceFile().getLineAndCharacterOfPosition(n.expression.getEnd()).line)

    }
    if (ts.isCallExpression(node)) {
        let method = '';
        if (ts.isPropertyAccessExpression(node.expression)) {
            method = node.expression.name.getText();
            pushArgs(method, node)
            return collectChain(node.expression.expression, chain);
        } else if (ts.isIdentifier(node.expression)) {
            method = node.expression.getText();
            pushArgs(method, node)
        }
    } else {
        return { chain, base: node.getText() }
    }
    return { chain, base: null };
}


export const extractChains = (text: string) => {
    const sourceFile = ts.createSourceFile('temp.ts', text, ts.ScriptTarget.Latest, true);
    const chains: { method: string, params: any[] }[] = [];



    function visit(node: ts.Node) {
        if (ts.isCallExpression(node)) {
            if (!node.parent || !ts.isPropertyAccessExpression(node.parent) || !ts.isCallExpression(node.parent.parent)) {
                // This is the outermost call in the chain
                const chain: { method: string, params: any[] }[] = [];
                return collectChain(node);
                chains.push(...chain);
            }
        }
        ts.forEachChild(node, visit);
    }

    ts.forEachChild(sourceFile, visit);
    return chains;
}
