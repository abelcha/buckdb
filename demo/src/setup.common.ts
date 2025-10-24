// import { transform } from "sucrase";
import { IWorkbenchConstructionOptions, LogLevel } from '@codingame/monaco-vscode-api'
import { EnvironmentOverride } from '@codingame/monaco-vscode-api/workbench'
import { initUserConfiguration, IStoredWorkspace } from '@codingame/monaco-vscode-configuration-service-override'
import { createIndexedDBProviders, RegisteredFileSystemProvider, RegisteredMemoryFile, registerFileSystemOverlay } from '@codingame/monaco-vscode-files-service-override'
import { initUserKeybindings } from '@codingame/monaco-vscode-keybindings-service-override'
import * as monaco from 'monaco-editor'
import * as vscode from '@codingame/monaco-vscode-extension-api'
import { Worker } from './tools/crossOriginWorker'
import defaultConfiguration from './user/configuration.json'
import defaultKeybindings from './user/keybindings.json?raw'
import '@codingame/monaco-vscode-extension-api/localExtensionHost'
import { retry } from 'es-toolkit'

const url = new URL(document.location.href)
const params = url.searchParams
export const remoteAuthority = params.get('remoteAuthority') ?? undefined
export const connectionToken = params.get('connectionToken') ?? undefined
export const remotePath = remoteAuthority != null ? (params.get('remotePath') ?? undefined) : undefined
export const resetLayout = params.has('resetLayout')
export const useHtmlFileSystemProvider = params.has('htmlFileSystemProvider')
params.delete('resetLayout')

window.history.replaceState({}, document.title, url.href)

export let workspaceFile = monaco.Uri.file('/workspace.code-workspace')
export const userDataProvider = await createIndexedDBProviders()
export const fileSystemProvider = new RegisteredFileSystemProvider(false)

const loadFile = (content: any, path: string) => {
    if (path.includes('/models.') && localStorage.getItem(`buckdbVirtualFile:/workspace/${path}`)) {
        content = localStorage.getItem(`buckdbVirtualFile:/workspace/${path}`)
    }
    fileSystemProvider.registerFile(new RegisteredMemoryFile(vscode.Uri.file(`/workspace/${path}`), content))
    return true
}

export async function writeFile(
    path: string,
    content: string, // Assuming string content for simplicity
): Promise<void> {
    const uri = vscode.Uri.file(`/workspace/${path}`) // Assuming files are relative to /workspace
    const uint8ArrayContent = new TextEncoder().encode(content)
    await fileSystemProvider.writeFile(
        uri,
        uint8ArrayContent,
        { create: true, overwrite: true, unlock: false, atomic: false }, // Added missing options
    )
}
const tsconf = JSON.stringify({
    compilerOptions: {
        strict: true,
        "noImplicitAny": false,
        'resolveJsonModule': true,
        'allowImportingTsExtensions': true,
        'target': 'ESNext',
        'module': 'ESNext',
        'moduleResolution': 'bundler',
        "baseUrl": ".",
        'paths': {
            '@buckdb/*': ['./*'],
            '@buckdb/isomorphic': ['./remote.ts'],
        }
    },
}, null, 2)

// Type declarations for import.meta
declare interface ImportMeta {
    glob: (paths: string | string[], options?: { as?: string; eager?: boolean }) => Record<string, () => Promise<any>>
}

// Type for glob imports
type GlobImport = Record<string, () => Promise<{ default: string }>>

// Import all source files
const entries = Object.entries(
    import.meta.glob('@buckdb/{src/*.ts,.buck/*.{ts,json},*.ts}', { as: 'raw', eager: true })
)

const sourceFiles = entries.map(([path, content]) => {
    return {
        path: path.split('../')[1],
        content: content as string
    }
})


// loadFile(JSON.stringify(
//     {
//         "name": "xx",
//         "module": "index.ts",
//         "type": "module",
//         "private": true,
//         "devDependencies": {
//         },
//         "peerDependencies": {
//             "typescript": "^5",
//             "@buckdb/isomorphic": "file:./remote.ts"
//         }
//     }, null, 2), 'package.json')

// Load all files
loadFile(tsconf, 'tsconfig.json')

for (const file of sourceFiles) {
    loadFile(file.content, file.path)
}


const examples = [
    ...Object.entries(import.meta.glob('@buckdb/watson/*.ts', { as: 'raw', eager: true })),
    ...Object.entries(import.meta.glob('@buckdb/examples/*.ts', { as: 'raw', eager: true })),
    ...Object.entries(import.meta.glob('@buckdb/showcase/*.ts', { as: 'raw', eager: true }))
].map(([path, content]) => {
    return {
        path: path.split('/').slice(-2).join('/'),
        content: content as string
    }
})
for (const example of examples) {
    loadFile(example.content, `${example.path}`)
}


// const removeImports = (str: string) => str.split('\n').filter(e => !(e.match(/^\s*\/\//) || (e.startsWith('import') && e.includes('./')))).join('\n')
// const namespaceify = (name: string, str: string) => `namespace ${name}  {\n ${str}\n} \n`
// export const getFullBundle = () => {
//     const content = [jsep, parser, utils, models, build].map(e => removeImports(e)).join('\n')
//         .replaceAll(/export\sdefault/g, '')
//         .replaceAll(/\n\s*export\s/g, '\n')
//     return namespaceify('t', types) + content
// }
// fileSystemProvider
// export const bundle = transform(getFullBundle(), { transforms: ["typescript"] })
// Use a workspace file to be able to add another folder later (for the "Attach filesystem" button)
fileSystemProvider.registerFile(
    new RegisteredMemoryFile(workspaceFile, JSON.stringify(<IStoredWorkspace>{ folders: [{ path: '/workspace' }] }, null, 2)),
)

