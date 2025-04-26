import { mapTypes, mapTypesProps, PatternMatchers, TypeProps, wrap, Ω } from './utils';
import { camelCase, groupBy, mapValues, maxBy, omit, range, uniq, uniqBy, upperFirst } from 'es-toolkit';
import { Buck, from } from '../buckdb';
const resp = await from('duckdb_types()')
    .select((e) => ({ logical_type: e.logical_type.left(1).concat(e.logical_type.right(-1).lower()) }))
    .distinctOn('logical_type')
    .where(e => e.logical_type.SimilarTo(/\w+/))
    .orderBy('logical_type')
    // .keyBy(e => e.type_category)
    // .toSql()
    .execute()
resp.push({ logical_type: 'Array' })
resp.push({ logical_type: 'Json' })
const DuckFunction = (function_name: string, params: Record<string, string>, return_type = 'ANY', opts: Record<string, string> = {}) => {
    const parameters = Object.keys(params)
    const parameter_types = parameters.map(e => params[e])
    return {
        function_name,
        function_type: 'scalar',
        parameter_types,
        return_type,
        description: '',
        examples: [`${function_name}(${parameters.join(', ')})`],
        varargs: null,
        parameters,
        ...opts
    }

}

const anyFuncs = []
const addFuncs = [
    DuckFunction('count', {}, 'BIGINT'),
    ...resp.map(e => DuckFunction(e.logical_type, { val: 'OTHER' }, e.logical_type.toUpperCase())),
    ...Object.entries(PatternMatchers).map(([k, e]) => DuckFunction(k, e.params, e.return_type)),
]


const tmap = {
    BOOLEAN: 'DBool',
    NUMERIC: 'DNumeric',
    STRING: 'DVarchar',
    DATETIME: 'DDate',
}

const NativeMap = {
    BOOLEAN: 'DBool',
    NUMERIC: 'DNumeric',
    STRING: 'DVarchar',
    DATETIME: 'DDate',
}
const NativeInverseMap = Object.fromEntries(Object.entries(NativeMap).map(([k, v]) => [v, k]))

const resp3 = await from('duckdb_types()')
    .select((e, D) => ({ typenames: D.array_agg(e.type_name) }))
    .keyBy(e => e.type_category)
    .execute()
let acsheaders = ''
let funcas = ''
let funcomp = ''
let globas = ''
let globcomp = ''
for (let i in resp3) {
    let e = resp3[i]
    const enms = uniq(resp3[i].typenames.map(upperFirst).map(e => wrap(e, "'"))).join(' | ')

    const dest = TypeProps[NativeMap[i.toUpperCase()] || 'DAny']
    // const wildcard = '`${string}(${number}, ${number})` | `${string}[]` |  `[${string}]`'
    const n = `D${i.replace('null', 'ANY')}_NATIVE`
    acsheaders += (`export type ${n} = ${enms};\n`)
    funcas += (`as(destype: ${n}, ...args: DAnyable[]): ${dest.field};\n`)
    globas += (`cast(val: ${dest.able}, destype: ${n}, ...args: DAnyable[]): ${dest.field};\n`)
    funcomp += (`as(destype: ${n}, ...args: DAnyable[]): ${dest?.man || dest?.field};\n`)
    globcomp += (`cast(val: ${dest.able}, destype: ${n}, ...args: DAnyable[]): ${dest?.man || dest?.field};\n`)


}

const genAs = async () => {
    return "{"
    const resp = await from('duckdb_types()')
        .select((e, D) => ({ typenames: D.array_agg(e.type_name) }))
        .keyBy(e => e.type_category)
        .execute()
    let rtn = '{\n'
    for (let i in resp) {
        let e = resp[i]
        const enms = uniq(resp[i].typenames.map(upperFirst).map(e => wrap(e, "'"))).join(' | ')
        const tmap = {
            BOOLEAN: 'DBool',
            NUMERIC: 'DNumeric',
            STRING: 'DVarchar',
            DATETIME: 'DDate',
        }
        const dest = tmap[i.toUpperCase()] || 'DAny'
        const wildcard = '`${string}(${number}, ${number})` | `${string}[]` |  `[${string}]`'
        rtn += (` as(destype: ${enms} | ${wildcard}): ${dest}Field;\n`)

    }
    return rtn
}




