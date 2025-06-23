import { DCondition, DCte, DDatasource, DOrder, DSelectee, DState } from './typedef'
import { copy } from './copy'
import { parse } from './parser'
import { isBucket, wrap, isFile, isFunction, maxBy } from './utils'
import { highlightSql } from './highlighter'

export const formatSource = ({ catalog = '', uri = '' }) => {
    if (!isFunction(uri)) {
        if (isBucket(catalog) && uri.match(/[^\w]/) && !uri.includes('://')) {
            uri = catalog.replace(/\/*$/, '') + '/' + uri
        }
        if (isFile(uri)) {
            uri = `'${uri}'`
        }

    }

    if (isBucket(catalog)) {
        // todo make the pr ob duckdb
        return uri.replaceAll(/\'([^\/][^\'\:]+\.\w{3,12})\'/g, `'${catalog}/$1'`)
    }
    return uri
}

export function toSql(state: DState & { trim?: boolean, minTrim?: number }) {
    const CR = state.trim ? '' : '\n'
    const CRW = state.trim ? ' ' : '\n '
    const CRT = state.trim ? ' ' : '\n\t'




    const serializeTuple = (id: string, opts: Record<string, any> = {}) => (p: string[]) => {
        if (!p.length) {
            return ''
        }
        if (p.length === 1 && !opts.forceParent) {
            return `${id} ${p[0]}`
        }
        return `${id} (${p.join(', ')})`
    }
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

    const formatAlias = (source: { alias?: string; uri: string }) => {
        if (source.alias) {
            // return `${formatSource(source)} AS ${source.alias}`
            return `${formatSource(source)} AS ${source.alias}`
        }
        return formatSource(source)
    }
    const formatAs = (source: DSelectee, maxLen = 100) => {
        if (source.as && typeof source.as === 'string') {
            return `${(source.as + ':').padEnd(maxLen)} ${source.field.toString()}`
        }
        return source.field
    }

    const wrapIfNotEmpty = (value: string) => value ? `(${value})` : ''
    const serializeDatasource = (datasources: DDatasource[]) => {
        return datasources.map((d) => {
            const getJointure = (d: DDatasource): string => {
                if (d.using && d.join === 'CROSS JOIN') {
                    return ` AS ${d.using}`
                }
                if (d.joinOn) return `ON (${d.joinOn})`;
                if (d.using) return `USING (${d.using})`;
                return '';
            };
            const jointure = getJointure(d);
            if (d.join) {
                return `${d.join} ${formatAlias(d)} ${jointure}`.trim();
            }

            return formatAlias(d);
        }).join(CRW)
    }
    const serializeSelected = (selected: DSelectee[]) => {
        // console.log('SERIALIZE SELECTED', selected)
        if (!selected.length) {
            return '*'
        }
        const maxLen = Math.max(...selected.map(e => (e.as || e.field).toString()?.length))
        // if (selected[0].raw) {
        //     const [e, ...rest] = selected
        //     return [e.raw, ...rest.map(e => `${CRT}${formatAs(e, maxLen)}`)].join(',')
        // }
        const m = selected.map(e => e.raw || `${CRT}${formatAs(e, maxLen)}`)
        // console.log({ m })
        return m.join(',')
        // return prettifyPrintSQL(selected.map(([v, k]) => !k?.match(/[^\d]/) ? v : `${v} AS ${k}`).join(", ") || "*", pretty);
    }

    const serializeUpdated = (updated: DSelectee[]) => {
        return updated.map(e => ` ${e.as} = ${e.raw ? wrap(e.raw, "'") : e.field}`).join(`,${CRW}`)
    }

    function serializeSetops(setops: { type: string; value: string }[], opts: { trim?: boolean } = {}) {
        return setops.map(e => `${CR}${e.type}${CRW}(${e.value})`)
    }

    function serializeCte(e: DCte) {
        const q = e.query.toSql({ false: true, minTrim: 50 })
        return `${CRW}${e.name} AS (${q > 50 ? `${CR}${q}${CR}` : q})`
    }
    function serializeCtes(ctes: DCte[]) {
        if (!ctes.length)
            return ''
        return `WITH ${ctes.map(serializeCte).join(', ')}${CR}`

    }
    if (state.action === 'update') {
        // return `UPDATE ${state.table} SET ${serializeUpdates(state.updated)} WHERE ${serializeConditions('WHERE')(state.conditions)}`
        return [
            'UPDATE',
            serializeDatasource(state.datasources),
            'SET',
            CR,
            serializeUpdated(state.updated),
            CR,
            serializeConditions('WHERE')(state.conditions),
        ].filter(Boolean).join(' ')
    }

    let components = [
        serializeCtes(state.ctes),
        'FROM ' + serializeDatasource(state.datasources),
        'SELECT ' + serializeTuple('DISTINCT ON', { forceParent: true })(state.distinctOn),
        serializeSelected(state.selected),
        serializeConditions('WHERE')(state.conditions),
        serializeTuple('GROUP BY')(state.groupBy),
        serializeConditions('HAVING')(state.having),
        serializeValue('USING SAMPLE')(state.sample),
        serializeOrder('ORDER BY')(state.orderBy),
        serializeValue('LIMIT')(state.limit),
        serializeValue('OFFSET')(state.offset),
    ].filter(Boolean)
    if (state.setops.length) {
        components = ['FROM (', ...components, ')'].concat(...serializeSetops(state.setops, state))
    }

    const comps = components.join(CRW).trim()
    if (state.copyTo.length) {
        return copy(comps).to(state.copyTo[0].uri, state.copyTo[0].options).toSql(state)
    }
    // if (state.trim && (!state.minTrim || comps.length < state.minTrim)) {
    //     return comps.replace(/(\s|\n)+/g, '$1').trim()
    // }
    return comps
}



const createSerialize = (table: string, ex: string, opts: Record<string, any> = {}) => {
    if (table.match(/\.(.sv|json*|parquet)$/)) {
        return `COPY (${ex}) TO '${table}'`
    }
    return [
        'CREATE',
        opts.replace ? 'OR REPLACE' : '',
        'TABLE',
        opts.ifNotExists ? 'IF NOT EXISTS' : '',
        table,
        'AS',
        ex,
    ].filter(Boolean).join(' ')
}

export const serializeCreate = (table: string, items: any[], opts: Record<string, any> = {}) => {
    if (items.length === 1 && Array.isArray(items[0])) {
        items = items[0]
    }
    if (items[0]?.toSql) {
        return createSerialize(table, items[0]?.toSql(), opts)
    }
    const tempname = 'tmp_' + Math.random() / 1e-18
    return [
        `CREATE TEMP TABLE ${tempname} (j JSON)`,
        `INSERT INTO ${tempname} VALUES ${items.map(it => `('${JSON.stringify(it)}')`).join(',\n')}`,
        'SET variable S = ' + wrap(`select json_group_structure(j)::varchar from ${tempname}`, '(', ')'),
        createSerialize(table, "SELECT UNNEST(json_transform(j, getvariable('S'))) FROM " + tempname, opts),
    ].join(';\n')
}


export const dump = (state: DState, opts?: { state?: boolean }) => {
    console.log(highlightSql(toSql(state)))
    if (opts?.state) {
        console.log(state)
    }
    return false
}

export const formalize = (e: string | Function, context = {}) => typeof e === 'function' ? parse(e, context) : e
