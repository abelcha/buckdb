import * as _ from './template.ts'
// import _fns from '@buckdb/.buck/duckdb_functions.json'
import { camelCase, groupBy, maxBy, range, sortBy, uniq, uniqBy } from 'es-toolkit'
import { Buck } from '@buckdb/node'
import { mapTypes, mapTypesProps } from '../src/typedef.ts'
import { wrap, Σ } from '../src/utils.ts'

const getCommunityExtensions = () => {
    return fetch('https://api.github.com/repos/duckdb/community-extensions/contents/extensions')
        .then(e => e.json())
        .then(e => e.filter(z => z.type === 'dir').map(x => x.name))
}

const community_extensions = [] // await getCommunityExtensions()
global.duckdb_extensions = await Buck('').from('duckdb_extensions()').select(e => e.extension_name).execute()
const allextensions = ['h3', 'aws', 'azure', 'delta', 'excel', 'fts', 'httpfs', 'iceberg', 'inet', 'spatial', 'sqlite_scanner', 'ui', 'ducklake']

const instance = Buck('').loadExtensions(...uniq(allextensions))
const fkey = (key: string) => camelCase(key).match(/\w+/)?.[0].replace('array', 'arr').replace('enum', 'enm').replace('function', 'fn')
const OmittedFuncs = ['split-VARCHAR-any[]', 'length-VARCHAR-number', 'length-ANY[]-number', 'substr-VARCHAR-string']
const entriesSorted = <T>(items: Record<string, T>) => {
    return Object.keys(items).sort().map(e => [e, items[e]]) as [string, T][]
}
async function getMergedResults() {
    const query = instance.from('duckdb_functions()')
        .select('function_name', 'function_type', 'parameter_types', 'return_type', 'description', 'examples', 'varargs', 'parameters', 'schema_name', 'macro_definition')
        .where(e => e.return_type !== 'INTERVAL' && e.function_name.SimilarTo(/[A-z]\w+/) && !e.function_name.Like('icu_collate%') && !e.function_name.Like('__internal%'))
        .orderBy('function_name')
        .orderBy('return_type')
    let results = (await query.execute())
        .map(res => {
            if (res.parameter_types[0] === 'ANY' && res.parameters[0] === 'list') {
                res.parameter_types[0] = 'ANY[]'
            }
            if (res.parameter_types[0] === 'ANY' && res.parameters[0] === 'map') {
                res.parameter_types[0] = 'MAP(ANY, ANY)'
            }
            return res
        })
    // .concat(anyFuncs).concat(addFuncs as any);

    // 5. Merge function names and parameter types
    const groups = groupBy(results, e => [e.function_name, e.function_type === 'scalar' && e.parameter_types[0], mapTypesProps(e.return_type).rawType].join('-'))

    return entriesSorted(groups)
        .filter(([key, values]) => !OmittedFuncs.includes(key))
        .flatMap(([key, values]) => {
            // console.log({ key })
            if (!values) {
                throw new Error('No values found for key: ' + key)
            }
            let maxParams = maxBy(values, e => e.parameter_types.length as number)
            if (!maxParams) {
                throw new Error('No maxParams found for key: ' + key)
            }
            const args = range(maxParams.parameters.length).map((type, i) => {
                let pname = fkey(maxParams.parameters[i]) as string
                if (i && fkey(maxParams.parameters[i]) == fkey(maxParams.parameters[i - 1])) {
                    pname += `__0${i}`
                }
                const ptypes = uniq(values.map(e => e.parameter_types[i]))
                // @ts-ignore
                const required = !ptypes.includes(undefined)
                let dtypes = uniq(ptypes.map(e => mapTypes(e)) || [])

                return { pname, ptypes, dtypes, required }
            })
            const return_type = maxParams.function_name === 'concat' ? 'VARCHAR' : maxParams.return_type
            const output = !return_type ? 'void' : mapTypesProps(return_type, true).field
            return { ...maxParams, return_type, args, output }
        })
}
const _fns = await getMergedResults()

global.fns = _fns
global.comptypes = { 'numeric': 'number & _DNumericComp', 'varchar': 'string & _DVarcharComp', 'any': 'DAnyComp' }
global.gentypes = { 'numeric': 'DNum', 'varchar': 'DStr', 'any': 'DAny<DNum,DStr>' }
type IFns = typeof _fns[number]


const buildJSDoc = (row: IFns) => {
    const items: string[] = []
    if (row.description) {
        items.push('@description: ' + row.description)
    }
    if (row.examples?.length) {
        items.push('@example: ' + row.examples)
    }
    if (row.macro_definition) {
        items.push('@example: ' + row.macro_definition)
    }
    if (row.args?.length) {
        items.push('@default: ' + `${row.function_name}(${row.args.map(x => x.pname + ':' + x.ptypes.toSorted().join(' | ')).join(', ')}) -> ${row.return_type}`)
    }
    if (items.length) {
        return wrap(items.join('\t').replaceAll('\n', '\\n'), '\n  /**', '*/\n')
    }
    return ''
}
const genArgs = (args: IFns['args'], varargs: string) => {
    return args.map(x => {
        const types = uniq(x.ptypes.map((e) => mapTypesProps(e, true).able))
        // console.log({ zzz: x, types })
        if (['pattern', 'regex'].includes(x.pname)) {
            types.push('RegExp')
        }
        return x.pname + (!x.required ? '?:' : ': ') + types.toSorted().join(' | ')
    })
        .concat(varargs ? [`...vargs: ${mapTypesProps(varargs, true).able}[]`] : [])
        .join(', ')
}

