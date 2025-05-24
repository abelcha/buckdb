// @ts-nocheck
import importMetaUrlPlugin from '@codingame/esbuild-import-meta-url-plugin'
import * as fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
const pkg = JSON.parse(
    fs.readFileSync(new URL('./package.json', import.meta.url).pathname).toString(),
)
import wasm from 'vite-plugin-wasm'

const localDependencies = Object.entries(pkg.dependencies as Record<string, string>)
    .filter(([, version]) => version.startsWith('file:../../monaco-vscode-api/'))
    .map(([name]) => name)
export default defineConfig({
    build: {
        target: 'esnext',
    },
    worker: {
        format: 'es',
    },
    plugins: [
        wasm(),
        {
            // For the *-language-features extensions which use SharedArrayBuffer
            name: 'configure-response-headers',
            apply: 'serve',
            configureServer: (server) => {
                console.log('GLOBALTHIS', !!globalThis.Bun)
                server.middlewares.use((_req, res, next) => {
                    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless')
                    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
                    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
                    next()
                })
            },
        },
        {
            name: 'force-prevent-transform-assets',
            apply: 'serve',
            configureServer(server) {
                return () => {
                    server.middlewares.use(async (req, res, next) => {
                        if (req.originalUrl != null) {
                            const pathname = new URL(req.originalUrl, import.meta.url).pathname
                            if (pathname.endsWith('.html')) {
                                res.setHeader('Content-Type', 'text/html')
                                res.writeHead(200)
                                res.write(fs.readFileSync(path.join(__dirname, pathname)))
                                res.end()
                            }
                        }

                        next()
                    })

                    server.middlewares.use('/save-file', (req, res, next) => {
                        if (req.method !== 'POST') {
                            return next() // Only handle POST requests
                        }

                        let body = ''
                        req.on('data', chunk => {
                            body += chunk.toString() // Convert Buffer to string
                        })

                        req.on('end', () => {
                            try {
                                let { filePath, content } = JSON.parse(body)
                                filePath = filePath.replace('/workspace', '/me/dev/buckdb')

                                // ... validation and security checks ...

                                console.log(`[SaveFile] Writing to: ${filePath}`)
                                // This is where the file is written to the disk on the server side
                                fs.writeFileSync(filePath, content, 'utf8')

                                res.writeHead(200, { 'Content-Type': 'application/json' })
                                res.end(JSON.stringify({ success: true }))
                            } catch (error: any) {
                                // ... error handling ...
                            }
                        })
                    })
                }
            },
        },
        {
            // Custom plugin to prevent HMR reload for specific file
            name: 'prevent-reload-on-main-v2-update',
            apply: 'serve',
            handleHotUpdate({ file, server, modules }) {
                // Use path.resolve to ensure consistent path format
                console.log('HMR', file)
                // const targetFile = path.resolve(__dirname, 'src/main.v2.ts');
                if (file.includes('/buckdb/')) {
                    console.log(`[HMR Prevent] Update detected for ${file}. Preventing reload.`)
                    // Returning an empty array prevents the update from being processed
                    // and thus stops the full page reload for this specific file.
                    return []
                }
                // For all other files, let Vite handle HMR as usual
                return modules
            },
        },
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
            'vscode/localExtensionHost',

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
        allowedHosts: ['reel-wx-supreme-flame.trycloudflare.com'],
        port: 5173,
        host: '0.0.0.0',
        fs: {
            allow: ['../../'], // allow to load codicon.ttf from monaco-editor in the parent folder and monaco-vscode-api package resources
        },
    },
    define: {
        rootDirectory: JSON.stringify(__dirname),
    },
    resolve: {
        dedupe: ['vscode', ...localDependencies],
        alias: {
            // Map an alias to the external directory
            '@external': '/me/dev/buckdb',
        },
    },
})
// console.log('===', path.resolve(__dirname, '../../buckdb'))
