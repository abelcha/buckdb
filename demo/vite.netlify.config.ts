// @ts-nocheck
import * as fs from 'fs'
import { defineConfig } from 'vite'
import path from 'node:path'
const pkg = JSON.parse(
    fs.readFileSync(new URL('./package.json', import.meta.url).pathname).toString(),
)

const localDependencies = Object.entries(pkg.dependencies as Record<string, string>)
    .filter(([, version]) => version.startsWith('file:../'))
    .map(([name]) => name)

export default defineConfig({
    build: {
        target: 'esnext',
        assetsInlineLimit: 0,
        rollupOptions: {
            external: ['typescript'],
        },
    },
    worker: {
        format: 'es',
    },
    esbuild: {
        minifySyntax: false,
    },
    
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
