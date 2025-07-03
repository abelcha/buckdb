export interface DSettings {
  /**@description: Access mode of the database (AUTOMATIC, READ_ONLY or READ_WRITE)*/
  access_mode: "AUTOMATIC" | "READ_ONLY" | "READ_WRITE";

  /**@description: Whether to enable the allocator background thread.*/
  allocator_background_threads: boolean;

  /**@description: If a bulk deallocation larger than this occurs, flush outstanding allocations.*/
  allocator_bulk_deallocation_flush_threshold: string;

  /**@description: Peak allocation threshold at which to flush the allocator after completing a task.*/
  allocator_flush_threshold: string;

  /**@description: Allow to load community built extensions*/
  allow_community_extensions: boolean;

  /**@description: Allow to load extensions with not compatible metadata*/
  allow_extensions_metadata_mismatch: boolean;

  /**@description: Allow the creation of persistent secrets, that are stored and loaded on restarts*/
  allow_persistent_secrets: boolean;

  /**@description: Allow printing unredacted secrets*/
  allow_unredacted_secrets: boolean;

  /**@description: Allow to load extensions with invalid or missing signatures*/
  allow_unsigned_extensions: boolean;

  /**@description: List of directories/prefixes that are ALWAYS allowed to be queried - even when enable_external_access is false*/
  allowed_directories: any[];

  /**@description: List of files that are ALWAYS allowed to be queried - even when enable_external_access is false*/
  allowed_paths: any[];

  /**@description: Whether Arrow buffers for strings, blobs, uuids and bits should be exported using large buffers*/
  arrow_large_buffer_size: boolean;

  /**@description: Whenever a DuckDB type does not have a clear native or canonical extension match in Arrow, export the types with a duckdb.type_name extension name.*/
  arrow_lossless_conversion: boolean;

  /**@description: Whether export to Arrow format should use ListView as the physical layout for LIST columns*/
  arrow_output_list_view: boolean;

  /**@description: The maximum number of rows we need on the left side of an ASOF join to use a nested loop join*/
  asof_loop_join_threshold: number;

  /**@description: Overrides the custom endpoint for extension installation on autoloading*/
  autoinstall_extension_repository: string;

  /**@description: Whether known extensions are allowed to be automatically installed when a query depends on them*/
  autoinstall_known_extensions: boolean;

  /**@description: Whether known extensions are allowed to be automatically loaded when a query depends on them*/
  autoload_known_extensions: boolean;

  /**@description: The maximum number of schemas the system will scan for "did you mean..." style errors in the catalog*/
  catalog_error_max_schemas: number;

  /**@description: The WAL size threshold at which to automatically trigger a checkpoint (e.g. 1GB)*/
  checkpoint_threshold: string;

  /**@description: The WAL size threshold at which to automatically trigger a checkpoint (e.g. 1GB)*/
  wal_autocheckpoint: string;

  /**@description: Overrides the custom endpoint for remote extension installation*/
  custom_extension_repository: string;

  /**@description: Accepts a JSON enabling custom metrics*/
  custom_profiling_settings: string;

  /**@description: Metadata from DuckDB callers*/
  custom_user_agent: string;

  /**@description: DEBUG SETTING: force use of IEJoin to implement AsOf joins*/
  debug_asof_iejoin: boolean;

  /**@description: DEBUG SETTING: trigger an abort while checkpointing for testing purposes*/
  debug_checkpoint_abort: string;

  /**@description: DEBUG SETTING: force out-of-core computation for operators that support it, used for testing*/
  debug_force_external: boolean;

  /**@description: DEBUG SETTING: Force disable cross product generation when hyper graph isn't connected, used for testing*/
  debug_force_no_cross_product: boolean;

  /**@description: DEBUG SETTING: skip checkpointing on commit*/
  debug_skip_checkpoint_on_commit: boolean;

  /**@description: DEBUG SETTING: enable vector verification*/
  debug_verify_vector: string;

  /**@description: DEBUG SETTING: switch window mode to use*/
  debug_window_mode: string;

  /**@description: The default block size for new duckdb database files (new as-in, they do not yet exist).*/
  default_block_size: number;

  /**@description: The collation setting used when none is specified*/
  default_collation: string;

  /**@description: NULL ordering used when none is specified (NULLS_FIRST or NULLS_LAST)*/
  default_null_order: string;

  /**@description: NULL ordering used when none is specified (NULLS_FIRST or NULLS_LAST)*/
  null_order: string;

  /**@description: The order type used when none is specified (ASC or DESC)*/
  default_order: string;

  /**@description: Allows switching the default storage for secrets*/
  default_secret_storage: string;

  /**@description: Disable casting from timestamp to timestamptz */
  disable_timestamptz_casts: boolean;

  /**@description: Disable a specific set of compression methods (comma separated)*/
  disabled_compression_methods: string;

  /**@description: Disable specific file systems preventing access (e.g. LocalFileSystem)*/
  disabled_filesystems: string;

  /**@description: Sets the list of disabled loggers*/
  disabled_log_types: string;

  /**@description: DEBUG SETTING: disable a specific set of optimizers (comma separated)*/
  disabled_optimizers: string;

  /**@description: DuckDB API surface*/
  duckdb_api: string;

  /**@description: The maximum amount of OR filters we generate dynamically from a hash join*/
  dynamic_or_filter_threshold: number;

  /**@description: Allow the database to access external state (through e.g. loading/installing modules, COPY TO/FROM, CSV readers, pandas replacement scans, etc)*/
  enable_external_access: boolean;

  /**@description: Allow the database to cache external files (e.g., Parquet) in memory.*/
  enable_external_file_cache: boolean;

  /**@description: Allow scans on FSST compressed segments to emit compressed vectors to utilize late decompression*/
  enable_fsst_vectors: boolean;

  /**@description: Enables HTTP logging*/
  enable_http_logging: boolean;

  /**@description: Whether or not the global http metadata is used to cache HTTP metadata*/
  enable_http_metadata_cache: boolean;

  /**@description: Enables the logger*/
  enable_logging: boolean;

  /**@description: Enable created MACROs to create dependencies on the referenced objects (such as tables)*/
  enable_macro_dependencies: boolean;

  /**@description: [PLACEHOLDER] Legacy setting - does nothing*/
  enable_object_cache: boolean;

  /**@description: Enables profiling, and sets the output format (JSON, QUERY_TREE, QUERY_TREE_OPTIMIZER)*/
  enable_profiling: string;

  /**@description: Enables the progress bar, printing progress to the terminal for long queries*/
  enable_progress_bar: boolean;

  /**@description: Controls the printing of the progress bar, when 'enable_progress_bar' is true*/
  enable_progress_bar_print: boolean;

  /**@description: Enable created VIEWs to create dependencies on the referenced objects (such as tables)*/
  enable_view_dependencies: boolean;

  /**@description: Sets the list of enabled loggers*/
  enabled_log_types: string;

  /**@description: Output error messages as structured JSON instead of as a raw string*/
  errors_as_json: boolean;

  /**@description: Output of EXPLAIN statements (ALL, OPTIMIZED_ONLY, PHYSICAL_ONLY)*/
  explain_output: string;

  /**@description: Set the directory to store extensions in*/
  extension_directory: string;

  /**@description: The number of external threads that work on DuckDB tasks.*/
  external_threads: number;

  /**@description: A comma separated list of directories to search for input files*/
  file_search_path: string;

  /**@description: DEBUG SETTING: forces a specific bitpacking mode*/
  force_bitpacking_mode: string;

  /**@description: DEBUG SETTING: forces a specific compression method to be used*/
  force_compression: string;

  /**@description: Sets the home directory used by the system*/
  home_directory: string;

  /**@description: The file to which HTTP logging output should be saved, or empty to print to the terminal*/
  http_logging_output: string;

  /**@description: HTTP proxy host*/
  http_proxy: string;

  /**@description: Password for HTTP proxy*/
  http_proxy_password: string;

  /**@description: Username for HTTP proxy*/
  http_proxy_username: string;

  /**@description: Use IEE754-compliant floating point operations (returning NAN instead of errors/NULL).*/
  ieee_floating_point_ops: boolean;

  /**@description: Whether transactions should be started lazily when needed, or immediately when BEGIN TRANSACTION is called*/
  immediate_transaction_mode: boolean;

  /**@description: The maximum index scan count sets a threshold for index scans. If fewer than MAX(index_scan_max_count, index_scan_percentage * total_row_count) rows match, we perform an index scan instead of a table scan.*/
  index_scan_max_count: number;

  /**@description: The index scan percentage sets a threshold for index scans. If fewer than MAX(index_scan_max_count, index_scan_percentage * total_row_count) rows match, we perform an index scan instead of a table scan.*/
  index_scan_percentage: number;

  /**@description: Whether or not the / operator defaults to integer division, or to floating point division*/
  integer_division: boolean;

  /**@description: Configures the use of the deprecated single arrow operator (->) for lambda functions.*/
  lambda_syntax: string;

  /**@description: The maximum amount of rows in the LIMIT/SAMPLE for which we trigger late materialization*/
  late_materialization_max_rows: number;

  /**@description: Whether or not the configuration can be altered*/
  lock_configuration: boolean;

  /**@description: Specifies the path to which queries should be logged (default: NULL, queries are not logged)*/
  log_query_path: string;

  /**@description: The log level which will be recorded in the log*/
  logging_level: string;

  /**@description: Enables the logger*/
  logging_mode: string;

  /**@description: Set the logging storage (memory/stdout/file)*/
  logging_storage: string;

  /**@description: The maximum expression depth limit in the parser. WARNING: increasing this setting and using very deep expressions might lead to stack overflow errors.*/
  max_expression_depth: number;

  /**@description: The maximum memory of the system (e.g. 1GB)*/
  max_memory: string;

  /**@description: The maximum memory of the system (e.g. 1GB)*/
  memory_limit: string;

  /**@description: The maximum amount of data stored inside the 'temp_directory' (when set) (e.g. 1GB)*/
  max_temp_directory_size: string;

  /**@description: The maximum vacuum tasks to schedule during a checkpoint.*/
  max_vacuum_tasks: number;

  /**@description: The number of rows we need on either table to choose a merge join*/
  merge_join_threshold: number;

  /**@description: The number of rows we need on either table to choose a nested loop join*/
  nested_loop_join_threshold: number;

  /**@description: Allow implicit casting to/from VARCHAR*/
  old_implicit_casting: boolean;

  /**@description: Allow ordering by non-integer literals - ordering by such literals has no effect.*/
  order_by_non_integer_literal: boolean;

  /**@description: The number of rows to accumulate before sorting, used for tuning*/
  ordered_aggregate_threshold: number;

  /**@description: The threshold in number of rows after which we flush a thread state when writing using PARTITION_BY*/
  partitioned_write_flush_threshold: number;

  /**@description: The maximum amount of files the system can keep open before flushing to disk when writing using PARTITION_BY*/
  partitioned_write_max_open_files: number;

  /**@description: The password to use. Ignored for legacy compatibility.*/
  password: string;

  /**@description: Threshold in bytes for when to use a perfect hash table*/
  perfect_ht_threshold: number;

  /**@description: The threshold to switch from using filtered aggregates to LIST with a dedicated pivot operator*/
  pivot_filter_threshold: number;

  /**@description: The maximum number of pivot columns in a pivot statement*/
  pivot_limit: number;

  /**@description: Force use of range joins with mixed predicates*/
  prefer_range_joins: boolean;

  /**@description: Whether or not to preserve the identifier case, instead of always lowercasing all non-quoted identifiers*/
  preserve_identifier_case: boolean;

  /**@description: Whether or not to preserve insertion order. If set to false the system is allowed to re-order any results that do not contain ORDER BY clauses.*/
  preserve_insertion_order: boolean;

  /**@description: Whether strings should be produced by DuckDB in Utf8View format instead of Utf8*/
  produce_arrow_string_view: boolean;

  /**@description: The file to which profile output should be saved, or empty to print to the terminal*/
  profile_output: string;

  /**@description: The file to which profile output should be saved, or empty to print to the terminal*/
  profiling_output: string;

  /**@description: The profiling mode (STANDARD or DETAILED)*/
  profiling_mode: string;

  /**@description: Sets the time (in milliseconds) how long a query needs to take before we start printing a progress bar*/
  progress_bar_time: number;

  /**@description: When a scalar subquery returns multiple rows - return a random row instead of returning an error.*/
  scalar_subquery_error_on_multiple_rows: boolean;

  /**@description: Partially process tasks before rescheduling - allows for more scheduler fairness between separate queries*/
  scheduler_process_partial: boolean;

  /**@description: Sets the default search schema. Equivalent to setting search_path to a single value.*/
  schema: string;

  /**@description: Sets the default catalog search path as a comma-separated list of values*/
  search_path: string;

  /**@description: Set the directory to which persistent secrets are stored*/
  secret_directory: string;

  /**@description: Serialize on checkpoint with compatibility for a given duckdb version*/
  storage_compatibility_version: string;

  /**@description: The maximum memory to buffer between fetching from a streaming result (e.g. 1GB)*/
  streaming_buffer_size: string;

  /**@description: Set the directory to which to write temp files*/
  temp_directory: string;

  /**@description: The number of total threads used by the system.*/
  threads: number;

  /**@description: The number of total threads used by the system.*/
  worker_threads: number;

  /**@description: The username to use. Ignored for legacy compatibility.*/
  username: string;

  /**@description: The username to use. Ignored for legacy compatibility.*/
  user: string;

  /**@description: The (average) length at which to enable ZSTD compression, defaults to 4096*/
  zstd_min_string_length: number;

  /**@description: Period of time between UI polling requests (in ms)*/
  ui_polling_interval: number;

  /**@description: Remote URL to which the UI server forwards GET requests*/
  ui_remote_url: string;

  /**@description: Local port on which the UI server listens*/
  ui_local_port: number;

  /**@description: Load all SQLite columns as VARCHAR columns*/
  sqlite_all_varchar: boolean;

  /**@description: DEBUG SETTING: print all queries sent to SQLite to stdout*/
  sqlite_debug_show_queries: boolean;

  /**@description: Azure connection string, used for authenticating and configuring azure requests*/
  azure_storage_connection_string: string;

  /**@description: Forwards the internal logging of the Delta Kernel to the duckdb logger. Warning: this may impact performance even with DuckDB logging disabled.*/
  delta_kernel_logging: boolean;

  /**@description: Http proxy password if needed.*/
  azure_proxy_password: string;

  /**@description: The current time zone*/
  TimeZone: string;

  /**@description: Http proxy user name if needed.*/
  azure_proxy_user_name: string;

  /**@description: Proxy to use when login & performing request to azure. By default it will use the HTTP_PROXY environment variable if set.*/
  azure_http_proxy: string;

  /**@description: Size of the read buffer.  It is recommended that this is evenly divisible by azure_read_transfer_chunk_size.*/
  azure_read_buffer_size: number;

  /**@description: Enable globbing the filesystem (if possible) to find the latest version metadata. This could result in reading an uncommitted version.*/
  unsafe_enable_version_guessing: boolean;

  /**@description: Maximum size in bytes that the Azure client will read in a single request. It is recommended that this is a factor of azure_read_buffer_size.*/
  azure_read_transfer_chunk_size: number;

  /**@description: Maximum number of threads the Azure client can use for a single parallel read. If azure_read_transfer_chunk_size is less than azure_read_buffer_size then setting this > 1 will allow the Azure client to do concurrent requests to fill the buffer.*/
  azure_read_transfer_concurrency: number;

  /**@description: Include http info from the Azure Storage in the explain analyze statement.*/
  azure_http_stats: boolean;

  /**@description: Override the azure endpoint for when the Azure credential providers are used.*/
  azure_endpoint: string;

  /**@description: Ordered list of Azure credential providers, in string format separated by ';'. E.g. 'cli;workload_identity;managed_identity;env'*/
  azure_credential_chain: string;

  /**@description: Enable/disable the caching of some context when performing queries. This cache is by default enable, and will for a given connection keep a local context when performing a query. If you suspect that the caching is causing some side effect you can try to disable it by setting this option to false.*/
  azure_context_caching: boolean;

  /**@description: Disable the prefetching mechanism in Parquet*/
  disable_parquet_prefetching: boolean;

  /**@description: Attempt to decode/encode geometry data in/as GeoParquet files if the spatial extension is present.*/
  enable_geoparquet_conversion: boolean;

  /**@description: Azure account name, when set, the extension will attempt to automatically detect credentials*/
  azure_account_name: string;

  /**@description: Adds the filtered files to the explain output. Warning: this may impact performance of delta scan during explain analyze queries.*/
  delta_scan_explain_files_filtered: boolean;

  /**@description: The current calendar*/
  Calendar: string;

  /**@description: Underlying adapter to use with the Azure SDK. Read more about the adapter at https://github.com/Azure/azure-sdk-for-cpp/blob/main/doc/HttpTransportAdapter.md. Valid values are: default, curl*/
  azure_transport_option_type: string;

  /**@description: Cache Parquet metadata - useful when reading the same files multiple times*/
  parquet_metadata_cache: boolean;

  /**@description: Use the prefetching mechanism for all types of parquet files*/
  prefetch_all_parquet_files: boolean;

  /**@description: In Parquet files, interpret binary data as a string.*/
  binary_as_string: boolean;
}
