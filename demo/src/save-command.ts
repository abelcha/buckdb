// Define the type for the checker function
type IsDiskSaveEnabledChecker = () => boolean;

export default (vscode: typeof import('vscode'), getIsDiskSaveEnabled: IsDiskSaveEnabledChecker) => vscode.workspace.onDidSaveTextDocument(async (document) => {
    // Only save actual files back to the filesystem AND check if disk saving is enabled
    if (document.uri.scheme === 'file' && getIsDiskSaveEnabled()) {
        const filePath = document.uri.fsPath; // Use fsPath for the actual system path
        const content = document.getText();
        // console.log({ filePath }) // Removed log
        // console.log(`[SaveListener] Document saved, attempting to save to filesystem: ${filePath}`); // Removed log

        try {
            const response = await fetch('/save-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filePath, content }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // console.log(`[SaveListener] Successfully saved ${filePath} to filesystem.`); // Removed log
                // Optional: Show success notification
                // vscode.window.showInformationMessage(`Saved ${path.basename(filePath)} to filesystem.`);
            } else {
                // console.error(`[SaveListener] Failed to save ${filePath} to filesystem: ${result.error || response.statusText}`); // Removed log
                vscode.window.showErrorMessage(`Failed to save ${filePath}: ${result.error || response.statusText}`);
            }
        } catch (error: any) {
            // console.error(`[SaveListener] Error sending save request for ${filePath}:`, error); // Removed log
            vscode.window.showErrorMessage(`Error saving ${filePath}: ${error.message || 'Network error'}`);
        }
    } else if (document.uri.scheme === 'file' && !getIsDiskSaveEnabled() && document.uri.fsPath.endsWith('/demo.ts')) {
        // Disk save is disabled AND it's demo.ts, save to localStorage instead
        const filePath = document.uri.fsPath;
        const content = document.getText();
        const storageKey = `buckdbVirtualFile:${filePath}`;
        try {
            localStorage.setItem(storageKey, content);
            // console.log(`[SaveListener] Saved ${filePath} to localStorage.`); // Optional log
            // Optionally show a subtle status bar message instead of a notification
            vscode.window.setStatusBarMessage(`Saved ${filePath.split('/').pop()} to virtual storage`, 3000);
        } catch (error) {
            // console.error(`[SaveListener] Error saving ${filePath} to localStorage:`, error); // Removed log
            vscode.window.showErrorMessage(`Failed to save ${filePath} to virtual storage: ${error instanceof Error ? error.message : 'Storage error'}`);
        }
    } else {
        // console.log(`[SaveListener] Ignoring save event for scheme: ${document.uri.scheme}`); // Removed log
    }
})
