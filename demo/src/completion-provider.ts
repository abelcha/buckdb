import './style.css'
import './imports.ts'
import * as vscode from '@codingame/monaco-vscode-extension-api'
import { from } from '@buckdb/remote.ts'
import { ls } from '@buckdb/tf.ts'
import type { CompletionItem, CompletionItemProvider, Position, TextDocument } from 'vscode'

const s3CompletionProvider = async (linePrefix: string, document: TextDocument, position: Position) => {
    const S3_PREFIX_REGEX = /s3:\/\/([^/'"]+)\/([^'"]*)$/;
    const s3Match = linePrefix.match(S3_PREFIX_REGEX);

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

        return results
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
            .filter((item): item is CompletionItem => item !== null)
            .filter((item, index, self) => index === self.findIndex((t) => t.insertText === item.insertText));
    } catch (error) {
        console.error('Error fetching S3 completions:', error);
        return [];
    }

}

export const fsCompletionProvider: CompletionItemProvider = {
    async provideCompletionItems(document, position) {
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        const match = linePrefix.match(/[^'"`]+$/)[0]


        if (linePrefix.includes('s3://')) {
            return s3CompletionProvider(linePrefix, document, position)
        }
        // if (!linePrefix.endsWith('/')) {
        //     return undefined;
        // }
        const entries = await from(ls(match)).select((e, D) => ({
            type: D.is_dir(e.path) ? 'dir' : 'file',
            path: e.path,
        })).execute()
            .catch(e => [])
        console.log({ entries })
        const items = entries.map(entry => {
            const item = new vscode.CompletionItem(entry.path, entry.type === 'dir' ? vscode.CompletionItemKind.Folder : vscode.CompletionItemKind.File);
            item.insertText = entry.path.substring(match.length);
            return item;
        });
        console.log({ items })
        return items;
    }
};
