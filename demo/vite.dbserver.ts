import { resolve } from 'path'
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
            cwd: resolve('../executor'),
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
            '-c',
            'INSTALL httpserver FROM community; LOAD httpserver; SELECT httpserve_start(\'0.0.0.0\', 9998, \'\');'
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