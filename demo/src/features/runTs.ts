import type * as vscode from 'vscode'; // Use type import for vscode API
import { transform } from "sucrase";
import { extractFromStatementsAST } from '../../src/extract-from-statements';
import {
    IWorkbenchLayoutService,
    getService,

} from '@codingame/monaco-vscode-api'
import { Parts } from '@codingame/monaco-vscode-views-service-override';

const getPart = (document: vscode.TextDocument, targetLine: number) => {
    const extractedParts = extractFromStatementsAST(document.getText());
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


export async function runActiveTypeScriptFile(
    VsCodeWindow: typeof vscode.window, // Pass necessary parts of vscode API
    outputChannel: vscode.OutputChannel,
    targetLine?: number
): Promise<void> {
    console.log('RUNNING', targetLine)

    const layoutService = await getService(IWorkbenchLayoutService)
    const editor = VsCodeWindow.activeTextEditor;
    if (!editor) {
        // console.log("No active editor.");
        return;
    }

    const document = editor.document;
    // Allow .ts or .tsx
    if (document.languageId !== 'typescript' && document.languageId !== 'typescriptreact' && !document.fileName.endsWith('.ts') && !document.fileName.endsWith('.tsx')) {
        console.warn("Active file is not a TypeScript file.");
        return;
    }
    let codImp = document.getText().split(/\n+/).filter(e => !e.startsWith('import')).join('\n')
    if (typeof targetLine === 'number') {
        layoutService.setPartHidden(true, Parts.PANEL_PART)
        const part = getPart(document, targetLine + 1)
        // console.log('x', part)
        const dst = [part.chain, part.cleanFromChain, 'execute({ withSchema: true })'].filter(Boolean).join('.')
        console.log({ dst })
        window.globalData = null
        window.globalError = null
        try {
            // console.log({ dst })
            const evl = new Function(`return ${dst}`)
            // console.log('@@@@@@', evl.toString())
            window.globalData = await evl()
            console.log({ dst, globalData: window.globalData, SCHEMAAAA: window.globalData?.schema })
            // console.log('GLOBAL DATA:')
            // console.log(window.globalData)
        } catch (err) {
            window.globalError = err
            console.log('erorr in evalllll', err)
        }

        layoutService.setPartHidden(false, Parts.PANEL_PART)
        return
    }

    const compiledCode = transform(codImp, { transforms: ["typescript"] }).code;
    console.log({ compiledCode })
    const str = `(async () => {\n ${compiledCode} \n})()`
    console.log({ str })
    // console.log(compiledCode)
    eval(str)
    return

}
