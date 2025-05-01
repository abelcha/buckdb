import * as monaco from 'monaco-editor';
import {
    TextDocumentContentProvider,
    Uri,
    window as VsCodeWindow,
    workspace as VsCodeWorkspace,
    TextEditor,
    ViewColumn,
    languages as VsCodeLanguages,
} from 'vscode';
import type { IDisposable } from 'monaco-editor';
import type * as vsCodeApi from 'vscode';
type VsCodeApi = typeof vsCodeApi;

export const transformedScheme = 'transformed';
export const scrollSyncMap = new Map<string, { sourceDisposable: IDisposable; targetDisposable: IDisposable }>();

export async function openTransformedViewAndSync(
    editor: TextEditor,
    transformedProvider: TextDocumentContentProvider & { update(uri: Uri): void },
    vscodeApi: VsCodeApi
) {
    if (!editor || editor.document.uri.scheme === transformedScheme || editor.document.uri.scheme === 'cowsay') return;

    const originalUri = editor.document.uri;
    const originalUriString = originalUri.toString();
    // Modify the path for the label, store original URI in query
    const targetPath = originalUri.path.replace(/\.(ts|tsx)$/, '.sql');
    const targetUri = Uri.parse(`${transformedScheme}:${targetPath}?original=${encodeURIComponent(originalUriString)}`);


    try {
        // Update provider *before* opening, as it might be needed immediately
        transformedProvider.update(targetUri);
        const doc = await VsCodeWorkspace.openTextDocument(targetUri);
        const isAlreadyVisible = VsCodeWindow.visibleTextEditors.some(
            visibleEditor => visibleEditor.document.uri.toString() === targetUri.toString()
        );

        if (!isAlreadyVisible) {
            await VsCodeWindow.showTextDocument(doc, {
                viewColumn: ViewColumn.Beside,
                preserveFocus: true,
                preview: true,
            });
        } else {
            transformedProvider.update(targetUri);
        }

        const setupScrollSync = () => {
            const transformedUriString = targetUri.toString();
            if (scrollSyncMap.has(originalUriString)) {
                const oldSync = scrollSyncMap.get(originalUriString);
                oldSync?.sourceDisposable.dispose();
                oldSync?.targetDisposable.dispose();
                scrollSyncMap.delete(originalUriString);
            }
            let sourceMonacoEditor: monaco.editor.ICodeEditor | undefined;
            let transformedMonacoEditor: monaco.editor.ICodeEditor | undefined;
            let attempts = 0;
            const maxAttempts = 10;
            const findEditorsInterval = setInterval(() => {
                attempts++;
                const editors = monaco.editor.getEditors();
                // Find editors using the correct URIs
                sourceMonacoEditor = editors.find(e => e.getModel()?.uri.toString() === originalUriString);
                transformedMonacoEditor = editors.find(e => e.getModel()?.uri.toString() === targetUri.toString()); // Use the new targetUri string
                if ((sourceMonacoEditor && transformedMonacoEditor) || attempts >= maxAttempts) {
                    clearInterval(findEditorsInterval);
                    if (sourceMonacoEditor && transformedMonacoEditor) {
                        let isSyncing = false;
                        const sourceDisposable = sourceMonacoEditor.onDidScrollChange(e => {
                            if (!isSyncing && (e.scrollTopChanged || e.scrollLeftChanged)) {
                                isSyncing = true;
                                transformedMonacoEditor!.setScrollPosition({
                                    scrollTop: e.scrollTop,
                                    scrollLeft: e.scrollLeft,
                                });
                                requestAnimationFrame(() => (isSyncing = false));
                            }
                        });
                        const targetDisposable = transformedMonacoEditor.onDidScrollChange(e => {
                            if (!isSyncing && (e.scrollTopChanged || e.scrollLeftChanged)) {
                                isSyncing = true;
                                sourceMonacoEditor!.setScrollPosition({
                                    scrollTop: e.scrollTop,
                                    scrollLeft: e.scrollLeft,
                                });
                                requestAnimationFrame(() => (isSyncing = false));
                            }
                        });
                        scrollSyncMap.set(originalUriString, { sourceDisposable, targetDisposable });
                    }
                }
            }, 100);
        };

        setupScrollSync();
    } catch (error) {
        console.error(`Error opening/syncing transformed document ${targetUri.toString()}:`, error);
    }
}
