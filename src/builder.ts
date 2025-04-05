type People = { name: DVarcharField; male: DBoolField; age: DNumericField };
import _SchemaData from './.buck/table.json'
import { dataSchemas } from './.buck/table.ts';
import { DNumericField, DVarcharField, DBoolField, DTableField, DGlobalComp, DGlobalField, DAggregateComp, CAggregate } from './.buck/types';
import { makeProxy } from './proxy';
import { get, isArray, isNumber, isObject, toUpper } from 'es-toolkit/compat';
import { DField, formatSource, MapCompType, MapInferredType, MapReturnString, prettifyPrintSQL, TableSchema, TypeMapping, wrap } from './utils.ts';
import { DuckDBInstance } from '@duckdb/node-api';
import { isPlainObject, isString } from 'es-toolkit';
import { ConditionParser } from './condition-parser.ts';
import { MapValue } from 'type-fest/source/entry';

type Schema = typeof dataSchemas;
type MemorySchema = typeof dataSchemas['']
const SchemaData = _SchemaData as unknown as Schema;

type DMetaField = CAggregate & DGlobalField
type DMetaComp = DAggregateComp & DGlobalComp
const duckdbFunctions = makeProxy() as unknown as DMetaComp
const tableFunctions = makeProxy() as unknown as MapReturnString<DTableField, string>


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
export const from = <W extends keyof MemorySchema>(dd: W) => new Database('').from(dd as W);


class Dumper {
    _limit?: number;
    _having?: string;
    _table?: string;
    _distinctOn: string[] = [];
    selectFields: string[][] = [];
    whereClauses: string[] = [];
    _orderBy: string[] = [];
    _groupBy: string[] = [];
    _joins: {table: string, alias: string}[] = [];

    constructor(table: string) {
        this._table = table;
    }
    toSql({ pretty } = { pretty: false }): string {
        const components = ['SELECT', this.asDistinctOn(), this.asSelector(), 'FROM', this.asFrom(), this.asWhere(), this.asGroupBy(), this.asHaving(), this.asOrderBy(), this.asLimit()]
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
    asDistinctOn() {
        return this._distinctOn?.length ? `DISTINCT ON (${this._distinctOn.join(',')})` : '';
    }
    asHaving() {
        return this._having ? `HAVING ${this._having}` : ''
    }
    asLimit() {
        return this._limit ? `LIMIT ${this._limit}` : ''
    }
    asFrom() {
        let from = formatSource(this._table.toString());
        for (const join of this._joins) {
            from += ` JOIN ${formatSource(join.table)} AS ${join.alias}`;
        }
        return from;
    }
    asSelector({ pretty }: { pretty?: boolean } = {}): string {
        return prettifyPrintSQL(this.selectFields.map(([v, k]) => !k?.match(/[^\d]/) ? v : `${v} AS ${k}`).join(", ") || "*", pretty);
    }
    limit(n: number): this {
        this._limit = n;
        return this;
    }

}



type WithJoins<T, J extends Record<string, TableSchema<any>>> = T & {
    [K in keyof J]: TableSchema<J[K]>;
};

class From<T, S = T, J extends Record<string, TableSchema<any>> = {}> extends Dumper {
    join<TableName extends keyof Schema[''], Alias extends string>(table: TableName, alias: Alias): From<T, S, J & Record<Alias, Schema[''][TableName]>> {
        this._joins.push({table, alias});
        return this as any;
    }
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
        console.log('OKOK  LOADDDD', String(this.dbpath || this.table))
        const { stdout, stderr } = Bun.spawnSync({ cmd: ['bun', 'src/sync-data', String(this.dbpath || this.table)] })
        // const { stderr, stdout, ...rr } = await Bun.$
        console.log({ stdout, stderr })
        console.log(stderr.toString())
        console.log(stdout.toString())
        console.log('=============')

    }
    getProxySchema() {
        const proxy = {} as T & S;
        for (const key in this.schema) {
            const fieldType = this.schema[key] as keyof TypeMapping;
            (proxy as any)[key] = makeProxy(key) as unknown as TypeMapping[typeof fieldType];
        }

        // Add typed joined table proxies
        for (const join of this._joins) {
            const tableSchema = dataSchemas[''][join.table as keyof typeof dataSchemas['']];
            const tableProxy = {} as TableSchema<typeof tableSchema>;
            for (const field in tableSchema) {
                (tableProxy as any)[field] = makeProxy(`${join.alias}.${field}`);
            }
            (proxy as any)[join.alias] = tableProxy;
        }

        return proxy;
    }

    select<U>(fn: (p: WithJoins<T, J>, D: DMetaComp) => U): From<T, U, J> {
        const schemaProxy = this.getProxySchema();
        const result = fn(schemaProxy as WithJoins<T, J>, duckdbFunctions);
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
        return this as unknown as From<T, U, J>;
    }

    selectMany = this.select;

    async execute(opts?: any): Promise<MapInferredType<S>[]> {
        if (opts?.pretty) {
            console.log(this.toSql({ pretty: true }))
        }
        const instance = await DuckDBInstance.create(this.dbpath as string || ':memory:');
        const connection = await instance.connect();
        const result = await connection.runAndReadAll(this.toSql());
        // console.log(result.getRowObjects())
        const rows = this.selectFields?.[0]?.[1] ?
            result.getRowObjectsJson() : result.getRowsJson();
        return rows as MapInferredType<S>[];
    }

    async * stream(): AsyncGenerator<MapInferredType<S>> {
        for (const row of await this.execute()) {
            yield row
        }
    }

    buildResp(x: string | ((item: T & S, D: DMetaField) => string | DField)) {
        if (typeof x === 'function') {
            return x(this.getProxySchema() as T & S, duckdbFunctions as unknown as DMetaField)
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
    orderBy(fn: ((item: T & S, D: DMetaField) => string | DField), order?: 'asc' | 'desc'): this
    orderBy(fn, order): this {
        const resp = this.buildResp(fn)
        this._orderBy.push([(resp).toString(), toUpper(order || '')].join(' '))
        return this
    }

    groupBy(key: keyof TableSchema<T>): this;
    groupBy(ff: string): this;
    groupBy(fn: ((item: T & S, D: DMetaField) => string | DField)): this
    groupBy(fn): this {
        const resp = this.buildResp(fn)
        this._groupBy.push(resp.toString())
        return this
    }

    distinctOn(key: keyof TableSchema<T>): this;
    distinctOn(ff: string): this;
    distinctOn(fn: ((item: T & S, D: DMetaField) => string | DField)): this
    distinctOn(fn): this {
        const resp = this.buildResp(fn)
        this._distinctOn.push(resp.toString())
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
        const q = from('data/people.parquet', 'ppl')
        .join('data/final.csv', 'tkl')
        .select((p, D) => ({
            zz: p.ppl.name,
            xx: D.avg(p.total).round(2), 
            dec: p.age.divide(10)
        }))
        // .where(p => p.age > 30 && p.name === 'lol')
        .groupBy(p => p.dec)
        .having('dec > 6')
    // .where(p => p.total > p.age && p.ww.regexp_matches(/.*[0-9]{3}/, '') || p.age > 10 || p._name)
    const resp = await q.execute()
    
}
