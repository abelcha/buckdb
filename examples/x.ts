import { DuckDBInstance } from '@duckdb/node-api'
// DuckDBInstance
// import { Buck } from './buckdb'

const db = await DuckDBInstance.create('local.duckdb', { access_mode: 'READ_ONLY' })
// const con = await db.connect()

// const resp = await con.runAndReadAll(`select * FROM vjson `)
// console.log(resp.result.columnTypes())
// console.log(resp.getRows())

// const db = Buck('local.duckdb')
//     .loadExtensions('spatial')
// const resp2 = await db.from('vjson').execute()
// console.log({ resp2 })




// const BS = Buck('s3://a1738')
// // const rr = await BS.from('files/macif.parquet').ensureSchemas()
// // console.log({rr})
// const r = 
// await BS.from('jj.jsonl')
// .select(x => x.cc)
// .execute()
// console.log({r})
// .select(e => [e.contractEnd])
// .exec()
    // .select(e => e)
    
// const resp = await BS.describe('files/zipcodes.fr.csv')
// const resp = await BS.from('files/zipcodes.fr.csv')
//     .select(e => e)
//     .exec()
// console.log({ resp })

// const resp = await db.from('duckdb_functions()')
//     .select(({ tags, function_name, function_oid, examples, ...e }) => ({
//         xxx: { uu: { zz: e.parameters.array_transform(x => ({ type: x })) } }, function_name, tags, function_oid, examples
//     }))
//     .where((e, D) => e.tags.contains('category'))
//     .limit(3)
//     .execute()


// console.log(resp)
// console.log(resp[0].tags)

// console.log('---------------')
// console.log(resp.result.columnTypes())
// console.log('---------------')

// console.log(resp.result);
