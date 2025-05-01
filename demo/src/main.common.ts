import './style.css'
import { ExtensionHostKind, registerExtension } from '@codingame/monaco-vscode-api/extensions'
import './features/output'
import './features/intellisense'
import './features/customView.views'
import './features/ai'
import '@codingame/monaco-vscode-css-default-extension'
import '@codingame/monaco-vscode-diff-default-extension'
import '@codingame/monaco-vscode-javascript-default-extension'
import '@codingame/monaco-vscode-json-default-extension'
import '@codingame/monaco-vscode-typescript-basics-default-extension'
import '@codingame/monaco-vscode-theme-defaults-default-extension'
import '@codingame/monaco-vscode-theme-seti-default-extension'
import '@codingame/monaco-vscode-references-view-default-extension'
import '@codingame/monaco-vscode-search-result-default-extension'
import '@codingame/monaco-vscode-configuration-editing-default-extension'
import '@codingame/monaco-vscode-markdown-math-default-extension'
import '@codingame/monaco-vscode-media-preview-default-extension'


const { getApi } = registerExtension(
  {
    name: 'demo-main',
    publisher: 'codingame',
    version: '1.0.0',
    engines: {
      vscode: '*'
    }
  },
  ExtensionHostKind.LocalProcess
)

document.querySelector('#resetLayout')!.addEventListener('click', async () => {
  console.log('reset-layout')


  // const url = new URL(window.location.href)
  // url.searchParams.set('resetLayout', 'true')
  // window.location.href = url.toString()
})
void getApi().then(async (vscode) => {

  // on text change
  // vscode.languages.onDidChangeDiagnostics((e) => {
  //   console.log('Diagnostics changed', e)
  // });
  // vscode.workspace.onDidChangeTextDocument((event) => {
  //   const { document, contentChanges } = event
  //   const { text } = contentChanges[0] || {}
  //   const { uri } = document
  //   console.log('Text changed in document', uri.toString(), 'with text', text)
  //   // const editor = monaco.editor.getEditors()
  // })

  // if (!useHtmlFileSystemProvider) {
  //   const mainModelUri = vscode.Uri.file('/workspace/demo.ts')
  //   await Promise.all([
  //     vscode.workspace.openTextDocument(mainModelUri),
  //     // vscode.workspace.openTextDocument(monaco.Uri.file('/workspace/test_readonly.js')) // open the file so vscode sees it's locked
  //   ])

  //   const diagnostics = vscode.languages.createDiagnosticCollection('demo')
  //   diagnostics.set(mainModelUri, [
  //     // {
  //     //   range: new vscode.Range(2, 9, 2, 12),
  //     //   severity: vscode.DiagnosticSeverity.Error,
  //     //   message: "This is not a real error, just a demo, don't worry",
  //     //   source: 'Demo',
  //     //   code: 42
  //     // }
  //   ])
  // }

  // document.querySelector('#toggleFullWorkbench')!.addEventListener('click', async () => {
  //   const url = new URL(window.location.href)
  //   if (url.searchParams.get('mode') === 'full-workbench') {
  //     url.searchParams.delete('mode')
  //   } else {
  //     url.searchParams.set('mode', 'full-workbench')
  //   }
  //   window.location.href = url.toString()
  // })



  // document.querySelector('#toggleHTMLFileSystemProvider')!.addEventListener('click', async () => {
  //   const url = new URL(window.location.href)
  //   if (url.searchParams.has('htmlFileSystemProvider')) {
  //     url.searchParams.delete('htmlFileSystemProvider')
  //   } else {
  //     url.searchParams.set('htmlFileSystemProvider', 'true')
  //   }
  //   window.location.href = url.toString()
  // })
})
// 