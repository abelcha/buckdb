import * as monaco from 'monaco-editor'
import type { IDisposable } from 'monaco-editor'
import { languages as VsCodeLanguages, TextDocumentContentProvider, TextEditor, Uri, ViewColumn, window as VsCodeWindow, workspace as VsCodeWorkspace } from 'vscode'
import type * as vsCodeApi from 'vscode'
import { extractFromStatementsAST } from './extract-from-statements' // Added for CodeLens
type VsCodeApi = typeof vsCodeApi

// Flag to ensure CodeLens provider is registered only once
let transformedCodeLensProviderRegistered = false

class TransformedSqlCodeLensProvider implements vsCodeApi.CodeLensProvider {
    private vscodeApi: VsCodeApi

    constructor(vscodeApiInstance: VsCodeApi) {
        this.vscodeApi = vscodeApiInstance
    }

    public provideCodeLenses(document: vsCodeApi.TextDocument, token: vsCodeApi.CancellationToken): vsCodeApi.ProviderResult<vsCodeApi.CodeLens[]> {
        const codeLenses: vsCodeApi.CodeLens[] = []
        if (document.uri.scheme !== transformedScheme) {
            return []
        }

        const queryParams = new URLSearchParams(document.uri.query)
        const originalUriString = queryParams.get('original')

        if (!originalUriString) {
            console.warn('TransformedSqlCodeLensProvider: Could not find original URI in query for document:', document.uri.toString())
            return []
        }

        const originalUri = this.vscodeApi.Uri.parse(decodeURIComponent(originalUriString))
        const originalDoc = this.vscodeApi.workspace.textDocuments.find(doc => doc.uri.toString() === originalUri.toString())

        if (!originalDoc) {
            console.warn(`TransformedSqlCodeLensProvider: Original document ${originalUri.toString()} not found.`)
            return []
        }

        try {
            const extractedParts = extractFromStatementsAST(originalDoc.getText())

            for (const part of extractedParts) {
                const lineIndex = part.lineStart - 1 // 0-based

                if (lineIndex < 0 || lineIndex >= document.lineCount) {
                    // console.warn(`TransformedSqlCodeLensProvider: Line index ${lineIndex} out of bounds for transformed doc ${document.uri.toString()}`);
                    continue
                }

                const line = document.lineAt(lineIndex)
                const firstNonWhitespace = line.firstNonWhitespaceCharacterIndex
                const range = new this.vscodeApi.Range(lineIndex, firstNonWhitespace, lineIndex, firstNonWhitespace)

                const command: vsCodeApi.Command = {
                    tooltip: 'xxxx', // Matching SqlCodeLensProvider
                    title: '🦅 Run Query',
                    command: 'buckdb.runQueryFromLine',
                    arguments: [lineIndex + 1], // Matching SqlCodeLensProvider (0-based line index of original TS)
                }
                codeLenses.push(new this.vscodeApi.CodeLens(range, command))
            }
        } catch (error) {
            console.error('Error extracting statements for TransformedSqlCodeLensProvider:', error)
        }

        return codeLenses
    }
}

export const transformedScheme = 'transformed'
export const scrollSyncMap = new Map<string, { sourceDisposable: IDisposable; targetDisposable: IDisposable }>()

export async function openTransformedViewAndSync(
    editor: TextEditor,
    transformedProvider: TextDocumentContentProvider & { update(uri: Uri): void },
    vscodeApi: VsCodeApi,
) {
    if (!editor || editor.document.uri.scheme === transformedScheme || editor.document.uri.scheme === 'cowsay') return

    const originalUri = editor.document.uri
    const originalUriString = originalUri.toString()
    // Modify the path for the label, store original URI in query
    const targetPath = originalUri.path.replace(/\.(ts|tsx)$/, '.sql')
    const targetUri = Uri.parse(`${transformedScheme}:${targetPath}?original=${encodeURIComponent(originalUriString)}`)

    try {
        // Update provider *before* opening, as it might be needed immediately
        transformedProvider.update(targetUri)
        const doc = await VsCodeWorkspace.openTextDocument(targetUri)
        const isAlreadyVisible = VsCodeWindow.visibleTextEditors.some(
            visibleEditor => visibleEditor.document.uri.toString() === targetUri.toString(),
        )

        if (!isAlreadyVisible) {
            await VsCodeWindow.showTextDocument(doc, {
                viewColumn: ViewColumn.Beside,
                preserveFocus: true,
                preview: true,
            })
        } else {
            transformedProvider.update(targetUri)
        }

        const setupScrollSync = () => {
            const transformedUriString = targetUri.toString()
            if (scrollSyncMap.has(originalUriString)) {
                const oldSync = scrollSyncMap.get(originalUriString)
                oldSync?.sourceDisposable.dispose()
                oldSync?.targetDisposable.dispose()
                scrollSyncMap.delete(originalUriString)
            }
            let sourceMonacoEditor: monaco.editor.ICodeEditor | undefined
            let transformedMonacoEditor: monaco.editor.ICodeEditor | undefined
            let attempts = 0
            const maxAttempts = 10
            const findEditorsInterval = setInterval(() => {
                attempts++
                const editors = monaco.editor.getEditors()
                // Find editors using the correct URIs
                sourceMonacoEditor = editors.find(e => e.getModel()?.uri.toString() === originalUriString)
                transformedMonacoEditor = editors.find(e => e.getModel()?.uri.toString() === targetUri.toString()) // Use the new targetUri string
                if ((sourceMonacoEditor && transformedMonacoEditor) || attempts >= maxAttempts) {
                    clearInterval(findEditorsInterval)
                    if (sourceMonacoEditor && transformedMonacoEditor) {
                        let isSyncing = false
                        const sourceDisposable = sourceMonacoEditor.onDidScrollChange(e => {
                            if (!isSyncing && (e.scrollTopChanged || e.scrollLeftChanged)) {
                                isSyncing = true
                                transformedMonacoEditor!.setScrollPosition({
                                    scrollTop: e.scrollTop,
                                    scrollLeft: e.scrollLeft,
                                })
                                requestAnimationFrame(() => (isSyncing = false))
                            }
                        })
                        const targetDisposable = transformedMonacoEditor.onDidScrollChange(e => {
                            if (!isSyncing && (e.scrollTopChanged || e.scrollLeftChanged)) {
                                isSyncing = true
                                sourceMonacoEditor!.setScrollPosition({
                                    scrollTop: e.scrollTop,
                                    scrollLeft: e.scrollLeft,
                                })
                                requestAnimationFrame(() => (isSyncing = false))
                            }
                        })
                        scrollSyncMap.set(originalUriString, { sourceDisposable, targetDisposable })
                    }
                }
            }, 100)
        }

        setupScrollSync()

        // Register the CodeLens provider for the transformed view if not already registered
        if (!transformedCodeLensProviderRegistered && vscodeApi) {
            try {
                vscodeApi.languages.registerCodeLensProvider(
                    { scheme: transformedScheme, language: 'sql' }, // Assuming transformed content is SQL
                    new TransformedSqlCodeLensProvider(vscodeApi),
                )
                transformedCodeLensProviderRegistered = true
                console.log('TransformedSqlCodeLensProvider registered for scheme:', transformedScheme)
            } catch (registrationError) {
                console.error('Failed to register TransformedSqlCodeLensProvider:', registrationError)
            }
        }
    } catch (error) {
        console.error(`Error opening/syncing transformed document ${targetUri.toString()}:`, error)
    }
}
