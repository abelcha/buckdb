// No specific imports needed from typedef for these declarations anymore
import { __serialize } from './src/serializer.ts'
import type { FilterKeys, SerializeOrdered, SerializeValue } from './src/serializer.ts'

type CompressionOptions = 'none' | 'gzip' | 'zstd' | 'lz4' | 'lz4_raw' | 'brotli' | 'auto'
// const __serialize = () =>
/** Options for the read-csv function, maintaining original camelCase naming and order. */
type ReadCsvOptions = {
    /** Skip type detection and assume all columns are of type `VARCHAR`. @default false */
    all_varchar?: boolean // Corresponds to all_varchar
    /** Allow the conversion of quoted values to `NULL` values. @default true */
    allow_quoted_nulls?: boolean // Corresponds to allow_quoted_nulls
    /** Auto detect CSV parameters. @see {@link https://duckdb.org/docs/stable/data/csv/auto_detection} @default true */
    auto_detect?: boolean // Corresponds to auto_detect
    /** Types that the sniffer uses when detecting column types. The `VARCHAR` type is always included as a fallback option. @see {@link https://duckdb.org/docs/stable/data/csv/auto_detection#auto_type_candidates-details} @default ['VARCHAR', 'BIGINT', 'DOUBLE', 'DATE', 'TIME', 'TIMESTAMP'] */
    auto_type_candidates?: string[] // Corresponds to auto_type_candidates
    /** Size of the buffers used to read files, in bytes. Must be large enough to hold four lines and can significantly impact performance. @default 16 * max_line_size */
    buffer_size?: number // Corresponds to buffer_size
    /** Alias for `names`. Column names, as a list. @see {@link https://duckdb.org/docs/stable/data/csv/tips#provide-names-if-the-file-does-not-contain-a-header} @default [] */
    column_names?: string[] // Corresponds to column_names (alias of names)
    /** Alias for `types`. Column types, as either a list (by position) or a struct (by name). @see {@link https://duckdb.org/docs/stable/data/csv/tips#override-the-types-of-specific-columns} @default {} or [] */
    column_types?: string[] | Record<string, string> // Corresponds to column_types (alias of types)
    /** Column names and types, as a struct (e.g., `{'col1': 'INTEGER', 'col2': 'VARCHAR'}`). Using this option disables auto detection. @default {} */
    columns?: Record<string, string> // Corresponds to columns
    /** Character used to initiate comments. Lines starting with a comment character (optionally preceded by space characters) are completely ignored; other lines containing a comment character are parsed only up to that point. @default '' */
    comment?: string // Corresponds to comment
    /** Method used to compress CSV files. By default this is detected automatically from the file extension (e.g., `t.csv.gz` will use gzip, `t.csv` will use `none`). @default 'auto' */
    compression?: CompressionOptions // Corresponds to compression
    /** Date format used when parsing and writing dates. @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat} @default '' */
    dateformat?: string // Corresponds to dateformat
    /** Decimal separator for numbers. @default '.' */
    decimal_separator?: string // Corresponds to decimal_separator
    /** Delimiter character used to separate columns within each line, e.g., `,` `;` `\t`. The delimiter character can be up to 4 bytes, e.g., 🦆. Alias for `sep`. @default ',' */
    delim?: string // Corresponds to delim
    /** Alias for `types`. Column types, as either a list (by position) or a struct (by name). @see {@link https://duckdb.org/docs/stable/data/csv/tips#override-the-types-of-specific-columns} @default {} or [] */
    dtypes?: string[] | Record<string, string> // Corresponds to dtypes (alias of types)
    /** Encoding used by the CSV file. Options are `utf-8`, `utf-16`, `latin-1`. Not available in the `COPY` statement (which always uses `utf-8`). @default 'utf-8' */
    encoding?: 'utf-8' | 'utf-16' | 'latin-1' // Corresponds to encoding
    /** String used to escape the `quote` character within quoted values. @default '"' */
    escape?: string // Corresponds to escape
    /** Add path of the containing file to each row, as a string column named `filename`. Relative or absolute paths are returned depending on the path or glob pattern provided to `read-csv`, not just filenames. @default false */
    filename?: boolean // Corresponds to filename
    force_match?: boolean // Not found in provided table description
    /** Do not match values in the specified columns against the `NULL` string. In the default case where the `NULL` string is empty, this means that empty values are read as zero-length strings instead of `NULL`s. @default [] */
    force_not_null?: string[] // Corresponds to force_not_null
    /** First line of each file contains the column names. @default false */
    header?: boolean // Corresponds to header
    /** Interpret the path as a [Hive partitioned path](https://duckdb.org/docs/stable/data/partitioning/hive_partitioning). @default false */
    hive_partitioning?: boolean // Corresponds to hive_partitioning
    // hiveTypes?: any; // Not found in provided table description
    // hiveTypesAutocast?: boolean; // Not found in provided table description
    /** Ignore any parsing errors encountered. @default false */
    ignore_errors?: boolean // Corresponds to ignore_errors
    /** Maximum line size, in bytes. Not available in the `COPY` statement. Alias: `maximumLineSize`. @default 2000000 */
    max_line_size?: number // Corresponds to max_line_size
    /** Alias for `maxLineSize`. Maximum line size, in bytes. Not available in the `COPY` statement. @default 2000000 */
    maximum_line_size?: number // Corresponds to maximum_line_size
    /** Column names, as a list. Alias: `columnNames`. @see {@link https://duckdb.org/docs/stable/data/csv/tips#provide-names-if-the-file-does-not-contain-a-header} @default [] */
    names?: string[] // Corresponds to names
    /** New line character(s). Options are `'\r'`,`'\n'`, or `'\r\n'`. The CSV parser only distinguishes between single-character and double-character line delimiters. Therefore, it does not differentiate between `'\r'` and `'\n'`. @default '' // Empty string likely means auto-detect or system default */
    new_line?: '\r' | '\n' | '\r\n' | '' // Corresponds to new_line
    /** Normalize column names. This removes any non-alphanumeric characters from them. Column names that are reserved SQL keywords are prefixed with an underscore character (`_`). @default false */
    normalize_names?: boolean // Corresponds to normalize_names
    /** Pad the remaining columns on the right with `NULL` values when a line lacks columns. @default false */
    null_padding?: boolean // Corresponds to null_padding
    /** Strings that represent a `NULL` value. Alias: `null`. @default '' */
    nullstr?: string | string[] // Corresponds to nullstr
    /** Use the parallel CSV reader. @default true */
    parallel?: boolean // Corresponds to parallel
    /** String used to quote values. @default '"' */
    quote?: string // Corresponds to quote
    /** Upper limit on the number of faulty lines per file that are recorded in the rejects table. Setting this to `0` means that no limit is applied. @default 0 */
    rejects_limit?: number // Corresponds to rejects_limit
    /** Name of the [temporary table where information on faulty scans is stored](https://duckdb.org/docs/stable/data/csv/reading_faulty_csv_files#reject-scans). @default 'reject_scans' */
    rejects_scan?: string // Corresponds to rejects_scan
    /** Name of the [temporary table where information on faulty lines is stored](https://duckdb.org/docs/stable/data/csv/reading_faulty_csv_files#reject-errors). @default 'reject_errors' */
    rejects_table?: string // Corresponds to rejects_table
    /** Number of sample lines for [auto detection of parameters](https://duckdb.org/docs/stable/data/csv/auto_detection). @default 20480 */
    sample_size?: number // Corresponds to sample_size
    /** Delimiter character used to separate columns within each line, e.g., `,` `;` `\t`. The delimiter character can be up to 4 bytes, e.g., 🦆. Alias for `delim`. @default ',' */
    sep?: string // Corresponds to sep
    /** Number of lines to skip at the start of each file. @default 0 */
    skip?: number // Corresponds to skip
    /** Skip any lines with errors and store them in the rejects table. @default false */
    store_rejects?: boolean // Corresponds to store_rejects
    /** Enforces the strictness level of the CSV Reader. When set to `true`, the parser will throw an error upon encountering any issues. When set to `false`, the parser will attempt to read structurally incorrect files. Use with caution. @default true */
    strict_mode?: boolean // Corresponds to strict_mode
    /** [Timestamp format](https://duckdb.org/docs/stable/sql/functions/dateformat) used when parsing and writing timestamps. Alias: `timestamp_format` (COPY statement only). @default '' */
    timestampformat?: string // Corresponds to timestampformat
    /** Column types, as either a list (by position) or a struct (by name). Alias: `dtypes`, `columnTypes`. @see {@link https://duckdb.org/docs/stable/data/csv/tips#override-the-types-of-specific-columns} @default {} or [] */
    types?: string[] | Record<string, string> // Corresponds to types
    /** Align columns from different files [by column name](https://duckdb.org/docs/stable/data/multiple_files/combining_schemas#union-by-name) instead of position. Using this option increases memory consumption. @default false */
    union_by_name?: boolean // Corresponds to union_by_name
    // --- Aliases not explicitly listed in original opts but covered by descriptions ---
    /** Alias for `dateformat`; only available in the `COPY` statement. @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat} @default '' */
    date_format?: string
    /** Alias for `delim`; only available in the `COPY` statement. @default ',' */
    delimiter?: string
    /** Alias for `nullstr`. @default '' */
    null?: string | string[]
    /** Alias for `timestampformat`; only available in the `COPY` statement. @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat} @default '' */
    timestamp_format?: string
} & {
    // Include properties from original opts that were not in the table, marked as any
    force_match?: boolean
    hive_types?: any
    hive_types_autocast?: boolean
}
type CsvKeys = ['all_varchar', 'allow_quoted_nulls', 'auto_detect', 'auto_type_candidates', 'buffer_size', 'column_names', 'column_types', 'columns', 'comment', 'compression', 'dateformat', 'decimal_separator', 'delim', 'dtypes', 'encoding', 'escape', 'filename', 'force_match', 'force_not_null', 'header', 'hive_partitioning', 'ignore_errors', 'max_line_size', 'maximum_line_size', 'names', 'new_line', 'normalize_names', 'null_padding', 'nullstr', 'parallel', 'quote', 'rejects_limit', 'rejects_scan', 'rejects_table', 'sample_size', 'sep', 'skip', 'store_rejects', 'strict_mode', 'timestampformat', 'types', 'union_by_name', 'date_format', 'delimiter', 'timestamp_format', 'force_match', 'hive_types', 'hive_types_autocast']
/**
 * Options for the read-json function, maintaining original camelCase naming and order from signature.
 */
