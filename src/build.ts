import * as t from '../.buck/types'
import { DuckdbCon } from './bindings'
import { DBuilder, deriveName } from './build.types'
import { formalize, toSql } from './formalise'
import { serializeSchema } from './interface-generator'
import { parse, parseObject } from './parser'
import { formatSource, keyBy, upperFirst, wrap } from './utils'

export type DCondition = { condition: string; operator?: 'OR' | 'AND' }
export type DSelectee = { field: string; as?: string; raw?: string }
export type DDirection = 'ASC' | 'DESC' | 'ASC NULLS FIRST' | 'DESC NULLS FIRST' | 'ASC NULLS LAST' | 'DESC NULLS LAST'
export type DOrder = { field: string; direction?: DDirection }
export type DDatasource = { catalog: string; uri: string; alias?: string; joinOn?: string; join?: 'JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'CROSS JOIN' | 'NATURAL JOIN' }
export type DCopyTo = { uri: string; options?: Record<string, any> }
export type Parseable = string | Function
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
    countBy: null as string | null,
    agg: null as string | null,
    action: 'select' as 'select' | 'update' | 'upsert' | 'create',
    updated: [] as DSelectee[],
    setops: [] as {
        type:
        | 'UNION'
        | 'UNION ALL'
        | 'UNION BY NAME'
        | 'UNION ALL BY NAME'
        | 'EXCEPT'
        | 'EXCEPT ALL'
        | 'INTERSECT'
        | 'INTERSECT ALL'
        value: string
    }[],
}

export type DState = typeof dstate

const deriveState = (s: DState, kmap: Record<keyof DState | string, any | any[]>, format = (e: any) => e) => {
    return Object.entries(kmap).reduce((acc, [key, values]) => {
        if (!Array.isArray(values)) {
            return { ...acc, [key]: values }
        }
        const newVals = values.map(v => formalize(v, s.context)).map(format)
        return Object.assign(acc, { [key]: (s[key as keyof DState] as any[] || []).concat(newVals) })
    }, s) as DState
}

