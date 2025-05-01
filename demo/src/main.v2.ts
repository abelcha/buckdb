import onSaveCommand from './save-command';
import './style.css';
import { ExtensionHostKind, registerExtension } from '@codingame/monaco-vscode-api/extensions';
import { runActiveTypeScriptFile } from './features/runTs';
import type * as vsCodeApi from "vscode";
import { transformedScheme, scrollSyncMap, openTransformedViewAndSync } from './sync-view';
import './imports.ts';
import { TextDocumentContentProvider, Uri, window as VsCodeWindow, workspace as VsCodeWorkspace, EventEmitter, TextEditor, Disposable, OutputChannel } from 'vscode'; // Added imports, TextDocument
import { transformedProvider } from './transform-text';
import { extractFromStatementsAST } from './extract-from-statements';
import { s3CompletionProvider } from './completion-provider.ts';
type VsCodeApi = typeof vsCodeApi;

const { getApi } = registerExtension(
    {
        name: 'showp', publisher: 'codingame', version: '1.0.0', engines: { vscode: '*' },
        contributes: {
            "menus": {
                "editor/title": [{ "command": "run.activeTypeScriptFile", "group": "navigation@1" }, { "command": "run.activeCell", "group": "navigation@1" }],
                "commandPalette": [{ "command": "run.activeTypeScriptFile", "when": "resourceLangId == typescript" }, { "command": "extract.fromStatements", "when": "resourceLangId == typescript" }]
            }, commands: [{ command: 'show-transformed-view', title: 'Show Transformed View' }, { command: 'run.activeTypeScriptFile', title: 'Run Active TypeScript File', icon: "$(play)" }, { command: 'run.activeCell', title: 'Run current cell', icon: "$(play)" }, { command: 'extract.fromStatements', title: 'Extract "from" Statements' }]
        },
        enabledApiProposals: ['aiRelatedInformation'],
    },
    ExtensionHostKind.LocalProcess,
);


const commandDisposables: Disposable[] = [];
let runOutputChannel: OutputChannel | undefined;

void getApi().then(async (vscode: VsCodeApi) => {
    commandDisposables.forEach(d => d.dispose());
    commandDisposables.length = 0;
    runOutputChannel?.dispose();
    runOutputChannel = undefined;
    scrollSyncMap.forEach(sync => {
        sync.sourceDisposable.dispose();
        sync.targetDisposable.dispose();
    });
    scrollSyncMap.clear();
    commandDisposables.push(vscode.workspace.registerTextDocumentContentProvider(transformedScheme, transformedProvider));
    commandDisposables.push(vscode.commands.registerCommand('show-transformed-view', async () => {
        const activeEditor = VsCodeWindow.activeTextEditor;
        return activeEditor ? await openTransformedViewAndSync(activeEditor, transformedProvider, vscode) : vscode.window.showWarningMessage('No active editor found to show transformed view for.');
    }));

    const getTransformedUri = (editor: TextEditor | undefined): Uri | undefined => {
        if (editor && editor.document.uri.scheme !== transformedScheme && editor.document.uri.scheme !== 'transx') {
            const originalUri = editor.document.uri;
            return Uri.parse(`${transformedScheme}:/${originalUri.toString()}`);
        }
        return undefined;
    };

    commandDisposables.push(VsCodeWindow.onDidChangeActiveTextEditor(async editor => editor && await openTransformedViewAndSync(editor, transformedProvider, vscode)));
    commandDisposables.push(VsCodeWorkspace.onDidChangeTextDocument(event => {
        if (event.document.uri.scheme !== transformedScheme && event.document.uri.scheme !== 'transx') {
            const sourceEditor = VsCodeWindow.visibleTextEditors.find(e => e.document.uri === event.document.uri) ?? VsCodeWindow.activeTextEditor;
            if (sourceEditor && sourceEditor.document.uri === event.document.uri) {
                const targetUri = getTransformedUri(sourceEditor);
                return targetUri && transformedProvider.update(targetUri);
            }
        }
    }));

    const myScheme = 'transx'; // Keep this scheme local if only used here
    const myProvider = new class implements TextDocumentContentProvider {
        onDidChangeEmitter = new EventEmitter<Uri>(); // Use imported EventEmitter
        onDidChange = this.onDidChangeEmitter.event;
        provideTextDocumentContent = () => ''
    };
    commandDisposables.push(vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider));

    const initialEditor = VsCodeWindow.activeTextEditor;
    if (initialEditor) {
        await openTransformedViewAndSync(initialEditor, transformedProvider, vscode);
    }
    commandDisposables.push(onSaveCommand(vscode));
    if (!runOutputChannel) {
        runOutputChannel = vscode.window.createOutputChannel("TypeScript Runner");
    }
    commandDisposables.push(vscode.commands.registerCommand('run.activeTypeScriptFile', () => runActiveTypeScriptFile(VsCodeWindow, runOutputChannel!)));

    commandDisposables.push(vscode.commands.registerCommand('run.activeCell', async (a, b, c) => {
        const cursorPosition = VsCodeWindow.activeTextEditor?.selection.active;
        await runActiveTypeScriptFile(VsCodeWindow, runOutputChannel!, cursorPosition.line);
    }));

    commandDisposables.push(vscode.commands.registerCommand('extract.fromStatements', () => {
        const activeEditor = VsCodeWindow.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showWarningMessage('No active editor to extract statements from.');
            return;
        }
        if (!runOutputChannel) {
            runOutputChannel = vscode.window.createOutputChannel("TypeScript Runner");
        }

        const documentText = activeEditor.document.getText();
        try {
            // extractFromStatementsAST now returns { chain: string | null, param: string }[]
            const extractedParts = extractFromStatementsAST(documentText);
            // extractedParts.forEach()
        } catch (error) {
            console.error("Error extracting 'from' statements:", error);
            vscode.window.showErrorMessage(`Error extracting statements: ${error instanceof Error ? error.message : String(error)}`);
            runOutputChannel.appendLine(`\n--- ERROR ---\nFailed to extract statements: ${error instanceof Error ? error.message : String(error)}`);
            runOutputChannel.show(true);
        }
    }));


    commandDisposables.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'typescript' }, s3CompletionProvider, '/'));

})
