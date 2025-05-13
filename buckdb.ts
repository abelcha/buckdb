
import { DSettings } from './.buck/types';
import { builder, CommandQueue, DuckdbCon } from './src/build'
import { generateInterface, serializeDescribe, serializeSchema } from './src/interface-generator'
import { DuckDBConnection, DuckDBInstance } from '@duckdb/node-api';
export * as readers from './src/readers';
import Ressources from './.buck/table.json';

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

class BuckDBNode implements DuckdbCon {
    ensureType = false;
    private _instance: DuckDBInstance | null = null;
    private _connection: DuckDBConnection | null = null;
    private _initPromise: Promise<void> | null = null;
    readonly cmdQueue = new CommandQueue();

    constructor(private handle?: string, settings?: Partial<DSettings>) {
        if (settings) {
            this.cmdQueue.pushSettings(settings);
        }
    }

    private _initDB(): Promise<void> {
        if (this._initPromise) {
            return this._initPromise;
        }
        if (this._instance && this._connection) {
            return Promise.resolve();
        }

        this._initPromise = (async () => {
            this._instance = await DuckDBInstance.create(this.handle);
            this._connection = await this._instance.connect();
        })();

        return this._initPromise;
    }

    async upsertSchema(model: string, schema: Record<string, string>) {
        await this._initDB();
        const tableFile = Bun.file(`./.buck/table.json`);
        const tableContent = await tableFile.json();
        if (!tableContent[this.handle || '']) {
            tableContent[this.handle || ''] = {};
        }
        tableContent[this.handle || ''][model] = schema;
        await tableFile.write(JSON.stringify(tableContent, null, 2));
        const tsfile = generateInterface(tableContent);
        await Bun.file('./.buck/table3.ts').write(tsfile);
    }

    loadExtensions(...extensions: string[]) {
        console.log('loading extensions...', extensions);
        this.cmdQueue.pushExtensions(...extensions);
        return this;
    }
    async describe(uri: string) {
        if ((uri.includes('://') || uri.match(/\.\w{2,20}$/))) {
            uri = `'${uri}'`
        }
        return this.query(`DESCRIBE FROM ${uri};`)
    }

    async ensureSchema(uri: string) {
        // return
        const h = this.handle || '';
        // await this._initDB();
        if (Ressources[this.handle || ''][uri]) {
            return
        }

        const describeResp = await this.describe(uri);
        const tableFile = Bun.file(`./.buck/table.json`);
        const tableContent = await tableFile.json();
        if (!tableContent[h]) {
            tableContent[h] = {};
        }
        if (!tableContent[h][uri]) {
            tableContent[h][uri] = serializeDescribe(describeResp);
            await tableFile.write(JSON.stringify(tableContent, null, 2));
            const tsfile = generateInterface(tableContent);
            await Bun.file('./.buck/table3.ts').write(tsfile);
        }
    }
    lazySettings(s: Partial<DSettings>) {
        this.cmdQueue.pushSettings(s);
        return this;
    }
    lazyAttach(uri: string, alias?: string) {
        this.cmdQueue.pushAttach(uri, alias);
        return this;
    }

    lazyExtensions(...extensions: string[]) {
        this.cmdQueue.pushExtensions(...extensions);
        return this;
    }
    async query(sql: string, opts: Record<string, any> = {}) {
        await this._initDB();
        const cmds = this.cmdQueue.flush();
        for (const cmd of cmds) {
            await this._connection.run(cmd);
        }
        const reader = await this._connection.runAndReadAll(sql);
        if (opts?.rows) {
            return reader.getRowsJson();
        }
        return tempJsonFix(reader.getRowObjects());
    }

    async run(sql: string) {
        await this._initDB();
        return this._connection.run(sql);
    }
}

// // Create the adapter function
// const duckDBNodeAdapter = (handle?: string, settings?: Partial<DSettings>): DuckdbCon => {
//     return new BuckDBNode(handle, settings);
// };

export const Buck = builder(BuckDBNode);
export const MemoryDB = Buck('');
export const from = MemoryDB.from;
