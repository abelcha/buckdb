import { updateUserKeybindings } from '@codingame/monaco-vscode-keybindings-service-override'
import * as monaco from 'monaco-editor'
import { clearStorage } from './setup.views'
import defaultKeybindings from './user/keybindings.json?raw'
import './main.v2'

document.querySelector('#clearStorage')?.addEventListener('click', async () => {
    await clearStorage()
})

monaco.editor.onDidCreateModel(() => {
    updateUserKeybindings(defaultKeybindings)
})
