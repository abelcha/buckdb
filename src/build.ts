import * as t from '../.buck/types'
import type { DuckdbCon } from '../core'
import { DBuilder } from './build.types'
import { dump, formalize, serializeCreate, toSql } from './formalise'
import { serializeSchema } from './interface-generator'
import { parse, parseObject } from './parser'
import type { DCte, DDatasource, DOrder, DSelectee, DState, Parseable } from './typedef'
import { dstate } from './typedef'
import { deriveName, isBucket, keyBy, last, upperFirst, wrap, Σ } from './utils'

export const deriveState = (s: DState, kmap: Record<keyof DState | string, any | any[]>, format = (e: any) => e) => {
    return Object.entries(kmap).reduce((acc, [key, values]) => {
        if (!Array.isArray(values)) {
            return { ...acc, [key]: values }
        }
        const newVals = values.map(v => formalize(v, s.context)).map(format)
        return Object.assign(acc, { [key]: (s[key as keyof DState] as any[] || []).concat(newVals) })
    }, s) as DState
}

const parseArgs = (args: any[]) => {
    const handle = typeof args[0] === 'string' ? args[0] : ''
    const opts = (typeof args[0] === 'object' ? args[0] : (args[1] || {})) as Partial<t.DSettings>
    return { handle, opts }
}

