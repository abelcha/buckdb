import { PatternMatchers, wrap } from './utils';
import { camelCase, groupBy, maxBy, range, uniq, uniqBy, upperFirst } from 'es-toolkit';
import { Buck, from } from '../buckdb';


const TypeProps = {
    'DNumeric': {
        man: 'number & CNumeric',
        comptype: 'number', id: 'numeric', able: 'DNumericable', field: 'DNumericField', rawType: 'number', inferredTo: 'number', anti: 'AntiNumber',
        fieldSuffix: '& number'
    },
    'DVarchar': {
        man: 'string & CVarchar',
        id: 'varchar', able: 'DVarcharable', field: 'DVarcharField', rawType: 'string', inferredTo: 'string', anti: 'AntiString'
    },
    'DArray': { id: 'array', able: 'DArrayable', field: 'DArrayField', rawType: 'any[]', inferredTo: 'any[]', anti: 'Array', generic: { main: '<T = any>', inferred: 'T[]' } },
    'DStruct': { id: 'struct', able: 'DStructable', field: 'DStructField', rawType: 'Record<string,any>', inferredTo: 'Record<string,any>', anti: 'AntiObject', generic: { main: '<T = {}>', inferred: 'T' } },
    'DJson': { id: 'json', able: 'DJsonable', field: 'DJsonField', rawType: 'Record<string,any>', inferredTo: 'Record<string,any>', anti: 'AntiObject', generic: { main: '<T = {}>', inferred: 'T' } },
    'DBool': { id: 'bool', able: 'DBoolable', field: 'DBoolField', rawType: 'boolean', inferredTo: 'boolean', anti: 'AntiBoolean' },
    'DBlob': { id: 'blob', able: 'DBlobable', field: 'DBlobField', rawType: 'Blob', inferredTo: 'string', anti: 'AntiBlob' },
    'DDate': { id: 'date', able: 'DDateable', field: 'DDateField', rawType: 'Date', inferredTo: 'Date', anti: 'AntiDate' },
    'DMap': { id: 'map', able: 'DMapable', field: 'DMapField', rawType: 'Map<string,any>', inferredTo: 'Map<string,any>', anti: 'AntiMap' },
    'DOther': { id: 'other', able: 'DOtherable', field: 'DOtherField', rawType: 'any', inferredTo: 'any' },
    'DAny': { man: 'Partial<CAny>', id: 'any', able: 'DAnyable', field: 'DAnyField', rawType: 'any', inferredTo: 'any' },
}


const entriesSorted = <T>(items: Record<string, T>) => {
    return Object.keys(items).sort().map(e => [e, items[e]]) as [string, T][]
}

export const mapTypes = (type: string) => {
    if (!type) return 'DOther';
    const t = type.toUpperCase();
    if (t.match(/^(ANY)$/)) return 'DAny';
    if (t.match(/(\[\]$|^LIST$|^ARRAY$|\w+\[\w+\])/)) return 'DArray';
    if (t.match(/\b((U)?(BIG|HUGE|TINY|SMALL)?INT(EGER)?|DOUBLE|DECIMAL|FLOAT)\b/)) return 'DNumeric';
    if (t.match(/^(VARCHAR|CHAR|TEXT)$/)) return 'DVarchar';
    if (t.match(/^STRUCT/)) return 'DStruct';
    if (t.match(/^JSON/)) return 'DJson';
    if (t.match(/^BOOLEAN/)) return 'DBool';
    if (t.match(/^MAP/)) return 'DMap';
    if (t.match(/^BLOB/)) return 'DBlob';
    if (t.match(/^(DATE|TIME)[\w\s]*/)) return 'DDate';
    return 'DOther';
}

const mapTypesProps = (type: string, details = false) => {
    const mtype = mapTypes(type)
    if (mtype === 'DArray' && details === true) {
        const [_, subtype] = type.match(/^([A-Z]+)\[\]$/) || []
        if (subtype) {
            const s = mapTypesProps(subtype)
            const rtn = {
                ...TypeProps.DArray, rawType: s.rawType + '[]', inferredTo: !s.inferredTo ? 'any[]' : s.inferredTo + '[]'
            }
            console.log({ subtype, rtn })
            return rtn
        }
        return 'DArray';
    }
    return TypeProps[mtype]
}


const resp = await from('duckdb_types()')
    .select((e) => ({ logical_type: e.logical_type.left(1).concat(e.logical_type.right(-1).lower()) }))
    .distinctOn('logical_type')
    .where(e => e.logical_type.SimilarTo(/\w+/))
    .orderBy('logical_type')
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
    ...entriesSorted(PatternMatchers).map(([k, e]) => DuckFunction(k, e.params, e.return_type)),
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
    .orderBy('type_category')
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

type ftype = typeof TypeProps['DNumeric'] & typeof TypeProps['DArray']
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

    let str = `interface ${f.man ? ccomp : ('_' + field)} ${f.generic?.main || ''} ${mergeAny && f.id !== 'any' && !f.generic ? `extends ${f.man ? 'CAny' : 'DAnyField'}` : ''} {\n`
    if (f.inferredTo)
        str += `  [sInferred]: ${f.generic?.inferred || f.inferredTo}\n`
    if (!f.man && f.rawType)
        str += `  [sComptype]: ${f.id === 'varchar' || f.id === 'numeric' ? comp : f.rawType}\n`

    for (const row of uniqBy(rows, e => getImprint(e, f)) as any[]) {
        str += genRowFunction(row, f, slice)
    }
    str += '}\n'
    if (f.generic?.main)
        str += `export type ${field}${f.generic.main} = _${field}<T> & ${f.generic.inferred};`
    else if (f.man)
        str += `\nexport type ${comp} = ${f.man} \n`
    else
        str += `export type ${field} = _${field}` + (f.fieldSuffix || '')

    return str
}

