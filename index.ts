// const { default: commands } = await import('./commands/**/*.ts');
// // await import('buckdb?toot=41')
// console.log(commands);
import { DuckDBInstance, DOUBLE, VARCHAR } from '@duckdb/node-api';
import { camelCase, countBy, maxBy, omitBy, uniq, uniqBy } from 'es-toolkit';
import { every } from 'es-toolkit/compat';
// console.log({DOUBLE, VARCHAR})
const instance = await DuckDBInstance.create();
const connection = await instance.connect();
await connection.runAndReadAll(`
CREATE OR REPLACE MACRO STD_NUMERIC(x) AS regexp_replace(x, '\\b((U)?(BIG|HUGE|TINY|SMALL)?INT(EGER)?|DOUBLE|DECIMAL|FLOAT)\\b', 'NUMERIC'); 
CREATE OR REPLACE MACRO TRANSTYPE(x) AS IF(STD_NUMERIC(x) IN ('NUMERIC', 'VARCHAR'),STD_NUMERIC(x), 'WHATEVER');
`)
const res = await connection.runAndReadAll(`SELECT 
DISTINCT ON(function_name, paramtypes, returntypes)
// database_name || '/' || schema_name ||   '/' || function_oid     AS id,
function_name     AS name,
parameters        AS params,
parameter_types.list_transform(x -> TRANSTYPE(x))       AS paramtypes,
TRANSTYPE(return_type)       AS returntypes,
parameter_types       AS ogtypes,
varargs           AS varargs,
description       AS desc,
// tags              AS tags,
left(comment, 10)           AS comment,
examples[1]          AS example

FROM duckdb_functions()
WHERE macro_definition IS NULL
// AND has_side_effects != True
// AND internal = false
AND function_type = 'scalar'
AND stability= 'CONSISTENT'
// AND len(function_name) = 3
AND function_name SIMILAR TO '[a-z]\\w+'
AND function_name NOT LIKE 'icu_collate%'
// AND len(examples) = 0

`.split('\n').filter(line => !line.trim().startsWith('//')).join('\n'))

// const getFunction = 
type IRow = {
    name: string
    params: string[]
    paramtypes: string[]
    ogtypes: string[]
    returntypes: string
    desc: string
    comment: string
    example: string
}
const rows = res.getRowObjectsJson() as IRow[]
console.table(rows.map(({ desc, example, comment, ...e }) => e))
// const oktypes = rows.filter(e => every([...e.paramtypes, e.returntypes], x => ['VARCHAR', 'NUMERIC'/*, 'BOOLEAN'*/].includes(x)))

const fixparamnames = (name: string) => {

    return name.replace('string', 'str').replace(/[\]\[\=\s].*$/, '')
}
const getNameGP = (rows: IRow[], strict = true) => {
    const nameGP = Object.groupBy(rows, e => e.name)
    return Object.entries(nameGP)/*.filter(e => e[1].length > 1)*/.map(([name, rows]) => {
        const largestParams = maxBy(rows, e => e.params.length)
        const paramsUnion = largestParams.params.map((name, i) => [fixparamnames(name), uniq(rows.map(z => z.paramtypes[i]).filter(e => e))])
        const requiredParams = largestParams.params.map((name, i) => every(rows.map(row => row.paramtypes[i]), e => e)).filter(e => e == true)
        const retTypeUnion = uniqBy(rows, z => z.returntypes)
        if (retTypeUnion.length > 1 && strict) {
            console.log(retTypeUnion)
            throw new Error('Multiple return types for the same function')
        }
        // console.log('-->', paramsUnion[0])
        // console.log('=>>', uniqBy(rows, z => z.returntypes))
        return {
            funcname: name,
            args: new Map(paramsUnion) as unknown as Map<string, string[]>,
            minArgs: requiredParams.length,
            // totalParams: largestParams.params.length,
            result: retTypeUnion[0].returntypes,
            description: maxBy(rows, row => row.desc?.length)?.desc,
            comment: maxBy(rows, row => row.desc?.length)?.comment,
            example: maxBy(rows, row => row.desc?.length)?.example,
            ogtypes: largestParams.ogtypes,
        }
    })
}
const rownameGP = getNameGP(rows.filter(e => every([...e.paramtypes, e.returntypes], x => ['VARCHAR', 'NUMERIC'/*, 'BOOLEAN'*/].includes(x))))
const allnameGP = getNameGP(rows, false)


