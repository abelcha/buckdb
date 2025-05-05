// No specific imports needed from typedef for these declarations anymore

import { isPlainObject, last } from "es-toolkit";
import { __serialize, serialize, Serialize, SerializeValue } from "./serializer";
import { wrap } from "./utils";

/**
 * Options for the read_csv function, maintaining original camelCase naming and order.
 */
export type ReadCsvOptions = {
  /**
   * Skip type detection and assume all columns are of type `VARCHAR`.
   * @default false
   */
  all_varchar?: boolean; // Corresponds to all_varchar

  /**
   * Allow the conversion of quoted values to `NULL` values.
   * @default true
   */
  allow_quoted_nulls?: boolean; // Corresponds to allow_quoted_nulls

  /**
   * Auto detect CSV parameters.
   * @see {@link https://duckdb.org/docs/stable/data/csv/auto_detection}
   * @default true
   */
  auto_detect?: boolean; // Corresponds to auto_detect

  /**
   * Types that the sniffer uses when detecting column types. The `VARCHAR` type is always included as a fallback option.
   * @see {@link https://duckdb.org/docs/stable/data/csv/auto_detection#auto_type_candidates-details}
   * @default ['VARCHAR', 'BIGINT', 'DOUBLE', 'DATE', 'TIME', 'TIMESTAMP']
   */
  auto_type_candidates?: string[]; // Corresponds to auto_type_candidates

  /**
   * Size of the buffers used to read files, in bytes. Must be large enough to hold four lines and can significantly impact performance.
   * @default 16 * max_line_size
   */
  buffer_size?: number; // Corresponds to buffer_size

  /**
   * Alias for `names`. Column names, as a list.
   * @see {@link https://duckdb.org/docs/stable/data/csv/tips#provide-names-if-the-file-does-not-contain-a-header}
   * @default []
   */
  column_names?: string[]; // Corresponds to column_names (alias of names)

  /**
   * Alias for `types`. Column types, as either a list (by position) or a struct (by name).
   * @see {@link https://duckdb.org/docs/stable/data/csv/tips#override-the-types-of-specific-columns}
   * @default {} or []
   */
  column_types?: string[] | Record<string, string>; // Corresponds to column_types (alias of types)

  /**
   * Column names and types, as a struct (e.g., `{'col1': 'INTEGER', 'col2': 'VARCHAR'}`). Using this option disables auto detection.
   * @default {}
   */
  columns?: Record<string, string>; // Corresponds to columns

  /**
   * Character used to initiate comments. Lines starting with a comment character (optionally preceded by space characters) are completely ignored; other lines containing a comment character are parsed only up to that point.
   * @default ''
   */
  comment?: string; // Corresponds to comment

  /**
   * Method used to compress CSV files. By default this is detected automatically from the file extension (e.g., `t.csv.gz` will use gzip, `t.csv` will use `none`).
   * @default 'auto'
   */
  compression?: 'none' | 'gzip' | 'zstd' | 'auto'; // Corresponds to compression

  /**
   * Date format used when parsing and writing dates.
   * @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat}
   * @default ''
   */
  dateformat?: string; // Corresponds to dateformat

  /**
   * Decimal separator for numbers.
   * @default '.'
   */
  decimalSeparator?: string; // Corresponds to decimal_separator

  /**
   * Delimiter character used to separate columns within each line, e.g., `,` `;` `\t`. The delimiter character can be up to 4 bytes, e.g., 🦆. Alias for `sep`.
   * @default ','
   */
  delim?: string; // Corresponds to delim

  /**
   * Alias for `types`. Column types, as either a list (by position) or a struct (by name).
   * @see {@link https://duckdb.org/docs/stable/data/csv/tips#override-the-types-of-specific-columns}
   * @default {} or []
   */
  dtypes?: string[] | Record<string, string>; // Corresponds to dtypes (alias of types)

  /**
   * Encoding used by the CSV file. Options are `utf-8`, `utf-16`, `latin-1`. Not available in the `COPY` statement (which always uses `utf-8`).
   * @default 'utf-8'
   */
  encoding?: 'utf-8' | 'utf-16' | 'latin-1'; // Corresponds to encoding

  /**
   * String used to escape the `quote` character within quoted values.
   * @default '"'
   */
  escape?: string; // Corresponds to escape

  /**
   * Add path of the containing file to each row, as a string column named `filename`. Relative or absolute paths are returned depending on the path or glob pattern provided to `read_csv`, not just filenames.
   * @default false
   */
  filename?: boolean; // Corresponds to filename

  // forceMatch?: boolean; // Not found in provided table description

  /**
   * Do not match values in the specified columns against the `NULL` string. In the default case where the `NULL` string is empty, this means that empty values are read as zero-length strings instead of `NULL`s.
   * @default []
   */
  force_not_null?: string[]; // Corresponds to force_not_null

  /**
   * First line of each file contains the column names.
   * @default false
   */
  header?: boolean; // Corresponds to header

  /**
   * Interpret the path as a [Hive partitioned path](https://duckdb.org/docs/stable/data/partitioning/hive_partitioning).
   * @default false
   */
  hive_partitioning?: boolean; // Corresponds to hive_partitioning

  // hiveTypes?: any; // Not found in provided table description
  // hiveTypesAutocast?: boolean; // Not found in provided table description

  /**
   * Ignore any parsing errors encountered.
   * @default false
   */
  ignore_errors?: boolean; // Corresponds to ignore_errors

  /**
   * Maximum line size, in bytes. Not available in the `COPY` statement. Alias: `maximumLineSize`.
   * @default 2000000
   */
  max_line_size?: number; // Corresponds to max_line_size

  /**
  * Alias for `maxLineSize`. Maximum line size, in bytes. Not available in the `COPY` statement.
  * @default 2000000
  */
  maximum_line_size?: number; // Corresponds to maximum_line_size

  /**
   * Column names, as a list. Alias: `columnNames`.
   * @see {@link https://duckdb.org/docs/stable/data/csv/tips#provide-names-if-the-file-does-not-contain-a-header}
   * @default []
   */
  names?: string[]; // Corresponds to names

  /**
   * New line character(s). Options are `'\r'`,`'\n'`, or `'\r\n'`. The CSV parser only distinguishes between single-character and double-character line delimiters. Therefore, it does not differentiate between `'\r'` and `'\n'`.
   * @default '' // Empty string likely means auto-detect or system default
   */
  new_line?: '\r' | '\n' | '\r\n' | ''; // Corresponds to new_line

  /**
   * Normalize column names. This removes any non-alphanumeric characters from them. Column names that are reserved SQL keywords are prefixed with an underscore character (`_`).
   * @default false
   */
  normalize_names?: boolean; // Corresponds to normalize_names

  /**
   * Pad the remaining columns on the right with `NULL` values when a line lacks columns.
   * @default false
   */
  null_padding?: boolean; // Corresponds to null_padding

  /**
   * Strings that represent a `NULL` value. Alias: `null`.
   * @default ''
   */
  nullstr?: string | string[]; // Corresponds to nullstr

  /**
   * Use the parallel CSV reader.
   * @default true
   */
  parallel?: boolean; // Corresponds to parallel

  /**
   * String used to quote values.
   * @default '"'
   */
  quote?: string; // Corresponds to quote

  /**
   * Upper limit on the number of faulty lines per file that are recorded in the rejects table. Setting this to `0` means that no limit is applied.
   * @default 0
   */
  rejects_limit?: number; // Corresponds to rejects_limit

  /**
   * Name of the [temporary table where information on faulty scans is stored](https://duckdb.org/docs/stable/data/csv/reading_faulty_csv_files#reject-scans).
   * @default 'reject_scans'
   */
  rejects_scan?: string; // Corresponds to rejects_scan

  /**
   * Name of the [temporary table where information on faulty lines is stored](https://duckdb.org/docs/stable/data/csv/reading_faulty_csv_files#reject-errors).
   * @default 'reject_errors'
   */
  rejects_table?: string; // Corresponds to rejects_table

  /**
   * Number of sample lines for [auto detection of parameters](https://duckdb.org/docs/stable/data/csv/auto_detection).
   * @default 20480
   */
  sample_size?: number; // Corresponds to sample_size

  /**
   * Delimiter character used to separate columns within each line, e.g., `,` `;` `\t`. The delimiter character can be up to 4 bytes, e.g., 🦆. Alias for `delim`.
   * @default ','
   */
  sep?: string; // Corresponds to sep

  /**
   * Number of lines to skip at the start of each file.
   * @default 0
   */
  skip?: number; // Corresponds to skip

  /**
   * Skip any lines with errors and store them in the rejects table.
   * @default false
   */
  store_rejects?: boolean; // Corresponds to store_rejects

  /**
   * Enforces the strictness level of the CSV Reader. When set to `true`, the parser will throw an error upon encountering any issues. When set to `false`, the parser will attempt to read structurally incorrect files. Use with caution.
   * @default true
   */
  strict_mode?: boolean; // Corresponds to strict_mode

  /**
   * [Timestamp format](https://duckdb.org/docs/stable/sql/functions/dateformat) used when parsing and writing timestamps. Alias: `timestamp_format` (COPY statement only).
   * @default ''
   */
  timestampformat?: string; // Corresponds to timestampformat

  /**
   * Column types, as either a list (by position) or a struct (by name). Alias: `dtypes`, `columnTypes`.
   * @see {@link https://duckdb.org/docs/stable/data/csv/tips#override-the-types-of-specific-columns}
   * @default {} or []
   */
  types?: string[] | Record<string, string>; // Corresponds to types

  /**
   * Align columns from different files [by column name](https://duckdb.org/docs/stable/data/multiple_files/combining_schemas#union-by-name) instead of position. Using this option increases memory consumption.
   * @default false
   */
  union_by_name?: boolean; // Corresponds to union_by_name

  // --- Aliases not explicitly listed in original opts but covered by descriptions ---
  /**
   * Alias for `dateformat`; only available in the `COPY` statement.
   * @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat}
   * @default ''
   */
  date_format?: string;

  /**
   * Alias for `delim`; only available in the `COPY` statement.
   * @default ','
   */
  delimiter?: string;

  /**
   * Alias for `nullstr`.
   * @default ''
   */
  null?: string | string[];

  /**
  * Alias for `timestampformat`; only available in the `COPY` statement.
  * @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat}
  * @default ''
  */
  timestamp_format?: string;
} & {
  // Include properties from original opts that were not in the table, marked as any
  force_match?: boolean;
  hive_types?: any;
  hive_types_autocast?: boolean;
}



