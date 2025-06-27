import { Buck, from, MemoryDB, read_csv, read_parquet } from '@buckdb/isomorphic'









MemoryDB.from(read_csv('s3://a1738/geonames-cities-150k.csv'))
.select(e => ({
    name: `${e.ASCIIName}: ${e.Elevation.round(2)} km`,

})).groupBy('ALL')






MemoryDB.from(read_csv('s3://a1738/geonames-cities-150k.csv'))
.select(e => ({
    title: `${e.ASCIIName} - ${e.Elevation.round(2)} km`,
}))
.groupBy('CountryCode')
















await MemoryDB.from('duckdb_functions()')
    .select((e, D) => [D.count(),D.min(e.function_name),D.avg(e.function_name.len())])
    
    .groupBy('function_type')

    .execute() satisfies Record<string, {
        function_count: number
        shortest_name: string
        avg_name_length: number
    }[]>




    



// await MemoryDB




// .from('duckdb_functions()')
//     .select((e, D) => ({
//         function_count: D.count(),
//         shortest_name: D.min(e.function_name),
//         avg_name_length: D.avg(e.function_name.len()),
//     }))
//     .groupBy('function_type')
//     .execute() satisfies Record<string, {
//         function_count: number
//         shortest_name: string
//         avg_name_length: number
//     }[]>













// const q =
//     from('duckdb_functions()').select((e, D) => ({
//         function_name: e.function_oid,
//         xx: e.function_oid + 12,
//     }))
//         // .keyBy(e => e.database_name)
//         // .groupBy('function_name')
//         // .groupBy(e => e.has_side_effects.Ilike('%whatever%'))
       
// const resp = await q.execute()

// //### 123 test abel

// // from('s3://a1738/files/macif.parquet')
// //     .select(e => ({ com: e.titleComiteo ?? e.city ?? '123' }))
// //     .union(
// //         from('data/people.parquet').select()
// //     )

// const f = MemoryDB.from('duckdb_functions()')

// MemoryDB.from('duckdb_functions()')
// .select((x, D) => [x.parameters.map(z => z)])

// MemoryDB.from('duckdb_functions()')
//     .select((e, D) => ({
//         // mm: e.parameters.array_transform(x => x.upper()),
//         zoi: D.list_reduce(e.parameters, (rtn, z) => rtn + ' ' + z, ''),
//         // oi: D.array_transform(e.parameters, z => z.upper()),
//         // xxx: e.parameter_types.list_transform(x => x.lower())
//     }))
//     // .where(z => z.comment.Ilike('%qd'))

// MemoryDB.from('duckdb_functions()')
//     .select((geo, D) => D.Varchar(geo.function_name + ' ' + 'dqs'))

// // .select((geo, D) => geo.function_oid ? geo.function_oid.round(2) : D.Integer(0))
// // .select((e, D) => [e.function_oid.round(2), !!e.description && !!e.comment ? e.description + ' ' + e.comment : D.Varchar('NOPZ')])
// // .execute()

// await MemoryDB.from('duckdb_functions()')
//     .select(({ description, examples, ...rest }) => ({
//         ...rest,
//         description: description ? description : 'xxx',
//     })).execute(); // Exclude a field

// await from('duckdb_settings()', 's')
//     .select((s, D) => ({
//         setting_name: s.name,
//         description_upper: D.upper(s.description),
//         value_type: s.input_type,
//         match: s.name.regexp_extract_all(/\d+/),
//         config_info: D.Varchar(`Setting: ${s.name} - Type: ${s.input_type}`), // Template literal example
//         example_struct: { name: s.name, value: D.Integer(123), nested: { flag: D.Boolean(true) } }, // Struct/Object
//         example_list: D.List([s.name, s.description, D.Varchar('literal')]), // List/Array
//         casted_name: s.name.as('Varchar', 50), // Simple Cast
//         // complex_cast: D.cast(s.name, 'Varchar', 50), // Complex Cast
//         conditional_desc: s.description !== null ? s.description : D.Varchar('No description'), // Ternary/CASE WHEN
//         numeric_example: D.abs(-5).add(D.sqrt(16)).multiply(2), // Arithmetic and Functions
//         regex_example: D.regexp_replace(s.name, /_/, '-'), // Regex function
//         json_literal: D.Json({ key: 'value', num: 1 }), // JSON Literal
//         date_literal: D.Date('2024-01-01'), // Date Literal
//     }))
//     .where(s => s.input_type.Like('%INTEGER%') || s.input_type.Like('%FLOAT%'))
//     .execute()

