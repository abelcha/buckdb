import onSaveCommand from './save-command'
import './style.css'
import { ExtensionHostKind, registerExtension } from '@codingame/monaco-vscode-api/extensions'
import type * as vsCodeApi from 'vscode'
import { runActiveTypeScriptFile } from './features/runTs'
import { openTransformedViewAndSync, scrollSyncMap, transformedScheme } from './sync-view'
import './imports.ts'
import { Disposable, EventEmitter, OutputChannel, TextDocumentContentProvider, TextEditor, Uri, window as VsCodeWindow, workspace as VsCodeWorkspace } from 'vscode' // Added imports, TextDocument, CodeLensProvider
import { pathCompletionProvider } from './completion-provider.ts'
import { extractSpecialCalls } from '@buckdb/src/extractor'
import { SqlCodeLensProvider } from './features/sqlCodeLensProvider' // Import the new CodeLensProvider
import { transformedProvider } from './transform-text'
type VsCodeApi = typeof vsCodeApi

const { getApi } = registerExtension(
    {
        name: 'showp',
        publisher: 'codingame',
        version: '1.0.0',
        engines: { vscode: '*' },
        contributes: {
            'menus': {
                'editor/title': [{ 'command': 'run.activeTypeScriptFile', 'group': 'navigation@1' }, { 'command': 'run.activeCell', 'group': 'navigation@1' }],
                'commandPalette': [
                    { 'command': 'run.activeTypeScriptFile', 'when': 'resourceLangId == typescript' },
                    { 'command': 'extract.fromStatements', 'when': 'resourceLangId == typescript' },
                    { 'command': 'buckdb.toggleDiskSave' }, // Add command to palette
                ],
            },
            commands: [
                { command: 'show-transformed-view', title: 'Show Transformed View' },
                { command: 'run.activeTypeScriptFile', title: 'Run Active TypeScript File', icon: '$(play)' },
                { command: 'run.activeCell', title: 'Run current cell', icon: '$(play)' },
                { command: 'extract.fromStatements', title: 'Extract "from" Statements' },
                { command: 'buckdb.toggleDiskSave', title: 'Toggle Disk Save On/Off' }, // Define command title
            ],
        },
        enabledApiProposals: [],
    },
    ExtensionHostKind.LocalProcess,
)

const commandDisposables: Disposable[] = []
let runOutputChannel: OutputChannel | undefined

// Initialize disk save state from localStorage, default to true
const initialSaveState = localStorage.getItem('buckdbDiskSaveEnabled')
let isDiskSaveEnabled = initialSaveState === null ? true : initialSaveState === 'true'

// Helper function to load content from localStorage if needed, ONLY for demo.ts
const loadVirtualContentIfNeeded = async (editor: TextEditor | undefined, vscodeApi: VsCodeApi) => {
    // Check if editor exists, scheme is file, disk save is OFF, AND it's demo.ts
    if (editor && editor.document.uri.scheme === 'file' && !isDiskSaveEnabled && editor.document.uri.fsPath.endsWith('/demo.ts')) {
        const filePath = editor.document.uri.fsPath
        const storageKey = `buckdbVirtualFile:${filePath}` // Key remains specific to the file path
        const storedContent = localStorage.getItem(storageKey)

        if (storedContent !== null && editor.document.getText() !== storedContent) {
            const success = await editor.edit(editBuilder => {
                const fullRange = new vscodeApi.Range(
                    new vscodeApi.Position(0, 0),
                    editor.document.positionAt(editor.document.getText().length),
                )
                editBuilder.replace(fullRange, storedContent)
            })
            if (success) {
                console.log(`Loaded virtual content for ${filePath}`) // Minimal log
            } else {
                console.error(`Failed to apply virtual content for ${filePath}`)
            }
        }
    }
}