/**
 * Options for the read_json function, maintaining original camelCase naming and order from signature.
 */
export type ReadJsonOptions = {
  /**
   * Whether to auto-detect the names of the keys and data types of the values automatically.
   * @default true
   */
  auto_detect?: boolean; // Corresponds to auto_detect (BOOL)

  /**
   * A struct that specifies the key names and value types contained within the JSON file (e.g., `{key1: 'INTEGER', key2: 'VARCHAR'}`). If `auto_detect` is enabled these will be inferred.
   * @default {}
   */
  columns?: Record<string, string>; // Corresponds to columns (STRUCT)

  /**
   * Compression method (e.g., 'gzip'). Not in table, using VARCHAR from signature.
   */
  compression?: string; // Not in table, using DVarcharable -> string

  /**
   * Convert strings to integers. Not in table, using BOOL from signature.
   */
  convert_strings_to_integers?: boolean; // Not in table, using DBoolable -> boolean

  /**
   * Alias for dateformat. Not in table, using VARCHAR from signature.
   * @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat}
   */
  date_format?: string; // Not in table, using DVarcharable -> string

  /**
   * Specifies the date format to use when parsing dates.
   * @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat}
   * @default 'iso'
   */
  dateformat?: string; // Corresponds to dateformat (VARCHAR)

  /**
   * The JSON reader divides the number of appearances of each JSON field by the auto-detection sample size. If the average over the fields of an object is less than this threshold, it will default to using a `MAP` type with value type of merged field types.
   * @default 0.1
   */
  field_appearance_threshold?: number; // Corresponds to field_appearance_threshold (DOUBLE)

  /**
   * Add filename column. Not in table, using ANY | BIGINT from signature -> boolean | number | bigint. Assuming boolean based on read_csv.
   */
  filename?: boolean; // Not in table, guessing boolean based on read_csv

  /**
   * JSON format (e.g., 'auto', 'newline_delimited', 'array'). Not in table, using VARCHAR | BIGINT from signature -> string | number | bigint. Assuming string.
   */
  format?: 'auto' | 'newline_delimited' | 'array' | string; // Not in table, guessing string options

  /**
   * Hive partitioning. Not in table, using BOOL | VARCHAR from signature -> boolean | string. Assuming boolean based on read_csv.
   */
  hive_partitioning?: boolean; // Not in table, guessing boolean based on read_csv

  /**
   * Hive types. Not in table, using ANY | DOUBLE from signature -> any.
   */
  hive_types?: any; // Not in table, using any

  /**
   * Hive types autocast. Not in table, using BOOL | VARCHAR from signature -> boolean | string. Assuming boolean based on read_csv.
   */
  hive_types_autocast?: boolean; // Not in table, guessing boolean based on read_csv

  /**
   * Ignore errors. Not in table, using BOOL | UINTEGER from signature -> boolean | number. Assuming boolean based on read_csv.
   */
  ignore_errors?: boolean; // Not in table, guessing boolean based on read_csv

  /**
   * Controls the threshold for number of columns whose schema will be auto-detected; if JSON schema auto-detection would infer a `STRUCT` type for a field that has *more* than this threshold number of subfields, it infers a `MAP` type instead. Set to `-1` to disable `MAP` inference.
   * @default 200
   */
  map_inference_threshold?: number; // Corresponds to map_inference_threshold (BIGINT)

  /**
   * Maximum nesting depth to which the automatic schema detection detects types. Set to -1 to fully detect nested JSON types.
   * @default -1
   */
  maximum_depth?: number; // Corresponds to maximum_depth (BIGINT)

  /**
   * Maximum object size. Not in table, using UINTEGER | BOOL from signature -> number | boolean. Assuming number.
   */
  maximum_object_size?: number; // Not in table, guessing number

  /**
   * Maximum sample files. Not in table, using BIGINT from signature -> number.
   */
  maximum_sample_files?: number; // Not in table, using number

  /**
   * Can be one of `auto`, `true`, `false`.
   * @default 'auto'
   */
  records?: 'auto' | boolean; // Corresponds to records (VARCHAR), mapping 'true'/'false' strings to boolean

  /**
   * Option to define number of sample objects for automatic JSON type detection. Set to -1 to scan the entire input file.
   * @default 20480
   */
  sample_size?: number; // Corresponds to sample_size (UBIGINT -> number | bigint)

  /**
   * Alias for timestampformat. Specifies the date format to use when parsing timestamps.
   * @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat}
   * @default 'iso'
   */
  timestamp_format?: string; // Alias for timestampformat (VARCHAR)

  /**
   * Specifies the date format to use when parsing timestamps.
   * @see {@link https://duckdb.org/docs/stable/sql/functions/dateformat}
   * @default 'iso'
   */
  timestampformat?: string; // Corresponds to timestampformat (VARCHAR)

  /**
   * Whether the schema's of multiple JSON files should be [unified](https://duckdb.org/docs/stable/data/multiple_files/combining_schemas).
   * @default false
   */
  union_by_name?: boolean; // Corresponds to union_by_name (BOOL)
};


