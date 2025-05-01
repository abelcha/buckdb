import * as ts from 'typescript';

// Helper function to find the relevant initializer text (potentially recursively)
export function findVariableInitializerText(
    identifier: ts.Identifier,
    sourceFile: ts.SourceFile,
    visitedIdentifiers: Set<string> = new Set() // To prevent infinite recursion
): string | null {
    const identifierName = identifier.text;

    // Prevent infinite loops for cyclic assignments (e.g., let a=b; let b=a;)
    if (visitedIdentifiers.has(identifierName)) {
        return null;
    }
    visitedIdentifiers.add(identifierName); // Mark current identifier as visited for this lookup path

    let scope: ts.Node | undefined = identifier;
    while (scope) {
        // Check if the scope node is one that can contain statements
        if (ts.isBlock(scope) || ts.isSourceFile(scope) || ts.isModuleBlock(scope)) {
            const statements = scope.statements;
            const declarations = statements?.filter(ts.isVariableStatement)
                .flatMap(stmt => stmt.declarationList.declarations) ?? [];

            for (const declaration of declarations) {
                if (ts.isIdentifier(declaration.name) && declaration.name.text === identifierName && declaration.initializer) {
                    const initializer = declaration.initializer;
                    const initializerText = initializer.getText(sourceFile);

                    // Check if the initializer is the target 'Buck(...)' call
                    if (ts.isCallExpression(initializer) && ts.isIdentifier(initializer.expression) && initializer.expression.text === 'Buck') {
                        return initializerText; // Found the Buck call directly
                    }
                    // Check if the initializer is another identifier (assignment)
                    else if (ts.isIdentifier(initializer)) {
                        // Recursively search for the initializer of the assigned variable
                        // Pass a *copy* of the visited set for the new recursive path
                        const recursiveResult = findVariableInitializerText(initializer, sourceFile, new Set(visitedIdentifiers));
                        if (recursiveResult) {
                            return recursiveResult; // Found Buck() through recursion
                        }
                    }
                    // If initializer is neither Buck() nor an identifier, stop searching this path
                    return null;
                }
            }
        }
        // Move up to the parent scope
        scope = scope.parent;
        if (!scope) break; // Reached top level
    }

    return null; // Declaration not found or relevant initializer not found
}


// Define the structure for the output
export interface FromStatementParts {
    chain: string | null;     // The part before .from() (potentially inlined), null if direct from()
    param: string;            // The raw text of the first argument to from() (unquoted)
    resource: string | null;  // The first argument of Buck() if chain involves Buck(), null otherwise (unquoted)
    fromChain: string;        // The full chain starting from from(), without inlining
    cleanFromChain: string;   // fromChain with trailing execute/show/toSql removed
    lineStart: number;        // 1-based start line number of the fromChain
    lineEnd: number;          // 1-based end line number of the fromChain
}

// Helper function to get unquoted text from a string literal node
function getUnquotedText(node: ts.Node, sourceFile: ts.SourceFile): string {
    let text = node.getText(sourceFile).trim();
     if (text.length >= 2) {
        const firstChar = text[0];
        const lastChar = text[text.length - 1];
        if ((firstChar === "'" && lastChar === "'") || (firstChar === '"' && lastChar === '"')) {
            return text.substring(1, text.length - 1);
        }
    }
    return text; // Return original if not a standard quoted string
}


