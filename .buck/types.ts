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
export declare const sComptype: unique symbol;
export declare const sAnti: unique symbol;
export declare const sInferred: unique symbol;
export interface DVarcharField extends DAnyField {
  [sInferred]: string;
  [sComptype]: DVarcharComp;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(index: DNumericable): DVarcharField;
  /**@description Returns an integer that represents the Unicode code point of the first character of the string	@example ascii('Ω')*/
  ascii(): DNumericField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(): DVarcharField;
  bit_length(): DNumericField;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(length: DNumericable): DOtherField;
  /**@description Concatenate strings together separated by the specified separator.	@example concat_ws(', ', 'Banana', 'Apple', 'Melon')*/
  concat_ws(string: DAnyable, ...args: DAnyable[]): DVarcharField;
  /**@description Returns true if search_string is found within string.	@example contains('abc', 'a')*/
  contains(searchString: DVarcharable): DBoolField;
  /**@description Returns the current value of the configuration setting	@example current_setting('access_mode')*/
  current_setting(): DAnyField;
  /**@description Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example currval('my_sequence_name')*/
  currval(): DNumericField;
  /**@description Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example damerau_levenshtein('hello', 'world')*/
  damerau_levenshtein(str2: DVarcharable): DNumericField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_diff(startdate: DOtherable, enddate: DOtherable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(col1: DOtherable): DNumericField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_sub(startdate: DOtherable, enddate: DOtherable): DNumericField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(timestamp: DOtherable): DOtherField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datediff(startdate: DOtherable, enddate: DOtherable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(col1: DOtherable): DNumericField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datesub(startdate: DOtherable, enddate: DOtherable): DNumericField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(timestamp: DOtherable): DOtherField;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  editdist3(str2: DVarcharable): DNumericField;
  /**@description Convert varchar to blob. Converts utf-8 characters into literal encoding	@example encode('my_string_with_ü')*/
  encode(): DOtherField;
  ends_with(col1: DVarcharable): DBoolField;
  /**@description Throws the given error message	@example error('access_mode')*/
  error(): DOtherField;
  /**@description Formats a string using fmt syntax	@example format('Benchmark "{}" took {} seconds', 'CSV', 42)*/
  format(...args: DAnyable[]): DVarcharField;
  /**@description Convert a base64 encoded string to a character string	@example from_base64('QQ==')*/
  from_base64(): DOtherField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  from_binary(): DOtherField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  from_hex(): DOtherField;
  from_json(col1: DVarcharable): DAnyField;
  from_json_strict(col1: DVarcharable): DAnyField;
  getvariable(): DAnyField;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  hamming(str2: DVarcharable): DNumericField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): DVarcharField;
  icu_sort_key(col1: DVarcharable): DVarcharField;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example ilike_escape('A%c', 'a$%C', '$')*/
  ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns whether or not the database/schema are in the search path	@example in_search_path('memory', 'main')*/
  in_search_path(schemaName: DVarcharable): DBoolField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  instr(needle: DVarcharable): DNumericField;
  /**@description The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaccard('duck','luck')*/
  jaccard(str2: DVarcharable): DNumericField;
  /**@description The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_similarity('duck', 'duckdb', 0.5)*/
  jaro_similarity(str2: DVarcharable, scoreCutoff: DNumericable | DOtherable): DNumericField;
  /**@description The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_winkler_similarity('duck', 'duckdb', 0.5)*/
  jaro_winkler_similarity(str2: DVarcharable, scoreCutoff: DNumericable | DOtherable): DNumericField;
  json_array_length(col1: DArrayable): DArrayField;
  json_array_length(col1: DVarcharable | DOtherable): DNumericField;
  json_contains(col1: DVarcharable | DJsonable): DBoolField;
  json_exists(col1: DVarcharable): DBoolField;
  json_exists(col1: DArrayable): DArrayField;
  json_extract(col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col1: DArrayable): DArrayField;
  json_extract_path(col1: DVarcharable | DNumericable): DJsonField;
  json_extract_path(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DVarcharable | DNumericable): DVarcharField;
  json_extract_path_text(col1: DArrayable): DArrayField;
  json_extract_string(col1: DArrayable): DArrayField;
  json_extract_string(col1: DNumericable | DVarcharable): DVarcharField;
  json_keys(col1: DArrayable | DVarcharable | DOtherable): DArrayField;
  json_serialize_plan(col1: DBoolable | DOtherable, col2: DBoolable | DOtherable, col3: DOtherable | DBoolable, col4: DOtherable | DBoolable): DJsonField;
  json_serialize_sql(col1: DOtherable | DBoolable, col2: DOtherable | DBoolable, col3: DOtherable | DBoolable): DJsonField;
  json_structure(): DJsonField;
  json_transform(col1: DVarcharable): DAnyField;
  json_transform_strict(col1: DVarcharable): DAnyField;
  json_type(col1: DVarcharable | DOtherable): DVarcharField;
  json_type(col1: DArrayable): DArrayField;
  json_valid(): DBoolField;
  json_value(col1: DArrayable): DArrayField;
  json_value(col1: DVarcharable | DNumericable): DVarcharField;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lcase(): DVarcharField;
  /**@description Extract the left-most count characters	@example left('Hello🦆', 2)*/
  left(count: DNumericable): DVarcharField;
  /**@description Extract the left-most count grapheme clusters	@example left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  left_grapheme(count: DNumericable): DVarcharField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(): DNumericField;
  /**@description Number of grapheme clusters in string.	@example length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')*/
  length_grapheme(): DNumericField;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  levenshtein(str2: DVarcharable): DNumericField;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example like_escape('a%c', 'a$%c', '$')*/
  like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(index: DNumericable): DVarcharField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(index: DNumericable): DVarcharField;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lower(): DVarcharField;
  /**@description Pads the string with the character from the left until it has count characters	@example lpad('hello', 10, '>')*/
  lpad(count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from the left side of the string	@example ltrim('>>>>test<<', '><')*/
  ltrim(characters: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(): DVarcharField;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(): DNumericField;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  mismatches(str2: DVarcharable): DNumericField;
  /**@description Return the following value of the sequence.	@example nextval('my_sequence_name')*/
  nextval(): DNumericField;
  /**@description Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example nfc_normalize('ardèch')*/
  nfc_normalize(): DVarcharField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_ilike_escape('A%c', 'a$%C', '$')*/
  not_ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_like_escape('a%c', 'a$%c', '$')*/
  not_like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  ord(): DNumericField;
  /**@description Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirname('path/to/file.csv', 'system')*/
  parse_dirname(separator: DVarcharable | DOtherable): DVarcharField;
  /**@description Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirpath('path/to/file.csv', 'system')*/
  parse_dirpath(separator: DVarcharable | DOtherable): DVarcharField;
  /**@description Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example parse_filename('path/to/file.csv', true, 'forward_slash')*/
  parse_filename(trimExtension: DOtherable | DBoolable | DVarcharable, separator: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example parse_path('path/to/file.csv', 'system')*/
  parse_path(separator: DVarcharable | DOtherable): DArrayField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  position(needle: DVarcharable): DNumericField;
  prefix(col1: DVarcharable): DBoolField;
  /**@description Formats a string using printf syntax	@example printf('Benchmark "%s" took %d seconds', 'CSV', 42)*/
  printf(...args: DAnyable[]): DVarcharField;
  /**@description Escapes all potentially meaningful regexp characters in the input string	@example regexp_escape('https://duckdb.org')*/
  regexp_escape(): DVarcharField;
  /**@description If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example regexp_extract('abc', '([a-z])(b)', 1)*/
  regexp_extract(pattern: DVarcharable | RegExpable, group0: DOtherable | DNumericable | DArrayable, options: DOtherable | DVarcharable): DVarcharField;
  /**@description Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example regexp_extract_all('hello_world', '([a-z ]+)_?', 1)*/
  regexp_extract_all(regex: DVarcharable | RegExpable, group0: DNumericable | DOtherable, options: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the entire string matches the regex. A set of optional options can be set.	@example regexp_full_match('anabanana', '(an)*')*/
  regexp_full_match(regex: DVarcharable | RegExpable, options: DOtherable | DVarcharable): DBoolField;
  /**@description Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example regexp_matches('anabanana', '(an)*')*/
  regexp_matches(pattern: DVarcharable | RegExpable, options: DOtherable | DVarcharable): DBoolField;
  /**@description If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example regexp_replace('hello', '[lo]', '-')*/
  regexp_replace(pattern: DVarcharable | RegExpable, replacement: DVarcharable, options: DVarcharable | DOtherable): DVarcharField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  regexp_split_to_array(separator: DVarcharable | RegExpable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(count: DNumericable): DVarcharField;
  /**@description Replaces any occurrences of the source with target in string	@example replace('hello', 'l', '-')*/
  replace(source: DVarcharable, target: DVarcharable): DVarcharField;
  /**@description Reverses the string	@example reverse('hello')*/
  reverse(): DVarcharField;
  /**@description Extract the right-most count characters	@example right('Hello🦆', 3)*/
  right(count: DNumericable): DVarcharField;
  /**@description Extract the right-most count grapheme clusters	@example right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  right_grapheme(count: DNumericable): DVarcharField;
  /**@description Pads the string with the character from the right until it has count characters	@example rpad('hello', 10, '<')*/
  rpad(count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from the right side of the string	@example rtrim('>>>>test<<', '><')*/
  rtrim(characters: DVarcharable | DOtherable): DVarcharField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(): DVarcharField;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(): DVarcharField;
  /**@description Returns true if string begins with search_string	@example starts_with('abc','a')*/
  starts_with(searchString: DVarcharable): DBoolField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  str_split(separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  str_split_regex(separator: DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(format: DOtherable): DVarcharField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_split(separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  string_split_regex(separator: DVarcharable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_to_array(separator: DVarcharable): DArrayField;
  /**@description Strips accents from string.	@example strip_accents('mühleisen')*/
  strip_accents(): DVarcharField;
  /**@description Number of bytes in string.	@example strlen('🦆')*/
  strlen(): DNumericField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  strpos(needle: DVarcharable): DNumericField;
  /**@description Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime.	@example strptime('4/15/2023 10:56:00', ['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S'])*/
  strptime(formatList: DArrayable | DVarcharable): DOtherField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substr(start: DNumericable, length: DOtherable | DNumericable): DVarcharField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substring(start: DNumericable, length: DOtherable | DNumericable): DVarcharField;
  /**@description Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)*/
  substring_grapheme(start: DNumericable, length: DOtherable | DNumericable): DVarcharField;
  suffix(col1: DVarcharable): DBoolField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(col1: DOtherable): DOtherField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): DVarcharField;
  /**@description Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example translate('12345', '143', 'ax')*/
  translate(from: DVarcharable, to: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from either side of the string	@example trim('>>>>test<<', '><')*/
  trim(characters: DOtherable | DVarcharable): DVarcharField;
  /**@description Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  try_strptime(format: DArrayable | DVarcharable): DOtherField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  ucase(): DVarcharField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  unbin(): DOtherField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  unhex(): DOtherField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  unicode(): DNumericField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  upper(): DVarcharField;
  /**@description Unescapes the URL encoded input.	@example url_decode('this%20string%20is%2BFencoded')*/
  url_decode(): DVarcharField;
  /**@description Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example url_encode('this string has/ special+ characters>')*/
  url_encode(): DVarcharField;
  /**@description Writes to the logger	@example write_log('Hello')*/
  write_log(...args: DAnyable[]): DAnyField;
}
export interface DNumericField extends DAnyField {
  [sInferred]: number;
  [sComptype]: DNumericComp;
  /**@description Absolute value	@example abs(-17.4)*/
  abs(): DNumericField;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(): DNumericField;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(): DNumericField;
  add(col1: DNumericable | DOtherable): DNumericField;
  add(col1: DOtherable): DOtherField;
  /**@description Computes the arcsine of x	@example asin(0.5)*/
  asin(): DNumericField;
  /**@description Computes the inverse hyperbolic sin of x	@example asinh(0.5)*/
  asinh(): DNumericField;
  /**@description Computes the arctangent of x	@example atan(0.5)*/
  atan(): DNumericField;
  /**@description Computes the arctangent (y, x)	@example atan2(1.0, 0.0)*/
  atan2(x: DNumericable): DNumericField;
  /**@description Computes the inverse hyperbolic tan of x	@example atanh(0.5)*/
  atanh(): DNumericField;
  /**@description Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example bar(5, 0, 20, 10)*/
  bar(min: DNumericable, max: DNumericable, width: DOtherable | DNumericable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(): DVarcharField;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(): DNumericField;
  /**@description Returns the cube root of x	@example cbrt(8)*/
  cbrt(): DNumericField;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceil(): DNumericField;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceiling(): DNumericField;
  /**@description Returns a character which is corresponding the ASCII code value or Unicode code point	@example chr(65)*/
  chr(): DVarcharField;
  /**@description Computes the cos of x	@example cos(90)*/
  cos(): DNumericField;
  /**@description Computes the hyperbolic cos of x	@example cosh(1)*/
  cosh(): DNumericField;
  /**@description Computes the cotangent of x	@example cot(0.5)*/
  cot(): DNumericField;
  /**@description Converts radians to degrees	@example degrees(pi())*/
  degrees(): DNumericField;
  divide(col1: DNumericable): DNumericField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(): DOtherField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Rounds x to next even number by rounding away from zero	@example even(2.9)*/
  even(): DNumericField;
  /**@description Computes e to the power of x	@example exp(1)*/
  exp(): DNumericField;
  /**@description Factorial of x. Computes the product of the current integer and all integers below it	@example 4!*/
  factorial(): DNumericField;
  /**@description Rounds the number down	@example floor(17.4)*/
  floor(): DNumericField;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example format_bytes(1000 * 16)*/
  formatReadableDecimalSize(): DVarcharField;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  formatReadableSize(): DVarcharField;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  format_bytes(): DVarcharField;
  /**@description Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example gamma(5.5)*/
  gamma(): DNumericField;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  gcd(y: DNumericable): DNumericField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(stop: DOtherable | DNumericable, step: DOtherable | DNumericable): DArrayField;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  greatest_common_divisor(y: DNumericable): DNumericField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): DVarcharField;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(): DBoolField;
  /**@description Returns true if the floating point value is not a number, false otherwise	@example isnan('NaN'::FLOAT)*/
  isnan(): DBoolField;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  lcm(y: DNumericable): DNumericField;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  least_common_multiple(y: DNumericable): DNumericField;
  /**@description Computes the log of the gamma function	@example lgamma(2)*/
  lgamma(): DNumericField;
  /**@description Computes the natural logarithm of x	@example ln(2)*/
  ln(): DNumericField;
  /**@description Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example log(2, 64)*/
  log(x: DOtherable | DNumericable): DNumericField;
  /**@description Computes the 10-log of x	@example log10(1000)*/
  log10(): DNumericField;
  /**@description Computes the 2-log of x	@example log2(8)*/
  log2(): DNumericField;
  make_date(): DOtherField;
  /**@description The date for the given parts	@example make_date(1992, 9, 20)*/
  make_date(month: DNumericable, day: DNumericable): DOtherField;
  /**@description The date for the given struct.	@example make_date({'year': 2024, 'month': 11, 'day': 14})*/
  make_date(): DOtherField;
  /**@description The time for the given parts	@example make_time(13, 34, 27.123456)*/
  make_time(minute: DNumericable, seconds: DNumericable): DOtherField;
  /**@description The timestamp for the given parts	@example make_timestamp(1992, 9, 20, 13, 34, 27.123456)*/
  make_timestamp(month: DOtherable | DNumericable, day: DOtherable | DNumericable, hour: DOtherable | DNumericable, minute: DOtherable | DNumericable, seconds: DOtherable | DNumericable): DOtherField;
  /**@description The timestamp for the given nanoseconds since epoch	@example make_timestamp(1732117793000000000)*/
  make_timestamp_ns(): DOtherField;
  make_timestamptz(col1: DNumericable | DOtherable, col2: DNumericable | DOtherable, col3: DNumericable | DOtherable, col4: DNumericable | DOtherable, col5: DNumericable | DOtherable, col6: DOtherable | DVarcharable): DOtherField;
  mod(col1: DNumericable): DNumericField;
  multiply(col1: DNumericable): DNumericField;
  multiply(col1: DOtherable): DOtherField;
  /**@description Returns the next floating point value after x in the direction of y	@example nextafter(1::float, 2::float)*/
  nextafter(y: DNumericable): DNumericField;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  pow(y: DNumericable): DNumericField;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  power(y: DNumericable): DNumericField;
  /**@description Converts degrees to radians	@example radians(90)*/
  radians(): DNumericField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(stop: DNumericable | DOtherable, step: DOtherable | DNumericable): DArrayField;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(precision: DNumericable | DOtherable): DNumericField;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(precision: DOtherable | DNumericable): DNumericField;
  /**@description Sets the seed to be used for the random function	@example setseed(0.42)*/
  setseed(): DOtherField;
  /**@description Returns the sign of x as -1, 0 or 1	@example sign(-349)*/
  sign(): DNumericField;
  /**@description Returns whether the signbit is set or not	@example signbit(-0.0)*/
  signbit(): DBoolField;
  /**@description Computes the sin of x	@example sin(90)*/
  sin(): DNumericField;
  /**@description Computes the hyperbolic sin of x	@example sinh(1)*/
  sinh(): DNumericField;
  /**@description Returns the square root of x	@example sqrt(4)*/
  sqrt(): DNumericField;
  subtract(col1: DNumericable | DOtherable): DNumericField;
  subtract(col1: DOtherable | DNumericable): DNumericField;
  /**@description Computes the tan of x	@example tan(90)*/
  tan(): DNumericField;
  /**@description Computes the hyperbolic tan of x	@example tanh(1)*/
  tanh(): DNumericField;
  /**@description Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example to_base(42, 16)*/
  to_base(radix: DNumericable, minLength: DOtherable | DNumericable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(): DVarcharField;
  /**@description Construct a century interval	@example to_centuries(5)*/
  to_centuries(): DOtherField;
  /**@description Construct a day interval	@example to_days(5)*/
  to_days(): DOtherField;
  /**@description Construct a decade interval	@example to_decades(5)*/
  to_decades(): DOtherField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): DVarcharField;
  /**@description Construct a hour interval	@example to_hours(5)*/
  to_hours(): DOtherField;
  /**@description Construct a microsecond interval	@example to_microseconds(5)*/
  to_microseconds(): DOtherField;
  /**@description Construct a millenium interval	@example to_millennia(1)*/
  to_millennia(): DOtherField;
  /**@description Construct a millisecond interval	@example to_milliseconds(5.5)*/
  to_milliseconds(): DOtherField;
  /**@description Construct a minute interval	@example to_minutes(5)*/
  to_minutes(): DOtherField;
  /**@description Construct a month interval	@example to_months(5)*/
  to_months(): DOtherField;
  /**@description Construct a quarter interval	@example to_quarters(5)*/
  to_quarters(): DOtherField;
  /**@description Construct a second interval	@example to_seconds(5.5)*/
  to_seconds(): DOtherField;
  /**@description Converts secs since epoch to a timestamp with time zone	@example to_timestamp(1284352323.5)*/
  to_timestamp(): DOtherField;
  /**@description Construct a week interval	@example to_weeks(5)*/
  to_weeks(): DOtherField;
  /**@description Construct a year interval	@example to_years(5)*/
  to_years(): DOtherField;
  /**@description Truncates the number	@example trunc(17.4)*/
  trunc(): DNumericField;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(right: DNumericable): DNumericField;
}
export interface DOtherField extends DAnyField {
  [sInferred]: any;
  [sComptype]: any;
  add(col1: DOtherable): DOtherField;
  add(col1: DOtherable | DNumericable): DOtherField;
  /**@description Subtract arguments, resulting in the time difference between the two timestamps	@example age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')*/
  age(timestamp__01: DOtherable): DOtherField;
  array_to_json(): DJsonField;
  /**@description Create an ARRAY containing the argument values.	@example array_value(4, 5, 6)*/
  array_value(): DArrayField;
  /**@description Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example list_zip([1, 2], [3, 4], [5, 6])*/
  array_zip(): DArrayField;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  base64(): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(): DVarcharField;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(): DNumericField;
  bit_length(): DNumericField;
  /**@description Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1	@example bit_position('010'::BIT, '1110101'::BIT)*/
  bit_position(bitstring: DOtherable): DNumericField;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(length: DNumericable): DOtherField;
  /**@description Extract the century component from a date or timestamp	@example century(timestamp '2021-08-03 11:59:44.123456')*/
  century(): DNumericField;
  combine(col1: DAnyable): DOtherField;
  /**@description Returns the name of the currently active database	@example current_database()*/
  current_database(): DVarcharField;
  current_date(): DOtherField;
  current_localtime(): DOtherField;
  current_localtimestamp(): DOtherField;
  /**@description Returns the current query as a string	@example current_query()*/
  current_query(): DVarcharField;
  /**@description Returns the name of the currently active schema. Default is main	@example current_schema()*/
  current_schema(): DVarcharField;
  /**@description Extract the day component from a date or timestamp	@example day(timestamp '2021-08-03 11:59:44.123456')*/
  day(): DNumericField;
  /**@description The (English) name of the weekday	@example dayname(TIMESTAMP '1992-03-22')*/
  dayname(): DVarcharField;
  /**@description Extract the dayofmonth component from a date or timestamp	@example dayofmonth(timestamp '2021-08-03 11:59:44.123456')*/
  dayofmonth(): DNumericField;
  /**@description Extract the dayofweek component from a date or timestamp	@example dayofweek(timestamp '2021-08-03 11:59:44.123456')*/
  dayofweek(): DNumericField;
  /**@description Extract the dayofyear component from a date or timestamp	@example dayofyear(timestamp '2021-08-03 11:59:44.123456')*/
  dayofyear(): DNumericField;
  /**@description Extract the decade component from a date or timestamp	@example decade(timestamp '2021-08-03 11:59:44.123456')*/
  decade(): DNumericField;
  /**@description Convert blob to varchar. Fails if blob is not valid utf-8	@example decode('\xC3\xBC'::BLOB)*/
  decode(): DVarcharField;
  /**@description Extract the epoch component from a temporal type	@example epoch(timestamp '2021-08-03 11:59:44.123456')*/
  epoch(): DNumericField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(): DNumericField;
  /**@description Extract the epoch component in nanoseconds from a temporal type	@example epoch_ns(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ns(): DNumericField;
  /**@description Extract the epoch component in microseconds from a temporal type	@example epoch_us(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_us(): DNumericField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(max: DOtherable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Extract the era component from a date or timestamp	@example era(timestamp '2021-08-03 11:59:44.123456')*/
  era(): DNumericField;
  finalize(): DOtherField;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  gen_random_uuid(): DOtherField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(stop: DOtherable, step: DOtherable): DArrayField;
  /**@description Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0	@example get_bit('0110010'::BIT, 2)*/
  get_bit(index: DNumericable): DNumericField;
  get_current_time(): DOtherField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  get_current_timestamp(): DOtherField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): DVarcharField;
  /**@description Extract the hour component from a date or timestamp	@example hour(timestamp '2021-08-03 11:59:44.123456')*/
  hour(): DNumericField;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(): DBoolField;
  /**@description Extract the isodow component from a date or timestamp	@example isodow(timestamp '2021-08-03 11:59:44.123456')*/
  isodow(): DNumericField;
  /**@description Extract the isoyear component from a date or timestamp	@example isoyear(timestamp '2021-08-03 11:59:44.123456')*/
  isoyear(): DNumericField;
  json_array(): DJsonField;
  json_merge_patch(): DJsonField;
  json_object(): DJsonField;
  json_quote(): DJsonField;
  /**@description Extract the Julian Day number from a date or timestamp	@example julian(timestamp '2006-01-01 12:00')*/
  julian(): DNumericField;
  /**@description Returns the last day of the month	@example last_day(TIMESTAMP '1992-03-22 01:02:03.1234')*/
  last_day(): DOtherField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(): DNumericField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  length(): DNumericField;
  /**@description Create a LIST containing the argument values	@example list_value(4, 5, 6)*/
  list_pack(): DArrayField;
  /**@description Create a LIST containing the argument values	@example list_value(4, 5, 6)*/
  list_value(): DArrayField;
  /**@description Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example list_zip([1, 2], [3, 4], [5, 6])*/
  list_zip(): DArrayField;
  /**@description Creates a map from a set of keys and values	@example map(['key1', 'key2'], ['val1', 'val2'])*/
  map(): DMapField;
  /**@description Returns a map created from merging the input maps, on key collision the value is taken from the last map with that key	@example map_concat(map([1,2], ['a', 'b']), map([2,3], ['c', 'd']));*/
  map_concat(): DArrayField;
  /**@description Returns the map entries as a list of keys/values	@example map_entries(map(['key'], ['val']))*/
  map_entries(): DArrayField;
  /**@description Returns a map created from the entries of the array	@example map_from_entries([{k: 5, v: 'val1'}, {k: 3, v: 'val2'}]);*/
  map_from_entries(): DMapField;
  /**@description Returns the keys of a map as a list	@example map_keys(map(['key'], ['val']))*/
  map_keys(): DArrayField;
  /**@description Returns the values of a map as a list	@example map_values(map(['key'], ['val']))*/
  map_values(): DArrayField;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(): DVarcharField;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(): DNumericField;
  /**@description Extract the microsecond component from a date or timestamp	@example microsecond(timestamp '2021-08-03 11:59:44.123456')*/
  microsecond(): DNumericField;
  /**@description Extract the millennium component from a date or timestamp	@example millennium(timestamp '2021-08-03 11:59:44.123456')*/
  millennium(): DNumericField;
  /**@description Extract the millisecond component from a date or timestamp	@example millisecond(timestamp '2021-08-03 11:59:44.123456')*/
  millisecond(): DNumericField;
  /**@description Extract the minute component from a date or timestamp	@example minute(timestamp '2021-08-03 11:59:44.123456')*/
  minute(): DNumericField;
  /**@description Extract the month component from a date or timestamp	@example month(timestamp '2021-08-03 11:59:44.123456')*/
  month(): DNumericField;
  /**@description The (English) name of the month	@example monthname(TIMESTAMP '1992-09-20')*/
  monthname(): DVarcharField;
  multiply(col1: DNumericable): DOtherField;
  /**@description Extract the nanosecond component from a date or timestamp	@example nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789*/
  nanosecond(): DNumericField;
  /**@description Normalizes an INTERVAL to an equivalent interval	@example normalized_interval(INTERVAL '30 days')*/
  normalized_interval(): DOtherField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  now(): DOtherField;
  /**@description Number of bytes in blob.	@example octet_length('\xAA\xBB'::BLOB)*/
  octet_length(): DNumericField;
  /**@description Returns the value of pi	@example pi()*/
  pi(): DNumericField;
  /**@description Extract the quarter component from a date or timestamp	@example quarter(timestamp '2021-08-03 11:59:44.123456')*/
  quarter(): DNumericField;
  /**@description Returns a random number between 0 and 1	@example random()*/
  random(): DNumericField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(stop: DOtherable, step: DOtherable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(count: DNumericable): DOtherField;
  /**@description Create an unnamed STRUCT (tuple) containing the argument values.	@example row(i, i % 4, i / 4)*/
  row(): DStructField;
  row_to_json(): DJsonField;
  /**@description Extract the second component from a date or timestamp	@example second(timestamp '2021-08-03 11:59:44.123456')*/
  second(): DNumericField;
  /**@description Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring	@example set_bit('0110010'::BIT, 2, 0)*/
  set_bit(index: DNumericable, newValue: DNumericable): DOtherField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(): DVarcharField;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(): DVarcharField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(format: DVarcharable): DVarcharField;
  /**@description Merge the multiple STRUCTs into a single STRUCT.	@example struct_concat(struct_pack(i := 4), struct_pack(s := 'string'))*/
  struct_concat(): DStructField;
  /**@description Adds field(s)/value(s) to an existing STRUCT with the argument values. The entry name(s) will be the bound variable name(s)	@example struct_insert({'a': 1}, b := 2)*/
  struct_insert(): DStructField;
  /**@description Create a STRUCT containing the argument values. The entry name will be the bound variable name.	@example struct_pack(i := 4, s := 'string')*/
  struct_pack(): DStructField;
  subtract(col1: DOtherable): DOtherField;
  subtract(col1: DOtherable | DNumericable): DOtherField;
  subtract(col1: DOtherable): DNumericField;
  /**@description Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets	@example time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07')*/
  time_bucket(timestamp: DOtherable, origin: DOtherable | DVarcharable): DOtherField;
  /**@description Converts a TIME WITH TIME ZONE to an integer sort key	@example timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)*/
  timetz_byte_comparable(): DNumericField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(): DNumericField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(col1: DOtherable): DOtherField;
  /**@description Extract the timezone_hour component from a date or timestamp	@example timezone_hour(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_hour(): DNumericField;
  /**@description Extract the timezone_minute component from a date or timestamp	@example timezone_minute(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_minute(): DNumericField;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  to_base64(): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): DVarcharField;
  to_json(): DJsonField;
  today(): DOtherField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  transaction_timestamp(): DOtherField;
  /**@description Returns the current transaction’s ID (a BIGINT). It will assign a new one if the current transaction does not have one already	@example txid_current()*/
  txid_current(): DNumericField;
  /**@description Extract the value with the named tags from the union. NULL if the tag is not currently selected	@example union_extract(s, 'k')*/
  union_extract(tag: DVarcharable): DAnyField;
  /**@description Retrieve the currently selected tag of the union as an ENUM	@example union_tag(union_value(k := 'foo'))*/
  union_tag(): DAnyField;
  /**@description Create a single member UNION containing the argument value. The tag of the value will be the bound variable name	@example union_value(k := 'hello')*/
  union_value(): DOtherField;
  /**@description Identical to list_value, but generated as part of unpivot for better error messages	@example unpivot_list(4, 5, 6)*/
  unpivot_list(): DArrayField;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  uuid(): DOtherField;
  /**@description Returns the currently active version of DuckDB in this format: v0.3.2		@example version()*/
  version(): DVarcharField;
  /**@description Extract the week component from a date or timestamp	@example week(timestamp '2021-08-03 11:59:44.123456')*/
  week(): DNumericField;
  /**@description Extract the weekday component from a date or timestamp	@example weekday(timestamp '2021-08-03 11:59:44.123456')*/
  weekday(): DNumericField;
  /**@description Extract the weekofyear component from a date or timestamp	@example weekofyear(timestamp '2021-08-03 11:59:44.123456')*/
  weekofyear(): DNumericField;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(right: DOtherable): DOtherField;
  /**@description Extract the year component from a date or timestamp	@example year(timestamp '2021-08-03 11:59:44.123456')*/
  year(): DNumericField;
  /**@description Extract the yearweek component from a date or timestamp	@example yearweek(timestamp '2021-08-03 11:59:44.123456')*/
  yearweek(): DNumericField;
}
export interface DArrayField extends DAnyField {
  [sInferred]: any[];
  [sComptype]: any[];
  add(col1: DArrayable): DArrayField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  aggregate(name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  apply(lambda: DOtherable): DArrayField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  array_aggr(name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  array_aggregate(name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  array_apply(lambda: DOtherable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  array_cat(list2: DArrayable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  array_concat(list2: DArrayable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  array_contains(element: DAnyable): DBoolField;
  /**@description Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_cosine_distance([1, 2, 3], [1, 2, 3])*/
  array_cosine_distance(arr2: DArrayable): DNumericField;
  /**@description Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_cosine_similarity([1, 2, 3], [1, 2, 3])*/
  array_cosine_similarity(arr2: DArrayable): DNumericField;
  /**@description Compute the cross product of two arrays of size 3. The array elements can not be NULL.	@example array_cross_product([1, 2, 3], [1, 2, 3])*/
  array_cross_product(arr__01: DArrayable): DArrayField;
  /**@description Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_distance([1, 2, 3], [1, 2, 3])*/
  array_distance(arr2: DArrayable): DNumericField;
  /**@description Removes all duplicates and NULLs from a list. Does not preserve the original order	@example list_distinct([1, 1, NULL, -3, 1, 5])*/
  array_distinct(): DArrayField;
  /**@description Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_inner_product([1, 2, 3], [1, 2, 3])*/
  array_dot_product(arr2: DArrayable): DNumericField;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(index: DNumericable): DAnyField;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  array_filter(lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  array_grade_up(col1: DOtherable | DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  array_has(element: DAnyable): DBoolField;
  /**@description Returns true if all elements of l2 are in l1. NULLs are ignored.	@example list_has_all([1, 2, 3], [2, 3])*/
  array_has_all(l2: DArrayable): DBoolField;
  /**@description Returns true if the lists have any element in common. NULLs are ignored.	@example list_has_any([1, 2, 3], [2, 3, 4])*/
  array_has_any(l2: DArrayable): DBoolField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_indexof(element: DAnyable): DNumericField;
  /**@description Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_inner_product([1, 2, 3], [1, 2, 3])*/
  array_inner_product(arr2: DArrayable): DNumericField;
  /**@description Returns the length of the list.	@example array_length([1,2,3])*/
  array_length(col1: DOtherable | DNumericable): DNumericField;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_dot_product(arr2: DArrayable): DNumericField;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_inner_product(arr2: DArrayable): DNumericField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_position(element: DAnyable): DNumericField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  array_reduce(lambda: DOtherable): DAnyField;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  array_resize(size: DAnyable, value: DOtherable | DAnyable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  array_reverse_sort(col1: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  array_select(indexList: DArrayable): DArrayField;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  array_sort(col1: DOtherable | DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  array_transform(lambda: DOtherable): DArrayField;
  /**@description Counts the unique elements of a list	@example list_unique([1, 1, NULL, -3, 1, 5])*/
  array_unique(): DNumericField;
  /**@description Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example list_where([10, 20, 30, 40], [true, false, false, true])*/
  array_where(maskList: DArrayable): DArrayField;
  /**@description Returns true if the list contains the element.	@example contains([1, 2, NULL], 1)*/
  contains(element: DAnyable): DBoolField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(col1: DOtherable): DStructField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(col1: DOtherable): DStructField;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  filter(lambda: DOtherable): DArrayField;
  /**@description Flatten a nested list by one level	@example flatten([[1, 2, 3], [4, 5]])*/
  flatten(): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  grade_up(col1: DVarcharable | DOtherable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(): DNumericField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  length(): DNumericField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  list_aggr(name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  list_aggregate(name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  list_apply(lambda: DOtherable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  list_cat(list2: DArrayable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  list_concat(list2: DArrayable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  list_contains(element: DAnyable): DBoolField;
  /**@description Compute the cosine distance between two lists	@example list_cosine_distance([1, 2, 3], [1, 2, 3])*/
  list_cosine_distance(list2: DArrayable): DNumericField;
  /**@description Compute the cosine similarity between two lists	@example list_cosine_similarity([1, 2, 3], [1, 2, 3])*/
  list_cosine_similarity(list2: DArrayable): DNumericField;
  /**@description Compute the distance between two lists	@example list_distance([1, 2, 3], [1, 2, 3])*/
  list_distance(list2: DArrayable): DNumericField;
  /**@description Removes all duplicates and NULLs from a list. Does not preserve the original order	@example list_distinct([1, 1, NULL, -3, 1, 5])*/
  list_distinct(): DArrayField;
  /**@description Compute the inner product between two lists	@example list_inner_product([1, 2, 3], [1, 2, 3])*/
  list_dot_product(list2: DArrayable): DNumericField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(index: DNumericable): DAnyField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(index: DNumericable): DAnyField;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  list_filter(lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  list_grade_up(col1: DVarcharable | DOtherable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  list_has(element: DAnyable): DBoolField;
  /**@description Returns true if all elements of l2 are in l1. NULLs are ignored.	@example list_has_all([1, 2, 3], [2, 3])*/
  list_has_all(l2: DArrayable): DBoolField;
  /**@description Returns true if the lists have any element in common. NULLs are ignored.	@example list_has_any([1, 2, 3], [2, 3, 4])*/
  list_has_any(l2: DArrayable): DBoolField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  list_indexof(element: DAnyable): DNumericField;
  /**@description Compute the inner product between two lists	@example list_inner_product([1, 2, 3], [1, 2, 3])*/
  list_inner_product(list2: DArrayable): DNumericField;
  /**@description Compute the negative inner product between two lists	@example list_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  list_negative_dot_product(list2: DArrayable): DNumericField;
  /**@description Compute the negative inner product between two lists	@example list_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  list_negative_inner_product(list2: DArrayable): DNumericField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  list_position(element: DAnyable): DNumericField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  list_reduce(lambda: DOtherable): DAnyField;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  list_resize(size: DAnyable, value: DOtherable | DAnyable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  list_reverse_sort(col1: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  list_select(indexList: DArrayable): DArrayField;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  list_sort(col1: DVarcharable | DOtherable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  list_transform(lambda: DOtherable): DArrayField;
  /**@description Counts the unique elements of a list	@example list_unique([1, 1, NULL, -3, 1, 5])*/
  list_unique(): DNumericField;
  /**@description Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example list_where([10, 20, 30, 40], [true, false, false, true])*/
  list_where(maskList: DArrayable): DArrayField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  reduce(lambda: DOtherable): DAnyField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(count: DNumericable): DArrayField;
}
export interface DAnyField {
  [sInferred]: any;
  [sComptype]: any;
  /**@description Returns the name of a given expression	@example alias(42 + 1)*/
  alias(): DVarcharField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  array_slice(begin: DAnyable, end: DAnyable, step: DOtherable | DNumericable): DAnyField;
  /**@description Whether or not we can implicitly cast from the source type to the other type	@example can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)*/
  can_cast_implicitly(targetType: DAnyable): DBoolField;
  /**@description Returns the size of the map (or the number of entries in the map)	@example cardinality( map([4, 2], ['a', 'b']) );*/
  cardinality(...args: DAnyable[]): DNumericField;
  /**@description Concatenate many strings together.	@example concat('Hello', ' ', 'World')*/
  concat(...args: DAnyable[]): DVarcharField;
  /**@description If arg2 is NULL, return NULL. Otherwise, return arg1.	@example constant_or_null(42, NULL)*/
  constant_or_null(arg2: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example create_sort_key('A', 'DESC')*/
  create_sort_key(...args: DAnyable[]): DOtherField;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  element_at(key: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Returns the numeric value backing the given enum value	@example enum_code('happy'::mood)*/
  enum_code(): DAnyField;
  /**@description Returns the first value of the input enum type	@example enum_first(NULL::mood)*/
  enum_first(): DVarcharField;
  /**@description Returns the last value of the input enum type	@example enum_last(NULL::mood)*/
  enum_last(): DVarcharField;
  /**@description Returns all values of the input enum type as an array	@example enum_range(NULL::mood)*/
  enum_range(): DArrayField;
  /**@description Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example enum_range_boundary(NULL, 'happy'::mood)*/
  enum_range_boundary(end: DAnyable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Returns the highest value of the set of input parameters	@example greatest(42, 84)*/
  greatest(...args: DAnyable[]): DAnyField;
  /**@description Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example hash('🦆')*/
  hash(...args: DAnyable[]): DNumericField;
  /**@description Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example is_histogram_other_bin(v)*/
  is_histogram_other_bin(): DBoolField;
  /**@description Returns the lowest value of the set of input parameters	@example least(42, 84)*/
  least(...args: DAnyable[]): DAnyField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  list_slice(begin: DAnyable, end: DAnyable, step: DNumericable | DOtherable): DAnyField;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  map_extract(key: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract_value(map(['key'], ['val']), 'key')*/
  map_extract_value(key: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example stats(5)*/
  stats(): DVarcharField;
  /**@description Returns the name of the data type of the result of the expression	@example typeof('abc')*/
  typeof(): DVarcharField;
  /**@description Returns the VectorType of a given column	@example vector_type(col)*/
  vector_type(): DVarcharField;
}
export interface DStructField extends DAnyField {
  [sInferred]: Record<string, any>;
  [sComptype]: Record<string, any>;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(index: DVarcharable | DNumericable): DAnyField;
  /**@description Extract the named entry from the STRUCT.	@example struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i')*/
  struct_extract(entry: DNumericable | DVarcharable): DAnyField;
  /**@description Extract the entry from the STRUCT by position (starts at 1!).	@example struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2)*/
  struct_extract_at(entry: DNumericable): DAnyField;
}
export interface DMapField extends DAnyField {
  [sInferred]: Map<string, any>;
  [sComptype]: Map<string, any>;
  /**@description Checks if a map contains a given key.	@example contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  contains(key: DAnyable): DBoolField;
  /**@description Checks if a map contains a given key.	@example map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  map_contains(key: DAnyable): DBoolField;
}
export interface DBoolField extends DAnyField {
  [sInferred]: boolean;
  [sComptype]: boolean;
}
export interface DJsonField extends DAnyField {
  [sInferred]: Record<string, any>;
  [sComptype]: Record<string, any>;
  from_json(col1: DVarcharable): DAnyField;
  from_json_strict(col1: DVarcharable): DAnyField;
  json_array_length(col1: DArrayable): DArrayField;
  json_array_length(col1: DVarcharable | DOtherable): DNumericField;
  json_contains(col1: DJsonable | DVarcharable): DBoolField;
  json_deserialize_sql(): DVarcharField;
  json_exists(col1: DVarcharable): DBoolField;
  json_exists(col1: DArrayable): DArrayField;
  json_extract(col1: DArrayable): DArrayField;
  json_extract(col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_path_text(col1: DArrayable): DArrayField;
  json_extract_string(col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_string(col1: DArrayable): DArrayField;
  json_keys(col1: DOtherable | DVarcharable | DArrayable): DArrayField;
  json_pretty(): DVarcharField;
  json_structure(): DJsonField;
  json_transform(col1: DVarcharable): DAnyField;
  json_transform_strict(col1: DVarcharable): DAnyField;
  json_type(col1: DArrayable): DArrayField;
  json_type(col1: DVarcharable | DOtherable): DVarcharField;
  json_valid(): DBoolField;
  json_value(col1: DNumericable | DVarcharable): DVarcharField;
  json_value(col1: DArrayable): DArrayField;
}
export interface DGlobalField {
  [sComptype]: undefined;
  /**@description Absolute value	@example abs(-17.4)*/
  abs(x: DNumericable): DNumericField;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(x: DNumericable): DNumericField;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(x: DNumericable): DNumericField;
  add(col0: DOtherable, col1: DOtherable): DOtherField;
  add(col0: DNumericable, col1: DNumericable | DOtherable): DNumericField;
  add(col0: DOtherable, col1: DOtherable | DNumericable): DOtherField;
  add(col0: DNumericable, col1: DOtherable): DOtherField;
  add(col0: DArrayable, col1: DArrayable): DArrayField;
  /**@description Subtract arguments, resulting in the time difference between the two timestamps	@example age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')*/
  age(timestamp: DOtherable, timestamp__01: DOtherable): DOtherField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Returns the name of a given expression	@example alias(42 + 1)*/
  alias(expr: DAnyable): DVarcharField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  apply(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  array_aggr(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  array_aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  array_apply(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  array_cat(list1: DArrayable, list2: DArrayable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  array_concat(list1: DArrayable, list2: DArrayable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  array_contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_cosine_distance([1, 2, 3], [1, 2, 3])*/
  array_cosine_distance(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_cosine_similarity([1, 2, 3], [1, 2, 3])*/
  array_cosine_similarity(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description Compute the cross product of two arrays of size 3. The array elements can not be NULL.	@example array_cross_product([1, 2, 3], [1, 2, 3])*/
  array_cross_product(arr: DArrayable, arr__01: DArrayable): DArrayField;
  /**@description Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_distance([1, 2, 3], [1, 2, 3])*/
  array_distance(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description Removes all duplicates and NULLs from a list. Does not preserve the original order	@example list_distinct([1, 1, NULL, -3, 1, 5])*/
  array_distinct(list: DArrayable): DArrayField;
  /**@description Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_inner_product([1, 2, 3], [1, 2, 3])*/
  array_dot_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DArrayable, index: DNumericable): DAnyField;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DVarcharable, index: DNumericable): DVarcharField;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DStructable, index: DVarcharable | DNumericable): DAnyField;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  array_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  array_grade_up(list: DArrayable, col1: DOtherable | DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  array_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Returns true if all elements of l2 are in l1. NULLs are ignored.	@example list_has_all([1, 2, 3], [2, 3])*/
  array_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns true if the lists have any element in common. NULLs are ignored.	@example list_has_any([1, 2, 3], [2, 3, 4])*/
  array_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_indexof(list: DArrayable, element: DAnyable): DNumericField;
  /**@description Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_inner_product([1, 2, 3], [1, 2, 3])*/
  array_inner_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description Returns the length of the list.	@example array_length([1,2,3])*/
  array_length(list: DArrayable, col1: DOtherable | DNumericable): DNumericField;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_dot_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_inner_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_position(list: DArrayable, element: DAnyable): DNumericField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  array_reduce(list: DArrayable, lambda: DOtherable): DAnyField;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  array_resize(list: DArrayable, size: DAnyable, value: DOtherable | DAnyable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  array_reverse_sort(list: DArrayable, col1: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  array_select(valueList: DArrayable, indexList: DArrayable): DArrayField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  array_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step: DOtherable | DNumericable): DAnyField;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  array_sort(list: DArrayable, col1: DOtherable | DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  array_to_json(...args: DAnyable[]): DJsonField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  array_transform(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Counts the unique elements of a list	@example list_unique([1, 1, NULL, -3, 1, 5])*/
  array_unique(list: DArrayable): DNumericField;
  /**@description Create an ARRAY containing the argument values.	@example array_value(4, 5, 6)*/
  array_value(...args: DAnyable[]): DArrayField;
  /**@description Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example list_where([10, 20, 30, 40], [true, false, false, true])*/
  array_where(valueList: DArrayable, maskList: DArrayable): DArrayField;
  /**@description Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example list_zip([1, 2], [3, 4], [5, 6])*/
  array_zip(...args: DAnyable[]): DArrayField;
  /**@description Returns an integer that represents the Unicode code point of the first character of the string	@example ascii('Ω')*/
  ascii(string: DVarcharable): DNumericField;
  /**@description Computes the arcsine of x	@example asin(0.5)*/
  asin(x: DNumericable): DNumericField;
  /**@description Computes the inverse hyperbolic sin of x	@example asinh(0.5)*/
  asinh(x: DNumericable): DNumericField;
  /**@description Computes the arctangent of x	@example atan(0.5)*/
  atan(x: DNumericable): DNumericField;
  /**@description Computes the arctangent (y, x)	@example atan2(1.0, 0.0)*/
  atan2(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Computes the inverse hyperbolic tan of x	@example atanh(0.5)*/
  atanh(x: DNumericable): DNumericField;
  /**@description Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example bar(5, 0, 20, 10)*/
  bar(x: DNumericable, min: DNumericable, max: DNumericable, width: DOtherable | DNumericable): DVarcharField;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  base64(blob: DOtherable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(value: DNumericable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(value: DVarcharable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(value: DOtherable): DVarcharField;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(x: DNumericable): DNumericField;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(x: DOtherable): DNumericField;
  bit_length(col0: DVarcharable): DNumericField;
  bit_length(col0: DOtherable): DNumericField;
  /**@description Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1	@example bit_position('010'::BIT, '1110101'::BIT)*/
  bit_position(substring: DOtherable, bitstring: DOtherable): DNumericField;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(bitstring: DVarcharable, length: DNumericable): DOtherField;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(bitstring: DOtherable, length: DNumericable): DOtherField;
  /**@description Whether or not we can implicitly cast from the source type to the other type	@example can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)*/
  can_cast_implicitly(sourceType: DAnyable, targetType: DAnyable): DBoolField;
  /**@description Returns the size of the map (or the number of entries in the map)	@example cardinality( map([4, 2], ['a', 'b']) );*/
  cardinality(map: DAnyable, ...args: DAnyable[]): DNumericField;
  /**@description Returns the cube root of x	@example cbrt(8)*/
  cbrt(x: DNumericable): DNumericField;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceil(x: DNumericable): DNumericField;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceiling(x: DNumericable): DNumericField;
  /**@description Extract the century component from a date or timestamp	@example century(timestamp '2021-08-03 11:59:44.123456')*/
  century(ts: DOtherable): DNumericField;
  /**@description Returns a character which is corresponding the ASCII code value or Unicode code point	@example chr(65)*/
  chr(codePoint: DNumericable): DVarcharField;
  combine(col0: DOtherable, col1: DAnyable): DOtherField;
  /**@description Concatenate many strings together.	@example concat('Hello', ' ', 'World')*/
  concat(string: DAnyable, ...args: DAnyable[]): DVarcharField;
  /**@description Concatenate strings together separated by the specified separator.	@example concat_ws(', ', 'Banana', 'Apple', 'Melon')*/
  concat_ws(separator: DVarcharable, string: DAnyable, ...args: DAnyable[]): DVarcharField;
  /**@description If arg2 is NULL, return NULL. Otherwise, return arg1.	@example constant_or_null(42, NULL)*/
  constant_or_null(arg1: DAnyable, arg2: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Checks if a map contains a given key.	@example contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  contains(map: DMapable, key: DAnyable): DBoolField;
  /**@description Returns true if search_string is found within string.	@example contains('abc', 'a')*/
  contains(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description Returns true if the list contains the element.	@example contains([1, 2, NULL], 1)*/
  contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Computes the cos of x	@example cos(90)*/
  cos(x: DNumericable): DNumericField;
  /**@description Computes the hyperbolic cos of x	@example cosh(1)*/
  cosh(x: DNumericable): DNumericField;
  /**@description Computes the cotangent of x	@example cot(0.5)*/
  cot(x: DNumericable): DNumericField;
  /**@description Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example create_sort_key('A', 'DESC')*/
  create_sort_key(parameters: DAnyable, ...args: DAnyable[]): DOtherField;
  /**@description Returns the name of the currently active database	@example current_database()*/
  current_database(): DVarcharField;
  current_date(): DOtherField;
  current_localtime(): DOtherField;
  current_localtimestamp(): DOtherField;
  /**@description Returns the current query as a string	@example current_query()*/
  current_query(): DVarcharField;
  /**@description Returns the name of the currently active schema. Default is main	@example current_schema()*/
  current_schema(): DVarcharField;
  /**@description Returns list of schemas. Pass a parameter of True to include implicit schemas	@example current_schemas(true)*/
  current_schemas(includeImplicit: DBoolable): DArrayField;
  /**@description Returns the current value of the configuration setting	@example current_setting('access_mode')*/
  current_setting(settingName: DVarcharable): DAnyField;
  /**@description Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example currval('my_sequence_name')*/
  currval(sequenceName: DVarcharable): DNumericField;
  /**@description Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example damerau_levenshtein('hello', 'world')*/
  damerau_levenshtein(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_diff(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(ts: DVarcharable, col1: DOtherable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(ts: DArrayable, col1: DOtherable): DStructField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_sub(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): DNumericField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datediff(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(ts: DVarcharable, col1: DOtherable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(ts: DArrayable, col1: DOtherable): DStructField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datesub(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): DNumericField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  /**@description Extract the day component from a date or timestamp	@example day(timestamp '2021-08-03 11:59:44.123456')*/
  day(ts: DOtherable): DNumericField;
  /**@description The (English) name of the weekday	@example dayname(TIMESTAMP '1992-03-22')*/
  dayname(ts: DOtherable): DVarcharField;
  /**@description Extract the dayofmonth component from a date or timestamp	@example dayofmonth(timestamp '2021-08-03 11:59:44.123456')*/
  dayofmonth(ts: DOtherable): DNumericField;
  /**@description Extract the dayofweek component from a date or timestamp	@example dayofweek(timestamp '2021-08-03 11:59:44.123456')*/
  dayofweek(ts: DOtherable): DNumericField;
  /**@description Extract the dayofyear component from a date or timestamp	@example dayofyear(timestamp '2021-08-03 11:59:44.123456')*/
  dayofyear(ts: DOtherable): DNumericField;
  /**@description Extract the decade component from a date or timestamp	@example decade(timestamp '2021-08-03 11:59:44.123456')*/
  decade(ts: DOtherable): DNumericField;
  /**@description Convert blob to varchar. Fails if blob is not valid utf-8	@example decode('\xC3\xBC'::BLOB)*/
  decode(blob: DOtherable): DVarcharField;
  /**@description Converts radians to degrees	@example degrees(pi())*/
  degrees(x: DNumericable): DNumericField;
  divide(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  editdist3(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  element_at(map: DAnyable, key: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Convert varchar to blob. Converts utf-8 characters into literal encoding	@example encode('my_string_with_ü')*/
  encode(string: DVarcharable): DOtherField;
  ends_with(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Returns the numeric value backing the given enum value	@example enum_code('happy'::mood)*/
  enum_code(enm: DAnyable): DAnyField;
  /**@description Returns the first value of the input enum type	@example enum_first(NULL::mood)*/
  enum_first(enm: DAnyable): DVarcharField;
  /**@description Returns the last value of the input enum type	@example enum_last(NULL::mood)*/
  enum_last(enm: DAnyable): DVarcharField;
  /**@description Returns all values of the input enum type as an array	@example enum_range(NULL::mood)*/
  enum_range(enm: DAnyable): DArrayField;
  /**@description Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example enum_range_boundary(NULL, 'happy'::mood)*/
  enum_range_boundary(start: DAnyable, end: DAnyable): DArrayField;
  /**@description Extract the epoch component from a temporal type	@example epoch(timestamp '2021-08-03 11:59:44.123456')*/
  epoch(temporal: DOtherable): DNumericField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DOtherable): DNumericField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DNumericable): DOtherField;
  /**@description Extract the epoch component in nanoseconds from a temporal type	@example epoch_ns(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ns(temporal: DOtherable): DNumericField;
  /**@description Extract the epoch component in microseconds from a temporal type	@example epoch_us(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_us(temporal: DOtherable): DNumericField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DAnyable, max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DOtherable, max: DOtherable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DNumericable, max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Extract the era component from a date or timestamp	@example era(timestamp '2021-08-03 11:59:44.123456')*/
  era(ts: DOtherable): DNumericField;
  /**@description Throws the given error message	@example error('access_mode')*/
  error(message: DVarcharable): DOtherField;
  /**@description Rounds x to next even number by rounding away from zero	@example even(2.9)*/
  even(x: DNumericable): DNumericField;
  /**@description Computes e to the power of x	@example exp(1)*/
  exp(x: DNumericable): DNumericField;
  /**@description Factorial of x. Computes the product of the current integer and all integers below it	@example 4!*/
  factorial(x: DNumericable): DNumericField;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  filter(list: DArrayable, lambda: DOtherable): DArrayField;
  finalize(col0: DOtherable): DOtherField;
  /**@description Flatten a nested list by one level	@example flatten([[1, 2, 3], [4, 5]])*/
  flatten(nestedList: DArrayable): DArrayField;
  /**@description Rounds the number down	@example floor(17.4)*/
  floor(x: DNumericable): DNumericField;
  /**@description Formats a string using fmt syntax	@example format('Benchmark "{}" took {} seconds', 'CSV', 42)*/
  format(format: DVarcharable, ...args: DAnyable[]): DVarcharField;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example format_bytes(1000 * 16)*/
  formatReadableDecimalSize(bytes: DNumericable): DVarcharField;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  formatReadableSize(bytes: DNumericable): DVarcharField;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  format_bytes(bytes: DNumericable): DVarcharField;
  /**@description Convert a base64 encoded string to a character string	@example from_base64('QQ==')*/
  from_base64(string: DVarcharable): DOtherField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  from_binary(value: DVarcharable): DOtherField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  from_hex(value: DVarcharable): DOtherField;
  from_json(col0: DVarcharable, col1: DVarcharable): DAnyField;
  from_json(col0: DJsonable, col1: DVarcharable): DAnyField;
  from_json_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  from_json_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  /**@description Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example gamma(5.5)*/
  gamma(x: DNumericable): DNumericField;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  gcd(x: DNumericable, y: DNumericable): DNumericField;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  gen_random_uuid(): DOtherField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(start: DNumericable, stop: DOtherable | DNumericable, step: DOtherable | DNumericable): DArrayField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(start: DOtherable, stop: DOtherable, step: DOtherable): DArrayField;
  /**@description Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0	@example get_bit('0110010'::BIT, 2)*/
  get_bit(bitstring: DOtherable, index: DNumericable): DNumericField;
  get_current_time(): DOtherField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  get_current_timestamp(): DOtherField;
  getvariable(col0: DVarcharable): DAnyField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  grade_up(list: DArrayable, col1: DVarcharable | DOtherable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Returns the highest value of the set of input parameters	@example greatest(42, 84)*/
  greatest(arg1: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  greatest_common_divisor(x: DNumericable, y: DNumericable): DNumericField;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  hamming(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example hash('🦆')*/
  hash(param: DAnyable, ...args: DAnyable[]): DNumericField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DOtherable): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DNumericable): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DVarcharable): DVarcharField;
  /**@description Extract the hour component from a date or timestamp	@example hour(timestamp '2021-08-03 11:59:44.123456')*/
  hour(ts: DOtherable): DNumericField;
  icu_sort_key(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example ilike_escape('A%c', 'a$%C', '$')*/
  ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns whether or not the database/schema are in the search path	@example in_search_path('memory', 'main')*/
  in_search_path(databaseName: DVarcharable, schemaName: DVarcharable): DBoolField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  instr(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  /**@description Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example is_histogram_other_bin(v)*/
  is_histogram_other_bin(val: DAnyable): DBoolField;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(x: DOtherable): DBoolField;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(x: DNumericable): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(x: DOtherable): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(x: DNumericable): DBoolField;
  /**@description Returns true if the floating point value is not a number, false otherwise	@example isnan('NaN'::FLOAT)*/
  isnan(x: DNumericable): DBoolField;
  /**@description Extract the isodow component from a date or timestamp	@example isodow(timestamp '2021-08-03 11:59:44.123456')*/
  isodow(ts: DOtherable): DNumericField;
  /**@description Extract the isoyear component from a date or timestamp	@example isoyear(timestamp '2021-08-03 11:59:44.123456')*/
  isoyear(ts: DOtherable): DNumericField;
  /**@description The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaccard('duck','luck')*/
  jaccard(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_similarity('duck', 'duckdb', 0.5)*/
  jaro_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff: DNumericable | DOtherable): DNumericField;
  /**@description The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_winkler_similarity('duck', 'duckdb', 0.5)*/
  jaro_winkler_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff: DNumericable | DOtherable): DNumericField;
  json_array(...args: DAnyable[]): DJsonField;
  json_array_length(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_array_length(col0: DJsonable, col1: DArrayable): DArrayField;
  json_array_length(col0: DJsonable, col1: DVarcharable | DOtherable): DNumericField;
  json_array_length(col0: DVarcharable, col1: DVarcharable | DOtherable): DNumericField;
  json_contains(col0: DJsonable, col1: DJsonable | DVarcharable): DBoolField;
  json_contains(col0: DVarcharable, col1: DVarcharable | DJsonable): DBoolField;
  json_deserialize_sql(col0: DJsonable): DVarcharField;
  json_exists(col0: DJsonable, col1: DVarcharable): DBoolField;
  json_exists(col0: DVarcharable, col1: DVarcharable): DBoolField;
  json_exists(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_exists(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DVarcharable, col1: DVarcharable | DNumericable): DJsonField;
  json_extract_path(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DVarcharable, col1: DVarcharable | DNumericable): DVarcharField;
  json_extract_path_text(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DJsonable, col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_path_text(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DVarcharable, col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_string(col0: DJsonable, col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_string(col0: DJsonable, col1: DArrayable): DArrayField;
  json_keys(col0: DVarcharable, col1: DArrayable | DVarcharable | DOtherable): DArrayField;
  json_keys(col0: DJsonable, col1: DOtherable | DVarcharable | DArrayable): DArrayField;
  json_merge_patch(...args: DAnyable[]): DJsonField;
  json_object(...args: DAnyable[]): DJsonField;
  json_pretty(col0: DJsonable): DVarcharField;
  json_quote(...args: DAnyable[]): DJsonField;
  json_serialize_plan(col0: DVarcharable, col1: DBoolable | DOtherable, col2: DBoolable | DOtherable, col3: DOtherable | DBoolable, col4: DOtherable | DBoolable): DJsonField;
  json_serialize_sql(col0: DVarcharable, col1: DOtherable | DBoolable, col2: DOtherable | DBoolable, col3: DOtherable | DBoolable): DJsonField;
  json_structure(col0: DVarcharable): DJsonField;
  json_structure(col0: DJsonable): DJsonField;
  json_transform(col0: DVarcharable, col1: DVarcharable): DAnyField;
  json_transform(col0: DJsonable, col1: DVarcharable): DAnyField;
  json_transform_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  json_transform_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  json_type(col0: DVarcharable, col1: DVarcharable | DOtherable): DVarcharField;
  json_type(col0: DJsonable, col1: DArrayable): DArrayField;
  json_type(col0: DJsonable, col1: DVarcharable | DOtherable): DVarcharField;
  json_type(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_valid(col0: DVarcharable): DBoolField;
  json_valid(col0: DJsonable): DBoolField;
  json_value(col0: DJsonable, col1: DNumericable | DVarcharable): DVarcharField;
  json_value(col0: DJsonable, col1: DArrayable): DArrayField;
  json_value(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_value(col0: DVarcharable, col1: DVarcharable | DNumericable): DVarcharField;
  /**@description Extract the Julian Day number from a date or timestamp	@example julian(timestamp '2006-01-01 12:00')*/
  julian(ts: DOtherable): DNumericField;
  /**@description Returns the last day of the month	@example last_day(TIMESTAMP '1992-03-22 01:02:03.1234')*/
  last_day(ts: DOtherable): DOtherField;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lcase(string: DVarcharable): DVarcharField;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  lcm(x: DNumericable, y: DNumericable): DNumericField;
  /**@description Returns the lowest value of the set of input parameters	@example least(42, 84)*/
  least(arg1: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  least_common_multiple(x: DNumericable, y: DNumericable): DNumericField;
  /**@description Extract the left-most count characters	@example left('Hello🦆', 2)*/
  left(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description Extract the left-most count grapheme clusters	@example left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  left_grapheme(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(string: DArrayable): DNumericField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(string: DOtherable): DNumericField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(string: DVarcharable): DNumericField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  length(string: DArrayable): DNumericField;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  length(string: DOtherable): DNumericField;
  /**@description Number of grapheme clusters in string.	@example length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')*/
  length_grapheme(string: DVarcharable): DNumericField;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  levenshtein(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description Computes the log of the gamma function	@example lgamma(2)*/
  lgamma(x: DNumericable): DNumericField;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example like_escape('a%c', 'a$%c', '$')*/
  like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  list_aggr(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  list_aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  list_apply(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  list_cat(list1: DArrayable, list2: DArrayable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  list_concat(list1: DArrayable, list2: DArrayable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  list_contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Compute the cosine distance between two lists	@example list_cosine_distance([1, 2, 3], [1, 2, 3])*/
  list_cosine_distance(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description Compute the cosine similarity between two lists	@example list_cosine_similarity([1, 2, 3], [1, 2, 3])*/
  list_cosine_similarity(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description Compute the distance between two lists	@example list_distance([1, 2, 3], [1, 2, 3])*/
  list_distance(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description Removes all duplicates and NULLs from a list. Does not preserve the original order	@example list_distinct([1, 1, NULL, -3, 1, 5])*/
  list_distinct(list: DArrayable): DArrayField;
  /**@description Compute the inner product between two lists	@example list_inner_product([1, 2, 3], [1, 2, 3])*/
  list_dot_product(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(list: DVarcharable, index: DNumericable): DVarcharField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(list: DArrayable, index: DNumericable): DAnyField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(list: DVarcharable, index: DNumericable): DVarcharField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(list: DArrayable, index: DNumericable): DAnyField;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  list_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  list_grade_up(list: DArrayable, col1: DVarcharable | DOtherable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  list_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Returns true if all elements of l2 are in l1. NULLs are ignored.	@example list_has_all([1, 2, 3], [2, 3])*/
  list_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns true if the lists have any element in common. NULLs are ignored.	@example list_has_any([1, 2, 3], [2, 3, 4])*/
  list_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  list_indexof(list: DArrayable, element: DAnyable): DNumericField;
  /**@description Compute the inner product between two lists	@example list_inner_product([1, 2, 3], [1, 2, 3])*/
  list_inner_product(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description Compute the negative inner product between two lists	@example list_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  list_negative_dot_product(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description Compute the negative inner product between two lists	@example list_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  list_negative_inner_product(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description Create a LIST containing the argument values	@example list_value(4, 5, 6)*/
  list_pack(...args: DAnyable[]): DArrayField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  list_position(list: DArrayable, element: DAnyable): DNumericField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  list_reduce(list: DArrayable, lambda: DOtherable): DAnyField;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  list_resize(list: DArrayable, size: DAnyable, value: DOtherable | DAnyable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  list_reverse_sort(list: DArrayable, col1: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  list_select(valueList: DArrayable, indexList: DArrayable): DArrayField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  list_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step: DNumericable | DOtherable): DAnyField;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  list_sort(list: DArrayable, col1: DVarcharable | DOtherable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  list_transform(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Counts the unique elements of a list	@example list_unique([1, 1, NULL, -3, 1, 5])*/
  list_unique(list: DArrayable): DNumericField;
  /**@description Create a LIST containing the argument values	@example list_value(4, 5, 6)*/
  list_value(...args: DAnyable[]): DArrayField;
  /**@description Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example list_where([10, 20, 30, 40], [true, false, false, true])*/
  list_where(valueList: DArrayable, maskList: DArrayable): DArrayField;
  /**@description Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example list_zip([1, 2], [3, 4], [5, 6])*/
  list_zip(...args: DAnyable[]): DArrayField;
  /**@description Computes the natural logarithm of x	@example ln(2)*/
  ln(x: DNumericable): DNumericField;
  /**@description Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example log(2, 64)*/
  log(b: DNumericable, x: DOtherable | DNumericable): DNumericField;
  /**@description Computes the 10-log of x	@example log10(1000)*/
  log10(x: DNumericable): DNumericField;
  /**@description Computes the 2-log of x	@example log2(8)*/
  log2(x: DNumericable): DNumericField;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lower(string: DVarcharable): DVarcharField;
  /**@description Pads the string with the character from the left until it has count characters	@example lpad('hello', 10, '>')*/
  lpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from the left side of the string	@example ltrim('>>>>test<<', '><')*/
  ltrim(string: DVarcharable, characters: DOtherable | DVarcharable): DVarcharField;
  make_date(col0: DNumericable): DOtherField;
  /**@description The date for the given parts	@example make_date(1992, 9, 20)*/
  make_date(year: DNumericable, month: DNumericable, day: DNumericable): DOtherField;
  /**@description The date for the given struct.	@example make_date({'year': 2024, 'month': 11, 'day': 14})*/
  make_date(dateStruct: DNumericable): DOtherField;
  /**@description The time for the given parts	@example make_time(13, 34, 27.123456)*/
  make_time(hour: DNumericable, minute: DNumericable, seconds: DNumericable): DOtherField;
  /**@description The timestamp for the given parts	@example make_timestamp(1992, 9, 20, 13, 34, 27.123456)*/
  make_timestamp(year: DNumericable, month: DOtherable | DNumericable, day: DOtherable | DNumericable, hour: DOtherable | DNumericable, minute: DOtherable | DNumericable, seconds: DOtherable | DNumericable): DOtherField;
  /**@description The timestamp for the given nanoseconds since epoch	@example make_timestamp(1732117793000000000)*/
  make_timestamp_ns(nanos: DNumericable): DOtherField;
  make_timestamptz(col0: DNumericable, col1: DNumericable | DOtherable, col2: DNumericable | DOtherable, col3: DNumericable | DOtherable, col4: DNumericable | DOtherable, col5: DNumericable | DOtherable, col6: DOtherable | DVarcharable): DOtherField;
  /**@description Creates a map from a set of keys and values	@example map(['key1', 'key2'], ['val1', 'val2'])*/
  map(...args: DAnyable[]): DMapField;
  /**@description Returns a map created from merging the input maps, on key collision the value is taken from the last map with that key	@example map_concat(map([1,2], ['a', 'b']), map([2,3], ['c', 'd']));*/
  map_concat(...args: DAnyable[]): DArrayField;
  /**@description Checks if a map contains a given key.	@example map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  map_contains(map: DMapable, key: DAnyable): DBoolField;
  /**@description Returns the map entries as a list of keys/values	@example map_entries(map(['key'], ['val']))*/
  map_entries(...args: DAnyable[]): DArrayField;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  map_extract(map: DAnyable, key: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract_value(map(['key'], ['val']), 'key')*/
  map_extract_value(map: DAnyable, key: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Returns a map created from the entries of the array	@example map_from_entries([{k: 5, v: 'val1'}, {k: 3, v: 'val2'}]);*/
  map_from_entries(...args: DAnyable[]): DMapField;
  /**@description Returns the keys of a map as a list	@example map_keys(map(['key'], ['val']))*/
  map_keys(...args: DAnyable[]): DArrayField;
  /**@description Returns the values of a map as a list	@example map_values(map(['key'], ['val']))*/
  map_values(...args: DAnyable[]): DArrayField;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(value: DVarcharable): DVarcharField;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(value: DOtherable): DVarcharField;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(value: DVarcharable): DNumericField;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(value: DOtherable): DNumericField;
  /**@description Extract the microsecond component from a date or timestamp	@example microsecond(timestamp '2021-08-03 11:59:44.123456')*/
  microsecond(ts: DOtherable): DNumericField;
  /**@description Extract the millennium component from a date or timestamp	@example millennium(timestamp '2021-08-03 11:59:44.123456')*/
  millennium(ts: DOtherable): DNumericField;
  /**@description Extract the millisecond component from a date or timestamp	@example millisecond(timestamp '2021-08-03 11:59:44.123456')*/
  millisecond(ts: DOtherable): DNumericField;
  /**@description Extract the minute component from a date or timestamp	@example minute(timestamp '2021-08-03 11:59:44.123456')*/
  minute(ts: DOtherable): DNumericField;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  mismatches(str1: DVarcharable, str2: DVarcharable): DNumericField;
  mod(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@description Extract the month component from a date or timestamp	@example month(timestamp '2021-08-03 11:59:44.123456')*/
  month(ts: DOtherable): DNumericField;
  /**@description The (English) name of the month	@example monthname(TIMESTAMP '1992-09-20')*/
  monthname(ts: DOtherable): DVarcharField;
  multiply(col0: DNumericable, col1: DNumericable): DNumericField;
  multiply(col0: DOtherable, col1: DNumericable): DOtherField;
  multiply(col0: DNumericable, col1: DOtherable): DOtherField;
  /**@description Extract the nanosecond component from a date or timestamp	@example nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789*/
  nanosecond(tsns: DOtherable): DNumericField;
  /**@description Returns the next floating point value after x in the direction of y	@example nextafter(1::float, 2::float)*/
  nextafter(x: DNumericable, y: DNumericable): DNumericField;
  /**@description Return the following value of the sequence.	@example nextval('my_sequence_name')*/
  nextval(sequenceName: DVarcharable): DNumericField;
  /**@description Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example nfc_normalize('ardèch')*/
  nfc_normalize(string: DVarcharable): DVarcharField;
  /**@description Normalizes an INTERVAL to an equivalent interval	@example normalized_interval(INTERVAL '30 days')*/
  normalized_interval(interval: DOtherable): DOtherField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_ilike_escape('A%c', 'a$%C', '$')*/
  not_ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_like_escape('a%c', 'a$%c', '$')*/
  not_like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  now(): DOtherField;
  /**@description Number of bytes in blob.	@example octet_length('\xAA\xBB'::BLOB)*/
  octet_length(blob: DOtherable): DNumericField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  ord(str: DVarcharable): DNumericField;
  /**@description Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirname('path/to/file.csv', 'system')*/
  parse_dirname(string: DVarcharable, separator: DVarcharable | DOtherable): DVarcharField;
  /**@description Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirpath('path/to/file.csv', 'system')*/
  parse_dirpath(string: DVarcharable, separator: DVarcharable | DOtherable): DVarcharField;
  /**@description Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example parse_filename('path/to/file.csv', true, 'forward_slash')*/
  parse_filename(string: DVarcharable, trimExtension: DOtherable | DBoolable | DVarcharable, separator: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example parse_path('path/to/file.csv', 'system')*/
  parse_path(string: DVarcharable, separator: DVarcharable | DOtherable): DArrayField;
  /**@description Returns the value of pi	@example pi()*/
  pi(): DNumericField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  position(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  pow(x: DNumericable, y: DNumericable): DNumericField;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  power(x: DNumericable, y: DNumericable): DNumericField;
  prefix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Formats a string using printf syntax	@example printf('Benchmark "%s" took %d seconds', 'CSV', 42)*/
  printf(format: DVarcharable, ...args: DAnyable[]): DVarcharField;
  /**@description Extract the quarter component from a date or timestamp	@example quarter(timestamp '2021-08-03 11:59:44.123456')*/
  quarter(ts: DOtherable): DNumericField;
  /**@description Converts degrees to radians	@example radians(90)*/
  radians(x: DNumericable): DNumericField;
  /**@description Returns a random number between 0 and 1	@example random()*/
  random(): DNumericField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(start: DNumericable, stop: DNumericable | DOtherable, step: DOtherable | DNumericable): DArrayField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(start: DOtherable, stop: DOtherable, step: DOtherable): DArrayField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  reduce(list: DArrayable, lambda: DOtherable): DAnyField;
  /**@description Escapes all potentially meaningful regexp characters in the input string	@example regexp_escape('https://duckdb.org')*/
  regexp_escape(string: DVarcharable): DVarcharField;
  /**@description If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example regexp_extract('abc', '([a-z])(b)', 1)*/
  regexp_extract(string: DVarcharable, pattern: DVarcharable | RegExpable, group0: DOtherable | DNumericable | DArrayable, options: DOtherable | DVarcharable): DVarcharField;
  /**@description Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example regexp_extract_all('hello_world', '([a-z ]+)_?', 1)*/
  regexp_extract_all(string: DVarcharable, regex: DVarcharable | RegExpable, group0: DNumericable | DOtherable, options: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the entire string matches the regex. A set of optional options can be set.	@example regexp_full_match('anabanana', '(an)*')*/
  regexp_full_match(string: DVarcharable, regex: DVarcharable | RegExpable, options: DOtherable | DVarcharable): DBoolField;
  /**@description Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example regexp_matches('anabanana', '(an)*')*/
  regexp_matches(string: DVarcharable, pattern: DVarcharable | RegExpable, options: DOtherable | DVarcharable): DBoolField;
  /**@description If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example regexp_replace('hello', '[lo]', '-')*/
  regexp_replace(string: DVarcharable, pattern: DVarcharable | RegExpable, replacement: DVarcharable, options: DVarcharable | DOtherable): DVarcharField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  regexp_split_to_array(string: DVarcharable, separator: DVarcharable | RegExpable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DOtherable, count: DNumericable): DOtherField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DArrayable, count: DNumericable): DArrayField;
  /**@description Replaces any occurrences of the source with target in string	@example replace('hello', 'l', '-')*/
  replace(string: DVarcharable, source: DVarcharable, target: DVarcharable): DVarcharField;
  /**@description Reverses the string	@example reverse('hello')*/
  reverse(string: DVarcharable): DVarcharField;
  /**@description Extract the right-most count characters	@example right('Hello🦆', 3)*/
  right(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description Extract the right-most count grapheme clusters	@example right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  right_grapheme(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(x: DNumericable, precision: DNumericable | DOtherable): DNumericField;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(x: DNumericable, precision: DOtherable | DNumericable): DNumericField;
  /**@description Create an unnamed STRUCT (tuple) containing the argument values.	@example row(i, i % 4, i / 4)*/
  row(...args: DAnyable[]): DStructField;
  row_to_json(...args: DAnyable[]): DJsonField;
  /**@description Pads the string with the character from the right until it has count characters	@example rpad('hello', 10, '<')*/
  rpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from the right side of the string	@example rtrim('>>>>test<<', '><')*/
  rtrim(string: DVarcharable, characters: DVarcharable | DOtherable): DVarcharField;
  /**@description Extract the second component from a date or timestamp	@example second(timestamp '2021-08-03 11:59:44.123456')*/
  second(ts: DOtherable): DNumericField;
  /**@description Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring	@example set_bit('0110010'::BIT, 2, 0)*/
  set_bit(bitstring: DOtherable, index: DNumericable, newValue: DNumericable): DOtherField;
  /**@description Sets the seed to be used for the random function	@example setseed(0.42)*/
  setseed(col0: DNumericable): DOtherField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(value: DVarcharable): DVarcharField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(value: DOtherable): DVarcharField;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(value: DVarcharable): DVarcharField;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(value: DOtherable): DVarcharField;
  /**@description Returns the sign of x as -1, 0 or 1	@example sign(-349)*/
  sign(x: DNumericable): DNumericField;
  /**@description Returns whether the signbit is set or not	@example signbit(-0.0)*/
  signbit(x: DNumericable): DBoolField;
  /**@description Computes the sin of x	@example sin(90)*/
  sin(x: DNumericable): DNumericField;
  /**@description Computes the hyperbolic sin of x	@example sinh(1)*/
  sinh(x: DNumericable): DNumericField;
  /**@description Returns the square root of x	@example sqrt(4)*/
  sqrt(x: DNumericable): DNumericField;
  /**@description Returns true if string begins with search_string	@example starts_with('abc','a')*/
  starts_with(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example stats(5)*/
  stats(expression: DAnyable): DVarcharField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  str_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  str_split_regex(string: DVarcharable, separator: DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(data: DOtherable, format: DVarcharable): DVarcharField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(data: DVarcharable, format: DOtherable): DVarcharField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  string_split_regex(string: DVarcharable, separator: DVarcharable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_to_array(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Strips accents from string.	@example strip_accents('mühleisen')*/
  strip_accents(string: DVarcharable): DVarcharField;
  /**@description Number of bytes in string.	@example strlen('🦆')*/
  strlen(string: DVarcharable): DNumericField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  strpos(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  /**@description Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime.	@example strptime('4/15/2023 10:56:00', ['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S'])*/
  strptime(text: DVarcharable, formatList: DArrayable | DVarcharable): DOtherField;
  /**@description Merge the multiple STRUCTs into a single STRUCT.	@example struct_concat(struct_pack(i := 4), struct_pack(s := 'string'))*/
  struct_concat(...args: DAnyable[]): DStructField;
  /**@description Extract the named entry from the STRUCT.	@example struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i')*/
  struct_extract(struct: DStructable, entry: DNumericable | DVarcharable): DAnyField;
  /**@description Extract the entry from the STRUCT by position (starts at 1!).	@example struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2)*/
  struct_extract_at(struct: DStructable, entry: DNumericable): DAnyField;
  /**@description Adds field(s)/value(s) to an existing STRUCT with the argument values. The entry name(s) will be the bound variable name(s)	@example struct_insert({'a': 1}, b := 2)*/
  struct_insert(...args: DAnyable[]): DStructField;
  /**@description Create a STRUCT containing the argument values. The entry name will be the bound variable name.	@example struct_pack(i := 4, s := 'string')*/
  struct_pack(...args: DAnyable[]): DStructField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substr(string: DVarcharable, start: DNumericable, length: DOtherable | DNumericable): DVarcharField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substring(string: DVarcharable, start: DNumericable, length: DOtherable | DNumericable): DVarcharField;
  /**@description Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)*/
  substring_grapheme(string: DVarcharable, start: DNumericable, length: DOtherable | DNumericable): DVarcharField;
  subtract(col0: DNumericable, col1: DNumericable | DOtherable): DNumericField;
  subtract(col0: DNumericable, col1: DOtherable | DNumericable): DNumericField;
  subtract(col0: DOtherable, col1: DOtherable): DOtherField;
  subtract(col0: DOtherable, col1: DOtherable | DNumericable): DOtherField;
  subtract(col0: DOtherable, col1: DOtherable): DNumericField;
  suffix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Computes the tan of x	@example tan(90)*/
  tan(x: DNumericable): DNumericField;
  /**@description Computes the hyperbolic tan of x	@example tanh(1)*/
  tanh(x: DNumericable): DNumericField;
  /**@description Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets	@example time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07')*/
  time_bucket(bucketWidth: DOtherable, timestamp: DOtherable, origin: DOtherable | DVarcharable): DOtherField;
  /**@description Converts a TIME WITH TIME ZONE to an integer sort key	@example timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)*/
  timetz_byte_comparable(timeTz: DOtherable): DNumericField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DVarcharable, col1: DOtherable): DOtherField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DOtherable): DNumericField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DOtherable, col1: DOtherable): DOtherField;
  /**@description Extract the timezone_hour component from a date or timestamp	@example timezone_hour(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_hour(ts: DOtherable): DNumericField;
  /**@description Extract the timezone_minute component from a date or timestamp	@example timezone_minute(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_minute(ts: DOtherable): DNumericField;
  /**@description Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example to_base(42, 16)*/
  to_base(number: DNumericable, radix: DNumericable, minLength: DOtherable | DNumericable): DVarcharField;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  to_base64(blob: DOtherable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DVarcharable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DOtherable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DNumericable): DVarcharField;
  /**@description Construct a century interval	@example to_centuries(5)*/
  to_centuries(integer: DNumericable): DOtherField;
  /**@description Construct a day interval	@example to_days(5)*/
  to_days(integer: DNumericable): DOtherField;
  /**@description Construct a decade interval	@example to_decades(5)*/
  to_decades(integer: DNumericable): DOtherField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DVarcharable): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DNumericable): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DOtherable): DVarcharField;
  /**@description Construct a hour interval	@example to_hours(5)*/
  to_hours(integer: DNumericable): DOtherField;
  to_json(...args: DAnyable[]): DJsonField;
  /**@description Construct a microsecond interval	@example to_microseconds(5)*/
  to_microseconds(integer: DNumericable): DOtherField;
  /**@description Construct a millenium interval	@example to_millennia(1)*/
  to_millennia(integer: DNumericable): DOtherField;
  /**@description Construct a millisecond interval	@example to_milliseconds(5.5)*/
  to_milliseconds(double: DNumericable): DOtherField;
  /**@description Construct a minute interval	@example to_minutes(5)*/
  to_minutes(integer: DNumericable): DOtherField;
  /**@description Construct a month interval	@example to_months(5)*/
  to_months(integer: DNumericable): DOtherField;
  /**@description Construct a quarter interval	@example to_quarters(5)*/
  to_quarters(integer: DNumericable): DOtherField;
  /**@description Construct a second interval	@example to_seconds(5.5)*/
  to_seconds(double: DNumericable): DOtherField;
  /**@description Converts secs since epoch to a timestamp with time zone	@example to_timestamp(1284352323.5)*/
  to_timestamp(sec: DNumericable): DOtherField;
  /**@description Construct a week interval	@example to_weeks(5)*/
  to_weeks(integer: DNumericable): DOtherField;
  /**@description Construct a year interval	@example to_years(5)*/
  to_years(integer: DNumericable): DOtherField;
  today(): DOtherField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  transaction_timestamp(): DOtherField;
  /**@description Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example translate('12345', '143', 'ax')*/
  translate(string: DVarcharable, from: DVarcharable, to: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from either side of the string	@example trim('>>>>test<<', '><')*/
  trim(string: DVarcharable, characters: DOtherable | DVarcharable): DVarcharField;
  /**@description Truncates the number	@example trunc(17.4)*/
  trunc(x: DNumericable): DNumericField;
  /**@description Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  try_strptime(text: DVarcharable, format: DArrayable | DVarcharable): DOtherField;
  /**@description Returns the current transaction’s ID (a BIGINT). It will assign a new one if the current transaction does not have one already	@example txid_current()*/
  txid_current(): DNumericField;
  /**@description Returns the name of the data type of the result of the expression	@example typeof('abc')*/
  typeof(expression: DAnyable): DVarcharField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  ucase(string: DVarcharable): DVarcharField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  unbin(value: DVarcharable): DOtherField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  unhex(value: DVarcharable): DOtherField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  unicode(str: DVarcharable): DNumericField;
  /**@description Extract the value with the named tags from the union. NULL if the tag is not currently selected	@example union_extract(s, 'k')*/
  union_extract(union: DOtherable, tag: DVarcharable): DAnyField;
  /**@description Retrieve the currently selected tag of the union as an ENUM	@example union_tag(union_value(k := 'foo'))*/
  union_tag(union: DOtherable): DAnyField;
  /**@description Create a single member UNION containing the argument value. The tag of the value will be the bound variable name	@example union_value(k := 'hello')*/
  union_value(...args: DAnyable[]): DOtherField;
  /**@description Identical to list_value, but generated as part of unpivot for better error messages	@example unpivot_list(4, 5, 6)*/
  unpivot_list(...args: DAnyable[]): DArrayField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  upper(string: DVarcharable): DVarcharField;
  /**@description Unescapes the URL encoded input.	@example url_decode('this%20string%20is%2BFencoded')*/
  url_decode(input: DVarcharable): DVarcharField;
  /**@description Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example url_encode('this string has/ special+ characters>')*/
  url_encode(input: DVarcharable): DVarcharField;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  uuid(): DOtherField;
  /**@description Returns the VectorType of a given column	@example vector_type(col)*/
  vector_type(col: DAnyable): DVarcharField;
  /**@description Returns the currently active version of DuckDB in this format: v0.3.2		@example version()*/
  version(): DVarcharField;
  /**@description Extract the week component from a date or timestamp	@example week(timestamp '2021-08-03 11:59:44.123456')*/
  week(ts: DOtherable): DNumericField;
  /**@description Extract the weekday component from a date or timestamp	@example weekday(timestamp '2021-08-03 11:59:44.123456')*/
  weekday(ts: DOtherable): DNumericField;
  /**@description Extract the weekofyear component from a date or timestamp	@example weekofyear(timestamp '2021-08-03 11:59:44.123456')*/
  weekofyear(ts: DOtherable): DNumericField;
  /**@description Writes to the logger	@example write_log('Hello')*/
  write_log(string: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(left: DNumericable, right: DNumericable): DNumericField;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(left: DOtherable, right: DOtherable): DOtherField;
  /**@description Extract the year component from a date or timestamp	@example year(timestamp '2021-08-03 11:59:44.123456')*/
  year(ts: DOtherable): DNumericField;
  /**@description Extract the yearweek component from a date or timestamp	@example yearweek(timestamp '2021-08-03 11:59:44.123456')*/
  yearweek(ts: DOtherable): DNumericField;
}
export interface DTableField {
  [sComptype]: undefined;
  arrow_scan(col0: DOtherable, col1: DOtherable, col2: DOtherable): void;
  arrow_scan_dumb(col0: DOtherable, col1: DOtherable, col2: DOtherable): void;
  check_peg_parser(col0: DVarcharable): void;
  checkpoint(col0: DVarcharable | DOtherable): void;
  duckdb_columns(): void;
  duckdb_constraints(): void;
  duckdb_databases(): void;
  duckdb_dependencies(): void;
  duckdb_extensions(): void;
  duckdb_functions(): void;
  duckdb_indexes(): void;
  duckdb_keywords(): void;
  duckdb_log_contexts(): void;
  duckdb_logs(): void;
  duckdb_memory(): void;
  duckdb_optimizers(): void;
  duckdb_schemas(): void;
  duckdb_secret_types(): void;
  duckdb_secrets(redact: DBoolable): void;
  duckdb_sequences(): void;
  duckdb_settings(): void;
  duckdb_table_sample(col0: DVarcharable): void;
  duckdb_tables(): void;
  duckdb_temporary_files(): void;
  duckdb_types(): void;
  duckdb_variables(): void;
  duckdb_views(): void;
  force_checkpoint(col0: DOtherable | DVarcharable): void;
  generate_series(col0: DNumericable | DOtherable, col1: DNumericable | DOtherable, col2: DNumericable | DOtherable): void;
  glob(col0: DArrayable | DVarcharable): void;
  icu_calendar_names(): void;
  parquet_bloom_probe(col0: DVarcharable | DArrayable, col1: DVarcharable, col2: DAnyable): void;
  parquet_file_metadata(col0: DVarcharable | DArrayable): void;
  parquet_kv_metadata(col0: DArrayable | DVarcharable): void;
  parquet_metadata(col0: DArrayable | DVarcharable): void;
  parquet_scan(col0: DArrayable | DVarcharable, opts?: Partial<{ binaryAsString: DBoolable; compression: DVarcharable | DBoolable; debugUseOpenssl: DBoolable; encryptionConfig: DAnyable; explicitCardinality: DNumericable | DAnyable; fileRowNumber: DBoolable | DAnyable; filename: DAnyable | DNumericable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DBoolable | DAnyable; parquetVersion: DVarcharable | DBoolable; schema: DAnyable | DBoolable; unionByName: DBoolable | DVarcharable }>): void;
  parquet_schema(col0: DArrayable | DVarcharable): void;
  pg_timezone_names(): void;
  pragma_collations(): void;
  pragma_database_size(): void;
  pragma_metadata_info(col0: DOtherable | DVarcharable): void;
  pragma_platform(): void;
  pragma_show(col0: DVarcharable): void;
  pragma_storage_info(col0: DVarcharable): void;
  pragma_table_info(col0: DVarcharable): void;
  pragma_user_agent(): void;
  pragma_version(): void;
  query(col0: DVarcharable): void;
  query_table(col0: DArrayable | DVarcharable, col1: DBoolable | DOtherable): void;
  range(col0: DOtherable | DNumericable, col1: DOtherable | DNumericable, col2: DOtherable | DNumericable): void;
  read_blob(col0: DVarcharable | DArrayable): void;
  read_csv(
    col0: DVarcharable | DArrayable,
    opts?: Partial<
      {
        allVarchar: DBoolable | DVarcharable;
        allowQuotedNulls: DBoolable;
        autoDetect: DBoolable | DVarcharable;
        autoTypeCandidates: DAnyable | DVarcharable;
        bufferSize: DNumericable | DVarcharable;
        columnNames: DArrayable | DBoolable;
        columnTypes: DAnyable | DBoolable;
        columns: DAnyable | DBoolable;
        comment: DVarcharable;
        compression: DVarcharable | DArrayable;
        dateformat: DVarcharable | DAnyable;
        decimalSeparator: DVarcharable;
        delim: DVarcharable | DBoolable;
        dtypes: DAnyable | DBoolable;
        encoding: DVarcharable | DNumericable;
        escape: DVarcharable | DBoolable;
        filename: DAnyable | DVarcharable;
        forceNotNull: DArrayable | DVarcharable;
        header: DBoolable | DAnyable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable | DVarcharable;
        hiveTypesAutocast: DBoolable | DVarcharable;
        ignoreErrors: DBoolable | DVarcharable;
        maxLineSize: DVarcharable | DAnyable;
        maximumLineSize: DVarcharable | DNumericable;
        names: DArrayable | DNumericable;
        newLine: DVarcharable | DBoolable;
        normalizeNames: DBoolable | DAnyable;
        nullPadding: DBoolable | DVarcharable;
        nullstr: DAnyable;
        parallel: DBoolable;
        quote: DVarcharable | DNumericable;
        rejectsLimit: DNumericable | DArrayable;
        rejectsScan: DVarcharable | DBoolable;
        rejectsTable: DVarcharable;
        sampleSize: DNumericable | DVarcharable;
        sep: DVarcharable | DAnyable;
        skip: DNumericable | DVarcharable;
        storeRejects: DBoolable | DAnyable;
        strictMode: DBoolable;
        timestampformat: DVarcharable | DBoolable;
        types: DAnyable;
        unionByName: DBoolable | DArrayable;
      }
    >,
  ): void;
  read_csv_auto(
    col0: DArrayable | DVarcharable,
    opts?: Partial<
      {
        allVarchar: DBoolable | DVarcharable;
        allowQuotedNulls: DBoolable;
        autoDetect: DBoolable | DVarcharable;
        autoTypeCandidates: DAnyable | DVarcharable;
        bufferSize: DNumericable | DVarcharable;
        columnNames: DArrayable | DBoolable;
        columnTypes: DAnyable | DBoolable;
        columns: DAnyable | DBoolable;
        comment: DVarcharable;
        compression: DVarcharable | DArrayable;
        dateformat: DVarcharable | DAnyable;
        decimalSeparator: DVarcharable;
        delim: DVarcharable | DBoolable;
        dtypes: DAnyable | DBoolable;
        encoding: DVarcharable | DNumericable;
        escape: DVarcharable | DBoolable;
        filename: DAnyable | DVarcharable;
        forceNotNull: DArrayable | DVarcharable;
        header: DBoolable | DAnyable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable | DVarcharable;
        hiveTypesAutocast: DBoolable | DVarcharable;
        ignoreErrors: DBoolable | DVarcharable;
        maxLineSize: DVarcharable | DAnyable;
        maximumLineSize: DVarcharable | DNumericable;
        names: DArrayable | DNumericable;
        newLine: DVarcharable | DBoolable;
        normalizeNames: DBoolable | DAnyable;
        nullPadding: DBoolable | DVarcharable;
        nullstr: DAnyable;
        parallel: DBoolable;
        quote: DVarcharable | DNumericable;
        rejectsLimit: DNumericable | DArrayable;
        rejectsScan: DVarcharable | DBoolable;
        rejectsTable: DVarcharable;
        sampleSize: DNumericable | DVarcharable;
        sep: DVarcharable | DAnyable;
        skip: DNumericable | DVarcharable;
        storeRejects: DBoolable | DAnyable;
        strictMode: DBoolable;
        timestampformat: DVarcharable | DBoolable;
        types: DAnyable;
        unionByName: DBoolable | DArrayable;
      }
    >,
  ): void;
  read_json(col0: DArrayable | DVarcharable, opts?: Partial<{ autoDetect: DBoolable; columns: DAnyable | DBoolable; compression: DVarcharable; convertStringsToIntegers: DBoolable; dateFormat: DVarcharable; dateformat: DVarcharable; fieldAppearanceThreshold: DNumericable | DAnyable; filename: DAnyable | DNumericable; format: DVarcharable | DNumericable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DNumericable; hiveTypesAutocast: DBoolable | DVarcharable; ignoreErrors: DBoolable | DNumericable; mapInferenceThreshold: DNumericable | DAnyable; maximumDepth: DNumericable | DVarcharable; maximumObjectSize: DNumericable | DBoolable; maximumSampleFiles: DNumericable; records: DVarcharable | DBoolable; sampleSize: DNumericable; timestampFormat: DVarcharable; timestampformat: DVarcharable | DBoolable; unionByName: DBoolable | DAnyable }>): void;
  read_json_auto(col0: DArrayable | DVarcharable, opts?: Partial<{ autoDetect: DBoolable; columns: DAnyable | DBoolable; compression: DVarcharable; convertStringsToIntegers: DBoolable; dateFormat: DVarcharable; dateformat: DVarcharable; fieldAppearanceThreshold: DNumericable | DAnyable; filename: DAnyable | DNumericable; format: DVarcharable | DNumericable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DNumericable; hiveTypesAutocast: DBoolable | DVarcharable; ignoreErrors: DBoolable | DNumericable; mapInferenceThreshold: DNumericable | DAnyable; maximumDepth: DNumericable | DVarcharable; maximumObjectSize: DNumericable | DBoolable; maximumSampleFiles: DNumericable; records: DVarcharable | DBoolable; sampleSize: DNumericable; timestampFormat: DVarcharable; timestampformat: DVarcharable | DBoolable; unionByName: DBoolable | DAnyable }>): void;
  read_json_objects(col0: DArrayable | DVarcharable, opts?: Partial<{ compression: DVarcharable; filename: DAnyable | DVarcharable; format: DVarcharable | DAnyable; hivePartitioning: DBoolable | DNumericable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DBoolable; ignoreErrors: DBoolable; maximumObjectSize: DNumericable | DBoolable; unionByName: DBoolable | DAnyable }>): void;
  read_json_objects_auto(col0: DVarcharable | DArrayable, opts?: Partial<{ compression: DVarcharable; filename: DAnyable | DVarcharable; format: DVarcharable | DAnyable; hivePartitioning: DBoolable | DNumericable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DBoolable; ignoreErrors: DBoolable; maximumObjectSize: DNumericable | DBoolable; unionByName: DBoolable | DAnyable }>): void;
  read_ndjson(col0: DArrayable | DVarcharable, opts?: Partial<{ autoDetect: DBoolable; columns: DAnyable | DBoolable; compression: DVarcharable; convertStringsToIntegers: DBoolable; dateFormat: DVarcharable; dateformat: DVarcharable; fieldAppearanceThreshold: DNumericable | DAnyable; filename: DAnyable | DNumericable; format: DVarcharable | DNumericable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DNumericable; hiveTypesAutocast: DBoolable | DVarcharable; ignoreErrors: DBoolable | DNumericable; mapInferenceThreshold: DNumericable | DAnyable; maximumDepth: DNumericable | DVarcharable; maximumObjectSize: DNumericable | DBoolable; maximumSampleFiles: DNumericable; records: DVarcharable | DBoolable; sampleSize: DNumericable; timestampFormat: DVarcharable; timestampformat: DVarcharable | DBoolable; unionByName: DBoolable | DAnyable }>): void;
  read_ndjson_auto(col0: DVarcharable | DArrayable, opts?: Partial<{ autoDetect: DBoolable; columns: DAnyable | DBoolable; compression: DVarcharable; convertStringsToIntegers: DBoolable; dateFormat: DVarcharable; dateformat: DVarcharable; fieldAppearanceThreshold: DNumericable | DAnyable; filename: DAnyable | DNumericable; format: DVarcharable | DNumericable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DNumericable; hiveTypesAutocast: DBoolable | DVarcharable; ignoreErrors: DBoolable | DNumericable; mapInferenceThreshold: DNumericable | DAnyable; maximumDepth: DNumericable | DVarcharable; maximumObjectSize: DNumericable | DBoolable; maximumSampleFiles: DNumericable; records: DVarcharable | DBoolable; sampleSize: DNumericable; timestampFormat: DVarcharable; timestampformat: DVarcharable | DBoolable; unionByName: DBoolable | DAnyable }>): void;
  read_ndjson_objects(col0: DVarcharable | DArrayable, opts?: Partial<{ compression: DVarcharable; filename: DAnyable | DVarcharable; format: DVarcharable | DAnyable; hivePartitioning: DBoolable | DNumericable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DBoolable; ignoreErrors: DBoolable; maximumObjectSize: DNumericable | DBoolable; unionByName: DBoolable | DAnyable }>): void;
  read_parquet(col0: DVarcharable | DArrayable, opts?: Partial<{ binaryAsString: DBoolable; compression: DVarcharable | DBoolable; debugUseOpenssl: DBoolable; encryptionConfig: DAnyable; explicitCardinality: DNumericable | DAnyable; fileRowNumber: DBoolable | DAnyable; filename: DAnyable | DNumericable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DBoolable | DAnyable; parquetVersion: DVarcharable | DBoolable; schema: DAnyable | DBoolable; unionByName: DBoolable | DVarcharable }>): void;
  read_text(col0: DVarcharable | DArrayable): void;
  repeat(col0: DAnyable, col1: DNumericable): void;
  repeat_row(numRows: DNumericable, ...args: DAnyable[]): void;
  seq_scan(): void;
  sniff_csv(col0: DVarcharable, opts?: Partial<{ allVarchar: DBoolable; allowQuotedNulls: DBoolable; autoDetect: DBoolable; autoTypeCandidates: DAnyable; bufferSize: DNumericable; columnNames: DArrayable; columnTypes: DAnyable; columns: DAnyable; comment: DVarcharable; compression: DVarcharable; dateformat: DVarcharable; decimalSeparator: DVarcharable; delim: DVarcharable; dtypes: DAnyable; encoding: DVarcharable; escape: DVarcharable; filename: DAnyable; forceMatch: DBoolable; forceNotNull: DArrayable; header: DBoolable; hivePartitioning: DBoolable; hiveTypes: DAnyable; hiveTypesAutocast: DBoolable; ignoreErrors: DBoolable; maxLineSize: DVarcharable; maximumLineSize: DVarcharable; names: DArrayable; newLine: DVarcharable; normalizeNames: DBoolable; nullPadding: DBoolable; nullstr: DAnyable; parallel: DBoolable; quote: DVarcharable; rejectsLimit: DNumericable; rejectsScan: DVarcharable; rejectsTable: DVarcharable; sampleSize: DNumericable; sep: DVarcharable; skip: DNumericable; storeRejects: DBoolable; strictMode: DBoolable; timestampformat: DVarcharable; types: DAnyable; unionByName: DBoolable }>): void;
  sql_auto_complete(col0: DVarcharable): void;
  summary(col0: DOtherable): void;
  test_all_types(useLargeEnum: DBoolable): void;
  test_vector_types(col0: DAnyable, allFlat: DBoolable, ...args: DAnyable[]): void;
  unnest(col0: DAnyable): void;
  which_secret(col0: DVarcharable, col1: DVarcharable): void;
}
export interface CAny {
  [sInferred]: any;
  /**@description Returns the name of a given expression	@example alias(42 + 1)*/
  alias(): Partial<CVarchar>;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  array_slice(begin: DAnyable, end: DAnyable, step: DOtherable | DNumericable): Partial<CAny>;
  /**@description Whether or not we can implicitly cast from the source type to the other type	@example can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)*/
  can_cast_implicitly(targetType: DAnyable): DBoolField;
  /**@description Returns the size of the map (or the number of entries in the map)	@example cardinality( map([4, 2], ['a', 'b']) );*/
  cardinality(...args: DAnyable[]): Partial<number> & Partial<CNumeric>;
  /**@description Concatenate many strings together.	@example concat('Hello', ' ', 'World')*/
  concat(...args: DAnyable[]): Partial<CVarchar>;
  /**@description If arg2 is NULL, return NULL. Otherwise, return arg1.	@example constant_or_null(42, NULL)*/
  constant_or_null(arg2: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example create_sort_key('A', 'DESC')*/
  create_sort_key(...args: DAnyable[]): DOtherField;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  element_at(key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns the numeric value backing the given enum value	@example enum_code('happy'::mood)*/
  enum_code(): Partial<CAny>;
  /**@description Returns the first value of the input enum type	@example enum_first(NULL::mood)*/
  enum_first(): Partial<CVarchar>;
  /**@description Returns the last value of the input enum type	@example enum_last(NULL::mood)*/
  enum_last(): Partial<CVarchar>;
  /**@description Returns all values of the input enum type as an array	@example enum_range(NULL::mood)*/
  enum_range(): DArrayField;
  /**@description Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example enum_range_boundary(NULL, 'happy'::mood)*/
  enum_range_boundary(end: DAnyable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Returns the highest value of the set of input parameters	@example greatest(42, 84)*/
  greatest(...args: DAnyable[]): Partial<CAny>;
  /**@description Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example hash('🦆')*/
  hash(...args: DAnyable[]): Partial<number> & Partial<CNumeric>;
  /**@description Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example is_histogram_other_bin(v)*/
  is_histogram_other_bin(): DBoolField;
  /**@description Returns the lowest value of the set of input parameters	@example least(42, 84)*/
  least(...args: DAnyable[]): Partial<CAny>;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  list_slice(begin: DAnyable, end: DAnyable, step: DNumericable | DOtherable): Partial<CAny>;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  map_extract(key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract_value(map(['key'], ['val']), 'key')*/
  map_extract_value(key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example stats(5)*/
  stats(): Partial<CVarchar>;
  /**@description Returns the name of the data type of the result of the expression	@example typeof('abc')*/
  typeof(): Partial<CVarchar>;
  /**@description Returns the VectorType of a given column	@example vector_type(col)*/
  vector_type(): Partial<CVarchar>;
}
export type DAnyComp = Partial<CAny>;

export interface CVarchar extends CAny {
  [sInferred]: string;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(index: DNumericable): Partial<CVarchar>;
  /**@description Returns an integer that represents the Unicode code point of the first character of the string	@example ascii('Ω')*/
  ascii(): Partial<number> & Partial<CNumeric>;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(): Partial<CVarchar>;
  bit_length(): Partial<number> & Partial<CNumeric>;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(length: DNumericable): DOtherField;
  /**@description Concatenate strings together separated by the specified separator.	@example concat_ws(', ', 'Banana', 'Apple', 'Melon')*/
  concat_ws(string: DAnyable, ...args: DAnyable[]): Partial<CVarchar>;
  /**@description Returns true if search_string is found within string.	@example contains('abc', 'a')*/
  contains(searchString: DVarcharable): DBoolField;
  /**@description Returns the current value of the configuration setting	@example current_setting('access_mode')*/
  current_setting(): Partial<CAny>;
  /**@description Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example currval('my_sequence_name')*/
  currval(): Partial<number> & Partial<CNumeric>;
  /**@description Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example damerau_levenshtein('hello', 'world')*/
  damerau_levenshtein(str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_diff(startdate: DOtherable, enddate: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(col1: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_sub(startdate: DOtherable, enddate: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(timestamp: DOtherable): DOtherField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datediff(startdate: DOtherable, enddate: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(col1: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datesub(startdate: DOtherable, enddate: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(timestamp: DOtherable): DOtherField;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  editdist3(str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Convert varchar to blob. Converts utf-8 characters into literal encoding	@example encode('my_string_with_ü')*/
  encode(): DOtherField;
  ends_with(col1: DVarcharable): DBoolField;
  /**@description Throws the given error message	@example error('access_mode')*/
  error(): DOtherField;
  /**@description Formats a string using fmt syntax	@example format('Benchmark "{}" took {} seconds', 'CSV', 42)*/
  format(...args: DAnyable[]): Partial<CVarchar>;
  /**@description Convert a base64 encoded string to a character string	@example from_base64('QQ==')*/
  from_base64(): DOtherField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  from_binary(): DOtherField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  from_hex(): DOtherField;
  from_json(col1: DVarcharable): Partial<CAny>;
  from_json_strict(col1: DVarcharable): Partial<CAny>;
  getvariable(): Partial<CAny>;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  hamming(str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): Partial<CVarchar>;
  icu_sort_key(col1: DVarcharable): Partial<CVarchar>;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example ilike_escape('A%c', 'a$%C', '$')*/
  ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns whether or not the database/schema are in the search path	@example in_search_path('memory', 'main')*/
  in_search_path(schemaName: DVarcharable): DBoolField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  instr(needle: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaccard('duck','luck')*/
  jaccard(str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_similarity('duck', 'duckdb', 0.5)*/
  jaro_similarity(str2: DVarcharable, scoreCutoff: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_winkler_similarity('duck', 'duckdb', 0.5)*/
  jaro_winkler_similarity(str2: DVarcharable, scoreCutoff: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  json_array_length(col1: DArrayable): DArrayField;
  json_array_length(col1: DVarcharable | DOtherable): Partial<number> & Partial<CNumeric>;
  json_contains(col1: DVarcharable | DJsonable): DBoolField;
  json_exists(col1: DVarcharable): DBoolField;
  json_exists(col1: DArrayable): DArrayField;
  json_extract(col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col1: DArrayable): DArrayField;
  json_extract_path(col1: DVarcharable | DNumericable): DJsonField;
  json_extract_path(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DVarcharable | DNumericable): Partial<CVarchar>;
  json_extract_path_text(col1: DArrayable): DArrayField;
  json_extract_string(col1: DArrayable): DArrayField;
  json_extract_string(col1: DNumericable | DVarcharable): Partial<CVarchar>;
  json_keys(col1: DArrayable | DVarcharable | DOtherable): DArrayField;
  json_serialize_plan(col1: DBoolable | DOtherable, col2: DBoolable | DOtherable, col3: DOtherable | DBoolable, col4: DOtherable | DBoolable): DJsonField;
  json_serialize_sql(col1: DOtherable | DBoolable, col2: DOtherable | DBoolable, col3: DOtherable | DBoolable): DJsonField;
  json_structure(): DJsonField;
  json_transform(col1: DVarcharable): Partial<CAny>;
  json_transform_strict(col1: DVarcharable): Partial<CAny>;
  json_type(col1: DVarcharable | DOtherable): Partial<CVarchar>;
  json_type(col1: DArrayable): DArrayField;
  json_valid(): DBoolField;
  json_value(col1: DArrayable): DArrayField;
  json_value(col1: DVarcharable | DNumericable): Partial<CVarchar>;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lcase(): Partial<CVarchar>;
  /**@description Extract the left-most count characters	@example left('Hello🦆', 2)*/
  left(count: DNumericable): Partial<CVarchar>;
  /**@description Extract the left-most count grapheme clusters	@example left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  left_grapheme(count: DNumericable): Partial<CVarchar>;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(): Partial<number> & Partial<CNumeric>;
  /**@description Number of grapheme clusters in string.	@example length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')*/
  length_grapheme(): Partial<number> & Partial<CNumeric>;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  levenshtein(str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example like_escape('a%c', 'a$%c', '$')*/
  like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(index: DNumericable): Partial<CVarchar>;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(index: DNumericable): Partial<CVarchar>;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lower(): Partial<CVarchar>;
  /**@description Pads the string with the character from the left until it has count characters	@example lpad('hello', 10, '>')*/
  lpad(count: DNumericable, character: DVarcharable): Partial<CVarchar>;
  /**@description Removes any occurrences of any of the characters from the left side of the string	@example ltrim('>>>>test<<', '><')*/
  ltrim(characters: DOtherable | DVarcharable): Partial<CVarchar>;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(): Partial<CVarchar>;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(): Partial<number> & Partial<CNumeric>;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  mismatches(str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Return the following value of the sequence.	@example nextval('my_sequence_name')*/
  nextval(): Partial<number> & Partial<CNumeric>;
  /**@description Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example nfc_normalize('ardèch')*/
  nfc_normalize(): Partial<CVarchar>;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_ilike_escape('A%c', 'a$%C', '$')*/
  not_ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_like_escape('a%c', 'a$%c', '$')*/
  not_like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  ord(): Partial<number> & Partial<CNumeric>;
  /**@description Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirname('path/to/file.csv', 'system')*/
  parse_dirname(separator: DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirpath('path/to/file.csv', 'system')*/
  parse_dirpath(separator: DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example parse_filename('path/to/file.csv', true, 'forward_slash')*/
  parse_filename(trimExtension: DOtherable | DBoolable | DVarcharable, separator: DOtherable | DVarcharable): Partial<CVarchar>;
  /**@description Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example parse_path('path/to/file.csv', 'system')*/
  parse_path(separator: DVarcharable | DOtherable): DArrayField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  position(needle: DVarcharable): Partial<number> & Partial<CNumeric>;
  prefix(col1: DVarcharable): DBoolField;
  /**@description Formats a string using printf syntax	@example printf('Benchmark "%s" took %d seconds', 'CSV', 42)*/
  printf(...args: DAnyable[]): Partial<CVarchar>;
  /**@description Escapes all potentially meaningful regexp characters in the input string	@example regexp_escape('https://duckdb.org')*/
  regexp_escape(): Partial<CVarchar>;
  /**@description If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example regexp_extract('abc', '([a-z])(b)', 1)*/
  regexp_extract(pattern: DVarcharable | RegExpable, group0: DOtherable | DNumericable | DArrayable, options: DOtherable | DVarcharable): Partial<CVarchar>;
  /**@description Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example regexp_extract_all('hello_world', '([a-z ]+)_?', 1)*/
  regexp_extract_all(regex: DVarcharable | RegExpable, group0: DNumericable | DOtherable, options: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the entire string matches the regex. A set of optional options can be set.	@example regexp_full_match('anabanana', '(an)*')*/
  regexp_full_match(regex: DVarcharable | RegExpable, options: DOtherable | DVarcharable): DBoolField;
  /**@description Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example regexp_matches('anabanana', '(an)*')*/
  regexp_matches(pattern: DVarcharable | RegExpable, options: DOtherable | DVarcharable): DBoolField;
  /**@description If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example regexp_replace('hello', '[lo]', '-')*/
  regexp_replace(pattern: DVarcharable | RegExpable, replacement: DVarcharable, options: DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  regexp_split_to_array(separator: DVarcharable | RegExpable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(count: DNumericable): Partial<CVarchar>;
  /**@description Replaces any occurrences of the source with target in string	@example replace('hello', 'l', '-')*/
  replace(source: DVarcharable, target: DVarcharable): Partial<CVarchar>;
  /**@description Reverses the string	@example reverse('hello')*/
  reverse(): Partial<CVarchar>;
  /**@description Extract the right-most count characters	@example right('Hello🦆', 3)*/
  right(count: DNumericable): Partial<CVarchar>;
  /**@description Extract the right-most count grapheme clusters	@example right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  right_grapheme(count: DNumericable): Partial<CVarchar>;
  /**@description Pads the string with the character from the right until it has count characters	@example rpad('hello', 10, '<')*/
  rpad(count: DNumericable, character: DVarcharable): Partial<CVarchar>;
  /**@description Removes any occurrences of any of the characters from the right side of the string	@example rtrim('>>>>test<<', '><')*/
  rtrim(characters: DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(): Partial<CVarchar>;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(): Partial<CVarchar>;
  /**@description Returns true if string begins with search_string	@example starts_with('abc','a')*/
  starts_with(searchString: DVarcharable): DBoolField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  str_split(separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  str_split_regex(separator: DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(format: DOtherable): Partial<CVarchar>;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_split(separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  string_split_regex(separator: DVarcharable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_to_array(separator: DVarcharable): DArrayField;
  /**@description Strips accents from string.	@example strip_accents('mühleisen')*/
  strip_accents(): Partial<CVarchar>;
  /**@description Number of bytes in string.	@example strlen('🦆')*/
  strlen(): Partial<number> & Partial<CNumeric>;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  strpos(needle: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime.	@example strptime('4/15/2023 10:56:00', ['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S'])*/
  strptime(formatList: DArrayable | DVarcharable): DOtherField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substr(start: DNumericable, length: DOtherable | DNumericable): Partial<CVarchar>;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substring(start: DNumericable, length: DOtherable | DNumericable): Partial<CVarchar>;
  /**@description Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)*/
  substring_grapheme(start: DNumericable, length: DOtherable | DNumericable): Partial<CVarchar>;
  suffix(col1: DVarcharable): DBoolField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(col1: DOtherable): DOtherField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(): Partial<CVarchar>;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): Partial<CVarchar>;
  /**@description Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example translate('12345', '143', 'ax')*/
  translate(from: DVarcharable, to: DVarcharable): Partial<CVarchar>;
  /**@description Removes any occurrences of any of the characters from either side of the string	@example trim('>>>>test<<', '><')*/
  trim(characters: DOtherable | DVarcharable): Partial<CVarchar>;
  /**@description Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  try_strptime(format: DArrayable | DVarcharable): DOtherField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  ucase(): Partial<CVarchar>;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  unbin(): DOtherField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  unhex(): DOtherField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  unicode(): Partial<number> & Partial<CNumeric>;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  upper(): Partial<CVarchar>;
  /**@description Unescapes the URL encoded input.	@example url_decode('this%20string%20is%2BFencoded')*/
  url_decode(): Partial<CVarchar>;
  /**@description Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example url_encode('this string has/ special+ characters>')*/
  url_encode(): Partial<CVarchar>;
  /**@description Writes to the logger	@example write_log('Hello')*/
  write_log(...args: DAnyable[]): Partial<CAny>;
}
export type DVarcharComp = Partial<CVarchar>;

export interface CNumeric extends CAny {
  [sInferred]: number;
  /**@description Absolute value	@example abs(-17.4)*/
  abs(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(): Partial<number> & Partial<CNumeric>;
  add(col1: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  add(col1: DOtherable): DOtherField;
  /**@description Computes the arcsine of x	@example asin(0.5)*/
  asin(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the inverse hyperbolic sin of x	@example asinh(0.5)*/
  asinh(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the arctangent of x	@example atan(0.5)*/
  atan(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the arctangent (y, x)	@example atan2(1.0, 0.0)*/
  atan2(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the inverse hyperbolic tan of x	@example atanh(0.5)*/
  atanh(): Partial<number> & Partial<CNumeric>;
  /**@description Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example bar(5, 0, 20, 10)*/
  bar(min: DNumericable, max: DNumericable, width: DOtherable | DNumericable): Partial<CVarchar>;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(): Partial<CVarchar>;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(): Partial<number> & Partial<CNumeric>;
  /**@description Returns the cube root of x	@example cbrt(8)*/
  cbrt(): Partial<number> & Partial<CNumeric>;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceil(): Partial<number> & Partial<CNumeric>;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceiling(): Partial<number> & Partial<CNumeric>;
  /**@description Returns a character which is corresponding the ASCII code value or Unicode code point	@example chr(65)*/
  chr(): Partial<CVarchar>;
  /**@description Computes the cos of x	@example cos(90)*/
  cos(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the hyperbolic cos of x	@example cosh(1)*/
  cosh(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the cotangent of x	@example cot(0.5)*/
  cot(): Partial<number> & Partial<CNumeric>;
  /**@description Converts radians to degrees	@example degrees(pi())*/
  degrees(): Partial<number> & Partial<CNumeric>;
  divide(col1: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(): DOtherField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Rounds x to next even number by rounding away from zero	@example even(2.9)*/
  even(): Partial<number> & Partial<CNumeric>;
  /**@description Computes e to the power of x	@example exp(1)*/
  exp(): Partial<number> & Partial<CNumeric>;
  /**@description Factorial of x. Computes the product of the current integer and all integers below it	@example 4!*/
  factorial(): Partial<number> & Partial<CNumeric>;
  /**@description Rounds the number down	@example floor(17.4)*/
  floor(): Partial<number> & Partial<CNumeric>;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example format_bytes(1000 * 16)*/
  formatReadableDecimalSize(): Partial<CVarchar>;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  formatReadableSize(): Partial<CVarchar>;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  format_bytes(): Partial<CVarchar>;
  /**@description Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example gamma(5.5)*/
  gamma(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  gcd(y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(stop: DOtherable | DNumericable, step: DOtherable | DNumericable): DArrayField;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  greatest_common_divisor(y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): Partial<CVarchar>;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(): DBoolField;
  /**@description Returns true if the floating point value is not a number, false otherwise	@example isnan('NaN'::FLOAT)*/
  isnan(): DBoolField;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  lcm(y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  least_common_multiple(y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the log of the gamma function	@example lgamma(2)*/
  lgamma(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the natural logarithm of x	@example ln(2)*/
  ln(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example log(2, 64)*/
  log(x: DOtherable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the 10-log of x	@example log10(1000)*/
  log10(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the 2-log of x	@example log2(8)*/
  log2(): Partial<number> & Partial<CNumeric>;
  make_date(): DOtherField;
  /**@description The date for the given parts	@example make_date(1992, 9, 20)*/
  make_date(month: DNumericable, day: DNumericable): DOtherField;
  /**@description The date for the given struct.	@example make_date({'year': 2024, 'month': 11, 'day': 14})*/
  make_date(): DOtherField;
  /**@description The time for the given parts	@example make_time(13, 34, 27.123456)*/
  make_time(minute: DNumericable, seconds: DNumericable): DOtherField;
  /**@description The timestamp for the given parts	@example make_timestamp(1992, 9, 20, 13, 34, 27.123456)*/
  make_timestamp(month: DOtherable | DNumericable, day: DOtherable | DNumericable, hour: DOtherable | DNumericable, minute: DOtherable | DNumericable, seconds: DOtherable | DNumericable): DOtherField;
  /**@description The timestamp for the given nanoseconds since epoch	@example make_timestamp(1732117793000000000)*/
  make_timestamp_ns(): DOtherField;
  make_timestamptz(col1: DNumericable | DOtherable, col2: DNumericable | DOtherable, col3: DNumericable | DOtherable, col4: DNumericable | DOtherable, col5: DNumericable | DOtherable, col6: DOtherable | DVarcharable): DOtherField;
  mod(col1: DNumericable): Partial<number> & Partial<CNumeric>;
  multiply(col1: DNumericable): Partial<number> & Partial<CNumeric>;
  multiply(col1: DOtherable): DOtherField;
  /**@description Returns the next floating point value after x in the direction of y	@example nextafter(1::float, 2::float)*/
  nextafter(y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  pow(y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  power(y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Converts degrees to radians	@example radians(90)*/
  radians(): Partial<number> & Partial<CNumeric>;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(stop: DNumericable | DOtherable, step: DOtherable | DNumericable): DArrayField;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(precision: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(precision: DOtherable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Sets the seed to be used for the random function	@example setseed(0.42)*/
  setseed(): DOtherField;
  /**@description Returns the sign of x as -1, 0 or 1	@example sign(-349)*/
  sign(): Partial<number> & Partial<CNumeric>;
  /**@description Returns whether the signbit is set or not	@example signbit(-0.0)*/
  signbit(): DBoolField;
  /**@description Computes the sin of x	@example sin(90)*/
  sin(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the hyperbolic sin of x	@example sinh(1)*/
  sinh(): Partial<number> & Partial<CNumeric>;
  /**@description Returns the square root of x	@example sqrt(4)*/
  sqrt(): Partial<number> & Partial<CNumeric>;
  subtract(col1: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  subtract(col1: DOtherable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the tan of x	@example tan(90)*/
  tan(): Partial<number> & Partial<CNumeric>;
  /**@description Computes the hyperbolic tan of x	@example tanh(1)*/
  tanh(): Partial<number> & Partial<CNumeric>;
  /**@description Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example to_base(42, 16)*/
  to_base(radix: DNumericable, minLength: DOtherable | DNumericable): Partial<CVarchar>;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(): Partial<CVarchar>;
  /**@description Construct a century interval	@example to_centuries(5)*/
  to_centuries(): DOtherField;
  /**@description Construct a day interval	@example to_days(5)*/
  to_days(): DOtherField;
  /**@description Construct a decade interval	@example to_decades(5)*/
  to_decades(): DOtherField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): Partial<CVarchar>;
  /**@description Construct a hour interval	@example to_hours(5)*/
  to_hours(): DOtherField;
  /**@description Construct a microsecond interval	@example to_microseconds(5)*/
  to_microseconds(): DOtherField;
  /**@description Construct a millenium interval	@example to_millennia(1)*/
  to_millennia(): DOtherField;
  /**@description Construct a millisecond interval	@example to_milliseconds(5.5)*/
  to_milliseconds(): DOtherField;
  /**@description Construct a minute interval	@example to_minutes(5)*/
  to_minutes(): DOtherField;
  /**@description Construct a month interval	@example to_months(5)*/
  to_months(): DOtherField;
  /**@description Construct a quarter interval	@example to_quarters(5)*/
  to_quarters(): DOtherField;
  /**@description Construct a second interval	@example to_seconds(5.5)*/
  to_seconds(): DOtherField;
  /**@description Converts secs since epoch to a timestamp with time zone	@example to_timestamp(1284352323.5)*/
  to_timestamp(): DOtherField;
  /**@description Construct a week interval	@example to_weeks(5)*/
  to_weeks(): DOtherField;
  /**@description Construct a year interval	@example to_years(5)*/
  to_years(): DOtherField;
  /**@description Truncates the number	@example trunc(17.4)*/
  trunc(): Partial<number> & Partial<CNumeric>;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(right: DNumericable): Partial<number> & Partial<CNumeric>;
}
export type DNumericComp = Partial<number> & Partial<CNumeric>;

export interface CGlobal {
  /**@description Absolute value	@example abs(-17.4)*/
  abs(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(x: DNumericable): Partial<number> & Partial<CNumeric>;
  add(col0: DOtherable, col1: DOtherable): DOtherField;
  add(col0: DNumericable, col1: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  add(col0: DOtherable, col1: DOtherable | DNumericable): DOtherField;
  add(col0: DNumericable, col1: DOtherable): DOtherField;
  add(col0: DArrayable, col1: DArrayable): DArrayField;
  /**@description Subtract arguments, resulting in the time difference between the two timestamps	@example age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')*/
  age(timestamp: DOtherable, timestamp__01: DOtherable): DOtherField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns the name of a given expression	@example alias(42 + 1)*/
  alias(expr: DAnyable): Partial<CVarchar>;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  apply(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  array_aggr(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  array_aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  array_apply(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  array_cat(list1: DArrayable, list2: DArrayable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  array_concat(list1: DArrayable, list2: DArrayable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  array_contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_cosine_distance([1, 2, 3], [1, 2, 3])*/
  array_cosine_distance(arr1: DArrayable, arr2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_cosine_similarity([1, 2, 3], [1, 2, 3])*/
  array_cosine_similarity(arr1: DArrayable, arr2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the cross product of two arrays of size 3. The array elements can not be NULL.	@example array_cross_product([1, 2, 3], [1, 2, 3])*/
  array_cross_product(arr: DArrayable, arr__01: DArrayable): DArrayField;
  /**@description Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_distance([1, 2, 3], [1, 2, 3])*/
  array_distance(arr1: DArrayable, arr2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Removes all duplicates and NULLs from a list. Does not preserve the original order	@example list_distinct([1, 1, NULL, -3, 1, 5])*/
  array_distinct(list: DArrayable): DArrayField;
  /**@description Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_inner_product([1, 2, 3], [1, 2, 3])*/
  array_dot_product(arr1: DArrayable, arr2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DArrayable, index: DNumericable): Partial<CAny>;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DVarcharable, index: DNumericable): Partial<CVarchar>;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DStructable, index: DVarcharable | DNumericable): Partial<CAny>;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  array_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  array_grade_up(list: DArrayable, col1: DOtherable | DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  array_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Returns true if all elements of l2 are in l1. NULLs are ignored.	@example list_has_all([1, 2, 3], [2, 3])*/
  array_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns true if the lists have any element in common. NULLs are ignored.	@example list_has_any([1, 2, 3], [2, 3, 4])*/
  array_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_indexof(list: DArrayable, element: DAnyable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_inner_product([1, 2, 3], [1, 2, 3])*/
  array_inner_product(arr1: DArrayable, arr2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the length of the list.	@example array_length([1,2,3])*/
  array_length(list: DArrayable, col1: DOtherable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_dot_product(arr1: DArrayable, arr2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_inner_product(arr1: DArrayable, arr2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_position(list: DArrayable, element: DAnyable): Partial<number> & Partial<CNumeric>;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  array_reduce(list: DArrayable, lambda: DOtherable): Partial<CAny>;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  array_resize(list: DArrayable, size: DAnyable, value: DOtherable | DAnyable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  array_reverse_sort(list: DArrayable, col1: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  array_select(valueList: DArrayable, indexList: DArrayable): DArrayField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  array_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step: DOtherable | DNumericable): Partial<CAny>;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  array_sort(list: DArrayable, col1: DOtherable | DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  array_to_json(...args: DAnyable[]): DJsonField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  array_transform(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Counts the unique elements of a list	@example list_unique([1, 1, NULL, -3, 1, 5])*/
  array_unique(list: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Create an ARRAY containing the argument values.	@example array_value(4, 5, 6)*/
  array_value(...args: DAnyable[]): DArrayField;
  /**@description Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example list_where([10, 20, 30, 40], [true, false, false, true])*/
  array_where(valueList: DArrayable, maskList: DArrayable): DArrayField;
  /**@description Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example list_zip([1, 2], [3, 4], [5, 6])*/
  array_zip(...args: DAnyable[]): DArrayField;
  /**@description Returns an integer that represents the Unicode code point of the first character of the string	@example ascii('Ω')*/
  ascii(string: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the arcsine of x	@example asin(0.5)*/
  asin(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the inverse hyperbolic sin of x	@example asinh(0.5)*/
  asinh(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the arctangent of x	@example atan(0.5)*/
  atan(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the arctangent (y, x)	@example atan2(1.0, 0.0)*/
  atan2(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the inverse hyperbolic tan of x	@example atanh(0.5)*/
  atanh(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example bar(5, 0, 20, 10)*/
  bar(x: DNumericable, min: DNumericable, max: DNumericable, width: DOtherable | DNumericable): Partial<CVarchar>;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  base64(blob: DOtherable): Partial<CVarchar>;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(value: DNumericable): Partial<CVarchar>;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(value: DVarcharable): Partial<CVarchar>;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(value: DOtherable): Partial<CVarchar>;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(x: DOtherable): Partial<number> & Partial<CNumeric>;
  bit_length(col0: DVarcharable): Partial<number> & Partial<CNumeric>;
  bit_length(col0: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1	@example bit_position('010'::BIT, '1110101'::BIT)*/
  bit_position(substring: DOtherable, bitstring: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(bitstring: DVarcharable, length: DNumericable): DOtherField;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(bitstring: DOtherable, length: DNumericable): DOtherField;
  /**@description Whether or not we can implicitly cast from the source type to the other type	@example can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)*/
  can_cast_implicitly(sourceType: DAnyable, targetType: DAnyable): DBoolField;
  /**@description Returns the size of the map (or the number of entries in the map)	@example cardinality( map([4, 2], ['a', 'b']) );*/
  cardinality(map: DAnyable, ...args: DAnyable[]): Partial<number> & Partial<CNumeric>;
  /**@description Returns the cube root of x	@example cbrt(8)*/
  cbrt(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceil(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceiling(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the century component from a date or timestamp	@example century(timestamp '2021-08-03 11:59:44.123456')*/
  century(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Returns a character which is corresponding the ASCII code value or Unicode code point	@example chr(65)*/
  chr(codePoint: DNumericable): Partial<CVarchar>;
  combine(col0: DOtherable, col1: DAnyable): DOtherField;
  /**@description Concatenate many strings together.	@example concat('Hello', ' ', 'World')*/
  concat(string: DAnyable, ...args: DAnyable[]): Partial<CVarchar>;
  /**@description Concatenate strings together separated by the specified separator.	@example concat_ws(', ', 'Banana', 'Apple', 'Melon')*/
  concat_ws(separator: DVarcharable, string: DAnyable, ...args: DAnyable[]): Partial<CVarchar>;
  /**@description If arg2 is NULL, return NULL. Otherwise, return arg1.	@example constant_or_null(42, NULL)*/
  constant_or_null(arg1: DAnyable, arg2: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Checks if a map contains a given key.	@example contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  contains(map: DMapable, key: DAnyable): DBoolField;
  /**@description Returns true if search_string is found within string.	@example contains('abc', 'a')*/
  contains(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description Returns true if the list contains the element.	@example contains([1, 2, NULL], 1)*/
  contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Computes the cos of x	@example cos(90)*/
  cos(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the hyperbolic cos of x	@example cosh(1)*/
  cosh(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the cotangent of x	@example cot(0.5)*/
  cot(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example create_sort_key('A', 'DESC')*/
  create_sort_key(parameters: DAnyable, ...args: DAnyable[]): DOtherField;
  /**@description Returns the name of the currently active database	@example current_database()*/
  current_database(): Partial<CVarchar>;
  current_date(): DOtherField;
  current_localtime(): DOtherField;
  current_localtimestamp(): DOtherField;
  /**@description Returns the current query as a string	@example current_query()*/
  current_query(): Partial<CVarchar>;
  /**@description Returns the name of the currently active schema. Default is main	@example current_schema()*/
  current_schema(): Partial<CVarchar>;
  /**@description Returns list of schemas. Pass a parameter of True to include implicit schemas	@example current_schemas(true)*/
  current_schemas(includeImplicit: DBoolable): DArrayField;
  /**@description Returns the current value of the configuration setting	@example current_setting('access_mode')*/
  current_setting(settingName: DVarcharable): Partial<CAny>;
  /**@description Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example currval('my_sequence_name')*/
  currval(sequenceName: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example damerau_levenshtein('hello', 'world')*/
  damerau_levenshtein(str1: DVarcharable, str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_diff(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(ts: DVarcharable, col1: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(ts: DArrayable, col1: DOtherable): DStructField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_sub(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datediff(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(ts: DVarcharable, col1: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(ts: DArrayable, col1: DOtherable): DStructField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datesub(part: DVarcharable, startdate: DOtherable, enddate: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  /**@description Extract the day component from a date or timestamp	@example day(timestamp '2021-08-03 11:59:44.123456')*/
  day(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description The (English) name of the weekday	@example dayname(TIMESTAMP '1992-03-22')*/
  dayname(ts: DOtherable): Partial<CVarchar>;
  /**@description Extract the dayofmonth component from a date or timestamp	@example dayofmonth(timestamp '2021-08-03 11:59:44.123456')*/
  dayofmonth(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the dayofweek component from a date or timestamp	@example dayofweek(timestamp '2021-08-03 11:59:44.123456')*/
  dayofweek(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the dayofyear component from a date or timestamp	@example dayofyear(timestamp '2021-08-03 11:59:44.123456')*/
  dayofyear(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the decade component from a date or timestamp	@example decade(timestamp '2021-08-03 11:59:44.123456')*/
  decade(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Convert blob to varchar. Fails if blob is not valid utf-8	@example decode('\xC3\xBC'::BLOB)*/
  decode(blob: DOtherable): Partial<CVarchar>;
  /**@description Converts radians to degrees	@example degrees(pi())*/
  degrees(x: DNumericable): Partial<number> & Partial<CNumeric>;
  divide(col0: DNumericable, col1: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  editdist3(str1: DVarcharable, str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  element_at(map: DAnyable, key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Convert varchar to blob. Converts utf-8 characters into literal encoding	@example encode('my_string_with_ü')*/
  encode(string: DVarcharable): DOtherField;
  ends_with(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Returns the numeric value backing the given enum value	@example enum_code('happy'::mood)*/
  enum_code(enm: DAnyable): Partial<CAny>;
  /**@description Returns the first value of the input enum type	@example enum_first(NULL::mood)*/
  enum_first(enm: DAnyable): Partial<CVarchar>;
  /**@description Returns the last value of the input enum type	@example enum_last(NULL::mood)*/
  enum_last(enm: DAnyable): Partial<CVarchar>;
  /**@description Returns all values of the input enum type as an array	@example enum_range(NULL::mood)*/
  enum_range(enm: DAnyable): DArrayField;
  /**@description Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example enum_range_boundary(NULL, 'happy'::mood)*/
  enum_range_boundary(start: DAnyable, end: DAnyable): DArrayField;
  /**@description Extract the epoch component from a temporal type	@example epoch(timestamp '2021-08-03 11:59:44.123456')*/
  epoch(temporal: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DNumericable): DOtherField;
  /**@description Extract the epoch component in nanoseconds from a temporal type	@example epoch_ns(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ns(temporal: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the epoch component in microseconds from a temporal type	@example epoch_us(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_us(temporal: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DAnyable, max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DOtherable, max: DOtherable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DNumericable, max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Extract the era component from a date or timestamp	@example era(timestamp '2021-08-03 11:59:44.123456')*/
  era(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Throws the given error message	@example error('access_mode')*/
  error(message: DVarcharable): DOtherField;
  /**@description Rounds x to next even number by rounding away from zero	@example even(2.9)*/
  even(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes e to the power of x	@example exp(1)*/
  exp(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Factorial of x. Computes the product of the current integer and all integers below it	@example 4!*/
  factorial(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  filter(list: DArrayable, lambda: DOtherable): DArrayField;
  finalize(col0: DOtherable): DOtherField;
  /**@description Flatten a nested list by one level	@example flatten([[1, 2, 3], [4, 5]])*/
  flatten(nestedList: DArrayable): DArrayField;
  /**@description Rounds the number down	@example floor(17.4)*/
  floor(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Formats a string using fmt syntax	@example format('Benchmark "{}" took {} seconds', 'CSV', 42)*/
  format(format: DVarcharable, ...args: DAnyable[]): Partial<CVarchar>;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example format_bytes(1000 * 16)*/
  formatReadableDecimalSize(bytes: DNumericable): Partial<CVarchar>;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  formatReadableSize(bytes: DNumericable): Partial<CVarchar>;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  format_bytes(bytes: DNumericable): Partial<CVarchar>;
  /**@description Convert a base64 encoded string to a character string	@example from_base64('QQ==')*/
  from_base64(string: DVarcharable): DOtherField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  from_binary(value: DVarcharable): DOtherField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  from_hex(value: DVarcharable): DOtherField;
  from_json(col0: DVarcharable, col1: DVarcharable): Partial<CAny>;
  from_json(col0: DJsonable, col1: DVarcharable): Partial<CAny>;
  from_json_strict(col0: DVarcharable, col1: DVarcharable): Partial<CAny>;
  from_json_strict(col0: DJsonable, col1: DVarcharable): Partial<CAny>;
  /**@description Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example gamma(5.5)*/
  gamma(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  gcd(x: DNumericable, y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  gen_random_uuid(): DOtherField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(start: DNumericable, stop: DOtherable | DNumericable, step: DOtherable | DNumericable): DArrayField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(start: DOtherable, stop: DOtherable, step: DOtherable): DArrayField;
  /**@description Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0	@example get_bit('0110010'::BIT, 2)*/
  get_bit(bitstring: DOtherable, index: DNumericable): Partial<number> & Partial<CNumeric>;
  get_current_time(): DOtherField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  get_current_timestamp(): DOtherField;
  getvariable(col0: DVarcharable): Partial<CAny>;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  grade_up(list: DArrayable, col1: DVarcharable | DOtherable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Returns the highest value of the set of input parameters	@example greatest(42, 84)*/
  greatest(arg1: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  greatest_common_divisor(x: DNumericable, y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  hamming(str1: DVarcharable, str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example hash('🦆')*/
  hash(param: DAnyable, ...args: DAnyable[]): Partial<number> & Partial<CNumeric>;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DOtherable): Partial<CVarchar>;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DNumericable): Partial<CVarchar>;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DVarcharable): Partial<CVarchar>;
  /**@description Extract the hour component from a date or timestamp	@example hour(timestamp '2021-08-03 11:59:44.123456')*/
  hour(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  icu_sort_key(col0: DVarcharable, col1: DVarcharable): Partial<CVarchar>;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example ilike_escape('A%c', 'a$%C', '$')*/
  ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns whether or not the database/schema are in the search path	@example in_search_path('memory', 'main')*/
  in_search_path(databaseName: DVarcharable, schemaName: DVarcharable): DBoolField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  instr(haystack: DVarcharable, needle: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example is_histogram_other_bin(v)*/
  is_histogram_other_bin(val: DAnyable): DBoolField;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(x: DOtherable): DBoolField;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(x: DNumericable): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(x: DOtherable): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(x: DNumericable): DBoolField;
  /**@description Returns true if the floating point value is not a number, false otherwise	@example isnan('NaN'::FLOAT)*/
  isnan(x: DNumericable): DBoolField;
  /**@description Extract the isodow component from a date or timestamp	@example isodow(timestamp '2021-08-03 11:59:44.123456')*/
  isodow(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the isoyear component from a date or timestamp	@example isoyear(timestamp '2021-08-03 11:59:44.123456')*/
  isoyear(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaccard('duck','luck')*/
  jaccard(str1: DVarcharable, str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_similarity('duck', 'duckdb', 0.5)*/
  jaro_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_winkler_similarity('duck', 'duckdb', 0.5)*/
  jaro_winkler_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  json_array(...args: DAnyable[]): DJsonField;
  json_array_length(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_array_length(col0: DJsonable, col1: DArrayable): DArrayField;
  json_array_length(col0: DJsonable, col1: DVarcharable | DOtherable): Partial<number> & Partial<CNumeric>;
  json_array_length(col0: DVarcharable, col1: DVarcharable | DOtherable): Partial<number> & Partial<CNumeric>;
  json_contains(col0: DJsonable, col1: DJsonable | DVarcharable): DBoolField;
  json_contains(col0: DVarcharable, col1: DVarcharable | DJsonable): DBoolField;
  json_deserialize_sql(col0: DJsonable): Partial<CVarchar>;
  json_exists(col0: DJsonable, col1: DVarcharable): DBoolField;
  json_exists(col0: DVarcharable, col1: DVarcharable): DBoolField;
  json_exists(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_exists(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DVarcharable, col1: DVarcharable | DNumericable): DJsonField;
  json_extract_path(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DVarcharable, col1: DVarcharable | DNumericable): Partial<CVarchar>;
  json_extract_path_text(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DJsonable, col1: DNumericable | DVarcharable): Partial<CVarchar>;
  json_extract_path_text(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DVarcharable, col1: DNumericable | DVarcharable): Partial<CVarchar>;
  json_extract_string(col0: DJsonable, col1: DNumericable | DVarcharable): Partial<CVarchar>;
  json_extract_string(col0: DJsonable, col1: DArrayable): DArrayField;
  json_keys(col0: DVarcharable, col1: DArrayable | DVarcharable | DOtherable): DArrayField;
  json_keys(col0: DJsonable, col1: DOtherable | DVarcharable | DArrayable): DArrayField;
  json_merge_patch(...args: DAnyable[]): DJsonField;
  json_object(...args: DAnyable[]): DJsonField;
  json_pretty(col0: DJsonable): Partial<CVarchar>;
  json_quote(...args: DAnyable[]): DJsonField;
  json_serialize_plan(col0: DVarcharable, col1: DBoolable | DOtherable, col2: DBoolable | DOtherable, col3: DOtherable | DBoolable, col4: DOtherable | DBoolable): DJsonField;
  json_serialize_sql(col0: DVarcharable, col1: DOtherable | DBoolable, col2: DOtherable | DBoolable, col3: DOtherable | DBoolable): DJsonField;
  json_structure(col0: DVarcharable): DJsonField;
  json_structure(col0: DJsonable): DJsonField;
  json_transform(col0: DVarcharable, col1: DVarcharable): Partial<CAny>;
  json_transform(col0: DJsonable, col1: DVarcharable): Partial<CAny>;
  json_transform_strict(col0: DVarcharable, col1: DVarcharable): Partial<CAny>;
  json_transform_strict(col0: DJsonable, col1: DVarcharable): Partial<CAny>;
  json_type(col0: DVarcharable, col1: DVarcharable | DOtherable): Partial<CVarchar>;
  json_type(col0: DJsonable, col1: DArrayable): DArrayField;
  json_type(col0: DJsonable, col1: DVarcharable | DOtherable): Partial<CVarchar>;
  json_type(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_valid(col0: DVarcharable): DBoolField;
  json_valid(col0: DJsonable): DBoolField;
  json_value(col0: DJsonable, col1: DNumericable | DVarcharable): Partial<CVarchar>;
  json_value(col0: DJsonable, col1: DArrayable): DArrayField;
  json_value(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_value(col0: DVarcharable, col1: DVarcharable | DNumericable): Partial<CVarchar>;
  /**@description Extract the Julian Day number from a date or timestamp	@example julian(timestamp '2006-01-01 12:00')*/
  julian(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the last day of the month	@example last_day(TIMESTAMP '1992-03-22 01:02:03.1234')*/
  last_day(ts: DOtherable): DOtherField;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lcase(string: DVarcharable): Partial<CVarchar>;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  lcm(x: DNumericable, y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the lowest value of the set of input parameters	@example least(42, 84)*/
  least(arg1: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  least_common_multiple(x: DNumericable, y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the left-most count characters	@example left('Hello🦆', 2)*/
  left(string: DVarcharable, count: DNumericable): Partial<CVarchar>;
  /**@description Extract the left-most count grapheme clusters	@example left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  left_grapheme(string: DVarcharable, count: DNumericable): Partial<CVarchar>;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(string: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(string: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(string: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  length(string: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  length(string: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Number of grapheme clusters in string.	@example length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')*/
  length_grapheme(string: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  levenshtein(str1: DVarcharable, str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the log of the gamma function	@example lgamma(2)*/
  lgamma(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example like_escape('a%c', 'a$%c', '$')*/
  like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  list_aggr(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Executes the aggregate function name on the elements of list	@example list_aggregate([1, 2, NULL], 'min')*/
  list_aggregate(list: DArrayable, name: DVarcharable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  list_apply(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  list_cat(list1: DArrayable, list2: DArrayable): DArrayField;
  /**@description Concatenates two lists.	@example list_concat([2, 3], [4, 5, 6])*/
  list_concat(list1: DArrayable, list2: DArrayable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  list_contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Compute the cosine distance between two lists	@example list_cosine_distance([1, 2, 3], [1, 2, 3])*/
  list_cosine_distance(list1: DArrayable, list2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the cosine similarity between two lists	@example list_cosine_similarity([1, 2, 3], [1, 2, 3])*/
  list_cosine_similarity(list1: DArrayable, list2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the distance between two lists	@example list_distance([1, 2, 3], [1, 2, 3])*/
  list_distance(list1: DArrayable, list2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Removes all duplicates and NULLs from a list. Does not preserve the original order	@example list_distinct([1, 1, NULL, -3, 1, 5])*/
  list_distinct(list: DArrayable): DArrayField;
  /**@description Compute the inner product between two lists	@example list_inner_product([1, 2, 3], [1, 2, 3])*/
  list_dot_product(list1: DArrayable, list2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(list: DVarcharable, index: DNumericable): Partial<CVarchar>;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(list: DArrayable, index: DNumericable): Partial<CAny>;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(list: DVarcharable, index: DNumericable): Partial<CVarchar>;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(list: DArrayable, index: DNumericable): Partial<CAny>;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  list_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  list_grade_up(list: DArrayable, col1: DVarcharable | DOtherable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  list_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Returns true if all elements of l2 are in l1. NULLs are ignored.	@example list_has_all([1, 2, 3], [2, 3])*/
  list_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns true if the lists have any element in common. NULLs are ignored.	@example list_has_any([1, 2, 3], [2, 3, 4])*/
  list_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  list_indexof(list: DArrayable, element: DAnyable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the inner product between two lists	@example list_inner_product([1, 2, 3], [1, 2, 3])*/
  list_inner_product(list1: DArrayable, list2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the negative inner product between two lists	@example list_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  list_negative_dot_product(list1: DArrayable, list2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Compute the negative inner product between two lists	@example list_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  list_negative_inner_product(list1: DArrayable, list2: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Create a LIST containing the argument values	@example list_value(4, 5, 6)*/
  list_pack(...args: DAnyable[]): DArrayField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  list_position(list: DArrayable, element: DAnyable): Partial<number> & Partial<CNumeric>;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  list_reduce(list: DArrayable, lambda: DOtherable): Partial<CAny>;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  list_resize(list: DArrayable, size: DAnyable, value: DOtherable | DAnyable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  list_reverse_sort(list: DArrayable, col1: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  list_select(valueList: DArrayable, indexList: DArrayable): DArrayField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  list_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step: DNumericable | DOtherable): Partial<CAny>;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  list_sort(list: DArrayable, col1: DVarcharable | DOtherable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  list_transform(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Counts the unique elements of a list	@example list_unique([1, 1, NULL, -3, 1, 5])*/
  list_unique(list: DArrayable): Partial<number> & Partial<CNumeric>;
  /**@description Create a LIST containing the argument values	@example list_value(4, 5, 6)*/
  list_value(...args: DAnyable[]): DArrayField;
  /**@description Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example list_where([10, 20, 30, 40], [true, false, false, true])*/
  list_where(valueList: DArrayable, maskList: DArrayable): DArrayField;
  /**@description Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example list_zip([1, 2], [3, 4], [5, 6])*/
  list_zip(...args: DAnyable[]): DArrayField;
  /**@description Computes the natural logarithm of x	@example ln(2)*/
  ln(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example log(2, 64)*/
  log(b: DNumericable, x: DOtherable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the 10-log of x	@example log10(1000)*/
  log10(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the 2-log of x	@example log2(8)*/
  log2(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lower(string: DVarcharable): Partial<CVarchar>;
  /**@description Pads the string with the character from the left until it has count characters	@example lpad('hello', 10, '>')*/
  lpad(string: DVarcharable, count: DNumericable, character: DVarcharable): Partial<CVarchar>;
  /**@description Removes any occurrences of any of the characters from the left side of the string	@example ltrim('>>>>test<<', '><')*/
  ltrim(string: DVarcharable, characters: DOtherable | DVarcharable): Partial<CVarchar>;
  make_date(col0: DNumericable): DOtherField;
  /**@description The date for the given parts	@example make_date(1992, 9, 20)*/
  make_date(year: DNumericable, month: DNumericable, day: DNumericable): DOtherField;
  /**@description The date for the given struct.	@example make_date({'year': 2024, 'month': 11, 'day': 14})*/
  make_date(dateStruct: DNumericable): DOtherField;
  /**@description The time for the given parts	@example make_time(13, 34, 27.123456)*/
  make_time(hour: DNumericable, minute: DNumericable, seconds: DNumericable): DOtherField;
  /**@description The timestamp for the given parts	@example make_timestamp(1992, 9, 20, 13, 34, 27.123456)*/
  make_timestamp(year: DNumericable, month: DOtherable | DNumericable, day: DOtherable | DNumericable, hour: DOtherable | DNumericable, minute: DOtherable | DNumericable, seconds: DOtherable | DNumericable): DOtherField;
  /**@description The timestamp for the given nanoseconds since epoch	@example make_timestamp(1732117793000000000)*/
  make_timestamp_ns(nanos: DNumericable): DOtherField;
  make_timestamptz(col0: DNumericable, col1: DNumericable | DOtherable, col2: DNumericable | DOtherable, col3: DNumericable | DOtherable, col4: DNumericable | DOtherable, col5: DNumericable | DOtherable, col6: DOtherable | DVarcharable): DOtherField;
  /**@description Creates a map from a set of keys and values	@example map(['key1', 'key2'], ['val1', 'val2'])*/
  map(...args: DAnyable[]): DMapField;
  /**@description Returns a map created from merging the input maps, on key collision the value is taken from the last map with that key	@example map_concat(map([1,2], ['a', 'b']), map([2,3], ['c', 'd']));*/
  map_concat(...args: DAnyable[]): DArrayField;
  /**@description Checks if a map contains a given key.	@example map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  map_contains(map: DMapable, key: DAnyable): DBoolField;
  /**@description Returns the map entries as a list of keys/values	@example map_entries(map(['key'], ['val']))*/
  map_entries(...args: DAnyable[]): DArrayField;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  map_extract(map: DAnyable, key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract_value(map(['key'], ['val']), 'key')*/
  map_extract_value(map: DAnyable, key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns a map created from the entries of the array	@example map_from_entries([{k: 5, v: 'val1'}, {k: 3, v: 'val2'}]);*/
  map_from_entries(...args: DAnyable[]): DMapField;
  /**@description Returns the keys of a map as a list	@example map_keys(map(['key'], ['val']))*/
  map_keys(...args: DAnyable[]): DArrayField;
  /**@description Returns the values of a map as a list	@example map_values(map(['key'], ['val']))*/
  map_values(...args: DAnyable[]): DArrayField;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(value: DVarcharable): Partial<CVarchar>;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(value: DOtherable): Partial<CVarchar>;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(value: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(value: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the microsecond component from a date or timestamp	@example microsecond(timestamp '2021-08-03 11:59:44.123456')*/
  microsecond(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the millennium component from a date or timestamp	@example millennium(timestamp '2021-08-03 11:59:44.123456')*/
  millennium(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the millisecond component from a date or timestamp	@example millisecond(timestamp '2021-08-03 11:59:44.123456')*/
  millisecond(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the minute component from a date or timestamp	@example minute(timestamp '2021-08-03 11:59:44.123456')*/
  minute(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  mismatches(str1: DVarcharable, str2: DVarcharable): Partial<number> & Partial<CNumeric>;
  mod(col0: DNumericable, col1: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the month component from a date or timestamp	@example month(timestamp '2021-08-03 11:59:44.123456')*/
  month(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description The (English) name of the month	@example monthname(TIMESTAMP '1992-09-20')*/
  monthname(ts: DOtherable): Partial<CVarchar>;
  multiply(col0: DNumericable, col1: DNumericable): Partial<number> & Partial<CNumeric>;
  multiply(col0: DOtherable, col1: DNumericable): DOtherField;
  multiply(col0: DNumericable, col1: DOtherable): DOtherField;
  /**@description Extract the nanosecond component from a date or timestamp	@example nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789*/
  nanosecond(tsns: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the next floating point value after x in the direction of y	@example nextafter(1::float, 2::float)*/
  nextafter(x: DNumericable, y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Return the following value of the sequence.	@example nextval('my_sequence_name')*/
  nextval(sequenceName: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example nfc_normalize('ardèch')*/
  nfc_normalize(string: DVarcharable): Partial<CVarchar>;
  /**@description Normalizes an INTERVAL to an equivalent interval	@example normalized_interval(INTERVAL '30 days')*/
  normalized_interval(interval: DOtherable): DOtherField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_ilike_escape('A%c', 'a$%C', '$')*/
  not_ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_like_escape('a%c', 'a$%c', '$')*/
  not_like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  now(): DOtherField;
  /**@description Number of bytes in blob.	@example octet_length('\xAA\xBB'::BLOB)*/
  octet_length(blob: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  ord(str: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirname('path/to/file.csv', 'system')*/
  parse_dirname(string: DVarcharable, separator: DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirpath('path/to/file.csv', 'system')*/
  parse_dirpath(string: DVarcharable, separator: DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example parse_filename('path/to/file.csv', true, 'forward_slash')*/
  parse_filename(string: DVarcharable, trimExtension: DOtherable | DBoolable | DVarcharable, separator: DOtherable | DVarcharable): Partial<CVarchar>;
  /**@description Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example parse_path('path/to/file.csv', 'system')*/
  parse_path(string: DVarcharable, separator: DVarcharable | DOtherable): DArrayField;
  /**@description Returns the value of pi	@example pi()*/
  pi(): Partial<number> & Partial<CNumeric>;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  position(haystack: DVarcharable, needle: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  pow(x: DNumericable, y: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  power(x: DNumericable, y: DNumericable): Partial<number> & Partial<CNumeric>;
  prefix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Formats a string using printf syntax	@example printf('Benchmark "%s" took %d seconds', 'CSV', 42)*/
  printf(format: DVarcharable, ...args: DAnyable[]): Partial<CVarchar>;
  /**@description Extract the quarter component from a date or timestamp	@example quarter(timestamp '2021-08-03 11:59:44.123456')*/
  quarter(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Converts degrees to radians	@example radians(90)*/
  radians(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns a random number between 0 and 1	@example random()*/
  random(): Partial<number> & Partial<CNumeric>;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(start: DNumericable, stop: DNumericable | DOtherable, step: DOtherable | DNumericable): DArrayField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(start: DOtherable, stop: DOtherable, step: DOtherable): DArrayField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  reduce(list: DArrayable, lambda: DOtherable): Partial<CAny>;
  /**@description Escapes all potentially meaningful regexp characters in the input string	@example regexp_escape('https://duckdb.org')*/
  regexp_escape(string: DVarcharable): Partial<CVarchar>;
  /**@description If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example regexp_extract('abc', '([a-z])(b)', 1)*/
  regexp_extract(string: DVarcharable, pattern: DVarcharable | RegExpable, group0: DOtherable | DNumericable | DArrayable, options: DOtherable | DVarcharable): Partial<CVarchar>;
  /**@description Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example regexp_extract_all('hello_world', '([a-z ]+)_?', 1)*/
  regexp_extract_all(string: DVarcharable, regex: DVarcharable | RegExpable, group0: DNumericable | DOtherable, options: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the entire string matches the regex. A set of optional options can be set.	@example regexp_full_match('anabanana', '(an)*')*/
  regexp_full_match(string: DVarcharable, regex: DVarcharable | RegExpable, options: DOtherable | DVarcharable): DBoolField;
  /**@description Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example regexp_matches('anabanana', '(an)*')*/
  regexp_matches(string: DVarcharable, pattern: DVarcharable | RegExpable, options: DOtherable | DVarcharable): DBoolField;
  /**@description If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example regexp_replace('hello', '[lo]', '-')*/
  regexp_replace(string: DVarcharable, pattern: DVarcharable | RegExpable, replacement: DVarcharable, options: DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  regexp_split_to_array(string: DVarcharable, separator: DVarcharable | RegExpable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DVarcharable, count: DNumericable): Partial<CVarchar>;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DOtherable, count: DNumericable): DOtherField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DArrayable, count: DNumericable): DArrayField;
  /**@description Replaces any occurrences of the source with target in string	@example replace('hello', 'l', '-')*/
  replace(string: DVarcharable, source: DVarcharable, target: DVarcharable): Partial<CVarchar>;
  /**@description Reverses the string	@example reverse('hello')*/
  reverse(string: DVarcharable): Partial<CVarchar>;
  /**@description Extract the right-most count characters	@example right('Hello🦆', 3)*/
  right(string: DVarcharable, count: DNumericable): Partial<CVarchar>;
  /**@description Extract the right-most count grapheme clusters	@example right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  right_grapheme(string: DVarcharable, count: DNumericable): Partial<CVarchar>;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(x: DNumericable, precision: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(x: DNumericable, precision: DOtherable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Create an unnamed STRUCT (tuple) containing the argument values.	@example row(i, i % 4, i / 4)*/
  row(...args: DAnyable[]): DStructField;
  row_to_json(...args: DAnyable[]): DJsonField;
  /**@description Pads the string with the character from the right until it has count characters	@example rpad('hello', 10, '<')*/
  rpad(string: DVarcharable, count: DNumericable, character: DVarcharable): Partial<CVarchar>;
  /**@description Removes any occurrences of any of the characters from the right side of the string	@example rtrim('>>>>test<<', '><')*/
  rtrim(string: DVarcharable, characters: DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Extract the second component from a date or timestamp	@example second(timestamp '2021-08-03 11:59:44.123456')*/
  second(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring	@example set_bit('0110010'::BIT, 2, 0)*/
  set_bit(bitstring: DOtherable, index: DNumericable, newValue: DNumericable): DOtherField;
  /**@description Sets the seed to be used for the random function	@example setseed(0.42)*/
  setseed(col0: DNumericable): DOtherField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(value: DVarcharable): Partial<CVarchar>;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(value: DOtherable): Partial<CVarchar>;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(value: DVarcharable): Partial<CVarchar>;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(value: DOtherable): Partial<CVarchar>;
  /**@description Returns the sign of x as -1, 0 or 1	@example sign(-349)*/
  sign(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns whether the signbit is set or not	@example signbit(-0.0)*/
  signbit(x: DNumericable): DBoolField;
  /**@description Computes the sin of x	@example sin(90)*/
  sin(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the hyperbolic sin of x	@example sinh(1)*/
  sinh(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the square root of x	@example sqrt(4)*/
  sqrt(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns true if string begins with search_string	@example starts_with('abc','a')*/
  starts_with(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example stats(5)*/
  stats(expression: DAnyable): Partial<CVarchar>;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  str_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  str_split_regex(string: DVarcharable, separator: DVarcharable, col2: DOtherable | DVarcharable): DArrayField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(data: DOtherable, format: DVarcharable): Partial<CVarchar>;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(data: DVarcharable, format: DOtherable): Partial<CVarchar>;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  string_split_regex(string: DVarcharable, separator: DVarcharable, col2: DVarcharable | DOtherable): DArrayField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_to_array(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Strips accents from string.	@example strip_accents('mühleisen')*/
  strip_accents(string: DVarcharable): Partial<CVarchar>;
  /**@description Number of bytes in string.	@example strlen('🦆')*/
  strlen(string: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  strpos(haystack: DVarcharable, needle: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Converts the string text to timestamp applying the format strings in the list until one succeeds. Throws an error on failure. To return NULL on failure, use try_strptime.	@example strptime('4/15/2023 10:56:00', ['%d/%m/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S'])*/
  strptime(text: DVarcharable, formatList: DArrayable | DVarcharable): DOtherField;
  /**@description Merge the multiple STRUCTs into a single STRUCT.	@example struct_concat(struct_pack(i := 4), struct_pack(s := 'string'))*/
  struct_concat(...args: DAnyable[]): DStructField;
  /**@description Extract the named entry from the STRUCT.	@example struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i')*/
  struct_extract(struct: DStructable, entry: DNumericable | DVarcharable): Partial<CAny>;
  /**@description Extract the entry from the STRUCT by position (starts at 1!).	@example struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2)*/
  struct_extract_at(struct: DStructable, entry: DNumericable): Partial<CAny>;
  /**@description Adds field(s)/value(s) to an existing STRUCT with the argument values. The entry name(s) will be the bound variable name(s)	@example struct_insert({'a': 1}, b := 2)*/
  struct_insert(...args: DAnyable[]): DStructField;
  /**@description Create a STRUCT containing the argument values. The entry name will be the bound variable name.	@example struct_pack(i := 4, s := 'string')*/
  struct_pack(...args: DAnyable[]): DStructField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substr(string: DVarcharable, start: DNumericable, length: DOtherable | DNumericable): Partial<CVarchar>;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substring(string: DVarcharable, start: DNumericable, length: DOtherable | DNumericable): Partial<CVarchar>;
  /**@description Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)*/
  substring_grapheme(string: DVarcharable, start: DNumericable, length: DOtherable | DNumericable): Partial<CVarchar>;
  subtract(col0: DNumericable, col1: DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  subtract(col0: DNumericable, col1: DOtherable | DNumericable): Partial<number> & Partial<CNumeric>;
  subtract(col0: DOtherable, col1: DOtherable): DOtherField;
  subtract(col0: DOtherable, col1: DOtherable | DNumericable): DOtherField;
  subtract(col0: DOtherable, col1: DOtherable): Partial<number> & Partial<CNumeric>;
  suffix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Computes the tan of x	@example tan(90)*/
  tan(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the hyperbolic tan of x	@example tanh(1)*/
  tanh(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets	@example time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07')*/
  time_bucket(bucketWidth: DOtherable, timestamp: DOtherable, origin: DOtherable | DVarcharable): DOtherField;
  /**@description Converts a TIME WITH TIME ZONE to an integer sort key	@example timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)*/
  timetz_byte_comparable(timeTz: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DVarcharable, col1: DOtherable): DOtherField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DOtherable, col1: DOtherable): DOtherField;
  /**@description Extract the timezone_hour component from a date or timestamp	@example timezone_hour(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_hour(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the timezone_minute component from a date or timestamp	@example timezone_minute(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_minute(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example to_base(42, 16)*/
  to_base(number: DNumericable, radix: DNumericable, minLength: DOtherable | DNumericable): Partial<CVarchar>;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  to_base64(blob: DOtherable): Partial<CVarchar>;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DVarcharable): Partial<CVarchar>;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DOtherable): Partial<CVarchar>;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DNumericable): Partial<CVarchar>;
  /**@description Construct a century interval	@example to_centuries(5)*/
  to_centuries(integer: DNumericable): DOtherField;
  /**@description Construct a day interval	@example to_days(5)*/
  to_days(integer: DNumericable): DOtherField;
  /**@description Construct a decade interval	@example to_decades(5)*/
  to_decades(integer: DNumericable): DOtherField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DVarcharable): Partial<CVarchar>;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DNumericable): Partial<CVarchar>;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DOtherable): Partial<CVarchar>;
  /**@description Construct a hour interval	@example to_hours(5)*/
  to_hours(integer: DNumericable): DOtherField;
  to_json(...args: DAnyable[]): DJsonField;
  /**@description Construct a microsecond interval	@example to_microseconds(5)*/
  to_microseconds(integer: DNumericable): DOtherField;
  /**@description Construct a millenium interval	@example to_millennia(1)*/
  to_millennia(integer: DNumericable): DOtherField;
  /**@description Construct a millisecond interval	@example to_milliseconds(5.5)*/
  to_milliseconds(double: DNumericable): DOtherField;
  /**@description Construct a minute interval	@example to_minutes(5)*/
  to_minutes(integer: DNumericable): DOtherField;
  /**@description Construct a month interval	@example to_months(5)*/
  to_months(integer: DNumericable): DOtherField;
  /**@description Construct a quarter interval	@example to_quarters(5)*/
  to_quarters(integer: DNumericable): DOtherField;
  /**@description Construct a second interval	@example to_seconds(5.5)*/
  to_seconds(double: DNumericable): DOtherField;
  /**@description Converts secs since epoch to a timestamp with time zone	@example to_timestamp(1284352323.5)*/
  to_timestamp(sec: DNumericable): DOtherField;
  /**@description Construct a week interval	@example to_weeks(5)*/
  to_weeks(integer: DNumericable): DOtherField;
  /**@description Construct a year interval	@example to_years(5)*/
  to_years(integer: DNumericable): DOtherField;
  today(): DOtherField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  transaction_timestamp(): DOtherField;
  /**@description Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example translate('12345', '143', 'ax')*/
  translate(string: DVarcharable, from: DVarcharable, to: DVarcharable): Partial<CVarchar>;
  /**@description Removes any occurrences of any of the characters from either side of the string	@example trim('>>>>test<<', '><')*/
  trim(string: DVarcharable, characters: DOtherable | DVarcharable): Partial<CVarchar>;
  /**@description Truncates the number	@example trunc(17.4)*/
  trunc(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  try_strptime(text: DVarcharable, format: DArrayable | DVarcharable): DOtherField;
  /**@description Returns the current transaction’s ID (a BIGINT). It will assign a new one if the current transaction does not have one already	@example txid_current()*/
  txid_current(): Partial<number> & Partial<CNumeric>;
  /**@description Returns the name of the data type of the result of the expression	@example typeof('abc')*/
  typeof(expression: DAnyable): Partial<CVarchar>;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  ucase(string: DVarcharable): Partial<CVarchar>;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  unbin(value: DVarcharable): DOtherField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  unhex(value: DVarcharable): DOtherField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  unicode(str: DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the value with the named tags from the union. NULL if the tag is not currently selected	@example union_extract(s, 'k')*/
  union_extract(union: DOtherable, tag: DVarcharable): Partial<CAny>;
  /**@description Retrieve the currently selected tag of the union as an ENUM	@example union_tag(union_value(k := 'foo'))*/
  union_tag(union: DOtherable): Partial<CAny>;
  /**@description Create a single member UNION containing the argument value. The tag of the value will be the bound variable name	@example union_value(k := 'hello')*/
  union_value(...args: DAnyable[]): DOtherField;
  /**@description Identical to list_value, but generated as part of unpivot for better error messages	@example unpivot_list(4, 5, 6)*/
  unpivot_list(...args: DAnyable[]): DArrayField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  upper(string: DVarcharable): Partial<CVarchar>;
  /**@description Unescapes the URL encoded input.	@example url_decode('this%20string%20is%2BFencoded')*/
  url_decode(input: DVarcharable): Partial<CVarchar>;
  /**@description Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example url_encode('this string has/ special+ characters>')*/
  url_encode(input: DVarcharable): Partial<CVarchar>;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  uuid(): DOtherField;
  /**@description Returns the VectorType of a given column	@example vector_type(col)*/
  vector_type(col: DAnyable): Partial<CVarchar>;
  /**@description Returns the currently active version of DuckDB in this format: v0.3.2		@example version()*/
  version(): Partial<CVarchar>;
  /**@description Extract the week component from a date or timestamp	@example week(timestamp '2021-08-03 11:59:44.123456')*/
  week(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the weekday component from a date or timestamp	@example weekday(timestamp '2021-08-03 11:59:44.123456')*/
  weekday(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the weekofyear component from a date or timestamp	@example weekofyear(timestamp '2021-08-03 11:59:44.123456')*/
  weekofyear(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Writes to the logger	@example write_log('Hello')*/
  write_log(string: DVarcharable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(left: DNumericable, right: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(left: DOtherable, right: DOtherable): DOtherField;
  /**@description Extract the year component from a date or timestamp	@example year(timestamp '2021-08-03 11:59:44.123456')*/
  year(ts: DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Extract the yearweek component from a date or timestamp	@example yearweek(timestamp '2021-08-03 11:59:44.123456')*/
  yearweek(ts: DOtherable): Partial<number> & Partial<CNumeric>;
}
export type DGlobalComp = Partial<CGlobal>;

export interface CAggregate {
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DAnyable): Partial<CAny>;
  /**@description Computes the approximate count of distinct elements using HyperLogLog.	@example approx_count_distinct(A)*/
  approx_count_distinct(any: DAnyable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DNumericable, pos: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DOtherable, pos: DNumericable): DOtherField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DOtherable | DNumericable, pos: DArrayable): DArrayField;
  /**@description Finds the k approximately most occurring values in the data set	@example approx_top_k(x, 5)*/
  approx_top_k(val: DAnyable, k: DNumericable): DArrayField;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DAnyable): Partial<CAny>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DOtherable | DAnyable, val: DOtherable | DAnyable | DNumericable | DVarcharable): DOtherField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DNumericable, val: DOtherable | DVarcharable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DVarcharable, val: DNumericable | DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DNumericable, val: DNumericable | DOtherable | DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DVarcharable, val: DNumericable | DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DOtherable | DAnyable, val: DNumericable | DVarcharable | DOtherable | DAnyable): DOtherField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DOtherable | DAnyable, val: DOtherable | DVarcharable | DAnyable | DNumericable): DOtherField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DNumericable, val: DOtherable | DNumericable | DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DVarcharable, val: DOtherable | DVarcharable | DNumericable): Partial<CVarchar>;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DNumericable, val: DOtherable | DNumericable | DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DOtherable | DAnyable, val: DVarcharable | DNumericable | DOtherable | DAnyable): DOtherField;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DVarcharable, val: DNumericable | DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DOtherable | DAnyable, val: DVarcharable | DNumericable | DOtherable | DAnyable): DOtherField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DVarcharable, val: DNumericable | DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DNumericable, val: DOtherable | DVarcharable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DNumericable, val: DVarcharable | DNumericable | DOtherable): Partial<number> & Partial<CNumeric>;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DOtherable | DAnyable, val: DNumericable | DVarcharable | DOtherable | DAnyable): DOtherField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DVarcharable, val: DNumericable | DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Returns a LIST containing all the values of a column.	@example list(A)*/
  array_agg(arg: DAnyable): DArrayField;
  /**@description Calculates the average value for all tuples in x.	@example SUM(x) / COUNT(*)*/
  avg(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the bitwise AND of all bits in a given expression.	@example bit_and(A)*/
  bit_and(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the bitwise AND of all bits in a given expression.	@example bit_and(A)*/
  bit_and(arg: DOtherable): DOtherField;
  /**@description Returns the bitwise OR of all bits in a given expression.	@example bit_or(A)*/
  bit_or(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the bitwise OR of all bits in a given expression.	@example bit_or(A)*/
  bit_or(arg: DOtherable): DOtherField;
  /**@description Returns the bitwise XOR of all bits in a given expression.	@example bit_xor(A)*/
  bit_xor(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the bitwise XOR of all bits in a given expression.	@example bit_xor(A)*/
  bit_xor(arg: DOtherable): DOtherField;
  /**@description Returns a bitstring with bits set for each distinct value.	@example bitstring_agg(A)*/
  bitstring_agg(arg: DNumericable, col1: DNumericable | DOtherable, col2: DNumericable | DOtherable): DOtherField;
  /**@description Returns TRUE if every input value is TRUE, otherwise FALSE.	@example bool_and(A)*/
  bool_and(arg: DBoolable): DBoolField;
  /**@description Returns TRUE if any input value is TRUE, otherwise FALSE.	@example bool_or(A)*/
  bool_or(arg: DBoolable): DBoolField;
  /**@description Returns the correlation coefficient for non-null pairs in a group.	@example COVAR_POP(y, x) / (STDDEV_POP(x) * STDDEV_POP(y))*/
  corr(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the number of non-null values in arg.	@example count(A)*/
  count(arg: DOtherable | DAnyable): Partial<number> & Partial<CNumeric>;
  /**@description Counts the total number of TRUE values for a boolean column	@example count_if(A)*/
  count_if(arg: DBoolable): Partial<number> & Partial<CNumeric>;
  count_star(): Partial<number> & Partial<CNumeric>;
  /**@description Counts the total number of TRUE values for a boolean column	@example count_if(A)*/
  countif(arg: DBoolable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the population covariance of input values.	@example (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)*/
  covar_pop(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the sample covariance for non-null pairs in a group.	@example (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / (COUNT(*) - 1)*/
  covar_samp(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the log-2 entropy of count input-values.*/
  entropy(x: DAnyable): Partial<number> & Partial<CNumeric>;
  /**@description Calculates the average using a more accurate floating point summation (Kahan Sum)	@example favg(A)*/
  favg(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  first(arg: DAnyable): Partial<CAny>;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  first(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example kahan_sum(A)*/
  fsum(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Concatenates the column string values with an optional separator.	@example string_agg(A, '-')*/
  group_concat(str: DAnyable, arg: DVarcharable | DOtherable): Partial<CVarchar>;
  /**@description Returns a LIST of STRUCTs with the fields bucket and count.	@example histogram(A)*/
  histogram(arg: DAnyable, col1: DArrayable | DOtherable): DMapField;
  /**@description Returns a LIST of STRUCTs with the fields bucket and count matching the buckets exactly.	@example histogram_exact(A, [0, 1, 2])*/
  histogram_exact(arg: DAnyable, bins: DArrayable): DMapField;
  /**@description Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example kahan_sum(A)*/
  kahan_sum(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the excess kurtosis (Fisher’s definition) of all input values, with a bias correction according to the sample size*/
  kurtosis(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the excess kurtosis (Fisher’s definition) of all input values, without bias correction*/
  kurtosis_pop(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the last value of a column. This function is affected by ordering.	@example last(A)*/
  last(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the last value of a column. This function is affected by ordering.	@example last(A)*/
  last(arg: DAnyable): Partial<CAny>;
  /**@description Returns a LIST containing all the values of a column.	@example list(A)*/
  list(arg: DAnyable): DArrayField;
  /**@description Concatenates the column string values with an optional separator.	@example string_agg(A, '-')*/
  listagg(str: DAnyable, arg: DOtherable | DVarcharable): Partial<CVarchar>;
  /**@description Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example mad(x)*/
  mad(x: DOtherable): DOtherField;
  /**@description Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example mad(x)*/
  mad(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the maximum value present in arg.	@example max(A)*/
  max(arg: DAnyable, col1: DNumericable): DArrayField;
  /**@description Returns the maximum value present in arg.	@example max(A)*/
  max(arg: DAnyable): Partial<CAny>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DOtherable | DAnyable, val: DNumericable | DVarcharable | DOtherable | DAnyable): DOtherField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DNumericable, val: DOtherable | DVarcharable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DVarcharable, val: DOtherable | DNumericable | DVarcharable): Partial<CVarchar>;
  /**@description Calculates the average value for all tuples in x.	@example SUM(x) / COUNT(*)*/
  mean(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the middle value of the set. NULL values are ignored. For even value counts, quantitative values are averaged and ordinal values return the lower value.	@example median(x)*/
  median(x: DAnyable): Partial<CAny>;
  /**@description Returns the minimum value present in arg.	@example min(A)*/
  min(arg: DAnyable): Partial<CAny>;
  /**@description Returns the minimum value present in arg.	@example min(A)*/
  min(arg: DAnyable, col1: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DOtherable | DAnyable, val: DNumericable | DVarcharable | DAnyable | DOtherable): DOtherField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DNumericable, val: DOtherable | DNumericable | DVarcharable): Partial<number> & Partial<CNumeric>;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DVarcharable, val: DOtherable | DVarcharable | DNumericable): Partial<CVarchar>;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Returns the most frequent value for the values within x. NULL values are ignored.*/
  mode(x: DAnyable): Partial<CAny>;
  /**@description Calculates the product of all tuples in arg.	@example product(A)*/
  product(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example quantile_disc(x, 0.5)*/
  quantile(x: DAnyable, pos: DOtherable | DArrayable | DNumericable): Partial<CAny>;
  /**@description Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example quantile_cont(x, 0.5)*/
  quantile_cont(x: DNumericable, pos: DArrayable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example quantile_cont(x, 0.5)*/
  quantile_cont(x: DOtherable, pos: DNumericable | DArrayable): DOtherField;
  /**@description Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example quantile_disc(x, 0.5)*/
  quantile_disc(x: DAnyable, pos: DOtherable | DArrayable | DNumericable): Partial<CAny>;
  /**@description Returns the average of the independent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.*/
  regr_avgx(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the average of the dependent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.*/
  regr_avgy(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the number of non-null number pairs in a group.	@example (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)*/
  regr_count(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the intercept of the univariate linear regression line for non-null pairs in a group.	@example AVG(y)-REGR_SLOPE(y,x)*AVG(x)*/
  regr_intercept(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the coefficient of determination for non-null pairs in a group.*/
  regr_r2(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the slope of the linear regression line for non-null pairs in a group.	@example COVAR_POP(x,y) / VAR_POP(x)*/
  regr_slope(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@example REGR_COUNT(y, x) * VAR_POP(x)*/
  regr_sxx(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the population covariance of input values	@example REGR_COUNT(y, x) * COVAR_POP(y, x)*/
  regr_sxy(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@example REGR_COUNT(y, x) * VAR_POP(y)*/
  regr_syy(y: DNumericable, x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example reservoir_quantile(A,0.5,1024)*/
  reservoir_quantile(x: DNumericable, quantile: DNumericable, sampleSize: DOtherable | DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example reservoir_quantile(A,0.5,1024)*/
  reservoir_quantile(x: DNumericable, quantile: DArrayable, sampleSize: DNumericable | DOtherable): DArrayField;
  /**@description Returns the standard error of the mean*/
  sem(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the skewness of all input values.	@example skewness(A)*/
  skewness(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the sample standard deviation	@example sqrt(var_samp(x))*/
  stddev(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the population standard deviation.	@example sqrt(var_pop(x))*/
  stddev_pop(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the sample standard deviation	@example sqrt(var_samp(x))*/
  stddev_samp(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Concatenates the column string values with an optional separator.	@example string_agg(A, '-')*/
  string_agg(str: DAnyable, arg: DOtherable | DVarcharable): Partial<CVarchar>;
  /**@description Calculates the sum value for all tuples in arg.	@example sum(A)*/
  sum(arg: DNumericable | DBoolable): Partial<number> & Partial<CNumeric>;
  /**@description Internal only. Calculates the sum value for all tuples in arg without overflow checks.	@example sum_no_overflow(A)*/
  sum_no_overflow(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example kahan_sum(A)*/
  sumkahan(arg: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the population variance.*/
  var_pop(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the sample variance of all input values.	@example (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)*/
  var_samp(x: DNumericable): Partial<number> & Partial<CNumeric>;
  /**@description Returns the sample variance of all input values.	@example (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)*/
  variance(x: DNumericable): Partial<number> & Partial<CNumeric>;
}
export type DAggregateComp = Partial<CAggregate>;