/**
 * Options for the read_json_objects function, maintaining original camelCase naming and order from signature.
 */
export type ReadJsonObjectsOptions = {
  /**
   * The compression type for the file. By default this will be detected automatically from the file extension (e.g., `t.json.gz` will use gzip, `t.json` will use none). Options are `none`, `gzip`, `zstd` and `auto_detect`.
   * @default 'auto_detect'
   */
  compression?: 'none' | 'gzip' | 'zstd' | 'auto_detect'; // Corresponds to compression (VARCHAR)

  /**
   * Whether or not an extra `filename` column should be included in the result.
   * @default false
   */
  filename?: boolean; // Corresponds to filename (BOOL)

  /**
   * Can be one of `auto`, `unstructured`, `newline_delimited` and `array`.
   * @default 'array'
   */
  format?: 'auto' | 'unstructured' | 'newline_delimited' | 'array'; // Corresponds to format (VARCHAR)

  /**
   * Whether or not to interpret the path as a [Hive partitioned path](https://duckdb.org/docs/stable/data/partitioning/hive_partitioning).
   * @default false
   */
  hive_partitioning?: boolean; // Corresponds to hive_partitioning (BOOL)

  /**
   * Hive types. Not in table, using ANY | BOOL from signature -> any.
   */
  hive_types?: any; // Not in table, using any

  /**
   * Hive types autocast. Not in table, using BOOL from signature -> boolean.
   */
  hive_types_autocast?: boolean; // Not in table, using boolean

  /**
   * Whether to ignore parse errors (only possible when `format` is `newline_delimited`).
   * @default false
   */
  ignore_errors?: boolean; // Corresponds to ignore_errors (BOOL)

  /**
   * The maximum size of a JSON object (in bytes).
   * @default 16777216
   */
  maximum_object_size?: number; // Corresponds to maximum_object_size (UINTEGER -> number)

  /**
   * The maximum number of JSON files sampled for auto-detection. Not in signature, using BIGINT from table -> number.
   * @default 32
   */
  maximum_sample_files?: number; // Corresponds to maximum_sample_files (BIGINT)

  /**
   * Union by name. Not in table, using ANY | BOOL from signature -> boolean.
   */
  union_by_name?: boolean; // Not in table, using boolean
};



