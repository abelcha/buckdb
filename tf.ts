import { __serialize } from './src/serializer'
type RetCon<T extends string> = `${T}()`
// type RetCon1<S extends string, F = null> = F extends null ? `${S}()` : `${S}${SerializeValue<)`
// type RetCon<S extends string, F1, F2> = `${S}(${SerializeValue<F1>},${SerializeValue<F2>})`
// type RetCon<S extends string, F1, F2, F3> = `${S}(${SerializeValue<F1>},${SerializeValue<)`

export interface TFMetadata {
    /** @description Provides metadata about columns in the DuckDB instance including database name, schema, table info, column properties, and data type details */
    duckdb_columns(): RetCon<'duckdb_columns'>;
    /** @description Provides metadata about constraints (CHECK, FOREIGN KEY, PRIMARY KEY, NOT NULL, UNIQUE) in the DuckDB instance */
    duckdb_constraints(): RetCon<'duckdb_constraints'>;
    /** @description Lists accessible databases including attached databases, with details like path, type, and readonly status */
    duckdb_databases(): RetCon<'duckdb_databases'>;
    /** @description Provides metadata about dependencies between database objects */
    duckdb_dependencies(): RetCon<'duckdb_dependencies'>;
    /** @description Provides metadata about available extensions including load status, version, and installation details */
    duckdb_extensions(): RetCon<'duckdb_extensions'>;
    /** @description Provides metadata about external file cache */
    duckdb_external_file_cache(): RetCon<'duckdb_external_file_cache'>;
    /** @description Provides metadata about functions including type, parameters, return type, and macro definitions */
    duckdb_functions(): RetCon<'duckdb_functions'>;
    /** @description Provides metadata about secondary indexes including uniqueness constraints and SQL definitions */
    duckdb_indexes(): RetCon<'duckdb_indexes'>;
    /** @description Provides metadata about DuckDB's keywords and reserved words */
    duckdb_keywords(): RetCon<'duckdb_keywords'>;
    /** @description Provides information on the contexts of DuckDB log entries */
    duckdb_log_contexts(): RetCon<'duckdb_log_contexts'>;
    /** @description Returns a table of DuckDB log entries with timestamps, levels, and messages */
    duckdb_logs(): RetCon<'duckdb_logs'>;
    /** @description Provides metadata about DuckDB's buffer manager memory usage */
    duckdb_memory(): RetCon<'duckdb_memory'>;
    /** @description Provides metadata about available optimization rules that can be selectively disabled */
    duckdb_optimizers(): RetCon<'duckdb_optimizers'>;
    /** @description Provides metadata about prepared statements in the current session */
    duckdb_prepared_statements(): RetCon<'duckdb_prepared_statements'>;
    /** @description Provides metadata about database schemas including internal status and properties */
    duckdb_schemas(): RetCon<'duckdb_schemas'>;
    /** @description Lists secret types supported in the current DuckDB session */
    duckdb_secret_types(): RetCon<'duckdb_secret_types'>;
    /** @description Provides metadata about available secrets with optional redaction of sensitive information @description @param redact Whether to redact sensitive information in the output */
    duckdb_secrets(): RetCon<'duckdb_secrets'>;
    /** @description Provides metadata about sequences including range, cycle, and current value details */
    duckdb_sequences(): RetCon<'duckdb_sequences'>;
    /** @description Provides metadata about available settings including current values and descriptions */
    duckdb_settings(): RetCon<'duckdb_settings'>;
    /** @description Provides a sample of table data @description @param col0 The table name to sample from */
    duckdb_table_sample<T extends string>(col0: T): RetCon<'duckdb_table_sample'>;
    /** @description Provides metadata about base tables including column count, constraints, and SQL definitions */
    duckdb_tables(): RetCon<'duckdb_tables'>;
    /** @description Provides metadata about temporary files written to disk by DuckDB */
    duckdb_temporary_files(): RetCon<'duckdb_temporary_files'>;
    /** @description Provides metadata about available data types including aliases, categories, and properties */
    duckdb_types(): RetCon<'duckdb_types'>;
    /** @description Provides metadata about variables in the current session */
    duckdb_variables(): RetCon<'duckdb_variables'>;
    /** @description Provides metadata about views including column count and SQL definitions */
    duckdb_views(): RetCon<'duckdb_views'>;
}

