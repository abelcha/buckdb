import * as t from '../.buck/types'
import { from } from '../buckdb'
import { DuckdbCon } from './bindings'
import { GField, KeyPicker, MetaModel, MS, NestedKeyOf, SelectModel, VTypes } from './build.types'

type FileFormats = 'parquet' | 'csv' | 'json' | 'arrow' | 'jsonl'
type CompressionType = 'auto' | 'none' | 'gzip' | 'zstd' | 'snappy' | 'brotli' | 'lz4'
type compressExtension = '.gz' | '.zst' | '.brotli' | '.lz4' | ''
type csvFilename = `${string}.csv${compressExtension}`
type parquetFilename = `${string}.parquet`
type jsonFilename = `${string}${'.json' | '.jsonl' | '.ndjson'}${compressExtension}`

export interface CsvCopyOptions {
    /** The compression type for the file. By default this will be detected automatically from the file extension (e.g., `file.csv.gz` will use `gzip`, `file.csv.zst` will use `zstd`, and `file.csv` will use `none`). Options are `none`, `gzip`, `zstd`. @default 'auto' */
    compression?: CompressionType
    /** Specifies the date format to use when writing dates. @see https://duckdb.org/docs/sql/functions/dateformat */
    dateformat?: string
    /** The character that is written to separate columns within each row. @default ',' */
    delim?: string
    /** Alias for DELIM. The character that is written to separate columns within each row. @default ',' */
    sep?: string
    /** The character that should appear before a character that matches the `quote` value. @default '"' */
    escape?: string
    /** The list of columns to always add quotes to, even if not required. @default [] */
    force_quote?: string[]
    /** Whether or not to write a header for the CSV file. @default true */
    header?: boolean
    /** The string that is written to represent a `NULL` value. @default '' (empty string) */
    nullstr?: string
    /** Prefixes the CSV file with a specified string. This option must be used in conjunction with `SUFFIX` and requires `HEADER` to be set to `false`. @default '' (empty string) */
    prefix?: string
    /** Appends a specified string as a suffix to the CSV file. This option must be used in conjunction with `PREFIX` and requires `HEADER` to be set to `false`. @default '' (empty string) */
    suffix?: string
    /** The quoting character to be used when a data value is quoted. @default '"' */
    quote?: string
    /** Specifies the date format to use when writing timestamps. @see https://duckdb.org/docs/sql/functions/dateformat */
    timestampformat?: string
}
/** Options for writing Parquet files using the COPY statement. @see https://duckdb.org/docs/sql/statements/copy#parquet-options */
export interface ParquetCopyOptions {
    /** The compression format to use. @default 'snappy' */
    compression?: CompressionType
    /** Compression level, set between 1 (lowest compression, fastest) and 22 (highest compression, slowest). Only supported for zstd compression. @default 3 */
    compression_level?: number
    /** The `field_id` for each column. Pass `auto` to attempt to infer automatically. */
    field_ids?: 'auto' | Record<string, any> // Type might need refinement based on actual usage
    /** The target size of each row group in bytes. You can pass either a human-readable string, e.g., `2MB`, or an integer, i.e., the number of bytes. This option is only used when you have issued `SET preserve_insertion_order = false;`, otherwise, it is ignored. @default row_group_size * 1024 */
    row_group_size_bytes?: number | string
    /** The target size, i.e., number of rows, of each row group. @default 122880 */
    row_group_size?: number
    /** Create a new Parquet file if the current one has a specified number of row groups. If multiple threads are active, the number of row groups in a file may slightly exceed the specified number of row groups to limit the amount of locking – similarly to the behaviour of `FILE_SIZE_BYTES`. However, if `per_thread_output` is set, only one thread writes to each file, and it becomes accurate again. */
    row_groups_per_file?: number
}
/** Options for writing JSON files using the COPY statement. @see https://duckdb.org/docs/sql/statements/copy#json-options */
export interface JsonCopyOptions {
    /** Whether to write a JSON array. If `true`, a JSON array of records is written, if `false`, newline-delimited JSON is written. @default false */
    array?: boolean
    /** The compression type for the file. By default this will be detected automatically from the file extension (e.g., `file.json.gz` will use `gzip`, `file.json.zst` will use `zstd`, and `file.json` will use `none`). Options are `none`, `gzip`, `zstd`. @default 'auto' */
    compression?: CompressionType
    /** Specifies the date format to use when writing dates. @see https://duckdb.org/docs/sql/functions/dateformat */
    dateformat?: string
    /** Specifies the date format to use when writing timestamps. @see https://duckdb.org/docs/sql/functions/dateformat */
    timestampformat?: string
}
/** Generic options that might apply to multiple file formats or serve as a base. */
export interface GenericCopyOptions<A extends MetaModel = MetaModel, S extends SelectModel = {}, G = KeyPicker<A, S>> {
    /** Explicit format specification, useful if filename doesn't have standard extension. */
    format?: FileFormats  // Add other formats as needed
    /** Compression setting, potentially overriding format-specific defaults or auto-detection. */
    compression?: CompressionType
    /** Whether or not to write to a temporary file first if the original file exists (target.csv.tmp). This prevents overwriting an existing file with a broken file in case the writing is cancelled. @default 'auto' */
    use_tmp_file?: boolean | 'auto'
    /** Whether or not to allow overwriting files if they already exist. Only has an effect when used with partition_by. @default false */
    overwrite_or_ignore?: boolean
    /** When set, all existing files inside targeted directories will be removed (not supported on remote filesystems). Only has an effect when used with partition_by. @default false */
    overwrite?: boolean
    /** When set, in the event a filename pattern is generated that already exists, the path will be regenerated to ensure no existing files are overwritten. Only has an effect when used with partition_by. @default false */
    append?: boolean
    /** Set a pattern to use for the filename, can optionally contain {uuid} to be filled in with a generated UUID or {id} which is replaced by an incrementing index. Only has an effect when used with partition_by. @default 'auto' */
    filename_pattern?: string
    /** Set the file extension that should be assigned to the generated file(s). @default 'auto' */
    file_extension?: 'auto' | csvFilename | parquetFilename | jsonFilename
    /** Generate one file per thread, rather than one file in total. This allows for faster parallel writing. @default false */
    per_thread_output?: boolean
    /** If this parameter is set, the COPY process creates a directory which will contain the exported files. If a file exceeds the set limit (specified as bytes such as 1000 or in human-readable format such as 1k), the process creates a new file in the directory. This parameter works in combination with PER_THREAD_OUTPUT. Note that the size is used as an approximation, and files can be occasionally slightly over the limit. @default '' (empty string) */
    file_size_bytes?: string | number
    /** The columns to partition by using a Hive partitioning scheme, see the partitioned writes section. @default [] (empty array) */
    partition_by?: G | G[]
    /** Whether or not to include the created filepath(s) (as a Files VARCHAR[] column) in the query result. @default false */
    return_files?: boolean
    /** Whether or not to write partition columns into files. Only has an effect when used with partition_by. @default false */
    write_partition_columns?: boolean
    [key: string]: any // Allow additional options for flexibility]
}
type ReturnValue = { execute: () => Promise<any>; show: () => any; toSql: (opts?: any) => string }
// Renamed interface to avoid naming conflict with method
export interface CopyToInterface<A extends MetaModel, S extends SelectModel = {}, Options extends GenericCopyOptions<A, S> = GenericCopyOptions<A, S>> {
    to:
    & ((destination: csvFilename, options?: CsvCopyOptions & Options) => ReturnValue)
    & ((destination: parquetFilename, options?: ParquetCopyOptions & Options) => ReturnValue)
    & ((destination: jsonFilename, options?: JsonCopyOptions & Options) => ReturnValue)
    & ((destination: Exclude<string, csvFilename | parquetFilename | jsonFilename>, options?: Options) => ReturnValue);
}


