import { __serialize, FilterKeys, SerializeOrdered, SerializeValue } from "./serializer";
type Parms<S extends string, F = null> = F extends null ? `${S}()` : `${S}(${SerializeValue<F>})`
type Parms1<S extends string, P1> = `${S}(${SerializeValue<P1>})`
type Parms2<S extends string, P1, P2> = `${S}(${SerializeValue<P1>},${SerializeValue<P2>})`
type Parms3<S extends string, P1, P2, P3> = `${S}(${SerializeValue<P1>},${SerializeValue<P2>},${SerializeValue<P3>})`

export interface TFMetadata {
    /** @description Provides metadata about columns in the DuckDB instance including database name, schema, table info, column properties, and data type details */
    duckdb_columns(): Parms<'duckdb_columns'>;
    /** @description Provides metadata about constraints (CHECK, FOREIGN KEY, PRIMARY KEY, NOT NULL, UNIQUE) in the DuckDB instance */
    duckdb_constraints(): Parms<'duckdb_constraints'>;
    /** @description Lists accessible databases including attached databases, with details like path, type, and readonly status */
    duckdb_databases(): Parms<'duckdb_databases'>;
    /** @description Provides metadata about dependencies between database objects */
    duckdb_dependencies(): Parms<'duckdb_dependencies'>;
    /** @description Provides metadata about available extensions including load status, version, and installation details */
    duckdb_extensions(): Parms<'duckdb_extensions'>;
    /** @description Provides metadata about external file cache */
    duckdb_external_file_cache(): Parms<'duckdb_external_file_cache'>;
    /** @description Provides metadata about functions including type, parameters, return type, and macro definitions */
    duckdb_functions(): Parms<'duckdb_functions'>;
    /** @description Provides metadata about secondary indexes including uniqueness constraints and SQL definitions */
    duckdb_indexes(): Parms<'duckdb_indexes'>;
    /** @description Provides metadata about DuckDB's keywords and reserved words */
    duckdb_keywords(): Parms<'duckdb_keywords'>;
    /** @description Provides information on the contexts of DuckDB log entries */
    duckdb_log_contexts(): Parms<'duckdb_log_contexts'>;
    /** @description Returns a table of DuckDB log entries with timestamps, levels, and messages */
    duckdb_logs(): Parms<'duckdb_logs'>;
    /** @description Provides metadata about DuckDB's buffer manager memory usage */
    duckdb_memory(): Parms<'duckdb_memory'>;
    /** @description Provides metadata about available optimization rules that can be selectively disabled */
    duckdb_optimizers(): Parms<'duckdb_optimizers'>;
    /** @description Provides metadata about prepared statements in the current session */
    duckdb_prepared_statements(): Parms<'duckdb_prepared_statements'>;
    /** @description Provides metadata about database schemas including internal status and properties */
    duckdb_schemas(): Parms<'duckdb_schemas'>;
    /** @description Lists secret types supported in the current DuckDB session */
    duckdb_secret_types(): Parms<'duckdb_secret_types'>;
    /** @description Provides metadata about available secrets with optional redaction of sensitive information @description @param redact Whether to redact sensitive information in the output */
    duckdb_secrets(redact: boolean): Parms<'duckdb_secrets'>;
    /** @description Provides metadata about sequences including range, cycle, and current value details */
    duckdb_sequences(): Parms<'duckdb_sequences'>;
    /** @description Provides metadata about available settings including current values and descriptions */
    duckdb_settings(): Parms<'duckdb_settings'>;
    /** @description Provides a sample of table data @description @param col0 The table name to sample from */
    duckdb_table_sample<T extends string>(col0: T): Parms<'duckdb_table_sample', T>;
    /** @description Provides metadata about base tables including column count, constraints, and SQL definitions */
    duckdb_tables(): Parms<'duckdb_tables'>;
    /** @description Provides metadata about temporary files written to disk by DuckDB */
    duckdb_temporary_files(): Parms<'duckdb_temporary_files'>;
    /** @description Provides metadata about available data types including aliases, categories, and properties */
    duckdb_types(): Parms<'duckdb_types'>;
    /** @description Provides metadata about variables in the current session */
    duckdb_variables(): Parms<'duckdb_variables'>;
    /** @description Provides metadata about views including column count and SQL definitions */
    duckdb_views(): Parms<'duckdb_views'>;
}

