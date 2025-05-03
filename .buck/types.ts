export type DNumericable = number | DNumericField | _DNumericField;
export type DVarcharable = string | DVarcharField | _DVarcharField;
export type DArrayable = any[] | DArrayField | _DArrayField;
export type DStructable = Record<string, any> | DStructField | _DStructField;
export type DJsonable = Record<string, any> | DJsonField | _DJsonField;
export type DBoolable = boolean | DBoolField | _DBoolField;
export type DBlobable = string | DBlobField | _DBlobField;
export type DDateable = Date | DDateField | _DDateField;
export type DMapable = Map<string, any> | DMapField | _DMapField;
export type DOtherable = any | DOtherField | _DOtherField;
export type DAnyable = any | DAnyField | _DAnyField;
export type RegExpable = RegExp | string;
export type DBOOLEAN_NATIVE = "Bool" | "Boolean" | "Logical";
export type DCOMPOSITE_NATIVE = "List" | "Map" | "Row" | "Struct" | "Union";
export type DDATETIME_NATIVE = "Date" | "Datetime" | "Interval" | "Time" | "Timestamp" | "Timestamptz" | "Timestamp_ms" | "Timestamp_ns" | "Timestamp_s" | "Timestamp_us" | "Timetz";
export type DNUMERIC_NATIVE = "Bigint" | "Dec" | "Decimal" | "Double" | "Float" | "Float4" | "Float8" | "Hugeint" | "Int" | "Int1" | "Int128" | "Int16" | "Int2" | "Int32" | "Int4" | "Int64" | "Int8" | "Integer" | "Integral" | "Long" | "Numeric" | "Oid" | "Real" | "Short" | "Signed" | "Smallint" | "Tinyint" | "Ubigint" | "Uhugeint" | "Uint128" | "Uint16" | "Uint32" | "Uint64" | "Uint8" | "Uinteger" | "Usmallint" | "Utinyint";
export type DSTRING_NATIVE = "Bpchar" | "Char" | "Nvarchar" | "String" | "Text" | "Varchar" | "JSON";
export type DANY_NATIVE = "Binary" | "Bit" | "Bitstring" | "Blob" | "Bytea" | "Enum" | "Guid" | "Null" | "Uuid" | "Varbinary" | "Varint";
export type DSomeField = DVarcharField | DNumericField | DDateField | DNumericField | DOtherField | DDateField | DArrayField | DAnyField | DVarcharField;
export declare const sId: unique symbol;
export declare const sComptype: unique symbol;
export declare const sAnti: unique symbol;
export declare const sInferred: unique symbol;
interface _DVarcharField extends DAnyField {
  [sInferred]: string;
  [sComptype]: DVarcharComp;
}
export type DVarcharField = _DVarcharField;
interface _DNumericField extends DAnyField {
  [sInferred]: number;
  [sComptype]: DNumericComp;
  /**@description Absolute value	@example abs(-17.4)*/
  abs(): DNumericField;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(): DNumericField;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(): DNumericField;
  add(col1?: DNumericable | DOtherable): DNumericField;
  add(col1: DDateable): DDateField;
}
export type DNumericField = _DNumericField & number;
interface _DDateField extends DAnyField {
  [sInferred]: Date;
  [sComptype]: Date;
  add(col1: DDateable | DNumericable | DOtherable): DDateField;
  add(col1: DDateable | DOtherable): DDateField;
  add(col1: DOtherable): DDateField;
  /**@description Subtract arguments, resulting in the time difference between the two timestamps	@example age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')*/
  age(timestamp__01?: DDateable | DOtherable): DOtherField;
}
export type DDateField = _DDateField;
interface _DOtherField extends DAnyField {
  [sInferred]: any;
  [sComptype]: any;
  add(col1: DDateable): DDateField;
  add(col1: DOtherable): DOtherField;
  /**@example count()*/
  count(): DNumericField;
  /**@example Bigint(val)*/
  Bigint(): DNumericField;
  /**@example Bit(val)*/
  Bit(): DOtherField;
  /**@example Blob(val)*/
  Blob(): DBlobField;
  /**@example Boolean(val)*/
  Boolean(): DBoolField;
  /**@example Date(val)*/
  Date(): DDateField;
  /**@example Decimal(val)*/
  Decimal(): DNumericField;
  /**@example Double(val)*/
  Double(): DNumericField;
  /**@example Enum(val)*/
  Enum(): DOtherField;
  /**@example Float(val)*/
  Float(): DNumericField;
  /**@example Hugeint(val)*/
  Hugeint(): DNumericField;
  /**@example Integer(val)*/
  Integer(): DNumericField;
  /**@example Interval(val)*/
  Interval(): DOtherField;
  /**@example List(val)*/
  List(): DArrayField;
  /**@example Map(val)*/
  Map(): DMapField;
  /**@example Null(val)*/
  Null(): DOtherField;
  /**@example Smallint(val)*/
  Smallint(): DNumericField;
  /**@example Struct(val)*/
  Struct(): DStructField;
  /**@example Time(val)*/
  Time(): DDateField;
  /**@example Timestamp(val)*/
  Timestamp(): DDateField;
  /**@example Timestamp_ms(val)*/
  Timestamp_ms(): DDateField;
  /**@example Timestamp_ns(val)*/
  Timestamp_ns(): DDateField;
  /**@example Timestamp_s(val)*/
  Timestamp_s(): DDateField;
  /**@example Tinyint(val)*/
  Tinyint(): DNumericField;
  /**@example Ubigint(val)*/
  Ubigint(): DNumericField;
  /**@example Uhugeint(val)*/
  Uhugeint(): DNumericField;
  /**@example Uinteger(val)*/
  Uinteger(): DNumericField;
  /**@example Union(val)*/
  Union(): DOtherField;
  /**@example Usmallint(val)*/
  Usmallint(): DNumericField;
  /**@example Utinyint(val)*/
  Utinyint(): DNumericField;
  /**@example Uuid(val)*/
  Uuid(): DOtherField;
  /**@example Varchar(val)*/
  Varchar(): DVarcharField;
  /**@example Varint(val)*/
  Varint(): DOtherField;
  /**@example Array(val)*/
  Array(): DArrayField;
  /**@example Json(val)*/
  Json(): DJsonField;
}
export type DOtherField = _DOtherField;
interface _DArrayField<T = any> {
  [sInferred]: T[];
  [sComptype]: any[];
  add(col1: DArrayable): DArrayField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  aggregate(name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  apply(lambda: DOtherable): DArrayField;
}
export type DArrayField<T = any> = _DArrayField<T> & T[];
interface _DAnyField {
  as(destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  as(destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): DAnyField;
  as(destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  as(destype: DNUMERIC_NATIVE, ...args: DAnyable[]): DNumericField;
  as(destype: DSTRING_NATIVE, ...args: DAnyable[]): DVarcharField;
  as(destype: DANY_NATIVE, ...args: DAnyable[]): DAnyField;

  [sInferred]: any;
  [sComptype]: any;
  /**@description Returns the name of a given expression	@example alias(42 + 1)*/
  alias(): DVarcharField;
}
export type DAnyField = _DAnyField;
interface _DGlobalField {
  cast(val: DBoolable, destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  cast(val: DAnyable, destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): DAnyField;
  cast(val: DDateable, destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  cast(val: DNumericable, destype: DNUMERIC_NATIVE, ...args: DAnyable[]): DNumericField;
  cast(val: DVarcharable, destype: DSTRING_NATIVE, ...args: DAnyable[]): DVarcharField;
  cast(val: DAnyable, destype: DANY_NATIVE, ...args: DAnyable[]): DAnyField;

  /**@description Absolute value	@example abs(-17.4)*/
  abs(x: DNumericable): DNumericField;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(x: DNumericable): DNumericField;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(x: DNumericable): DNumericField;
  add(col0: DOtherable, col1: DDateable): DDateField;
  add(col0: DNumericable, col1?: DNumericable | DOtherable): DNumericField;
  add(col0: DNumericable, col1: DDateable): DDateField;
  add(col0: DOtherable, col1: DOtherable): DOtherField;
  add(col0: DDateable, col1: DDateable | DNumericable | DOtherable): DDateField;
  add(col0: DArrayable, col1: DArrayable): DArrayField;
  add(col0: DDateable, col1: DDateable | DOtherable): DDateField;
  add(col0: DDateable, col1: DOtherable): DDateField;
  /**@description Subtract arguments, resulting in the time difference between the two timestamps	@example age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')*/
  age(timestamp: DDateable, timestamp__01?: DDateable | DOtherable): DOtherField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Returns the name of a given expression	@example alias(42 + 1)*/
  alias(expr: DAnyable): DVarcharField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  apply(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@example count()*/
  count(): DNumericField;
  /**@example Bigint(val)*/
  Bigint(val: DOtherable): DNumericField;
  /**@example Bit(val)*/
  Bit(val: DOtherable): DOtherField;
  /**@example Blob(val)*/
  Blob(val: DOtherable): DBlobField;
  /**@example Boolean(val)*/
  Boolean(val: DOtherable): DBoolField;
  /**@example Date(val)*/
  Date(val: DOtherable): DDateField;
  /**@example Decimal(val)*/
  Decimal(val: DOtherable): DNumericField;
  /**@example Double(val)*/
  Double(val: DOtherable): DNumericField;
  /**@example Enum(val)*/
  Enum(val: DOtherable): DOtherField;
  /**@example Float(val)*/
  Float(val: DOtherable): DNumericField;
  /**@example Hugeint(val)*/
  Hugeint(val: DOtherable): DNumericField;
  /**@example Integer(val)*/
  Integer(val: DOtherable): DNumericField;
  /**@example Interval(val)*/
  Interval(val: DOtherable): DOtherField;
  /**@example List(val)*/
  List(val: DOtherable): DArrayField;
  /**@example Map(val)*/
  Map(val: DOtherable): DMapField;
  /**@example Null(val)*/
  Null(val: DOtherable): DOtherField;
  /**@example Smallint(val)*/
  Smallint(val: DOtherable): DNumericField;
  /**@example Struct(val)*/
  Struct(val: DOtherable): DStructField;
  /**@example Time(val)*/
  Time(val: DOtherable): DDateField;
  /**@example Timestamp(val)*/
  Timestamp(val: DOtherable): DDateField;
  /**@example Timestamp_ms(val)*/
  Timestamp_ms(val: DOtherable): DDateField;
  /**@example Timestamp_ns(val)*/
  Timestamp_ns(val: DOtherable): DDateField;
  /**@example Timestamp_s(val)*/
  Timestamp_s(val: DOtherable): DDateField;
  /**@example Tinyint(val)*/
  Tinyint(val: DOtherable): DNumericField;
  /**@example Ubigint(val)*/
  Ubigint(val: DOtherable): DNumericField;
  /**@example Uhugeint(val)*/
  Uhugeint(val: DOtherable): DNumericField;
  /**@example Uinteger(val)*/
  Uinteger(val: DOtherable): DNumericField;
  /**@example Union(val)*/
  Union(val: DOtherable): DOtherField;
  /**@example Usmallint(val)*/
  Usmallint(val: DOtherable): DNumericField;
  /**@example Utinyint(val)*/
  Utinyint(val: DOtherable): DNumericField;
  /**@example Uuid(val)*/
  Uuid(val: DOtherable): DOtherField;
  /**@example Varchar(val)*/
  Varchar(val: DOtherable): DVarcharField;
  /**@example Varint(val)*/
  Varint(val: DOtherable): DOtherField;
  /**@example Array(val)*/
  Array(val: DOtherable): DArrayField;
  /**@example Json(val)*/
  Json(val: DOtherable): DJsonField;
  /**@example Like(val, matcher)*/
  Like(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example Ilike(val, matcher)*/
  Ilike(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example SimilarTo(val, matcher)*/
  SimilarTo(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example Glob(val, matcher)*/
  Glob(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example IsNull(val)*/
  IsNull(val: DAnyable): DBoolField;
  /**@example Between(val, col1, col2)*/
  Between(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example In(val, matcher)*/
  In(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example NotBetween(val, col1, col2)*/
  NotBetween(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
}
export type DGlobalField = _DGlobalField;
interface _DAggregateField {
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DNumericable): DNumericField;
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DAnyable): DAnyField;
  /**@description Computes the approximate count of distinct elements using HyperLogLog.	@example approx_count_distinct(A)*/
  approx_count_distinct(any: DAnyable): DNumericField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DDateable | DNumericable, pos: DArrayable): DArrayField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DNumericable, pos: DNumericable): DNumericField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DDateable, pos: DNumericable): DDateField;
  /**@description Finds the k approximately most occurring values in the data set	@example approx_top_k(x, 5)*/
  approx_top_k(val: DAnyable, k: DNumericable): DArrayField;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DNumericable): DNumericField;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DAnyable): DAnyField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DBlobField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DBlobField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DVarcharField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
}
export type DAggregateField = _DAggregateField;
interface _DTableField {
}
export type DTableField = _DTableField;
interface CAny {
  as(destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  as(destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): Partial<CAny>;
  as(destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  as(destype: DNUMERIC_NATIVE, ...args: DAnyable[]): number & CNumeric;
  as(destype: DSTRING_NATIVE, ...args: DAnyable[]): string & CVarchar;
  as(destype: DANY_NATIVE, ...args: DAnyable[]): Partial<CAny>;

  [sInferred]: any;
  /**@description Returns the name of a given expression	@example alias(42 + 1)*/
  alias(): string & CVarchar;
  /**@example IsNull(val)*/
  IsNull(): DBoolField;
}

export type DAnyComp = Partial<CAny>;

interface CVarchar extends CAny {
  [sInferred]: string;
  /**@example Like(val, matcher)*/
  Like(matcher: DAnyable): DBoolField;
  /**@example Ilike(val, matcher)*/
  Ilike(matcher: DAnyable): DBoolField;
  /**@example SimilarTo(val, matcher)*/
  SimilarTo(matcher: DAnyable): DBoolField;
  /**@example Glob(val, matcher)*/
  Glob(matcher: DAnyable): DBoolField;
  /**@example In(val, matcher)*/
  In(matcher: DAnyable): DBoolField;
}

export type DVarcharComp = string & CVarchar;

interface CNumeric extends CAny {
  [sInferred]: number;
  /**@description Absolute value	@example abs(-17.4)*/
  abs(): number & CNumeric;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(): number & CNumeric;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(): number & CNumeric;
  add(col1?: DNumericable | DOtherable): number & CNumeric;
  add(col1: DDateable): DDateField;
  /**@example Between(val, col1, col2)*/
  Between(col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example NotBetween(val, col1, col2)*/
  NotBetween(col1: DNumericable, col2: DNumericable): DBoolField;
}

export type DNumericComp = number & CNumeric;

interface CGlobal {
  cast(val: DBoolable, destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  cast(val: DAnyable, destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): Partial<CAny>;
  cast(val: DDateable, destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  cast(val: DNumericable, destype: DNUMERIC_NATIVE, ...args: DAnyable[]): number & CNumeric;
  cast(val: DVarcharable, destype: DSTRING_NATIVE, ...args: DAnyable[]): string & CVarchar;
  cast(val: DAnyable, destype: DANY_NATIVE, ...args: DAnyable[]): Partial<CAny>;

  /**@description Absolute value	@example abs(-17.4)*/
  abs(x: DNumericable): number & CNumeric;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(x: DNumericable): number & CNumeric;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(x: DNumericable): number & CNumeric;
  add(col0: DOtherable, col1: DDateable): DDateField;
  add(col0: DNumericable, col1?: DNumericable | DOtherable): number & CNumeric;
  add(col0: DNumericable, col1: DDateable): DDateField;
  add(col0: DOtherable, col1: DOtherable): DOtherField;
  add(col0: DDateable, col1: DDateable | DNumericable | DOtherable): DDateField;
  add(col0: DArrayable, col1: DArrayable): DArrayField;
  add(col0: DDateable, col1: DDateable | DOtherable): DDateField;
  add(col0: DDateable, col1: DOtherable): DDateField;
  /**@description Subtract arguments, resulting in the time difference between the two timestamps	@example age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')*/
  age(timestamp: DDateable, timestamp__01?: DDateable | DOtherable): DOtherField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns the name of a given expression	@example alias(42 + 1)*/
  alias(expr: DAnyable): string & CVarchar;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  apply(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@example count()*/
  count(): number & CNumeric;
  /**@example Bigint(val)*/
  Bigint(val: DOtherable): number & CNumeric;
  /**@example Bit(val)*/
  Bit(val: DOtherable): DOtherField;
  /**@example Blob(val)*/
  Blob(val: DOtherable): DBlobField;
  /**@example Boolean(val)*/
  Boolean(val: DOtherable): DBoolField;
  /**@example Date(val)*/
  Date(val: DOtherable): DDateField;
  /**@example Decimal(val)*/
  Decimal(val: DOtherable): number & CNumeric;
  /**@example Double(val)*/
  Double(val: DOtherable): number & CNumeric;
  /**@example Enum(val)*/
  Enum(val: DOtherable): DOtherField;
  /**@example Float(val)*/
  Float(val: DOtherable): number & CNumeric;
  /**@example Hugeint(val)*/
  Hugeint(val: DOtherable): number & CNumeric;
  /**@example Integer(val)*/
  Integer(val: DOtherable): number & CNumeric;
  /**@example Interval(val)*/
  Interval(val: DOtherable): DOtherField;
  /**@example List(val)*/
  List(val: DOtherable): DArrayField;
  /**@example Map(val)*/
  Map(val: DOtherable): DMapField;
  /**@example Null(val)*/
  Null(val: DOtherable): DOtherField;
  /**@example Smallint(val)*/
  Smallint(val: DOtherable): number & CNumeric;
  /**@example Struct(val)*/
  Struct(val: DOtherable): DStructField;
  /**@example Time(val)*/
  Time(val: DOtherable): DDateField;
  /**@example Timestamp(val)*/
  Timestamp(val: DOtherable): DDateField;
  /**@example Timestamp_ms(val)*/
  Timestamp_ms(val: DOtherable): DDateField;
  /**@example Timestamp_ns(val)*/
  Timestamp_ns(val: DOtherable): DDateField;
  /**@example Timestamp_s(val)*/
  Timestamp_s(val: DOtherable): DDateField;
  /**@example Tinyint(val)*/
  Tinyint(val: DOtherable): number & CNumeric;
  /**@example Ubigint(val)*/
  Ubigint(val: DOtherable): number & CNumeric;
  /**@example Uhugeint(val)*/
  Uhugeint(val: DOtherable): number & CNumeric;
  /**@example Uinteger(val)*/
  Uinteger(val: DOtherable): number & CNumeric;
  /**@example Union(val)*/
  Union(val: DOtherable): DOtherField;
  /**@example Usmallint(val)*/
  Usmallint(val: DOtherable): number & CNumeric;
  /**@example Utinyint(val)*/
  Utinyint(val: DOtherable): number & CNumeric;
  /**@example Uuid(val)*/
  Uuid(val: DOtherable): DOtherField;
  /**@example Varchar(val)*/
  Varchar(val: DOtherable): string & CVarchar;
  /**@example Varint(val)*/
  Varint(val: DOtherable): DOtherField;
  /**@example Array(val)*/
  Array(val: DOtherable): DArrayField;
  /**@example Json(val)*/
  Json(val: DOtherable): DJsonField;
  /**@example Like(val, matcher)*/
  Like(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example Ilike(val, matcher)*/
  Ilike(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example SimilarTo(val, matcher)*/
  SimilarTo(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example Glob(val, matcher)*/
  Glob(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example IsNull(val)*/
  IsNull(val: DAnyable): DBoolField;
  /**@example Between(val, col1, col2)*/
  Between(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example In(val, matcher)*/
  In(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example NotBetween(val, col1, col2)*/
  NotBetween(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
}

export type DGlobalComp = CGlobal;

interface CAggregate {
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DNumericable): number & CNumeric;
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DAnyable): Partial<CAny>;
  /**@description Computes the approximate count of distinct elements using HyperLogLog.	@example approx_count_distinct(A)*/
  approx_count_distinct(any: DAnyable): number & CNumeric;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DDateable | DNumericable, pos: DArrayable): DArrayField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DNumericable, pos: DNumericable): number & CNumeric;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DDateable, pos: DNumericable): DDateField;
  /**@description Finds the k approximately most occurring values in the data set	@example approx_top_k(x, 5)*/
  approx_top_k(val: DAnyable, k: DNumericable): DArrayField;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DNumericable): number & CNumeric;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DAnyable): Partial<CAny>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DBlobField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DBlobField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): string & CVarchar;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
}

export type DAggregateComp = CAggregate;

export interface DSettings {
  /**@description Access mode of the database (AUTOMATIC, READ_ONLY or READ_WRITE)*/
  access_mode: string;
  /**@description Whether to enable the allocator background thread.*/
  allocator_background_threads: boolean;
  /**@description If a bulk deallocation larger than this occurs, flush outstanding allocations.*/
  allocator_bulk_deallocation_flush_threshold: string;
  /**@description Peak allocation threshold at which to flush the allocator after completing a task.*/
  allocator_flush_threshold: string;
  /**@description Allow to load community built extensions*/
  allow_community_extensions: boolean;
  /**@description Allow to load extensions with not compatible metadata*/
  allow_extensions_metadata_mismatch: boolean;
  /**@description Allow the creation of persistent secrets, that are stored and loaded on restarts*/
  allow_persistent_secrets: boolean;
  /**@description Allow printing unredacted secrets*/
  allow_unredacted_secrets: boolean;
  /**@description Allow to load extensions with invalid or missing signatures*/
  allow_unsigned_extensions: boolean;
  /**@description List of directories/prefixes that are ALWAYS allowed to be queried - even when enable_external_access is false*/
  allowed_directories: any[];
  /**@description List of files that are ALWAYS allowed to be queried - even when enable_external_access is false*/
  allowed_paths: any[];
  /**@description Whether Arrow buffers for strings, blobs, uuids and bits should be exported using large buffers*/
  arrow_large_buffer_size: boolean;
  /**@description Whenever a DuckDB type does not have a clear native or canonical extension match in Arrow, export the types with a duckdb.type_name extension name.*/
  arrow_lossless_conversion: boolean;
  /**@description Whether export to Arrow format should use ListView as the physical layout for LIST columns*/
  arrow_output_list_view: boolean;
  /**@description Overrides the custom endpoint for extension installation on autoloading*/
  autoinstall_extension_repository: string;
  /**@description Whether known extensions are allowed to be automatically installed when a query depends on them*/
  autoinstall_known_extensions: boolean;
  /**@description Whether known extensions are allowed to be automatically loaded when a query depends on them*/
  autoload_known_extensions: boolean;
  /**@description The maximum number of schemas the system will scan for "did you mean..." style errors in the catalog*/
  catalog_error_max_schemas: number;
  /**@description The WAL size threshold at which to automatically trigger a checkpoint (e.g. 1GB)*/
  checkpoint_threshold: string;
  /**@description The WAL size threshold at which to automatically trigger a checkpoint (e.g. 1GB)*/
  wal_autocheckpoint: string;
  /**@description Overrides the custom endpoint for remote extension installation*/
  custom_extension_repository: string;
  /**@description Accepts a JSON enabling custom metrics*/
  custom_profiling_settings: string;
  /**@description Metadata from DuckDB callers*/
  custom_user_agent: string;
  /**@description DEBUG SETTING: force use of IEJoin to implement AsOf joins*/
  debug_asof_iejoin: boolean;
  /**@description DEBUG SETTING: trigger an abort while checkpointing for testing purposes*/
  debug_checkpoint_abort: string;
  /**@description DEBUG SETTING: force out-of-core computation for operators that support it, used for testing*/
  debug_force_external: boolean;
  /**@description DEBUG SETTING: Force disable cross product generation when hyper graph isn't connected, used for testing*/
  debug_force_no_cross_product: boolean;
  /**@description DEBUG SETTING: skip checkpointing on commit*/
  debug_skip_checkpoint_on_commit: boolean;
  /**@description DEBUG SETTING: switch window mode to use*/
  debug_window_mode: string;
  /**@description The default block size for new duckdb database files (new as-in, they do not yet exist).*/
  default_block_size: number;
  /**@description The collation setting used when none is specified*/
  default_collation: string;
  /**@description NULL ordering used when none is specified (NULLS_FIRST or NULLS_LAST)*/
  default_null_order: string;
  /**@description NULL ordering used when none is specified (NULLS_FIRST or NULLS_LAST)*/
  null_order: string;
  /**@description The order type used when none is specified (ASC or DESC)*/
  default_order: string;
  /**@description Allows switching the default storage for secrets*/
  default_secret_storage: string;
  /**@description Disable a specific set of compression methods (comma separated)*/
  disabled_compression_methods: string;
  /**@description Disable specific file systems preventing access (e.g. LocalFileSystem)*/
  disabled_filesystems: string;
  /**@description Sets the list of disabled loggers*/
  disabled_log_types: string;
  /**@description DEBUG SETTING: disable a specific set of optimizers (comma separated)*/
  disabled_optimizers: string;
  /**@description DuckDB API surface*/
  duckdb_api: string;
  /**@description The maximum amount of OR filters we generate dynamically from a hash join*/
  dynamic_or_filter_threshold: number;
  /**@description Allow the database to access external state (through e.g. loading/installing modules, COPY TO/FROM, CSV readers, pandas replacement scans, etc)*/
  enable_external_access: boolean;
  /**@description Allow scans on FSST compressed segments to emit compressed vectors to utilize late decompression*/
  enable_fsst_vectors: boolean;
  /**@description Enables HTTP logging*/
  enable_http_logging: boolean;
  /**@description Whether or not the global http metadata is used to cache HTTP metadata*/
  enable_http_metadata_cache: boolean;
  /**@description Enables the logger*/
  enable_logging: boolean;
  /**@description Enable created MACROs to create dependencies on the referenced objects (such as tables)*/
  enable_macro_dependencies: boolean;
  /**@description [PLACEHOLDER] Legacy setting - does nothing*/
  enable_object_cache: boolean;
  /**@description Enables profiling, and sets the output format (JSON, QUERY_TREE, QUERY_TREE_OPTIMIZER)*/
  enable_profiling: string;
  /**@description Enables the progress bar, printing progress to the terminal for long queries*/
  enable_progress_bar: boolean;
  /**@description Controls the printing of the progress bar, when 'enable_progress_bar' is true*/
  enable_progress_bar_print: boolean;
  /**@description Enable created VIEWs to create dependencies on the referenced objects (such as tables)*/
  enable_view_dependencies: boolean;
  /**@description Sets the list of enabled loggers*/
  enabled_log_types: string;
  /**@description Output error messages as structured JSON instead of as a raw string*/
  errors_as_json: boolean;
  /**@description Output of EXPLAIN statements (ALL, OPTIMIZED_ONLY, PHYSICAL_ONLY)*/
  explain_output: string;
  /**@description Set the directory to store extensions in*/
  extension_directory: string;
  /**@description The number of external threads that work on DuckDB tasks.*/
  external_threads: number;
  /**@description A comma separated list of directories to search for input files*/
  file_search_path: string;
  /**@description DEBUG SETTING: forces a specific bitpacking mode*/
  force_bitpacking_mode: string;
  /**@description DEBUG SETTING: forces a specific compression method to be used*/
  force_compression: string;
  /**@description Sets the home directory used by the system*/
  home_directory: string;
  /**@description The file to which HTTP logging output should be saved, or empty to print to the terminal*/
  http_logging_output: string;
  /**@description HTTP proxy host*/
  http_proxy: string;
  /**@description Password for HTTP proxy*/
  http_proxy_password: string;
  /**@description Username for HTTP proxy*/
  http_proxy_username: string;
  /**@description Use IEE754-compliant floating point operations (returning NAN instead of errors/NULL).*/
  ieee_floating_point_ops: boolean;
  /**@description Whether transactions should be started lazily when needed, or immediately when BEGIN TRANSACTION is called*/
  immediate_transaction_mode: boolean;
  /**@description The maximum index scan count sets a threshold for index scans. If fewer than MAX(index_scan_max_count, index_scan_percentage * total_row_count) rows match, we perform an index scan instead of a table scan.*/
  index_scan_max_count: number;
  /**@description The index scan percentage sets a threshold for index scans. If fewer than MAX(index_scan_max_count, index_scan_percentage * total_row_count) rows match, we perform an index scan instead of a table scan.*/
  index_scan_percentage: number;
  /**@description Whether or not the / operator defaults to integer division, or to floating point division*/
  integer_division: boolean;
  /**@description The maximum amount of rows in the LIMIT/SAMPLE for which we trigger late materialization*/
  late_materialization_max_rows: number;
  /**@description Whether or not the configuration can be altered*/
  lock_configuration: boolean;
  /**@description Specifies the path to which queries should be logged (default: NULL, queries are not logged)*/
  log_query_path: string;
  /**@description The log level which will be recorded in the log*/
  logging_level: string;
  /**@description Enables the logger*/
  logging_mode: string;
  /**@description Set the logging storage (memory/stdout/file)*/
  logging_storage: string;
  /**@description The maximum expression depth limit in the parser. WARNING: increasing this setting and using very deep expressions might lead to stack overflow errors.*/
  max_expression_depth: number;
  /**@description The maximum memory of the system (e.g. 1GB)*/
  max_memory: string;
  /**@description The maximum memory of the system (e.g. 1GB)*/
  memory_limit: string;
  /**@description The maximum amount of data stored inside the 'temp_directory' (when set) (e.g. 1GB)*/
  max_temp_directory_size: string;
  /**@description The maximum vacuum tasks to schedule during a checkpoint.*/
  max_vacuum_tasks: number;
  /**@description The number of rows we need on either table to choose a merge join*/
  merge_join_threshold: number;
  /**@description The number of rows we need on either table to choose a nested loop join*/
  nested_loop_join_threshold: number;
  /**@description Allow implicit casting to/from VARCHAR*/
  old_implicit_casting: boolean;
  /**@description Allow ordering by non-integer literals - ordering by such literals has no effect.*/
  order_by_non_integer_literal: boolean;
  /**@description The number of rows to accumulate before sorting, used for tuning*/
  ordered_aggregate_threshold: number;
  /**@description The threshold in number of rows after which we flush a thread state when writing using PARTITION_BY*/
  partitioned_write_flush_threshold: number;
  /**@description The maximum amount of files the system can keep open before flushing to disk when writing using PARTITION_BY*/
  partitioned_write_max_open_files: number;
  /**@description The password to use. Ignored for legacy compatibility.*/
  password: string;
  /**@description Threshold in bytes for when to use a perfect hash table*/
  perfect_ht_threshold: number;
  /**@description The threshold to switch from using filtered aggregates to LIST with a dedicated pivot operator*/
  pivot_filter_threshold: number;
  /**@description The maximum number of pivot columns in a pivot statement*/
  pivot_limit: number;
  /**@description Force use of range joins with mixed predicates*/
  prefer_range_joins: boolean;
  /**@description Whether or not to preserve the identifier case, instead of always lowercasing all non-quoted identifiers*/
  preserve_identifier_case: boolean;
  /**@description Whether or not to preserve insertion order. If set to false the system is allowed to re-order any results that do not contain ORDER BY clauses.*/
  preserve_insertion_order: boolean;
  /**@description Whether strings should be produced by DuckDB in Utf8View format instead of Utf8*/
  produce_arrow_string_view: boolean;
  /**@description The file to which profile output should be saved, or empty to print to the terminal*/
  profile_output: string;
  /**@description The file to which profile output should be saved, or empty to print to the terminal*/
  profiling_output: string;
  /**@description The profiling mode (STANDARD or DETAILED)*/
  profiling_mode: string;
  /**@description Sets the time (in milliseconds) how long a query needs to take before we start printing a progress bar*/
  progress_bar_time: number;
  /**@description When a scalar subquery returns multiple rows - return a random row instead of returning an error.*/
  scalar_subquery_error_on_multiple_rows: boolean;
  /**@description Sets the default search schema. Equivalent to setting search_path to a single value.*/
  schema: string;
  /**@description Sets the default catalog search path as a comma-separated list of values*/
  search_path: string;
  /**@description Set the directory to which persistent secrets are stored*/
  secret_directory: string;
  /**@description Serialize on checkpoint with compatibility for a given duckdb version*/
  storage_compatibility_version: string;
  /**@description The maximum memory to buffer between fetching from a streaming result (e.g. 1GB)*/
  streaming_buffer_size: string;
  /**@description Set the directory to which to write temp files*/
  temp_directory: string;
  /**@description The number of total threads used by the system.*/
  threads: number;
  /**@description The number of total threads used by the system.*/
  worker_threads: number;
  /**@description The username to use. Ignored for legacy compatibility.*/
  username: string;
  /**@description The username to use. Ignored for legacy compatibility.*/
  user: string;
  /**@description The (average) length at which to enable ZSTD compression, defaults to 4096*/
  zstd_min_string_length: number;
  /**@description Period of time between UI polling requests (in ms)*/
  ui_polling_interval: number;
  /**@description Remote URL to which the UI server forwards GET requests*/
  ui_remote_url: string;
  /**@description S3 Access Key ID*/
  s3_access_key_id: string;
  /**@description Enable globbing the filesystem (if possible) to find the latest version metadata. This could result in reading an uncommitted version.*/
  unsafe_enable_version_guessing: boolean;
  /**@description Override the azure endpoint for when the Azure credential providers are used.*/
  azure_endpoint: string;
  /**@description Proxy to use when login & performing request to azure. By default it will use the HTTP_PROXY environment variable if set.*/
  azure_http_proxy: string;
  /**@description Disable Globs and Query Parameters on S3 URLs*/
  s3_url_compatibility_mode: boolean;
  /**@description Forces upfront download of file*/
  force_download: boolean;
  /**@description S3 use SSL*/
  s3_use_ssl: boolean;
  /**@description S3 Access Key*/
  s3_secret_access_key: string;
  /**@description Local port on which the UI server listens*/
  ui_local_port: number;
  /**@description Path to a custom certificate file for self-signed certificates.*/
  ca_cert_file: string;
  /**@description Enable server side certificate verification.*/
  enable_server_cert_verification: boolean;
  /**@description Cache Parquet metadata - useful when reading the same files multiple times*/
  parquet_metadata_cache: boolean;
  /**@description Time between retries*/
  http_retry_wait_ms: number;
  /**@description S3 Uploader max parts per file (between 1 and 10000)*/
  s3_uploader_max_parts_per_file: number;
  /**@description Load all SQLite columns as VARCHAR columns*/
  sqlite_all_varchar: boolean;
  /**@description Keep alive connections. Setting this to false can help when running into connection failures*/
  http_keep_alive: boolean;
  /**@description Backoff factor for exponentially increasing retry wait time*/
  http_retry_backoff: number;
  /**@description Http proxy password if needed.*/
  azure_proxy_password: string;
  /**@description HTTP retries on I/O error*/
  http_retries: number;
  /**@description HTTP timeout read/write/connection/retry (in seconds)*/
  http_timeout: number;
  /**@description DEBUG SETTING: print all queries sent to SQLite to stdout*/
  sqlite_debug_show_queries: boolean;
  /**@description S3 Endpoint*/
  s3_endpoint: string;
  /**@description Azure connection string, used for authenticating and configuring azure requests*/
  azure_storage_connection_string: string;
  /**@description Forwards the internal logging of the Delta Kernel to the duckdb logger. Warning: this may impact performance even with DuckDB logging disabled.*/
  delta_kernel_logging: boolean;
  /**@description S3 URL style*/
  s3_url_style: string;
  /**@description The current time zone*/
  TimeZone: string;
  /**@description Use the prefetching mechanism for all types of parquet files*/
  prefetch_all_parquet_files: boolean;
  /**@description Include http info from the Azure Storage in the explain analyze statement.*/
  azure_http_stats: boolean;
  /**@description S3 Region*/
  s3_region: string;
  /**@description Http proxy user name if needed.*/
  azure_proxy_user_name: string;
  /**@description Size of the read buffer.  It is recommended that this is evenly divisible by azure_read_transfer_chunk_size.*/
  azure_read_buffer_size: number;
  /**@description Maximum size in bytes that the Azure client will read in a single request. It is recommended that this is a factor of azure_read_buffer_size.*/
  azure_read_transfer_chunk_size: number;
  /**@description Debug option to limit number of items returned in list requests*/
  hf_max_per_page: number;
  /**@description Maximum number of threads the Azure client can use for a single parallel read. If azure_read_transfer_chunk_size is less than azure_read_buffer_size then setting this > 1 will allow the Azure client to do concurrent requests to fill the buffer.*/
  azure_read_transfer_concurrency: number;
  /**@description S3 Uploader global thread limit*/
  s3_uploader_thread_limit: number;
  /**@description S3 Uploader max filesize (between 50GB and 5TB)*/
  s3_uploader_max_filesize: string;
  /**@description Ordered list of Azure credential providers, in string format separated by ';'. E.g. 'cli;workload_identity;managed_identity;env'*/
  azure_credential_chain: string;
  /**@description Enable/disable the caching of some context when performing queries. This cache is by default enable, and will for a given connection keep a local context when performing a query. If you suspect that the caching is causing some side effect you can try to disable it by setting this option to false.*/
  azure_context_caching: boolean;
  /**@description Disable the prefetching mechanism in Parquet*/
  disable_parquet_prefetching: boolean;
  /**@description S3 Session Token*/
  s3_session_token: string;
  /**@description Attempt to decode/encode geometry data in/as GeoParquet files if the spatial extension is present.*/
  enable_geoparquet_conversion: boolean;
  /**@description Azure account name, when set, the extension will attempt to automatically detect credentials*/
  azure_account_name: string;
  /**@description Adds the filtered files to the explain output. Warning: this may impact performance of delta scan during explain analyze queries.*/
  delta_scan_explain_files_filtered: boolean;
  /**@description The current calendar*/
  Calendar: string;
  /**@description Underlying adapter to use with the Azure SDK. Read more about the adapter at https://github.com/Azure/azure-sdk-for-cpp/blob/main/doc/HttpTransportAdapter.md. Valid values are: default, curl*/
  azure_transport_option_type: string;
  /**@description In Parquet files, interpret binary data as a string.*/
  binary_as_string: boolean;
}
export const DExtensions = [
  {
    "extension_name": "arrow",
    "description": "A zero-copy data integration between Apache Arrow and DuckDB",
    "installed_from": "core",
  },
  {
    "extension_name": "autocomplete",
    "description": "Adds support for autocomplete in the shell",
    "installed_from": "",
  },
  {
    "extension_name": "aws",
    "description": "Provides features that depend on the AWS SDK",
    "installed_from": "core",
  },
  {
    "extension_name": "azure",
    "description": "Adds a filesystem abstraction for Azure blob storage to DuckDB",
    "installed_from": "core",
  },
  {
    "extension_name": "core_functions",
    "description": "Core function library",
    "installed_from": "",
  },
  {
    "extension_name": "delta",
    "description": "Adds support for Delta Lake",
    "installed_from": "core",
  },
  {
    "extension_name": "excel",
    "description": "Adds support for Excel-like format strings",
    "installed_from": "core",
  },
  {
    "extension_name": "fts",
    "description": "Adds support for Full-Text Search Indexes",
    "installed_from": "core",
  },
  {
    "extension_name": "h3",
    "description": "",
    "installed_from": "community",
  },
  {
    "extension_name": "httpfs",
    "description": "Adds support for reading and writing files over a HTTP(S) connection",
    "installed_from": "core",
  },
  {
    "extension_name": "iceberg",
    "description": "Adds support for Apache Iceberg",
    "installed_from": "core",
  },
  {
    "extension_name": "icu",
    "description": "Adds support for time zones and collations using the ICU library",
    "installed_from": "",
  },
  {
    "extension_name": "inet",
    "description": "Adds support for IP-related data types and functions",
    "installed_from": "core",
  },
  {
    "extension_name": "jemalloc",
    "description": "Overwrites system allocator with JEMalloc",
    "installed_from": "",
  },
  {
    "extension_name": "json",
    "description": "Adds support for JSON operations",
    "installed_from": "",
  },
  {
    "extension_name": "motherduck",
    "description": "Enables motherduck integration with the system",
    "installed_from": "",
  },
  {
    "extension_name": "mysql_scanner",
    "description": "Adds support for connecting to a MySQL database",
    "installed_from": "",
  },
  {
    "extension_name": "parquet",
    "description": "Adds support for reading and writing parquet files",
    "installed_from": "",
  },
  {
    "extension_name": "postgres_scanner",
    "description": "Adds support for connecting to a Postgres database",
    "installed_from": "",
  },
  {
    "extension_name": "spatial",
    "description": "Geospatial extension that adds support for working with spatial data and functions",
    "installed_from": "core",
  },
  {
    "extension_name": "sqlite_scanner",
    "description": "Adds support for reading and writing SQLite database files",
    "installed_from": "core",
  },
  {
    "extension_name": "tpcds",
    "description": "Adds TPC-DS data generation and query support",
    "installed_from": "",
  },
  {
    "extension_name": "tpch",
    "description": "Adds TPC-H data generation and query support",
    "installed_from": "",
  },
  {
    "extension_name": "ui",
    "description": "Adds local UI for DuckDB",
    "installed_from": "core",
  },
  {
    "extension_name": "vss",
    "description": "Adds indexing support to accelerate Vector Similarity Search",
    "installed_from": "",
  },
] as const;
