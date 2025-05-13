import { wrap } from './utils';
import {
    mapTypes,
    NativeMap,
    DNumeric,
    DVarchar,
    DArray,
    DStruct,
    DJson,
    DBool,
    DBlob,
    DDate,
    DMap,
    DOther,
    DAny,
    TypeProps,
    mapTypesProps,
    PatternMatchers,
} from './typedef'
import { camelCase, groupBy, maxBy, range, uniq, uniqBy, upperFirst, zipObject } from 'es-toolkit';
import { Buck, from } from '../buckdb';
import { Merge } from 'type-fest';


const entriesSorted = <T>(items: Record<string, T>) => {
    return Object.keys(items).sort().map(e => [e, items[e]]) as [string, T][]
}

const instance = Buck('')
    .loadExtensions("arrow", "aws", "azure", "delta", "excel", "fts", "h3", "httpfs", "iceberg", "inet", "spatial", "sqlite_scanner", "ui")



const resp = await instance.from('duckdb_types()')
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

    const dest = NativeMap[i.toUpperCase()] === 'DNumeric' ? DNumeric :
        NativeMap[i.toUpperCase()] === 'DVarchar' ? DVarchar :
            NativeMap[i.toUpperCase()] === 'DBool' ? DBool :
                NativeMap[i.toUpperCase()] === 'DDate' ? DDate : DAny
    // const wildcard = '`${string}(${number}, ${number})` | `${string}[]` |  `[${string}]`'
    const n = `D${i.replace('null', 'ANY')}_NATIVE`
    acsheaders += (`export type ${n} = ${enms};\n`)
    funcas += (`as(destype: ${n}, ...args: DAnyable[]): ${dest.field};\n`)
    globas += (`cast(val: ${dest.able}, destype: ${n}, ...args: DAnyable[]): ${dest.field};\n`)
    funcomp += (`as(destype: ${n}, ...args: DAnyable[]): ${dest?.man || dest?.field};\n`)
    globcomp += (`cast(val: ${dest.able}, destype: ${n}, ...args: DAnyable[]): ${dest?.man || dest?.field};\n`)

}