// Function to extract 'from' statements using TypeScript AST, with inlining
export function extractFromStatementsAST(text: string): FromStatementParts[] {
    const sourceFile = ts.createSourceFile(
        'tempFile.ts', // Temporary file name, doesn't need to exist
        text,
        ts.ScriptTarget.Latest, // Use the latest script target
        true // Set parent pointers
    );

    const fromStatements: FromStatementParts[] = []; // Update return type
    const addedStatements = new Set<string>(); // Still use containing statement text to track processed statements

    function visit(node: ts.Node) {
        // --- Start: Skip Check Logic ---
        // Check if the *containing statement* of this node has already been processed.
        let stmtNodeForSkipCheck: ts.Node | null = node;
        let isTopLevelStatement = false;
        while(stmtNodeForSkipCheck && stmtNodeForSkipCheck.parent) {
            const parent = stmtNodeForSkipCheck.parent;
             if (ts.isExpressionStatement(parent) || ts.isVariableStatement(parent) || ts.isReturnStatement(parent) || ts.isIfStatement(parent) || ts.isForStatement(parent) || ts.isWhileStatement(parent)) {
                 stmtNodeForSkipCheck = parent; // Found statement parent
                 break;
             }
             if (ts.isBlock(parent) || ts.isSourceFile(parent) || ts.isModuleBlock(parent)) {
                 // Node itself might be the statement if parent is block/source
                 if (!ts.isExpressionStatement(stmtNodeForSkipCheck) && !ts.isVariableStatement(stmtNodeForSkipCheck)) {
                    stmtNodeForSkipCheck = null; // Not a statement node directly under block
                 } else {
                     isTopLevelStatement = true; // It's a statement directly under a block/source
                 }
                 break;
             }
             stmtNodeForSkipCheck = parent; // Keep going up
        }
        // Handle case where node itself is the top-level statement (missed by loop)
        if (!isTopLevelStatement && !stmtNodeForSkipCheck?.parent) {
             if (ts.isExpressionStatement(node) || ts.isVariableStatement(node)) {
                 stmtNodeForSkipCheck = node;
             } else {
                 stmtNodeForSkipCheck = null; // Not a statement we track
             }
        }

        // Perform the skip check using the found statement node's text
        if (stmtNodeForSkipCheck && addedStatements.has(stmtNodeForSkipCheck.getText(sourceFile).trim())) {
            return; // Skip this node and its children if its statement was processed
        }
        // --- End: Skip Check Logic ---

        if (ts.isCallExpression(node)) {
            const expression = node.expression;
            let baseIdentifier: ts.Identifier | null = null;
            let isDirectFromCall = false;
            let isPropertyFromCall = false; // Flag for any identifier.from() or chain.from()

            if (ts.isIdentifier(expression) && expression.text === 'from') {
                // Case: from(...)
                isDirectFromCall = true;
            } else if (ts.isPropertyAccessExpression(expression) && expression.name.text === 'from') {
                // Case: something.from(...)
                isPropertyFromCall = true;
                // Now, trace back the 'something' part to find the root identifier if it exists
                let currentExpr: ts.Expression = expression.expression;
                while (ts.isPropertyAccessExpression(currentExpr) || ts.isCallExpression(currentExpr)) {
                    // If it's a call like .settings(), get the expression before it
                    if (ts.isCallExpression(currentExpr)) {
                        // Ensure it's not the 'from' call itself we are unwrapping
                        if (currentExpr === node) break;
                        currentExpr = currentExpr.expression;
                    }
                    // If it's a property access like .prop, get the expression before it
                    else if (ts.isPropertyAccessExpression(currentExpr)) {
                         // Ensure it's not the 'from' property access itself
                         if (currentExpr === expression) break;
                         currentExpr = currentExpr.expression;
                    } else {
                        // Should not happen based on loop condition, but break defensively
                        break;
                    }
                }
                // After the loop, check if we landed on an identifier
                if (ts.isIdentifier(currentExpr)) {
                    baseIdentifier = currentExpr; // Found the root identifier (e.g., 'buckCon')
                }
            }

            if (isDirectFromCall || isPropertyFromCall) { // Check if it's any kind of 'from' call
                // 1. Find the end of the chain starting *from* the 'from' call node (`node`)
                let endOfChainNode: ts.Node = node; // Start with the 'from' call itself
                while (endOfChainNode.parent) {
                    const parent = endOfChainNode.parent;
                    // Is the parent a PropertyAccess where 'endOfChainNode' is the object being accessed? (e.g., from(...).select)
                    if (ts.isPropertyAccessExpression(parent) && parent.expression === endOfChainNode) {
                        // Now check if *that* PropertyAccess is being called (e.g., the .select())
                        if (parent.parent && ts.isCallExpression(parent.parent) && parent.parent.expression === parent) {
                            endOfChainNode = parent.parent; // Move up to the CallExpression (e.g., .select(...))
                        } else {
                            // It's just a property access, not a call, subsequent chain ends here.
                            // We don't move up further.
                             break;
                        }
                    }
                    // Is the parent a CallExpression where 'endOfChainNode' is the function being called?
                    // This handles cases like `someFunc(from(...))` which shouldn't be part of the fromChain.
                    // else if (ts.isCallExpression(parent) && parent.expression === endOfChainNode) {
                    //      endOfChainNode = parent; // This seems wrong for typical method chaining
                    // }
                    else {
                        break; // Parent is not part of a subsequent chain
                    }
                }
                 // Now 'endOfChainNode' should be the highest node in the chain starting from 'from'

                // 2. Find the statement containing this endOfChainNode
                let containingStatementNode: ts.Node = endOfChainNode; // Start search from the end of the 'from' chain
                while (containingStatementNode.parent && !ts.isBlock(containingStatementNode.parent) && !ts.isSourceFile(containingStatementNode.parent) && !ts.isModuleBlock(containingStatementNode.parent)) {
                    // Check if the parent is a statement type itself
                    if (ts.isExpressionStatement(containingStatementNode.parent) ||
                        ts.isVariableStatement(containingStatementNode.parent) ||
                        ts.isReturnStatement(containingStatementNode.parent) ||
                        ts.isIfStatement(containingStatementNode.parent) ||
                        ts.isForStatement(containingStatementNode.parent) ||
                        ts.isWhileStatement(containingStatementNode.parent) ||
                        ts.isVariableDeclaration(containingStatementNode.parent) // Include VariableDeclaration
                    ) {
                        containingStatementNode = containingStatementNode.parent;
                        break; // Found the statement
                    }
                    containingStatementNode = containingStatementNode.parent;
                }
                // If the loop ended at the top level, the highestChainNode might be the statement itself (e.g. simple expression)
                if (!ts.isExpressionStatement(containingStatementNode) &&
                    !ts.isVariableStatement(containingStatementNode) &&
                    !ts.isReturnStatement(containingStatementNode) &&
                    !ts.isVariableDeclaration(containingStatementNode)) // Check VariableDeclaration too
                {
                    // It's possible the endOfChainNode itself is the expression in an ExpressionStatement
                    if (containingStatementNode.parent && ts.isExpressionStatement(containingStatementNode.parent) && containingStatementNode.parent.expression === containingStatementNode) {
                        containingStatementNode = containingStatementNode.parent;
                    } else {
                        // Fallback: use the end node of the detected chain if no statement found
                        containingStatementNode = endOfChainNode;
                    }
                }

                // --- Extract Parts ---
                let chainPart: string | null = null;
                let paramPart: string | null = null;
                let resourcePart: string | null = null; // Added
                let fromChainPart: string | null = null;
                let cleanFromChainPart: string | null = null;
                let lineStart: number | null = null;
                let lineEnd: number | null = null;
                let shouldAdd = false;

                // 1. Get paramPart (unquoted)
                if (node.arguments.length > 0) {
                    let rawParamText = node.arguments[0].getText(sourceFile).trim();
                    paramPart = getUnquotedText(node.arguments[0], sourceFile);
                } else {
                    return; // Skip if from() has no arguments
                }

                // 2. Calculate raw fromChainPart and its line numbers
                let fromChainStartPos: number;
                if (isDirectFromCall && ts.isIdentifier(expression)) {
                    fromChainStartPos = expression.getStart(sourceFile);
                } else if (isPropertyFromCall && ts.isPropertyAccessExpression(expression)) {
                    fromChainStartPos = expression.name.getStart(sourceFile);
                } else {
                     console.error("Unexpected node structure for from call:", node);
                     return;
                }
                const fromChainEndPos = endOfChainNode.getEnd();
                fromChainPart = sourceFile.text.substring(fromChainStartPos, fromChainEndPos).trim();
                lineStart = sourceFile.getLineAndCharacterOfPosition(fromChainStartPos).line + 1; // Line where 'from' keyword starts
                lineEnd = sourceFile.getLineAndCharacterOfPosition(fromChainEndPos).line + 1;     // Line of the chain end

                // 3. Calculate cleanFromChainPart by removing trailing methods and comments from fromChainPart
                cleanFromChainPart = fromChainPart; // Start with the raw chain
                const trailingMethodsToRemove = ['.execute()', '.show()', '.toSql()'];

                // First, remove trailing methods
                for (const method of trailingMethodsToRemove) {
                    while (cleanFromChainPart && cleanFromChainPart.endsWith(method)) {
                         cleanFromChainPart = cleanFromChainPart.substring(0, cleanFromChainPart.length - method.length).trim();
                    }
                }

                // Then, attempt to remove comments and clean whitespace
                if (cleanFromChainPart) {
                    // Try removing comments more carefully (match start of line or whitespace before //)
                    cleanFromChainPart = cleanFromChainPart.replace(/(?:^|\s+)\/\/.*$/gm, '').trim();
                    // Collapse space around dots
                    cleanFromChainPart = cleanFromChainPart.replace(/\s*\.\s*/g, '.');
                    // Replace remaining newlines with spaces and collapse multiple spaces
                    cleanFromChainPart = cleanFromChainPart.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
                }


                // 4. Calculate chainPart (preceding chain, potentially inlined) and resourcePart
                if (isDirectFromCall) {
                    // Case: Direct from(...) call
                    chainPart = null;
                    resourcePart = null; // No Buck() call involved
                    shouldAdd = true;
                } else if (isPropertyFromCall) {
                    // Case: something.from(...)
                    const somethingExpression = (node.expression as ts.PropertyAccessExpression).expression;
                    chainPart = somethingExpression.getText(sourceFile).trim(); // Initial preceding chain text

                    if (baseIdentifier) { // We found a root identifier for 'something'
                        const initializerNodeText = findVariableInitializerText(baseIdentifier, sourceFile); // This returns the Buck('...') text
                        if (initializerNodeText && initializerNodeText.trim().startsWith('Buck(')) {
                             // Attempt to parse the initializer text to get the Buck call node
                             const initSourceFile = ts.createSourceFile("tempInit.ts", initializerNodeText, ts.ScriptTarget.Latest, true);
                             let buckCallNode: ts.CallExpression | null = null;
                             ts.forEachChild(initSourceFile, (initNode) => {
                                 if (ts.isExpressionStatement(initNode) && ts.isCallExpression(initNode.expression) && ts.isIdentifier(initNode.expression.expression) && initNode.expression.expression.text === 'Buck') {
                                     buckCallNode = initNode.expression;
                                 } else if (ts.isCallExpression(initNode) && ts.isIdentifier(initNode.expression) && initNode.expression.text === 'Buck') {
                                     // Handle case where initializerText is just the call itself
                                     buckCallNode = initNode;
                                 }
                             });

                             if (buckCallNode && buckCallNode.arguments.length > 0) {
                                 resourcePart = getUnquotedText(buckCallNode.arguments[0], initSourceFile);
                             }

                            // Inline Buck() initializer into the chain part
                            const identifierText = baseIdentifier.getText(sourceFile);
                            const escapedIdentifier = identifierText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                            const regex = new RegExp(`^\\s*${escapedIdentifier}`); // Match base identifier at start
                            if (regex.test(chainPart)) {
                                chainPart = chainPart.replace(regex, initializerNodeText); // Use the full initializer text for chain
                            }
                            shouldAdd = true; // Keep because it originated from Buck().from()
                        } else {
                             // It's identifier.from() but identifier wasn't Buck() or no initializer
                             resourcePart = null;
                             shouldAdd = true; // Keep based on Option B
                        }
                    } else {
                         // It was something.from() but 'something' wasn't a simple identifier
                         resourcePart = null;
                         shouldAdd = true; // Keep based on Option B
                    }
                }

                // Add the parts if criteria met and statement not processed
                if (shouldAdd && paramPart !== null && fromChainPart !== null && cleanFromChainPart !== null && lineStart !== null && lineEnd !== null) { // Ensure all parts were extracted
                    const containingStatementText = containingStatementNode.getText(sourceFile).trim();
                    if (!addedStatements.has(containingStatementText)) {
                        // Add the new resourcePart to the pushed object
                        fromStatements.push({ chain: chainPart, param: paramPart, resource: resourcePart, fromChain: fromChainPart, cleanFromChain: cleanFromChainPart, lineStart, lineEnd });
                        addedStatements.add(containingStatementText); // Mark statement as added
                    }
                    // Stop visiting children of the containing statement node now that we've processed it.
                    return;
                }
            }
        }
        // Visit children only if we haven't returned early
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return fromStatements;
}
