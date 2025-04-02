export type DNumericable = number | DNumericField;
export type DVarcharable = string | DVarcharField;
export type DArrayable = any[] | DArrayField;
export type DStructable = Record<string, any> | DStructField;
export type DJsonable = Record<string, any> | DJsonField;
export type DBoolable = boolean | DBoolField;
export type DMapable = Map<string, any> | DMapField;
export type DOtherable = any | DOtherField;
export type DAnyable = any | DAnyField;
export type RegExpable = RegExp | string;
export declare const sId: unique symbol;
export declare const sAnti: unique symbol;
export declare const sInferred: unique symbol;
export interface IAny {
  alias(): DVarcharField;
  array_slice(begin: DAnyable, end: DAnyable): DAnyField;
  array_slice(begin: DAnyable, end: DAnyable, step: DNumericable): DAnyField;
  can_cast_implicitly(targetType: DAnyable): DBoolField;
  cardinality(...args: DAnyable): DNumericField;
  concat(...args: DAnyable): DVarcharField;
  constant_or_null(arg2: DAnyable, ...args: DAnyable): DAnyField;
  create_sort_key(...args: DAnyable): DOtherField;
  element_at(key: DAnyable, ...args: DAnyable): DAnyField;
  enum_code(): DAnyField;
  enum_first(): DVarcharField;
  enum_last(): DVarcharField;
  enum_range(): DArrayField;
  enum_range_boundary(end: DAnyable): DArrayField;
  equi_width_bins(max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  greatest(...args: DAnyable): DAnyField;
  hash(...args: DAnyable): DNumericField;
  is_histogram_other_bin(): DBoolField;
  least(...args: DAnyable): DAnyField;
  list_slice(begin: DAnyable, end: DAnyable, step: DNumericable): DAnyField;
  list_slice(begin: DAnyable, end: DAnyable): DAnyField;
  map_extract(key: DAnyable, ...args: DAnyable): DAnyField;
  map_extract_value(key: DAnyable, ...args: DAnyable): DAnyField;
  stats(): DVarcharField;
  typeof(): DVarcharField;
  vector_type(): DVarcharField;
}
export type DAnyField = IAny & {
  [sId]: "any";
  [sInferred]: any;
  [sAnti]: {};
};

export interface IArray extends IAny {
  add(col1: DArrayable): DArrayField;
  aggregate(name: DVarcharable, ...args: DAnyable): DAnyField;
  apply(lambda: DOtherable): DArrayField;
  array_aggr(name: DVarcharable, ...args: DAnyable): DAnyField;
  array_aggregate(name: DVarcharable, ...args: DAnyable): DAnyField;
  array_apply(lambda: DOtherable): DArrayField;
  array_cat(list2: DArrayable): DArrayField;
  array_concat(list2: DArrayable): DArrayField;
  array_contains(element: DAnyable): DBoolField;
  array_distinct(): DArrayField;
  array_extract(index: DNumericable): DAnyField;
  array_filter(lambda: DOtherable): DArrayField;
  array_grade_up(): DArrayField;
  array_grade_up(col1: DVarcharable): DArrayField;
  array_grade_up(col1: DVarcharable, col2: DVarcharable): DArrayField;
  array_has(element: DAnyable): DBoolField;
  array_has_all(l2: DArrayable): DBoolField;
  array_has_any(l2: DArrayable): DBoolField;
  array_indexof(element: DAnyable): DNumericField;
  array_length(): DNumericField;
  array_length(col1: DNumericable): DNumericField;
  array_position(element: DAnyable): DNumericField;
  array_reduce(lambda: DOtherable): DAnyField;
  array_resize(size: DAnyable): DArrayField;
  array_resize(size: DAnyable, value: DAnyable): DArrayField;
  array_reverse_sort(): DArrayField;
  array_reverse_sort(col1: DVarcharable): DArrayField;
  array_select(indexList: DNumericable): DArrayField;
  array_sort(): DArrayField;
  array_sort(col1: DVarcharable): DArrayField;
  array_sort(col1: DVarcharable, col2: DVarcharable): DArrayField;
  array_transform(lambda: DOtherable): DArrayField;
  array_unique(): DNumericField;
  array_where(maskList: DArrayable): DArrayField;
  contains(element: DAnyable): DBoolField;
  date_part(col1: DOtherable): DStructField;
  datepart(col1: DOtherable): DStructField;
  filter(lambda: DOtherable): DArrayField;
  flatten(): DArrayField;
  grade_up(col1: DVarcharable, col2: DVarcharable): DArrayField;
  grade_up(col1: DVarcharable): DArrayField;
  grade_up(): DArrayField;
  len(): DNumericField;
  length(): DNumericField;
  list_aggr(name: DVarcharable, ...args: DAnyable): DAnyField;
  list_aggregate(name: DVarcharable, ...args: DAnyable): DAnyField;
  list_apply(lambda: DOtherable): DArrayField;
  list_cat(list2: DArrayable): DArrayField;
  list_concat(list2: DArrayable): DArrayField;
  list_contains(element: DAnyable): DBoolField;
  list_distinct(): DArrayField;
  list_element(index: DNumericable): DAnyField;
  list_extract(index: DNumericable): DAnyField;
  list_filter(lambda: DOtherable): DArrayField;
  list_grade_up(col1: DVarcharable, col2: DVarcharable): DArrayField;
  list_grade_up(col1: DVarcharable): DArrayField;
  list_grade_up(): DArrayField;
  list_has(element: DAnyable): DBoolField;
  list_has_all(l2: DArrayable): DBoolField;
  list_has_any(l2: DArrayable): DBoolField;
  list_indexof(element: DAnyable): DNumericField;
  list_position(element: DAnyable): DNumericField;
  list_reduce(lambda: DOtherable): DAnyField;
  list_resize(size: DAnyable): DArrayField;
  list_resize(size: DAnyable, value: DAnyable): DArrayField;
  list_reverse_sort(): DArrayField;
  list_reverse_sort(col1: DVarcharable): DArrayField;
  list_select(indexList: DNumericable): DArrayField;
  list_sort(col1: DVarcharable, col2: DVarcharable): DArrayField;
  list_sort(col1: DVarcharable): DArrayField;
  list_sort(): DArrayField;
  list_transform(lambda: DOtherable): DArrayField;
  list_unique(): DNumericField;
  list_where(maskList: DArrayable): DArrayField;
  reduce(lambda: DOtherable): DAnyField;
  repeat(count: DNumericable): DArrayField;
}
export type DArrayField = IArray & {
  [sId]: "array";
  [sInferred]: any[];
  [sAnti]: Array;
};

type Array = {
  at: never;
  concat: never;
  constructor: never;
  copyWithin: never;
  entries: never;
  every: never;
  fill: never;
  filter: never;
  find: never;
  findIndex: never;
  findLast: never;
  findLastIndex: never;
  flat: never;
  flatMap: never;
  forEach: never;
  includes: never;
  indexOf: never;
  join: never;
  keys: never;
  lastIndexOf: never;
  length: never;
  map: never;
  pop: never;
  push: never;
  reduce: never;
  reduceRight: never;
  reverse: never;
  shift: never;
  slice: never;
  some: never;
  sort: never;
  splice: never;
  toLocaleString: never;
  toReversed: never;
  toSorted: never;
  toSpliced: never;
  toString: never;
  unshift: never;
  values: never;
  with: never;
};
export interface IBool extends IAny {
}
export type DBoolField = IBool & {
  [sId]: "bool";
  [sInferred]: boolean;
  [sAnti]: AntiBoolean;
};

type AntiBoolean = {
  constructor: never;
  toString: never;
  valueOf: never;
};
export interface IJson extends IAny {
  from_json(col1: DVarcharable): DAnyField;
  from_json_strict(col1: DVarcharable): DAnyField;
  json_array_length(col1: DArrayable): DNumericField;
  json_array_length(col1: DVarcharable): DNumericField;
  json_array_length(): DNumericField;
  json_contains(col1: DJsonable): DBoolField;
  json_contains(col1: DVarcharable): DBoolField;
  json_deserialize_sql(): DVarcharField;
  json_exists(col1: DVarcharable): DBoolField;
  json_exists(col1: DArrayable): DArrayField;
  json_extract(col1: DArrayable): DArrayField;
  json_extract(col1: DNumericable): DJsonField;
  json_extract(col1: DVarcharable): DJsonField;
  json_extract_path(col1: DNumericable): DJsonField;
  json_extract_path(col1: DArrayable): DArrayField;
  json_extract_path(col1: DVarcharable): DJsonField;
  json_extract_path_text(col1: DNumericable): DVarcharField;
  json_extract_path_text(col1: DVarcharable): DVarcharField;
  json_extract_path_text(col1: DArrayable): DArrayField;
  json_extract_string(col1: DNumericable): DVarcharField;
  json_extract_string(col1: DArrayable): DArrayField;
  json_extract_string(col1: DVarcharable): DVarcharField;
  json_keys(): DArrayField;
  json_keys(col1: DVarcharable): DArrayField;
  json_keys(col1: DArrayable): DArrayField;
  json_pretty(): DVarcharField;
  json_structure(): DJsonField;
  json_transform(col1: DVarcharable): DAnyField;
  json_transform_strict(col1: DVarcharable): DAnyField;
  json_type(col1: DArrayable): DArrayField;
  json_type(col1: DVarcharable): DVarcharField;
  json_type(): DVarcharField;
  json_valid(): DBoolField;
  json_value(col1: DNumericable): DVarcharField;
  json_value(col1: DArrayable): DArrayField;
  json_value(col1: DVarcharable): DVarcharField;
}
export type DJsonField = IJson & {
  [sId]: "json";
  [sInferred]: Record<string, any>;
  [sAnti]: AntiObject;
};

type AntiObject = {
  __defineGetter__: never;
  __defineSetter__: never;
  __lookupGetter__: never;
  __lookupSetter__: never;
  __proto__: never;
  constructor: never;
  hasOwnProperty: never;
  isPrototypeOf: never;
  propertyIsEnumerable: never;
  toLocaleString: never;
  toString: never;
  valueOf: never;
};
export interface IMap extends IAny {
  contains(key: DAnyable): DBoolField;
  map_contains(key: DAnyable): DBoolField;
}
export type DMapField = IMap & {
  [sId]: "map";
  [sInferred]: Map<string, any>;
  [sAnti]: AntiMap;
};

type AntiMap = {
  clear: never;
  constructor: never;
  delete: never;
  entries: never;
  forEach: never;
  get: never;
  has: never;
  keys: never;
  set: never;
  size: never;
  values: never;
};
export interface INumeric extends IAny {
  abs(): DNumericField;
  acos(): DNumericField;
  acosh(): DNumericField;
  add(col1: DNumericable): DNumericField;
  add(col1: DOtherable): DOtherField;
  add(): DNumericField;
  array_cosine_distance(arr2: DNumericable): DNumericField;
  array_cosine_similarity(arr2: DNumericable): DNumericField;
  array_cross_product(arr01: DNumericable): DNumericField;
  array_distance(arr2: DNumericable): DNumericField;
  array_dot_product(arr2: DNumericable): DNumericField;
  array_inner_product(arr2: DNumericable): DNumericField;
  array_negative_dot_product(arr2: DNumericable): DNumericField;
  array_negative_inner_product(arr2: DNumericable): DNumericField;
  asin(): DNumericField;
  asinh(): DNumericField;
  atan(): DNumericField;
  atan2(x: DNumericable): DNumericField;
  atanh(): DNumericField;
  bar(min: DNumericable, max: DNumericable): DVarcharField;
  bar(min: DNumericable, max: DNumericable, width: DNumericable): DVarcharField;
  bin(): DVarcharField;
  bit_count(): DNumericField;
  cbrt(): DNumericField;
  ceil(): DNumericField;
  ceiling(): DNumericField;
  chr(): DVarcharField;
  cos(): DNumericField;
  cosh(): DNumericField;
  cot(): DNumericField;
  degrees(): DNumericField;
  divide(col1: DNumericable): DNumericField;
  epoch_ms(): DOtherField;
  equi_width_bins(max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  even(): DNumericField;
  exp(): DNumericField;
  factorial(): DNumericField;
  floor(): DNumericField;
  formatReadableDecimalSize(): DVarcharField;
  formatReadableSize(): DVarcharField;
  format_bytes(): DVarcharField;
  gamma(): DNumericField;
  gcd(y: DNumericable): DNumericField;
  generate_series(): DNumericField;
  generate_series(stop: DNumericable): DNumericField;
  generate_series(stop: DNumericable, step: DNumericable): DNumericField;
  greatest_common_divisor(y: DNumericable): DNumericField;
  hex(): DVarcharField;
  isfinite(): DBoolField;
  isinf(): DBoolField;
  isnan(): DBoolField;
  lcm(y: DNumericable): DNumericField;
  least_common_multiple(y: DNumericable): DNumericField;
  lgamma(): DNumericField;
  list_cosine_distance(list2: DNumericable): DNumericField;
  list_cosine_similarity(list2: DNumericable): DNumericField;
  list_distance(list2: DNumericable): DNumericField;
  list_dot_product(list2: DNumericable): DNumericField;
  list_inner_product(list2: DNumericable): DNumericField;
  list_negative_dot_product(list2: DNumericable): DNumericField;
  list_negative_inner_product(list2: DNumericable): DNumericField;
  ln(): DNumericField;
  log(): DNumericField;
  log(x: DNumericable): DNumericField;
  log10(): DNumericField;
  log2(): DNumericField;
  make_date(): DOtherField;
  make_date(month: DNumericable, day: DNumericable): DOtherField;
  make_date(): DOtherField;
  make_time(minute: DNumericable, seconds: DNumericable): DOtherField;
  make_timestamp(): DOtherField;
  make_timestamp(
    month: DNumericable,
    day: DNumericable,
    hour: DNumericable,
    minute: DNumericable,
    seconds: DNumericable,
  ): DOtherField;
  make_timestamp_ns(): DOtherField;
  make_timestamptz(
    col1: DNumericable,
    col2: DNumericable,
    col3: DNumericable,
    col4: DNumericable,
    col5: DNumericable,
  ): DOtherField;
  make_timestamptz(): DOtherField;
  make_timestamptz(
    col1: DNumericable,
    col2: DNumericable,
    col3: DNumericable,
    col4: DNumericable,
    col5: DNumericable,
    col6: DVarcharable,
  ): DOtherField;
  mod(col1: DNumericable): DNumericField;
  multiply(col1: DNumericable): DNumericField;
  multiply(col1: DOtherable): DOtherField;
  nextafter(y: DNumericable): DNumericField;
  pow(y: DNumericable): DNumericField;
  power(y: DNumericable): DNumericField;
  radians(): DNumericField;
  range(stop: DNumericable): DNumericField;
  range(): DNumericField;
  range(stop: DNumericable, step: DNumericable): DNumericField;
  round(precision: DNumericable): DNumericField;
  round(): DNumericField;
  setseed(): DOtherField;
  sign(): DNumericField;
  signbit(): DBoolField;
  sin(): DNumericField;
  sinh(): DNumericField;
  sqrt(): DNumericField;
  subtract(col1: DNumericable): DNumericField;
  subtract(): DNumericField;
  tan(): DNumericField;
  tanh(): DNumericField;
  to_base(radix: DNumericable): DVarcharField;
  to_base(radix: DNumericable, minLength: DNumericable): DVarcharField;
  to_binary(): DVarcharField;
  to_centuries(): DOtherField;
  to_days(): DOtherField;
  to_decades(): DOtherField;
  to_hex(): DVarcharField;
  to_hours(): DOtherField;
  to_microseconds(): DOtherField;
  to_millennia(): DOtherField;
  to_milliseconds(): DOtherField;
  to_minutes(): DOtherField;
  to_months(): DOtherField;
  to_quarters(): DOtherField;
  to_seconds(): DOtherField;
  to_timestamp(): DOtherField;
  to_weeks(): DOtherField;
  to_years(): DOtherField;
  trunc(): DNumericField;
  xor(right: DNumericable): DNumericField;
}
export type DNumericField = INumeric & {
  [sId]: "numeric";
  [sInferred]: number;
  [sAnti]: AntiNumber;
};

type AntiNumber = {
  constructor: never;
  toExponential: never;
  toFixed: never;
  toLocaleString: never;
  toPrecision: never;
  toString: never;
  valueOf: never;
};
export interface IOther extends IAny {
  add(col1: DOtherable): DOtherField;
  add(col1: DNumericable): DOtherField;
  age(): DOtherField;
  age(timestamp01: DOtherable): DOtherField;
  array_to_json(): DJsonField;
  array_value(): DArrayField;
  array_zip(): DArrayField;
  base64(): DVarcharField;
  bin(): DVarcharField;
  bit_count(): DNumericField;
  bit_length(): DNumericField;
  bit_position(bitstring: DOtherable): DNumericField;
  bitstring(length: DNumericable): DOtherField;
  century(): DNumericField;
  combine(col1: DAnyable): DOtherField;
  current_database(): DVarcharField;
  current_date(): DOtherField;
  current_localtime(): DOtherField;
  current_localtimestamp(): DOtherField;
  current_query(): DVarcharField;
  current_schema(): DVarcharField;
  day(): DNumericField;
  dayname(): DVarcharField;
  dayofmonth(): DNumericField;
  dayofweek(): DNumericField;
  dayofyear(): DNumericField;
  decade(): DNumericField;
  decode(): DVarcharField;
  epoch(): DNumericField;
  epoch_ms(): DNumericField;
  epoch_ns(): DNumericField;
  epoch_us(): DNumericField;
  equi_width_bins(max: DOtherable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  era(): DNumericField;
  finalize(): DOtherField;
  gen_random_uuid(): DOtherField;
  generate_series(stop: DOtherable, step: DOtherable): DArrayField;
  get_bit(index: DNumericable): DNumericField;
  get_current_time(): DOtherField;
  get_current_timestamp(): DOtherField;
  hex(): DVarcharField;
  hour(): DNumericField;
  isfinite(): DBoolField;
  isinf(): DBoolField;
  isodow(): DNumericField;
  isoyear(): DNumericField;
  json_array(): DJsonField;
  json_merge_patch(): DJsonField;
  json_object(): DJsonField;
  json_quote(): DJsonField;
  julian(): DNumericField;
  last_day(): DOtherField;
  len(): DNumericField;
  length(): DNumericField;
  list_pack(): DArrayField;
  list_value(): DArrayField;
  list_zip(): DArrayField;
  map(): DMapField;
  map_concat(): DArrayField;
  map_entries(): DArrayField;
  map_from_entries(): DMapField;
  map_keys(): DArrayField;
  map_values(): DArrayField;
  md5(): DVarcharField;
  md5_number(): DNumericField;
  microsecond(): DNumericField;
  millennium(): DNumericField;
  millisecond(): DNumericField;
  minute(): DNumericField;
  month(): DNumericField;
  monthname(): DVarcharField;
  multiply(col1: DNumericable): DOtherField;
  nanosecond(): DNumericField;
  normalized_interval(): DOtherField;
  now(): DOtherField;
  octet_length(): DNumericField;
  pi(): DNumericField;
  quarter(): DNumericField;
  random(): DNumericField;
  range(stop: DOtherable, step: DOtherable): DArrayField;
  repeat(count: DNumericable): DOtherField;
  row(): DStructField;
  row_to_json(): DJsonField;
  second(): DNumericField;
  set_bit(index: DNumericable, newValue: DNumericable): DOtherField;
  sha1(): DVarcharField;
  sha256(): DVarcharField;
  strftime(format: DVarcharable): DVarcharField;
  struct_concat(): DStructField;
  struct_insert(): DStructField;
  struct_pack(): DStructField;
  subtract(col1: DOtherable): DOtherField;
  subtract(col1: DNumericable): DOtherField;
  subtract(col1: DOtherable): DNumericField;
  subtract(): DOtherField;
  time_bucket(timestamp: DOtherable): DOtherField;
  time_bucket(timestamp: DOtherable, origin: DOtherable): DOtherField;
  time_bucket(timestamp: DOtherable, origin: DVarcharable): DOtherField;
  timetz_byte_comparable(): DNumericField;
  timezone(): DNumericField;
  timezone(col1: DOtherable): DOtherField;
  timezone_hour(): DNumericField;
  timezone_minute(): DNumericField;
  to_base64(): DVarcharField;
  to_binary(): DVarcharField;
  to_hex(): DVarcharField;
  to_json(): DJsonField;
  today(): DOtherField;
  transaction_timestamp(): DOtherField;
  txid_current(): DNumericField;
  union_extract(tag: DVarcharable): DAnyField;
  union_tag(): DAnyField;
  union_value(): DOtherField;
  unpivot_list(): DArrayField;
  uuid(): DOtherField;
  version(): DVarcharField;
  week(): DNumericField;
  weekday(): DNumericField;
  weekofyear(): DNumericField;
  xor(right: DOtherable): DOtherField;
  year(): DNumericField;
  yearweek(): DNumericField;
}
export type DOtherField = IOther & {
  [sId]: "other";
  [sInferred]: any;
  [sAnti]: {};
};

export interface IStruct extends IAny {
  array_extract(index: DVarcharable): DAnyField;
  array_extract(index: DNumericable): DAnyField;
  struct_extract(entry: DNumericable): DAnyField;
  struct_extract(entry: DVarcharable): DAnyField;
  struct_extract_at(entry: DNumericable): DAnyField;
}
export type DStructField = IStruct & {
  [sId]: "struct";
  [sInferred]: Record<string, any>;
  [sAnti]: AntiObject;
};

export interface IVarchar extends IAny {
  array_extract(index: DNumericable): DVarcharField;
  ascii(): DNumericField;
  bin(): DVarcharField;
  bit_length(): DNumericField;
  bitstring(length: DNumericable): DOtherField;
  concat_ws(string: DAnyable, ...args: DAnyable): DVarcharField;
  contains(searchString: DVarcharable): DBoolField;
  current_setting(): DAnyField;
  currval(): DNumericField;
  damerau_levenshtein(str2: DVarcharable): DNumericField;
  date_diff(startdate: DOtherable, enddate: DOtherable): DNumericField;
  date_part(col1: DOtherable): DNumericField;
  date_sub(startdate: DOtherable, enddate: DOtherable): DNumericField;
  date_trunc(timestamp: DOtherable): DOtherField;
  datediff(startdate: DOtherable, enddate: DOtherable): DNumericField;
  datepart(col1: DOtherable): DNumericField;
  datesub(startdate: DOtherable, enddate: DOtherable): DNumericField;
  datetrunc(timestamp: DOtherable): DOtherField;
  editdist3(str2: DVarcharable): DNumericField;
  encode(): DOtherField;
  ends_with(col1: DVarcharable): DBoolField;
  error(): DOtherField;
  format(...args: DAnyable): DVarcharField;
  from_base64(): DOtherField;
  from_binary(): DOtherField;
  from_hex(): DOtherField;
  from_json(col1: DVarcharable): DAnyField;
  from_json_strict(col1: DVarcharable): DAnyField;
  getvariable(): DAnyField;
  hamming(str2: DVarcharable): DNumericField;
  hex(): DVarcharField;
  icu_sort_key(col1: DVarcharable): DVarcharField;
  ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  in_search_path(schemaName: DVarcharable): DBoolField;
  instr(needle: DVarcharable): DNumericField;
  jaccard(str2: DVarcharable): DNumericField;
  jaro_similarity(str2: DVarcharable, scoreCutoff: DNumericable): DNumericField;
  jaro_similarity(str2: DVarcharable): DNumericField;
  jaro_winkler_similarity(str2: DVarcharable, scoreCutoff: DNumericable): DNumericField;
  jaro_winkler_similarity(str2: DVarcharable): DNumericField;
  json_array_length(col1: DArrayable): DNumericField;
  json_array_length(col1: DVarcharable): DNumericField;
  json_array_length(): DNumericField;
  json_contains(col1: DVarcharable): DBoolField;
  json_contains(col1: DJsonable): DBoolField;
  json_exists(col1: DVarcharable): DBoolField;
  json_exists(col1: DArrayable): DArrayField;
  json_extract(col1: DNumericable): DJsonField;
  json_extract(col1: DVarcharable): DJsonField;
  json_extract(col1: DArrayable): DArrayField;
  json_extract_path(col1: DVarcharable): DJsonField;
  json_extract_path(col1: DNumericable): DJsonField;
  json_extract_path(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DVarcharable): DVarcharField;
  json_extract_path_text(col1: DNumericable): DVarcharField;
  json_extract_path_text(col1: DArrayable): DArrayField;
  json_extract_string(col1: DArrayable): DArrayField;
  json_extract_string(col1: DNumericable): DVarcharField;
  json_extract_string(col1: DVarcharable): DVarcharField;
  json_keys(col1: DArrayable): DArrayField;
  json_keys(col1: DVarcharable): DArrayField;
  json_keys(): DArrayField;
  json_serialize_plan(col1: DBoolable, col2: DBoolable): DJsonField;
  json_serialize_plan(col1: DBoolable, col2: DBoolable, col3: DBoolable): DJsonField;
  json_serialize_plan(col1: DBoolable): DJsonField;
  json_serialize_plan(): DJsonField;
  json_serialize_plan(col1: DBoolable, col2: DBoolable, col3: DBoolable, col4: DBoolable): DJsonField;
  json_serialize_sql(): DJsonField;
  json_serialize_sql(col1: DBoolable): DJsonField;
  json_serialize_sql(col1: DBoolable, col2: DBoolable): DJsonField;
  json_serialize_sql(col1: DBoolable, col2: DBoolable, col3: DBoolable): DJsonField;
  json_structure(): DJsonField;
  json_transform(col1: DVarcharable): DAnyField;
  json_transform_strict(col1: DVarcharable): DAnyField;
  json_type(col1: DVarcharable): DVarcharField;
  json_type(): DVarcharField;
  json_type(col1: DArrayable): DArrayField;
  json_valid(): DBoolField;
  json_value(col1: DArrayable): DArrayField;
  json_value(col1: DVarcharable): DVarcharField;
  json_value(col1: DNumericable): DVarcharField;
  lcase(): DVarcharField;
  left(count: DNumericable): DVarcharField;
  left_grapheme(count: DNumericable): DVarcharField;
  len(): DNumericField;
  length(): DNumericField;
  length_grapheme(): DNumericField;
  levenshtein(str2: DVarcharable): DNumericField;
  like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  list_element(index: DNumericable): DVarcharField;
  list_extract(index: DNumericable): DVarcharField;
  lower(): DVarcharField;
  lpad(count: DNumericable, character: DVarcharable): DVarcharField;
  ltrim(): DVarcharField;
  ltrim(characters: DVarcharable): DVarcharField;
  md5(): DVarcharField;
  md5_number(): DNumericField;
  mismatches(str2: DVarcharable): DNumericField;
  nextval(): DNumericField;
  nfc_normalize(): DVarcharField;
  not_ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  not_like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  ord(): DNumericField;
  parse_dirname(separator: DVarcharable): DVarcharField;
  parse_dirname(): DVarcharField;
  parse_dirpath(separator: DVarcharable): DVarcharField;
  parse_dirpath(): DVarcharField;
  parse_filename(): DVarcharField;
  parse_filename(trimExtension: DBoolable, separator: DVarcharable): DVarcharField;
  parse_filename(trimExtension: DBoolable): DVarcharField;
  parse_filename(trimExtension: DVarcharable): DVarcharField;
  parse_path(separator: DVarcharable): DArrayField;
  parse_path(): DArrayField;
  position(needle: DVarcharable): DNumericField;
  prefix(col1: DVarcharable): DBoolField;
  printf(...args: DAnyable): DVarcharField;
  regexp_escape(): DVarcharField;
  regexp_extract(pattern: RegExpable): DVarcharField;
  regexp_extract(pattern: RegExpable, group0: DNumericable): DVarcharField;
  regexp_extract(pattern: RegExpable, group0: DNumericable, options: DVarcharable): DVarcharField;
  regexp_extract(pattern: RegExpable, group0: DArrayable): DVarcharField;
  regexp_extract(pattern: RegExpable, group0: DArrayable, options: DVarcharable): DVarcharField;
  regexp_extract_all(regex: RegExpable, group0: DNumericable): DArrayField;
  regexp_extract_all(regex: RegExpable, group0: DNumericable, options: DVarcharable): DArrayField;
  regexp_extract_all(regex: RegExpable): DArrayField;
  regexp_full_match(regex: RegExpable): DBoolField;
  regexp_full_match(regex: RegExpable, options: DVarcharable): DBoolField;
  regexp_matches(pattern: RegExpable): DBoolField;
  regexp_matches(pattern: RegExpable, options: DVarcharable): DBoolField;
  regexp_replace(pattern: RegExpable, replacement: DVarcharable, options: DVarcharable): DVarcharField;
  regexp_replace(pattern: RegExpable, replacement: DVarcharable): DVarcharField;
  regexp_split_to_array(separator: RegExpable): DArrayField;
  regexp_split_to_array(separator: RegExpable, col2: DVarcharable): DArrayField;
  repeat(count: DNumericable): DVarcharField;
  replace(source: DVarcharable, target: DVarcharable): DVarcharField;
  reverse(): DVarcharField;
  right(count: DNumericable): DVarcharField;
  right_grapheme(count: DNumericable): DVarcharField;
  rpad(count: DNumericable, character: DVarcharable): DVarcharField;
  rtrim(characters: DVarcharable): DVarcharField;
  rtrim(): DVarcharField;
  sha1(): DVarcharField;
  sha256(): DVarcharField;
  split(separator: DVarcharable): DArrayField;
  starts_with(searchString: DVarcharable): DBoolField;
  str_split(separator: DVarcharable): DArrayField;
  str_split_regex(separator: RegExpable): DArrayField;
  str_split_regex(separator: RegExpable, col2: DVarcharable): DArrayField;
  strftime(format: DOtherable): DVarcharField;
  string_split(separator: DVarcharable): DArrayField;
  string_split_regex(separator: RegExpable, col2: DVarcharable): DArrayField;
  string_split_regex(separator: RegExpable): DArrayField;
  string_to_array(separator: DVarcharable): DArrayField;
  strip_accents(): DVarcharField;
  strlen(): DNumericField;
  strpos(needle: DVarcharable): DNumericField;
  strptime(formatList: DArrayable): DOtherField;
  strptime(format: DVarcharable): DOtherField;
  substr(start: DNumericable): DVarcharField;
  substr(start: DNumericable, length: DNumericable): DVarcharField;
  substring(start: DNumericable): DVarcharField;
  substring(start: DNumericable, length: DNumericable): DVarcharField;
  substring_grapheme(start: DNumericable): DVarcharField;
  substring_grapheme(start: DNumericable, length: DNumericable): DVarcharField;
  suffix(col1: DVarcharable): DBoolField;
  timezone(col1: DOtherable): DOtherField;
  to_binary(): DVarcharField;
  to_hex(): DVarcharField;
  translate(from: DVarcharable, to: DVarcharable): DVarcharField;
  trim(): DVarcharField;
  trim(characters: DVarcharable): DVarcharField;
  try_strptime(format: DArrayable): DOtherField;
  try_strptime(format: DVarcharable): DOtherField;
  ucase(): DVarcharField;
  unbin(): DOtherField;
  unhex(): DOtherField;
  unicode(): DNumericField;
  upper(): DVarcharField;
  url_decode(): DVarcharField;
  url_encode(): DVarcharField;
  write_log(...args: DAnyable): DAnyField;
}
export type DVarcharField = IVarchar & {
  [sId]: "varchar";
  [sInferred]: string;
  [sAnti]: AntiString;
};

type AntiString = {
  anchor: never;
  at: never;
  big: never;
  blink: never;
  bold: never;
  charAt: never;
  charCodeAt: never;
  codePointAt: never;
  concat: never;
  constructor: never;
  endsWith: never;
  fixed: never;
  fontcolor: never;
  fontsize: never;
  includes: never;
  indexOf: never;
  isWellFormed: never;
  italics: never;
  lastIndexOf: never;
  length: never;
  link: never;
  localeCompare: never;
  match: never;
  matchAll: never;
  normalize: never;
  padEnd: never;
  padStart: never;
  repeat: never;
  replace: never;
  replaceAll: never;
  search: never;
  slice: never;
  small: never;
  split: never;
  startsWith: never;
  strike: never;
  sub: never;
  substr: never;
  substring: never;
  sup: never;
  toLocaleLowerCase: never;
  toLocaleUpperCase: never;
  toLowerCase: never;
  toString: never;
  toUpperCase: never;
  toWellFormed: never;
  trim: never;
  trimEnd: never;
  trimLeft: never;
  trimRight: never;
  trimStart: never;
  valueOf: never;
};
export interface IGlobal {
  abs(x: DNumericable): DNumericField;
  acos(x: DNumericable): DNumericField;
  acosh(x: DNumericable): DNumericField;
  add(col0: DOtherable, col1: DOtherable): DOtherField;
  add(col0: DNumericable, col1: DNumericable): DNumericField;
  add(col0: DNumericable, col1: DOtherable): DOtherField;
  add(col0: DOtherable, col1: DNumericable): DOtherField;
  add(col0: DNumericable): DNumericField;
  add(col0: DArrayable, col1: DArrayable): DArrayField;
  age(timestamp: DOtherable): DOtherField;
  age(timestamp: DOtherable, timestamp01: DOtherable): DOtherField;
  aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable): DAnyField;
  alias(expr: DAnyable): DVarcharField;
  apply(list: DArrayable, lambda: DOtherable): DArrayField;
  array_aggr(list: DArrayable, name: DVarcharable, ...args: DAnyable): DAnyField;
  array_aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable): DAnyField;
  array_apply(list: DArrayable, lambda: DOtherable): DArrayField;
  array_cat(list1: DArrayable, list2: DArrayable): DArrayField;
  array_concat(list1: DArrayable, list2: DArrayable): DArrayField;
  array_contains(list: DArrayable, element: DAnyable): DBoolField;
  array_cosine_distance(arr1: DNumericable, arr2: DNumericable): DNumericField;
  array_cosine_similarity(arr1: DNumericable, arr2: DNumericable): DNumericField;
  array_cross_product(arr: DNumericable, arr01: DNumericable): DNumericField;
  array_distance(arr1: DNumericable, arr2: DNumericable): DNumericField;
  array_distinct(list: DArrayable): DArrayField;
  array_dot_product(arr1: DNumericable, arr2: DNumericable): DNumericField;
  array_extract(list: DArrayable, index: DNumericable): DAnyField;
  array_extract(list: DVarcharable, index: DNumericable): DVarcharField;
  array_extract(list: DStructable, index: DVarcharable): DAnyField;
  array_extract(list: DStructable, index: DNumericable): DAnyField;
  array_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  array_grade_up(list: DArrayable): DArrayField;
  array_grade_up(list: DArrayable, col1: DVarcharable): DArrayField;
  array_grade_up(list: DArrayable, col1: DVarcharable, col2: DVarcharable): DArrayField;
  array_has(list: DArrayable, element: DAnyable): DBoolField;
  array_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  array_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  array_indexof(list: DArrayable, element: DAnyable): DNumericField;
  array_inner_product(arr1: DNumericable, arr2: DNumericable): DNumericField;
  array_length(list: DArrayable): DNumericField;
  array_length(list: DArrayable, col1: DNumericable): DNumericField;
  array_negative_dot_product(arr1: DNumericable, arr2: DNumericable): DNumericField;
  array_negative_inner_product(arr1: DNumericable, arr2: DNumericable): DNumericField;
  array_position(list: DArrayable, element: DAnyable): DNumericField;
  array_reduce(list: DArrayable, lambda: DOtherable): DAnyField;
  array_resize(list: DArrayable, size: DAnyable): DArrayField;
  array_resize(list: DArrayable, size: DAnyable, value: DAnyable): DArrayField;
  array_reverse_sort(list: DArrayable): DArrayField;
  array_reverse_sort(list: DArrayable, col1: DVarcharable): DArrayField;
  array_select(valueList: DArrayable, indexList: DNumericable): DArrayField;
  array_slice(list: DAnyable, begin: DAnyable, end: DAnyable): DAnyField;
  array_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step: DNumericable): DAnyField;
  array_sort(list: DArrayable): DArrayField;
  array_sort(list: DArrayable, col1: DVarcharable): DArrayField;
  array_sort(list: DArrayable, col1: DVarcharable, col2: DVarcharable): DArrayField;
  array_to_json(...args: DAnyable): DJsonField;
  array_transform(list: DArrayable, lambda: DOtherable): DArrayField;
  array_unique(list: DArrayable): DNumericField;
  array_value(...args: DAnyable): DArrayField;
  array_where(valueList: DArrayable, maskList: DArrayable): DArrayField;
  array_zip(...args: DAnyable): DArrayField;
  ascii(string: DVarcharable): DNumericField;
  asin(x: DNumericable): DNumericField;
  asinh(x: DNumericable): DNumericField;
  atan(x: DNumericable): DNumericField;
  atan2(y: DNumericable, x: DNumericable): DNumericField;
  atanh(x: DNumericable): DNumericField;
  bar(x: DNumericable, min: DNumericable, max: DNumericable): DVarcharField;
  bar(x: DNumericable, min: DNumericable, max: DNumericable, width: DNumericable): DVarcharField;
  base64(blob: DOtherable): DVarcharField;
  bin(value: DNumericable): DVarcharField;
  bin(value: DVarcharable): DVarcharField;
  bin(value: DOtherable): DVarcharField;
  bit_count(x: DNumericable): DNumericField;
  bit_count(x: DOtherable): DNumericField;
  bit_length(col0: DVarcharable): DNumericField;
  bit_length(col0: DOtherable): DNumericField;
  bit_position(substring: DOtherable, bitstring: DOtherable): DNumericField;
  bitstring(bitstring: DVarcharable, length: DNumericable): DOtherField;
  bitstring(bitstring: DOtherable, length: DNumericable): DOtherField;
  can_cast_implicitly(sourceType: DAnyable, targetType: DAnyable): DBoolField;
  cardinality(map: DAnyable, ...args: DAnyable): DNumericField;
  cbrt(x: DNumericable): DNumericField;
  ceil(x: DNumericable): DNumericField;
  ceiling(x: DNumericable): DNumericField;
  century(ts: DOtherable): DNumericField;
  chr(codePoint: DNumericable): DVarcharField;
  combine(col0: DOtherable, col1: DAnyable): DOtherField;
  concat(string: DAnyable, ...args: DAnyable): DVarcharField;
  concat_ws(separator: DVarcharable, string: DAnyable, ...args: DAnyable): DVarcharField;
  constant_or_null(arg1: DAnyable, arg2: DAnyable, ...args: DAnyable): DAnyField;
  contains(map: DMapable, key: DAnyable): DBoolField;
  contains(string: DVarcharable, searchString: DVarcharable): DBoolField;
  contains(list: DArrayable, element: DAnyable): DBoolField;
  cos(x: DNumericable): DNumericField;
  cosh(x: DNumericable): DNumericField;
  cot(x: DNumericable): DNumericField;
  create_sort_key(parameters: DAnyable, ...args: DAnyable): DOtherField;
  current_database(): DVarcharField;
  current_date(): DOtherField;
  current_localtime(): DOtherField;
  current_localtimestamp(): DOtherField;
  current_query(): DVarcharField;
  current_schema(): DVarcharField;
  current_schemas(includeImplicit: DBoolable): DArrayField;
  current_setting(settingName: DVarcharable): DAnyField;
  currval(sequenceName: DVarcharable): DNumericField;
  damerau_levenshtein(str1: DVarcharable, str2: DVarcharable): DNumericField;
  date_diff(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): DNumericField;
  date_part(ts: DVarcharable, col1: DOtherable): DNumericField;
  date_part(ts: DArrayable, col1: DOtherable): DStructField;
  date_sub(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): DNumericField;
  date_trunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  datediff(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): DNumericField;
  datepart(ts: DVarcharable, col1: DOtherable): DNumericField;
  datepart(ts: DArrayable, col1: DOtherable): DStructField;
  datesub(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): DNumericField;
  datetrunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  day(ts: DOtherable): DNumericField;
  dayname(ts: DOtherable): DVarcharField;
  dayofmonth(ts: DOtherable): DNumericField;
  dayofweek(ts: DOtherable): DNumericField;
  dayofyear(ts: DOtherable): DNumericField;
  decade(ts: DOtherable): DNumericField;
  decode(blob: DOtherable): DVarcharField;
  degrees(x: DNumericable): DNumericField;
  divide(col0: DNumericable, col1: DNumericable): DNumericField;
  editdist3(str1: DVarcharable, str2: DVarcharable): DNumericField;
  element_at(map: DAnyable, key: DAnyable, ...args: DAnyable): DAnyField;
  encode(string: DVarcharable): DOtherField;
  ends_with(col0: DVarcharable, col1: DVarcharable): DBoolField;
  enum_code(enm: DAnyable): DAnyField;
  enum_first(enm: DAnyable): DVarcharField;
  enum_last(enm: DAnyable): DVarcharField;
  enum_range(enm: DAnyable): DArrayField;
  enum_range_boundary(start: DAnyable, end: DAnyable): DArrayField;
  epoch(temporal: DOtherable): DNumericField;
  epoch_ms(temporal: DOtherable): DNumericField;
  epoch_ms(temporal: DNumericable): DOtherField;
  epoch_ns(temporal: DOtherable): DNumericField;
  epoch_us(temporal: DOtherable): DNumericField;
  equi_width_bins(min: DAnyable, max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  equi_width_bins(min: DOtherable, max: DOtherable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  equi_width_bins(min: DNumericable, max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  era(ts: DOtherable): DNumericField;
  error(message: DVarcharable): DOtherField;
  even(x: DNumericable): DNumericField;
  exp(x: DNumericable): DNumericField;
  factorial(x: DNumericable): DNumericField;
  filter(list: DArrayable, lambda: DOtherable): DArrayField;
  finalize(col0: DOtherable): DOtherField;
  flatten(nestedList: DArrayable): DArrayField;
  floor(x: DNumericable): DNumericField;
  format(format: DVarcharable, ...args: DAnyable): DVarcharField;
  formatReadableDecimalSize(bytes: DNumericable): DVarcharField;
  formatReadableSize(bytes: DNumericable): DVarcharField;
  format_bytes(bytes: DNumericable): DVarcharField;
  from_base64(string: DVarcharable): DOtherField;
  from_binary(value: DVarcharable): DOtherField;
  from_hex(value: DVarcharable): DOtherField;
  from_json(col0: DVarcharable, col1: DVarcharable): DAnyField;
  from_json(col0: DJsonable, col1: DVarcharable): DAnyField;
  from_json_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  from_json_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  gamma(x: DNumericable): DNumericField;
  gcd(x: DNumericable, y: DNumericable): DNumericField;
  gen_random_uuid(): DOtherField;
  generate_series(start: DNumericable): DNumericField;
  generate_series(start: DNumericable, stop: DNumericable): DNumericField;
  generate_series(start: DNumericable, stop: DNumericable, step: DNumericable): DNumericField;
  generate_series(start: DOtherable, stop: DOtherable, step: DOtherable): DArrayField;
  get_bit(bitstring: DOtherable, index: DNumericable): DNumericField;
  get_current_time(): DOtherField;
  get_current_timestamp(): DOtherField;
  getvariable(col0: DVarcharable): DAnyField;
  grade_up(list: DArrayable, col1: DVarcharable, col2: DVarcharable): DArrayField;
  grade_up(list: DArrayable, col1: DVarcharable): DArrayField;
  grade_up(list: DArrayable): DArrayField;
  greatest(arg1: DAnyable, ...args: DAnyable): DAnyField;
  greatest_common_divisor(x: DNumericable, y: DNumericable): DNumericField;
  hamming(str1: DVarcharable, str2: DVarcharable): DNumericField;
  hash(param: DAnyable, ...args: DAnyable): DNumericField;
  hex(value: DOtherable): DVarcharField;
  hex(value: DNumericable): DVarcharField;
  hex(value: DVarcharable): DVarcharField;
  hour(ts: DOtherable): DNumericField;
  icu_sort_key(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  in_search_path(databaseName: DVarcharable, schemaName: DVarcharable): DBoolField;
  instr(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  is_histogram_other_bin(val: DAnyable): DBoolField;
  isfinite(x: DOtherable): DBoolField;
  isfinite(x: DNumericable): DBoolField;
  isinf(x: DOtherable): DBoolField;
  isinf(x: DNumericable): DBoolField;
  isnan(x: DNumericable): DBoolField;
  isodow(ts: DOtherable): DNumericField;
  isoyear(ts: DOtherable): DNumericField;
  jaccard(str1: DVarcharable, str2: DVarcharable): DNumericField;
  jaro_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff: DNumericable): DNumericField;
  jaro_similarity(str1: DVarcharable, str2: DVarcharable): DNumericField;
  jaro_winkler_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff: DNumericable): DNumericField;
  jaro_winkler_similarity(str1: DVarcharable, str2: DVarcharable): DNumericField;
  json_array(...args: DAnyable): DJsonField;
  json_array_length(col0: DVarcharable, col1: DArrayable): DNumericField;
  json_array_length(col0: DJsonable, col1: DArrayable): DNumericField;
  json_array_length(col0: DJsonable, col1: DVarcharable): DNumericField;
  json_array_length(col0: DJsonable): DNumericField;
  json_array_length(col0: DVarcharable, col1: DVarcharable): DNumericField;
  json_array_length(col0: DVarcharable): DNumericField;
  json_contains(col0: DJsonable, col1: DJsonable): DBoolField;
  json_contains(col0: DVarcharable, col1: DVarcharable): DBoolField;
  json_contains(col0: DVarcharable, col1: DJsonable): DBoolField;
  json_contains(col0: DJsonable, col1: DVarcharable): DBoolField;
  json_deserialize_sql(col0: DJsonable): DVarcharField;
  json_exists(col0: DJsonable, col1: DVarcharable): DBoolField;
  json_exists(col0: DVarcharable, col1: DVarcharable): DBoolField;
  json_exists(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_exists(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract(col0: DJsonable, col1: DNumericable): DJsonField;
  json_extract(col0: DVarcharable, col1: DNumericable): DJsonField;
  json_extract(col0: DVarcharable, col1: DVarcharable): DJsonField;
  json_extract(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract(col0: DJsonable, col1: DVarcharable): DJsonField;
  json_extract_path(col0: DJsonable, col1: DNumericable): DJsonField;
  json_extract_path(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DVarcharable, col1: DVarcharable): DJsonField;
  json_extract_path(col0: DVarcharable, col1: DNumericable): DJsonField;
  json_extract_path(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DJsonable, col1: DVarcharable): DJsonField;
  json_extract_path_text(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  json_extract_path_text(col0: DVarcharable, col1: DNumericable): DVarcharField;
  json_extract_path_text(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DJsonable, col1: DNumericable): DVarcharField;
  json_extract_path_text(col0: DJsonable, col1: DVarcharable): DVarcharField;
  json_extract_path_text(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DVarcharable, col1: DNumericable): DVarcharField;
  json_extract_string(col0: DJsonable, col1: DNumericable): DVarcharField;
  json_extract_string(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DJsonable, col1: DVarcharable): DVarcharField;
  json_extract_string(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  json_keys(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_keys(col0: DJsonable): DArrayField;
  json_keys(col0: DJsonable, col1: DVarcharable): DArrayField;
  json_keys(col0: DVarcharable, col1: DVarcharable): DArrayField;
  json_keys(col0: DVarcharable): DArrayField;
  json_keys(col0: DJsonable, col1: DArrayable): DArrayField;
  json_merge_patch(...args: DAnyable): DJsonField;
  json_object(...args: DAnyable): DJsonField;
  json_pretty(col0: DJsonable): DVarcharField;
  json_quote(...args: DAnyable): DJsonField;
  json_serialize_plan(col0: DVarcharable, col1: DBoolable, col2: DBoolable): DJsonField;
  json_serialize_plan(col0: DVarcharable, col1: DBoolable, col2: DBoolable, col3: DBoolable): DJsonField;
  json_serialize_plan(col0: DVarcharable, col1: DBoolable): DJsonField;
  json_serialize_plan(col0: DVarcharable): DJsonField;
  json_serialize_plan(
    col0: DVarcharable,
    col1: DBoolable,
    col2: DBoolable,
    col3: DBoolable,
    col4: DBoolable,
  ): DJsonField;
  json_serialize_sql(col0: DVarcharable): DJsonField;
  json_serialize_sql(col0: DVarcharable, col1: DBoolable): DJsonField;
  json_serialize_sql(col0: DVarcharable, col1: DBoolable, col2: DBoolable): DJsonField;
  json_serialize_sql(col0: DVarcharable, col1: DBoolable, col2: DBoolable, col3: DBoolable): DJsonField;
  json_structure(col0: DVarcharable): DJsonField;
  json_structure(col0: DJsonable): DJsonField;
  json_transform(col0: DVarcharable, col1: DVarcharable): DAnyField;
  json_transform(col0: DJsonable, col1: DVarcharable): DAnyField;
  json_transform_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  json_transform_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  json_type(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  json_type(col0: DJsonable, col1: DArrayable): DArrayField;
  json_type(col0: DVarcharable): DVarcharField;
  json_type(col0: DJsonable, col1: DVarcharable): DVarcharField;
  json_type(col0: DJsonable): DVarcharField;
  json_type(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_valid(col0: DVarcharable): DBoolField;
  json_valid(col0: DJsonable): DBoolField;
  json_value(col0: DJsonable, col1: DNumericable): DVarcharField;
  json_value(col0: DJsonable, col1: DArrayable): DArrayField;
  json_value(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_value(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  json_value(col0: DJsonable, col1: DVarcharable): DVarcharField;
  json_value(col0: DVarcharable, col1: DNumericable): DVarcharField;
  julian(ts: DOtherable): DNumericField;
  last_day(ts: DOtherable): DOtherField;
  lcase(string: DVarcharable): DVarcharField;
  lcm(x: DNumericable, y: DNumericable): DNumericField;
  least(arg1: DAnyable, ...args: DAnyable): DAnyField;
  least_common_multiple(x: DNumericable, y: DNumericable): DNumericField;
  left(string: DVarcharable, count: DNumericable): DVarcharField;
  left_grapheme(string: DVarcharable, count: DNumericable): DVarcharField;
  len(string: DArrayable): DNumericField;
  len(string: DOtherable): DNumericField;
  len(string: DVarcharable): DNumericField;
  length(string: DArrayable): DNumericField;
  length(string: DVarcharable): DNumericField;
  length(string: DOtherable): DNumericField;
  length_grapheme(string: DVarcharable): DNumericField;
  levenshtein(str1: DVarcharable, str2: DVarcharable): DNumericField;
  lgamma(x: DNumericable): DNumericField;
  like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  list_aggr(list: DArrayable, name: DVarcharable, ...args: DAnyable): DAnyField;
  list_aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable): DAnyField;
  list_apply(list: DArrayable, lambda: DOtherable): DArrayField;
  list_cat(list1: DArrayable, list2: DArrayable): DArrayField;
  list_concat(list1: DArrayable, list2: DArrayable): DArrayField;
  list_contains(list: DArrayable, element: DAnyable): DBoolField;
  list_cosine_distance(list1: DNumericable, list2: DNumericable): DNumericField;
  list_cosine_similarity(list1: DNumericable, list2: DNumericable): DNumericField;
  list_distance(list1: DNumericable, list2: DNumericable): DNumericField;
  list_distinct(list: DArrayable): DArrayField;
  list_dot_product(list1: DNumericable, list2: DNumericable): DNumericField;
  list_element(list: DVarcharable, index: DNumericable): DVarcharField;
  list_element(list: DArrayable, index: DNumericable): DAnyField;
  list_extract(list: DVarcharable, index: DNumericable): DVarcharField;
  list_extract(list: DArrayable, index: DNumericable): DAnyField;
  list_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  list_grade_up(list: DArrayable, col1: DVarcharable, col2: DVarcharable): DArrayField;
  list_grade_up(list: DArrayable, col1: DVarcharable): DArrayField;
  list_grade_up(list: DArrayable): DArrayField;
  list_has(list: DArrayable, element: DAnyable): DBoolField;
  list_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  list_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  list_indexof(list: DArrayable, element: DAnyable): DNumericField;
  list_inner_product(list1: DNumericable, list2: DNumericable): DNumericField;
  list_negative_dot_product(list1: DNumericable, list2: DNumericable): DNumericField;
  list_negative_inner_product(list1: DNumericable, list2: DNumericable): DNumericField;
  list_pack(...args: DAnyable): DArrayField;
  list_position(list: DArrayable, element: DAnyable): DNumericField;
  list_reduce(list: DArrayable, lambda: DOtherable): DAnyField;
  list_resize(list: DArrayable, size: DAnyable): DArrayField;
  list_resize(list: DArrayable, size: DAnyable, value: DAnyable): DArrayField;
  list_reverse_sort(list: DArrayable): DArrayField;
  list_reverse_sort(list: DArrayable, col1: DVarcharable): DArrayField;
  list_select(valueList: DArrayable, indexList: DNumericable): DArrayField;
  list_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step: DNumericable): DAnyField;
  list_slice(list: DAnyable, begin: DAnyable, end: DAnyable): DAnyField;
  list_sort(list: DArrayable, col1: DVarcharable, col2: DVarcharable): DArrayField;
  list_sort(list: DArrayable, col1: DVarcharable): DArrayField;
  list_sort(list: DArrayable): DArrayField;
  list_transform(list: DArrayable, lambda: DOtherable): DArrayField;
  list_unique(list: DArrayable): DNumericField;
  list_value(...args: DAnyable): DArrayField;
  list_where(valueList: DArrayable, maskList: DArrayable): DArrayField;
  list_zip(...args: DAnyable): DArrayField;
  ln(x: DNumericable): DNumericField;
  log(b: DNumericable): DNumericField;
  log(b: DNumericable, x: DNumericable): DNumericField;
  log10(x: DNumericable): DNumericField;
  log2(x: DNumericable): DNumericField;
  lower(string: DVarcharable): DVarcharField;
  lpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DVarcharField;
  ltrim(string: DVarcharable): DVarcharField;
  ltrim(string: DVarcharable, characters: DVarcharable): DVarcharField;
  make_date(col0: DNumericable): DOtherField;
  make_date(year: DNumericable, month: DNumericable, day: DNumericable): DOtherField;
  make_date(dateStruct: DNumericable): DOtherField;
  make_time(hour: DNumericable, minute: DNumericable, seconds: DNumericable): DOtherField;
  make_timestamp(year: DNumericable): DOtherField;
  make_timestamp(
    year: DNumericable,
    month: DNumericable,
    day: DNumericable,
    hour: DNumericable,
    minute: DNumericable,
    seconds: DNumericable,
  ): DOtherField;
  make_timestamp_ns(nanos: DNumericable): DOtherField;
  make_timestamptz(
    col0: DNumericable,
    col1: DNumericable,
    col2: DNumericable,
    col3: DNumericable,
    col4: DNumericable,
    col5: DNumericable,
  ): DOtherField;
  make_timestamptz(col0: DNumericable): DOtherField;
  make_timestamptz(
    col0: DNumericable,
    col1: DNumericable,
    col2: DNumericable,
    col3: DNumericable,
    col4: DNumericable,
    col5: DNumericable,
    col6: DVarcharable,
  ): DOtherField;
  map(...args: DAnyable): DMapField;
  map_concat(...args: DAnyable): DArrayField;
  map_contains(map: DMapable, key: DAnyable): DBoolField;
  map_entries(...args: DAnyable): DArrayField;
  map_extract(map: DAnyable, key: DAnyable, ...args: DAnyable): DAnyField;
  map_extract_value(map: DAnyable, key: DAnyable, ...args: DAnyable): DAnyField;
  map_from_entries(...args: DAnyable): DMapField;
  map_keys(...args: DAnyable): DArrayField;
  map_values(...args: DAnyable): DArrayField;
  md5(value: DVarcharable): DVarcharField;
  md5(value: DOtherable): DVarcharField;
  md5_number(value: DVarcharable): DNumericField;
  md5_number(value: DOtherable): DNumericField;
  microsecond(ts: DOtherable): DNumericField;
  millennium(ts: DOtherable): DNumericField;
  millisecond(ts: DOtherable): DNumericField;
  minute(ts: DOtherable): DNumericField;
  mismatches(str1: DVarcharable, str2: DVarcharable): DNumericField;
  mod(col0: DNumericable, col1: DNumericable): DNumericField;
  month(ts: DOtherable): DNumericField;
  monthname(ts: DOtherable): DVarcharField;
  multiply(col0: DNumericable, col1: DNumericable): DNumericField;
  multiply(col0: DOtherable, col1: DNumericable): DOtherField;
  multiply(col0: DNumericable, col1: DOtherable): DOtherField;
  nanosecond(tsns: DOtherable): DNumericField;
  nextafter(x: DNumericable, y: DNumericable): DNumericField;
  nextval(sequenceName: DVarcharable): DNumericField;
  nfc_normalize(string: DVarcharable): DVarcharField;
  normalized_interval(interval: DOtherable): DOtherField;
  not_ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  not_like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  now(): DOtherField;
  octet_length(blob: DOtherable): DNumericField;
  ord(str: DVarcharable): DNumericField;
  parse_dirname(string: DVarcharable, separator: DVarcharable): DVarcharField;
  parse_dirname(string: DVarcharable): DVarcharField;
  parse_dirpath(string: DVarcharable, separator: DVarcharable): DVarcharField;
  parse_dirpath(string: DVarcharable): DVarcharField;
  parse_filename(string: DVarcharable): DVarcharField;
  parse_filename(string: DVarcharable, trimExtension: DBoolable, separator: DVarcharable): DVarcharField;
  parse_filename(string: DVarcharable, trimExtension: DBoolable): DVarcharField;
  parse_filename(string: DVarcharable, trimExtension: DVarcharable): DVarcharField;
  parse_path(string: DVarcharable, separator: DVarcharable): DArrayField;
  parse_path(string: DVarcharable): DArrayField;
  pi(): DNumericField;
  position(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  pow(x: DNumericable, y: DNumericable): DNumericField;
  power(x: DNumericable, y: DNumericable): DNumericField;
  prefix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  printf(format: DVarcharable, ...args: DAnyable): DVarcharField;
  quarter(ts: DOtherable): DNumericField;
  radians(x: DNumericable): DNumericField;
  random(): DNumericField;
  range(start: DNumericable, stop: DNumericable): DNumericField;
  range(start: DNumericable): DNumericField;
  range(start: DNumericable, stop: DNumericable, step: DNumericable): DNumericField;
  range(start: DOtherable, stop: DOtherable, step: DOtherable): DArrayField;
  reduce(list: DArrayable, lambda: DOtherable): DAnyField;
  regexp_escape(string: DVarcharable): DVarcharField;
  regexp_extract(string: DVarcharable, pattern: RegExpable): DVarcharField;
  regexp_extract(string: DVarcharable, pattern: RegExpable, group0: DNumericable): DVarcharField;
  regexp_extract(string: DVarcharable, pattern: RegExpable, group0: DNumericable, options: DVarcharable): DVarcharField;
  regexp_extract(string: DVarcharable, pattern: RegExpable, group0: DArrayable): DVarcharField;
  regexp_extract(string: DVarcharable, pattern: RegExpable, group0: DArrayable, options: DVarcharable): DVarcharField;
  regexp_extract_all(string: DVarcharable, regex: RegExpable, group0: DNumericable): DArrayField;
  regexp_extract_all(string: DVarcharable, regex: RegExpable, group0: DNumericable, options: DVarcharable): DArrayField;
  regexp_extract_all(string: DVarcharable, regex: RegExpable): DArrayField;
  regexp_full_match(string: DVarcharable, regex: RegExpable): DBoolField;
  regexp_full_match(string: DVarcharable, regex: RegExpable, options: DVarcharable): DBoolField;
  regexp_matches(string: DVarcharable, pattern: RegExpable): DBoolField;
  regexp_matches(string: DVarcharable, pattern: RegExpable, options: DVarcharable): DBoolField;
  regexp_replace(
    string: DVarcharable,
    pattern: RegExpable,
    replacement: DVarcharable,
    options: DVarcharable,
  ): DVarcharField;
  regexp_replace(string: DVarcharable, pattern: RegExpable, replacement: DVarcharable): DVarcharField;
  regexp_split_to_array(string: DVarcharable, separator: RegExpable): DArrayField;
  regexp_split_to_array(string: DVarcharable, separator: RegExpable, col2: DVarcharable): DArrayField;
  repeat(string: DVarcharable, count: DNumericable): DVarcharField;
  repeat(string: DOtherable, count: DNumericable): DOtherField;
  repeat(string: DArrayable, count: DNumericable): DArrayField;
  replace(string: DVarcharable, source: DVarcharable, target: DVarcharable): DVarcharField;
  reverse(string: DVarcharable): DVarcharField;
  right(string: DVarcharable, count: DNumericable): DVarcharField;
  right_grapheme(string: DVarcharable, count: DNumericable): DVarcharField;
  round(x: DNumericable, precision: DNumericable): DNumericField;
  round(x: DNumericable): DNumericField;
  row(...args: DAnyable): DStructField;
  row_to_json(...args: DAnyable): DJsonField;
  rpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DVarcharField;
  rtrim(string: DVarcharable, characters: DVarcharable): DVarcharField;
  rtrim(string: DVarcharable): DVarcharField;
  second(ts: DOtherable): DNumericField;
  set_bit(bitstring: DOtherable, index: DNumericable, newValue: DNumericable): DOtherField;
  setseed(col0: DNumericable): DOtherField;
  sha1(value: DVarcharable): DVarcharField;
  sha1(value: DOtherable): DVarcharField;
  sha256(value: DVarcharable): DVarcharField;
  sha256(value: DOtherable): DVarcharField;
  sign(x: DNumericable): DNumericField;
  signbit(x: DNumericable): DBoolField;
  sin(x: DNumericable): DNumericField;
  sinh(x: DNumericable): DNumericField;
  split(string: DVarcharable, separator: DVarcharable): DArrayField;
  sqrt(x: DNumericable): DNumericField;
  starts_with(string: DVarcharable, searchString: DVarcharable): DBoolField;
  stats(expression: DAnyable): DVarcharField;
  str_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  str_split_regex(string: DVarcharable, separator: RegExpable): DArrayField;
  str_split_regex(string: DVarcharable, separator: RegExpable, col2: DVarcharable): DArrayField;
  strftime(data: DOtherable, format: DVarcharable): DVarcharField;
  strftime(data: DVarcharable, format: DOtherable): DVarcharField;
  string_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  string_split_regex(string: DVarcharable, separator: RegExpable, col2: DVarcharable): DArrayField;
  string_split_regex(string: DVarcharable, separator: RegExpable): DArrayField;
  string_to_array(string: DVarcharable, separator: DVarcharable): DArrayField;
  strip_accents(string: DVarcharable): DVarcharField;
  strlen(string: DVarcharable): DNumericField;
  strpos(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  strptime(text: DVarcharable, formatList: DArrayable): DOtherField;
  strptime(text: DVarcharable, format: DVarcharable): DOtherField;
  struct_concat(...args: DAnyable): DStructField;
  struct_extract(struct: DStructable, entry: DNumericable): DAnyField;
  struct_extract(struct: DStructable, entry: DVarcharable): DAnyField;
  struct_extract_at(struct: DStructable, entry: DNumericable): DAnyField;
  struct_insert(...args: DAnyable): DStructField;
  struct_pack(...args: DAnyable): DStructField;
  substr(string: DVarcharable, start: DNumericable): DVarcharField;
  substr(string: DVarcharable, start: DNumericable, length: DNumericable): DVarcharField;
  substring(string: DVarcharable, start: DNumericable): DVarcharField;
  substring(string: DVarcharable, start: DNumericable, length: DNumericable): DVarcharField;
  substring_grapheme(string: DVarcharable, start: DNumericable): DVarcharField;
  substring_grapheme(string: DVarcharable, start: DNumericable, length: DNumericable): DVarcharField;
  subtract(col0: DNumericable, col1: DNumericable): DNumericField;
  subtract(col0: DNumericable): DNumericField;
  subtract(col0: DOtherable, col1: DOtherable): DOtherField;
  subtract(col0: DOtherable, col1: DNumericable): DOtherField;
  subtract(col0: DOtherable, col1: DOtherable): DNumericField;
  subtract(col0: DOtherable): DOtherField;
  suffix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  tan(x: DNumericable): DNumericField;
  tanh(x: DNumericable): DNumericField;
  time_bucket(bucketWidth: DOtherable, timestamp: DOtherable): DOtherField;
  time_bucket(bucketWidth: DOtherable, timestamp: DOtherable, origin: DOtherable): DOtherField;
  time_bucket(bucketWidth: DOtherable, timestamp: DOtherable, origin: DVarcharable): DOtherField;
  timetz_byte_comparable(timeTz: DOtherable): DNumericField;
  timezone(ts: DVarcharable, col1: DOtherable): DOtherField;
  timezone(ts: DOtherable): DNumericField;
  timezone(ts: DOtherable, col1: DOtherable): DOtherField;
  timezone_hour(ts: DOtherable): DNumericField;
  timezone_minute(ts: DOtherable): DNumericField;
  to_base(number: DNumericable, radix: DNumericable): DVarcharField;
  to_base(number: DNumericable, radix: DNumericable, minLength: DNumericable): DVarcharField;
  to_base64(blob: DOtherable): DVarcharField;
  to_binary(value: DVarcharable): DVarcharField;
  to_binary(value: DOtherable): DVarcharField;
  to_binary(value: DNumericable): DVarcharField;
  to_centuries(integer: DNumericable): DOtherField;
  to_days(integer: DNumericable): DOtherField;
  to_decades(integer: DNumericable): DOtherField;
  to_hex(value: DVarcharable): DVarcharField;
  to_hex(value: DNumericable): DVarcharField;
  to_hex(value: DOtherable): DVarcharField;
  to_hours(integer: DNumericable): DOtherField;
  to_json(...args: DAnyable): DJsonField;
  to_microseconds(integer: DNumericable): DOtherField;
  to_millennia(integer: DNumericable): DOtherField;
  to_milliseconds(double: DNumericable): DOtherField;
  to_minutes(integer: DNumericable): DOtherField;
  to_months(integer: DNumericable): DOtherField;
  to_quarters(integer: DNumericable): DOtherField;
  to_seconds(double: DNumericable): DOtherField;
  to_timestamp(sec: DNumericable): DOtherField;
  to_weeks(integer: DNumericable): DOtherField;
  to_years(integer: DNumericable): DOtherField;
  today(): DOtherField;
  transaction_timestamp(): DOtherField;
  translate(string: DVarcharable, from: DVarcharable, to: DVarcharable): DVarcharField;
  trim(string: DVarcharable): DVarcharField;
  trim(string: DVarcharable, characters: DVarcharable): DVarcharField;
  trunc(x: DNumericable): DNumericField;
  try_strptime(text: DVarcharable, format: DArrayable): DOtherField;
  try_strptime(text: DVarcharable, format: DVarcharable): DOtherField;
  txid_current(): DNumericField;
  typeof(expression: DAnyable): DVarcharField;
  ucase(string: DVarcharable): DVarcharField;
  unbin(value: DVarcharable): DOtherField;
  unhex(value: DVarcharable): DOtherField;
  unicode(str: DVarcharable): DNumericField;
  union_extract(union: DOtherable, tag: DVarcharable): DAnyField;
  union_tag(union: DOtherable): DAnyField;
  union_value(...args: DAnyable): DOtherField;
  unpivot_list(...args: DAnyable): DArrayField;
  upper(string: DVarcharable): DVarcharField;
  url_decode(input: DVarcharable): DVarcharField;
  url_encode(input: DVarcharable): DVarcharField;
  uuid(): DOtherField;
  vector_type(col: DAnyable): DVarcharField;
  version(): DVarcharField;
  week(ts: DOtherable): DNumericField;
  weekday(ts: DOtherable): DNumericField;
  weekofyear(ts: DOtherable): DNumericField;
  write_log(string: DVarcharable, ...args: DAnyable): DAnyField;
  xor(left: DNumericable, right: DNumericable): DNumericField;
  xor(left: DOtherable, right: DOtherable): DOtherField;
  year(ts: DOtherable): DNumericField;
  yearweek(ts: DOtherable): DNumericField;
}
export interface ITable {
  arrow_scan(col0: DOtherable, col1: DOtherable, col2: DOtherable): DOtherField;
  arrow_scan_dumb(col0: DOtherable, col1: DOtherable, col2: DOtherable): DOtherField;
  check_peg_parser(col0: DVarcharable): DOtherField;
  checkpoint(col0: DVarcharable): DOtherField;
  checkpoint(): DOtherField;
  duckdb_columns(): DOtherField;
  duckdb_constraints(): DOtherField;
  duckdb_databases(): DOtherField;
  duckdb_dependencies(): DOtherField;
  duckdb_extensions(): DOtherField;
  duckdb_functions(): DOtherField;
  duckdb_indexes(): DOtherField;
  duckdb_keywords(): DOtherField;
  duckdb_log_contexts(): DOtherField;
  duckdb_logs(): DOtherField;
  duckdb_memory(): DOtherField;
  duckdb_optimizers(): DOtherField;
  duckdb_schemas(): DOtherField;
  duckdb_secret_types(): DOtherField;
  duckdb_secrets(redact: DBoolable): DOtherField;
  duckdb_sequences(): DOtherField;
  duckdb_settings(): DOtherField;
  duckdb_table_sample(col0: DVarcharable): DOtherField;
  duckdb_tables(): DOtherField;
  duckdb_temporary_files(): DOtherField;
  duckdb_types(): DOtherField;
  duckdb_variables(): DOtherField;
  duckdb_views(): DOtherField;
  force_checkpoint(): DOtherField;
  force_checkpoint(col0: DVarcharable): DOtherField;
  generate_series(col0: DNumericable, col1: DNumericable, col2: DNumericable): DOtherField;
  generate_series(col0: DNumericable): DOtherField;
  generate_series(col0: DNumericable, col1: DNumericable): DOtherField;
  generate_series(col0: DOtherable, col1: DOtherable, col2: DOtherable): DOtherField;
  glob(col0: DArrayable): DOtherField;
  glob(col0: DVarcharable): DOtherField;
  icu_calendar_names(): DOtherField;
  json_execute_serialized_sql(col0: DVarcharable): DOtherField;
  parquet_bloom_probe(col0: DVarcharable, col1: DVarcharable, col2: DAnyable): DOtherField;
  parquet_bloom_probe(col0: DArrayable, col1: DVarcharable, col2: DAnyable): DOtherField;
  parquet_file_metadata(col0: DVarcharable): DOtherField;
  parquet_file_metadata(col0: DArrayable): DOtherField;
  parquet_kv_metadata(col0: DArrayable): DOtherField;
  parquet_kv_metadata(col0: DVarcharable): DOtherField;
  parquet_metadata(col0: DArrayable): DOtherField;
  parquet_metadata(col0: DVarcharable): DOtherField;
  parquet_scan(
    col0: DArrayable,
    opts?: Partial<
      {
        schema: DAnyable;
        fileRowNumber: DBoolable;
        debugUseOpenssl: DBoolable;
        unionByName: DBoolable;
        explicitCardinality: DNumericable;
        compression: DVarcharable;
        encryptionConfig: DAnyable;
        hivePartitioning: DBoolable;
        filename: DAnyable;
        parquetVersion: DVarcharable;
        binaryAsString: DBoolable;
        hiveTypes: DAnyable;
        hiveTypesAutocast: DBoolable;
      }
    >,
  ): DOtherField;
  parquet_scan(
    col0: DVarcharable,
    opts?: Partial<
      {
        hiveTypesAutocast: DBoolable;
        hiveTypes: DAnyable;
        binaryAsString: DBoolable;
        parquetVersion: DVarcharable;
        filename: DAnyable;
        hivePartitioning: DBoolable;
        encryptionConfig: DAnyable;
        compression: DVarcharable;
        explicitCardinality: DNumericable;
        unionByName: DBoolable;
        debugUseOpenssl: DBoolable;
        fileRowNumber: DBoolable;
        schema: DAnyable;
      }
    >,
  ): DOtherField;
  parquet_schema(col0: DArrayable): DOtherField;
  parquet_schema(col0: DVarcharable): DOtherField;
  pg_timezone_names(): DOtherField;
  pragma_collations(): DOtherField;
  pragma_database_size(): DOtherField;
  pragma_metadata_info(): DOtherField;
  pragma_metadata_info(col0: DVarcharable): DOtherField;
  pragma_platform(): DOtherField;
  pragma_show(col0: DVarcharable): DOtherField;
  pragma_storage_info(col0: DVarcharable): DOtherField;
  pragma_table_info(col0: DVarcharable): DOtherField;
  pragma_user_agent(): DOtherField;
  pragma_version(): DOtherField;
  query(col0: DVarcharable): DOtherField;
  query_table(col0: DArrayable, col1: DBoolable): DOtherField;
  query_table(col0: DArrayable): DOtherField;
  query_table(col0: DVarcharable): DOtherField;
  range(col0: DOtherable, col1: DOtherable, col2: DOtherable): DOtherField;
  range(col0: DNumericable, col1: DNumericable, col2: DNumericable): DOtherField;
  range(col0: DNumericable, col1: DNumericable): DOtherField;
  range(col0: DNumericable): DOtherField;
  read_blob(col0: DVarcharable): DOtherField;
  read_blob(col0: DArrayable): DOtherField;
  read_csv(
    col0: DVarcharable,
    opts?: Partial<
      {
        hiveTypesAutocast: DBoolable;
        hiveTypes: DAnyable;
        unionByName: DBoolable;
        filename: DAnyable;
        strictMode: DBoolable;
        dtypes: DAnyable;
        nullPadding: DBoolable;
        parallel: DBoolable;
        decimalSeparator: DVarcharable;
        bufferSize: DNumericable;
        allVarchar: DBoolable;
        storeRejects: DBoolable;
        names: DArrayable;
        compression: DVarcharable;
        ignoreErrors: DBoolable;
        rejectsScan: DVarcharable;
        quote: DVarcharable;
        maxLineSize: DVarcharable;
        types: DAnyable;
        skip: DNumericable;
        columnTypes: DAnyable;
        rejectsTable: DVarcharable;
        normalizeNames: DBoolable;
        encoding: DVarcharable;
        nullstr: DAnyable;
        autoTypeCandidates: DAnyable;
        sampleSize: DNumericable;
        autoDetect: DBoolable;
        timestampformat: DVarcharable;
        forceNotNull: DArrayable;
        rejectsLimit: DNumericable;
        columns: DAnyable;
        newLine: DVarcharable;
        maximumLineSize: DVarcharable;
        comment: DVarcharable;
        allowQuotedNulls: DBoolable;
        escape: DVarcharable;
        header: DBoolable;
        hivePartitioning: DBoolable;
        sep: DVarcharable;
        columnNames: DArrayable;
        dateformat: DVarcharable;
        delim: DVarcharable;
      }
    >,
  ): DOtherField;
  read_csv(
    col0: DArrayable,
    opts?: Partial<
      {
        delim: DVarcharable;
        dateformat: DVarcharable;
        columnNames: DArrayable;
        sep: DVarcharable;
        hivePartitioning: DBoolable;
        header: DBoolable;
        escape: DVarcharable;
        allowQuotedNulls: DBoolable;
        comment: DVarcharable;
        maximumLineSize: DVarcharable;
        newLine: DVarcharable;
        columns: DAnyable;
        rejectsLimit: DNumericable;
        forceNotNull: DArrayable;
        timestampformat: DVarcharable;
        autoDetect: DBoolable;
        sampleSize: DNumericable;
        autoTypeCandidates: DAnyable;
        nullstr: DAnyable;
        encoding: DVarcharable;
        normalizeNames: DBoolable;
        rejectsTable: DVarcharable;
        columnTypes: DAnyable;
        skip: DNumericable;
        types: DAnyable;
        maxLineSize: DVarcharable;
        quote: DVarcharable;
        rejectsScan: DVarcharable;
        ignoreErrors: DBoolable;
        compression: DVarcharable;
        names: DArrayable;
        storeRejects: DBoolable;
        allVarchar: DBoolable;
        bufferSize: DNumericable;
        decimalSeparator: DVarcharable;
        parallel: DBoolable;
        nullPadding: DBoolable;
        dtypes: DAnyable;
        strictMode: DBoolable;
        filename: DAnyable;
        unionByName: DBoolable;
        hiveTypes: DAnyable;
        hiveTypesAutocast: DBoolable;
      }
    >,
  ): DOtherField;
  read_csv_auto(
    col0: DArrayable,
    opts?: Partial<
      {
        delim: DVarcharable;
        dateformat: DVarcharable;
        columnNames: DArrayable;
        sep: DVarcharable;
        hivePartitioning: DBoolable;
        header: DBoolable;
        escape: DVarcharable;
        allowQuotedNulls: DBoolable;
        comment: DVarcharable;
        maximumLineSize: DVarcharable;
        newLine: DVarcharable;
        columns: DAnyable;
        rejectsLimit: DNumericable;
        forceNotNull: DArrayable;
        timestampformat: DVarcharable;
        autoDetect: DBoolable;
        sampleSize: DNumericable;
        autoTypeCandidates: DAnyable;
        nullstr: DAnyable;
        encoding: DVarcharable;
        normalizeNames: DBoolable;
        rejectsTable: DVarcharable;
        columnTypes: DAnyable;
        skip: DNumericable;
        types: DAnyable;
        maxLineSize: DVarcharable;
        quote: DVarcharable;
        rejectsScan: DVarcharable;
        ignoreErrors: DBoolable;
        compression: DVarcharable;
        names: DArrayable;
        storeRejects: DBoolable;
        allVarchar: DBoolable;
        bufferSize: DNumericable;
        decimalSeparator: DVarcharable;
        parallel: DBoolable;
        nullPadding: DBoolable;
        dtypes: DAnyable;
        strictMode: DBoolable;
        filename: DAnyable;
        unionByName: DBoolable;
        hiveTypes: DAnyable;
        hiveTypesAutocast: DBoolable;
      }
    >,
  ): DOtherField;
  read_csv_auto(
    col0: DVarcharable,
    opts?: Partial<
      {
        hiveTypesAutocast: DBoolable;
        hiveTypes: DAnyable;
        unionByName: DBoolable;
        filename: DAnyable;
        strictMode: DBoolable;
        dtypes: DAnyable;
        nullPadding: DBoolable;
        parallel: DBoolable;
        decimalSeparator: DVarcharable;
        bufferSize: DNumericable;
        allVarchar: DBoolable;
        storeRejects: DBoolable;
        names: DArrayable;
        compression: DVarcharable;
        ignoreErrors: DBoolable;
        rejectsScan: DVarcharable;
        quote: DVarcharable;
        maxLineSize: DVarcharable;
        types: DAnyable;
        skip: DNumericable;
        columnTypes: DAnyable;
        rejectsTable: DVarcharable;
        normalizeNames: DBoolable;
        encoding: DVarcharable;
        nullstr: DAnyable;
        autoTypeCandidates: DAnyable;
        sampleSize: DNumericable;
        autoDetect: DBoolable;
        timestampformat: DVarcharable;
        forceNotNull: DArrayable;
        rejectsLimit: DNumericable;
        columns: DAnyable;
        newLine: DVarcharable;
        maximumLineSize: DVarcharable;
        comment: DVarcharable;
        allowQuotedNulls: DBoolable;
        escape: DVarcharable;
        header: DBoolable;
        hivePartitioning: DBoolable;
        sep: DVarcharable;
        columnNames: DArrayable;
        dateformat: DVarcharable;
        delim: DVarcharable;
      }
    >,
  ): DOtherField;
  read_json(
    col0: DArrayable,
    opts?: Partial<
      {
        filename: DAnyable;
        hiveTypesAutocast: DBoolable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable;
        timestampFormat: DVarcharable;
        compression: DVarcharable;
        maximumSampleFiles: DNumericable;
        unionByName: DBoolable;
        autoDetect: DBoolable;
        maximumDepth: DNumericable;
        maximumObjectSize: DNumericable;
        ignoreErrors: DBoolable;
        format: DVarcharable;
        convertStringsToIntegers: DBoolable;
        columns: DAnyable;
        sampleSize: DNumericable;
        dateformat: DVarcharable;
        dateFormat: DVarcharable;
        fieldAppearanceThreshold: DNumericable;
        timestampformat: DVarcharable;
        records: DVarcharable;
        mapInferenceThreshold: DNumericable;
      }
    >,
  ): DOtherField;
  read_json(
    col0: DVarcharable,
    opts?: Partial<
      {
        mapInferenceThreshold: DNumericable;
        records: DVarcharable;
        timestampformat: DVarcharable;
        fieldAppearanceThreshold: DNumericable;
        dateFormat: DVarcharable;
        dateformat: DVarcharable;
        sampleSize: DNumericable;
        columns: DAnyable;
        convertStringsToIntegers: DBoolable;
        format: DVarcharable;
        ignoreErrors: DBoolable;
        maximumObjectSize: DNumericable;
        maximumDepth: DNumericable;
        autoDetect: DBoolable;
        unionByName: DBoolable;
        maximumSampleFiles: DNumericable;
        compression: DVarcharable;
        timestampFormat: DVarcharable;
        hiveTypes: DAnyable;
        hivePartitioning: DBoolable;
        hiveTypesAutocast: DBoolable;
        filename: DAnyable;
      }
    >,
  ): DOtherField;
  read_json_auto(
    col0: DArrayable,
    opts?: Partial<
      {
        filename: DAnyable;
        hiveTypesAutocast: DBoolable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable;
        timestampFormat: DVarcharable;
        compression: DVarcharable;
        maximumSampleFiles: DNumericable;
        unionByName: DBoolable;
        autoDetect: DBoolable;
        maximumDepth: DNumericable;
        maximumObjectSize: DNumericable;
        ignoreErrors: DBoolable;
        format: DVarcharable;
        convertStringsToIntegers: DBoolable;
        columns: DAnyable;
        sampleSize: DNumericable;
        dateformat: DVarcharable;
        dateFormat: DVarcharable;
        fieldAppearanceThreshold: DNumericable;
        timestampformat: DVarcharable;
        records: DVarcharable;
        mapInferenceThreshold: DNumericable;
      }
    >,
  ): DOtherField;
  read_json_auto(
    col0: DVarcharable,
    opts?: Partial<
      {
        mapInferenceThreshold: DNumericable;
        records: DVarcharable;
        timestampformat: DVarcharable;
        fieldAppearanceThreshold: DNumericable;
        dateFormat: DVarcharable;
        dateformat: DVarcharable;
        sampleSize: DNumericable;
        columns: DAnyable;
        convertStringsToIntegers: DBoolable;
        format: DVarcharable;
        ignoreErrors: DBoolable;
        maximumObjectSize: DNumericable;
        maximumDepth: DNumericable;
        autoDetect: DBoolable;
        unionByName: DBoolable;
        maximumSampleFiles: DNumericable;
        compression: DVarcharable;
        timestampFormat: DVarcharable;
        hiveTypes: DAnyable;
        hivePartitioning: DBoolable;
        hiveTypesAutocast: DBoolable;
        filename: DAnyable;
      }
    >,
  ): DOtherField;
  read_json_objects(
    col0: DArrayable,
    opts?: Partial<
      {
        filename: DAnyable;
        hiveTypesAutocast: DBoolable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable;
        compression: DVarcharable;
        unionByName: DBoolable;
        maximumObjectSize: DNumericable;
        ignoreErrors: DBoolable;
        format: DVarcharable;
      }
    >,
  ): DOtherField;
  read_json_objects(
    col0: DVarcharable,
    opts?: Partial<
      {
        format: DVarcharable;
        ignoreErrors: DBoolable;
        maximumObjectSize: DNumericable;
        unionByName: DBoolable;
        compression: DVarcharable;
        hiveTypes: DAnyable;
        hivePartitioning: DBoolable;
        hiveTypesAutocast: DBoolable;
        filename: DAnyable;
      }
    >,
  ): DOtherField;
  read_json_objects_auto(
    col0: DVarcharable,
    opts?: Partial<
      {
        format: DVarcharable;
        ignoreErrors: DBoolable;
        maximumObjectSize: DNumericable;
        unionByName: DBoolable;
        compression: DVarcharable;
        hiveTypes: DAnyable;
        hivePartitioning: DBoolable;
        hiveTypesAutocast: DBoolable;
        filename: DAnyable;
      }
    >,
  ): DOtherField;
  read_json_objects_auto(
    col0: DArrayable,
    opts?: Partial<
      {
        filename: DAnyable;
        hiveTypesAutocast: DBoolable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable;
        compression: DVarcharable;
        unionByName: DBoolable;
        maximumObjectSize: DNumericable;
        ignoreErrors: DBoolable;
        format: DVarcharable;
      }
    >,
  ): DOtherField;
  read_ndjson(
    col0: DArrayable,
    opts?: Partial<
      {
        filename: DAnyable;
        hiveTypesAutocast: DBoolable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable;
        timestampFormat: DVarcharable;
        compression: DVarcharable;
        maximumSampleFiles: DNumericable;
        unionByName: DBoolable;
        autoDetect: DBoolable;
        maximumDepth: DNumericable;
        maximumObjectSize: DNumericable;
        ignoreErrors: DBoolable;
        format: DVarcharable;
        convertStringsToIntegers: DBoolable;
        columns: DAnyable;
        sampleSize: DNumericable;
        dateformat: DVarcharable;
        dateFormat: DVarcharable;
        fieldAppearanceThreshold: DNumericable;
        timestampformat: DVarcharable;
        records: DVarcharable;
        mapInferenceThreshold: DNumericable;
      }
    >,
  ): DOtherField;
  read_ndjson(
    col0: DVarcharable,
    opts?: Partial<
      {
        mapInferenceThreshold: DNumericable;
        records: DVarcharable;
        timestampformat: DVarcharable;
        fieldAppearanceThreshold: DNumericable;
        dateFormat: DVarcharable;
        dateformat: DVarcharable;
        sampleSize: DNumericable;
        columns: DAnyable;
        convertStringsToIntegers: DBoolable;
        format: DVarcharable;
        ignoreErrors: DBoolable;
        maximumObjectSize: DNumericable;
        maximumDepth: DNumericable;
        autoDetect: DBoolable;
        unionByName: DBoolable;
        maximumSampleFiles: DNumericable;
        compression: DVarcharable;
        timestampFormat: DVarcharable;
        hiveTypes: DAnyable;
        hivePartitioning: DBoolable;
        hiveTypesAutocast: DBoolable;
        filename: DAnyable;
      }
    >,
  ): DOtherField;
  read_ndjson_auto(
    col0: DVarcharable,
    opts?: Partial<
      {
        mapInferenceThreshold: DNumericable;
        records: DVarcharable;
        timestampformat: DVarcharable;
        fieldAppearanceThreshold: DNumericable;
        dateFormat: DVarcharable;
        dateformat: DVarcharable;
        sampleSize: DNumericable;
        columns: DAnyable;
        convertStringsToIntegers: DBoolable;
        format: DVarcharable;
        ignoreErrors: DBoolable;
        maximumObjectSize: DNumericable;
        maximumDepth: DNumericable;
        autoDetect: DBoolable;
        unionByName: DBoolable;
        maximumSampleFiles: DNumericable;
        compression: DVarcharable;
        timestampFormat: DVarcharable;
        hiveTypes: DAnyable;
        hivePartitioning: DBoolable;
        hiveTypesAutocast: DBoolable;
        filename: DAnyable;
      }
    >,
  ): DOtherField;
  read_ndjson_auto(
    col0: DArrayable,
    opts?: Partial<
      {
        filename: DAnyable;
        hiveTypesAutocast: DBoolable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable;
        timestampFormat: DVarcharable;
        compression: DVarcharable;
        maximumSampleFiles: DNumericable;
        unionByName: DBoolable;
        autoDetect: DBoolable;
        maximumDepth: DNumericable;
        maximumObjectSize: DNumericable;
        ignoreErrors: DBoolable;
        format: DVarcharable;
        convertStringsToIntegers: DBoolable;
        columns: DAnyable;
        sampleSize: DNumericable;
        dateformat: DVarcharable;
        dateFormat: DVarcharable;
        fieldAppearanceThreshold: DNumericable;
        timestampformat: DVarcharable;
        records: DVarcharable;
        mapInferenceThreshold: DNumericable;
      }
    >,
  ): DOtherField;
  read_ndjson_objects(
    col0: DVarcharable,
    opts?: Partial<
      {
        format: DVarcharable;
        ignoreErrors: DBoolable;
        maximumObjectSize: DNumericable;
        unionByName: DBoolable;
        compression: DVarcharable;
        hiveTypes: DAnyable;
        hivePartitioning: DBoolable;
        hiveTypesAutocast: DBoolable;
        filename: DAnyable;
      }
    >,
  ): DOtherField;
  read_ndjson_objects(
    col0: DArrayable,
    opts?: Partial<
      {
        filename: DAnyable;
        hiveTypesAutocast: DBoolable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable;
        compression: DVarcharable;
        unionByName: DBoolable;
        maximumObjectSize: DNumericable;
        ignoreErrors: DBoolable;
        format: DVarcharable;
      }
    >,
  ): DOtherField;
  read_parquet(
    col0: DVarcharable,
    opts?: Partial<
      {
        hiveTypesAutocast: DBoolable;
        hiveTypes: DAnyable;
        binaryAsString: DBoolable;
        parquetVersion: DVarcharable;
        filename: DAnyable;
        hivePartitioning: DBoolable;
        encryptionConfig: DAnyable;
        compression: DVarcharable;
        explicitCardinality: DNumericable;
        unionByName: DBoolable;
        debugUseOpenssl: DBoolable;
        fileRowNumber: DBoolable;
        schema: DAnyable;
      }
    >,
  ): DOtherField;
  read_parquet(
    col0: DArrayable,
    opts?: Partial<
      {
        schema: DAnyable;
        fileRowNumber: DBoolable;
        debugUseOpenssl: DBoolable;
        unionByName: DBoolable;
        explicitCardinality: DNumericable;
        compression: DVarcharable;
        encryptionConfig: DAnyable;
        hivePartitioning: DBoolable;
        filename: DAnyable;
        parquetVersion: DVarcharable;
        binaryAsString: DBoolable;
        hiveTypes: DAnyable;
        hiveTypesAutocast: DBoolable;
      }
    >,
  ): DOtherField;
  read_text(col0: DVarcharable): DOtherField;
  read_text(col0: DArrayable): DOtherField;
  repeat(col0: DAnyable, col1: DNumericable): DOtherField;
  repeat_row(numRows: DNumericable, ...args: DAnyable): DOtherField;
  seq_scan(): DOtherField;
  sniff_csv(
    col0: DVarcharable,
    opts?: Partial<
      {
        delim: DVarcharable;
        dateformat: DVarcharable;
        columnNames: DArrayable;
        sep: DVarcharable;
        hivePartitioning: DBoolable;
        header: DBoolable;
        escape: DVarcharable;
        allowQuotedNulls: DBoolable;
        comment: DVarcharable;
        maximumLineSize: DVarcharable;
        newLine: DVarcharable;
        columns: DAnyable;
        rejectsLimit: DNumericable;
        forceNotNull: DArrayable;
        timestampformat: DVarcharable;
        autoDetect: DBoolable;
        sampleSize: DNumericable;
        autoTypeCandidates: DAnyable;
        nullstr: DAnyable;
        encoding: DVarcharable;
        normalizeNames: DBoolable;
        rejectsTable: DVarcharable;
        columnTypes: DAnyable;
        skip: DNumericable;
        types: DAnyable;
        maxLineSize: DVarcharable;
        quote: DVarcharable;
        rejectsScan: DVarcharable;
        ignoreErrors: DBoolable;
        compression: DVarcharable;
        names: DArrayable;
        forceMatch: DBoolable;
        storeRejects: DBoolable;
        allVarchar: DBoolable;
        bufferSize: DNumericable;
        decimalSeparator: DVarcharable;
        parallel: DBoolable;
        nullPadding: DBoolable;
        dtypes: DAnyable;
        strictMode: DBoolable;
        filename: DAnyable;
        unionByName: DBoolable;
        hiveTypes: DAnyable;
        hiveTypesAutocast: DBoolable;
      }
    >,
  ): DOtherField;
  sql_auto_complete(col0: DVarcharable): DOtherField;
  summary(col0: DOtherable): DOtherField;
  test_all_types(useLargeEnum: DBoolable): DOtherField;
  test_vector_types(col0: DAnyable, allFlat: DBoolable, ...args: DAnyable): DOtherField;
  unnest(col0: DAnyable): DOtherField;
  which_secret(col0: DVarcharable, col1: DVarcharable): DOtherField;
}
