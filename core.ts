import type { DSettings } from './.buck/types'
import { formatSource } from './src/formalise'
import { parseObject } from './src/parser'
import { deriveName } from './src/utils'

export type DuckdbCon = {
    type: 'wasm' | 'node' | 'remote'
    isBucket?: boolean
    handle?: string | null
    queue: CommandQueue
    run: (sql: string) => Promise<any>
    stream: (sql: string) => AsyncGenerator<any>
    getSchemaUri: (model: string) => string
    lazyAttach: (path: string, alias: string, options?: { readonly: boolean }) => any
    ensureSchema: (uri: string) => Promise<any>
    describe: (uri: string) => Promise<Record<string, any>>
    query: (sql: string, opts?: Record<string, any>) => Promise<any[]>
    lazySettings: (s: Partial<DSettings>) => DuckdbCon
    lazyMacros: (s: Record<string, (...args: any[]) => any>) => DuckdbCon
    lazyExtensions: (...extensions: string[]) => DuckdbCon
}

export abstract class BuckDBBase implements DuckdbCon {
    abstract readonly type: 'wasm' | 'node' | 'remote'
    abstract query(sql: string, opts?: Record<string, any>): Promise<any[]>
    abstract run(sql: string): Promise<any>
    abstract stream(sql: string): AsyncGenerator<any>
    abstract ensureSchema(uri: string): Promise<any>
    readonly queue = new CommandQueue()

    constructor(
        public handle?: string,
        public settings?: Record<string, any>,
    ) { }
    getSchemaUri(s: string) {
        const [_, fnname] = s.match(/(\w+)\((.+)\)/) || []
        if (fnname) {
            return `${fnname}()`
        }
        return s
        // console.log({ s, match })
    }
    lazyMacros(s: any) {
        this.queue.pushMacros(s)
        return this
    }

    lazySettings(s: Partial<DSettings>) {
        this.queue.pushSettings(s)
        return this
    }

    lazyAttach(uri: string, alias?: string, options?: { readonly: boolean }) {
        this.queue.pushAttach(uri, alias || deriveName(uri), options)
        return this
    }

    lazyExtensions(...extensions: string[]) {
        this.queue.pushExtensions(...extensions)
        return this
    }

    async describe(uri: string) {
        return this.query(`DESCRIBE FROM ${formatSource({ catalog: this.handle, uri })};`)
    }
}

export class CommandQueue {
    constructor() {
        this.queue = []
    }
    usedDB: string | null = null
    queue: string[]

    getUsedDB() {
        if (!this.usedDB) {
            return ''
        }
        return `USE ${this.usedDB};`
    }

    pushMacros(macros: () => Record<string, (args: any) => any>) {
        const rrr = parseObject(macros)
            .map(([name, fn]) => `CREATE OR REPLACE MACRO ${name}${fn.replace('->', 'AS')};`)
            .join(';\n')
        this.queue.push(rrr)
        return this
    }
    pushSettings(settings: Partial<DSettings> = {}) {
        const sts = Object.entries(settings).map(([key, value]) => `SET ${key} = '${value}'`)
        if (sts.length) {
            this.queue.push(sts.join('; '))
        }
        return this
    }
    pushAttach(path: string, alias: string, options?: { readonly: boolean }) {
        const opts = options?.readonly ? '(READONLY)' : ''
        this.queue.push(`ATTACH OR REPLACE '${path}' AS ${alias} ${opts};`, `USE ${alias};`)
        this.usedDB = alias
        return this
    }
    pushExtensions(...extensions: string[]) {
        const officialExtensions = [
            'arrow',
            'autocomplete',
            'avro',
            'aws',
            'azure',
            'core_functions',
            'delta',
            'excel',
            'ducklake',
            'fts',
            'h3',
            'httpfs',
            'iceberg',
            'icu',
            'inet',
            'jemalloc',
            'json',
            'motherduck',
            'mysql_scanner',
            'parquet',
            'postgres_scanner',
            'spatial',
            'sqlite_scanner',
            'tpcds',
            'tpch',
            'ui',
            'vss',
        ]
        const brokenExt = ['h3','wireduck', 'vortex', 'tarfs', 'scrooge', 'redis', 'quackformers', 'pyroscope', 'pcap_reader', 'parser_tools', 'ofquack', 'nanodbc', 'nanoarrow', 'msolap', 'httpfs', 'hdf5']
        this.queue.push(...extensions.filter(e => !brokenExt.includes(e)).map(e => `INSTALL '${e}' ${!officialExtensions.includes(e) ? 'FROM community' : ''};LOAD '${e}';`))
        return this
    }
    flush() {
        const s = this.queue
        this.queue = []
        return s
    }
}
