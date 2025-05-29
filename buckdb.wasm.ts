import * as t from './.buck/types'
import { builder } from './src/build'
import { delta_scan, parquet_scan, read_csv, read_json, read_json_objects, read_parquet, read_text, read_xlsx } from './src/readers'
export { delta_scan, parquet_scan, read_csv, read_json, read_json_objects, read_parquet, read_text, read_xlsx }
import type * as DuckdbTyped from '@duckdb/duckdb-wasm/dist/types/src/index'
// @ts-ignore
import * as _Duckdb from 'https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.28.1-dev106.0/+esm'
const Duckdb = _Duckdb as typeof DuckdbTyped
import { BuckDBBase, CommandQueue, DuckdbCon } from './buckdb.core'
import { formatSource, isBucket } from './src/utils'

class BuckDBWasm extends BuckDBBase {
    readonly type = 'wasm' as const
    _db: DuckdbTyped.AsyncDuckDB = null
    _con: DuckdbTyped.AsyncDuckDBConnection | null = null
    _initPromise: Promise<void> | null = null

    private _initDB(): Promise<void> {
        // If initialization is already in progress or done, return the existing promise/resolved promise
        if (this._initPromise) {
            return this._initPromise
        }
        if (this._db && this._con) {
            return Promise.resolve()
        }

        // Start initialization
        this._initPromise = (async () => {
            const JSDELIVR_BUNDLES = Duckdb.getJsDelivrBundles()
            const bundle = await Duckdb.selectBundle(JSDELIVR_BUNDLES)

            const worker_url = URL.createObjectURL(
                new Blob([`importScripts("${bundle.mainWorker}");`], { type: 'text/javascript' }),
            )

            const worker = new Worker(worker_url)
            const logger = new Duckdb.ConsoleLogger()
            const db = new Duckdb.AsyncDuckDB(logger, worker)

            await db.instantiate(bundle.mainModule, bundle.pthreadWorker)
            URL.revokeObjectURL(worker_url)
            const path = isBucket(this.handle) ? ':memory:' : (this.handle || ':memory:')
            await db.open({
                path,
                useDirectIO: true,
                // accessMode: Duckdb.DuckDBAccessMode.READ_ONLY,
                filesystem: {
                    allowFullHTTPReads: true,
                },
                query: { castTimestampToDate: true, castBigIntToDouble: true },
            })

            this._db = db
            this._con = await this._db.connect()
            // @ts-ignore
            window.db = this._con
            // Don't clear the promise here, let it stay resolved
        })()

        return this._initPromise
    }

    async ensureSchema(uri: string) {
        // todo
    }

    private async _executeQueuedCommands(): Promise<void> {
        if (!this._con) throw new Error('Database connection not initialized.')
        const cmds = this.cmdQueue.flush()
        if (cmds.length > 0) {
            for await (const cmd of cmds) {
                // Use query for setup commands like attach, extensions, settings
                // send might be slightly more appropriate for non-select, but query works
                await this._con.query(cmd)
            }
        }
    }

    async query<T = Record<string, any>>(sql: string, opts: { rows?: boolean; withSchema?: boolean } = {}): Promise<T[]> {
        await this._initDB()
        await this._executeQueuedCommands() // Ensure setup commands run first
        if (!this._con) throw new Error('Database connection not initialized.') // Should be initialized now

        const reader = await this._con.query(sql)
        let rtn = reader.toArray().map(e => e.toJSON() as T)

        if (opts?.rows) {
            rtn = rtn.map(row => Object.values(row)) as T[]
        }
        if (opts?.withSchema && !sql.trim().toUpperCase().startsWith('COPY')) {
            const schemaReader = await this._con.query('DESCRIBE ' + sql)
            const schema = schemaReader.toArray().map(e => e.toJSON())
            Object.defineProperty(rtn, 'schema', { value: schema, enumerable: false })
        }
        return rtn
    }

    async run(sql: string): Promise<void> {
        await this._initDB()
        await this._executeQueuedCommands() // Ensure setup commands run first
        if (!this._con) throw new Error('Database connection not initialized.') // Should be initialized now

        await this._con.send(sql)
    }

    async close(): Promise<void> {
        // Only close if initialized
        if (this._initPromise) {
            await this._initPromise // Ensure init finishes before closing
        }
        if (this._con) {
            await this._con.close()
            this._con = null
        }
        if (this._db) {
            await this._db.terminate()
            this._db = null
        }
        this._initPromise = null // Reset init state
    }
}

// Create a single instance for export

// Pass the instance to the builder
export const Buck = builder(BuckDBWasm)

// Maintain existing export pattern
export const MemoryDB = Buck('')
export const from = MemoryDB.from

// Optional: Export the instance or class
// export { BuckDBWasm, buckDBWasmInstance };
