
import { DSettings } from './.buck/types';
import { builder } from './src/build'
import { CommandQueue, DuckdbCon } from './src/utils';
import { generateInterface } from './src/interface-generator'

const tempJsonFix = e => JSON.parse(JSON.stringify(e, (key, value) => {
    switch (value?.constructor?.name) {
        
        case 'DuckDBListValue':
            return value.items
        case 'DuckDBDecimalValue':
            return value.toDouble()
    }


    if (typeof value === 'bigint') {
        return Number(value);
    }
    return value
}
))

export const duckDBNodeAdapter = async (handle?: string, settings?: Partial<DSettings>): Promise<DuckdbCon> => { // Use t.DSettings
    const cmdQueue = new CommandQueue().pushSettings(settings)
    const { DuckDBInstance } = await import('@duckdb/node-api')
    const instance = await DuckDBInstance.create(handle); // In-memory DB
    const connection = await instance.connect();

    // Create a self-referential object for method chaining
    const duckdbCon: DuckdbCon = {
        cmdQueue,
        upsertSchema: async (model: string, schema: Record<string, string>) => {
            const tableFile = Bun.file(`./.buck/table.json`)
            const tableContent = await tableFile.json()
            if (!tableContent[handle || '']) {
                tableContent[handle || ''] = {};
            }
            tableContent[handle || ''][model] = schema
            console.log({ tableContent })
            await tableFile.write(JSON.stringify(tableContent, null, 2))
            const tsfile = generateInterface(tableContent)
            await Bun.file('./.buck/table3.ts').write(tsfile)
            console.log({ tsfile })
        },
        loadExtensions: (...extensions: string[]) => {
            console.log('loading extensions...', extensions)
            cmdQueue.pushExtensions(...extensions)
            return duckdbCon;
        },
        settings: (s: Partial<DSettings>) => {
            cmdQueue.pushSettings(s)
            return duckdbCon;
        },
        query: async (sql: string, opts = {}) => {
            const cmds = cmdQueue.flush()
            if (cmds?.length) {
                console.log('Flushing ', cmds, '...')
                const sresp = await connection.run(cmds)
            }
            const reader = await connection.runAndReadAll(sql);
            if (opts?.rows) {
                return reader.getRowsJson()
            }
            return tempJsonFix(reader.getRowObjects())
        },
        run: async (sql: string) => {
            return connection.run(sql);
        }
    };

    return duckdbCon;
}

export const Buck = builder(await duckDBNodeAdapter())
export const MemoryDB = Buck('')
// console.log({MemoryDB})
export const from = MemoryDB.from

