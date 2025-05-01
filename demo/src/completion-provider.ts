import './style.css';
import type * as vsCodeApi from "vscode";
import './imports.ts';
import { Position, CancellationToken, CompletionContext, CompletionItem, CompletionItemKind, Range, TextDocument } from 'vscode'; // Added imports, TextDocument
import { BuckFromChain } from './transform-text';
// Import the extraction function from the refactored file
import { extractFromStatementsAST } from './extract-from-statements';
export const s3CompletionProvider = new class implements vsCodeApi.CompletionItemProvider {
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