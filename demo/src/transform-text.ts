import { TextDocumentContentProvider, Uri, window as VsCodeWindow, workspace as VsCodeWorkspace, EventEmitter } from 'vscode';
import type { IDisposable } from 'monaco-editor';
import { debounce, memoize } from 'es-toolkit';
import { extractFromStatementsAST, FromStatementParts } from '../src/extract-from-statements';
import { writeFile } from './setup.common';
import { generateInterface } from '../../src/interface-generator'; // Use relative path
import contentjson from '../../.buck/table.json'; // Use relative path

export const transformedScheme = 'transformed';
export const scrollSyncMap = new Map<string, { sourceDisposable: IDisposable; targetDisposable: IDisposable }>();

const execToSql = memoize((cleanFromChain: string) => {
    const fn = new Function(`return ${cleanFromChain}.toSql()`);
    return fn();
});

export const BuckFromChain = (opts: { chain: string }) => {
    if (!opts.chain) throw new Error('No chain provided');
    return new Function(`return (${opts.chain})`)();
};

function transformCode(parts: { cleanFromChain: string; lineStart: number }[]): string {
    const arr = new Array().fill(null);
    for (const st of parts || []) {
        let res: string[] = [];
        try {
            res = execToSql(st.cleanFromChain).split('\n');
        } catch (err) {
            res = ['Error: ', String(st), String(err)];
        }
        let offset = 0;
        while (arr[st.lineStart + offset]) offset++;
        res.forEach((line, i) => arr[st.lineStart + i + offset] = line);
    }
    return arr.map(e => e || '').join('\n');
}

class Schemes {
    content = contentjson;
    writeFile = async (filePath: string, content: string) => {
        await writeFile(filePath, content);
        await fetch('/save-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath: '/workspace/' + filePath, content })
        });
    }
    merge = debounce(async (statement) => {
        try {
            const fn = new Function(`return ${statement.chain || "Buck('')"}.fetchSchema('${statement.param}')`);
            const schema = await fn();
            const resource = statement.resource || '';
            if (!this.content[resource]) this.content[resource] = {};
            this.content[resource][statement.param] = schema;
            this.writeFile('.buck/table.json', JSON.stringify(this.content, null, 2));
            const tsfile = generateInterface(this.content);
            this.writeFile('.buck/table3.ts', tsfile);
        } catch (err) {
            console.error('Merge error', err);
        }
    }, 3000)
    upsert(statement: FromStatementParts) {
        if (this.content[statement.resource || '']?.[statement.param]) return true;
        this.merge(statement);
        return false;
    }
}

const schemes = new Schemes();

export const transformedProvider = new class implements TextDocumentContentProvider {
    onDidChangeEmitter = new EventEmitter<Uri>();
    onDidChange = this.onDidChangeEmitter.event;
    provideTextDocumentContent(uri: Uri): string {
        // Extract original URI from the query parameter
        const queryParams = new URLSearchParams(uri.query);
        const originalUriString = queryParams.get('original');

        if (!originalUriString) {
            return `// Error: Could not find original URI in query for ${uri.toString()}`;
        }

        const originalUri = Uri.parse(decodeURIComponent(originalUriString), true);
        let code = '';
        const editor = VsCodeWindow.visibleTextEditors.find(e => e.document.uri.toString() === originalUri.toString());
        if (editor) {
            code = editor.document.getText();
        } else {
            const doc = VsCodeWorkspace.textDocuments.find(d => d.uri.toString() === originalUri.toString());
            if (doc) {
                code = doc.getText();
            } else {
                const active = VsCodeWindow.activeTextEditor;
                if (active && active.document.uri.toString() === originalUri.toString()) code = active.document.getText();
                else return `// Original document not found: ${originalUriString}`;
            }
        }
        try {
            const parts = extractFromStatementsAST(code);
            for (const st of parts) {
                try {
                    schemes.upsert(st);
                } catch (err) {
                    console.error('upsert error', st, err);
                }
            }
            return transformCode(parts);
        } catch (error) {
            return `// Error processing document ${originalUriString}:\n// ${error instanceof Error ? error.message : String(error)}`;
        }
    }
    update(uri: Uri) {
        this.onDidChangeEmitter.fire(uri);
    }
};
