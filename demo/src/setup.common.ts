// import { transform } from "sucrase";
import { IWorkbenchConstructionOptions, LogLevel } from '@codingame/monaco-vscode-api'
import { EnvironmentOverride } from '@codingame/monaco-vscode-api/workbench'
import { initUserConfiguration, IStoredWorkspace } from '@codingame/monaco-vscode-configuration-service-override'
import { createIndexedDBProviders, RegisteredFileSystemProvider, RegisteredMemoryFile, registerFileSystemOverlay } from '@codingame/monaco-vscode-files-service-override'
import { initUserKeybindings } from '@codingame/monaco-vscode-keybindings-service-override'
import * as monaco from 'monaco-editor'
import * as vscode from 'vscode'
import { Worker } from './tools/crossOriginWorker'
import defaultConfiguration from './user/configuration.json'
import defaultKeybindings from './user/keybindings.json?raw'
import 'vscode/localExtensionHost'

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
const sourceFiles = await Promise.all(
    Object.entries(
        import.meta.glob('@buckdb/{src/*.ts,.buck/*.{ts,json},*.ts}', { as: 'raw', eager: false })
    ).map(async ([path, loader]) => {
        const content = await loader()
        return {
            path: path.split('buckdb/')[1],
            content: content.default || content
        }
    })
)


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

// Load examples
const examples = await Promise.all(
    Object.entries(
        import.meta.glob('@buckdb/examples/*.ts', { as: 'raw', eager: false })
    ).map(async ([path, loader]) => {
        const content = await loader()
        return {
            path: path.split('/').pop(),
            content: content.default || content
        }
    })
)
for (const example of examples) {
    loadFile(example.content, `examples/${example.path}`)
}


// const removeImports = (str: string) => str.split('\n').filter(e => !(e.match(/^\s*\/\//) || (e.startsWith('import') && e.includes('./')))).join('\n')
// const namespaceify = (name: string, str: string) => `namespace ${name}  {\n ${str}\n} \n`
// export const getFullBundle = () => {
//     const content = [jsep, parser, utils, table3, build].map(e => removeImports(e)).join('\n')
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

export type WorkerLoader = () => Worker
const workerLoaders: Partial<Record<string, WorkerLoader>> = {
    TextEditorWorker: () => new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), { type: 'module' }),
    TextMateWorker: () => new Worker(new URL('@codingame/monaco-vscode-textmate-service-override/worker', import.meta.url), { type: 'module' }),
    OutputLinkDetectionWorker: () => new Worker(new URL('@codingame/monaco-vscode-output-service-override/worker', import.meta.url), { type: 'module' }),
    LanguageDetectionWorker: () => new Worker(new URL('@codingame/monaco-vscode-language-detection-worker-service-override/worker', import.meta.url), { type: 'module' }),
    LocalFileSearchWorker: () => new Worker(new URL('@codingame/monaco-vscode-search-service-override/worker', import.meta.url), { type: 'module' }),
}
window.MonacoEnvironment = {
    getWorker: function (moduleId, label) {
        const workerFactory = workerLoaders[label]
        if (workerFactory != null) {
            return workerFactory()
        }
        throw new Error(`Unimplemented worker ${label} (${moduleId})`)
    },
}

const queryParams = new URLSearchParams(location.search)
const inlay = parseInt(queryParams.get('inlay'))
await Promise.all([
    // initCustomThemeRegister(),
    initUserConfiguration(JSON.stringify({
        ...defaultConfiguration,
        'editor.inlayHints.enabled': 'on', //queryParams.get('inlay')?.length ? 'offUnlessPressed' : 'onUnlessPressed',
        'editor.inlayHints.maximumLength': queryParams.has('inlay') && !isNaN(inlay) ? inlay : 0,
        'editor.quickSuggestions': {
            'other': true,
            'comments': false,
            'strings': true, // <-- Enable here
        },
    })),
    initUserKeybindings(defaultKeybindings),
])
const file = '/workspace/examples' + (location.pathname || '/demo.ts')


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
        'window.title': 'Monaco-Vscode-Api${separator}${dirty}${activeEditorShort}',
        'editor.minimap.enabled': false,
        'files.hotExit': 'off',
    },
    defaultLayout: {
        editors: [{ uri: monaco.Uri.file(file) }],
        layout: { editors: { orientation: 0, groups: [{ size: 1 }, { size: 1 }] } },
        views: [{ id: 'custom-view' }],
        force: resetLayout,
    },
    welcomeBanner: { message: 'Welcome in monaco-vscode-api demo' },
    productConfiguration: {
        nameShort: 'monaco-vscode-api',
        nameLong: 'monaco-vscode-api',
        extensionsGallery: { serviceUrl: 'https://open-vsx.org/vscode/gallery', resourceUrlTemplate: 'https://open-vsx.org/vscode/unpkg/{publisher}/{name}/{version}/{path}', extensionUrlTemplate: 'https://open-vsx.org/vscode/gallery/{publisher}/{name}/latest', controlUrl: '', nlsBaseUrl: '' },
    },
}

export const envOptions: EnvironmentOverride = {}
