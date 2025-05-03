import { TextDocumentContentProvider, Uri, window as VsCodeWindow, workspace as VsCodeWorkspace, EventEmitter } from 'vscode';
import type { IDisposable } from 'monaco-editor';
import { debounce, memoize } from 'es-toolkit';
import { BuckStatementParts, extractBuckStatement, extractFromStatementsAST, FromStatementParts } from '../src/extract-from-statements';
import { writeFile } from './setup.common';
import { generateInterface, serializeDescribe } from '../../src/interface-generator'; // Use relative path
import contentjson from '../../.buck/table.json'; // Use relative path
import { DuckDBAccessMode, type AsyncDuckDB } from '@duckdb/duckdb-wasm';
import { get } from 'es-toolkit/compat';

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
    updateContent = async () => {
        await this.writeFile('.buck/table.json', JSON.stringify(this.content, null, 2));
        const tsfile = generateInterface(this.content);
        await this.writeFile('.buck/table3.ts', tsfile);
    }
    upsertBuckStatements = async (statements: BuckStatementParts[]) => {
        console.log('upsertBuckStatements', statements);
        let toUpdate = false
        for (const statement of statements) {
            if (this.content[statement.resource || ''] || !statement.resource.match(/\.\w{2,10}$/)) {
                continue
            }
            try {
                const fnx = `return ${statement.fullCall || "Buck('')"}.fetchTables()`
                console.log({ fnx })
                const fn = new Function(fnx);
                const schemas = await fn();
                // console.log('UPSERT BUCK STATEMENT', statement, schema);
                const resource = statement.resource || '';
                this.content[resource] = schemas;
                toUpdate = true
            }
            catch (err) {
                console.error('STERR', statement, err);
            }
            // this.content[resource][statement.param] = schema;
        }
        return toUpdate && this.updateContent()
    }
    upsertFromStatements = async (statements: FromStatementParts[]) => {
        console.log('upsertFromStatements', statements);
        // return;
        let toUpdate = false
        for (const statement of statements) {
            if (!statement.param.match(/\w{2,13}$/)) {
                continue
            }
            console.log('LOOP', statement)
            const resource = statement.resource || '';
            if (!this.content[resource]) {
                this.content[resource] = {};
            }
            if (!this.content[resource]?.[statement.param] && !failedSet.has(statement)) {
                try {
                    const fn = new Function(`return ${statement.chain || "Buck('')"}.describe('${statement.param}')`);
                    const schema = await fn()
                    this.content[resource][statement.param] = serializeDescribe(schema);
                    toUpdate = true
                }
                catch (err) {
                    this.content[resource][statement.param] = {}
                    console.error('STERR', statement, err);
                    failedSet.add(statement)
                }

            }
        }
        return toUpdate && this.updateContent()

        // await this.writeFile('.buck/table.json', JSON.stringify(this.content, null, 2));
        // const tsfile = generateInterface(this.content);
        // await this.writeFile('.buck/table3.ts', tsfile);
    }
    // upsertDB = async (st: BuckStatementParts) => {
    //     if (this.content[st.resource || '']) return true;

    //     this.merge(st);
    //     return false;
    // }
    // upsert(statement: FromStatementParts) {
    //     if (this.content[statement.resource || '']?.[statement.param]) return true;
    //     this.merge(statement);
    //     return false;
    // }
}

const schemes = new Schemes();

// const cache = new Map()

// const evictCache = debounce(() => cache.clear(), 3000)
const failedSet = new Set([])

const getCode = (uri: Uri): string => {
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
    return code
}

// const onTextUpdate = (code: string): string => {
//     // console.log('provideTextDocumentContent')
//     // Extract original URI from the query parameter


//     try {
//         const parts = extractFromStatementsAST(code);
//         // upsertFromStatements(bsts, parts)
//         // for (const st of parts) {
//         //     try {
//         //         schemes.upsert(st);
//         //     } catch (err) {
//         //         console.error('upsert error', st, err);
//         //     }
//         // }
//         return transformCode(parts);
//     } catch (error) {
//         console.error(error)
//         return `// Error processing document:\n// ${error instanceof Error ? error.message : String(error)}`;
//     }
// }


const refreshTypes = debounce(async (code: string) => {
    const parts = extractFromStatementsAST(code);
    const bsts = extractBuckStatement(code);
    console.log({ bsts })
    schemes.upsertBuckStatements(bsts)
        .then(() => schemes.upsertFromStatements(parts))
        .catch(err => console.error(err));
}, 1000)

export const transformedProvider = new class implements TextDocumentContentProvider {
    onDidChangeEmitter = new EventEmitter<Uri>();
    onDidChange = this.onDidChangeEmitter.event;
    provideTextDocumentContent(uri: Uri): string {
        const code = getCode(uri)
        refreshTypes(code)
        try {
            const parts = extractFromStatementsAST(code);
            return transformCode(parts);
        } catch (error) {
            console.error(error)
            return `// Error processing document:\n// ${error instanceof Error ? error.message : String(error)}`;
        }
    }
    update(uri: Uri) {
        this.onDidChangeEmitter.fire(uri);
    }
};
