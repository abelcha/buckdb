import { DuckDBInstance, DuckDBConnection, DuckDBListValue } from '@duckdb/node-api';
import { all, createEmphasize } from 'emphasize';

const emphasize = createEmphasize(all)
const tempJsonFix = e => JSON.parse(JSON.stringify(e, (key, value) => {
    if (value instanceof DuckDBListValue) {
        return value.items;
    }
    if (typeof value === 'bigint') {
        return Number(value);
    }
    return value
}
))

export class DuckDBNodeAdapter {
    private instance: DuckDBInstance;
    private connection: DuckDBConnection;
    private isInitialized = false;
    private handle: string;
    private settingsEntries: [string, any][] = [];
    private extensions: string[] = [];
    constructor(handle: string = ':memory:', settings: Record<string, any> = {}) {
        this.handle = handle;
        this.setSettings(settings);
    }
    load(...extensions: string[]) {
        this.isInitialized = false;
        this.extensions.push(...extensions)
        // const str = extensions.map(e => `INSTALL ${e}; LOAD ${e}`).join(';')


    }
    async setSettings(settings: Record<string, any>) {
        this.settingsEntries = Object.entries(settings)
    }

    // constructor(handle, settings: Record<string, any> = {}) {
    //     this.instance = handle;
    //     this.connection = null;
    //     this.handle = handle;
    //     this.settingsEntries = Object.entries(settings)
    //     this.isInitialized = false;

    // }

    async initialize() {
        this.instance = await DuckDBInstance.create(this.handle); // In-memory DB
        this.connection = await this.instance.connect();
        if (this.settingsEntries.length) {
            const q = this.settingsEntries.map(([key, value]) => `SET ${key} = ${value};`).join(';')
            const resp = await this.connection.run(q);
        }
        if (this.extensions.length) {
            const str = this.extensions.map(e => `INSTALL ${e}; LOAD ${e}`).join(';')
            const resp = await this.connection.run(str);
        }

        this.isInitialized = true
    }
    dump(sql: string) {
        console.log(emphasize.highlightAuto(sql, { subset: ['sql'] }).value)
        return this;
    }
    async query<T = any>(sql: string, opts: Record<string, any> = {}): Promise<T[]> {
        if (!this.isInitialized) {
            await this.initialize();
        }
        const reader = await this.connection.runAndReadAll(sql);
        if (opts.rows) {
            return reader.getRowsJson() as unknown as T[];
        }

        return tempJsonFix(reader.getRowObjects()) as unknown as T[];
    }
    async run(sql: string) {
        if (!this.isInitialized) {
            await this.initialize();
        }
        return this.connection.run(sql);
    }

    async close(): Promise<void> {
        if (this.connection) await this.connection.disconnect()
    }
}