import { debounce, memoize } from 'es-toolkit'
import type { IDisposable } from 'monaco-editor'
import { EventEmitter, TextDocumentContentProvider, Uri, window as VsCodeWindow, workspace as VsCodeWorkspace } from 'vscode'
import contentjson from '@external/.buck/table.json' // Use relative path
import { generateInterface, serializeDescribe } from '@external/src/interface-generator' // Use relative path
import { isFile, isFunction } from '@external/src/utils'
import { BuckStatementParts, extractBuckStatement, extractFromStatementsAST, FromStatementParts } from '../src/extract-from-statements'
import { writeFile } from './setup.common'

export const transformedScheme = 'transformed'
export const scrollSyncMap = new Map<string, { sourceDisposable: IDisposable; targetDisposable: IDisposable }>()

const execToSql = memoize((cleanFromChain: string) => {
    const fn = new Function(`return ${cleanFromChain}.toSql()`)
    return fn()
})

export const BuckFromChain = (opts: { chain: string }) => {
    if (!opts.chain) throw new Error('No chain provided')
    return new Function(`return (${opts.chain})`)()
}

function transformCode(parts: FromStatementParts[]): string {
    const arr = new Array().fill(null)
    let j = 0
    for (const st of parts || []) {
        let res: string[] = []
        try {
            res = execToSql((st.chain ? st.chain + '.' : '') + st.cleanFromChain).split('\n')
        } catch (err) {
            res = ['Error: ', String(st), String(err)]
        }
        let offset = 0
        while (arr[st.lineStart + offset]) offset++
        res.forEach((line, i) => arr[st.lineStart + i + offset - 1 + 0] = line)
    }
    return arr.map(e => e || '').join('\n')
}

const getStatementId = ({ param }) => {
    if (param.match(/^(\w+_)?(read|scan)(_\w+)\(/)) {
        return (new Function(` return ${param}`))()
    }
    return `${param}`
}

class Schemes {
    content = contentjson as Record<string, Record<string, any>>
    writeFile = async (filePath: string, content: string) => {
        console.log('writefile', filePath, content.length)
        await writeFile(filePath, content)
        await fetch('/save-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath: '/workspace/' + filePath, content }),
        })
    }
    updateContent = async () => {
        await this.writeFile('.buck/table.json', JSON.stringify(this.content, null, 2))
        const tsfile = generateInterface(this.content)
        await this.writeFile('.buck/table3.ts', tsfile)
    }
    upsertBuckStatements = async (statements: BuckStatementParts[]) => {
        let toUpdate = false
        for (const statement of statements) {
            if (this.content[statement.resource || ''] || !statement.resource?.match(/\.\w{2,10}$/)) {
                continue
            }
            try {
                const fnx = `return ${statement.fullCall || "Buck('')"}.fetchTables()`
                const fn = new Function(fnx)
                const schemas = await fn()
                const resource = statement.resource || ''
                this.content[resource] = schemas
                toUpdate = true
            } catch (err) {
                console.error(err)
                console.error('STERR', statement, err)
            }
            // this.content[resource][statement.param] = schema;
        }
        return toUpdate && this.updateContent()
    }
    upsertFromStatements = async (statements: FromStatementParts[]) => {
        let toUpdate = false
        for (const statement of statements) {
            if (!isFile(statement.param) && !isFunction(statement.param)) {
                continue
            }
            const resource = statement.resource || ''
            if (!this.content[resource]) {
                this.content[resource] = {}
            }

            const stx = getStatementId(statement)
            if (!this.content[resource]?.[stx] && !failedSet.has(stx)) {
                try {
                    const fnn = `return ${statement.chain || "Buck('')"}.describe("${stx}")`
                    const fn = new Function(fnn)
                    const schema = await fn()
                    this.content[resource][stx] = serializeDescribe(schema)
                    toUpdate = true
                } catch (_err) {
                    const err = _err as Error
                    // this.content[resource][statement.param] = {}
                    if ((err as Error)?.stack?.includes('@duckdb/duckdb-wasm')) {
                        this.content['error'] = this.content['error'] || {}
                        this.content['error'][stx] = {
                            [err.message]: 'DVarchar',
                        }
                        toUpdate = true
                    }
                    console.error(err)
                    failedSet.add(stx)
                }
            }
        }
        return toUpdate && this.updateContent()
    }
}

const schemes = new Schemes()

const failedSet = new Set([]) as Set<string>

const getCode = (uri: Uri): string => {
    const queryParams = new URLSearchParams(uri.query)
    const originalUriString = queryParams.get('original')

    if (!originalUriString) {
        return `// Error: Could not find original URI in query for ${uri.toString()}`
    }

    const originalUri = Uri.parse(decodeURIComponent(originalUriString), true)
    let code = ''
    const editor = VsCodeWindow.visibleTextEditors.find(e => e.document.uri.toString() === originalUri.toString())
    if (editor) {
        code = editor.document.getText()
    } else {
        const doc = VsCodeWorkspace.textDocuments.find(d => d.uri.toString() === originalUri.toString())
        if (doc) {
            code = doc.getText()
        } else {
            const active = VsCodeWindow.activeTextEditor
            if (active && active.document.uri.toString() === originalUri.toString()) code = active.document.getText()
            else return `// Original document not found: ${originalUriString}`
        }
    }
    return code
}

// const onTextUpdate = (code: string): string => {
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
    const parts = extractFromStatementsAST(code)
    const bsts = extractBuckStatement(code)

    schemes.upsertBuckStatements(bsts)
        .then(() => schemes.upsertFromStatements(parts))
        .catch(err => console.error(err))
}, 1000)

export const transformedProvider = new class implements TextDocumentContentProvider {
    onDidChangeEmitter = new EventEmitter<Uri>()
    onDidChange = this.onDidChangeEmitter.event
    provideTextDocumentContent(uri: Uri): string {
        const code = getCode(uri)
        refreshTypes(code)
        try {
            const parts = extractFromStatementsAST(code)
            return transformCode(parts)
        } catch (error) {
            console.error(error)
            return `// Error processing document:\n// ${error instanceof Error ? error.message : String(error)}`
        }
    }
    update(uri: Uri) {
        this.onDidChangeEmitter.fire(uri)
    }
}()