type ReadJsonOptions = {
    /** Whether to auto-detect the names of the keys and data types of the values automatically. @default true */
    auto_detect?: boolean // Corresponds to auto_detect (BOOL)
    /** A struct that specifies the key names and value types contained within the JSON file (e.g., `{key1: 'INTEGER', key2: 'VARCHAR'}`). If `auto_detect` is enabled these will be inferred. @default {} */
    columns?: Record<string, string> // Corresponds to columns (STRUCT)
    /** Compression method (e.g., 'gzip'). Not in table, using VARCHAR from signature. */
    compression?: CompressionOptions // Not in table, using DVarcharable -> string
    /** Convert strings to integers. Not in table, using BOOL from signature. */
    convert_strings_to_integers?: boolean // Not in table, using DBoolable -> boolean
    /** Alias for dateformat. Not in table, using VARCHAR from signature. @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat} */
    date_format?: string // Not in table, using DVarcharable -> string
    /** Specifies the date format to use when parsing dates. @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat} @default 'iso' */
    dateformat?: string // Corresponds to dateformat (VARCHAR)
    /** The JSON reader divides the number of appearances of each JSON field by the auto-detection sample size. If the average over the fields of an object is less than this threshold, it will default to using a `MAP` type with value type of merged field types. @default 0.1 */
    field_appearance_threshold?: number // Corresponds to field_appearance_threshold (DOUBLE)
    /** Add filename column. Not in table, using ANY | BIGINT from signature -> boolean | number | bigint. Assuming boolean based on read-csv. */
    filename?: boolean // Not in table, guessing boolean based on read-csv
    /** JSON format (e.g., 'auto', 'newline_delimited', 'array'). Not in table, using VARCHAR | BIGINT from signature -> string | number | bigint. Assuming string. */
    format?: 'auto' | 'newline_delimited' | 'array' | string // Not in table, guessing string options
    /** Hive partitioning. Not in table, using BOOL | VARCHAR from signature -> boolean | string. Assuming boolean based on read-csv. */
    hive_partitioning?: boolean // Not in table, guessing boolean based on read-csv
    /** Hive types. Not in table, using ANY | DOUBLE from signature -> any. */
    hive_types?: any // Not in table, using any
    /** Hive types autocast. Not in table, using BOOL | VARCHAR from signature -> boolean | string. Assuming boolean based on read-csv. */
    hive_types_autocast?: boolean // Not in table, guessing boolean based on read-csv
    /** Ignore errors. Not in table, using BOOL | UINTEGER from signature -> boolean | number. Assuming boolean based on read-csv. */
    ignore_errors?: boolean // Not in table, guessing boolean based on read-csv
    /** Controls the threshold for number of columns whose schema will be auto-detected; if JSON schema auto-detection would infer a `STRUCT` type for a field that has *more* than this threshold number of subfields, it infers a `MAP` type instead. Set to `-1` to disable `MAP` inference. @default 200 */
    map_inference_threshold?: number // Corresponds to map_inference_threshold (BIGINT)
    /** Maximum nesting depth to which the automatic schema detection detects types. Set to -1 to fully detect nested JSON types. @default -1 */
    maximum_depth?: number // Corresponds to maximum_depth (BIGINT)
    /** Maximum object size. Not in table, using UINTEGER | BOOL from signature -> number | boolean. Assuming number. */
    maximum_object_size?: number // Not in table, guessing number
    /** Maximum sample files. Not in table, using BIGINT from signature -> number. */
    maximum_sample_files?: number // Not in table, using number
    /** Can be one of `auto`, `true`, `false`. @default 'auto' */
    records?: 'auto' | boolean // Corresponds to records (VARCHAR), mapping 'true'/'false' strings to boolean
    /** Option to define number of sample objects for automatic JSON type detection. Set to -1 to scan the entire input file. @default 20480 */
    sample_size?: number // Corresponds to sample_size (UBIGINT -> number | bigint)
    /** Alias for timestampformat. Specifies the date format to use when parsing timestamps. @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat} @default 'iso' */
    timestamp_format?: string // Alias for timestampformat (VARCHAR)
    /** Specifies the date format to use when parsing timestamps. @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat} @default 'iso' */
    timestampformat?: string // Corresponds to timestampformat (VARCHAR)
    /** Whether the schema's of multiple JSON files should be [unified](https://duckdb.org/docs/stable/data/multiple_files/combining_schemas). @default false */
    union_by_name?: boolean // Corresponds to union_by_name (BOOL)
}
type JsonReadKeys = ['auto_detect', 'columns', 'compression', 'convert_strings_to_integers', 'date_format', 'dateformat', 'field_appearance_threshold', 'filename', 'format', 'hive_partitioning', 'hive_types', 'hive_types_autocast', 'ignore_errors', 'map_inference_threshold', 'maximum_depth', 'maximum_object_size', 'maximum_sample_files', 'records', 'sample_size', 'timestamp_format', 'timestampformat', 'union_by_name']
/**
 /** Options for the read-json_objects function, maintaining original camelCase naming and order from signature. */
