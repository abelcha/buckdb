type People = { name: DVarcharField; male: DBoolField; age: DNumericField };
import _SchemaData from './.buck/table.json'
import { dataSchemas } from './.buck/table.ts';
import { DNumericField, DVarcharField, DBoolField, DGlobalField } from './.buck/types';
import { makeProxy } from './proxy';
import { get } from 'es-toolkit/compat';
import { formatSource, NativeFieldTypes, prettifyPrintSQL, TableSchema, TypeMapping, wrap } from './utils.ts';
import { DuckDBInstance } from '@duckdb/node-api';

type Schema = typeof dataSchemas;
const SchemaData = _SchemaData as unknown as Schema;

const duckdbFunctions = makeProxy() as unknown as DGlobalField


function createSchemaProxy<T>(schema: Record<keyof T, string>): T {
    const proxy = {} as T;
    for (const key in schema) {
        const fieldType = schema[key] as keyof TypeMapping;
        (proxy as any)[key] = makeProxy(key) as unknown as TypeMapping[typeof fieldType];
    }
    return proxy;
}

class Dumper {
    _limit?: number;
    _table?: string;
    groupBy?: string[];
    selectFields: string[][] = [];
    whereClauses: string[] = [];
    constructor(table: string) {
        this._table = table;
    }
    toSql({ pretty } = { pretty: false }): string {
        const components = ['SELECT', this.asSelector(), 'FROM', this.asFrom(), this.asWhere(), this.asLimit()]
        return prettifyPrintSQL(components.filter(e => e).join(' ').trim(), pretty);
    }

    asWhere() {
        return this.whereClauses.length ? `WHERE ${this.whereClauses.join(" AND ")}` : "";
    }

    asLimit() {
        return this._limit ? `LIMIT ${this._limit}` : ''
    }
    asFrom() {
        return formatSource(this._table)
    }
    asSelector({ pretty }: { pretty?: boolean } = {}): string {
        return prettifyPrintSQL(this.selectFields.map(([k, v]) => `${v} AS ${k}`).join(", ") || "*", pretty);
    }
    limit(n: number): this {
        this._limit = n;
        return this;
    }
}


class From<T, S = T> extends Dumper {
    dbpath: keyof T;
    table: string;

    constructor(source: string, dbpath = "") {
        super(source);
        this.dbpath = dbpath as keyof T;
        this.table = source as string;
        if (!dataSchemas?.[this.dbpath as string]?.[this.table as string]) {
            this.loadSchema()
        }
    }
    async loadSchema() {
        console.log('OKOK  LOADDDD')
        const { stderr, stdout, ...rr } = await Bun.$`bun src/sync-data ${this.dbpath || this.table}`
        console.log({ stdout, stderr })
        console.log({ rr })

    }

    select<U>(fn: (p: T, D: DGlobalField) => U): From<T, U> {
        const tableConfig = get(SchemaData, this.dbpath)?.[this.table]
        const schemaProxy = createSchemaProxy(
            tableConfig as Record<keyof TableSchema<T>, string>
        );
        const result = fn(schemaProxy as T, duckdbFunctions);
        if (typeof result === 'object' && result !== null) {
            this.selectFields.push(
                ...Object.entries(result).map(([k, v]) => [k, v instanceof From ? v.toString() : v?.toString()])
            )
        } else {
            throw new Error("The select function must return an object.");
        }
        return this as unknown as From<T, U>;
    }

    selectMany = this.select;

    async execute(): Promise<NativeFieldTypes<S>[]> {
        const instance = await DuckDBInstance.create(this.dbpath as string || ':memory:');
        const connection = await instance.connect();
        const result = await connection.runAndReadAll(this.toSql());
        const rows = result.getRowObjectsJson() as unknown as NativeFieldTypes<S>[];
        return rows
    }

    async *stream(): AsyncGenerator<NativeFieldTypes<S>> {
        for (const row of await this.execute()) {
            yield row
        }
    }
    public where(v: string): this;
    public where(fn: (item: T & S) => boolean): this
    public where(fn: string | ((item: T & S) => boolean)): this {

        const condition = (fn.toString());
        console.log({ condition })
        if (condition) this.whereClauses.push(condition);
        return this;
    }
}

class Database<DBPath extends keyof Schema> {
    dbpath: DBPath;
    constructor(dbpath: DBPath) {
        this.dbpath = dbpath;

    }


    from = <TableName extends keyof Schema[DBPath]>(table: TableName) => {
        return new From<TableSchema<Schema[DBPath][TableName]>>(table as string, this.dbpath);
    }
}

export const database = <DBPath extends keyof Schema>(dd: DBPath) => new Database(dd as DBPath);
export const { from } = database('')

if (import.meta.main) {
    console.log('PPCCDD', import.meta.dir, import.meta.path)
    const q = await (database('data/ex.duckdb').from('wavy'))
    console.log(await q.limit(1).execute())
}