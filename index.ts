// const { default: commands } = await import('./commands/**/*.ts');
// // await import('buckdb?toot=41')
// console.log(commands);
import { DuckDBInstance, DOUBLE, VARCHAR } from '@duckdb/node-api';
// console.log({DOUBLE, VARCHAR})
const instance = await DuckDBInstance.create();
const connection = await instance.connect();
const res = await connection.runAndReadAll(`SELECT 
database_name || '/' || schema_name ||   '/' || function_oid     AS id,
function_name     AS name,
parameters        AS params,
list_transform(parameter_types, x -> replace(x, ' WITH TIME ZONE', '_TZ'))       AS paramtypes,
return_type       AS returntypes,
varargs           AS varargs,
left(description, 30)       AS desc,
tags              AS tags,
left(comment, 10)           AS comment,
examples[1]          AS ex

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

const rows = res.getRowObjectsJson()
// console.table(rows)
// console.log(rows.length)
const grouped = Object.groupBy(rows, e => e.paramtypes[0])
console.log(grouped)

// for (const row of res.getRowObjects()) {
//   console.log(row)
// }
// console.log(await res.get())
// for (const row of res.) {

// // console.log({ duckdb })
// // 