type ReadJsonObjectsOptions = {
    /** The compression type for the file. By default this will be detected automatically from the file extension (e.g., `t.json.gz` will use gzip, `t.json` will use none). Options are `none`, `gzip`, `zstd` and `auto_detect`. @default 'auto_detect' */
    compression?: CompressionOptions // Corresponds to compression (VARCHAR)
    /** Whether or not an extra `filename` column should be included in the result. @default false */
    filename?: boolean // Corresponds to filename (BOOL)
    /** Can be one of `auto`, `unstructured`, `newline_delimited` and `array`. @default 'array' */
    format?: 'auto' | 'unstructured' | 'newline_delimited' | 'array' // Corresponds to format (VARCHAR)
    /** Whether or not to interpret the path as a [Hive partitioned path](https://duckdb.org/docs/stable/data/partitioning/hive_partitioning). @default false */
    hive_partitioning?: boolean // Corresponds to hive_partitioning (BOOL)
    /** Hive types. Not in table, using ANY | BOOL from signature -> any. */
    hive_types?: any // Not in table, using any
    /** Hive types autocast. Not in table, using BOOL from signature -> boolean. */
    hive_types_autocast?: boolean // Not in table, using boolean
    /** Whether to ignore parse errors (only possible when `format` is `newline_delimited`). @default false */
    ignore_errors?: boolean // Corresponds to ignore_errors (BOOL)
    /** The maximum size of a JSON object (in bytes). @default 16777216 */
    maximum_object_size?: number // Corresponds to maximum_object_size (UINTEGER -> number)
    /** The maximum number of JSON files sampled for auto-detection. Not in signature, using BIGINT from table -> number. @default 32 */
    maximum_sample_files?: number // Corresponds to maximum_sample_files (BIGINT)
    /** Union by name. Not in table, using ANY | BOOL from signature -> boolean. */
    union_by_name?: boolean // Not in table, using boolean
}
type JsonReadObjectsKeys = ['compression', 'filename', 'format', 'hive_partitioning', 'hive_types', 'hive_types_autocast', 'ignore_errors', 'maximum_object_size', 'maximum_sample_files', 'union_by_name']
/** Options for the read-parquet function, maintaining original camelCase naming and order from signature. */
type ReadParquetOptions = {
    /** Parquet files generated by legacy writers do not correctly set the `UTF8` flag for strings, causing string columns to be loaded as `BLOB` instead. Set this to true to load binary columns as strings. @default false */
    binary_as_string?: boolean // Corresponds to binary_as_string (BOOL)
    /** Compression. Not in table, using VARCHAR | BOOL from signature -> string | boolean. Assuming string. */
    compression?: CompressionOptions // Not in table, guessing string
    /** Debug use OpenSSL. Not in table, using BOOL from signature -> boolean. */
    debug_use_openssl?: boolean // Not in table, using boolean
    /** Configuration for [Parquet encryption](https://duckdb.org/docs/stable/data/parquet/encryption). @default - (No default specified) */
    encryption_config?: Record<string, any> // Corresponds to encryption_config (STRUCT)
    /** Explicit cardinality. Not in table, using UBIGINT | ANY from signature -> number | any. Assuming any. */
    explicit_cardinality?: any // Not in table, using any
    /** Whether or not to include the `file_row_number` column. @default false */
    file_row_number?: boolean // Corresponds to file_row_number (BOOL)
    /** Whether or not an extra `filename` column should be included in the result. @default false */
    filename?: boolean // Corresponds to filename (BOOL)
    /** Whether or not to interpret the path as a [Hive partitioned path](https://duckdb.org/docs/stable/data/partitioning/hive_partitioning). @default true */
    hive_partitioning?: boolean // Corresponds to hive_partitioning (BOOL)
    /** Hive types. Not in table, using ANY | BOOL from signature -> any. */
    hive_types?: any // Not in table, using any
    /** Hive types autocast. Not in table, using BOOL | ANY from signature -> boolean | any. Assuming boolean. */
    hive_types_autocast?: boolean // Not in table, guessing boolean
    /** Parquet version. Not in table, using VARCHAR | BOOL from signature -> string | boolean. Assuming string. */
    parquet_version?: string // Not in table, guessing string
    /** Schema. Not in table, using ANY | BOOL from signature -> any. */
    schema?: any // Not in table, using any
    /** Whether the columns of multiple schemas should be [unified by name](https://duckdb.org/docs/stable/data/multiple_files/combining_schemas), rather than by position. @default false */
    union_by_name?: boolean // Corresponds to union_by_name (BOOL)
}
type ParquetKeys = ['binary_as_string', 'compression', 'debug_use_openssl', 'encryption_config', 'explicit_cardinality', 'file_row_number', 'filename', 'hive_partitioning', 'hive_types', 'hive_types_autocast', 'parquet_version', 'schema', 'union_by_name']
/**
 * Options for the delta_scan function, inferred from signature.
 */
