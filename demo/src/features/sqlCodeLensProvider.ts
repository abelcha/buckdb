import * as vscode from 'vscode'
import { extractFromStatementsAST } from '@buckdb/src/extract-from-statements' // Adjust path as needed

export class SqlCodeLensProvider implements vscode.CodeLensProvider {
    // Optional: Add an event emitter if you want the lenses to refresh on document changes
    // private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    // public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    // constructor() {
    //     // Example: Refresh lenses when the document is saved
    //     vscode.workspace.onDidSaveTextDocument(() => {
    //         this._onDidChangeCodeLenses.fire();
    //     });
    // }

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens[]> {
        const codeLenses: vscode.CodeLens[] = []
        if (document.languageId !== 'typescript' && document.languageId !== 'typescriptreact') {
            return [] // Only process TS/TSX files
        }

        try {
            const extractedParts = extractFromStatementsAST(document.getText())

            for (const part of extractedParts) {
                // lineStart is 1-based, Range needs 0-based
                // const lineIndex = part.lineEnd 
                const lineIndex = part.lineStart 
                if (lineIndex < 0 || lineIndex >= document.lineCount) continue // Basic bounds check

                const line = document.lineAt(lineIndex)
                // Find the first non-whitespace character to place the lens accurately
                const firstNonWhitespace = line.firstNonWhitespaceCharacterIndex
                const range = new vscode.Range(lineIndex, firstNonWhitespace, lineIndex, firstNonWhitespace)

                const command: vscode.Command = {
                    tooltip: 'xxxx',
                    title: '================== ⌘ ↩︎ [Run Query] ===========',
                    command: 'buckdb.runQueryFromLine', // Command to be registered in main.v2.ts
                    arguments: [lineIndex, 10], // Pass the 0-based line index
                }
                codeLenses.push(new vscode.CodeLens(range, command))
            }
        } catch (error) {
            console.error('Error extracting statements for CodeLens:', error)
            // Optionally show a warning to the user if extraction fails
            // vscode.window.showWarningMessage("Could not parse BuckDB statements for Run Query lenses.");
        }

        return codeLenses
    }

    // Optional: Implement resolveCodeLens if you need to compute command details lazily
    // public resolveCodeLens?(codeLens: vscode.CodeLens, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens> {
    //     // If command details were complex to compute, do it here
    //     return codeLens;
    // }
}
