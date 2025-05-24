import './style.css'
import { ExtensionHostKind, registerExtension } from '@codingame/monaco-vscode-api/extensions'
import './features/customView.views'

const { getApi } = registerExtension(
    {
        name: 'demo-main',
        publisher: 'codingame',
        version: '1.0.0',
        engines: { vscode: '*' },
    },
    ExtensionHostKind.LocalProcess,
)

document.querySelector('#resetLayout')?.addEventListener('click', async () => {
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
})
