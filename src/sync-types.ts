import { mapTypes, TypeProps, wrap, Ω } from './utils';
import { camelCase, groupBy, mapValues, uniqBy, upperFirst } from 'es-toolkit';
import { from } from './builder';

const fkey = key => camelCase(key).replace('array', 'arr').replace('enum', 'enm')
const getFuncHeader = (row: any) => {
    return {
        args: row.parameters.map((key, i, arr) => [fkey(key) + (i && fkey(key) == fkey(arr[i - 1]) ? `0${i}` : ''), `${mapTypes(row.parameter_types[i])}able`]),
        output: `${mapTypes(row.return_type)}Field`
    }
}
const getImprint = row => {
    const { args, output } = getFuncHeader(row)
    return `${row.function_name}(${args.map(e => e.join(': ')).join(', ')}): ${output}`
}

const antiDone = {}
const genInterface = (rows, f: { id: string, field?: string, inferredTo?: string, anti?: string }, slice = 0, mergeAny = false) => {
    // const inter = f.field ? f.field.replace('Field', 'Interface') : 'DefaultInterface';
    const inter = `I${upperFirst(f.id)}`
    const field = `D${upperFirst(f.id)}Field`

    let str = `export interface ${inter} ${mergeAny && f.id !== 'any' ? 'extends IAny' : ''} {\n`
    for (const row of uniqBy(rows, e => getImprint(e)) as any[]) {
        let { args, output } = getFuncHeader(row)
        // console.log(args)
        if (row.varargs) {
            args.push(['...args', `${mapTypes(row.varargs)}able`])
        }
        if (row.parameters[0] === 'col0' && row.parameters.length > 2 && row.function_type === 'table' && row.parameters[1] !== 'col1') {
            const [p1, ...pall] = args
            args = [p1, ['opts?', wrap(pall.map(([k, v]) => k + ':' + v).join(', '), 'Partial<{', '}>')]]
        }
        const fargs = args
            .slice(slice)
            .map(([k, v]) => [k, row.function_name.includes('regex') && k in Ω('pattern', 'separator', 'regex') ? 'RegExpable' : v])
            .map(e => e.join(': ')).join(', ')
        // console.log(fargs)
        console.log(fargs)
        str += `  ${row.function_name}(${fargs}): ${output} \n`
    }
    str += '}'
    if (f.inferredTo) {
        str += `\nexport type ${f.field} = ${inter} & {\n [sId]: '${f.id}',\n [sInferred]: ${f.inferredTo},\n [sAnti]: ${f.anti || '{}'} \n}\n`
    }
    if (f.anti && !antiDone[f.anti]) {
        console.log('genanti', f)
        antiDone[f.anti] = true
        str += genAntiProto(f.anti)
    }

    return str
}

const tsdoc = (strs: string[]) => {
    return `
 /**
${strs.map(e => ` * ${e}`).join('\n')}
 */
`
}


const writefile = (pname: string, content: string) => {
    return Bun.file(`.buck/${pname}.ts`).write(content)
        .then(() => Bun.$`prettier --print-width=240 --write .buck/${pname}.ts`)
}


const genAntiProto = (id: string) => {
    // console.log({ id })
    const allanti = eval(`Object.getOwnPropertyNames(${id.replace('Anti', '')}.prototype)`);
    // console.log({ allanti })
    const rtn = `\ntype ${id} = {\n\t${allanti.sort().map(k => /*tsdoc(['@depreciated']) + */`${k}: never; `).join(' ')}\n}`
    return rtn
}


if (import.meta.main) {
    let output = []
    const query = from('duckdb_functions()')
        .select(p => p)
        .where(`function_name SIMILAR TO '[a-z]\\w+' AND function_name NOT LIKE 'icu_collate%' ORDER BY function_name`)
    console.log(query.toSql({ pretty: true }))

    const _resp = await query.execute()

    let respc = _resp.map(e => {
        if (e.function_name === 'concat') {
            return { ...e, return_type: 'VARCHAR' }
        }
        return e
    })
    let resp = groupBy(respc, e => e.function_type as 'scalar' | 'table' | 'aggregate' | 'window' | 'udf')
    const grouped = Object.groupBy(resp.scalar, e => mapTypes(e.parameter_types[0]))
    grouped.DBool = []
    let header = Object.entries(TypeProps).map(([key, value]) => {
        return `export type ${value.able} = ${value.rawType} | ${value.field};`
    })
        .concat('export type RegExpable = RegExp | string;')
        .join('\n')
    const symbols = ['sId', 'sAnti', 'sInferred']
    output.push(header)
    output.push(...symbols.map(e => `export declare const ${e}: unique symbol;`))
    for (const maintype of new Set(Object.keys(grouped).sort())) {
        const f = TypeProps[maintype as keyof typeof TypeProps]
        output.push(genInterface(grouped[maintype], f, 1, true))
    }
    output.push(genInterface(resp.scalar, { id: 'global' }, 0))
    // console.log(resp.table)
    output.push(genInterface(resp.table, { id: 'table' }, 0))
    writefile('types', output.join('\n'))
    await Bun.$`dprint fmt .buck/types.ts`
}