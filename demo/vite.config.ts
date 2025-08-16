import importMetaUrlPlugin from '@codingame/esbuild-import-meta-url-plugin'
import * as fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import { configureResponseHeaders, duckdbProxy, duckdbServer, preventReloadOnMainV2Update, saveFileServer } from './vite.dbserver'
import wasm from 'vite-plugin-wasm'

const pkg = JSON.parse(
    fs.readFileSync(new URL('./package.json', import.meta.url).pathname).toString(),
)

const localDependencies = Object.entries(pkg.dependencies as Record<string, string>)
    .filter(([, version]) => version.startsWith('file:../../monaco-vscode-api/'))
    .map(([name]) => name)

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
    // prevent vite from obscuring rust errors
    clearScreen: false,
    build: {
        // Tauri uses Chromium on Windows and WebKit on macOS and Linux
        // target: 'chrome105',
        target: process.env.TAURI_ENV_PLATFORM == 'windows'
            ? 'chrome105'
            : 'safari13',
        // don't minify for debug builds
        minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
        // produce sourcemaps for debug builds
        sourcemap: !!process.env.TAURI_ENV_DEBUG,
    },
    worker: {
        format: 'es',
    },
    plugins: [
        wasm(),
        configureResponseHeaders(),
        saveFileServer(),
        preventReloadOnMainV2Update(),
        duckdbServer()
    ],
    esbuild: {
        minifySyntax: false,
    },
    optimizeDeps: {
        // This is require because vite excludes local dependencies from being optimized
        // Monaco-vscode-api packages are local dependencies and the number of modules makes chrome hang
        include: [
            // add all local dependencies...
            ...localDependencies,
            // and their exports
            '@codingame/monaco-vscode-api/extensions',
            '@codingame/monaco-vscode-api',
            '@codingame/monaco-vscode-api/monaco',
            '@codingame/monaco-vscode-extension-api/localExtensionHost',

            // These 2 lines prevent vite from reloading the whole page when starting a worker (so 2 times in a row after cleaning the vite cache - for the editor then the textmate workers)
            // it's mainly empirical and probably not the best way, fix me if you find a better way
            'vscode-textmate',
            'vscode-oniguruma',
            '@vscode/vscode-languagedetection',
            'marked',
        ],
        exclude: [],
        esbuildOptions: {
            tsconfig: './tsconfig.json',
            plugins: [importMetaUrlPlugin],
        },
    },
    server: {
        // make sure this port matches the devUrl port in tauri.conf.json file
        port: 5173,
        // Tauri expects a fixed port, fail if that port is not available
        strictPort: true,
        // if the host Tauri is expecting is set, use it
        host: host || false,
        hmr: host
            ? {
                protocol: 'ws',
                host,
                port: 1421,
            }
            : undefined,
        fs: {
            allow: ['../../../'], // allow to load codicon.ttf from monaco-editor in the parent folder and monaco-vscode-api package resources
        },
        proxy: duckdbProxy({ port: '9998' }),
        watch: {
            // tell vite to ignore watching `src-tauri`
            ignored: ['**/src-tauri/**'],
        },
    },
    // Env variables starting with the item of `envPrefix` will be exposed in tauri's source code through `import.meta.env`.
    envPrefix: ['VITE_', 'TAURI_ENV_*'],
    define: {
        rootDirectory: JSON.stringify(__dirname),
    },
    resolve: {
        dedupe: ['vscode', ...localDependencies],
        alias: {
            // Map an alias to the external directory
            // '@buckdb': '',
            '@buckdb/isomorphic': path.resolve(__dirname, '../remote.ts'),
            '@buckdb': path.resolve(__dirname, '../'),
        },
    },
})
console.log('===', path.resolve(__dirname, '../remote.ts'))
console.log('===', path.resolve(__dirname, '../'))