type ftype = typeof TypeProps['DNumeric']
const fkey = key => camelCase(key).match(/\w+/)[0].replace('array', 'arr').replace('enum', 'enm')
const getFuncHeader = (row: any, ot: ftype) => {
    const tt = TypeProps[mapTypes(row.return_type)] as ftype

    return {
        args: row.args.map((arg) => [arg.pname, arg.dtypes.sort().map(e => e + 'able').join(' | ')].join(arg.required ? ': ' : '?: ')),
        output: ot?.man && tt.man || (!row.return_type ? 'void' : tt?.field)
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

const genRowFunction = (row: any, f: Partial<ftype> = {}, slice = 0) => {
    let { args, output } = getFuncHeader(row, f)
    if (row.varargs) {
        args.push(`...args: ${mapTypes(row.varargs)}able[]`)
    }
    if (row.parameters[0] === 'col0' && row.parameters.length > 2 && row.function_type === 'table' && row.parameters[1] !== 'col1') {
        const [p1, ...pall] = args
        args = [p1, ['opts?:' + wrap(pall.toSorted().join(', '), 'Partial<{', '}>')]]
    }
    const fargs = args.slice(slice).join(', ')
    return `${buildJSDoc(row)}  ${row.function_name}(${fargs}): ${output} ;\n`
}

const genInterface = (rows = [], f: ftype | { id: string } & Record<string, any>, slice = 0, mergeAny = false) => {
    const field = `D${upperFirst(f.id)}Field`
    const comp = `D${upperFirst(f.id)}Comp`
    const ccomp = `C${upperFirst(f.id)}`

    let str = `interface ${f.man ? ccomp : ('_' + field)} ${mergeAny && f.id !== 'any' ? `extends ${f.man ? 'CAny' : 'DAnyField'}` : ''} {\n`
    if (f.inferredTo)
        str += `  [sInferred]: ${f.inferredTo}\n`
    if (!f.man && f.rawType)
        str += `  [sComptype]: ${f.id === 'varchar' || f.id === 'numeric' ? comp : f.rawType}\n`

    for (const row of uniqBy(rows, e => getImprint(e, f)) as any[]) {
        str += genRowFunction(row, f, slice)
    }
    str += '}\n'
    if (f.man)
        str += `\nexport type ${comp} = ${f.man} \n`
    else
        str += `export type ${field} = _${field}` + (f.fieldSuffix || '')

    return str
}

const writefile = (pname: string, content: string) => {
    return Bun.file(`.buck/${pname}.ts`).write(content)
        .then(() => Bun.$`prettier --print-width=240 --write .buck/${pname}.ts`)
}

const OmittedFuncs = Ω('split-VARCHAR-any[]', 'length-VARCHAR-number')
// const genFunctions = 

const generateSettings = async () => {
    const db = Buck('')
    // console.log(db.load) 
    // console.log('generating..')
    const extts = await db.from('duckdb_extensions()')
        .select(e => e.extension_name)
        .where(e => !e.loaded && e.installed)
        .execute()
    // console.log({ extts })
    db.loadExtensions("arrow", "aws", "azure", "delta", "excel", "fts", "h3", "httpfs", "iceberg", "inet", "spatial", "sqlite_scanner", "ui")
    // console.log('keekek')
    const resp = await db.from('duckdb_settings()')
        .execute()
    // console.log('lslslss', resp.length)
    // console.log({resp})
    let out = `export interface DSettings {\n`
    out += resp.map(e => buildJSDoc(e) + `  ${e.name}: ${mapTypesProps(e.input_type).rawType},`).join('\n')
    out += '\n}\n'
    out += `export const DExtensions = ` + JSON.stringify(await from('duckdb_extensions()').execute(), null, 2) + ' as const' + '\n'
    // out += `\nexport const DTypes = ` + JSON.stringify(await from('duckdb_types()').select('type_name', 'type_size', 'logical_type', 'type_category').execute(), null, 2) + ' as const' + '\n'
    return out;
}


if (import.meta.main) {
    const main = async () => {

        let output = []
        // const xdb = database('', {


        // })

        // console.log({ rres })
        const db = Buck('').loadExtensions('httpfs').from('duckdb_functions()')
        // db._settings = ['install h3;', 'load h3;']
        const query = db
            .select('function_name', 'function_type', 'parameter_types', 'return_type', 'description', 'examples', 'varargs', 'parameters')
            // .where(`function_name SIMILAR TO '[a-z]\\w+' AND function_name NOT LIKE 'icu_collate%'`)
            .where(e => e.function_name.SimilarTo(/[a-z]\w+/) && !e.function_name.Like('icu_collate%'))
            .orderBy('function_name')
        console.log(query.toSql({ pretty: true }))
        let results = (await query.execute()).concat(anyFuncs).concat(addFuncs)
        // console.log({ results: results.length })
        // console.log(results.filter(e => e.function_name == 'count'))
        // return
        const mergeFuncNames = () => {
            const groups = Object.groupBy(results, e => [e.function_name, e.function_type === 'scalar' && e.parameter_types[0], TypeProps[mapTypes(e.return_type)].inferredTo].join('-'))
            return Object.entries(groups)
                .filter(([key, values]) => !(key in OmittedFuncs))
                .flatMap(([key, values]) => {
                    // console.log('-->', key)
                    // maxParams.
                    let maxParams = maxBy(values, e => e.parameter_types.length as number)
                    const args = range(maxParams.parameters.length).map((type, i) => {
                        let pname = fkey(maxParams.parameters[i]) //.match(/\w+/)[0]
                        if (i && fkey(maxParams.parameters[i]) == fkey(maxParams.parameters[i - 1])) {
                            pname += `__0${i}`
                        }

                        const ptypes = uniq(values.map(e => e.parameter_types[i]))
                        const required = !ptypes.includes(undefined)
                        // if (maxParams.function_name === 'count') {
                        //     console.log({ ptypes, required })
                        // }
                        let dtypes = uniq(ptypes.map(e => mapTypes(e)) || [])
                        if (maxParams.function_name.includes('regexp')) {
                            if (pname in Ω('pattern', 'separator', 'regex')) {
                                dtypes = dtypes.filter(e => e === 'DVarchar').concat('RegExp')
                            }
                        }
                        return { pname, ptypes, dtypes, required }
                    })
                    const return_type = maxParams.function_name === 'concat' ? 'VARCHAR' : maxParams.return_type
                    const output = !return_type ? 'void' : `${mapTypes(return_type)}Field`
                    // console.log({ return_type, output })
                    return { ...maxParams, return_type, args, output }
                })
        }
        results = mergeFuncNames()

        // console.log({ results })
        let resp = groupBy(results, e => e.function_type as 'scalar' | 'table' | 'aggregate' | 'window' | 'udf')

        // console.log(resp.)
        const grouped = Object.groupBy(resp.scalar.filter(e => !e.function_name.startsWith('h3')), e => mapTypes(e.parameter_types[0]))
        const xkeys = ['DVarchar', 'DNumeric', 'DDate', ...Object.keys(grouped)]
        // console.log(resp)
        let header = Object.entries(TypeProps).map(([key, value]) => {
            return `export type ${value.able} = ${value.inferredTo || value.rawType} | ${value.field} | _${value.field};`
        })
            .concat('export type RegExpable = RegExp | string;')
            .join('\n')
        header += acsheaders;
        header += `export type DSomeField = ${xkeys.map(e => TypeProps[e].field).filter(Boolean).join(' | ')}`
        const symbols = ['sId', 'sComptype', 'sAnti', 'sInferred']
        output.push(header)
        output.push(...symbols.map(e => `export declare const ${e}: unique symbol;`))
        for (const maintype of new Set(xkeys)) {
            const { man, ...f } = TypeProps[maintype]
            const d = (grouped[maintype] || []).filter(e => !PatternMatchers[e.function_name])
            let s = genInterface(d, f, 1, true)
            if (maintype === 'DAny') {
                // console.log('dannnyyyy')
                s = s.replace('{', '{\n' + funcas)
                // console.log('------dd-----')
                // console.log(s)
                // console.log('-------ddd----')
            }
            output.push(s)
        }
        // console.log(resp.aggregate.slice(-3))
        const globalInter = genInterface(resp.scalar, { id: 'global' }, 0)
            .replace('{', '{\n' + globas)
        const scal = globalInter.matchAll(/\n\s*\w+?\([^\;]+/g).toArray().map((e) => e[0].replace('\n', 'export declare function ')).join('\n')
        // console.log(header + '\n' + scal)

        output.push(globalInter)
        output.push(genInterface(resp.aggregate, { id: 'aggregate' }, 0))
        // console.log(resp.table)@
        output.push(genInterface(resp.table, { id: 'table' }, 0))

        const dany = genInterface(grouped.DAny, TypeProps.DAny, 1, false)
        output.push(dany.replace('{', '{\n' + funcomp))
        output.push(genInterface(grouped.DVarchar, TypeProps.DVarchar, 1, true))
        output.push(genInterface(grouped.DNumeric, TypeProps.DNumeric, 1, true))

        const globalInterComp = genInterface(resp.scalar, { id: 'global', man: 'CGlobal' }, 0)
            .replace('{', '{\n' + globcomp)
        output.push(globalInterComp)

        const aff = genInterface(resp.aggregate, { id: 'aggregate', man: 'CAggregate' }, 0)
        // console.log(aff)
        output.push(aff)
        output.push(await generateSettings())
        writefile('types', output.join('\n'))
        await Bun.$`dprint fmt .buck/types.ts`
    }
    main()
}