/**
 * Options for the read_parquet function, maintaining original camelCase naming and order from signature.
 */
export type ReadParquetOptions = {
  /**
   * Parquet files generated by legacy writers do not correctly set the `UTF8` flag for strings, causing string columns to be loaded as `BLOB` instead. Set this to true to load binary columns as strings.
   * @default false
   */
  binary_as_string?: boolean; // Corresponds to binary_as_string (BOOL)

  /**
   * Compression. Not in table, using VARCHAR | BOOL from signature -> string | boolean. Assuming string.
   */
  compression?: string; // Not in table, guessing string

  /**
   * Debug use OpenSSL. Not in table, using BOOL from signature -> boolean.
   */
  debug_use_openssl?: boolean; // Not in table, using boolean

  /**
   * Configuration for [Parquet encryption](https://duckdb.org/docs/stable/data/parquet/encryption).
   * @default - (No default specified)
   */
  encryption_config?: Record<string, any>; // Corresponds to encryption_config (STRUCT)

  /**
   * Explicit cardinality. Not in table, using UBIGINT | ANY from signature -> number | any. Assuming any.
   */
  explicit_cardinality?: any; // Not in table, using any

  /**
   * Whether or not to include the `file_row_number` column.
   * @default false
   */
  file_row_number?: boolean; // Corresponds to file_row_number (BOOL)

  /**
   * Whether or not an extra `filename` column should be included in the result.
   * @default false
   */
  filename?: boolean; // Corresponds to filename (BOOL)

  /**
   * Whether or not to interpret the path as a [Hive partitioned path](https://duckdb.org/docs/stable/data/partitioning/hive_partitioning).
   * @default true
   */
  hive_partitioning?: boolean; // Corresponds to hive_partitioning (BOOL)

  /**
   * Hive types. Not in table, using ANY | BOOL from signature -> any.
   */
  hive_types?: any; // Not in table, using any

  /**
   * Hive types autocast. Not in table, using BOOL | ANY from signature -> boolean | any. Assuming boolean.
   */
  hive_types_autocast?: boolean; // Not in table, guessing boolean

  /**
   * Parquet version. Not in table, using VARCHAR | BOOL from signature -> string | boolean. Assuming string.
   */
  parquet_version?: string; // Not in table, guessing string

  /**
   * Schema. Not in table, using ANY | BOOL from signature -> any.
   */
  schema?: any; // Not in table, using any

  /**
   * Whether the columns of multiple schemas should be [unified by name](https://duckdb.org/docs/stable/data/multiple_files/combining_schemas), rather than by position.
   * @default false
   */
  union_by_name?: boolean; // Corresponds to union_by_name (BOOL)
};



