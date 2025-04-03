type People = { name: DVarcharField; male: DBoolField; age: DNumericField };
import _SchemaData from './.buck/table.json'
import { dataSchemas } from './.buck/table.ts';
import { DNumericField, DVarcharField, DBoolField, IGlobal, DGlobalComp } from './.buck/types';
import { makeProxy } from './proxy';
import { get, isArray, isNumber, isObject, toUpper } from 'es-toolkit/compat';
import { DField, formatSource, MapAntiDeeperType, MapAntiType, MapAntiTypeDeep, MapCompType, MapInferredType, prettifyPrintSQL, TableSchema, TypeMapping, wrap, XMapAntiType } from './utils.ts';
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

class Dumper {
    _limit?: number;
    _having?: string;
    _table?: string;
    selectFields: string[][] = [];
    whereClauses: string[] = [];
    _orderBy: string[] = [];
    _groupBy: string[] = [];

    constructor(table: string) {
        this._table = table;
    }
    toSql({ pretty } = { pretty: false }): string {
        const components = ['SELECT', this.asSelector(), 'FROM', this.asFrom(), this.asWhere(), this.asGroupBy(), this.asHaving(), this.asOrderBy(), this.asLimit()]
        return prettifyPrintSQL(components.filter(e => e).join(' ').trim(), pretty);
    }
    asOrderBy() {
        return this._orderBy.length ? `ORDER BY ${this._orderBy.join(", ")}` : ''
    }
    asGroupBy() {
        return this._groupBy.length ? `GROUP BY ${this._groupBy.join(", ")}` : ''
    }
    asWhere() {
        return this.whereClauses.length ? `WHERE ${this.whereClauses.map(e => wrap(e, '(', ')')).join(" AND ")}` : "";
    }

    asHaving() {
        return this._having ? `HAVING ${this._having}` : ''
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
    schema: Record<keyof TableSchema<T & S>, string>;

    constructor(source: string, dbpath = "") {
        super(source);
        this.dbpath = dbpath as keyof T;
        this.table = source as string;
        if (!dataSchemas?.[this.dbpath as string]?.[this.table as string]) {
            this.loadSchema()
        }
        const schema = get(SchemaData, this.dbpath)?.[this.table] as Record<keyof TableSchema<T & S>, string>;

        this.schema = schema;
    }
    async loadSchema() {
        console.log('OKOK  LOADDDD')
        const { stdout, stderr } = Bun.spawnSync({ cmd: ['bun', 'src/sync-data', String(this.dbpath || this.table)] })
        // const { stderr, stdout, ...rr } = await Bun.$
        console.log({ stdout, stderr })
        console.log('=============')

    }
    getProxySchema() {
        const proxy = {} as T & S;
        for (const key in this.schema) {
            const fieldType = this.schema[key] as keyof TypeMapping;
            (proxy as any)[key] = makeProxy(key) as unknown as TypeMapping[typeof fieldType];
        }
        return proxy;
    }
    // schemaProxy() {
    //     const schema = get(SchemaData, this.dbpath)?.[this.table] as Record<keyof TableSchema<T>, string>;
    //     // return createSchemaProxy(
    //     //     tableConfig as Record<keyof TableSchema<T & S>, string>
    //     // );

    // }
    select<U>(fn: (p: T, D: IGlobal) => U): From<T, U> {
        const schemaProxy = this.getProxySchema();
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
            this.schema = { ...this.schema, ...result }

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
        const rows = this.selectFields?.[0]?.[1] ?
            result.getRowObjectsJson() : result.getRowsJson();
        return rows as MapInferredType<S>[];
    }

    async * stream(): AsyncGenerator<MapInferredType<S>> {
        for (const row of await this.execute()) {
            yield row
        }
    }

    buildResp(x: string | ((item: T & S, D: IGlobal) => string | DField)) {
        if (typeof x === 'function') {
            return x(this.getProxySchema() as T & S, duckdbFunctions)
        }
        return x
    }
    conditionFn(fn) {
        if (typeof fn === 'string') {
            return fn
        }
        const parser = new ConditionParser()
        return parser.parseWhereClause(fn)
    }

    // Overloads for better autocomplete:
    orderBy(key: keyof TableSchema<T>, order?: 'asc' | 'desc'): this;
    orderBy(ff: string, order?: 'asc' | 'desc'): this;
    orderBy(fn: ((item: T & S, D: IGlobal) => string | DField), order?: 'asc' | 'desc'): this
    orderBy(fn, order): this {
        const resp = this.buildResp(fn)
        this._orderBy.push([(resp).toString(), toUpper(order || '')].join(' '))
        return this
    }

    groupBy(key: keyof TableSchema<T>): this;
    groupBy(ff: string): this;
    groupBy(fn: ((item: T & S, D: IGlobal) => string | DField)): this
    groupBy(fn): this {
        const resp = this.buildResp(fn)
        this._groupBy.push(resp.toString())
        return this
    }

    having(fn: string | ((item: MapCompType<T & S>, D: DGlobalComp) => any)): this {
        this._having + this.conditionFn(fn)
        return this
    }

    public where(fn: string | ((item: MapCompType<T & S>, D: DGlobalComp) => any)): this {
        this.whereClauses.push(this.conditionFn(fn))
        return this;
    }
}
if (import.meta.main) {
    console.log('PPCCDD', import.meta.dir, import.meta.path)


    // const q = from('data/people.parquet')
    //     .select((p, D) => ({ _total: p.total, _name: p.name, _age: p.age, ww: D.concat(p.name, '[', p.total, ']') }))
    //     .where(p => p.total > p.age && p.ww.regexp_matches(/.*[0-9]{3}/, '') || p.age > 10 || p._name) é
    const q = from('data/people.parquet')
        .select((p, D) => ({ _total: D.count(p.total), dec: p.age.divide(10) }))
        .where(p => p.age > 30)
        .groupBy(p => p.dec)
        .having('dec > 6')
    // .where(p => p.total > p.age && p.ww.regexp_matches(/.*[0-9]{3}/, '') || p.age > 10 || p._name)
    const resp = await q.execute()
    console.log(q.toSql({ pretty: true }))
    console.log(resp)
    // console.log(resp.)
    // resp[0].
    // .where(p => p._age in ['toto', 'tata'])
    // .orderBy(e => e.total, 'desc')
    // .where(p => )
    // from('data/people.parquet', 'p1')
    // .join('data/people.parquet', 'p2')

    // .where({
    //     total: { $gt: 1 },
    //     age: 
    // })
    // const resp = await q.limit(10).execute()

}