export interface TFPragma {
    /** Collations are used to define the sort order of strings. */
    pragma_collations(): Parms<'pragma_collations'>;
    /** Provides the current database size in bytes. */
    pragma_database_size(): Parms<'pragma_database_size'>;
    /** Provides metadata information. */
    pragma_metadata_info<T1>(col0: T1): Parms1<'pragma_metadata_info', T1>;
    /** Provides platform information via PRAGMA. */
    pragma_platform(): Parms<'pragma_show'>;
    /** Provides R-tree index metadata via PRAGMA. */
    pragma_rtree_index_info(): Parms<'pragma_show'>;
    /** Shows a PRAGMA setting or value. */
    pragma_show<T1>(col0: T1): Parms<'pragma_show', T1>;
    /** Provides storage metadata for a table via PRAGMA. */
    pragma_storage_info<T1>(col0: T1): Parms<'pragma_show', T1>;
    /** Provides information about table columns via PRAGMA. */
    pragma_table_info<T1>(col0: T1): Parms<'pragma_show', T1>;
    /** Returns the user agent string of the DuckDB build. */
    pragma_user_agent(): Parms<'pragma_show'>;
    /** Returns the version of the DuckDB engine. */
    pragma_version(): Parms<'pragma_show'>;
}
export interface TFBase {
    /** @description Scans an Apache Arrow stream (dumb interface) and creates a temporary view. @description @param pointer1 Connection on which to execute the scan @description @param pointer2 Name of the temporary view to create @description @param pointer3 Arrow stream pointer wrapper */
    arrow_scan_dumb<T1, T2, T3>(pointer1: T1, pointer2: T2, pointer3: T3): Parms3<'arrow_scan_dumb', T1, T2, T3>;
    /** @description Checks a regex-based SQL parser pattern for validity. @description @param pattern Parser pattern to check */
    check_peg_parser<T1>(pattern: T1): Parms1<'check_peg_parser', T1>;
    /** @description Creates a checkpoint file at the specified path. @description @param path Optional path to save checkpoint */
    checkpoint<T>(path?: T): Parms<'checkpoint', T>;
    /** @description Forces creation of a checkpoint, even if unnecessary. @description @param path Optional path to save checkpoint */
    force_checkpoint<T>(path?: T): Parms<'force_checkpoint', T>;
    /** @description Generates a series of values between start and end with an optional step increment. @description @param start Start of series @description @param end End of series @description @param step Step increment */
    generate_series<T1, T2, T3>(start: T1, end?: T2, step?: T3): Parms3<'generate_series', T1, T2, T3>;
    /** @description Finds files matching a glob pattern. @description @param pattern File pattern to match */
    glob<T>(pattern: T): Parms1<'glob', T>;
    /** @description Returns list of ICU calendar names for localization. */
    icu_calendar_names(): Parms<'icu_calendar_names'>;
    /** @description Expands each element in a JSON value into separate rows. @description @param json JSON value or string @description @param path Optional JSON path expression */
    json_each<T1, T2>(json: T1, path?: T2): Parms2<'json_each', T1, T2>;
    /** @description Executes a serialized SQL command represented in JSON. @description @param sql Serialized SQL JSON object */
    json_execute_serialized_sql<T>(sql: T): Parms1<'json_execute_serialized_sql', T>;
    /** @description Produces a tree representation of a JSON structure as rows. @description @param json JSON value or string @description @param path Optional JSON path expression */
    json_tree<T1, T2>(json: T1, path?: T2): Parms2<'json_tree', T1, T2>;
    /** @description Probes Parquet file bloom filters for presence of a value. @description @param files File paths or patterns @description @param column Column to probe @description @param value Value to check */
    parquet_bloom_probe<T1, T2, T3>(files: T1, column: T2, value: T3): Parms3<'parquet_bloom_probe', T1, T2, T3>;
    /** @description Retrieves metadata information for Parquet files. @description @param files File paths or patterns */
    parquet_file_metadata<T>(files: T): Parms1<'parquet_file_metadata', T>;
    /** @description Retrieves key-value metadata for Parquet files. @description @param files File paths or patterns */
    parquet_kv_metadata<T>(files: T): Parms1<'parquet_kv_metadata', T>;
    /** @description Retrieves block and schema metadata for Parquet files. @description @param files File paths or patterns */
    parquet_metadata<T>(files: T): Parms1<'parquet_metadata', T>;
    /** @description Reads Parquet file schema definitions. @description @param files File paths or patterns */
    parquet_schema<T>(files: T): Parms1<'parquet_schema', T>;
    /** @description Returns list of PostgreSQL timezone names supported. */
    pg_timezone_names(): Parms<'pg_timezone_names'>;
    /** @description Executes a SQL query and returns a result set. @description @param sql SQL query string */
    query<T>(sql: T): Parms1<'query', T>;
    /** @description Executes a table-valued SQL query. @description @param tables Table identifiers or expressions @description @param validate Optional validation flag */
    query_table<T1, T2>(tables: T1, validate?: T2): Parms2<'query_table', T1, T2>;
    /** @description Generates a half-open range of values from start to end with an optional step. @description @param start Start of range @description @param end End of range @description @param step Step increment */
    range<T1, T2, T3>(start: T1, end?: T2, step?: T3): Parms3<'range', T1, T2, T3>;
    /** @description Repeats a single value into a column for a specified count. @description @param value Value to repeat @description @param count Number of repetitions */
    repeat<T1, T2>(value: T1, count: T2): Parms2<'repeat', T1, T2>;
    /** @description Repeats a row of values numRows times. @description @param numRows Number of rows to generate */
    repeat_row<T1, T2>(numRows: T1, ...values: T2[]): Parms<'repeat_row', T1>;
    /** @description Provides SQL auto-completion suggestions for a partial query. @description @param sql Partial SQL string */
    sql_auto_complete<T>(sql: T): Parms1<'sql_auto_complete', T>;
    /** @description Computes summary statistics for the specified table. @description @param table Table identifier or expression */
    summary<T>(table: T): Parms1<'summary', T>;
    /** @description Generates a dataset covering all data types for testing. @description @param useLargeEnum Whether to include large enum types */
    test_all_types<T>(useLargeEnum: T): Parms1<'test_all_types', T>;
    /** @description Tests vectorized types by generating a test dataset. @description @param vector Input vector to test @description @param allFlat Whether to flatten all arguments @description @param args Additional arguments */
    test_vector_types<T1, T2>(vector: T1, allFlat: T2, ...args: T1[]): Parms2<'test_vector_types', T1, T2>;
    /** @description Unnests an array into individual rows. @description @param array Array value to unnest */
    unnest<T>(array: T): Parms1<'unnest', T>;
    /** @description Retrieves a secret by type and name. @description @param type Secret type identifier @description @param name Secret name identifier */
    which_secret<T1, T2>(type: T1, name: T2): Parms2<'which_secret', T1, T2>;
}
export interface TFExtensions {
    /** @description Scans an Apache Arrow stream and creates a temporary view with the given name. @description @param pointer1 Connection on which to execute the scan @description @param pointer2 Name of the temporary view to create @description @param pointer3 Arrow stream wrapper */
    arrow_scan<T1, T2, T3>(pointer1: T1, pointer2: T2, pointer3: T3): Parms3<'arrow_scan', T1, T2, T3>;
    /** get_ui_url() @description Returns the URL of the DuckDB web UI for this connection. */
    get_ui_url(): Parms<'get_ui_url'>;
    /** @description Loads AWS credentials using the AWS Default Credentials Provider Chain. @description @deprecated @description @param credentials Credentials or profile name to load @description @param redactSecret Whether to redact the secret in the output @description @param setRegion Whether to set the AWS region after loading credentials */
    load_aws_credentials<T1, T2>(credentials: T1, redactSecret: T2, setRegion?: T2): Parms3<'load_aws_credentials', T1, T2, T2>;
    /** register_geoarrow_extensions() @description Registers GeoArrow extensions for spatial data support. */
    register_geoarrow_extensions(): Parms<'register_geoarrow_extensions'>;
    /** @description Returns all nodes within an R-tree index for debugging, profiling, or inspection. @description @param index Name of the R-tree index */
    rtree_index_dump<T>(index: T): Parms1<'rtree_index_dump', T>;
    /** rtree_index_scan() */
    rtree_index_scan(): Parms<'rtree_index_scan'>;
    /** seq_scan() */
    seq_scan(): Parms<'seq_scan'>;
    /** shapefile_meta(files) */
    shapefile_meta<T>(files: T): Parms1<'shapefile_meta', T>;
    /** sqlite_attach(path, overwrite) @description Attaches a SQLite database file for read/write via SQLite extension. @description @deprecated Use ATTACH SQL syntax instead. @description @param path Path to SQLite file. @description @param overwrite Whether to overwrite existing attachment. */
    sqlite_attach<T1, T2>(path: T1, overwrite: T2): Parms2<'sqlite_attach', T1, T2>;
    /** sqlite_query(database, query) */
    sqlite_query<T1, T2>(database: T1, query: T2): Parms2<'sqlite_query', T1, T2>;
    /** sqlite_scan(database, table) @description Scans a table from an attached SQLite database file. @description @param database Path to SQLite database file. @description @param table Name of the table to scan. */
    sqlite_scan<T1, T2>(database: T1, table: T2): Parms2<'sqlite_scan', T1, T2>;
    /** ST_Drivers() @description Returns the list of supported GDAL drivers and file formats. @description Note that not all drivers have been thoroughly tested; some may require additional options. */
    ST_Drivers(): Parms<'ST_Drivers'>;
    /** ST_GeneratePoints(box, count, seed) @description Generates random points within the specified bounding box. @description @param box Bounding box (min_x, min_y, max_x, max_y) as BOX_2D. @description @param count Number of points to generate. @description @param seed Optional random seed. */
    ST_GeneratePoints<T1, T2>(box: T1, count: T2, seed?: T2): Parms3<'ST_GeneratePoints', T1, T2, T2>;
}

export interface TableFunctions extends TFMetadata, TFPragma, TFBase, TFExtensions {

}


// const u = g.duckdb_table_sample('lol')

// (x: DTable) => {
//     // const xxx = x.
// }

