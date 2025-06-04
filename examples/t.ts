import { version } from './.buck/types'
import { Buck, from } from './buckdb'
const v = version

const resp = await from('duckdb_functions()')
    .select(e => `__${e.function_name}_${e.return_type}__`)
    .where(e => !!e.function_name && !!e.return_type)
    .limit(3)
    .dump()
    .execute()
// console.log({ resp })

// const r = await from('s3://a1738/testxs2.jsonl')
//     .select((e, D) => [e.id, e.ss.gg, e.testxs2.xxx.lol])
//     .execute()

// // const buckCon = Buck({
// //     s3_access_key_id: 'GXSS9O33ILIPZ9YVSKE0',
// //     s3_secret_access_key: 'Uqs1er2IXhzd9mcdnPKEzNzzaCy4f1EhEbX30ufE',
// //     s3_endpoint: 's3.eu-west-2.wasabisys.com',
// // })

// // const resp = await buckCon
// // .from('s3://maldon/boldair.parquet')
// //     .execute()
// // console.log({ resp })

// // const resp = await Buck('').describe('duckdb_settings()')
// // const resp = await from('s3://a1738/testxs2.jsonl')
// //     .select((e) => ({  xxx: e.xxx.json_pretty() }))
// //     .execute()""
// // console.log({ resp })
// from('data/people.parquet')
//     .select(e => ({ xxx: e.name }))
//     .execute()
// from('data/people.parquet')
//     .select(e => ({ xxx: e.name }))
//     .execute()

// // const resp = await Buck('s3://duckdb-blobs/databases/stations.duckdb').from('Stations').select().execute()

// // console.log({ resp })

// // console.log(JSON.stringify(resp42))
// // console.log(JSON.stringify(resp42.schema, null, 2))
// // const zcon = Buck('lol')
// // // console.log({ buckCon })
// // // const schema = await buckCon.fetchSchema('s3://dallas/turf.fr.parquet')

// // // const resp = await buckCon.ddb.upsertSchema('s3://dallas/turf.fr.parquet', schema)
// // const rrr = await buckCon.from('s3://dallas/turf.fr.parquet')
// //     .select(e => ({ dxx: e.adresse }))
// //     .execute()
// // console.log({ rrr })
// // // const tablejson = await Bun.file('./.buck/table.json').json()
// // // console.log({ schema, tablejson })
// // // .select().execute()
// // // .attach('s3://bucket-name/file.duckdb', 'xfile')
