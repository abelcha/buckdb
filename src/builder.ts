type People = { name: DVarcharField; male: DBoolField; age: DNumericField };
import _SchemaData from './.buck/table.json'
import { dataSchemas } from './.buck/table.ts';
import { DNumericField, DVarcharField, DBoolField, IGlobal } from './.buck/types';
import { makeProxy } from './proxy';
import { get, isArray, isNumber, isObject } from 'es-toolkit/compat';
import { formatSource, MapAntiType, MapInferredType, prettifyPrintSQL, TableSchema, TypeMapping, wrap } from './utils.ts';
import { DuckDBInstance } from '@duckdb/node-api';
import { isPlainObject, isString } from 'es-toolkit';
import { ConditionParser } from './condition-parser.ts';

type Schema = typeof dataSchemas;
type MemorySchema = typeof dataSchemas['']
const SchemaData = _SchemaData as unknown as Schema;

const duckdbFunctions = makeProxy() as unknown as IGlobal


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
        return prettifyPrintSQL(this.selectFields.map(([v, k]) => !k?.match(/[^\d]/) ? v : `${v} AS ${k}`).join(", ") || "*", pretty);
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
        const { stdout, stderr } = Bun.spawnSync({ cmd: ['bun', 'src/sync-data', String(this.dbpath || this.table)] })
        // const { stderr, stdout, ...rr } = await Bun.$
        console.log({ stdout, stderr })
        console.log('=============')

    }

    select<U>(fn: (p: T, D: IGlobal) => U): From<T, U> {
        const tableConfig = get(SchemaData, this.dbpath)?.[this.table]
        const schemaProxy = createSchemaProxy(
            tableConfig as Record<keyof TableSchema<T>, string>
        );
        const result = fn(schemaProxy as T, duckdbFunctions);
        if (isString(result)) {
            this.selectFields.push([result])
        }
        if (isArray(result)) {
            this.selectFields.push(
                ...result.map(e => [e?.toString()])
            )
        }
        else if (isObject(result)) {
            this.selectFields.push(
                ...Object.entries(result).map(([k, v]) => [v?.toString(), k])
            )
        } else {
            throw new Error("The select function must return an object.");
        }
        return this as unknown as From<T, U>;
    }

    selectMany = this.select;

    async execute(): Promise<MapInferredType<S>[]> {
        const instance = await DuckDBInstance.create(this.dbpath as string || ':memory:');
        const connection = await instance.connect();
        const result = await connection.runAndReadAll(this.toSql());
        const rows = this.selectFields?.[1]?.[1] ?
            result.getRowObjectsJson() : result.getRowsJson();
        return rows as MapInferredType<S>[];
    }

    async * stream(): AsyncGenerator<MapInferredType<S>> {
        for (const row of await this.execute()) {
            yield row
        }
    }
    // public where(v: string): this;
    // public where(fn: (item: T & S) => boolean): this
    // public where(fn: string | ((item: T & S) => boolean)): this {

    //     const condition = (fn.toString());
    //     console.log({ condition })
    //     if (condition) this.whereClauses.push(condition);
    //     return this;
    // }
    public where(fn: string | ((item: MapAntiType<T & S>, D: IGlobal) => any)): this {
        if (typeof fn === 'string') {
            this.whereClauses.push(fn)
            return this;
        }
        const parser = new ConditionParser()
        const resp = parser.parseWhereClause(fn)
        this.whereClauses.push(resp)
        // console.log({ resp })
        // const tableConfig = get(SchemaData, this.dbpath)?.[this.table]

        // const schemaProxy = createSchemaProxy(
        //     tableConfig as Record<keyof TableSchema<T>, string>
        // );

        // const condition = fn(schemaProxy as MapAntiType<T & S>, duckdbFunctions);
        // fn()
        // console.log({ condition })
        // if (condition) this.whereClauses.push(condition);
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
export const from = <RessourcePath extends keyof MemorySchema>(dd: RessourcePath) => new Database('').from(dd as RessourcePath);

if (import.meta.main) {
    console.log('PPCCDD', import.meta.dir, import.meta.path)
    // const q = (database('data/ex.duckdb').from('wavy'))
    // const q = from('data/people.parquet').select((p, D) => [p.total, p.name, p.age, D.concat(p.name, '[', p.total, ']')] as const)
    // // 

    // type www = number | bigint
    // type ww2 = string | bigint
    // const lol = (sss: ww2) => {
    //     return sss + "lol"
    // }

    const q = from('data/people.parquet')
        .select((p, D) => ({ _total: p.total, _name: p.name, _age: p.age, ww: D.concat(p.name, '[', p.total, ']') }))
        .where(p => p.total > p.age && p.ww.regexp_matches(/.*[0-9]{3}/) || p.age > 10)
        // .where(p => p._age in ['toto', 'tata'])
        // .orderBy(e => e.total, 'desc')
    // .where(p => )
    // from('data/people.parquet', 'p1')
        // .join('data/people.parquet', 'p2')

    // .where({
    //     total: { $gt: 1 },
    //     age: 
    // })
    console.log(q.toSql({ pretty: true }))
    // const resp = await q.limit(10).execute()

}