/**
 * Options for the delta_scan function, inferred from signature.
 */
export type DeltaScanOptions = {
  binary_as_string?: boolean;
  compression?: string | any; // VARCHAR | ANY -> string | any
  debug_use_openssl?: boolean | any; // BOOLEAN | ANY -> boolean | any
  delta_file_number?: boolean;
  encryption_config?: any;
  explicit_cardinality?: boolean | number | bigint; // UBIGINT | BOOLEAN -> number | boolean
  file_row_number?: boolean;
  filename?: boolean | any; // ANY | BOOLEAN -> boolean | any
  hive_partitioning?: boolean | string; // BOOLEAN | VARCHAR -> boolean | string
  hive_types?: string | any; // ANY | VARCHAR -> string | any
  hive_types_autocast?: boolean;
  parquet_version?: string | number | bigint; // VARCHAR | UBIGINT -> string | number | bigint
  pushdown_filters?: string; // VARCHAR -> string
  pushdown_partition_info?: boolean;
  union_by_name?: boolean;
};


/**
 * Options for the read_xlsx function, inferred from signature.
 */
export type ReadXlsxOptions = {
  all_varchar?: boolean;
  empty_as_varchar?: boolean;
  header?: boolean;
  ignore_errors?: boolean;
  normalize_names?: boolean;
  range?: string; // VARCHAR -> string
  sheet?: string; // VARCHAR -> string
  stop_at_empty?: boolean;
};
type Opt<T> = T extends Record<string, any> ? T : never;
type Parms<S extends string, F, U extends Record<string, any>> = `${S}(${SerializeValue<F>},${Serialize<U>})`