declare function _copy<V extends VTypes, A extends MetaModel, S extends SelectModel = {}, SV = [], SS extends GField = t.DAnyField>(
    source: MS<V, A, S, SV, SS> | string
): CopyToInterface<A, S>; // Changed to use the renamed interface

function xcopy(
    source: { toSql: () => string },
) {
    return {
        to: (destination: string, options: Record<string, any> = {}) => {
            // Get the SQL from the source
            const sourceSql = typeof source === 'string' ? source :  source.toSql()

            // Build options string
            const optionsArray: string[] = []

            // Handle specific options first for consistent order (optional but good for testing)
            if (options.format) {
                // Use uppercase format value without quotes
                optionsArray.push(`FORMAT ${options.format.toUpperCase()}`)
            }
            if (options.compression) {
                // Use uppercase compression value without quotes
                optionsArray.push(`COMPRESSION ${options.compression.toUpperCase()}`)
            }

            // Add any other options, handling types correctly
            Object.entries(options).forEach(([key, value]) => {
                // Skip options already handled
                if (key === 'format' || key === 'compression') {
                    return
                }

                const keyUpper = key.toUpperCase()
                if (Array.isArray(value)) {
                    optionsArray.push(`${keyUpper} (${value.map(v => `'${v}'`).join(', ')})`)
                } else if (typeof value === 'string') {
                    // Quote string values
                    optionsArray.push(`${keyUpper} '${value}'`)
                } else if (typeof value === 'boolean') {
                    // Use uppercase TRUE/FALSE for booleans
                    optionsArray.push(`${keyUpper} ${value ? 'TRUE' : 'FALSE'}`)
                } else if (typeof value === 'number') {
                    // Numbers are used directly
                    optionsArray.push(`${keyUpper} ${value}`)
                }
                // Add handling for other types if necessary
            })

            // Build the COPY statement
            const optionsStr = optionsArray.length > 0 ? `(${optionsArray.join(', ')})` : ''
            const copyStatement = `COPY (${sourceSql}) TO '${destination}' ${optionsStr}`
            return {
                toSql: (opts?: Record<string, any>) => opts?.trim ? copyStatement.replaceAll(/(\n|\s)+/g, ' ') : copyStatement,
                execute: async () => {
                    console.log('Executing COPY statement:', copyStatement)
                    // Execute the COPY statement
                    // Access the DuckDB connection (assuming the structure)
                    const ddb = (source as any).toState?.().ddb as DuckdbCon
                        || (source as any).ddb as DuckdbCon // Fallback if toState doesn't exist or doesn't have ddb

                    if (!ddb || typeof ddb.query !== 'function') { // Check if ddb and ddb.query are valid
                        throw new Error('Could not access DuckDB connection or query method from source')
                    }

                    return await ddb.query(copyStatement) // Use query method
                }
            }
            // // Execute the COPY statement
            // // Access the DuckDB connection (assuming the structure)
            // const ddb = (source as any).toState?.().ddb as DuckdbCon
            //     || (source as any).ddb as DuckdbCon // Fallback if toState doesn't exist or doesn't have ddb

            // if (!ddb || typeof ddb.query !== 'function') { // Check if ddb and ddb.query are valid
            //     throw new Error('Could not access DuckDB connection or query method from source')
            // }

            // await ddb.query(copyStatement) // Use query method
        },
    }
}
export const copy = xcopy as unknown as typeof _copy

// await from('duckdb_functions()').select().copyTo('sdq.parquet', {
//     // compression: 'brotli'
// }).execute()
// const resp = await copy(
//     from('duckdb_functions()').select()
// ).to('partx', {
//     partition_by: ['function_type'],
//     format: 'parquet',
//     overwrite: true,
// })

// console.log(resp.toSql())
// console.log(await resp.execute())