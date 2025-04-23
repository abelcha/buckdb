import { DuckDBInstance } from '@duckdb/node-api';
import { formatSource, mapTypes } from './utils';

const defcon = await DuckDBInstance.create().then(e => e.connect())

const upsertJSON = async (id: string, sub: string, data: Record<string, Record<string, string>>) => {
    const file = Bun.file(`./.buck/${id}.json`)
    let content = !(await file.exists()) ? {} : await file.json()
    console.log({ content })
    content[sub] = Object.assign(content[sub] || {}, data)
    await file.write(JSON.stringify(content, null, 2))

}
const getFields = async (origin: string, connection = defcon) => {
    const res = await connection.runAndReadAll(`SUMMARIZE SELECT * FROM ${formatSource(origin)}`);

    let schema = res.getRowObjectsJson().map((row: any) => [row.column_name, mapTypes(row.column_type)])
    return Object.fromEntries(schema)
}
const formatk = (key: string) => {
    return `['${cutquotes(key).replaceAll("'", '\\\'')}']`
}

export const tots = async (path: string) => {
    const content = await Bun.file(path).json() as Record<string, Record<string, string>>
    const out = [
        'export const dataSchemas = {',
    ]
    for (const [key, value] of Object.entries(content)) {
        out.push(formatk(key) + ': {')
        Object.entries(value).map(([k0, v0]) => {
            out.push(`\t${formatk(k0)}: {\n${Object.entries(v0,).map(([k, v]) => `\t\t${k}: '${v}'`).join(',\n')}\n\t} as const,`)
        })
        out.push('\t} as const,')
    }
    const final = (out.concat('\n}').join('\n'))
    const pah = path.replace('.json', '.ts')
    await Bun.file(pah).write(final)
}


const formatK = (e: string) => {
    return `['${cutquotes(e).replaceAll("'", '\\\'')}']`
}

const renderFields = (fields: Record<string, string>) => {
    return Object.entries(fields).map(([k, v]) => {
        // const type = mapTypes(v)
        return `\t\t${formatK(k)}: t.${v}Field,`
    }).join('\n')
}

const renderTables = (tables: Record<string, Record<string, string>>) => {
    return Object.entries(tables).map(([k, v]) => {
        // const type = mapTypes(v)
        return `\t${formatK(k)}: {
${renderFields(v)}
        };\n`
    }).join('\n')
}

export const tots2 = async (path: string) => {
    const content = await Bun.file(path).json() as Record<string, Record<string, string>>
    const out = `
    import * as  t from './types.ts'
    export interface Models {
        ${Object.entries(content).map(([dbname, tables]) => (`
        ${formatK(dbname)}: {
           ${renderTables(tables)}
        }`
    ))}
    }
`

    // const final = (out.concat('\n}').join('\n'))
    
    const p = path.replace('.json', '2.ts')
    await Bun.file(p).write(out)
    await Bun.$`dprint fmt ${p}`
}

export const cutquotes = (str) => {
    return str?.[0] === "'" && str?.[str.length - 1] == "'" ? str.slice(1, -1) : str
}

export const fetchSchemaRuntime = async (origin: string, connection = defcon) => {
    const fields = await getFields(origin, connection)
    await upsertJSON('table', '', { [origin]: fields })
    await tots('.buck/table.json')
    await tots2('.buck/table.json')
}

export const fetchRessourceRuntime = async (origin: string, alias: string) => {
    const con = await DuckDBInstance.create(origin).then(e => e.connect())
    const resp = await con.runAndReadAll(`FROM duckdb_tables()`)//.then(e => e.getRowObjectsJson())
    const og = {}
    for await (const row of resp.getRowObjectsJson()) {
        og[row.table_name] = await getFields(row.table_name, con)
    }
    await upsertJSON('table', origin, og)
    // await sleep(500)
    await tots('.buck/table.json')
    // await tots2('.buck/table.json')

}

if (import.meta.main) {
    const [origin] = process.argv.slice(2)
    // const origin = args._[0] || 'duckdb_functions()';
    if (origin?.endsWith('.duckdb')) {
        await fetchRessourceRuntime(origin)
    } else {
        await fetchSchemaRuntime(origin)
    }
}