import onSaveCommand from './save-command';
import './style.css';
import { ExtensionHostKind, registerExtension } from '@codingame/monaco-vscode-api/extensions';
import { runActiveTypeScriptFile } from './features/runTs';
import type * as vsCodeApi from "vscode";
import { transformedScheme, scrollSyncMap, openTransformedViewAndSync } from './sync-view';
type VsCodeApi = typeof vsCodeApi;
import './imports.ts';
import { TextDocumentContentProvider, Uri, window as VsCodeWindow, workspace as VsCodeWorkspace, EventEmitter, TextEditor, Disposable, OutputChannel, languages, Position, CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, Range, TextDocument } from 'vscode'; // Added imports, TextDocument
import { BuckFromChain, transformedProvider } from './transform-text';
// Import the extraction function from the refactored file
import { extractFromStatementsAST } from './extract-from-statements';


// Removed local definitions of findVariableInitializerText and extractFromStatementsAST
// as they are now imported from ../extract-from-statements



const { getApi } = registerExtension(
    {
        name: 'showp',
        publisher: 'codingame',
        version: '1.0.0',
        engines: {
            vscode: '*'
        },
        contributes: {
            "menus": {
                "editor/title": [{ "command": "run.activeTypeScriptFile", "group": "navigation@1" }, { "command": "run.activeCell", "group": "navigation@1" }],
                "commandPalette": [
                    { "command": "run.activeTypeScriptFile", "when": "resourceLangId == typescript" },
                    { "command": "extract.fromStatements", "when": "resourceLangId == typescript" } // Correct when clause
                ]
            },
            commands: [
                { command: 'show-transformed-view', title: 'Show Transformed View' },
                { command: 'run.activeTypeScriptFile', title: 'Run Active TypeScript File', icon: "$(play)" },
                { command: 'run.activeCell', title: 'Run current cell', icon: "$(play)" },
                { command: 'extract.fromStatements', title: 'Extract "from" Statements' } // Correct title
            ]
        },
        enabledApiProposals: ['aiRelatedInformation'], // Restore original proposals
    },
    ExtensionHostKind.LocalProcess,
);


// Store disposables for cleanup if needed (though HMR is removed)
const commandDisposables: Disposable[] = [];
let runOutputChannel: OutputChannel | undefined;