export const builder = (Ddb: new (...args: any[]) => DuckdbCon) =>
    function database(...args: any[]) {
        const { handle, opts } = parseArgs(args)
        const ddb = new Ddb(handle, opts)
        if (opts && Object.keys(opts).length  /* && ddb.type === 'wasm'*/) {
            ddb.lazySettings(opts)

        }
        if (handle && handle !== ':memory:' && ddb.type in Σ('remote', 'wasm') && !isBucket(handle)) {
            ddb.lazyAttach(handle, deriveName(handle), { readonly: ddb.type === 'wasm' })
        }
        const fromRes = (state: DState) => {
            const _join = (joinType: DDatasource['join'] = 'JOIN') =>
                function (table: any, alias: any) {
                    const rep = ({ joinOn, using }: Record<string, any>) => fromRes(deriveState(state, { datasources: [{ catalog: handle, uri: table, alias, join: joinType, joinOn, using }] }))
                    return {
                        using: (using: string) => rep({ using }),
                        on: (on: Function) => rep({ joinOn: parse(on) }),
                    }
                }
            const _where = (operator = 'AND') =>
                function (...conditions: Parseable[]) {
                    return fromRes(deriveState(state, { conditions: conditions.map(v => formalize(v, state.context, { condition: true })) }, condition => ({ condition, operator })))
                }
            const ensureAllSchemas = async function (state: DState) {
                if (state.ctes.length) {
                    const ctEntries = state.ctes.map(e => [e.name, e.query.toState().datasources])
                    const fnamed = ctEntries.map(x => x[0])
                    const cteDS = ctEntries.flatMap(z => (z[1] as any).concat(...state.datasources).filter(e => !fnamed.includes(e.uri)))
                    for await (const dt of cteDS) {
                        await ddb.ensureSchema(dt.uri)
                    }
                } else {
                    for await (const dt of state.datasources) {
                        await ddb.ensureSchema(dt.uri)
                    }
                }
            }
            const stream = (props: Record<string, any> = {}) => {
                const str = toSql(Object.assign(state, props))
                return {
                    async *[Symbol.asyncIterator]() {
                        await ensureAllSchemas(state)
                        yield* await ddb.stream(str)
                    }
                }
            }
            const execute = async function (props: Record<string, any> = {}) {
                // console.log(state)
                const formatAGG = (e: Promise<any>) => state.agg ? e.then(resp => resp[0]) : e
                const str = toSql(Object.assign(state, props))
                await ensureAllSchemas(state)
                if (props.run) {
                    return ddb.run(str)
                }
                if (state.selected.length === 1) {
                    const [{ as, raw, field }] = state.selected
                    if ((as === null && !raw && field) || raw) {
                        return ddb.query(str, { rows: true, ...props }).then(resp => resp.map(e => e[0]))
                    }
                }
                if (state.selected.length && state.selected.every((e) => typeof e.as === 'number')) {
                    return formatAGG(ddb.query(str, { rows: true, ...props }))
                }
                if (state?.keyBy) {
                    return ddb.query(str, props).then(resp => keyBy(resp, state.keyBy as string))
                }
                if (state.agg === 'count') {
                    return ddb.query(str, { rows: true, ...props }).then(resp => Number(resp[0]?.[0] ?? 0))
                }
                return formatAGG(ddb.query(str, props))
            }

            return {
                ddb,
                stream,
                join: _join('JOIN'),
                leftJoin: _join('LEFT JOIN'),
                rightJoin: _join('RIGHT JOIN'),
                crossJoin: (a, b) => _join('CROSS JOIN')(a, b).using(undefined),
                naturalJoin: _join('NATURAL JOIN'),
                innerJoin: _join('INNER JOIN'),
                set: function (...keys: Parseable[]) {
                    const updated = keys.flatMap(k => {
                        if (typeof k === 'function') {
                            const parsed = parseObject(k, state.context)
                            return parsed.map(([value, key, raw]) => ({ field: key, as: value, raw })) as DSelectee[]
                        } else return { field: k }
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
                    if (params.length <= 2 && params.every(p => !Array.isArray(p))) {
                        params = [params]
                    }
                    const nworder = (params as string[][]).map(([field, direction]) => ({ field: formalize(field), direction }))
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
                count: function () {
                    return fromRes(deriveState({ ...state, agg: 'count' }, {}))
                },
                countBy: function (gp: Parseable) {
                    const countBy = formalize(gp, state.context)
                    if (!state.selected.find(e => e.field === countBy)) {
                        state.selected.push({ field: countBy, as: 0 })
                    }
                    if (!state.selected.find(e => e.raw === countBy)) {
                        state.selected.push({ field: 'count(*)::int', as: 1 })
                    }
                    return fromRes(deriveState({ ...state, selected: state.selected, countBy }, { groupBy: [gp], orderBy: [{ field: 'count(*)', direction: 'DESC' }] }))
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
                exec: execute,
                run: execute,
                execute,
                toState: () => state,
                dump: (opts: any) => { dump(state, opts); return fromRes(state) },
                show: async function (opts: any) {
                    return this.dump(opts).execute().then(e => {
                        // @ts-ignore
                        BigInt.prototype.toJSON = function () { return this.toString() }
                        if (opts?.json) console.log(JSON.stringify(e, null, 2))
                        if (opts?.js) console.log(e[0])
                        else console.table(e.slice(0, 10))
                        // console[opts?.table === false ? 'log' : 'table'](e);
                        return e
                    })
                },
                toSql: function (props = { pretty: false }) {
                    return toSql(Object.assign(state, props))
                },
            }
        }
        return {
            ddb,
            run: (sql: string) => ddb.run(sql),
            settings: function (s: Partial<t.DSettings>) {
                ddb.lazySettings(s)
                return this
            },
            fetchTables: async function (id: string) {
                const resp = await ddb.query(`SELECT * FROM duckdb_tables()`)
                return Object.fromEntries(resp.map(e => [upperFirst(e.table_name), serializeSchema(e.sql)]))
            },
            loadExtensions: function (...ext: t.DExtensions[]) {
                ddb.lazyExtensions(...ext as string[])
                return this
            },
            macros: function (obj: any) {
                ddb.lazyMacros(obj)
                return this
            },
            with: function (...arr: (() => any)[]) {
                // @ts-ignore
                const ctes = arr.flatMap(x => Object.entries(x(this))).map(([k, v], i) => ({ name: k, query: v }) as DCte)
                return {
                    from: (table: string, alias?: string) =>
                        fromRes({ ...dstate, ctes, action: 'select', datasources: [{ catalog: handle, uri: table, alias: alias }] }),
                }
            },
            describe: (uri: string) => ddb.describe(uri),
            from: (table: string, alias?: string) =>
                fromRes({ ...dstate, action: 'select', datasources: [{ catalog: handle, uri: table, alias: alias }] }),
            update: (table: string, alias?: string) =>
                fromRes({ ...dstate, action: 'update', datasources: [{ catalog: handle, uri: table, alias: alias }] }),
            create: (table: string, p: Partial<{ replace: boolean; ifNotExists: boolean }> = {}) => ({
                toSql: () => table,
                as: (...items: any[]) => ({
                    toSql: () => serializeCreate(table, items, p),
                    execute: () => ddb.run(serializeCreate(table, items, p))
                        .then(() => ddb.ensureSchema(table)),
                }),
            }),
        }
        // } as unknown as typeof DBuilder
        // return fromRes as unknown as typeof DBuilder
    } as unknown as typeof DBuilder
