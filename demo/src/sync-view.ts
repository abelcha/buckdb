import * as monaco from 'monaco-editor';
// Import languages API
import { TextDocumentContentProvider, Uri, window as VsCodeWindow, workspace as VsCodeWorkspace, TextEditor, ViewColumn, languages as VsCodeLanguages } from 'vscode';
import type { IDisposable } from 'monaco-editor';


import type * as vsCodeApi from "vscode"
type VsCodeApi = typeof vsCodeApi;
export const transformedScheme = 'transformed';
export const scrollSyncMap = new Map<string, { sourceDisposable: IDisposable, targetDisposable: IDisposable }>();


export async function openTransformedViewAndSync(
    editor: TextEditor, // Use imported type
    // Add provider argument back
    transformedProvider: TextDocumentContentProvider & { update(uri: Uri): void },
    vscodeApi: VsCodeApi
) {
    // Ignore if editor is invalid or uses a scheme we don't want to transform
    // Check against transformedScheme again
    if (!editor || editor.document.uri.scheme === transformedScheme || editor.document.uri.scheme === 'cowsay') {
        // console.log('[AutoOpenProvider] Ignoring editor change for scheme:', editor?.document.uri.scheme);
        return;
    }

    const originalUri = editor.document.uri;
    const originalUriString = originalUri.toString();

    // Construct the URI for the TextDocumentContentProvider (Reverted to original)
    const targetUri = Uri.parse(`${transformedScheme}:/${originalUri.toString()}`);

    try {
        // console.log(`[AutoOpenProvider] Opening/syncing transformed view for: ${originalUri.toString()} as ${targetUri.toString()}`); // Original log commented
        // Ensure the provider is updated *before* opening the document
        transformedProvider.update(targetUri);
        const doc = await VsCodeWorkspace.openTextDocument(targetUri); // Open document from provider


        // Check if the transformed view is already visible for this URI
        const isAlreadyVisible = VsCodeWindow.visibleTextEditors.some(
            visibleEditor => visibleEditor.document.uri.toString() === targetUri.toString()
        );

        if (!isAlreadyVisible) {
            const res = await VsCodeWindow.showTextDocument(doc, {
                viewColumn: ViewColumn.Beside,
                preserveFocus: true,
                preview: true,
            });
            // console.log({ res })
            // console.log(`[AutoOpenProvider] Successfully showed transformed document: ${targetUri.toString()}`);

            // --- Set Language to SQL (Removed due to "Unknown language id: sql" error) ---
            // const targetEditor = VsCodeWindow.visibleTextEditors.find(
            //     e => e.document.uri.toString() === targetUri.toString()
            // );
            // if (targetEditor) {
            //     try {
            //         await VsCodeLanguages.setTextDocumentLanguage(targetEditor.document, 'sql');
            //         console.log(`[AutoOpenProvider] Set language to SQL for ${targetUri.toString()}`);
            //     } catch (langError) {
            //          console.error(`[AutoOpenProvider] Error setting language to SQL for ${targetUri.toString()}:`, langError);
            //     }
            // } else {
            //      console.warn(`[AutoOpenProvider] Could not find target editor instance to set language for ${targetUri.toString()}`);
            // }
            // --- End Set Language ---

        } else {
            // console.log(`[AutoOpenProvider] Transformed document already visible: ${targetUri.toString()}`);
            // Ensure content is updated even if already visible by firing provider update
            transformedProvider.update(targetUri);

            // --- Set Language to SQL (Removed due to "Unknown language id: sql" error) ---
            //  const targetEditor = VsCodeWindow.visibleTextEditors.find(
            //     e => e.document.uri.toString() === targetUri.toString()
            // );
            // if (targetEditor && targetEditor.document.languageId !== 'sql') {
            //      try {
            //          await VsCodeLanguages.setTextDocumentLanguage(targetEditor.document, 'sql');
            //          console.log(`[AutoOpenProvider] Set language to SQL for already visible editor ${targetUri.toString()}`);
            //      } catch (langError) {
            //          console.error(`[AutoOpenProvider] Error setting language to SQL for already visible editor ${targetUri.toString()}:`, langError);
            //      }
            // }
            // --- End Set Language ---
            transformedProvider.update(targetUri); // Keep the update call
        }


        // --- Setup Scroll Synchronization ---
        const setupScrollSync = () => {
            const transformedUriString = targetUri.toString(); // Use the provider URI

            // Clear existing sync for this original URI if it exists
            if (scrollSyncMap.has(originalUriString)) {
                const oldSync = scrollSyncMap.get(originalUriString);
                oldSync?.sourceDisposable.dispose();
                oldSync?.targetDisposable.dispose();
                scrollSyncMap.delete(originalUriString);
                // console.log(`[ScrollSyncProvider] Disposed previous sync for ${originalUriString}`);
            }

            // Find the Monaco editor instances
            let sourceMonacoEditor: monaco.editor.ICodeEditor | undefined;
            let transformedMonacoEditor: monaco.editor.ICodeEditor | undefined;

            // It might take a moment for the editor to be fully registered after showTextDocument
            // We'll retry finding the editors a few times with a short delay
            let attempts = 0;
            const maxAttempts = 10;
            const findEditorsInterval = setInterval(() => {
                attempts++;
                const editors = monaco.editor.getEditors();
                // Find source editor based on the original URI
                sourceMonacoEditor = editors.find(e => e.getModel()?.uri.toString() === originalUriString);
                // Find transformed editor based on the provider URI (Reverted to original)
                transformedMonacoEditor = editors.find(e => e.getModel()?.uri.toString() === transformedUriString);


                if ((sourceMonacoEditor && transformedMonacoEditor) || attempts >= maxAttempts) {
                    clearInterval(findEditorsInterval);

                    if (sourceMonacoEditor && transformedMonacoEditor) {
                        // console.log(`[ScrollSyncProvider] Found Monaco editors for sync: ${originalUriString} <-> ${transformedUriString}`);
                        let isSyncing = false; // Prevent feedback loop

                        const sourceDisposable = sourceMonacoEditor.onDidScrollChange(e => {
                            if (!isSyncing && transformedMonacoEditor && (e.scrollTopChanged || e.scrollLeftChanged)) {
                                isSyncing = true;
                                transformedMonacoEditor.setScrollPosition({
                                    scrollTop: e.scrollTop,
                                    scrollLeft: e.scrollLeft
                                });
                                // Use requestAnimationFrame to reset the flag after the browser has likely processed the scroll
                                requestAnimationFrame(() => { isSyncing = false; });
                            }
                        });

                        const targetDisposable = transformedMonacoEditor.onDidScrollChange(e => {
                            if (!isSyncing && sourceMonacoEditor && (e.scrollTopChanged || e.scrollLeftChanged)) {
                                isSyncing = true;
                                sourceMonacoEditor.setScrollPosition({
                                    scrollTop: e.scrollTop,
                                    scrollLeft: e.scrollLeft
                                });
                                requestAnimationFrame(() => { isSyncing = false; });
                            }
                        });

                        // Store the disposables
                        scrollSyncMap.set(originalUriString, { sourceDisposable, targetDisposable });
                        // console.log(`[ScrollSyncProvider] Setup complete for ${originalUriString}`);

                    } else {
                        console.warn(`[ScrollSyncProvider] Failed to find Monaco editors for sync after ${attempts} attempts for ${originalUriString} / ${transformedUriString}`);
                    }
                }
            }, 100); // Check every 100ms
        };

        setupScrollSync();
        // --- End Setup Scroll Synchronization ---

    } catch (error) {
        // Log error with provider URI
        console.error(`[AutoOpenProvider] Error opening/syncing transformed document ${targetUri.toString()}:`, error);
    }
}