global.fns = _fns
global.renderMethod = (e: IFns, typeMap = {}, slice = 1, hidden = false) => {
    const r = mapTypesProps(e.return_type, true)
    const rtn = `${hidden ? '//' : ''} ${e.function_name}(${genArgs(e.args.slice(slice), e.varargs)}): ${typeMap[r.id] || r.field}`
    return rtn
}

const banMethods = (e: IFns, type: string) => {
    return e.function_name.startsWith('h3')
        || e.function_name.startsWith('ST_')
        || e.function_name.startsWith('__internal')
        || e.return_type?.startsWith('INTERVAL')
        || (type !== 'DDate' && e.return_type?.match(/^(DATE|TIME)/))
        || (type !== 'DJson' && e.function_name.startsWith('json'))
        || type === 'DAny' && e.parameter_types[0] !== 'ANY'
}
let total = 0

const getFuncId = (z: IFns) => {
    return Bun.hash.adler32(
        genArgs(z.args, '') + '|||' + (z.description?.length ? z.description : z.function_name),
    )
}
global.duckdb_settings = await instance.from('duckdb_settings()').execute()

global.generateSettings = (xmap: Record<string, string[]> = {}) => {
    return global.duckdb_settings.map(e => buildJSDoc(e) + `  ${e.name}: ${xmap[e.name] || mapTypesProps(e.input_type).rawType},`).join('\n')
}

type Opts = { type: string; match: () => boolean; typeMap: Record<string, any>; slice: number; override: string[] }

const getFunctions = (xfns: IFns[], opts: Opts) => {
    const funcs = uniqBy(
        typeof opts.match === 'function'
            ? xfns.filter(opts.match)
            : xfns.filter(e => e.function_type in Σ('scalar', 'macro') && e.args[0]?.dtypes.includes(opts.type as any) && !banMethods(e, opts.type)),
        e => e.function_name + genArgs(e.args, e.varargs),
    )
    // .filter(z => JSON.stringify(z).match(/\b(array|any)\b/img))
    const namegp = entriesSorted(groupBy(funcs, e => e.function_name)).map(([key, values]) => {
        const id = values.map(getFuncId).toSorted().join('/')
        return { signatures: values, id }
    })
    return Object.entries(groupBy(namegp, e => e.id))
}

const formatFunctions = (p: ReturnType<typeof getFunctions>, opts: Opts) => {
    const override = opts.override || []
    const gpx = p//sortBy(p, ['function_name'])
        .flatMap(([key, values]) => {
            const [fst, ...rest] = sortBy(values, [e => -e.signatures[0].function_name.length])
            const fsig = fst.signatures[0]
            const char = opts.type ? '- ' : '… '

            return fst.signatures.map((e, i) => [
                buildJSDoc(e),
                global.renderMethod(e, opts.typeMap || {}, opts.slice ?? 1, override.includes(fsig.function_name)),
                ...(i ? [] :  rest.map(e => e.signatures[0]).map(e => `${buildJSDoc(e)} ${e.function_name}: this['${fsig.function_name}'];`))
            ])
        })
    return sortBy(gpx, [e => e[1].toLowerCase()]).map(e => e.join('') + '\n').join('\n')
    // return gpx.map(e => e.join('') + '\n').join('\n')
}

global.renderMethods = (opts: Opts) => {
    return formatFunctions(getFunctions(_fns.filter(e => e.function_type !== 'macro'), opts), opts)
}

global.renderMacros = (opts: Opts) => {
    const macros = _fns.filter(e => e.function_type === 'macro' && e.schema_name !== 'main')
        .map(fn => {
            // for (const i)
            for (const i in fn.parameters) {
                const item = fn.parameters[i]
                if (item.match(/^(l|l\d|arr)$/)) {
                    fn.parameter_types[i] = 'ANY[]'
                    fn.args[i].ptypes = ['ANY[]']
                    fn.args[i].dtypes = ['DArray']
                }
                const im = fn.macro_definition.match(/list_aggr\(\w+, '(\w+)'\)/)?.[1]
                const rt = im && _fns.find(e => e.function_name === im)?.return_type
                if (rt) {
                    fn.return_type = rt
                    fn.output = mapTypesProps(rt, true).field
                }
            }
            return fn
        })
    // console.log(macros)
    return formatFunctions(getFunctions(macros, opts), opts)
}

const rrr = global.renderMacros({ match: e => true })
// console.log(rrr)
let init = false
async function main() {
    const content = await Bun.file('codegen/template.ts').text()
    const body = content.split('/*{').join('${').split('}*/').join('}').replaceAll(/`/g, '\`')
    const nwContent = eval(' `' + body + '`')

    const nwContentFmt = await Bun.$`cat < ${new Response(nwContent)} | dprint fmt --stdin types.ts `.text()
    const oldContent = await Bun.file('.buck/types.ts').text()

    if (oldContent !== nwContentFmt || !init) {
        // init = true
        console.log('Generating .buck/types.ts')
        await Bun.write('.buck/types.ts', nwContentFmt)
        console.log(_ && new Date().toISOString(), 'Generated .buck/types.ts')
    } else {
        console.log(new Date().toISOString(), 'No changes in .buck/types.ts')
    }
}

await main()