type DeltaScanOptions = {
    binary_as_string?: boolean
    compression?: CompressionOptions // VARCHAR | ANY -> string | any
    debug_use_openssl?: boolean | any // BOOLEAN | ANY -> boolean | any
    delta_file_number?: boolean
    encryption_config?: any
    explicit_cardinality?: boolean | number | bigint // UBIGINT | BOOLEAN -> number | boolean
    file_row_number?: boolean
    filename?: boolean | any // ANY | BOOLEAN -> boolean | any
    hive_partitioning?: boolean | string // BOOLEAN | VARCHAR -> boolean | string
    hive_types?: string | any // ANY | VARCHAR -> string | any
    hive_types_autocast?: boolean
    parquet_version?: string | number | bigint // VARCHAR | UBIGINT -> string | number | bigint
    pushdown_filters?: string // VARCHAR -> string
    pushdown_partition_info?: boolean
    union_by_name?: boolean
}
type DeltaScanKeys = ['binary_as_string', 'compression', 'debug_use_openssl', 'delta_file_number', 'encryption_config', 'explicit_cardinality', 'file_row_number', 'filename', 'hive_partitioning', 'hive_types', 'hive_types_autocast', 'parquet_version', 'pushdown_filters', 'pushdown_partition_info', 'union_by_name']
/**
 * Options for the iceberg_metadata function.
 */
