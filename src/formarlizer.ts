import { DCondition, DDatasource, DOrder, DSelectee, DState } from './build'
import { parse } from './parser'
import { formatSource, wrap } from './utils'

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

const formatAlias = (source: { alias?: string; uri: string }) => {
    if (source.alias) {
        return `${formatSource(source.uri)} AS ${source.alias}`
    }
    return formatSource(source.uri)
}
const formatAs = (source: { field: string; as?: string }) => {
    if (source.as && typeof source.as === 'string') {
        return `${source.field.toString().padEnd(20)} AS ${source.as}`
    }
    return source.field
}
export const formatOptions = (options?: Record<string, any>): string => {
    if (!options || Object.keys(options).length === 0) return ''
    if (typeof options === 'string') return `'${options}'`

    const formatValue = (value: any): string => {
        if (typeof value === 'string') return `'${value}'`
        if (typeof value !== 'object' || value === null) return String(value)
        if (Array.isArray(value)) {
            return `(${value.join(', ')})`
        }
        return `{${Object.entries(value).map(([k, v]) => `${k}: ${formatValue(v)}`).join(', ')}}`
    }

    return Object.entries(options).map(([key, value]) => `${key.toUpperCase()} ${formatValue(value)}`).join(',\n')
}
export const wrapIfNotEmpty = (value: string) => value ? `(${value})` : ''
const serializeDatasource = (datasources: DDatasource[]) => {
    return datasources.map((d) => d.join ? `${d.join} ${formatAlias(d)} ON (${d.joinOn})` : formatAlias(d)).join('\n ')
}
const serializeSelected = (selected: DSelectee[]) => {
    if (!selected.length) {
        return '*'
    }
    return selected.map(e => e.raw || `${formatAs(e)}`).join(', \n        ')
    // return prettifyPrintSQL(selected.map(([v, k]) => !k?.match(/[^\d]/) ? v : `${v} AS ${k}`).join(", ") || "*", pretty);
}
const newLine = (e: string) => {
    const raw = e.replaceAll(/\n/g, '').replaceAll(/\s+/g, ' ').trim()
    if (raw.length < 30) {
        return raw
    }
    return e
}

const serializeUpdated = (updated: DSelectee[]) => {
    return updated.map(e => ` ${e.as} = ${e.raw ? wrap(e.raw, "'") : e.field}`).join(', \n ')
}

function serializeSetops(setops: { type: string; value: string }[]) {
    return setops.map(e => `\n${e.type}\n${e.value}`).join('')
}
export function toSql(state: DState) {
    if (state.action === 'update') {
        // return `UPDATE ${state.table} SET ${serializeUpdates(state.updated)} WHERE ${serializeConditions('WHERE')(state.conditions)}`
        return [
            'UPDATE',
            serializeDatasource(state.datasources),
            'SET',
            '\n',
            serializeUpdated(state.updated),
            '\n',
            serializeConditions('WHERE')(state.conditions),
        ].filter(Boolean).join(' ')
    }

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
        '\n',
        serializeValue('USING SAMPLE')(state.sample),
        serializeOrder('ORDER BY')(state.orderBy),
        serializeValue('LIMIT')(state.limit),
        serializeValue('OFFSET')(state.offset),
        serializeSetops(state.setops),
    ].filter(Boolean)
    // const add = settings ? (settings.join(';') + '\n') : ''
    const comps = components.join(' ').trim()
    if (state.copyTo.length) {
        return state.copyTo.map(e => `COPY (\n${comps}\n) TO '${e.uri}' ${wrapIfNotEmpty(formatOptions(e.options))}`).join('\n')
    }
    return comps
    // }
}

export const formalize = (e: string | Function, context = {}) => typeof e === 'function' ? parse(e, context) : e
