import { ExtensionHostKind, registerExtension } from '@codingame/monaco-vscode-api/extensions'
import { useHtmlFileSystemProvider } from '../setup.common'

// if (!useHtmlFileSystemProvider) {
console.log('SETUPUUUP')
const { getApi } = registerExtension(
    {
        name: 'outputDemo',
        publisher: 'codingame',
        version: '1.0.0',
        engines: {
            vscode: '*',
        },
    },
    ExtensionHostKind.LocalProcess,
)

void getApi().then(async (vscode) => {
    const fakeOutputChannel = vscode.window.createOutputChannel('Fake output')
    const anotherFakeOutputChannel = vscode.window.createOutputChannel('Your code', 'javascript')

    fakeOutputChannel.append("Here's some fake output\n")
    setInterval(() => {
        fakeOutputChannel.append('Hello world\n')
    }, 1000)

    const mainDocument = await vscode.workspace.openTextDocument(
        vscode.Uri.file('/workspace/demo.ts'),
    )
    anotherFakeOutputChannel.replace(mainDocument.getText())
    vscode.workspace.onDidChangeTextDocument((e) => {
        if (e.document === mainDocument && e.contentChanges.length > 0) {
            anotherFakeOutputChannel.replace(e.document.getText())
        }
    })
})
// }
