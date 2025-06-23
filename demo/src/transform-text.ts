import { debounce, memoize } from 'es-toolkit'
import type { IDisposable } from 'monaco-editor'
import { alignExpressionWithSql } from './realign'
import { EventEmitter, TextDocumentContentProvider, Uri, window as VsCodeWindow, workspace as VsCodeWorkspace } from '@codingame/monaco-vscode-extension-api'
import contentjson from '@buckdb/.buck/models.json' // Use relative path
import { generateInterface, serializeDescribe } from '@buckdb/src/interface-generator' // Use relative path
import { isFile, isFunction } from '@buckdb/src/utils'
// import { BuckStatementParts, extractBuckStatement, extractFromStatementsAST, FromStatementParts } from '@buckdb/src/extract-from-statements'
import { writeFile } from './setup.common'
import { Extracted, extractReconciledCalls, cleanEval, evalChain } from '@buckdb/src/extractor'
import { InstanceOps, RessourceOps, triggerMethods } from '@buckdb/src/typedef'

export const transformedScheme = 'transformed'
export const scrollSyncMap = new Map<string, { sourceDisposable: IDisposable; targetDisposable: IDisposable }>()

const transformCache = new Map<string, string>()

const execToSql = (part: Extracted) => {
    if (transformCache.has(part.expression)) {
        return transformCache.get(part.expression)
    }
    const passiveChain = part.chain.filter(([method]) => !triggerMethods.includes(method))
    const st = evalChain(passiveChain)
    const rtn = st.toSql({ trim: true }) as string
    if (rtn.startsWith('CREATE')) {
        transformCache.set(part.expression, rtn)
        return rtn
    }
    const aligned = alignExpressionWithSql(part.expression, rtn);
    const s1 = aligned.replaceAll(/\s+/g, '')
    const s2 = rtn.replaceAll(/\s+/g, '')
    // debugger
    if (s1 !== s2) {
        console.error({ aligned, rtn })
        console.log({ s1, s2 })
        throw new Error(`Alignment failed for expression: ${part.expression}\nExpected: ${rtn}\nGot: ${aligned}`);
        console.error(`Alignment failed for expression: ${part.expression}\nExpected: ${rtn}\nGot: ${aligned}`);
        return rtn
    } else {
        // console.log('Alignment successful for expression:', { exp, aligned, rtn })
        // console.log('DIFFLEN', exp.trim().split('\n').length, aligned.trim().split('\n').length)
    }
    transformCache.set(part.expression, rtn)
    return aligned
}

export const BuckFromChain = (opts: { chain: string }) => {
    if (!opts.chain) throw new Error('No chain provided')
    return new Function(`return (${opts.chain})`)()
}

const parseChain = (chain: Extracted['chain']) => {
    const instanceName = chain.find(([methodName]) => methodName === 'Buck')
        ?.[1]?.map(e => cleanEval(e)).find(e => typeof e === 'string' ? e : '') || ''
    const instanceStr = !instanceName ? 'Buck()' : chain.filter(([methodName]) => InstanceOps.includes(methodName))
        .map(([m, p]) => `${m}(${p.join(',')})`).join('.')
    return { instanceName, instanceStr }
}



function transformCode(parts: Extracted[]): string {
    const arr = new Array().fill(null)
    for (const st of parts || []) {
        let res: string[] = []
        try {
            res = execToSql(st).split('\n')
        } catch (err) {
            // console.error(err)
            res = ['Error: ', String(err), ...('-- xx\n'.repeat(Math.max(st.end.line - st.start.line - 3, 0)).split('\n'))]
        }
        let offset = 0
        while (arr[st.start.line + offset]) offset++
        res.forEach((line, i) => arr[st.start.line + i + offset - 1 + 0] = line)
    }
    return arr.map(e => e || '').join('\n')
}

