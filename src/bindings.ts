import { DSettings } from '../.buck/types'

export type DuckdbCon = {
    type: 'wasm' | 'node'
    isBucket?: boolean
    handle?: string | null
    cmdQueue: CommandQueue
    run: (sql: string) => Promise<any>
    lazyAttach: (path: string, alias: string, options?: { readonly: boolean }) => any
    ensureSchema: (uri: string) => Promise<any>
    describe: (uri: string) => Promise<Record<string, any>>
    query: (sql: string, opts?: Record<string, any>) => Promise<any[]>
    lazySettings: (s: Partial<DSettings>) => DuckdbCon
    lazyExtensions: (...extensions: string[]) => DuckdbCon
}

export class CommandQueue {
    constructor() {
        this.queue = []
    }
    queue: string[]
    pushSettings(settings: Partial<DSettings> = {}) {
        const sts = Object.entries(settings).map(([key, value]) => `SET ${key} = '${value}'`)
        if (sts.length) {
            this.queue.push(sts.join('; '))
        }
        return this
    }
    pushAttach(path: string, alias: string, options?: { readonly: boolean }) {
        const opts = options?.readonly ? '(READONLY)' : ''
        this.queue.push(`ATTACH '${path}' AS ${alias} ${opts}`, `USE ${alias}`)
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
        const brokenExt = ['wireduck', 'vortex', 'tarfs', 'scrooge', 'redis', 'quackformers', 'pyroscope', 'pcap_reader', 'parser_tools', 'ofquack', 'nanodbc', 'nanoarrow', 'msolap', 'httpfs', 'hdf5']
        this.queue.push(...extensions.filter(e => !brokenExt.includes(e)).map(e => `INSTALL '${e}' ${!officialExtensions.includes(e) ? 'FROM community' : ''};LOAD '${e}';`))
        return this
    }
    flush() {
        const s = this.queue
        this.queue = []
        return s
    }
}