type ftype = Merge<typeof TypeProps['DNumeric'], typeof TypeProps['DArray']>
const fkey = key => camelCase(key).match(/\w+/)[0].replace('array', 'arr').replace('enum', 'enm')
const getFuncHeader = (row: any, ot: ftype) => {
    // console.log({  })
    const tt = TypeProps[mapTypes(row.return_type)] as ftype
    // console.log(row.args);
    // if (row.args)
    // process.exit()
    return {
        pargs: row.args.map(e => e.ptypes.join(' | ')),
        args: row.args.map((arg) => [
            arg.pname,
            arg.dtypes.sort().map(e => e + 'able').join(' | ')
        ].join(arg.required ? ': ' : '?: ')),
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
/*

  filter(lambda: (x: T) => any): DArrayField<T>;
  reduce<U>(lambda: (accumulator: U, currentValue: T) => U, initialValue: U): U;
  apply<U>(lambda: (x: T) => U): DArrayField<U>;

*/

const getLambdaRow = (row: any, x: any) => {
    if (row.function_name.match(/(list_|array_|)(apply|transform)$/)) {
        if (x === 'array') {
            return `${row.function_name}<U>(lambda: (x: T) => U): DArrayField<U>;\n`
        }
        return `${row.function_name}<T, U>(list: T[], lambda: (x: T) => U): DArrayField<U> ;\n`
    }
    if (row.function_name.match(/(list_|array_|)(filter)$/)) {
        if (x === 'array') {
            return `${row.function_name}(lambda: (x: T) => any): DArrayField<T>;\n`
        }
        return `${row.function_name}<T>(list: T[], lambda: (x: T) => any): DArrayField<T> ;\n`
    }
    if (row.function_name.match(/(list_|array_|)(reduce)$/)) {
        if (x === 'array') {
            return `${row.function_name}<U>(lambda: (accumulator: U, currentValue: T) => U, initialValue: U): U;\n`
        }
        return `${row.function_name}<T,U>(list: T[], lambda: (accumulator: U, currentValue: T) => U, initialValue: U): DArrayField<T> ;\n`
    }
}

const genRowFunction = (row: any, f: Partial<ftype>, slice = 0) => {
    let { args, output, pargs } = getFuncHeader(row, f)
    if (row.varargs) {
        args.push(`...args: ${mapTypes(row.varargs)}able[]`)
    }
    if (reverseAliases[row.function_name]) {
        return `${buildJSDoc(row)}  ${row.function_name}: typeof ${reverseAliases[row.function_name]} ;\n`
    }
    if (row.parameter_types.includes('LAMBDA')) {
        return `  ${buildJSDoc(row)}  ${getLambdaRow(row, f.id)}`
    }
    if (row.parameters[0] === 'col0' && row.parameters.length > 2 && row.function_type === 'table' && row.parameters[1] !== 'col1') {
        const [p1, ...pall] = args
        const vargs = pall.map((e, i) => `${e}, // ${pargs[i + 1]}\n`).toSorted();
        console.log(vargs.join(''))
        args = [p1, ['opts?:', wrap(vargs.join(''), 'Partial<{', '}>')].join('')]
        // console.log(args.join(''))
        console.log(pargs.join(', '))

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
    const exts = await instance.from('duckdb_extensions()').select('extension_name', 'description', 'installed_from').execute()
    const resp = await instance.from('duckdb_settings()').execute()
    let out = `export interface DSettings {\n`
    out += resp.map(e => buildJSDoc(e) + `  ${e.name}: ${mapTypesProps(e.input_type).rawType},`).join('\n')
    out += '\n}\n'
    out += `export const DExtensions = ` + JSON.stringify(exts, null, 2) + ' as const' + '\n'
    return out;
}


const aliases = {
    'read_json': ['read_json', 'read_json', 'read_json_auto', 'read_ndjson', 'read_ndjson_auto'],
    'read_json_objects': ['read_json_objects', 'read_json_objects_auto', 'read_ndjson_objects'],
    'read_csv': ['read_csv', 'read_csv_auto', 'sniff_csv'],
    'parquet_scan': ["parquet_scan", "read_parquet"],
    'read_xlsx': ['read_xlsx'],
    'read_text': ['read_text'],
}

const reverseAliases = Object.fromEntries(Object.entries(aliases).flatMap(([k, values]) => {
    return values.map(x => [x, k])
}))

const main = async () => {

    // Sequential, template-like main process for type sync

    // 1. Prepare output array
    let output = [];

    // 2. Connect to database and load extensions

    // 3. Query for function metadata
    const query = instance.from('duckdb_functions()')
        .select('function_name', 'function_type', 'parameter_types', 'return_type', 'description', 'examples', 'varargs', 'parameters')
        .where(e => e.function_name.SimilarTo(/[a-z]\w+/) && !e.function_name.Like('icu_collate%'))
        .orderBy('function_name');

    // 4. Execute query and merge with additional functions
    let results = (await query.execute()).concat(anyFuncs).concat(addFuncs as any);

    // 5. Merge function names and parameter types
    const groups = Object.groupBy(results, e =>
        [e.function_name, e.function_type === 'scalar' && e.parameter_types[0], TypeProps[mapTypes(e.return_type)].inferredTo].join('-')
    );
    let mergedResults = entriesSorted(groups)
        .filter(([key, values]) => !OmittedFuncs.includes(key))
        .flatMap(([key, values]) => {
            let maxParams = maxBy(values, e => e.parameter_types.length as number);
            const args = range(maxParams.parameters.length).map((type, i) => {
                let pname = fkey(maxParams.parameters[i]);
                if (i && fkey(maxParams.parameters[i]) == fkey(maxParams.parameters[i - 1])) {
                    pname += `__0${i}`;
                }
                const ptypes = uniq(values.map(e => e.parameter_types[i]));
                const required = !ptypes.includes(undefined);
                let dtypes = uniq(ptypes.map(e => mapTypes(e)) || []);
                if (maxParams.function_name.includes('regexp')) {
                    if (['pattern', 'separator', 'regex'].includes(pname)) {
                        dtypes = dtypes.filter(e => e === 'DVarchar').concat('RegExp' as any);
                    }
                }
                return { pname, ptypes, dtypes, required };
            });
            const return_type = maxParams.function_name === 'concat' ? 'VARCHAR' : maxParams.return_type;
            const output = !return_type ? 'void' : `${mapTypes(return_type)}Field`;
            return { ...maxParams, return_type, args, output };
        });

    // 6. Group results by function type
    let resp = groupBy(mergedResults, e => e.function_type as 'scalar' | 'table' | 'aggregate' | 'window' | 'udf');

    // 7. Group scalar functions by parameter type
    const grouped = Object.groupBy(resp.scalar.filter(e => !e.function_name.startsWith('h3')), e => mapTypes(e.parameter_types[0]));
    const xkeys = ['DVarchar', 'DNumeric', 'DDate', ...Object.keys(grouped)];

    // 8. Generate type headers

    let header = [DVarchar, DArray, DStruct, DJson, DBool, DBlob, DDate, DMap, DOther, DAny, DNumeric]
        .map(e => `export type ${e.able} = ${e.inferredTo || e.rawType} | ${e.field} | _${e.field};`)
        .sort()
        .concat('export type RegExpable = RegExp | string;')
        .join('\n');
    header += `import {${Object.keys(aliases).sort().join(',')}} from '../src/readers';\n`
    header += acsheaders;
    header += `export type DSomeField = ${xkeys.map(e => TypeProps[e].field).filter(Boolean).join(' | ')}`;
    const symbols = ['sId', 'sComptype', 'sAnti', 'sInferred'];
    output.push(header);
    output.push(...symbols.map(e => `export declare const ${e}: unique symbol;`));

    // 9. Generate interfaces for each main type
    for (const maintype of new Set(xkeys)) {
        const { man, ...f } = TypeProps[maintype];
        const d = (grouped[maintype] || []).filter(e => !PatternMatchers[e.function_name]);
        let s = genInterface(d, f, 1, true);
        if (maintype === 'DAny') {
            s = s.replace('{', '{\n' + funcas);
        }
        output.push(s);
    }

    // 10. Generate global and aggregate interfaces


    const globalInter = genInterface(resp.scalar, { id: 'global' }, 0)
        .replace('{', '{\n' + globas);
    output.push(globalInter);
    output.push(genInterface(resp.aggregate, { id: 'aggregate' }, 0));
    output.push(genInterface(resp.table, { id: 'table' }, 0));

    // 11. Generate additional interfaces
    const dany = genInterface(grouped.DAny, TypeProps.DAny, 1, false);
    output.push(dany.replace('{', '{\n' + funcomp));
    output.push(genInterface(grouped.DVarchar, TypeProps.DVarchar, 1, true));
    output.push(genInterface(grouped.DNumeric, TypeProps.DNumeric, 1, true));

    // 12. Generate global component interfaces
    const globalInterComp = genInterface(resp.scalar, { id: 'global', man: 'CGlobal' }, 0)
        .replace('{', '{\n' + globcomp);
    output.push(globalInterComp);

    // 13. Generate aggregate component interfaces
    const aff = genInterface(resp.aggregate, { id: 'aggregate', man: 'CAggregate' }, 0);
    output.push(aff);

    // 14. Generate settings and append
    output.push(await generateSettings());

    // 15. Write to .buck/types.ts
    await writefile('types', output.join('\n'));

    // 16. Format the generated file
    await Bun.$`dprint fmt .buck/types.ts`;
}

if (import.meta.main) {
    await main()
}
