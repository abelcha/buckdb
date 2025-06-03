import { DuckDBDecimalValue, DuckDBListValue, DuckDBMapValue, DuckDBStructValue, DuckDBValue, type DuckDBConnection, type DuckDBInstance } from '@duckdb/node-api'
import { DSettings } from './.buck/types'
import { builder } from './src/build'
import { generateInterface, serializeDescribe, serializeSchema } from './src/interface-generator'
export * as readers from './src/readers'
import { readFileSync, writeFileSync } from 'node:fs'
import { BuckDBBase, CommandQueue, DuckdbCon } from './buckdb.core'
import { DuckDBResultReader } from '@duckdb/node-api/lib/DuckDBResultReader'
import { deriveName, isBucket, Dict } from './src/utils'


class JsonModelTable {
    constructor(
        private jsonContent: Dict = JSON.parse(readFileSync('./.buck/table.json', 'utf-8'))
    ) {
    }
    hasSchema(ressource: string, uri: string) {
        return this.jsonContent[ressource]?.[uri] ? true : false
    }
    writeDescribedSchema(ressource: string, uri: string, described: Record<string, any>) {
        if (!this.jsonContent[ressource]) {
            this.jsonContent[ressource] = {}
        }
        this.jsonContent[ressource][uri] = serializeDescribe(described as any)
        const tsfile = generateInterface(this.jsonContent)
        writeFileSync('./.buck/table.json', JSON.stringify(this.jsonContent, null, 2))
        writeFileSync('./.buck/table3.ts', tsfile)
    }
}

const jsonModelTable = new JsonModelTable()

const mapValueRec = (value: DuckDBValue) => {
    if (value instanceof DuckDBListValue) {
        return value.items.map(mapValueRec)
    } else if (value instanceof DuckDBDecimalValue) {
        return value.toDouble()
    } else if (value instanceof DuckDBMapValue) {
        return new Map(value.entries.map(x => [x.key, x.value]))
    } else if (value instanceof DuckDBStructValue) {
        const rtn = {}
        for (const [key, val] of Object.entries(value.entries)) {
            rtn[key] = mapValueRec(val)
        }
        return rtn
    } else if (typeof value === 'bigint') {
        return Number(value)
    } else {
        return value
    }
}


function buildResult(reader: DuckDBResultReader) {
    const rows = reader.getRows()
    // @ts-ignore
    const columnNames = reader.result.columnNames()
    const rtn: Dict[] = []
    for (let item of rows) {
        const row = {}
        for (const [i, name] of columnNames.entries()) {
            const value = item[i]
            row[name] = mapValueRec(value)
        }
        rtn.push(row)
    }
    return rtn
}


class BuckDBNode extends BuckDBBase {
    readonly type = 'node' as const
    private _instance: DuckDBInstance
    private _connection: DuckDBConnection
    private _initPromise: Promise<void> | null = null
    public isBucket: boolean = false
    
    constructor(
        handle?: string,
        settings?: Partial<DSettings>,
    ) {
        super(handle, settings)
        this.isBucket = !!isBucket(handle)
        this._instance = null as unknown as DuckDBInstance
        this._connection = null as unknown as DuckDBConnection
    }

    private _initDB(): Promise<void> {
        if (this._initPromise) {
            return this._initPromise
        }
        if (this._instance && this._connection) {
            return Promise.resolve()
        }

        this._initPromise = (async () => {
            const { DuckDBInstance } = await import('@duckdb/node-api')
            const han = this.isBucket ? ':memory:' : (this.handle || ':memory:')
            this._instance = await DuckDBInstance.create(han, (this.settings || {}) as any)
            this._connection = await this._instance.connect()
        })()

        return this._initPromise
    }

    async upsertSchema(model: string, schema: Record<string, string>) {
        // await this._initDB();
        // const tableFile = Bun.file(`./.buck/table.json`);
        // const tableContent = await tableFile.json();
        // if (!tableContent[this.handle || '']) {
        //     tableContent[this.handle || ''] = {};
        // }
        // tableContent[this.handle || ''][model] = schema;
        // await tableFile.write(JSON.stringify(tableContent, null, 2));
        // const tsfile = generateInterface(tableContent);
        // await Bun.file('./.buck/table3.ts').write(tsfile);
    }

    async ensureSchema(uri: string) {
        const h = this.handle || ''
        if (jsonModelTable.hasSchema(h, uri)) {
            return
        }
        const describeResp = await this.describe(uri)
        jsonModelTable.writeDescribedSchema(h, uri, describeResp)
    }
    async query(sql: string, opts: Record<string, any> = {}) {
        await this._initDB()
        const cmds = this.queue.flush()
        for (const cmd of cmds) {
            await this._connection.run(cmd)
        }
        const run = await this._connection.run(sql)
        const reader = new DuckDBResultReader(run);
        await reader.readAll()
        if (opts?.rows) {
            return reader.getRowsJson()
        }
        return buildResult(reader)
    }

    async run(sql: string) {
        await this._initDB()
        return this._connection.run(sql)
    }
}


export const Buck = builder(BuckDBNode)
export const MemoryDB = Buck('')
export const from = MemoryDB.from
