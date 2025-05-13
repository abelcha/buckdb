// import { transform } from "sucrase";
import { IStoredWorkspace, initUserConfiguration } from '@codingame/monaco-vscode-configuration-service-override';
import { initUserKeybindings } from '@codingame/monaco-vscode-keybindings-service-override';
import { RegisteredFileSystemProvider, RegisteredMemoryFile, createIndexedDBProviders, registerFileSystemOverlay } from '@codingame/monaco-vscode-files-service-override';
import * as monaco from 'monaco-editor';
import { IWorkbenchConstructionOptions, LogLevel } from '@codingame/monaco-vscode-api';
import * as vscode from 'vscode';
import { EnvironmentOverride } from '@codingame/monaco-vscode-api/workbench';
import { Worker } from './tools/crossOriginWorker';
import defaultKeybindings from './user/keybindings.json?raw';
import defaultConfiguration from './user/configuration.json';
import 'vscode/localExtensionHost';

const url = new URL(document.location.href)
const params = url.searchParams
export const remoteAuthority = params.get('remoteAuthority') ?? undefined
export const connectionToken = params.get('connectionToken') ?? undefined
export const remotePath =
  remoteAuthority != null ? (params.get('remotePath') ?? undefined) : undefined
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
  content: string // Assuming string content for simplicity
): Promise<void> {
  const uri = vscode.Uri.file(`/workspace/${path}`); // Assuming files are relative to /workspace
  const uint8ArrayContent = new TextEncoder().encode(content);
  await fileSystemProvider.writeFile(
    uri,
    uint8ArrayContent,
    { create: true, overwrite: true, unlock: false, atomic: false } // Added missing options
  );
}

const parser = (await import('@external/src/parser.ts?raw')).default
const jsep = (await import('@external/src/jsep.ts?raw')).default

const serializer = (await import('@external/src/serializer.ts?raw')).default
const readers = (await import('@external/src/readers.ts?raw')).default

const interfaceGenerator = (await import('@external/src/interface-generator?raw')).default
const typedef = (await import('@external/src/typedef.ts?raw')).default

const types = (await import('@external/.buck/types.ts?raw')).default
const utils = (await import('@external/src/utils.ts?raw')).default
const copy = (await import('@external/src/copy.ts?raw')).default
const table3 = (await import('@external/.buck/table3.ts?raw')).default
const tablejson = (await import('@external/.buck/table.json?raw')).default
const buildTypes = (await import('@external/src/build.types.ts?raw')).default
const build = (await import('@external/src/build.ts?raw')).default
const buckdb = (await import('@external/buckdb.wasm.ts?raw')).default
const demo = (await import('@external/demo.ts?raw')).default
const tsconf = JSON.stringify({
  compilerOptions: {
    strict: true, "resolveJsonModule": true, "allowImportingTsExtensions": true, "target": "ESNext", "module": "ESNext", "moduleResolution": "bundler",
  }
})

loadFile(tsconf, 'tsconfig.json',)
loadFile(parser, 'src/parser.ts')
loadFile(jsep, 'src/jsep.ts',)
loadFile(copy, 'src/copy.ts',)
loadFile(types, '.buck/types.ts',)
loadFile(tablejson, '.buck/table.json',)
loadFile(utils, 'src/utils.ts',)
loadFile(table3, '.buck/table3.ts',)
loadFile(buildTypes, 'src/build.types.ts',)
loadFile(build, 'src/build.ts',)
loadFile(buckdb, 'buckdb.ts',)
loadFile(demo, 'demo.ts',)
loadFile(typedef, 'src/typedef.ts',)
loadFile(serializer, 'src/serializer.ts',)
loadFile(readers, 'src/readers.ts',)
loadFile(interfaceGenerator, 'src/interface-generator.ts',)