export const builder = (Ddb: new (...args: any[]) => DuckdbCon) =>
    function database(a: any, b: any) {
        const handle = typeof a === 'string' ? a : ''
        const opts = (typeof a === 'object' ? a : (b || {})) as Partial<t.DSettings>
        const ddb = new Ddb(handle, opts)
        if (opts && Object.keys(opts).length && ddb.type === 'wasm') {
            ddb.lazySettings(opts)
        }
        if (handle && typeof handle === 'string' && handle !== ':memory:' && ddb.type === 'wasm') {
            ddb.lazyAttach(handle, deriveName(handle), { readonly: true })
        }
        const fromRes = (state = dstate) => {
            const _join = (joinType: DDatasource['join'] = 'JOIN') =>
                function (table: any, alias: any, fn = undefined) {
                    if (typeof fn === 'undefined') {
                        fn = alias
                        alias = undefined
                    }
                    const joinOn = typeof fn === 'function' ? parse(fn) : fn
                    return fromRes(deriveState(state, { datasources: [{ catalog: '', uri: table, alias, join: joinType, joinOn }] }))
                }
            const _where = (operator = 'AND') =>
                function (...conditions: Parseable[]) {
                    return fromRes(deriveState(state, { conditions: conditions.map(v => formalize(v, state.context)) }, condition => ({ condition, operator })))
                }
            return {
                ddb,
                join: _join('JOIN'),
                leftJoin: _join('LEFT JOIN'),
                rightJoin: _join('RIGHT JOIN'),
                crossJoin: _join('CROSS JOIN'),
                naturalJoin: _join('NATURAL JOIN'),
                set: function (...keys: Parseable[]) {
                    const updated = keys.flatMap(k => {
                        if (typeof k === 'function') {
                            const parsed = parseObject(k, state.context)
                            return parsed.map(([value, key, raw]) => ({ field: key, as: value, raw })) as DSelectee[]
                        }
                        return { field: k }
                    })
                    return fromRes({ ...state, updated })
                },
                select: function (...keys: Parseable[]) {
                    const selected = keys.flatMap(k => {
                        if (typeof k === 'function') {
                            const parsed = parseObject(k, state.context)
                            return parsed.map(([as, field, raw]) => ({ as, field, raw })) as DSelectee[]
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
                    return fromRes(deriveState({ ...state, selected: state.selected, countBy }, { groupBy: [gp], orderBy: [{ field: 'c', direction: 'DESC' }] }))
                },
                maxBy: function (...fields: Parseable[]) {
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
                union: (q) => fromRes({ ...state, setops: state.setops.concat({ type: 'UNION', value: q.toSql() }) }),
                unionAll: (q) => fromRes({ ...state, setops: state.setops.concat({ type: 'UNION ALL', value: q.toSql() }) }),
                unionByName: (q) => fromRes({ ...state, setops: state.setops.concat({ type: 'UNION BY NAME', value: q.toSql() }) }),
                unionAllByName: (q) => fromRes({ ...state, setops: state.setops.concat({ type: 'UNION ALL BY NAME', value: q.toSql() }) }),
                except: (q) => fromRes({ ...state, setops: state.setops.concat({ type: 'EXCEPT', value: q.toSql() }) }),
                exceptAll: (q) => fromRes({ ...state, setops: state.setops.concat({ type: 'EXCEPT ALL', value: q.toSql() }) }),
                intersect: (q) => fromRes({ ...state, setops: state.setops.concat({ type: 'INTERSECT', value: q.toSql() }) }),
                intersectAll: (q) => fromRes({ ...state, setops: state.setops.concat({ type: 'INTERSECT ALL', value: q.toSql() }) }),
                execute: async function (props: Record<string, any> = {}) {
                    const str = toSql(Object.assign(state, props))

                    this.ensureSchemas()
                    if (props?.dump || props?.pretty) {
                        this.dump()
                    }
                    const resp = await ddb.query(str, props)
                    if (state.selected.length === 1) {
                        const [{ as, raw, field }] = state.selected
                        if (as === null && !raw && field) {
                            return ddb.query(str, { rows: true, ...props }).then(resp => resp.map(e => e[0]))
                        }
                    }
                    if (state.selected.length && state.selected.every((e) => typeof e.as === 'number')) {
                        return ddb.query(str, { rows: true, ...props })
                    }
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
                },
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
            loadExtensions: function (...ext: t.DExtensions[]) {
                ddb.lazyExtensions(...ext as string[])
                return this
            },
            describe: (uri: string) => ddb.describe(uri),
            from: (table: string, alias?: string) =>
                fromRes({
                    ...dstate,
                    action: 'select',
                    datasources: [{
                        catalog: handle,
                        uri: table,
                        alias: alias, // || deriveName(table),
                    }],
                }),
            update: (table: string, alias?: string) =>
                fromRes({
                    ...dstate,
                    action: 'update',
                    datasources: [{
                        catalog: handle,
                        uri: table,
                        alias: alias, // || deriveName(table),
                    }],
                }),
            create: (table: string, p: Partial<{ replace: boolean; ifNotExists: boolean }> = {}) => {
                const createSerialize = (ex: string) => {
                    if (table.match(/\.(.sv|json*|parquet)$/)) {
                        return `COPY (${ex}) TO '${table}'`
                    }
                    return [
                        'CREATE',
                        p.replace ? 'OR REPLACE' : '',
                        'TABLE',
                        p.ifNotExists ? 'IF NOT EXISTS' : '',
                        table,
                        'AS',
                        ex,
                    ].filter(Boolean).join(' ')
                }

                return {
                    toSql: () => table,
                    as: function (...items: any[]) {
                        const getQuery = () => {
                            if (items[0]?.toSql) {
                                return createSerialize(items[0]?.toSql())
                            }
                            const tempname = 'tmp_' + Math.random() / 1e-17
                            return [
                                `CREATE TEMP TABLE ${tempname} (j JSON)`,
                                `INSERT INTO ${tempname} VALUES ${items.map(it => `('${JSON.stringify(it)}')`).join(',\n')}`,
                                'SET variable S = ' + wrap(`select json_group_structure(j)::varchar from ${tempname}`, '(', ')'),
                                createSerialize("SELECT UNNEST(json_transform(j, getvariable('S'))) FROM " + tempname),
                            ].join(';\n')
                        }
                        return {
                            toSql: () => getQuery(),
                            execute: () => ddb.run(getQuery()),
                        }
                    },
                }
            },
        }
        // } as unknown as typeof DBuilder
        // return fromRes as unknown as typeof DBuilder
    } as unknown as typeof DBuilder
