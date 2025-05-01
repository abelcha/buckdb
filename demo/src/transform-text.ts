import { TextDocumentContentProvider, Uri, window as VsCodeWindow, workspace as VsCodeWorkspace, EventEmitter, TextEditor, ViewColumn } from 'vscode';
import type { IDisposable } from 'monaco-editor';
import { debounce, memoize } from 'es-toolkit';
import { extractFromStatementsAST, FromStatementParts } from '../src/extract-from-statements';
import { fileSystemProvider, writeFile } from './setup.common';
import { generateInterface } from '@external/src/interface-generator'
import contentjson from '@external/.buck/table.json'
// import { fileSystemProvider } from './setup.common';
export const transformedScheme = 'transformed';
export const scrollSyncMap = new Map<string, { sourceDisposable: IDisposable, targetDisposable: IDisposable }>();

const execToSql = memoize((cleanFromChain: string) => {
    // console.log('RECALC', str)
    const str = `return ${cleanFromChain}.toSql()`
    // console.log({ str })
    const fn = new Function(str)
    return fn()
})
export const BuckFromChain = (opts: { chain: string }) => {
    // console.log('RECALC', str)
    if (!opts.chain) {
        throw new Error('No chain provided')
    }
    // const str = .toSql()`
    return new Function(`return (${opts.chain})`)()
}


function transformCode(extractedParts: { cleanFromChain: string, lineStart: number }[]): string {
    let arr = new Array().fill(null)
    for (const st of extractedParts || []) {
        let res = []
        try {
            res = execToSql(st.cleanFromChain).split('\n')
            // console.log('res', res)
        } catch (err) {
            // console.log('Error', { st, err })
            res = ['Error: ', st, err]
        }
        let occupiedIndex = 0
        while (arr[st.lineStart + occupiedIndex]) {
            occupiedIndex++
        }
        res.forEach((e, i) => {
            arr[st.lineStart + i + occupiedIndex] = e
        })
    }
    return arr.map(e => e || '').join('\n')
}
class Schemes {
    content = {}
    // init() {
    //     // this.content = JSON.parse((await import('@external/.buck/table.json?raw')).default)
    //     console.log('CONT', this.content)
    // }
    constructor() {
        this.content = contentjson
    }

    writeFile = async (filePath: string, content: string) => {
        const r1 = await writeFile(filePath, content)
        console.log(filePath, { r1 })
        const r2 = await fetch('/save-file', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath: '/workspace/' + filePath, content })
        })
        console.log(filePath, { r2 })

    }
    merge = debounce(async (statement) => {
        const ressource = statement.resource || ''

        try {
            const str = `return ${statement.chain || `Buck('')`}.fetchSchema('${statement.param}')`
            // console.log({ str })
            const fn = new Function(str)
            const schema = await fn()
            console.log('FUNC', schema)
            if (!this.content[ressource]) {
                this.content[ressource] = {};
            }
            this.content[ressource][statement.param] = schema
            console.log('saving table.json...')
            this.writeFile('.buck/table.json', JSON.stringify(this.content, null, 2))
            const tsfile = generateInterface(this.content)
            console.log({ tsfile })
            // const fd = fileSystemProvider.open()
            this.writeFile('.buck/table3.ts', tsfile)
            // const writerESP =
            //     console.log({ writerESP })
            // // const resp4 = await fileSystemProvider.readFile(Uri.file(`/workspace/.buck/table3.ts`))
            // const response =
            //     console.log({ response })

            // await Bun.file('./.buck/table3.ts').write(tsfile)

        } catch (err) {
            console.log('Error', { err })
        }
    }, 3000)

    upsert(statement: FromStatementParts) {
        const ressource = statement.resource || ''

        if (this.content[statement.resource || '']?.[statement.param]) {
            // console.log('UPSEEERT', statement)
            return true
        }
        this.merge(statement)

        return false
    }
}

const schemes = new Schemes()


// --- Reintroduce Transformed Content Provider Implementation ---
export const transformedProvider = new class implements TextDocumentContentProvider {
    // emitter and its event
    onDidChangeEmitter = new EventEmitter<Uri>();
    onDidChange = this.onDidChangeEmitter.event;

    provideTextDocumentContent(uri: Uri): string {
        // Find the original document based on the path in the transformed URI
        const originalUriString = uri.path.substring(1); // Remove leading '/'
        const originalUri = Uri.parse(originalUriString, true);

        // Find the corresponding editor or document
        const editor = VsCodeWindow.visibleTextEditors.find(e => e.document.uri.toString() === originalUri.toString());
        let code = '';
        if (editor) {
            code = editor.document.getText();
            // console.log(`[TransformedProvider] Providing content for ${uri.toString()} from visible editor.`);
        } else {
            // Fallback: Try finding the document in the workspace if not visible
            const doc = VsCodeWorkspace.textDocuments.find(d => d.uri.toString() === originalUri.toString());
            if (doc) {
                code = doc.getText();
                // console.log(`[TransformedProvider] Providing content for ${uri.toString()} from workspace document.`);
            } else {
                // Fallback: Try getting content from the active editor if URIs match (less reliable)
                const activeEditor = VsCodeWindow.activeTextEditor;
                if (activeEditor && activeEditor.document.uri.toString() === originalUri.toString()) {
                    code = activeEditor.document.getText();
                    // console.log(`[TransformedProvider] Providing content for ${uri.toString()} from active editor.`);
                } else {
                    // console.warn(`[TransformedProvider] Original document not found: ${originalUriString}`);
                    return `// Original document not found: ${originalUriString}`;
                }
            }
        }
        const extractedParts = extractFromStatementsAST(code);
        console.log('EXTRACTED', { extractedParts })
        // const resssp = fileSystemProvider.readFile(Uri.file(`/workspace/.buck/table.json`))
        // console.log({ resssp })

        // console.log({ resssp })
        for (const st of extractedParts) {
            schemes.upsert(st)
            // console.log('==>', st)
            // console.log('st', st)
            // console.log('code', code)
            // console.log('res', res)
            // console.log('res', res)
            // console.log('res', res)
        }
        return transformCode(extractedParts);
    }

    // Method to signal that content for a URI has changed
    update(uri: Uri) {
        // console.log(`[TransformedProvider] Firing change for: ${uri.toString()}`);
        this.onDidChangeEmitter.fire(uri);
    }
};
