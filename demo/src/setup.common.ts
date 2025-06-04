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
    },
})

const parser = (await import('@buckdb/src/parser.ts?raw')).default
const jsep = (await import('@buckdb/src/jsep.ts?raw')).default

const serializer = (await import('@buckdb/src/serializer.ts?raw')).default
const readers = (await import('@buckdb/src/readers.ts?raw')).default

const interfaceGenerator = (await import('@buckdb/src/interface-generator?raw')).default
const typedef = (await import('@buckdb/src/typedef.ts?raw')).default

const types = (await import('@buckdb/.buck/types.ts?raw')).default
const utils = (await import('@buckdb/src/utils.ts?raw')).default
const core = (await import('@buckdb/buckdb.core.ts?raw')).default
const copy = (await import('@buckdb/src/copy.ts?raw')).default
const formalise = (await import('@buckdb/src/formalise.ts?raw')).default
const deepMap = (await import('@buckdb/src/deep-map.ts?raw')).default
const table3 = (await import('@buckdb/.buck/table3.ts?raw')).default
const tablejson = (await import('@buckdb/.buck/table.json?raw')).default
const buildTypes = (await import('@buckdb/src/build.types.ts?raw')).default
const build = (await import('@buckdb/src/build.ts?raw')).default
const genericUtils = (await import('@buckdb/src/generic-utils.ts?raw')).default
const buckdb = (await import('@buckdb/buckdb.remote.ts?raw')).default

const examples = await Promise.all(
    Object.entries(
        // @ts-ignore
        import.meta.glob('@buckdb/examples/*.ts', { as: 'raw' })
    ).map(async ([path, loader]) => ({
        // @ts-ignore
        path: path.split('/').pop(), content: await loader()
    }))
)
for (const example of examples) {
    loadFile(example.content, `examples/${example.path}`)
}


loadFile(tsconf, 'tsconfig.json')
loadFile(parser, 'src/parser.ts')
loadFile(jsep, 'src/jsep.ts')
loadFile(copy, 'src/copy.ts')
loadFile(genericUtils, 'src/generic-utils.ts')

loadFile(formalise, 'src/formalise.ts')
loadFile(types, '.buck/types.ts')
loadFile(tablejson, '.buck/table.json')
loadFile(utils, 'src/utils.ts')
loadFile(table3, '.buck/table3.ts')
loadFile(buildTypes, 'src/build.types.ts')
loadFile(deepMap, 'src/deep-map.ts')
loadFile(build, 'src/build.ts')
loadFile(core, 'buckdb.core.ts')
loadFile(buckdb, 'buckdb.ts')
// loadFile(demo, 'demo.ts')
loadFile(typedef, 'src/typedef.ts')
loadFile(serializer, 'src/serializer.ts')
loadFile(readers, 'src/readers.ts')
loadFile(interfaceGenerator, 'src/interface-generator.ts')

const removeImports = (str: string) => str.split('\n').filter(e => !(e.match(/^\s*\/\//) || (e.startsWith('import') && e.includes('./')))).join('\n')
const namespaceify = (name: string, str: string) => `namespace ${name}  {\n ${str}\n} \n`
export const getFullBundle = () => {
    const content = [jsep, parser, utils, table3, build].map(e => removeImports(e)).join('\n')
        .replaceAll(/export\sdefault/g, '')
        .replaceAll(/\n\s*export\s/g, '\n')
    return namespaceify('t', types) + content
}
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
console.log('-->', queryParams.has('inlay') && !isNaN(inlay) ? inlay : 0)
await Promise.all([
    // initCustomThemeRegister(),
    initUserConfiguration(JSON.stringify({
        ...defaultConfiguration,
        'editor.inlayHints.enabled': !queryParams.get('inlay')?.length ? 'offUnlessPressed' : 'onUnlessPressed',
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