// console.log(rownameGP)
// process.exit()
// const mapInterface = (x: 'VARCHAR' | 'NUMERIC', y: string) => {
//     if (x === 'VARCHAR') {
//         return { param:  `string | StringField`,  }
//     }
//     if (x === 'NUMERIC') {
//         return {params: `NumericField`}
//     }
// }

const exampleAsChain = (str: string) => str
    // ?.replace(/(.+)\(([^,]+)\)$/, '($2).$1()')
    ?.replace(/(.+)\(([^,]+),\s?(.+)/, '($2).$1($3')
const InterfaceMap = {
    VARCHAR: {
        param: `Stringable`,
        return: `StringField`,
        className: 'StringFieldImpl'
    },
    NUMERIC: {
        param: `Numericable`,
        return: `NumericField`,
        className: 'NumericFieldImpl'
    },
    WHATEVER: {
        param: `Whateverable`,
        return: `WhateverField`,
        className: 'WhateverFieldImpl'
    }
}
const globalInterfaces = []
const namedInterfaces = {
    NUMERIC: [],
    VARCHAR: [],
    WHATEVER: [],
}

const globalImplementations = []
const namedImplementations = {
    NUMERIC: [],
    VARCHAR: [],
    WHATEVER: [],
}

const getArgsKeys = row => {
    return row.args.keys().toArray().map((e, i) => (e || `p${i}`).replace('enum', 'enumeration')).map(camelCase)
}

const ogTyped = (row: IRow, index: number) => {
    // console.log(row, '===>', row?.ogtypes?.[index])
    return (row?.ogtypes[index] !== 'VARCHAR' ? `/*${row?.ogtypes[index]}*/` : '')
}
const getArgsFinal = (row: any) => {
    const args = row.args.entries().toArray()
    row.og_
    const argsKeys = getArgsKeys(row)
    const argsfinal = args.map(([key, types], argIndex) => {
        const isRequired = row.minArgs <= argIndex
        return argsKeys[argIndex] + (isRequired ? '?' : '') + ': ' + types.map(type => InterfaceMap[type]?.param).join(' | ')
    })
    return argsfinal
}

allnameGP.forEach((row) => {
    console.log(row.funcname, row.args)
    const argkeys = getArgsKeys(row)
    console.log({ argkeys })
    const argsfinal = getArgsFinal(row)
    const result = InterfaceMap[row.result as 'VARCHAR' | 'NUMERIC' | 'WHATEVER']
    // console.log({ argsfinal })
    const exampleHeader = `/** ${row.funcname}(${argkeys.map((k, i) => k + ': ' + row.ogtypes[i]).join(', ')}): ${row.result} - `.toUpperCase() +
        `${row.description || ''}, eg: ${row.example} */` + '\n'
    globalInterfaces.push(
        `${exampleHeader}     ${row.funcname}(${argsfinal?.join(', ')}): ${result.return}`
    )
    globalImplementations.push(
        `${exampleHeader} ${row.funcname} = (${argsfinal?.join(', ')}): ${result.return}  => ` +
        `new ${result.className}('').withOperation({ field: '', method: '${row.funcname}', args: [${argkeys.join(', ')}] });`
    )
})

rownameGP.forEach((row) => {
    // console.log(row.funcname, row.args)
    const argkeys = getArgsKeys(row)
    const argsfinal = getArgsFinal(row)
    const result = InterfaceMap[row.result as 'VARCHAR' | 'NUMERIC']
    row.args.values().next().value?.forEach(maintype => {
        // console.log({ maintype })
        const exampleHeaderChain = `/** ${row.description || ''}, eg: ${exampleAsChain(row.example)} */` + '\n'
        namedInterfaces[maintype].push(`${exampleHeaderChain}   ${row.funcname}(${argsfinal.slice(1)?.join(', ')}): ${result.return}`)
        namedImplementations[maintype].push(
            `${exampleHeaderChain}  ${row.funcname} = (${argsfinal.slice(1)?.join(', ')}) => ` +
            `new ${result.className}('').withOperation({ field: this.ops.field, method: '${row.funcname}', args: [${argkeys.slice(1).join(', ')}], chain: this.ops.method ? this.ops : undefined }) as  ${result.return};`
        )
    })

    // console.log(row)
    // console.log('-----------')
    // row.args[0].forEach(maintype => {
    //     const t = InterfaceMap[maintype]
    //     return t && console.log(`
    //     ${row.funcname}()
    //     `)
    // })

    // row.args.forEach((a, b) => {
    //     console.log({ a, b })
    // })
})
let filecontent = await Bun.file('./DuckdbTypes.ts').text()

const repsplit = (tag: string, str: string) => {
    const spl = filecontent.split(`/*${tag}*/`)
    if (spl.length < 3) {
        // throw new Error(`Error: ${tag} not found in the file`)
    }
    filecontent = [spl[0], str, spl[2]].join('\n')
    return filecontent
}
// console.log({ namedImplementations })
// console.log({ globalInterfaces,  })
repsplit('globalInterface', globalInterfaces.join('\n'))
repsplit('StringInterface', namedInterfaces['VARCHAR'].join('\n'))
repsplit('StringFieldImpl', namedImplementations['VARCHAR'].join('\n'))
repsplit('WhateverFieldImpl', namedImplementations['VARCHAR'].join('\n'))
repsplit('NumericInterface', namedInterfaces['NUMERIC'].join('\n'))
repsplit('NumericFieldImpl', namedImplementations['NUMERIC'].join('\n'))
repsplit('WhateverFieldImpl', namedImplementations['WHATEVER'].join('\n'))
repsplit('DuckDBFunctionsImpl', globalImplementations.join('\n'))
await Bun.file('./generated-typed.ts').write(filecontent)
await Bun.$`prettier --print-width=240 --write generated-typed.ts`
// process.exit()
// console.log('GLOBAL-INTERFACE')
// console.log(globalInterfaces.join('\n'))
// console.log('VARCHAR-INTERFACE')
// console.log(namedInterfaces['VARCHAR'].join('\n'))
// console.log('NUMERIC-INTERFACE')
// console.log(namedInterfaces['NUMERIC'].join('\n'))

// console.log('GLOBAL-IMPLEMENTATION')
// console.log(globalImplementations.join('\n'))
// console.log('VARCHAR-IMPLEMENTATION')
// console.log(namedImplementations['VARCHAR'].join('\n'))
// console.log('NUMERIC-IMPLEMENTATION')
// console.log(namedImplementations['NUMERIC'].join('\n'))

// process.exit()


// for (const x of oktypes) {
//     const params = x.params.map((name, i) => `${name}: ${InterfaceMap[x.paramtypes[i]]?.param}`).join(', ')
//     console.log(x)

//     const rtn = `
//      ${x.name}(${params}): ${InterfaceMap[x.returntypes]?.return} {
//             return new NumericFieldImpl('').withOperation({
//                 field: this.ops.field,
//                 method: '${x.name}',
//                 args: [${x.params.join(', ')}],
//                 chain: this.ops.method ? this.ops : undefined
//             });
//         }
//     `
//     console.log(rtn)
// }


// console.table(oktypes)
// console.log(rows.)

// const xtypes = countBy(rows.flatMap(x => [...x.paramtypes, x.returntypes]), e => e)
// console.log({ xtypes })
// const zz = Object.entries(xtypes).map(([x, count]) => {
//     // console.log({ x })
//     return [x, x.replace(/\b((U)?(BIG|HUGE|TINY|SMALL)?INT(EGER)?|DOUBLE|DECIMAL|FLOAT)\b/, 'NUMERIC'), count]
// })
// console.table(zz)
// console.table(rows.map(e => ({
//    ...e, 
//    paramtypes: e.paramtypes.map(x => x.replace(/DOUBLE|FLOAT|()/)) 
// })))
// console.log(rows.length)
// const grouped = Object.groupBy(rows, e => e.paramtypes[0])
// console.log(grouped)

// for (const row of res.getRowObjects()) {
//   console.log(row)
// }
// console.log(await res.get())
// for (const row of res.) {

// // console.log({ duckdb })
// // 