const writefile = (pname: string, content: string) => {
    return Bun.file(`.buck/${pname}.ts`).write(content)
        .then(() => Bun.$`prettier --print-width=240 --write .buck/${pname}.ts`)
}

const OmittedFuncs = ['split-VARCHAR-any[]', 'length-VARCHAR-number']
// const genFunctions = 

const generateSettings = async () => {
    const db = Buck('')
    const extts = await db.from('duckdb_extensions()')
        .select(e => e.extension_name)
        .where(e => !e.loaded && e.installed)
        .execute()
    // db.loadExtensions("arrow", "aws", "azure", "delta", "excel", "fts", "h3", "httpfs", "iceberg", "inet", "spatial", "sqlite_scanner", "ui")
    const resp = await db.from('duckdb_settings()')
        .execute()
    let out = `export interface DSettings {\n`
    out += resp.map(e => buildJSDoc(e) + `  ${e.name}: ${mapTypesProps(e.input_type).rawType},`).join('\n')
    out += '\n}\n'
    out += `export const DExtensions = ` + JSON.stringify(await from('duckdb_extensions()').select('extension_name', 'description', 'installed_from').execute(), null, 2) + ' as const' + '\n'
    return out;
}


if (import.meta.main) {
    const main = async () => {

        let output = []

        const db = Buck('')
            .loadExtensions("arrow", "aws", "azure", "delta", "excel", "fts", "h3", "httpfs", "iceberg", "inet", "spatial", "sqlite_scanner", "ui")
            .from('duckdb_functions()')
        const query = db
            .select('function_name', 'function_type', 'parameter_types', 'return_type', 'description', 'examples', 'varargs', 'parameters')
            .where(e => e.function_name.SimilarTo(/[a-z]\w+/) && !e.function_name.Like('icu_collate%'))
            .orderBy('function_name')
        // .limit(380)
        let results = (await query.execute()).concat(anyFuncs).concat(addFuncs)
        const mergeFuncNames = () => {
            const groups = Object.groupBy(results, e => [e.function_name, e.function_type === 'scalar' && e.parameter_types[0], TypeProps[mapTypes(e.return_type)].inferredTo].join('-'))
            return entriesSorted(groups)
                .filter(([key, values]) => !OmittedFuncs.includes(key))
                .flatMap(([key, values]) => {
                    let maxParams = maxBy(values, e => e.parameter_types.length as number)
                    const args = range(maxParams.parameters.length).map((type, i) => {
                        let pname = fkey(maxParams.parameters[i]) //.match(/\w+/)[0]
                        if (i && fkey(maxParams.parameters[i]) == fkey(maxParams.parameters[i - 1])) {
                            pname += `__0${i}`
                        }

                        const ptypes = uniq(values.map(e => e.parameter_types[i]))
                        const required = !ptypes.includes(undefined)
                        let dtypes = uniq(ptypes.map(e => mapTypes(e)) || [])
                        if (maxParams.function_name.includes('regexp')) {
                            if (['pattern', 'separator', 'regex'].includes(pname)) {
                                dtypes = dtypes.filter(e => e === 'DVarchar').concat('RegExp')
                            }
                        }
                        return { pname, ptypes, dtypes, required }
                    })
                    const return_type = maxParams.function_name === 'concat' ? 'VARCHAR' : maxParams.return_type
                    const output = !return_type ? 'void' : `${mapTypes(return_type)}Field`
                    return { ...maxParams, return_type, args, output }
                })
        }
        results = mergeFuncNames()

        let resp = groupBy(results, e => e.function_type as 'scalar' | 'table' | 'aggregate' | 'window' | 'udf')



        const grouped = Object.groupBy(resp.scalar.filter(e => !e.function_name.startsWith('h3')), e => mapTypes(e.parameter_types[0]))
        const xkeys = ['DVarchar', 'DNumeric', 'DDate', ...Object.keys(grouped)]
        let header = entriesSorted(TypeProps).map(([key, value]) => {
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
                s = s.replace('{', '{\n' + funcas)
            }
            output.push(s)
        }
        const globalInter = genInterface(resp.scalar, { id: 'global' }, 0)
            .replace('{', '{\n' + globas)
        const scal = globalInter.matchAll(/\n\s*\w+?\([^\;]+/g).toArray().map((e) => e[0].replace('\n', 'export declare function ')).join('\n')

        output.push(globalInter)
        output.push(genInterface(resp.aggregate, { id: 'aggregate' }, 0))
        output.push(genInterface(resp.table, { id: 'table' }, 0))

        const dany = genInterface(grouped.DAny, TypeProps.DAny, 1, false)
        output.push(dany.replace('{', '{\n' + funcomp))
        output.push(genInterface(grouped.DVarchar, TypeProps.DVarchar, 1, true))
        output.push(genInterface(grouped.DNumeric, TypeProps.DNumeric, 1, true))

        const globalInterComp = genInterface(resp.scalar, { id: 'global', man: 'CGlobal' }, 0)
            .replace('{', '{\n' + globcomp)
        output.push(globalInterComp)

        const aff = genInterface(resp.aggregate, { id: 'aggregate', man: 'CAggregate' }, 0)
        output.push(aff)
        output.push(await generateSettings())
        writefile('types', output.join('\n'))
        await Bun.$`dprint fmt .buck/types.ts`
    }
    main()
}