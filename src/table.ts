import { FilterKeys, SerializeOrdered, SerializeValue } from "./serializer";
type Parms<S extends string, F = null> = F extends null ? `${S}()` : `${S}(${SerializeValue<F>})`
type Parms1<S extends string, P1> = `${S}(${SerializeValue<P1>})`
type Parms2<S extends string, P1, P2> = `${S}(${SerializeValue<P1>},${SerializeValue<P2>})`
type Parms3<S extends string, P1, P2, P3> = `${S}(${SerializeValue<P1>},${SerializeValue<P2>},${SerializeValue<P3>})`

export interface DNative {
    /** Provides metadata about columns in the DuckDB instance including database name, schema, table info, column properties, and data type details */
    duckdb_columns(): Parms<'duckdb_columns'>;
    /** Provides metadata about constraints (CHECK, FOREIGN KEY, PRIMARY KEY, NOT NULL, UNIQUE) in the DuckDB instance */
    duckdb_constraints(): Parms<'duckdb_constraints'>;
    /** Lists accessible databases including attached databases, with details like path, type, and readonly status */
    duckdb_databases(): Parms<'duckdb_databases'>;
    /** Provides metadata about dependencies between database objects */
    duckdb_dependencies(): Parms<'duckdb_dependencies'>;
    /** Provides metadata about available extensions including load status, version, and installation details */
    duckdb_extensions(): Parms<'duckdb_extensions'>;
    /** Provides metadata about external file cache */
    duckdb_external_file_cache(): Parms<'duckdb_external_file_cache'>;
    /** Provides metadata about functions including type, parameters, return type, and macro definitions */
    duckdb_functions(): Parms<'duckdb_functions'>;
    /** Provides metadata about secondary indexes including uniqueness constraints and SQL definitions */
    duckdb_indexes(): Parms<'duckdb_indexes'>;
    /** Provides metadata about DuckDB's keywords and reserved words */
    duckdb_keywords(): Parms<'duckdb_keywords'>;
    /** Provides information on the contexts of DuckDB log entries */
    duckdb_log_contexts(): Parms<'duckdb_log_contexts'>;
    /** Returns a table of DuckDB log entries with timestamps, levels, and messages */
    duckdb_logs(): Parms<'duckdb_logs'>;
    /** Provides metadata about DuckDB's buffer manager memory usage */
    duckdb_memory(): Parms<'duckdb_memory'>;
    /** Provides metadata about available optimization rules that can be selectively disabled */
    duckdb_optimizers(): Parms<'duckdb_optimizers'>;
    /** Provides metadata about prepared statements in the current session */
    duckdb_prepared_statements(): Parms<'duckdb_prepared_statements'>;
    /** Provides metadata about database schemas including internal status and properties */
    duckdb_schemas(): Parms<'duckdb_schemas'>;
    /** Lists secret types supported in the current DuckDB session */
    duckdb_secret_types(): Parms<'duckdb_secret_types'>;
    /** Provides metadata about available secrets with optional redaction of sensitive information
     * @param redact Whether to redact sensitive information in the output
     */
    duckdb_secrets(redact: boolean): Parms<'duckdb_secrets'>;
    /** Provides metadata about sequences including range, cycle, and current value details */
    duckdb_sequences(): Parms<'duckdb_sequences'>;
    /** Provides metadata about available settings including current values and descriptions */
    duckdb_settings(): Parms<'duckdb_settings'>;
    /** Provides a sample of table data
     * @param col0 The table name to sample from
     */
    duckdb_table_sample<T extends string>(col0: T): Parms<'duckdb_table_sample', T>;
    /** Provides metadata about base tables including column count, constraints, and SQL definitions */
    duckdb_tables(): Parms<'duckdb_tables'>;
    /** Provides metadata about temporary files written to disk by DuckDB */
    duckdb_temporary_files(): Parms<'duckdb_temporary_files'>;
    /** Provides metadata about available data types including aliases, categories, and properties */
    duckdb_types(): Parms<'duckdb_types'>;
    /** Provides metadata about variables in the current session */
    duckdb_variables(): Parms<'duckdb_variables'>;
    /** Provides metadata about views including column count and SQL definitions */
    duckdb_views(): Parms<'duckdb_views'>;
}

