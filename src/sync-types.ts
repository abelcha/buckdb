import { mapTypes, TypeProps, wrap, Ω } from './utils';
import { camelCase, groupBy, mapValues, maxBy, omit, range, uniq, uniqBy, upperFirst } from 'es-toolkit';
import { from } from './builder';

type ftype = typeof TypeProps['DVarchar']
const fkey = key => camelCase(key).match(/\w+/)[0].replace('array', 'arr').replace('enum', 'enm')
const getFuncHeader = (row: any, ot: ftype) => {
    const tt = TypeProps[mapTypes(row.return_type)] as ftype

    return {
        args: row.args.map((arg) => [arg.pname, arg.dtypes.map(e => e + 'able').join(' | ')].join(arg.required ? ': ' : '?: ')),
        output: ot?.man && tt.man || tt?.field
    }
}
const getImprint = (row, t) => {
    const { args, output } = getFuncHeader(row, t)
    return `${row.function_name}(${args.join(', ')}): ${output}`
}


const buildJSDoc = (row: any) => {
    const items = []
    if (row.description)
        items.push('@description ' + row.description)
    if (row.examples?.length)
        items.push('@example ' + row.examples)
    if (items.length)
        return wrap(items.join('\t'), '/**', '*/\n')
    return ''
}
const genInterface = (rows, f: Partial<ftype>, slice = 0, mergeAny = false) => {
    const field = `D${upperFirst(f.id)}Field`
    const comp = `D${upperFirst(f.id)}Comp`
    const ccomp = `C${upperFirst(f.id)}`

    let str = `export interface ${f.man ? ccomp : field} ${mergeAny && f.id !== 'any' ? `extends ${f.man ? 'CAny' : 'DAnyField'}` : ''} {\n`
    if (f.inferredTo)
        str += `  [sInferred]: ${f.inferredTo}\n`
    if (!f.man)
        str += `  [sComptype]: ${f.id === 'varchar' || f.id === 'numeric' ? comp : f.rawType}\n`

    for (const row of uniqBy(rows, e => getImprint(e, f)) as any[]) {
        let { args, output } = getFuncHeader(row, f)
        if (row.varargs) {
            args.push(`...args: ${mapTypes(row.varargs)}able[]`)
        }
        if (row.parameters[0] === 'col0' && row.parameters.length > 2 && row.function_type === 'table' && row.parameters[1] !== 'col1') {
            const [p1, ...pall] = args
            args = [p1, ['opts?:' + wrap(pall.join(', '), 'Partial<{', '}>')]]
        }
        const fargs = args.slice(slice).join(', ')
        str += buildJSDoc(row)
        str += `  ${row.function_name}(${fargs}): ${output} \n`
    }
    str += '}'
    if (f.man)
        str += `\nexport type ${comp} = ${f.man} \n`
    return str
}

const writefile = (pname: string, content: string) => {
    return Bun.file(`.buck/${pname}.ts`).write(content)
        .then(() => Bun.$`prettier --print-width=240 --write .buck/${pname}.ts`)
}

const OmittedFuncs = Ω('split-VARCHAR-VARCHAR[]', 'length-VARCHAR-BIGINT')

if (import.meta.main) {
    let output = []
    const query = from('duckdb_functions()')
        .select(p => p)
        .where(`function_name SIMILAR TO '[a-z]\\w+' AND function_name NOT LIKE 'icu_collate%'`)
        .orderBy('function_name')
    console.log(query.toSql({ pretty : true }))
    let results = await query.execute()
    const mergeFuncNames = () => {
        const groups = Object.groupBy(results, e => [e.function_name, e.parameter_types[0], e.return_type].join('-'))
        return Object.entries(groups)
            .filter(([key, values]) => !(key in OmittedFuncs))
            .flatMap(([key, values]) => {
                let maxParams = maxBy(values, e => e.parameter_types.length)
                const args = range(maxParams.parameters.length).map((type, i) => {
                    let pname = fkey(maxParams.parameters[i]) //.match(/\w+/)[0]
                    if (i && fkey(maxParams.parameters[i]) == fkey(maxParams.parameters[i - 1])) {
                        pname += `__0${i}`
                    }

                    const ptypes = uniq(values.map(e => e.parameter_types[i]))
                    const required = !ptypes.find(e => !e)
                    let dtypes = uniq(ptypes.map(e => mapTypes(e)))
                    if (maxParams.function_name.includes('regexp')) {
                        if (pname in Ω('pattern', 'separator', 'regex')) {
                            dtypes = dtypes.filter(e => e === 'DVarchar').concat('RegExp')
                        }
                    }
                    return { pname, ptypes, dtypes, required }
                })
                if (maxParams.function_name === 'concat') {
                    maxParams.return_type = 'VARCHAR'
                }

                const output = `${mapTypes(maxParams.return_type)}Field`
                return { ...maxParams, args, output }
            })
    }
    results = mergeFuncNames()
    let resp = groupBy(results, e => e.function_type as 'scalar' | 'table' | 'aggregate' | 'window' | 'udf')
    const grouped = Object.groupBy(resp.scalar, e => mapTypes(e.parameter_types[0]))
    const xkeys = ['DVarchar', 'DNumeric', ...Object.keys(grouped)]
    grouped.DBool = []
    let header = Object.entries(TypeProps).map(([key, value]) => {
        return `export type ${value.able} = ${value.rawType} | ${value.field};`
    })
        .concat('export type RegExpable = RegExp | string;')
        .join('\n')
    const symbols = ['sId', 'sComptype', 'sAnti', 'sInferred']
    output.push(header)
    output.push(...symbols.map(e => `export declare const ${e}: unique symbol;`))
    for (const maintype of new Set(xkeys)) {
        const { man, ...f } = TypeProps[maintype]
        output.push(genInterface(grouped[maintype], f, 1, true))
    }
    output.push(genInterface(resp.scalar, { id: 'global' }, 0))
    // console.log(resp.table)@
    output.push(genInterface(resp.table, { id: 'table' }, 0))

    output.push(genInterface(grouped.DAny, TypeProps.DAny, 1, false))
    output.push(genInterface(grouped.DVarchar, TypeProps.DVarchar, 1, true))
    output.push(genInterface(grouped.DNumeric, TypeProps.DNumeric, 1, true))
    output.push(genInterface(resp.scalar, { id: 'global', man: 'Partial<CGlobal>' }, 0))

    writefile('types', output.join('\n'))
    await Bun.$`dprint fmt .buck/types.ts`
}