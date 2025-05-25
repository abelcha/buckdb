import { FromPlain } from "../src/deep-map";
export const version = "V2";
export type DBOOLEAN_NATIVE = "Bool" | "Boolean" | "Logical";
export type DCOMPOSITE_NATIVE = "List" | "Map" | "Row" | "Struct" | "Union";
export type DDATETIME_NATIVE = "Date" | "Datetime" | "Interval" | "Time" | "Timestamp" | "Timestamptz" | "Timestamp_ms" | "Timestamp_ns" | "Timestamp_s" | "Timestamp_us" | "Timetz";
export type DNUMERIC_NATIVE = "Bigint" | "Dec" | "Decimal" | "Double" | "Float" | "Float4" | "Float8" | "Hugeint" | "Int" | "Int1" | "Int128" | "Int16" | "Int2" | "Int32" | "Int4" | "Int64" | "Int8" | "Integer" | "Integral" | "Long" | "Numeric" | "Oid" | "Real" | "Short" | "Signed" | "Smallint" | "Tinyint" | "Ubigint" | "Uhugeint" | "Uint128" | "Uint16" | "Uint32" | "Uint64" | "Uint8" | "Uinteger" | "Usmallint" | "Utinyint";
export type DSTRING_NATIVE = "Bpchar" | "Char" | "Nvarchar" | "String" | "Text" | "Varchar" | "JSON";
export type DANY_NATIVE = "Binary" | "Bit" | "Bitstring" | "Blob" | "Bytea" | "Enum" | "Guid" | "Null" | "Uuid" | "Varbinary" | "Varint";
export type DALL_NATIVE = DBOOLEAN_NATIVE | DCOMPOSITE_NATIVE | DDATETIME_NATIVE | DNUMERIC_NATIVE | DSTRING_NATIVE | DANY_NATIVE;
export type DAnyable = any | DAnyField;
export type DVarcharable = string | DVarcharField;
export type RegExpable = RegExp | string;
export type DBoolable = boolean | DBoolField;
export type DDateable = Date | DDateField;
export type DArrayable = any[] | DArrayField;
export type DStructable = Record<string, any> | DStructField;
export type DNumericable = number | DNumericField;
export type DJsonable = Record<string, any> | DJsonField;
export type DField = DVarcharField | DNumericField | DDateField | DNumericField | DVarcharField | DAnyField | DArrayField | DDateField | DStructField | DBoolField | DJsonField;
export declare const sId: unique symbol;
export declare const sComptype: unique symbol;
export declare const sAnti: unique symbol;
export declare const sInferred: unique symbol;
// export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}

// export type FromPrimitive<T> = T extends string ? DVarcharField : T extends number ? DNumericField
//     : T extends boolean ? DBoolField
//     : T extends Date ? DDateField
//     : T
// export type FromPrimitiveDeep<T> = T extends DField ? T
//     : T extends readonly any[] ? { [I in keyof T]: FromPrimitiveDeep<T[I]> }
//     : T extends object ? {
//         [K in keyof T as K extends string | number ? K : never]: T[K] extends Array<infer U> ? DArrayField<U extends object ? FromPrimitiveDeep<U> : FromPrimitive<U>>
//         : T[K] extends object ? FromPrimitiveDeep<T[K]>
//         : FromPrimitive<T[K]>
//     }
//     : FromPrimitive<T>

// export type NestedFromPrimitive<T> = Simplify<FromPrimitiveDeep<T>>

