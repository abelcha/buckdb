import { isString } from "es-toolkit";
import { wrap } from "./utils";

type Numericable = number | NumericField;
type Stringable = string | StringField;
type Whateverable = any | WhateverField;

export interface WhateverField {
  /*WhateverInterface*/

  /*WhateverInterface*/
  /** Convert the operation chain to a SQL string */
  toString(): string;
}

/**
 * Interface for string field operations
 * Defines methods that can be called on string fields in DuckDB
 */
export interface StringField {
  /** Removes any occurrences of any of the characters from either side of the string, eg: ('>>>>test<<').trim('><') */
  trim(characters?: Stringable): StringField;
  /** Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted, eg: ('12345').translate('143', 'ax') */
  translate(from: Stringable, to: Stringable): StringField;
  /** The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  editdist3(str2: Stringable): NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  hex(): StringField;
  /** The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_winkler_similarity('duckdb', 0.5) */
  jaro_winkler_similarity(str2: Stringable, scoreCutoff?: Numericable): NumericField;
  /** , eg: undefined */
  json_extract_path_text(col1: Stringable | Numericable): StringField;
  /** , eg: undefined */
  json_extract_string(col1: Stringable | Numericable): StringField;
  /** , eg: undefined */
  json_value(col1: Numericable | Stringable): StringField;
  /** Number of characters in string., eg: length('Hello🦆') */
  length(): NumericField;
  /** Returns the MD5 hash of the value as an INT128, eg: md5_number('123') */
  md5_number(): NumericField;
  /** If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set., eg: (b)').regexp_extract('abc', '([a-z])(1) */
  regexp_extract(pattern: Stringable, group?: Numericable, options?: Stringable): StringField;
  /** Removes any occurrences of any of the characters from the right side of the string, eg: ('>>>>test<<').rtrim('><') */
  rtrim(characters?: Stringable): StringField;
  /** Escapes the input string by encoding it so that it can be included in a URL query parameter., eg: url_encode('this string has/ special+ characters>') */
  url_encode(): StringField;
  /** Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different, eg: ('hello').damerau_levenshtein('world') */
  damerau_levenshtein(str2: Stringable): NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex(): StringField;
  /** , eg: undefined */
  icu_sort_key(col1: Stringable): StringField;
  /** , eg: undefined */
  json_array_length(col1?: Stringable): NumericField;
  /** Converts the value to binary representation, eg: bin(42) */
  to_binary(): StringField;
  /** Convert string to lower case, eg: lower('Hello') */
  lcase(): StringField;
  /** Strips accents from string., eg: strip_accents('mühleisen') */
  strip_accents(): StringField;
  /** Returns the SHA256 hash of the value, eg: sha256('hello') */
  sha256(): StringField;
  /** Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirpath('system') */
  parse_dirpath(separator?: Stringable): StringField;
  /** Repeats the string count number of times, eg: ('A').repeat(5) */
  repeat(count: Numericable): StringField;
  /** Reverses the string, eg: reverse('hello') */
  reverse(): StringField;
  /** , eg: undefined */
  bit_length(): NumericField;
  /** Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  unicode(): NumericField;
  /** Convert string to upper case., eg: upper('Hello') */
  ucase(): StringField;
  /** Extract the left-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').left_grapheme(1) */
  left_grapheme(count: Numericable): StringField;
  /** Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substring(start: Numericable, length?: Numericable): StringField;
  /** Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5(): StringField;
  /** Formats a string using printf syntax, eg: ('Benchmark "%s" took %d seconds').printf('CSV', 42) */
  printf(): StringField;
  /** Extract the right-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').right_grapheme(1) */
  right_grapheme(count: Numericable): StringField;
  /** Unescapes the URL encoded input., eg: url_decode('this%20string%20is%2BFencoded') */
  url_decode(): StringField;
  /** Returns an integer that represents the Unicode code point of the first character of the string, eg: ascii('Ω') */
  ascii(): NumericField;
  /** Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  instr(needle: Stringable): NumericField;
  /** , eg: undefined */
  json_type(col1?: Stringable): StringField;
  /** Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  strpos(needle: Stringable): NumericField;
  /** Convert string to lower case, eg: lower('Hello') */
  lower(): StringField;
  /** Pads the string with the character from the left until it has count characters, eg: ('hello').lpad(10, '>') */
  lpad(count: Numericable, character: Stringable): StringField;
  /** Removes any occurrences of any of the characters from the left side of the string, eg: ('>>>>test<<').ltrim('><') */
  ltrim(characters?: Stringable): StringField;
  /** Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  position(needle: Stringable): NumericField;
  /** Converts the value to binary representation, eg: bin(42) */
  bin(): StringField;
  /** The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  hamming(str2: Stringable): NumericField;
  /** Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('🦆🤦🏼‍♂️🤦🏽‍♀️🦆').substring_grapheme(3, 2) */
  substring_grapheme(start: Numericable, length?: Numericable): StringField;
  /** Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_extract(index: Numericable): StringField;
  /** The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  mismatches(str2: Stringable): NumericField;
  /** Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_filename(true, 'forward_slash') */
  parse_filename(trimExtension?: Stringable): StringField;
  /** If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set., eg: ('hello').regexp_replace('[lo]', '-') */
  regexp_replace(pattern: Stringable, replacement: Stringable, options?: Stringable): StringField;
  /** Formats a string using fmt syntax, eg: ('Benchmark "{}" took {} seconds').format('CSV', 42) */
  format(): StringField;
  /** The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_similarity('duckdb', 0.5) */
  jaro_similarity(str2: Stringable, scoreCutoff?: Numericable): NumericField;
  /** Number of grapheme clusters in string., eg: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️') */
  length_grapheme(): NumericField;
  /** Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substr(start: Numericable, length?: Numericable): StringField;
  /** Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirname('system') */
  parse_dirname(separator?: Stringable): StringField;
  /** Pads the string with the character from the right until it has count characters, eg: ('hello').rpad(10, '<') */
  rpad(count: Numericable, character: Stringable): StringField;
  /** Replaces any occurrences of the source with target in string, eg: ('hello').replace('l', '-') */
  replace(source: Stringable, target: Stringable): StringField;
  /** Extract the indexth (1-based) value from the array., eg: ('DuckDB').array_extract(2) */
  array_extract(index: Numericable): StringField;
  /** The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaccard('luck') */
  jaccard(str2: Stringable): NumericField;
  /** Extract the left-most count characters, eg: ('Hello🦆').left(2) */
  left(count: Numericable): StringField;
  /** Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_element(index: Numericable): StringField;
  /** Escapes all potentially meaningful regexp characters in the input string, eg: regexp_escape('https://duckdb.org') */
  regexp_escape(): StringField;
  /** Extract the right-most count characters, eg: ('Hello🦆').right(3) */
  right(count: Numericable): StringField;
  /** Convert string to upper case., eg: upper('Hello') */
  upper(): StringField;
  /** Number of characters in string., eg: length('Hello🦆') */
  len(): NumericField;
  /** The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  levenshtein(str2: Stringable): NumericField;
  /** Number of bytes in string., eg: strlen('🦆') */
  strlen(): NumericField;
  /** Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not., eg: nfc_normalize('ardèch') */
  nfc_normalize(): StringField;
  /** Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  ord(): NumericField;
  /** Returns the SHA1 hash of the value, eg: sha1('hello') */
  sha1(): StringField;

  // Add more string operations as needed
  /** Convert the operation chain to a SQL string */
  toString(): string;
}

/**
 * Interface for numeric field operations
 * Defines methods that can be called on numeric fields in DuckDB
 */
export interface NumericField {
  /** Computes the inverse hyperbolic cos of x, eg: acosh(2.3) */
  acosh(): NumericField;
  /** Computes the arctangent (y, x), eg: (1.0).atan2(0.0) */
  atan2(x: Numericable): NumericField;
  /** Rounds the number up, eg: ceil(17.4) */
  ceiling(): NumericField;
  /** Rounds x to next even number by rounding away from zero, eg: even(2.9) */
  even(): NumericField;
  /** Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  formatReadableSize(): StringField;
  /** Interpolation of (x-1) factorial (so decimal inputs are allowed), eg: gamma(5.5) */
  gamma(): NumericField;
  /** Computes the greatest common divisor of x and y, eg: (42).greatest_common_divisor(57) */
  gcd(y: Numericable): NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  hex(): StringField;
  /** Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length, eg: (42).to_base(16) */
  to_base(radix: Numericable, minLength?: Numericable): StringField;
  /** Computes the hyperbolic tan of x, eg: tanh(1) */
  tanh(): NumericField;
  /** Returns the square root of x, eg: sqrt(4) */
  sqrt(): NumericField;
  /** Bitwise XOR, eg: (17).xor(5) */
  xor(right: Numericable): NumericField;
  /** Computes the inverse hyperbolic sin of x, eg: asinh(0.5) */
  asinh(): NumericField;
  /** Computes the cotangent of x, eg: cot(0.5) */
  cot(): NumericField;
  /** , eg: undefined */
  divide(col1: Numericable): NumericField;
  /** Rounds the number down, eg: floor(17.4) */
  floor(): NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex(): StringField;
  /** Converts the value to binary representation, eg: bin(42) */
  to_binary(): StringField;
  /** Computes the natural logarithm of x, eg: ln(2) */
  ln(): NumericField;
  /** Computes the 10-log of x, eg: log10(1000) */
  log10(): NumericField;
  /** Returns the sign of x as -1, 0 or 1, eg: sign(-349) */
  sign(): NumericField;
  /** , eg: undefined */
  multiply(col1: Numericable): NumericField;
  /** Returns the next floating point value after x in the direction of y, eg: (1::float).nextafter(2::float) */
  nextafter(p1: Numericable): NumericField;
  /** Computes x to the power of y, eg: (2).pow(3) */
  pow(y: Numericable): NumericField;
  /** Converts degrees to radians, eg: radians(90) */
  radians(): NumericField;
  /** Absolute value, eg: abs(-17.4) */
  abs(): NumericField;
  /** Computes the arccosine of x, eg: acos(0.5) */
  acos(): NumericField;
  /** Computes the arctangent of x, eg: atan(0.5) */
  atan(): NumericField;
  /** Returns the cube root of x, eg: cbrt(8) */
  cbrt(): NumericField;
  /** Rounds the number up, eg: ceil(17.4) */
  ceil(): NumericField;
  /** Returns a character which is corresponding the ASCII code value or Unicode code point, eg: chr(65) */
  chr(): StringField;
  /** Computes e to the power of x, eg: exp(1) */
  exp(): NumericField;
  /** Computes the greatest common divisor of x and y, eg: (42).greatest_common_divisor(57) */
  greatest_common_divisor(y: Numericable): NumericField;
  /** Rounds x to s decimal places, eg: (42.4332).round(2) */
  round(precision?: Numericable): NumericField;
  /** Computes the logarithm of x to base b. b may be omitted, in which case the default 10, eg: (2).log(64) */
  log(p1?: Numericable): NumericField;
  /** , eg: undefined */
  mod(col1: Numericable): NumericField;
  /** , eg: undefined */
  add(col1?: Numericable): NumericField;
  /** Computes the arcsine of x, eg: asin(0.5) */
  asin(): NumericField;
  /** Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80, eg: (5).bar(0, 20, 10) */
  bar(min: Numericable, max: Numericable, width?: Numericable): StringField;
  /** Converts the value to binary representation, eg: bin(42) */
  bin(): StringField;
  /** Returns the number of bits that are set, eg: bit_count(31) */
  bit_count(): NumericField;
  /** Truncates the number, eg: trunc(17.4) */
  trunc(): NumericField;
  /** Factorial of x. Computes the product of the current integer and all integers below it, eg: 4! */
  factorial(): NumericField;
  /** Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB), eg: format_bytes(1000 * 16) */
  formatReadableDecimalSize(): StringField;
  /** Computes the tan of x, eg: tan(90) */
  tan(): NumericField;
  /** , eg: undefined */
  subtract(col1?: Numericable): NumericField;
  /** Computes the hyperbolic sin of x, eg: sinh(1) */
  sinh(): NumericField;
  /** Computes x to the power of y, eg: (2).pow(3) */
  power(y: Numericable): NumericField;
  /** Converts radians to degrees, eg: degrees(pi()) */
  degrees(): NumericField;
  /** Computes the least common multiple of x and y, eg: (42).least_common_multiple(57) */
  lcm(y: Numericable): NumericField;
  /** Computes the least common multiple of x and y, eg: (42).least_common_multiple(57) */
  least_common_multiple(y: Numericable): NumericField;
  /** Computes the 2-log of x, eg: log2(8) */
  log2(): NumericField;
  /** Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  format_bytes(): StringField;
  /** Computes the log of the gamma function, eg: lgamma(2) */
  lgamma(): NumericField;
  /** Computes the sin of x, eg: sin(90) */
  sin(): NumericField;
  /** Computes the inverse hyperbolic tan of x, eg: atanh(0.5) */
  atanh(): NumericField;
  /** Computes the cos of x, eg: cos(90) */
  cos(): NumericField;
  /** Computes the hyperbolic cos of x, eg: cosh(1) */
  cosh(): NumericField;

