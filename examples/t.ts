// import { Buck, from } from '@workspace/tsconfig.json'
import { MemoryDB } from '@buckdb/isomorphic'
import { json_serialize_sql } from '../fn'
import { generateInterface } from '../src/interface-generator'
import { unnest, duckdb_secrets, pragma_metadata_info, pragma_show, pragma_storage_info, pragma_table_info, check_peg_parser, checkpoint, force_checkpoint, generate_series, glob, json_each, json_execute_serialized_sql, json_tree, parquet_bloom_probe, parquet_file_metadata, parquet_kv_metadata, parquet_metadata, parquet_schema, range, sql_auto_complete, test_all_types, which_secret, load_aws_credentials, rtree_index_dump, shapefile_meta, sqlite_attach, ST_GeneratePoints, pragma_user_agent, duckdb_indexes }
    from '../tf'

const paramfuncs = ['pragma_storage_info', 'pragma_table_info', 'pragma_show', 'check_peg_parser', 'checkpoint', 'force_checkpoint', 'generate_series', 'glob', 'json_each', 'json_execute_serialized_sql', 'json_tree', 'parquet_bloom_probe', 'parquet_file_metadata', 'parquet_kv_metadata', 'parquet_metadata', 'parquet_schema', 'range', 'sql_auto_complete', 'test_all_types', 'which_secret', 'load_aws_credentials', 'rtree_index_dump', 'shapefile_meta', 'sqlite_attach',]

const TableFuncs = `duckdb_columns
duckdb_constraints
duckdb_databases
duckdb_dependencies
duckdb_extensions
duckdb_external_file_cache
duckdb_functions
duckdb_indexes
duckdb_keywords
duckdb_log_contexts
duckdb_logs
duckdb_memory
duckdb_optimizers
duckdb_prepared_statements
duckdb_schemas
duckdb_secret_types
duckdb_secrets
duckdb_sequences
duckdb_settings
duckdb_tables
duckdb_temporary_files
duckdb_types
duckdb_variables
duckdb_views
pragma_collations
pragma_database_size
pragma_metadata_info
pragma_platform
pragma_rtree_index_info
pragma_user_agent
pragma_version
check_peg_parser
checkpoint
force_checkpoint
generate_series
glob
icu_calendar_names
json_each
json_execute_serialized_sql
json_tree
parquet_bloom_probe
parquet_file_metadata
parquet_kv_metadata
parquet_metadata
parquet_schema
pg_timezone_names
range
sql_auto_complete
test_all_types
which_secret
load_aws_credentials
register_geoarrow_extensions
rtree_index_dump
shapefile_meta
sqlite_attach
ST_Drivers`
    .split('\n').filter(e => !paramfuncs.includes(e))
const pr = `

`.split('\n').filter(Boolean)
// await MemoryDB.from(test_all_types()).show({js:true})
// const r2 = parquet_metadata('data/demo.parquet')
// console.log(generateInterface({ '': { '': null } }))
// const xxr = await MemoryDB.from('r2').returnType
// .select().show()

// console.log({ r2 })
// const r1 = `pragma_table_info("sqlite_master")` as 'pragma_table_info("sqlite_master")'
// const rrrrrr = await MemoryDB.from('duckdb_typesess()').show()
// .select('sqd')
// .show({ table: false })
// const unnest = unnest(['from sqlite_master'])
// await MemoryDB.from().show()