export function read_csv<
  const F extends string[],
  const U extends Opt<ReadCsvOptions>
>(...args: [...F, (U | undefined)?]) {
  return (fnSerial('read_csv', args)) as unknown as Parms<'read_csv', F, U>
}

// const r = read_csv('xx.csv', { allVarchar: true })

export function read_json<
  const F extends string[],
  const U extends Opt<ReadJsonOptions>
>(...args: [...F, (U | undefined)?]) {
  return (fnSerial('read_json', args)) as unknown as Parms<'read_json', F, U>;
}

export function read_json_objects<
  const F extends string[],
  const U extends Opt<ReadJsonObjectsOptions>
>(...args: [...F, (U | undefined)?]) {
  return (fnSerial('read_json_objects', args)) as unknown as Parms<'read_json_objects', F, U>;
}


export function read_parquet<
  const F extends string[],
  const U extends Opt<ReadParquetOptions>
>(...args: [...F, (U | undefined)?]) {
  return (fnSerial('read_parquet', args)) as unknown as Parms<'read_parquet', F, U>;
}

// const z = read_parquet('toto', { binaryAsString: true, })

const fnSerial = (name = '', args: any[]) => {
  let opts = {}
  if (isPlainObject(last(args))) {
    opts = args.pop() || {}
  }
  return `${name}([${args.map((e = '') => wrap(e, "'"))}],${__serialize(opts)})`
}

export function delta_scan<
  const F extends string[],
  const U extends Opt<DeltaScanOptions>
>(...args: [...F, (U | undefined)?]) {
  return (fnSerial('delta_scan', args)) as unknown as Parms<'delta_scan', F, U>;
}
// console.log(delta_scan('toto', { binaryAsString: true, compression: 'gzip' }))

export function parquet_scan<
  const F extends string[],
  const U extends Opt<ReadParquetOptions>
>(...args: [...F, (U | undefined)?]) {
  return (fnSerial('parquet_scan', args)) as unknown as Parms<'parquet_scan', F, U>;
}



export function read_xlsx<
  const F extends string[],
  const U extends Opt<ReadXlsxOptions>
>(...args: [...F, (U | undefined)?]) {
  return (fnSerial('read_xlsx', args)) as unknown as Parms<'read_xlsx', F, U>;
}


export function read_text<
  const F extends string[],
  const U extends Opt<{}>
>(...args: [...F, (U | undefined)?]) {
  return (fnSerial('read_text', args)) as unknown as Parms<'read_text', F, U>;
}