type IcebergMetadataOptions = {
    allow_moved_paths?: boolean
    metadata_compression_codec?: string
    skip_schema_inference?: boolean
    version_name_format?: string
    version?: string
}

type IcebergMetadataKeys = ['allow_moved_paths', 'metadata_compression_codec', 'skip_schema_inference', 'version_name_format', 'version']

/**
 * Options for the iceberg_scan function.
 */
type IcebergScanOptions = {
    version_name_format?: string
    snapshot_from_timestamp?: Date | string
    version?: string
    metadata_compression_codec?: string
    allow_moved_paths?: boolean
    skip_schema_inference?: boolean
    mode?: string
    hive_types_autocast?: boolean
    snapshot_from_id?: string
    hive_partitioning?: boolean
    hive_types?: boolean
    compression?: CompressionOptions
    explicit_cardinality?: number | bigint
    union_by_name?: number | bigint
    debug_use_openssl?: string
    binary_as_string?: boolean
    filename?: number | bigint
    parquet_version?: string
    file_row_number?: string
    encryption_config?: boolean
}

type IcebergScanKeys = ['version_name_format', 'snapshot_from_timestamp', 'version', 'metadata_compression_codec', 'allow_moved_paths', 'skip_schema_inference', 'mode', 'hive_types_autocast', 'snapshot_from_id', 'hive_partitioning', 'hive_types', 'compression', 'explicit_cardinality', 'union_by_name', 'debug_use_openssl', 'binary_as_string', 'filename', 'parquet_version', 'file_row_number', 'encryption_config']

/**
 * Options for the iceberg_snapshots function.
 */
type IcebergSnapshotsOptions = {
    skip_schema_inference?: boolean
    version_name_format?: string
    version?: string
    metadata_compression_codec?: string
}

type IcebergSnapshotsKeys = ['skip_schema_inference', 'version_name_format', 'version', 'metadata_compression_codec']

/**
 * Options for the ST_Read function.
 * Read and import a variety of geospatial file formats using the GDAL library.
 */
type STReadOptions = {
    /** If set, return geometries in a wkb_geometry column with type WKB_BLOB instead of GEOMETRY */
    keep_wkb?: boolean
    /** Maximum batch size for reading */
    max_batch_size?: number
    /** Scan through all layers sequentially and return first matching layer. Required for some drivers (e.g. OSM) */
    sequential_layer_scan?: boolean
    /** Layer name or index (0-based) to read. If NULL, first layer is returned */
    layer?: string
    /** List of sibling files required to open the file */
    sibling_files?: string[]
    /** WKB blob to filter rows that intersect with given geometry */
    spatial_filter?: any
    /** BOX_2D to filter rows that intersect with given bounding box */
    spatial_filter_box?: any
    /** List of allowed GDAL driver names. If empty, all drivers allowed */
    allowed_drivers?: string[]
    /** Key-value pairs passed to GDAL driver to control file opening */
    open_options?: string[]
}

type STReadKeys = ['keep_wkb', 'max_batch_size', 'sequential_layer_scan', 'layer', 'sibling_files', 'spatial_filter', 'spatial_filter_box', 'allowed_drivers', 'open_options']

/**
 * Options for the ST_ReadSHP function.
 */
type STReadSHPOptions = {
    /** Character encoding for DBF file */
    encoding?: string
}

type STReadSHPKeys = ['encoding']

/**
 * Options for the analyze_sheet function.
 * Analyzes the column structure of a single worksheet in a single file.
 */
type AnalyzeSheetOptions = {
    /** Worksheet name (supports wildcards like Sheet*). @default first sheet */
    sheet?: string
    /** Data range in format [start_col][start_row]:[end_col][end_row] (e.g., 'A1:C10') */
    range?: string
    /** Whether the first row contains column headers. @default true */
    header?: boolean
    /** Number of rows to analyze for type inference. @default 10 */
    analyze_rows?: number
    /** If true, convert parsing errors to NULL instead of failing. @default false */
    error_as_null?: boolean
}

type AnalyzeSheetKeys = ['sheet', 'range', 'header', 'analyze_rows', 'error_as_null']

/**
 * Options for the read_sheet function.
 * Reads data from a single worksheet in a single file.
 */
type ReadSheetOptions = AnalyzeSheetOptions & {
    /** Skip rows where all columns contain empty values. @default false */
    skip_empty_rows?: boolean
    /** Stop reading at the first completely empty row. @default false */
    end_at_empty_row?: boolean
    /** Column names and types, as a struct (e.g., {'col1': 'BIGINT', 'col2': 'VARCHAR'}). */
    columns?: Record<string, string>
}

type ReadSheetKeys = ['sheet', 'range', 'header', 'analyze_rows', 'error_as_null', 'skip_empty_rows', 'end_at_empty_row', 'columns']

/**
 * Options for the analyze_sheets function.
 * Analyzes column structures of multiple worksheets across multiple files with wildcard pattern matching.
 */
