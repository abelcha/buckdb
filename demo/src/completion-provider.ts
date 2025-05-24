import * as vscode from 'vscode'

// Basic regex to find .from('s3://...
// This might need refinement based on actual usage patterns
const S3_PATH_REGEX = /\.from\(['"](s3:\/\/([^/'"]+)\/([^'"]*))['"]\)/i
const S3_PREFIX_REGEX = /s3:\/\/([^/'"]+)\/([^'"]*)$/

export const s3CompletionProvider: vscode.CompletionItemProvider = {
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext,
    ): Promise<vscode.CompletionItem[] | vscode.CompletionList | undefined> {
        const linePrefix = document.lineAt(position).text.substring(0, position.character)

        // Check if we are inside an s3 path within .from()
        // A more robust check might involve AST parsing if available
        const s3Match = linePrefix.match(S3_PREFIX_REGEX)

        if (!s3Match) {
            console.log('s3CompletionProvider: Not an S3 path context.')
            return undefined
        }

        const fullPrefix = `s3://${s3Match[1]}/${s3Match[2]}`
        const bucket = s3Match[1]
        const currentPath = s3Match[2] // The part after the bucket name

        console.log(`s3CompletionProvider: Detected S3 prefix: ${fullPrefix}, Bucket: ${bucket}, Path: ${currentPath}`)

        try {
            // --- S3 Listing Logic using direct S3 REST API fetch ---
            console.log(`s3CompletionProvider: Fetching S3 list via REST API for bucket: ${bucket}, prefix: ${currentPath}`)

            // Construct the S3 ListObjectsV2 URL
            // Using virtual-hosted style: https://bucket.s3.region.amazonaws.com/
            // Using s3.amazonaws.com as endpoint, region might be needed for specific buckets
            // delimiter=/ groups common prefixes (folders)
            // Use currentPath directly as prefix, S3 API handles trailing slash correctly for listing inside folders.
            const s3ApiUrl = `https://${bucket}.s3.eu-west-3.amazonaws.com/?list-type=2&prefix=${encodeURIComponent(currentPath)}&delimiter=/`

            console.log(`s3CompletionProvider: Requesting URL: ${s3ApiUrl}`)

            // Fetch directly from S3 REST API (GET request)
            // NOTE: This requires the bucket to be public OR CORS configured correctly
            // AND appropriate AWS authentication handled by the environment/browser.
            const response = await fetch(s3ApiUrl, {
                method: 'GET',
                // Headers might be needed depending on auth (e.g., 'Authorization', 'x-amz-date')
                // These are typically handled by SDKs or signing processes, not manually here.
            })

            if (!response.ok) {
                // Attempt to get more specific error from XML body if possible
                let errorDetail = `${response.status} ${response.statusText}`
                try {
                    const errorXmlText = await response.text()
                    const parser = new DOMParser()
                    const errorDoc = parser.parseFromString(errorXmlText, 'application/xml')
                    const code = errorDoc.querySelector('Code')?.textContent
                    const message = errorDoc.querySelector('Message')?.textContent
                    if (code || message) {
                        errorDetail = `${code || 'Error'}: ${message || 'Failed to fetch'}`
                    }
                } catch (parseError) {
                    // Ignore if parsing error response fails
                }
                throw new Error(`Failed to list S3 objects: ${errorDetail}`)
            }

            const xmlText = await response.text()
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(xmlText, 'application/xml')

            const results: string[] = []

            // Extract common prefixes (folders)
            xmlDoc.querySelectorAll('CommonPrefixes > Prefix').forEach(prefixNode => {
                const prefix = prefixNode.textContent
                if (prefix) {
                    // Construct the full S3 path for the folder
                    results.push(`s3://${bucket}/${prefix}`)
                }
            })

            // Extract object keys (files)
            xmlDoc.querySelectorAll('Contents > Key').forEach(keyNode => {
                const key = keyNode.textContent
                // Avoid adding the prefix itself if it's listed as a key (happens for empty folders sometimes)
                if (key && key !== currentPath) {
                    // Construct the full S3 path for the file
                    results.push(`s3://${bucket}/${key}`)
                }
            })

            console.log(`s3CompletionProvider: Parsed ${results.length} results from S3 XML response.`)

            const completions: vscode.CompletionItem[] = results.map((fullResultPath: string) => {
                // Handle S3 paths from XML

                // Extract the part of the path relative to the bucket root
                const s3PathMatch = fullResultPath.match(/^s3:\/\/([^/]+)\/(.*)$/)
                if (!s3PathMatch) return null // Skip invalid results

                const objectPath = s3PathMatch[2] // Full path from bucket root, e.g., "folder/subfolder/" or "folder/file.txt"

                // Ensure the result path actually belongs under the current path
                if (!objectPath.startsWith(currentPath)) {
                    console.warn(`s3CompletionProvider: Result path "${objectPath}" doesn't start with current path "${currentPath}". Skipping.`)
                    return null
                }

                // Get the part of the path *after* the current path
                let remainingPath = objectPath.substring(currentPath.length)

                // We only want the very next segment (file or folder)
                const nextSlash = remainingPath.indexOf('/')
                let suggestionPart: string
                if (nextSlash === -1) {
                    // No more slashes, it's a file or the last segment
                    suggestionPart = remainingPath
                } else {
                    // It's a folder or a path with multiple segments, take the first one including the slash
                    suggestionPart = remainingPath.substring(0, nextSlash + 1)
                }

                // Basic check to avoid empty suggestions (e.g., if currentPath and objectPath were identical)
                if (!suggestionPart) {
                    return null
                }

                const isFolder = suggestionPart.endsWith('/')
                // For display label, remove trailing slash if it's a folder
                const label = isFolder ? suggestionPart.slice(0, -1) : suggestionPart

                // Avoid suggesting empty labels
                if (!label) return null

                const item = new vscode.CompletionItem(
                    label, // Display name
                    isFolder ? vscode.CompletionItemKind.Folder : vscode.CompletionItemKind.File,
                )
                item.insertText = suggestionPart // Text to insert (includes trailing / for folders)
                item.detail = fullResultPath // Show full path on hover
                // A more precise range would replace the text from the last '/' to the cursor
                // For simplicity, inserting at the current position.
                item.range = new vscode.Range(position, position)

                if (isFolder) {
                    item.commitCharacters = ['/']
                    item.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger suggestions' }
                }
                return item
            }).filter((item): item is vscode.CompletionItem => item !== null) // Remove nulls
                // Simple deduplication based on insertText
                .filter((item, index, self) => index === self.findIndex((t) => t.insertText === item.insertText))

            console.log(`s3CompletionProvider: Providing ${completions.length} unique completions for ${fullPrefix}`)
            console.log({ completions })
            return completions
        } catch (error) {
            console.error('Error fetching S3 completions via S3 REST API:', error)
            // Optionally show an error message to the user
            // vscode.window.showErrorMessage(`Failed to fetch S3 completions: ${error}`);
            return undefined
        }
    },
}

// Example of how it might be registered in main.v2.ts (based on PROJECT_SUMMARY.md)
// import { s3CompletionProvider } from './completion-provider';
// vscode.languages.registerCompletionItemProvider('typescript', s3CompletionProvider, '/', ':'); // Trigger characters
