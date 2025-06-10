import { Buck, from, MemoryDB } from "@buckdb/isomorphic";
import { read_parquet } from '@buckdb/io'


const db = 
Buck('s3://a1738/sakila.duckdb')


const resp = 
await db.from(read_parquet('s3://a1738/files/macif.parquet')).show()


db.from('Actor')
.join('Film_actor').using('actor_id')
.join('Film_category').on(e => e.Actor.actor_id === e.Film_actor.actor_id)
.select('category_id', 'Actor.first_name')


// from('s3://us-prd-motherduck-open-datasets/misc/csv/popular_currency_rate_dollar.csv')


// db.loadExtensions('fts').from(duckdb_functions()).where(e => e.function_name.starts_with('fts'))



// DuckDBInstance
// import { Buck } from './buckdb'

// const db = await DuckDBInstance.create('local.duckdb', { access_mode: 'READ_ONLY' })
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