type AnalyzeSheetsOptions = {
    /** List of worksheet names (supports wildcards and file-specific patterns like ['Sheet*'], ['*.xlsx=Sheet*']) */
    sheets?: string[]
    /** Data range in format [start_col][start_row]:[end_col][end_row] (e.g., 'A1:C10') */
    range?: string
    /** Whether the first row contains column headers. @default true */
    header?: boolean
    /** Number of rows to analyze for type inference. @default 10 */
    analyze_rows?: number
    /** If true, convert parsing errors to NULL instead of failing. @default false */
    error_as_null?: boolean
}

type AnalyzeSheetsKeys = ['sheets', 'range', 'header', 'analyze_rows', 'error_as_null']

/**
 * Options for the read_sheets function.
 * Reads data from multiple worksheets across multiple files with wildcard pattern matching.
 */
type ReadSheetsOptions = AnalyzeSheetsOptions & {
    /** Skip rows where all columns contain empty values. @default false */
    skip_empty_rows?: boolean
    /** Stop reading at the first completely empty row. @default false */
    end_at_empty_row?: boolean
    /** Column name to include file source information in results */
    file_name_column?: string
    /** Column name to include worksheet source information in results */
    sheet_name_column?: string
    /** When false, union data by position; when true, union data by column name. @default false */
    union_by_name?: boolean
    /** Column names and types, as a struct (e.g., {'col1': 'BIGINT', 'col2': 'VARCHAR'}). */
    columns?: Record<string, string>
}

type ReadSheetsKeys = ['sheets', 'range', 'header', 'analyze_rows', 'error_as_null', 'skip_empty_rows', 'end_at_empty_row', 'file_name_column', 'sheet_name_column', 'union_by_name', 'columns']

/**
 * Options for the read_xlsx function from the Excel extension.
 * Reads Excel .xlsx files.
 */
type ReadXlsxOptions = {
    /** Whether to treat the first row as containing the names of the resulting columns. @default automatically inferred */
    header?: boolean
    /** The name of the sheet in the xlsx file to read. @default first sheet */
    sheet?: string
    /** Whether to read all cells as containing VARCHARs. @default false */
    all_varchar?: boolean
    /** Whether to ignore errors and silently replace cells that can't be cast to the corresponding inferred column type with NULLs. @default false */
    ignore_errors?: boolean
    /** The range of cells to read (e.g., 'A1:B2'). @default automatically inferred */
    range?: string
    /** Whether to stop reading the file when an empty row is encountered. If an explicit range option is provided, this is false by default, otherwise true. @default false/true */
    stop_at_empty?: boolean
    /** Whether to treat empty cells as VARCHAR instead of DOUBLE when trying to automatically infer column types. @default false */
    empty_as_varchar?: boolean
}

type ReadXlsxKeys = ['header', 'sheet', 'all_varchar', 'ignore_errors', 'range', 'stop_at_empty', 'empty_as_varchar']

type RetCon<S extends string, K extends readonly string[], F, U extends Record<string, any>> = keyof U extends undefined ? `${S}(${SerializeValue<F>})`
    : `${S}(${SerializeValue<F>},${SerializeOrdered<FilterKeys<K, U>, U>})`
