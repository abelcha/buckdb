import { formatSource, keyBy } from "./utils";
import * as t from "../.buck/types";
import { parse, parseObject } from './parser';
import { DBuilder, deriveName, DExtensionsId } from "./build.types";
import { serializeSchema } from "./interface-generator";
import { upperFirst } from "es-toolkit";


export type DCondition = { condition: string, operator?: 'OR' | 'AND' }
export type DSelectee = { field: string, as?: string, raw?: string }
export type DDirection = 'ASC' | 'DESC' | 'ASC NULLS FIRST' | 'DESC NULLS FIRST' | 'ASC NULLS LAST' | 'DESC NULLS LAST'
export type DOrder = { field: string, direction?: DDirection }
export type DDatasource = { catalog: string, uri: string, alias?: string, joinOn?: string, join?: 'JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'CROSS JOIN' | 'NATURAL JOIN' }
export type DCopyTo = { uri: string, options?: Record<string, any> }
export const dstate = {
    copyTo: [] as DCopyTo[],
    context: {} as Record<string, any>,
    datasources: [] as DDatasource[],
    selected: [] as DSelectee[],
    conditions: [] as DCondition[],
    having: [] as DCondition[],
    groupBy: [] as string[],
    distinctOn: [] as string[],
    limit: null as number | null,
    sample: null as number | `${number}%` | null,
    offset: null as number | null,
    orderBy: [] as DOrder[],
    keyBy: null as string | null,
    agg: null as string | null,
}



export type DuckdbCon = {
    cmdQueue: CommandQueue;
    run: (sql: string) => Promise<any>;
    lazyAttach: (path: string, alias: string) => any;
    ensureSchema: (uri: string) => Promise<any>;
    describe?: (uri: string) => Promise<Record<string, any>>;
    query: (sql: string, opts?: Record<string, any>) => Promise<any[]>;
    lazySettings: (s: Partial<t.DSettings>) => DuckdbCon;
    lazyExtensions: (...extensions: string[]) => DuckdbCon;
}

export class CommandQueue {
    constructor() {
        this.queue = []
    }
    queue: string[]
    pushSettings(settings: Partial<t.DSettings> = {}) {
        const sts = Object.entries(settings).map(([key, value]) => `SET ${key} = '${value}'`)
        if (sts.length)
            this.queue.push(sts.join('; '))
        return this;
    }
    pushAttach(path: string, alias: string) {
        this.queue.push(`ATTACH '${path}' AS ${alias} (READONLY)`, `USE ${alias}`)
        return this
    }
    pushExtensions(...extensions: string[]) {
        this.queue.push(...extensions.map(e => `INSTALL '${e}';LOAD '${e}';`))
        return this
    }
    flush() {
        const s = this.queue
        this.queue = []
        return s
    }

}



export type DState = typeof dstate

const serializeTuple = (id: string) => (p: string[]) => p.length ? `${id} (${p.join(', ')})` : ''
const serializeValue = (id: string) => (p: any) => p !== null ? `${id} ${p}` : ''

const serializeConditions = (id = 'WHERE') => (conditions: DCondition[]) => {
    return conditions.map((e, i) => {
        const prefix = i === 0 ? id : (e.operator || 'AND')
        return `${prefix} (${e.condition})`
    }).join(' ')
}
const serializeOrder = (id: string) => (orders: DOrder[]) => {
    if (!orders.length) return ''
    const m = orders.map((e, i) => {
        // const prefix = i === 0 ? id : (e.direction)
        return `${e.field} ${e.direction || ''}`.trim()
    })
    return m.length ? `${id} ${m.join(', ')}` : ''
}

const formatAlias = (source: { alias?: string, uri: string }) => {
    if (source.alias) {
        return `${formatSource(source.uri)} AS ${source.alias}`
    }
    return formatSource(source.uri)
}
const formatAs = (source: { field: string, as?: string }) => {
    if (source.as && typeof source.as === 'string') {
        return `${source.field.toString().padEnd(20)} AS ${source.as}`
    }
    return source.field
}
export const formatOptions = (options?: Record<string, any>): string => {
    if (!options || Object.keys(options).length === 0) return '';
    if (typeof options === 'string') return `'${options}'`;

    const formatValue = (value: any): string => {
        if (typeof value === 'string') return `'${value}'`;
        if (typeof value !== 'object' || value === null) return String(value);
        if (Array.isArray(value)) {
            return `(${value.join(', ')})`;
        }
        return `{${Object.entries(value).map(([k, v]) =>
            `${k}: ${formatValue(v)}`
        ).join(', ')}}`;
    };

    return Object.entries(options).map(([key, value]) =>
        `${key.toUpperCase()} ${formatValue(value)}`
    ).join(',\n');
}
export const wrapIfNotEmpty = (value: string) => value ? `(${value})` : ''
const serializeDatasource = (datasources: DDatasource[]) => {
    return datasources.map((d) => d.join ? `${d.join} ${formatAlias(d)} ON (${d.joinOn})` : formatAlias(d)).join('\n ')
}
const serializeSelected = (selected: DSelectee[]) => {
    if (!selected.length) {
        return '*'
    }
    return (selected).map(e => e.raw || `${formatAs(e)}`).join(', \n        ')
    // return prettifyPrintSQL(selected.map(([v, k]) => !k?.match(/[^\d]/) ? v : `${v} AS ${k}`).join(", ") || "*", pretty);
}
const newLine = (e: string) => {
    const raw = e.replaceAll(/\n/g, '').replaceAll(/\s+/g, ' ').trim()
    if (raw.length < 30) {
        return raw
    }
    return e
}
function toSql(state: DState) {

    const components = [
        'FROM',
        serializeDatasource(state.datasources),
        '\n SELECT',
        serializeTuple('DISTINCT ON')(state.distinctOn),
        newLine(serializeSelected(state.selected)),
        '\n',
        serializeConditions('WHERE')(state.conditions),
        serializeTuple(' GROUP BY')(state.groupBy),
        serializeConditions('HAVING')(state.having),
        "\n",
        serializeValue('USING SAMPLE')(state.sample),
        serializeOrder('ORDER BY')(state.orderBy),
        serializeValue('LIMIT')(state.limit),
        serializeValue('OFFSET')(state.offset),
    ].filter(Boolean)
    // const add = settings ? (settings.join(';') + '\n') : ''
    const comps = components.join(' ').trim();
    if (state.copyTo.length) {
        return state.copyTo.map(e => `COPY (\n${comps}\n) TO '${e.uri}' ${wrapIfNotEmpty(formatOptions(e.options))}`).join('\n')
    }
    return comps
    // }
}
type Parseable = string | Function

const formalize = (e: string | Function, context = {}) => typeof e === 'function' ? parse(e, context) : e
const deriveState = (s: DState, kmap: Record<keyof DState | string, any | any[]>, format = (e: any) => e) => {
    return Object.entries(kmap).reduce((acc, [key, values]) => {
        if (!Array.isArray(values)) {
            return { ...acc, [key]: values }
        }
        const newVals = values.map(v => formalize(v, s.context)).map(format)
        return Object.assign(acc, { [key]: (s[key] || []).concat(newVals) })
    }, s) as DState
}



type DuckdbConConstructor = new (...args: any[]) => DuckdbCon;

export const builder = (Ddb: DuckdbConConstructor) => function database(a: any, b: any) {
    const handle = typeof a === 'string' ? a : ''
    const opts = (typeof a === 'object' ? a : (b || {})) as Partial<t.DSettings>
    const ddb = new Ddb(handle, opts)
    if (opts && Object.keys(opts).length) {
        ddb.lazySettings(opts)
    }
    if (handle && typeof handle === 'string' && handle !== ':memory:') {
        ddb.lazyAttach(handle, deriveName(handle))
    }
    const fromRes = (state = dstate) => {
        const _join = (joinType: DDatasource['join'] = 'JOIN') => function (table: any, alias: any, fn = undefined) {
            if (typeof fn === 'undefined') {
                fn = alias
                alias = undefined
            }
            const joinOn = typeof fn === 'function' ? parse(fn) : fn
            return fromRes(deriveState(state, { datasources: [{ catalog: '', uri: table, alias, join: joinType, joinOn }] }))
        }
        const _where = (operator = 'AND') => function (...conditions: Parseable[]) {
            return fromRes(deriveState(state, { conditions: conditions.map(v => formalize(v, state.context)) }, condition => ({ condition, operator })))
        }
        return {
            join: _join('JOIN'),
            leftJoin: _join('LEFT JOIN'),
            rightJoin: _join('RIGHT JOIN'),
            crossJoin: _join('CROSS JOIN'),
            naturalJoin: _join('NATURAL JOIN'),
            select: function (...keys: Parseable[]) {
                const selected = keys.flatMap(k => {
                    if (typeof k === 'function') {
                        const parsed = parseObject(k, state.context)
                        return parsed.map(([value, key, raw]) => ({ field: key, as: value, raw })) as DSelectee[]
                    }
                    return { field: k }
                })
                return fromRes({ ...state, selected })
            },
            copyTo: function (uri: string, options: Record<string, any> = {}) {
                return fromRes({ ...state, copyTo: [...state.copyTo, { uri, options }] })
            },
            where: _where('AND'),
            or: _where('OR'),
            and: _where('AND'),
            // Updated orderBy: Accepts single Parseable field, uses 'direction'
            orderBy: function (...params: any[]) {
                if (typeof params[0] === 'string') {
                    params = [params]
                }
                const nworder = (params as string[][]).map(([field, direction]) => ({ field, direction }))
                return fromRes({ ...state, orderBy: [...(state.orderBy || []), ...nworder] as DOrder[] }) // Use 'direction'
            },
            context: function (context: Record<string, any>) {
                return fromRes({ ...state, context: { ...state.context, ...context } })
            },
            groupBy: function (...groupBy: Parseable[]) {
                return fromRes(deriveState(state, { groupBy }))
            },
            distinctOn: function (...distinctOn: Parseable[]) {
                return fromRes(deriveState(state, { distinctOn }))
            },
            keyBy: function (gp: Parseable) {
                const keyBy = formalize(gp, state.context)
                if (!state.selected.find(e => e.field === keyBy)) {
                    state.selected.push({ field: keyBy })
                }
                return fromRes(deriveState({ ...state, selected: state.selected, keyBy }, { groupBy: [gp] }))
            },
            minBy: function (...fields: Parseable[]) {
                // return this.orderBy(fields, 'ASC').limit(10)
                return fromRes(deriveState({ ...state, agg: 'min', limit: 1 }, { orderBy: fields }, field => ({ field, direction: 'ASC' })))
            },
            countBy: function (gp: Parseable) {
                const countBy = formalize(gp, state.context)
                if (!state.selected.find(e => e.field === countBy)) {
                    state.selected.push({ field: countBy, as: 'f' })
                }
                if (!state.selected.find(e => e.raw === countBy)) {
                    state.selected.push({ field: 'count()', as: 'c' })
                }
                return fromRes(deriveState({ ...state, selected: state.selected, countBy }, { groupBy: [gp], orderBy: [{field: 'c', direction: 'DESC'}]}))
            },
            maxBy: function (...fields: Parseable[]) {
                // return this.orderBy(fields, 'ASC')
                return fromRes(deriveState({ ...state, agg: 'max', limit: 1 }, { orderBy: fields }, field => ({ field, direction: 'DESC' })))
            },
            having: function (...having: Parseable[]) {
                return fromRes(deriveState(state, { having }, condition => ({ condition, operator: 'AND' })))
            },
            limit: function (limit: number) {
                return fromRes({ ...state, limit })
            },
            sample: function (sample: any) {
                return fromRes({ ...state, sample })
            },
            offset: function (offset: number) {
                return fromRes({ ...state, offset })
            },
            ensureSchemas: async function () {
                for await (const dt of state.datasources) {
                    await ddb.ensureSchema(dt.uri)
                }
            },
            execute: async function (props: Record<string, any> = {}) {
                const str = toSql(Object.assign(state, props))

                this.ensureSchemas();
                if (props?.dump || props?.pretty) {
                    this.dump()
                }
                if (state.selected.length === 1 && !state.selected[0]?.as && !state.selected[0]?.raw) {
                    return ddb.query(str, { rows: true, ...props }).then(e => e.map(e => e[0]))
                }
                if (state.selected.length && state.selected.every((e) => typeof e.as === 'number')) {
                    return ddb.query(str, { rows: true, ...props })
                }
                const resp = await ddb.query(str, props)
                if (state.agg) {
                    return resp[0]
                }
                if (state?.keyBy) {
                    return keyBy(resp, state.keyBy)
                }
                return resp
            },
            toState: function () {
                return state
            },
            dump: () => {
                console.log(toSql(state))
                return fromRes(state)
            },
            show: function () {
                console.log(toSql(state))
                const res = fromRes(state).execute().then(e => console.log(e))
                console.log(res)
                return fromRes(state)

            },
            toSql: function (props = { pretty: false }) {
                return toSql(Object.assign(state, props))
            },
            toString: function () {
                return this.toSql()
            }
        }
    }
    // return function __DBuilder(catalog = '') {
    return {
        ddb,
        settings: (s: Partial<t.DSettings>) => ddb.lazySettings(s),
        fetchTables: async function (id: string) {
            const resp = await ddb.query(`SELECT * FROM duckdb_tables()`)
            return Object.fromEntries(resp.map(e => [upperFirst(e.table_name), serializeSchema(e.sql)]))
        },
        // fetchSchema: async function (id: string) {
        //     const resp = await ddb.query(`DESCRIBE '${id}'`)
        //     return Object.fromEntries(resp.map(e => [e.column_name, mapTypes(e.column_type)]))
        // },
        loadExtensions: function (...ext: DExtensionsId[]) {
            ddb.lazyExtensions(...ext)
            return this
        },
        describe: (uri: string) => ddb.describe(uri),
        from: (table: string, alias?: string) => fromRes({
            ...dstate,
            datasources: [{
                catalog: handle,
                uri: table,
                alias: alias,// || deriveName(table),
            }]
        })
    }
    // } as unknown as typeof DBuilder
    // return fromRes as unknown as typeof DBuilder
} as unknown as typeof DBuilder
