import { updateUserKeybindings } from '@codingame/monaco-vscode-keybindings-service-override'
import * as monaco from 'monaco-editor'
import { clearStorage } from './setup.views'
import defaultKeybindings from './user/keybindings.json?raw'
import './main.v2'

document.querySelector('#clearStorage')?.addEventListener('click', async () => {
    await clearStorage()
})

// Removed: updateUserKeybindings on model creation to prevent undo stack pollution
// The keybindings are already initialized in setup.common.ts via initUserKeybindings()