void getApi().then(async (vscode: VsCodeApi) => {
    // Show initial state on load (optional, but helpful for user)
    vscode.window.showInformationMessage(`Disk Save is currently ${isDiskSaveEnabled ? 'Enabled' : 'Disabled'}.`)

    commandDisposables.forEach(d => d.dispose())
    commandDisposables.length = 0
    runOutputChannel?.dispose()
    runOutputChannel = undefined
    scrollSyncMap.forEach(sync => {
        sync.sourceDisposable.dispose()
        sync.targetDisposable.dispose()
    })
    scrollSyncMap.clear()
    commandDisposables.push(vscode.workspace.registerTextDocumentContentProvider(transformedScheme, transformedProvider))
    commandDisposables.push(vscode.commands.registerCommand('show-transformed-view', async () => {
        const activeEditor = VsCodeWindow.activeTextEditor
        return activeEditor ? await openTransformedViewAndSync(activeEditor, transformedProvider, vscode) : vscode.window.showWarningMessage('No active editor found to show transformed view for.')
    }))

    // Updated getTransformedUri to match the new structure used in sync-view.ts
    const getTransformedUri = (editor: TextEditor | undefined): Uri | undefined => {
        if (editor && editor.document.uri.scheme !== transformedScheme && editor.document.uri.scheme !== 'transx') {
            const originalUri = editor.document.uri
            const originalUriString = originalUri.toString()
            // Construct the URI with .sql path and original URI in query
            const targetPath = originalUri.path.replace(/\.(ts|tsx)$/, '.sql')
            return Uri.parse(`${transformedScheme}:${targetPath}?original=${encodeURIComponent(originalUriString)}`)
        }
        return undefined
    }

    commandDisposables.push(VsCodeWindow.onDidChangeActiveTextEditor(async editor => {
        if (editor) {
            await openTransformedViewAndSync(editor, transformedProvider, vscode)
            await loadVirtualContentIfNeeded(editor, vscode)
        }
    }))
    commandDisposables.push(VsCodeWorkspace.onDidChangeTextDocument(event => {
        // This listener updates the transformed view, no changes needed here for virtual loading
        if (event.document.uri.scheme !== transformedScheme && event.document.uri.scheme !== 'transx') {
            const sourceEditor = VsCodeWindow.visibleTextEditors.find(e => e.document.uri === event.document.uri) ?? VsCodeWindow.activeTextEditor
            if (sourceEditor && sourceEditor.document.uri === event.document.uri) {
                const targetUri = getTransformedUri(sourceEditor)
                return targetUri && transformedProvider.update(targetUri)
            }
        }
    }))

    const myScheme = 'transx' // Keep this scheme local if only used here
    const myProvider = new class implements TextDocumentContentProvider {
        onDidChangeEmitter = new EventEmitter<Uri>() // Use imported EventEmitter
        onDidChange = this.onDidChangeEmitter.event
        provideTextDocumentContent = () => ''
    }()
    commandDisposables.push(vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider))

    const initialEditor = VsCodeWindow.activeTextEditor
    if (initialEditor) {
        await openTransformedViewAndSync(initialEditor, transformedProvider, vscode)
        // Load virtual content for demo.ts if it's the initial editor
        await loadVirtualContentIfNeeded(initialEditor, vscode)
    }
    // Pass a function to check the current save state to onSaveCommand
    commandDisposables.push(onSaveCommand(vscode, () => isDiskSaveEnabled))
    if (!runOutputChannel) {
        runOutputChannel = vscode.window.createOutputChannel('TypeScript Runner')
    }
    // Keep existing commands, but note runActiveTypeScriptFile signature changed
    commandDisposables.push(vscode.commands.registerCommand('run.activeTypeScriptFile', () => {
        if (!runOutputChannel) runOutputChannel = vscode.window.createOutputChannel('TypeScript Runner') // Keep channel for this command for now
        runActiveTypeScriptFile(VsCodeWindow /* No channel needed */) // Call updated function
    }))

    commandDisposables.push(vscode.commands.registerCommand('run.activeCell', async (a, b, c) => {
        const cursorPosition = VsCodeWindow.activeTextEditor?.selection.active
        if (!runOutputChannel) runOutputChannel = vscode.window.createOutputChannel('TypeScript Runner') // Keep channel for this command for now
        await runActiveTypeScriptFile(VsCodeWindow, /* No channel needed */ cursorPosition.line) // Call updated function
    }))

    // Register the command triggered by the CodeLens
    commandDisposables.push(vscode.commands.registerCommand('buckdb.runQueryFromLine', async (lineIndex: number) => {
        console.log('RUN QUERY FROM LINE', lineIndex)
        // Call the updated runActiveTypeScriptFile function without the channel
        await runActiveTypeScriptFile(VsCodeWindow, lineIndex)
    }))

    commandDisposables.push(vscode.commands.registerCommand('extract.fromStatements', () => {
        const activeEditor = VsCodeWindow.activeTextEditor
        if (!activeEditor) {
            vscode.window.showWarningMessage('No active editor to extract statements from.')
            return
        }
        if (!runOutputChannel) {
            runOutputChannel = vscode.window.createOutputChannel('TypeScript Runner')
        }

        const documentText = activeEditor.document.getText()
        try {
            const extractedParts = extractSpecialCalls(documentText)
            console.table(extractedParts)
        } catch (error) {
            console.error("Error extracting 'from' statements:", error)
            vscode.window.showErrorMessage(`Error extracting statements: ${error instanceof Error ? error.message : String(error)}`)
            runOutputChannel.appendLine(`\n--- ERROR ---\nFailed to extract statements: ${error instanceof Error ? error.message : String(error)}`)
            runOutputChannel.show(true)
        }
    }))

    // Register the path completion provider for TypeScript files.
    // Trigger automatically when '/' is typed.
    commandDisposables.push(vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'typescript' }, pathCompletionProvider, '/'))

    // Register the CodeLensProvider for TypeScript files
    const tsFileSelector = [{ language: 'typescript' }, { language: 'typescriptreact' }]
    commandDisposables.push(vscode.languages.registerCodeLensProvider(tsFileSelector, new SqlCodeLensProvider()))

    // Register the command to toggle disk saving
    commandDisposables.push(vscode.commands.registerCommand('buckdb.toggleDiskSave', () => {
        isDiskSaveEnabled = !isDiskSaveEnabled
        // Update localStorage
        localStorage.setItem('buckdbDiskSaveEnabled', String(isDiskSaveEnabled))
        vscode.window.showInformationMessage(`Disk Save ${isDiskSaveEnabled ? 'Enabled' : 'Disabled'}`)
    }))
})