export interface TFPragma {
    /** Collations are used to define the sort order of strings. */
    pragma_collations(): RetCon<'pragma_collations'>;
    /** Provides the current database size in bytes. */
    pragma_database_size(): RetCon<'pragma_database_size'>;
    /** Provides metadata information. */
    pragma_metadata_info(col0?: string): RetCon<'pragma_metadata_info'>;
    /** Provides platform information via PRAGMA. */
    pragma_platform(): RetCon<'pragma_platform'>;
    /** Provides R-tree index metadata via PRAGMA. */
    pragma_rtree_index_info(): RetCon<'pragma_rtree_index_info'>;
    /** Shows a PRAGMA setting or value. */
    pragma_show(col0: string): RetCon<'pragma_show'>;
    /** Provides storage metadata for a table via PRAGMA. */
    pragma_storage_info(col0: string): RetCon<'pragma_storage_info'>;
    /** Provides information about table columns via PRAGMA. */
    pragma_table_info(col0: string): RetCon<'pragma_table_info'>;
    /** Returns the user agent string of the DuckDB build. */
    pragma_user_agent(): RetCon<'pragma_user_agent'>;
    /** Returns the version of the DuckDB engine. */
    pragma_version(): RetCon<'pragma_version'>;
}
export interface TFBase {
    /** @description Scans an Apache Arrow stream (dumb interface) and creates a temporary view. @description @param pointer1 Connection on which to execute the scan @description @param pointer2 Name of the temporary view to create @description @param pointer3 Arrow stream pointer wrapper */
    arrow_scan_dumb<T1, T2, T3>(pointer1: T1, pointer2: T2, pointer3: T3): RetCon<'arrow_scan_dumb'>;
    /** @description Checks a regex-based SQL parser pattern for validity. @description @param pattern Parser pattern to check */
    check_peg_parser(pattern: string): RetCon<'check_peg_parser'>;
    /** @description Creates a checkpoint file at the specified path. @description @param path Optional path to save checkpoint */
    checkpoint(path?: string): RetCon<'checkpoint'>;
    /** @description Forces creation of a checkpoint, even if unnecessary. @description @param path Optional path to save checkpoint */
    force_checkpoint(path?: string): RetCon<'force_checkpoint'>;
    /** @description Generates a series of values between start and end with an optional step increment. @description @param start Start of series @description @param end End of series @description @param step Step increment */
    generate_series(start: number, end?: number, step?: number): RetCon<'generate_series'>;
    /** @description Finds files matching a glob pattern. @description @param pattern File pattern to match */
    glob(pattern: string): RetCon<'glob'>;
    /** @description Returns list of ICU calendar names for localization. */
    icu_calendar_names(): RetCon<'icu_calendar_names'>;
    /** @description Expands each element in a JSON value into separate rows. @description @param json JSON value or string @description @param path Optional JSON path expression */
    json_each(json: string | object, path?: string): RetCon<'json_each'>;
    /** @description Executes a serialized SQL command represented in JSON. @description @param sql Serialized SQL JSON object */
    json_execute_serialized_sql(sql: object): RetCon<'json_execute_serialized_sql'>;
    /** @description Produces a tree representation of a JSON structure as rows. @description @param json JSON value or string @description @param path Optional JSON path expression */
    json_tree(json: string | object, path?: string): RetCon<'json_tree'>;
    /** @description Probes Parquet file bloom filters for presence of a value. @description @param files File paths or patterns @description @param column Column to probe @description @param value Value to check */
    parquet_bloom_probe(files: string, column: string, value: any): RetCon<'parquet_bloom_probe'>;
    /** @description Retrieves metadata information for Parquet files. @description @param files File paths or patterns */
    parquet_file_metadata(files: string): RetCon<'parquet_file_metadata'>;
    /** @description Retrieves key-value metadata for Parquet files. @description @param files File paths or patterns */
    parquet_kv_metadata(files: string): RetCon<'parquet_kv_metadata'>;
    /** @description Retrieves block and schema metadata for Parquet files. @description @param files File paths or patterns */
    parquet_metadata(files: string): RetCon<'parquet_metadata'>;
    /** @description Reads Parquet file schema definitions. @description @param files File paths or patterns */
    parquet_schema(files: string): RetCon<'parquet_schema'>;
    /** @description Returns list of PostgreSQL timezone names supported. */
    pg_timezone_names(): RetCon<'pg_timezone_names'>;
    /** @description Executes a SQL query and returns a result set. @description @param sql SQL query string */
    query<T>(sql: string): RetCon<'query'>;
    /** @description Executes a table-valued SQL query. @description @param tables Table identifiers or expressions @description @param validate Optional validation flag */
    query_table<T>(tables: string, validate?: boolean): RetCon<'query_table'>;
    /** @description Generates a half-open range of values from start to end with an optional step. @description @param start Start of range @description @param end End of range @description @param step Step increment */
    range(start: number, end?: number, step?: number): RetCon<'range'>;
    /** @description Repeats a single value into a column for a specified count. @description @param value Value to repeat @description @param count Number of repetitions */
    repeat<T>(value: T, count: number): RetCon<'repeat'>;
    /** @description Repeats a row of values numRows times. @description @param numRows Number of rows to generate */
    repeat_row<T extends any[]>(numRows: number, ...values: T): RetCon<'repeat_row'>;
    /** @description Provides SQL auto-completion suggestions for a partial query. @description @param sql Partial SQL string */
    sql_auto_complete(sql: string): RetCon<'sql_auto_complete'>;
    /** @description Computes summary statistics for the specified table. @description @param table Table identifier or expression */
    summary<T>(table: T): RetCon<'summary'>;
    /** @description Generates a dataset covering all data types for testing. @description @param useLargeEnum Whether to include large enum types */
    test_all_types(useLargeEnum?: boolean): RetCon<'test_all_types'>;
    /** @description Tests vectorized types by generating a test dataset. @description @param vector Input vector to test @description @param allFlat Whether to flatten all arguments @description @param args Additional arguments */
    test_vector_types<T1, T2>(vector: T1[], allFlat: boolean, ...args: T2[]): RetCon<'test_vector_types'>;
    /** @description Unnests an array into individual rows. @description @param array Array value to unnest */
    unnest(p: any): RetCon<'unnest'>;
    /** @description Retrieves a secret by type and name. @description @param type Secret type identifier @description @param name Secret name identifier */
    which_secret(type: string, name: string): RetCon<'which_secret'>;
}
export interface TFExtensions {
    /** @description Scans an Apache Arrow stream and creates a temporary view with the given name. @description @param pointer1 Connection on which to execute the scan @description @param pointer2 Name of the temporary view to create @description @param pointer3 Arrow stream wrapper */
    arrow_scan<T1, T2, T3>(pointer1: T1, pointer2: T2, pointer3: T3): RetCon<'arrow_scan'>;
    /** @description Loads AWS credentials using the AWS Default Credentials Provider Chain. @description @deprecated @description @param credentials Credentials or profile name to load @description @param redactSecret Whether to redact the secret in the output @description @param setRegion Whether to set the AWS region after loading credentials */
    load_aws_credentials(credentials: string, redactSecret?: boolean, setRegion?: boolean): RetCon<'load_aws_credentials'>;
    /** register_geoarrow_extensions() @description Registers GeoArrow extensions for spatial data support. */
    register_geoarrow_extensions(): RetCon<'register_geoarrow_extensions'>;
    /** @description Returns all nodes within an R-tree index for debugging, profiling, or inspection. @description @param index Name of the R-tree index */
    rtree_index_dump(index: string): RetCon<'rtree_index_dump'>;
    /** rtree_index_scan() */
    rtree_index_scan(): RetCon<'rtree_index_scan'>;
    /** seq_scan() */
    seq_scan(): RetCon<'seq_scan'>;
    /** shapefile_meta(files) */
    shapefile_meta(files: string): RetCon<'shapefile_meta'>;
    /** sqlite_attach(path, overwrite) @description Attaches a SQLite database file for read/write via SQLite extension. @description @deprecated Use ATTACH SQL syntax instead. @description @param path Path to SQLite file. @description @param overwrite Whether to overwrite existing attachment. */
    sqlite_attach(path: string, overwrite?: boolean): RetCon<'sqlite_attach'>;
    /** sqlite_query(database, query) */
    sqlite_query<T1, T2>(database: T1, query: T2): RetCon<'sqlite_query'>;
    /** sqlite_scan(database, table) @description Scans a table from an attached SQLite database file. @description @param database Path to SQLite database file. @description @param table Name of the table to scan. */
    sqlite_scan<T1, T2>(database: T1, table: T2): RetCon<'sqlite_scan'>;
    /** ST_Drivers() @description Returns the list of supported GDAL drivers and file formats. @description Note that not all drivers have been thoroughly tested; some may require additional options. */
    ST_Drivers(): RetCon<'ST_Drivers'>;
    /** ST_GeneratePoints(box, count, seed) @description Generates random points within the specified bounding box. @description @param box Bounding box (min_x, min_y, max_x, max_y) as BOX_2D. @description @param count Number of points to generate. @description @param seed Optional random seed. */
    ST_GeneratePoints(box: [number, number, number, number], count: number, seed?: number): RetCon<'ST_GeneratePoints'>;