type Fnx = {
    read_csv<const F extends string>(args: F): RetCon<'read_csv', CsvKeys, [F], {}>
    read_csv<const F extends readonly string[]>(...args: F[]): RetCon<'read_csv', CsvKeys, F, {}>
    read_csv<const F extends string[], const U extends ReadCsvOptions>(...args: [...F, U]): RetCon<'read_csv', CsvKeys, F, U>
    read_csv<const F extends readonly string[], const U extends ReadCsvOptions>(...args: [...F[], U]): RetCon<'read_csv', CsvKeys, F, U>
    read_json<const F extends string>(args: F): RetCon<'read_json', JsonReadKeys, [F], {}>
    read_json<const F extends readonly string[]>(...args: F[]): RetCon<'read_json', JsonReadKeys, F, {}>
    read_json<const F extends string[], const U extends ReadJsonOptions>(...args: [...F, U]): RetCon<'read_json', JsonReadKeys, F, U>
    read_json<const F extends readonly string[], const U extends ReadJsonOptions>(...args: [...F[], U]): RetCon<'read_json', JsonReadKeys, F, U>
    read_json_objects<const F extends string>(args: F): RetCon<'read_json_objects', JsonReadObjectsKeys, [F], {}>
    read_json_objects<const F extends readonly string[]>(...args: F[]): RetCon<'read_json_objects', JsonReadObjectsKeys, F, {}>
    read_json_objects<const F extends string[], const U extends ReadJsonObjectsOptions>(...args: [...F, U]): RetCon<'read_json_objects', JsonReadObjectsKeys, F, U>
    read_json_objects<const F extends readonly string[], const U extends ReadJsonObjectsOptions>(...args: [...F[], U]): RetCon<'read_json_objects', JsonReadObjectsKeys, F, U>
    read_parquet<const F extends string>(args: F): RetCon<'read_parquet', ParquetKeys, [F], {}>
    read_parquet<const F extends readonly string[]>(...args: F[]): RetCon<'read_parquet', ParquetKeys, F, {}>
    read_parquet<const F extends string[], const U extends ReadParquetOptions>(...args: [...F, U]): RetCon<'read_parquet', ParquetKeys, F, U>
    read_parquet<const F extends readonly string[], const U extends ReadParquetOptions>(...args: [...F[], U]): RetCon<'read_parquet', ParquetKeys, F, U>
    delta_scan<const F extends string>(args: F): RetCon<'delta_scan', DeltaScanKeys, [F], {}>
    delta_scan<const F extends readonly string[]>(...args: F[]): RetCon<'delta_scan', DeltaScanKeys, F, {}>
    delta_scan<const F extends string[], const U extends DeltaScanOptions>(...args: [...F, U]): RetCon<'delta_scan', DeltaScanKeys, F, U>
    delta_scan<const F extends readonly string[], const U extends DeltaScanOptions>(...args: [...F[], U]): RetCon<'delta_scan', DeltaScanKeys, F, U>
    parquet_scan<const F extends string>(args: F): RetCon<'parquet_scan', ParquetKeys, [F], {}>
    parquet_scan<const F extends readonly string[]>(...args: F[]): RetCon<'parquet_scan', ParquetKeys, F, {}>
    parquet_scan<const F extends string[], const U extends ReadParquetOptions>(...args: [...F, U]): RetCon<'parquet_scan', ParquetKeys, F, U>
    parquet_scan<const F extends readonly string[], const U extends ReadParquetOptions>(...args: [...F[], U]): RetCon<'parquet_scan', ParquetKeys, F, U>
    read_xlsx<const F extends string>(args: F): RetCon<'read_xlsx', ReadXlsxKeys, [F], {}>
    read_xlsx<const F extends readonly string[]>(...args: F[]): RetCon<'read_xlsx', ReadXlsxKeys, F, {}>
    read_xlsx<const F extends string[], const U extends ReadXlsxOptions>(...args: [...F, U]): RetCon<'read_xlsx', ReadXlsxKeys, F, U>
    read_xlsx<const F extends readonly string[], const U extends ReadXlsxOptions>(...args: [...F[], U]): RetCon<'read_xlsx', ReadXlsxKeys, F, U>
    read_text<const F extends string>(args: F): RetCon<'read_text', [], [F], {}>
    read_text<const F extends readonly string[]>(...args: F[]): RetCon<'read_text', [], F, {}>
    read_text<const F extends string[]>(...args: [...F, {}]): RetCon<'read_text', [], F, {}>
    read_text<const F extends readonly string[]>(...args: [...F[], {}]): RetCon<'read_text', [], F, {}>
    iceberg_metadata<const F extends string>(args: F): RetCon<'iceberg_metadata', IcebergMetadataKeys, [F], {}>
    iceberg_metadata<const F extends readonly string[]>(...args: F[]): RetCon<'iceberg_metadata', IcebergMetadataKeys, F, {}>
    iceberg_metadata<const F extends string[], const U extends IcebergMetadataOptions>(...args: [...F, U]): RetCon<'iceberg_metadata', IcebergMetadataKeys, F, U>
    iceberg_metadata<const F extends readonly string[], const U extends IcebergMetadataOptions>(...args: [...F[], U]): RetCon<'iceberg_metadata', IcebergMetadataKeys, F, U>
    iceberg_scan<const F extends string>(args: F): RetCon<'iceberg_scan', IcebergScanKeys, [F], {}>
    iceberg_scan<const F extends readonly string[]>(...args: F[]): RetCon<'iceberg_scan', IcebergScanKeys, F, {}>
    iceberg_scan<const F extends string[], const U extends IcebergScanOptions>(...args: [...F, U]): RetCon<'iceberg_scan', IcebergScanKeys, F, U>
    iceberg_scan<const F extends readonly string[], const U extends IcebergScanOptions>(...args: [...F[], U]): RetCon<'iceberg_scan', IcebergScanKeys, F, U>
    iceberg_snapshots<const F extends string>(args: F): RetCon<'iceberg_snapshots', IcebergSnapshotsKeys, [F], {}>
    iceberg_snapshots<const F extends readonly string[]>(...args: F[]): RetCon<'iceberg_snapshots', IcebergSnapshotsKeys, F, {}>
    iceberg_snapshots<const F extends string[], const U extends IcebergSnapshotsOptions>(...args: [...F, U]): RetCon<'iceberg_snapshots', IcebergSnapshotsKeys, F, U>
    iceberg_snapshots<const F extends readonly string[], const U extends IcebergSnapshotsOptions>(...args: [...F[], U]): RetCon<'iceberg_snapshots', IcebergSnapshotsKeys, F, U>
    ST_Read<const F extends string>(args: F): RetCon<'ST_Read', STReadKeys, [F], {}>
    ST_Read<const F extends readonly string[]>(...args: F[]): RetCon<'ST_Read', STReadKeys, F, {}>
    ST_Read<const F extends string[], const U extends STReadOptions>(...args: [...F, U]): RetCon<'ST_Read', STReadKeys, F, U>
    ST_Read<const F extends readonly string[], const U extends STReadOptions>(...args: [...F[], U]): RetCon<'ST_Read', STReadKeys, F, U>
    ST_Read_Meta<const F extends string>(args: F): RetCon<'ST_Read_Meta', [], [F], {}>
    ST_Read_Meta<const F extends readonly string[]>(...args: F[]): RetCon<'ST_Read_Meta', [], F, {}>
    ST_ReadOsm<const F extends string>(args: F): RetCon<'ST_ReadOsm', [], [F], {}>
    ST_ReadOsm<const F extends readonly string[]>(...args: F[]): RetCon<'ST_ReadOsm', [], F, {}>
    ST_ReadSHP<const F extends string>(args: F): RetCon<'ST_ReadSHP', STReadSHPKeys, [F], {}>
    ST_ReadSHP<const F extends readonly string[]>(...args: F[]): RetCon<'ST_ReadSHP', STReadSHPKeys, F, {}>
    ST_ReadSHP<const F extends string[], const U extends STReadSHPOptions>(...args: [...F, U]): RetCon<'ST_ReadSHP', STReadSHPKeys, F, U>
    ST_ReadSHP<const F extends readonly string[], const U extends STReadSHPOptions>(...args: [...F[], U]): RetCon<'ST_ReadSHP', STReadSHPKeys, F, U>
    read_sheet<const F extends string>(args: F): RetCon<'read_sheet', ReadSheetKeys, [F], {}>
    read_sheet<const F extends string[], const U extends ReadSheetOptions>(...args: [...F, U]): RetCon<'read_sheet', ReadSheetKeys, F, U>
    read_sheets<const F extends readonly string[]>(...args: F[]): RetCon<'read_sheets', ReadSheetsKeys, F, {}>
    read_sheets<const F extends readonly string[], const U extends ReadSheetsOptions>(...args: [...F[], U]): RetCon<'read_sheets', ReadSheetsKeys, F, U>
    analyze_sheet<const F extends string>(args: F): RetCon<'analyze_sheet', AnalyzeSheetKeys, [F], {}>
    analyze_sheet<const F extends string[], const U extends AnalyzeSheetOptions>(...args: [...F, U]): RetCon<'analyze_sheet', AnalyzeSheetKeys, F, U>
    analyze_sheets<const F extends readonly string[]>(...args: F[]): RetCon<'analyze_sheets', AnalyzeSheetsKeys, F, {}>
    analyze_sheets<const F extends readonly string[], const U extends AnalyzeSheetsOptions>(...args: [...F[], U]): RetCon<'analyze_sheets', AnalyzeSheetsKeys, F, U>
}
/** Helper function to serialize function calls with optional options object. */
const fnSerial = (name = '', args: any[]) => {
    let opts = {}
    const last = args[args.length - 1]
    if (typeof last === 'object' && last !== null && !Array.isArray(last)) {
        opts = args.pop() || {}
    }
    // todo: test consequence of removing the [''] for single string argument
    let source = name === 'read_xlsx' && args.length === 1 ? `"${args[0]}"` : `[${args.map((e = '') => `'${e}'`)}]`
    if (!Object.keys(opts).length) {
        return `${name}(${source})`
    }
    return `${name}(${source},${__serialize(opts)})`
}
/** Collection of functions for reading various file formats, serialized for query building. */
const Fncx = {
    read_csv: (...args: any) => fnSerial('read_csv', args),
    read_json: (...args: any) => fnSerial('read_json', args),
    read_json_objects: (...args: any) => fnSerial('read_json_objects', args),
    read_parquet: (...args: any) => fnSerial('read_parquet', args),
    delta_scan: (...args: any) => fnSerial('delta_scan', args),
    parquet_scan: (...args: any) => fnSerial('parquet_scan', args),
    read_xlsx: (...args: any) => fnSerial('read_xlsx', args),
    read_text: (...args: any) => fnSerial('read_text', args),
    iceberg_metadata: (...args: any) => fnSerial('iceberg_metadata', args),
    iceberg_scan: (...args: any) => fnSerial('iceberg_scan', args),
    iceberg_snapshots: (...args: any) => fnSerial('iceberg_snapshots', args),
    ST_Read: (...args: any) => fnSerial('ST_Read', args),
    ST_Read_Meta: (...args: any) => fnSerial('ST_Read_Meta', args),
    ST_ReadOsm: (...args: any) => fnSerial('ST_ReadOsm', args),
    ST_ReadSHP: (...args: any) => fnSerial('ST_ReadSHP', args),
    read_sheet: (...args: any) => fnSerial('read_sheet', args),
    read_sheets: (...args: any) => fnSerial('read_sheets', args),
    analyze_sheet: (...args: any) => fnSerial('analyze_sheet', args),
    analyze_sheets: (...args: any) => fnSerial('analyze_sheets', args),
} as unknown as Fnx



export const read_csv = Fncx.read_csv
export const read_json = Fncx.read_json
export const read_json_objects = Fncx.read_json_objects
export const read_parquet = Fncx.read_parquet
export const delta_scan = Fncx.delta_scan
export const parquet_scan = Fncx.parquet_scan
export const read_xlsx = Fncx.read_xlsx
export const read_text = Fncx.read_text
export const iceberg_metadata = Fncx.iceberg_metadata
export const iceberg_scan = Fncx.iceberg_scan
export const iceberg_snapshots = Fncx.iceberg_snapshots
export const ST_Read = Fncx.ST_Read
export const ST_Read_Meta = Fncx.ST_Read_Meta
export const ST_ReadOsm = Fncx.ST_ReadOsm
export const ST_ReadSHP = Fncx.ST_ReadSHP
export const read_sheet = Fncx.read_sheet
export const read_sheets = Fncx.read_sheets
export const analyze_sheet = Fncx.analyze_sheet
export const analyze_sheets = Fncx.analyze_sheets
