
import { DSettings } from './.buck/types';
import { builder } from './src/build'
import { CommandQueue, DuckdbCon } from './src/utils';
import { generateInterface, serializeDescribe, serializeSchema } from './src/interface-generator'
import { DuckDBInstance } from '@duckdb/node-api';
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
    private _instance: any = null;
    private _connection: any = null;
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
            console.log("Initializing DuckDB Node...");
            this._instance = await DuckDBInstance.create(this.handle);
            this._connection = await this._instance.connect();
            console.log("DuckDB Node Initialized and Connected.");
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
        if (uri.includes('://')) {
            uri = `'${uri}'`
        }
        return this.query(`DESCRIBE (FROM ${uri});`)
    }

    async ensureSchema(uri: string) {
        const h = this.handle || '';
        // await this._initDB();
        if (Ressources[this.handle || ''][uri]) {
            return
        }
        if (uri.includes('://')) {
            uri = `'${uri}'`
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
        console.log({ cmds })
        if (cmds?.length) {
            console.log('Flushing ', cmds, '...');
            await this._connection.run(cmds);
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