    /**@default: cd(col0:VARCHAR) -> null*/
    cd(col0: string): RetCon<'cd'>;
    /**@default: ls(col0:VARCHAR | , col1:BOOLEAN | ) -> null*/
    ls(col0?: string, col1?: boolean): RetCon<'ls'>;
    /**@default: lsr(col0:VARCHAR | , col1:INTEGER | , col2:BOOLEAN | ) -> null*/
    lsr(col0?: string, col1?: number, col2?: boolean): RetCon<'lsr'>;



}

export interface TableFunctions extends TFMetadata, TFPragma, TFBase, TFExtensions {

}

// export const variableTF = [
//     'duckdb_table_sample',
//     'query',
//     'query_table',
//     'repeat',
//     'repeat_row',
//     'summary',
//     'unnest',
// ]



const TF = new Proxy({}, {
    get(target, prop, receiver) {
        const methodName = prop.toString()
        return (...args: any) => `${methodName}(${(args).map(__serialize).join(',')})`
    },
}) as unknown as TableFunctions

export const duckdb_columns = TF.duckdb_columns
export const duckdb_constraints = TF.duckdb_constraints
export const duckdb_databases = TF.duckdb_databases
export const duckdb_dependencies = TF.duckdb_dependencies
export const duckdb_extensions = TF.duckdb_extensions
export const duckdb_external_file_cache = TF.duckdb_external_file_cache
export const duckdb_functions = TF.duckdb_functions
export const duckdb_indexes = TF.duckdb_indexes
export const duckdb_keywords = TF.duckdb_keywords
export const duckdb_log_contexts = TF.duckdb_log_contexts
export const duckdb_logs = TF.duckdb_logs
export const duckdb_memory = TF.duckdb_memory
export const duckdb_optimizers = TF.duckdb_optimizers
export const duckdb_prepared_statements = TF.duckdb_prepared_statements
export const duckdb_schemas = TF.duckdb_schemas
export const duckdb_secret_types = TF.duckdb_secret_types
export const duckdb_secrets = TF.duckdb_secrets
export const duckdb_sequences = TF.duckdb_sequences
export const duckdb_settings = TF.duckdb_settings
// export const duckdb_table_sample = TF.duckdb_table_sample
export const duckdb_tables = TF.duckdb_tables
export const duckdb_temporary_files = TF.duckdb_temporary_files
export const duckdb_types = TF.duckdb_types
export const duckdb_variables = TF.duckdb_variables
export const duckdb_views = TF.duckdb_views
export const pragma_collations = TF.pragma_collations
export const pragma_database_size = TF.pragma_database_size
export const pragma_metadata_info = TF.pragma_metadata_info
export const pragma_platform = TF.pragma_platform
export const pragma_rtree_index_info = TF.pragma_rtree_index_info
export const pragma_show = TF.pragma_show
export const pragma_storage_info = TF.pragma_storage_info
export const pragma_table_info = TF.pragma_table_info
export const pragma_user_agent = TF.pragma_user_agent
export const pragma_version = TF.pragma_version
export const arrow_scan_dumb = TF.arrow_scan_dumb
export const check_peg_parser = TF.check_peg_parser
export const checkpoint = TF.checkpoint
export const force_checkpoint = TF.force_checkpoint
export const generate_series = TF.generate_series
export const glob = TF.glob
export const icu_calendar_names = TF.icu_calendar_names
export const json_each = TF.json_each
export const json_execute_serialized_sql = TF.json_execute_serialized_sql
export const json_tree = TF.json_tree
export const parquet_bloom_probe = TF.parquet_bloom_probe
export const parquet_file_metadata = TF.parquet_file_metadata
export const parquet_kv_metadata = TF.parquet_kv_metadata
export const parquet_metadata = TF.parquet_metadata
export const parquet_schema = TF.parquet_schema
export const pg_timezone_names = TF.pg_timezone_names
// export const query = TF.query
// export const query_table = TF.query_table
export const range = TF.range
// export const repeat = TF.repeat
// export const repeat_row = TF.repeat_row
export const sql_auto_complete = TF.sql_auto_complete
// export const summary = TF.summary
export const test_all_types = TF.test_all_types
export const test_vector_types = TF.test_vector_types
export const unnest = TF.unnest
export const which_secret = TF.which_secret
export const arrow_scan = TF.arrow_scan
export const load_aws_credentials = TF.load_aws_credentials
export const register_geoarrow_extensions = TF.register_geoarrow_extensions
export const rtree_index_dump = TF.rtree_index_dump
export const rtree_index_scan = TF.rtree_index_scan
export const seq_scan = TF.seq_scan
export const shapefile_meta = TF.shapefile_meta
export const sqlite_attach = TF.sqlite_attach
export const sqlite_query = TF.sqlite_query
export const sqlite_scan = TF.sqlite_scan
export const ST_Drivers = TF.ST_Drivers
export const ST_GeneratePoints = TF.ST_GeneratePoints

export const cd = TF.cd
export const ls = TF.ls
export const lsr = TF.lsr