fileSystemProvider.registerFile(
    new RegisteredMemoryFile(monaco.Uri.file('/workspace/.vscode/extensions.json'), JSON.stringify({ recommendations: [] }, null, 2)),
)
registerFileSystemOverlay(1, fileSystemProvider)

window.MonacoEnvironment = {
    getWorker: function (moduleId, label) {
        switch (label) {
            case 'TextEditorWorker':
                return new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), { type: 'module' })
            case 'TextMateWorker':
                return new Worker(new URL('@codingame/monaco-vscode-textmate-service-override/worker', import.meta.url), { type: 'module' })
            case 'OutputLinkDetectionWorker':
                return new Worker(new URL('@codingame/monaco-vscode-output-service-override/worker', import.meta.url), { type: 'module' })
            case 'LanguageDetectionWorker':
                return new Worker(new URL('@codingame/monaco-vscode-language-detection-worker-service-override/worker', import.meta.url), { type: 'module' })
            case 'LocalFileSearchWorker':
                return new Worker(new URL('@codingame/monaco-vscode-search-service-override/worker', import.meta.url), { type: 'module' })
            default:
                throw new Error(`Unimplemented worker ${label} (${moduleId})`)
        }
    },
}

const queryParams = new URLSearchParams(location.search)
const inlay = parseInt(queryParams.get('inlay'))

// Function to get inlay hints setting based on active file
const getInlayHintsSetting = () => {
    try {
        const activeEditor = vscode.window.activeTextEditor
        if (activeEditor) {
            const fileName = activeEditor.document.uri.path.split('/').pop()
            return fileName === 'demo.ts' ? 'onUnlessPressed' : 'off'
        }
        return 'off'
    } catch (error) {
        // API not ready yet, return default
        return 'off'
    }
}

await Promise.all([
    // initCustomThemeRegister(),
    initUserConfiguration(JSON.stringify({
        ...defaultConfiguration,
        "files.hotExit": 'off',
        "window.confirmBeforeClose": false,
        "workbench.editor.confirmClose": false,
        "workbench.editor.confirmCloseWithUnsavedChanges": false,
        "files.confirmDelete": false,
        'editor.inlayHints.enabled': 'off', // Start with 'off', will be updated when API is ready
        'editor.inlayHints.maximumLength': 60,
        'editor.quickSuggestions': {
            'other': true,
            'comments': false,
            'strings': true, // <-- Enable here
        },
    })),
    // initUserKeybindings(
    //     defaultKeybindings
    // )
    initUserKeybindings(
        import.meta.env.PROD ?
            defaultKeybindings.replace('control+enter', 'cmd+enter') :
            defaultKeybindings

    )
])

// Initialize inlay hints setting after API is ready and listen for changes
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
retry(async () => {
    await sleep(250)
    console.log('testing READYness')
    // Set initial value based on current active editor
    const initialSetting = getInlayHintsSetting()
    vscode.workspace.getConfiguration('editor').update('inlayHints.enabled', initialSetting, vscode.ConfigurationTarget.Global)

    // Listen for active editor changes to update inlay hints setting dynamically
    vscode.window.onDidChangeActiveTextEditor(() => {
        const newSetting = getInlayHintsSetting()
        vscode.workspace.getConfiguration('editor').update('inlayHints.enabled', newSetting, vscode.ConfigurationTarget.Global)
    })
    console.log('INIT SUCCEED')
}, 10) // Wait 1 second for API to be ready

setTimeout(() => {
    // Check if no editor is open after 1 second and open demo.ts if needed
    const editors = vscode.window.visibleTextEditors
    if (editors.length === 0) {
        vscode.window.showTextDocument(monaco.Uri.file('/workspace/showcase/demo.ts'), { preview: false })
    }
    // /
    // const demoUri = 
}, 3000)

export const defaultEditors = Object.keys(import.meta.glob('@buckdb/showcase/*.ts', { eager: true }))
    .map(path => ({ uri: monaco.Uri.file('/workspace/' + path.split('/').slice(-2).join('/')) }))
    .sort((a) => a.uri.path.endsWith('demo.ts') ? -1 : 1)
export const constructOptions: IWorkbenchConstructionOptions = {
    remoteAuthority,
    enableWorkspaceTrust: false,
    connectionToken,
    windowIndicator: { label: 'monaco-vscode-api', tooltip: '', command: '' },
    workspaceProvider: {
        trusted: true,
        async open() {
            window.open(window.location.href)
            return true
        },
        workspace: remotePath == null ? { workspaceUri: workspaceFile } : { folderUri: monaco.Uri.from({ scheme: 'vscode-remote', path: remotePath, authority: remoteAuthority }) },
    },
    developmentOptions: { logLevel: LogLevel.Info },
    configurationDefaults: {
    },
    defaultLayout: {
        editors: defaultEditors,
        layout: { editors: { orientation: 0, groups: [{ size: 1 }, { size: 1 }] } },
        views: [{ id: 'cussqdtom-view' }],
        force: resetLayout,
    },
    welcomeBanner: { message: 'Welcome in monaco-vscode-api demo' },
    productConfiguration: {
        nameShort: 'monaco-vscode-api',
        nameLong: 'monaco-vscode-api',
        extensionsGallery: {
            serviceUrl: 'https://open-vsx.org/vscode/gallery',
            resourceUrlTemplate: 'https://open-vsx.org/vscode/unpkg/{publisher}/{name}/{version}/{path}',
            extensionUrlTemplate: 'https://open-vsx.org/vscode/gallery/{publisher}/{name}/latest',
            controlUrl: '',
            nlsBaseUrl: ''
        },
    },
    // Set the default file to open when workspace loads

}

export const envOptions: EnvironmentOverride = {}
