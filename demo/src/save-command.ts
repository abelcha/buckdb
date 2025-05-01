export default (vscode: typeof import('vscode')) => vscode.workspace.onDidSaveTextDocument(async (document) => {
    // Only save actual files back to the filesystem
    if (document.uri.scheme === 'file') {
        const filePath = document.uri.fsPath; // Use fsPath for the actual system path
        const content = document.getText();
        console.log({ filePath })
        console.log(`[SaveListener] Document saved, attempting to save to filesystem: ${filePath}`);

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
                // console.log(`[SaveListener] Successfully saved ${filePath} to filesystem.`);
                // Optional: Show success notification
                // vscode.window.showInformationMessage(`Saved ${path.basename(filePath)} to filesystem.`);
            } else {
                console.error(`[SaveListener] Failed to save ${filePath} to filesystem: ${result.error || response.statusText}`);
                vscode.window.showErrorMessage(`Failed to save ${filePath}: ${result.error || response.statusText}`);
            }
        } catch (error: any) {
            console.error(`[SaveListener] Error sending save request for ${filePath}:`, error);
            vscode.window.showErrorMessage(`Error saving ${filePath}: ${error.message || 'Network error'}`);
        }
    } else {
        // console.log(`[SaveListener] Ignoring save event for scheme: ${document.uri.scheme}`);
    }
})