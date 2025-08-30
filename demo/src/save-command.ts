import { TextDocument } from 'vscode'

// Define the type for the checker function
type IsDiskSaveEnabledChecker = () => boolean

export const saveDocumentLocalStorage = (filePath: string, content: string) => {
    console.info(`[SaveListener] Disk save is disabled, saving ${filePath} to localStorage instead.`) // Optional log
    // Disk save is disabled AND it's demo.ts, save to localStorage instead
    const storageKey = `buckdbVirtualFile:${filePath}`
    try {
        localStorage.setItem(storageKey, content)
        // console.log(`[SaveListener] Saved ${filePath} to localStorage.`); // Optional log
        // Optionally show a subtle status bar message instead of a notification
        console.info(`Saved ${filePath.split('/').pop()} to virtual storage`, 3000)
    } catch (error) {
        // console.error(`[SaveListener] Error saving ${filePath} to localStorage:`, error); // Removed log
        console.error(`Failed to save ${filePath} to virtual storage: ${error instanceof Error ? error.message : 'Storage error'}`)
    }
}

export default (vscode: typeof import('vscode'), getIsDiskSaveEnabled: IsDiskSaveEnabledChecker) =>
    vscode.workspace.onDidSaveTextDocument(async (document) => {
        // Only save actual files back to the filesystem AND check if disk saving is enabled
        if (document.uri.scheme === 'file' && getIsDiskSaveEnabled()) {
            console.log(`[SaveListener] Document saved: ${document.uri.fsPath}`) // Optional log

            let filePath = document.uri.fsPath // Use fsPath for the actual system path
            const content = document.getText()
            // console.log({ filePath }) // Removed log
            // console.log(`[SaveListener] Document saved, attempting to save to filesystem: ${filePath}`); // Removed log
            if (window.location.search.includes('tutorial')) {
                filePath = filePath.replace('/demo.ts', '/api-tutorial.ts')
            }
            try {
                const response = await fetch('/save-file', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ filePath, content }),
                })

                const result = await response.json()

                if (response.ok && result.success) {
                    // console.log(`[SaveListener] Successfully saved ${filePath} to filesystem.`); // Removed log
                    // Optional: Show success notification
                    // vscode.window.showInformationMessage(`Saved ${path.basename(filePath)} to filesystem.`);
                } else {
                    // console.error(`[SaveListener] Failed to save ${filePath} to filesystem: ${result.error || response.statusText}`); // Removed log
                    vscode.window.showErrorMessage(`Failed to save ${filePath}: ${result.error || response.statusText}`)
                }
            } catch (error: any) {
                // console.error(`[SaveListener] Error sending save request for ${filePath}:`, error); // Removed log
                vscode.window.showErrorMessage(`Error saving ${filePath}: ${error.message || 'Network error'}`)
            }
        } else if (document.uri.scheme === 'file' && !getIsDiskSaveEnabled() && document.uri.fsPath.endsWith('/demo.ts')) {
            saveDocumentLocalStorage(document.uri.fsPath, document.getText())
        } else {
            // console.log(`[SaveListener] Ignoring save event for scheme: ${document.uri.scheme}`); // Removed log
        }
    })
