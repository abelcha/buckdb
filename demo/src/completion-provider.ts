import { from } from '@buckdb/isomorphic';
import { DirectoryRegexp, ReadableFileRegexp } from '@buckdb/src/typedef';
import { glob } from '@buckdb/tf';
import * as vscode from 'vscode';

// Regex for detecting S3 paths
const S3_PATH_REGEX = /\.from\(['"](s3:\/\/([^/'"]+)\/([^'"]*))['"]\)/i;
const S3_PREFIX_REGEX = /s3:\/\/([^/'"]+)\/([^'"]*)$/;

// Regex for detecting local file paths
const FILE_PATH_REGEX = /\.from\(['"](file:\/\/[^'"]*|\/[^'"]*)['"]\)/i;
const FILE_PREFIX_REGEX = /(file:\/\/[^'"]*|\/[^'"]*)$/;
const getFileCompletions = async (prefix: string): Promise<{ type: 'dir' | 'file', path: string }[]> => {

    const g = glob(`${prefix}*.[a-z]*`)
    const respfiles = (await from(g).select(e => ({ type: 'file', path: e.file })).execute())
        .filter(e => e.path.match(ReadableFileRegexp))
    const respdirs = (await from(glob(`${prefix}*/`)).select(e => ({ type: 'dir', path: e.file })).execute())
    console.log({ respfiles, respdirs })
    return [...respfiles, ...respdirs].filter(x => !x.path.match(/\/\./))
}
export const pathCompletionProvider: vscode.CompletionItemProvider = {
    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext,
    ): Promise<vscode.CompletionItem[] | vscode.CompletionList | undefined> {
        const linePrefix = document.lineAt(position).text.substring(0, position.character);

        // Check for S3 path context
        const s3Match = linePrefix.match(S3_PREFIX_REGEX);
        const fileMatch = linePrefix.match(FILE_PREFIX_REGEX);

        if (!s3Match && !fileMatch) {
            console.log('completionProvider: Not an S3 or file path context.');
            return undefined;
        }

        let completions: vscode.CompletionItem[] = [];

        // Handle S3 paths
        if (s3Match) {
            const fullPrefix = `s3://${s3Match[1]}/${s3Match[2]}`;
            const bucket = s3Match[1];
            const currentPath = s3Match[2];

            console.log(`completionProvider: Detected S3 prefix: ${fullPrefix}, Bucket: ${bucket}, Path: ${currentPath}`);

            try {
                const s3ApiUrl = `https://${bucket}.s3.eu-west-3.amazonaws.com/?list-type=2&prefix=${encodeURIComponent(currentPath)}&delimiter=/`;
                console.log(`completionProvider: Requesting S3 URL: ${s3ApiUrl}`);

                const response = await fetch(s3ApiUrl, { method: 'GET' });
                if (!response.ok) {
                    let errorDetail = `${response.status} ${response.statusText}`;
                    try {
                        const errorXmlText = await response.text();
                        const parser = new DOMParser();
                        const errorDoc = parser.parseFromString(errorXmlText, 'application/xml');
                        const code = errorDoc.querySelector('Code')?.textContent;
                        const message = errorDoc.querySelector('Message')?.textContent;
                        if (code || message) {
                            errorDetail = `${code || 'Error'}: ${message || 'Failed to fetch'}`;
                        }
                    } catch (parseError) { }
                    throw new Error(`Failed to list S3 objects: ${errorDetail}`);
                }

                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

                const results: string[] = [];
                xmlDoc.querySelectorAll('CommonPrefixes > Prefix').forEach(prefixNode => {
                    const prefix = prefixNode.textContent;
                    if (prefix) results.push(`s3://${bucket}/${prefix}`);
                });
                xmlDoc.querySelectorAll('Contents > Key').forEach(keyNode => {
                    const key = keyNode.textContent;
                    if (key && key !== currentPath) results.push(`s3://${bucket}/${key}`);
                });

                console.log(`completionProvider: Parsed ${results.length} S3 results.`);

                completions = results
                    .map((fullResultPath: string) => {
                        const s3PathMatch = fullResultPath.match(/^s3:\/\/([^/]+)\/(.*)$/);
                        if (!s3PathMatch) return null;

                        const objectPath = s3PathMatch[2];
                        if (!objectPath.startsWith(currentPath)) {
                            console.warn(`completionProvider: S3 path "${objectPath}" doesn't start with "${currentPath}". Skipping.`);
                            return null;
                        }

                        let remainingPath = objectPath.substring(currentPath.length);
                        const nextSlash = remainingPath.indexOf('/');
                        let suggestionPart = nextSlash === -1 ? remainingPath : remainingPath.substring(0, nextSlash + 1);

                        if (!suggestionPart) return null;

                        const isFolder = suggestionPart.endsWith('/');
                        const label = isFolder ? suggestionPart.slice(0, -1) : suggestionPart;
                        if (!label) return null;

                        const item = new vscode.CompletionItem(
                            label,
                            isFolder ? vscode.CompletionItemKind.Folder : vscode.CompletionItemKind.File,
                        );
                        item.insertText = suggestionPart;
                        item.detail = fullResultPath;
                        item.range = new vscode.Range(position, position);
                        if (isFolder) {
                            item.commitCharacters = ['/'];
                            item.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger suggestions' };
                        }
                        return item;
                    })
                    .filter((item): item is vscode.CompletionItem => item !== null)
                    .filter((item, index, self) => index === self.findIndex((t) => t.insertText === item.insertText));
            } catch (error) {
                console.error('Error fetching S3 completions:', error);
                return undefined;
            }
        }

        // Handle file paths (file:// or /)
        if (fileMatch) {
            let prefix = fileMatch[0];
            let cleanPrefix = prefix;

            // Normalize file:// paths to local paths for getFileCompletions
            if (prefix.startsWith('file://')) {
                cleanPrefix = prefix.replace(/^file:\/\//, '');
                // On Windows, convert /C:/ to C:/ for compatibility
                if (cleanPrefix.match(/^\/[a-zA-Z]:/)) {
                    cleanPrefix = cleanPrefix.substring(1);
                }
            }

            console.log(`completionProvider: Detected file prefix: ${prefix}, Cleaned: ${cleanPrefix}`);

            try {
                const results = await getFileCompletions(cleanPrefix);
                console.log('-----------', { results })
                console.log(`completionProvider: Parsed ${results.length} file results.`);

                const fileCompletions = results
                    .map((result: { type: 'dir' | 'file', path: string }) => {
                        const fullResultPath = result.path;
                        const isDirectory = result.type === 'dir';
                        
                        // Normalize result path to match input style
                        let displayPath = fullResultPath;
                        if (prefix.startsWith('file://')) {
                            displayPath = `file://${fullResultPath.replace(/\\/g, '/')}`; // Ensure forward slashes
                        }

                        // Ensure the result path starts with the input prefix
                        if (!fullResultPath.startsWith(cleanPrefix)) {
                            console.warn(`completionProvider: File path "${fullResultPath}" doesn't start with "${cleanPrefix}". Skipping.`);
                            return null;
                        }

                        let remainingPath = fullResultPath.substring(cleanPrefix.length);
                        const nextSlash = remainingPath.search(/[\\/]/);
                        let suggestionPart = nextSlash === -1 ? remainingPath : remainingPath.substring(0, nextSlash + 1);

                        if (!suggestionPart) return null;

                        const isFolder = isDirectory || suggestionPart.endsWith('/') || suggestionPart.endsWith('\\');
                        const label = isFolder ? suggestionPart.replace(/[\\/]$/, '') : suggestionPart;
                        if (!label) return null;

                        const item = new vscode.CompletionItem(
                            label,
                            isFolder ? vscode.CompletionItemKind.Folder : vscode.CompletionItemKind.File,
                        );
                        item.insertText = suggestionPart;
                        item.detail = displayPath;
                        item.range = new vscode.Range(position, position);
                        if (isFolder) {
                            item.commitCharacters = ['/'];
                            item.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger suggestions' };
                        }
                        return item;
                    })
                    .filter((item): item is vscode.CompletionItem => item !== null)
                    .filter((item, index, self) => index === self.findIndex((t) => t.insertText === item.insertText));

                completions = [...completions, ...fileCompletions];
            } catch (error) {
                console.error('Error fetching file completions:', error);
                return undefined;
            }
        }

        console.log(`completionProvider: Providing ${completions.length} unique completions.`);
        console.log({ completions });
        return completions;
    },
};

// Example registration
// vscode.languages.registerCompletionItemProvider('typescript', completionProvider, '/', ':');