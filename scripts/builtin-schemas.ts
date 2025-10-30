import { Buck } from '@buckdb/node'
import { pragma_show, pragma_storage_info, pragma_table_info, check_peg_parser, checkpoint, force_checkpoint, generate_series, glob, json_each, json_tree, parquet_bloom_probe, parquet_file_metadata, parquet_kv_metadata, parquet_metadata, parquet_schema, range, sql_auto_complete, test_all_types, which_secret, load_aws_credentials, rtree_index_dump, shapefile_meta, sqlite_attach, ST_GeneratePoints, duckdb_indexes }
    from '../tf'
import { DuckDBMaterializedResult } from '@duckdb/node-api'

const TestDB = Buck('test')
const paramfuncs = ['pragma_storage_info', 'pragma_table_info', 'pragma_show', 'check_peg_parser', 'checkpoint', 'force_checkpoint', 'generate_series', 'glob', 'json_each', 'json_execute_serialized_sql', 'json_tree', 'parquet_bloom_probe', 'parquet_file_metadata', 'parquet_kv_metadata', 'parquet_metadata', 'parquet_schema', 'range', 'sql_auto_complete', 'test_all_types', 'which_secret', 'load_aws_credentials', 'rtree_index_dump', 'shapefile_meta', 'sqlite_attach',]

const TableFuncs = [
    'duckdb_columns',
    'duckdb_constraints',
    'duckdb_databases',
    'duckdb_dependencies',
    'duckdb_extensions',
    'duckdb_external_file_cache',
    'duckdb_functions',
    'duckdb_indexes',
    'duckdb_keywords',
    'duckdb_log_contexts',
    'duckdb_logs',
    'duckdb_memory',
    'duckdb_optimizers',
    'duckdb_prepared_statements',
    'duckdb_schemas',
    'duckdb_secret_types',
    'duckdb_secrets',
    'duckdb_sequences',
    'duckdb_settings',
    'duckdb_tables',
    'duckdb_temporary_files',
    'duckdb_types',
    'duckdb_variables',
    'duckdb_views',
    'pragma_collations',
    'pragma_database_size',
    'pragma_metadata_info',
    'pragma_platform',
    'pragma_rtree_index_info',
    'pragma_user_agent',
    'pragma_version',
    'check_peg_parser',
    'checkpoint',
    'force_checkpoint',
    'generate_series',
    'glob',
    'icu_calendar_names',
    'json_each',
    'json_execute_serialized_sql',
    'json_tree',
    'parquet_bloom_probe',
    'parquet_file_metadata',
    'parquet_kv_metadata',
    'parquet_metadata',
    'parquet_schema',
    'pg_timezone_names',
    'range',
    'sql_auto_complete',
    'test_all_types',
    'which_secret',
    'load_aws_credentials',
    'register_geoarrow_extensions',
    'rtree_index_dump',
    'shapefile_meta',
    'sqlite_attach',
    'ST_Drivers'
].filter(e => !paramfuncs.includes(e))


TestDB.loadExtensions('h3', 'aws', 'azure', 'delta', 'excel', 'fts', 'httpfs', 'iceberg', 'inet', 'spatial', 'sqlite_scanner', 'ui')
await TestDB.create('tbl').as(
    [
        {
            id: 1,
            name: 'John Doe',
            age: 30,
        }
    ]
).execute()
const resp = await TestDB.run(`
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
await TestDB.from(duckdb_indexes()).show()
async function main() {
    // await MemoryDB.run(`CREATE INDEX idx_tbl_table ON tbl(name)`)
    await TestDB.from(pragma_storage_info('tbl')).execute()
    await TestDB.from(pragma_table_info('tbl')).execute()
    await TestDB.from(pragma_show('tbl')).execute()

    await TestDB.from(check_peg_parser('')).execute()
    await TestDB.from(checkpoint()).execute()
    await TestDB.from(force_checkpoint()).execute()
    await TestDB.from(generate_series(1, 3, 1)).execute()
    await TestDB.from(glob('*')).execute()
    await TestDB.from(json_each('[]')).execute()
    // await MemoryDB.from(json_execute_serialized_sql(json_serialize_sql('SELECT 1 + 2'))).execute()
    await TestDB.from(json_tree('{}')).execute()
    await TestDB.from(parquet_bloom_probe('data/people.parquet', 'age', 1)).execute()
    await TestDB.from(parquet_file_metadata('data/people.parquet')).execute()
    await TestDB.from(parquet_kv_metadata('data/people.parquet')).execute()
    await TestDB.from(parquet_metadata('data/people.parquet')).execute()
    await TestDB.from(parquet_schema('data/people.parquet')).execute()
    await TestDB.from(range(1, 2, 1)).execute()
    await TestDB.from(sql_auto_complete('SEL')).execute()
    await TestDB.from(test_all_types()).execute()
    await TestDB.from(which_secret('t', 'n')).execute()
    await TestDB.from(load_aws_credentials('c')).execute()
    await TestDB.from(rtree_index_dump('my_idx')).execute()
    await TestDB.from(shapefile_meta('s.shp')).execute()
    await TestDB.from(sqlite_attach('data/chinook.db')).execute()
    await TestDB.from(ST_GeneratePoints([0, 0, 10_000, 10_000], 10, 10))
    for (const tf of TableFuncs) {
        console.log('------tf')
        await TestDB.from(`${tf}()`).show()
    }
}