  // Add more numeric operations as needed
  /** Convert the operation chain to a SQL string */
  toString(): string;
}

/**
 * Interface for global DuckDB functions
 * These functions can be used directly without chaining to a field
 */
export interface DuckDBFunctions {
  /** ACOSH(X: DOUBLE): NUMERIC - Computes the inverse hyperbolic cos of x, eg: acosh(2.3) */
  acosh(x: Numericable): NumericField;
  /** XOR(LEFT: BIT, RIGHT: BIT): WHATEVER - Bitwise XOR, eg: xor(17, 5) */
  xor(left: Whateverable | Numericable, right: Whateverable | Numericable): WhateverField;
  /** WEEKOFYEAR(TS: DATE): NUMERIC - Extract the weekofyear component from a date or timestamp, eg: weekofyear(timestamp '2021-08-03 11:59:44.123456') */
  weekofyear(ts: Whateverable): NumericField;
  /** WEEK(TS: DATE): NUMERIC - Extract the week component from a date or timestamp, eg: week(timestamp '2021-08-03 11:59:44.123456') */
  week(ts: Whateverable): NumericField;
  /** ARRAY_COSINE_DISTANCE(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_cosine_distance([1, 2, 3], [1, 2, 3]) */
  array_cosine_distance(array1: Whateverable, array2: Whateverable): NumericField;
  /** ARRAY_REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  array_reduce(list: Whateverable, lambda: Whateverable): WhateverField;
  /** ARRAY_SLICE(LIST: ANY, BEGIN: ANY, END: ANY, STEP: BIGINT): WHATEVER - Extract a sublist using slice conventions. Negative values are accepted., eg: list_slice([4, 5, 6], 2, 3) */
  array_slice(list: Whateverable, begin: Whateverable, end: Whateverable, step?: Numericable): WhateverField;
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
  /** TRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from either side of the string, eg: trim('>>>>test<<', '><') */
  trim(str: Stringable, characters?: Stringable): StringField;
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
  /** GENERATE_SERIES(START: BIGINT, STOP: BIGINT, STEP: BIGINT): WHATEVER - Create a list of values between start and stop - the stop parameter is inclusive, eg: generate_series(2, 5, 3) */
  generate_series(start: Numericable | Whateverable, stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField;
  /** HEX(VALUE: BIGINT): VARCHAR - Converts the value to hexadecimal representation, eg: hex(42) */
  hex(value: Numericable | Whateverable | Stringable): StringField;
  /** TO_DAYS(INTEGER: INTEGER): WHATEVER - Construct a day interval, eg: to_days(5) */
  to_days(integer: Numericable): WhateverField;
  /** ISFINITE(X: DATE): WHATEVER - Returns true if the floating point value is finite, false otherwise, eg: isfinite(5.5) */
  isfinite(x: Whateverable | Numericable): WhateverField;
  /** JARO_WINKLER_SIMILARITY(STR1: VARCHAR, STR2: VARCHAR, SCORECUTOFF: DOUBLE): NUMERIC - The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaro_winkler_similarity('duck', 'duckdb', 0.5) */
  jaro_winkler_similarity(str1: Stringable, str2: Stringable, scoreCutoff?: Numericable): NumericField;
  /** JSON_CONTAINS(COL0: JSON, COL1: JSON): WHATEVER - , eg: null */
  json_contains(col0: Whateverable | Stringable, col1: Whateverable | Stringable): WhateverField;
  /** JSON_EXISTS(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_exists(col0: Stringable | Whateverable, col1: Stringable | Whateverable): WhateverField;
  /** JSON_EXTRACT_PATH_TEXT(COL0: VARCHAR, COL1: VARCHAR): VARCHAR - , eg: null */
  json_extract_path_text(col0: Stringable | Whateverable, col1: Stringable | Numericable | Whateverable): StringField;
  /** JSON_EXTRACT_STRING(COL0: VARCHAR, COL1: VARCHAR): VARCHAR - , eg: null */
  json_extract_string(col0: Stringable | Whateverable, col1: Stringable | Whateverable | Numericable): StringField;
  /** TO_BINARY(VALUE: VARINT): VARCHAR - Converts the value to binary representation, eg: bin(42) */
  to_binary(value: Whateverable | Numericable | Stringable): StringField;
  /** TO_BASE(NUMBER: BIGINT, RADIX: INTEGER, MINLENGTH: INTEGER): VARCHAR - Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length, eg: to_base(42, 16) */
  to_base(number: Numericable, radix: Numericable, minLength?: Numericable): StringField;
  /** JSON_KEYS(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_keys(col0: Stringable | Whateverable, col1?: Stringable | Whateverable): WhateverField;
  /** JSON_SERIALIZE_PLAN(COL0: VARCHAR, COL1: BOOLEAN, COL2: BOOLEAN, COL3: BOOLEAN, COL4: BOOLEAN): WHATEVER - , eg: null */
  json_serialize_plan(col0: Stringable, col1?: Whateverable, col2?: Whateverable, col3?: Whateverable, col4?: Whateverable): WhateverField;
  /** JSON_VALUE(COL0: VARCHAR, COL1: BIGINT): VARCHAR - , eg: null */
  json_value(col0: Stringable | Whateverable, col1: Numericable | Stringable | Whateverable): StringField;
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
  /** LIST_SORT(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Sorts the elements of the list, eg: list_sort([3, 6, 1, 2]) */
  list_sort(list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField;
  /** SQRT(X: DOUBLE): NUMERIC - Returns the square root of x, eg: sqrt(4) */
  sqrt(x: Numericable): NumericField;
  /** MAKE_DATE(YEAR: BIGINT, MONTH: BIGINT, DAY: BIGINT): WHATEVER - The date for the given struct., eg: make_date({'year': 2024, 'month': 11, 'day': 14}) */
  make_date(year: Numericable | Whateverable, month?: Numericable, day?: Numericable): WhateverField;
  /** MAP_EXTRACT_VALUE(MAP: ANY, KEY: ANY): WHATEVER - Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: map_extract_value(map(['key'], ['val']), 'key') */
  map_extract_value(map: Whateverable, key: Whateverable): WhateverField;
  /** MD5(VALUE: BLOB): VARCHAR - Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5(value: Whateverable | Stringable): StringField;
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
  /** REGEXP_EXTRACT(STR: VARCHAR, PATTERN: VARCHAR, GROUP: VARCHAR[], OPTIONS: VARCHAR): VARCHAR - If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set., eg: regexp_extract('abc', '([a-z])(b)', 1) */
  regexp_extract(str: Stringable, pattern: Stringable, group?: Whateverable | Numericable, options?: Stringable): StringField;
  /** REGEXP_MATCHES(STR: VARCHAR, PATTERN: VARCHAR, OPTIONS: VARCHAR): WHATEVER - Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set., eg: regexp_matches('anabanana', '(an)*') */
  regexp_matches(str: Stringable, pattern: Stringable, options?: Stringable): WhateverField;
  /** RTRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from the right side of the string, eg: rtrim('>>>>test<<', '><') */
  rtrim(str: Stringable, characters?: Stringable): StringField;
  /** ADD(COL0: INTERVAL, COL1: INTERVAL): WHATEVER - , eg: null */
  add(col0: Whateverable | Numericable, col1?: Whateverable | Numericable): WhateverField;
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
  /** TO_JSON(): WHATEVER - , eg: null */
  to_json(): WhateverField;
  /** TO_HEX(VALUE: BIGINT): VARCHAR - Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex(value: Numericable | Whateverable | Stringable): StringField;
  /** ICU_SORT_KEY(COL0: VARCHAR, COL1: VARCHAR): VARCHAR - , eg: null */
  icu_sort_key(col0: Stringable, col1: Stringable): StringField;
  /** ISODOW(TS: DATE): NUMERIC - Extract the isodow component from a date or timestamp, eg: isodow(timestamp '2021-08-03 11:59:44.123456') */
  isodow(ts: Whateverable): NumericField;
  /** ISOYEAR(TS: DATE): NUMERIC - Extract the isoyear component from a date or timestamp, eg: isoyear(timestamp '2021-08-03 11:59:44.123456') */
  isoyear(ts: Whateverable): NumericField;
  /** JSON_ARRAY_LENGTH(COL0: JSON, COL1: VARCHAR): NUMERIC - , eg: null */
  json_array_length(col0: Stringable | Whateverable, col1?: Stringable | Whateverable): NumericField;
  /** JSON_EXTRACT_PATH(COL0: VARCHAR, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_extract_path(col0: Stringable | Whateverable, col1: Whateverable | Stringable | Numericable): WhateverField;
  /** JSON_STRUCTURE(COL0: VARCHAR): WHATEVER - , eg: null */
  json_structure(col0: Stringable | Whateverable): WhateverField;
  /** JSON_TYPE(COL0: JSON, COL1: VARCHAR): VARCHAR - , eg: null */
  json_type(col0: Whateverable | Stringable, col1?: Stringable | Whateverable): StringField;
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
  /** ARRAY_REVERSE_SORT(LIST: ANY[], COL1: VARCHAR): WHATEVER - Sorts the elements of the list in reverse order, eg: list_reverse_sort([3, 6, 1, 2]) */
  array_reverse_sort(list: Whateverable, col1?: Stringable): WhateverField;
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
  /** DATE_PART(TS: VARCHAR, COL1: DATE): NUMERIC - Get subfield (equivalent to extract), eg: date_part('minute', TIMESTAMP '1992-09-20 20:38:40') */
  date_part(ts: Stringable | Whateverable, col1: Whateverable): NumericField;
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
  /** JSON_EXTRACT(COL0: JSON, COL1: VARCHAR): WHATEVER - , eg: null */
  json_extract(col0: Whateverable | Stringable, col1: Stringable | Whateverable | Numericable): WhateverField;
  /** JSON_PRETTY(COL0: JSON): VARCHAR - , eg: null */
  json_pretty(col0: Whateverable): StringField;
  /** JSON_SERIALIZE_SQL(COL0: VARCHAR, COL1: BOOLEAN, COL2: BOOLEAN, COL3: BOOLEAN): WHATEVER - , eg: null */
  json_serialize_sql(col0: Stringable, col1?: Whateverable, col2?: Whateverable, col3?: Whateverable): WhateverField;
  /** LEFT_GRAPHEME(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the left-most count grapheme clusters, eg: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1) */
  left_grapheme(str: Stringable, count: Numericable): StringField;
  /** LIST_AGGREGATE(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  list_aggregate(list: Whateverable, name: Stringable): WhateverField;
  /** SUBTRACT(COL0: DATE, COL1: DATE): WHATEVER - , eg: null */
  subtract(col0: Whateverable | Numericable, col1?: Whateverable | Numericable): WhateverField;
  /** SUBSTRING(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring('Hello', 2, 2) */
  substring(str: Stringable, start: Numericable, length?: Numericable): StringField;
  /** STR_SPLIT_REGEX(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  str_split_regex(str: Stringable, separator: Stringable, col2?: Stringable): WhateverField;
  /** STRUCT_PACK(): WHATEVER - Create a STRUCT containing the argument values. The entry name will be the bound variable name., eg: struct_pack(i := 4, s := 'string') */
  struct_pack(): WhateverField;
  /** LIST_DISTANCE(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the distance between two lists, eg: list_distance([1, 2, 3], [1, 2, 3]) */
  list_distance(list1: Whateverable, list2: Whateverable): NumericField;
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
  /** REGEXP_FULL_MATCH(STR: VARCHAR, REGEX: VARCHAR, OPTIONS: VARCHAR): WHATEVER - Returns true if the entire string matches the regex. A set of optional options can be set., eg: regexp_full_match('anabanana', '(an)*') */
  regexp_full_match(str: Stringable, regex: Stringable, options?: Stringable): WhateverField;
  /** ROUND(X: FLOAT, PRECISION: INTEGER): NUMERIC - Rounds x to s decimal places, eg: round(42.4332, 2) */
  round(x: Numericable, precision?: Numericable): NumericField;
  /** RIGHT_GRAPHEME(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the right-most count grapheme clusters, eg: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1) */
  right_grapheme(str: Stringable, count: Numericable): StringField;
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
  /** INSTR(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  instr(haystack: Stringable, needle: Stringable): NumericField;
  /** JSON_MERGE_PATCH(): WHATEVER - , eg: null */
  json_merge_patch(): WhateverField;
  /** JSON_OBJECT(): WHATEVER - , eg: null */
  json_object(): WhateverField;
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
  /** STRPTIME(TEXT: VARCHAR, FORMATLIST: VARCHAR[]): WHATEVER - Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime., eg: strptime('4/15/2023 10:56:00', ['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S']) */
  strptime(text: Stringable, formatList: Whateverable | Stringable): WhateverField;
  /** STRPOS(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  strpos(haystack: Stringable, needle: Stringable): NumericField;
  /** LIST_TRANSFORM(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  list_transform(list: Whateverable, lambda: Whateverable): WhateverField;
  /** LOG(B: DOUBLE, P1: DOUBLE): NUMERIC - Computes the logarithm of x to base b. b may be omitted, in which case the default 10, eg: log(2, 64) */
  log(b: Numericable, p1?: Numericable): NumericField;
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
  /** ALIAS(EXPR: ANY): VARCHAR - Returns the name of a given expression, eg: alias(42 + 1) */
  alias(expr: Whateverable): StringField;
  /** ARRAY_APPLY(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  array_apply(list: Whateverable, lambda: Whateverable): WhateverField;
  /** ARRAY_COSINE_SIMILARITY(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_cosine_similarity([1, 2, 3], [1, 2, 3]) */
  array_cosine_similarity(array1: Whateverable, array2: Whateverable): NumericField;
  /** ARRAY_GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  array_grade_up(list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField;
  /** ARRAY_NEGATIVE_DOT_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  array_negative_dot_product(array1: Whateverable, array2: Whateverable): NumericField;
  /** ASIN(X: DOUBLE): NUMERIC - Computes the arcsine of x, eg: asin(0.5) */
  asin(x: Numericable): NumericField;
  /** BAR(X: DOUBLE, MIN: DOUBLE, MAX: DOUBLE, WIDTH: DOUBLE): VARCHAR - Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80, eg: bar(5, 0, 20, 10) */
  bar(x: Numericable, min: Numericable, max: Numericable, width?: Numericable): StringField;
  /** BIN(VALUE: VARCHAR): VARCHAR - Converts the value to binary representation, eg: bin(42) */
  bin(value: Stringable | Numericable | Whateverable): StringField;
  /** UNBIN(VALUE: VARCHAR): WHATEVER - Converts a value from binary representation to a blob, eg: unbin('0110') */
  unbin(value: Stringable): WhateverField;
  /** TRUNC(X: TINYINT): NUMERIC - Truncates the number, eg: trunc(17.4) */
  trunc(x: Numericable): NumericField;
  /** CURRENT_LOCALTIME(): WHATEVER - , eg: null */
  current_localtime(): WhateverField;
  /** CURRENT_LOCALTIMESTAMP(): WHATEVER - , eg: null */
  current_localtimestamp(): WhateverField;
  /** DATEPART(TS: VARCHAR, COL1: DATE): NUMERIC - Get subfield (equivalent to extract), eg: date_part('minute', TIMESTAMP '1992-09-20 20:38:40') */
  datepart(ts: Stringable | Whateverable, col1: Whateverable): NumericField;
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
  /** FROM_JSON_STRICT(COL0: JSON, COL1: VARCHAR): WHATEVER - , eg: null */
  from_json_strict(col0: Whateverable | Stringable, col1: Stringable): WhateverField;
  /** HAMMING(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: hamming('duck','luck') */
  hamming(str1: Stringable, str2: Stringable): NumericField;
  /** JSON_DESERIALIZE_SQL(COL0: JSON): VARCHAR - , eg: null */
  json_deserialize_sql(col0: Whateverable): StringField;
  /** JSON_TRANSFORM_STRICT(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_transform_strict(col0: Stringable | Whateverable, col1: Stringable): WhateverField;
  /** TAN(X: DOUBLE): NUMERIC - Computes the tan of x, eg: tan(90) */
  tan(x: Numericable): NumericField;
  /** SUBSTRING_GRAPHEME(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2) */
  substring_grapheme(str: Stringable, start: Numericable, length?: Numericable): StringField;
  /** STR_SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  str_split(str: Stringable, separator: Stringable): WhateverField;
  /** LIST_COSINE_DISTANCE(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the cosine distance between two lists, eg: list_cosine_distance([1, 2, 3], [1, 2, 3]) */
  list_cosine_distance(list1: Whateverable, list2: Whateverable): NumericField;
  /** LIST_EXTRACT(LIST: VARCHAR, INDEX: BIGINT): VARCHAR - Extract the indexth (1-based) value from the list., eg: list_extract([4, 5, 6], 3) */
  list_extract(list: Stringable | Whateverable, index: Numericable): StringField;
  /** STRUCT_EXTRACT_AT(STRUCT: STRUCT, ENTRY: BIGINT): WHATEVER - Extract the entry from the STRUCT by position (starts at 1!)., eg: struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2) */
  struct_extract_at(struct: Whateverable, entry: Numericable): WhateverField;
  /** LIST_GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  list_grade_up(list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField;
  /** LIST_INDEXOF(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  list_indexof(list: Whateverable, element: Whateverable): NumericField;
  /** STRING_SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  string_split(str: Stringable, separator: Stringable): WhateverField;
  /** LIST_NEGATIVE_INNER_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the negative inner product between two lists, eg: list_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  list_negative_inner_product(list1: Whateverable, list2: Whateverable): NumericField;
  /** LIST_RESIZE(LIST: ANY[], SIZE: ANY, VALUE: ANY): WHATEVER - Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: list_resize([1, 2, 3], 5, 0) */
  list_resize(list: Whateverable, size: Whateverable, value?: Whateverable): WhateverField;
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
  /** REGEXP_REPLACE(STR: VARCHAR, PATTERN: VARCHAR, REPLACEMENT: VARCHAR, OPTIONS: VARCHAR): VARCHAR - If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set., eg: regexp_replace('hello', '[lo]', '-') */
  regexp_replace(str: Stringable, pattern: Stringable, replacement: Stringable, options?: Stringable): StringField;
  /** REGEXP_SPLIT_TO_ARRAY(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  regexp_split_to_array(str: Stringable, separator: Stringable, col2?: Stringable): WhateverField;
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
  /** ISINF(X: DATE): WHATEVER - Returns true if the floating point value is infinite, false otherwise, eg: isinf('Infinity'::float) */
  isinf(x: Whateverable | Numericable): WhateverField;
  /** JARO_SIMILARITY(STR1: VARCHAR, STR2: VARCHAR, SCORECUTOFF: DOUBLE): NUMERIC - The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaro_similarity('duck', 'duckdb', 0.5) */
  jaro_similarity(str1: Stringable, str2: Stringable, scoreCutoff?: Numericable): NumericField;
  /** TO_CENTURIES(INTEGER: INTEGER): WHATEVER - Construct a century interval, eg: to_centuries(5) */
  to_centuries(integer: Numericable): WhateverField;
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
  /** SUBSTR(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring('Hello', 2, 2) */
  substr(str: Stringable, start: Numericable, length?: Numericable): StringField;
  /** LIST_CAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  list_cat(list1: Whateverable, list2: Whateverable): WhateverField;
  /** LIST_REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  list_reduce(list: Whateverable, lambda: Whateverable): WhateverField;
  /** LIST_HAS_ALL(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if all elements of l2 are in l1. NULLs are ignored., eg: list_has_all([1, 2, 3], [2, 3]) */
  list_has_all(l1: Whateverable, p1: Whateverable): WhateverField;
  /** LIST_REVERSE_SORT(LIST: ANY[], COL1: VARCHAR): WHATEVER - Sorts the elements of the list in reverse order, eg: list_reverse_sort([3, 6, 1, 2]) */
  list_reverse_sort(list: Whateverable, col1?: Stringable): WhateverField;
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
  /** DATE_TRUNC(PART: VARCHAR, TIMESTAMP: DATE): WHATEVER - Truncate to specified precision, eg: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40') */
  date_trunc(part: Stringable, timestamp: Whateverable): WhateverField;
  /** FORMAT_BYTES(BYTES: BIGINT): VARCHAR - Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  format_bytes(bytes: Numericable): StringField;
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
  /** LEN(STR: BIT): NUMERIC - Number of characters in string., eg: length('Hello🦆') */
  len(str: Whateverable | Stringable): NumericField;
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
  /** WEEKDAY(TS: DATE): NUMERIC - Extract the weekday component from a date or timestamp, eg: weekday(timestamp '2021-08-03 11:59:44.123456') */
  weekday(ts: Whateverable): NumericField;
  /** ARRAY_CONTAINS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  array_contains(list: Whateverable, element: Whateverable): WhateverField;
  /** ARRAY_DOT_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_inner_product([1, 2, 3], [1, 2, 3]) */
  array_dot_product(array1: Whateverable, array2: Whateverable): NumericField;
  /** ARRAY_HAS_ALL(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if all elements of l2 are in l1. NULLs are ignored., eg: list_has_all([1, 2, 3], [2, 3]) */
  array_has_all(l1: Whateverable, p1: Whateverable): WhateverField;
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
  /** TO_BASE64(BLOB: BLOB): VARCHAR - Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  to_base64(blob: Whateverable): StringField;
  /** JSON_QUOTE(): WHATEVER - , eg: null */
  json_quote(): WhateverField;
  /** LAST_DAY(TS: DATE): WHATEVER - Returns the last day of the month, eg: last_day(TIMESTAMP '1992-03-22 01:02:03.1234') */
  last_day(ts: Whateverable): WhateverField;
  /** LEVENSHTEIN(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: levenshtein('duck','db') */
  levenshtein(str1: Stringable, str2: Stringable): NumericField;
  /** LIST_COSINE_SIMILARITY(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the cosine similarity between two lists, eg: list_cosine_similarity([1, 2, 3], [1, 2, 3]) */
  list_cosine_similarity(list1: Whateverable, list2: Whateverable): NumericField;
  /** LIST_FILTER(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Constructs a list from those elements of the input list for which the lambda function returns true, eg: list_filter([3, 4, 5], x -> x > 4) */
  list_filter(list: Whateverable, lambda: Whateverable): WhateverField;
  /** LIST_INNER_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the inner product between two lists, eg: list_inner_product([1, 2, 3], [1, 2, 3]) */
  list_inner_product(list1: Whateverable, list2: Whateverable): NumericField;
  /** STRLEN(STR: VARCHAR): NUMERIC - Number of bytes in string., eg: strlen('🦆') */
  strlen(str: Stringable): NumericField;
  /** LIST_NEGATIVE_DOT_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the negative inner product between two lists, eg: list_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  list_negative_dot_product(list1: Whateverable, list2: Whateverable): NumericField;
  /** LIST_VALUE(): WHATEVER - Create a LIST containing the argument values, eg: list_value(4, 5, 6) */
  list_value(): WhateverField;
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
  /** ROW(): WHATEVER - Create an unnamed STRUCT (tuple) containing the argument values., eg: row(i, i % 4, i / 4) */
  row(): WhateverField;
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

  /** Removes any occurrences of any of the characters from either side of the string, eg: ('>>>>test<<').trim('><') */
  trim = (characters?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "trim", args: [characters], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted, eg: ('12345').translate('143', 'ax') */
  translate = (from: Stringable, to: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "translate", args: [from, to], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  editdist3 = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "editdist3", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_winkler_similarity('duckdb', 0.5) */
  jaro_winkler_similarity = (str2: Stringable, scoreCutoff?: Numericable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "jaro_winkler_similarity", args: [str2, scoreCutoff], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** , eg: undefined */
  json_extract_path_text = (col1: Stringable | Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_path_text", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  json_extract_string = (col1: Stringable | Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_string", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  json_value = (col1: Numericable | Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_value", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Number of characters in string., eg: length('Hello🦆') */
  length = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "length", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the MD5 hash of the value as an INT128, eg: md5_number('123') */
  md5_number = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "md5_number", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set., eg: (b)').regexp_extract('abc', '([a-z])(1) */
  regexp_extract = (pattern: Stringable, group?: Numericable, options?: Stringable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_extract", args: [pattern, group, options], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Removes any occurrences of any of the characters from the right side of the string, eg: ('>>>>test<<').rtrim('><') */
  rtrim = (characters?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "rtrim", args: [characters], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Escapes the input string by encoding it so that it can be included in a URL query parameter., eg: url_encode('this string has/ special+ characters>') */
  url_encode = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "url_encode", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different, eg: ('hello').damerau_levenshtein('world') */
  damerau_levenshtein = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "damerau_levenshtein", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  icu_sort_key = (col1: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "icu_sort_key", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  json_array_length = (col1?: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "json_array_length", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to binary representation, eg: bin(42) */
  to_binary = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_binary", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Convert string to lower case, eg: lower('Hello') */
  lcase = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "lcase", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Strips accents from string., eg: strip_accents('mühleisen') */
  strip_accents = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "strip_accents", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the SHA256 hash of the value, eg: sha256('hello') */
  sha256 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "sha256", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirpath('system') */
  parse_dirpath = (separator?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "parse_dirpath", args: [separator], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Repeats the string count number of times, eg: ('A').repeat(5) */
  repeat = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "repeat", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Reverses the string, eg: reverse('hello') */
  reverse = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "reverse", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  bit_length = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "bit_length", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  unicode = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "unicode", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Convert string to upper case., eg: upper('Hello') */
  ucase = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "ucase", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the left-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').left_grapheme(1) */
  left_grapheme = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "left_grapheme", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substring = (start: Numericable, length?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "substring", args: [start, length], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "md5", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Formats a string using printf syntax, eg: ('Benchmark "%s" took %d seconds').printf('CSV', 42) */
  printf = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "printf", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the right-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').right_grapheme(1) */
  right_grapheme = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "right_grapheme", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Unescapes the URL encoded input., eg: url_decode('this%20string%20is%2BFencoded') */
  url_decode = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "url_decode", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns an integer that represents the Unicode code point of the first character of the string, eg: ascii('Ω') */
  ascii = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ascii", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  instr = (needle: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "instr", args: [needle], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** , eg: undefined */
  json_type = (col1?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_type", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  strpos = (needle: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "strpos", args: [needle], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Convert string to lower case, eg: lower('Hello') */
  lower = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "lower", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Pads the string with the character from the left until it has count characters, eg: ('hello').lpad(10, '>') */
  lpad = (count: Numericable, character: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "lpad", args: [count, character], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Removes any occurrences of any of the characters from the left side of the string, eg: ('>>>>test<<').ltrim('><') */
  ltrim = (characters?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "ltrim", args: [characters], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  position = (needle: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "position", args: [needle], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to binary representation, eg: bin(42) */
  bin = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "bin", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  hamming = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "hamming", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('🦆🤦🏼‍♂️🤦🏽‍♀️🦆').substring_grapheme(3, 2) */
  substring_grapheme = (start: Numericable, length?: Numericable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "substring_grapheme", args: [start, length], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_extract = (index: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "list_extract", args: [index], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  mismatches = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "mismatches", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_filename(true, 'forward_slash') */
  parse_filename = (trimExtension?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "parse_filename", args: [trimExtension], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set., eg: ('hello').regexp_replace('[lo]', '-') */
  regexp_replace = (pattern: Stringable, replacement: Stringable, options?: Stringable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_replace", args: [pattern, replacement, options], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Formats a string using fmt syntax, eg: ('Benchmark "{}" took {} seconds').format('CSV', 42) */
  format = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "format", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_similarity('duckdb', 0.5) */
  jaro_similarity = (str2: Stringable, scoreCutoff?: Numericable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "jaro_similarity", args: [str2, scoreCutoff], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Number of grapheme clusters in string., eg: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️') */
  length_grapheme = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "length_grapheme", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substr = (start: Numericable, length?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "substr", args: [start, length], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirname('system') */
  parse_dirname = (separator?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "parse_dirname", args: [separator], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Pads the string with the character from the right until it has count characters, eg: ('hello').rpad(10, '<') */
  rpad = (count: Numericable, character: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "rpad", args: [count, character], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Replaces any occurrences of the source with target in string, eg: ('hello').replace('l', '-') */
  replace = (source: Stringable, target: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "replace", args: [source, target], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the indexth (1-based) value from the array., eg: ('DuckDB').array_extract(2) */
  array_extract = (index: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "array_extract", args: [index], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaccard('luck') */
  jaccard = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "jaccard", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Extract the left-most count characters, eg: ('Hello🦆').left(2) */
  left = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "left", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_element = (index: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "list_element", args: [index], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Escapes all potentially meaningful regexp characters in the input string, eg: regexp_escape('https://duckdb.org') */
  regexp_escape = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_escape", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the right-most count characters, eg: ('Hello🦆').right(3) */
  right = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "right", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Convert string to upper case., eg: upper('Hello') */
  upper = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "upper", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Number of characters in string., eg: length('Hello🦆') */
  len = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "len", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  levenshtein = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "levenshtein", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Number of bytes in string., eg: strlen('🦆') */
  strlen = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "strlen", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not., eg: nfc_normalize('ardèch') */
  nfc_normalize = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "nfc_normalize", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  ord = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ord", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the SHA1 hash of the value, eg: sha1('hello') */
  sha1 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "sha1", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;

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

  /** Removes any occurrences of any of the characters from either side of the string, eg: ('>>>>test<<').trim('><') */
  trim = (characters?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "trim", args: [characters], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted, eg: ('12345').translate('143', 'ax') */
  translate = (from: Stringable, to: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "translate", args: [from, to], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  editdist3 = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "editdist3", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_winkler_similarity('duckdb', 0.5) */
  jaro_winkler_similarity = (str2: Stringable, scoreCutoff?: Numericable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "jaro_winkler_similarity", args: [str2, scoreCutoff], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** , eg: undefined */
  json_extract_path_text = (col1: Stringable | Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_path_text", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  json_extract_string = (col1: Stringable | Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_extract_string", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  json_value = (col1: Numericable | Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_value", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Number of characters in string., eg: length('Hello🦆') */
  length = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "length", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the MD5 hash of the value as an INT128, eg: md5_number('123') */
  md5_number = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "md5_number", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set., eg: (b)').regexp_extract('abc', '([a-z])(1) */
  regexp_extract = (pattern: Stringable, group?: Numericable, options?: Stringable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_extract", args: [pattern, group, options], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Removes any occurrences of any of the characters from the right side of the string, eg: ('>>>>test<<').rtrim('><') */
  rtrim = (characters?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "rtrim", args: [characters], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Escapes the input string by encoding it so that it can be included in a URL query parameter., eg: url_encode('this string has/ special+ characters>') */
  url_encode = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "url_encode", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different, eg: ('hello').damerau_levenshtein('world') */
  damerau_levenshtein = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "damerau_levenshtein", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  icu_sort_key = (col1: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "icu_sort_key", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  json_array_length = (col1?: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "json_array_length", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to binary representation, eg: bin(42) */
  to_binary = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_binary", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Convert string to lower case, eg: lower('Hello') */
  lcase = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "lcase", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Strips accents from string., eg: strip_accents('mühleisen') */
  strip_accents = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "strip_accents", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the SHA256 hash of the value, eg: sha256('hello') */
  sha256 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "sha256", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirpath('system') */
  parse_dirpath = (separator?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "parse_dirpath", args: [separator], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Repeats the string count number of times, eg: ('A').repeat(5) */
  repeat = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "repeat", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Reverses the string, eg: reverse('hello') */
  reverse = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "reverse", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** , eg: undefined */
  bit_length = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "bit_length", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  unicode = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "unicode", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Convert string to upper case., eg: upper('Hello') */
  ucase = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "ucase", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the left-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').left_grapheme(1) */
  left_grapheme = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "left_grapheme", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substring = (start: Numericable, length?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "substring", args: [start, length], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "md5", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Formats a string using printf syntax, eg: ('Benchmark "%s" took %d seconds').printf('CSV', 42) */
  printf = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "printf", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the right-most count grapheme clusters, eg: ('🤦🏼‍♂️🤦🏽‍♀️').right_grapheme(1) */
  right_grapheme = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "right_grapheme", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Unescapes the URL encoded input., eg: url_decode('this%20string%20is%2BFencoded') */
  url_decode = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "url_decode", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns an integer that represents the Unicode code point of the first character of the string, eg: ascii('Ω') */
  ascii = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ascii", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  instr = (needle: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "instr", args: [needle], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** , eg: undefined */
  json_type = (col1?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "json_type", args: [col1], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  strpos = (needle: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "strpos", args: [needle], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Convert string to lower case, eg: lower('Hello') */
  lower = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "lower", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Pads the string with the character from the left until it has count characters, eg: ('hello').lpad(10, '>') */
  lpad = (count: Numericable, character: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "lpad", args: [count, character], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Removes any occurrences of any of the characters from the left side of the string, eg: ('>>>>test<<').ltrim('><') */
  ltrim = (characters?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "ltrim", args: [characters], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: ('test test').instr('es') */
  position = (needle: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "position", args: [needle], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to binary representation, eg: bin(42) */
  bin = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "bin", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  hamming = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "hamming", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('🦆🤦🏼‍♂️🤦🏽‍♀️🦆').substring_grapheme(3, 2) */
  substring_grapheme = (start: Numericable, length?: Numericable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "substring_grapheme", args: [start, length], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_extract = (index: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "list_extract", args: [index], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: ('duck').hamming('luck') */
  mismatches = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "mismatches", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_filename(true, 'forward_slash') */
  parse_filename = (trimExtension?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "parse_filename", args: [trimExtension], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set., eg: ('hello').regexp_replace('[lo]', '-') */
  regexp_replace = (pattern: Stringable, replacement: Stringable, options?: Stringable) =>
    new StringFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_replace", args: [pattern, replacement, options], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Formats a string using fmt syntax, eg: ('Benchmark "{}" took {} seconds').format('CSV', 42) */
  format = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "format", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaro_similarity('duckdb', 0.5) */
  jaro_similarity = (str2: Stringable, scoreCutoff?: Numericable) =>
    new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "jaro_similarity", args: [str2, scoreCutoff], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Number of grapheme clusters in string., eg: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️') */
  length_grapheme = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "length_grapheme", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: ('Hello').substring(2, 2) */
  substr = (start: Numericable, length?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "substr", args: [start, length], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash, eg: ('path/to/file.csv').parse_dirname('system') */
  parse_dirname = (separator?: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "parse_dirname", args: [separator], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Pads the string with the character from the right until it has count characters, eg: ('hello').rpad(10, '<') */
  rpad = (count: Numericable, character: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "rpad", args: [count, character], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Replaces any occurrences of the source with target in string, eg: ('hello').replace('l', '-') */
  replace = (source: Stringable, target: Stringable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "replace", args: [source, target], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the indexth (1-based) value from the array., eg: ('DuckDB').array_extract(2) */
  array_extract = (index: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "array_extract", args: [index], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: ('duck').jaccard('luck') */
  jaccard = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "jaccard", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Extract the left-most count characters, eg: ('Hello🦆').left(2) */
  left = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "left", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the indexth (1-based) value from the list., eg: ([4).list_extract(5, 6], 3) */
  list_element = (index: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "list_element", args: [index], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Escapes all potentially meaningful regexp characters in the input string, eg: regexp_escape('https://duckdb.org') */
  regexp_escape = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "regexp_escape", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Extract the right-most count characters, eg: ('Hello🦆').right(3) */
  right = (count: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "right", args: [count], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Convert string to upper case., eg: upper('Hello') */
  upper = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "upper", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Number of characters in string., eg: length('Hello🦆') */
  len = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "len", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: ('duck').levenshtein('db') */
  levenshtein = (str2: Stringable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "levenshtein", args: [str2], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Number of bytes in string., eg: strlen('🦆') */
  strlen = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "strlen", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not., eg: nfc_normalize('ardèch') */
  nfc_normalize = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "nfc_normalize", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the unicode codepoint of the first character of the string, eg: unicode('ü') */
  ord = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ord", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the SHA1 hash of the value, eg: sha1('hello') */
  sha1 = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "sha1", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;

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

  /** Computes the inverse hyperbolic cos of x, eg: acosh(2.3) */
  acosh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "acosh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the arctangent (y, x), eg: (1.0).atan2(0.0) */
  atan2 = (x: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "atan2", args: [x], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Rounds the number up, eg: ceil(17.4) */
  ceiling = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ceiling", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Rounds x to next even number by rounding away from zero, eg: even(2.9) */
  even = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "even", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  formatReadableSize = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "formatReadableSize", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Interpolation of (x-1) factorial (so decimal inputs are allowed), eg: gamma(5.5) */
  gamma = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "gamma", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the greatest common divisor of x and y, eg: (42).greatest_common_divisor(57) */
  gcd = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "gcd", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length, eg: (42).to_base(16) */
  to_base = (radix: Numericable, minLength?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_base", args: [radix, minLength], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Computes the hyperbolic tan of x, eg: tanh(1) */
  tanh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "tanh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the square root of x, eg: sqrt(4) */
  sqrt = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "sqrt", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Bitwise XOR, eg: (17).xor(5) */
  xor = (right: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "xor", args: [right], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the inverse hyperbolic sin of x, eg: asinh(0.5) */
  asinh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "asinh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the cotangent of x, eg: cot(0.5) */
  cot = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "cot", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** , eg: undefined */
  divide = (col1: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "divide", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Rounds the number down, eg: floor(17.4) */
  floor = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "floor", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_hex", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Converts the value to binary representation, eg: bin(42) */
  to_binary = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "to_binary", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Computes the natural logarithm of x, eg: ln(2) */
  ln = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ln", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the 10-log of x, eg: log10(1000) */
  log10 = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "log10", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the sign of x as -1, 0 or 1, eg: sign(-349) */
  sign = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "sign", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** , eg: undefined */
  multiply = (col1: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "multiply", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the next floating point value after x in the direction of y, eg: (1::float).nextafter(2::float) */
  nextafter = (p1: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "nextafter", args: [p1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes x to the power of y, eg: (2).pow(3) */
  pow = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "pow", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts degrees to radians, eg: radians(90) */
  radians = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "radians", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Absolute value, eg: abs(-17.4) */
  abs = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "abs", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the arccosine of x, eg: acos(0.5) */
  acos = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "acos", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the arctangent of x, eg: atan(0.5) */
  atan = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "atan", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns the cube root of x, eg: cbrt(8) */
  cbrt = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "cbrt", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Rounds the number up, eg: ceil(17.4) */
  ceil = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "ceil", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Returns a character which is corresponding the ASCII code value or Unicode code point, eg: chr(65) */
  chr = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "chr", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Computes e to the power of x, eg: exp(1) */
  exp = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "exp", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the greatest common divisor of x and y, eg: (42).greatest_common_divisor(57) */
  greatest_common_divisor = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "greatest_common_divisor", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Rounds x to s decimal places, eg: (42.4332).round(2) */
  round = (precision?: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "round", args: [precision], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the logarithm of x to base b. b may be omitted, in which case the default 10, eg: (2).log(64) */
  log = (p1?: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "log", args: [p1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** , eg: undefined */
  mod = (col1: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "mod", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** , eg: undefined */
  add = (col1?: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "add", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the arcsine of x, eg: asin(0.5) */
  asin = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "asin", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80, eg: (5).bar(0, 20, 10) */
  bar = (min: Numericable, max: Numericable, width?: Numericable) => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "bar", args: [min, max, width], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Converts the value to binary representation, eg: bin(42) */
  bin = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "bin", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Returns the number of bits that are set, eg: bit_count(31) */
  bit_count = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "bit_count", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Truncates the number, eg: trunc(17.4) */
  trunc = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "trunc", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Factorial of x. Computes the product of the current integer and all integers below it, eg: 4! */
  factorial = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "factorial", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB), eg: format_bytes(1000 * 16) */
  formatReadableDecimalSize = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "formatReadableDecimalSize", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Computes the tan of x, eg: tan(90) */
  tan = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "tan", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** , eg: undefined */
  subtract = (col1?: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "subtract", args: [col1], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the hyperbolic sin of x, eg: sinh(1) */
  sinh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "sinh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes x to the power of y, eg: (2).pow(3) */
  power = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "power", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts radians to degrees, eg: degrees(pi()) */
  degrees = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "degrees", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the least common multiple of x and y, eg: (42).least_common_multiple(57) */
  lcm = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "lcm", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the least common multiple of x and y, eg: (42).least_common_multiple(57) */
  least_common_multiple = (y: Numericable) => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "least_common_multiple", args: [y], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the 2-log of x, eg: log2(8) */
  log2 = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "log2", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  format_bytes = () => new StringFieldImpl("").withOperation({ field: this.ops.field, method: "format_bytes", args: [], chain: this.ops.method ? this.ops : undefined }) as StringField;
  /** Computes the log of the gamma function, eg: lgamma(2) */
  lgamma = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "lgamma", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the sin of x, eg: sin(90) */
  sin = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "sin", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the inverse hyperbolic tan of x, eg: atanh(0.5) */
  atanh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "atanh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the cos of x, eg: cos(90) */
  cos = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "cos", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;
  /** Computes the hyperbolic cos of x, eg: cosh(1) */
  cosh = () => new NumericFieldImpl("").withOperation({ field: this.ops.field, method: "cosh", args: [], chain: this.ops.method ? this.ops : undefined }) as NumericField;

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
  /** ACOSH(X: DOUBLE): NUMERIC - Computes the inverse hyperbolic cos of x, eg: acosh(2.3) */
  acosh = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "acosh", args: [x] });
  /** XOR(LEFT: BIT, RIGHT: BIT): WHATEVER - Bitwise XOR, eg: xor(17, 5) */
  xor = (left: Whateverable | Numericable, right: Whateverable | Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "xor", args: [left, right] });
  /** WEEKOFYEAR(TS: DATE): NUMERIC - Extract the weekofyear component from a date or timestamp, eg: weekofyear(timestamp '2021-08-03 11:59:44.123456') */
  weekofyear = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "weekofyear", args: [ts] });
  /** WEEK(TS: DATE): NUMERIC - Extract the week component from a date or timestamp, eg: week(timestamp '2021-08-03 11:59:44.123456') */
  week = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "week", args: [ts] });
  /** ARRAY_COSINE_DISTANCE(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_cosine_distance([1, 2, 3], [1, 2, 3]) */
  array_cosine_distance = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_cosine_distance", args: [array1, array2] });
  /** ARRAY_REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  array_reduce = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_reduce", args: [list, lambda] });
  /** ARRAY_SLICE(LIST: ANY, BEGIN: ANY, END: ANY, STEP: BIGINT): WHATEVER - Extract a sublist using slice conventions. Negative values are accepted., eg: list_slice([4, 5, 6], 2, 3) */
  array_slice = (list: Whateverable, begin: Whateverable, end: Whateverable, step?: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_slice", args: [list, begin, end, step] });
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
  /** TRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from either side of the string, eg: trim('>>>>test<<', '><') */
  trim = (str: Stringable, characters?: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "trim", args: [str, characters] });
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
  /** GENERATE_SERIES(START: BIGINT, STOP: BIGINT, STEP: BIGINT): WHATEVER - Create a list of values between start and stop - the stop parameter is inclusive, eg: generate_series(2, 5, 3) */
  generate_series = (start: Numericable | Whateverable, stop?: Numericable | Whateverable, step?: Numericable | Whateverable): WhateverField =>
    new WhateverFieldImpl("").withOperation({ field: "", method: "generate_series", args: [start, stop, step] });
  /** HEX(VALUE: BIGINT): VARCHAR - Converts the value to hexadecimal representation, eg: hex(42) */
  hex = (value: Numericable | Whateverable | Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "hex", args: [value] });
  /** TO_DAYS(INTEGER: INTEGER): WHATEVER - Construct a day interval, eg: to_days(5) */
  to_days = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_days", args: [integer] });
  /** ISFINITE(X: DATE): WHATEVER - Returns true if the floating point value is finite, false otherwise, eg: isfinite(5.5) */
  isfinite = (x: Whateverable | Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "isfinite", args: [x] });
  /** JARO_WINKLER_SIMILARITY(STR1: VARCHAR, STR2: VARCHAR, SCORECUTOFF: DOUBLE): NUMERIC - The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaro_winkler_similarity('duck', 'duckdb', 0.5) */
  jaro_winkler_similarity = (str1: Stringable, str2: Stringable, scoreCutoff?: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "jaro_winkler_similarity", args: [str1, str2, scoreCutoff] });
  /** JSON_CONTAINS(COL0: JSON, COL1: JSON): WHATEVER - , eg: null */
  json_contains = (col0: Whateverable | Stringable, col1: Whateverable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_contains", args: [col0, col1] });
  /** JSON_EXISTS(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_exists = (col0: Stringable | Whateverable, col1: Stringable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_exists", args: [col0, col1] });
  /** JSON_EXTRACT_PATH_TEXT(COL0: VARCHAR, COL1: VARCHAR): VARCHAR - , eg: null */
  json_extract_path_text = (col0: Stringable | Whateverable, col1: Stringable | Numericable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_extract_path_text", args: [col0, col1] });
  /** JSON_EXTRACT_STRING(COL0: VARCHAR, COL1: VARCHAR): VARCHAR - , eg: null */
  json_extract_string = (col0: Stringable | Whateverable, col1: Stringable | Whateverable | Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_extract_string", args: [col0, col1] });
  /** TO_BINARY(VALUE: VARINT): VARCHAR - Converts the value to binary representation, eg: bin(42) */
  to_binary = (value: Whateverable | Numericable | Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "to_binary", args: [value] });
  /** TO_BASE(NUMBER: BIGINT, RADIX: INTEGER, MINLENGTH: INTEGER): VARCHAR - Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length, eg: to_base(42, 16) */
  to_base = (number: Numericable, radix: Numericable, minLength?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "to_base", args: [number, radix, minLength] });
  /** JSON_KEYS(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_keys = (col0: Stringable | Whateverable, col1?: Stringable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_keys", args: [col0, col1] });
  /** JSON_SERIALIZE_PLAN(COL0: VARCHAR, COL1: BOOLEAN, COL2: BOOLEAN, COL3: BOOLEAN, COL4: BOOLEAN): WHATEVER - , eg: null */
  json_serialize_plan = (col0: Stringable, col1?: Whateverable, col2?: Whateverable, col3?: Whateverable, col4?: Whateverable): WhateverField =>
    new WhateverFieldImpl("").withOperation({ field: "", method: "json_serialize_plan", args: [col0, col1, col2, col3, col4] });
  /** JSON_VALUE(COL0: VARCHAR, COL1: BIGINT): VARCHAR - , eg: null */
  json_value = (col0: Stringable | Whateverable, col1: Numericable | Stringable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_value", args: [col0, col1] });
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
  /** LIST_SORT(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Sorts the elements of the list, eg: list_sort([3, 6, 1, 2]) */
  list_sort = (list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_sort", args: [list, col1, col2] });
  /** SQRT(X: DOUBLE): NUMERIC - Returns the square root of x, eg: sqrt(4) */
  sqrt = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "sqrt", args: [x] });
  /** MAKE_DATE(YEAR: BIGINT, MONTH: BIGINT, DAY: BIGINT): WHATEVER - The date for the given struct., eg: make_date({'year': 2024, 'month': 11, 'day': 14}) */
  make_date = (year: Numericable | Whateverable, month?: Numericable, day?: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "make_date", args: [year, month, day] });
  /** MAP_EXTRACT_VALUE(MAP: ANY, KEY: ANY): WHATEVER - Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned, eg: map_extract_value(map(['key'], ['val']), 'key') */
  map_extract_value = (map: Whateverable, key: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "map_extract_value", args: [map, key] });
  /** MD5(VALUE: BLOB): VARCHAR - Returns the MD5 hash of the value as a string, eg: md5('123') */
  md5 = (value: Whateverable | Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "md5", args: [value] });
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
  /** REGEXP_EXTRACT(STR: VARCHAR, PATTERN: VARCHAR, GROUP: VARCHAR[], OPTIONS: VARCHAR): VARCHAR - If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set., eg: regexp_extract('abc', '([a-z])(b)', 1) */
  regexp_extract = (str: Stringable, pattern: Stringable, group?: Whateverable | Numericable, options?: Stringable): StringField =>
    new StringFieldImpl("").withOperation({ field: "", method: "regexp_extract", args: [str, pattern, group, options] });
  /** REGEXP_MATCHES(STR: VARCHAR, PATTERN: VARCHAR, OPTIONS: VARCHAR): WHATEVER - Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set., eg: regexp_matches('anabanana', '(an)*') */
  regexp_matches = (str: Stringable, pattern: Stringable, options?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "regexp_matches", args: [str, pattern, options] });
  /** RTRIM(STR: VARCHAR, CHARACTERS: VARCHAR): VARCHAR - Removes any occurrences of any of the characters from the right side of the string, eg: rtrim('>>>>test<<', '><') */
  rtrim = (str: Stringable, characters?: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "rtrim", args: [str, characters] });
  /** ADD(COL0: INTERVAL, COL1: INTERVAL): WHATEVER - , eg: null */
  add = (col0: Whateverable | Numericable, col1?: Whateverable | Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "add", args: [col0, col1] });
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
  /** TO_JSON(): WHATEVER - , eg: null */
  to_json = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_json", args: [] });
  /** TO_HEX(VALUE: BIGINT): VARCHAR - Converts the value to hexadecimal representation, eg: hex(42) */
  to_hex = (value: Numericable | Whateverable | Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "to_hex", args: [value] });
  /** ICU_SORT_KEY(COL0: VARCHAR, COL1: VARCHAR): VARCHAR - , eg: null */
  icu_sort_key = (col0: Stringable, col1: Stringable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "icu_sort_key", args: [col0, col1] });
  /** ISODOW(TS: DATE): NUMERIC - Extract the isodow component from a date or timestamp, eg: isodow(timestamp '2021-08-03 11:59:44.123456') */
  isodow = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "isodow", args: [ts] });
  /** ISOYEAR(TS: DATE): NUMERIC - Extract the isoyear component from a date or timestamp, eg: isoyear(timestamp '2021-08-03 11:59:44.123456') */
  isoyear = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "isoyear", args: [ts] });
  /** JSON_ARRAY_LENGTH(COL0: JSON, COL1: VARCHAR): NUMERIC - , eg: null */
  json_array_length = (col0: Stringable | Whateverable, col1?: Stringable | Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "json_array_length", args: [col0, col1] });
  /** JSON_EXTRACT_PATH(COL0: VARCHAR, COL1: VARCHAR[]): WHATEVER - , eg: null */
  json_extract_path = (col0: Stringable | Whateverable, col1: Whateverable | Stringable | Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_extract_path", args: [col0, col1] });
  /** JSON_STRUCTURE(COL0: VARCHAR): WHATEVER - , eg: null */
  json_structure = (col0: Stringable | Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_structure", args: [col0] });
  /** JSON_TYPE(COL0: JSON, COL1: VARCHAR): VARCHAR - , eg: null */
  json_type = (col0: Whateverable | Stringable, col1?: Stringable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_type", args: [col0, col1] });
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
  /** ARRAY_REVERSE_SORT(LIST: ANY[], COL1: VARCHAR): WHATEVER - Sorts the elements of the list in reverse order, eg: list_reverse_sort([3, 6, 1, 2]) */
  array_reverse_sort = (list: Whateverable, col1?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_reverse_sort", args: [list, col1] });
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
  /** DATE_PART(TS: VARCHAR, COL1: DATE): NUMERIC - Get subfield (equivalent to extract), eg: date_part('minute', TIMESTAMP '1992-09-20 20:38:40') */
  date_part = (ts: Stringable | Whateverable, col1: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "date_part", args: [ts, col1] });
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
  /** JSON_EXTRACT(COL0: JSON, COL1: VARCHAR): WHATEVER - , eg: null */
  json_extract = (col0: Whateverable | Stringable, col1: Stringable | Whateverable | Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_extract", args: [col0, col1] });
  /** JSON_PRETTY(COL0: JSON): VARCHAR - , eg: null */
  json_pretty = (col0: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_pretty", args: [col0] });
  /** JSON_SERIALIZE_SQL(COL0: VARCHAR, COL1: BOOLEAN, COL2: BOOLEAN, COL3: BOOLEAN): WHATEVER - , eg: null */
  json_serialize_sql = (col0: Stringable, col1?: Whateverable, col2?: Whateverable, col3?: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_serialize_sql", args: [col0, col1, col2, col3] });
  /** LEFT_GRAPHEME(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the left-most count grapheme clusters, eg: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1) */
  left_grapheme = (str: Stringable, count: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "left_grapheme", args: [str, count] });
  /** LIST_AGGREGATE(LIST: ANY[], NAME: VARCHAR): WHATEVER - Executes the aggregate function name on the elements of list, eg: list_aggregate([1, 2, NULL], 'min') */
  list_aggregate = (list: Whateverable, name: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_aggregate", args: [list, name] });
  /** SUBTRACT(COL0: DATE, COL1: DATE): WHATEVER - , eg: null */
  subtract = (col0: Whateverable | Numericable, col1?: Whateverable | Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "subtract", args: [col0, col1] });
  /** SUBSTRING(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring('Hello', 2, 2) */
  substring = (str: Stringable, start: Numericable, length?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "substring", args: [str, start, length] });
  /** STR_SPLIT_REGEX(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  str_split_regex = (str: Stringable, separator: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "str_split_regex", args: [str, separator, col2] });
  /** STRUCT_PACK(): WHATEVER - Create a STRUCT containing the argument values. The entry name will be the bound variable name., eg: struct_pack(i := 4, s := 'string') */
  struct_pack = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "struct_pack", args: [] });
  /** LIST_DISTANCE(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the distance between two lists, eg: list_distance([1, 2, 3], [1, 2, 3]) */
  list_distance = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_distance", args: [list1, list2] });
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
  /** REGEXP_FULL_MATCH(STR: VARCHAR, REGEX: VARCHAR, OPTIONS: VARCHAR): WHATEVER - Returns true if the entire string matches the regex. A set of optional options can be set., eg: regexp_full_match('anabanana', '(an)*') */
  regexp_full_match = (str: Stringable, regex: Stringable, options?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "regexp_full_match", args: [str, regex, options] });
  /** ROUND(X: FLOAT, PRECISION: INTEGER): NUMERIC - Rounds x to s decimal places, eg: round(42.4332, 2) */
  round = (x: Numericable, precision?: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "round", args: [x, precision] });
  /** RIGHT_GRAPHEME(STR: VARCHAR, COUNT: BIGINT): VARCHAR - Extract the right-most count grapheme clusters, eg: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1) */
  right_grapheme = (str: Stringable, count: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "right_grapheme", args: [str, count] });
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
  /** INSTR(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  instr = (haystack: Stringable, needle: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "instr", args: [haystack, needle] });
  /** JSON_MERGE_PATCH(): WHATEVER - , eg: null */
  json_merge_patch = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_merge_patch", args: [] });
  /** JSON_OBJECT(): WHATEVER - , eg: null */
  json_object = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_object", args: [] });
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
  /** STRPTIME(TEXT: VARCHAR, FORMATLIST: VARCHAR[]): WHATEVER - Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime., eg: strptime('4/15/2023 10:56:00', ['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S']) */
  strptime = (text: Stringable, formatList: Whateverable | Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "strptime", args: [text, formatList] });
  /** STRPOS(HAYSTACK: VARCHAR, NEEDLE: VARCHAR): NUMERIC - Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found, eg: instr('test test','es') */
  strpos = (haystack: Stringable, needle: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "strpos", args: [haystack, needle] });
  /** LIST_TRANSFORM(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  list_transform = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_transform", args: [list, lambda] });
  /** LOG(B: DOUBLE, P1: DOUBLE): NUMERIC - Computes the logarithm of x to base b. b may be omitted, in which case the default 10, eg: log(2, 64) */
  log = (b: Numericable, p1?: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "log", args: [b, p1] });
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
  /** ALIAS(EXPR: ANY): VARCHAR - Returns the name of a given expression, eg: alias(42 + 1) */
  alias = (expr: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "alias", args: [expr] });
  /** ARRAY_APPLY(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details, eg: list_transform([1, 2, 3], x -> x + 1) */
  array_apply = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_apply", args: [list, lambda] });
  /** ARRAY_COSINE_SIMILARITY(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_cosine_similarity([1, 2, 3], [1, 2, 3]) */
  array_cosine_similarity = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_cosine_similarity", args: [array1, array2] });
  /** ARRAY_GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  array_grade_up = (list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_grade_up", args: [list, col1, col2] });
  /** ARRAY_NEGATIVE_DOT_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  array_negative_dot_product = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_negative_dot_product", args: [array1, array2] });
  /** ASIN(X: DOUBLE): NUMERIC - Computes the arcsine of x, eg: asin(0.5) */
  asin = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "asin", args: [x] });
  /** BAR(X: DOUBLE, MIN: DOUBLE, MAX: DOUBLE, WIDTH: DOUBLE): VARCHAR - Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80, eg: bar(5, 0, 20, 10) */
  bar = (x: Numericable, min: Numericable, max: Numericable, width?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "bar", args: [x, min, max, width] });
  /** BIN(VALUE: VARCHAR): VARCHAR - Converts the value to binary representation, eg: bin(42) */
  bin = (value: Stringable | Numericable | Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "bin", args: [value] });
  /** UNBIN(VALUE: VARCHAR): WHATEVER - Converts a value from binary representation to a blob, eg: unbin('0110') */
  unbin = (value: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "unbin", args: [value] });
  /** TRUNC(X: TINYINT): NUMERIC - Truncates the number, eg: trunc(17.4) */
  trunc = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "trunc", args: [x] });
  /** CURRENT_LOCALTIME(): WHATEVER - , eg: null */
  current_localtime = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "current_localtime", args: [] });
  /** CURRENT_LOCALTIMESTAMP(): WHATEVER - , eg: null */
  current_localtimestamp = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "current_localtimestamp", args: [] });
  /** DATEPART(TS: VARCHAR, COL1: DATE): NUMERIC - Get subfield (equivalent to extract), eg: date_part('minute', TIMESTAMP '1992-09-20 20:38:40') */
  datepart = (ts: Stringable | Whateverable, col1: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "datepart", args: [ts, col1] });
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
  /** FROM_JSON_STRICT(COL0: JSON, COL1: VARCHAR): WHATEVER - , eg: null */
  from_json_strict = (col0: Whateverable | Stringable, col1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "from_json_strict", args: [col0, col1] });
  /** HAMMING(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The number of positions with different characters for 2 strings of equal length. Different case is considered different, eg: hamming('duck','luck') */
  hamming = (str1: Stringable, str2: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "hamming", args: [str1, str2] });
  /** JSON_DESERIALIZE_SQL(COL0: JSON): VARCHAR - , eg: null */
  json_deserialize_sql = (col0: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "json_deserialize_sql", args: [col0] });
  /** JSON_TRANSFORM_STRICT(COL0: VARCHAR, COL1: VARCHAR): WHATEVER - , eg: null */
  json_transform_strict = (col0: Stringable | Whateverable, col1: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_transform_strict", args: [col0, col1] });
  /** TAN(X: DOUBLE): NUMERIC - Computes the tan of x, eg: tan(90) */
  tan = (x: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "tan", args: [x] });
  /** SUBSTRING_GRAPHEME(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2) */
  substring_grapheme = (str: Stringable, start: Numericable, length?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "substring_grapheme", args: [str, start, length] });
  /** STR_SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  str_split = (str: Stringable, separator: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "str_split", args: [str, separator] });
  /** LIST_COSINE_DISTANCE(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the cosine distance between two lists, eg: list_cosine_distance([1, 2, 3], [1, 2, 3]) */
  list_cosine_distance = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_cosine_distance", args: [list1, list2] });
  /** LIST_EXTRACT(LIST: VARCHAR, INDEX: BIGINT): VARCHAR - Extract the indexth (1-based) value from the list., eg: list_extract([4, 5, 6], 3) */
  list_extract = (list: Stringable | Whateverable, index: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "list_extract", args: [list, index] });
  /** STRUCT_EXTRACT_AT(STRUCT: STRUCT, ENTRY: BIGINT): WHATEVER - Extract the entry from the STRUCT by position (starts at 1!)., eg: struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2) */
  struct_extract_at = (struct: Whateverable, entry: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "struct_extract_at", args: [struct, entry] });
  /** LIST_GRADE_UP(LIST: ANY[], COL1: VARCHAR, COL2: VARCHAR): WHATEVER - Returns the index of their sorted position., eg: list_grade_up([3, 6, 1, 2]) */
  list_grade_up = (list: Whateverable, col1?: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_grade_up", args: [list, col1, col2] });
  /** LIST_INDEXOF(LIST: ANY[], ELEMENT: ANY): NUMERIC - Returns the index of the element if the list contains the element. If the element is not found, it returns NULL., eg: list_position([1, 2, NULL], 2) */
  list_indexof = (list: Whateverable, element: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_indexof", args: [list, element] });
  /** STRING_SPLIT(STR: VARCHAR, SEPARATOR: VARCHAR): WHATEVER - Splits the string along the separator, eg: string_split('hello-world', '-') */
  string_split = (str: Stringable, separator: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "string_split", args: [str, separator] });
  /** LIST_NEGATIVE_INNER_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the negative inner product between two lists, eg: list_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  list_negative_inner_product = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_negative_inner_product", args: [list1, list2] });
  /** LIST_RESIZE(LIST: ANY[], SIZE: ANY, VALUE: ANY): WHATEVER - Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set., eg: list_resize([1, 2, 3], 5, 0) */
  list_resize = (list: Whateverable, size: Whateverable, value?: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_resize", args: [list, size, value] });
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
  /** REGEXP_REPLACE(STR: VARCHAR, PATTERN: VARCHAR, REPLACEMENT: VARCHAR, OPTIONS: VARCHAR): VARCHAR - If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set., eg: regexp_replace('hello', '[lo]', '-') */
  regexp_replace = (str: Stringable, pattern: Stringable, replacement: Stringable, options?: Stringable): StringField =>
    new StringFieldImpl("").withOperation({ field: "", method: "regexp_replace", args: [str, pattern, replacement, options] });
  /** REGEXP_SPLIT_TO_ARRAY(STR: VARCHAR, SEPARATOR: VARCHAR, COL2: VARCHAR): WHATEVER - Splits the string along the regex, eg: string_split_regex('hello␣world; 42', ';?␣') */
  regexp_split_to_array = (str: Stringable, separator: Stringable, col2?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "regexp_split_to_array", args: [str, separator, col2] });
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
  /** ISINF(X: DATE): WHATEVER - Returns true if the floating point value is infinite, false otherwise, eg: isinf('Infinity'::float) */
  isinf = (x: Whateverable | Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "isinf", args: [x] });
  /** JARO_SIMILARITY(STR1: VARCHAR, STR2: VARCHAR, SCORECUTOFF: DOUBLE): NUMERIC - The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1, eg: jaro_similarity('duck', 'duckdb', 0.5) */
  jaro_similarity = (str1: Stringable, str2: Stringable, scoreCutoff?: Numericable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "jaro_similarity", args: [str1, str2, scoreCutoff] });
  /** TO_CENTURIES(INTEGER: INTEGER): WHATEVER - Construct a century interval, eg: to_centuries(5) */
  to_centuries = (integer: Numericable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "to_centuries", args: [integer] });
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
  /** SUBSTR(STR: VARCHAR, START: BIGINT, LENGTH: BIGINT): VARCHAR - Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string., eg: substring('Hello', 2, 2) */
  substr = (str: Stringable, start: Numericable, length?: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "substr", args: [str, start, length] });
  /** LIST_CAT(LIST1: ANY[], LIST2: ANY[]): WHATEVER - Concatenates two lists., eg: list_concat([2, 3], [4, 5, 6]) */
  list_cat = (list1: Whateverable, list2: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_cat", args: [list1, list2] });
  /** LIST_REDUCE(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list., eg: list_reduce([1, 2, 3], (x, y) -> x + y) */
  list_reduce = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_reduce", args: [list, lambda] });
  /** LIST_HAS_ALL(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if all elements of l2 are in l1. NULLs are ignored., eg: list_has_all([1, 2, 3], [2, 3]) */
  list_has_all = (l1: Whateverable, p1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_has_all", args: [l1, p1] });
  /** LIST_REVERSE_SORT(LIST: ANY[], COL1: VARCHAR): WHATEVER - Sorts the elements of the list in reverse order, eg: list_reverse_sort([3, 6, 1, 2]) */
  list_reverse_sort = (list: Whateverable, col1?: Stringable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_reverse_sort", args: [list, col1] });
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
  /** DATE_TRUNC(PART: VARCHAR, TIMESTAMP: DATE): WHATEVER - Truncate to specified precision, eg: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40') */
  date_trunc = (part: Stringable, timestamp: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "date_trunc", args: [part, timestamp] });
  /** FORMAT_BYTES(BYTES: BIGINT): VARCHAR - Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB), eg: format_bytes(1000 * 16) */
  format_bytes = (bytes: Numericable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "format_bytes", args: [bytes] });
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
  /** LEN(STR: BIT): NUMERIC - Number of characters in string., eg: length('Hello🦆') */
  len = (str: Whateverable | Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "len", args: [str] });
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
  /** WEEKDAY(TS: DATE): NUMERIC - Extract the weekday component from a date or timestamp, eg: weekday(timestamp '2021-08-03 11:59:44.123456') */
  weekday = (ts: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "weekday", args: [ts] });
  /** ARRAY_CONTAINS(LIST: ANY[], ELEMENT: ANY): WHATEVER - Returns true if the list contains the element., eg: list_contains([1, 2, NULL], 1) */
  array_contains = (list: Whateverable, element: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_contains", args: [list, element] });
  /** ARRAY_DOT_PRODUCT(ARRAY1: FLOAT[ANY], ARRAY2: FLOAT[ANY]): NUMERIC - Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments., eg: array_inner_product([1, 2, 3], [1, 2, 3]) */
  array_dot_product = (array1: Whateverable, array2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "array_dot_product", args: [array1, array2] });
  /** ARRAY_HAS_ALL(L1: ANY[], P1: ANY[]): WHATEVER - Returns true if all elements of l2 are in l1. NULLs are ignored., eg: list_has_all([1, 2, 3], [2, 3]) */
  array_has_all = (l1: Whateverable, p1: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "array_has_all", args: [l1, p1] });
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
  /** TO_BASE64(BLOB: BLOB): VARCHAR - Convert a blob to a base64 encoded string, eg: base64('A'::blob) */
  to_base64 = (blob: Whateverable): StringField => new StringFieldImpl("").withOperation({ field: "", method: "to_base64", args: [blob] });
  /** JSON_QUOTE(): WHATEVER - , eg: null */
  json_quote = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "json_quote", args: [] });
  /** LAST_DAY(TS: DATE): WHATEVER - Returns the last day of the month, eg: last_day(TIMESTAMP '1992-03-22 01:02:03.1234') */
  last_day = (ts: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "last_day", args: [ts] });
  /** LEVENSHTEIN(STR1: VARCHAR, STR2: VARCHAR): NUMERIC - The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different, eg: levenshtein('duck','db') */
  levenshtein = (str1: Stringable, str2: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "levenshtein", args: [str1, str2] });
  /** LIST_COSINE_SIMILARITY(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the cosine similarity between two lists, eg: list_cosine_similarity([1, 2, 3], [1, 2, 3]) */
  list_cosine_similarity = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_cosine_similarity", args: [list1, list2] });
  /** LIST_FILTER(LIST: ANY[], LAMBDA: LAMBDA): WHATEVER - Constructs a list from those elements of the input list for which the lambda function returns true, eg: list_filter([3, 4, 5], x -> x > 4) */
  list_filter = (list: Whateverable, lambda: Whateverable): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_filter", args: [list, lambda] });
  /** LIST_INNER_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the inner product between two lists, eg: list_inner_product([1, 2, 3], [1, 2, 3]) */
  list_inner_product = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_inner_product", args: [list1, list2] });
  /** STRLEN(STR: VARCHAR): NUMERIC - Number of bytes in string., eg: strlen('🦆') */
  strlen = (str: Stringable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "strlen", args: [str] });
  /** LIST_NEGATIVE_DOT_PRODUCT(LIST1: FLOAT[], LIST2: FLOAT[]): NUMERIC - Compute the negative inner product between two lists, eg: list_negative_inner_product([1, 2, 3], [1, 2, 3]) */
  list_negative_dot_product = (list1: Whateverable, list2: Whateverable): NumericField => new NumericFieldImpl("").withOperation({ field: "", method: "list_negative_dot_product", args: [list1, list2] });
  /** LIST_VALUE(): WHATEVER - Create a LIST containing the argument values, eg: list_value(4, 5, 6) */
  list_value = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "list_value", args: [] });
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
  /** ROW(): WHATEVER - Create an unnamed STRUCT (tuple) containing the argument values., eg: row(i, i % 4, i / 4) */
  row = (): WhateverField => new WhateverFieldImpl("").withOperation({ field: "", method: "row", args: [] });
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