// // const resp = await from(read_json('s3://a1738/jj.jsonl', {auto_detect: true}))
// // .select(e =>  [e.cc])
// // .execute()

// const resp5 = await Buck('').from('s3://a1738/jj.jsonl')
//     .select(e => [e.cc, e.codeApe])
//     .execute()

// // const resp3 = await from(read_csv('s3://a1738/files/zipcodes.fr.csv', {
// //     auto_detect: true
// // }))
// // .select(e => [e.name, e.zipcodes])
// // .execute()
// // .select(e => e.cc)

// const xxxzx = await from('s3://a1738/testxs2.jsonl')
//     .select(e => e)
//     .execute()

// const oiiz = await from('s3://a1738/files/macif.parquet')
//     .select(e => ({ xx: e.benefits, zz: e.demo, ff: e.created }))
//     .execute()

// const xxxz = await from('s3://a1738/files/macif.parquet')
//     .select(e => ({ xx: e.benefits }))
//     .keyBy(e => e.city)
//     .execute()

// const xxxdz = await from('s3://a1738/files/macif.parquet')
//     .select(e => e.id)
//     .execute()
// // .then(x => x[0])
// // .then(e => e[0].

// // from('duckdb_functions()')
// // .select('function_name')
// // .groupBy('function_name')

// // from('duckdb_functions()')
// //     .select((e, D) => ({
// //         // tttt: e.parameter_types.apply(x => x + '__'),
// //         zzz: D.list_apply(e.parameter_types, x => x.levenshtein('--')),
// //         // uuu: [123, 31, 1].reduce((x, y) => x+y),
// //         // xx: [1, 2, 3].reduce((x, z) => x+z),
// //         // rrrr: e.parameter_types.reduce((a, b) => a+'::' +b, '')
// //     }))

// // Buck('', {
// //     s3_access_key_id: 'AKIAR6FAVD6WRREXAMPQ',
// //     s3_region: 'eu-west-3',
// //     s3_secret_access_key: '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',
// // })
// //     .from('duckdb_functions()')
// //     .select((e, D) => ({

// //         // trtr: e.
// //         id: e.function_name,
// //         xxx: D.Json({ lol: 'str', toto: [1, 2, 3] }),
// //         ss: D.Struct({
// //             vv: 'II', gg: 123, s: D.Struct({ values: [12, 41, 12] })
// //         })
// //     }))
// //     .where(e => e.function_name in ['read_json', 'read_json_auto'])

// // from(`s3://a1738/testxs2.jsonl`)
// //     .select()
// //     .groupBy('ALL')
// //     .execute()
// // // .then(e => e.map(z => z.))

// // // const con2 = Buck('s3://a1738/xakila.duckdb', {
// // //     s3_region: 'eu-west-3'
// // // })

// // // from('s3://a1738/files/20230823-communes-departement-region.csv')
// // // .select((p, D) => [p.code_postal,  {xx:p.latitude}])
// // // .execute()

// // // Buck('')

// // // from('s3://a1738/files/macif.parquet').select('')
// // // const toto = "gg1111xx"

// const con2 = Buck({
//     s3_access_key_id: 'GXSS9O33ILIPZ9YVSKE0',
//     s3_secret_access_key: 'Uqs1er2IXhzd9mcdnPKEzNzzaCy4f1EhEbX30ufE',
//     s3_endpoint: 's3.eu-west-2.wasabisys.com'
// })

// // // from('')

// const resp = await con2.from('Stations', 'ST').select(p => ({ pp p.code, xx: p.id, gg: p.geo_lat }))
//     .execute()

// await buckCon.from('duckdb_functions()')
//     .select(({ database_name, datab, ...fns }) => ({ ...fns, schema_name: 'xxxxxx' }))
//     // .where(e => e.function_name === 'len')
//     // .copyTo('s3://dallas/uu.csv', {
//     //     delim: '\\t',
//     // })
//     .execute()