void getApi().then(async (vscode: VsCodeApi) => { // vscode here is the resolved API object

    // Correctly handle diagnostic changes and add to disposables
    commandDisposables.push(vscode.languages.onDidChangeDiagnostics((e: vsCodeApi.DiagnosticChangeEvent) => { // Use vsCodeApi alias
        console.log('Diagnostics changed event:', e);
        // The event provides an array of URIs that changed
        e.uris.forEach(uri => {
            const diagnostics = vscode.languages.getDiagnostics(uri); // Get diagnostics for the specific URI
            const editor = VsCodeWindow.visibleTextEditors.find(editor => editor.document.uri.toString() === uri.toString());

            if (editor) {
                // Log diagnostics for visible editors associated with the URI
                const diagnosticMessages = diagnostics.map(d => `[${vscode.DiagnosticSeverity[d.severity]}] ${d.message} (at ${d.range.start.line + 1}:${d.range.start.character + 1})`).join('\n');
                console.log(`Diagnostics for ${uri.toString()}:\n${diagnosticMessages || 'No diagnostics'}`);
            } else {
                // Optionally log diagnostics even if the editor isn't currently visible
                const diagnosticMessages = diagnostics.map(d => `[${vscode.DiagnosticSeverity[d.severity]}] ${d.message} (at ${d.range.start.line + 1}:${d.range.start.character + 1})`).join('\n');
                if (diagnosticMessages) {
                    console.log(`Diagnostics updated for non-visible file ${uri.toString()}:\n${diagnosticMessages}`);
                }
            }
        });
    }));

    // Clean up previous command registrations if any (simple cleanup)
    commandDisposables.forEach(d => d.dispose());
    commandDisposables.length = 0;
    runOutputChannel?.dispose(); // Dispose previous channel if exists
    runOutputChannel = undefined;
    // Clear scroll sync map on reload/re-run
    scrollSyncMap.forEach(sync => {
        sync.sourceDisposable.dispose();
        sync.targetDisposable.dispose();
    });
    scrollSyncMap.clear();



    commandDisposables.push(vscode.workspace.registerTextDocumentContentProvider(transformedScheme, transformedProvider));
    commandDisposables.push(vscode.commands.registerCommand('show-transformed-view', async () => {
        console.log('show transssss')
        const activeEditor = VsCodeWindow.activeTextEditor;
        if (activeEditor) {
            await openTransformedViewAndSync(activeEditor, transformedProvider, vscode);
        } else {
            vscode.window.showWarningMessage('No active editor found to show transformed view for.');
        }
    }));

    // Reintroduce helper function to get the provider URI
    const getTransformedUri = (editor: TextEditor | undefined): Uri | undefined => {
        if (editor && editor.document.uri.scheme !== transformedScheme && editor.document.uri.scheme !== 'transx') {
            const originalUri = editor.document.uri;
            return Uri.parse(`${transformedScheme}:/${originalUri.toString()}`);
        }
        return undefined;
    };

    // Automatically open read-only transformed view when the active editor changes
    commandDisposables.push(VsCodeWindow.onDidChangeActiveTextEditor(async editor => {
        if (editor) {
            // Pass the provider instance
            await openTransformedViewAndSync(editor, transformedProvider, vscode);
        }
    }));

    // Update the provider when the source text document changes
    commandDisposables.push(VsCodeWorkspace.onDidChangeTextDocument(event => {
        // Check if the changed document is a source document (not transformed/transx)
        if (event.document.uri.scheme !== transformedScheme && event.document.uri.scheme !== 'transx') {
            // Find the corresponding editor to get the transformed URI
            // This assumes the source document might be active, but not necessarily
            const sourceEditor = VsCodeWindow.visibleTextEditors.find(e => e.document.uri === event.document.uri) ?? VsCodeWindow.activeTextEditor;

            if (sourceEditor && sourceEditor.document.uri === event.document.uri) { // Reverted condition check
                const targetUri = getTransformedUri(sourceEditor);
                if (targetUri) {
                    // console.log(`[OnDidChangeTextDocument] Firing provider update for ${targetUri.toString()}`); // Keep original log commented
                    transformedProvider.update(targetUri); // Fire provider update
                }
            } else {
                // If the changed doc isn't visible/active, we might still want to update
                // if a transformed view for it *is* visible. This is more complex.
                // For now, only update if the source doc is active/visible.
                // console.log(`[OnDidChangeTextDocument] Changed doc ${event.document.uri} is not active/visible, skipping provider update.`);
            }
        }
    }));



    // --- transx Provider (Kept as is) ---
    const myScheme = 'transx'; // Keep this scheme local if only used here
    const myProvider = new class implements TextDocumentContentProvider {
        onDidChangeEmitter = new EventEmitter<Uri>(); // Use imported EventEmitter
        onDidChange = this.onDidChangeEmitter.event;
        provideTextDocumentContent = () => ''
    };
    commandDisposables.push(vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider));

    const initialEditor = VsCodeWindow.activeTextEditor;
    if (initialEditor) {
        // console.log("[Initial] Attempting to open read-only transformed view for initially active editor."); // Restore original log
        // Pass the provider instance
        // Removed sleep(500) again
        await openTransformedViewAndSync(initialEditor, transformedProvider, vscode);
        // runActiveTypeScriptFile(VsCodeWindow, runOutputChannel!, 13); // Keep commented out or adjust if needed
    }
    commandDisposables.push(onSaveCommand(vscode)); // Correct closing for push(vscode.workspace.onDidSaveTextDocument(...))
    // --- Run TypeScript Command Registration ---
    if (!runOutputChannel) { // Create channel only once
        runOutputChannel = vscode.window.createOutputChannel("TypeScript Runner");
    }
    commandDisposables.push(vscode.commands.registerCommand('run.activeTypeScriptFile', async () => {
        await runActiveTypeScriptFile(VsCodeWindow, runOutputChannel!);
    }));

    commandDisposables.push(vscode.commands.registerCommand('run.activeCell', async (a, b, c) => {
        const cursorPosition = VsCodeWindow.activeTextEditor?.selection.active;
        // console.log('cxxxxx', VsCodeWindow.)
        await runActiveTypeScriptFile(VsCodeWindow, runOutputChannel!, cursorPosition.line);
    }));

    // --- Extract "from" Statements Command Registration ---
    commandDisposables.push(vscode.commands.registerCommand('extract.fromStatements', () => {
        console.log('EXTRACTING FROM STATEMENTS');
        const activeEditor = VsCodeWindow.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showWarningMessage('No active editor to extract statements from.');
            return;
        }

        // Ensure the output channel exists
        if (!runOutputChannel) {
            runOutputChannel = vscode.window.createOutputChannel("TypeScript Runner");
        }

        const documentText = activeEditor.document.getText();
        console.log({ documentText })
        try {
            // extractFromStatementsAST now returns { chain: string | null, param: string }[]
            const extractedParts = extractFromStatementsAST(documentText);
            // extractedParts.forEach()
            console.log("Extracted parts:", extractedParts);
        } catch (error) {
            console.error("Error extracting 'from' statements:", error);
            vscode.window.showErrorMessage(`Error extracting statements: ${error instanceof Error ? error.message : String(error)}`);
            runOutputChannel.appendLine(`\n--- ERROR ---\nFailed to extract statements: ${error instanceof Error ? error.message : String(error)}`);
            runOutputChannel.show(true);
        }
    }));

    // --- S3 Autocomplete Provider ---
    const s3CompletionProvider = new class implements vsCodeApi.CompletionItemProvider {
        async provideCompletionItems(
            document: TextDocument,
            position: Position,
            token: CancellationToken,
            context: CompletionContext
        ): Promise<CompletionItem[] | undefined> {


            // Get the line text up to the cursor
            const linePrefix = document.lineAt(position.line).text.substring(0, position.character);


            // Regex to check if we are inside from('s3://<bucket-name>/<path-prefix>
            // Allows single or double quotes
            const match = linePrefix.match(/from\(['"](s3:\/\/([^\/']+?)\/([^'"]*))$/i);


            if (!match) {
                // console.log("No match for S3 prefix:", linePrefix); // Debugging
                return undefined; // Not the pattern we are looking for
            }
            const st = extractFromStatementsAST(document.getText()).find(e => position.line + 1 === e.lineStart)
            if (!st) {
                console.log("No statement found for current line:", position.line + 1);
                return undefined; // No statement found
            }
            const fullPrefix = match[1]; // e.g., s3://bucket-name/dist/
            const bucketName = match[2]; // e.g., bucket-name
            const pathPrefix = match[3]; // e.g., dist/
            console.log({ st })
            const bbq = BuckFromChain(st)
            console.log({ bbq })
            const zresp = await bbq.from(`glob('s3://${bucketName}/*')`).execute()
            console.log({ st, position, zresp })

            const blocked = async () => {
                console.log(`S3 Autocomplete triggered for prefix: ${fullPrefix}`);

                try {
                    // --- PLACEHOLDER for buckconn ---
                    // Ensure 'buckconn' is initialized and accessible in this scope.
                    // Replace the mock data below with the actual call.
                    // IMPORTANT: You need to define/import 'buckconn' somewhere accessible here.
                    // Example:
                    // const buckconn = getMyBucketConnection(); // Or however you access it
                    // const s3Results = await buckconn.from(`glob('${fullPrefix}*')`).execute();
                    // const files = s3Results.map((item: any) => item.path); // Adjust based on actual buckconn result structure

                    // Mock data for demonstration:
                    console.warn("Using mock S3 data. Replace with actual buckconn call using the 'buckconn' object.");
                    // Simulate fetching files based on the prefix
                    console.log('====', `glob('s3://${bucketName}/*')`)
                    const resp = await from(`glob('s3://${bucketName}/*')`).execute()
                    console.log({ resp })

                    const allPossibleFiles = [
                        `s3://${bucketName}/fileA.csv`,
                        `s3://${bucketName}/fileB.json`,
                        `s3://${bucketName}/dist/data1.parquet`,
                        `s3://${bucketName}/dist/data2.csv`,
                        `s3://${bucketName}/dist/subdir/nested.txt`,
                        `s3://${bucketName}/archive/old_data.zip`,
                    ];
                    const mockFiles = allPossibleFiles.filter(f => f.startsWith(fullPrefix));
                    // --- End Placeholder ---

                    if (token.isCancellationRequested) {
                        console.log("S3 Autocomplete cancelled.");
                        return undefined;
                    }

                    const completionItems = mockFiles.map(filePath => {
                        // Extract the part of the path *after* the current prefix
                        const suggestion = filePath.substring(fullPrefix.length);
                        const item = new CompletionItem(suggestion, CompletionItemKind.File);

                        // Define the range that will be replaced by the completion
                        // It should start right after the last '/' typed by the user within the path string
                        const replaceStartIndex = linePrefix.lastIndexOf('/') + 1;
                        // The end position is the current cursor position
                        item.range = new Range(position.line, replaceStartIndex, position.line, position.character);

                        item.insertText = suggestion; // Text to insert
                        item.detail = `S3 File`; // Keep it simple
                        item.documentation = `Full path: ${filePath}`; // Tooltip info
                        // filterText helps VS Code filter suggestions as user types more
                        item.filterText = suggestion; // Use the suggestion itself for filtering

                        return item;
                    });

                    console.log("S3 Completion items:", completionItems.map(i => i.label));
                    return completionItems;

                } catch (error) {
                    console.error("Error fetching S3 completions:", error);
                    // Avoid showing an error message for every keystroke if buckconn fails
                    // vscode.window.showErrorMessage(`Failed to get S3 suggestions: ${error instanceof Error ? error.message : String(error)}`);
                    return undefined;
                }
            }
        }

    };

    // Register the completion provider for typescript files, triggering on '/'
    commandDisposables.push(
        vscode.languages.registerCompletionItemProvider(
            // Apply to files with 'file' scheme (standard editor files) and 'typescript' language
            { scheme: 'file', language: 'typescript' },
            s3CompletionProvider,
            '/' // Trigger completion when '/' is typed
        )
    );

    //     console.log('S3 Autocomplete provider registered for TypeScript files.');
})
