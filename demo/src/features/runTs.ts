import { getService, IWorkbenchLayoutService } from '@codingame/monaco-vscode-api'
import { Parts } from '@codingame/monaco-vscode-views-service-override'
import { transform } from 'sucrase'
import type * as vscode from 'vscode' // Use type import for vscode API
import { extractFromStatementsAST } from '../../src/extract-from-statements'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const getPart = (document: vscode.TextDocument, targetLine: number) => {
    const extractedParts = extractFromStatementsAST(document.getText())
    // .find((e, index, arr) => {
    for (const [index, e] of extractedParts.entries()) {
        // console.log({ index, e })
        const next = extractedParts[index + 1]
        // console.log({ targetLine, linestart: e.lineStart }, targetLine >= e.lineStart, (!next || targetLine < next.lineStart))
        if (targetLine >= e.lineStart && (!next || targetLine < next.lineStart)) {
            return { ...e, lineEnd: next?.lineStart || document.lineCount + 1 }
        }
    }
    throw new Error('not found')
}
function startBar() {
    const container = document.getElementById('barContainer')
    const bar = document.getElementById('bar')
    // Reset any finish state
    bar.classList.remove('finish')
    bar.style.width = ''
    // Show and animate
    container.classList.add('active')
    // Restart animation: remove and trigger reflow, then add
    bar.classList.remove('active')
    void bar.offsetWidth // Force reflow
    bar.classList.add('active')
}

function finishBar() {
    const bar = document.getElementById('bar')
    // Jump to 100% width with nice transition
    bar.classList.add('finish')
    // Optionally: hide bar after finishing
    setTimeout(() => {
        document.getElementById('barContainer').classList.remove('active')
        bar.classList.remove('active', 'finish')
        bar.style.width = ''
    }, 250)
}

export async function runActiveTypeScriptFile(
    VsCodeWindow: typeof vscode.window, // Pass necessary parts of vscode API
    // outputChannel: vscode.OutputChannel, // Removed parameter
    targetLine?: number,
): Promise<void> {
    // console.log('RUNNING', targetLine) // Removed log

    const layoutService = await getService(IWorkbenchLayoutService)
    const editor = VsCodeWindow.activeTextEditor
    if (!editor) {
        // console.log("No active editor."); // Removed log
        return
    }

    const document = editor.document
    // Allow .ts or .tsx
    if (document.languageId !== 'typescript' && document.languageId !== 'typescriptreact' && !document.fileName.endsWith('.ts') && !document.fileName.endsWith('.tsx')) {
        // console.warn("Active file is not a TypeScript file."); // Removed log
        return
    }
    let codImp = document.getText().split(/\n+/).filter(e => !e.startsWith('import')).join('\n')
    if (typeof targetLine === 'number') {
        startBar()
        layoutService.setPartHidden(true, Parts.PANEL_PART)
        const part = getPart(document, targetLine + 1)
        // console.log('x', part) // Removed log
        const dst = [part.chain, part.cleanFromChain, 'execute({ withSchema: true })'].filter(Boolean).join('.')
        // console.log({ dst }) // Removed log
        window.globalData = null
        window.globalError = null
        try {
            // console.log({ dst }) // Removed log
            const evl = new Function(`return ${dst}`)
            // console.log('@@@@@@', evl.toString()) // Removed log
            window.globalData = await evl()
            console.log('GLOBAL DATA', window.globalData)
            // console.log({ dst, globalData: window.globalData, SCHEMAAAA: window.globalData?.schema }) // Removed log (also fixes TS error)
            // console.log('GLOBAL DATA:') // Removed log
            // console.log(window.globalData) // Removed log
        } catch (err) {
            // @ts-ignore
            window.globalError = err
            // console.log('erorr in evalllll', err) // Removed log
        } finally {
            finishBar()
            await sleep(100) // Wait for the bar to finish
        }

        layoutService.setPartHidden(false, Parts.PANEL_PART)
        return
    }

    const compiledCode = transform(codImp, { transforms: ['typescript'] }).code
    // console.log({ compiledCode }) // Removed log
    const str = `(async () => {\n ${compiledCode} \n})()`
    // console.log({ str }) // Removed log
    // console.log(compiledCode) // Removed log
    eval(str)
    return
}
