import { mapTypes, TypeProps, wrap } from './utils';
import { camelCase, groupBy, mapValues, uniqBy } from 'es-toolkit';
import { from } from './builder';

const getFuncHeader = (row: any) => {
    return {
        args: row.parameters.map((key, i) => [camelCase(key).replace('enum', 'enm'), `${mapTypes(row.parameter_types[i])}able`]),
        output: `${mapTypes(row.return_type)}Field`
    }
}
const getImprint = row => {
    const { args, output } = getFuncHeader(row)
    return `${row.function_name}(${args.map(e => e.join(': ')).join(', ')}): ${output}`
}

const genInterface = (rows, field: string, slice = 0, mergeAny = false) => {
    let str = `export interface ${field} ${mergeAny && field !== 'DAnyField' ? 'extends DAnyField' : ''} {\n`
    for (const row of uniqBy(rows, e => getImprint(e)) as any[]) {
        let { args, output } = getFuncHeader(row)
        if (row.varargs) {
            args.push(['...args', `${mapTypes(row.varargs)}able`])
        }
        if (row.parameters[0] === 'col0' && row.parameters.length > 2 && row.function_type === 'table' && row.parameters[1] !== 'col1') {
            const [p1, ...pall] = args
            args = [p1, ['opts?', wrap(pall.map(([k, v]) => k + ':' + v).join(', '), 'Partial<{', '}>')]]
        }
        const fargs = args.slice(slice).map(e => e.join(': ')).join(', ')

        str += `  ${row.function_name}(${fargs}): ${output} \n`
    }
    str += '}'
    return str
}


const writefile = (pname: string, content: string) => {
    return Bun.file(`.buck/${pname}.ts`).write(content)
        .then(() => Bun.$`prettier --print-width=240 --write .buck/${pname}.ts`)
}

if (import.meta.main) {
    let output = []
    const query = from('duckdb_functions()').where(`function_name SIMILAR TO '[a-z]\\w+' AND function_name NOT LIKE 'icu_collate%'`)
    console.log(query.toSql({ pretty: true }))

    const _resp = await query.execute()

    let respc = _resp.map(e => {
        if (e.function_name === 'concat') {
            console.log('heeeereree')
            return { ...e, return_type: 'VARCHAR' }
        }
        return e
    })
    let resp = groupBy(respc, e => e.function_type as 'scalar' | 'table' | 'aggregate' | 'window' | 'udf')
    const { ...grouped } = Object.groupBy(resp.scalar, e => mapTypes(e.parameter_types[0]))
    console.log(mapValues(grouped, e => e.length))
    grouped.DBool = []
    let header = Object.entries(TypeProps).map(([key, value]) => {
        return `export type ${value.able} = ${value.rawType} | ${value.field};`
    }).join('\n')
    output.push(header)
    for (const maintype in grouped) {
        const f = TypeProps[maintype as keyof typeof TypeProps]
        output.push(genInterface(grouped[maintype], f.field, 1, true))
    }
    output.push(genInterface(resp.scalar, 'DGlobalField', 0))
    console.log(resp.table)
    output.push(genInterface(resp.table, 'DTableField', 0))
    writefile('types', output.join('\n'))

}