export interface DPragma {
    /** @description Collations are used to define the sort order of strings. */
    pragma_collations(): Parms<'pragma_collations'>;
    /** @description Provides the current database size in bytes. */
    pragma_database_size(): Parms<'pragma_database_size'>;
    /** @description Provides metadata information. */
    pragma_metadata_info<T1>(col0: T1): Parms1<'pragma_metadata_info', T1>;
    pragma_platform(): Parms<'pragma_show'>;
    pragma_rtree_index_info(): Parms<'pragma_show'>;
    pragma_show<T1>(col0: T1): Parms<'pragma_show', T1>;
    pragma_storage_info<T1>(col0: T1): Parms<'pragma_show', T1>;
    pragma_table_info<T1>(col0: T1): Parms<'pragma_show', T1>;
    pragma_user_agent(): Parms<'pragma_show'>;
    pragma_version(): Parms<'pragma_show'>;
}
export interface DALL {
    /** arrow_scan_dumb(pointer1, pointer2, pointer3) */
    arrow_scan_dumb<T1, T2, T3>(pointer1: T1, pointer2: T2, pointer3: T3): Parms3<'arrow_scan_dumb', T1, T2, T3>;
    /** check_peg_parser(pattern) */
    check_peg_parser<T1>(pattern: T1): Parms1<'check_peg_parser', T1>;
    /** checkpoint(path) */
    checkpoint<T>(path?: T): Parms<'checkpoint', T>;
    /** force_checkpoint(path) */
    force_checkpoint<T>(path?: T): Parms<'force_checkpoint', T>;
    /** generate_series(start, end, step) */
    generate_series<T1, T2, T3>(start: T1, end?: T2, step?: T3): Parms3<'generate_series', T1, T2, T3>;
    /** glob(pattern) */
    glob<T>(pattern: T): Parms1<'glob', T>;
    /** icu_calendar_names() */
    icu_calendar_names(): Parms<'icu_calendar_names'>;
    /** json_each(json, path) */
    json_each<T1, T2>(json: T1, path?: T2): Parms2<'json_each', T1, T2>;
    /** json_execute_serialized_sql(sql) */
    json_execute_serialized_sql<T>(sql: T): Parms1<'json_execute_serialized_sql', T>;
    /** json_tree(json, path) */
    json_tree<T1, T2>(json: T1, path?: T2): Parms2<'json_tree', T1, T2>;
    /** parquet_bloom_probe(files, column, value) */
    parquet_bloom_probe<T1, T2, T3>(files: T1, column: T2, value: T3): Parms3<'parquet_bloom_probe', T1, T2, T3>;
    /** parquet_file_metadata(files) */
    parquet_file_metadata<T>(files: T): Parms1<'parquet_file_metadata', T>;
    /** parquet_kv_metadata(files) */
    parquet_kv_metadata<T>(files: T): Parms1<'parquet_kv_metadata', T>;
    /** parquet_metadata(files) */
    parquet_metadata<T>(files: T): Parms1<'parquet_metadata', T>;
    /** parquet_schema(files) */
    parquet_schema<T>(files: T): Parms1<'parquet_schema', T>;
    /** pg_timezone_names() */
    pg_timezone_names(): Parms<'pg_timezone_names'>;
    /** query(sql) */
    query<T>(sql: T): Parms1<'query', T>;
    /** query_table(tables, validate) */
    query_table<T1, T2>(tables: T1, validate?: T2): Parms2<'query_table', T1, T2>;
    /** range(start, end, step) */
    range<T1, T2, T3>(start: T1, end?: T2, step?: T3): Parms3<'range', T1, T2, T3>;
    /** repeat(value, count) */
    repeat<T1, T2>(value: T1, count: T2): Parms2<'repeat', T1, T2>;
    /** repeat_row(numRows, ...values) */
    repeat_row<T1, T2>(numRows: T1, ...values: T2[]): Parms<'repeat_row', T1>;
    /** sql_auto_complete(sql) */
    sql_auto_complete<T>(sql: T): Parms1<'sql_auto_complete', T>;
    /** summary(table) */
    summary<T>(table: T): Parms1<'summary', T>;
    /** test_all_types(useLargeEnum) */
    test_all_types<T>(useLargeEnum: T): Parms1<'test_all_types', T>;
    /** test_vector_types(vector, allFlat, ...args) */
    test_vector_types<T1, T2>(vector: T1, allFlat: T2, ...args: T1[]): Parms2<'test_vector_types', T1, T2>;
    /** unnest(array) */
    unnest<T>(array: T): Parms1<'unnest', T>;
    /** which_secret(type, name) */
    which_secret<T1, T2>(type: T1, name: T2): Parms2<'which_secret', T1, T2>;
}
export interface DTable {
    /**
     * Scans an Apache Arrow stream and creates a temporary view with the given name.
     * @param pointer1 Connection on which to execute the scan
     * @param pointer2 Name of the temporary view to create
     * @param pointer3 Arrow stream wrapper
     */
    arrow_scan<T1, T2, T3>(pointer1: T1, pointer2: T2, pointer3: T3): Parms3<'arrow_scan', T1, T2, T3>;
    /** get_ui_url() */
    get_ui_url(): Parms<'get_ui_url'>;
    /**
     * Loads AWS credentials using the AWS Default Credentials Provider Chain.
     * @deprecated
     * @param credentials Credentials or profile name to load
     * @param redactSecret Whether to redact the secret in the output
     * @param setRegion Whether to set the AWS region after loading credentials
     */
    load_aws_credentials<T1, T2>(credentials: T1, redactSecret: T2, setRegion?: T2): Parms3<'load_aws_credentials', T1, T2, T2>;
    /** register_geoarrow_extensions() */
    register_geoarrow_extensions(): Parms<'register_geoarrow_extensions'>;
    /**
     * Returns all nodes within an R-tree index for debugging, profiling, or inspection.
     * @param index Name of the R-tree index
     */
    rtree_index_dump<T>(index: T): Parms1<'rtree_index_dump', T>;
    /** rtree_index_scan() */
    rtree_index_scan(): Parms<'rtree_index_scan'>;
    /** seq_scan() */
    seq_scan(): Parms<'seq_scan'>;
    /** shapefile_meta(files) */
    shapefile_meta<T>(files: T): Parms1<'shapefile_meta', T>;
    /** sqlite_attach(path, overwrite) */
    sqlite_attach<T1, T2>(path: T1, overwrite: T2): Parms2<'sqlite_attach', T1, T2>;
    /** sqlite_query(database, query) */
    sqlite_query<T1, T2>(database: T1, query: T2): Parms2<'sqlite_query', T1, T2>;
    /** sqlite_scan(database, table) */
    sqlite_scan<T1, T2>(database: T1, table: T2): Parms2<'sqlite_scan', T1, T2>;
    /** ST_Drivers() */
    ST_Drivers(): Parms<'ST_Drivers'>;
    /** ST_GeneratePoints(box, count, seed) */
    ST_GeneratePoints<T1, T2>(box: T1, count: T2, seed?: T2): Parms3<'ST_GeneratePoints', T1, T2, T2>;
    
}
(x: DNative) => {
    const xxx = x.duckdb_table_sample('dsq')
}