const removeImports = (str: string) => str.split('\n').filter(e => !(e.match(/^\s*\/\//) || (e.startsWith('import') && e.includes('./')))).join('\n')
const namespaceify = (name, str: string) => `namespace ${name}  {\n ${str}\n} \n`
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
  new RegisteredMemoryFile(workspaceFile, JSON.stringify(<IStoredWorkspace>{ folders: [{ path: '/workspace' }] }, null, 2))
)

fileSystemProvider.registerFile(
  new RegisteredMemoryFile(monaco.Uri.file('/workspace/.vscode/extensions.json'), JSON.stringify({ recommendations: [], }, null, 2))
)
registerFileSystemOverlay(1, fileSystemProvider)

export type WorkerLoader = () => Worker
const workerLoaders: Partial<Record<string, WorkerLoader>> = {
  TextEditorWorker: () => new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), { type: 'module' }),
  TextMateWorker: () => new Worker(new URL('@codingame/monaco-vscode-textmate-service-override/worker', import.meta.url), { type: 'module' }),
  OutputLinkDetectionWorker: () => new Worker(new URL('@codingame/monaco-vscode-output-service-override/worker', import.meta.url), { type: 'module' }),
  LanguageDetectionWorker: () => new Worker(new URL('@codingame/monaco-vscode-language-detection-worker-service-override/worker', import.meta.url), { type: 'module' }),
  LocalFileSearchWorker: () => new Worker(new URL('@codingame/monaco-vscode-search-service-override/worker', import.meta.url), { type: 'module' })
}
window.MonacoEnvironment = {
  getWorker: function (moduleId, label) {
    const workerFactory = workerLoaders[label]
    if (workerFactory != null) {
      return workerFactory()
    }
    throw new Error(`Unimplemented worker ${label} (${moduleId})`)
  }
}

await Promise.all([
  // initCustomThemeRegister(),
  initUserConfiguration(JSON.stringify({
    ...defaultConfiguration,
    // Enable quick suggestions within strings
    "editor.quickSuggestions": {
      "other": true,
      "comments": false,
      "strings": true // <-- Enable here
    }
  })),
  initUserKeybindings(defaultKeybindings)
])

export const constructOptions: IWorkbenchConstructionOptions = {
  remoteAuthority,
  enableWorkspaceTrust: false,
  connectionToken, windowIndicator: { label: 'monaco-vscode-api', tooltip: '', command: '' },
  workspaceProvider: {
    trusted: true,
    async open() {
      window.open(window.location.href)
      return true
    },
    workspace: remotePath == null ? { workspaceUri: workspaceFile } : { folderUri: monaco.Uri.from({ scheme: 'vscode-remote', path: remotePath, authority: remoteAuthority }) }
  },
  developmentOptions: { logLevel: LogLevel.Info },
  configurationDefaults: {
    'window.title': 'Monaco-Vscode-Api${separator}${dirty}${activeEditorShort}',
    "editor.minimap.enabled": false,
    "files.hotExit": "off"
  },
  defaultLayout: {
    editors: useHtmlFileSystemProvider ? undefined : [{ uri: monaco.Uri.file('/workspace/demo.ts'), },], layout: useHtmlFileSystemProvider ? undefined : { editors: { orientation: 0, groups: [{ size: 1 }, { size: 1 }] } }, views: [{ id: 'custom-view' }],
    force: resetLayout
  },
  welcomeBanner: { message: 'Welcome in monaco-vscode-api demo' },
  productConfiguration: {
    nameShort: 'monaco-vscode-api',
    nameLong: 'monaco-vscode-api',
    extensionsGallery: { serviceUrl: 'https://open-vsx.org/vscode/gallery', resourceUrlTemplate: 'https://open-vsx.org/vscode/unpkg/{publisher}/{name}/{version}/{path}', extensionUrlTemplate: 'https://open-vsx.org/vscode/gallery/{publisher}/{name}/latest', controlUrl: '', nlsBaseUrl: '' }
  }
}


export const envOptions: EnvironmentOverride = {
}