MemoryDB.loadExtensions('h3', 'aws', 'azure', 'delta', 'excel', 'fts', 'httpfs', 'iceberg', 'inet', 'spatial', 'sqlite_scanner', 'ui')
await MemoryDB.create('tbl').as(
    [
        {
            id: 1,
            name: 'John Doe',
            age: 30,
        }
    ]
).execute()
const resp = await MemoryDB.run(`
INSTALL spatial;
LOAD spatial;

-- Create a table with 10_000_000 random points
CREATE TABLE t1 AS SELECT point::GEOMETRY AS geom
FROM st_generatepoints(
        {min_x: 0, min_y: 0, max_x: 10_000, max_y: 10_000}::BOX_2D,
        100,
        14
    );

-- Create an index on the table
CREATE INDEX my_idx ON t1 USING RTREE (geom);

-- Perform a query with a "spatial predicate" on the indexed geometry
-- column. Note how the second argument in this case,
-- the ST_MakeEnvelope call is a "constant"
SELECT count(*)
FROM t1
WHERE ST_Within(geom, ST_MakeEnvelope(450, 450, 650, 650));
`) as DuckDBMaterializedResult
await MemoryDB.from(duckdb_indexes()).show()
// const resp2 = await MemoryDB.run(`CREATE INDEX idx_tbl_table ON tbl(name)`) as DuckDBMaterializedResult
// console.log(await resp2.getRowObjectsJson())

async function main() {
    // await MemoryDB.run(`CREATE INDEX idx_tbl_table ON tbl(name)`)
    await MemoryDB.from(pragma_storage_info('tbl')).execute()
    await MemoryDB.from(pragma_table_info('tbl')).execute()
    await MemoryDB.from(pragma_show('tbl')).execute()

    await MemoryDB.from(check_peg_parser('')).execute()
    await MemoryDB.from(checkpoint()).execute()
    await MemoryDB.from(force_checkpoint()).execute()
    await MemoryDB.from(generate_series(1, 3, 1)).execute()
    await MemoryDB.from(glob('*')).execute()
    await MemoryDB.from(json_each('[]')).execute()
    // await MemoryDB.from(json_execute_serialized_sql(json_serialize_sql('SELECT 1 + 2'))).execute()
    await MemoryDB.from(json_tree('{}')).execute()
    await MemoryDB.from(parquet_bloom_probe('data/people.parquet', 'age', 1)).execute()
    await MemoryDB.from(parquet_file_metadata('data/people.parquet')).execute()
    await MemoryDB.from(parquet_kv_metadata('data/people.parquet')).execute()
    await MemoryDB.from(parquet_metadata('data/people.parquet')).execute()
    await MemoryDB.from(parquet_schema('data/people.parquet')).execute()
    await MemoryDB.from(range(1, 2, 1)).execute()
    await MemoryDB.from(sql_auto_complete('SEL')).execute()
    await MemoryDB.from(test_all_types()).execute()
    await MemoryDB.from(which_secret('t', 'n')).execute()
    await MemoryDB.from(load_aws_credentials('c')).execute()
    await MemoryDB.from(rtree_index_dump('my_idx')).execute()
    await MemoryDB.from(shapefile_meta('s.shp')).execute()
    await MemoryDB.from(sqlite_attach('data/chinook.db')).execute()
    await MemoryDB.from(ST_GeneratePoints([0, 0, 10_000, 10_000], 10, 10))
    for (const tf of TableFuncs) {
        console.log('------tf')
        await MemoryDB.from(`${tf}()`).show({ js: true })
    }
}
main()

// ST_GeneratePoints({ min_x: 0, min_y: 0, max_x: 10, max_y: 10 }:: BOX_2D, 5, 42)

// for await (const x of pr) {
//     const zzz = await MemoryDB.from(x).execute()
//     console.log({ zzz })
//     // console.log({ x })
// }

// console.log({  })
// for await (const x of r) {
//     // from()
//     console.log({ x })
// }

// MemoryDB.from(read_parquet('../data/people.parquet'), 'people')
// .select('age')

// const rrr = glob('file:/me/dev/*')
// from(rrr)
// .select()

// const SC = Buck('/me/dev/buckdb/data/european_soccer_database.sqlite')
// Buck('').from('duckdb_functions()').select(e => ({ xx: e }))

// const rrr = glob('lol')



// SC.from('Player').select(e => ({
//     xxx: e.height`Double`,
// }))






// const resp = await from('duckdb_functions()')
//     .select(e => `__${e.function_name}_${e.return_type}__`)
//     .where(e => !!e.function_name && !!e.return_type)
//     .limit(3)
//     .dump()
//     .execute()
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
