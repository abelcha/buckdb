import { getService, IWorkbenchLayoutService } from '@codingame/monaco-vscode-api'
import { Parts } from '@codingame/monaco-vscode-views-service-override'
import type * as vscode from 'vscode' // Use type import for vscode API
import { evalChain, extractReconciledCalls } from '@buckdb/src/extractor'
import { triggerMethods } from '@buckdb/src/typedef'


const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const getPart = (document: vscode.TextDocument, targetLine: number) => {
    const extractedParts = extractReconciledCalls(document.getText())
    let i = 0;
    for (const e of extractedParts) {
        // console.log({ index, e })
        const next = extractedParts[++i]
        // console.log({ targetLine, linestart: e.lineStart }, targetLine >= e.lineStart, (!next || targetLine < next.lineStart))
        if (targetLine >= e.start.line && (!next || targetLine < next.start.line)) {
            return { ...e, lineEnd: next?.start.line || document.lineCount + 1 }
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

    let document = editor.document
    console.log(document.languageId);

    // For SQL files, use the corresponding TypeScript mirror file
    if (document.languageId === 'sql') {
        const mirrorDoc = VsCodeWindow.visibleTextEditors
            .find(e => e.document.fileName === document.fileName.replace('sql', 'ts'))
        if (mirrorDoc) {
            document = mirrorDoc.document
        }
    }

    if (document.languageId !== 'typescript' && document.languageId !== 'typescriptreact' && !document.fileName.endsWith('.ts') && !document.fileName.endsWith('.tsx')) {
        return
    }
    if (typeof targetLine === 'number') {
        startBar()
        layoutService.setPartHidden(true, Parts.PANEL_PART)
        const part = getPart(document, targetLine + 1)
        const passiveChain = part.chain.filter(([method]) => !triggerMethods.includes(method))
        const statement = evalChain(passiveChain, true)
        window.globalData = null
        window.globalError = null
        try {
            // console.log({ dst }) // Removed log
            const response = await statement?.execute({ withSchema: true })
            window.globalData = response
        } catch (err) {
            // @ts-ignore
            window.globalError = err
            console.error('erorr in eval', err)
        } finally {
            finishBar()
            await sleep(100) // Wait for the bar to finish
        }

        layoutService.setPartHidden(false, Parts.PANEL_PART)
        return
    }
    return
}
