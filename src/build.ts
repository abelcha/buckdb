import { CommandQueue, DuckdbCon, formatSource, keyBy, mapTypes } from "./utils";
import * as t from "../.buck/types";
import { parse, parseObject } from './parser';
import { DBuilder, DExtensionsId } from "./build.types";


export type DCondition = { condition: string, operator?: 'OR' | 'AND' }
export type DSelectee = { field: string, as?: string }
export type DDirection = 'ASC' | 'DESC' | 'ASC NULLS FIRST' | 'DESC NULLS FIRST' | 'ASC NULLS LAST' | 'DESC NULLS LAST'
export type DOrder = { field: string, direction?: DDirection }
export type DDatasource = { catalog: string, uri: string, alias?: string, joinOn?: string, join?: 'JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'CROSS JOIN' | 'NATURAL JOIN' }

export const dstate = {
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

const d = {}

// const toto = d[3.12] = 12


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
        return `${source.field.padEnd(20)} AS ${source.as}`
    }
    return source.field
}
const serializeDatasource = (datasources: DDatasource[]) => {
    return datasources.map((d) => d.join ? `${d.join} ${formatAlias(d)} ON (${d.joinOn})` : formatAlias(d)).join('\n ')
}
const serializeSelected = (selected: DSelectee[]) => {
    if (!selected.length) {
        return '*'
    }
    return (selected).map(formatAs).map(e => `${e}`).join(', \n        ')
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
    // console.log({ state })
    // console.log('====>', state.orderBy)

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
        serializeOrder('ORDER BY')(state.orderBy),
        serializeValue('LIMIT')(state.limit),
        serializeValue('OFFSET')(state.offset),
        serializeValue('USING SAMPLE')(state.sample),
    ]
    // const add = settings ? (settings.join(';') + '\n') : ''
    return components.filter(Boolean).join(' ').trim();
    // }
}
type Parseable = string | Function

const formalize = (e: string | Function) => typeof e === 'function' ? parse(e) : e
const deriveState = (s: any, kmap: Record<keyof DState | string, any | any[]>, format = e => e) => {
    return Object.entries(kmap).reduce((acc, [key, values]) => {
        if (!Array.isArray(values)) {
            return { ...acc, [key]: values }
        }
        const newVals = values.map(formalize).map(format)
        return Object.assign(acc, { [key]: (s[key] || []).concat(newVals) })
    }, s) as DState
}



export const builder = (ddb?: DuckdbCon) => function database(a: any, b: any) {
    const handle = typeof a === 'string' ? a : ''
    const opts = (typeof a === 'object' ? a : (b || {})) as Partial<t.DSettings>

    if (opts && Object.keys(opts).length) {
        ddb.settings(opts)
    }
    const fromRes = (state = dstate) => {
        const _join = (joinType: DDatasource['join'] = 'JOIN') => function (table, alias, fn = undefined) {
            if (typeof fn === 'undefined') {
                fn = alias
                alias = undefined
            }
            const joinOn = typeof fn === 'function' ? parse(fn) : fn
            return fromRes(deriveState(state, { datasources: [{ catalog: '', uri: table, alias, join: joinType, joinOn }] }))
        }
        return {
            // _join: ,
            join: _join('JOIN'),
            leftJoin: _join('LEFT JOIN'),
            rightJoin: _join('RIGHT JOIN'),
            crossJoin: _join('CROSS JOIN'),
            naturalJoin: _join('NATURAL JOIN'),
            select: function (...keys: Parseable[]) {
                // console.log('TYPE NORMAL', a.toString())
                // console.log({ keys })
                const selected = keys.flatMap(k => {
                    if (typeof k === 'function') {
                        // console.log('TYPE FUNCTION', k.toString())
                        const res = parseObject(k)
                        // if (res.every(([e]) => typeof e === 'number')) {
                        //     console.log('EVERYYYY', res)
                        //     // return res.map(e => ({ field: e }))
                        // }
                        return res.map(([value, key]) => ({ field: key, as: value })) as DSelectee[]
                    }
                    return { field: k }
                })
                return fromRes({ ...state, selected })
            },
            where: function (...conditions: Parseable[]) {
                return fromRes(deriveState(state, { conditions }, condition => ({ condition, operator: 'AND' })))
            },
            // Updated orderBy: Accepts single Parseable field, uses 'direction'
            orderBy: function (...params: any[]) {
                if (typeof params[0] === 'string') {
                    params = [params]
                }
                const nworder = (params as string[][]).map(([field, direction]) => ({ field, direction }))
                return fromRes({ ...state, orderBy: [...state.orderBy, ...nworder] as DOrder[] }) // Use 'direction'
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
            keyBy: function (...groupBy: Parseable[]) {
                const keyBy = formalize(groupBy[0])
                if (!state.selected.find(e => e.field === keyBy)) {
                    state.selected.push({ field: keyBy })
                }
                return fromRes(deriveState({ ...state, selected: state.selected, keyBy }, { groupBy }))
            },
            minBy: function (...fields: Parseable[]) {
                // return this.orderBy(fields, 'ASC').limit(10)
                return fromRes(deriveState({ ...state, agg: 'min', limit: 1 }, { orderBy: fields }, field => ({ field, direction: 'ASC' })))
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
            execute: async function (props: Record<string, any> = {}) {
                const str = toSql(Object.assign(state, props))
                if (props?.dump || props?.pretty) {
                    this.dump(str)
                }
                if (state.selected.length === 1 && !state.selected[0].as) {
                    return ddb.query(str, { rows: true }).then(e => e.map(e => e[0]))
                }
                if (state.selected.length && state.selected.every((e) => typeof e.as === 'number')) {
                    return ddb.query(str, { rows: true })
                }
                const resp = await ddb.query(str)
                if (state.agg) {
                    return resp[0]
                }
                // console.log('kbbbbb', state.keyBy)
                if (state?.keyBy) {
                    // console.log({ state })
                    return keyBy(resp, state.keyBy)
                }
                return resp
            },
            toState: function () {
                return state
            },
            dump: () => {
                console.log(toSql(state))
                console.log(state)
                return fromRes(state)
            },
            show: function () {
                // console.log('GPPPP', state.groupBy)
                console.log(toSql(state))
                const res = fromRes(state).execute().then(e => console.log(e))
                // console.log(res)
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
        settings: (s: Partial<t.DSettings>) => ddb.settings(s),

        fetchSchema: async function (id: string) {
            const resp = await ddb.query(`DESCRIBE '${id}'`)
            return Object.fromEntries(resp.map(e => [e.column_name, mapTypes(e.column_type)]))

        },

        loadExtensions: function (...ext: DExtensionsId[]) {
            console.log('LOAD ', ext)
            ddb.loadExtensions(...ext)
            return this
            // ddb.load(...ext)
            // console.log({ str })
            // const resp = await this.run(str)
            // ddb.run(str)
        },
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
