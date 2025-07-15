// @ts-nocheck
import { visualizer } from "rollup-plugin-visualizer";

import * as fs from 'fs'
import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
import { createHtmlPlugin } from 'vite-plugin-html'
const pkg = JSON.parse(
    fs.readFileSync(new URL('./package.json', import.meta.url).pathname).toString()
)

const localDependencies = Object.entries(pkg.dependencies as Record<string, string>)
    .filter(([, version]) => version.startsWith('file:../'))
    .map(([name]) => name)
const _headers = `/*
    Cross-Origin-Opener-Policy: same-origin
    Cross-Origin-Embedder-Policy: credentialless
`

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        envDir: process.cwd(),
        envPrefix: 'VITE_',
        build: {
            target: 'esnext',
            assetsInlineLimit: 100_000_000_000,
            minify: true,
            rollupOptions: {
                output: {
                    // dynamicImportInCjs: true,
                    // inlineDynamicImports: true,
                    manualChunks: undefined,
                }
            }
        },
        worker: {
            format: 'es',
        },
        esbuild: {
            minifySyntax: true,
            treeShaking: true,
        },
        resolve: {
            dedupe: ['vscode', ...localDependencies],
            alias: {
                '@buckdb/isomorphic': path.resolve(__dirname, '../remote.ts'),
                '@buckdb': path.resolve(__dirname, '../'),
            },
        },
        define: {
        },
        plugins: [
            createHtmlPlugin({
                minify: true
            }),
            visualizer(),
            {
                name: 'copy-headers',
                writeBundle() {
                    fs.writeFileSync('dist/_headers', _headers);
                }
            }
        ]
    }
})
