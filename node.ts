import { DuckDBArrayValue, DuckDBBitValue, DuckDBBlobValue, DuckDBDateValue, DuckDBDecimalValue, DuckDBIntervalValue, DuckDBListValue, DuckDBMapValue, DuckDBResult, DuckDBStructValue, DuckDBTimestampMillisecondsValue, DuckDBTimestampNanosecondsValue, DuckDBTimestampSecondsValue, DuckDBTimestampTZValue, DuckDBTimestampValue, DuckDBTimeTZValue, DuckDBTimeValue, DuckDBTypeId, DuckDBUnionValue, DuckDBUUIDValue, DuckDBValue, type DuckDBConnection, type DuckDBInstance } from '@duckdb/node-api'
import { delta_scan, parquet_scan, read_csv, read_json, read_json_objects, read_parquet, read_text, read_xlsx } from './io'
export { delta_scan, parquet_scan, read_csv, read_json, read_json_objects, read_parquet, read_text, read_xlsx }
import { DSettings } from './.buck/types'
import { builder } from './src/build'
import { generateInterface, serializeDescribe, serializeSchema } from './src/interface-generator'
import { readFileSync, writeFileSync } from 'node:fs'
import { BuckDBBase, CommandQueue, DuckdbCon } from './core'
import { deriveName, isBucket, Dict } from './src/utils'

import { DuckDBTypeIdMap } from './src/typedef'
import { omit, pick, zipObject } from 'es-toolkit'
import { DuckDBResultReader } from '@duckdb/node-api/lib/DuckDBResultReader'


const InitConfigKeys = ['s3_access_key_id', 's3_secret_access_key', 's3_region', 's3_session_token']
function mapDuckDBTypeToSchema(typeInfo: any): string | Record<string, any> {
    const baseType = DuckDBTypeIdMap[typeInfo.typeId] || 'DAny'

    if (typeInfo.typeId === DuckDBTypeId.LIST || typeInfo.typeId === DuckDBTypeId.ARRAY) {
        if (typeInfo.valueType) {
            return {
                __type: 'array',
                elementType: mapDuckDBTypeToSchema(typeInfo.valueType)
            }
        }
        return baseType
    }

    if (typeInfo.typeId === DuckDBTypeId.STRUCT) {
        const struct: Record<string, any> = { __type: 'struct' }
        if (typeInfo.entryNames && typeInfo.entryTypes) {
            typeInfo.entryNames.forEach((name: string, i: number) => {
                struct[name] = mapDuckDBTypeToSchema(typeInfo.entryTypes[i])
            })
        }
        return struct
    }

    return baseType
}
class JsonModelTable {
    constructor(
        private jsonContent: Dict = JSON.parse(readFileSync('./.buck/models.json', 'utf-8'))
    ) {
    }
    hasSchema(ressource: string, uri: string) {
        return this.jsonContent[ressource]?.[uri] ? true : false
    }
    writeSchema(ressource: string, uri: string, schemaJson: Record<string, any>) {
        if (!this.jsonContent[ressource]) {
            this.jsonContent[ressource] = {}
        }
        this.jsonContent[ressource][uri] = schemaJson
        const tsfile = generateInterface(this.jsonContent)
        writeFileSync('./.buck/models.json', JSON.stringify(this.jsonContent, null, 2))
        writeFileSync('./.buck/models.ts', tsfile)
    }
    writeResultSchema(ressource: string, uri: string, result: DuckDBResult) {
        return this.writeSchema(ressource, uri, zipObject(result.columnNames(), result.columnTypes().map(mapDuckDBTypeToSchema)))
    }
    writeDescribedSchema(ressource: string, uri: string, described: Record<string, any>) {
        this.writeSchema(ressource, uri, serializeDescribe(described as any))
    }
}

const jsonModelTable = new JsonModelTable()

const mapValueRec = (value: DuckDBValue) => {
    if (value instanceof DuckDBListValue) {
        return value.items.map(mapValueRec)
    } else if (value instanceof DuckDBDecimalValue) {
        return value.toDouble()
    }
    else if (value instanceof DuckDBDateValue) {
        return value.toString()
    }
    else if (value instanceof DuckDBMapValue) {
        return new Map(value.entries.map(x => [x.key, x.value]))
    } else if (value instanceof DuckDBStructValue) {
        const rtn = {}
        for (const [key, val] of Object.entries(value.entries)) {
            rtn[key] = mapValueRec(val)
        }
        return rtn
    } else if (value instanceof DuckDBUUIDValue) {
        return value.toString()
    } else if (typeof value === 'bigint') {
        return Number(value)
    } else if (value instanceof DuckDBTimestampValue || value instanceof DuckDBTimeValue || value instanceof DuckDBTimeTZValue || value instanceof DuckDBTimestampTZValue) {
        return new Date(Number(value.micros) * 1e-6)
    } else if (value instanceof DuckDBTimestampSecondsValue) {
        return new Date(Number(value.seconds))
    } else if (value instanceof DuckDBTimestampMillisecondsValue) {
        return new Date(Number(value.millis) * 1e-3)
    } else if (value instanceof DuckDBTimestampNanosecondsValue) {
        return new Date(Number(value.nanos) / 1e-9)
    } else if (value instanceof DuckDBBlobValue) {
        return value.bytes
    } else if (value instanceof DuckDBBitValue) {
        return value.data
    } else if (value instanceof DuckDBIntervalValue) {
        return value.toString()
    } else if (value instanceof DuckDBArrayValue) {
        return value.items.map(mapValueRec)
    } else if (value instanceof DuckDBUnionValue) {
        // todo, why isnt that an 
        return mapValueRec(value.value)
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
            let h = this.handle || ':memory:'
            if (isBucket(this.handle)) {
                this.lazySettings({ file_search_path: this.handle })
                h = ':memory:'
            }
            const configSettings = pick(this.settings, InitConfigKeys)
            this.lazySettings(omit(this.settings, InitConfigKeys))
            this._instance = await DuckDBInstance.create(h, configSettings as any)
            this._connection = await this._instance.connect()
        })()

        return this._initPromise
    }

    async upsertSchema(model: string, schema: Record<string, string>) {
        // await this._initDB();
        // const tableFile = Bun.file(`./.buck/models.json`);
        // const tableContent = await tableFile.json();
        // if (!tableContent[this.handle || '']) {
        //     tableContent[this.handle || ''] = {};
        // }
        // tableContent[this.handle || ''][model] = schema;
        // await tableFile.write(JSON.stringify(tableContent, null, 2));
        // const tsfile = generateInterface(tableContent);
        // await Bun.file('./.buck/models.ts').write(tsfile);
    }

    async ensureSchema(_uri: string) {
        const uri = this.getSchemaUri(_uri)
        const h = this.handle || ''
        if (jsonModelTable.hasSchema(h, uri)) {
            return
        }
        const describeResp = await this.describe(_uri)
        jsonModelTable.writeDescribedSchema(h, uri, describeResp)
    }


    async query(sql: string, opts: Record<string, any> = {}) {
        await this._initDB()
        const cmds = this.queue.flush()
        for (const cmd of cmds) {
            await this._connection.run(cmd)
        }
        const run = await this._connection.run(sql)
        const reader = new DuckDBResultReader(run as any);
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
