import { isString } from "es-toolkit";
import { wrap } from "./utils";

type Numericable = number | NumericField;
type Stringable = string | StringField;
type Whateverable = any | WhateverField;

export interface WhateverField {
  /** (INTERVAL, INTERVAL): INTERVAL | , eg: undefined */
  add(col1?: Whateverable | Numericable): WhateverField;
  /** (TINYINT, TINYINT): TINYINT | Bitwise XOR, eg: (17).xor(5) */
  xor(right: Numericable | Whateverable): NumericField;
  /** (FLOAT[3], FLOAT[3]): FLOAT[3] | Compute the cross product of two arrays of size 3. The array elements can not be NULL., eg: ([1).array_cross_product(2, 3], [1, 2, 3]) */
  array_cross_product(p1: Whateverable): WhateverField;
  /** (ANY[]): ANY[] | Removes all duplicates and NULLs from a list. Does not preserve the original order, eg: ([1).list_distinct(1, NULL, -3, 1, 5]) */
  array_distinct(): WhateverField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the array., eg: ('DuckDB').array_extract(2) */
  array_extract(index: Numericable | Stringable): WhateverField;
  /** (ANY[], ANY): BOOLEAN | Returns true if the list contains the element., eg: ([1).list_contains(2, NULL], 1) */
  array_has(element: Whateverable): WhateverField;
  /** (ANY): VARCHAR | Returns the VectorType of a given column, eg: vector_type(col) */
  vector_type(): StringField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Sorts the elements of the list, eg: ([3).list_sort(6, 1, 2]) */
  array_sort(col1?: Stringable, col2?: Stringable): WhateverField;
  /** (UNION, VARCHAR): ANY | Extract the value with the named tags from the union. NULL if the tag is not currently selected, eg: (s).union_extract('k') */
  union_extract(tag: Stringable): WhateverField;
  /** (AGGREGATE_STATE<?>, ANY): AGGREGATE_STATE<?> | , eg: undefined */
  combine(col1: Whateverable): WhateverField;
  /** (VARCHAR, VARCHAR): BOOLEAN | Returns true if search_string is found within string., eg: ('abc').contains('a') */
  contains(searchStr: Stringable | Whateverable): WhateverField;
  /** (DATE): BIGINT | Extract the epoch component in nanoseconds from a temporal type, eg: epoch_ns(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ns(): NumericField;
  /** (TIMESTAMP, TIMESTAMP, BIGINT, BOOLEAN): ANY[] | Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged, eg: (0).equi_width_bins(10, 2, true) */
  equi_width_bins(max: Whateverable | Numericable, binCount: Numericable, niceRounding: Whateverable): WhateverField;
  /** (BIGINT, BIGINT, BIGINT): BIGINT[] | Create a list of values between start and stop - the stop parameter is inclusive, eg: (2).generate_series(5, 3) */
  generate_series(stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField;
  /** (BIGINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex(): StringField;
  /** (DATE): BIGINT | Extract the isodow component from a date or timestamp, eg: isodow(timestamp '2021-08-03 11:59:44.123456') */
  isodow(): NumericField;
  /** (DATE): BIGINT | Extract the isoyear component from a date or timestamp, eg: isoyear(timestamp '2021-08-03 11:59:44.123456') */
  isoyear(): NumericField;
  /** (JSON, VARCHAR): UBIGINT | , eg: undefined */
  json_array_length(col1?: Stringable | Whateverable): NumericField;
  /** (VARCHAR, VARCHAR[]): JSON[] | , eg: undefined */
  json_extract_path(col1: Whateverable | Numericable | Stringable): WhateverField;
  /** (JSON, VARCHAR): VARCHAR | , eg: undefined */
  json_extract_string(col1: Stringable | Numericable | Whateverable): StringField;
  /** (UBIGINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  to_binary(): StringField;
  /** (VARCHAR, VARCHAR[]): VARCHAR[][] | , eg: undefined */
  json_keys(col1?: Whateverable | Stringable): WhateverField;
  /** (VARCHAR): JSON | , eg: undefined */
  json_structure(): WhateverField;
  /** (JSON, VARCHAR): VARCHAR | , eg: undefined */
  json_type(col1?: Stringable | Whateverable): StringField;
  /** (JSON, BIGINT): VARCHAR | , eg: undefined */
  json_value(col1: Numericable | Whateverable | Stringable): StringField;
  /** (DATE): DOUBLE | Extract the Julian Day number from a date or timestamp, eg: julian(timestamp '2006-01-01 12:00') */
  julian(): NumericField;
  /** (INTERVAL, DATE, DATE): DATE | Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets, eg: (INTERVAL '2 weeks').time_bucket(TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07') */
  time_bucket(timestamp: Whateverable, origin?: Whateverable | Stringable): WhateverField;
  /** (DATE): BIGINT | Extract the timezone_hour component from a date or timestamp, eg: timezone_hour(timestamp '2021-08-03 11:59:44.123456') */
  timezone_hour(): NumericField;
  /** (ANY[], ANY[]): ANY[] | Concatenates two lists., eg: ([2).list_concat(3], [4, 5, 6]) */
  list_concat(list2: Whateverable): WhateverField;
  /** (ANY[], ANY): BOOLEAN | Returns true if the list contains the element., eg: ([1).list_contains(2, NULL], 1) */
  list_has(element: Whateverable): WhateverField;
  /** (STRUCT, BIGINT): ANY | Extract the named entry from the STRUCT., eg: ({'i': 3).struct_extract('v2': 3, 'v3': 0}, 'i') */
  struct_extract(entry: Numericable | Stringable): WhateverField;
  /** (ANY[], ANY[]): BOOLEAN | Returns true if the lists have any element in common. NULLs are ignored., eg: ([1).list_has_any(2, 3], [2, 3, 4]) */
  list_has_any(p1: Whateverable): WhateverField;
  /** (DATE, VARCHAR): VARCHAR | Converts a date to a string according to the format string., eg: (date '1992-01-01').strftime('%a, %-d %B %Y') */
  strftime(format: Stringable | Whateverable): StringField;
  /** (ANY[], ANY): INTEGER | Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: ([1).list_position(2, NULL], 2) */
  list_position(element: Whateverable): NumericField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Sorts the elements of the list, eg: ([3).list_sort(6, 1, 2]) */
  list_sort(col1?: Stringable, col2?: Stringable): WhateverField;
  /** (MAP(ANY, ANY), ANY): BOOLEAN | Checks if a map contains a given key., eg: (MAP {'key1': 10).map_contains('key2': 20, 'key3': 30}, 'key2') */
  map_contains(key: Whateverable): WhateverField;
  /** (ANY, ANY): ANY | Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: (['key']).map_extract(map(['val']), 'key') */
  map_extract(key: Whateverable): WhateverField;
  /** (DATE): BIGINT | Extract the microsecond component from a date or timestamp, eg: microsecond(timestamp '2021-08-03 11:59:44.123456') */
  microsecond(): NumericField;
  /** (VARCHAR): VARCHAR | Returns the SHA256 hash of the value, eg: sha256('hello') */
  sha256(): StringField;
  /** (DATE): VARCHAR | The (English) name of the month, eg: monthname(TIMESTAMP '1992-09-20') */
  monthname(): StringField;
  /** (TINYINT, TINYINT): TINYINT | , eg: undefined */
  multiply(col1: Numericable | Whateverable): NumericField;
  /** (BIGINT, BIGINT, BIGINT): BIGINT[] | Create a list of values between start and stop - the stop parameter is exclusive, eg: (2).range(5, 3) */
  range(stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField;
  /** (VARCHAR, BIGINT): VARCHAR | Repeats the string count number of times, eg: ('A').repeat(5) */
  repeat(count: Numericable): StringField;
  /** (DATE): BIGINT | Extract the weekday component from a date or timestamp, eg: weekday(timestamp '2021-08-03 11:59:44.123456') */
  weekday(): NumericField;
  /** (ANY[], ANY): BOOLEAN | Returns true if the list contains the element., eg: ([1).list_contains(2, NULL], 1) */
  array_contains(element: Whateverable): WhateverField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_inner_product(2, 3], [1, 2, 3]) */
  array_dot_product(array2: Whateverable): NumericField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Returns the index of their sorted position., eg: ([3).list_grade_up(6, 1, 2]) */
  array_grade_up(col1?: Stringable, col2?: Stringable): WhateverField;
  /** (ANY[], ANY[]): BOOLEAN | Returns true if all elements of l2 are in l1. NULLs are ignored., eg: ([1).list_has_all(2, 3], [2, 3]) */
  array_has_all(p1: Whateverable): WhateverField;
  /** (ANY[], VARCHAR): ANY[] | Sorts the elements of the list in reverse order, eg: ([3).list_reverse_sort(6, 1, 2]) */
  array_reverse_sort(col1?: Stringable): WhateverField;
  /** (ANY, ANY, ANY, BIGINT): ANY | Extract a sublist using slice conventions. Negative values are accepted., eg: ([4).list_slice(5, 6], 2, 3) */
  array_slice(begin: Whateverable, end: Whateverable, step?: Numericable): WhateverField;
  /** (ANY, ANY): ANY | If arg2 is NULL, return NULL. Otherwise, return arg1., eg: (42).constant_or_null(NULL) */
  constant_or_null(arg2: Whateverable): WhateverField;
  /** (VARCHAR[], DATE): STRUCT() | Get subfield (equivalent to extract), eg: ('minute').date_part(TIMESTAMP '1992-09-20 20:38:40') */
  date_part(col1: Whateverable): WhateverField;
  /** (DATE): BIGINT | Extract the dayofmonth component from a date or timestamp, eg: dayofmonth(timestamp '2021-08-03 11:59:44.123456') */
  dayofmonth(): NumericField;
  /** (BLOB): VARCHAR | Convert blob to varchar. Fails if blob is not valid utf-8, eg: decode('\xC3\xBC'::BLOB) */
  decode(): StringField;
  /** (ANY): UBIGINT | Returns an integer with the hash of the value. Note that this is not a cryptographic hash, eg: hash('🦆') */
  hash(): NumericField;
  /** (FLOAT): BOOLEAN | Returns true if the floating point value is infinite, false otherwise, eg: isinf('Infinity'::float) */
  isinf(): WhateverField;
  /** (VARCHAR, BIGINT): JSON | , eg: undefined */
  json_extract(col1: Numericable | Whateverable | Stringable): WhateverField;
  /** (JSON, VARCHAR[]): VARCHAR[] | , eg: undefined */
  json_extract_path_text(col1: Whateverable | Numericable | Stringable): WhateverField;
  /** (BLOB): VARCHAR | Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  to_base64(): StringField;
  /** (DATE): DATE | Returns the last day of the month, eg: last_day(TIMESTAMP '1992-03-22 01:02:03.1234') */
  last_day(): WhateverField;
  /** (VARCHAR): BIGINT | Number of characters in string., eg: length('Hello🦆') */
  len(): NumericField;
  /** (DATE, DATE): BIGINT | , eg: undefined */
  subtract(col1?: Whateverable | Numericable): NumericField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the cosine similarity between two lists, eg: ([1).list_cosine_similarity(2, 3], [1, 2, 3]) */
  list_cosine_similarity(list2: Whateverable): NumericField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_extract(index: Numericable): WhateverField;
  /** (ANY[], LAMBDA): ANY[] | Constructs a list from those elements of the input list for which the lambda function returns true, eg: ([3).list_filter(4, 5], x -> x > 4) */
  list_filter(lambda: Whateverable): WhateverField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the inner product between two lists, eg: ([1).list_inner_product(2, 3], [1, 2, 3]) */
  list_inner_product(list2: Whateverable): NumericField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the negative inner product between two lists, eg: ([1).list_negative_inner_product(2, 3], [1, 2, 3]) */
  list_negative_dot_product(list2: Whateverable): NumericField;
  /** (ANY[], ANY, ANY): ANY[] | Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: ([1).list_resize(2, 3], 5, 0) */
  list_resize(size: Whateverable, value?: Whateverable): WhateverField;
  /** (ANY[], VARCHAR): ANY[] | Sorts the elements of the list in reverse order, eg: ([3).list_reverse_sort(6, 1, 2]) */
  list_reverse_sort(col1?: Stringable): WhateverField;
  /** (VARCHAR): VARCHAR | Returns the SHA1 hash of the value, eg: sha1('hello') */
  sha1(): StringField;
  /** (ANY[], LAMBDA): ANY | Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: (x).list_reduce([1, 2, 3], (y) -> x + y) */
  reduce(lambda: Whateverable): WhateverField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  array_aggregate(name: Stringable): WhateverField;
  /** (ANY[], ANY[]): ANY[] | Concatenates two lists., eg: ([2).list_concat(3], [4, 5, 6]) */
  array_cat(list2: Whateverable): WhateverField;
  /** (ANY[], BIGINT): BIGINT | Returns the length of the list., eg: ([1).array_length(2,3]) */
  array_length(col1?: Numericable): NumericField;
  /** (ANY[], ANY): INTEGER | Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: ([1).list_position(2, NULL], 2) */
  array_position(element: Whateverable): NumericField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  array_transform(lambda: Whateverable): WhateverField;
  /** (ANY[]): UBIGINT | Counts the unique elements of a list, eg: ([1).list_unique(1, NULL, -3, 1, 5]) */
  array_unique(): NumericField;
  /** (BIT, INTEGER): BIT | Pads the bitstring until the specified length, eg: ('1010'::BIT).bitstring(7) */
  bitstring(length: Numericable): WhateverField;
  /** (ANY, ANY): BOOLEAN | Whether or not we can implicitly cast from the source type to the other type, eg: (NULL::INTEGER).can_implicitly_cast(NULL::BIGINT) */
  can_cast_implicitly(targetType: Whateverable): WhateverField;
  /** (ANY): VARCHAR | Returns the name of the data type of the result of the expression, eg: typeof('abc') */
  typeof(): StringField;
  /** (DATE): BIGINT | Extract the day component from a date or timestamp, eg: day(timestamp '2021-08-03 11:59:44.123456') */
  day(): NumericField;
  /** (DATE): BIGINT | Extract the dayofyear component from a date or timestamp, eg: dayofyear(timestamp '2021-08-03 11:59:44.123456') */
  dayofyear(): NumericField;
  /** (DATE): BIGINT | Extract the decade component from a date or timestamp, eg: decade(timestamp '2021-08-03 11:59:44.123456') */
  decade(): NumericField;
  /** (ANY, ANY): VARCHAR[] | Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type, eg: (NULL).enum_range_boundary('happy'::mood) */
  enum_range_boundary(end: Whateverable): WhateverField;
  /** (DATE): BIGINT | Extract the epoch component in milliseconds from a temporal type, eg: epoch_ms(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ms(): NumericField;
  /** (DATE): BIGINT | Extract the epoch component in microseconds from a temporal type, eg: epoch_us(timestamp '2021-08-03 11:59:44.123456') */
  epoch_us(): NumericField;
  /** (DATE): BIGINT | Extract the era component from a date or timestamp, eg: era(timestamp '2021-08-03 11:59:44.123456') */
  era(): NumericField;
  /** (JSON, VARCHAR): ANY | , eg: undefined */
  from_json(col1: Stringable): WhateverField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Returns the index of their sorted position., eg: ([3).list_grade_up(6, 1, 2]) */
  grade_up(col1?: Stringable, col2?: Stringable): WhateverField;
  /** (VARINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  hex(): StringField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  json_contains(col1: Stringable | Whateverable): WhateverField;
  /** (JSON, VARCHAR[]): BOOLEAN[] | , eg: undefined */
  json_exists(col1: Whateverable | Stringable): WhateverField;
  /** (VARCHAR, VARCHAR): ANY | , eg: undefined */
  json_transform(col1: Stringable): WhateverField;
  /** (JSON): BOOLEAN | , eg: undefined */
  json_valid(): WhateverField;
  /** (ANY): ANY | Returns the lowest value of the set of input parameters, eg: (42).least(84) */
  least(): WhateverField;
  /** (ANY[]): ANY[] | Removes all duplicates and NULLs from a list. Does not preserve the original order, eg: ([1).list_distinct(1, NULL, -3, 1, 5]) */
  list_distinct(): WhateverField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the inner product between two lists, eg: ([1).list_inner_product(2, 3], [1, 2, 3]) */
  list_dot_product(list2: Whateverable): NumericField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_element(index: Numericable): WhateverField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  list_transform(lambda: Whateverable): WhateverField;
  /** (TIMESTAMP, TIMESTAMP): INTERVAL | Subtract arguments, resulting in the time difference between the two timestamps, eg: (TIMESTAMP '2001-04-10').age(TIMESTAMP '1992-09-20') */
  age(): WhateverField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  aggregate(name: Stringable): WhateverField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  apply(lambda: Whateverable): WhateverField;
  /** (ANY[], ANY[]): ANY[] | Concatenates two lists., eg: ([2).list_concat(3], [4, 5, 6]) */
  array_concat(list2: Whateverable): WhateverField;
  /** (ANY[], ANY[]): BOOLEAN | Returns true if the lists have any element in common. NULLs are ignored., eg: ([1).list_has_any(2, 3], [2, 3, 4]) */
  array_has_any(p1: Whateverable): WhateverField;
  /** (ANY[], BIGINT[]): ANY[] | Returns a list based on the elements selected by the index_list., eg: ([10).list_select(20, 30, 40], [1, 4]) */
  array_select(indexList: Whateverable): WhateverField;
  /** (VARCHAR): BIGINT | , eg: undefined */
  bit_length(): NumericField;
  /** (DATE): BIGINT | Extract the century component from a date or timestamp, eg: century(timestamp '2021-08-03 11:59:44.123456') */
  century(): NumericField;
  /** (ANY[], LAMBDA): ANY[] | Constructs a list from those elements of the input list for which the lambda function returns true, eg: ([3).list_filter(4, 5], x -> x > 4) */
  filter(lambda: Whateverable): WhateverField;
  /** (AGGREGATE_STATE<?>): INVALID | , eg: undefined */
  finalize(): WhateverField;
  /** (ANY[][]): ANY[] | Flatten a nested list by one level, eg: ([[1).flatten(2, 3], [4, 5]]) */
  flatten(): WhateverField;
  /** (BIT, INTEGER): INTEGER | Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0, eg: ('0110010'::BIT).get_bit(2) */
  get_bit(index: Numericable): NumericField;
  /** (DATE): BIGINT | Extract the hour component from a date or timestamp, eg: hour(timestamp '2021-08-03 11:59:44.123456') */
  hour(): NumericField;
  /** (JSON): VARCHAR | , eg: undefined */
  json_pretty(): StringField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  list_aggregate(name: Stringable): WhateverField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the distance between two lists, eg: ([1).list_distance(2, 3], [1, 2, 3]) */
  list_distance(list2: Whateverable): NumericField;
  /** (VARCHAR): VARCHAR | Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5(): StringField;
  /** (DATE): BIGINT | Extract the millennium component from a date or timestamp, eg: millennium(timestamp '2021-08-03 11:59:44.123456') */
  millennium(): NumericField;
  /** (DATE): BIGINT | Extract the weekofyear component from a date or timestamp, eg: weekofyear(timestamp '2021-08-03 11:59:44.123456') */
  weekofyear(): NumericField;
  /** (DATE): BIGINT | Extract the week component from a date or timestamp, eg: week(timestamp '2021-08-03 11:59:44.123456') */
  week(): NumericField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_cosine_distance(2, 3], [1, 2, 3]) */
  array_cosine_distance(array2: Whateverable): NumericField;
  /** (ANY[], LAMBDA): ANY | Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: (x).list_reduce([1, 2, 3], (y) -> x + y) */
  array_reduce(lambda: Whateverable): WhateverField;
  /** (BLOB): VARCHAR | Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  base64(): StringField;
  /** (BIT): BIGINT | Returns the number of bits that are set, eg: bit_count(31) */
  bit_count(): NumericField;
  /** (ANY): ANY | Concatenate many strings together., eg: ('Hello').concat(' ', 'World') */
  concat(): WhateverField;
  /** (ANY): BLOB | Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers, eg: ('A').create_sort_key('DESC') */
  create_sort_key(): WhateverField;
  /** (ANY): VARCHAR[] | Returns all values of the input enum type as an array, eg: enum_range(NULL::mood) */
  enum_range(): WhateverField;
  /** (DATE): BOOLEAN | Returns true if the floating point value is finite, false otherwise, eg: isfinite(5.5) */
  isfinite(): WhateverField;
  /** (VARCHAR): BIGINT | Number of characters in string., eg: length('Hello🦆') */
  length(): NumericField;
  /** (INTERVAL, TIME WITH TIME ZONE): TIME WITH TIME ZONE | Extract the timezone component from a date or timestamp, eg: timezone(timestamp '2021-08-03 11:59:44.123456') */
  timezone(col1?: Whateverable): NumericField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  list_apply(lambda: Whateverable): WhateverField;
  /** (ANY, ANY, ANY, BIGINT): ANY | Extract a sublist using slice conventions. Negative values are accepted., eg: ([4).list_slice(5, 6], 2, 3) */
  list_slice(begin: Whateverable, end: Whateverable, step?: Numericable): WhateverField;
  /** (BIGINT, BIGINT, BIGINT): DATE | The date for the given struct., eg: ({'year': 2024).make_date('month': 11, 'day': 14}) */
  make_date(month?: Numericable, day?: Numericable): WhateverField;
  /** (ANY, ANY): ANY | Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: (['key']).map_extract_value(map(['val']), 'key') */
  map_extract_value(key: Whateverable): WhateverField;
  /** (VARCHAR): HUGEINT | Returns the MD5 hash of the value as an INT128, eg: md5_number('123') */
  md5_number(): NumericField;
  /** (DATE): BIGINT | Extract the millisecond component from a date or timestamp, eg: millisecond(timestamp '2021-08-03 11:59:44.123456') */
  millisecond(): NumericField;
  /** (DATE): BIGINT | Extract the month component from a date or timestamp, eg: month(timestamp '2021-08-03 11:59:44.123456') */
  month(): NumericField;
  /** (DATE): BIGINT | Extract the nanosecond component from a date or timestamp, eg: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789 */
  nanosecond(): NumericField;
  /** (BLOB): BIGINT | Number of bytes in blob., eg: octet_length('\xAA\xBB'::BLOB) */
  octet_length(): NumericField;
  /** (DATE): BIGINT | Extract the quarter component from a date or timestamp, eg: quarter(timestamp '2021-08-03 11:59:44.123456') */
  quarter(): NumericField;
  /** (DATE): BIGINT | Extract the yearweek component from a date or timestamp, eg: yearweek(timestamp '2021-08-03 11:59:44.123456') */
  yearweek(): NumericField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  array_aggr(name: Stringable): WhateverField;
  /** (ANY[], LAMBDA): ANY[] | Constructs a list from those elements of the input list for which the lambda function returns true, eg: ([3).list_filter(4, 5], x -> x > 4) */
  array_filter(lambda: Whateverable): WhateverField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_inner_product(2, 3], [1, 2, 3]) */
  array_inner_product(array2: Whateverable): NumericField;
  /** (ANY[], ANY, ANY): ANY[] | Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: ([1).list_resize(2, 3], 5, 0) */
  array_resize(size: Whateverable, value?: Whateverable): WhateverField;
  /** (VARINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  bin(): StringField;
  /** (UNION): ANY | Retrieve the currently selected tag of the union as an ENUM, eg: union_tag(union_value(k := 'foo')) */
  union_tag(): WhateverField;
  /** (DATE): BIGINT | Extract the dayofweek component from a date or timestamp, eg: dayofweek(timestamp '2021-08-03 11:59:44.123456') */
  dayofweek(): NumericField;
  /** (ANY, ANY): ANY | Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: (['key']).map_extract(map(['val']), 'key') */
  element_at(key: Whateverable): WhateverField;
  /** (ANY): VARCHAR | Returns the first value of the input enum type, eg: enum_first(NULL::mood) */
  enum_first(): StringField;
  /** (JSON, VARCHAR): ANY | , eg: undefined */
  json_transform_strict(col1: Stringable): WhateverField;
  /** (TIME WITH TIME ZONE): UBIGINT | Converts a TIME WITH TIME ZONE to an integer sort key, eg: timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ) */
  timetz_byte_comparable(): NumericField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  list_aggr(name: Stringable): WhateverField;
  /** (ANY[], ANY[]): ANY[] | Concatenates two lists., eg: ([2).list_concat(3], [4, 5, 6]) */
  list_cat(list2: Whateverable): WhateverField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Returns the index of their sorted position., eg: ([3).list_grade_up(6, 1, 2]) */
  list_grade_up(col1?: Stringable, col2?: Stringable): WhateverField;
  /** (ANY[], LAMBDA): ANY | Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: (x).list_reduce([1, 2, 3], (y) -> x + y) */
  list_reduce(lambda: Whateverable): WhateverField;
  /** (ANY[], ANY[]): BOOLEAN | Returns true if all elements of l2 are in l1. NULLs are ignored., eg: ([1).list_has_all(2, 3], [2, 3]) */
  list_has_all(p1: Whateverable): WhateverField;
  /** (ANY[], BIGINT[]): ANY[] | Returns a list based on the elements selected by the index_list., eg: ([10).list_select(20, 30, 40], [1, 4]) */
  list_select(indexList: Whateverable): WhateverField;
  /** (INTERVAL): INTERVAL | Normalizes an INTERVAL to an equivalent interval, eg: normalized_interval(INTERVAL '30 days') */
  normalized_interval(): WhateverField;
  /** (DATE): BIGINT | Extract the second component from a date or timestamp, eg: second(timestamp '2021-08-03 11:59:44.123456') */
  second(): NumericField;
  /** (DATE): BIGINT | Extract the year component from a date or timestamp, eg: year(timestamp '2021-08-03 11:59:44.123456') */
  year(): NumericField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_distance(2, 3], [1, 2, 3]) */
  array_distance(array2: Whateverable): NumericField;
  /** (ANY[], ANY): INTEGER | Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: ([1).list_position(2, NULL], 2) */
  array_indexof(element: Whateverable): NumericField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_negative_inner_product(2, 3], [1, 2, 3]) */
  array_negative_inner_product(array2: Whateverable): NumericField;
  /** (ANY[], BOOLEAN[]): ANY[] | Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list., eg: ([10).list_where(20, 30, 40], [true, false, false, true]) */
  array_where(maskList: Whateverable): WhateverField;
  /** (BIT, BIT): INTEGER | Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1, eg: ('010'::BIT).bit_position('1110101'::BIT) */
  bit_position(bitstr: Whateverable): NumericField;
  /** (ANY): UBIGINT | Returns the size of the map (or the number of entries in the map), eg: ([4).cardinality( map(2], ['a', 'b']) ); */
  cardinality(): NumericField;
  /** (VARCHAR[], DATE): STRUCT() | Get subfield (equivalent to extract), eg: ('minute').date_part(TIMESTAMP '1992-09-20 20:38:40') */
  datepart(col1: Whateverable): WhateverField;
  /** (VARCHAR, VARCHAR): ANY | , eg: undefined */
  from_json_strict(col1: Stringable): WhateverField;
  /** (ANY): ANY | Returns the highest value of the set of input parameters, eg: (42).greatest(84) */
  greatest(): WhateverField;
  /** (ANY): BOOLEAN | Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin), eg: is_histogram_other_bin(v) */
  is_histogram_other_bin(): WhateverField;
  /** (DATE): BIGINT | Extract the timezone_minute component from a date or timestamp, eg: timezone_minute(timestamp '2021-08-03 11:59:44.123456') */
  timezone_minute(): NumericField;
  /** (ANY[], ANY): BOOLEAN | Returns true if the list contains the element., eg: ([1).list_contains(2, NULL], 1) */
  list_contains(element: Whateverable): WhateverField;
  /** (ANY[]): UBIGINT | Counts the unique elements of a list, eg: ([1).list_unique(1, NULL, -3, 1, 5]) */
  list_unique(): NumericField;
  /** (ANY[], BOOLEAN[]): ANY[] | Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list., eg: ([10).list_where(20, 30, 40], [true, false, false, true]) */
  list_where(maskList: Whateverable): WhateverField;
  /** (ANY): VARCHAR | Returns the name of a given expression, eg: alias(42 + 1) */
  alias(): StringField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  array_apply(lambda: Whateverable): WhateverField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_cosine_similarity(2, 3], [1, 2, 3]) */
  array_cosine_similarity(array2: Whateverable): NumericField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_negative_inner_product(2, 3], [1, 2, 3]) */
  array_negative_dot_product(array2: Whateverable): NumericField;
  /** (DATE): VARCHAR | The (English) name of the weekday, eg: dayname(TIMESTAMP '1992-03-22') */
  dayname(): StringField;
  /** (ANY): ANY | Returns the numeric value backing the given enum value, eg: enum_code('happy'::mood) */
  enum_code(): WhateverField;
  /** (ANY): VARCHAR | Returns the last value of the input enum type, eg: enum_last(NULL::mood) */
  enum_last(): StringField;
  /** (DATE): DOUBLE | Extract the epoch component from a temporal type, eg: epoch(timestamp '2021-08-03 11:59:44.123456') */
  epoch(): NumericField;
  /** (JSON): VARCHAR | , eg: undefined */
  json_deserialize_sql(): StringField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the cosine distance between two lists, eg: ([1).list_cosine_distance(2, 3], [1, 2, 3]) */
  list_cosine_distance(list2: Whateverable): NumericField;
  /** (STRUCT, BIGINT): ANY | Extract the entry from the STRUCT by position (starts at 1!)., eg: ({'i': 3).struct_extract_at('v2': 3, 'v3': 0}, 2) */
  struct_extract_at(entry: Numericable): WhateverField;
  /** (ANY[], ANY): INTEGER | Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: ([1).list_position(2, NULL], 2) */
  list_indexof(element: Whateverable): NumericField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the negative inner product between two lists, eg: ([1).list_negative_inner_product(2, 3], [1, 2, 3]) */
  list_negative_inner_product(list2: Whateverable): NumericField;
  /** (DATE): BIGINT | Extract the minute component from a date or timestamp, eg: minute(timestamp '2021-08-03 11:59:44.123456') */
  minute(): NumericField;
  /** (BIT, INTEGER, INTEGER): BIT | Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring, eg: ('0110010'::BIT).set_bit(2, 0) */
  set_bit(index: Numericable, newValue: Numericable): WhateverField;

  /** Convert the operation chain to a SQL string */
  toString(): string;
}

/**
 * Interface for string field operations
 * Defines methods that can be called on string fields in DuckDB
 */