// await buckCon.from('duckdb_functions()', 'ddf')
//     // .join('data/final.csv', e => e.final.pid === e.ddf.database_oid)
//     .select((e, D) => ({
//         xxzz: e.ddf.database_oid.ascii() + 'lol',
//         // ['zz']: e.parameters['abel'],
//         name: e.function_name,
//         xxx: D.Varchar("ab'el"),
//         zz: e.parameters,
//         // zz: D.List([{lol:'123'}, {lol:'yoyo'}])
//         uu: D.Json({ toot: 12 })
//     }))
//     .copyTo('s3://dallas/zzz.parquet')
//     //  .where(e => e.examples.len() > 0)
//     //  .orderBy()
//     //  .limit(10)

//     .execute()

// // qsdqsdqsdqsdqsdqsdqsdqsdqsdqsdqsdq

// await from('duckdb_settings()').select((p, D) => [p.name, p.description, D.SimilarTo(p.name, /.+ll.+/g) ? 'en' : 'ko'])

// await from('duckdb_functions()')
//     .select(e => ({
//         at: e.function_name.regexp_extract_all(/(e)/, 1),
//         ggg: e.database_name + 'lol',
//         ggx: `${e.database_name}lol${'123'}`,
//         xxz: e.database_name.len() + 12,
//         uuu: 12,
//         _: e.function_name
//     }))
//     // .where(e => e.database_name === 'lol' && e.xxz > 12 && e.function_oid.Between(12, 41))
//     // .where(e => 12 > 3 && e.uuu)
//     .execute()

// from('s3://dallas/zzz.parquet')

// await from<any>('https://m.abe.lc/public/opendata/geopop.csv', 'leo')
//     .select((p, D) => ({
//         l: D.SimilarTo(p.name, /12\d+/) ? p.lat.acosh() : D.Bigint(42),
//         lg: p.lng,
//         nm: p.name,
//         dd: D.Bigint(12)
//     }))
//     .where(e => e.name.Like('%nn%') && e.lat > 12 && e.name.SimilarTo(/cxxx/img) && e.name !== '123')
//     .where(e => e.lat.abs() > 12 && e.lng.abs() === 12 && e.lng.abs().subtract(421) > 12)
//     // .where((e, D) => e.lat.as('Bigint') ===  D.cast(e.lng.abs(), 'Bigint'))
//     // .where(e => !e.leo.pop.isfinite())
//     .execute()

// const thresholdOid = 16000; // Example context variable
// const excludePattern = '%internal%'; // Example context variable
// const allowedSchemas = ['main', 'pg_catalog', 'information_schema']; // Example context variable
// const minParams = 1;

// await from('duckdb_functions()', 'f')
//     .context({ thresholdOid: 16000, excludePattern: '%intern%', allowedSchemas: ['main', 'pg_catalog', 'information_schema'], minParams: 1, }) // Pass external variables
//     .select(f => ({
//         name: f.function_name,
//         params: f.parameters,
//         return: f.return_type,
//         schema: f.schema_name
//     }))
//     .where((f, D) =>
//         f.schema_name.In(allowedSchemas) && // IN operator with context array
//         (D.Array(f.parameters).len() >= minParams || f.return_type === 'BOOLEAN') && // Logical OR, >=, context number
//         !f.function_name.Like(excludePattern) && // NOT LIKE with context string
//         // D(1, 12, 41) &&
//         f.description !== null && // IS NOT NULL
//         f.function_oid > D.Bigint(thresholdOid) && // Greater than with context number + explicit type
//         f.function_name.SimilarTo(/^[a-z_]+$/i) && // SimilarTo with Regex (case-insensitive flag)
//         !f.return_type.In(['UNKNOWN', 'INVALID']) && // NOT IN
//         f.function_type === 'immutable' && // Equality check
//         f.function_oid.Between(10000, 20000) // BETWEEN operator
//     )
//     .or('21>12')
//     // .orderBy(f => f.function_name) // Simple ORDER BY
//     .limit(10)
//     .execute();