export interface DDateField extends DAnyField {
  [sInferred]: Date;
  [sComptype]: Date;
  /**                                                            @description: Extract the millisecond component from a date or timestamp	@example: millisecond(timestamp '2021-08-03 11:59:44.123456')	@default: millisecond(ts:DATE) -> BIGINT*/
  millisecond(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the microsecond component from a date or timestamp	@example: microsecond(timestamp '2021-08-03 11:59:44.123456')	@default: microsecond(ts:DATE) -> BIGINT*/
  microsecond(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@default: isinf(x:DATE) -> BOOLEAN*/
  isinf(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the era component from a date or timestamp	@example: era(timestamp '2021-08-03 11:59:44.123456')	@default: era(ts:DATE) -> BIGINT*/
  era(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the day component from a date or timestamp	@example: day(timestamp '2021-08-03 11:59:44.123456')	@default: day(ts:DATE) -> BIGINT*/
  day(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@default: generate_series(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  generate_series(stop: DDateable, step: DAnyable): DArrayField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@default: range(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  range(stop: DDateable, step: DAnyable): DArrayField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the nanosecond component from a date or timestamp	@example: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789	@default: nanosecond(tsns:DATE) -> BIGINT*/
  nanosecond(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the week component from a date or timestamp	@example: week(timestamp '2021-08-03 11:59:44.123456')	@default: week(ts:DATE) -> BIGINT*/
  week(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the year component from a date or timestamp	@example: year(timestamp '2021-08-03 11:59:44.123456')	@default: year(ts:DATE) -> BIGINT*/
  year(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the hour component from a date or timestamp	@example: hour(timestamp '2021-08-03 11:59:44.123456')	@default: hour(ts:DATE) -> BIGINT*/
  hour(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the timezone_hour component from a date or timestamp	@example: timezone_hour(timestamp '2021-08-03 11:59:44.123456')	@default: timezone_hour(ts:DATE) -> BIGINT*/
  timezone_hour(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@default: equi_width_bins(min:TIMESTAMP, max:TIMESTAMP, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(max: DDateable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the month component from a date or timestamp	@example: month(timestamp '2021-08-03 11:59:44.123456')	@default: month(ts:DATE) -> BIGINT*/
  month(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the epoch component in nanoseconds from a temporal type	@example: epoch_ns(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_ns(temporal:DATE) -> BIGINT*/
  epoch_ns(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the decade component from a date or timestamp	@example: decade(timestamp '2021-08-03 11:59:44.123456')	@default: decade(ts:DATE) -> BIGINT*/
  decade(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the second component from a date or timestamp	@example: second(timestamp '2021-08-03 11:59:44.123456')	@default: second(ts:DATE) -> BIGINT*/
  second(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the minute component from a date or timestamp	@example: minute(timestamp '2021-08-03 11:59:44.123456')	@default: minute(ts:DATE) -> BIGINT*/
  minute(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the isodow component from a date or timestamp	@example: isodow(timestamp '2021-08-03 11:59:44.123456')	@default: isodow(ts:DATE) -> BIGINT*/
  isodow(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the Julian Day number from a date or timestamp	@example: julian(timestamp '2006-01-01 12:00')	@default: julian(ts:DATE) -> DOUBLE*/
  julian(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: The (English) name of the month	@example: monthname(TIMESTAMP '1992-09-20')	@default: monthname(ts:DATE) -> VARCHAR*/
  monthname(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_ms(temporal:DATE) -> BIGINT*/
  epoch_ms(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the epoch component in microseconds from a temporal type	@example: epoch_us(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_us(temporal:DATE) -> BIGINT*/
  epoch_us(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the timezone_minute component from a date or timestamp	@example: timezone_minute(timestamp '2021-08-03 11:59:44.123456')	@default: timezone_minute(ts:DATE) -> BIGINT*/
  timezone_minute(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the weekday component from a date or timestamp	@example: weekday(timestamp '2021-08-03 11:59:44.123456')	@default: weekday(ts:DATE) -> BIGINT*/
  weekday(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the isoyear component from a date or timestamp	@example: isoyear(timestamp '2021-08-03 11:59:44.123456')	@default: isoyear(ts:DATE) -> BIGINT*/
  isoyear(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the quarter component from a date or timestamp	@example: quarter(timestamp '2021-08-03 11:59:44.123456')	@default: quarter(ts:DATE) -> BIGINT*/
  quarter(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the century component from a date or timestamp	@example: century(timestamp '2021-08-03 11:59:44.123456')	@default: century(ts:DATE) -> BIGINT*/
  century(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Converts a TIME WITH TIME ZONE to an integer sort key	@example: timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)	@default: timetz_byte_comparable(timeTz:TIME WITH TIME ZONE) -> UBIGINT*/
  timetz_byte_comparable(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: The (English) name of the weekday	@example: dayname(TIMESTAMP '1992-03-22')	@default: dayname(ts:DATE) -> VARCHAR*/
  dayname(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the epoch component from a temporal type	@example: epoch(timestamp '2021-08-03 11:59:44.123456')	@default: epoch(temporal:DATE) -> DOUBLE*/
  epoch(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the yearweek component from a date or timestamp	@example: yearweek(timestamp '2021-08-03 11:59:44.123456')	@default: yearweek(ts:DATE) -> BIGINT*/
  yearweek(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@default: timezone(ts:DATE) -> BIGINT*/
  timezone(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Returns the last day of the month	@example: last_day(TIMESTAMP '1992-03-22 01:02:03.1234')	@default: last_day(ts:DATE) -> DATE*/
  last_day(): DDateField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the dayofweek component from a date or timestamp	@example: dayofweek(timestamp '2021-08-03 11:59:44.123456')	@default: dayofweek(ts:DATE) -> BIGINT*/
  dayofweek(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the dayofyear component from a date or timestamp	@example: dayofyear(timestamp '2021-08-03 11:59:44.123456')	@default: dayofyear(ts:DATE) -> BIGINT*/
  dayofyear(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@default: isfinite(x:DATE) -> BOOLEAN*/
  isfinite(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@default: strftime(data:DATE, format:VARCHAR) -> VARCHAR*/
  strftime(format: DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the weekofyear component from a date or timestamp	@example: weekofyear(timestamp '2021-08-03 11:59:44.123456')	@default: weekofyear(ts:DATE) -> BIGINT*/
  weekofyear(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the dayofmonth component from a date or timestamp	@example: dayofmonth(timestamp '2021-08-03 11:59:44.123456')	@default: dayofmonth(ts:DATE) -> BIGINT*/
  dayofmonth(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @description: Extract the millennium component from a date or timestamp	@example: millennium(timestamp '2021-08-03 11:59:44.123456')	@default: millennium(ts:DATE) -> BIGINT*/
  millennium(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @default: add(col0:DATE, col1:INTEGER | INTERVAL | TIME | TIME WITH TIME ZONE) -> TIMESTAMP WITH TIME ZONE*/
  add(col1: DAnyable | DDateable | DNumericable): DDateField;
  /**                                                            @default: add(col0:TIME WITH TIME ZONE, col1:DATE | INTERVAL) -> TIMESTAMP WITH TIME ZONE*/
  add(col1: DAnyable | DDateable): DDateField;
  /**                                                            @default: add(col0:TIMESTAMP, col1:INTERVAL) -> TIMESTAMP*/
  add(col1: DAnyable): DDateField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
  /**                                                            @default: subtract(col0:DATE, col1:INTEGER | INTERVAL) -> TIMESTAMP*/
  subtract(col1: DAnyable | DNumericable): DDateField;
  /**                                                            @default: subtract(col0:DATE, col1:DATE) -> BIGINT*/
  subtract(col1: DDateable): DNumericField;
  /**                                                            @default: subtract(col0:TIME WITH TIME ZONE, col1:INTERVAL) -> TIME WITH TIME ZONE*/
  subtract(col1: DAnyable): DDateField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DDate] - - - - - - -  */
}

export interface DAny<DNum, DStr> extends Astor<DNum, DStr>, DPatternMatchers {
  /**                                                            @description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@default: array_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  array_slice(begin: DAnyable, end: DAnyable, step?: DAnyable | DNumericable): this;
  /**                                                            @description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@default: list_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  list_slice: this["array_slice"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract_value(map(['key'], ['val']), 'key')	@default: map_extract_value(map:ANY, key:ANY) -> ANY*/
  map_extract_value(key: DAnyable, ...vargs: DAnyable[]): this;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Concatenate many strings together.	@example: concat('Hello', ' ', 'World')	@default: concat(string:ANY) -> VARCHAR*/
  concat(...vargs: DAnyable[]): DStr;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example: enum_range_boundary(NULL, 'happy'::mood)	@default: enum_range_boundary(start:ANY, end:ANY) -> VARCHAR[]*/
  enum_range_boundary(end: DAnyable): DArrayField<DVarcharField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example: is_histogram_other_bin(v)	@default: is_histogram_other_bin(val:ANY) -> BOOLEAN*/
  is_histogram_other_bin(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example: create_sort_key('A', 'DESC')	@default: create_sort_key(parameters:ANY) -> BLOB*/
  create_sort_key(...vargs: DAnyable[]): this;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the name of a given expression	@example: alias(42 + 1)	@default: alias(expr:ANY) -> VARCHAR*/
  alias(): DStr;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example: stats(5)	@default: stats(expression:ANY) -> VARCHAR*/
  stats(): DStr;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example: hash('🦆')	@default: hash(param:ANY) -> UBIGINT*/
  hash(...vargs: DAnyable[]): DNum;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the VectorType of a given column	@example: vector_type(col)	@default: vector_type(col:ANY) -> VARCHAR*/
  vector_type(): DStr;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns all values of the input enum type as an array	@example: enum_range(NULL::mood)	@default: enum_range(enm:ANY) -> VARCHAR[]*/
  enum_range(): DArrayField<DVarcharField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the numeric value backing the given enum value	@example: enum_code('happy'::mood)	@default: enum_code(enm:ANY) -> ANY*/
  enum_code(): this;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Whether or not we can implicitly cast from the source type to the other type	@example: can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)	@default: can_cast_implicitly(sourceType:ANY, targetType:ANY) -> BOOLEAN*/
  can_cast_implicitly(targetType: DAnyable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the size of the map (or the number of entries in the map)	@example: cardinality( map([4, 2], ['a', 'b']) );	@default: cardinality(map:ANY) -> UBIGINT*/
  cardinality(...vargs: DAnyable[]): DNum;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the last value of the input enum type	@example: enum_last(NULL::mood)	@default: enum_last(enm:ANY) -> VARCHAR*/
  enum_last(): DStr;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the name of the data type of the result of the expression	@example: typeof('abc')	@default: typeof(expression:ANY) -> VARCHAR*/
  typeof(): DStr;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the lowest value of the set of input parameters	@example: least(42, 84)	@default: least(arg1:ANY) -> ANY*/
  least(...vargs: DAnyable[]): this;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@default: equi_width_bins(min:ANY, max:ANY, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: If arg2 is NULL, return NULL. Otherwise, return arg1.	@example: constant_or_null(42, NULL)	@default: constant_or_null(arg1:ANY, arg2:ANY) -> ANY*/
  constant_or_null(arg2: DAnyable, ...vargs: DAnyable[]): this;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the first value of the input enum type	@example: enum_first(NULL::mood)	@default: enum_first(enm:ANY) -> VARCHAR*/
  enum_first(): DStr;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@default: map_extract(map:ANY, key:ANY) -> ANY*/
  map_extract(key: DAnyable, ...vargs: DAnyable[]): this;
  /**                                                            @description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@default: element_at(map:ANY, key:ANY) -> ANY*/
  element_at: this["map_extract"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
  /**                                                            @description: Returns the highest value of the set of input parameters	@example: greatest(42, 84)	@default: greatest(arg1:ANY) -> ANY*/
  greatest(...vargs: DAnyable[]): this;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DAny] - - - - - - -  */
}

export interface DAnyComp extends DAny<DNumericComp, DVarcharComp> {
}

export interface DAnyField extends DAny<DNumericField, DVarcharField> {
  [sInferred]: any;
  [sComptype]: any;
}

type AsComp<T> = T extends { [sComptype]: infer V } ? V : T;

export interface DArrayField<T = DAnyField> extends Omit<Array<T>, "map" | "filter" | "reduce"> {
  [sInferred]: T[];
  // [sComptype]: AsComp<T>[];
  [sComptype]: DArrayField<AsComp<T>>;
  /**                                                            @description: Compute the cosine distance between two lists	@example: list_cosine_distance([1, 2, 3], [1, 2, 3])	@default: list_cosine_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_distance(list2: DArrayable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@default: array_resize(list:ANY[], size:ANY, value:ANY | ) -> ANY[]*/
  array_resize(size: DAnyable, value?: DAnyable): DArrayField<T>;
  /**                                                            @description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@default: list_resize(list:ANY[], size:ANY, value:ANY | ) -> ANY[]*/
  list_resize: this["array_resize"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Number of characters in string.	@example: length('Hello🦆')	@default: len(string:ANY[]) -> BIGINT*/
  len(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @default: add(col0:ANY[], col1:ANY[]) -> ANY[]*/
  add(col1: DArrayable): DArrayField<T>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_similarity([1, 2, 3], [1, 2, 3])	@default: array_cosine_similarity(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_similarity(arr2: DArrayable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@default: array_position(list:ANY[], element:ANY) -> INTEGER*/
  array_position(element: DAnyable): DNumericField;
  /**                                                            @description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@default: array_indexof(list:ANY[], element:ANY) -> INTEGER*/
  array_indexof: this["array_position"];
  /**                                                            @description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@default: list_position(list:ANY[], element:ANY) -> INTEGER*/
  list_position: this["array_position"];
  /**                                                            @description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@default: list_indexof(list:ANY[], element:ANY) -> INTEGER*/
  list_indexof: this["array_position"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: array_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggregate(name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: list_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggregate: this["array_aggregate"];
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: array_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggr: this["array_aggregate"];
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  aggregate: this["array_aggregate"];
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: list_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggr: this["array_aggregate"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_distance([1, 2, 3], [1, 2, 3])	@default: array_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_distance(arr2: DArrayable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@default: array_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  array_contains(element: DAnyable): DBoolField;
  /**                                                            @description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@default: list_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  list_contains: this["array_contains"];
  /**                                                            @description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@default: array_has(list:ANY[], element:ANY) -> BOOLEAN*/
  array_has: this["array_contains"];
  /**                                                            @description: Returns true if the list contains the element.	@example: contains([1, 2, NULL], 1)	@default: contains(list:ANY[], element:ANY) -> BOOLEAN*/
  contains: this["array_contains"];
  /**                                                            @description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@default: list_has(list:ANY[], element:ANY) -> BOOLEAN*/
  list_has: this["array_contains"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@default: array_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  // array_filter(lambda: DAnyable): DArrayField<T>
  /**                                                            @description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@default: list_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_filter: this["array_filter"];
  /**                                                            @description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@default: filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  filter: this["array_filter"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the distance between two lists	@example: list_distance([1, 2, 3], [1, 2, 3])	@default: list_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_distance(list2: DArrayable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@default: array_unique(list:ANY[]) -> UBIGINT*/
  array_unique(): DNumericField;
  /**                                                            @description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@default: list_unique(list:ANY[]) -> UBIGINT*/
  list_unique: this["array_unique"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the cosine similarity between two lists	@example: list_cosine_similarity([1, 2, 3], [1, 2, 3])	@default: list_cosine_similarity(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_similarity(list2: DArrayable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_distance([1, 2, 3], [1, 2, 3])	@default: array_cosine_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_distance(arr2: DArrayable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@default: array_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_all(l2: DArrayable): DBoolField;
  /**                                                            @description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@default: list_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_all: this["array_has_all"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@default: array_distinct(list:ANY[]) -> ANY[]*/
  array_distinct(): DArrayField<T>;
  /**                                                            @description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@default: list_distinct(list:ANY[]) -> ANY[]*/
  list_distinct: this["array_distinct"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@default: array_sort(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  array_sort(col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<T>;
  /**                                                            @description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@default: list_sort(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  list_sort: this["array_sort"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@default: date_part(ts:VARCHAR[], col1:DATE | INTERVAL | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> STRUCT()*/
  date_part(col1: DAnyable | DDateable): DStructField;
  /**                                                            @description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@default: datepart(ts:VARCHAR[], col1:DATE | INTERVAL | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> STRUCT()*/
  datepart: this["date_part"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Flatten a nested list by one level	@example: flatten([[1, 2, 3], [4, 5]])	@default: flatten(nestedList:ANY[][]) -> ANY[]*/
  flatten(): DArrayField<T>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns the length of the list.	@example: array_length([1,2,3])	@default: array_length(list:ANY[], col1:BIGINT | ) -> BIGINT*/
  array_length(col1?: DAnyable | DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@default: array_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  // array_reduce(lambda: DAnyable): DAnyField
  /**                                                            @description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@default: list_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  list_reduce: this["array_reduce"];
  /**                                                            @description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@default: reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  reduce: this["array_reduce"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@default: array_grade_up(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  array_grade_up(col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<T>;
  /**                                                            @description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@default: list_grade_up(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  list_grade_up: this["array_grade_up"];
  /**                                                            @description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@default: grade_up(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  grade_up: this["array_grade_up"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@default: array_negative_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_inner_product(arr2: DArrayable): DNumericField;
  /**                                                            @description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@default: array_negative_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_dot_product: this["array_negative_inner_product"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@default: array_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_any(l2: DArrayable): DBoolField;
  /**                                                            @description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@default: list_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_any: this["array_has_any"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@default: array_reverse_sort(list:ANY[], col1:VARCHAR | ) -> ANY[]*/
  array_reverse_sort(col1?: DAnyable | DVarcharable): DArrayField<T>;
  /**                                                            @description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@default: list_reverse_sort(list:ANY[], col1:VARCHAR | ) -> ANY[]*/
  list_reverse_sort: this["array_reverse_sort"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@default: array_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_inner_product(arr2: DArrayable): DNumericField;
  /**                                                            @description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@default: array_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_dot_product: this["array_inner_product"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@default: array_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_concat(list2: DArrayable): DArrayField<T>;
  /**                                                            @description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@default: list_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_concat: this["array_concat"];
  /**                                                            @description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@default: array_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_cat: this["array_concat"];
  /**                                                            @description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@default: list_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_cat: this["array_concat"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@default: array_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  array_where(maskList: DArrayable): DArrayField<T>;
  /**                                                            @description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@default: list_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  list_where: this["array_where"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@default: list_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_inner_product(list2: DArrayable): DNumericField;
  /**                                                            @description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@default: list_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_dot_product: this["list_inner_product"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@default: list_element(list:ANY[], index:BIGINT) -> ANY*/
  list_element(index: DNumericable): DAnyField;
  /**                                                            @description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@default: list_extract(list:ANY[], index:BIGINT) -> ANY*/
  list_extract: this["list_element"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@default: array_extract(list:ANY[], index:BIGINT) -> ANY*/
  array_extract(index: DNumericable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@default: list_negative_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_inner_product(list2: DArrayable): DNumericField;
  /**                                                            @description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@default: list_negative_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_dot_product: this["list_negative_inner_product"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: array_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  // array_transform(lambda: DAnyable): DArrayField<T>
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: list_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_transform: this["array_transform"];
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: array_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_apply: this["array_transform"];
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: list_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_apply: this["array_transform"];
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  apply: this["array_transform"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Repeats the string count number of times	@example: repeat('A', 5)	@default: repeat(string:ANY[], count:BIGINT) -> ANY[]*/
  repeat(count: DNumericable): DArrayField<T>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@default: array_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  array_select(indexList: DArrayable): DArrayField<T>;
  /**                                                            @description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@default: list_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  list_select: this["array_select"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  /**                                                            @description: Compute the cross product of two arrays of size 3. The array elements can not be NULL.	@example: array_cross_product([1, 2, 3], [1, 2, 3])	@default: array_cross_product(arr:DOUBLE[3], arr__01:DOUBLE[3]) -> DOUBLE[3]*/
  array_cross_product(arr__01: DArrayable): DArrayField<T>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DArray] - - - - - - -  */
  array_reduce<U>(lambda: (accumulator: U, currentValue: T) => U, initialValue: U): FromPlain<U>;
  array_transform<U>(lambda: (x: T) => U): DArrayField<FromPlain<U>>;
  array_filter(lambda: (x: T) => any): DArrayField<T>;
  map: this["array_transform"];
}

export interface DBoolField extends DAnyField {
  [sInferred]: boolean;
  [sComptype]: boolean;
  /**                                                            @description: Returns list of schemas. Pass a parameter of True to include implicit schemas	@example: current_schemas(true)	@default: current_schemas(includeImplicit:BOOLEAN) -> VARCHAR[]*/
  current_schemas(): DArrayField<DVarcharField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DBool] - - - - - - -  */
}
export interface _DStructField<T = {}> {
  [sInferred]: T;
  [sComptype]: T;
  /**                                                            @description: Extract the named entry from the STRUCT.	@example: struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i')	@default: struct_extract(struct:STRUCT, entry:BIGINT | VARCHAR) -> ANY*/
  struct_extract(entry: DNumericable | DVarcharable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DStruct] - - - - - - -  */
  /**                                                            @description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@default: array_extract(list:STRUCT, index:BIGINT | VARCHAR) -> ANY*/
  array_extract(index: DNumericable | DVarcharable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DStruct] - - - - - - -  */
  /**                                                            @description: Extract the entry from the STRUCT by position (starts at 1!).	@example: struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2)	@default: struct_extract_at(struct:STRUCT, entry:BIGINT) -> ANY*/
  struct_extract_at(entry: DNumericable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DStruct] - - - - - - -  */
}
export type DStructField<T = {}> = T & _DStructField<T>;

export interface DMapField {
  // [sInferred]: string;
  // [sComptype]: string;
  /**                                                            @description: Checks if a map contains a given key.	@example: map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')	@default: map_contains(map:MAP(ANY, ANY), key:ANY) -> BOOLEAN*/
  map_contains(key: DAnyable): DBoolField;
  /**                                                            @description: Checks if a map contains a given key.	@example: contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')	@default: contains(map:MAP(ANY, ANY), key:ANY) -> BOOLEAN*/
  contains: this["map_contains"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DMap] - - - - - - -  */
}

export interface _DJsonField {
  // [sInferred]: string;
  // [sComptype]: string;
  /**                                                            @default: from_json_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json_strict(col1: DVarcharable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_deserialize_sql(col0:JSON) -> VARCHAR*/
  json_deserialize_sql(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_keys(col0:JSON, col1:VARCHAR | VARCHAR[] | ) -> VARCHAR[]*/
  json_keys(col1?: DAnyable | DArrayable | DVarcharable): DArrayField<DVarcharField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_transform_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform_strict(col1: DVarcharable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: from_json(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json(col1: DVarcharable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_valid(col0:JSON) -> BOOLEAN*/
  json_valid(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_pretty(col0:JSON) -> VARCHAR*/
  json_pretty(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_contains(col0:JSON, col1:JSON | VARCHAR) -> BOOLEAN*/
  json_contains(col1: DJsonable | DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_structure(col0:JSON) -> JSON*/
  json_structure(): DJsonField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_transform(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform(col1: DVarcharable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_array_length(col0:JSON, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col1: DArrayable): DArrayField<DNumericField>;
  /**                                                            @default: json_array_length(col0:JSON, col1:VARCHAR | ) -> UBIGINT*/
  json_array_length(col1?: DAnyable | DVarcharable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_exists(col0:JSON, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col1: DArrayable): DArrayField<DBoolField>;
  /**                                                            @default: json_exists(col0:JSON, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col1: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_extract(col0:JSON, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract(col1: DNumericable | DVarcharable): DJsonField;
  /**                                                            @default: json_extract(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col1: DArrayable): DArrayField<DJsonField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_extract_path(col0:JSON, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract_path(col1: DNumericable | DVarcharable): DJsonField;
  /**                                                            @default: json_extract_path(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col1: DArrayable): DArrayField<DJsonField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_extract_path_text(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_extract_path_text(col0:JSON, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col1: DNumericable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_extract_string(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_extract_string(col0:JSON, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_string(col1: DNumericable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_type(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_type(col0:JSON, col1:VARCHAR | ) -> VARCHAR*/
  json_type(col1?: DAnyable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
  /**                                                            @default: json_value(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_value(col0:JSON, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_value(col1: DNumericable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DJson] - - - - - - -  */
}
export type DJsonField = _DJsonField & Record<string, any>;

export interface _DVarcharField extends DAnyField {
  [sInferred]: string;
  [sComptype]: DVarcharComp;
  /**                                                            @description: Convert string to lower case	@example: lower('Hello')	@default: lcase(string:VARCHAR) -> VARCHAR*/
  lcase(): DVarcharField;
  /**                                                            @description: Convert string to lower case	@example: lower('Hello')	@default: lower(string:VARCHAR) -> VARCHAR*/
  lower: this["lcase"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirpath('path/to/file.csv', 'system')	@default: parse_dirpath(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirpath(separator?: DAnyable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Concatenate strings together separated by the specified separator.	@example: concat_ws(', ', 'Banana', 'Apple', 'Melon')	@default: concat_ws(separator:VARCHAR, string:ANY) -> VARCHAR*/
  concat_ws(string: DAnyable, ...vargs: DAnyable[]): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@default: substring(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring(start: DNumericable, length?: DAnyable | DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if search_string is found within string.	@example: contains('abc', 'a')	@default: contains(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  contains(searchString: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example: nfc_normalize('ardèch')	@default: nfc_normalize(string:VARCHAR) -> VARCHAR*/
  nfc_normalize(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Removes any occurrences of any of the characters from either side of the string	@example: trim('>>>>test<<', '><')	@default: trim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  trim(characters?: DAnyable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@default: list_element(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_element(index: DNumericable): DVarcharField;
  /**                                                            @description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@default: list_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_extract: this["list_element"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Convert string to upper case.	@example: upper('Hello')	@default: ucase(string:VARCHAR) -> VARCHAR*/
  ucase(): DVarcharField;
  /**                                                            @description: Convert string to upper case.	@example: upper('Hello')	@default: upper(string:VARCHAR) -> VARCHAR*/
  upper: this["ucase"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example: currval('my_sequence_name')	@default: currval(sequenceName:VARCHAR) -> BIGINT*/
  currval(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the right-most count characters	@example: right('Hello🦆', 3)	@default: right(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right(count: DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example: regexp_extract('abc', '([a-z])(b)', 1)	@default: regexp_extract(string:VARCHAR, pattern:VARCHAR, group0:INTEGER | VARCHAR[] | , options:VARCHAR | ) -> VARCHAR*/
  regexp_extract(pattern: DVarcharable | RegExp, group0?: DAnyable | DArrayable | DNumericable, options?: DAnyable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the current value of the configuration setting	@example: current_setting('access_mode')	@default: current_setting(settingName:VARCHAR) -> ANY*/
  current_setting(): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: date_sub(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_sub(startdate: DDateable, enddate: DDateable): DNumericField;
  /**                                                            @description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: datesub(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datesub: this["date_sub"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirname('path/to/file.csv', 'system')	@default: parse_dirname(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirname(separator?: DAnyable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_similarity('duck', 'duckdb', 0.5)	@default: jaro_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_similarity(str2: DVarcharable, scoreCutoff?: DAnyable | DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Unescapes the URL encoded input.	@example: url_decode('this%20string%20is%2BFencoded')	@default: url_decode(input:VARCHAR) -> VARCHAR*/
  url_decode(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Repeats the string count number of times	@example: repeat('A', 5)	@default: repeat(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  repeat(count: DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: to_binary(value:VARCHAR) -> VARCHAR*/
  to_binary(): DVarcharField;
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: bin(value:VARCHAR) -> VARCHAR*/
  bin: this["to_binary"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@default: array_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  array_extract(index: DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Number of characters in string.	@example: length('Hello🦆')	@default: len(string:VARCHAR) -> BIGINT*/
  len(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Throws the given error message	@example: error('access_mode')	@default: error(message:VARCHAR) -> "NULL"*/
  error(): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns an integer that represents the Unicode code point of the first character of the string	@example: ascii('Ω')	@default: ascii(string:VARCHAR) -> INTEGER*/
  ascii(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts a value from binary representation to a blob	@example: unbin('0110')	@default: from_binary(value:VARCHAR) -> BLOB*/
  from_binary(): DAnyField;
  /**                                                            @description: Converts a value from binary representation to a blob	@example: unbin('0110')	@default: unbin(value:VARCHAR) -> BLOB*/
  unbin: this["from_binary"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Convert a base64 encoded string to a character string	@example: from_base64('QQ==')	@default: from_base64(string:VARCHAR) -> BLOB*/
  from_base64(): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example: regexp_replace('hello', '[lo]', '-')	@default: regexp_replace(string:VARCHAR, pattern:VARCHAR, replacement:VARCHAR, options:VARCHAR | ) -> VARCHAR*/
  regexp_replace(pattern: DVarcharable | RegExp, replacement: DVarcharable, options?: DAnyable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if string begins with search_string	@example: starts_with('abc','a')	@default: starts_with(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  starts_with(searchString: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: from_json_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json_strict(col1: DVarcharable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the MD5 hash of the value as a string	@example: md5('123')	@default: md5(value:VARCHAR) -> VARCHAR*/
  md5(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: date_diff(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_diff(startdate: DDateable, enddate: DDateable): DNumericField;
  /**                                                            @description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: datediff(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datediff: this["date_diff"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the SHA1 hash of the value	@example: sha1('hello')	@default: sha1(value:VARCHAR) -> VARCHAR*/
  sha1(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Splits the string along the separator	@example: string_split('hello-world', '-')	@default: string_to_array(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_to_array(separator: DVarcharable): DArrayField<DVarcharField>;
  /**                                                            @description: Splits the string along the separator	@example: string_split('hello-world', '-')	@default: string_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_split: this["string_to_array"];
  /**                                                            @description: Splits the string along the separator	@example: string_split('hello-world', '-')	@default: str_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  str_split: this["string_to_array"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)	@default: substring_grapheme(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring_grapheme(start: DNumericable, length?: DAnyable | DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if the entire string matches the regex. A set of optional options can be set.	@example: regexp_full_match('anabanana', '(an)*')	@default: regexp_full_match(string:VARCHAR, regex:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_full_match(regex: DVarcharable | RegExp, options?: DAnyable | DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@default: md5_number(value:VARCHAR) -> HUGEINT*/
  md5_number(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@default: mismatches(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  mismatches(str2: DVarcharable): DNumericField;
  /**                                                            @description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@default: hamming(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  hamming: this["mismatches"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Reverses the string	@example: reverse('hello')	@default: reverse(string:VARCHAR) -> VARCHAR*/
  reverse(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example: regexp_matches('anabanana', '(an)*')	@default: regexp_matches(string:VARCHAR, pattern:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_matches(pattern: DVarcharable | RegExp, options?: DAnyable | DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Formats a string using fmt syntax	@example: format('Benchmark "{}" took {} seconds', 'CSV', 42)	@default: format(format:VARCHAR) -> VARCHAR*/
  format(...vargs: DAnyable[]): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: stem(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  stem(col1: DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@default: bitstring(bitstring:VARCHAR, length:INTEGER) -> BIT*/
  bitstring(length: DNumericable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Writes to the logger	@example: write_log('Hello')	@default: write_log(string:VARCHAR) -> ANY*/
  write_log(...vargs: DAnyable[]): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: ilike_escape('A%c', 'a$%C', '$')	@default: ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the SHA256 hash of the value	@example: sha256('hello')	@default: sha256(value:VARCHAR) -> VARCHAR*/
  sha256(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: html_escape(col0:VARCHAR, col1:BOOLEAN | ) -> VARCHAR*/
  html_escape(col1?: DAnyable | DBoolable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Removes any occurrences of any of the characters from the left side of the string	@example: ltrim('>>>>test<<', '><')	@default: ltrim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  ltrim(characters?: DAnyable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_winkler_similarity('duck', 'duckdb', 0.5)	@default: jaro_winkler_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_winkler_similarity(str2: DVarcharable, scoreCutoff?: DAnyable | DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example: translate('12345', '143', 'ax')	@default: translate(string:VARCHAR, from:VARCHAR, to:VARCHAR) -> VARCHAR*/
  translate(from: DVarcharable, to: DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns whether or not the database/schema are in the search path	@example: in_search_path('memory', 'main')	@default: in_search_path(databaseName:VARCHAR, schemaName:VARCHAR) -> BOOLEAN*/
  in_search_path(schemaName: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example: url_encode('this string has/ special+ characters>')	@default: url_encode(input:VARCHAR) -> VARCHAR*/
  url_encode(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: prefix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  prefix(col1: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: suffix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  suffix(col1: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@default: unicode(str:VARCHAR) -> INTEGER*/
  unicode(): DNumericField;
  /**                                                            @description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@default: ord(str:VARCHAR) -> INTEGER*/
  ord: this["unicode"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Pads the string with the character from the left until it has count characters	@example: lpad('hello', 10, '>')	@default: lpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  lpad(count: DNumericable, character: DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example: parse_filename('path/to/file.csv', true, 'forward_slash')	@default: parse_filename(string:VARCHAR, trimExtension:BOOLEAN | VARCHAR | , separator:VARCHAR | ) -> VARCHAR*/
  parse_filename(trimExtension?: DAnyable | DBoolable | DVarcharable, separator?: DAnyable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@default: levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  levenshtein(str2: DVarcharable): DNumericField;
  /**                                                            @description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@default: editdist3(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  editdist3: this["levenshtein"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@default: position(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  position(needle: DVarcharable): DNumericField;
  /**                                                            @description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@default: strpos(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  strpos: this["position"];
  /**                                                            @description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@default: instr(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  instr: this["position"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Formats a string using printf syntax	@example: printf('Benchmark "%s" took %d seconds', 'CSV', 42)	@default: printf(format:VARCHAR) -> VARCHAR*/
  printf(...vargs: DAnyable[]): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: like_escape('a%c', 'a$%c', '$')	@default: like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_path('path/to/file.csv', 'system')	@default: parse_path(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR[]*/
  parse_path(separator?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaccard('duck','luck')	@default: jaccard(str1:VARCHAR, str2:VARCHAR) -> DOUBLE*/
  jaccard(str2: DVarcharable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example: damerau_levenshtein('hello', 'world')	@default: damerau_levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  damerau_levenshtein(str2: DVarcharable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Removes any occurrences of any of the characters from the right side of the string	@example: rtrim('>>>>test<<', '><')	@default: rtrim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  rtrim(characters?: DAnyable | DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Replaces any occurrences of the source with target in string	@example: replace('hello', 'l', '-')	@default: replace(string:VARCHAR, source:VARCHAR, target:VARCHAR) -> VARCHAR*/
  replace(source: DVarcharable, target: DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: bit_length(col0:VARCHAR) -> BIGINT*/
  bit_length(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example: regexp_extract_all('hello_world', '([a-z ]+)_?', 1)	@default: regexp_extract_all(string:VARCHAR, regex:VARCHAR, group0:INTEGER | , options:VARCHAR | ) -> VARCHAR[]*/
  regexp_extract_all(regex: DVarcharable | RegExp, group0?: DAnyable | DNumericable, options?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: to_hex(value:VARCHAR) -> VARCHAR*/
  to_hex(): DVarcharField;
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: hex(value:VARCHAR) -> VARCHAR*/
  hex: this["to_hex"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Convert varchar to blob. Converts utf-8 characters into literal encoding	@example: encode('my_string_with_ü')	@default: encode(string:VARCHAR) -> BLOB*/
  encode(): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: ends_with(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  ends_with(col1: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: from_json(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json(col1: DVarcharable): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: getvariable(col0:VARCHAR) -> ANY*/
  getvariable(): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@default: date_part(ts:VARCHAR, col1:DATE | INTERVAL | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_part(col1: DAnyable | DDateable): DNumericField;
  /**                                                            @description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@default: datepart(ts:VARCHAR, col1:DATE | INTERVAL | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datepart: this["date_part"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_ilike_escape('A%c', 'a$%C', '$')	@default: not_ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Pads the string with the character from the right until it has count characters	@example: rpad('hello', 10, '<')	@default: rpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  rpad(count: DNumericable, character: DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@default: from_hex(value:VARCHAR) -> BLOB*/
  from_hex(): DAnyField;
  /**                                                            @description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@default: unhex(value:VARCHAR) -> BLOB*/
  unhex: this["from_hex"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Number of bytes in string.	@example: strlen('🦆')	@default: strlen(string:VARCHAR) -> BIGINT*/
  strlen(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Number of grapheme clusters in string.	@example: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')	@default: length_grapheme(string:VARCHAR) -> BIGINT*/
  length_grapheme(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the left-most count grapheme clusters	@example: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@default: left_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left_grapheme(count: DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: html_unescape(col0:VARCHAR) -> VARCHAR*/
  html_unescape(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Escapes all potentially meaningful regexp characters in the input string	@example: regexp_escape('https://duckdb.org')	@default: regexp_escape(string:VARCHAR) -> VARCHAR*/
  regexp_escape(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Strips accents from string.	@example: strip_accents('mühleisen')	@default: strip_accents(string:VARCHAR) -> VARCHAR*/
  strip_accents(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Return the following value of the sequence.	@example: nextval('my_sequence_name')	@default: nextval(sequenceName:VARCHAR) -> BIGINT*/
  nextval(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: icu_sort_key(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  icu_sort_key(col1: DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the left-most count characters	@example: left('Hello🦆', 2)	@default: left(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left(count: DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@default: regexp_split_to_array(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  regexp_split_to_array(separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**                                                            @description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@default: string_split_regex(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  string_split_regex: this["regexp_split_to_array"];
  /**                                                            @description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@default: str_split_regex(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  str_split_regex: this["regexp_split_to_array"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_like_escape('a%c', 'a$%c', '$')	@default: not_like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the right-most count grapheme clusters	@example: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@default: right_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right_grapheme(count: DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@default: strftime(data:VARCHAR, format:DATE | TIMESTAMP | TIMESTAMP_NS) -> VARCHAR*/
  strftime(format: DDateable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
}
export type DVarcharField = _DVarcharField & string;
export interface _DNumericField extends DAnyField {
  [sInferred]: number;
  [sComptype]: DNumericComp;
  /**                                                            @description: Computes the arctangent (y, x)	@example: atan2(1.0, 0.0)	@default: atan2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  atan2(x: DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Bitwise XOR	@example: xor(17, 5)	@default: xor(left:BIGINT, right:BIGINT) -> BIGINT*/
  xor(right: DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the sign of x as -1, 0 or 1	@example: sign(-349)	@default: sign(x:BIGINT) -> TINYINT*/
  sign(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: add(col0:BIGINT, col1:BIGINT | ) -> BIGINT*/
  add(col1?: DAnyable | DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Rounds the number up	@example: ceil(17.4)	@default: ceiling(x:DECIMAL) -> DECIMAL*/
  ceiling(): DNumericField;
  /**                                                            @description: Rounds the number up	@example: ceil(17.4)	@default: ceil(x:DECIMAL) -> DECIMAL*/
  ceil: this["ceiling"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@default: generate_series(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  generate_series(stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@default: range(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  range(stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Truncates the number	@example: trunc(17.4)	@default: trunc(x:BIGINT) -> BIGINT*/
  trunc(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns a character which is corresponding the ASCII code value or Unicode code point	@example: chr(65)	@default: chr(codePoint:INTEGER) -> VARCHAR*/
  chr(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns true if the floating point value is not a number, false otherwise	@example: isnan('NaN'::FLOAT)	@default: isnan(x:DOUBLE) -> BOOLEAN*/
  isnan(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the natural logarithm of x	@example: ln(2)	@default: ln(x:DOUBLE) -> DOUBLE*/
  ln(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the cos of x	@example: cos(90)	@default: cos(x:DOUBLE) -> DOUBLE*/
  cos(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the tan of x	@example: tan(90)	@default: tan(x:DOUBLE) -> DOUBLE*/
  tan(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the sin of x	@example: sin(90)	@default: sin(x:DOUBLE) -> DOUBLE*/
  sin(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Rounds the number down	@example: floor(17.4)	@default: floor(x:DECIMAL) -> DECIMAL*/
  floor(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: to_binary(value:BIGINT) -> VARCHAR*/
  to_binary(): DVarcharField;
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: bin(value:BIGINT) -> VARCHAR*/
  bin: this["to_binary"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the 2-log of x	@example: log2(8)	@default: log2(x:DOUBLE) -> DOUBLE*/
  log2(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the 10-log of x	@example: log10(1000)	@default: log10(x:DOUBLE) -> DOUBLE*/
  log10(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: mod(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  mod(col1: DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the log of the gamma function	@example: lgamma(2)	@default: lgamma(x:DOUBLE) -> DOUBLE*/
  lgamma(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example: format_bytes(1000 * 16)	@default: formatReadableDecimalSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableDecimalSize(): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@default: isfinite(x:DOUBLE) -> BOOLEAN*/
  isfinite(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  text(col1: DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the arcsine of x	@example: asin(0.5)	@default: asin(x:DOUBLE) -> DOUBLE*/
  asin(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Sets the seed to be used for the random function	@example: setseed(0.42)	@default: setseed(col0:DOUBLE) -> "NULL"*/
  setseed(): DAnyField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the number of bits that are set	@example: bit_count(31)	@default: bit_count(x:BIGINT) -> TINYINT*/
  bit_count(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the cube root of x	@example: cbrt(8)	@default: cbrt(x:DOUBLE) -> DOUBLE*/
  cbrt(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@default: formatReadableSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableSize(): DVarcharField;
  /**                                                            @description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@default: format_bytes(bytes:BIGINT) -> VARCHAR*/
  format_bytes: this["formatReadableSize"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: subtract(col0:BIGINT, col1:BIGINT | ) -> BIGINT*/
  subtract(col1?: DAnyable | DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example: bar(5, 0, 20, 10)	@default: bar(x:DOUBLE, min:DOUBLE, max:DOUBLE, width:DOUBLE | ) -> VARCHAR*/
  bar(min: DNumericable, max: DNumericable, width?: DAnyable | DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the next floating point value after x in the direction of y	@example: nextafter(1::float, 2::float)	@default: nextafter(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  nextafter(y: DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: divide(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  divide(col1: DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the arccosine of x	@example: acos(0.5)	@default: acos(x:DOUBLE) -> DOUBLE*/
  acos(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the cotangent of x	@example: cot(0.5)	@default: cot(x:DOUBLE) -> DOUBLE*/
  cot(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts degrees to radians	@example: radians(90)	@default: radians(x:DOUBLE) -> DOUBLE*/
  radians(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts radians to degrees	@example: degrees(pi())	@default: degrees(x:DOUBLE) -> DOUBLE*/
  degrees(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the inverse hyperbolic cos of x	@example: acosh(2.3)	@default: acosh(x:DOUBLE) -> DOUBLE*/
  acosh(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the inverse hyperbolic tan of x	@example: atanh(0.5)	@default: atanh(x:DOUBLE) -> DOUBLE*/
  atanh(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the inverse hyperbolic sin of x	@example: asinh(0.5)	@default: asinh(x:DOUBLE) -> DOUBLE*/
  asinh(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@default: equi_width_bins(min:BIGINT, max:BIGINT, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes e to the power of x	@example: exp(1)	@default: exp(x:DOUBLE) -> DOUBLE*/
  exp(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the arctangent of x	@example: atan(0.5)	@default: atan(x:DOUBLE) -> DOUBLE*/
  atan(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the square root of x	@example: sqrt(4)	@default: sqrt(x:DOUBLE) -> DOUBLE*/
  sqrt(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@default: least_common_multiple(x:BIGINT, y:BIGINT) -> BIGINT*/
  least_common_multiple(y: DNumericable): DNumericField;
  /**                                                            @description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@default: lcm(x:BIGINT, y:BIGINT) -> BIGINT*/
  lcm: this["least_common_multiple"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@default: isinf(x:DOUBLE) -> BOOLEAN*/
  isinf(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns whether the signbit is set or not	@example: signbit(-0.0)	@default: signbit(x:DOUBLE) -> BOOLEAN*/
  signbit(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example: to_base(42, 16)	@default: to_base(number:BIGINT, radix:INTEGER, minLength:INTEGER | ) -> VARCHAR*/
  to_base(radix: DNumericable, minLength?: DAnyable | DNumericable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: multiply(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  multiply(col1: DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: to_hex(value:BIGINT) -> VARCHAR*/
  to_hex(): DVarcharField;
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: hex(value:BIGINT) -> VARCHAR*/
  hex: this["to_hex"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Factorial of x. Computes the product of the current integer and all integers below it	@example: 4!	@default: factorial(x:INTEGER) -> HUGEINT*/
  factorial(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Absolute value	@example: abs(-17.4)	@default: abs(x:BIGINT) -> BIGINT*/
  abs(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: excel_text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  excel_text(col1: DVarcharable): DVarcharField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Rounds x to s decimal places	@example: round(42.4332, 2)	@default: round(x:DECIMAL, precision:INTEGER | ) -> DECIMAL*/
  round(precision?: DAnyable | DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes x to the power of y	@example: pow(2, 3)	@default: power(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  power(y: DNumericable): DNumericField;
  /**                                                            @description: Computes x to the power of y	@example: pow(2, 3)	@default: pow(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  pow: this["power"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@default: greatest_common_divisor(x:BIGINT, y:BIGINT) -> BIGINT*/
  greatest_common_divisor(y: DNumericable): DNumericField;
  /**                                                            @description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@default: gcd(x:BIGINT, y:BIGINT) -> BIGINT*/
  gcd: this["greatest_common_divisor"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example: gamma(5.5)	@default: gamma(x:DOUBLE) -> DOUBLE*/
  gamma(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the hyperbolic cos of x	@example: cosh(1)	@default: cosh(x:DOUBLE) -> DOUBLE*/
  cosh(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the hyperbolic tan of x	@example: tanh(1)	@default: tanh(x:DOUBLE) -> DOUBLE*/
  tanh(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the hyperbolic sin of x	@example: sinh(1)	@default: sinh(x:DOUBLE) -> DOUBLE*/
  sinh(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Rounds x to next even number by rounding away from zero	@example: even(2.9)	@default: even(x:DOUBLE) -> DOUBLE*/
  even(): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example: log(2, 64)	@default: log(b:DOUBLE, x:DOUBLE | ) -> DOUBLE*/
  log(x?: DAnyable | DNumericable): DNumericField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
}
export type DNumericField = _DNumericField & number;

export interface _DVarcharComp extends DAnyComp {
  /**                                                            @description: Convert string to lower case	@example: lower('Hello')	@default: lcase(string:VARCHAR) -> VARCHAR*/
  lcase(): string & _DVarcharComp;
  /**                                                            @description: Convert string to lower case	@example: lower('Hello')	@default: lower(string:VARCHAR) -> VARCHAR*/
  lower: this["lcase"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirpath('path/to/file.csv', 'system')	@default: parse_dirpath(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirpath(separator?: DAnyable | DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Concatenate strings together separated by the specified separator.	@example: concat_ws(', ', 'Banana', 'Apple', 'Melon')	@default: concat_ws(separator:VARCHAR, string:ANY) -> VARCHAR*/
  concat_ws(string: DAnyable, ...vargs: DAnyable[]): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@default: substring(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring(start: DNumericable, length?: DAnyable | DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if search_string is found within string.	@example: contains('abc', 'a')	@default: contains(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  contains(searchString: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example: nfc_normalize('ardèch')	@default: nfc_normalize(string:VARCHAR) -> VARCHAR*/
  nfc_normalize(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Removes any occurrences of any of the characters from either side of the string	@example: trim('>>>>test<<', '><')	@default: trim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  trim(characters?: DAnyable | DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@default: list_element(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_element(index: DNumericable): string & _DVarcharComp;
  /**                                                            @description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@default: list_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_extract: this["list_element"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Convert string to upper case.	@example: upper('Hello')	@default: ucase(string:VARCHAR) -> VARCHAR*/
  ucase(): string & _DVarcharComp;
  /**                                                            @description: Convert string to upper case.	@example: upper('Hello')	@default: upper(string:VARCHAR) -> VARCHAR*/
  upper: this["ucase"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example: currval('my_sequence_name')	@default: currval(sequenceName:VARCHAR) -> BIGINT*/
  currval(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the right-most count characters	@example: right('Hello🦆', 3)	@default: right(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right(count: DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example: regexp_extract('abc', '([a-z])(b)', 1)	@default: regexp_extract(string:VARCHAR, pattern:VARCHAR, group0:INTEGER | VARCHAR[] | , options:VARCHAR | ) -> VARCHAR*/
  regexp_extract(pattern: DVarcharable | RegExp, group0?: DAnyable | DArrayable | DNumericable, options?: DAnyable | DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the current value of the configuration setting	@example: current_setting('access_mode')	@default: current_setting(settingName:VARCHAR) -> ANY*/
  current_setting(): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: date_sub(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_sub(startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**                                                            @description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: datesub(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datesub: this["date_sub"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirname('path/to/file.csv', 'system')	@default: parse_dirname(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirname(separator?: DAnyable | DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_similarity('duck', 'duckdb', 0.5)	@default: jaro_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_similarity(str2: DVarcharable, scoreCutoff?: DAnyable | DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Unescapes the URL encoded input.	@example: url_decode('this%20string%20is%2BFencoded')	@default: url_decode(input:VARCHAR) -> VARCHAR*/
  url_decode(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Repeats the string count number of times	@example: repeat('A', 5)	@default: repeat(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  repeat(count: DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: to_binary(value:VARCHAR) -> VARCHAR*/
  to_binary(): string & _DVarcharComp;
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: bin(value:VARCHAR) -> VARCHAR*/
  bin: this["to_binary"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@default: array_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  array_extract(index: DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Number of characters in string.	@example: length('Hello🦆')	@default: len(string:VARCHAR) -> BIGINT*/
  len(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Throws the given error message	@example: error('access_mode')	@default: error(message:VARCHAR) -> "NULL"*/
  error(): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns an integer that represents the Unicode code point of the first character of the string	@example: ascii('Ω')	@default: ascii(string:VARCHAR) -> INTEGER*/
  ascii(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts a value from binary representation to a blob	@example: unbin('0110')	@default: from_binary(value:VARCHAR) -> BLOB*/
  from_binary(): DAnyComp;
  /**                                                            @description: Converts a value from binary representation to a blob	@example: unbin('0110')	@default: unbin(value:VARCHAR) -> BLOB*/
  unbin: this["from_binary"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Convert a base64 encoded string to a character string	@example: from_base64('QQ==')	@default: from_base64(string:VARCHAR) -> BLOB*/
  from_base64(): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example: regexp_replace('hello', '[lo]', '-')	@default: regexp_replace(string:VARCHAR, pattern:VARCHAR, replacement:VARCHAR, options:VARCHAR | ) -> VARCHAR*/
  regexp_replace(pattern: DVarcharable | RegExp, replacement: DVarcharable, options?: DAnyable | DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if string begins with search_string	@example: starts_with('abc','a')	@default: starts_with(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  starts_with(searchString: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: from_json_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json_strict(col1: DVarcharable): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the MD5 hash of the value as a string	@example: md5('123')	@default: md5(value:VARCHAR) -> VARCHAR*/
  md5(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: date_diff(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_diff(startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**                                                            @description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: datediff(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datediff: this["date_diff"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the SHA1 hash of the value	@example: sha1('hello')	@default: sha1(value:VARCHAR) -> VARCHAR*/
  sha1(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Splits the string along the separator	@example: string_split('hello-world', '-')	@default: string_to_array(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_to_array(separator: DVarcharable): DArrayField<DVarcharField>;
  /**                                                            @description: Splits the string along the separator	@example: string_split('hello-world', '-')	@default: string_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_split: this["string_to_array"];
  /**                                                            @description: Splits the string along the separator	@example: string_split('hello-world', '-')	@default: str_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  str_split: this["string_to_array"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)	@default: substring_grapheme(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring_grapheme(start: DNumericable, length?: DAnyable | DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if the entire string matches the regex. A set of optional options can be set.	@example: regexp_full_match('anabanana', '(an)*')	@default: regexp_full_match(string:VARCHAR, regex:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_full_match(regex: DVarcharable | RegExp, options?: DAnyable | DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@default: md5_number(value:VARCHAR) -> HUGEINT*/
  md5_number(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@default: mismatches(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  mismatches(str2: DVarcharable): number & _DNumericComp;
  /**                                                            @description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@default: hamming(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  hamming: this["mismatches"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Reverses the string	@example: reverse('hello')	@default: reverse(string:VARCHAR) -> VARCHAR*/
  reverse(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example: regexp_matches('anabanana', '(an)*')	@default: regexp_matches(string:VARCHAR, pattern:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_matches(pattern: DVarcharable | RegExp, options?: DAnyable | DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Formats a string using fmt syntax	@example: format('Benchmark "{}" took {} seconds', 'CSV', 42)	@default: format(format:VARCHAR) -> VARCHAR*/
  format(...vargs: DAnyable[]): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: stem(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  stem(col1: DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@default: bitstring(bitstring:VARCHAR, length:INTEGER) -> BIT*/
  bitstring(length: DNumericable): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Writes to the logger	@example: write_log('Hello')	@default: write_log(string:VARCHAR) -> ANY*/
  write_log(...vargs: DAnyable[]): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: ilike_escape('A%c', 'a$%C', '$')	@default: ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the SHA256 hash of the value	@example: sha256('hello')	@default: sha256(value:VARCHAR) -> VARCHAR*/
  sha256(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: html_escape(col0:VARCHAR, col1:BOOLEAN | ) -> VARCHAR*/
  html_escape(col1?: DAnyable | DBoolable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Removes any occurrences of any of the characters from the left side of the string	@example: ltrim('>>>>test<<', '><')	@default: ltrim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  ltrim(characters?: DAnyable | DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_winkler_similarity('duck', 'duckdb', 0.5)	@default: jaro_winkler_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_winkler_similarity(str2: DVarcharable, scoreCutoff?: DAnyable | DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example: translate('12345', '143', 'ax')	@default: translate(string:VARCHAR, from:VARCHAR, to:VARCHAR) -> VARCHAR*/
  translate(from: DVarcharable, to: DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns whether or not the database/schema are in the search path	@example: in_search_path('memory', 'main')	@default: in_search_path(databaseName:VARCHAR, schemaName:VARCHAR) -> BOOLEAN*/
  in_search_path(schemaName: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example: url_encode('this string has/ special+ characters>')	@default: url_encode(input:VARCHAR) -> VARCHAR*/
  url_encode(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: prefix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  prefix(col1: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: suffix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  suffix(col1: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@default: unicode(str:VARCHAR) -> INTEGER*/
  unicode(): number & _DNumericComp;
  /**                                                            @description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@default: ord(str:VARCHAR) -> INTEGER*/
  ord: this["unicode"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Pads the string with the character from the left until it has count characters	@example: lpad('hello', 10, '>')	@default: lpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  lpad(count: DNumericable, character: DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example: parse_filename('path/to/file.csv', true, 'forward_slash')	@default: parse_filename(string:VARCHAR, trimExtension:BOOLEAN | VARCHAR | , separator:VARCHAR | ) -> VARCHAR*/
  parse_filename(trimExtension?: DAnyable | DBoolable | DVarcharable, separator?: DAnyable | DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@default: levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  levenshtein(str2: DVarcharable): number & _DNumericComp;
  /**                                                            @description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@default: editdist3(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  editdist3: this["levenshtein"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@default: position(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  position(needle: DVarcharable): number & _DNumericComp;
  /**                                                            @description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@default: strpos(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  strpos: this["position"];
  /**                                                            @description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@default: instr(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  instr: this["position"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Formats a string using printf syntax	@example: printf('Benchmark "%s" took %d seconds', 'CSV', 42)	@default: printf(format:VARCHAR) -> VARCHAR*/
  printf(...vargs: DAnyable[]): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: like_escape('a%c', 'a$%c', '$')	@default: like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_path('path/to/file.csv', 'system')	@default: parse_path(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR[]*/
  parse_path(separator?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaccard('duck','luck')	@default: jaccard(str1:VARCHAR, str2:VARCHAR) -> DOUBLE*/
  jaccard(str2: DVarcharable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example: damerau_levenshtein('hello', 'world')	@default: damerau_levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  damerau_levenshtein(str2: DVarcharable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Removes any occurrences of any of the characters from the right side of the string	@example: rtrim('>>>>test<<', '><')	@default: rtrim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  rtrim(characters?: DAnyable | DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Replaces any occurrences of the source with target in string	@example: replace('hello', 'l', '-')	@default: replace(string:VARCHAR, source:VARCHAR, target:VARCHAR) -> VARCHAR*/
  replace(source: DVarcharable, target: DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: bit_length(col0:VARCHAR) -> BIGINT*/
  bit_length(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example: regexp_extract_all('hello_world', '([a-z ]+)_?', 1)	@default: regexp_extract_all(string:VARCHAR, regex:VARCHAR, group0:INTEGER | , options:VARCHAR | ) -> VARCHAR[]*/
  regexp_extract_all(regex: DVarcharable | RegExp, group0?: DAnyable | DNumericable, options?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: to_hex(value:VARCHAR) -> VARCHAR*/
  to_hex(): string & _DVarcharComp;
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: hex(value:VARCHAR) -> VARCHAR*/
  hex: this["to_hex"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Convert varchar to blob. Converts utf-8 characters into literal encoding	@example: encode('my_string_with_ü')	@default: encode(string:VARCHAR) -> BLOB*/
  encode(): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: ends_with(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  ends_with(col1: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: from_json(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json(col1: DVarcharable): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: getvariable(col0:VARCHAR) -> ANY*/
  getvariable(): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@default: date_part(ts:VARCHAR, col1:DATE | INTERVAL | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_part(col1: DAnyable | DDateable): number & _DNumericComp;
  /**                                                            @description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@default: datepart(ts:VARCHAR, col1:DATE | INTERVAL | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datepart: this["date_part"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_ilike_escape('A%c', 'a$%C', '$')	@default: not_ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Pads the string with the character from the right until it has count characters	@example: rpad('hello', 10, '<')	@default: rpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  rpad(count: DNumericable, character: DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@default: from_hex(value:VARCHAR) -> BLOB*/
  from_hex(): DAnyComp;
  /**                                                            @description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@default: unhex(value:VARCHAR) -> BLOB*/
  unhex: this["from_hex"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Number of bytes in string.	@example: strlen('🦆')	@default: strlen(string:VARCHAR) -> BIGINT*/
  strlen(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Number of grapheme clusters in string.	@example: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')	@default: length_grapheme(string:VARCHAR) -> BIGINT*/
  length_grapheme(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the left-most count grapheme clusters	@example: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@default: left_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left_grapheme(count: DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: html_unescape(col0:VARCHAR) -> VARCHAR*/
  html_unescape(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Escapes all potentially meaningful regexp characters in the input string	@example: regexp_escape('https://duckdb.org')	@default: regexp_escape(string:VARCHAR) -> VARCHAR*/
  regexp_escape(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Strips accents from string.	@example: strip_accents('mühleisen')	@default: strip_accents(string:VARCHAR) -> VARCHAR*/
  strip_accents(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Return the following value of the sequence.	@example: nextval('my_sequence_name')	@default: nextval(sequenceName:VARCHAR) -> BIGINT*/
  nextval(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @default: icu_sort_key(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  icu_sort_key(col1: DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the left-most count characters	@example: left('Hello🦆', 2)	@default: left(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left(count: DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@default: regexp_split_to_array(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  regexp_split_to_array(separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**                                                            @description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@default: string_split_regex(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  string_split_regex: this["regexp_split_to_array"];
  /**                                                            @description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@default: str_split_regex(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  str_split_regex: this["regexp_split_to_array"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_like_escape('a%c', 'a$%c', '$')	@default: not_like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Extract the right-most count grapheme clusters	@example: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@default: right_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right_grapheme(count: DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
  /**                                                            @description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@default: strftime(data:VARCHAR, format:DATE | TIMESTAMP | TIMESTAMP_NS) -> VARCHAR*/
  strftime(format: DDateable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DVarchar] - - - - - - -  */
}
export type DVarcharComp = _DVarcharComp & string;

export interface _DNumericComp extends DAnyComp {
  /**                                                            @description: Computes the arctangent (y, x)	@example: atan2(1.0, 0.0)	@default: atan2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  atan2(x: DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Bitwise XOR	@example: xor(17, 5)	@default: xor(left:BIGINT, right:BIGINT) -> BIGINT*/
  xor(right: DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the sign of x as -1, 0 or 1	@example: sign(-349)	@default: sign(x:BIGINT) -> TINYINT*/
  sign(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: add(col0:BIGINT, col1:BIGINT | ) -> BIGINT*/
  add(col1?: DAnyable | DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Rounds the number up	@example: ceil(17.4)	@default: ceiling(x:DECIMAL) -> DECIMAL*/
  ceiling(): number & _DNumericComp;
  /**                                                            @description: Rounds the number up	@example: ceil(17.4)	@default: ceil(x:DECIMAL) -> DECIMAL*/
  ceil: this["ceiling"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@default: generate_series(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  generate_series(stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@default: range(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  range(stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Truncates the number	@example: trunc(17.4)	@default: trunc(x:BIGINT) -> BIGINT*/
  trunc(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns a character which is corresponding the ASCII code value or Unicode code point	@example: chr(65)	@default: chr(codePoint:INTEGER) -> VARCHAR*/
  chr(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns true if the floating point value is not a number, false otherwise	@example: isnan('NaN'::FLOAT)	@default: isnan(x:DOUBLE) -> BOOLEAN*/
  isnan(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the natural logarithm of x	@example: ln(2)	@default: ln(x:DOUBLE) -> DOUBLE*/
  ln(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the cos of x	@example: cos(90)	@default: cos(x:DOUBLE) -> DOUBLE*/
  cos(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the tan of x	@example: tan(90)	@default: tan(x:DOUBLE) -> DOUBLE*/
  tan(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the sin of x	@example: sin(90)	@default: sin(x:DOUBLE) -> DOUBLE*/
  sin(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Rounds the number down	@example: floor(17.4)	@default: floor(x:DECIMAL) -> DECIMAL*/
  floor(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: to_binary(value:BIGINT) -> VARCHAR*/
  to_binary(): string & _DVarcharComp;
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: bin(value:BIGINT) -> VARCHAR*/
  bin: this["to_binary"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the 2-log of x	@example: log2(8)	@default: log2(x:DOUBLE) -> DOUBLE*/
  log2(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the 10-log of x	@example: log10(1000)	@default: log10(x:DOUBLE) -> DOUBLE*/
  log10(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: mod(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  mod(col1: DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the log of the gamma function	@example: lgamma(2)	@default: lgamma(x:DOUBLE) -> DOUBLE*/
  lgamma(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example: format_bytes(1000 * 16)	@default: formatReadableDecimalSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableDecimalSize(): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@default: isfinite(x:DOUBLE) -> BOOLEAN*/
  isfinite(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  text(col1: DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the arcsine of x	@example: asin(0.5)	@default: asin(x:DOUBLE) -> DOUBLE*/
  asin(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Sets the seed to be used for the random function	@example: setseed(0.42)	@default: setseed(col0:DOUBLE) -> "NULL"*/
  setseed(): DAnyComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the number of bits that are set	@example: bit_count(31)	@default: bit_count(x:BIGINT) -> TINYINT*/
  bit_count(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the cube root of x	@example: cbrt(8)	@default: cbrt(x:DOUBLE) -> DOUBLE*/
  cbrt(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@default: formatReadableSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableSize(): string & _DVarcharComp;
  /**                                                            @description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@default: format_bytes(bytes:BIGINT) -> VARCHAR*/
  format_bytes: this["formatReadableSize"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: subtract(col0:BIGINT, col1:BIGINT | ) -> BIGINT*/
  subtract(col1?: DAnyable | DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example: bar(5, 0, 20, 10)	@default: bar(x:DOUBLE, min:DOUBLE, max:DOUBLE, width:DOUBLE | ) -> VARCHAR*/
  bar(min: DNumericable, max: DNumericable, width?: DAnyable | DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the next floating point value after x in the direction of y	@example: nextafter(1::float, 2::float)	@default: nextafter(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  nextafter(y: DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: divide(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  divide(col1: DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the arccosine of x	@example: acos(0.5)	@default: acos(x:DOUBLE) -> DOUBLE*/
  acos(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the cotangent of x	@example: cot(0.5)	@default: cot(x:DOUBLE) -> DOUBLE*/
  cot(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts degrees to radians	@example: radians(90)	@default: radians(x:DOUBLE) -> DOUBLE*/
  radians(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts radians to degrees	@example: degrees(pi())	@default: degrees(x:DOUBLE) -> DOUBLE*/
  degrees(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the inverse hyperbolic cos of x	@example: acosh(2.3)	@default: acosh(x:DOUBLE) -> DOUBLE*/
  acosh(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the inverse hyperbolic tan of x	@example: atanh(0.5)	@default: atanh(x:DOUBLE) -> DOUBLE*/
  atanh(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the inverse hyperbolic sin of x	@example: asinh(0.5)	@default: asinh(x:DOUBLE) -> DOUBLE*/
  asinh(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@default: equi_width_bins(min:BIGINT, max:BIGINT, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes e to the power of x	@example: exp(1)	@default: exp(x:DOUBLE) -> DOUBLE*/
  exp(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the arctangent of x	@example: atan(0.5)	@default: atan(x:DOUBLE) -> DOUBLE*/
  atan(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns the square root of x	@example: sqrt(4)	@default: sqrt(x:DOUBLE) -> DOUBLE*/
  sqrt(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@default: least_common_multiple(x:BIGINT, y:BIGINT) -> BIGINT*/
  least_common_multiple(y: DNumericable): number & _DNumericComp;
  /**                                                            @description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@default: lcm(x:BIGINT, y:BIGINT) -> BIGINT*/
  lcm: this["least_common_multiple"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@default: isinf(x:DOUBLE) -> BOOLEAN*/
  isinf(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Returns whether the signbit is set or not	@example: signbit(-0.0)	@default: signbit(x:DOUBLE) -> BOOLEAN*/
  signbit(): DBoolField;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example: to_base(42, 16)	@default: to_base(number:BIGINT, radix:INTEGER, minLength:INTEGER | ) -> VARCHAR*/
  to_base(radix: DNumericable, minLength?: DAnyable | DNumericable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: multiply(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  multiply(col1: DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: to_hex(value:BIGINT) -> VARCHAR*/
  to_hex(): string & _DVarcharComp;
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: hex(value:BIGINT) -> VARCHAR*/
  hex: this["to_hex"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Factorial of x. Computes the product of the current integer and all integers below it	@example: 4!	@default: factorial(x:INTEGER) -> HUGEINT*/
  factorial(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Absolute value	@example: abs(-17.4)	@default: abs(x:BIGINT) -> BIGINT*/
  abs(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @default: excel_text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  excel_text(col1: DVarcharable): string & _DVarcharComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Rounds x to s decimal places	@example: round(42.4332, 2)	@default: round(x:DECIMAL, precision:INTEGER | ) -> DECIMAL*/
  round(precision?: DAnyable | DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes x to the power of y	@example: pow(2, 3)	@default: power(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  power(y: DNumericable): number & _DNumericComp;
  /**                                                            @description: Computes x to the power of y	@example: pow(2, 3)	@default: pow(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  pow: this["power"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@default: greatest_common_divisor(x:BIGINT, y:BIGINT) -> BIGINT*/
  greatest_common_divisor(y: DNumericable): number & _DNumericComp;
  /**                                                            @description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@default: gcd(x:BIGINT, y:BIGINT) -> BIGINT*/
  gcd: this["greatest_common_divisor"];
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example: gamma(5.5)	@default: gamma(x:DOUBLE) -> DOUBLE*/
  gamma(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the hyperbolic cos of x	@example: cosh(1)	@default: cosh(x:DOUBLE) -> DOUBLE*/
  cosh(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the hyperbolic tan of x	@example: tanh(1)	@default: tanh(x:DOUBLE) -> DOUBLE*/
  tanh(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the hyperbolic sin of x	@example: sinh(1)	@default: sinh(x:DOUBLE) -> DOUBLE*/
  sinh(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Rounds x to next even number by rounding away from zero	@example: even(2.9)	@default: even(x:DOUBLE) -> DOUBLE*/
  even(): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
  /**                                                            @description: Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example: log(2, 64)	@default: log(b:DOUBLE, x:DOUBLE | ) -> DOUBLE*/
  log(x?: DAnyable | DNumericable): number & _DNumericComp;
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - [DNumeric] - - - - - - -  */
}
export type DNumericComp = number & _DNumericComp;

export interface DAggregate<DNum, DStr> {
  /**                                                            @description: Calculates the product of all tuples in arg.	@example: product(A)	@default: product(arg:DOUBLE) -> DOUBLE*/
  product(arg: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example: kahan_sum(A)	@default: kahan_sum(arg:DOUBLE) -> DOUBLE*/
  kahan_sum(arg: DNumericable): DNum;
  /**                                                            @description: Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example: kahan_sum(A)	@default: sumkahan(arg:DOUBLE) -> DOUBLE*/
  sumkahan: this["kahan_sum"];
  /**                                                            @description: Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example: kahan_sum(A)	@default: fsum(arg:DOUBLE) -> DOUBLE*/
  fsum: this["kahan_sum"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the population covariance of input values	@example: REGR_COUNT(y, x) * COVAR_POP(y, x)	@default: regr_sxy(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_sxy(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns TRUE if every input value is TRUE, otherwise FALSE.	@example: bool_and(A)	@default: bool_and(arg:BOOLEAN) -> BOOLEAN*/
  bool_and(arg: DBoolable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the excess kurtosis (Fisher’s definition) of all input values, with a bias correction according to the sample size	@default: kurtosis(x:DOUBLE) -> DOUBLE*/
  kurtosis(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  count_star(): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the coefficient of determination for non-null pairs in a group.	@default: regr_r2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_r2(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the average of the dependent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.	@default: regr_avgy(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_avgy(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Counts the total number of TRUE values for a boolean column	@example: count_if(A)	@default: count_if(arg:BOOLEAN) -> HUGEINT*/
  count_if(arg: DBoolable): DNum;
  /**                                                            @description: Counts the total number of TRUE values for a boolean column	@example: count_if(A)	@default: countif(arg:BOOLEAN) -> HUGEINT*/
  countif: this["count_if"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the slope of the linear regression line for non-null pairs in a group.	@example: COVAR_POP(x,y) / VAR_POP(x)	@default: regr_slope(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_slope(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Calculates the average using a more accurate floating point summation (Kahan Sum)	@example: favg(A)	@default: favg(x:DOUBLE) -> DOUBLE*/
  favg(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the sample variance of all input values.	@example: (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)	@default: var_samp(x:DOUBLE) -> DOUBLE*/
  var_samp(x: DNumericable): DNum;
  /**                                                            @description: Returns the sample variance of all input values.	@example: (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)	@default: variance(x:DOUBLE) -> DOUBLE*/
  variance: this["var_samp"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the population covariance of input values.	@example: (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)	@default: covar_pop(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  covar_pop(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Internal only. Calculates the sum value for all tuples in arg without overflow checks.	@example: sum_no_overflow(A)	@default: sum_no_overflow(arg:BIGINT | DECIMAL | INTEGER) -> HUGEINT*/
  sum_no_overflow(arg: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the sample standard deviation	@example: sqrt(var_samp(x))	@default: stddev_samp(x:DOUBLE) -> DOUBLE*/
  stddev_samp(x: DNumericable): DNum;
  /**                                                            @description: Returns the sample standard deviation	@example: sqrt(var_samp(x))	@default: stddev(x:DOUBLE) -> DOUBLE*/
  stddev: this["stddev_samp"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a LIST of STRUCTs with the fields bucket and count matching the buckets exactly.	@example: histogram_exact(A, [0, 1, 2])	@default: histogram_exact(arg:ANY, bins:ANY[]) -> MAP*/
  histogram_exact(arg: DAnyable, bins: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: REGR_COUNT(y, x) * VAR_POP(x)	@default: regr_sxx(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_sxx(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: REGR_COUNT(y, x) * VAR_POP(y)	@default: regr_syy(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_syy(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Calculates the average value for all tuples in x.	@example: SUM(x) / COUNT(*)	@default: mean(x:BIGINT | DECIMAL | DOUBLE | HUGEINT | INTEGER | SMALLINT) -> DECIMAL*/
  mean(x: DNumericable): DNum;
  /**                                                            @description: Calculates the average value for all tuples in x.	@example: SUM(x) / COUNT(*)	@default: avg(x:BIGINT | DECIMAL | DOUBLE | HUGEINT | INTEGER | SMALLINT) -> DOUBLE*/
  avg: this["mean"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the standard error of the mean	@default: sem(x:DOUBLE) -> DOUBLE*/
  sem(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example: quantile_disc(x, 0.5)	@default: quantile_disc(x:ANY, pos:DOUBLE | DOUBLE[] | ) -> ANY*/
  quantile_disc(x: DAnyable, pos?: DAnyable | DArrayable | DNumericable): DAnyField;
  /**                                                            @description: Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example: quantile_disc(x, 0.5)	@default: quantile(x:ANY, pos:DOUBLE | DOUBLE[] | ) -> ANY*/
  quantile: this["quantile_disc"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a LIST containing all the values of a column.	@example: list(A)	@default: array_agg(arg:ANY) -> LIST*/
  array_agg(arg: DAnyable): DArrayField;
  /**                                                            @description: Returns a LIST containing all the values of a column.	@example: list(A)	@default: list(arg:ANY) -> LIST*/
  list: this["array_agg"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the correlation coefficient for non-null pairs in a group.	@example: COVAR_POP(y, x) / (STDDEV_POP(x) * STDDEV_POP(y))	@default: corr(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  corr(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Calculates the sum value for all tuples in arg.	@example: sum(A)	@default: sum(arg:BIGINT | BOOLEAN | DECIMAL | DOUBLE | HUGEINT | INTEGER | SMALLINT) -> DOUBLE*/
  sum(arg: DBoolable | DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the sample covariance for non-null pairs in a group.	@example: (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / (COUNT(*) - 1)	@default: covar_samp(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  covar_samp(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the approximate count of distinct elements using HyperLogLog.	@example: approx_count_distinct(A)	@default: approx_count_distinct(any:ANY) -> BIGINT*/
  approx_count_distinct(any: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Finds the k approximately most occurring values in the data set	@example: approx_top_k(x, 5)	@default: approx_top_k(val:ANY, k:BIGINT) -> ANY[]*/
  approx_top_k(val: DAnyable, k: DNumericable): DArrayField<DAnyField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the middle value of the set. NULL values are ignored. For even value counts, quantitative values are averaged and ordinal values return the lower value.	@example: median(x)	@default: median(x:ANY) -> ANY*/
  median(x: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the skewness of all input values.	@example: skewness(A)	@default: skewness(x:DOUBLE) -> DOUBLE*/
  skewness(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a bitstring with bits set for each distinct value.	@example: bitstring_agg(A)	@default: bitstring_agg(arg:BIGINT | HUGEINT | INTEGER | SMALLINT | TINYINT | UBIGINT | UHUGEINT | UINTEGER | USMALLINT | UTINYINT, col1:BIGINT | HUGEINT | INTEGER | SMALLINT | TINYINT | UBIGINT | UHUGEINT | UINTEGER | USMALLINT | UTINYINT | , col2:BIGINT | HUGEINT | INTEGER | SMALLINT | TINYINT | UBIGINT | UHUGEINT | UINTEGER | USMALLINT | UTINYINT | ) -> BIT*/
  bitstring_agg(arg: DNumericable, col1?: DAnyable | DNumericable, col2?: DAnyable | DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the most frequent value for the values within x. NULL values are ignored.	@default: mode(x:ANY) -> ANY*/
  mode(x: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the average of the independent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.	@default: regr_avgx(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_avgx(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the population standard deviation.	@example: sqrt(var_pop(x))	@default: stddev_pop(x:DOUBLE) -> DOUBLE*/
  stddev_pop(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the number of non-null values in arg.	@example: count(A)	@default: count(arg:ANY | ) -> BIGINT*/
  count(arg?: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the log-2 entropy of count input-values.	@default: entropy(x:ANY) -> DOUBLE*/
  entropy(x: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the number of non-null number pairs in a group.	@example: (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)	@default: regr_count(y:DOUBLE, x:DOUBLE) -> UINTEGER*/
  regr_count(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Concatenates the column string values with an optional separator.	@example: string_agg(A, '-')	@default: group_concat(str:ANY, arg:VARCHAR | ) -> VARCHAR*/
  group_concat(str: DAnyable, arg?: DAnyable | DVarcharable): DStr;
  /**                                                            @description: Concatenates the column string values with an optional separator.	@example: string_agg(A, '-')	@default: string_agg(str:ANY, arg:VARCHAR | ) -> VARCHAR*/
  string_agg: this["group_concat"];
  /**                                                            @description: Concatenates the column string values with an optional separator.	@example: string_agg(A, '-')	@default: listagg(str:ANY, arg:VARCHAR | ) -> VARCHAR*/
  listagg: this["group_concat"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the excess kurtosis (Fisher’s definition) of all input values, without bias correction	@default: kurtosis_pop(x:DOUBLE) -> DOUBLE*/
  kurtosis_pop(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns TRUE if any input value is TRUE, otherwise FALSE.	@example: bool_or(A)	@default: bool_or(arg:BOOLEAN) -> BOOLEAN*/
  bool_or(arg: DBoolable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the population variance.	@default: var_pop(x:DOUBLE) -> DOUBLE*/
  var_pop(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the intercept of the univariate linear regression line for non-null pairs in a group.	@example: AVG(y)-REGR_SLOPE(y,x)*AVG(x)	@default: regr_intercept(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_intercept(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the first non-null value from arg. This function is affected by ordering.	@default: any_value(arg:ANY) -> ANY*/
  any_value(arg: DAnyable): DAnyField;
  /**                                                            @description: Returns the first non-null value from arg. This function is affected by ordering.	@default: any_value(arg:DECIMAL) -> DECIMAL*/
  any_value(arg: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the approximate quantile using T-Digest.	@example: approx_quantile(x, 0.5)	@default: approx_quantile(x:DATE | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, pos:FLOAT) -> DATE*/
  approx_quantile(x: DDateable, pos: DNumericable): DDateField;
  /**                                                            @description: Computes the approximate quantile using T-Digest.	@example: approx_quantile(x, 0.5)	@default: approx_quantile(x:BIGINT | DATE | DECIMAL | DOUBLE | FLOAT | HUGEINT | INTEGER | SMALLINT | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | TINYINT, pos:FLOAT[]) -> TIMESTAMP[]*/
  approx_quantile(x: DDateable | DNumericable, pos: DArrayable): DArrayField<DDateField>;
  /**                                                            @description: Computes the approximate quantile using T-Digest.	@example: approx_quantile(x, 0.5)	@default: approx_quantile(x:BIGINT | DECIMAL | DOUBLE | HUGEINT | INTEGER | SMALLINT, pos:FLOAT) -> DECIMAL*/
  approx_quantile(x: DNumericable, pos: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@default: arbitrary(arg:ANY) -> ANY*/
  arbitrary(arg: DAnyable): DAnyField;
  /**                                                            @description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@default: arbitrary(arg:DECIMAL) -> DECIMAL*/
  arbitrary(arg: DNumericable): DNum;
  /**                                                            @description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@default: first(arg:ANY) -> ANY*/
  first: this["arbitrary"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@default: arg_max(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> DATE*/
  arg_max(arg: DDateable, val: DAnyable | DDateable | DNumericable | DVarcharable): DDateField;
  /**                                                            @description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@default: arg_max(arg:ANY | BLOB, val:ANY | BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> BLOB*/
  arg_max(arg: DAnyable, val: DAnyable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**                                                            @description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@default: arg_max(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  arg_max(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**                                                            @description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@default: arg_max(arg:BIGINT | DECIMAL | DOUBLE | INTEGER, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> DECIMAL*/
  arg_max(arg: DNumericable, val: DAnyable | DDateable | DNumericable | DVarcharable): DNum;
  /**                                                            @description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@default: arg_max(arg:VARCHAR, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> VARCHAR*/
  arg_max(arg: DVarcharable, val: DAnyable | DDateable | DNumericable | DVarcharable): DStr;
  /**                                                            @description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@default: argmax(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> DATE*/
  argmax: this["arg_max"];
  /**                                                            @description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@default: max_by(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> DATE*/
  max_by: this["arg_max"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@default: arg_max_null(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> TIMESTAMP WITH TIME ZONE*/
  arg_max_null(arg: DDateable, val: DAnyable | DDateable | DNumericable | DVarcharable): DDateField;
  /**                                                            @description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@default: arg_max_null(arg:ANY | BLOB, val:ANY | BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> ANY*/
  arg_max_null(arg: DAnyable, val: DAnyable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**                                                            @description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@default: arg_max_null(arg:BIGINT | DECIMAL | DOUBLE | INTEGER, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> INTEGER*/
  arg_max_null(arg: DNumericable, val: DAnyable | DDateable | DNumericable | DVarcharable): DNum;
  /**                                                            @description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@default: arg_max_null(arg:VARCHAR, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> VARCHAR*/
  arg_max_null(arg: DVarcharable, val: DAnyable | DDateable | DNumericable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@default: arg_min(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> TIMESTAMP*/
  arg_min(arg: DDateable, val: DAnyable | DDateable | DNumericable | DVarcharable): DDateField;
  /**                                                            @description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@default: arg_min(arg:ANY | BLOB, val:ANY | BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> BLOB*/
  arg_min(arg: DAnyable, val: DAnyable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**                                                            @description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@default: arg_min(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  arg_min(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**                                                            @description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@default: arg_min(arg:BIGINT | DECIMAL | DOUBLE | INTEGER, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> INTEGER*/
  arg_min(arg: DNumericable, val: DAnyable | DDateable | DNumericable | DVarcharable): DNum;
  /**                                                            @description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@default: arg_min(arg:VARCHAR, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> VARCHAR*/
  arg_min(arg: DVarcharable, val: DAnyable | DDateable | DNumericable | DVarcharable): DStr;
  /**                                                            @description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@default: argmin(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> TIMESTAMP*/
  argmin: this["arg_min"];
  /**                                                            @description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@default: min_by(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> DATE*/
  min_by: this["arg_min"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@default: arg_min_null(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> DATE*/
  arg_min_null(arg: DDateable, val: DAnyable | DDateable | DNumericable | DVarcharable): DDateField;
  /**                                                            @description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@default: arg_min_null(arg:ANY | BLOB, val:ANY | BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> BLOB*/
  arg_min_null(arg: DAnyable, val: DAnyable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**                                                            @description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@default: arg_min_null(arg:BIGINT | DECIMAL | DOUBLE | INTEGER, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> INTEGER*/
  arg_min_null(arg: DNumericable, val: DAnyable | DDateable | DNumericable | DVarcharable): DNum;
  /**                                                            @description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@default: arg_min_null(arg:VARCHAR, val:BIGINT | BLOB | DATE | DOUBLE | HUGEINT | INTEGER | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR) -> VARCHAR*/
  arg_min_null(arg: DVarcharable, val: DAnyable | DDateable | DNumericable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the bitwise AND of all bits in a given expression.	@example: bit_and(A)	@default: bit_and(arg:BIT) -> BIT*/
  bit_and(arg: DAnyable): DAnyField;
  /**                                                            @description: Returns the bitwise AND of all bits in a given expression.	@example: bit_and(A)	@default: bit_and(arg:BIGINT | HUGEINT | INTEGER | SMALLINT | TINYINT | UBIGINT | UHUGEINT | UINTEGER | USMALLINT | UTINYINT) -> UINTEGER*/
  bit_and(arg: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the bitwise OR of all bits in a given expression.	@example: bit_or(A)	@default: bit_or(arg:BIT) -> BIT*/
  bit_or(arg: DAnyable): DAnyField;
  /**                                                            @description: Returns the bitwise OR of all bits in a given expression.	@example: bit_or(A)	@default: bit_or(arg:BIGINT | HUGEINT | INTEGER | SMALLINT | TINYINT | UBIGINT | UHUGEINT | UINTEGER | USMALLINT | UTINYINT) -> SMALLINT*/
  bit_or(arg: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the bitwise XOR of all bits in a given expression.	@example: bit_xor(A)	@default: bit_xor(arg:BIT) -> BIT*/
  bit_xor(arg: DAnyable): DAnyField;
  /**                                                            @description: Returns the bitwise XOR of all bits in a given expression.	@example: bit_xor(A)	@default: bit_xor(arg:BIGINT | HUGEINT | INTEGER | SMALLINT | TINYINT | UBIGINT | UHUGEINT | UINTEGER | USMALLINT | UTINYINT) -> TINYINT*/
  bit_xor(arg: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the last value of a column. This function is affected by ordering.	@example: last(A)	@default: last(arg:ANY) -> ANY*/
  last(arg: DAnyable): DAnyField;
  /**                                                            @description: Returns the last value of a column. This function is affected by ordering.	@example: last(A)	@default: last(arg:DECIMAL) -> DECIMAL*/
  last(arg: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example: mad(x)	@default: mad(x:DATE | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> INTERVAL*/
  mad(x: DDateable): DAnyField;
  /**                                                            @description: Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example: mad(x)	@default: mad(x:DECIMAL | DOUBLE | FLOAT) -> DOUBLE*/
  mad(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the maximum value present in arg.	@example: max(A)	@default: max(arg:ANY) -> ANY*/
  max(arg: DAnyable): DAnyField;
  /**                                                            @description: Returns the maximum value present in arg.	@example: max(A)	@default: max(arg:ANY, col1:BIGINT) -> ANY[]*/
  max(arg: DAnyable, col1: DNumericable): DArrayField<DAnyField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the minimum value present in arg.	@example: min(A)	@default: min(arg:ANY) -> ANY*/
  min(arg: DAnyable): DAnyField;
  /**                                                            @description: Returns the minimum value present in arg.	@example: min(A)	@default: min(arg:ANY, col1:BIGINT) -> ANY[]*/
  min(arg: DAnyable, col1: DNumericable): DArrayField<DAnyField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example: quantile_cont(x, 0.5)	@default: quantile_cont(x:DATE | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, pos:DOUBLE | DOUBLE[]) -> TIMESTAMP WITH TIME ZONE*/
  quantile_cont(x: DDateable, pos: DArrayable | DNumericable): DDateField;
  /**                                                            @description: Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example: quantile_cont(x, 0.5)	@default: quantile_cont(x:BIGINT | DECIMAL | DOUBLE | FLOAT | HUGEINT | INTEGER | SMALLINT | TINYINT, pos:DOUBLE | DOUBLE[]) -> DECIMAL*/
  quantile_cont(x: DNumericable, pos: DArrayable | DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example: reservoir_quantile(A,0.5,1024)	@default: reservoir_quantile(x:BIGINT | DECIMAL | DOUBLE | FLOAT | HUGEINT | INTEGER | SMALLINT | TINYINT, quantile:DOUBLE[], sampleSize:INTEGER | ) -> TINYINT[]*/
  reservoir_quantile(x: DNumericable, quantile: DArrayable, sampleSize?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /**                                                            @description: Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example: reservoir_quantile(A,0.5,1024)	@default: reservoir_quantile(x:BIGINT | DECIMAL | DOUBLE | FLOAT | HUGEINT | INTEGER | SMALLINT | TINYINT, quantile:DOUBLE, sampleSize:INTEGER | ) -> BIGINT*/
  reservoir_quantile(x: DNumericable, quantile: DNumericable, sampleSize?: DAnyable | DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
}

export interface DMacroAG<DNum, DStr> {
  /**                                                            @example: list_aggr(l, 'approx_count_distinct')	@default: list_approx_count_distinct(l:ANY[]) -> BIGINT*/
  list_approx_count_distinct(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'mad')	@default: list_mad(l:ANY[]) -> INTERVAL*/
  list_mad(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'avg')	@default: list_avg(l:ANY[]) -> DOUBLE*/
  list_avg(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'max')	@default: list_max(l:ANY[]) -> ANY*/
  list_max(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'min')	@default: list_min(l:ANY[]) -> ANY*/
  list_min(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'sem')	@default: list_sem(l:ANY[]) -> DOUBLE*/
  list_sem(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'sum')	@default: list_sum(l:ANY[]) -> DOUBLE*/
  list_sum(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'last')	@default: list_last(l:ANY[]) -> ANY*/
  list_last(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'mode')	@default: list_mode(l:ANY[]) -> ANY*/
  list_mode(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'first')	@default: list_first(l:ANY[]) -> ANY*/
  list_first(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'count')	@default: list_count(l:ANY[]) -> BIGINT*/
  list_count(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'median')	@default: list_median(l:ANY[]) -> ANY*/
  list_median(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'bit_or')	@default: list_bit_or(l:ANY[]) -> BIT*/
  list_bit_or(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'bit_and')	@default: list_bit_and(l:ANY[]) -> BIT*/
  list_bit_and(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'bool_or')	@default: list_bool_or(l:ANY[]) -> BOOLEAN*/
  list_bool_or(l: DArrayable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'bit_xor')	@default: list_bit_xor(l:ANY[]) -> BIT*/
  list_bit_xor(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'var_pop')	@default: list_var_pop(l:ANY[]) -> DOUBLE*/
  list_var_pop(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'entropy')	@default: list_entropy(l:ANY[]) -> DOUBLE*/
  list_entropy(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'product')	@default: list_product(l:ANY[]) -> DOUBLE*/
  list_product(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'bool_and')	@default: list_bool_and(l:ANY[]) -> BOOLEAN*/
  list_bool_and(l: DArrayable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'var_samp')	@default: list_var_samp(l:ANY[]) -> DOUBLE*/
  list_var_samp(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'skewness')	@default: list_skewness(l:ANY[]) -> DOUBLE*/
  list_skewness(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'kurtosis')	@default: list_kurtosis(l:ANY[]) -> DOUBLE*/
  list_kurtosis(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(CAST(arr AS VARCHAR[]), 'string_agg', sep)	@default: array_to_string(arr:ANY[], sep:) -> null*/
  array_to_string(arr: DArrayable, sep: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'any_value')	@default: list_any_value(l:ANY[]) -> ANY*/
  list_any_value(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'histogram')	@default: list_histogram(l:ANY[]) -> null*/
  list_histogram(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'stddev_pop')	@default: list_stddev_pop(l:ANY[]) -> DOUBLE*/
  list_stddev_pop(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'string_agg')	@default: list_string_agg(l:ANY[]) -> VARCHAR*/
  list_string_agg(l: DArrayable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'stddev_samp')	@default: list_stddev_samp(l:ANY[]) -> DOUBLE*/
  list_stddev_samp(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(CAST(arr AS VARCHAR[]), 'string_agg', sep)	@default: array_to_string_comma_default(arr:ANY[], sep:) -> null*/
  array_to_string_comma_default(arr: DArrayable, sep: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_aggr(l, 'kurtosis_pop')	@default: list_kurtosis_pop(l:ANY[]) -> DOUBLE*/
  list_kurtosis_pop(l: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
}

export interface DMacro<DNum, DStr> {
  /**                                                            @example: round_even(x, n)	@default: roundbankers(x:, n:) -> null*/
  roundbankers(x: DAnyable, n: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: current_user*/
  user(): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_concat(l, list_value(e))	@default: list_append(l:ANY[], e:) -> null*/
  list_append(l: DArrayable, e: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: unnest(string_split_regex("text", pattern))	@default: regexp_split_to_table(text:, pattern:) -> null*/
  regexp_split_to_table(text: DAnyable, pattern: DAnyable | RegExp): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: weighted_avg("value", weight)	@default: wavg(value:, weight:) -> null*/
  wavg(value: DAnyable, weight: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_concat(list_value(e), l)	@default: list_prepend(e:, l:ANY[]) -> null*/
  list_prepend(e: DAnyable, l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: 'duckdb'*/
  current_role(): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: 'duckdb'*/
  current_user(): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: 'duckdb'*/
  session_user(): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: json_extract(x, '$')	@default: json(x:) -> null*/
  json(x: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: CAST(x AS STRUCT(path VARCHAR, "type" VARCHAR, filters_before VARCHAR[], filters_after VARCHAR[], files_before BIGINT, files_after BIGINT))	@default: parse_delta_filter_logline(x:) -> null*/
  parse_delta_filter_logline(x: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: main.current_database()*/
  current_catalog(): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: exp(avg(ln(x)))	@default: geomean(x:) -> null*/
  geomean(x: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: CAST((('{' || string_agg(((to_json(CAST(n AS VARCHAR)) || ':') || CASE  WHEN ((v IS NULL)) THEN (CAST('null' AS "JSON")) ELSE to_json(v) END), ',')) || '}') AS "JSON")	@default: json_group_object(n:, v:) -> null*/
  json_group_object(n: DAnyable, v: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_append(arr, el)	@default: array_append(arr:ANY[], el:) -> null*/
  array_append(arr: DArrayable, el: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_prepend(el, arr)	@default: array_prepend(el:, arr:ANY[]) -> null*/
  array_prepend(el: DAnyable, arr: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: (date + "interval")	@default: date_add(date:, interval:) -> null*/
  date_add(date: DAnyable, interval: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_concat(arr, list_value(e))	@default: array_push_back(arr:ANY[], e:) -> null*/
  array_push_back(arr: DArrayable, e: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_filter(list_distinct(l1), (variable_intersect -> list_contains(l2, variable_intersect)))	@default: list_intersect(l1:ANY[], l2:ANY[]) -> null*/
  list_intersect(l1: DArrayable, l2: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: CASE  WHEN (((string IS NOT NULL) AND ("delimiter" IS NOT NULL) AND ("position" IS NOT NULL))) THEN (COALESCE(string_split(string, "delimiter")["position"], '')) ELSE NULL END	@default: split_part(string:, delimiter:, position:) -> null*/
  split_part(string: DAnyable, delimiter: DAnyable, position: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_intersect(l1, l2)	@default: array_intersect(l1:ANY[], l2:ANY[]) -> null*/
  array_intersect(l1: DArrayable, l2: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_concat(list_value(e), arr)	@default: array_push_front(arr:ANY[], e:) -> null*/
  array_push_front(arr: DArrayable, e: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: l[:-:-1]	@default: list_reverse(l:ANY[]) -> null*/
  list_reverse(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: geomean(x)	@default: geometric_mean(x:) -> null*/
  geometric_mean(x: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: list_reverse(l)	@default: array_reverse(l:ANY[]) -> null*/
  array_reverse(l: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: floor((x / y))	@default: fdiv(x:, y:) -> null*/
  fdiv(x: DAnyable, y: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: (x - (y * floor((x / y))))	@default: fmod(x:, y:) -> null*/
  fmod(x: DAnyable, y: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: (sum(("value" * weight)) / sum(CASE  WHEN (("value" IS NOT NULL)) THEN (weight) ELSE 0 END))	@default: weighted_avg(value:, weight:) -> null*/
  weighted_avg(value: DAnyable, weight: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: CAST((('[' || string_agg(CASE  WHEN ((x IS NULL)) THEN (CAST('null' AS "JSON")) ELSE to_json(x) END, ',')) || ']') AS "JSON")	@default: json_group_array(x:) -> null*/
  json_group_array(x: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: CASE  WHEN ((a = b)) THEN (NULL) ELSE a END	@default: nullif(a:, b:) -> null*/
  nullif(a: DAnyable, b: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: arr[:(len(arr) - 1)]	@default: array_pop_back(arr:ANY[]) -> null*/
  array_pop_back(arr: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: (SELECT block_size FROM pragma_database_size() WHERE (database_name = db_name))	@default: get_block_size(dbName:) -> null*/
  get_block_size(dbName: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: arr[2:]	@default: array_pop_front(arr:ANY[]) -> null*/
  array_pop_front(arr: DArrayable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: contains(map_values("map"), "value")	@default: map_contains_value(map:, value:) -> null*/
  map_contains_value(map: DAnyable, value: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: CAST(CAST(CAST(CAST(md5_number(param) AS BIT) AS VARCHAR)[:64] AS BIT) AS UBIGINT)	@default: md5_number_lower(param:) -> null*/
  md5_number_lower(param: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: CAST(CAST(CAST(CAST(md5_number(param) AS BIT) AS VARCHAR)[65:] AS BIT) AS UBIGINT)	@default: md5_number_upper(param:) -> null*/
  md5_number_upper(param: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: (json_structure(json_group_array(x)) -> 0)	@default: json_group_structure(x:) -> null*/
  json_group_structure(x: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: CASE  WHEN ((((abs(x) * power(10, (n + 1))) % 10) = 5)) THEN ((round((x / 2), n) * 2)) ELSE round(x, n) END	@default: round_even(x:, n:) -> null*/
  round_even(x: DAnyable, n: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: unnest(generate_series(1, array_length(arr, dim)))	@default: generate_subscripts(arr:ANY[], dim:) -> null*/
  generate_subscripts(arr: DArrayable, dim: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @example: contains(map_entries("map"), main.struct_pack("key" := "key", "value" := "value"))	@default: map_contains_entry(map:, key:, value:) -> null*/
  map_contains_entry(map: DAnyable, key: DAnyable, value: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
}

export interface DGlobal<DNum, DStr> {
  /**                                                            @description: Convert string to lower case	@example: lower('Hello')	@default: lcase(string:VARCHAR) -> VARCHAR*/
  lcase(string: DVarcharable): DStr;
  /**                                                            @description: Convert string to lower case	@example: lower('Hello')	@default: lower(string:VARCHAR) -> VARCHAR*/
  lower: this["lcase"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a minute interval	@example: to_minutes(5)	@default: to_minutes(integer:BIGINT) -> INTERVAL*/
  to_minutes(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_num_cells(col0:INTEGER) -> BIGINT*/
  h3_get_num_cells(col0: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_pentagons(col0:INTEGER) -> UBIGINT[]*/
  h3_get_pentagons(col0: DNumericable): DArrayField<DNumericField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirpath('path/to/file.csv', 'system')	@default: parse_dirpath(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirpath(string: DVarcharable, separator?: DAnyable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Concatenate strings together separated by the specified separator.	@example: concat_ws(', ', 'Banana', 'Apple', 'Melon')	@default: concat_ws(separator:VARCHAR, string:ANY) -> VARCHAR*/
  concat_ws(separator: DVarcharable, string: DAnyable, ...vargs: DAnyable[]): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@default: substring(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring(string: DVarcharable, start: DNumericable, length?: DAnyable | DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The timestamp for the given nanoseconds since epoch	@example: make_timestamp(1732117793000000000)	@default: make_timestamp_ns(nanos:BIGINT) -> TIMESTAMP_NS*/
  make_timestamp_ns(nanos: DNumericable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the arctangent (y, x)	@example: atan2(1.0, 0.0)	@default: atan2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  atan2(y: DNumericable, x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the named entry from the STRUCT.	@example: struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i')	@default: struct_extract(struct:STRUCT, entry:BIGINT | VARCHAR) -> ANY*/
  struct_extract(struct: DStructable, entry: DNumericable | DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the cosine distance between two lists	@example: list_cosine_distance([1, 2, 3], [1, 2, 3])	@default: list_cosine_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_distance(list1: DArrayable, list2: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the sign of x as -1, 0 or 1	@example: sign(-349)	@default: sign(x:BIGINT) -> TINYINT*/
  sign(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the currently active version of DuckDB in this format: v0.3.2		@example: version()*/
  version(): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@default: array_resize(list:ANY[], size:ANY, value:ANY | ) -> ANY[]*/
  array_resize(list: DArrayable, size: DAnyable, value?: DAnyable): DArrayField<DAnyField>;
  /**                                                            @description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@default: list_resize(list:ANY[], size:ANY, value:ANY | ) -> ANY[]*/
  list_resize: this["array_resize"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example: nfc_normalize('ardèch')	@default: nfc_normalize(string:VARCHAR) -> VARCHAR*/
  nfc_normalize(string: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Adds field(s)/value(s) to an existing STRUCT with the argument values. The entry name(s) will be the bound variable name(s)	@example: struct_insert({'a': 1}, b := 2)*/
  struct_insert(...vargs: DAnyable[]): DStructField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  today(): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: combine(col0:AGGREGATE_STATE<?>, col1:ANY) -> AGGREGATE_STATE<?>*/
  combine(col0: DAnyable, col1: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the name of the currently active database	@example: current_database()*/
  current_database(): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@default: array_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  array_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step?: DAnyable | DNumericable): DAnyField;
  /**                                                            @description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@default: list_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  list_slice: this["array_slice"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Removes any occurrences of any of the characters from either side of the string	@example: trim('>>>>test<<', '><')	@default: trim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  trim(string: DVarcharable, characters?: DAnyable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Convert string to upper case.	@example: upper('Hello')	@default: ucase(string:VARCHAR) -> VARCHAR*/
  ucase(string: DVarcharable): DStr;
  /**                                                            @description: Convert string to upper case.	@example: upper('Hello')	@default: upper(string:VARCHAR) -> VARCHAR*/
  upper: this["ucase"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example: currval('my_sequence_name')	@default: currval(sequenceName:VARCHAR) -> BIGINT*/
  currval(sequenceName: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the right-most count characters	@example: right('Hello🦆', 3)	@default: right(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right(string: DVarcharable, count: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a century interval	@example: to_centuries(5)	@default: to_centuries(integer:INTEGER) -> INTERVAL*/
  to_centuries(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_similarity([1, 2, 3], [1, 2, 3])	@default: array_cosine_similarity(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_similarity(arr1: DArrayable, arr2: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a quarter interval	@example: to_quarters(5)	@default: to_quarters(integer:INTEGER) -> INTERVAL*/
  to_quarters(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Rounds the number up	@example: ceil(17.4)	@default: ceiling(x:DECIMAL) -> DECIMAL*/
  ceiling(x: DNumericable): DNum;
  /**                                                            @description: Rounds the number up	@example: ceil(17.4)	@default: ceil(x:DECIMAL) -> DECIMAL*/
  ceil: this["ceiling"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_deserialize_sql(col0:JSON) -> VARCHAR*/
  json_deserialize_sql(col0: DJsonable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_serialize_sql(col0:VARCHAR, col1:BOOLEAN | , col2:BOOLEAN | , col3:BOOLEAN | ) -> JSON*/
  json_serialize_sql(col0: DVarcharable, col1?: DAnyable | DBoolable, col2?: DAnyable | DBoolable, col3?: DAnyable | DBoolable): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  to_json(...vargs: DAnyable[]): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Truncates the number	@example: trunc(17.4)	@default: trunc(x:BIGINT) -> BIGINT*/
  trunc(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the keys of a map as a list	@example: map_keys(map(['key'], ['val']))*/
  map_keys(...vargs: DAnyable[]): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@default: array_position(list:ANY[], element:ANY) -> INTEGER*/
  array_position(list: DArrayable, element: DAnyable): DNum;
  /**                                                            @description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@default: array_indexof(list:ANY[], element:ANY) -> INTEGER*/
  array_indexof: this["array_position"];
  /**                                                            @description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@default: list_position(list:ANY[], element:ANY) -> INTEGER*/
  list_position: this["array_position"];
  /**                                                            @description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@default: list_indexof(list:ANY[], element:ANY) -> INTEGER*/
  list_indexof: this["array_position"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a character which is corresponding the ASCII code value or Unicode code point	@example: chr(65)	@default: chr(codePoint:INTEGER) -> VARCHAR*/
  chr(codePoint: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: array_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggregate(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: list_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggregate: this["array_aggregate"];
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: array_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggr: this["array_aggregate"];
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  aggregate: this["array_aggregate"];
  /**                                                            @description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@default: list_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggr: this["array_aggregate"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example: regexp_extract('abc', '([a-z])(b)', 1)	@default: regexp_extract(string:VARCHAR, pattern:VARCHAR, group0:INTEGER | VARCHAR[] | , options:VARCHAR | ) -> VARCHAR*/
  regexp_extract(string: DVarcharable, pattern: DVarcharable | RegExp, group0?: DAnyable | DArrayable | DNumericable, options?: DAnyable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_distance([1, 2, 3], [1, 2, 3])	@default: array_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_distance(arr1: DArrayable, arr2: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the current value of the configuration setting	@example: current_setting('access_mode')	@default: current_setting(settingName:VARCHAR) -> ANY*/
  current_setting(settingName: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@default: array_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  array_contains(list: DArrayable, element: DAnyable): DBoolField;
  /**                                                            @description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@default: list_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  list_contains: this["array_contains"];
  /**                                                            @description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@default: array_has(list:ANY[], element:ANY) -> BOOLEAN*/
  array_has: this["array_contains"];
  /**                                                            @description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@default: list_has(list:ANY[], element:ANY) -> BOOLEAN*/
  list_has: this["array_contains"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if the floating point value is not a number, false otherwise	@example: isnan('NaN'::FLOAT)	@default: isnan(x:DOUBLE) -> BOOLEAN*/
  isnan(x: DNumericable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract_value(map(['key'], ['val']), 'key')	@default: map_extract_value(map:ANY, key:ANY) -> ANY*/
  map_extract_value(map: DAnyable, key: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: date_sub(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_sub(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNum;
  /**                                                            @description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: datesub(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datesub: this["date_sub"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the natural logarithm of x	@example: ln(2)	@default: ln(x:DOUBLE) -> DOUBLE*/
  ln(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the cos of x	@example: cos(90)	@default: cos(x:DOUBLE) -> DOUBLE*/
  cos(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the tan of x	@example: tan(90)	@default: tan(x:DOUBLE) -> DOUBLE*/
  tan(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the sin of x	@example: sin(90)	@default: sin(x:DOUBLE) -> DOUBLE*/
  sin(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  json_array(...vargs: DAnyable[]): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  json_quote(...vargs: DAnyable[]): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Concatenate many strings together.	@example: concat('Hello', ' ', 'World')	@default: concat(string:ANY) -> VARCHAR*/
  concat(string: DAnyable, ...vargs: DAnyable[]): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example: list_zip([1, 2], [3, 4], [5, 6])*/
  array_zip(...vargs: DAnyable[]): DArrayField<DStructField>;
  /**                                                            @description: Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example: list_zip([1, 2], [3, 4], [5, 6])*/
  list_zip: this["array_zip"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_latlng_to_cell(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> UBIGINT*/
  h3_latlng_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring	@example: set_bit('0110010'::BIT, 2, 0)	@default: set_bit(bitstring:BIT, index:INTEGER, newValue:INTEGER) -> BIT*/
  set_bit(bitstring: DAnyable, index: DNumericable, newValue: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@default: array_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  // array_filter(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>
  /**                                                            @description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@default: list_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_filter: this["array_filter"];
  /**                                                            @description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@default: filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  filter: this["array_filter"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  json_object(...vargs: DAnyable[]): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  row_to_json(...vargs: DAnyable[]): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirname('path/to/file.csv', 'system')	@default: parse_dirname(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirname(string: DVarcharable, separator?: DAnyable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example: enum_range_boundary(NULL, 'happy'::mood)	@default: enum_range_boundary(start:ANY, end:ANY) -> VARCHAR[]*/
  enum_range_boundary(start: DAnyable, end: DAnyable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a map created from the entries of the array	@example: map_from_entries([{k: 5, v: 'val1'}, {k: 3, v: 'val2'}]);*/
  map_from_entries(...vargs: DAnyable[]): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Checks if a map contains a given key.	@example: map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')	@default: map_contains(map:MAP(ANY, ANY), key:ANY) -> BOOLEAN*/
  map_contains(map: DAnyable, key: DAnyable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts secs since epoch to a timestamp with time zone	@example: to_timestamp(1284352323.5)	@default: to_timestamp(sec:DOUBLE) -> TIMESTAMP WITH TIME ZONE*/
  to_timestamp(sec: DNumericable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_similarity('duck', 'duckdb', 0.5)	@default: jaro_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DAnyable | DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Unescapes the URL encoded input.	@example: url_decode('this%20string%20is%2BFencoded')	@default: url_decode(input:VARCHAR) -> VARCHAR*/
  url_decode(input: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example: is_histogram_other_bin(v)	@default: is_histogram_other_bin(val:ANY) -> BOOLEAN*/
  is_histogram_other_bin(val: DAnyable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  current_date(): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Rounds the number down	@example: floor(17.4)	@default: floor(x:DECIMAL) -> DECIMAL*/
  floor(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Throws the given error message	@example: error('access_mode')	@default: error(message:VARCHAR) -> "NULL"*/
  error(message: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example: uuid()*/
  gen_random_uuid(): DAnyField;
  /**                                                            @description: Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example: uuid()*/
  uuid: this["gen_random_uuid"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the distance between two lists	@example: list_distance([1, 2, 3], [1, 2, 3])	@default: list_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_distance(list1: DArrayable, list2: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the values of a map as a list	@example: map_values(map(['key'], ['val']))*/
  map_values(...vargs: DAnyable[]): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example: create_sort_key('A', 'DESC')	@default: create_sort_key(parameters:ANY) -> BLOB*/
  create_sort_key(parameters: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  array_to_json(...vargs: DAnyable[]): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Create an unnamed STRUCT (tuple) containing the argument values.	@example: row(i, i % 4, i / 4)*/
  row(...vargs: DAnyable[]): DStructField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns an integer that represents the Unicode code point of the first character of the string	@example: ascii('Ω')	@default: ascii(string:VARCHAR) -> INTEGER*/
  ascii(string: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Number of bytes in blob.	@example: octet_length('\xAA\xBB'::BLOB)	@default: octet_length(blob:BIT) -> BIGINT*/
  octet_length(blob: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts a value from binary representation to a blob	@example: unbin('0110')	@default: from_binary(value:VARCHAR) -> BLOB*/
  from_binary(value: DVarcharable): DAnyField;
  /**                                                            @description: Converts a value from binary representation to a blob	@example: unbin('0110')	@default: unbin(value:VARCHAR) -> BLOB*/
  unbin: this["from_binary"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a millenium interval	@example: to_millennia(1)	@default: to_millennia(integer:INTEGER) -> INTERVAL*/
  to_millennia(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the 2-log of x	@example: log2(8)	@default: log2(x:DOUBLE) -> DOUBLE*/
  log2(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the name of a given expression	@example: alias(42 + 1)	@default: alias(expr:ANY) -> VARCHAR*/
  alias(expr: DAnyable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_uncompact_cells(col0:BIGINT[], col1:INTEGER) -> BIGINT[]*/
  h3_uncompact_cells(col0: DArrayable, col1: DNumericable): DArrayField<DNumericField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Convert a base64 encoded string to a character string	@example: from_base64('QQ==')	@default: from_base64(string:VARCHAR) -> BLOB*/
  from_base64(string: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example: regexp_replace('hello', '[lo]', '-')	@default: regexp_replace(string:VARCHAR, pattern:VARCHAR, replacement:VARCHAR, options:VARCHAR | ) -> VARCHAR*/
  regexp_replace(string: DVarcharable, pattern: DVarcharable | RegExp, replacement: DVarcharable, options?: DAnyable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if string begins with search_string	@example: starts_with('abc','a')	@default: starts_with(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  starts_with(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the current query as a string	@example: current_query()*/
  current_query(): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example: stats(5)	@default: stats(expression:ANY) -> VARCHAR*/
  stats(expression: DAnyable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@default: array_unique(list:ANY[]) -> UBIGINT*/
  array_unique(list: DArrayable): DNum;
  /**                                                            @description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@default: list_unique(list:ANY[]) -> UBIGINT*/
  list_unique: this["array_unique"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the cosine similarity between two lists	@example: list_cosine_similarity([1, 2, 3], [1, 2, 3])	@default: list_cosine_similarity(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_similarity(list1: DArrayable, list2: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_distance([1, 2, 3], [1, 2, 3])	@default: array_cosine_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_distance(arr1: DArrayable, arr2: DArrayable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the 10-log of x	@example: log10(1000)	@default: log10(x:DOUBLE) -> DOUBLE*/
  log10(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: date_diff(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_diff(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNum;
  /**                                                            @description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@default: datediff(part:VARCHAR, startdate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE, enddate:DATE | TIME | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datediff: this["date_diff"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example: hash('🦆')	@default: hash(param:ANY) -> UBIGINT*/
  hash(param: DAnyable, ...vargs: DAnyable[]): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: host(col0:INET) -> VARCHAR*/
  host(col0: DAnyable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a millisecond interval	@example: to_milliseconds(5.5)	@default: to_milliseconds(double:DOUBLE) -> INTERVAL*/
  to_milliseconds(double: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  json_merge_patch(...vargs: DAnyable[]): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  get_current_time(): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_serialize_plan(col0:VARCHAR, col1:BOOLEAN | , col2:BOOLEAN | , col3:BOOLEAN | , col4:BOOLEAN | ) -> JSON*/
  json_serialize_plan(col0: DVarcharable, col1?: DAnyable | DBoolable, col2?: DAnyable | DBoolable, col3?: DAnyable | DBoolable, col4?: DAnyable | DBoolable): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the VectorType of a given column	@example: vector_type(col)	@default: vector_type(col:ANY) -> VARCHAR*/
  vector_type(col: DAnyable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: mod(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  mod(col0: DNumericable, col1: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the log of the gamma function	@example: lgamma(2)	@default: lgamma(x:DOUBLE) -> DOUBLE*/
  lgamma(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  h3_get_res0_cells(): DArrayField<DNumericField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns list of schemas. Pass a parameter of True to include implicit schemas	@example: current_schemas(true)	@default: current_schemas(includeImplicit:BOOLEAN) -> VARCHAR[]*/
  current_schemas(includeImplicit: DBoolable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example: format_bytes(1000 * 16)	@default: formatReadableDecimalSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableDecimalSize(bytes: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Splits the string along the separator	@example: string_split('hello-world', '-')	@default: string_to_array(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_to_array(string: DVarcharable, separator: DVarcharable): DArrayField<DVarcharField>;
  /**                                                            @description: Splits the string along the separator	@example: string_split('hello-world', '-')	@default: string_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_split: this["string_to_array"];
  /**                                                            @description: Splits the string along the separator	@example: string_split('hello-world', '-')	@default: str_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  str_split: this["string_to_array"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The time for the given parts	@example: make_time(13, 34, 27.123456)	@default: make_time(hour:BIGINT, minute:BIGINT, seconds:DOUBLE) -> TIME*/
  make_time(hour: DNumericable, minute: DNumericable, seconds: DNumericable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)	@default: substring_grapheme(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring_grapheme(string: DVarcharable, start: DNumericable, length?: DAnyable | DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example: try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@default: try_strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  try_strptime(text: DVarcharable, format: DArrayable | DVarcharable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if the entire string matches the regex. A set of optional options can be set.	@example: regexp_full_match('anabanana', '(an)*')	@default: regexp_full_match(string:VARCHAR, regex:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_full_match(string: DVarcharable, regex: DVarcharable | RegExp, options?: DAnyable | DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  current_localtime(): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the value with the named tags from the union. NULL if the tag is not currently selected	@example: union_extract(s, 'k')	@default: union_extract(union:UNION, tag:VARCHAR) -> ANY*/
  union_extract(union: DAnyable, tag: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a random number between 0 and 1	@example: random()*/
  random(): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@default: mismatches(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  mismatches(str1: DVarcharable, str2: DVarcharable): DNum;
  /**                                                            @description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@default: hamming(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  hamming: this["mismatches"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Reverses the string	@example: reverse('hello')	@default: reverse(string:VARCHAR) -> VARCHAR*/
  reverse(string: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the name of the currently active schema. Default is main	@example: current_schema()*/
  current_schema(): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example: regexp_matches('anabanana', '(an)*')	@default: regexp_matches(string:VARCHAR, pattern:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_matches(string: DVarcharable, pattern: DVarcharable | RegExp, options?: DAnyable | DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Formats a string using fmt syntax	@example: format('Benchmark "{}" took {} seconds', 'CSV', 42)	@default: format(format:VARCHAR) -> VARCHAR*/
  format(format: DVarcharable, ...vargs: DAnyable[]): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: family(col0:INET) -> UTINYINT*/
  family(col0: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: stem(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  stem(col0: DVarcharable, col1: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts the string text to timestamp according to the format string. Throws an error on failure. To return NULL on failure, use try_strptime.	@example: strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@default: strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  strptime(text: DVarcharable, format: DArrayable | DVarcharable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  text(col0: DNumericable, col1: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the arcsine of x	@example: asin(0.5)	@default: asin(x:DOUBLE) -> DOUBLE*/
  asin(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@default: array_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**                                                            @description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@default: list_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_all: this["array_has_all"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Convert a blob to a base64 encoded string	@example: base64('A'::blob)	@default: to_base64(blob:BLOB) -> VARCHAR*/
  to_base64(blob: DAnyable): DStr;
  /**                                                            @description: Convert a blob to a base64 encoded string	@example: base64('A'::blob)	@default: base64(blob:BLOB) -> VARCHAR*/
  base64: this["to_base64"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a microsecond interval	@example: to_microseconds(5)	@default: to_microseconds(integer:BIGINT) -> INTERVAL*/
  to_microseconds(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: netmask(col0:INET) -> INET*/
  netmask(col0: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: network(col0:INET) -> INET*/
  network(col0: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Sets the seed to be used for the random function	@example: setseed(0.42)	@default: setseed(col0:DOUBLE) -> "NULL"*/
  setseed(col0: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Writes to the logger	@example: write_log('Hello')	@default: write_log(string:VARCHAR) -> ANY*/
  write_log(string: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: make_timestamptz(col0:BIGINT, col1:BIGINT | , col2:BIGINT | , col3:BIGINT | , col4:BIGINT | , col5:DOUBLE | , col6:VARCHAR | ) -> TIMESTAMP WITH TIME ZONE*/
  make_timestamptz(col0: DNumericable, col1?: DAnyable | DNumericable, col2?: DAnyable | DNumericable, col3?: DAnyable | DNumericable, col4?: DAnyable | DNumericable, col5?: DAnyable | DNumericable, col6?: DAnyable | DVarcharable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@default: array_distinct(list:ANY[]) -> ANY[]*/
  array_distinct(list: DArrayable): DArrayField<DAnyField>;
  /**                                                            @description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@default: list_distinct(list:ANY[]) -> ANY[]*/
  list_distinct: this["array_distinct"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Create a single member UNION containing the argument value. The tag of the value will be the bound variable name	@example: union_value(k := 'hello')*/
  union_value(...vargs: DAnyable[]): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_pentagons_string(col0:INTEGER) -> VARCHAR[]*/
  h3_get_pentagons_string(col0: DNumericable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: ilike_escape('A%c', 'a$%C', '$')	@default: ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: finalize(col0:AGGREGATE_STATE<?>) -> INVALID*/
  finalize(col0: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Retrieve the currently selected tag of the union as an ENUM	@example: union_tag(union_value(k := 'foo'))	@default: union_tag(union:UNION) -> ANY*/
  union_tag(union: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the cube root of x	@example: cbrt(8)	@default: cbrt(x:DOUBLE) -> DOUBLE*/
  cbrt(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: html_escape(col0:VARCHAR, col1:BOOLEAN | ) -> VARCHAR*/
  html_escape(col0: DVarcharable, col1?: DAnyable | DBoolable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Removes any occurrences of any of the characters from the left side of the string	@example: ltrim('>>>>test<<', '><')	@default: ltrim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  ltrim(string: DVarcharable, characters?: DAnyable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@default: formatReadableSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableSize(bytes: DNumericable): DStr;
  /**                                                            @description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@default: format_bytes(bytes:BIGINT) -> VARCHAR*/
  format_bytes: this["formatReadableSize"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_winkler_similarity('duck', 'duckdb', 0.5)	@default: jaro_winkler_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_winkler_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DAnyable | DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example: translate('12345', '143', 'ax')	@default: translate(string:VARCHAR, from:VARCHAR, to:VARCHAR) -> VARCHAR*/
  translate(string: DVarcharable, from: DVarcharable, to: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns whether or not the database/schema are in the search path	@example: in_search_path('memory', 'main')	@default: in_search_path(databaseName:VARCHAR, schemaName:VARCHAR) -> BOOLEAN*/
  in_search_path(databaseName: DVarcharable, schemaName: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@default: array_sort(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  array_sort(list: DArrayable, col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**                                                            @description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@default: list_sort(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  list_sort: this["array_sort"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the current transaction’s ID (a BIGINT). It will assign a new one if the current transaction does not have one already	@example: txid_current()*/
  txid_current(): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: broadcast(col0:INET) -> INET*/
  broadcast(col0: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Normalizes an INTERVAL to an equivalent interval	@example: normalized_interval(INTERVAL '30 days')	@default: normalized_interval(interval:INTERVAL) -> INTERVAL*/
  normalized_interval(interval: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example: url_encode('this string has/ special+ characters>')	@default: url_encode(input:VARCHAR) -> VARCHAR*/
  url_encode(input: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns all values of the input enum type as an array	@example: enum_range(NULL::mood)	@default: enum_range(enm:ANY) -> VARCHAR[]*/
  enum_range(enm: DAnyable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: prefix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  prefix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example: bar(5, 0, 20, 10)	@default: bar(x:DOUBLE, min:DOUBLE, max:DOUBLE, width:DOUBLE | ) -> VARCHAR*/
  bar(x: DNumericable, min: DNumericable, max: DNumericable, width?: DAnyable | DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: suffix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  suffix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the next floating point value after x in the direction of y	@example: nextafter(1::float, 2::float)	@default: nextafter(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  nextafter(x: DNumericable, y: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1	@example: bit_position('010'::BIT, '1110101'::BIT)	@default: bit_position(substring:BIT, bitstring:BIT) -> INTEGER*/
  bit_position(substring: DAnyable, bitstring: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: divide(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  divide(col0: DNumericable, col1: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the arccosine of x	@example: acos(0.5)	@default: acos(x:DOUBLE) -> DOUBLE*/
  acos(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets	@example: time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07')	@default: time_bucket(bucketWidth:INTERVAL, timestamp:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, origin:DATE | INTERVAL | TIMESTAMP | TIMESTAMP WITH TIME ZONE | VARCHAR | ) -> TIMESTAMP WITH TIME ZONE*/
  time_bucket(bucketWidth: DAnyable, timestamp: DDateable, origin?: DAnyable | DDateable | DVarcharable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the cotangent of x	@example: cot(0.5)	@default: cot(x:DOUBLE) -> DOUBLE*/
  cot(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts degrees to radians	@example: radians(90)	@default: radians(x:DOUBLE) -> DOUBLE*/
  radians(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts radians to degrees	@example: degrees(pi())	@default: degrees(x:DOUBLE) -> DOUBLE*/
  degrees(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Identical to list_value, but generated as part of unpivot for better error messages	@example: unpivot_list(4, 5, 6)*/
  unpivot_list(...vargs: DAnyable[]): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_great_circle_distance(col0:DOUBLE, col1:DOUBLE, col2:DOUBLE, col3:DOUBLE, col4:VARCHAR) -> DOUBLE*/
  h3_great_circle_distance(col0: DNumericable, col1: DNumericable, col2: DNumericable, col3: DNumericable, col4: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Creates a map from a set of keys and values	@example: map(['key1', 'key2'], ['val1', 'val2'])*/
  map(...vargs: DAnyable[]): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_polygon_wkt_to_cells_experimental(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells_experimental(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField<DNumericField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the value of pi	@example: pi()*/
  pi(): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  current_localtimestamp(): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the inverse hyperbolic cos of x	@example: acosh(2.3)	@default: acosh(x:DOUBLE) -> DOUBLE*/
  acosh(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the inverse hyperbolic tan of x	@example: atanh(0.5)	@default: atanh(x:DOUBLE) -> DOUBLE*/
  atanh(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the inverse hyperbolic sin of x	@example: asinh(0.5)	@default: asinh(x:DOUBLE) -> DOUBLE*/
  asinh(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@default: unicode(str:VARCHAR) -> INTEGER*/
  unicode(str: DVarcharable): DNum;
  /**                                                            @description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@default: ord(str:VARCHAR) -> INTEGER*/
  ord: this["unicode"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the Julian Day number from a date or timestamp	@example: julian(timestamp '2006-01-01 12:00')	@default: julian(ts:DATE) -> DOUBLE*/
  julian(ts: DDateable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The (English) name of the month	@example: monthname(TIMESTAMP '1992-09-20')	@default: monthname(ts:DATE) -> VARCHAR*/
  monthname(ts: DDateable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_hexagon_edge_length_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_edge_length_avg(col0: DNumericable, col1: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes e to the power of x	@example: exp(1)	@default: exp(x:DOUBLE) -> DOUBLE*/
  exp(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Pads the string with the character from the left until it has count characters	@example: lpad('hello', 10, '>')	@default: lpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  lpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example: parse_filename('path/to/file.csv', true, 'forward_slash')	@default: parse_filename(string:VARCHAR, trimExtension:BOOLEAN | VARCHAR | , separator:VARCHAR | ) -> VARCHAR*/
  parse_filename(string: DVarcharable, trimExtension?: DAnyable | DBoolable | DVarcharable, separator?: DAnyable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_polygon_wkt_to_cells_experimental_string(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_experimental_string(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@default: levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  levenshtein(str1: DVarcharable, str2: DVarcharable): DNum;
  /**                                                            @description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@default: editdist3(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  editdist3: this["levenshtein"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_polygon_wkt_to_cells_string(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_string(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  h3_get_res0_cells_string(): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the arctangent of x	@example: atan(0.5)	@default: atan(x:DOUBLE) -> DOUBLE*/
  atan(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the square root of x	@example: sqrt(4)	@default: sqrt(x:DOUBLE) -> DOUBLE*/
  sqrt(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@default: position(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  position(haystack: DVarcharable, needle: DVarcharable): DNum;
  /**                                                            @description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@default: strpos(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  strpos: this["position"];
  /**                                                            @description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@default: instr(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  instr: this["position"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Create a LIST containing the argument values	@example: list_value(4, 5, 6)*/
  list_value(...vargs: DAnyable[]): DArrayField;
  /**                                                            @description: Create a LIST containing the argument values	@example: list_value(4, 5, 6)*/
  list_pack: this["list_value"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@default: least_common_multiple(x:BIGINT, y:BIGINT) -> BIGINT*/
  least_common_multiple(x: DNumericable, y: DNumericable): DNum;
  /**                                                            @description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@default: lcm(x:BIGINT, y:BIGINT) -> BIGINT*/
  lcm: this["least_common_multiple"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_pretty(col0:JSON) -> VARCHAR*/
  json_pretty(col0: DJsonable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Flatten a nested list by one level	@example: flatten([[1, 2, 3], [4, 5]])	@default: flatten(nestedList:ANY[][]) -> ANY[]*/
  flatten(nestedList: DArrayable): DArrayField<DAnyField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns whether the signbit is set or not	@example: signbit(-0.0)	@default: signbit(x:DOUBLE) -> BOOLEAN*/
  signbit(x: DNumericable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the length of the list.	@example: array_length([1,2,3])	@default: array_length(list:ANY[], col1:BIGINT | ) -> BIGINT*/
  array_length(list: DArrayable, col1?: DAnyable | DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example: to_base(42, 16)	@default: to_base(number:BIGINT, radix:INTEGER, minLength:INTEGER | ) -> VARCHAR*/
  to_base(number: DNumericable, radix: DNumericable, minLength?: DAnyable | DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@default: array_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  // array_reduce(list: DArrayable, lambda: DAnyable): DAnyField
  /**                                                            @description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@default: list_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  list_reduce: this["array_reduce"];
  /**                                                            @description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@default: reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  reduce: this["array_reduce"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@default: array_grade_up(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  array_grade_up(list: DArrayable, col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**                                                            @description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@default: list_grade_up(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  list_grade_up: this["array_grade_up"];
  /**                                                            @description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@default: grade_up(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  grade_up: this["array_grade_up"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Formats a string using printf syntax	@example: printf('Benchmark "%s" took %d seconds', 'CSV', 42)	@default: printf(format:VARCHAR) -> VARCHAR*/
  printf(format: DVarcharable, ...vargs: DAnyable[]): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: like_escape('a%c', 'a$%c', '$')	@default: like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@default: array_negative_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_inner_product(arr1: DArrayable, arr2: DArrayable): DNum;
  /**                                                            @description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@default: array_negative_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_dot_product: this["array_negative_inner_product"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@default: array_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**                                                            @description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@default: list_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_any: this["array_has_any"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the numeric value backing the given enum value	@example: enum_code('happy'::mood)	@default: enum_code(enm:ANY) -> ANY*/
  enum_code(enm: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@default: array_reverse_sort(list:ANY[], col1:VARCHAR | ) -> ANY[]*/
  array_reverse_sort(list: DArrayable, col1?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**                                                            @description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@default: list_reverse_sort(list:ANY[], col1:VARCHAR | ) -> ANY[]*/
  list_reverse_sort: this["array_reverse_sort"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_path('path/to/file.csv', 'system')	@default: parse_path(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR[]*/
  parse_path(string: DVarcharable, separator?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaccard('duck','luck')	@default: jaccard(str1:VARCHAR, str2:VARCHAR) -> DOUBLE*/
  jaccard(str1: DVarcharable, str2: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example: damerau_levenshtein('hello', 'world')	@default: damerau_levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  damerau_levenshtein(str1: DVarcharable, str2: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts a TIME WITH TIME ZONE to an integer sort key	@example: timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)	@default: timetz_byte_comparable(timeTz:TIME WITH TIME ZONE) -> UBIGINT*/
  timetz_byte_comparable(timeTz: DDateable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  get_delta_test_expression(): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Removes any occurrences of any of the characters from the right side of the string	@example: rtrim('>>>>test<<', '><')	@default: rtrim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  rtrim(string: DVarcharable, characters?: DAnyable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a map created from merging the input maps, on key collision the value is taken from the last map with that key	@example: map_concat(map([1,2], ['a', 'b']), map([2,3], ['c', 'd']));*/
  map_concat(...vargs: DAnyable[]): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Replaces any occurrences of the source with target in string	@example: replace('hello', 'l', '-')	@default: replace(string:VARCHAR, source:VARCHAR, target:VARCHAR) -> VARCHAR*/
  replace(string: DVarcharable, source: DVarcharable, target: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Whether or not we can implicitly cast from the source type to the other type	@example: can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)	@default: can_cast_implicitly(sourceType:ANY, targetType:ANY) -> BOOLEAN*/
  can_cast_implicitly(sourceType: DAnyable, targetType: DAnyable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The (English) name of the weekday	@example: dayname(TIMESTAMP '1992-03-22')	@default: dayname(ts:DATE) -> VARCHAR*/
  dayname(ts: DDateable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example: regexp_extract_all('hello_world', '([a-z ]+)_?', 1)	@default: regexp_extract_all(string:VARCHAR, regex:VARCHAR, group0:INTEGER | , options:VARCHAR | ) -> VARCHAR[]*/
  regexp_extract_all(string: DVarcharable, regex: DVarcharable | RegExp, group0?: DAnyable | DNumericable, options?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@default: array_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_inner_product(arr1: DArrayable, arr2: DArrayable): DNum;
  /**                                                            @description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@default: array_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_dot_product: this["array_inner_product"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Convert varchar to blob. Converts utf-8 characters into literal encoding	@example: encode('my_string_with_ü')	@default: encode(string:VARCHAR) -> BLOB*/
  encode(string: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: ends_with(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  ends_with(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@default: array_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_concat(list1: DArrayable, list2: DArrayable): DArrayField<DAnyField>;
  /**                                                            @description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@default: list_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_concat: this["array_concat"];
  /**                                                            @description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@default: array_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_cat: this["array_concat"];
  /**                                                            @description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@default: list_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_cat: this["array_concat"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the size of the map (or the number of entries in the map)	@example: cardinality( map([4, 2], ['a', 'b']) );	@default: cardinality(map:ANY) -> UBIGINT*/
  cardinality(map: DAnyable, ...vargs: DAnyable[]): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cells_to_multi_polygon_wkt(col0:BIGINT[]) -> VARCHAR*/
  h3_cells_to_multi_polygon_wkt(col0: DArrayable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Factorial of x. Computes the product of the current integer and all integers below it	@example: 4!	@default: factorial(x:INTEGER) -> HUGEINT*/
  factorial(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@default: array_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  array_where(valueList: DArrayable, maskList: DArrayable): DArrayField<DAnyField>;
  /**                                                            @description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@default: list_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  list_where: this["array_where"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: getvariable(col0:VARCHAR) -> ANY*/
  getvariable(col0: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the last value of the input enum type	@example: enum_last(NULL::mood)	@default: enum_last(enm:ANY) -> VARCHAR*/
  enum_last(enm: DAnyable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a day interval	@example: to_days(5)	@default: to_days(integer:INTEGER) -> INTERVAL*/
  to_days(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Absolute value	@example: abs(-17.4)	@default: abs(x:BIGINT) -> BIGINT*/
  abs(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the last day of the month	@example: last_day(TIMESTAMP '1992-03-22 01:02:03.1234')	@default: last_day(ts:DATE) -> DATE*/
  last_day(ts: DDateable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the name of the data type of the result of the expression	@example: typeof('abc')	@default: typeof(expression:ANY) -> VARCHAR*/
  typeof(expression: DAnyable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_ilike_escape('A%c', 'a$%C', '$')	@default: not_ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the lowest value of the set of input parameters	@example: least(42, 84)	@default: least(arg1:ANY) -> ANY*/
  least(arg1: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@default: list_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_inner_product(list1: DArrayable, list2: DArrayable): DNum;
  /**                                                            @description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@default: list_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_dot_product: this["list_inner_product"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: excel_text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  excel_text(col0: DNumericable, col1: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Pads the string with the character from the right until it has count characters	@example: rpad('hello', 10, '<')	@default: rpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  rpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Create an ARRAY containing the argument values.	@example: array_value(4, 5, 6)*/
  array_value(...vargs: DAnyable[]): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Rounds x to s decimal places	@example: round(42.4332, 2)	@default: round(x:DECIMAL, precision:INTEGER | ) -> DECIMAL*/
  round(x: DNumericable, precision?: DAnyable | DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@default: from_hex(value:VARCHAR) -> BLOB*/
  from_hex(value: DVarcharable): DAnyField;
  /**                                                            @description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@default: unhex(value:VARCHAR) -> BLOB*/
  unhex: this["from_hex"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Number of bytes in string.	@example: strlen('🦆')	@default: strlen(string:VARCHAR) -> BIGINT*/
  strlen(string: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes x to the power of y	@example: pow(2, 3)	@default: power(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  power(x: DNumericable, y: DNumericable): DNum;
  /**                                                            @description: Computes x to the power of y	@example: pow(2, 3)	@default: pow(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  pow: this["power"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Number of grapheme clusters in string.	@example: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')	@default: length_grapheme(string:VARCHAR) -> BIGINT*/
  length_grapheme(string: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the current timestamp	@example: get_current_timestamp()*/
  get_current_timestamp(): DDateField;
  /**                                                            @description: Returns the current timestamp	@example: get_current_timestamp()*/
  transaction_timestamp: this["get_current_timestamp"];
  /**                                                            @description: Returns the current timestamp	@example: get_current_timestamp()*/
  now: this["get_current_timestamp"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the left-most count grapheme clusters	@example: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@default: left_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left_grapheme(string: DVarcharable, count: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a week interval	@example: to_weeks(5)	@default: to_weeks(integer:INTEGER) -> INTERVAL*/
  to_weeks(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a year interval	@example: to_years(5)	@default: to_years(integer:INTEGER) -> INTERVAL*/
  to_years(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: If arg2 is NULL, return NULL. Otherwise, return arg1.	@example: constant_or_null(42, NULL)	@default: constant_or_null(arg1:ANY, arg2:ANY) -> ANY*/
  constant_or_null(arg1: DAnyable, arg2: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a hour interval	@example: to_hours(5)	@default: to_hours(integer:BIGINT) -> INTERVAL*/
  to_hours(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the first value of the input enum type	@example: enum_first(NULL::mood)	@default: enum_first(enm:ANY) -> VARCHAR*/
  enum_first(enm: DAnyable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: html_unescape(col0:VARCHAR) -> VARCHAR*/
  html_unescape(col0: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Escapes all potentially meaningful regexp characters in the input string	@example: regexp_escape('https://duckdb.org')	@default: regexp_escape(string:VARCHAR) -> VARCHAR*/
  regexp_escape(string: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@default: greatest_common_divisor(x:BIGINT, y:BIGINT) -> BIGINT*/
  greatest_common_divisor(x: DNumericable, y: DNumericable): DNum;
  /**                                                            @description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@default: gcd(x:BIGINT, y:BIGINT) -> BIGINT*/
  gcd: this["greatest_common_divisor"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Create a STRUCT containing the argument values. The entry name will be the bound variable name.	@example: struct_pack(i := 4, s := 'string')*/
  struct_pack(...vargs: DAnyable[]): DStructField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_hexagon_area_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_area_avg(col0: DNumericable, col1: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example: gamma(5.5)	@default: gamma(x:DOUBLE) -> DOUBLE*/
  gamma(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@default: map_extract(map:ANY, key:ANY) -> ANY*/
  map_extract(map: DAnyable, key: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**                                                            @description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@default: element_at(map:ANY, key:ANY) -> ANY*/
  element_at: this["map_extract"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the highest value of the set of input parameters	@example: greatest(42, 84)	@default: greatest(arg1:ANY) -> ANY*/
  greatest(arg1: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_polygon_wkt_to_cells(col0:VARCHAR, col1:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells(col0: DVarcharable, col1: DNumericable): DArrayField<DNumericField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Number of characters in string.	@example: length('Hello🦆')	@default: length(string:BIT) -> BIGINT*/
  length(string: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the hyperbolic cos of x	@example: cosh(1)	@default: cosh(x:DOUBLE) -> DOUBLE*/
  cosh(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the hyperbolic tan of x	@example: tanh(1)	@default: tanh(x:DOUBLE) -> DOUBLE*/
  tanh(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The timestamp for the given parts	@example: make_timestamp(1992, 9, 20, 13, 34, 27.123456)	@default: make_timestamp(year:BIGINT, month:BIGINT | , day:BIGINT | , hour:BIGINT | , minute:BIGINT | , seconds:DOUBLE | ) -> TIMESTAMP*/
  make_timestamp(year: DNumericable, month?: DAnyable | DNumericable, day?: DAnyable | DNumericable, hour?: DAnyable | DNumericable, minute?: DAnyable | DNumericable, seconds?: DAnyable | DNumericable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the hyperbolic sin of x	@example: sinh(1)	@default: sinh(x:DOUBLE) -> DOUBLE*/
  sinh(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_compact_cells(col0:BIGINT[]) -> BIGINT[]*/
  h3_compact_cells(col0: DArrayable): DArrayField<DNumericField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a second interval	@example: to_seconds(5.5)	@default: to_seconds(double:DOUBLE) -> INTERVAL*/
  to_seconds(double: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Merge the multiple STRUCTs into a single STRUCT.	@example: struct_concat(struct_pack(i := 4), struct_pack(s := 'string'))*/
  struct_concat(...vargs: DAnyable[]): DStructField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a month interval	@example: to_months(5)	@default: to_months(integer:INTEGER) -> INTERVAL*/
  to_months(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Strips accents from string.	@example: strip_accents('mühleisen')	@default: strip_accents(string:VARCHAR) -> VARCHAR*/
  strip_accents(string: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the entry from the STRUCT by position (starts at 1!).	@example: struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2)	@default: struct_extract_at(struct:STRUCT, entry:BIGINT) -> ANY*/
  struct_extract_at(struct: DStructable, entry: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@default: list_negative_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_inner_product(list1: DArrayable, list2: DArrayable): DNum;
  /**                                                            @description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@default: list_negative_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_dot_product: this["list_negative_inner_product"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Return the following value of the sequence.	@example: nextval('my_sequence_name')	@default: nextval(sequenceName:VARCHAR) -> BIGINT*/
  nextval(sequenceName: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: array_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  // array_transform(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: list_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_transform: this["array_transform"];
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: array_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_apply: this["array_transform"];
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: list_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_apply: this["array_transform"];
  /**                                                            @description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@default: apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  apply: this["array_transform"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Rounds x to next even number by rounding away from zero	@example: even(2.9)	@default: even(x:DOUBLE) -> DOUBLE*/
  even(x: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_h3_to_string(col0:BIGINT) -> VARCHAR*/
  h3_h3_to_string(col0: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: icu_sort_key(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  icu_sort_key(col0: DVarcharable, col1: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the left-most count characters	@example: left('Hello🦆', 2)	@default: left(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left(string: DVarcharable, count: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_string_to_h3(col0:VARCHAR) -> UBIGINT*/
  h3_string_to_h3(col0: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Convert blob to varchar. Fails if blob is not valid utf-8	@example: decode('\xC3\xBC'::BLOB)	@default: decode(blob:BLOB) -> VARCHAR*/
  decode(blob: DAnyable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the map entries as a list of keys/values	@example: map_entries(map(['key'], ['val']))*/
  map_entries(...vargs: DAnyable[]): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@default: regexp_split_to_array(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  regexp_split_to_array(string: DVarcharable, separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**                                                            @description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@default: string_split_regex(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  string_split_regex: this["regexp_split_to_array"];
  /**                                                            @description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@default: str_split_regex(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  str_split_regex: this["regexp_split_to_array"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_latlng_to_cell_string(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> VARCHAR*/
  h3_latlng_to_cell_string(col0: DNumericable, col1: DNumericable, col2: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_like_escape('a%c', 'a$%c', '$')	@default: not_like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example: log(2, 64)	@default: log(b:DOUBLE, x:DOUBLE | ) -> DOUBLE*/
  log(b: DNumericable, x?: DAnyable | DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the right-most count grapheme clusters	@example: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@default: right_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right_grapheme(string: DVarcharable, count: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Subtract arguments, resulting in the time difference between the two timestamps	@example: age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')	@default: age(timestamp:TIMESTAMP WITH TIME ZONE, timestamp__01:TIMESTAMP WITH TIME ZONE | ) -> INTERVAL*/
  age(timestamp: DDateable, timestamp__01?: DAnyable | DDateable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0	@example: get_bit('0110010'::BIT, 2)	@default: get_bit(bitstring:BIT, index:INTEGER) -> INTEGER*/
  get_bit(bitstring: DAnyable, index: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@default: array_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  array_select(valueList: DArrayable, indexList: DArrayable): DArrayField<DAnyField>;
  /**                                                            @description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@default: list_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  list_select: this["array_select"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Construct a decade interval	@example: to_decades(5)	@default: to_decades(integer:INTEGER) -> INTERVAL*/
  to_decades(integer: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Compute the cross product of two arrays of size 3. The array elements can not be NULL.	@example: array_cross_product([1, 2, 3], [1, 2, 3])	@default: array_cross_product(arr:DOUBLE[3], arr__01:DOUBLE[3]) -> DOUBLE[3]*/
  array_cross_product(arr: DArrayable, arr__01: DArrayable): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: add(col0:ANY[], col1:ANY[]) -> ANY[]*/
  add(col0: DArrayable, col1: DArrayable): DArrayField<DAnyField>;
  /**                                                            @default: add(col0:BIGINT, col1:BIGINT | ) -> BIGINT*/
  add(col0: DNumericable, col1?: DAnyable | DNumericable): DNum;
  /**                                                            @default: add(col0:DATE, col1:INTEGER | INTERVAL | TIME | TIME WITH TIME ZONE) -> TIMESTAMP WITH TIME ZONE*/
  add(col0: DDateable, col1: DAnyable | DDateable | DNumericable): DDateField;
  /**                                                            @default: add(col0:INTEGER, col1:DATE) -> DATE*/
  add(col0: DNumericable, col1: DDateable): DDateField;
  /**                                                            @default: add(col0:INTERVAL, col1:DATE | TIME | TIME WITH TIME ZONE | TIMESTAMP) -> TIME WITH TIME ZONE*/
  add(col0: DAnyable, col1: DDateable): DDateField;
  /**                                                            @default: add(col0:INTERVAL, col1:INTERVAL) -> INTERVAL*/
  add(col0: DAnyable, col1: DAnyable): DAnyField;
  /**                                                            @default: add(col0:TIME WITH TIME ZONE, col1:DATE | INTERVAL) -> TIMESTAMP WITH TIME ZONE*/
  add(col0: DDateable, col1: DAnyable | DDateable): DDateField;
  /**                                                            @default: add(col0:TIMESTAMP, col1:INTERVAL) -> TIMESTAMP*/
  add(col0: DDateable, col1: DAnyable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@default: array_extract(list:ANY[], index:BIGINT) -> ANY*/
  array_extract(list: DArrayable, index: DNumericable): DAnyField;
  /**                                                            @description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@default: array_extract(list:STRUCT, index:BIGINT | VARCHAR) -> ANY*/
  array_extract(list: DStructable, index: DNumericable | DVarcharable): DAnyField;
  /**                                                            @description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@default: array_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  array_extract(list: DVarcharable, index: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: to_binary(value:BIGINT) -> VARCHAR*/
  to_binary(value: DNumericable): DStr;
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: to_binary(value:VARCHAR) -> VARCHAR*/
  to_binary(value: DVarcharable): DStr;
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: to_binary(value:VARINT) -> VARCHAR*/
  to_binary(value: DAnyable): DStr;
  /**                                                            @description: Converts the value to binary representation	@example: bin(42)	@default: bin(value:BIGINT) -> VARCHAR*/
  bin: this["to_binary"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the number of bits that are set	@example: bit_count(31)	@default: bit_count(x:BIGINT) -> TINYINT*/
  bit_count(x: DNumericable): DNum;
  /**                                                            @description: Returns the number of bits that are set	@example: bit_count(31)	@default: bit_count(x:BIT) -> BIGINT*/
  bit_count(x: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: bit_length(col0:BIT) -> BIGINT*/
  bit_length(col0: DAnyable): DNum;
  /**                                                            @default: bit_length(col0:VARCHAR) -> BIGINT*/
  bit_length(col0: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@default: bitstring(bitstring:BIT, length:INTEGER) -> BIT*/
  bitstring(bitstring: DAnyable, length: DNumericable): DAnyField;
  /**                                                            @description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@default: bitstring(bitstring:VARCHAR, length:INTEGER) -> BIT*/
  bitstring(bitstring: DVarcharable, length: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the century component from a date or timestamp	@example: century(timestamp '2021-08-03 11:59:44.123456')	@default: century(ts:DATE) -> BIGINT*/
  century(ts: DDateable): DNum;
  /**                                                            @description: Extract the century component from a date or timestamp	@example: century(timestamp '2021-08-03 11:59:44.123456')	@default: century(ts:INTERVAL) -> BIGINT*/
  century(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if the list contains the element.	@example: contains([1, 2, NULL], 1)	@default: contains(list:ANY[], element:ANY) -> BOOLEAN*/
  contains(list: DArrayable, element: DAnyable): DBoolField;
  /**                                                            @description: Checks if a map contains a given key.	@example: contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')	@default: contains(map:MAP(ANY, ANY), key:ANY) -> BOOLEAN*/
  contains(map: DAnyable, key: DAnyable): DBoolField;
  /**                                                            @description: Returns true if search_string is found within string.	@example: contains('abc', 'a')	@default: contains(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  contains(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@default: date_part(ts:VARCHAR, col1:DATE | INTERVAL | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_part(ts: DVarcharable, col1: DAnyable | DDateable): DNum;
  /**                                                            @description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@default: date_part(ts:VARCHAR[], col1:DATE | INTERVAL | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> STRUCT()*/
  date_part(ts: DArrayable, col1: DAnyable | DDateable): DStructField;
  /**                                                            @description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@default: datepart(ts:VARCHAR, col1:DATE | INTERVAL | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datepart: this["date_part"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@default: date_trunc(part:VARCHAR, timestamp:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIMESTAMP*/
  date_trunc(part: DVarcharable, timestamp: DDateable): DDateField;
  /**                                                            @description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@default: date_trunc(part:VARCHAR, timestamp:INTERVAL) -> INTERVAL*/
  date_trunc(part: DVarcharable, timestamp: DAnyable): DAnyField;
  /**                                                            @description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@default: datetrunc(part:VARCHAR, timestamp:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIMESTAMP WITH TIME ZONE*/
  datetrunc: this["date_trunc"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the day component from a date or timestamp	@example: day(timestamp '2021-08-03 11:59:44.123456')	@default: day(ts:DATE) -> BIGINT*/
  day(ts: DDateable): DNum;
  /**                                                            @description: Extract the day component from a date or timestamp	@example: day(timestamp '2021-08-03 11:59:44.123456')	@default: day(ts:INTERVAL) -> BIGINT*/
  day(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the dayofmonth component from a date or timestamp	@example: dayofmonth(timestamp '2021-08-03 11:59:44.123456')	@default: dayofmonth(ts:DATE) -> BIGINT*/
  dayofmonth(ts: DDateable): DNum;
  /**                                                            @description: Extract the dayofmonth component from a date or timestamp	@example: dayofmonth(timestamp '2021-08-03 11:59:44.123456')	@default: dayofmonth(ts:INTERVAL) -> BIGINT*/
  dayofmonth(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the dayofweek component from a date or timestamp	@example: dayofweek(timestamp '2021-08-03 11:59:44.123456')	@default: dayofweek(ts:DATE) -> BIGINT*/
  dayofweek(ts: DDateable): DNum;
  /**                                                            @description: Extract the dayofweek component from a date or timestamp	@example: dayofweek(timestamp '2021-08-03 11:59:44.123456')	@default: dayofweek(ts:INTERVAL) -> BIGINT*/
  dayofweek(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the dayofyear component from a date or timestamp	@example: dayofyear(timestamp '2021-08-03 11:59:44.123456')	@default: dayofyear(ts:DATE) -> BIGINT*/
  dayofyear(ts: DDateable): DNum;
  /**                                                            @description: Extract the dayofyear component from a date or timestamp	@example: dayofyear(timestamp '2021-08-03 11:59:44.123456')	@default: dayofyear(ts:INTERVAL) -> BIGINT*/
  dayofyear(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the decade component from a date or timestamp	@example: decade(timestamp '2021-08-03 11:59:44.123456')	@default: decade(ts:DATE) -> BIGINT*/
  decade(ts: DDateable): DNum;
  /**                                                            @description: Extract the decade component from a date or timestamp	@example: decade(timestamp '2021-08-03 11:59:44.123456')	@default: decade(ts:INTERVAL) -> BIGINT*/
  decade(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the epoch component from a temporal type	@example: epoch(timestamp '2021-08-03 11:59:44.123456')	@default: epoch(temporal:DATE) -> DOUBLE*/
  epoch(temporal: DDateable): DNum;
  /**                                                            @description: Extract the epoch component from a temporal type	@example: epoch(timestamp '2021-08-03 11:59:44.123456')	@default: epoch(temporal:INTERVAL) -> DOUBLE*/
  epoch(temporal: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_ms(temporal:BIGINT) -> TIMESTAMP*/
  epoch_ms(temporal: DNumericable): DDateField;
  /**                                                            @description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_ms(temporal:DATE) -> BIGINT*/
  epoch_ms(temporal: DDateable): DNum;
  /**                                                            @description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_ms(temporal:INTERVAL) -> BIGINT*/
  epoch_ms(temporal: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the epoch component in nanoseconds from a temporal type	@example: epoch_ns(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_ns(temporal:DATE) -> BIGINT*/
  epoch_ns(temporal: DDateable): DNum;
  /**                                                            @description: Extract the epoch component in nanoseconds from a temporal type	@example: epoch_ns(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_ns(temporal:INTERVAL) -> BIGINT*/
  epoch_ns(temporal: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the epoch component in microseconds from a temporal type	@example: epoch_us(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_us(temporal:DATE) -> BIGINT*/
  epoch_us(temporal: DDateable): DNum;
  /**                                                            @description: Extract the epoch component in microseconds from a temporal type	@example: epoch_us(timestamp '2021-08-03 11:59:44.123456')	@default: epoch_us(temporal:INTERVAL) -> BIGINT*/
  epoch_us(temporal: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@default: equi_width_bins(min:ANY, max:ANY, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(min: DAnyable, max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**                                                            @description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@default: equi_width_bins(min:BIGINT, max:BIGINT, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(min: DNumericable, max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**                                                            @description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@default: equi_width_bins(min:TIMESTAMP, max:TIMESTAMP, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(min: DDateable, max: DDateable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the era component from a date or timestamp	@example: era(timestamp '2021-08-03 11:59:44.123456')	@default: era(ts:DATE) -> BIGINT*/
  era(ts: DDateable): DNum;
  /**                                                            @description: Extract the era component from a date or timestamp	@example: era(timestamp '2021-08-03 11:59:44.123456')	@default: era(ts:INTERVAL) -> BIGINT*/
  era(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: from_json(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json(col0: DJsonable, col1: DVarcharable): DAnyField;
  /**                                                            @default: from_json(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json(col0: DVarcharable, col1: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: from_json_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  /**                                                            @default: from_json_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@default: generate_series(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  generate_series(start: DNumericable, stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@default: generate_series(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  generate_series(start: DDateable, stop: DDateable, step: DAnyable): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_are_neighbor_cells(col0:BIGINT, col1:BIGINT) -> BOOLEAN*/
  h3_are_neighbor_cells(col0: DNumericable, col1: DNumericable): DBoolField;
  /**                                                            @default: h3_are_neighbor_cells(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  h3_are_neighbor_cells(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_area(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col0: DNumericable, col1: DVarcharable): DNum;
  /**                                                            @default: h3_cell_area(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col0: DVarcharable, col1: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_cell_to_boundary_wkt(col0: DNumericable): DStr;
  /**                                                            @default: h3_cell_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_cell_to_boundary_wkt(col0: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_center_child(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_center_child(col0: DNumericable, col1: DNumericable): DNum;
  /**                                                            @default: h3_cell_to_center_child(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_center_child(col0: DVarcharable, col1: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_child_pos(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col0: DNumericable, col1: DNumericable): DNum;
  /**                                                            @default: h3_cell_to_child_pos(col0:VARCHAR, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col0: DVarcharable, col1: DNumericable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_children(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_cell_to_children(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_cell_to_children(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_cell_to_children(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lat(col0: DNumericable): DNum;
  /**                                                            @default: h3_cell_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lat(col0: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_cell_to_latlng(col0: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_cell_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_cell_to_latlng(col0: DVarcharable): DArrayField<DNumericField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lng(col0: DNumericable): DNum;
  /**                                                            @default: h3_cell_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lng(col0: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_local_ij(col0:BIGINT, col1:BIGINT) -> INTEGER[]*/
  h3_cell_to_local_ij(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_cell_to_local_ij(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_local_ij(col0: DVarcharable, col1: DVarcharable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_parent(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_parent(col0: DNumericable, col1: DNumericable): DNum;
  /**                                                            @default: h3_cell_to_parent(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_parent(col0: DVarcharable, col1: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_vertex(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_vertex(col0: DNumericable, col1: DNumericable): DNum;
  /**                                                            @default: h3_cell_to_vertex(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_vertex(col0: DVarcharable, col1: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cell_to_vertexes(col0:BIGINT) -> BIGINT[]*/
  h3_cell_to_vertexes(col0: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_cell_to_vertexes(col0:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_vertexes(col0: DVarcharable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_cells_to_directed_edge(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_cells_to_directed_edge(col0: DNumericable, col1: DNumericable): DNum;
  /**                                                            @default: h3_cells_to_directed_edge(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  h3_cells_to_directed_edge(col0: DVarcharable, col1: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_child_pos_to_cell(col0:BIGINT, col1:BIGINT | UBIGINT, col2:INTEGER) -> BIGINT*/
  h3_child_pos_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): DNum;
  /**                                                            @default: h3_child_pos_to_cell(col0:BIGINT, col1:VARCHAR, col2:INTEGER) -> VARCHAR*/
  h3_child_pos_to_cell(col0: DNumericable, col1: DVarcharable, col2: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_directed_edge_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(col0: DNumericable): DStr;
  /**                                                            @default: h3_directed_edge_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(col0: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_directed_edge_to_cells(col0:BIGINT) -> UBIGINT[]*/
  h3_directed_edge_to_cells(col0: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_directed_edge_to_cells(col0:VARCHAR) -> VARCHAR[]*/
  h3_directed_edge_to_cells(col0: DVarcharable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_edge_length(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col0: DNumericable, col1: DVarcharable): DNum;
  /**                                                            @default: h3_edge_length(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col0: DVarcharable, col1: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_base_cell_number(col0:BIGINT) -> INTEGER*/
  h3_get_base_cell_number(col0: DNumericable): DNum;
  /**                                                            @default: h3_get_base_cell_number(col0:VARCHAR) -> INTEGER*/
  h3_get_base_cell_number(col0: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_directed_edge_destination(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_destination(col0: DNumericable): DNum;
  /**                                                            @default: h3_get_directed_edge_destination(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_destination(col0: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_directed_edge_origin(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_origin(col0: DNumericable): DNum;
  /**                                                            @default: h3_get_directed_edge_origin(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_origin(col0: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_icosahedron_faces(col0:BIGINT) -> INTEGER[]*/
  h3_get_icosahedron_faces(col0: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_get_icosahedron_faces(col0:VARCHAR) -> INTEGER[]*/
  h3_get_icosahedron_faces(col0: DVarcharable): DArrayField<DNumericField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_get_resolution(col0:BIGINT) -> INTEGER*/
  h3_get_resolution(col0: DNumericable): DNum;
  /**                                                            @default: h3_get_resolution(col0:VARCHAR) -> INTEGER*/
  h3_get_resolution(col0: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_grid_disk(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_grid_disk(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_grid_disk_distances(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances(col0: DNumericable, col1: DNumericable): DArrayField;
  /**                                                            @default: h3_grid_disk_distances(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances(col0: DVarcharable, col1: DNumericable): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_grid_disk_distances_safe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_safe(col0: DNumericable, col1: DNumericable): DArrayField;
  /**                                                            @default: h3_grid_disk_distances_safe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_safe(col0: DVarcharable, col1: DNumericable): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_grid_disk_distances_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_unsafe(col0: DNumericable, col1: DNumericable): DArrayField;
  /**                                                            @default: h3_grid_disk_distances_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_grid_disk_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk_unsafe(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_grid_disk_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_grid_distance(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_grid_distance(col0: DNumericable, col1: DNumericable): DNum;
  /**                                                            @default: h3_grid_distance(col0:VARCHAR, col1:VARCHAR) -> BIGINT*/
  h3_grid_distance(col0: DVarcharable, col1: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_grid_path_cells(col0:BIGINT, col1:BIGINT) -> BIGINT[]*/
  h3_grid_path_cells(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_grid_path_cells(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_grid_path_cells(col0: DVarcharable, col1: DVarcharable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_grid_ring_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_ring_unsafe(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_grid_ring_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_ring_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_is_pentagon(col0:BIGINT) -> BOOLEAN*/
  h3_is_pentagon(col0: DNumericable): DBoolField;
  /**                                                            @default: h3_is_pentagon(col0:VARCHAR) -> BOOLEAN*/
  h3_is_pentagon(col0: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_is_res_class_iii(col0:BIGINT) -> BOOLEAN*/
  h3_is_res_class_iii(col0: DNumericable): DBoolField;
  /**                                                            @default: h3_is_res_class_iii(col0:VARCHAR) -> BOOLEAN*/
  h3_is_res_class_iii(col0: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_is_valid_cell(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_cell(col0: DNumericable): DBoolField;
  /**                                                            @default: h3_is_valid_cell(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_cell(col0: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_is_valid_directed_edge(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_directed_edge(col0: DNumericable): DBoolField;
  /**                                                            @default: h3_is_valid_directed_edge(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_directed_edge(col0: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_is_valid_vertex(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_vertex(col0: DNumericable): DBoolField;
  /**                                                            @default: h3_is_valid_vertex(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_vertex(col0: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_local_ij_to_cell(col0:BIGINT, col1:INTEGER, col2:INTEGER) -> BIGINT*/
  h3_local_ij_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): DNum;
  /**                                                            @default: h3_local_ij_to_cell(col0:VARCHAR, col1:INTEGER, col2:INTEGER) -> VARCHAR*/
  h3_local_ij_to_cell(col0: DVarcharable, col1: DNumericable, col2: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_origin_to_directed_edges(col0:BIGINT) -> UBIGINT[]*/
  h3_origin_to_directed_edges(col0: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_origin_to_directed_edges(col0:VARCHAR) -> VARCHAR[]*/
  h3_origin_to_directed_edges(col0: DVarcharable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_vertex_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lat(col0: DNumericable): DNum;
  /**                                                            @default: h3_vertex_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lat(col0: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_vertex_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_vertex_to_latlng(col0: DNumericable): DArrayField<DNumericField>;
  /**                                                            @default: h3_vertex_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_vertex_to_latlng(col0: DVarcharable): DArrayField<DNumericField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: h3_vertex_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lng(col0: DNumericable): DNum;
  /**                                                            @default: h3_vertex_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lng(col0: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: to_hex(value:BIGINT) -> VARCHAR*/
  to_hex(value: DNumericable): DStr;
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: to_hex(value:BLOB) -> VARCHAR*/
  to_hex(value: DAnyable): DStr;
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: to_hex(value:VARCHAR) -> VARCHAR*/
  to_hex(value: DVarcharable): DStr;
  /**                                                            @description: Converts the value to hexadecimal representation	@example: hex(42)	@default: hex(value:BIGINT) -> VARCHAR*/
  hex: this["to_hex"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the hour component from a date or timestamp	@example: hour(timestamp '2021-08-03 11:59:44.123456')	@default: hour(ts:DATE) -> BIGINT*/
  hour(ts: DDateable): DNum;
  /**                                                            @description: Extract the hour component from a date or timestamp	@example: hour(timestamp '2021-08-03 11:59:44.123456')	@default: hour(ts:INTERVAL) -> BIGINT*/
  hour(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@default: isfinite(x:DATE) -> BOOLEAN*/
  isfinite(x: DDateable): DBoolField;
  /**                                                            @description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@default: isfinite(x:DOUBLE) -> BOOLEAN*/
  isfinite(x: DNumericable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@default: isinf(x:DATE) -> BOOLEAN*/
  isinf(x: DDateable): DBoolField;
  /**                                                            @description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@default: isinf(x:DOUBLE) -> BOOLEAN*/
  isinf(x: DNumericable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the isodow component from a date or timestamp	@example: isodow(timestamp '2021-08-03 11:59:44.123456')	@default: isodow(ts:DATE) -> BIGINT*/
  isodow(ts: DDateable): DNum;
  /**                                                            @description: Extract the isodow component from a date or timestamp	@example: isodow(timestamp '2021-08-03 11:59:44.123456')	@default: isodow(ts:INTERVAL) -> BIGINT*/
  isodow(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the isoyear component from a date or timestamp	@example: isoyear(timestamp '2021-08-03 11:59:44.123456')	@default: isoyear(ts:DATE) -> BIGINT*/
  isoyear(ts: DDateable): DNum;
  /**                                                            @description: Extract the isoyear component from a date or timestamp	@example: isoyear(timestamp '2021-08-03 11:59:44.123456')	@default: isoyear(ts:INTERVAL) -> BIGINT*/
  isoyear(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_array_length(col0:JSON, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col0: DJsonable, col1: DArrayable): DArrayField<DNumericField>;
  /**                                                            @default: json_array_length(col0:JSON, col1:VARCHAR | ) -> UBIGINT*/
  json_array_length(col0: DJsonable, col1?: DAnyable | DVarcharable): DNum;
  /**                                                            @default: json_array_length(col0:VARCHAR, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col0: DVarcharable, col1: DArrayable): DArrayField<DNumericField>;
  /**                                                            @default: json_array_length(col0:VARCHAR, col1:VARCHAR | ) -> UBIGINT*/
  json_array_length(col0: DVarcharable, col1?: DAnyable | DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_contains(col0:JSON, col1:JSON | VARCHAR) -> BOOLEAN*/
  json_contains(col0: DJsonable, col1: DJsonable | DVarcharable): DBoolField;
  /**                                                            @default: json_contains(col0:VARCHAR, col1:JSON | VARCHAR) -> BOOLEAN*/
  json_contains(col0: DVarcharable, col1: DJsonable | DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_exists(col0:JSON, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col0: DJsonable, col1: DArrayable): DArrayField<DBoolField>;
  /**                                                            @default: json_exists(col0:JSON, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col0: DJsonable, col1: DVarcharable): DBoolField;
  /**                                                            @default: json_exists(col0:VARCHAR, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col0: DVarcharable, col1: DArrayable): DArrayField<DBoolField>;
  /**                                                            @default: json_exists(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_extract(col0:JSON, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  /**                                                            @default: json_extract(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col0: DJsonable, col1: DArrayable): DArrayField<DJsonField>;
  /**                                                            @default: json_extract(col0:VARCHAR, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  /**                                                            @default: json_extract(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col0: DVarcharable, col1: DArrayable): DArrayField<DJsonField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_extract_path(col0:JSON, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract_path(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  /**                                                            @default: json_extract_path(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col0: DJsonable, col1: DArrayable): DArrayField<DJsonField>;
  /**                                                            @default: json_extract_path(col0:VARCHAR, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract_path(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  /**                                                            @default: json_extract_path(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col0: DVarcharable, col1: DArrayable): DArrayField<DJsonField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_extract_path_text(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_extract_path_text(col0:JSON, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col0: DJsonable, col1: DNumericable | DVarcharable): DStr;
  /**                                                            @default: json_extract_path_text(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_extract_path_text(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col0: DVarcharable, col1: DNumericable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_extract_string(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_extract_string(col0:JSON, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_string(col0: DJsonable, col1: DNumericable | DVarcharable): DStr;
  /**                                                            @default: json_extract_string(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_extract_string(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_string(col0: DVarcharable, col1: DNumericable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_keys(col0:JSON, col1:VARCHAR | VARCHAR[] | ) -> VARCHAR[]*/
  json_keys(col0: DJsonable, col1?: DAnyable | DArrayable | DVarcharable): DArrayField<DVarcharField>;
  /**                                                            @default: json_keys(col0:VARCHAR, col1:VARCHAR | VARCHAR[] | ) -> VARCHAR[]*/
  json_keys(col0: DVarcharable, col1?: DAnyable | DArrayable | DVarcharable): DArrayField<DVarcharField>;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_structure(col0:JSON) -> JSON*/
  json_structure(col0: DJsonable): DJsonField;
  /**                                                            @default: json_structure(col0:VARCHAR) -> JSON*/
  json_structure(col0: DVarcharable): DJsonField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_transform(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform(col0: DJsonable, col1: DVarcharable): DAnyField;
  /**                                                            @default: json_transform(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform(col0: DVarcharable, col1: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_transform_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  /**                                                            @default: json_transform_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_type(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_type(col0:JSON, col1:VARCHAR | ) -> VARCHAR*/
  json_type(col0: DJsonable, col1?: DAnyable | DVarcharable): DStr;
  /**                                                            @default: json_type(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_type(col0:VARCHAR, col1:VARCHAR | ) -> VARCHAR*/
  json_type(col0: DVarcharable, col1?: DAnyable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_valid(col0:JSON) -> BOOLEAN*/
  json_valid(col0: DJsonable): DBoolField;
  /**                                                            @default: json_valid(col0:VARCHAR) -> BOOLEAN*/
  json_valid(col0: DVarcharable): DBoolField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: json_value(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_value(col0:JSON, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_value(col0: DJsonable, col1: DNumericable | DVarcharable): DStr;
  /**                                                            @default: json_value(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**                                                            @default: json_value(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_value(col0: DVarcharable, col1: DNumericable | DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Number of characters in string.	@example: length('Hello🦆')	@default: len(string:ANY[]) -> BIGINT*/
  len(string: DArrayable): DNum;
  /**                                                            @description: Number of characters in string.	@example: length('Hello🦆')	@default: len(string:BIT) -> BIGINT*/
  len(string: DAnyable): DNum;
  /**                                                            @description: Number of characters in string.	@example: length('Hello🦆')	@default: len(string:VARCHAR) -> BIGINT*/
  len(string: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@default: list_element(list:ANY[], index:BIGINT) -> ANY*/
  list_element(list: DArrayable, index: DNumericable): DAnyField;
  /**                                                            @description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@default: list_element(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_element(list: DVarcharable, index: DNumericable): DStr;
  /**                                                            @description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@default: list_extract(list:ANY[], index:BIGINT) -> ANY*/
  list_extract: this["list_element"];
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: The date for the given parts	@example: make_date(1992, 9, 20)	@default: make_date(year:BIGINT, month:BIGINT, day:BIGINT) -> DATE*/
  make_date(year: DNumericable, month: DNumericable, day: DNumericable): DDateField;
  /**                                                            @default: make_date(col0:INTEGER) -> DATE*/
  make_date(col0: DNumericable): DDateField;
  /**                                                            @description: The date for the given struct.	@example: make_date({'year': 2024, 'month': 11, 'day': 14})	@default: make_date(dateStruct:STRUCT("year" BIGINT, "month" BIGINT, "day" BIGINT)) -> DATE*/
  make_date(dateStruct: DNumericable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the MD5 hash of the value as a string	@example: md5('123')	@default: md5(value:BLOB) -> VARCHAR*/
  md5(value: DAnyable): DStr;
  /**                                                            @description: Returns the MD5 hash of the value as a string	@example: md5('123')	@default: md5(value:VARCHAR) -> VARCHAR*/
  md5(value: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@default: md5_number(value:BLOB) -> HUGEINT*/
  md5_number(value: DAnyable): DNum;
  /**                                                            @description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@default: md5_number(value:VARCHAR) -> HUGEINT*/
  md5_number(value: DVarcharable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the microsecond component from a date or timestamp	@example: microsecond(timestamp '2021-08-03 11:59:44.123456')	@default: microsecond(ts:DATE) -> BIGINT*/
  microsecond(ts: DDateable): DNum;
  /**                                                            @description: Extract the microsecond component from a date or timestamp	@example: microsecond(timestamp '2021-08-03 11:59:44.123456')	@default: microsecond(ts:INTERVAL) -> BIGINT*/
  microsecond(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the millennium component from a date or timestamp	@example: millennium(timestamp '2021-08-03 11:59:44.123456')	@default: millennium(ts:DATE) -> BIGINT*/
  millennium(ts: DDateable): DNum;
  /**                                                            @description: Extract the millennium component from a date or timestamp	@example: millennium(timestamp '2021-08-03 11:59:44.123456')	@default: millennium(ts:INTERVAL) -> BIGINT*/
  millennium(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the millisecond component from a date or timestamp	@example: millisecond(timestamp '2021-08-03 11:59:44.123456')	@default: millisecond(ts:DATE) -> BIGINT*/
  millisecond(ts: DDateable): DNum;
  /**                                                            @description: Extract the millisecond component from a date or timestamp	@example: millisecond(timestamp '2021-08-03 11:59:44.123456')	@default: millisecond(ts:INTERVAL) -> BIGINT*/
  millisecond(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the minute component from a date or timestamp	@example: minute(timestamp '2021-08-03 11:59:44.123456')	@default: minute(ts:DATE) -> BIGINT*/
  minute(ts: DDateable): DNum;
  /**                                                            @description: Extract the minute component from a date or timestamp	@example: minute(timestamp '2021-08-03 11:59:44.123456')	@default: minute(ts:INTERVAL) -> BIGINT*/
  minute(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the month component from a date or timestamp	@example: month(timestamp '2021-08-03 11:59:44.123456')	@default: month(ts:DATE) -> BIGINT*/
  month(ts: DDateable): DNum;
  /**                                                            @description: Extract the month component from a date or timestamp	@example: month(timestamp '2021-08-03 11:59:44.123456')	@default: month(ts:INTERVAL) -> BIGINT*/
  month(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: multiply(col0:BIGINT, col1:INTERVAL) -> INTERVAL*/
  multiply(col0: DNumericable, col1: DAnyable): DAnyField;
  /**                                                            @default: multiply(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  multiply(col0: DNumericable, col1: DNumericable): DNum;
  /**                                                            @default: multiply(col0:INTERVAL, col1:BIGINT) -> INTERVAL*/
  multiply(col0: DAnyable, col1: DNumericable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the nanosecond component from a date or timestamp	@example: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789	@default: nanosecond(tsns:DATE) -> BIGINT*/
  nanosecond(tsns: DDateable): DNum;
  /**                                                            @description: Extract the nanosecond component from a date or timestamp	@example: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789	@default: nanosecond(tsns:INTERVAL) -> BIGINT*/
  nanosecond(tsns: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the quarter component from a date or timestamp	@example: quarter(timestamp '2021-08-03 11:59:44.123456')	@default: quarter(ts:DATE) -> BIGINT*/
  quarter(ts: DDateable): DNum;
  /**                                                            @description: Extract the quarter component from a date or timestamp	@example: quarter(timestamp '2021-08-03 11:59:44.123456')	@default: quarter(ts:INTERVAL) -> BIGINT*/
  quarter(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@default: range(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  range(start: DNumericable, stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /**                                                            @description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@default: range(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  range(start: DDateable, stop: DDateable, step: DAnyable): DArrayField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Repeats the string count number of times	@example: repeat('A', 5)	@default: repeat(string:ANY[], count:BIGINT) -> ANY[]*/
  repeat(string: DArrayable, count: DNumericable): DArrayField<DAnyField>;
  /**                                                            @description: Repeats the string count number of times	@example: repeat('A', 5)	@default: repeat(string:BLOB, count:BIGINT) -> BLOB*/
  repeat(string: DAnyable, count: DNumericable): DAnyField;
  /**                                                            @description: Repeats the string count number of times	@example: repeat('A', 5)	@default: repeat(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  repeat(string: DVarcharable, count: DNumericable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the second component from a date or timestamp	@example: second(timestamp '2021-08-03 11:59:44.123456')	@default: second(ts:DATE) -> BIGINT*/
  second(ts: DDateable): DNum;
  /**                                                            @description: Extract the second component from a date or timestamp	@example: second(timestamp '2021-08-03 11:59:44.123456')	@default: second(ts:INTERVAL) -> BIGINT*/
  second(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the SHA1 hash of the value	@example: sha1('hello')	@default: sha1(value:BLOB) -> VARCHAR*/
  sha1(value: DAnyable): DStr;
  /**                                                            @description: Returns the SHA1 hash of the value	@example: sha1('hello')	@default: sha1(value:VARCHAR) -> VARCHAR*/
  sha1(value: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Returns the SHA256 hash of the value	@example: sha256('hello')	@default: sha256(value:BLOB) -> VARCHAR*/
  sha256(value: DAnyable): DStr;
  /**                                                            @description: Returns the SHA256 hash of the value	@example: sha256('hello')	@default: sha256(value:VARCHAR) -> VARCHAR*/
  sha256(value: DVarcharable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@default: strftime(data:DATE, format:VARCHAR) -> VARCHAR*/
  strftime(data: DDateable, format: DVarcharable): DStr;
  /**                                                            @description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@default: strftime(data:VARCHAR, format:DATE | TIMESTAMP | TIMESTAMP_NS) -> VARCHAR*/
  strftime(data: DVarcharable, format: DDateable): DStr;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @default: subtract(col0:BIGINT, col1:BIGINT | ) -> BIGINT*/
  subtract(col0: DNumericable, col1?: DAnyable | DNumericable): DNum;
  /**                                                            @default: subtract(col0:DATE, col1:INTEGER | INTERVAL) -> TIMESTAMP*/
  subtract(col0: DDateable, col1: DAnyable | DNumericable): DDateField;
  /**                                                            @default: subtract(col0:DATE, col1:DATE) -> BIGINT*/
  subtract(col0: DDateable, col1: DDateable): DNum;
  /**                                                            @default: subtract(col0:INTERVAL, col1:INTERVAL | ) -> INTERVAL*/
  subtract(col0: DAnyable, col1?: DAnyable): DAnyField;
  /**                                                            @default: subtract(col0:TIME WITH TIME ZONE, col1:INTERVAL) -> TIME WITH TIME ZONE*/
  subtract(col0: DDateable, col1: DAnyable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@default: timezone(ts:DATE) -> BIGINT*/
  timezone(ts: DDateable): DNum;
  /**                                                            @description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@default: timezone(ts:INTERVAL, col1:TIME WITH TIME ZONE) -> TIME WITH TIME ZONE*/
  timezone(ts: DAnyable, col1: DDateable): DDateField;
  /**                                                            @description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@default: timezone(ts:INTERVAL) -> BIGINT*/
  timezone(ts: DAnyable): DNum;
  /**                                                            @description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@default: timezone(ts:VARCHAR, col1:TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIME WITH TIME ZONE*/
  timezone(ts: DVarcharable, col1: DDateable): DDateField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the timezone_hour component from a date or timestamp	@example: timezone_hour(timestamp '2021-08-03 11:59:44.123456')	@default: timezone_hour(ts:DATE) -> BIGINT*/
  timezone_hour(ts: DDateable): DNum;
  /**                                                            @description: Extract the timezone_hour component from a date or timestamp	@example: timezone_hour(timestamp '2021-08-03 11:59:44.123456')	@default: timezone_hour(ts:INTERVAL) -> BIGINT*/
  timezone_hour(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the timezone_minute component from a date or timestamp	@example: timezone_minute(timestamp '2021-08-03 11:59:44.123456')	@default: timezone_minute(ts:DATE) -> BIGINT*/
  timezone_minute(ts: DDateable): DNum;
  /**                                                            @description: Extract the timezone_minute component from a date or timestamp	@example: timezone_minute(timestamp '2021-08-03 11:59:44.123456')	@default: timezone_minute(ts:INTERVAL) -> BIGINT*/
  timezone_minute(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the week component from a date or timestamp	@example: week(timestamp '2021-08-03 11:59:44.123456')	@default: week(ts:DATE) -> BIGINT*/
  week(ts: DDateable): DNum;
  /**                                                            @description: Extract the week component from a date or timestamp	@example: week(timestamp '2021-08-03 11:59:44.123456')	@default: week(ts:INTERVAL) -> BIGINT*/
  week(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the weekday component from a date or timestamp	@example: weekday(timestamp '2021-08-03 11:59:44.123456')	@default: weekday(ts:DATE) -> BIGINT*/
  weekday(ts: DDateable): DNum;
  /**                                                            @description: Extract the weekday component from a date or timestamp	@example: weekday(timestamp '2021-08-03 11:59:44.123456')	@default: weekday(ts:INTERVAL) -> BIGINT*/
  weekday(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the weekofyear component from a date or timestamp	@example: weekofyear(timestamp '2021-08-03 11:59:44.123456')	@default: weekofyear(ts:DATE) -> BIGINT*/
  weekofyear(ts: DDateable): DNum;
  /**                                                            @description: Extract the weekofyear component from a date or timestamp	@example: weekofyear(timestamp '2021-08-03 11:59:44.123456')	@default: weekofyear(ts:INTERVAL) -> BIGINT*/
  weekofyear(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Bitwise XOR	@example: xor(17, 5)	@default: xor(left:BIGINT, right:BIGINT) -> BIGINT*/
  xor(left: DNumericable, right: DNumericable): DNum;
  /**                                                            @description: Bitwise XOR	@example: xor(17, 5)	@default: xor(left:BIT, right:BIT) -> BIT*/
  xor(left: DAnyable, right: DAnyable): DAnyField;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the year component from a date or timestamp	@example: year(timestamp '2021-08-03 11:59:44.123456')	@default: year(ts:DATE) -> BIGINT*/
  year(ts: DDateable): DNum;
  /**                                                            @description: Extract the year component from a date or timestamp	@example: year(timestamp '2021-08-03 11:59:44.123456')	@default: year(ts:INTERVAL) -> BIGINT*/
  year(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  /**                                                            @description: Extract the yearweek component from a date or timestamp	@example: yearweek(timestamp '2021-08-03 11:59:44.123456')	@default: yearweek(ts:DATE) -> BIGINT*/
  yearweek(ts: DDateable): DNum;
  /**                                                            @description: Extract the yearweek component from a date or timestamp	@example: yearweek(timestamp '2021-08-03 11:59:44.123456')	@default: yearweek(ts:INTERVAL) -> BIGINT*/
  yearweek(ts: DAnyable): DNum;
  /* … … … … … … … … … … … … … … … … … … … … … … … … … … … … … … [Global] … … … … … … …  */
  // array_transform<T, U>(list: T[], lambda: (x: T) => U): DArrayField<FromPlain<U>>
  array_transform<T, U>(list: DArrayField<T> | T[], lambda: (x: FromPlain<T>) => U): DArrayField<FromPlain<U>>;
  array_reduce<T, U>(list: DArrayField<T> | T[], lambda: (accumulator: U, currentValue: FromPlain<T>) => U, initialValue: U): FromPlain<U>;
  array_filter<T>(list: DArrayField<T> | T[], lambda: (x: T) => any): DArrayField<T>;
}

export type DGlobalField = DGlobal<DNumericField, DVarcharField>;
// export type DGlobalComp = DGlobal<DNumericComp, DVarcharComp>

export type DAggregateField = DAggregate<DNumericField, DVarcharField>;
// export type DAggregateComp = DAggregate<DNumericComp, DVarcharComp>

export type DCastorsField = DCastors<DNumericField, DVarcharField>;
// export type DCastorsComp = DCastors<DNumericComp, DVarcharComp>

export type DConstructorsField = DConstructors<DNumericField, DVarcharField>;
// export type DConstructorsComp = DConstructors<DNumericComp, DVarcharComp>

export type DMacroAGField = DMacroAG<DNumericField, DVarcharField>;
export type DMacroField = DMacro<DNumericField, DVarcharField>;

export type DMetaField = DGlobalField & DAggregateField & DConstructorsField & DGlobalPatternMatchers & DCastorsField & DMacroField & DMacroAGField;
// export type DMetaComp = DGlobalComp & DAggregateComp & DConstructorsComp & DGlobalPatternMatchers & DCastorsComp

export interface DConstructors<DNum, DStr> {
  /**@example: Array(val)      @external: Array(val:OTHER) -> ARRAY*/
  Array<T = DAnyable>(val: T[]): DArrayField<FromPlain<T>>;
  /**@example: Json(val)       @external: Json(val:OTHER) -> JSON*/
  Json(val: any): DJsonField;
  /**@example: List(val)       @external: List(val:OTHER) -> LIST*/
  Struct<T extends {}>(val: DStructField<T> | T): DStructField<FromPlain<T>>;
  /**@example: Time(val)       @external: Time(val:OTHER) -> TIME*/
  List: this["Array"];
  /**@example: Map(val)        @external: Map(val:OTHER) -> MAP*/
  Map(val: DAnyable): DAnyComp;
  /**@example: Bigint(val)     @external: Bigint(val:OTHER) -> BIGINT*/
  Bigint(val: DAnyable): DNum;
  /**@example: Bit(val)        @external: Bit(val:OTHER) -> BIT*/
  Bit(val: DAnyable): DAnyComp;
  /**@example: Blob(val)       @external: Blob(val:OTHER) -> BLOB*/
  Blob(val: DAnyable): DAnyComp;
  /**@example: Boolean(val)    @external: Boolean(val:OTHER) -> BOOLEAN*/
  Boolean(val: DAnyable): DBoolField;
  /**@example: Date(val)       @external: Date(val:OTHER) -> DATE*/
  Date(val: DAnyable): DDateField;
  /**@example: Decimal(val)    @external: Decimal(val:OTHER) -> DECIMAL*/
  Decimal(val: DAnyable): DNum;
  /**@example: Double(val)     @external: Double(val:OTHER) -> DOUBLE*/
  Double(val: DAnyable): DNum;
  /**@example: Enum(val)       @external: Enum(val:OTHER) -> ENUM*/
  Enum(val: DAnyable): DAnyComp;
  /**@example: Float(val)      @external: Float(val:OTHER) -> FLOAT*/
  Float(val: DAnyable): DNum;
  /**@example: Hugeint(val)    @external: Hugeint(val:OTHER) -> HUGEINT*/
  Hugeint(val: DAnyable): DNum;
  /**@example: Integer(val)    @external: Integer(val:OTHER) -> INTEGER*/
  Integer(val: DAnyable): DNum;
  /**@example: Interval(val)   @external: Interval(val:OTHER) -> INTERVAL*/
  Interval(val: DAnyable): DAnyComp;
  /**@example: Null(val)       @external: Null(val:OTHER) -> NULL*/
  Null(val: DAnyable): DAnyComp;
  /**@example: Smallint(val)   @external: Smallint(val:OTHER) -> SMALLINT*/
  Smallint(val: DAnyable): DNum;
  /**@example: Struct(val)     @external: Struct(val:OTHER) -> STRUCT*/
  Time(val: DAnyable): DDateField;
  /**@example: Timestamp(val)  @external: Timestamp(val:OTHER) -> TIMESTAMP*/
  Timestamp(val: DAnyable): DDateField;
  /**@example: Timestamp_ms(val)       @external: Timestamp_ms(val:OTHER) -> TIMESTAMP_MS*/
  Timestamp_ms(val: DAnyable): DDateField;
  /**@example: Timestamp_ns(val)       @external: Timestamp_ns(val:OTHER) -> TIMESTAMP_NS*/
  Timestamp_ns(val: DAnyable): DDateField;
  /**@example: Timestamp_s(val)        @external: Timestamp_s(val:OTHER) -> TIMESTAMP_S*/
  Timestamp_s(val: DAnyable): DDateField;
  /**@example: Tinyint(val)    @external: Tinyint(val:OTHER) -> TINYINT*/
  Tinyint(val: DAnyable): DNum;
  /**@example: Ubigint(val)    @external: Ubigint(val:OTHER) -> UBIGINT*/
  Ubigint(val: DAnyable): DNum;
  /**@example: Uhugeint(val)   @external: Uhugeint(val:OTHER) -> UHUGEINT*/
  Uhugeint(val: DAnyable): DNum;
  /**@example: Uinteger(val)   @external: Uinteger(val:OTHER) -> UINTEGER*/
  Uinteger(val: DAnyable): DNum;
  /**@example: Union(val)      @external: Union(val:OTHER) -> UNION*/
  Union(val: DAnyable): DAnyComp;
  /**@example: Usmallint(val)  @external: Usmallint(val:OTHER) -> USMALLINT*/
  Usmallint(val: DAnyable): DNum;
  /**@example: Utinyint(val)   @external: Utinyint(val:OTHER) -> UTINYINT*/
  Utinyint(val: DAnyable): DNum;
  /**@example: Uuid(val)       @external: Uuid(val:OTHER) -> UUID*/
  Uuid(val: DAnyable): DAnyComp;
  /**@example: Varchar(val)    @external: Varchar(val:OTHER) -> VARCHAR*/
  Varchar(val: DAnyable): DStr;
  /**@example: Varint(val)     @external: Varint(val:OTHER) -> VARINT*/
  Varint(val: DAnyable): DNum;
}

export interface DCastors<DNum, DStr> {
  cast(val: DAnyable, destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  cast(val: DAnyable, destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): DAnyField;
  cast(val: DAnyable, destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  cast(val: DAnyable, destype: DNUMERIC_NATIVE, ...args: DAnyable[]): DNum;
  cast(val: DAnyable, destype: DSTRING_NATIVE, ...args: DAnyable[]): DStr;
  cast(val: DAnyable, destype: DANY_NATIVE, ...args: DAnyable[]): DAnyField;
}

export interface Astor<DNum, DStr> {
  as(destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  as(destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): this;
  as(destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  as(destype: DNUMERIC_NATIVE, ...args: DAnyable[]): DNum;
  as(destype: DSTRING_NATIVE, ...args: DAnyable[]): DStr;
  as(destype: DANY_NATIVE, ...args: DAnyable[]): this;
}

export interface DPatternMatchers {
  /**@example: Ilike(val, matcher)     @external: Ilike(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Ilike(matcher: DAnyable): DBoolField;
  /**@example: In(val, matcher)        @external: In(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  In(matcher: DAnyable): DBoolField;
  /**@example: Like(val, matcher)      @external: Like(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Like(matcher: DAnyable): DBoolField;
  /**@example: IsNull(val)     @external: IsNull(val:ANY) -> BOOLEAN*/
  IsNull(): DBoolField;
  /**@example: Between(val, col1, col2)        @external: Between(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  Between(col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: NotBetween(val, col1, col2)     @external: NotBetween(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  NotBetween(col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: SimilarTo(val, matcher) @external: SimilarTo(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  SimilarTo(matcher: DAnyable): DBoolField;
  /**@example: Glob(val, matcher)      @external: Glob(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Glob(matcher: DAnyable): DBoolField;
}

export interface DGlobalPatternMatchers {
  /**@example: Ilike(val, matcher)     @external: Ilike(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Ilike(item: DAnyable, matcher: DAnyable): DBoolField;
  /**@example: In(val, matcher)        @external: In(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  In(item: DAnyable, matcher: DAnyable): DBoolField;
  /**@example: Like(val, matcher)      @external: Like(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Like(item: DAnyable, matcher: DAnyable): DBoolField;
  /**@example: IsNull(val)     @external: IsNull(val:ANY) -> BOOLEAN*/
  IsNull(item: DAnyable): DBoolField;
  /**@example: Between(val, col1, col2)        @external: Between(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  Between(item: DAnyable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: NotBetween(val, col1, col2)     @external: NotBetween(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  NotBetween(item: DAnyable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: SimilarTo(val, matcher) @external: SimilarTo(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  SimilarTo(item: DAnyable, matcher: DAnyable): DBoolField;
  /**@example: Glob(val, matcher)      @external: Glob(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Glob(item: DAnyable, matcher: DAnyable): DBoolField;
}

export interface DSettings {
  /**                                                            @description: Access mode of the database (AUTOMATIC, READ_ONLY or READ_WRITE)*/
  access_mode: string;
  /**                                                            @description: Whether to enable the allocator background thread.*/
  allocator_background_threads: boolean;
  /**                                                            @description: If a bulk deallocation larger than this occurs, flush outstanding allocations.*/
  allocator_bulk_deallocation_flush_threshold: string;
  /**                                                            @description: Peak allocation threshold at which to flush the allocator after completing a task.*/
  allocator_flush_threshold: string;
  /**                                                            @description: Allow to load community built extensions*/
  allow_community_extensions: boolean;
  /**                                                            @description: Allow to load extensions with not compatible metadata*/
  allow_extensions_metadata_mismatch: boolean;
  /**                                                            @description: Allow the creation of persistent secrets, that are stored and loaded on restarts*/
  allow_persistent_secrets: boolean;
  /**                                                            @description: Allow printing unredacted secrets*/
  allow_unredacted_secrets: boolean;
  /**                                                            @description: Allow to load extensions with invalid or missing signatures*/
  allow_unsigned_extensions: boolean;
  /**                                                            @description: List of directories/prefixes that are ALWAYS allowed to be queried - even when enable_external_access is false*/
  allowed_directories: any[];
  /**                                                            @description: List of files that are ALWAYS allowed to be queried - even when enable_external_access is false*/
  allowed_paths: any[];
  /**                                                            @description: Whether Arrow buffers for strings, blobs, uuids and bits should be exported using large buffers*/
  arrow_large_buffer_size: boolean;
  /**                                                            @description: Whenever a DuckDB type does not have a clear native or canonical extension match in Arrow, export the types with a duckdb.type_name extension name.*/
  arrow_lossless_conversion: boolean;
  /**                                                            @description: Whether export to Arrow format should use ListView as the physical layout for LIST columns*/
  arrow_output_list_view: boolean;
  /**                                                            @description: Overrides the custom endpoint for extension installation on autoloading*/
  autoinstall_extension_repository: string;
  /**                                                            @description: Whether known extensions are allowed to be automatically installed when a query depends on them*/
  autoinstall_known_extensions: boolean;
  /**                                                            @description: Whether known extensions are allowed to be automatically loaded when a query depends on them*/
  autoload_known_extensions: boolean;
  /**                                                            @description: The maximum number of schemas the system will scan for "did you mean..." style errors in the catalog*/
  catalog_error_max_schemas: number;
  /**                                                            @description: The WAL size threshold at which to automatically trigger a checkpoint (e.g. 1GB)*/
  checkpoint_threshold: string;
  /**                                                            @description: The WAL size threshold at which to automatically trigger a checkpoint (e.g. 1GB)*/
  wal_autocheckpoint: string;
  /**                                                            @description: Overrides the custom endpoint for remote extension installation*/
  custom_extension_repository: string;
  /**                                                            @description: Accepts a JSON enabling custom metrics*/
  custom_profiling_settings: string;
  /**                                                            @description: Metadata from DuckDB callers*/
  custom_user_agent: string;
  /**                                                            @description: DEBUG SETTING: force use of IEJoin to implement AsOf joins*/
  debug_asof_iejoin: boolean;
  /**                                                            @description: DEBUG SETTING: trigger an abort while checkpointing for testing purposes*/
  debug_checkpoint_abort: string;
  /**                                                            @description: DEBUG SETTING: force out-of-core computation for operators that support it, used for testing*/
  debug_force_external: boolean;
  /**                                                            @description: DEBUG SETTING: Force disable cross product generation when hyper graph isn't connected, used for testing*/
  debug_force_no_cross_product: boolean;
  /**                                                            @description: DEBUG SETTING: skip checkpointing on commit*/
  debug_skip_checkpoint_on_commit: boolean;
  /**                                                            @description: DEBUG SETTING: switch window mode to use*/
  debug_window_mode: string;
  /**                                                            @description: The default block size for new duckdb database files (new as-in, they do not yet exist).*/
  default_block_size: number;
  /**                                                            @description: The collation setting used when none is specified*/
  default_collation: string;
  /**                                                            @description: NULL ordering used when none is specified (NULLS_FIRST or NULLS_LAST)*/
  default_null_order: string;
  /**                                                            @description: NULL ordering used when none is specified (NULLS_FIRST or NULLS_LAST)*/
  null_order: string;
  /**                                                            @description: The order type used when none is specified (ASC or DESC)*/
  default_order: string;
  /**                                                            @description: Allows switching the default storage for secrets*/
  default_secret_storage: string;
  /**                                                            @description: Disable a specific set of compression methods (comma separated)*/
  disabled_compression_methods: string;
  /**                                                            @description: Disable specific file systems preventing access (e.g. LocalFileSystem)*/
  disabled_filesystems: string;
  /**                                                            @description: Sets the list of disabled loggers*/
  disabled_log_types: string;
  /**                                                            @description: DEBUG SETTING: disable a specific set of optimizers (comma separated)*/
  disabled_optimizers: string;
  /**                                                            @description: DuckDB API surface*/
  duckdb_api: string;
  /**                                                            @description: The maximum amount of OR filters we generate dynamically from a hash join*/
  dynamic_or_filter_threshold: number;
  /**                                                            @description: Allow the database to access external state (through e.g. loading/installing modules, COPY TO/FROM, CSV readers, pandas replacement scans, etc)*/
  enable_external_access: boolean;
  /**                                                            @description: Allow scans on FSST compressed segments to emit compressed vectors to utilize late decompression*/
  enable_fsst_vectors: boolean;
  /**                                                            @description: Enables HTTP logging*/
  enable_http_logging: boolean;
  /**                                                            @description: Whether or not the global http metadata is used to cache HTTP metadata*/
  enable_http_metadata_cache: boolean;
  /**                                                            @description: Enables the logger*/
  enable_logging: boolean;
  /**                                                            @description: Enable created MACROs to create dependencies on the referenced objects (such as tables)*/
  enable_macro_dependencies: boolean;
  /**                                                            @description: [PLACEHOLDER] Legacy setting - does nothing*/
  enable_object_cache: boolean;
  /**                                                            @description: Enables profiling, and sets the output format (JSON, QUERY_TREE, QUERY_TREE_OPTIMIZER)*/
  enable_profiling: string;
  /**                                                            @description: Enables the progress bar, printing progress to the terminal for long queries*/
  enable_progress_bar: boolean;
  /**                                                            @description: Controls the printing of the progress bar, when 'enable_progress_bar' is true*/
  enable_progress_bar_print: boolean;
  /**                                                            @description: Enable created VIEWs to create dependencies on the referenced objects (such as tables)*/
  enable_view_dependencies: boolean;
  /**                                                            @description: Sets the list of enabled loggers*/
  enabled_log_types: string;
  /**                                                            @description: Output error messages as structured JSON instead of as a raw string*/
  errors_as_json: boolean;
  /**                                                            @description: Output of EXPLAIN statements (ALL, OPTIMIZED_ONLY, PHYSICAL_ONLY)*/
  explain_output: string;
  /**                                                            @description: Set the directory to store extensions in*/
  extension_directory: string;
  /**                                                            @description: The number of external threads that work on DuckDB tasks.*/
  external_threads: number;
  /**                                                            @description: A comma separated list of directories to search for input files*/
  file_search_path: string;
  /**                                                            @description: DEBUG SETTING: forces a specific bitpacking mode*/
  force_bitpacking_mode: string;
  /**                                                            @description: DEBUG SETTING: forces a specific compression method to be used*/
  force_compression: string;
  /**                                                            @description: Sets the home directory used by the system*/
  home_directory: string;
  /**                                                            @description: The file to which HTTP logging output should be saved, or empty to print to the terminal*/
  http_logging_output: string;
  /**                                                            @description: HTTP proxy host*/
  http_proxy: string;
  /**                                                            @description: Password for HTTP proxy*/
  http_proxy_password: string;
  /**                                                            @description: Username for HTTP proxy*/
  http_proxy_username: string;
  /**                                                            @description: Use IEE754-compliant floating point operations (returning NAN instead of errors/NULL).*/
  ieee_floating_point_ops: boolean;
  /**                                                            @description: Whether transactions should be started lazily when needed, or immediately when BEGIN TRANSACTION is called*/
  immediate_transaction_mode: boolean;
  /**                                                            @description: The maximum index scan count sets a threshold for index scans. If fewer than MAX(index_scan_max_count, index_scan_percentage * total_row_count) rows match, we perform an index scan instead of a table scan.*/
  index_scan_max_count: number;
  /**                                                            @description: The index scan percentage sets a threshold for index scans. If fewer than MAX(index_scan_max_count, index_scan_percentage * total_row_count) rows match, we perform an index scan instead of a table scan.*/
  index_scan_percentage: number;
  /**                                                            @description: Whether or not the / operator defaults to integer division, or to floating point division*/
  integer_division: boolean;
  /**                                                            @description: The maximum amount of rows in the LIMIT/SAMPLE for which we trigger late materialization*/
  late_materialization_max_rows: number;
  /**                                                            @description: Whether or not the configuration can be altered*/
  lock_configuration: boolean;
  /**                                                            @description: Specifies the path to which queries should be logged (default: NULL, queries are not logged)*/
  log_query_path: string;
  /**                                                            @description: The log level which will be recorded in the log*/
  logging_level: string;
  /**                                                            @description: Enables the logger*/
  logging_mode: string;
  /**                                                            @description: Set the logging storage (memory/stdout/file)*/
  logging_storage: string;
  /**                                                            @description: The maximum expression depth limit in the parser. WARNING: increasing this setting and using very deep expressions might lead to stack overflow errors.*/
  max_expression_depth: number;
  /**                                                            @description: The maximum memory of the system (e.g. 1GB)*/
  max_memory: string;
  /**                                                            @description: The maximum memory of the system (e.g. 1GB)*/
  memory_limit: string;
  /**                                                            @description: The maximum amount of data stored inside the 'temp_directory' (when set) (e.g. 1GB)*/
  max_temp_directory_size: string;
  /**                                                            @description: The maximum vacuum tasks to schedule during a checkpoint.*/
  max_vacuum_tasks: number;
  /**                                                            @description: The number of rows we need on either table to choose a merge join*/
  merge_join_threshold: number;
  /**                                                            @description: The number of rows we need on either table to choose a nested loop join*/
  nested_loop_join_threshold: number;
  /**                                                            @description: Allow implicit casting to/from VARCHAR*/
  old_implicit_casting: boolean;
  /**                                                            @description: Allow ordering by non-integer literals - ordering by such literals has no effect.*/
  order_by_non_integer_literal: boolean;
  /**                                                            @description: The number of rows to accumulate before sorting, used for tuning*/
  ordered_aggregate_threshold: number;
  /**                                                            @description: The threshold in number of rows after which we flush a thread state when writing using PARTITION_BY*/
  partitioned_write_flush_threshold: number;
  /**                                                            @description: The maximum amount of files the system can keep open before flushing to disk when writing using PARTITION_BY*/
  partitioned_write_max_open_files: number;
  /**                                                            @description: The password to use. Ignored for legacy compatibility.*/
  password: string;
  /**                                                            @description: Threshold in bytes for when to use a perfect hash table*/
  perfect_ht_threshold: number;
  /**                                                            @description: The threshold to switch from using filtered aggregates to LIST with a dedicated pivot operator*/
  pivot_filter_threshold: number;
  /**                                                            @description: The maximum number of pivot columns in a pivot statement*/
  pivot_limit: number;
  /**                                                            @description: Force use of range joins with mixed predicates*/
  prefer_range_joins: boolean;
  /**                                                            @description: Whether or not to preserve the identifier case, instead of always lowercasing all non-quoted identifiers*/
  preserve_identifier_case: boolean;
  /**                                                            @description: Whether or not to preserve insertion order. If set to false the system is allowed to re-order any results that do not contain ORDER BY clauses.*/
  preserve_insertion_order: boolean;
  /**                                                            @description: Whether strings should be produced by DuckDB in Utf8View format instead of Utf8*/
  produce_arrow_string_view: boolean;
  /**                                                            @description: The file to which profile output should be saved, or empty to print to the terminal*/
  profile_output: string;
  /**                                                            @description: The file to which profile output should be saved, or empty to print to the terminal*/
  profiling_output: string;
  /**                                                            @description: The profiling mode (STANDARD or DETAILED)*/
  profiling_mode: string;
  /**                                                            @description: Sets the time (in milliseconds) how long a query needs to take before we start printing a progress bar*/
  progress_bar_time: number;
  /**                                                            @description: When a scalar subquery returns multiple rows - return a random row instead of returning an error.*/
  scalar_subquery_error_on_multiple_rows: boolean;
  /**                                                            @description: Sets the default search schema. Equivalent to setting search_path to a single value.*/
  schema: string;
  /**                                                            @description: Sets the default catalog search path as a comma-separated list of values*/
  search_path: string;
  /**                                                            @description: Set the directory to which persistent secrets are stored*/
  secret_directory: string;
  /**                                                            @description: Serialize on checkpoint with compatibility for a given duckdb version*/
  storage_compatibility_version: string;
  /**                                                            @description: The maximum memory to buffer between fetching from a streaming result (e.g. 1GB)*/
  streaming_buffer_size: string;
  /**                                                            @description: Set the directory to which to write temp files*/
  temp_directory: string;
  /**                                                            @description: The number of total threads used by the system.*/
  threads: number;
  /**                                                            @description: The number of total threads used by the system.*/
  worker_threads: number;
  /**                                                            @description: The username to use. Ignored for legacy compatibility.*/
  username: string;
  /**                                                            @description: The username to use. Ignored for legacy compatibility.*/
  user: string;
  /**                                                            @description: The (average) length at which to enable ZSTD compression, defaults to 4096*/
  zstd_min_string_length: number;
  /**                                                            @description: Period of time between UI polling requests (in ms)*/
  ui_polling_interval: number;
  /**                                                            @description: Remote URL to which the UI server forwards GET requests*/
  ui_remote_url: string;
  /**                                                            @description: Local port on which the UI server listens*/
  ui_local_port: number;
  /**                                                            @description: Load all SQLite columns as VARCHAR columns*/
  sqlite_all_varchar: boolean;
  /**                                                            @description: DEBUG SETTING: print all queries sent to SQLite to stdout*/
  sqlite_debug_show_queries: boolean;
  /**                                                            @description: Azure connection string, used for authenticating and configuring azure requests*/
  azure_storage_connection_string: string;
  /**                                                            @description: Forwards the internal logging of the Delta Kernel to the duckdb logger. Warning: this may impact performance even with DuckDB logging disabled.*/
  delta_kernel_logging: boolean;
  /**                                                            @description: Http proxy password if needed.*/
  azure_proxy_password: string;
  /**                                                            @description: The current time zone*/
  TimeZone: string;
  /**                                                            @description: Http proxy user name if needed.*/
  azure_proxy_user_name: string;
  /**                                                            @description: Proxy to use when login & performing request to azure. By default it will use the HTTP_PROXY environment variable if set.*/
  azure_http_proxy: string;
  /**                                                            @description: Size of the read buffer.  It is recommended that this is evenly divisible by azure_read_transfer_chunk_size.*/
  azure_read_buffer_size: number;
  /**                                                            @description: Enable globbing the filesystem (if possible) to find the latest version metadata. This could result in reading an uncommitted version.*/
  unsafe_enable_version_guessing: boolean;
  /**                                                            @description: Maximum size in bytes that the Azure client will read in a single request. It is recommended that this is a factor of azure_read_buffer_size.*/
  azure_read_transfer_chunk_size: number;
  /**                                                            @description: Maximum number of threads the Azure client can use for a single parallel read. If azure_read_transfer_chunk_size is less than azure_read_buffer_size then setting this > 1 will allow the Azure client to do concurrent requests to fill the buffer.*/
  azure_read_transfer_concurrency: number;
  /**                                                            @description: Include http info from the Azure Storage in the explain analyze statement.*/
  azure_http_stats: boolean;
  /**                                                            @description: Override the azure endpoint for when the Azure credential providers are used.*/
  azure_endpoint: string;
  /**                                                            @description: Ordered list of Azure credential providers, in string format separated by ';'. E.g. 'cli;workload_identity;managed_identity;env'*/
  azure_credential_chain: string;
  /**                                                            @description: Enable/disable the caching of some context when performing queries. This cache is by default enable, and will for a given connection keep a local context when performing a query. If you suspect that the caching is causing some side effect you can try to disable it by setting this option to false.*/
  azure_context_caching: boolean;
  /**                                                            @description: Disable the prefetching mechanism in Parquet*/
  disable_parquet_prefetching: boolean;
  /**                                                            @description: Attempt to decode/encode geometry data in/as GeoParquet files if the spatial extension is present.*/
  enable_geoparquet_conversion: boolean;
  /**                                                            @description: Azure account name, when set, the extension will attempt to automatically detect credentials*/
  azure_account_name: string;
  /**                                                            @description: Adds the filtered files to the explain output. Warning: this may impact performance of delta scan during explain analyze queries.*/
  delta_scan_explain_files_filtered: boolean;
  /**                                                            @description: The current calendar*/
  Calendar: string;
  /**                                                            @description: Underlying adapter to use with the Azure SDK. Read more about the adapter at https://github.com/Azure/azure-sdk-for-cpp/blob/main/doc/HttpTransportAdapter.md. Valid values are: default, curl*/
  azure_transport_option_type: string;
  /**                                                            @description: Cache Parquet metadata - useful when reading the same files multiple times*/
  parquet_metadata_cache: boolean;
  /**                                                            @description: Use the prefetching mechanism for all types of parquet files*/
  prefetch_all_parquet_files: boolean;
  /**                                                            @description: In Parquet files, interpret binary data as a string.*/
  binary_as_string: boolean;
}

export type DExtensions = "arrow" | "autocomplete" | "avro" | "aws" | "azure" | "bigquery" | "blockduck" | "cache_httpfs" | "capi_quack" | "chsql" | "chsql_native" | "core_functions" | "cronjob" | "crypto" | "datasketches" | "delta" | "duckpgq" | "evalexpr_rhai" | "excel" | "faiss" | "file_dialog" | "flockmtl" | "fts" | "fuzzycomplete" | "geography" | "gsheets" | "h3" | "hostfs" | "http_client" | "httpfs" | "httpserver" | "iceberg" | "icu" | "inet" | "jemalloc" | "json" | "lindel" | "magic" | "motherduck" | "mysql_scanner" | "nanoarrow" | "netquack" | "open_prompt" | "parquet" | "pbix" | "pivot_table" | "postgres_scanner" | "prql" | "psql" | "quack" | "read_stat" | "rusty_quack" | "sheetreader" | "shellfs" | "spatial" | "sqlite_scanner" | "substrait" | "tpcds" | "tpch" | "tsid" | "ui" | "ulid" | "vss" | "webmacro" | "zipfs" | string | {};
