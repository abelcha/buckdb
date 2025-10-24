import * as fs from 'fs'
import path from 'path'
import { highlightSql, currentStyles } from '../src/highlighter'
import { timecolor } from '../src/log'
import { spawn } from 'child_process'

export const rustExecutor = () => ({
    name: 'start-duckdb-rust-executor',
    apply: 'serve',
    async configureServer(server) {
        const duckdbProcess = spawn('cargo', [
            "watch",
            '--exec',
            'run'
        ], {
            cwd: path.resolve('../executor'),
            env: { ...process.env, PORT: '8081' }
        })
        duckdbProcess.stdout.on('data', (data) => {
            console.log(`[DuckDB] ${data.toString()}`)
        })
        duckdbProcess.stderr.on('data', (data) => {
            console.log(`[DuckDB] ${data.toString()}`)
        })
        duckdbProcess.on('close', (code) => {
            console.log(`[DuckDB] process exited with code ${code}`)
        })
    },
})

export const duckdbServer = () => ({
    name: 'start-duckdb-http-server',
    apply: 'serve',
    async configureServer(server) {
        const duckdbProcess = spawn('duckdb', [
            '-unsigned',
            '-c',
            'INSTALL hostfs FROM community; LOAD hostfs;INSTALL httpserver FROM community;LOAD \'/Volumes/dev/duckdb-excel/build/release/extension/excel/excel.duckdb_extension\'; LOAD httpserver; SELECT httpserve_start(\'0.0.0.0\', 9998, \'\');'
        ], {
            env: { ...process.env, DUCKDB_HTTPSERVER_FOREGROUND: '1' }
        })
        duckdbProcess.stdout.on('data', (data) => {
            console.log(`[DuckDB] ${data.toString()}`)
        })
        duckdbProcess.stderr.on('data', (data) => {
            console.log(`[DuckDB] ${data.toString()}`)
        })
        duckdbProcess.on('close', (code) => {
            console.log(`[DuckDB] process exited with code ${code}`)
        })
    },
})


export const duckdbProxy = (opts: { port: string }) => ({
    '/duckdb': {
        target: 'http://localhost:' + opts.port,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/duckdb/, ''),
        configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
                const chunks: Buffer[] = []
                req.on('data', chunk => chunks.push(chunk))
                req.on('end', () => {
                    const body = Buffer.concat(chunks).toString()
                    console.log(currentStyles.comment, '-----------', timecolor(new Date().toISOString()), currentStyles.comment, '----------')
                    console.log(highlightSql(body))
                })
            })
        },
    },
})

export const saveFileServer = () => ({
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
                console.log('Save file request received:', req.method, req.url)
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
})
export const preventReloadOnMainV2Update = () => ({
    // Custom plugin to prevent HMR reload for specific file
    name: 'prevent-reload-on-main-v2-update',
    apply: 'serve',
    handleHotUpdate({ file, server, modules }) {
        // Use path.resolve to ensure consistent path format
        console.log('HMR', file, modules.map(m => m.url))
        // const targetFile = path.resolve(__dirname, 'src/main.v2.ts');
        if (file.match(/demo|tutorial|.buck/)) {
            console.log(`[HMR Prevent] Update detected for ${file}. Preventing reload.`)
            // Returning an empty array prevents the update from being processed
            // and thus stops the full page reload for this specific file.
            return []
        }
        // For all other files, let Vite handle HMR as usual
        return modules
    },
})

export const configureResponseHeaders = () => ({
    name: 'configure-response-headers',
    apply: 'serve',
    configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
            res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
            next()
        })
    },
})