const tlogger = globalThis.TRANSFORM_LOGS ? (...e) => console.log('[TRANSFORM]', ...e) : () => { }

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
        await this.writeFile('.buck/models.json', JSON.stringify(this.content, null, 2))
        const tsfile = generateInterface(this.content)
        await this.writeFile('.buck/models.ts', tsfile)
    }
    upsertBuckStatements = async (statements: Extracted[]) => {
        let toUpdate = false
        for (const { chain } of statements) {

            const { instanceName, instanceStr } = parseChain(chain)
            const instance = cleanEval(instanceStr)

            if (this.content[instanceName || ''] || !instanceName?.match(/\.\w{2,10}$/)) {
                continue
            }
            try {

                const schemas = await instance.fetchTables()
                this.content[instanceName] = schemas
                toUpdate = true
            } catch (err) {
                console.error(err)
                console.error('STERR', instanceName, err)
            }
            // this.content[resource][statement.param] = schema;
        }
        return toUpdate && this.updateContent()
    }
    upsertFromStatements = async (statements: Extracted[]) => {
        tlogger('upsertFromStatements', statements)
        let toUpdate = false
        for (const { chain, expression, children } of statements) {
            const { instanceName, instanceStr } = parseChain(chain)
            const instance = cleanEval(instanceStr)
            const ressourceNames = chain.filter(([methodName]) => RessourceOps.includes(methodName))
                .map(([_, [param1]]) => cleanEval(param1))
            tlogger('Processing:', instanceName, ressourceNames)
            tlogger({ instance })
            for (const ressourceName of ressourceNames) {

                if (!isFile(ressourceName) && !isFunction(ressourceName)) {
                    tlogger(ressourceName, 'not a file an not a function')
                    continue
                }
                if (ressourceName.includes('*')/* && !ressource.includes('parquet')*/) {
                    tlogger(ressourceName, 'wildcard detected, continue ...')
                    continue
                }

                if (this.content[instanceName]?.[ressourceName]) {
                    tlogger(ressourceName, 'allready exist, continue ...')
                    continue
                }
                if (failedSet.has(instanceName + '-' + ressourceName)) {
                    tlogger(ressourceName, 'allready failed, continue ...')
                    continue
                }
                // this.content[instanceName][ressourceName] = 
                try {
                    // const fnn = `return ${expression.replace(/.(show|exec|execute)\(\)/, '')}.describe("${target}")`
                    // console.log({ fnn })
                    // const fn = new Function(fnn)
                    tlogger(ressourceName, 'describing ...')
                    const schema = await instance.describe(ressourceName)
                    tlogger(ressourceName, 'Schema retrieved:', { schema })
                    const serialized = serializeDescribe(schema)
                    tlogger(ressourceName, 'Schema serialized:', { serialized })
                    this.content[instanceName] ??= {}
                    this.content[instanceName][ressourceName] = serialized
                    tlogger('UPDATING', instanceName, ressourceName, this.content[instanceName][ressourceName])
                    toUpdate = true
                } catch (_err) {
                    const err = _err as Error
                    if ((err as Error)?.stack?.includes('@duckdb')) {
                        this.content['error'] = this.content['error'] || {}
                        this.content['error'][ressourceName] = {
                            [err.message]: 'DVarchar',
                        }
                        toUpdate = true
                    }
                    console.error('Failed to process:', err)
                    failedSet.add(instanceName + '-' + ressourceName)
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


const refreshTypes = debounce(async (code: string) => {
    const parts = extractReconciledCalls(code)

    schemes.upsertBuckStatements(parts)
        .then(() => schemes.upsertFromStatements(parts))
        .catch(err => console.error(err))
}, 1000, { edges: ['trailing'] })

export const transformedProvider = new class implements TextDocumentContentProvider {
    onDidChangeEmitter = new EventEmitter<Uri>()
    onDidChange = this.onDidChangeEmitter.event
    provideTextDocumentContent(uri: Uri): string {
        const code = getCode(uri)
        refreshTypes(code)
        try {
            const parts = extractReconciledCalls(code)
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