export interface StringField {
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the array., eg: ('DuckDB').array_extract(2) */
  array_extract(index: Numericable | Stringable): WhateverField;
  /** (VARCHAR): VARCHAR | Escapes the input string by encoding it so that it can be included in a URL query parameter., eg: url_encode('this string has/ special+ characters>') */
  url_encode(): StringField;
  /** (VARCHAR, VARCHAR): BOOLEAN | Returns true if search_string is found within string., eg: ('abc').contains('a') */
  contains(searchStr: Stringable | Whateverable): WhateverField;
  /** (VARCHAR, VARCHAR): TIMESTAMP | Converts the string text to timestamp according to the format string. Returns NULL on failure., eg: ('Wed).try_strptime(1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p') */
  try_strptime(format: Stringable | Whateverable): WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different, eg: ('hello').damerau_levenshtein('world') */
  damerau_levenshtein(str2: Stringable): NumericField;
  /** (BIGINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex(): StringField;
  /** (VARCHAR, VARCHAR): VARCHAR | , eg: undefined */
  icu_sort_key(col1: Stringable): StringField;
  /** (JSON, VARCHAR): UBIGINT | , eg: undefined */
  json_array_length(col1?: Stringable | Whateverable): NumericField;
  /** (VARCHAR, VARCHAR[]): JSON[] | , eg: undefined */
  json_extract_path(col1: Whateverable | Numericable | Stringable): WhateverField;
  /** (JSON, VARCHAR): VARCHAR | , eg: undefined */
  json_extract_string(col1: Stringable | Numericable | Whateverable): StringField;
  /** (UBIGINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  to_binary(): StringField;
  /** (VARCHAR, VARCHAR[]): VARCHAR[][] | , eg: undefined */
  json_keys(col1?: Whateverable | Stringable): WhateverField;
  /** (VARCHAR): JSON | , eg: undefined */
  json_structure(): WhateverField;
  /** (JSON, VARCHAR): VARCHAR | , eg: undefined */
  json_type(col1?: Stringable | Whateverable): StringField;
  /** (JSON, BIGINT): VARCHAR | , eg: undefined */
  json_value(col1: Numericable | Whateverable | Stringable): StringField;
  /** (VARCHAR): VARCHAR | Convert string to lower case, eg: lower('Hello') */
  lcase(): StringField;
  /** (VARCHAR): VARCHAR | Strips accents from string., eg: strip_accents('mühleisen') */
  strip_accents(): StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the regex, eg: ('hello␣world; 42').string_split_regex(';?␣') */
  string_split_regex(separator: Stringable, col2?: Stringable): WhateverField;
  /** (DATE, VARCHAR): VARCHAR | Converts a date to a string according to the format string., eg: (date '1992-01-01').strftime('%a, %-d %B %Y') */
  strftime(format: Stringable | Whateverable): StringField;
  /** (VARCHAR, VARCHAR): BOOLEAN | Returns true if string begins with search_string, eg: ('abc').starts_with('a') */
  starts_with(searchStr: Stringable): WhateverField;
  /** (VARCHAR): VARCHAR | Returns the SHA256 hash of the value, eg: sha256('hello') */
  sha256(): StringField;
  /** (VARCHAR, VARCHAR): VARCHAR | Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirpath('system') */
  parse_dirpath(separator?: Stringable): StringField;
  /** (VARCHAR, BIGINT): VARCHAR | Repeats the string count number of times, eg: ('A').repeat(5) */
  repeat(count: Numericable): StringField;
  /** (VARCHAR): VARCHAR | Convert string to upper case., eg: upper('Hello') */
  upper(): StringField;
  /** (VARCHAR): BLOB | Converts a value from hexadecimal representation to a blob, eg: unhex('2A') */
  unhex(): WhateverField;
  /** (VARCHAR[], DATE): STRUCT() | Get subfield (equivalent to extract), eg: ('minute').date_part(TIMESTAMP '1992-09-20 20:38:40') */
  date_part(col1: Whateverable): WhateverField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string., eg: ('A%c').ilike_escape('a$%C', '$') */
  ilike_escape(likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField;
  /** (VARCHAR, BIGINT): JSON | , eg: undefined */
  json_extract(col1: Numericable | Whateverable | Stringable): WhateverField;
  /** (JSON, VARCHAR[]): VARCHAR[] | , eg: undefined */
  json_extract_path_text(col1: Whateverable | Numericable | Stringable): WhateverField;
  /** (VARCHAR, BOOLEAN, BOOLEAN, BOOLEAN): JSON | , eg: undefined */
  json_serialize_sql(col1?: Whateverable, col2?: Whateverable, col3?: Whateverable): WhateverField;
  /** (VARCHAR): BIGINT | Number of characters in string., eg: length('Hello🦆') */
  len(): NumericField;
  /** (VARCHAR, VARCHAR): BIGINT | The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  levenshtein(str2: Stringable): NumericField;
  /** (VARCHAR, BIGINT, BIGINT): VARCHAR | Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('🦆🤦🏼‍♂️🤦🏽‍♀️🦆').substring_grapheme(3, 2) */
  substring_grapheme(start: Numericable, length?: Numericable): StringField;
  /** (VARCHAR, BIGINT, BIGINT): VARCHAR | Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substr(start: Numericable, length?: Numericable): StringField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_extract(index: Numericable): WhateverField;
  /** (VARCHAR, VARCHAR): TIMESTAMP | Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime., eg: ('4/15/2023 10:56:00').strptime(['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S']) */
  strptime(format: Stringable | Whateverable): WhateverField;
  /** (VARCHAR): BIGINT | Number of bytes in string., eg: strlen('🦆') */
  strlen(): NumericField;
  /** (VARCHAR): VARCHAR | Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not., eg: nfc_normalize('ardèch') */
  nfc_normalize(): StringField;
  /** (VARCHAR): INTEGER | Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  ord(): NumericField;
  /** (VARCHAR): VARCHAR | Returns the SHA1 hash of the value, eg: sha1('hello') */
  sha1(): StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns true if the entire string matches the regex. A set of optional options can be set., eg: ('anabanana').regexp_full_match('(an)*') */
  regexp_full_match(regex: Stringable, options?: Stringable): WhateverField;
  /** (VARCHAR, VARCHAR, VARCHAR, VARCHAR): VARCHAR | If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set., eg: ('hello').regexp_replace('[lo]', '-') */
  regexp_replace(pattern: Stringable, replacement: Stringable, options?: Stringable): StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the regex, eg: ('hello␣world; 42').string_split_regex(';?␣') */
  regexp_split_to_array(separator: Stringable, col2?: Stringable): WhateverField;
  /** (VARCHAR): VARCHAR | Unescapes the URL encoded input., eg: url_decode('this%20string%20is%2BFencoded') */
  url_decode(): StringField;
  /** (VARCHAR): INTEGER | Returns an integer that represents the Unicode code point of the first character of the string, eg: ascii('Ω') */
  ascii(): NumericField;
  /** (BIT, INTEGER): BIT | Pads the bitstring until the specified length, eg: ('1010'::BIT).bitstring(7) */
  bitstring(length: Numericable): WhateverField;
  /** (VARCHAR, VARCHAR): VARCHAR | Removes any occurrences of any of the characters from either side of the string, eg: ('>>>>test<<').trim('><') */
  trim(characters?: Stringable): StringField;
  /** (VARCHAR): ANY | Returns the current value of the configuration setting, eg: current_setting('access_mode') */
  current_setting(): WhateverField;
  /** (VARCHAR, DATE): TIMESTAMP | Truncate to specified precision, eg: ('hour').date_trunc(TIMESTAMPTZ '1992-09-20 20:38:40') */
  datetrunc(timestamp: Whateverable): WhateverField;
  /** (VARCHAR, DATE, DATE): BIGINT | The number of partition boundaries between the timestamps, eg: ('hour').date_diff(TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  date_diff(startdate: Whateverable, enddate: Whateverable): NumericField;
  /** (JSON, VARCHAR): ANY | , eg: undefined */
  from_json(col1: Stringable): WhateverField;
  /** (VARCHAR): ANY | , eg: undefined */
  getvariable(): WhateverField;
  /** (VARINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  hex(): StringField;
  /** (VARCHAR, VARCHAR): BIGINT | Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  instr(needle: Stringable): NumericField;
  /** (VARCHAR, VARCHAR, DOUBLE): DOUBLE | The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_winkler_similarity('duckdb', 0.5) */
  jaro_winkler_similarity(str2: Stringable, scoreCutoff?: Numericable): NumericField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  json_contains(col1: Stringable | Whateverable): WhateverField;
  /** (JSON, VARCHAR[]): BOOLEAN[] | , eg: undefined */
  json_exists(col1: Whateverable | Stringable): WhateverField;
  /** (VARCHAR, BOOLEAN, BOOLEAN, BOOLEAN, BOOLEAN): JSON | , eg: undefined */
  json_serialize_plan(col1?: Whateverable, col2?: Whateverable, col3?: Whateverable, col4?: Whateverable): WhateverField;
  /** (VARCHAR, VARCHAR): ANY | , eg: undefined */
  json_transform(col1: Stringable): WhateverField;
  /** (JSON): BOOLEAN | , eg: undefined */
  json_valid(): WhateverField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_element(index: Numericable): WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  strpos(needle: Stringable): NumericField;
  /** (VARCHAR): VARCHAR | Convert string to lower case, eg: lower('Hello') */
  lower(): StringField;
  /** (VARCHAR, INTEGER, VARCHAR): VARCHAR | Pads the string with the character from the left until it has count characters, eg: ('hello').lpad(10, '>') */
  lpad(count: Numericable, character: Stringable): StringField;
  /** (VARCHAR, VARCHAR): VARCHAR | Removes any occurrences of any of the characters from the left side of the string, eg: ('>>>>test<<').ltrim('><') */
  ltrim(characters?: Stringable): StringField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the separator, eg: ('hello-world').string_split('-') */
  split(separator: Stringable): WhateverField;
  /** (VARCHAR, BOOLEAN, VARCHAR): VARCHAR | Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_filename(true, 'forward_slash') */
  parse_filename(trimExtension?: Whateverable | Stringable, separator?: Stringable): StringField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_path('system') */
  parse_path(separator?: Stringable): WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  position(needle: Stringable): NumericField;
  /** (VARCHAR): VARCHAR | Reverses the string, eg: reverse('hello') */
  reverse(): StringField;
  /** (VARCHAR): BIGINT | , eg: undefined */
  bit_length(): NumericField;
  /** (VARCHAR): INTEGER | Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  unicode(): NumericField;
  /** (VARCHAR): VARCHAR | Convert string to upper case., eg: upper('Hello') */
  ucase(): StringField;
  /** (VARCHAR, DATE, DATE): BIGINT | The number of partition boundaries between the timestamps, eg: ('hour').date_diff(TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  datediff(startdate: Whateverable, enddate: Whateverable): NumericField;
  /** (VARCHAR, DATE, DATE): BIGINT | The number of complete partitions between the timestamps, eg: ('hour').date_sub(TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  datesub(startdate: Whateverable, enddate: Whateverable): NumericField;
  /** (VARCHAR): BLOB | Convert varchar to blob. Converts utf-8 characters into literal encoding, eg: encode('my_string_with_ü') */
  encode(): WhateverField;
  /** (VARCHAR): BLOB | Converts a value from hexadecimal representation to a blob, eg: unhex('2A') */
  from_hex(): WhateverField;
  /** (VARCHAR, BIGINT): VARCHAR | Extract the left-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').left_grapheme(1) */
  left_grapheme(count: Numericable): StringField;
  /** (VARCHAR, BIGINT, BIGINT): VARCHAR | Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substring(start: Numericable, length?: Numericable): StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the regex, eg: ('hello␣world; 42').string_split_regex(';?␣') */
  str_split_regex(separator: Stringable, col2?: Stringable): WhateverField;
  /** (VARCHAR): VARCHAR | Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5(): StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string., eg: ('A%c').not_ilike_escape('a$%C', '$') */
  not_ilike_escape(likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string., eg: ('a%c').not_like_escape('a$%c', '$') */
  not_like_escape(likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField;
  /** (VARCHAR): VARCHAR | Formats a string using printf syntax, eg: ('Benchmark "%s" took %d seconds').printf('CSV', 42) */
  printf(): StringField;
  /** (VARCHAR, VARCHAR, INTEGER, VARCHAR): VARCHAR[] | Split the string along the regex and extract all occurrences of group. A set of optional options can be set., eg: ([a-z ]+)_?').regexp_extract_all('hello_world', '(1) */
  regexp_extract_all(p1: Stringable): WhateverField;
  /** (VARCHAR, VARCHAR): VARCHAR | Removes any occurrences of any of the characters from the right side of the string, eg: ('>>>>test<<').rtrim('><') */
  rtrim(characters?: Stringable): StringField;
  /** (VARCHAR, BIGINT): VARCHAR | Extract the right-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').right_grapheme(1) */
  right_grapheme(count: Numericable): StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR | Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted, eg: ('12345').translate('143', 'ax') */
  translate(from: Stringable, to: Stringable): StringField;
  /** (VARCHAR, VARCHAR): BIGINT | The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  editdist3(str2: Stringable): NumericField;
  /** (VARCHAR): BLOB | Converts a value from binary representation to a blob, eg: unbin('0110') */
  from_binary(): WhateverField;
  /** (VARCHAR): BIGINT | Number of characters in string., eg: length('Hello🦆') */
  length(): NumericField;
  /** (INTERVAL, TIME WITH TIME ZONE): TIME WITH TIME ZONE | Extract the timezone component from a date or timestamp, eg: timezone(timestamp '2021-08-03 11:59:44.123456') */
  timezone(col1?: Whateverable): NumericField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the separator, eg: ('hello-world').string_split('-') */
  string_to_array(separator: Stringable): WhateverField;
  /** (VARCHAR): HUGEINT | Returns the MD5 hash of the value as an INT128, eg: md5_number('123') */
  md5_number(): NumericField;
  /** (VARCHAR, VARCHAR, INTEGER, VARCHAR): VARCHAR | If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set., eg: (b)').regexp_extract('abc', '([a-z])(1) */
  regexp_extract(pattern: Stringable, group?: Numericable | Whateverable, options?: Stringable): StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set., eg: ('anabanana').regexp_matches('(an)*') */
  regexp_matches(pattern: Stringable, options?: Stringable): WhateverField;
  /** (VARINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  bin(): StringField;
  /** (VARCHAR, DATE, DATE): BIGINT | The number of complete partitions between the timestamps, eg: ('hour').date_sub(TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  date_sub(startdate: Whateverable, enddate: Whateverable): NumericField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  ends_with(col1: Stringable): WhateverField;
  /** (VARCHAR): VARCHAR | Formats a string using fmt syntax, eg: ('Benchmark "{}" took {} seconds').format('CSV', 42) */
  format(): StringField;
  /** (VARCHAR, VARCHAR, DOUBLE): DOUBLE | The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_similarity('duckdb', 0.5) */
  jaro_similarity(str2: Stringable, scoreCutoff?: Numericable): NumericField;
  /** (JSON, VARCHAR): ANY | , eg: undefined */
  json_transform_strict(col1: Stringable): WhateverField;
  /** (VARCHAR): BIGINT | Number of grapheme clusters in string., eg: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️') */
  length_grapheme(): NumericField;
  /** (VARCHAR, VARCHAR): VARCHAR | Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirname('system') */
  parse_dirname(separator?: Stringable): StringField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  prefix(col1: Stringable): WhateverField;
  /** (VARCHAR, INTEGER, VARCHAR): VARCHAR | Pads the string with the character from the right until it has count characters, eg: ('hello').rpad(10, '<') */
  rpad(count: Numericable, character: Stringable): StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR | Replaces any occurrences of the source with target in string, eg: ('hello').replace('l', '-') */
  replace(source: Stringable, target: Stringable): StringField;
  /** (VARCHAR, ANY): VARCHAR | Concatenate strings together separated by the specified separator., eg: (').concat_ws(', 'Banana', 'Apple', 'Melon') */
  concat_ws(str: Whateverable): StringField;
  /** (VARCHAR[], DATE): STRUCT() | Get subfield (equivalent to extract), eg: ('minute').date_part(TIMESTAMP '1992-09-20 20:38:40') */
  datepart(col1: Whateverable): WhateverField;
  /** (VARCHAR, DATE): TIMESTAMP | Truncate to specified precision, eg: ('hour').date_trunc(TIMESTAMPTZ '1992-09-20 20:38:40') */
  date_trunc(timestamp: Whateverable): WhateverField;
  /** (VARCHAR, VARCHAR): ANY | , eg: undefined */
  from_json_strict(col1: Stringable): WhateverField;
  /** (VARCHAR, VARCHAR): DOUBLE | The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaccard('luck') */
  jaccard(str2: Stringable): NumericField;
  /** (VARCHAR, BIGINT): VARCHAR | Extract the left-most count characters, eg: ('Hello🦆').left(2) */
  left(count: Numericable): StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string., eg: ('a%c').like_escape('a$%c', '$') */
  like_escape(likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  suffix(col1: Stringable): WhateverField;
  /** (VARCHAR): VARCHAR | Escapes all potentially meaningful regexp characters in the input string, eg: regexp_escape('https://duckdb.org') */
  regexp_escape(): StringField;
  /** (VARCHAR, BIGINT): VARCHAR | Extract the right-most count characters, eg: ('Hello🦆').right(3) */
  right(count: Numericable): StringField;
  /** (VARCHAR): BLOB | Converts a value from binary representation to a blob, eg: unbin('0110') */
  unbin(): WhateverField;
  /** (VARCHAR): BLOB | Convert a base64 encoded string to a character string, eg: from_base64('QQ==') */
  from_base64(): WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  hamming(str2: Stringable): NumericField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the separator, eg: ('hello-world').string_split('-') */
  str_split(separator: Stringable): WhateverField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the separator, eg: ('hello-world').string_split('-') */
  string_split(separator: Stringable): WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  mismatches(str2: Stringable): NumericField;

  // Add more string operations as needed
  /** Convert the operation chain to a SQL string */
  toString(): string;
}

/**
 * Interface for numeric field operations
 * Defines methods that can be called on numeric fields in DuckDB
 */
export interface NumericField {
  /** (INTERVAL, INTERVAL): INTERVAL | , eg: undefined */
  add(col1?: Whateverable | Numericable): WhateverField;
  /** (TINYINT, TINYINT): TINYINT | Bitwise XOR, eg: (17).xor(5) */
  xor(right: Numericable | Whateverable): NumericField;
  /** (DOUBLE): DOUBLE | Computes the inverse hyperbolic sin of x, eg: asinh(0.5) */
  asinh(): NumericField;
  /** (DOUBLE): DOUBLE | Computes the cotangent of x, eg: cot(0.5) */
  cot(): NumericField;
  /** (INTEGER): INTERVAL | Construct a year interval, eg: to_years(5) */
  to_years(): WhateverField;
  /** (TINYINT, TINYINT): TINYINT | , eg: undefined */
  divide(col1: Numericable): NumericField;
  /** (TIMESTAMP, TIMESTAMP, BIGINT, BOOLEAN): ANY[] | Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged, eg: (0).equi_width_bins(10, 2, true) */
  equi_width_bins(max: Whateverable | Numericable, binCount: Numericable, niceRounding: Whateverable): WhateverField;
  /** (INTEGER): INTERVAL | Construct a quarter interval, eg: to_quarters(5) */
  to_quarters(): WhateverField;
  /** (FLOAT): FLOAT | Rounds the number down, eg: floor(17.4) */
  floor(): NumericField;
  /** (BIGINT, BIGINT, BIGINT): BIGINT[] | Create a list of values between start and stop - the stop parameter is inclusive, eg: (2).generate_series(5, 3) */
  generate_series(stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField;
  /** (BIGINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex(): StringField;
  /** (UBIGINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  to_binary(): StringField;
  /** (DOUBLE): DOUBLE | Computes the natural logarithm of x, eg: ln(2) */
  ln(): NumericField;
  /** (DOUBLE): DOUBLE | Computes the 10-log of x, eg: log10(1000) */
  log10(): NumericField;
  /** (BIGINT, BIGINT, BIGINT, BIGINT, BIGINT, DOUBLE): TIMESTAMP | The timestamp for the given parts, eg: (1992).make_timestamp(9, 20, 13, 34, 27.123456) */
  make_timestamp(month?: Numericable, day?: Numericable, hour?: Numericable, minute?: Numericable, seconds?: Numericable): WhateverField;
  /** (TINYINT): TINYINT | Returns the sign of x as -1, 0 or 1, eg: sign(-349) */
  sign(): NumericField;
  /** (TINYINT, TINYINT): TINYINT | , eg: undefined */
  multiply(col1: Numericable | Whateverable): NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Returns the next floating point value after x in the direction of y, eg: (1::float).nextafter(2::float) */
  nextafter(p1: Numericable): NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Computes x to the power of y, eg: (2).pow(3) */
  pow(y: Numericable): NumericField;
  /** (DOUBLE): DOUBLE | Converts degrees to radians, eg: radians(90) */
  radians(): NumericField;
  /** (BIGINT, BIGINT, BIGINT): BIGINT[] | Create a list of values between start and stop - the stop parameter is exclusive, eg: (2).range(5, 3) */
  range(stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField;
  /** (DOUBLE): DOUBLE | Computes the inverse hyperbolic tan of x, eg: atanh(0.5) */
  atanh(): NumericField;
  /** (DOUBLE): DOUBLE | Computes the cos of x, eg: cos(90) */
  cos(): NumericField;
  /** (DOUBLE): DOUBLE | Computes the hyperbolic cos of x, eg: cosh(1) */
  cosh(): NumericField;
  /** (INTEGER): INTERVAL | Construct a millenium interval, eg: to_millennia(1) */
  to_millennia(): WhateverField;
  /** (BIGINT): INTERVAL | Construct a microsecond interval, eg: to_microseconds(5) */
  to_microseconds(): WhateverField;
  /** (FLOAT): BOOLEAN | Returns true if the floating point value is infinite, false otherwise, eg: isinf('Infinity'::float) */
  isinf(): WhateverField;
  /** (DATE, DATE): BIGINT | , eg: undefined */
  subtract(col1?: Whateverable | Numericable): NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Computes the logarithm of x to base b. b may be omitted, in which case the default 10, eg: (2).log(64) */
  log(p1?: Numericable): NumericField;
  /** (FLOAT, INTEGER): FLOAT | Rounds x to s decimal places, eg: (42.4332).round(2) */
  round(precision?: Numericable): NumericField;
  /** (DATE): BIGINT | Extract the epoch component in milliseconds from a temporal type, eg: epoch_ms(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ms(): NumericField;
  /** (BIGINT): INTERVAL | Construct a hour interval, eg: to_hours(5) */
  to_hours(): WhateverField;
  /** (VARINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  hex(): StringField;
  /** (BIGINT, BIGINT, BIGINT, BIGINT, BIGINT, DOUBLE, VARCHAR): TIMESTAMP WITH TIME ZONE | , eg: undefined */
  make_timestamptz(col1?: Numericable, col2?: Numericable, col3?: Numericable, col4?: Numericable, col5?: Numericable, col6?: Stringable): WhateverField;
  /** (TINYINT, TINYINT): TINYINT | , eg: undefined */
  mod(col1: Numericable): NumericField;
  /** (TINYINT): TINYINT | Absolute value, eg: abs(-17.4) */
  abs(): NumericField;
  /** (DOUBLE): DOUBLE | Computes the arccosine of x, eg: acos(0.5) */
  acos(): NumericField;
  /** (DOUBLE): DOUBLE | Computes the arctangent of x, eg: atan(0.5) */
  atan(): NumericField;
  /** (DOUBLE): DOUBLE | Returns the cube root of x, eg: cbrt(8) */
  cbrt(): NumericField;
  /** (FLOAT): FLOAT | Rounds the number up, eg: ceil(17.4) */
  ceil(): NumericField;
  /** (INTEGER): VARCHAR | Returns a character which is corresponding the ASCII code value or Unicode code point, eg: chr(65) */
  chr(): StringField;
  /** (INTEGER): INTERVAL | Construct a week interval, eg: to_weeks(5) */
  to_weeks(): WhateverField;
  /** (DOUBLE): DOUBLE | Computes e to the power of x, eg: exp(1) */
  exp(): NumericField;
  /** (BIGINT): INTERVAL | Construct a minute interval, eg: to_minutes(5) */
  to_minutes(): WhateverField;
  /** (BIGINT, BIGINT): BIGINT | Computes the greatest common divisor of x and y, eg: (42).greatest_common_divisor(57) */
  greatest_common_divisor(y: Numericable): NumericField;
  /** (DOUBLE): DOUBLE | Computes the inverse hyperbolic cos of x, eg: acosh(2.3) */
  acosh(): NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Computes the arctangent (y, x), eg: (1.0).atan2(0.0) */
  atan2(x: Numericable): NumericField;
  /** (BIT): BIGINT | Returns the number of bits that are set, eg: bit_count(31) */
  bit_count(): NumericField;
  /** (FLOAT): FLOAT | Rounds the number up, eg: ceil(17.4) */
  ceiling(): NumericField;
  /** (DOUBLE): TIMESTAMP WITH TIME ZONE | Converts secs since epoch to a timestamp with time zone, eg: to_timestamp(1284352323.5) */
  to_timestamp(): WhateverField;
  /** (DOUBLE): DOUBLE | Rounds x to next even number by rounding away from zero, eg: even(2.9) */
  even(): NumericField;
  /** (INTEGER): INTERVAL | Construct a month interval, eg: to_months(5) */
  to_months(): WhateverField;
  /** (BIGINT): VARCHAR | Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  formatReadableSize(): StringField;
  /** (DOUBLE): DOUBLE | Interpolation of (x-1) factorial (so decimal inputs are allowed), eg: gamma(5.5) */
  gamma(): NumericField;
  /** (BIGINT, BIGINT): BIGINT | Computes the greatest common divisor of x and y, eg: (42).greatest_common_divisor(57) */
  gcd(y: Numericable): NumericField;
  /** (INTEGER): INTERVAL | Construct a day interval, eg: to_days(5) */
  to_days(): WhateverField;
  /** (DATE): BOOLEAN | Returns true if the floating point value is finite, false otherwise, eg: isfinite(5.5) */
  isfinite(): WhateverField;
  /** (BIGINT, INTEGER, INTEGER): VARCHAR | Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length, eg: (42).to_base(16) */
  to_base(radix: Numericable, minLength?: Numericable): StringField;
  /** (DOUBLE): DOUBLE | Computes the hyperbolic tan of x, eg: tanh(1) */
  tanh(): NumericField;
  /** (DOUBLE): DOUBLE | Returns the square root of x, eg: sqrt(4) */
  sqrt(): NumericField;
  /** (BIGINT, BIGINT, BIGINT): DATE | The date for the given struct., eg: ({'year': 2024).make_date('month': 11, 'day': 14}) */
  make_date(month?: Numericable, day?: Numericable): WhateverField;
  /** (DOUBLE, DOUBLE, DOUBLE, DOUBLE): VARCHAR | Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80, eg: (5).bar(0, 20, 10) */
  bar(min: Numericable, max: Numericable, width?: Numericable): StringField;
  /** (VARINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  bin(): StringField;
  /** (DOUBLE): DOUBLE | Converts radians to degrees, eg: degrees(pi()) */
  degrees(): NumericField;
  /** (DOUBLE): INTERVAL | Construct a second interval, eg: to_seconds(5.5) */
  to_seconds(): WhateverField;
  /** (DOUBLE): INTERVAL | Construct a millisecond interval, eg: to_milliseconds(5.5) */
  to_milliseconds(): WhateverField;
  /** (INTEGER): INTERVAL | Construct a decade interval, eg: to_decades(5) */
  to_decades(): WhateverField;
  /** (INTEGER): INTERVAL | Construct a century interval, eg: to_centuries(5) */
  to_centuries(): WhateverField;
  /** (BIGINT, BIGINT): BIGINT | Computes the least common multiple of x and y, eg: (42).least_common_multiple(57) */
  lcm(y: Numericable): NumericField;
  /** (BIGINT, BIGINT): BIGINT | Computes the least common multiple of x and y, eg: (42).least_common_multiple(57) */
  least_common_multiple(y: Numericable): NumericField;
  /** (DOUBLE): DOUBLE | Computes the 2-log of x, eg: log2(8) */
  log2(): NumericField;
  /** (BIGINT, BIGINT, DOUBLE): TIME | The time for the given parts, eg: (13).make_time(34, 27.123456) */
  make_time(minute: Numericable, seconds: Numericable): WhateverField;
  /** (BIGINT): VARCHAR | Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  format_bytes(): StringField;
  /** (FLOAT): BOOLEAN | Returns true if the floating point value is not a number, false otherwise, eg: isnan('NaN'::FLOAT) */
  isnan(): WhateverField;
  /** (DOUBLE): DOUBLE | Computes the log of the gamma function, eg: lgamma(2) */
  lgamma(): NumericField;
  /** (DOUBLE): DOUBLE | Computes the sin of x, eg: sin(90) */
  sin(): NumericField;
  /** (FLOAT): BOOLEAN | Returns whether the signbit is set or not, eg: signbit(-0.0) */
  signbit(): WhateverField;
  /** (DOUBLE): DOUBLE | Computes the arcsine of x, eg: asin(0.5) */
  asin(): NumericField;
  /** (TINYINT): TINYINT | Truncates the number, eg: trunc(17.4) */
  trunc(): NumericField;
  /** (INTEGER): HUGEINT | Factorial of x. Computes the product of the current integer and all integers below it, eg: 4! */
  factorial(): NumericField;
  /** (BIGINT): VARCHAR | Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB), eg: format_bytes(1000 * 16) */
  formatReadableDecimalSize(): StringField;
  /** (DOUBLE): DOUBLE | Computes the tan of x, eg: tan(90) */
  tan(): NumericField;
  /** (BIGINT): TIMESTAMP_NS | The timestamp for the given nanoseconds since epoch, eg: make_timestamp(1732117793000000000) */
  make_timestamp_ns(): WhateverField;
  /** (DOUBLE): DOUBLE | Computes the hyperbolic sin of x, eg: sinh(1) */
  sinh(): NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Computes x to the power of y, eg: (2).pow(3) */
  power(y: Numericable): NumericField;

  // Add more numeric operations as needed
  /** Convert the operation chain to a SQL string */
  toString(): string;
}

/**
 * Interface for global DuckDB functions
 * These functions can be used directly without chaining to a field
 */
export interface DuckDBFunctions {
  /** ADD(COL0: INTERVAL, COL1: INTERVAL): WHATEVER - , eg: null */
  add(col0: Whateverable | Numericable, col1?: Whateverable | Numericable): WhateverField;
  /** XOR(LEFT: TINYINT, RIGHT: TINYINT): NUMERIC - Bitwise XOR, eg: xor(17, 5) */
  xor(left: Numericable | Whateverable, right: Numericable | Whateverable): NumericField;
  /** ARRAY_CROSS_PRODUCT(ARRAY: FLOAT[3], P1: FLOAT[3]): WHATEVER - Compute the cross product of two arrays of size 3. The array elements can not be NULL., eg: array_cross_product([1, 2, 3], [1, 2, 3]) */
  array_cross_product(array: Whateverable, p1: Whateverable): WhateverField;
  /** ARRAY_DISTINCT(LIST: ANY[]): WHATEVER - Removes all duplicates and NULLs from a list. Does not preserve the original order, eg: list_distinct([1, 1, NULL, -3, 1, 5]) */
  array_distinct(list: Whateverable): WhateverField;
  /** ARRAY_EXTRACT(LIST: ANY[], INDEX: BIGINT): WHATEVER - Extract the indexth (1-based) value from the array., eg: array_extract('DuckDB', 2) */
  array_extract(list: Whateverable | Stringable, index: Numericable | Stringable): WhateverField;
  /** ARRAY_HAS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  array_has(list: Whateverable, element: Whateverable): WhateverField;
  /** VECTOR_TYPE(COL: ANY): VARCHAR - Returns the VectorType of a given column, eg: vector_type(col) */
  vector_type(col: Whateverable): StringField;
  /** ARRAY_SORT(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Sorts the elements of the list, eg: list_sort([3, 6, 1, 2]) */
  array_sort(list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField;
  /** URL_ENCODE(INPUT: VARCHAR): VARCHAR - Escapes the input string by encoding it so that it can be included in a URL query parameter., eg: url_encode('this string has/ special+ characters>') */
  url_encode(input: Stringable): StringField;
  /** ARRAY_VALUE(): WHATEVER - Create an ARRAY containing the argument values., eg: array_value(4, 5, 6) */
  array_value(): WhateverField;
  /** ASINH(X: DOUBLE): NUMERIC - Computes the inverse hyperbolic sin of x, eg: asinh(0.5) */
  asinh(x: Numericable): NumericField;
  /** UNION_EXTRACT(UNION: UNION, TAG: VARCHAR): WHATEVER - Extract the value with the named tags from the union. NULL if the tag is not currently selected, eg: union_extract(s, 'k') */
  union_extract(union: Whateverable, tag: Stringable): WhateverField;
  /** COMBINE(COL0: AGGREGATE_STATE<?>, COL1: ANY): WHATEVER - , eg: null */
  combine(col0: Whateverable, col1: Whateverable): WhateverField;
  /** CONTAINS(STR: VARCHAR, SEARCHSTR: VARCHAR): WHATEVER - Returns true if search_string is found within string., eg: contains('abc', 'a') */
  contains(str: Stringable | Whateverable, searchStr: Stringable | Whateverable): WhateverField;
  /** COT(X: DOUBLE): NUMERIC - Computes the cotangent of x, eg: cot(0.5) */
  cot(x: Numericable): NumericField;
  /** TRY_STRPTIME(TEXT: VARCHAR, FORMAT: VARCHAR): WHATEVER - Converts the string text to timestamp according to the format string. Returns NULL on failure., eg: try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p') */
  try_strptime(text: Stringable, format: Stringable | Whateverable): WhateverField;
  /** TO_YEARS(INTEGER: INTEGER): WHATEVER - Construct a year interval, eg: to_years(5) */
  to_years(integer: Numericable): WhateverField;
  /** DAMERAU_LEVENSHTEIN(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different, eg: damerau_levenshtein('hello', 'world') */
  damerau_levenshtein(str1: Stringable, str2: Stringable): NumericField;
  /** DIVIDE(COL0: TINYINT, COL1: TINYINT): NUMERIC - , eg: null */
  divide(col0: Numericable, col1: Numericable): NumericField;
  /** EPOCH_NS(TEMPORAL: DATE): NUMERIC - Extract the epoch component in nanoseconds from a temporal type, eg: epoch_ns(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ns(temporal: Whateverable): NumericField;
  /** EQUI_WIDTH_BINS(MIN: TIMESTAMP, MAX: TIMESTAMP, BINCOUNT: BIGINT, NICEROUNDING: BOOLEAN): WHATEVER - Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged, eg: equi_width_bins(0, 10, 2, true) */
  equi_width_bins(min: Whateverable | Numericable, max: Whateverable | Numericable, binCount: Numericable, niceRounding: Whateverable): WhateverField;
  /** TO_QUARTERS(INTEGER: INTEGER): WHATEVER - Construct a quarter interval, eg: to_quarters(5) */
  to_quarters(integer: Numericable): WhateverField;
  /** FLOOR(X: FLOAT): NUMERIC - Rounds the number down, eg: floor(17.4) */
  floor(x: Numericable): NumericField;
  /** GENERATE_SERIES(START: BIGINT, STOP: BIGINT, STEP: BIGINT): WHATEVER - Create a list of values between start and stop - the stop parameter is inclusive, eg: generate_series(2, 5, 3) */
  generate_series(start: Numericable | Whateverable, stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField;
  /** TO_JSON(): WHATEVER - , eg: null */
  to_json(): WhateverField;
  /** TO_HEX(VALUE: BIGINT): VARCHAR - Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex(value: Numericable | Stringable | Whateverable): StringField;
  /** ICU_SORT_KEY(COL0: VARCHAR, COL1: VARCHAR): VARCHAR - , eg: null */
  icu_sort_key(col0: Stringable, col1: Stringable): StringField;
  /** ISODOW(TS: DATE): NUMERIC - Extract the isodow component from a date or timestamp, eg: isodow(timestamp '2021-08-03 11:59:44.123456') */
  isodow(ts: Whateverable): NumericField;
  /** ISOYEAR(TS: DATE): NUMERIC - Extract the isoyear component from a date or timestamp, eg: isoyear(timestamp '2021-08-03 11:59:44.123456') */
  isoyear(ts: Whateverable): NumericField;
  /** JSON_ARRAY_LENGTH(COL0: JSON, COL1: VARCHAR): NUMERIC - , eg: null */
  json_array_length(col0: Stringable | Whateverable, col1?: Stringable | Whateverable): NumericField;
  /** JSON_EXTRACT_PATH(COL0: VARCHAR, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_extract_path(col0: Stringable | Whateverable, col1: Whateverable | Numericable | Stringable): WhateverField;
  /** JSON_EXTRACT_STRING(COL0: JSON, COL1: VARCHAR): VARCHAR - , eg: null */
  json_extract_string(col0: Whateverable | Stringable, col1: Stringable | Numericable | Whateverable): StringField;
  /** TO_BINARY(VALUE: UBIGINT): VARCHAR - Converts the value to binary representation, eg: bin(42) */
  to_binary(value: Numericable | Stringable | Whateverable): StringField;
  /** JSON_KEYS(COL0: VARCHAR, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_keys(col0: Stringable | Whateverable, col1?: Whateverable | Stringable): WhateverField;
  /** JSON_STRUCTURE(COL0: VARCHAR): WHATEVER - , eg: null */
  json_structure(col0: Stringable | Whateverable): WhateverField;
  /** JSON_TYPE(COL0: JSON, COL1: VARCHAR): VARCHAR - , eg: null */
  json_type(col0: Whateverable | Stringable, col1?: Stringable | Whateverable): StringField;
  /** JSON_VALUE(COL0: JSON, COL1: BIGINT): VARCHAR - , eg: null */
  json_value(col0: Whateverable | Stringable, col1: Numericable | Whateverable | Stringable): StringField;
  /** JULIAN(TS: DATE): NUMERIC - Extract the Julian Day number from a date or timestamp, eg: julian(timestamp '2006-01-01 12:00') */
  julian(ts: Whateverable): NumericField;
  /** TIME_BUCKET(BUCKETWIDTH: INTERVAL, TIMESTAMP: DATE, ORIGIN: DATE): WHATEVER - Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets, eg: time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07') */
  time_bucket(bucketWidth: Whateverable, timestamp: Whateverable, origin?: Whateverable | Stringable): WhateverField;
  /** TIMEZONE_HOUR(TS: DATE): NUMERIC - Extract the timezone_hour component from a date or timestamp, eg: timezone_hour(timestamp '2021-08-03 11:59:44.123456') */
  timezone_hour(ts: Whateverable): NumericField;
  /** LCASE(STR: VARCHAR): VARCHAR - Convert string to lower case, eg: lower('Hello') */
  lcase(str: Stringable): StringField;
  /** LIST_CONCAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  list_concat(list1: Whateverable, list2: Whateverable): WhateverField;
  /** LIST_HAS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  list_has(list: Whateverable, element: Whateverable): WhateverField;
  /** STRUCT_EXTRACT(STRUCT: STRUCT, ENTRY: BIGINT): WHATEVER - Extract the named entry from the STRUCT., eg: struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i') */
  struct_extract(struct: Whateverable, entry: Numericable | Stringable): WhateverField;
  /** LIST_HAS_ANY(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if the lists have any element in common. NULLs are ignored., eg: list_has_any([1, 2, 3], [2, 3, 4]) */
  list_has_any(l1: Whateverable, p1: Whateverable): WhateverField;
  /** STRUCT_CONCAT(): WHATEVER - Merge the multiple STRUCTs into a single STRUCT., eg: struct_concat(struct_pack(i := 4), struct_pack(s := 'string')) */
  struct_concat(): WhateverField;
  /** STRIP_ACCENTS(STR: VARCHAR): VARCHAR - Strips accents from string., eg: strip_accents('mühleisen') */
  strip_accents(str: Stringable): StringField;
  /** STRING_SPLIT_REGEX(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  string_split_regex(str: Stringable, separator: Stringable, col2?: Stringable): WhateverField;
  /** STRFTIME(DATA: DATE, FORMAT: VARCHAR): VARCHAR - Converts a date to a string according to the format string., eg: strftime(date '1992-01-01', '%a, %-d %B %Y') */
  strftime(data: Whateverable | Stringable, format: Stringable | Whateverable): StringField;
  /** LIST_POSITION(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  list_position(list: Whateverable, element: Whateverable): NumericField;
  /** STARTS_WITH(STR: VARCHAR, SEARCHSTR: VARCHAR): WHATEVER - Returns true if string begins with search_string, eg: starts_with('abc','a') */
  starts_with(str: Stringable, searchStr: Stringable): WhateverField;
  /** LIST_SORT(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Sorts the elements of the list, eg: list_sort([3, 6, 1, 2]) */
  list_sort(list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField;
  /** LN(X: DOUBLE): NUMERIC - Computes the natural logarithm of x, eg: ln(2) */
  ln(x: Numericable): NumericField;
  /** LOG10(X: DOUBLE): NUMERIC - Computes the 10-log of x, eg: log10(1000) */
  log10(x: Numericable): NumericField;
  /** MAKE_TIMESTAMP(YEAR: BIGINT, MONTH: BIGINT, DAY: BIGINT, HOUR: BIGINT, MINUTE: BIGINT, SECONDS: DOUBLE): WHATEVER - The timestamp for the given parts, eg: make_timestamp(1992, 9, 20, 13, 34, 27.123456) */
  make_timestamp(year: Numericable, month?: Numericable, day?: Numericable, hour?: Numericable, minute?: Numericable, seconds?: Numericable): WhateverField;
  /** MAP_CONTAINS(MAP: MAP(ANY, ANY), KEY: ANY): WHATEVER - Checks if a map contains a given key., eg: map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2') */
  map_contains(map: Whateverable, key: Whateverable): WhateverField;
  /** MAP_ENTRIES(): WHATEVER - Returns the map entries as a list of keys/values, eg: map_entries(map(['key'], ['val'])) */
  map_entries(): WhateverField;
  /** MAP_EXTRACT(MAP: ANY, KEY: ANY): WHATEVER - Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: map_extract(map(['key'], ['val']), 'key') */
  map_extract(map: Whateverable, key: Whateverable): WhateverField;
  /** MICROSECOND(TS: DATE): NUMERIC - Extract the microsecond component from a date or timestamp, eg: microsecond(timestamp '2021-08-03 11:59:44.123456') */
  microsecond(ts: Whateverable): NumericField;
  /** SIGN(X: TINYINT): NUMERIC - Returns the sign of x as -1, 0 or 1, eg: sign(-349) */
  sign(x: Numericable): NumericField;
  /** SHA256(VALUE: VARCHAR): VARCHAR - Returns the SHA256 hash of the value, eg: sha256('hello') */
  sha256(value: Stringable | Whateverable): StringField;
  /** MONTHNAME(TS: DATE): VARCHAR - The (English) name of the month, eg: monthname(TIMESTAMP '1992-09-20') */
  monthname(ts: Whateverable): StringField;
  /** MULTIPLY(COL0: TINYINT, COL1: TINYINT): NUMERIC - , eg: null */
  multiply(col0: Numericable | Whateverable, col1: Numericable | Whateverable): NumericField;
  /** NEXTAFTER(X: DOUBLE, P1: DOUBLE): NUMERIC - Returns the next floating point value after x in the direction of y, eg: nextafter(1::float, 2::float) */
  nextafter(x: Numericable, p1: Numericable): NumericField;
  /** PARSE_DIRPATH(STR: VARCHAR, SEPARATOR: VARCHAR): VARCHAR - Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash, eg: parse_dirpath('path/to/file.csv', 'system') */
  parse_dirpath(str: Stringable, separator?: Stringable): StringField;
  /** POW(X: DOUBLE, Y: DOUBLE): NUMERIC - Computes x to the power of y, eg: pow(2, 3) */
  pow(x: Numericable, y: Numericable): NumericField;
  /** RADIANS(X: DOUBLE): NUMERIC - Converts degrees to radians, eg: radians(90) */
  radians(x: Numericable): NumericField;
  /** RANGE(START: BIGINT, STOP: BIGINT, STEP: BIGINT): WHATEVER - Create a list of values between start and stop - the stop parameter is exclusive, eg: range(2, 5, 3) */
  range(start: Numericable | Whateverable, stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField;
  /** ROW_TO_JSON(): WHATEVER - , eg: null */
  row_to_json(): WhateverField;
  /** REPEAT(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Repeats the string count number of times, eg: repeat('A', 5) */
  repeat(str: Stringable | Whateverable, count: Numericable): StringField;
  /** WEEKDAY(TS: DATE): NUMERIC - Extract the weekday component from a date or timestamp, eg: weekday(timestamp '2021-08-03 11:59:44.123456') */
  weekday(ts: Whateverable): NumericField;
  /** ARRAY_CONTAINS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  array_contains(list: Whateverable, element: Whateverable): WhateverField;
  /** ARRAY_DOT_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_inner_product([1, 2, 3], [1, 2, 3]) */
  array_dot_product(array1: Whateverable, array2: Whateverable): NumericField;
  /** ARRAY_GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  array_grade_up(list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField;
  /** ARRAY_HAS_ALL(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if all elements of l2 are in l1. NULLs are ignored., eg: list_has_all([1, 2, 3], [2, 3]) */
  array_has_all(l1: Whateverable, p1: Whateverable): WhateverField;
  /** ARRAY_REVERSE_SORT(LIST: ANY[], COL1: VARCHAR): WHATEVER - Sorts the elements of the list in reverse order, eg: list_reverse_sort([3, 6, 1, 2]) */
  array_reverse_sort(list: Whateverable, col1?: Stringable): WhateverField;
  /** ARRAY_SLICE(LIST: ANY, BEGIN: ANY, END: ANY, STEP: BIGINT): WHATEVER - Extract a sublist using slice conventions. Negative values are accepted., eg: list_slice([4, 5, 6], 2, 3) */
  array_slice(list: Whateverable, begin: Whateverable, end: Whateverable, step?: Numericable): WhateverField;
  /** ATANH(X: DOUBLE): NUMERIC - Computes the inverse hyperbolic tan of x, eg: atanh(0.5) */
  atanh(x: Numericable): NumericField;
  /** UPPER(STR: VARCHAR): VARCHAR - Convert string to upper case., eg: upper('Hello') */
  upper(str: Stringable): StringField;
  /** UNPIVOT_LIST(): WHATEVER - Identical to list_value, but generated as part of unpivot for better error messages, eg: unpivot_list(4, 5, 6) */
  unpivot_list(): WhateverField;
  /** UNHEX(VALUE: VARCHAR): WHATEVER - Converts a value from hexadecimal representation to a blob, eg: unhex('2A') */
  unhex(value: Stringable): WhateverField;
  /** CONSTANT_OR_NULL(ARG1: ANY, ARG2: ANY): WHATEVER - If arg2 is NULL, return NULL. Otherwise, return arg1., eg: constant_or_null(42, NULL) */
  constant_or_null(arg1: Whateverable, arg2: Whateverable): WhateverField;
  /** COS(X: DOUBLE): NUMERIC - Computes the cos of x, eg: cos(90) */
  cos(x: Numericable): NumericField;
  /** COSH(X: DOUBLE): NUMERIC - Computes the hyperbolic cos of x, eg: cosh(1) */
  cosh(x: Numericable): NumericField;
  /** DATE_PART(TS: VARCHAR[], COL1: DATE): WHATEVER - Get subfield (equivalent to extract), eg: date_part('minute', TIMESTAMP '1992-09-20 20:38:40') */
  date_part(ts: Whateverable | Stringable, col1: Whateverable): WhateverField;
  /** DAYOFMONTH(TS: DATE): NUMERIC - Extract the dayofmonth component from a date or timestamp, eg: dayofmonth(timestamp '2021-08-03 11:59:44.123456') */
  dayofmonth(ts: Whateverable): NumericField;
  /** DECODE(BLOB: BLOB): VARCHAR - Convert blob to varchar. Fails if blob is not valid utf-8, eg: decode('\xC3\xBC'::BLOB) */
  decode(blob: Whateverable): StringField;
  /** TO_MILLENNIA(INTEGER: INTEGER): WHATEVER - Construct a millenium interval, eg: to_millennia(1) */
  to_millennia(integer: Numericable): WhateverField;
  /** TO_MICROSECONDS(INTEGER: BIGINT): WHATEVER - Construct a microsecond interval, eg: to_microseconds(5) */
  to_microseconds(integer: Numericable): WhateverField;
  /** HASH(PARAM: ANY): NUMERIC - Returns an integer with the hash of the value. Note that this is not a cryptographic hash, eg: hash('🦆') */
  hash(param: Whateverable): NumericField;
  /** ILIKE_ESCAPE(STR: VARCHAR, LIKESPECIFIER: VARCHAR, ESCAPECHARACTER: VARCHAR): WHATEVER - Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string., eg: ilike_escape('A%c', 'a$%C', '$') */
  ilike_escape(str: Stringable, likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField;
  /** ISINF(X: FLOAT): WHATEVER - Returns true if the floating point value is infinite, false otherwise, eg: isinf('Infinity'::float) */
  isinf(x: Numericable | Whateverable): WhateverField;
  /** JSON_EXTRACT(COL0: VARCHAR, COL1: BIGINT): WHATEVER - , eg: null */
  json_extract(col0: Stringable | Whateverable, col1: Numericable | Whateverable | Stringable): WhateverField;
  /** JSON_EXTRACT_PATH_TEXT(COL0: JSON, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_extract_path_text(col0: Whateverable | Stringable, col1: Whateverable | Numericable | Stringable): WhateverField;
  /** TO_BASE64(BLOB: BLOB): VARCHAR - Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  to_base64(blob: Whateverable): StringField;
  /** JSON_QUOTE(): WHATEVER - , eg: null */
  json_quote(): WhateverField;
  /** JSON_SERIALIZE_SQL(COL0: VARCHAR, COL1: BOOLEAN, COL2: BOOLEAN, COL3: BOOLEAN): WHATEVER - , eg: null */
  json_serialize_sql(col0: Stringable, col1?: Whateverable, col2?: Whateverable, col3?: Whateverable): WhateverField;
  /** LAST_DAY(TS: DATE): WHATEVER - Returns the last day of the month, eg: last_day(TIMESTAMP '1992-03-22 01:02:03.1234') */
  last_day(ts: Whateverable): WhateverField;
  /** LEN(STR: VARCHAR): NUMERIC - Number of characters in string., eg: length('Hello🦆') */
  len(str: Stringable | Whateverable): NumericField;
  /** LEVENSHTEIN(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: levenshtein('duck','db') */
  levenshtein(str1: Stringable, str2: Stringable): NumericField;
  /** SUBTRACT(COL0: DATE, COL1: DATE): NUMERIC - , eg: null */
  subtract(col0: Numericable | Whateverable, col1?: Whateverable | Numericable): NumericField;
  /** SUBSTRING_GRAPHEME(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2) */
  substring_grapheme(str: Stringable, start: Numericable, length?: Numericable): StringField;
  /** SUBSTR(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring('Hello', 2, 2) */
  substr(str: Stringable, start: Numericable, length?: Numericable): StringField;
  /** LIST_COSINE_SIMILARITY(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the cosine similarity between two lists, eg: list_cosine_similarity([1, 2, 3], [1, 2, 3]) */
  list_cosine_similarity(list1: Whateverable, list2: Whateverable): NumericField;
  /** LIST_EXTRACT(LIST: ANY[], INDEX: BIGINT): WHATEVER - Extract the indexth (1-based) value from the list., eg: list_extract([4, 5, 6], 3) */
  list_extract(list: Whateverable | Stringable, index: Numericable): WhateverField;
  /** LIST_FILTER(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Constructs a list from those elements of the input list for which the lambda function returns true, eg: list_filter([3, 4, 5], x -> x > 4) */
  list_filter(list: Whateverable, lambda: Whateverable): WhateverField;
  /** LIST_INNER_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the inner product between two lists, eg: list_inner_product([1, 2, 3], [1, 2, 3]) */
  list_inner_product(list1: Whateverable, list2: Whateverable): NumericField;
  /** STRPTIME(TEXT: VARCHAR, FORMAT: VARCHAR): WHATEVER - Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime., eg: strptime('4/15/2023 10:56:00', ['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S']) */
  strptime(text: Stringable, format: Stringable | Whateverable): WhateverField;
  /** STRLEN(STR: VARCHAR): NUMERIC - Number of bytes in string., eg: strlen('🦆') */
  strlen(str: Stringable): NumericField;
  /** LIST_NEGATIVE_DOT_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the negative inner product between two lists, eg: list_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  list_negative_dot_product(list1: Whateverable, list2: Whateverable): NumericField;
  /** LIST_RESIZE(LIST: ANY[], SIZE: ANY, VALUE: ANY): WHATEVER - Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: list_resize([1, 2, 3], 5, 0) */
  list_resize(list: Whateverable, size: Whateverable, value?: Whateverable): WhateverField;
  /** LIST_REVERSE_SORT(LIST: ANY[], COL1: VARCHAR): WHATEVER - Sorts the elements of the list in reverse order, eg: list_reverse_sort([3, 6, 1, 2]) */
  list_reverse_sort(list: Whateverable, col1?: Stringable): WhateverField;
  /** LIST_VALUE(): WHATEVER - Create a LIST containing the argument values, eg: list_value(4, 5, 6) */
  list_value(): WhateverField;
  /** LOG(B: DOUBLE, P1: DOUBLE): NUMERIC - Computes the logarithm of x to base b. b may be omitted, in which case the default 10, eg: log(2, 64) */
  log(b: Numericable, p1?: Numericable): NumericField;
  /** MAP_KEYS(): WHATEVER - Returns the keys of a map as a list, eg: map_keys(map(['key'], ['val'])) */
  map_keys(): WhateverField;
  /** MAP_VALUES(): WHATEVER - Returns the values of a map as a list, eg: map_values(map(['key'], ['val'])) */
  map_values(): WhateverField;
  /** NFC_NORMALIZE(STR: VARCHAR): VARCHAR - Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not., eg: nfc_normalize('ardèch') */
  nfc_normalize(str: Stringable): StringField;
  /** ORD(STR: VARCHAR): NUMERIC - Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  ord(str: Stringable): NumericField;
  /** SHA1(VALUE: VARCHAR): VARCHAR - Returns the SHA1 hash of the value, eg: sha1('hello') */
  sha1(value: Stringable | Whateverable): StringField;
  /** REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  reduce(list: Whateverable, lambda: Whateverable): WhateverField;
  /** REGEXP_FULL_MATCH(STR: VARCHAR, REGEX: VARCHAR, OPTIONS: VARCHAR): WHATEVER - Returns true if the entire string matches the regex. A set of optional options can be set., eg: regexp_full_match('anabanana', '(an)*') */
  regexp_full_match(str: Stringable, regex: Stringable, options?: Stringable): WhateverField;
  /** REGEXP_REPLACE(STR: VARCHAR, PATTERN: VARCHAR, REPLACEMENT: VARCHAR, OPTIONS: VARCHAR): VARCHAR - If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set., eg: regexp_replace('hello', '[lo]', '-') */
  regexp_replace(str: Stringable, pattern: Stringable, replacement: Stringable, options?: Stringable): StringField;
  /** REGEXP_SPLIT_TO_ARRAY(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  regexp_split_to_array(str: Stringable, separator: Stringable, col2?: Stringable): WhateverField;
  /** ROW(): WHATEVER - Create an unnamed STRUCT (tuple) containing the argument values., eg: row(i, i % 4, i / 4) */
  row(): WhateverField;
  /** ROUND(X: FLOAT, PRECISION: INTEGER): NUMERIC - Rounds x to s decimal places, eg: round(42.4332, 2) */
  round(x: Numericable, precision?: Numericable): NumericField;
  /** ARRAY_AGGREGATE(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  array_aggregate(list: Whateverable, name: Stringable): WhateverField;
  /** ARRAY_CAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  array_cat(list1: Whateverable, list2: Whateverable): WhateverField;
  /** ARRAY_LENGTH(LIST: ANY[], COL1: BIGINT): NUMERIC - Returns the length of the list., eg: array_length([1,2,3]) */
  array_length(list: Whateverable, col1?: Numericable): NumericField;
  /** ARRAY_POSITION(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  array_position(list: Whateverable, element: Whateverable): NumericField;
  /** URL_DECODE(INPUT: VARCHAR): VARCHAR - Unescapes the URL encoded input., eg: url_decode('this%20string%20is%2BFencoded') */
  url_decode(input: Stringable): StringField;
  /** ARRAY_TRANSFORM(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  array_transform(list: Whateverable, lambda: Whateverable): WhateverField;
  /** ARRAY_UNIQUE(LIST: ANY[]): NUMERIC - Counts the unique elements of a list, eg: list_unique([1, 1, NULL, -3, 1, 5]) */
  array_unique(list: Whateverable): NumericField;
  /** ASCII(STR: VARCHAR): NUMERIC - Returns an integer that represents the Unicode code point of the first character of the string, eg: ascii('Ω') */
  ascii(str: Stringable): NumericField;
  /** BITSTRING(BITSTR: BIT, LENGTH: INTEGER): WHATEVER - Pads the bitstring until the specified length, eg: bitstring('1010'::BIT, 7) */
  bitstring(bitstr: Whateverable | Stringable, length: Numericable): WhateverField;
  /** CAN_CAST_IMPLICITLY(SOURCETYPE: ANY, TARGETTYPE: ANY): WHATEVER - Whether or not we can implicitly cast from the source type to the other type, eg: can_implicitly_cast(NULL::INTEGER, NULL::BIGINT) */
  can_cast_implicitly(sourceType: Whateverable, targetType: Whateverable): WhateverField;
  /** TYPEOF(EXPRESSION: ANY): VARCHAR - Returns the name of the data type of the result of the expression, eg: typeof('abc') */
  typeof(expression: Whateverable): StringField;
  /** TRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from either side of the string, eg: trim('>>>>test<<', '><') */
  trim(str: Stringable, characters?: Stringable): StringField;
  /** CURRENT_SETTING(SETTINGNAME: VARCHAR): WHATEVER - Returns the current value of the configuration setting, eg: current_setting('access_mode') */
  current_setting(settingName: Stringable): WhateverField;
  /** DATETRUNC(PART: VARCHAR, TIMESTAMP: DATE): WHATEVER - Truncate to specified precision, eg: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40') */
  datetrunc(part: Stringable, timestamp: Whateverable): WhateverField;
  /** DATE_DIFF(PART: VARCHAR, STARTDATE: DATE, ENDDATE: DATE): NUMERIC - The number of partition boundaries between the timestamps, eg: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  date_diff(part: Stringable, startdate: Whateverable, enddate: Whateverable): NumericField;
  /** DAY(TS: DATE): NUMERIC - Extract the day component from a date or timestamp, eg: day(timestamp '2021-08-03 11:59:44.123456') */
  day(ts: Whateverable): NumericField;
  /** DAYOFYEAR(TS: DATE): NUMERIC - Extract the dayofyear component from a date or timestamp, eg: dayofyear(timestamp '2021-08-03 11:59:44.123456') */
  dayofyear(ts: Whateverable): NumericField;
  /** DECADE(TS: DATE): NUMERIC - Extract the decade component from a date or timestamp, eg: decade(timestamp '2021-08-03 11:59:44.123456') */
  decade(ts: Whateverable): NumericField;
  /** ENUM_RANGE_BOUNDARY(START: ANY, END: ANY): WHATEVER - Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type, eg: enum_range_boundary(NULL, 'happy'::mood) */
  enum_range_boundary(start: Whateverable, end: Whateverable): WhateverField;
  /** EPOCH_MS(TEMPORAL: DATE): NUMERIC - Extract the epoch component in milliseconds from a temporal type, eg: epoch_ms(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ms(temporal: Whateverable | Numericable): NumericField;
  /** EPOCH_US(TEMPORAL: DATE): NUMERIC - Extract the epoch component in microseconds from a temporal type, eg: epoch_us(timestamp '2021-08-03 11:59:44.123456') */
  epoch_us(temporal: Whateverable): NumericField;
  /** ERA(TS: DATE): NUMERIC - Extract the era component from a date or timestamp, eg: era(timestamp '2021-08-03 11:59:44.123456') */
  era(ts: Whateverable): NumericField;
  /** FROM_JSON(COL0: JSON, COL1: VARCHAR): WHATEVER - , eg: null */
  from_json(col0: Whateverable | Stringable, col1: Stringable): WhateverField;
  /** GETVARIABLE(COL0: VARCHAR): WHATEVER - , eg: null */
  getvariable(col0: Stringable): WhateverField;
  /** TO_HOURS(INTEGER: BIGINT): WHATEVER - Construct a hour interval, eg: to_hours(5) */
  to_hours(integer: Numericable): WhateverField;
  /** GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  grade_up(list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField;
  /** HEX(VALUE: VARINT): VARCHAR - Converts the value to hexadecimal representation, eg: hex(42) */
  hex(value: Whateverable | Numericable | Stringable): StringField;
  /** INSTR(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  instr(haystack: Stringable, needle: Stringable): NumericField;
  /** JARO_WINKLER_SIMILARITY(STR1: VARCHAR, STR2: VARCHAR, SCORECUTOFF: DOUBLE): NUMERIC - The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaro_winkler_similarity('duck', 'duckdb', 0.5) */
  jaro_winkler_similarity(str1: Stringable, str2: Stringable, scoreCutoff?: Numericable): NumericField;
  /** JSON_CONTAINS(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_contains(col0: Stringable | Whateverable, col1: Stringable | Whateverable): WhateverField;
  /** JSON_EXISTS(COL0: JSON, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_exists(col0: Whateverable | Stringable, col1: Whateverable | Stringable): WhateverField;
  /** JSON_MERGE_PATCH(): WHATEVER - , eg: null */
  json_merge_patch(): WhateverField;
  /** JSON_OBJECT(): WHATEVER - , eg: null */
  json_object(): WhateverField;
  /** JSON_SERIALIZE_PLAN(COL0: VARCHAR, COL1: BOOLEAN, COL2: BOOLEAN, COL3: BOOLEAN, COL4: BOOLEAN): WHATEVER - , eg: null */
  json_serialize_plan(col0: Stringable, col1?: Whateverable, col2?: Whateverable, col3?: Whateverable, col4?: Whateverable): WhateverField;
  /** JSON_TRANSFORM(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_transform(col0: Stringable | Whateverable, col1: Stringable): WhateverField;
  /** JSON_VALID(COL0: JSON): WHATEVER - , eg: null */
  json_valid(col0: Whateverable | Stringable): WhateverField;
  /** LEAST(ARG1: ANY): WHATEVER - Returns the lowest value of the set of input parameters, eg: least(42, 84) */
  least(arg1: Whateverable): WhateverField;
  /** LIST_DISTINCT(LIST: ANY[]): WHATEVER - Removes all duplicates and NULLs from a list. Does not preserve the original order, eg: list_distinct([1, 1, NULL, -3, 1, 5]) */
  list_distinct(list: Whateverable): WhateverField;
  /** LIST_DOT_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the inner product between two lists, eg: list_inner_product([1, 2, 3], [1, 2, 3]) */
  list_dot_product(list1: Whateverable, list2: Whateverable): NumericField;
  /** LIST_ELEMENT(LIST: ANY[], INDEX: BIGINT): WHATEVER - Extract the indexth (1-based) value from the list., eg: list_extract([4, 5, 6], 3) */
  list_element(list: Whateverable | Stringable, index: Numericable): WhateverField;
  /** STRUCT_INSERT(): WHATEVER - Adds field(s)/value(s) to an existing STRUCT with the argument values. The entry name(s) will be the bound variable name(s), eg: struct_insert({'a': 1}, b := 2) */
  struct_insert(): WhateverField;
  /** STRPOS(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  strpos(haystack: Stringable, needle: Stringable): NumericField;
  /** LIST_TRANSFORM(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  list_transform(list: Whateverable, lambda: Whateverable): WhateverField;
  /** LOWER(STR: VARCHAR): VARCHAR - Convert string to lower case, eg: lower('Hello') */
  lower(str: Stringable): StringField;
  /** LPAD(STR: VARCHAR, COUNT: INTEGER, CHARACTER: VARCHAR): VARCHAR - Pads the string with the character from the left until it has count characters, eg: lpad('hello', 10, '>') */
  lpad(str: Stringable, count: Numericable, character: Stringable): StringField;
  /** LTRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from the left side of the string, eg: ltrim('>>>>test<<', '><') */
  ltrim(str: Stringable, characters?: Stringable): StringField;
  /** MAKE_TIMESTAMPTZ(COL0: BIGINT, COL1: BIGINT, COL2: BIGINT, COL3: BIGINT, COL4: BIGINT, COL5: DOUBLE, COL6: VARCHAR): WHATEVER - , eg: null */
  make_timestamptz(col0: Numericable, col1?: Numericable, col2?: Numericable, col3?: Numericable, col4?: Numericable, col5?: Numericable, col6?: Stringable): WhateverField;
  /** MAP(): WHATEVER - Creates a map from a set of keys and values, eg: map(['key1', 'key2'], ['val1', 'val2']) */
  map(): WhateverField;
  /** MAP_CONCAT(): WHATEVER - Returns a map created from merging the input maps, on key collision the value is taken from the last map with that key, eg: map_concat(map([1,2], ['a', 'b']), map([2,3], ['c', 'd'])); */
  map_concat(): WhateverField;
  /** SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  split(str: Stringable, separator: Stringable): WhateverField;
  /** MOD(COL0: TINYINT, COL1: TINYINT): NUMERIC - , eg: null */
  mod(col0: Numericable, col1: Numericable): NumericField;
  /** PARSE_FILENAME(STR: VARCHAR, TRIMEXTENSION: BOOLEAN, SEPARATOR: VARCHAR): VARCHAR - Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash, eg: parse_filename('path/to/file.csv', true, 'forward_slash') */
  parse_filename(str: Stringable, trimExtension?: Whateverable | Stringable, separator?: Stringable): StringField;
  /** PARSE_PATH(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash, eg: parse_path('path/to/file.csv', 'system') */
  parse_path(str: Stringable, separator?: Stringable): WhateverField;
  /** POSITION(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  position(haystack: Stringable, needle: Stringable): NumericField;
  /** REVERSE(STR: VARCHAR): VARCHAR - Reverses the string, eg: reverse('hello') */
  reverse(str: Stringable): StringField;
  /** ABS(X: TINYINT): NUMERIC - Absolute value, eg: abs(-17.4) */
  abs(x: Numericable): NumericField;
  /** ACOS(X: DOUBLE): NUMERIC - Computes the arccosine of x, eg: acos(0.5) */
  acos(x: Numericable): NumericField;
  /** AGE(TIMESTAMP: TIMESTAMP): WHATEVER - Subtract arguments, resulting in the time difference between the two timestamps, eg: age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20') */
  age(timestamp: Whateverable): WhateverField;
  /** AGGREGATE(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  aggregate(list: Whateverable, name: Stringable): WhateverField;
  /** APPLY(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  apply(list: Whateverable, lambda: Whateverable): WhateverField;
  /** ARRAY_CONCAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  array_concat(list1: Whateverable, list2: Whateverable): WhateverField;
  /** ARRAY_HAS_ANY(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if the lists have any element in common. NULLs are ignored., eg: list_has_any([1, 2, 3], [2, 3, 4]) */
  array_has_any(l1: Whateverable, p1: Whateverable): WhateverField;
  /** VERSION(): VARCHAR - Returns the currently active version of DuckDB in this format: v0.3.2	, eg: version() */
  version(): StringField;
  /** ARRAY_SELECT(VALUELIST: ANY[], INDEXLIST: BIGINT[]): WHATEVER - Returns a list based on the elements selected by the index_list., eg: list_select([10, 20, 30, 40], [1, 4]) */
  array_select(valueList: Whateverable, indexList: Whateverable): WhateverField;
  /** ATAN(X: DOUBLE): NUMERIC - Computes the arctangent of x, eg: atan(0.5) */
  atan(x: Numericable): NumericField;
  /** BIT_LENGTH(COL0: VARCHAR): NUMERIC - , eg: null */
  bit_length(col0: Stringable | Whateverable): NumericField;
  /** UNICODE(STR: VARCHAR): NUMERIC - Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  unicode(str: Stringable): NumericField;
  /** CBRT(X: DOUBLE): NUMERIC - Returns the cube root of x, eg: cbrt(8) */
  cbrt(x: Numericable): NumericField;
  /** CEIL(X: FLOAT): NUMERIC - Rounds the number up, eg: ceil(17.4) */
  ceil(x: Numericable): NumericField;
  /** CENTURY(TS: DATE): NUMERIC - Extract the century component from a date or timestamp, eg: century(timestamp '2021-08-03 11:59:44.123456') */
  century(ts: Whateverable): NumericField;
  /** CHR(CODEPOINT: INTEGER): VARCHAR - Returns a character which is corresponding the ASCII code value or Unicode code point, eg: chr(65) */
  chr(codePoint: Numericable): StringField;
  /** UCASE(STR: VARCHAR): VARCHAR - Convert string to upper case., eg: upper('Hello') */
  ucase(str: Stringable): StringField;
  /** DATEDIFF(PART: VARCHAR, STARTDATE: DATE, ENDDATE: DATE): NUMERIC - The number of partition boundaries between the timestamps, eg: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  datediff(part: Stringable, startdate: Whateverable, enddate: Whateverable): NumericField;
  /** DATESUB(PART: VARCHAR, STARTDATE: DATE, ENDDATE: DATE): NUMERIC - The number of complete partitions between the timestamps, eg: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  datesub(part: Stringable, startdate: Whateverable, enddate: Whateverable): NumericField;
  /** TO_WEEKS(INTEGER: INTEGER): WHATEVER - Construct a week interval, eg: to_weeks(5) */
  to_weeks(integer: Numericable): WhateverField;
  /** ENCODE(STR: VARCHAR): WHATEVER - Convert varchar to blob. Converts utf-8 characters into literal encoding, eg: encode('my_string_with_ü') */
  encode(str: Stringable): WhateverField;
  /** EXP(X: DOUBLE): NUMERIC - Computes e to the power of x, eg: exp(1) */
  exp(x: Numericable): NumericField;
  /** FILTER(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Constructs a list from those elements of the input list for which the lambda function returns true, eg: list_filter([3, 4, 5], x -> x > 4) */
  filter(list: Whateverable, lambda: Whateverable): WhateverField;
  /** FINALIZE(COL0: AGGREGATE_STATE<?>): WHATEVER - , eg: null */
  finalize(col0: Whateverable): WhateverField;
  /** FLATTEN(NESTEDLIST: ANY[][]): WHATEVER - Flatten a nested list by one level, eg: flatten([[1, 2, 3], [4, 5]]) */
  flatten(nestedList: Whateverable): WhateverField;
  /** TO_MINUTES(INTEGER: BIGINT): WHATEVER - Construct a minute interval, eg: to_minutes(5) */
  to_minutes(integer: Numericable): WhateverField;
  /** FROM_HEX(VALUE: VARCHAR): WHATEVER - Converts a value from hexadecimal representation to a blob, eg: unhex('2A') */
  from_hex(value: Stringable): WhateverField;
  /** GET_BIT(BITSTR: BIT, INDEX: INTEGER): NUMERIC - Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0, eg: get_bit('0110010'::BIT, 2) */
  get_bit(bitstr: Whateverable, index: Numericable): NumericField;
  /** GREATEST_COMMON_DIVISOR(X: BIGINT, Y: BIGINT): NUMERIC - Computes the greatest common divisor of x and y, eg: greatest_common_divisor(42, 57) */
  greatest_common_divisor(x: Numericable, y: Numericable): NumericField;
  /** HOUR(TS: DATE): NUMERIC - Extract the hour component from a date or timestamp, eg: hour(timestamp '2021-08-03 11:59:44.123456') */
  hour(ts: Whateverable): NumericField;
  /** JSON_PRETTY(COL0: JSON): VARCHAR - , eg: null */
  json_pretty(col0: Whateverable): StringField;
  /** LEFT_GRAPHEME(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the left-most count grapheme clusters, eg: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1) */
  left_grapheme(str: Stringable, count: Numericable): StringField;
  /** LIST_AGGREGATE(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  list_aggregate(list: Whateverable, name: Stringable): WhateverField;
  /** SUBSTRING(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring('Hello', 2, 2) */
  substring(str: Stringable, start: Numericable, length?: Numericable): StringField;
  /** STR_SPLIT_REGEX(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  str_split_regex(str: Stringable, separator: Stringable, col2?: Stringable): WhateverField;
  /** STRUCT_PACK(): WHATEVER - Create a STRUCT containing the argument values. The entry name will be the bound variable name., eg: struct_pack(i := 4, s := 'string') */
  struct_pack(): WhateverField;
  /** LIST_DISTANCE(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the distance between two lists, eg: list_distance([1, 2, 3], [1, 2, 3]) */
  list_distance(list1: Whateverable, list2: Whateverable): NumericField;
  /** MD5(VALUE: VARCHAR): VARCHAR - Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5(value: Stringable | Whateverable): StringField;
  /** MILLENNIUM(TS: DATE): NUMERIC - Extract the millennium component from a date or timestamp, eg: millennium(timestamp '2021-08-03 11:59:44.123456') */
  millennium(ts: Whateverable): NumericField;
  /** NOT_ILIKE_ESCAPE(STR: VARCHAR, LIKESPECIFIER: VARCHAR, ESCAPECHARACTER: VARCHAR): WHATEVER - Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string., eg: not_ilike_escape('A%c', 'a$%C', '$') */
  not_ilike_escape(str: Stringable, likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField;
  /** NOT_LIKE_ESCAPE(STR: VARCHAR, LIKESPECIFIER: VARCHAR, ESCAPECHARACTER: VARCHAR): WHATEVER - Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string., eg: not_like_escape('a%c', 'a$%c', '$') */
  not_like_escape(str: Stringable, likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField;
  /** PRINTF(FORMAT: VARCHAR): VARCHAR - Formats a string using printf syntax, eg: printf('Benchmark "%s" took %d seconds', 'CSV', 42) */
  printf(format: Stringable): StringField;
  /** REGEXP_EXTRACT_ALL(STR: VARCHAR, P1: VARCHAR): WHATEVER - Split the string along the regex and extract all occurrences of group. A set of optional options can be set., eg: regexp_extract_all('hello_world', '([a-z ]+)_?', 1) */
  regexp_extract_all(str: Stringable, p1: Stringable): WhateverField;
  /** RTRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from the right side of the string, eg: rtrim('>>>>test<<', '><') */
  rtrim(str: Stringable, characters?: Stringable): StringField;
  /** RIGHT_GRAPHEME(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the right-most count grapheme clusters, eg: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1) */
  right_grapheme(str: Stringable, count: Numericable): StringField;
  /** ACOSH(X: DOUBLE): NUMERIC - Computes the inverse hyperbolic cos of x, eg: acosh(2.3) */
  acosh(x: Numericable): NumericField;
  /** WEEKOFYEAR(TS: DATE): NUMERIC - Extract the weekofyear component from a date or timestamp, eg: weekofyear(timestamp '2021-08-03 11:59:44.123456') */
  weekofyear(ts: Whateverable): NumericField;
  /** WEEK(TS: DATE): NUMERIC - Extract the week component from a date or timestamp, eg: week(timestamp '2021-08-03 11:59:44.123456') */
  week(ts: Whateverable): NumericField;
  /** ARRAY_COSINE_DISTANCE(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_cosine_distance([1, 2, 3], [1, 2, 3]) */
  array_cosine_distance(array1: Whateverable, array2: Whateverable): NumericField;
  /** ARRAY_REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  array_reduce(list: Whateverable, lambda: Whateverable): WhateverField;
  /** ARRAY_ZIP(): WHATEVER - Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length., eg: list_zip([1, 2], [3, 4], [5, 6]) */
  array_zip(): WhateverField;
  /** ATAN2(Y: DOUBLE, X: DOUBLE): NUMERIC - Computes the arctangent (y, x), eg: atan2(1.0, 0.0) */
  atan2(y: Numericable, x: Numericable): NumericField;
  /** BASE64(BLOB: BLOB): VARCHAR - Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  base64(blob: Whateverable): StringField;
  /** UNION_VALUE(): WHATEVER - Create a single member UNION containing the argument value. The tag of the value will be the bound variable name, eg: union_value(k := 'hello') */
  union_value(): WhateverField;
  /** BIT_COUNT(X: BIT): NUMERIC - Returns the number of bits that are set, eg: bit_count(31) */
  bit_count(x: Whateverable | Numericable): NumericField;
  /** CEILING(X: FLOAT): NUMERIC - Rounds the number up, eg: ceil(17.4) */
  ceiling(x: Numericable): NumericField;
  /** CONCAT(STR: ANY): WHATEVER - Concatenate many strings together., eg: concat('Hello', ' ', 'World') */
  concat(str: Whateverable): WhateverField;
  /** CREATE_SORT_KEY(PARAMETERS: ANY): WHATEVER - Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers, eg: create_sort_key('A', 'DESC') */
  create_sort_key(parameters: Whateverable): WhateverField;
  /** TRANSLATE(STR: VARCHAR, FROM: VARCHAR, TO: VARCHAR): VARCHAR - Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted, eg: translate('12345', '143', 'ax') */
  translate(str: Stringable, from: Stringable, to: Stringable): StringField;
  /** EDITDIST3(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: levenshtein('duck','db') */
  editdist3(str1: Stringable, str2: Stringable): NumericField;
  /** TO_TIMESTAMP(SEC: DOUBLE): WHATEVER - Converts secs since epoch to a timestamp with time zone, eg: to_timestamp(1284352323.5) */
  to_timestamp(sec: Numericable): WhateverField;
  /** ENUM_RANGE(ENUMERATION: ANY): WHATEVER - Returns all values of the input enum type as an array, eg: enum_range(NULL::mood) */
  enum_range(enumeration: Whateverable): WhateverField;
  /** EVEN(X: DOUBLE): NUMERIC - Rounds x to next even number by rounding away from zero, eg: even(2.9) */
  even(x: Numericable): NumericField;
  /** TO_MONTHS(INTEGER: INTEGER): WHATEVER - Construct a month interval, eg: to_months(5) */
  to_months(integer: Numericable): WhateverField;
  /** FORMATREADABLESIZE(BYTES: BIGINT): VARCHAR - Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  formatReadableSize(bytes: Numericable): StringField;
  /** FROM_BINARY(VALUE: VARCHAR): WHATEVER - Converts a value from binary representation to a blob, eg: unbin('0110') */
  from_binary(value: Stringable): WhateverField;
  /** GAMMA(X: DOUBLE): NUMERIC - Interpolation of (x-1) factorial (so decimal inputs are allowed), eg: gamma(5.5) */
  gamma(x: Numericable): NumericField;
  /** GCD(X: BIGINT, Y: BIGINT): NUMERIC - Computes the greatest common divisor of x and y, eg: greatest_common_divisor(42, 57) */
  gcd(x: Numericable, y: Numericable): NumericField;
  /** TO_DAYS(INTEGER: INTEGER): WHATEVER - Construct a day interval, eg: to_days(5) */
  to_days(integer: Numericable): WhateverField;
  /** ISFINITE(X: DATE): WHATEVER - Returns true if the floating point value is finite, false otherwise, eg: isfinite(5.5) */
  isfinite(x: Whateverable | Numericable): WhateverField;
  /** TO_BASE(NUMBER: BIGINT, RADIX: INTEGER, MINLENGTH: INTEGER): VARCHAR - Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length, eg: to_base(42, 16) */
  to_base(number: Numericable, radix: Numericable, minLength?: Numericable): StringField;
  /** LENGTH(STR: VARCHAR): NUMERIC - Number of characters in string., eg: length('Hello🦆') */
  length(str: Stringable | Whateverable): NumericField;
  /** TIMEZONE(TS: INTERVAL, COL1: TIME WITH TIME ZONE): NUMERIC - Extract the timezone component from a date or timestamp, eg: timezone(timestamp '2021-08-03 11:59:44.123456') */
  timezone(ts: Whateverable | Stringable, col1?: Whateverable): NumericField;
  /** TANH(X: DOUBLE): NUMERIC - Computes the hyperbolic tan of x, eg: tanh(1) */
  tanh(x: Numericable): NumericField;
  /** LIST_APPLY(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  list_apply(list: Whateverable, lambda: Whateverable): WhateverField;
  /** STRING_TO_ARRAY(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  string_to_array(str: Stringable, separator: Stringable): WhateverField;
  /** LIST_PACK(): WHATEVER - Create a LIST containing the argument values, eg: list_value(4, 5, 6) */
  list_pack(): WhateverField;
  /** LIST_SLICE(LIST: ANY, BEGIN: ANY, END: ANY, STEP: BIGINT): WHATEVER - Extract a sublist using slice conventions. Negative values are accepted., eg: list_slice([4, 5, 6], 2, 3) */
  list_slice(list: Whateverable, begin: Whateverable, end: Whateverable, step?: Numericable): WhateverField;
  /** SQRT(X: DOUBLE): NUMERIC - Returns the square root of x, eg: sqrt(4) */
  sqrt(x: Numericable): NumericField;
  /** MAKE_DATE(YEAR: BIGINT, MONTH: BIGINT, DAY: BIGINT): WHATEVER - The date for the given struct., eg: make_date({'year': 2024, 'month': 11, 'day': 14}) */
  make_date(year: Numericable | Whateverable, month?: Numericable, day?: Numericable): WhateverField;
  /** MAP_EXTRACT_VALUE(MAP: ANY, KEY: ANY): WHATEVER - Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: map_extract_value(map(['key'], ['val']), 'key') */
  map_extract_value(map: Whateverable, key: Whateverable): WhateverField;
  /** MD5_NUMBER(VALUE: VARCHAR): NUMERIC - Returns the MD5 hash of the value as an INT128, eg: md5_number('123') */
  md5_number(value: Stringable | Whateverable): NumericField;
  /** MILLISECOND(TS: DATE): NUMERIC - Extract the millisecond component from a date or timestamp, eg: millisecond(timestamp '2021-08-03 11:59:44.123456') */
  millisecond(ts: Whateverable): NumericField;
  /** MONTH(TS: DATE): NUMERIC - Extract the month component from a date or timestamp, eg: month(timestamp '2021-08-03 11:59:44.123456') */
  month(ts: Whateverable): NumericField;
  /** NANOSECOND(TSNS: DATE): NUMERIC - Extract the nanosecond component from a date or timestamp, eg: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789 */
  nanosecond(tsns: Whateverable): NumericField;
  /** OCTET_LENGTH(BLOB: BLOB): NUMERIC - Number of bytes in blob., eg: octet_length('\xAA\xBB'::BLOB) */
  octet_length(blob: Whateverable): NumericField;
  /** QUARTER(TS: DATE): NUMERIC - Extract the quarter component from a date or timestamp, eg: quarter(timestamp '2021-08-03 11:59:44.123456') */
  quarter(ts: Whateverable): NumericField;
  /** REGEXP_EXTRACT(STR: VARCHAR, PATTERN: VARCHAR, GROUP: INTEGER, OPTIONS: VARCHAR): VARCHAR - If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set., eg: regexp_extract('abc', '([a-z])(b)', 1) */
  regexp_extract(str: Stringable, pattern: Stringable, group?: Numericable | Whateverable, options?: Stringable): StringField;
  /** REGEXP_MATCHES(STR: VARCHAR, PATTERN: VARCHAR, OPTIONS: VARCHAR): WHATEVER - Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set., eg: regexp_matches('anabanana', '(an)*') */
  regexp_matches(str: Stringable, pattern: Stringable, options?: Stringable): WhateverField;
  /** YEARWEEK(TS: DATE): NUMERIC - Extract the yearweek component from a date or timestamp, eg: yearweek(timestamp '2021-08-03 11:59:44.123456') */
  yearweek(ts: Whateverable): NumericField;
  /** ARRAY_AGGR(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  array_aggr(list: Whateverable, name: Stringable): WhateverField;
  /** ARRAY_FILTER(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Constructs a list from those elements of the input list for which the lambda function returns true, eg: list_filter([3, 4, 5], x -> x > 4) */
  array_filter(list: Whateverable, lambda: Whateverable): WhateverField;
  /** ARRAY_INNER_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_inner_product([1, 2, 3], [1, 2, 3]) */
  array_inner_product(array1: Whateverable, array2: Whateverable): NumericField;
  /** ARRAY_RESIZE(LIST: ANY[], SIZE: ANY, VALUE: ANY): WHATEVER - Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: list_resize([1, 2, 3], 5, 0) */
  array_resize(list: Whateverable, size: Whateverable, value?: Whateverable): WhateverField;
  /** ARRAY_TO_JSON(): WHATEVER - , eg: null */
  array_to_json(): WhateverField;
  /** BAR(X: DOUBLE, MIN: DOUBLE, MAX: DOUBLE, WIDTH: DOUBLE): VARCHAR - Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80, eg: bar(5, 0, 20, 10) */
  bar(x: Numericable, min: Numericable, max: Numericable, width?: Numericable): StringField;
  /** BIN(VALUE: VARINT): VARCHAR - Converts the value to binary representation, eg: bin(42) */
  bin(value: Whateverable | Stringable | Numericable): StringField;
  /** UNION_TAG(UNION: UNION): WHATEVER - Retrieve the currently selected tag of the union as an ENUM, eg: union_tag(union_value(k := 'foo')) */
  union_tag(union: Whateverable): WhateverField;
  /** DATE_SUB(PART: VARCHAR, STARTDATE: DATE, ENDDATE: DATE): NUMERIC - The number of complete partitions between the timestamps, eg: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  date_sub(part: Stringable, startdate: Whateverable, enddate: Whateverable): NumericField;
  /** DAYOFWEEK(TS: DATE): NUMERIC - Extract the dayofweek component from a date or timestamp, eg: dayofweek(timestamp '2021-08-03 11:59:44.123456') */
  dayofweek(ts: Whateverable): NumericField;
  /** DEGREES(X: DOUBLE): NUMERIC - Converts radians to degrees, eg: degrees(pi()) */
  degrees(x: Numericable): NumericField;
  /** ELEMENT_AT(MAP: ANY, KEY: ANY): WHATEVER - Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: map_extract(map(['key'], ['val']), 'key') */
  element_at(map: Whateverable, key: Whateverable): WhateverField;
  /** ENDS_WITH(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  ends_with(col0: Stringable, col1: Stringable): WhateverField;
  /** ENUM_FIRST(ENUMERATION: ANY): VARCHAR - Returns the first value of the input enum type, eg: enum_first(NULL::mood) */
  enum_first(enumeration: Whateverable): StringField;
  /** TO_SECONDS(DOUBLE: DOUBLE): WHATEVER - Construct a second interval, eg: to_seconds(5.5) */
  to_seconds(double: Numericable): WhateverField;
  /** FORMAT(FORMAT: VARCHAR): VARCHAR - Formats a string using fmt syntax, eg: format('Benchmark "{}" took {} seconds', 'CSV', 42) */
  format(format: Stringable): StringField;
  /** TO_MILLISECONDS(DOUBLE: DOUBLE): WHATEVER - Construct a millisecond interval, eg: to_milliseconds(5.5) */
  to_milliseconds(double: Numericable): WhateverField;
  /** TO_DECADES(INTEGER: INTEGER): WHATEVER - Construct a decade interval, eg: to_decades(5) */
  to_decades(integer: Numericable): WhateverField;
  /** JARO_SIMILARITY(STR1: VARCHAR, STR2: VARCHAR, SCORECUTOFF: DOUBLE): NUMERIC - The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaro_similarity('duck', 'duckdb', 0.5) */
  jaro_similarity(str1: Stringable, str2: Stringable, scoreCutoff?: Numericable): NumericField;
  /** TO_CENTURIES(INTEGER: INTEGER): WHATEVER - Construct a century interval, eg: to_centuries(5) */
  to_centuries(integer: Numericable): WhateverField;
  /** JSON_TRANSFORM_STRICT(COL0: JSON, COL1: VARCHAR): WHATEVER - , eg: null */
  json_transform_strict(col0: Whateverable | Stringable, col1: Stringable): WhateverField;
  /** LCM(X: BIGINT, Y: BIGINT): NUMERIC - Computes the least common multiple of x and y, eg: least_common_multiple(42, 57) */
  lcm(x: Numericable, y: Numericable): NumericField;
  /** LEAST_COMMON_MULTIPLE(X: BIGINT, Y: BIGINT): NUMERIC - Computes the least common multiple of x and y, eg: least_common_multiple(42, 57) */
  least_common_multiple(x: Numericable, y: Numericable): NumericField;
  /** LENGTH_GRAPHEME(STR: VARCHAR): NUMERIC - Number of grapheme clusters in string., eg: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️') */
  length_grapheme(str: Stringable): NumericField;
  /** TIMETZ_BYTE_COMPARABLE(TIMETZ: TIME WITH TIME ZONE): NUMERIC - Converts a TIME WITH TIME ZONE to an integer sort key, eg: timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ) */
  timetz_byte_comparable(timeTz: Whateverable): NumericField;
  /** LIST_AGGR(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  list_aggr(list: Whateverable, name: Stringable): WhateverField;
  /** LIST_CAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  list_cat(list1: Whateverable, list2: Whateverable): WhateverField;
  /** LIST_GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  list_grade_up(list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField;
  /** LIST_REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  list_reduce(list: Whateverable, lambda: Whateverable): WhateverField;
  /** LIST_HAS_ALL(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if all elements of l2 are in l1. NULLs are ignored., eg: list_has_all([1, 2, 3], [2, 3]) */
  list_has_all(l1: Whateverable, p1: Whateverable): WhateverField;
  /** LIST_SELECT(VALUELIST: ANY[], INDEXLIST: BIGINT[]): WHATEVER - Returns a list based on the elements selected by the index_list., eg: list_select([10, 20, 30, 40], [1, 4]) */
  list_select(valueList: Whateverable, indexList: Whateverable): WhateverField;
  /** LOG2(X: DOUBLE): NUMERIC - Computes the 2-log of x, eg: log2(8) */
  log2(x: Numericable): NumericField;
  /** MAKE_TIME(HOUR: BIGINT, MINUTE: BIGINT, SECONDS: DOUBLE): WHATEVER - The time for the given parts, eg: make_time(13, 34, 27.123456) */
  make_time(hour: Numericable, minute: Numericable, seconds: Numericable): WhateverField;
  /** NORMALIZED_INTERVAL(INTERVAL: INTERVAL): WHATEVER - Normalizes an INTERVAL to an equivalent interval, eg: normalized_interval(INTERVAL '30 days') */
  normalized_interval(interval: Whateverable): WhateverField;
  /** PARSE_DIRNAME(STR: VARCHAR, SEPARATOR: VARCHAR): VARCHAR - Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash, eg: parse_dirname('path/to/file.csv', 'system') */
  parse_dirname(str: Stringable, separator?: Stringable): StringField;
  /** PREFIX(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  prefix(col0: Stringable, col1: Stringable): WhateverField;
  /** SECOND(TS: DATE): NUMERIC - Extract the second component from a date or timestamp, eg: second(timestamp '2021-08-03 11:59:44.123456') */
  second(ts: Whateverable): NumericField;
  /** RPAD(STR: VARCHAR, COUNT: INTEGER, CHARACTER: VARCHAR): VARCHAR - Pads the string with the character from the right until it has count characters, eg: rpad('hello', 10, '<') */
  rpad(str: Stringable, count: Numericable, character: Stringable): StringField;
  /** REPLACE(STR: VARCHAR, SOURCE: VARCHAR, TARGET: VARCHAR): VARCHAR - Replaces any occurrences of the source with target in string, eg: replace('hello', 'l', '-') */
  replace(str: Stringable, source: Stringable, target: Stringable): StringField;
  /** YEAR(TS: DATE): NUMERIC - Extract the year component from a date or timestamp, eg: year(timestamp '2021-08-03 11:59:44.123456') */
  year(ts: Whateverable): NumericField;
  /** ARRAY_DISTANCE(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_distance([1, 2, 3], [1, 2, 3]) */
  array_distance(array1: Whateverable, array2: Whateverable): NumericField;
  /** ARRAY_INDEXOF(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  array_indexof(list: Whateverable, element: Whateverable): NumericField;
  /** ARRAY_NEGATIVE_INNER_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  array_negative_inner_product(array1: Whateverable, array2: Whateverable): NumericField;
  /** ARRAY_WHERE(VALUELIST: ANY[], MASKLIST: BOOLEAN[]): WHATEVER - Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list., eg: list_where([10, 20, 30, 40], [true, false, false, true]) */
  array_where(valueList: Whateverable, maskList: Whateverable): WhateverField;
  /** BIT_POSITION(SUBSTR: BIT, BITSTR: BIT): NUMERIC - Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1, eg: bit_position('010'::BIT, '1110101'::BIT) */
  bit_position(substr: Whateverable, bitstr: Whateverable): NumericField;
  /** CARDINALITY(MAP: ANY): NUMERIC - Returns the size of the map (or the number of entries in the map), eg: cardinality( map([4, 2], ['a', 'b']) ); */
  cardinality(map: Whateverable): NumericField;
  /** CONCAT_WS(SEPARATOR: VARCHAR, STR: ANY): VARCHAR - Concatenate strings together separated by the specified separator., eg: concat_ws(', ', 'Banana', 'Apple', 'Melon') */
  concat_ws(separator: Stringable, str: Whateverable): StringField;
  /** DATEPART(TS: VARCHAR[], COL1: DATE): WHATEVER - Get subfield (equivalent to extract), eg: date_part('minute', TIMESTAMP '1992-09-20 20:38:40') */
  datepart(ts: Whateverable | Stringable, col1: Whateverable): WhateverField;
  /** DATE_TRUNC(PART: VARCHAR, TIMESTAMP: DATE): WHATEVER - Truncate to specified precision, eg: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40') */
  date_trunc(part: Stringable, timestamp: Whateverable): WhateverField;
  /** FORMAT_BYTES(BYTES: BIGINT): VARCHAR - Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  format_bytes(bytes: Numericable): StringField;
  /** FROM_JSON_STRICT(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  from_json_strict(col0: Stringable | Whateverable, col1: Stringable): WhateverField;
  /** GREATEST(ARG1: ANY): WHATEVER - Returns the highest value of the set of input parameters, eg: greatest(42, 84) */
  greatest(arg1: Whateverable): WhateverField;
  /** ISNAN(X: FLOAT): WHATEVER - Returns true if the floating point value is not a number, false otherwise, eg: isnan('NaN'::FLOAT) */
  isnan(x: Numericable): WhateverField;
  /** IS_HISTOGRAM_OTHER_BIN(VAL: ANY): WHATEVER - Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin), eg: is_histogram_other_bin(v) */
  is_histogram_other_bin(val: Whateverable): WhateverField;
  /** JACCARD(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaccard('duck','luck') */
  jaccard(str1: Stringable, str2: Stringable): NumericField;
  /** JSON_ARRAY(): WHATEVER - , eg: null */
  json_array(): WhateverField;
  /** TIMEZONE_MINUTE(TS: DATE): NUMERIC - Extract the timezone_minute component from a date or timestamp, eg: timezone_minute(timestamp '2021-08-03 11:59:44.123456') */
  timezone_minute(ts: Whateverable): NumericField;
  /** LEFT(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the left-most count characters, eg: left('Hello🦆', 2) */
  left(str: Stringable, count: Numericable): StringField;
  /** LGAMMA(X: DOUBLE): NUMERIC - Computes the log of the gamma function, eg: lgamma(2) */
  lgamma(x: Numericable): NumericField;
  /** LIKE_ESCAPE(STR: VARCHAR, LIKESPECIFIER: VARCHAR, ESCAPECHARACTER: VARCHAR): WHATEVER - Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string., eg: like_escape('a%c', 'a$%c', '$') */
  like_escape(str: Stringable, likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField;
  /** SUFFIX(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  suffix(col0: Stringable, col1: Stringable): WhateverField;
  /** LIST_CONTAINS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  list_contains(list: Whateverable, element: Whateverable): WhateverField;
  /** LIST_UNIQUE(LIST: ANY[]): NUMERIC - Counts the unique elements of a list, eg: list_unique([1, 1, NULL, -3, 1, 5]) */
  list_unique(list: Whateverable): NumericField;
  /** LIST_WHERE(VALUELIST: ANY[], MASKLIST: BOOLEAN[]): WHATEVER - Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list., eg: list_where([10, 20, 30, 40], [true, false, false, true]) */
  list_where(valueList: Whateverable, maskList: Whateverable): WhateverField;
  /** LIST_ZIP(): WHATEVER - Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length., eg: list_zip([1, 2], [3, 4], [5, 6]) */
  list_zip(): WhateverField;
  /** MAP_FROM_ENTRIES(): WHATEVER - Returns a map created from the entries of the array, eg: map_from_entries([{k: 5, v: 'val1'}, {k: 3, v: 'val2'}]); */
  map_from_entries(): WhateverField;
  /** SIN(X: DOUBLE): NUMERIC - Computes the sin of x, eg: sin(90) */
  sin(x: Numericable): NumericField;
  /** SIGNBIT(X: FLOAT): WHATEVER - Returns whether the signbit is set or not, eg: signbit(-0.0) */
  signbit(x: Numericable): WhateverField;
  /** REGEXP_ESCAPE(STR: VARCHAR): VARCHAR - Escapes all potentially meaningful regexp characters in the input string, eg: regexp_escape('https://duckdb.org') */
  regexp_escape(str: Stringable): StringField;
  /** RIGHT(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the right-most count characters, eg: right('Hello🦆', 3) */
  right(str: Stringable, count: Numericable): StringField;
  /** ALIAS(EXPR: ANY): VARCHAR - Returns the name of a given expression, eg: alias(42 + 1) */
  alias(expr: Whateverable): StringField;
  /** ARRAY_APPLY(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  array_apply(list: Whateverable, lambda: Whateverable): WhateverField;
  /** ARRAY_COSINE_SIMILARITY(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_cosine_similarity([1, 2, 3], [1, 2, 3]) */
  array_cosine_similarity(array1: Whateverable, array2: Whateverable): NumericField;
  /** ARRAY_NEGATIVE_DOT_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  array_negative_dot_product(array1: Whateverable, array2: Whateverable): NumericField;
  /** ASIN(X: DOUBLE): NUMERIC - Computes the arcsine of x, eg: asin(0.5) */
  asin(x: Numericable): NumericField;
  /** UNBIN(VALUE: VARCHAR): WHATEVER - Converts a value from binary representation to a blob, eg: unbin('0110') */
  unbin(value: Stringable): WhateverField;
  /** TRUNC(X: TINYINT): NUMERIC - Truncates the number, eg: trunc(17.4) */
  trunc(x: Numericable): NumericField;
  /** CURRENT_LOCALTIME(): WHATEVER - , eg: null */
  current_localtime(): WhateverField;
  /** CURRENT_LOCALTIMESTAMP(): WHATEVER - , eg: null */
  current_localtimestamp(): WhateverField;
  /** DAYNAME(TS: DATE): VARCHAR - The (English) name of the weekday, eg: dayname(TIMESTAMP '1992-03-22') */
  dayname(ts: Whateverable): StringField;
  /** ENUM_CODE(ENUMERATION: ANY): WHATEVER - Returns the numeric value backing the given enum value, eg: enum_code('happy'::mood) */
  enum_code(enumeration: Whateverable): WhateverField;
  /** ENUM_LAST(ENUMERATION: ANY): VARCHAR - Returns the last value of the input enum type, eg: enum_last(NULL::mood) */
  enum_last(enumeration: Whateverable): StringField;
  /** EPOCH(TEMPORAL: DATE): NUMERIC - Extract the epoch component from a temporal type, eg: epoch(timestamp '2021-08-03 11:59:44.123456') */
  epoch(temporal: Whateverable): NumericField;
  /** FACTORIAL(X: INTEGER): NUMERIC - Factorial of x. Computes the product of the current integer and all integers below it, eg: 4! */
  factorial(x: Numericable): NumericField;
  /** FORMATREADABLEDECIMALSIZE(BYTES: BIGINT): VARCHAR - Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB), eg: format_bytes(1000 * 16) */
  formatReadableDecimalSize(bytes: Numericable): StringField;
  /** FROM_BASE64(STR: VARCHAR): WHATEVER - Convert a base64 encoded string to a character string, eg: from_base64('QQ==') */
  from_base64(str: Stringable): WhateverField;
  /** HAMMING(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: hamming('duck','luck') */
  hamming(str1: Stringable, str2: Stringable): NumericField;
  /** JSON_DESERIALIZE_SQL(COL0: JSON): VARCHAR - , eg: null */
  json_deserialize_sql(col0: Whateverable): StringField;
  /** TAN(X: DOUBLE): NUMERIC - Computes the tan of x, eg: tan(90) */
  tan(x: Numericable): NumericField;
  /** STR_SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  str_split(str: Stringable, separator: Stringable): WhateverField;
  /** LIST_COSINE_DISTANCE(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the cosine distance between two lists, eg: list_cosine_distance([1, 2, 3], [1, 2, 3]) */
  list_cosine_distance(list1: Whateverable, list2: Whateverable): NumericField;
  /** STRUCT_EXTRACT_AT(STRUCT: STRUCT, ENTRY: BIGINT): WHATEVER - Extract the entry from the STRUCT by position (starts at 1!)., eg: struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2) */
  struct_extract_at(struct: Whateverable, entry: Numericable): WhateverField;
  /** LIST_INDEXOF(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  list_indexof(list: Whateverable, element: Whateverable): NumericField;
  /** STRING_SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  string_split(str: Stringable, separator: Stringable): WhateverField;
  /** LIST_NEGATIVE_INNER_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the negative inner product between two lists, eg: list_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  list_negative_inner_product(list1: Whateverable, list2: Whateverable): NumericField;
  /** MAKE_TIMESTAMP_NS(NANOS: BIGINT): WHATEVER - The timestamp for the given nanoseconds since epoch, eg: make_timestamp(1732117793000000000) */
  make_timestamp_ns(nanos: Numericable): WhateverField;
  /** SINH(X: DOUBLE): NUMERIC - Computes the hyperbolic sin of x, eg: sinh(1) */
  sinh(x: Numericable): NumericField;
  /** MINUTE(TS: DATE): NUMERIC - Extract the minute component from a date or timestamp, eg: minute(timestamp '2021-08-03 11:59:44.123456') */
  minute(ts: Whateverable): NumericField;
  /** MISMATCHES(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: hamming('duck','luck') */
  mismatches(str1: Stringable, str2: Stringable): NumericField;
  /** PI(): NUMERIC - Returns the value of pi, eg: pi() */
  pi(): NumericField;
  /** POWER(X: DOUBLE, Y: DOUBLE): NUMERIC - Computes x to the power of y, eg: pow(2, 3) */
  power(x: Numericable, y: Numericable): NumericField;
  /** SET_BIT(BITSTR: BIT, INDEX: INTEGER, NEWVALUE: INTEGER): WHATEVER - Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring, eg: set_bit('0110010'::BIT, 2, 0) */
  set_bit(bitstr: Whateverable, index: Numericable, newValue: Numericable): WhateverField;
}

type ReadCsvOptions = {
  union_by_name: boolean;
  compression: "zstd" | "gzip" | "lzma";
  ignore_errors: boolean;
};

/**
 * Interface for global DuckDB functions
 * These functions can be used directly without chaining to a field
 */
export interface DDBTableFunctions {
  /** Convert string to lowercase */
  read_csv(path: string, opts?: ReadCsvOptions): StringField;
  duckdb_databases(): StringField;
  range(start: number, end?: number): StringField;
}

/**
 * Implementation of string operations
 * Provides concrete implementations of the StringField interface
 */
export class WhateverFieldImpl implements WhateverField {
  /** Tracks the operation chain for this field */
  private ops: Operation;

  /**
   * Create a new string field
   * @param fieldName The name of the field in the database
   */
  constructor(fieldName: string) {
    this.ops = { field: fieldName, method: "", args: [] };
  }

  /** (INTERVAL, INTERVAL): INTERVAL | , eg: undefined */
  add = (col1?: Whateverable | Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "add", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (TINYINT, TINYINT): TINYINT | Bitwise XOR, eg: (17).xor(5) */
  xor = (right: Numericable | Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "xor", args: [right], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT[3], FLOAT[3]): FLOAT[3] | Compute the cross product of two arrays of size 3. The array elements can not be NULL., eg: ([1).array_cross_product(2, 3], [1, 2, 3]) */
  array_cross_product = (p1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_cross_product", args: [p1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[]): ANY[] | Removes all duplicates and NULLs from a list. Does not preserve the original order, eg: ([1).list_distinct(1, NULL, -3, 1, 5]) */
  array_distinct = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_distinct", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the array., eg: ('DuckDB').array_extract(2) */
  array_extract = (index: Numericable | Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_extract", args: [index], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY): BOOLEAN | Returns true if the list contains the element., eg: ([1).list_contains(2, NULL], 1) */
  array_has = (element: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_has", args: [element], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): VARCHAR | Returns the VectorType of a given column, eg: vector_type(col) */
  vector_type = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "vector_type", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Sorts the elements of the list, eg: ([3).list_sort(6, 1, 2]) */
  array_sort = (col1?: Stringable, col2?: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_sort", args: [col1, col2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (UNION, VARCHAR): ANY | Extract the value with the named tags from the union. NULL if the tag is not currently selected, eg: (s).union_extract('k') */
  union_extract = (tag: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "union_extract", args: [tag], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (AGGREGATE_STATE<?>, ANY): AGGREGATE_STATE<?> | , eg: undefined */
  combine = (col1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "combine", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): BOOLEAN | Returns true if search_string is found within string., eg: ('abc').contains('a') */
  contains = (searchStr: Stringable | Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "contains", args: [searchStr], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BIGINT | Extract the epoch component in nanoseconds from a temporal type, eg: epoch_ns(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ns = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "epoch_ns", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (TIMESTAMP, TIMESTAMP, BIGINT, BOOLEAN): ANY[] | Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged, eg: (0).equi_width_bins(10, 2, true) */
  equi_width_bins = (max: Whateverable | Numericable, binCount: Numericable, niceRounding: Whateverable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "equi_width_bins", args: [max, binCount, niceRounding], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT, BIGINT, BIGINT): BIGINT[] | Create a list of values between start and stop - the stop parameter is inclusive, eg: (2).generate_series(5, 3) */
  generate_series = (stop?: Numericable | Whateverable, step?: Numericable | Whateverable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "generate_series", args: [stop, step], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DATE): BIGINT | Extract the isodow component from a date or timestamp, eg: isodow(timestamp '2021-08-03 11:59:44.123456') */
  isodow = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "isodow", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the isoyear component from a date or timestamp, eg: isoyear(timestamp '2021-08-03 11:59:44.123456') */
  isoyear = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "isoyear", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (JSON, VARCHAR): UBIGINT | , eg: undefined */
  json_array_length = (col1?: Stringable | Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "json_array_length", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR[]): JSON[] | , eg: undefined */
  json_extract_path = (col1: Whateverable | Numericable | Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_path", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON, VARCHAR): VARCHAR | , eg: undefined */
  json_extract_string = (col1: Stringable | Numericable | Whateverable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_string", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (UBIGINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  to_binary = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_binary", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR[]): VARCHAR[][] | , eg: undefined */
  json_keys = (col1?: Whateverable | Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_keys", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): JSON | , eg: undefined */
  json_structure = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_structure", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON, VARCHAR): VARCHAR | , eg: undefined */
  json_type = (col1?: Stringable | Whateverable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_type", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (JSON, BIGINT): VARCHAR | , eg: undefined */
  json_value = (col1: Numericable | Whateverable | Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_value", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DATE): DOUBLE | Extract the Julian Day number from a date or timestamp, eg: julian(timestamp '2006-01-01 12:00') */
  julian = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "julian", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (INTERVAL, DATE, DATE): DATE | Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets, eg: (INTERVAL '2 weeks').time_bucket(TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07') */
  time_bucket = (timestamp: Whateverable, origin?: Whateverable | Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "time_bucket", args: [timestamp, origin], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BIGINT | Extract the timezone_hour component from a date or timestamp, eg: timezone_hour(timestamp '2021-08-03 11:59:44.123456') */
  timezone_hour = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "timezone_hour", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], ANY[]): ANY[] | Concatenates two lists., eg: ([2).list_concat(3], [4, 5, 6]) */
  list_concat = (list2: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_concat", args: [list2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY): BOOLEAN | Returns true if the list contains the element., eg: ([1).list_contains(2, NULL], 1) */
  list_has = (element: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_has", args: [element], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (STRUCT, BIGINT): ANY | Extract the named entry from the STRUCT., eg: ({'i': 3).struct_extract('v2': 3, 'v3': 0}, 'i') */
  struct_extract = (entry: Numericable | Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "struct_extract", args: [entry], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY[]): BOOLEAN | Returns true if the lists have any element in common. NULLs are ignored., eg: ([1).list_has_any(2, 3], [2, 3, 4]) */
  list_has_any = (p1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_has_any", args: [p1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE, VARCHAR): VARCHAR | Converts a date to a string according to the format string., eg: (date '1992-01-01').strftime('%a, %-d %B %Y') */
  strftime = (format: Stringable | Whateverable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "strftime", args: [format], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (ANY[], ANY): INTEGER | Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: ([1).list_position(2, NULL], 2) */
  list_position = (element: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_position", args: [element], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Sorts the elements of the list, eg: ([3).list_sort(6, 1, 2]) */
  list_sort = (col1?: Stringable, col2?: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_sort", args: [col1, col2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (MAP(ANY, ANY), ANY): BOOLEAN | Checks if a map contains a given key., eg: (MAP {'key1': 10).map_contains('key2': 20, 'key3': 30}, 'key2') */
  map_contains = (key: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "map_contains", args: [key], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY, ANY): ANY | Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: (['key']).map_extract(map(['val']), 'key') */
  map_extract = (key: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "map_extract", args: [key], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BIGINT | Extract the microsecond component from a date or timestamp, eg: microsecond(timestamp '2021-08-03 11:59:44.123456') */
  microsecond = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "microsecond", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): VARCHAR | Returns the SHA256 hash of the value, eg: sha256('hello') */
  sha256 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "sha256", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DATE): VARCHAR | The (English) name of the month, eg: monthname(TIMESTAMP '1992-09-20') */
  monthname = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "monthname", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (TINYINT, TINYINT): TINYINT | , eg: undefined */
  multiply = (col1: Numericable | Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "multiply", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT, BIGINT, BIGINT): BIGINT[] | Create a list of values between start and stop - the stop parameter is exclusive, eg: (2).range(5, 3) */
  range = (stop?: Numericable | Whateverable, step?: Numericable | Whateverable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "range", args: [stop, step], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, BIGINT): VARCHAR | Repeats the string count number of times, eg: ('A').repeat(5) */
  repeat = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "repeat", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DATE): BIGINT | Extract the weekday component from a date or timestamp, eg: weekday(timestamp '2021-08-03 11:59:44.123456') */
  weekday = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "weekday", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], ANY): BOOLEAN | Returns true if the list contains the element., eg: ([1).list_contains(2, NULL], 1) */
  array_contains = (element: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_contains", args: [element], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_inner_product(2, 3], [1, 2, 3]) */
  array_dot_product = (array2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_dot_product", args: [array2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Returns the index of their sorted position., eg: ([3).list_grade_up(6, 1, 2]) */
  array_grade_up = (col1?: Stringable, col2?: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_grade_up", args: [col1, col2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY[]): BOOLEAN | Returns true if all elements of l2 are in l1. NULLs are ignored., eg: ([1).list_has_all(2, 3], [2, 3]) */
  array_has_all = (p1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_has_all", args: [p1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], VARCHAR): ANY[] | Sorts the elements of the list in reverse order, eg: ([3).list_reverse_sort(6, 1, 2]) */
  array_reverse_sort = (col1?: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_reverse_sort", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY, ANY, ANY, BIGINT): ANY | Extract a sublist using slice conventions. Negative values are accepted., eg: ([4).list_slice(5, 6], 2, 3) */
  array_slice = (begin: Whateverable, end: Whateverable, step?: Numericable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_slice", args: [begin, end, step], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY, ANY): ANY | If arg2 is NULL, return NULL. Otherwise, return arg1., eg: (42).constant_or_null(NULL) */
  constant_or_null = (arg2: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "constant_or_null", args: [arg2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR[], DATE): STRUCT() | Get subfield (equivalent to extract), eg: ('minute').date_part(TIMESTAMP '1992-09-20 20:38:40') */
  date_part = (col1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "date_part", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BIGINT | Extract the dayofmonth component from a date or timestamp, eg: dayofmonth(timestamp '2021-08-03 11:59:44.123456') */
  dayofmonth = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "dayofmonth", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BLOB): VARCHAR | Convert blob to varchar. Fails if blob is not valid utf-8, eg: decode('\xC3\xBC'::BLOB) */
  decode = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "decode", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (ANY): UBIGINT | Returns an integer with the hash of the value. Note that this is not a cryptographic hash, eg: hash('🦆') */
  hash = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "hash", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT): BOOLEAN | Returns true if the floating point value is infinite, false otherwise, eg: isinf('Infinity'::float) */
  isinf = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "isinf", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, BIGINT): JSON | , eg: undefined */
  json_extract = (col1: Numericable | Whateverable | Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON, VARCHAR[]): VARCHAR[] | , eg: undefined */
  json_extract_path_text = (col1: Whateverable | Numericable | Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_path_text", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BLOB): VARCHAR | Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  to_base64 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_base64", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DATE): DATE | Returns the last day of the month, eg: last_day(TIMESTAMP '1992-03-22 01:02:03.1234') */
  last_day = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "last_day", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): BIGINT | Number of characters in string., eg: length('Hello🦆') */
  len = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "len", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE, DATE): BIGINT | , eg: undefined */
  subtract = (col1?: Whateverable | Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "subtract", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the cosine similarity between two lists, eg: ([1).list_cosine_similarity(2, 3], [1, 2, 3]) */
  list_cosine_similarity = (list2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_cosine_similarity", args: [list2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_extract = (index: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_extract", args: [index], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], LAMBDA): ANY[] | Constructs a list from those elements of the input list for which the lambda function returns true, eg: ([3).list_filter(4, 5], x -> x > 4) */
  list_filter = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_filter", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the inner product between two lists, eg: ([1).list_inner_product(2, 3], [1, 2, 3]) */
  list_inner_product = (list2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_inner_product", args: [list2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the negative inner product between two lists, eg: ([1).list_negative_inner_product(2, 3], [1, 2, 3]) */
  list_negative_dot_product = (list2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_negative_dot_product", args: [list2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], ANY, ANY): ANY[] | Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: ([1).list_resize(2, 3], 5, 0) */
  list_resize = (size: Whateverable, value?: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_resize", args: [size, value], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], VARCHAR): ANY[] | Sorts the elements of the list in reverse order, eg: ([3).list_reverse_sort(6, 1, 2]) */
  list_reverse_sort = (col1?: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_reverse_sort", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): VARCHAR | Returns the SHA1 hash of the value, eg: sha1('hello') */
  sha1 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "sha1", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (ANY[], LAMBDA): ANY | Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: (x).list_reduce([1, 2, 3], (y) -> x + y) */
  reduce = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "reduce", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  array_aggregate = (name: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_aggregate", args: [name], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY[]): ANY[] | Concatenates two lists., eg: ([2).list_concat(3], [4, 5, 6]) */
  array_cat = (list2: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_cat", args: [list2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], BIGINT): BIGINT | Returns the length of the list., eg: ([1).array_length(2,3]) */
  array_length = (col1?: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_length", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], ANY): INTEGER | Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: ([1).list_position(2, NULL], 2) */
  array_position = (element: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_position", args: [element], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  array_transform = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_transform", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[]): UBIGINT | Counts the unique elements of a list, eg: ([1).list_unique(1, NULL, -3, 1, 5]) */
  array_unique = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_unique", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIT, INTEGER): BIT | Pads the bitstring until the specified length, eg: ('1010'::BIT).bitstring(7) */
  bitstring = (length: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "bitstring", args: [length], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY, ANY): BOOLEAN | Whether or not we can implicitly cast from the source type to the other type, eg: (NULL::INTEGER).can_implicitly_cast(NULL::BIGINT) */
  can_cast_implicitly = (targetType: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "can_cast_implicitly", args: [targetType], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): VARCHAR | Returns the name of the data type of the result of the expression, eg: typeof('abc') */
  typeof = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "typeof", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DATE): BIGINT | Extract the day component from a date or timestamp, eg: day(timestamp '2021-08-03 11:59:44.123456') */
  day = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "day", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the dayofyear component from a date or timestamp, eg: dayofyear(timestamp '2021-08-03 11:59:44.123456') */
  dayofyear = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "dayofyear", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the decade component from a date or timestamp, eg: decade(timestamp '2021-08-03 11:59:44.123456') */
  decade = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "decade", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY, ANY): VARCHAR[] | Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type, eg: (NULL).enum_range_boundary('happy'::mood) */
  enum_range_boundary = (end: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "enum_range_boundary", args: [end], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BIGINT | Extract the epoch component in milliseconds from a temporal type, eg: epoch_ms(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ms = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "epoch_ms", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the epoch component in microseconds from a temporal type, eg: epoch_us(timestamp '2021-08-03 11:59:44.123456') */
  epoch_us = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "epoch_us", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the era component from a date or timestamp, eg: era(timestamp '2021-08-03 11:59:44.123456') */
  era = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "era", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (JSON, VARCHAR): ANY | , eg: undefined */
  from_json = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "from_json", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Returns the index of their sorted position., eg: ([3).list_grade_up(6, 1, 2]) */
  grade_up = (col1?: Stringable, col2?: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "grade_up", args: [col1, col2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  json_contains = (col1: Stringable | Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_contains", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON, VARCHAR[]): BOOLEAN[] | , eg: undefined */
  json_exists = (col1: Whateverable | Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_exists", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): ANY | , eg: undefined */
  json_transform = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_transform", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON): BOOLEAN | , eg: undefined */
  json_valid = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_valid", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): ANY | Returns the lowest value of the set of input parameters, eg: (42).least(84) */
  least = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "least", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[]): ANY[] | Removes all duplicates and NULLs from a list. Does not preserve the original order, eg: ([1).list_distinct(1, NULL, -3, 1, 5]) */
  list_distinct = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_distinct", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the inner product between two lists, eg: ([1).list_inner_product(2, 3], [1, 2, 3]) */
  list_dot_product = (list2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_dot_product", args: [list2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_element = (index: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_element", args: [index], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  list_transform = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_transform", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (TIMESTAMP, TIMESTAMP): INTERVAL | Subtract arguments, resulting in the time difference between the two timestamps, eg: (TIMESTAMP '2001-04-10').age(TIMESTAMP '1992-09-20') */
  age = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "age", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  aggregate = (name: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "aggregate", args: [name], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  apply = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "apply", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY[]): ANY[] | Concatenates two lists., eg: ([2).list_concat(3], [4, 5, 6]) */
  array_concat = (list2: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_concat", args: [list2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY[]): BOOLEAN | Returns true if the lists have any element in common. NULLs are ignored., eg: ([1).list_has_any(2, 3], [2, 3, 4]) */
  array_has_any = (p1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_has_any", args: [p1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], BIGINT[]): ANY[] | Returns a list based on the elements selected by the index_list., eg: ([10).list_select(20, 30, 40], [1, 4]) */
  array_select = (indexList: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_select", args: [indexList], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): BIGINT | , eg: undefined */
  bit_length = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "bit_length", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the century component from a date or timestamp, eg: century(timestamp '2021-08-03 11:59:44.123456') */
  century = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "century", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], LAMBDA): ANY[] | Constructs a list from those elements of the input list for which the lambda function returns true, eg: ([3).list_filter(4, 5], x -> x > 4) */
  filter = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "filter", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (AGGREGATE_STATE<?>): INVALID | , eg: undefined */
  finalize = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "finalize", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[][]): ANY[] | Flatten a nested list by one level, eg: ([[1).flatten(2, 3], [4, 5]]) */
  flatten = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "flatten", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIT, INTEGER): INTEGER | Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0, eg: ('0110010'::BIT).get_bit(2) */
  get_bit = (index: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "get_bit", args: [index], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the hour component from a date or timestamp, eg: hour(timestamp '2021-08-03 11:59:44.123456') */
  hour = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "hour", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (JSON): VARCHAR | , eg: undefined */
  json_pretty = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_pretty", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  list_aggregate = (name: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_aggregate", args: [name], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the distance between two lists, eg: ([1).list_distance(2, 3], [1, 2, 3]) */
  list_distance = (list2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_distance", args: [list2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): VARCHAR | Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "md5", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DATE): BIGINT | Extract the millennium component from a date or timestamp, eg: millennium(timestamp '2021-08-03 11:59:44.123456') */
  millennium = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "millennium", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the weekofyear component from a date or timestamp, eg: weekofyear(timestamp '2021-08-03 11:59:44.123456') */
  weekofyear = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "weekofyear", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the week component from a date or timestamp, eg: week(timestamp '2021-08-03 11:59:44.123456') */
  week = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "week", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_cosine_distance(2, 3], [1, 2, 3]) */
  array_cosine_distance = (array2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_cosine_distance", args: [array2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], LAMBDA): ANY | Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: (x).list_reduce([1, 2, 3], (y) -> x + y) */
  array_reduce = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_reduce", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BLOB): VARCHAR | Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  base64 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "base64", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (BIT): BIGINT | Returns the number of bits that are set, eg: bit_count(31) */
  bit_count = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "bit_count", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY): ANY | Concatenate many strings together., eg: ('Hello').concat(' ', 'World') */
  concat = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "concat", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): BLOB | Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers, eg: ('A').create_sort_key('DESC') */
  create_sort_key = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "create_sort_key", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): VARCHAR[] | Returns all values of the input enum type as an array, eg: enum_range(NULL::mood) */
  enum_range = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "enum_range", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BOOLEAN | Returns true if the floating point value is finite, false otherwise, eg: isfinite(5.5) */
  isfinite = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "isfinite", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): BIGINT | Number of characters in string., eg: length('Hello🦆') */
  length = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "length", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (INTERVAL, TIME WITH TIME ZONE): TIME WITH TIME ZONE | Extract the timezone component from a date or timestamp, eg: timezone(timestamp '2021-08-03 11:59:44.123456') */
  timezone = (col1?: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "timezone", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  list_apply = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_apply", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY, ANY, ANY, BIGINT): ANY | Extract a sublist using slice conventions. Negative values are accepted., eg: ([4).list_slice(5, 6], 2, 3) */
  list_slice = (begin: Whateverable, end: Whateverable, step?: Numericable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_slice", args: [begin, end, step], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT, BIGINT, BIGINT): DATE | The date for the given struct., eg: ({'year': 2024).make_date('month': 11, 'day': 14}) */
  make_date = (month?: Numericable, day?: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "make_date", args: [month, day], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY, ANY): ANY | Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: (['key']).map_extract_value(map(['val']), 'key') */
  map_extract_value = (key: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "map_extract_value", args: [key], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): HUGEINT | Returns the MD5 hash of the value as an INT128, eg: md5_number('123') */
  md5_number = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "md5_number", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the millisecond component from a date or timestamp, eg: millisecond(timestamp '2021-08-03 11:59:44.123456') */
  millisecond = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "millisecond", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the month component from a date or timestamp, eg: month(timestamp '2021-08-03 11:59:44.123456') */
  month = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "month", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the nanosecond component from a date or timestamp, eg: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789 */
  nanosecond = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "nanosecond", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BLOB): BIGINT | Number of bytes in blob., eg: octet_length('\xAA\xBB'::BLOB) */
  octet_length = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "octet_length", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the quarter component from a date or timestamp, eg: quarter(timestamp '2021-08-03 11:59:44.123456') */
  quarter = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "quarter", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the yearweek component from a date or timestamp, eg: yearweek(timestamp '2021-08-03 11:59:44.123456') */
  yearweek = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "yearweek", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  array_aggr = (name: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_aggr", args: [name], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], LAMBDA): ANY[] | Constructs a list from those elements of the input list for which the lambda function returns true, eg: ([3).list_filter(4, 5], x -> x > 4) */
  array_filter = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_filter", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_inner_product(2, 3], [1, 2, 3]) */
  array_inner_product = (array2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_inner_product", args: [array2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], ANY, ANY): ANY[] | Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: ([1).list_resize(2, 3], 5, 0) */
  array_resize = (size: Whateverable, value?: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_resize", args: [size, value], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  bin = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "bin", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (UNION): ANY | Retrieve the currently selected tag of the union as an ENUM, eg: union_tag(union_value(k := 'foo')) */
  union_tag = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "union_tag", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BIGINT | Extract the dayofweek component from a date or timestamp, eg: dayofweek(timestamp '2021-08-03 11:59:44.123456') */
  dayofweek = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "dayofweek", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY, ANY): ANY | Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: (['key']).map_extract(map(['val']), 'key') */
  element_at = (key: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "element_at", args: [key], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): VARCHAR | Returns the first value of the input enum type, eg: enum_first(NULL::mood) */
  enum_first = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "enum_first", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (JSON, VARCHAR): ANY | , eg: undefined */
  json_transform_strict = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_transform_strict", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (TIME WITH TIME ZONE): UBIGINT | Converts a TIME WITH TIME ZONE to an integer sort key, eg: timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ) */
  timetz_byte_comparable = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "timetz_byte_comparable", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], VARCHAR): ANY | Executes the aggregate function name on the elements of list, eg: ([1).list_aggregate(2, NULL], 'min') */
  list_aggr = (name: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_aggr", args: [name], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY[]): ANY[] | Concatenates two lists., eg: ([2).list_concat(3], [4, 5, 6]) */
  list_cat = (list2: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_cat", args: [list2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], VARCHAR, VARCHAR): ANY[] | Returns the index of their sorted position., eg: ([3).list_grade_up(6, 1, 2]) */
  list_grade_up = (col1?: Stringable, col2?: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_grade_up", args: [col1, col2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], LAMBDA): ANY | Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: (x).list_reduce([1, 2, 3], (y) -> x + y) */
  list_reduce = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_reduce", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY[]): BOOLEAN | Returns true if all elements of l2 are in l1. NULLs are ignored., eg: ([1).list_has_all(2, 3], [2, 3]) */
  list_has_all = (p1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_has_all", args: [p1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], BIGINT[]): ANY[] | Returns a list based on the elements selected by the index_list., eg: ([10).list_select(20, 30, 40], [1, 4]) */
  list_select = (indexList: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_select", args: [indexList], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (INTERVAL): INTERVAL | Normalizes an INTERVAL to an equivalent interval, eg: normalized_interval(INTERVAL '30 days') */
  normalized_interval = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "normalized_interval", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BIGINT | Extract the second component from a date or timestamp, eg: second(timestamp '2021-08-03 11:59:44.123456') */
  second = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "second", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the year component from a date or timestamp, eg: year(timestamp '2021-08-03 11:59:44.123456') */
  year = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "year", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_distance(2, 3], [1, 2, 3]) */
  array_distance = (array2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_distance", args: [array2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], ANY): INTEGER | Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: ([1).list_position(2, NULL], 2) */
  array_indexof = (element: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_indexof", args: [element], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_negative_inner_product(2, 3], [1, 2, 3]) */
  array_negative_inner_product = (array2: Whateverable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_negative_inner_product", args: [array2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], BOOLEAN[]): ANY[] | Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list., eg: ([10).list_where(20, 30, 40], [true, false, false, true]) */
  array_where = (maskList: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_where", args: [maskList], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIT, BIT): INTEGER | Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1, eg: ('010'::BIT).bit_position('1110101'::BIT) */
  bit_position = (bitstr: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "bit_position", args: [bitstr], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY): UBIGINT | Returns the size of the map (or the number of entries in the map), eg: ([4).cardinality( map(2], ['a', 'b']) ); */
  cardinality = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "cardinality", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR[], DATE): STRUCT() | Get subfield (equivalent to extract), eg: ('minute').date_part(TIMESTAMP '1992-09-20 20:38:40') */
  datepart = (col1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "datepart", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): ANY | , eg: undefined */
  from_json_strict = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "from_json_strict", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): ANY | Returns the highest value of the set of input parameters, eg: (42).greatest(84) */
  greatest = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "greatest", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): BOOLEAN | Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin), eg: is_histogram_other_bin(v) */
  is_histogram_other_bin = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "is_histogram_other_bin", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BIGINT | Extract the timezone_minute component from a date or timestamp, eg: timezone_minute(timestamp '2021-08-03 11:59:44.123456') */
  timezone_minute = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "timezone_minute", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], ANY): BOOLEAN | Returns true if the list contains the element., eg: ([1).list_contains(2, NULL], 1) */
  list_contains = (element: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_contains", args: [element], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[]): UBIGINT | Counts the unique elements of a list, eg: ([1).list_unique(1, NULL, -3, 1, 5]) */
  list_unique = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_unique", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (ANY[], BOOLEAN[]): ANY[] | Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list., eg: ([10).list_where(20, 30, 40], [true, false, false, true]) */
  list_where = (maskList: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_where", args: [maskList], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): VARCHAR | Returns the name of a given expression, eg: alias(42 + 1) */
  alias = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "alias", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (ANY[], LAMBDA): ANY[] | Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: ([1).list_transform(2, 3], x -> x + 1) */
  array_apply = (lambda: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_apply", args: [lambda], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_cosine_similarity(2, 3], [1, 2, 3]) */
  array_cosine_similarity = (array2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_cosine_similarity", args: [array2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT[ANY], FLOAT[ANY]): FLOAT | Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: ([1).array_negative_inner_product(2, 3], [1, 2, 3]) */
  array_negative_dot_product = (array2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "array_negative_dot_product", args: [array2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): VARCHAR | The (English) name of the weekday, eg: dayname(TIMESTAMP '1992-03-22') */
  dayname = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "dayname", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (ANY): ANY | Returns the numeric value backing the given enum value, eg: enum_code('happy'::mood) */
  enum_code = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "enum_code", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY): VARCHAR | Returns the last value of the input enum type, eg: enum_last(NULL::mood) */
  enum_last = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "enum_last", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DATE): DOUBLE | Extract the epoch component from a temporal type, eg: epoch(timestamp '2021-08-03 11:59:44.123456') */
  epoch = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "epoch", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (JSON): VARCHAR | , eg: undefined */
  json_deserialize_sql = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_deserialize_sql", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the cosine distance between two lists, eg: ([1).list_cosine_distance(2, 3], [1, 2, 3]) */
  list_cosine_distance = (list2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_cosine_distance", args: [list2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (STRUCT, BIGINT): ANY | Extract the entry from the STRUCT by position (starts at 1!)., eg: ({'i': 3).struct_extract_at('v2': 3, 'v3': 0}, 2) */
  struct_extract_at = (entry: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "struct_extract_at", args: [entry], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], ANY): INTEGER | Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: ([1).list_position(2, NULL], 2) */
  list_indexof = (element: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_indexof", args: [element], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT[], FLOAT[]): FLOAT | Compute the negative inner product between two lists, eg: ([1).list_negative_inner_product(2, 3], [1, 2, 3]) */
  list_negative_inner_product = (list2: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "list_negative_inner_product", args: [list2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the minute component from a date or timestamp, eg: minute(timestamp '2021-08-03 11:59:44.123456') */
  minute = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "minute", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIT, INTEGER, INTEGER): BIT | Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring, eg: ('0110010'::BIT).set_bit(2, 0) */
  set_bit = (index: Numericable, newValue: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "set_bit", args: [index, newValue], chain: this.ops.method ? this.ops : undefined }) as WhateverField;

  toString(): string {
    return operationToSql(this.ops);
  }

  /**
   * Set the operation chain for this field
   * @param ops The operation to set
   * @returns This field instance for chaining
   */
  withOperation(ops: Operation): WhateverFieldImpl {
    this.ops = ops;
    return this;
  }
}

/**
 * Implementation of string operations
 * Provides concrete implementations of the StringField interface
 */
export class StringFieldImpl implements StringField {
  /** Tracks the operation chain for this field */
  private ops: Operation;

  /**
   * Create a new string field
   * @param fieldName The name of the field in the database
   */
  constructor(fieldName: string) {
    this.ops = { field: fieldName, method: "", args: [] };
  }

  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the array., eg: ('DuckDB').array_extract(2) */
  array_extract = (index: Numericable | Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "array_extract", args: [index], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): VARCHAR | Escapes the input string by encoding it so that it can be included in a URL query parameter., eg: url_encode('this string has/ special+ characters>') */
  url_encode = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "url_encode", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): BOOLEAN | Returns true if search_string is found within string., eg: ('abc').contains('a') */
  contains = (searchStr: Stringable | Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "contains", args: [searchStr], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): TIMESTAMP | Converts the string text to timestamp according to the format string. Returns NULL on failure., eg: ('Wed).try_strptime(1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p') */
  try_strptime = (format: Stringable | Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "try_strptime", args: [format], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different, eg: ('hello').damerau_levenshtein('world') */
  damerau_levenshtein = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "damerau_levenshtein", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): VARCHAR | , eg: undefined */
  icu_sort_key = (col1: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "icu_sort_key", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (JSON, VARCHAR): UBIGINT | , eg: undefined */
  json_array_length = (col1?: Stringable | Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "json_array_length", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR[]): JSON[] | , eg: undefined */
  json_extract_path = (col1: Whateverable | Numericable | Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_path", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON, VARCHAR): VARCHAR | , eg: undefined */
  json_extract_string = (col1: Stringable | Numericable | Whateverable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_string", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (UBIGINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  to_binary = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_binary", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR[]): VARCHAR[][] | , eg: undefined */
  json_keys = (col1?: Whateverable | Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_keys", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): JSON | , eg: undefined */
  json_structure = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_structure", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON, VARCHAR): VARCHAR | , eg: undefined */
  json_type = (col1?: Stringable | Whateverable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_type", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (JSON, BIGINT): VARCHAR | , eg: undefined */
  json_value = (col1: Numericable | Whateverable | Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_value", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR): VARCHAR | Convert string to lower case, eg: lower('Hello') */
  lcase = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "lcase", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR): VARCHAR | Strips accents from string., eg: strip_accents('mühleisen') */
  strip_accents = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "strip_accents", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the regex, eg: ('hello␣world; 42').string_split_regex(';?␣') */
  string_split_regex = (separator: Stringable, col2?: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "string_split_regex", args: [separator, col2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE, VARCHAR): VARCHAR | Converts a date to a string according to the format string., eg: (date '1992-01-01').strftime('%a, %-d %B %Y') */
  strftime = (format: Stringable | Whateverable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "strftime", args: [format], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): BOOLEAN | Returns true if string begins with search_string, eg: ('abc').starts_with('a') */
  starts_with = (searchStr: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "starts_with", args: [searchStr], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): VARCHAR | Returns the SHA256 hash of the value, eg: sha256('hello') */
  sha256 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "sha256", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): VARCHAR | Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirpath('system') */
  parse_dirpath = (separator?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "parse_dirpath", args: [separator], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, BIGINT): VARCHAR | Repeats the string count number of times, eg: ('A').repeat(5) */
  repeat = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "repeat", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR): VARCHAR | Convert string to upper case., eg: upper('Hello') */
  upper = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "upper", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR): BLOB | Converts a value from hexadecimal representation to a blob, eg: unhex('2A') */
  unhex = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "unhex", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR[], DATE): STRUCT() | Get subfield (equivalent to extract), eg: ('minute').date_part(TIMESTAMP '1992-09-20 20:38:40') */
  date_part = (col1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "date_part", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string., eg: ('A%c').ilike_escape('a$%C', '$') */
  ilike_escape = (likeSpecifier: Stringable, escapeCharacter: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "ilike_escape", args: [likeSpecifier, escapeCharacter], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, BIGINT): JSON | , eg: undefined */
  json_extract = (col1: Numericable | Whateverable | Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON, VARCHAR[]): VARCHAR[] | , eg: undefined */
  json_extract_path_text = (col1: Whateverable | Numericable | Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_path_text", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, BOOLEAN, BOOLEAN, BOOLEAN): JSON | , eg: undefined */
  json_serialize_sql = (col1?: Whateverable, col2?: Whateverable, col3?: Whateverable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_serialize_sql", args: [col1, col2, col3], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): BIGINT | Number of characters in string., eg: length('Hello🦆') */
  len = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "len", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR): BIGINT | The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  levenshtein = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "levenshtein", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, BIGINT, BIGINT): VARCHAR | Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('🦆🤦🏼‍♂️🤦🏽‍♀️🦆').substring_grapheme(3, 2) */
  substring_grapheme = (start: Numericable, length?: Numericable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "substring_grapheme", args: [start, length], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, BIGINT, BIGINT): VARCHAR | Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substr = (start: Numericable, length?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "substr", args: [start, length], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_extract = (index: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_extract", args: [index], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): TIMESTAMP | Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime., eg: ('4/15/2023 10:56:00').strptime(['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S']) */
  strptime = (format: Stringable | Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "strptime", args: [format], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): BIGINT | Number of bytes in string., eg: strlen('🦆') */
  strlen = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "strlen", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): VARCHAR | Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not., eg: nfc_normalize('ardèch') */
  nfc_normalize = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "nfc_normalize", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR): INTEGER | Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  ord = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ord", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): VARCHAR | Returns the SHA1 hash of the value, eg: sha1('hello') */
  sha1 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "sha1", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns true if the entire string matches the regex. A set of optional options can be set., eg: ('anabanana').regexp_full_match('(an)*') */
  regexp_full_match = (regex: Stringable, options?: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_full_match", args: [regex, options], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR, VARCHAR, VARCHAR): VARCHAR | If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set., eg: ('hello').regexp_replace('[lo]', '-') */
  regexp_replace = (pattern: Stringable, replacement: Stringable, options?: Stringable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_replace", args: [pattern, replacement, options], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the regex, eg: ('hello␣world; 42').string_split_regex(';?␣') */
  regexp_split_to_array = (separator: Stringable, col2?: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_split_to_array", args: [separator, col2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): VARCHAR | Unescapes the URL encoded input., eg: url_decode('this%20string%20is%2BFencoded') */
  url_decode = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "url_decode", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR): INTEGER | Returns an integer that represents the Unicode code point of the first character of the string, eg: ascii('Ω') */
  ascii = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ascii", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIT, INTEGER): BIT | Pads the bitstring until the specified length, eg: ('1010'::BIT).bitstring(7) */
  bitstring = (length: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "bitstring", args: [length], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): VARCHAR | Removes any occurrences of any of the characters from either side of the string, eg: ('>>>>test<<').trim('><') */
  trim = (characters?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "trim", args: [characters], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR): ANY | Returns the current value of the configuration setting, eg: current_setting('access_mode') */
  current_setting = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "current_setting", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, DATE): TIMESTAMP | Truncate to specified precision, eg: ('hour').date_trunc(TIMESTAMPTZ '1992-09-20 20:38:40') */
  datetrunc = (timestamp: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "datetrunc", args: [timestamp], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, DATE, DATE): BIGINT | The number of partition boundaries between the timestamps, eg: ('hour').date_diff(TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  date_diff = (startdate: Whateverable, enddate: Whateverable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "date_diff", args: [startdate, enddate], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (JSON, VARCHAR): ANY | , eg: undefined */
  from_json = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "from_json", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): ANY | , eg: undefined */
  getvariable = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "getvariable", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): BIGINT | Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  instr = (needle: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "instr", args: [needle], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR, DOUBLE): DOUBLE | The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_winkler_similarity('duckdb', 0.5) */
  jaro_winkler_similarity = (str2: Stringable, scoreCutoff?: Numericable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "jaro_winkler_similarity", args: [str2, scoreCutoff], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  json_contains = (col1: Stringable | Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_contains", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON, VARCHAR[]): BOOLEAN[] | , eg: undefined */
  json_exists = (col1: Whateverable | Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_exists", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, BOOLEAN, BOOLEAN, BOOLEAN, BOOLEAN): JSON | , eg: undefined */
  json_serialize_plan = (col1?: Whateverable, col2?: Whateverable, col3?: Whateverable, col4?: Whateverable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_serialize_plan", args: [col1, col2, col3, col4], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): ANY | , eg: undefined */
  json_transform = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_transform", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (JSON): BOOLEAN | , eg: undefined */
  json_valid = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_valid", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (ANY[], BIGINT): ANY | Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_element = (index: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "list_element", args: [index], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  strpos = (needle: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "strpos", args: [needle], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): VARCHAR | Convert string to lower case, eg: lower('Hello') */
  lower = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "lower", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, INTEGER, VARCHAR): VARCHAR | Pads the string with the character from the left until it has count characters, eg: ('hello').lpad(10, '>') */
  lpad = (count: Numericable, character: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "lpad", args: [count, character], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): VARCHAR | Removes any occurrences of any of the characters from the left side of the string, eg: ('>>>>test<<').ltrim('><') */
  ltrim = (characters?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "ltrim", args: [characters], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the separator, eg: ('hello-world').string_split('-') */
  split = (separator: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "split", args: [separator], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, BOOLEAN, VARCHAR): VARCHAR | Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_filename(true, 'forward_slash') */
  parse_filename = (trimExtension?: Whateverable | Stringable, separator?: Stringable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "parse_filename", args: [trimExtension, separator], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_path('system') */
  parse_path = (separator?: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "parse_path", args: [separator], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  position = (needle: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "position", args: [needle], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): VARCHAR | Reverses the string, eg: reverse('hello') */
  reverse = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "reverse", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR): BIGINT | , eg: undefined */
  bit_length = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "bit_length", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): INTEGER | Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  unicode = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "unicode", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): VARCHAR | Convert string to upper case., eg: upper('Hello') */
  ucase = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "ucase", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, DATE, DATE): BIGINT | The number of partition boundaries between the timestamps, eg: ('hour').date_diff(TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  datediff = (startdate: Whateverable, enddate: Whateverable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "datediff", args: [startdate, enddate], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, DATE, DATE): BIGINT | The number of complete partitions between the timestamps, eg: ('hour').date_sub(TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  datesub = (startdate: Whateverable, enddate: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "datesub", args: [startdate, enddate], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): BLOB | Convert varchar to blob. Converts utf-8 characters into literal encoding, eg: encode('my_string_with_ü') */
  encode = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "encode", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): BLOB | Converts a value from hexadecimal representation to a blob, eg: unhex('2A') */
  from_hex = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "from_hex", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, BIGINT): VARCHAR | Extract the left-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').left_grapheme(1) */
  left_grapheme = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "left_grapheme", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, BIGINT, BIGINT): VARCHAR | Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substring = (start: Numericable, length?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "substring", args: [start, length], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the regex, eg: ('hello␣world; 42').string_split_regex(';?␣') */
  str_split_regex = (separator: Stringable, col2?: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "str_split_regex", args: [separator, col2], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): VARCHAR | Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "md5", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string., eg: ('A%c').not_ilike_escape('a$%C', '$') */
  not_ilike_escape = (likeSpecifier: Stringable, escapeCharacter: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "not_ilike_escape", args: [likeSpecifier, escapeCharacter], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string., eg: ('a%c').not_like_escape('a$%c', '$') */
  not_like_escape = (likeSpecifier: Stringable, escapeCharacter: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "not_like_escape", args: [likeSpecifier, escapeCharacter], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): VARCHAR | Formats a string using printf syntax, eg: ('Benchmark "%s" took %d seconds').printf('CSV', 42) */
  printf = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "printf", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, INTEGER, VARCHAR): VARCHAR[] | Split the string along the regex and extract all occurrences of group. A set of optional options can be set., eg: ([a-z ]+)_?').regexp_extract_all('hello_world', '(1) */
  regexp_extract_all = (p1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_extract_all", args: [p1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): VARCHAR | Removes any occurrences of any of the characters from the right side of the string, eg: ('>>>>test<<').rtrim('><') */
  rtrim = (characters?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "rtrim", args: [characters], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, BIGINT): VARCHAR | Extract the right-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').right_grapheme(1) */
  right_grapheme = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "right_grapheme", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR | Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted, eg: ('12345').translate('143', 'ax') */
  translate = (from: Stringable, to: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "translate", args: [from, to], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): BIGINT | The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  editdist3 = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "editdist3", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR): BLOB | Converts a value from binary representation to a blob, eg: unbin('0110') */
  from_binary = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "from_binary", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): BIGINT | Number of characters in string., eg: length('Hello🦆') */
  length = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "length", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (INTERVAL, TIME WITH TIME ZONE): TIME WITH TIME ZONE | Extract the timezone component from a date or timestamp, eg: timezone(timestamp '2021-08-03 11:59:44.123456') */
  timezone = (col1?: Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "timezone", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the separator, eg: ('hello-world').string_split('-') */
  string_to_array = (separator: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "string_to_array", args: [separator], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): HUGEINT | Returns the MD5 hash of the value as an INT128, eg: md5_number('123') */
  md5_number = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "md5_number", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR, INTEGER, VARCHAR): VARCHAR | If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set., eg: (b)').regexp_extract('abc', '([a-z])(1) */
  regexp_extract = (pattern: Stringable, group?: Numericable | Whateverable, options?: Stringable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_extract", args: [pattern, group, options], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set., eg: ('anabanana').regexp_matches('(an)*') */
  regexp_matches = (pattern: Stringable, options?: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_matches", args: [pattern, options], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  bin = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "bin", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, DATE, DATE): BIGINT | The number of complete partitions between the timestamps, eg: ('hour').date_sub(TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  date_sub = (startdate: Whateverable, enddate: Whateverable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "date_sub", args: [startdate, enddate], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  ends_with = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "ends_with", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): VARCHAR | Formats a string using fmt syntax, eg: ('Benchmark "{}" took {} seconds').format('CSV', 42) */
  format = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "format", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, DOUBLE): DOUBLE | The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_similarity('duckdb', 0.5) */
  jaro_similarity = (str2: Stringable, scoreCutoff?: Numericable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "jaro_similarity", args: [str2, scoreCutoff], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (JSON, VARCHAR): ANY | , eg: undefined */
  json_transform_strict = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "json_transform_strict", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): BIGINT | Number of grapheme clusters in string., eg: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️') */
  length_grapheme = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "length_grapheme", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR): VARCHAR | Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirname('system') */
  parse_dirname = (separator?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "parse_dirname", args: [separator], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  prefix = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "prefix", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, INTEGER, VARCHAR): VARCHAR | Pads the string with the character from the right until it has count characters, eg: ('hello').rpad(10, '<') */
  rpad = (count: Numericable, character: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "rpad", args: [count, character], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): VARCHAR | Replaces any occurrences of the source with target in string, eg: ('hello').replace('l', '-') */
  replace = (source: Stringable, target: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "replace", args: [source, target], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, ANY): VARCHAR | Concatenate strings together separated by the specified separator., eg: (').concat_ws(', 'Banana', 'Apple', 'Melon') */
  concat_ws = (str: Whateverable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "concat_ws", args: [str], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR[], DATE): STRUCT() | Get subfield (equivalent to extract), eg: ('minute').date_part(TIMESTAMP '1992-09-20 20:38:40') */
  datepart = (col1: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "datepart", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, DATE): TIMESTAMP | Truncate to specified precision, eg: ('hour').date_trunc(TIMESTAMPTZ '1992-09-20 20:38:40') */
  date_trunc = (timestamp: Whateverable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "date_trunc", args: [timestamp], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): ANY | , eg: undefined */
  from_json_strict = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "from_json_strict", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): DOUBLE | The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaccard('luck') */
  jaccard = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "jaccard", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, BIGINT): VARCHAR | Extract the left-most count characters, eg: ('Hello🦆').left(2) */
  left = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "left", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, VARCHAR, VARCHAR): BOOLEAN | Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string., eg: ('a%c').like_escape('a$%c', '$') */
  like_escape = (likeSpecifier: Stringable, escapeCharacter: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "like_escape", args: [likeSpecifier, escapeCharacter], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): BOOLEAN | , eg: undefined */
  suffix = (col1: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "suffix", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): VARCHAR | Escapes all potentially meaningful regexp characters in the input string, eg: regexp_escape('https://duckdb.org') */
  regexp_escape = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_escape", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR, BIGINT): VARCHAR | Extract the right-most count characters, eg: ('Hello🦆').right(3) */
  right = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "right", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARCHAR): BLOB | Converts a value from binary representation to a blob, eg: unbin('0110') */
  unbin = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "unbin", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR): BLOB | Convert a base64 encoded string to a character string, eg: from_base64('QQ==') */
  from_base64 = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "from_base64", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  hamming = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "hamming", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the separator, eg: ('hello-world').string_split('-') */
  str_split = (separator: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "str_split", args: [separator], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): VARCHAR[] | Splits the string along the separator, eg: ('hello-world').string_split('-') */
  string_split = (separator: Stringable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "string_split", args: [separator], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARCHAR, VARCHAR): BIGINT | The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  mismatches = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "mismatches", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;

  toString(): string {
    return operationToSql(this.ops);
  }

  /**
   * Set the operation chain for this field
   * @param ops The operation to set
   * @returns This field instance for chaining
   */
  withOperation(ops: Operation): StringFieldImpl {
    this.ops = ops;
    return this;
  }
}

/**
 * Implementation of numeric operations
 * Provides concrete implementations of the NumericField interface
 */
export class NumericFieldImpl implements NumericField {
  /** Tracks the operation chain for this field */
  private ops: Operation;

  /**
   * Create a new numeric field
   * @param fieldName The name of the field in the database
   */
  constructor(fieldName: string) {
    this.ops = { field: fieldName, method: "", args: [] };
  }

  /** (INTERVAL, INTERVAL): INTERVAL | , eg: undefined */
  add = (col1?: Whateverable | Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "add", args: [col1], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (TINYINT, TINYINT): TINYINT | Bitwise XOR, eg: (17).xor(5) */
  xor = (right: Numericable | Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "xor", args: [right], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the inverse hyperbolic sin of x, eg: asinh(0.5) */
  asinh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "asinh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the cotangent of x, eg: cot(0.5) */
  cot = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "cot", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (INTEGER): INTERVAL | Construct a year interval, eg: to_years(5) */
  to_years = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_years", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (TINYINT, TINYINT): TINYINT | , eg: undefined */
  divide = (col1: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "divide", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (TIMESTAMP, TIMESTAMP, BIGINT, BOOLEAN): ANY[] | Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged, eg: (0).equi_width_bins(10, 2, true) */
  equi_width_bins = (max: Whateverable | Numericable, binCount: Numericable, niceRounding: Whateverable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "equi_width_bins", args: [max, binCount, niceRounding], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (INTEGER): INTERVAL | Construct a quarter interval, eg: to_quarters(5) */
  to_quarters = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_quarters", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (FLOAT): FLOAT | Rounds the number down, eg: floor(17.4) */
  floor = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "floor", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT, BIGINT, BIGINT): BIGINT[] | Create a list of values between start and stop - the stop parameter is inclusive, eg: (2).generate_series(5, 3) */
  generate_series = (stop?: Numericable | Whateverable, step?: Numericable | Whateverable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "generate_series", args: [stop, step], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (UBIGINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  to_binary = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_binary", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DOUBLE): DOUBLE | Computes the natural logarithm of x, eg: ln(2) */
  ln = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ln", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the 10-log of x, eg: log10(1000) */
  log10 = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "log10", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT, BIGINT, BIGINT, BIGINT, BIGINT, DOUBLE): TIMESTAMP | The timestamp for the given parts, eg: (1992).make_timestamp(9, 20, 13, 34, 27.123456) */
  make_timestamp = (month?: Numericable, day?: Numericable, hour?: Numericable, minute?: Numericable, seconds?: Numericable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "make_timestamp", args: [month, day, hour, minute, seconds], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (TINYINT): TINYINT | Returns the sign of x as -1, 0 or 1, eg: sign(-349) */
  sign = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "sign", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (TINYINT, TINYINT): TINYINT | , eg: undefined */
  multiply = (col1: Numericable | Whateverable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "multiply", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Returns the next floating point value after x in the direction of y, eg: (1::float).nextafter(2::float) */
  nextafter = (p1: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "nextafter", args: [p1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Computes x to the power of y, eg: (2).pow(3) */
  pow = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "pow", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Converts degrees to radians, eg: radians(90) */
  radians = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "radians", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT, BIGINT, BIGINT): BIGINT[] | Create a list of values between start and stop - the stop parameter is exclusive, eg: (2).range(5, 3) */
  range = (stop?: Numericable | Whateverable, step?: Numericable | Whateverable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "range", args: [stop, step], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DOUBLE): DOUBLE | Computes the inverse hyperbolic tan of x, eg: atanh(0.5) */
  atanh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "atanh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the cos of x, eg: cos(90) */
  cos = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "cos", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the hyperbolic cos of x, eg: cosh(1) */
  cosh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "cosh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (INTEGER): INTERVAL | Construct a millenium interval, eg: to_millennia(1) */
  to_millennia = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_millennia", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT): INTERVAL | Construct a microsecond interval, eg: to_microseconds(5) */
  to_microseconds = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_microseconds", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (FLOAT): BOOLEAN | Returns true if the floating point value is infinite, false otherwise, eg: isinf('Infinity'::float) */
  isinf = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "isinf", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE, DATE): BIGINT | , eg: undefined */
  subtract = (col1?: Whateverable | Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "subtract", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Computes the logarithm of x to base b. b may be omitted, in which case the default 10, eg: (2).log(64) */
  log = (p1?: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "log", args: [p1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT, INTEGER): FLOAT | Rounds x to s decimal places, eg: (42.4332).round(2) */
  round = (precision?: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "round", args: [precision], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DATE): BIGINT | Extract the epoch component in milliseconds from a temporal type, eg: epoch_ms(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ms = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "epoch_ms", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT): INTERVAL | Construct a hour interval, eg: to_hours(5) */
  to_hours = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_hours", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (VARINT): VARCHAR | Converts the value to hexadecimal representation, eg: hex(42) */
  hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (BIGINT, BIGINT, BIGINT, BIGINT, BIGINT, DOUBLE, VARCHAR): TIMESTAMP WITH TIME ZONE | , eg: undefined */
  make_timestamptz = (col1?: Numericable, col2?: Numericable, col3?: Numericable, col4?: Numericable, col5?: Numericable, col6?: Stringable) =>
    new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "make_timestamptz", args: [col1, col2, col3, col4, col5, col6], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (TINYINT, TINYINT): TINYINT | , eg: undefined */
  mod = (col1: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "mod", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (TINYINT): TINYINT | Absolute value, eg: abs(-17.4) */
  abs = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "abs", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the arccosine of x, eg: acos(0.5) */
  acos = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "acos", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the arctangent of x, eg: atan(0.5) */
  atan = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "atan", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Returns the cube root of x, eg: cbrt(8) */
  cbrt = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "cbrt", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT): FLOAT | Rounds the number up, eg: ceil(17.4) */
  ceil = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ceil", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (INTEGER): VARCHAR | Returns a character which is corresponding the ASCII code value or Unicode code point, eg: chr(65) */
  chr = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "chr", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (INTEGER): INTERVAL | Construct a week interval, eg: to_weeks(5) */
  to_weeks = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_weeks", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DOUBLE): DOUBLE | Computes e to the power of x, eg: exp(1) */
  exp = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "exp", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT): INTERVAL | Construct a minute interval, eg: to_minutes(5) */
  to_minutes = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_minutes", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT, BIGINT): BIGINT | Computes the greatest common divisor of x and y, eg: (42).greatest_common_divisor(57) */
  greatest_common_divisor = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "greatest_common_divisor", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the inverse hyperbolic cos of x, eg: acosh(2.3) */
  acosh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "acosh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Computes the arctangent (y, x), eg: (1.0).atan2(0.0) */
  atan2 = (x: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "atan2", args: [x], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIT): BIGINT | Returns the number of bits that are set, eg: bit_count(31) */
  bit_count = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "bit_count", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT): FLOAT | Rounds the number up, eg: ceil(17.4) */
  ceiling = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ceiling", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): TIMESTAMP WITH TIME ZONE | Converts secs since epoch to a timestamp with time zone, eg: to_timestamp(1284352323.5) */
  to_timestamp = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_timestamp", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DOUBLE): DOUBLE | Rounds x to next even number by rounding away from zero, eg: even(2.9) */
  even = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "even", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (INTEGER): INTERVAL | Construct a month interval, eg: to_months(5) */
  to_months = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_months", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT): VARCHAR | Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  formatReadableSize = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "formatReadableSize", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DOUBLE): DOUBLE | Interpolation of (x-1) factorial (so decimal inputs are allowed), eg: gamma(5.5) */
  gamma = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "gamma", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT, BIGINT): BIGINT | Computes the greatest common divisor of x and y, eg: (42).greatest_common_divisor(57) */
  gcd = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "gcd", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (INTEGER): INTERVAL | Construct a day interval, eg: to_days(5) */
  to_days = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_days", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DATE): BOOLEAN | Returns true if the floating point value is finite, false otherwise, eg: isfinite(5.5) */
  isfinite = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "isfinite", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT, INTEGER, INTEGER): VARCHAR | Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length, eg: (42).to_base(16) */
  to_base = (radix: Numericable, minLength?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_base", args: [radix, minLength], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DOUBLE): DOUBLE | Computes the hyperbolic tan of x, eg: tanh(1) */
  tanh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "tanh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Returns the square root of x, eg: sqrt(4) */
  sqrt = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "sqrt", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT, BIGINT, BIGINT): DATE | The date for the given struct., eg: ({'year': 2024).make_date('month': 11, 'day': 14}) */
  make_date = (month?: Numericable, day?: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "make_date", args: [month, day], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DOUBLE, DOUBLE, DOUBLE, DOUBLE): VARCHAR | Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80, eg: (5).bar(0, 20, 10) */
  bar = (min: Numericable, max: Numericable, width?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "bar", args: [min, max, width], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (VARINT): VARCHAR | Converts the value to binary representation, eg: bin(42) */
  bin = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "bin", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DOUBLE): DOUBLE | Converts radians to degrees, eg: degrees(pi()) */
  degrees = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "degrees", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): INTERVAL | Construct a second interval, eg: to_seconds(5.5) */
  to_seconds = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_seconds", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DOUBLE): INTERVAL | Construct a millisecond interval, eg: to_milliseconds(5.5) */
  to_milliseconds = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_milliseconds", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (INTEGER): INTERVAL | Construct a decade interval, eg: to_decades(5) */
  to_decades = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_decades", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (INTEGER): INTERVAL | Construct a century interval, eg: to_centuries(5) */
  to_centuries = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "to_centuries", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT, BIGINT): BIGINT | Computes the least common multiple of x and y, eg: (42).least_common_multiple(57) */
  lcm = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "lcm", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT, BIGINT): BIGINT | Computes the least common multiple of x and y, eg: (42).least_common_multiple(57) */
  least_common_multiple = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "least_common_multiple", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the 2-log of x, eg: log2(8) */
  log2 = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "log2", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT, BIGINT, DOUBLE): TIME | The time for the given parts, eg: (13).make_time(34, 27.123456) */
  make_time = (minute: Numericable, seconds: Numericable) => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "make_time", args: [minute, seconds], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (BIGINT): VARCHAR | Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  format_bytes = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "format_bytes", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (FLOAT): BOOLEAN | Returns true if the floating point value is not a number, false otherwise, eg: isnan('NaN'::FLOAT) */
  isnan = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "isnan", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DOUBLE): DOUBLE | Computes the log of the gamma function, eg: lgamma(2) */
  lgamma = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "lgamma", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE): DOUBLE | Computes the sin of x, eg: sin(90) */
  sin = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "sin", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (FLOAT): BOOLEAN | Returns whether the signbit is set or not, eg: signbit(-0.0) */
  signbit = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "signbit", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DOUBLE): DOUBLE | Computes the arcsine of x, eg: asin(0.5) */
  asin = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "asin", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (TINYINT): TINYINT | Truncates the number, eg: trunc(17.4) */
  trunc = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "trunc", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (INTEGER): HUGEINT | Factorial of x. Computes the product of the current integer and all integers below it, eg: 4! */
  factorial = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "factorial", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT): VARCHAR | Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB), eg: format_bytes(1000 * 16) */
  formatReadableDecimalSize = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "formatReadableDecimalSize", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** (DOUBLE): DOUBLE | Computes the tan of x, eg: tan(90) */
  tan = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "tan", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (BIGINT): TIMESTAMP_NS | The timestamp for the given nanoseconds since epoch, eg: make_timestamp(1732117793000000000) */
  make_timestamp_ns = () => new WhateverFieldImpl("").withOperation({ field: this.ops.field, method: "make_timestamp_ns", args: [], chain: this.ops.method ? this.ops : undefined }) as WhateverField;
  /** (DOUBLE): DOUBLE | Computes the hyperbolic sin of x, eg: sinh(1) */
  sinh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "sinh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** (DOUBLE, DOUBLE): DOUBLE | Computes x to the power of y, eg: (2).pow(3) */
  power = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "power", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;

  toString(): string {
    return operationToSql(this.ops);
  }

  /**
   * Set the operation chain for this field
   * @param ops The operation to set
   * @returns This field instance for chaining
   */
  withOperation(ops: Operation): NumericFieldImpl {
    this.ops = ops;
    return this;
  }
}

const valueWrap = (value: Stringable): string => {
  return isString(value) ? wrap(value, "'") : value.toString();
};

/**
 * Implementation of global DuckDB functions
 * Provides concrete implementations of the DuckDBFunctions interface
 */
export class DuckDBFunctionsImpl implements DuckDBFunctions {
  /** ADD(COL0: INTERVAL, COL1: INTERVAL): WHATEVER - , eg: null */
  add = (col0: Whateverable | Numericable, col1?: Whateverable | Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "add", args: [col0, col1] });
  /** XOR(LEFT: TINYINT, RIGHT: TINYINT): NUMERIC - Bitwise XOR, eg: xor(17, 5) */
  xor = (left: Numericable | Whateverable, right: Numericable | Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "xor", args: [left, right] });
  /** ARRAY_CROSS_PRODUCT(ARRAY: FLOAT[3], P1: FLOAT[3]): WHATEVER - Compute the cross product of two arrays of size 3. The array elements can not be NULL., eg: array_cross_product([1, 2, 3], [1, 2, 3]) */
  array_cross_product = (array: Whateverable, p1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_cross_product", args: [array, p1] });
  /** ARRAY_DISTINCT(LIST: ANY[]): WHATEVER - Removes all duplicates and NULLs from a list. Does not preserve the original order, eg: list_distinct([1, 1, NULL, -3, 1, 5]) */
  array_distinct = (list: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_distinct", args: [list] });
  /** ARRAY_EXTRACT(LIST: ANY[], INDEX: BIGINT): WHATEVER - Extract the indexth (1-based) value from the array., eg: array_extract('DuckDB', 2) */
  array_extract = (list: Whateverable | Stringable, index: Numericable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_extract", args: [list, index] });
  /** ARRAY_HAS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  array_has = (list: Whateverable, element: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_has", args: [list, element] });
  /** VECTOR_TYPE(COL: ANY): VARCHAR - Returns the VectorType of a given column, eg: vector_type(col) */
  vector_type = (col: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "vector_type", args: [col] });
  /** ARRAY_SORT(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Sorts the elements of the list, eg: list_sort([3, 6, 1, 2]) */
  array_sort = (list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_sort", args: [list, col1, col2] });
  /** URL_ENCODE(INPUT: VARCHAR): VARCHAR - Escapes the input string by encoding it so that it can be included in a URL query parameter., eg: url_encode('this string has/ special+ characters>') */
  url_encode = (input: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "url_encode", args: [input] });
  /** ARRAY_VALUE(): WHATEVER - Create an ARRAY containing the argument values., eg: array_value(4, 5, 6) */
  array_value = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_value", args: [] });
  /** ASINH(X: DOUBLE): NUMERIC - Computes the inverse hyperbolic sin of x, eg: asinh(0.5) */
  asinh = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "asinh", args: [x] });
  /** UNION_EXTRACT(UNION: UNION, TAG: VARCHAR): WHATEVER - Extract the value with the named tags from the union. NULL if the tag is not currently selected, eg: union_extract(s, 'k') */
  union_extract = (union: Whateverable, tag: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "union_extract", args: [union, tag] });
  /** COMBINE(COL0: AGGREGATE_STATE<?>, COL1: ANY): WHATEVER - , eg: null */
  combine = (col0: Whateverable, col1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "combine", args: [col0, col1] });
  /** CONTAINS(STR: VARCHAR, SEARCHSTR: VARCHAR): WHATEVER - Returns true if search_string is found within string., eg: contains('abc', 'a') */
  contains = (str: Stringable | Whateverable, searchStr: Stringable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "contains", args: [str, searchStr] });
  /** COT(X: DOUBLE): NUMERIC - Computes the cotangent of x, eg: cot(0.5) */
  cot = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "cot", args: [x] });
  /** TRY_STRPTIME(TEXT: VARCHAR, FORMAT: VARCHAR): WHATEVER - Converts the string text to timestamp according to the format string. Returns NULL on failure., eg: try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p') */
  try_strptime = (text: Stringable, format: Stringable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "try_strptime", args: [text, format] });
  /** TO_YEARS(INTEGER: INTEGER): WHATEVER - Construct a year interval, eg: to_years(5) */
  to_years = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_years", args: [integer] });
  /** DAMERAU_LEVENSHTEIN(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different, eg: damerau_levenshtein('hello', 'world') */
  damerau_levenshtein = (str1: Stringable, str2: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "damerau_levenshtein", args: [str1, str2] });
  /** DIVIDE(COL0: TINYINT, COL1: TINYINT): NUMERIC - , eg: null */
  divide = (col0: Numericable, col1: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "divide", args: [col0, col1] });
  /** EPOCH_NS(TEMPORAL: DATE): NUMERIC - Extract the epoch component in nanoseconds from a temporal type, eg: epoch_ns(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ns = (temporal: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "epoch_ns", args: [temporal] });
  /** EQUI_WIDTH_BINS(MIN: TIMESTAMP, MAX: TIMESTAMP, BINCOUNT: BIGINT, NICEROUNDING: BOOLEAN): WHATEVER - Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged, eg: equi_width_bins(0, 10, 2, true) */
  equi_width_bins = (min: Whateverable | Numericable, max: Whateverable | Numericable, binCount: Numericable, niceRounding: Whateverable): WhateverField =>
    new WhateverFieldImpl("").withOperation({ field: "", method: "equi_width_bins", args: [min, max, binCount, niceRounding] });
  /** TO_QUARTERS(INTEGER: INTEGER): WHATEVER - Construct a quarter interval, eg: to_quarters(5) */
  to_quarters = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_quarters", args: [integer] });
  /** FLOOR(X: FLOAT): NUMERIC - Rounds the number down, eg: floor(17.4) */
  floor = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "floor", args: [x] });
  /** GENERATE_SERIES(START: BIGINT, STOP: BIGINT, STEP: BIGINT): WHATEVER - Create a list of values between start and stop - the stop parameter is inclusive, eg: generate_series(2, 5, 3) */
  generate_series = (start: Numericable | Whateverable, stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField =>
    new WhateverFieldImpl("").withOperation({ field: "", method: "generate_series", args: [start, stop, step] });
  /** TO_JSON(): WHATEVER - , eg: null */
  to_json = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_json", args: [] });
  /** TO_HEX(VALUE: BIGINT): VARCHAR - Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex = (value: Numericable | Stringable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "to_hex", args: [value] });
  /** ICU_SORT_KEY(COL0: VARCHAR, COL1: VARCHAR): VARCHAR - , eg: null */
  icu_sort_key = (col0: Stringable, col1: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "icu_sort_key", args: [col0, col1] });
  /** ISODOW(TS: DATE): NUMERIC - Extract the isodow component from a date or timestamp, eg: isodow(timestamp '2021-08-03 11:59:44.123456') */
  isodow = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "isodow", args: [ts] });
  /** ISOYEAR(TS: DATE): NUMERIC - Extract the isoyear component from a date or timestamp, eg: isoyear(timestamp '2021-08-03 11:59:44.123456') */
  isoyear = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "isoyear", args: [ts] });
  /** JSON_ARRAY_LENGTH(COL0: JSON, COL1: VARCHAR): NUMERIC - , eg: null */
  json_array_length = (col0: Stringable | Whateverable, col1?: Stringable | Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "json_array_length", args: [col0, col1] });
  /** JSON_EXTRACT_PATH(COL0: VARCHAR, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_extract_path = (col0: Stringable | Whateverable, col1: Whateverable | Numericable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_extract_path", args: [col0, col1] });
  /** JSON_EXTRACT_STRING(COL0: JSON, COL1: VARCHAR): VARCHAR - , eg: null */
  json_extract_string = (col0: Whateverable | Stringable, col1: Stringable | Numericable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_extract_string", args: [col0, col1] });
  /** TO_BINARY(VALUE: UBIGINT): VARCHAR - Converts the value to binary representation, eg: bin(42) */
  to_binary = (value: Numericable | Stringable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "to_binary", args: [value] });
  /** JSON_KEYS(COL0: VARCHAR, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_keys = (col0: Stringable | Whateverable, col1?: Whateverable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_keys", args: [col0, col1] });
  /** JSON_STRUCTURE(COL0: VARCHAR): WHATEVER - , eg: null */
  json_structure = (col0: Stringable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_structure", args: [col0] });
  /** JSON_TYPE(COL0: JSON, COL1: VARCHAR): VARCHAR - , eg: null */
  json_type = (col0: Whateverable | Stringable, col1?: Stringable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_type", args: [col0, col1] });
  /** JSON_VALUE(COL0: JSON, COL1: BIGINT): VARCHAR - , eg: null */
  json_value = (col0: Whateverable | Stringable, col1: Numericable | Whateverable | Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_value", args: [col0, col1] });
  /** JULIAN(TS: DATE): NUMERIC - Extract the Julian Day number from a date or timestamp, eg: julian(timestamp '2006-01-01 12:00') */
  julian = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "julian", args: [ts] });
  /** TIME_BUCKET(BUCKETWIDTH: INTERVAL, TIMESTAMP: DATE, ORIGIN: DATE): WHATEVER - Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets, eg: time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07') */
  time_bucket = (bucketWidth: Whateverable, timestamp: Whateverable, origin?: Whateverable | Stringable): WhateverField =>
    new WhateverFieldImpl("").withOperation({ field: "", method: "time_bucket", args: [bucketWidth, timestamp, origin] });
  /** TIMEZONE_HOUR(TS: DATE): NUMERIC - Extract the timezone_hour component from a date or timestamp, eg: timezone_hour(timestamp '2021-08-03 11:59:44.123456') */
  timezone_hour = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "timezone_hour", args: [ts] });
  /** LCASE(STR: VARCHAR): VARCHAR - Convert string to lower case, eg: lower('Hello') */
  lcase = (str: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "lcase", args: [str] });
  /** LIST_CONCAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  list_concat = (list1: Whateverable, list2: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_concat", args: [list1, list2] });
  /** LIST_HAS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  list_has = (list: Whateverable, element: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_has", args: [list, element] });
  /** STRUCT_EXTRACT(STRUCT: STRUCT, ENTRY: BIGINT): WHATEVER - Extract the named entry from the STRUCT., eg: struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i') */
  struct_extract = (struct: Whateverable, entry: Numericable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "struct_extract", args: [struct, entry] });
  /** LIST_HAS_ANY(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if the lists have any element in common. NULLs are ignored., eg: list_has_any([1, 2, 3], [2, 3, 4]) */
  list_has_any = (l1: Whateverable, p1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_has_any", args: [l1, p1] });
  /** STRUCT_CONCAT(): WHATEVER - Merge the multiple STRUCTs into a single STRUCT., eg: struct_concat(struct_pack(i := 4), struct_pack(s := 'string')) */
  struct_concat = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "struct_concat", args: [] });
  /** STRIP_ACCENTS(STR: VARCHAR): VARCHAR - Strips accents from string., eg: strip_accents('mühleisen') */
  strip_accents = (str: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "strip_accents", args: [str] });
  /** STRING_SPLIT_REGEX(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  string_split_regex = (str: Stringable, separator: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "string_split_regex", args: [str, separator, col2] });
  /** STRFTIME(DATA: DATE, FORMAT: VARCHAR): VARCHAR - Converts a date to a string according to the format string., eg: strftime(date '1992-01-01', '%a, %-d %B %Y') */
  strftime = (data: Whateverable | Stringable, format: Stringable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "strftime", args: [data, format] });
  /** LIST_POSITION(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  list_position = (list: Whateverable, element: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_position", args: [list, element] });
  /** STARTS_WITH(STR: VARCHAR, SEARCHSTR: VARCHAR): WHATEVER - Returns true if string begins with search_string, eg: starts_with('abc','a') */
  starts_with = (str: Stringable, searchStr: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "starts_with", args: [str, searchStr] });
  /** LIST_SORT(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Sorts the elements of the list, eg: list_sort([3, 6, 1, 2]) */
  list_sort = (list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_sort", args: [list, col1, col2] });
  /** LN(X: DOUBLE): NUMERIC - Computes the natural logarithm of x, eg: ln(2) */
  ln = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "ln", args: [x] });
  /** LOG10(X: DOUBLE): NUMERIC - Computes the 10-log of x, eg: log10(1000) */
  log10 = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "log10", args: [x] });
  /** MAKE_TIMESTAMP(YEAR: BIGINT, MONTH: BIGINT, DAY: BIGINT, HOUR: BIGINT, MINUTE: BIGINT, SECONDS: DOUBLE): WHATEVER - The timestamp for the given parts, eg: make_timestamp(1992, 9, 20, 13, 34, 27.123456) */
  make_timestamp = (year: Numericable, month?: Numericable, day?: Numericable, hour?: Numericable, minute?: Numericable, seconds?: Numericable): WhateverField =>
    new WhateverFieldImpl("").withOperation({ field: "", method: "make_timestamp", args: [year, month, day, hour, minute, seconds] });
  /** MAP_CONTAINS(MAP: MAP(ANY, ANY), KEY: ANY): WHATEVER - Checks if a map contains a given key., eg: map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2') */
  map_contains = (map: Whateverable, key: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map_contains", args: [map, key] });
  /** MAP_ENTRIES(): WHATEVER - Returns the map entries as a list of keys/values, eg: map_entries(map(['key'], ['val'])) */
  map_entries = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map_entries", args: [] });
  /** MAP_EXTRACT(MAP: ANY, KEY: ANY): WHATEVER - Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: map_extract(map(['key'], ['val']), 'key') */
  map_extract = (map: Whateverable, key: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map_extract", args: [map, key] });
  /** MICROSECOND(TS: DATE): NUMERIC - Extract the microsecond component from a date or timestamp, eg: microsecond(timestamp '2021-08-03 11:59:44.123456') */
  microsecond = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "microsecond", args: [ts] });
  /** SIGN(X: TINYINT): NUMERIC - Returns the sign of x as -1, 0 or 1, eg: sign(-349) */
  sign = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "sign", args: [x] });
  /** SHA256(VALUE: VARCHAR): VARCHAR - Returns the SHA256 hash of the value, eg: sha256('hello') */
  sha256 = (value: Stringable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "sha256", args: [value] });
  /** MONTHNAME(TS: DATE): VARCHAR - The (English) name of the month, eg: monthname(TIMESTAMP '1992-09-20') */
  monthname = (ts: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "monthname", args: [ts] });
  /** MULTIPLY(COL0: TINYINT, COL1: TINYINT): NUMERIC - , eg: null */
  multiply = (col0: Numericable | Whateverable, col1: Numericable | Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "multiply", args: [col0, col1] });
  /** NEXTAFTER(X: DOUBLE, P1: DOUBLE): NUMERIC - Returns the next floating point value after x in the direction of y, eg: nextafter(1::float, 2::float) */
  nextafter = (x: Numericable, p1: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "nextafter", args: [x, p1] });
  /** PARSE_DIRPATH(STR: VARCHAR, SEPARATOR: VARCHAR): VARCHAR - Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash, eg: parse_dirpath('path/to/file.csv', 'system') */
  parse_dirpath = (str: Stringable, separator?: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "parse_dirpath", args: [str, separator] });
  /** POW(X: DOUBLE, Y: DOUBLE): NUMERIC - Computes x to the power of y, eg: pow(2, 3) */
  pow = (x: Numericable, y: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "pow", args: [x, y] });
  /** RADIANS(X: DOUBLE): NUMERIC - Converts degrees to radians, eg: radians(90) */
  radians = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "radians", args: [x] });
  /** RANGE(START: BIGINT, STOP: BIGINT, STEP: BIGINT): WHATEVER - Create a list of values between start and stop - the stop parameter is exclusive, eg: range(2, 5, 3) */
  range = (start: Numericable | Whateverable, stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "range", args: [start, stop, step] });
  /** ROW_TO_JSON(): WHATEVER - , eg: null */
  row_to_json = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "row_to_json", args: [] });
  /** REPEAT(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Repeats the string count number of times, eg: repeat('A', 5) */
  repeat = (str: Stringable | Whateverable, count: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "repeat", args: [str, count] });
  /** WEEKDAY(TS: DATE): NUMERIC - Extract the weekday component from a date or timestamp, eg: weekday(timestamp '2021-08-03 11:59:44.123456') */
  weekday = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "weekday", args: [ts] });
  /** ARRAY_CONTAINS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  array_contains = (list: Whateverable, element: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_contains", args: [list, element] });
  /** ARRAY_DOT_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_inner_product([1, 2, 3], [1, 2, 3]) */
  array_dot_product = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_dot_product", args: [array1, array2] });
  /** ARRAY_GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  array_grade_up = (list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_grade_up", args: [list, col1, col2] });
  /** ARRAY_HAS_ALL(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if all elements of l2 are in l1. NULLs are ignored., eg: list_has_all([1, 2, 3], [2, 3]) */
  array_has_all = (l1: Whateverable, p1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_has_all", args: [l1, p1] });
  /** ARRAY_REVERSE_SORT(LIST: ANY[], COL1: VARCHAR): WHATEVER - Sorts the elements of the list in reverse order, eg: list_reverse_sort([3, 6, 1, 2]) */
  array_reverse_sort = (list: Whateverable, col1?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_reverse_sort", args: [list, col1] });
  /** ARRAY_SLICE(LIST: ANY, BEGIN: ANY, END: ANY, STEP: BIGINT): WHATEVER - Extract a sublist using slice conventions. Negative values are accepted., eg: list_slice([4, 5, 6], 2, 3) */
  array_slice = (list: Whateverable, begin: Whateverable, end: Whateverable, step?: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_slice", args: [list, begin, end, step] });
  /** ATANH(X: DOUBLE): NUMERIC - Computes the inverse hyperbolic tan of x, eg: atanh(0.5) */
  atanh = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "atanh", args: [x] });
  /** UPPER(STR: VARCHAR): VARCHAR - Convert string to upper case., eg: upper('Hello') */
  upper = (str: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "upper", args: [str] });
  /** UNPIVOT_LIST(): WHATEVER - Identical to list_value, but generated as part of unpivot for better error messages, eg: unpivot_list(4, 5, 6) */
  unpivot_list = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "unpivot_list", args: [] });
  /** UNHEX(VALUE: VARCHAR): WHATEVER - Converts a value from hexadecimal representation to a blob, eg: unhex('2A') */
  unhex = (value: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "unhex", args: [value] });
  /** CONSTANT_OR_NULL(ARG1: ANY, ARG2: ANY): WHATEVER - If arg2 is NULL, return NULL. Otherwise, return arg1., eg: constant_or_null(42, NULL) */
  constant_or_null = (arg1: Whateverable, arg2: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "constant_or_null", args: [arg1, arg2] });
  /** COS(X: DOUBLE): NUMERIC - Computes the cos of x, eg: cos(90) */
  cos = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "cos", args: [x] });
  /** COSH(X: DOUBLE): NUMERIC - Computes the hyperbolic cos of x, eg: cosh(1) */
  cosh = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "cosh", args: [x] });
  /** DATE_PART(TS: VARCHAR[], COL1: DATE): WHATEVER - Get subfield (equivalent to extract), eg: date_part('minute', TIMESTAMP '1992-09-20 20:38:40') */
  date_part = (ts: Whateverable | Stringable, col1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "date_part", args: [ts, col1] });
  /** DAYOFMONTH(TS: DATE): NUMERIC - Extract the dayofmonth component from a date or timestamp, eg: dayofmonth(timestamp '2021-08-03 11:59:44.123456') */
  dayofmonth = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "dayofmonth", args: [ts] });
  /** DECODE(BLOB: BLOB): VARCHAR - Convert blob to varchar. Fails if blob is not valid utf-8, eg: decode('\xC3\xBC'::BLOB) */
  decode = (blob: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "decode", args: [blob] });
  /** TO_MILLENNIA(INTEGER: INTEGER): WHATEVER - Construct a millenium interval, eg: to_millennia(1) */
  to_millennia = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_millennia", args: [integer] });
  /** TO_MICROSECONDS(INTEGER: BIGINT): WHATEVER - Construct a microsecond interval, eg: to_microseconds(5) */
  to_microseconds = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_microseconds", args: [integer] });
  /** HASH(PARAM: ANY): NUMERIC - Returns an integer with the hash of the value. Note that this is not a cryptographic hash, eg: hash('🦆') */
  hash = (param: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "hash", args: [param] });
  /** ILIKE_ESCAPE(STR: VARCHAR, LIKESPECIFIER: VARCHAR, ESCAPECHARACTER: VARCHAR): WHATEVER - Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string., eg: ilike_escape('A%c', 'a$%C', '$') */
  ilike_escape = (str: Stringable, likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "ilike_escape", args: [str, likeSpecifier, escapeCharacter] });
  /** ISINF(X: FLOAT): WHATEVER - Returns true if the floating point value is infinite, false otherwise, eg: isinf('Infinity'::float) */
  isinf = (x: Numericable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "isinf", args: [x] });
  /** JSON_EXTRACT(COL0: VARCHAR, COL1: BIGINT): WHATEVER - , eg: null */
  json_extract = (col0: Stringable | Whateverable, col1: Numericable | Whateverable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_extract", args: [col0, col1] });
  /** JSON_EXTRACT_PATH_TEXT(COL0: JSON, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_extract_path_text = (col0: Whateverable | Stringable, col1: Whateverable | Numericable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_extract_path_text", args: [col0, col1] });
  /** TO_BASE64(BLOB: BLOB): VARCHAR - Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  to_base64 = (blob: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "to_base64", args: [blob] });
  /** JSON_QUOTE(): WHATEVER - , eg: null */
  json_quote = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_quote", args: [] });
  /** JSON_SERIALIZE_SQL(COL0: VARCHAR, COL1: BOOLEAN, COL2: BOOLEAN, COL3: BOOLEAN): WHATEVER - , eg: null */
  json_serialize_sql = (col0: Stringable, col1?: Whateverable, col2?: Whateverable, col3?: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_serialize_sql", args: [col0, col1, col2, col3] });
  /** LAST_DAY(TS: DATE): WHATEVER - Returns the last day of the month, eg: last_day(TIMESTAMP '1992-03-22 01:02:03.1234') */
  last_day = (ts: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "last_day", args: [ts] });
  /** LEN(STR: VARCHAR): NUMERIC - Number of characters in string., eg: length('Hello🦆') */
  len = (str: Stringable | Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "len", args: [str] });
  /** LEVENSHTEIN(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: levenshtein('duck','db') */
  levenshtein = (str1: Stringable, str2: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "levenshtein", args: [str1, str2] });
  /** SUBTRACT(COL0: DATE, COL1: DATE): NUMERIC - , eg: null */
  subtract = (col0: Numericable | Whateverable, col1?: Whateverable | Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "subtract", args: [col0, col1] });
  /** SUBSTRING_GRAPHEME(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2) */
  substring_grapheme = (str: Stringable, start: Numericable, length?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "substring_grapheme", args: [str, start, length] });
  /** SUBSTR(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring('Hello', 2, 2) */
  substr = (str: Stringable, start: Numericable, length?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "substr", args: [str, start, length] });
  /** LIST_COSINE_SIMILARITY(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the cosine similarity between two lists, eg: list_cosine_similarity([1, 2, 3], [1, 2, 3]) */
  list_cosine_similarity = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_cosine_similarity", args: [list1, list2] });
  /** LIST_EXTRACT(LIST: ANY[], INDEX: BIGINT): WHATEVER - Extract the indexth (1-based) value from the list., eg: list_extract([4, 5, 6], 3) */
  list_extract = (list: Whateverable | Stringable, index: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_extract", args: [list, index] });
  /** LIST_FILTER(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Constructs a list from those elements of the input list for which the lambda function returns true, eg: list_filter([3, 4, 5], x -> x > 4) */
  list_filter = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_filter", args: [list, lambda] });
  /** LIST_INNER_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the inner product between two lists, eg: list_inner_product([1, 2, 3], [1, 2, 3]) */
  list_inner_product = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_inner_product", args: [list1, list2] });
  /** STRPTIME(TEXT: VARCHAR, FORMAT: VARCHAR): WHATEVER - Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime., eg: strptime('4/15/2023 10:56:00', ['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S']) */
  strptime = (text: Stringable, format: Stringable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "strptime", args: [text, format] });
  /** STRLEN(STR: VARCHAR): NUMERIC - Number of bytes in string., eg: strlen('🦆') */
  strlen = (str: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "strlen", args: [str] });
  /** LIST_NEGATIVE_DOT_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the negative inner product between two lists, eg: list_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  list_negative_dot_product = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_negative_dot_product", args: [list1, list2] });
  /** LIST_RESIZE(LIST: ANY[], SIZE: ANY, VALUE: ANY): WHATEVER - Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: list_resize([1, 2, 3], 5, 0) */
  list_resize = (list: Whateverable, size: Whateverable, value?: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_resize", args: [list, size, value] });
  /** LIST_REVERSE_SORT(LIST: ANY[], COL1: VARCHAR): WHATEVER - Sorts the elements of the list in reverse order, eg: list_reverse_sort([3, 6, 1, 2]) */
  list_reverse_sort = (list: Whateverable, col1?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_reverse_sort", args: [list, col1] });
  /** LIST_VALUE(): WHATEVER - Create a LIST containing the argument values, eg: list_value(4, 5, 6) */
  list_value = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_value", args: [] });
  /** LOG(B: DOUBLE, P1: DOUBLE): NUMERIC - Computes the logarithm of x to base b. b may be omitted, in which case the default 10, eg: log(2, 64) */
  log = (b: Numericable, p1?: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "log", args: [b, p1] });
  /** MAP_KEYS(): WHATEVER - Returns the keys of a map as a list, eg: map_keys(map(['key'], ['val'])) */
  map_keys = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map_keys", args: [] });
  /** MAP_VALUES(): WHATEVER - Returns the values of a map as a list, eg: map_values(map(['key'], ['val'])) */
  map_values = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map_values", args: [] });
  /** NFC_NORMALIZE(STR: VARCHAR): VARCHAR - Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not., eg: nfc_normalize('ardèch') */
  nfc_normalize = (str: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "nfc_normalize", args: [str] });
  /** ORD(STR: VARCHAR): NUMERIC - Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  ord = (str: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "ord", args: [str] });
  /** SHA1(VALUE: VARCHAR): VARCHAR - Returns the SHA1 hash of the value, eg: sha1('hello') */
  sha1 = (value: Stringable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "sha1", args: [value] });
  /** REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  reduce = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "reduce", args: [list, lambda] });
  /** REGEXP_FULL_MATCH(STR: VARCHAR, REGEX: VARCHAR, OPTIONS: VARCHAR): WHATEVER - Returns true if the entire string matches the regex. A set of optional options can be set., eg: regexp_full_match('anabanana', '(an)*') */
  regexp_full_match = (str: Stringable, regex: Stringable, options?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "regexp_full_match", args: [str, regex, options] });
  /** REGEXP_REPLACE(STR: VARCHAR, PATTERN: VARCHAR, REPLACEMENT: VARCHAR, OPTIONS: VARCHAR): VARCHAR - If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set., eg: regexp_replace('hello', '[lo]', '-') */
  regexp_replace = (str: Stringable, pattern: Stringable, replacement: Stringable, options?: Stringable): StringField =>
    new StringFieldImpl("").withOperation({ field: "", method: "regexp_replace", args: [str, pattern, replacement, options] });
  /** REGEXP_SPLIT_TO_ARRAY(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  regexp_split_to_array = (str: Stringable, separator: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "regexp_split_to_array", args: [str, separator, col2] });
  /** ROW(): WHATEVER - Create an unnamed STRUCT (tuple) containing the argument values., eg: row(i, i % 4, i / 4) */
  row = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "row", args: [] });
  /** ROUND(X: FLOAT, PRECISION: INTEGER): NUMERIC - Rounds x to s decimal places, eg: round(42.4332, 2) */
  round = (x: Numericable, precision?: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "round", args: [x, precision] });
  /** ARRAY_AGGREGATE(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  array_aggregate = (list: Whateverable, name: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_aggregate", args: [list, name] });
  /** ARRAY_CAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  array_cat = (list1: Whateverable, list2: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_cat", args: [list1, list2] });
  /** ARRAY_LENGTH(LIST: ANY[], COL1: BIGINT): NUMERIC - Returns the length of the list., eg: array_length([1,2,3]) */
  array_length = (list: Whateverable, col1?: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_length", args: [list, col1] });
  /** ARRAY_POSITION(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  array_position = (list: Whateverable, element: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_position", args: [list, element] });
  /** URL_DECODE(INPUT: VARCHAR): VARCHAR - Unescapes the URL encoded input., eg: url_decode('this%20string%20is%2BFencoded') */
  url_decode = (input: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "url_decode", args: [input] });
  /** ARRAY_TRANSFORM(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  array_transform = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_transform", args: [list, lambda] });
  /** ARRAY_UNIQUE(LIST: ANY[]): NUMERIC - Counts the unique elements of a list, eg: list_unique([1, 1, NULL, -3, 1, 5]) */
  array_unique = (list: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_unique", args: [list] });
  /** ASCII(STR: VARCHAR): NUMERIC - Returns an integer that represents the Unicode code point of the first character of the string, eg: ascii('Ω') */
  ascii = (str: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "ascii", args: [str] });
  /** BITSTRING(BITSTR: BIT, LENGTH: INTEGER): WHATEVER - Pads the bitstring until the specified length, eg: bitstring('1010'::BIT, 7) */
  bitstring = (bitstr: Whateverable | Stringable, length: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "bitstring", args: [bitstr, length] });
  /** CAN_CAST_IMPLICITLY(SOURCETYPE: ANY, TARGETTYPE: ANY): WHATEVER - Whether or not we can implicitly cast from the source type to the other type, eg: can_implicitly_cast(NULL::INTEGER, NULL::BIGINT) */
  can_cast_implicitly = (sourceType: Whateverable, targetType: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "can_cast_implicitly", args: [sourceType, targetType] });
  /** TYPEOF(EXPRESSION: ANY): VARCHAR - Returns the name of the data type of the result of the expression, eg: typeof('abc') */
  typeof = (expression: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "typeof", args: [expression] });
  /** TRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from either side of the string, eg: trim('>>>>test<<', '><') */
  trim = (str: Stringable, characters?: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "trim", args: [str, characters] });
  /** CURRENT_SETTING(SETTINGNAME: VARCHAR): WHATEVER - Returns the current value of the configuration setting, eg: current_setting('access_mode') */
  current_setting = (settingName: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "current_setting", args: [settingName] });
  /** DATETRUNC(PART: VARCHAR, TIMESTAMP: DATE): WHATEVER - Truncate to specified precision, eg: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40') */
  datetrunc = (part: Stringable, timestamp: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "datetrunc", args: [part, timestamp] });
  /** DATE_DIFF(PART: VARCHAR, STARTDATE: DATE, ENDDATE: DATE): NUMERIC - The number of partition boundaries between the timestamps, eg: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  date_diff = (part: Stringable, startdate: Whateverable, enddate: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "date_diff", args: [part, startdate, enddate] });
  /** DAY(TS: DATE): NUMERIC - Extract the day component from a date or timestamp, eg: day(timestamp '2021-08-03 11:59:44.123456') */
  day = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "day", args: [ts] });
  /** DAYOFYEAR(TS: DATE): NUMERIC - Extract the dayofyear component from a date or timestamp, eg: dayofyear(timestamp '2021-08-03 11:59:44.123456') */
  dayofyear = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "dayofyear", args: [ts] });
  /** DECADE(TS: DATE): NUMERIC - Extract the decade component from a date or timestamp, eg: decade(timestamp '2021-08-03 11:59:44.123456') */
  decade = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "decade", args: [ts] });
  /** ENUM_RANGE_BOUNDARY(START: ANY, END: ANY): WHATEVER - Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type, eg: enum_range_boundary(NULL, 'happy'::mood) */
  enum_range_boundary = (start: Whateverable, end: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "enum_range_boundary", args: [start, end] });
  /** EPOCH_MS(TEMPORAL: DATE): NUMERIC - Extract the epoch component in milliseconds from a temporal type, eg: epoch_ms(timestamp '2021-08-03 11:59:44.123456') */
  epoch_ms = (temporal: Whateverable | Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "epoch_ms", args: [temporal] });
  /** EPOCH_US(TEMPORAL: DATE): NUMERIC - Extract the epoch component in microseconds from a temporal type, eg: epoch_us(timestamp '2021-08-03 11:59:44.123456') */
  epoch_us = (temporal: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "epoch_us", args: [temporal] });
  /** ERA(TS: DATE): NUMERIC - Extract the era component from a date or timestamp, eg: era(timestamp '2021-08-03 11:59:44.123456') */
  era = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "era", args: [ts] });
  /** FROM_JSON(COL0: JSON, COL1: VARCHAR): WHATEVER - , eg: null */
  from_json = (col0: Whateverable | Stringable, col1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "from_json", args: [col0, col1] });
  /** GETVARIABLE(COL0: VARCHAR): WHATEVER - , eg: null */
  getvariable = (col0: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "getvariable", args: [col0] });
  /** TO_HOURS(INTEGER: BIGINT): WHATEVER - Construct a hour interval, eg: to_hours(5) */
  to_hours = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_hours", args: [integer] });
  /** GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  grade_up = (list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "grade_up", args: [list, col1, col2] });
  /** HEX(VALUE: VARINT): VARCHAR - Converts the value to hexadecimal representation, eg: hex(42) */
  hex = (value: Whateverable | Numericable | Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "hex", args: [value] });
  /** INSTR(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  instr = (haystack: Stringable, needle: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "instr", args: [haystack, needle] });
  /** JARO_WINKLER_SIMILARITY(STR1: VARCHAR, STR2: VARCHAR, SCORECUTOFF: DOUBLE): NUMERIC - The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaro_winkler_similarity('duck', 'duckdb', 0.5) */
  jaro_winkler_similarity = (str1: Stringable, str2: Stringable, scoreCutoff?: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "jaro_winkler_similarity", args: [str1, str2, scoreCutoff] });
  /** JSON_CONTAINS(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_contains = (col0: Stringable | Whateverable, col1: Stringable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_contains", args: [col0, col1] });
  /** JSON_EXISTS(COL0: JSON, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_exists = (col0: Whateverable | Stringable, col1: Whateverable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_exists", args: [col0, col1] });
  /** JSON_MERGE_PATCH(): WHATEVER - , eg: null */
  json_merge_patch = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_merge_patch", args: [] });
  /** JSON_OBJECT(): WHATEVER - , eg: null */
  json_object = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_object", args: [] });
  /** JSON_SERIALIZE_PLAN(COL0: VARCHAR, COL1: BOOLEAN, COL2: BOOLEAN, COL3: BOOLEAN, COL4: BOOLEAN): WHATEVER - , eg: null */
  json_serialize_plan = (col0: Stringable, col1?: Whateverable, col2?: Whateverable, col3?: Whateverable, col4?: Whateverable): WhateverField =>
    new WhateverFieldImpl("").withOperation({ field: "", method: "json_serialize_plan", args: [col0, col1, col2, col3, col4] });
  /** JSON_TRANSFORM(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_transform = (col0: Stringable | Whateverable, col1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_transform", args: [col0, col1] });
  /** JSON_VALID(COL0: JSON): WHATEVER - , eg: null */
  json_valid = (col0: Whateverable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_valid", args: [col0] });
  /** LEAST(ARG1: ANY): WHATEVER - Returns the lowest value of the set of input parameters, eg: least(42, 84) */
  least = (arg1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "least", args: [arg1] });
  /** LIST_DISTINCT(LIST: ANY[]): WHATEVER - Removes all duplicates and NULLs from a list. Does not preserve the original order, eg: list_distinct([1, 1, NULL, -3, 1, 5]) */
  list_distinct = (list: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_distinct", args: [list] });
  /** LIST_DOT_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the inner product between two lists, eg: list_inner_product([1, 2, 3], [1, 2, 3]) */
  list_dot_product = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_dot_product", args: [list1, list2] });
  /** LIST_ELEMENT(LIST: ANY[], INDEX: BIGINT): WHATEVER - Extract the indexth (1-based) value from the list., eg: list_extract([4, 5, 6], 3) */
  list_element = (list: Whateverable | Stringable, index: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_element", args: [list, index] });
  /** STRUCT_INSERT(): WHATEVER - Adds field(s)/value(s) to an existing STRUCT with the argument values. The entry name(s) will be the bound variable name(s), eg: struct_insert({'a': 1}, b := 2) */
  struct_insert = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "struct_insert", args: [] });
  /** STRPOS(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  strpos = (haystack: Stringable, needle: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "strpos", args: [haystack, needle] });
  /** LIST_TRANSFORM(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  list_transform = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_transform", args: [list, lambda] });
  /** LOWER(STR: VARCHAR): VARCHAR - Convert string to lower case, eg: lower('Hello') */
  lower = (str: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "lower", args: [str] });
  /** LPAD(STR: VARCHAR, COUNT: INTEGER, CHARACTER: VARCHAR): VARCHAR - Pads the string with the character from the left until it has count characters, eg: lpad('hello', 10, '>') */
  lpad = (str: Stringable, count: Numericable, character: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "lpad", args: [str, count, character] });
  /** LTRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from the left side of the string, eg: ltrim('>>>>test<<', '><') */
  ltrim = (str: Stringable, characters?: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "ltrim", args: [str, characters] });
  /** MAKE_TIMESTAMPTZ(COL0: BIGINT, COL1: BIGINT, COL2: BIGINT, COL3: BIGINT, COL4: BIGINT, COL5: DOUBLE, COL6: VARCHAR): WHATEVER - , eg: null */
  make_timestamptz = (col0: Numericable, col1?: Numericable, col2?: Numericable, col3?: Numericable, col4?: Numericable, col5?: Numericable, col6?: Stringable): WhateverField =>
    new WhateverFieldImpl("").withOperation({ field: "", method: "make_timestamptz", args: [col0, col1, col2, col3, col4, col5, col6] });
  /** MAP(): WHATEVER - Creates a map from a set of keys and values, eg: map(['key1', 'key2'], ['val1', 'val2']) */
  map = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map", args: [] });
  /** MAP_CONCAT(): WHATEVER - Returns a map created from merging the input maps, on key collision the value is taken from the last map with that key, eg: map_concat(map([1,2], ['a', 'b']), map([2,3], ['c', 'd'])); */
  map_concat = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map_concat", args: [] });
  /** SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  split = (str: Stringable, separator: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "split", args: [str, separator] });
  /** MOD(COL0: TINYINT, COL1: TINYINT): NUMERIC - , eg: null */
  mod = (col0: Numericable, col1: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "mod", args: [col0, col1] });
  /** PARSE_FILENAME(STR: VARCHAR, TRIMEXTENSION: BOOLEAN, SEPARATOR: VARCHAR): VARCHAR - Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash, eg: parse_filename('path/to/file.csv', true, 'forward_slash') */
  parse_filename = (str: Stringable, trimExtension?: Whateverable | Stringable, separator?: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "parse_filename", args: [str, trimExtension, separator] });
  /** PARSE_PATH(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash, eg: parse_path('path/to/file.csv', 'system') */
  parse_path = (str: Stringable, separator?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "parse_path", args: [str, separator] });
  /** POSITION(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  position = (haystack: Stringable, needle: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "position", args: [haystack, needle] });
  /** REVERSE(STR: VARCHAR): VARCHAR - Reverses the string, eg: reverse('hello') */
  reverse = (str: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "reverse", args: [str] });
  /** ABS(X: TINYINT): NUMERIC - Absolute value, eg: abs(-17.4) */
  abs = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "abs", args: [x] });
  /** ACOS(X: DOUBLE): NUMERIC - Computes the arccosine of x, eg: acos(0.5) */
  acos = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "acos", args: [x] });
  /** AGE(TIMESTAMP: TIMESTAMP): WHATEVER - Subtract arguments, resulting in the time difference between the two timestamps, eg: age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20') */
  age = (timestamp: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "age", args: [timestamp] });
  /** AGGREGATE(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  aggregate = (list: Whateverable, name: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "aggregate", args: [list, name] });
  /** APPLY(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  apply = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "apply", args: [list, lambda] });
  /** ARRAY_CONCAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  array_concat = (list1: Whateverable, list2: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_concat", args: [list1, list2] });
  /** ARRAY_HAS_ANY(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if the lists have any element in common. NULLs are ignored., eg: list_has_any([1, 2, 3], [2, 3, 4]) */
  array_has_any = (l1: Whateverable, p1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_has_any", args: [l1, p1] });
  /** VERSION(): VARCHAR - Returns the currently active version of DuckDB in this format: v0.3.2	, eg: version() */
  version = (): StringField => new StringFieldImpl("").withOperation({ field: "", method: "version", args: [] });
  /** ARRAY_SELECT(VALUELIST: ANY[], INDEXLIST: BIGINT[]): WHATEVER - Returns a list based on the elements selected by the index_list., eg: list_select([10, 20, 30, 40], [1, 4]) */
  array_select = (valueList: Whateverable, indexList: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_select", args: [valueList, indexList] });
  /** ATAN(X: DOUBLE): NUMERIC - Computes the arctangent of x, eg: atan(0.5) */
  atan = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "atan", args: [x] });
  /** BIT_LENGTH(COL0: VARCHAR): NUMERIC - , eg: null */
  bit_length = (col0: Stringable | Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "bit_length", args: [col0] });
  /** UNICODE(STR: VARCHAR): NUMERIC - Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  unicode = (str: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "unicode", args: [str] });
  /** CBRT(X: DOUBLE): NUMERIC - Returns the cube root of x, eg: cbrt(8) */
  cbrt = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "cbrt", args: [x] });
  /** CEIL(X: FLOAT): NUMERIC - Rounds the number up, eg: ceil(17.4) */
  ceil = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "ceil", args: [x] });
  /** CENTURY(TS: DATE): NUMERIC - Extract the century component from a date or timestamp, eg: century(timestamp '2021-08-03 11:59:44.123456') */
  century = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "century", args: [ts] });
  /** CHR(CODEPOINT: INTEGER): VARCHAR - Returns a character which is corresponding the ASCII code value or Unicode code point, eg: chr(65) */
  chr = (codePoint: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "chr", args: [codePoint] });
  /** UCASE(STR: VARCHAR): VARCHAR - Convert string to upper case., eg: upper('Hello') */
  ucase = (str: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "ucase", args: [str] });
  /** DATEDIFF(PART: VARCHAR, STARTDATE: DATE, ENDDATE: DATE): NUMERIC - The number of partition boundaries between the timestamps, eg: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  datediff = (part: Stringable, startdate: Whateverable, enddate: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "datediff", args: [part, startdate, enddate] });
  /** DATESUB(PART: VARCHAR, STARTDATE: DATE, ENDDATE: DATE): NUMERIC - The number of complete partitions between the timestamps, eg: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  datesub = (part: Stringable, startdate: Whateverable, enddate: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "datesub", args: [part, startdate, enddate] });
  /** TO_WEEKS(INTEGER: INTEGER): WHATEVER - Construct a week interval, eg: to_weeks(5) */
  to_weeks = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_weeks", args: [integer] });
  /** ENCODE(STR: VARCHAR): WHATEVER - Convert varchar to blob. Converts utf-8 characters into literal encoding, eg: encode('my_string_with_ü') */
  encode = (str: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "encode", args: [str] });
  /** EXP(X: DOUBLE): NUMERIC - Computes e to the power of x, eg: exp(1) */
  exp = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "exp", args: [x] });
  /** FILTER(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Constructs a list from those elements of the input list for which the lambda function returns true, eg: list_filter([3, 4, 5], x -> x > 4) */
  filter = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "filter", args: [list, lambda] });
  /** FINALIZE(COL0: AGGREGATE_STATE<?>): WHATEVER - , eg: null */
  finalize = (col0: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "finalize", args: [col0] });
  /** FLATTEN(NESTEDLIST: ANY[][]): WHATEVER - Flatten a nested list by one level, eg: flatten([[1, 2, 3], [4, 5]]) */
  flatten = (nestedList: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "flatten", args: [nestedList] });
  /** TO_MINUTES(INTEGER: BIGINT): WHATEVER - Construct a minute interval, eg: to_minutes(5) */
  to_minutes = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_minutes", args: [integer] });
  /** FROM_HEX(VALUE: VARCHAR): WHATEVER - Converts a value from hexadecimal representation to a blob, eg: unhex('2A') */
  from_hex = (value: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "from_hex", args: [value] });
  /** GET_BIT(BITSTR: BIT, INDEX: INTEGER): NUMERIC - Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0, eg: get_bit('0110010'::BIT, 2) */
  get_bit = (bitstr: Whateverable, index: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "get_bit", args: [bitstr, index] });
  /** GREATEST_COMMON_DIVISOR(X: BIGINT, Y: BIGINT): NUMERIC - Computes the greatest common divisor of x and y, eg: greatest_common_divisor(42, 57) */
  greatest_common_divisor = (x: Numericable, y: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "greatest_common_divisor", args: [x, y] });
  /** HOUR(TS: DATE): NUMERIC - Extract the hour component from a date or timestamp, eg: hour(timestamp '2021-08-03 11:59:44.123456') */
  hour = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "hour", args: [ts] });
  /** JSON_PRETTY(COL0: JSON): VARCHAR - , eg: null */
  json_pretty = (col0: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_pretty", args: [col0] });
  /** LEFT_GRAPHEME(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the left-most count grapheme clusters, eg: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1) */
  left_grapheme = (str: Stringable, count: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "left_grapheme", args: [str, count] });
  /** LIST_AGGREGATE(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  list_aggregate = (list: Whateverable, name: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_aggregate", args: [list, name] });
  /** SUBSTRING(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring('Hello', 2, 2) */
  substring = (str: Stringable, start: Numericable, length?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "substring", args: [str, start, length] });
  /** STR_SPLIT_REGEX(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  str_split_regex = (str: Stringable, separator: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "str_split_regex", args: [str, separator, col2] });
  /** STRUCT_PACK(): WHATEVER - Create a STRUCT containing the argument values. The entry name will be the bound variable name., eg: struct_pack(i := 4, s := 'string') */
  struct_pack = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "struct_pack", args: [] });
  /** LIST_DISTANCE(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the distance between two lists, eg: list_distance([1, 2, 3], [1, 2, 3]) */
  list_distance = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_distance", args: [list1, list2] });
  /** MD5(VALUE: VARCHAR): VARCHAR - Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5 = (value: Stringable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "md5", args: [value] });
  /** MILLENNIUM(TS: DATE): NUMERIC - Extract the millennium component from a date or timestamp, eg: millennium(timestamp '2021-08-03 11:59:44.123456') */
  millennium = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "millennium", args: [ts] });
  /** NOT_ILIKE_ESCAPE(STR: VARCHAR, LIKESPECIFIER: VARCHAR, ESCAPECHARACTER: VARCHAR): WHATEVER - Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string., eg: not_ilike_escape('A%c', 'a$%C', '$') */
  not_ilike_escape = (str: Stringable, likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField =>
    new WhateverFieldImpl("").withOperation({ field: "", method: "not_ilike_escape", args: [str, likeSpecifier, escapeCharacter] });
  /** NOT_LIKE_ESCAPE(STR: VARCHAR, LIKESPECIFIER: VARCHAR, ESCAPECHARACTER: VARCHAR): WHATEVER - Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string., eg: not_like_escape('a%c', 'a$%c', '$') */
  not_like_escape = (str: Stringable, likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "not_like_escape", args: [str, likeSpecifier, escapeCharacter] });
  /** PRINTF(FORMAT: VARCHAR): VARCHAR - Formats a string using printf syntax, eg: printf('Benchmark "%s" took %d seconds', 'CSV', 42) */
  printf = (format: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "printf", args: [format] });
  /** REGEXP_EXTRACT_ALL(STR: VARCHAR, P1: VARCHAR): WHATEVER - Split the string along the regex and extract all occurrences of group. A set of optional options can be set., eg: regexp_extract_all('hello_world', '([a-z ]+)_?', 1) */
  regexp_extract_all = (str: Stringable, p1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "regexp_extract_all", args: [str, p1] });
  /** RTRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from the right side of the string, eg: rtrim('>>>>test<<', '><') */
  rtrim = (str: Stringable, characters?: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "rtrim", args: [str, characters] });
  /** RIGHT_GRAPHEME(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the right-most count grapheme clusters, eg: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1) */
  right_grapheme = (str: Stringable, count: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "right_grapheme", args: [str, count] });
  /** ACOSH(X: DOUBLE): NUMERIC - Computes the inverse hyperbolic cos of x, eg: acosh(2.3) */
  acosh = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "acosh", args: [x] });
  /** WEEKOFYEAR(TS: DATE): NUMERIC - Extract the weekofyear component from a date or timestamp, eg: weekofyear(timestamp '2021-08-03 11:59:44.123456') */
  weekofyear = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "weekofyear", args: [ts] });
  /** WEEK(TS: DATE): NUMERIC - Extract the week component from a date or timestamp, eg: week(timestamp '2021-08-03 11:59:44.123456') */
  week = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "week", args: [ts] });
  /** ARRAY_COSINE_DISTANCE(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_cosine_distance([1, 2, 3], [1, 2, 3]) */
  array_cosine_distance = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_cosine_distance", args: [array1, array2] });
  /** ARRAY_REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  array_reduce = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_reduce", args: [list, lambda] });
  /** ARRAY_ZIP(): WHATEVER - Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length., eg: list_zip([1, 2], [3, 4], [5, 6]) */
  array_zip = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_zip", args: [] });
  /** ATAN2(Y: DOUBLE, X: DOUBLE): NUMERIC - Computes the arctangent (y, x), eg: atan2(1.0, 0.0) */
  atan2 = (y: Numericable, x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "atan2", args: [y, x] });
  /** BASE64(BLOB: BLOB): VARCHAR - Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  base64 = (blob: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "base64", args: [blob] });
  /** UNION_VALUE(): WHATEVER - Create a single member UNION containing the argument value. The tag of the value will be the bound variable name, eg: union_value(k := 'hello') */
  union_value = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "union_value", args: [] });
  /** BIT_COUNT(X: BIT): NUMERIC - Returns the number of bits that are set, eg: bit_count(31) */
  bit_count = (x: Whateverable | Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "bit_count", args: [x] });
  /** CEILING(X: FLOAT): NUMERIC - Rounds the number up, eg: ceil(17.4) */
  ceiling = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "ceiling", args: [x] });
  /** CONCAT(STR: ANY): WHATEVER - Concatenate many strings together., eg: concat('Hello', ' ', 'World') */
  concat = (str: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "concat", args: [str] });
  /** CREATE_SORT_KEY(PARAMETERS: ANY): WHATEVER - Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers, eg: create_sort_key('A', 'DESC') */
  create_sort_key = (parameters: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "create_sort_key", args: [parameters] });
  /** TRANSLATE(STR: VARCHAR, FROM: VARCHAR, TO: VARCHAR): VARCHAR - Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted, eg: translate('12345', '143', 'ax') */
  translate = (str: Stringable, from: Stringable, to: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "translate", args: [str, from, to] });
  /** EDITDIST3(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: levenshtein('duck','db') */
  editdist3 = (str1: Stringable, str2: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "editdist3", args: [str1, str2] });
  /** TO_TIMESTAMP(SEC: DOUBLE): WHATEVER - Converts secs since epoch to a timestamp with time zone, eg: to_timestamp(1284352323.5) */
  to_timestamp = (sec: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_timestamp", args: [sec] });
  /** ENUM_RANGE(ENUMERATION: ANY): WHATEVER - Returns all values of the input enum type as an array, eg: enum_range(NULL::mood) */
  enum_range = (enumeration: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "enum_range", args: [enumeration] });
  /** EVEN(X: DOUBLE): NUMERIC - Rounds x to next even number by rounding away from zero, eg: even(2.9) */
  even = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "even", args: [x] });
  /** TO_MONTHS(INTEGER: INTEGER): WHATEVER - Construct a month interval, eg: to_months(5) */
  to_months = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_months", args: [integer] });
  /** FORMATREADABLESIZE(BYTES: BIGINT): VARCHAR - Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  formatReadableSize = (bytes: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "formatReadableSize", args: [bytes] });
  /** FROM_BINARY(VALUE: VARCHAR): WHATEVER - Converts a value from binary representation to a blob, eg: unbin('0110') */
  from_binary = (value: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "from_binary", args: [value] });
  /** GAMMA(X: DOUBLE): NUMERIC - Interpolation of (x-1) factorial (so decimal inputs are allowed), eg: gamma(5.5) */
  gamma = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "gamma", args: [x] });
  /** GCD(X: BIGINT, Y: BIGINT): NUMERIC - Computes the greatest common divisor of x and y, eg: greatest_common_divisor(42, 57) */
  gcd = (x: Numericable, y: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "gcd", args: [x, y] });
  /** TO_DAYS(INTEGER: INTEGER): WHATEVER - Construct a day interval, eg: to_days(5) */
  to_days = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_days", args: [integer] });
  /** ISFINITE(X: DATE): WHATEVER - Returns true if the floating point value is finite, false otherwise, eg: isfinite(5.5) */
  isfinite = (x: Whateverable | Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "isfinite", args: [x] });
  /** TO_BASE(NUMBER: BIGINT, RADIX: INTEGER, MINLENGTH: INTEGER): VARCHAR - Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length, eg: to_base(42, 16) */
  to_base = (number: Numericable, radix: Numericable, minLength?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "to_base", args: [number, radix, minLength] });
  /** LENGTH(STR: VARCHAR): NUMERIC - Number of characters in string., eg: length('Hello🦆') */
  length = (str: Stringable | Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "length", args: [str] });
  /** TIMEZONE(TS: INTERVAL, COL1: TIME WITH TIME ZONE): NUMERIC - Extract the timezone component from a date or timestamp, eg: timezone(timestamp '2021-08-03 11:59:44.123456') */
  timezone = (ts: Whateverable | Stringable, col1?: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "timezone", args: [ts, col1] });
  /** TANH(X: DOUBLE): NUMERIC - Computes the hyperbolic tan of x, eg: tanh(1) */
  tanh = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "tanh", args: [x] });
  /** LIST_APPLY(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  list_apply = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_apply", args: [list, lambda] });
  /** STRING_TO_ARRAY(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  string_to_array = (str: Stringable, separator: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "string_to_array", args: [str, separator] });
  /** LIST_PACK(): WHATEVER - Create a LIST containing the argument values, eg: list_value(4, 5, 6) */
  list_pack = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_pack", args: [] });
  /** LIST_SLICE(LIST: ANY, BEGIN: ANY, END: ANY, STEP: BIGINT): WHATEVER - Extract a sublist using slice conventions. Negative values are accepted., eg: list_slice([4, 5, 6], 2, 3) */
  list_slice = (list: Whateverable, begin: Whateverable, end: Whateverable, step?: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_slice", args: [list, begin, end, step] });
  /** SQRT(X: DOUBLE): NUMERIC - Returns the square root of x, eg: sqrt(4) */
  sqrt = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "sqrt", args: [x] });
  /** MAKE_DATE(YEAR: BIGINT, MONTH: BIGINT, DAY: BIGINT): WHATEVER - The date for the given struct., eg: make_date({'year': 2024, 'month': 11, 'day': 14}) */
  make_date = (year: Numericable | Whateverable, month?: Numericable, day?: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "make_date", args: [year, month, day] });
  /** MAP_EXTRACT_VALUE(MAP: ANY, KEY: ANY): WHATEVER - Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: map_extract_value(map(['key'], ['val']), 'key') */
  map_extract_value = (map: Whateverable, key: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map_extract_value", args: [map, key] });
  /** MD5_NUMBER(VALUE: VARCHAR): NUMERIC - Returns the MD5 hash of the value as an INT128, eg: md5_number('123') */
  md5_number = (value: Stringable | Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "md5_number", args: [value] });
  /** MILLISECOND(TS: DATE): NUMERIC - Extract the millisecond component from a date or timestamp, eg: millisecond(timestamp '2021-08-03 11:59:44.123456') */
  millisecond = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "millisecond", args: [ts] });
  /** MONTH(TS: DATE): NUMERIC - Extract the month component from a date or timestamp, eg: month(timestamp '2021-08-03 11:59:44.123456') */
  month = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "month", args: [ts] });
  /** NANOSECOND(TSNS: DATE): NUMERIC - Extract the nanosecond component from a date or timestamp, eg: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789 */
  nanosecond = (tsns: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "nanosecond", args: [tsns] });
  /** OCTET_LENGTH(BLOB: BLOB): NUMERIC - Number of bytes in blob., eg: octet_length('\xAA\xBB'::BLOB) */
  octet_length = (blob: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "octet_length", args: [blob] });
  /** QUARTER(TS: DATE): NUMERIC - Extract the quarter component from a date or timestamp, eg: quarter(timestamp '2021-08-03 11:59:44.123456') */
  quarter = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "quarter", args: [ts] });
  /** REGEXP_EXTRACT(STR: VARCHAR, PATTERN: VARCHAR, GROUP: INTEGER, OPTIONS: VARCHAR): VARCHAR - If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set., eg: regexp_extract('abc', '([a-z])(b)', 1) */
  regexp_extract = (str: Stringable, pattern: Stringable, group?: Numericable | Whateverable, options?: Stringable): StringField =>
    new StringFieldImpl("").withOperation({ field: "", method: "regexp_extract", args: [str, pattern, group, options] });
  /** REGEXP_MATCHES(STR: VARCHAR, PATTERN: VARCHAR, OPTIONS: VARCHAR): WHATEVER - Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set., eg: regexp_matches('anabanana', '(an)*') */
  regexp_matches = (str: Stringable, pattern: Stringable, options?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "regexp_matches", args: [str, pattern, options] });
  /** YEARWEEK(TS: DATE): NUMERIC - Extract the yearweek component from a date or timestamp, eg: yearweek(timestamp '2021-08-03 11:59:44.123456') */
  yearweek = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "yearweek", args: [ts] });
  /** ARRAY_AGGR(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  array_aggr = (list: Whateverable, name: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_aggr", args: [list, name] });
  /** ARRAY_FILTER(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Constructs a list from those elements of the input list for which the lambda function returns true, eg: list_filter([3, 4, 5], x -> x > 4) */
  array_filter = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_filter", args: [list, lambda] });
  /** ARRAY_INNER_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_inner_product([1, 2, 3], [1, 2, 3]) */
  array_inner_product = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_inner_product", args: [array1, array2] });
  /** ARRAY_RESIZE(LIST: ANY[], SIZE: ANY, VALUE: ANY): WHATEVER - Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: list_resize([1, 2, 3], 5, 0) */
  array_resize = (list: Whateverable, size: Whateverable, value?: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_resize", args: [list, size, value] });
  /** ARRAY_TO_JSON(): WHATEVER - , eg: null */
  array_to_json = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_to_json", args: [] });
  /** BAR(X: DOUBLE, MIN: DOUBLE, MAX: DOUBLE, WIDTH: DOUBLE): VARCHAR - Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80, eg: bar(5, 0, 20, 10) */
  bar = (x: Numericable, min: Numericable, max: Numericable, width?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "bar", args: [x, min, max, width] });
  /** BIN(VALUE: VARINT): VARCHAR - Converts the value to binary representation, eg: bin(42) */
  bin = (value: Whateverable | Stringable | Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "bin", args: [value] });
  /** UNION_TAG(UNION: UNION): WHATEVER - Retrieve the currently selected tag of the union as an ENUM, eg: union_tag(union_value(k := 'foo')) */
  union_tag = (union: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "union_tag", args: [union] });
  /** DATE_SUB(PART: VARCHAR, STARTDATE: DATE, ENDDATE: DATE): NUMERIC - The number of complete partitions between the timestamps, eg: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00') */
  date_sub = (part: Stringable, startdate: Whateverable, enddate: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "date_sub", args: [part, startdate, enddate] });
  /** DAYOFWEEK(TS: DATE): NUMERIC - Extract the dayofweek component from a date or timestamp, eg: dayofweek(timestamp '2021-08-03 11:59:44.123456') */
  dayofweek = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "dayofweek", args: [ts] });
  /** DEGREES(X: DOUBLE): NUMERIC - Converts radians to degrees, eg: degrees(pi()) */
  degrees = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "degrees", args: [x] });
  /** ELEMENT_AT(MAP: ANY, KEY: ANY): WHATEVER - Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: map_extract(map(['key'], ['val']), 'key') */
  element_at = (map: Whateverable, key: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "element_at", args: [map, key] });
  /** ENDS_WITH(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  ends_with = (col0: Stringable, col1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "ends_with", args: [col0, col1] });
  /** ENUM_FIRST(ENUMERATION: ANY): VARCHAR - Returns the first value of the input enum type, eg: enum_first(NULL::mood) */
  enum_first = (enumeration: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "enum_first", args: [enumeration] });
  /** TO_SECONDS(DOUBLE: DOUBLE): WHATEVER - Construct a second interval, eg: to_seconds(5.5) */
  to_seconds = (double: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_seconds", args: [double] });
  /** FORMAT(FORMAT: VARCHAR): VARCHAR - Formats a string using fmt syntax, eg: format('Benchmark "{}" took {} seconds', 'CSV', 42) */
  format = (format: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "format", args: [format] });
  /** TO_MILLISECONDS(DOUBLE: DOUBLE): WHATEVER - Construct a millisecond interval, eg: to_milliseconds(5.5) */
  to_milliseconds = (double: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_milliseconds", args: [double] });
  /** TO_DECADES(INTEGER: INTEGER): WHATEVER - Construct a decade interval, eg: to_decades(5) */
  to_decades = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_decades", args: [integer] });
  /** JARO_SIMILARITY(STR1: VARCHAR, STR2: VARCHAR, SCORECUTOFF: DOUBLE): NUMERIC - The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaro_similarity('duck', 'duckdb', 0.5) */
  jaro_similarity = (str1: Stringable, str2: Stringable, scoreCutoff?: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "jaro_similarity", args: [str1, str2, scoreCutoff] });
  /** TO_CENTURIES(INTEGER: INTEGER): WHATEVER - Construct a century interval, eg: to_centuries(5) */
  to_centuries = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_centuries", args: [integer] });
  /** JSON_TRANSFORM_STRICT(COL0: JSON, COL1: VARCHAR): WHATEVER - , eg: null */
  json_transform_strict = (col0: Whateverable | Stringable, col1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_transform_strict", args: [col0, col1] });
  /** LCM(X: BIGINT, Y: BIGINT): NUMERIC - Computes the least common multiple of x and y, eg: least_common_multiple(42, 57) */
  lcm = (x: Numericable, y: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "lcm", args: [x, y] });
  /** LEAST_COMMON_MULTIPLE(X: BIGINT, Y: BIGINT): NUMERIC - Computes the least common multiple of x and y, eg: least_common_multiple(42, 57) */
  least_common_multiple = (x: Numericable, y: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "least_common_multiple", args: [x, y] });
  /** LENGTH_GRAPHEME(STR: VARCHAR): NUMERIC - Number of grapheme clusters in string., eg: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️') */
  length_grapheme = (str: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "length_grapheme", args: [str] });
  /** TIMETZ_BYTE_COMPARABLE(TIMETZ: TIME WITH TIME ZONE): NUMERIC - Converts a TIME WITH TIME ZONE to an integer sort key, eg: timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ) */
  timetz_byte_comparable = (timeTz: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "timetz_byte_comparable", args: [timeTz] });
  /** LIST_AGGR(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  list_aggr = (list: Whateverable, name: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_aggr", args: [list, name] });
  /** LIST_CAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  list_cat = (list1: Whateverable, list2: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_cat", args: [list1, list2] });
  /** LIST_GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  list_grade_up = (list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_grade_up", args: [list, col1, col2] });
  /** LIST_REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  list_reduce = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_reduce", args: [list, lambda] });
  /** LIST_HAS_ALL(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if all elements of l2 are in l1. NULLs are ignored., eg: list_has_all([1, 2, 3], [2, 3]) */
  list_has_all = (l1: Whateverable, p1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_has_all", args: [l1, p1] });
  /** LIST_SELECT(VALUELIST: ANY[], INDEXLIST: BIGINT[]): WHATEVER - Returns a list based on the elements selected by the index_list., eg: list_select([10, 20, 30, 40], [1, 4]) */
  list_select = (valueList: Whateverable, indexList: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_select", args: [valueList, indexList] });
  /** LOG2(X: DOUBLE): NUMERIC - Computes the 2-log of x, eg: log2(8) */
  log2 = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "log2", args: [x] });
  /** MAKE_TIME(HOUR: BIGINT, MINUTE: BIGINT, SECONDS: DOUBLE): WHATEVER - The time for the given parts, eg: make_time(13, 34, 27.123456) */
  make_time = (hour: Numericable, minute: Numericable, seconds: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "make_time", args: [hour, minute, seconds] });
  /** NORMALIZED_INTERVAL(INTERVAL: INTERVAL): WHATEVER - Normalizes an INTERVAL to an equivalent interval, eg: normalized_interval(INTERVAL '30 days') */
  normalized_interval = (interval: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "normalized_interval", args: [interval] });
  /** PARSE_DIRNAME(STR: VARCHAR, SEPARATOR: VARCHAR): VARCHAR - Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash, eg: parse_dirname('path/to/file.csv', 'system') */
  parse_dirname = (str: Stringable, separator?: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "parse_dirname", args: [str, separator] });
  /** PREFIX(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  prefix = (col0: Stringable, col1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "prefix", args: [col0, col1] });
  /** SECOND(TS: DATE): NUMERIC - Extract the second component from a date or timestamp, eg: second(timestamp '2021-08-03 11:59:44.123456') */
  second = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "second", args: [ts] });
  /** RPAD(STR: VARCHAR, COUNT: INTEGER, CHARACTER: VARCHAR): VARCHAR - Pads the string with the character from the right until it has count characters, eg: rpad('hello', 10, '<') */
  rpad = (str: Stringable, count: Numericable, character: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "rpad", args: [str, count, character] });
  /** REPLACE(STR: VARCHAR, SOURCE: VARCHAR, TARGET: VARCHAR): VARCHAR - Replaces any occurrences of the source with target in string, eg: replace('hello', 'l', '-') */
  replace = (str: Stringable, source: Stringable, target: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "replace", args: [str, source, target] });
  /** YEAR(TS: DATE): NUMERIC - Extract the year component from a date or timestamp, eg: year(timestamp '2021-08-03 11:59:44.123456') */
  year = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "year", args: [ts] });
  /** ARRAY_DISTANCE(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_distance([1, 2, 3], [1, 2, 3]) */
  array_distance = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_distance", args: [array1, array2] });
  /** ARRAY_INDEXOF(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  array_indexof = (list: Whateverable, element: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_indexof", args: [list, element] });
  /** ARRAY_NEGATIVE_INNER_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  array_negative_inner_product = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_negative_inner_product", args: [array1, array2] });
  /** ARRAY_WHERE(VALUELIST: ANY[], MASKLIST: BOOLEAN[]): WHATEVER - Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list., eg: list_where([10, 20, 30, 40], [true, false, false, true]) */
  array_where = (valueList: Whateverable, maskList: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_where", args: [valueList, maskList] });
  /** BIT_POSITION(SUBSTR: BIT, BITSTR: BIT): NUMERIC - Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1, eg: bit_position('010'::BIT, '1110101'::BIT) */
  bit_position = (substr: Whateverable, bitstr: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "bit_position", args: [substr, bitstr] });
  /** CARDINALITY(MAP: ANY): NUMERIC - Returns the size of the map (or the number of entries in the map), eg: cardinality( map([4, 2], ['a', 'b']) ); */
  cardinality = (map: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "cardinality", args: [map] });
  /** CONCAT_WS(SEPARATOR: VARCHAR, STR: ANY): VARCHAR - Concatenate strings together separated by the specified separator., eg: concat_ws(', ', 'Banana', 'Apple', 'Melon') */
  concat_ws = (separator: Stringable, str: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "concat_ws", args: [separator, str] });
  /** DATEPART(TS: VARCHAR[], COL1: DATE): WHATEVER - Get subfield (equivalent to extract), eg: date_part('minute', TIMESTAMP '1992-09-20 20:38:40') */
  datepart = (ts: Whateverable | Stringable, col1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "datepart", args: [ts, col1] });
  /** DATE_TRUNC(PART: VARCHAR, TIMESTAMP: DATE): WHATEVER - Truncate to specified precision, eg: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40') */
  date_trunc = (part: Stringable, timestamp: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "date_trunc", args: [part, timestamp] });
  /** FORMAT_BYTES(BYTES: BIGINT): VARCHAR - Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  format_bytes = (bytes: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "format_bytes", args: [bytes] });
  /** FROM_JSON_STRICT(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  from_json_strict = (col0: Stringable | Whateverable, col1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "from_json_strict", args: [col0, col1] });
  /** GREATEST(ARG1: ANY): WHATEVER - Returns the highest value of the set of input parameters, eg: greatest(42, 84) */
  greatest = (arg1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "greatest", args: [arg1] });
  /** ISNAN(X: FLOAT): WHATEVER - Returns true if the floating point value is not a number, false otherwise, eg: isnan('NaN'::FLOAT) */
  isnan = (x: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "isnan", args: [x] });
  /** IS_HISTOGRAM_OTHER_BIN(VAL: ANY): WHATEVER - Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin), eg: is_histogram_other_bin(v) */
  is_histogram_other_bin = (val: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "is_histogram_other_bin", args: [val] });
  /** JACCARD(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaccard('duck','luck') */
  jaccard = (str1: Stringable, str2: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "jaccard", args: [str1, str2] });
  /** JSON_ARRAY(): WHATEVER - , eg: null */
  json_array = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_array", args: [] });
  /** TIMEZONE_MINUTE(TS: DATE): NUMERIC - Extract the timezone_minute component from a date or timestamp, eg: timezone_minute(timestamp '2021-08-03 11:59:44.123456') */
  timezone_minute = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "timezone_minute", args: [ts] });
  /** LEFT(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the left-most count characters, eg: left('Hello🦆', 2) */
  left = (str: Stringable, count: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "left", args: [str, count] });
  /** LGAMMA(X: DOUBLE): NUMERIC - Computes the log of the gamma function, eg: lgamma(2) */
  lgamma = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "lgamma", args: [x] });
  /** LIKE_ESCAPE(STR: VARCHAR, LIKESPECIFIER: VARCHAR, ESCAPECHARACTER: VARCHAR): WHATEVER - Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string., eg: like_escape('a%c', 'a$%c', '$') */
  like_escape = (str: Stringable, likeSpecifier: Stringable, escapeCharacter: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "like_escape", args: [str, likeSpecifier, escapeCharacter] });
  /** SUFFIX(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  suffix = (col0: Stringable, col1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "suffix", args: [col0, col1] });
  /** LIST_CONTAINS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  list_contains = (list: Whateverable, element: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_contains", args: [list, element] });
  /** LIST_UNIQUE(LIST: ANY[]): NUMERIC - Counts the unique elements of a list, eg: list_unique([1, 1, NULL, -3, 1, 5]) */
  list_unique = (list: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_unique", args: [list] });
  /** LIST_WHERE(VALUELIST: ANY[], MASKLIST: BOOLEAN[]): WHATEVER - Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list., eg: list_where([10, 20, 30, 40], [true, false, false, true]) */
  list_where = (valueList: Whateverable, maskList: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_where", args: [valueList, maskList] });
  /** LIST_ZIP(): WHATEVER - Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length., eg: list_zip([1, 2], [3, 4], [5, 6]) */
  list_zip = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_zip", args: [] });
  /** MAP_FROM_ENTRIES(): WHATEVER - Returns a map created from the entries of the array, eg: map_from_entries([{k: 5, v: 'val1'}, {k: 3, v: 'val2'}]); */
  map_from_entries = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map_from_entries", args: [] });
  /** SIN(X: DOUBLE): NUMERIC - Computes the sin of x, eg: sin(90) */
  sin = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "sin", args: [x] });
  /** SIGNBIT(X: FLOAT): WHATEVER - Returns whether the signbit is set or not, eg: signbit(-0.0) */
  signbit = (x: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "signbit", args: [x] });
  /** REGEXP_ESCAPE(STR: VARCHAR): VARCHAR - Escapes all potentially meaningful regexp characters in the input string, eg: regexp_escape('https://duckdb.org') */
  regexp_escape = (str: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "regexp_escape", args: [str] });
  /** RIGHT(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the right-most count characters, eg: right('Hello🦆', 3) */
  right = (str: Stringable, count: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "right", args: [str, count] });
  /** ALIAS(EXPR: ANY): VARCHAR - Returns the name of a given expression, eg: alias(42 + 1) */
  alias = (expr: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "alias", args: [expr] });
  /** ARRAY_APPLY(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  array_apply = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_apply", args: [list, lambda] });
  /** ARRAY_COSINE_SIMILARITY(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_cosine_similarity([1, 2, 3], [1, 2, 3]) */
  array_cosine_similarity = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_cosine_similarity", args: [array1, array2] });
  /** ARRAY_NEGATIVE_DOT_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  array_negative_dot_product = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_negative_dot_product", args: [array1, array2] });
  /** ASIN(X: DOUBLE): NUMERIC - Computes the arcsine of x, eg: asin(0.5) */
  asin = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "asin", args: [x] });
  /** UNBIN(VALUE: VARCHAR): WHATEVER - Converts a value from binary representation to a blob, eg: unbin('0110') */
  unbin = (value: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "unbin", args: [value] });
  /** TRUNC(X: TINYINT): NUMERIC - Truncates the number, eg: trunc(17.4) */
  trunc = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "trunc", args: [x] });
  /** CURRENT_LOCALTIME(): WHATEVER - , eg: null */
  current_localtime = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "current_localtime", args: [] });
  /** CURRENT_LOCALTIMESTAMP(): WHATEVER - , eg: null */
  current_localtimestamp = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "current_localtimestamp", args: [] });
  /** DAYNAME(TS: DATE): VARCHAR - The (English) name of the weekday, eg: dayname(TIMESTAMP '1992-03-22') */
  dayname = (ts: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "dayname", args: [ts] });
  /** ENUM_CODE(ENUMERATION: ANY): WHATEVER - Returns the numeric value backing the given enum value, eg: enum_code('happy'::mood) */
  enum_code = (enumeration: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "enum_code", args: [enumeration] });
  /** ENUM_LAST(ENUMERATION: ANY): VARCHAR - Returns the last value of the input enum type, eg: enum_last(NULL::mood) */
  enum_last = (enumeration: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "enum_last", args: [enumeration] });
  /** EPOCH(TEMPORAL: DATE): NUMERIC - Extract the epoch component from a temporal type, eg: epoch(timestamp '2021-08-03 11:59:44.123456') */
  epoch = (temporal: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "epoch", args: [temporal] });
  /** FACTORIAL(X: INTEGER): NUMERIC - Factorial of x. Computes the product of the current integer and all integers below it, eg: 4! */
  factorial = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "factorial", args: [x] });
  /** FORMATREADABLEDECIMALSIZE(BYTES: BIGINT): VARCHAR - Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB), eg: format_bytes(1000 * 16) */
  formatReadableDecimalSize = (bytes: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "formatReadableDecimalSize", args: [bytes] });
  /** FROM_BASE64(STR: VARCHAR): WHATEVER - Convert a base64 encoded string to a character string, eg: from_base64('QQ==') */
  from_base64 = (str: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "from_base64", args: [str] });
  /** HAMMING(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: hamming('duck','luck') */
  hamming = (str1: Stringable, str2: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "hamming", args: [str1, str2] });
  /** JSON_DESERIALIZE_SQL(COL0: JSON): VARCHAR - , eg: null */
  json_deserialize_sql = (col0: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_deserialize_sql", args: [col0] });
  /** TAN(X: DOUBLE): NUMERIC - Computes the tan of x, eg: tan(90) */
  tan = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "tan", args: [x] });
  /** STR_SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  str_split = (str: Stringable, separator: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "str_split", args: [str, separator] });
  /** LIST_COSINE_DISTANCE(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the cosine distance between two lists, eg: list_cosine_distance([1, 2, 3], [1, 2, 3]) */
  list_cosine_distance = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_cosine_distance", args: [list1, list2] });
  /** STRUCT_EXTRACT_AT(STRUCT: STRUCT, ENTRY: BIGINT): WHATEVER - Extract the entry from the STRUCT by position (starts at 1!)., eg: struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2) */
  struct_extract_at = (struct: Whateverable, entry: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "struct_extract_at", args: [struct, entry] });
  /** LIST_INDEXOF(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  list_indexof = (list: Whateverable, element: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_indexof", args: [list, element] });
  /** STRING_SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  string_split = (str: Stringable, separator: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "string_split", args: [str, separator] });
  /** LIST_NEGATIVE_INNER_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the negative inner product between two lists, eg: list_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  list_negative_inner_product = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_negative_inner_product", args: [list1, list2] });
  /** MAKE_TIMESTAMP_NS(NANOS: BIGINT): WHATEVER - The timestamp for the given nanoseconds since epoch, eg: make_timestamp(1732117793000000000) */
  make_timestamp_ns = (nanos: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "make_timestamp_ns", args: [nanos] });
  /** SINH(X: DOUBLE): NUMERIC - Computes the hyperbolic sin of x, eg: sinh(1) */
  sinh = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "sinh", args: [x] });
  /** MINUTE(TS: DATE): NUMERIC - Extract the minute component from a date or timestamp, eg: minute(timestamp '2021-08-03 11:59:44.123456') */
  minute = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "minute", args: [ts] });
  /** MISMATCHES(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: hamming('duck','luck') */
  mismatches = (str1: Stringable, str2: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "mismatches", args: [str1, str2] });
  /** PI(): NUMERIC - Returns the value of pi, eg: pi() */
  pi = (): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "pi", args: [] });
  /** POWER(X: DOUBLE, Y: DOUBLE): NUMERIC - Computes x to the power of y, eg: pow(2, 3) */
  power = (x: Numericable, y: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "power", args: [x, y] });
  /** SET_BIT(BITSTR: BIT, INDEX: INTEGER, NEWVALUE: INTEGER): WHATEVER - Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring, eg: set_bit('0110010'::BIT, 2, 0) */
  set_bit = (bitstr: Whateverable, index: Numericable, newValue: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "set_bit", args: [bitstr, index, newValue] });
}

/**
 * Operation tracking for SQL generation
 * Represents a single operation in the chain
 */
type Operation = {
  /** The field name this operation is applied to */
  field: string;
  /** The method name (SQL function) */
  method: string;
  /** Arguments for the method */
  args: any[];
  /** Reference to the previous operation in the chain */
  chain?: Operation;
};

/**
 * Convert an operation chain to SQL
 * Recursively builds a SQL expression from the operation chain
 *
 * @param operation The operation to convert
 * @returns SQL string representation of the operation
 */
export function operationToSql(operation: Operation): string {
  if (!operation.method) {
    return operation.field;
  }
  // Format arguments properly (strings in quotes, objects to SQL, etc.)
  const args = operation.args.map((arg) => (isString(arg) ? wrap(arg, "'") : arg.toString())).join(", ");

  // Recursively build the chain
  if (operation.chain) {
    return `${operationToSql(operation.chain)}.${operation.method}(${args})`;
  }

  // For global functions (no field name)
  if (operation.field === "") {
    return `${operation.method}(${args})`;
  }

  return `${operation.field}.${operation.method}(${args})`;
}
