export type DAnyable = any | DAnyField | _DAnyField;
export type DArrayable = any[] | DArrayField | _DArrayField;
export type DBlobable = string | DBlobField | _DBlobField;
export type DBoolable = boolean | DBoolField | _DBoolField;
export type DDateable = Date | DDateField | _DDateField;
export type DJsonable = Record<string, any> | DJsonField | _DJsonField;
export type DMapable = Map<string, any> | DMapField | _DMapField;
export type DNumericable = number | DNumericField | _DNumericField;
export type DOtherable = any | DOtherField | _DOtherField;
export type DStructable = Record<string, any> | DStructField | _DStructField;
export type DVarcharable = string | DVarcharField | _DVarcharField;
export type RegExpable = RegExp | string;
export type DBOOLEAN_NATIVE = "Bool" | "Boolean" | "Logical";
export type DCOMPOSITE_NATIVE = "List" | "Map" | "Row" | "Struct" | "Union";
export type DDATETIME_NATIVE = "Date" | "Datetime" | "Interval" | "Time" | "Timestamp" | "Timestamptz" | "Timestamp_ms" | "Timestamp_ns" | "Timestamp_s" | "Timestamp_us" | "Timetz";
export type DNUMERIC_NATIVE = "Bigint" | "Dec" | "Decimal" | "Double" | "Float" | "Float4" | "Float8" | "Hugeint" | "Int" | "Int1" | "Int128" | "Int16" | "Int2" | "Int32" | "Int4" | "Int64" | "Int8" | "Integer" | "Integral" | "Long" | "Numeric" | "Oid" | "Real" | "Short" | "Signed" | "Smallint" | "Tinyint" | "Ubigint" | "Uhugeint" | "Uint128" | "Uint16" | "Uint32" | "Uint64" | "Uint8" | "Uinteger" | "Usmallint" | "Utinyint";
export type DSTRING_NATIVE = "Bpchar" | "Char" | "Nvarchar" | "String" | "Text" | "Varchar" | "JSON";
export type DANY_NATIVE = "Binary" | "Bit" | "Bitstring" | "Blob" | "Bytea" | "Enum" | "Guid" | "Null" | "Uuid" | "Varbinary" | "Varint";
export type DSomeField = DVarcharField | DNumericField | DDateField | DOtherField | DNumericField | DVarcharField | DAnyField | DArrayField | DDateField | DStructField | DBlobField | DMapField | DBoolField | DJsonField;
export declare const sId: unique symbol;
export declare const sComptype: unique symbol;
export declare const sAnti: unique symbol;
export declare const sInferred: unique symbol;
interface _DVarcharField extends DAnyField {
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
  date_diff(startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(col1: DDateable | DOtherable): DNumericField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_sub(startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(timestamp: DDateable): DDateField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(timestamp: DOtherable): DOtherField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datediff(startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(col1: DDateable | DOtherable): DNumericField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datesub(startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(timestamp: DDateable): DDateField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(timestamp: DOtherable): DOtherField;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  editdist3(str2: DVarcharable): DNumericField;
  /**@description Convert varchar to blob. Converts utf-8 characters into literal encoding	@example encode('my_string_with_ü')*/
  encode(): DBlobField;
  ends_with(col1: DVarcharable): DBoolField;
  /**@description Throws the given error message	@example error('access_mode')*/
  error(): DOtherField;
  /**@description Formats a string using fmt syntax	@example format('Benchmark "{}" took {} seconds', 'CSV', 42)*/
  format(...args: DAnyable[]): DVarcharField;
  /**@description Convert a base64 encoded string to a character string	@example from_base64('QQ==')*/
  from_base64(): DBlobField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  from_binary(): DBlobField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  from_hex(): DBlobField;
  from_json(col1: DVarcharable): DAnyField;
  from_json_strict(col1: DVarcharable): DAnyField;
  getvariable(): DAnyField;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  hamming(str2: DVarcharable): DNumericField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): DVarcharField;
  html_escape(col1?: DBoolable | DOtherable): DVarcharField;
  html_unescape(): DVarcharField;
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
  jaro_similarity(str2: DVarcharable, scoreCutoff?: DNumericable | DOtherable): DNumericField;
  /**@description The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_winkler_similarity('duck', 'duckdb', 0.5)*/
  jaro_winkler_similarity(str2: DVarcharable, scoreCutoff?: DNumericable | DOtherable): DNumericField;
  json_array_length(col1: DArrayable): DArrayField;
  json_array_length(col1?: DOtherable | DVarcharable): DNumericField;
  json_contains(col1: DJsonable | DVarcharable): DBoolField;
  json_exists(col1: DArrayable): DArrayField;
  json_exists(col1: DVarcharable): DBoolField;
  json_extract(col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col1: DArrayable): DArrayField;
  json_extract_path(col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_string(col1: DArrayable): DArrayField;
  json_extract_string(col1: DNumericable | DVarcharable): DVarcharField;
  json_keys(col1?: DArrayable | DOtherable | DVarcharable): DArrayField;
  json_serialize_plan(col1?: DBoolable | DOtherable, col2?: DBoolable | DOtherable, col3?: DBoolable | DOtherable, col4?: DBoolable | DOtherable): DJsonField;
  json_serialize_sql(col1?: DBoolable | DOtherable, col2?: DBoolable | DOtherable, col3?: DBoolable | DOtherable): DJsonField;
  json_structure(): DJsonField;
  json_transform(col1: DVarcharable): DAnyField;
  json_transform_strict(col1: DVarcharable): DAnyField;
  json_type(col1: DArrayable): DArrayField;
  json_type(col1?: DOtherable | DVarcharable): DVarcharField;
  json_valid(): DBoolField;
  json_value(col1: DArrayable): DArrayField;
  json_value(col1: DNumericable | DVarcharable): DVarcharField;
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
  ltrim(characters?: DOtherable | DVarcharable): DVarcharField;
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
  parse_dirname(separator?: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirpath('path/to/file.csv', 'system')*/
  parse_dirpath(separator?: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example parse_filename('path/to/file.csv', true, 'forward_slash')*/
  parse_filename(trimExtension?: DBoolable | DOtherable | DVarcharable, separator?: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example parse_path('path/to/file.csv', 'system')*/
  parse_path(separator?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  position(needle: DVarcharable): DNumericField;
  prefix(col1: DVarcharable): DBoolField;
  /**@description Formats a string using printf syntax	@example printf('Benchmark "%s" took %d seconds', 'CSV', 42)*/
  printf(...args: DAnyable[]): DVarcharField;
  /**@description Escapes all potentially meaningful regexp characters in the input string	@example regexp_escape('https://duckdb.org')*/
  regexp_escape(): DVarcharField;
  /**@description If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example regexp_extract('abc', '([a-z])(b)', 1)*/
  regexp_extract(pattern: DVarcharable | RegExpable, group0?: DArrayable | DNumericable | DOtherable, options?: DOtherable | DVarcharable): DVarcharField;
  /**@description Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example regexp_extract_all('hello_world', '([a-z ]+)_?', 1)*/
  regexp_extract_all(regex: DVarcharable | RegExpable, group0?: DNumericable | DOtherable, options?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the entire string matches the regex. A set of optional options can be set.	@example regexp_full_match('anabanana', '(an)*')*/
  regexp_full_match(regex: DVarcharable | RegExpable, options?: DOtherable | DVarcharable): DBoolField;
  /**@description Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example regexp_matches('anabanana', '(an)*')*/
  regexp_matches(pattern: DVarcharable | RegExpable, options?: DOtherable | DVarcharable): DBoolField;
  /**@description If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example regexp_replace('hello', '[lo]', '-')*/
  regexp_replace(pattern: DVarcharable | RegExpable, replacement: DVarcharable, options?: DOtherable | DVarcharable): DVarcharField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  regexp_split_to_array(separator: DVarcharable | RegExpable, col2?: DOtherable | DVarcharable): DArrayField;
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
  rtrim(characters?: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(): DVarcharField;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(): DVarcharField;
  /**@description Returns true if string begins with search_string	@example starts_with('abc','a')*/
  starts_with(searchString: DVarcharable): DBoolField;
  stem(col1: DVarcharable): DVarcharField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  str_split(separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  str_split_regex(separator: DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(format: DDateable): DVarcharField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_split(separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  string_split_regex(separator: DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_to_array(separator: DVarcharable): DArrayField;
  /**@description Strips accents from string.	@example strip_accents('mühleisen')*/
  strip_accents(): DVarcharField;
  /**@description Number of bytes in string.	@example strlen('🦆')*/
  strlen(): DNumericField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  strpos(needle: DVarcharable): DNumericField;
  /**@description Converts the string text to timestamp according to the format string. Throws an error on failure. To return NULL on failure, use try_strptime.	@example strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  strptime(format: DArrayable | DVarcharable): DDateField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substr(start: DNumericable, length?: DNumericable | DOtherable): DVarcharField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substring(start: DNumericable, length?: DNumericable | DOtherable): DVarcharField;
  /**@description Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)*/
  substring_grapheme(start: DNumericable, length?: DNumericable | DOtherable): DVarcharField;
  suffix(col1: DVarcharable): DBoolField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(col1: DDateable): DDateField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): DVarcharField;
  /**@description Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example translate('12345', '143', 'ax')*/
  translate(from: DVarcharable, to: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from either side of the string	@example trim('>>>>test<<', '><')*/
  trim(characters?: DOtherable | DVarcharable): DVarcharField;
  /**@description Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  try_strptime(format: DArrayable | DVarcharable): DDateField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  ucase(): DVarcharField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  unbin(): DBlobField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  unhex(): DBlobField;
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
  bar(min: DNumericable, max: DNumericable, width?: DNumericable | DOtherable): DVarcharField;
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
  epoch_ms(): DDateField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Rounds x to next even number by rounding away from zero	@example even(2.9)*/
  even(): DNumericField;
  excel_text(col1: DVarcharable): DVarcharField;
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
  generate_series(stop?: DNumericable | DOtherable, step?: DNumericable | DOtherable): DArrayField;
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
  log(x?: DNumericable | DOtherable): DNumericField;
  /**@description Computes the 10-log of x	@example log10(1000)*/
  log10(): DNumericField;
  /**@description Computes the 2-log of x	@example log2(8)*/
  log2(): DNumericField;
  /**@description The date for the given parts	@example make_date(1992, 9, 20)*/
  make_date(month: DNumericable, day: DNumericable): DDateField;
  make_date(): DDateField;
  /**@description The date for the given struct.	@example make_date({'year': 2024, 'month': 11, 'day': 14})*/
  make_date(): DDateField;
  /**@description The time for the given parts	@example make_time(13, 34, 27.123456)*/
  make_time(minute: DNumericable, seconds: DNumericable): DDateField;
  /**@description The timestamp for the given parts	@example make_timestamp(1992, 9, 20, 13, 34, 27.123456)*/
  make_timestamp(month?: DNumericable | DOtherable, day?: DNumericable | DOtherable, hour?: DNumericable | DOtherable, minute?: DNumericable | DOtherable, seconds?: DNumericable | DOtherable): DDateField;
  /**@description The timestamp for the given nanoseconds since epoch	@example make_timestamp(1732117793000000000)*/
  make_timestamp_ns(): DDateField;
  make_timestamptz(col1?: DNumericable | DOtherable, col2?: DNumericable | DOtherable, col3?: DNumericable | DOtherable, col4?: DNumericable | DOtherable, col5?: DNumericable | DOtherable, col6?: DOtherable | DVarcharable): DDateField;
  mod(col1: DNumericable): DNumericField;
  multiply(col1: DOtherable): DOtherField;
  multiply(col1: DNumericable): DNumericField;
  /**@description Returns the next floating point value after x in the direction of y	@example nextafter(1::float, 2::float)*/
  nextafter(y: DNumericable): DNumericField;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  pow(y: DNumericable): DNumericField;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  power(y: DNumericable): DNumericField;
  /**@description Converts degrees to radians	@example radians(90)*/
  radians(): DNumericField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(stop?: DNumericable | DOtherable, step?: DNumericable | DOtherable): DArrayField;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(precision?: DNumericable | DOtherable): DNumericField;
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
  subtract(col1?: DNumericable | DOtherable): DNumericField;
  /**@description Computes the tan of x	@example tan(90)*/
  tan(): DNumericField;
  /**@description Computes the hyperbolic tan of x	@example tanh(1)*/
  tanh(): DNumericField;
  text(col1: DVarcharable): DVarcharField;
  /**@description Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example to_base(42, 16)*/
  to_base(radix: DNumericable, minLength?: DNumericable | DOtherable): DVarcharField;
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
  to_timestamp(): DDateField;
  /**@description Construct a week interval	@example to_weeks(5)*/
  to_weeks(): DOtherField;
  /**@description Construct a year interval	@example to_years(5)*/
  to_years(): DOtherField;
  /**@description Truncates the number	@example trunc(17.4)*/
  trunc(): DNumericField;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(right: DNumericable): DNumericField;
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
  /**@description Extract the century component from a date or timestamp	@example century(timestamp '2021-08-03 11:59:44.123456')*/
  century(): DNumericField;
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
  /**@description Extract the epoch component from a temporal type	@example epoch(timestamp '2021-08-03 11:59:44.123456')*/
  epoch(): DNumericField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(): DNumericField;
  /**@description Extract the epoch component in nanoseconds from a temporal type	@example epoch_ns(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ns(): DNumericField;
  /**@description Extract the epoch component in microseconds from a temporal type	@example epoch_us(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_us(): DNumericField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(max: DDateable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Extract the era component from a date or timestamp	@example era(timestamp '2021-08-03 11:59:44.123456')*/
  era(): DNumericField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(stop: DDateable, step: DOtherable): DArrayField;
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
  /**@description Extract the Julian Day number from a date or timestamp	@example julian(timestamp '2006-01-01 12:00')*/
  julian(): DNumericField;
  /**@description Returns the last day of the month	@example last_day(TIMESTAMP '1992-03-22 01:02:03.1234')*/
  last_day(): DDateField;
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
  /**@description Extract the nanosecond component from a date or timestamp	@example nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789*/
  nanosecond(): DNumericField;
  /**@description Extract the quarter component from a date or timestamp	@example quarter(timestamp '2021-08-03 11:59:44.123456')*/
  quarter(): DNumericField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(stop: DDateable, step: DOtherable): DArrayField;
  /**@description Extract the second component from a date or timestamp	@example second(timestamp '2021-08-03 11:59:44.123456')*/
  second(): DNumericField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(format: DVarcharable): DVarcharField;
  subtract(col1: DNumericable | DOtherable): DDateField;
  subtract(col1: DDateable): DNumericField;
  subtract(col1: DOtherable): DDateField;
  subtract(col1: DDateable): DOtherField;
  /**@description Converts a TIME WITH TIME ZONE to an integer sort key	@example timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)*/
  timetz_byte_comparable(): DNumericField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(): DNumericField;
  /**@description Extract the timezone_hour component from a date or timestamp	@example timezone_hour(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_hour(): DNumericField;
  /**@description Extract the timezone_minute component from a date or timestamp	@example timezone_minute(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_minute(): DNumericField;
  /**@description Extract the week component from a date or timestamp	@example week(timestamp '2021-08-03 11:59:44.123456')*/
  week(): DNumericField;
  /**@description Extract the weekday component from a date or timestamp	@example weekday(timestamp '2021-08-03 11:59:44.123456')*/
  weekday(): DNumericField;
  /**@description Extract the weekofyear component from a date or timestamp	@example weekofyear(timestamp '2021-08-03 11:59:44.123456')*/
  weekofyear(): DNumericField;
  /**@description Extract the year component from a date or timestamp	@example year(timestamp '2021-08-03 11:59:44.123456')*/
  year(): DNumericField;
  /**@description Extract the yearweek component from a date or timestamp	@example yearweek(timestamp '2021-08-03 11:59:44.123456')*/
  yearweek(): DNumericField;
}
export type DDateField = _DDateField;
interface _DOtherField extends DAnyField {
  [sInferred]: any;
  [sComptype]: any;
  /**@example Array(val)*/
  Array(): DArrayField;
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
  /**@example Json(val)*/
  Json(): DJsonField;
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
  add(col1: DDateable): DDateField;
  add(col1: DOtherable): DOtherField;
  array_to_json(): DJsonField;
  /**@description Create an ARRAY containing the argument values.	@example array_value(4, 5, 6)*/
  array_value(): DArrayField;
  /**@description Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example list_zip([1, 2], [3, 4], [5, 6])*/
  array_zip(): DArrayField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(): DVarcharField;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(): DNumericField;
  bit_length(): DNumericField;
  /**@description Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1	@example bit_position('010'::BIT, '1110101'::BIT)*/
  bit_position(bitstring: DOtherable): DNumericField;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(length: DNumericable): DOtherField;
  broadcast(): DOtherField;
  /**@description Extract the century component from a date or timestamp	@example century(timestamp '2021-08-03 11:59:44.123456')*/
  century(): DNumericField;
  combine(col1: DAnyable): DOtherField;
  /**@example count()*/
  count(): DNumericField;
  /**@description Returns the name of the currently active database	@example current_database()*/
  current_database(): DVarcharField;
  current_date(): DDateField;
  current_localtime(): DDateField;
  current_localtimestamp(): DDateField;
  /**@description Returns the current query as a string	@example current_query()*/
  current_query(): DVarcharField;
  /**@description Returns the name of the currently active schema. Default is main	@example current_schema()*/
  current_schema(): DVarcharField;
  /**@description Extract the day component from a date or timestamp	@example day(timestamp '2021-08-03 11:59:44.123456')*/
  day(): DNumericField;
  /**@description Extract the dayofmonth component from a date or timestamp	@example dayofmonth(timestamp '2021-08-03 11:59:44.123456')*/
  dayofmonth(): DNumericField;
  /**@description Extract the dayofweek component from a date or timestamp	@example dayofweek(timestamp '2021-08-03 11:59:44.123456')*/
  dayofweek(): DNumericField;
  /**@description Extract the dayofyear component from a date or timestamp	@example dayofyear(timestamp '2021-08-03 11:59:44.123456')*/
  dayofyear(): DNumericField;
  /**@description Extract the decade component from a date or timestamp	@example decade(timestamp '2021-08-03 11:59:44.123456')*/
  decade(): DNumericField;
  /**@description Extract the epoch component from a temporal type	@example epoch(timestamp '2021-08-03 11:59:44.123456')*/
  epoch(): DNumericField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(): DNumericField;
  /**@description Extract the epoch component in nanoseconds from a temporal type	@example epoch_ns(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ns(): DNumericField;
  /**@description Extract the epoch component in microseconds from a temporal type	@example epoch_us(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_us(): DNumericField;
  /**@description Extract the era component from a date or timestamp	@example era(timestamp '2021-08-03 11:59:44.123456')*/
  era(): DNumericField;
  family(): DNumericField;
  finalize(): DOtherField;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  gen_random_uuid(): DOtherField;
  /**@description Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0	@example get_bit('0110010'::BIT, 2)*/
  get_bit(index: DNumericable): DNumericField;
  get_current_time(): DDateField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  get_current_timestamp(): DDateField;
  get_delta_test_expression(): DArrayField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): DVarcharField;
  host(): DVarcharField;
  /**@description Extract the hour component from a date or timestamp	@example hour(timestamp '2021-08-03 11:59:44.123456')*/
  hour(): DNumericField;
  /**@description Extract the isodow component from a date or timestamp	@example isodow(timestamp '2021-08-03 11:59:44.123456')*/
  isodow(): DNumericField;
  /**@description Extract the isoyear component from a date or timestamp	@example isoyear(timestamp '2021-08-03 11:59:44.123456')*/
  isoyear(): DNumericField;
  json_array(): DJsonField;
  json_merge_patch(): DJsonField;
  json_object(): DJsonField;
  json_quote(): DJsonField;
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
  multiply(col1: DNumericable): DOtherField;
  /**@description Extract the nanosecond component from a date or timestamp	@example nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789*/
  nanosecond(): DNumericField;
  netmask(): DOtherField;
  network(): DOtherField;
  /**@description Normalizes an INTERVAL to an equivalent interval	@example normalized_interval(INTERVAL '30 days')*/
  normalized_interval(): DOtherField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  now(): DDateField;
  /**@description Number of bytes in blob.	@example octet_length('\xAA\xBB'::BLOB)*/
  octet_length(): DNumericField;
  /**@description Returns the value of pi	@example pi()*/
  pi(): DNumericField;
  /**@description Extract the quarter component from a date or timestamp	@example quarter(timestamp '2021-08-03 11:59:44.123456')*/
  quarter(): DNumericField;
  /**@description Returns a random number between 0 and 1	@example random()*/
  random(): DNumericField;
  /**@description Create an unnamed STRUCT (tuple) containing the argument values.	@example row(i, i % 4, i / 4)*/
  row(): DStructField;
  row_to_json(): DJsonField;
  /**@description Extract the second component from a date or timestamp	@example second(timestamp '2021-08-03 11:59:44.123456')*/
  second(): DNumericField;
  /**@description Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring	@example set_bit('0110010'::BIT, 2, 0)*/
  set_bit(index: DNumericable, newValue: DNumericable): DOtherField;
  /**@description Merge the multiple STRUCTs into a single STRUCT.	@example struct_concat(struct_pack(i := 4), struct_pack(s := 'string'))*/
  struct_concat(): DStructField;
  /**@description Adds field(s)/value(s) to an existing STRUCT with the argument values. The entry name(s) will be the bound variable name(s)	@example struct_insert({'a': 1}, b := 2)*/
  struct_insert(): DStructField;
  /**@description Create a STRUCT containing the argument values. The entry name will be the bound variable name.	@example struct_pack(i := 4, s := 'string')*/
  struct_pack(): DStructField;
  subtract(col1?: DOtherable): DOtherField;
  /**@description Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets	@example time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07')*/
  time_bucket(timestamp: DDateable, origin?: DDateable | DOtherable | DVarcharable): DDateField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(col1: DDateable): DDateField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(): DNumericField;
  /**@description Extract the timezone_hour component from a date or timestamp	@example timezone_hour(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_hour(): DNumericField;
  /**@description Extract the timezone_minute component from a date or timestamp	@example timezone_minute(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_minute(): DNumericField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): DVarcharField;
  to_json(): DJsonField;
  today(): DDateField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  transaction_timestamp(): DDateField;
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
export type DOtherField = _DOtherField;
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
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  array_slice(begin: DAnyable, end: DAnyable, step?: DNumericable | DOtherable): DAnyField;
  /**@description Whether or not we can implicitly cast from the source type to the other type	@example can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)*/
  can_cast_implicitly(targetType: DAnyable): DBoolField;
  /**@description Returns the size of the map (or the number of entries in the map)	@example cardinality( map([4, 2], ['a', 'b']) );*/
  cardinality(...args: DAnyable[]): DNumericField;
  /**@description Concatenate many strings together.	@example concat('Hello', ' ', 'World')*/
  concat(...args: DAnyable[]): DVarcharField;
  /**@description If arg2 is NULL, return NULL. Otherwise, return arg1.	@example constant_or_null(42, NULL)*/
  constant_or_null(arg2: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example create_sort_key('A', 'DESC')*/
  create_sort_key(...args: DAnyable[]): DBlobField;
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
  list_slice(begin: DAnyable, end: DAnyable, step?: DNumericable | DOtherable): DAnyField;
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
export type DAnyField = _DAnyField;
interface _DArrayField<T = any> {
  [sInferred]: T[];
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
  array_grade_up(col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
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
  array_length(col1?: DNumericable | DOtherable): DNumericField;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_dot_product(arr2: DArrayable): DNumericField;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_inner_product(arr2: DArrayable): DNumericField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_position(element: DAnyable): DNumericField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  array_reduce(lambda: DOtherable): DAnyField;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  array_resize(size: DAnyable, value?: DAnyable | DOtherable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  array_reverse_sort(col1?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  array_select(indexList: DArrayable): DArrayField;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  array_sort(col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  array_transform(lambda: DOtherable): DArrayField;
  /**@description Counts the unique elements of a list	@example list_unique([1, 1, NULL, -3, 1, 5])*/
  array_unique(): DNumericField;
  /**@description Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example list_where([10, 20, 30, 40], [true, false, false, true])*/
  array_where(maskList: DArrayable): DArrayField;
  /**@description Returns true if the list contains the element.	@example contains([1, 2, NULL], 1)*/
  contains(element: DAnyable): DBoolField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(col1: DDateable | DOtherable): DStructField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(col1: DDateable | DOtherable): DStructField;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  filter(lambda: DOtherable): DArrayField;
  /**@description Flatten a nested list by one level	@example flatten([[1, 2, 3], [4, 5]])*/
  flatten(): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  grade_up(col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
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
  list_grade_up(col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
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
  list_resize(size: DAnyable, value?: DAnyable | DOtherable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  list_reverse_sort(col1?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  list_select(indexList: DArrayable): DArrayField;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  list_sort(col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
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
export type DArrayField<T = any> = _DArrayField<T> & T[];
interface _DStructField<T = {}> {
  [sInferred]: T;
  [sComptype]: Record<string, any>;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(index: DNumericable | DVarcharable): DAnyField;
  /**@description Extract the named entry from the STRUCT.	@example struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i')*/
  struct_extract(entry: DNumericable | DVarcharable): DAnyField;
  /**@description Extract the entry from the STRUCT by position (starts at 1!).	@example struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2)*/
  struct_extract_at(entry: DNumericable): DAnyField;
}
export type DStructField<T = {}> = _DStructField<T> & T;
interface _DBlobField extends DAnyField {
  [sInferred]: string;
  [sComptype]: Blob;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  base64(): DVarcharField;
  /**@description Convert blob to varchar. Fails if blob is not valid utf-8	@example decode('\xC3\xBC'::BLOB)*/
  decode(): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): DVarcharField;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(): DVarcharField;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(): DNumericField;
  /**@description Number of bytes in blob.	@example octet_length('\xAA\xBB'::BLOB)*/
  octet_length(): DNumericField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(count: DNumericable): DBlobField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(): DVarcharField;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(): DVarcharField;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  to_base64(): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): DVarcharField;
}
export type DBlobField = _DBlobField;
interface _DMapField extends DAnyField {
  [sInferred]: Map<string, any>;
  [sComptype]: Map<string, any>;
  /**@description Checks if a map contains a given key.	@example contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  contains(key: DAnyable): DBoolField;
  /**@description Checks if a map contains a given key.	@example map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  map_contains(key: DAnyable): DBoolField;
}
export type DMapField = _DMapField;
interface _DBoolField extends DAnyField {
  [sInferred]: boolean;
  [sComptype]: boolean;
  /**@description Returns list of schemas. Pass a parameter of True to include implicit schemas	@example current_schemas(true)*/
  current_schemas(): DArrayField;
}
export type DBoolField = _DBoolField;
interface _DJsonField<T = {}> {
  [sInferred]: T;
  [sComptype]: Record<string, any>;
  from_json(col1: DVarcharable): DAnyField;
  from_json_strict(col1: DVarcharable): DAnyField;
  json_array_length(col1: DArrayable): DArrayField;
  json_array_length(col1?: DOtherable | DVarcharable): DNumericField;
  json_contains(col1: DJsonable | DVarcharable): DBoolField;
  json_deserialize_sql(): DVarcharField;
  json_exists(col1: DArrayable): DArrayField;
  json_exists(col1: DVarcharable): DBoolField;
  json_extract(col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col1: DArrayable): DArrayField;
  json_extract_path(col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_string(col1: DArrayable): DArrayField;
  json_extract_string(col1: DNumericable | DVarcharable): DVarcharField;
  json_keys(col1?: DArrayable | DOtherable | DVarcharable): DArrayField;
  json_pretty(): DVarcharField;
  json_structure(): DJsonField;
  json_transform(col1: DVarcharable): DAnyField;
  json_transform_strict(col1: DVarcharable): DAnyField;
  json_type(col1: DArrayable): DArrayField;
  json_type(col1?: DOtherable | DVarcharable): DVarcharField;
  json_valid(): DBoolField;
  json_value(col1: DArrayable): DArrayField;
  json_value(col1: DNumericable | DVarcharable): DVarcharField;
}
export type DJsonField<T = {}> = _DJsonField<T> & T;
interface _DGlobalField {
  cast(val: DBoolable, destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  cast(val: DAnyable, destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): DAnyField;
  cast(val: DDateable, destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  cast(val: DNumericable, destype: DNUMERIC_NATIVE, ...args: DAnyable[]): DNumericField;
  cast(val: DVarcharable, destype: DSTRING_NATIVE, ...args: DAnyable[]): DVarcharField;
  cast(val: DAnyable, destype: DANY_NATIVE, ...args: DAnyable[]): DAnyField;

  /**@example Array(val)*/
  Array(val: DOtherable): DArrayField;
  /**@example Between(val, col1, col2)*/
  Between(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
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
  /**@example Glob(val, matcher)*/
  Glob(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example Hugeint(val)*/
  Hugeint(val: DOtherable): DNumericField;
  /**@example Ilike(val, matcher)*/
  Ilike(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example In(val, matcher)*/
  In(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example Integer(val)*/
  Integer(val: DOtherable): DNumericField;
  /**@example Interval(val)*/
  Interval(val: DOtherable): DOtherField;
  /**@example IsNull(val)*/
  IsNull(val: DAnyable): DBoolField;
  /**@example Json(val)*/
  Json(val: DOtherable): DJsonField;
  /**@example Like(val, matcher)*/
  Like(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example List(val)*/
  List(val: DOtherable): DArrayField;
  /**@example Map(val)*/
  Map(val: DOtherable): DMapField;
  /**@example NotBetween(val, col1, col2)*/
  NotBetween(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example Null(val)*/
  Null(val: DOtherable): DOtherField;
  /**@example SimilarTo(val, matcher)*/
  SimilarTo(val: DVarcharable, matcher: DAnyable): DBoolField;
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
  /**@description Absolute value	@example abs(-17.4)*/
  abs(x: DNumericable): DNumericField;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(x: DNumericable): DNumericField;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(x: DNumericable): DNumericField;
  add(col0: DArrayable, col1: DArrayable): DArrayField;
  add(col0: DNumericable, col1?: DNumericable | DOtherable): DNumericField;
  add(col0: DDateable, col1: DDateable | DNumericable | DOtherable): DDateField;
  add(col0: DNumericable, col1: DDateable): DDateField;
  add(col0: DOtherable, col1: DDateable): DDateField;
  add(col0: DOtherable, col1: DOtherable): DOtherField;
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
  array_extract(list: DStructable, index: DNumericable | DVarcharable): DAnyField;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DVarcharable, index: DNumericable): DVarcharField;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  array_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  array_grade_up(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
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
  array_length(list: DArrayable, col1?: DNumericable | DOtherable): DNumericField;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_dot_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_inner_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_position(list: DArrayable, element: DAnyable): DNumericField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  array_reduce(list: DArrayable, lambda: DOtherable): DAnyField;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  array_resize(list: DArrayable, size: DAnyable, value?: DAnyable | DOtherable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  array_reverse_sort(list: DArrayable, col1?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  array_select(valueList: DArrayable, indexList: DArrayable): DArrayField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  array_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step?: DNumericable | DOtherable): DAnyField;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  array_sort(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
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
  bar(x: DNumericable, min: DNumericable, max: DNumericable, width?: DNumericable | DOtherable): DVarcharField;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  base64(blob: DBlobable): DVarcharField;
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
  bit_length(col0: DOtherable): DNumericField;
  bit_length(col0: DVarcharable): DNumericField;
  /**@description Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1	@example bit_position('010'::BIT, '1110101'::BIT)*/
  bit_position(substring: DOtherable, bitstring: DOtherable): DNumericField;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(bitstring: DOtherable, length: DNumericable): DOtherField;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(bitstring: DVarcharable, length: DNumericable): DOtherField;
  broadcast(col0: DOtherable): DOtherField;
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
  century(ts: DDateable): DNumericField;
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
  /**@description Returns true if the list contains the element.	@example contains([1, 2, NULL], 1)*/
  contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Checks if a map contains a given key.	@example contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  contains(map: DMapable, key: DAnyable): DBoolField;
  /**@description Returns true if search_string is found within string.	@example contains('abc', 'a')*/
  contains(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description Computes the cos of x	@example cos(90)*/
  cos(x: DNumericable): DNumericField;
  /**@description Computes the hyperbolic cos of x	@example cosh(1)*/
  cosh(x: DNumericable): DNumericField;
  /**@description Computes the cotangent of x	@example cot(0.5)*/
  cot(x: DNumericable): DNumericField;
  /**@example count()*/
  count(): DNumericField;
  /**@description Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example create_sort_key('A', 'DESC')*/
  create_sort_key(parameters: DAnyable, ...args: DAnyable[]): DBlobField;
  /**@description Returns the name of the currently active database	@example current_database()*/
  current_database(): DVarcharField;
  current_date(): DDateField;
  current_localtime(): DDateField;
  current_localtimestamp(): DDateField;
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
  date_diff(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(ts: DVarcharable, col1: DDateable | DOtherable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(ts: DArrayable, col1: DDateable | DOtherable): DStructField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_sub(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(part: DVarcharable, timestamp: DDateable): DDateField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datediff(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(ts: DVarcharable, col1: DDateable | DOtherable): DNumericField;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(ts: DArrayable, col1: DDateable | DOtherable): DStructField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datesub(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(part: DVarcharable, timestamp: DDateable): DDateField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  /**@description Extract the day component from a date or timestamp	@example day(timestamp '2021-08-03 11:59:44.123456')*/
  day(ts: DDateable): DNumericField;
  /**@description Extract the day component from a date or timestamp	@example day(timestamp '2021-08-03 11:59:44.123456')*/
  day(ts: DOtherable): DNumericField;
  /**@description The (English) name of the weekday	@example dayname(TIMESTAMP '1992-03-22')*/
  dayname(ts: DDateable): DVarcharField;
  /**@description Extract the dayofmonth component from a date or timestamp	@example dayofmonth(timestamp '2021-08-03 11:59:44.123456')*/
  dayofmonth(ts: DDateable): DNumericField;
  /**@description Extract the dayofmonth component from a date or timestamp	@example dayofmonth(timestamp '2021-08-03 11:59:44.123456')*/
  dayofmonth(ts: DOtherable): DNumericField;
  /**@description Extract the dayofweek component from a date or timestamp	@example dayofweek(timestamp '2021-08-03 11:59:44.123456')*/
  dayofweek(ts: DDateable): DNumericField;
  /**@description Extract the dayofweek component from a date or timestamp	@example dayofweek(timestamp '2021-08-03 11:59:44.123456')*/
  dayofweek(ts: DOtherable): DNumericField;
  /**@description Extract the dayofyear component from a date or timestamp	@example dayofyear(timestamp '2021-08-03 11:59:44.123456')*/
  dayofyear(ts: DDateable): DNumericField;
  /**@description Extract the dayofyear component from a date or timestamp	@example dayofyear(timestamp '2021-08-03 11:59:44.123456')*/
  dayofyear(ts: DOtherable): DNumericField;
  /**@description Extract the decade component from a date or timestamp	@example decade(timestamp '2021-08-03 11:59:44.123456')*/
  decade(ts: DDateable): DNumericField;
  /**@description Extract the decade component from a date or timestamp	@example decade(timestamp '2021-08-03 11:59:44.123456')*/
  decade(ts: DOtherable): DNumericField;
  /**@description Convert blob to varchar. Fails if blob is not valid utf-8	@example decode('\xC3\xBC'::BLOB)*/
  decode(blob: DBlobable): DVarcharField;
  /**@description Converts radians to degrees	@example degrees(pi())*/
  degrees(x: DNumericable): DNumericField;
  divide(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  editdist3(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  element_at(map: DAnyable, key: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Convert varchar to blob. Converts utf-8 characters into literal encoding	@example encode('my_string_with_ü')*/
  encode(string: DVarcharable): DBlobField;
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
  epoch(temporal: DDateable): DNumericField;
  /**@description Extract the epoch component from a temporal type	@example epoch(timestamp '2021-08-03 11:59:44.123456')*/
  epoch(temporal: DOtherable): DNumericField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DNumericable): DDateField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DDateable): DNumericField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DOtherable): DNumericField;
  /**@description Extract the epoch component in nanoseconds from a temporal type	@example epoch_ns(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ns(temporal: DDateable): DNumericField;
  /**@description Extract the epoch component in nanoseconds from a temporal type	@example epoch_ns(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ns(temporal: DOtherable): DNumericField;
  /**@description Extract the epoch component in microseconds from a temporal type	@example epoch_us(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_us(temporal: DDateable): DNumericField;
  /**@description Extract the epoch component in microseconds from a temporal type	@example epoch_us(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_us(temporal: DOtherable): DNumericField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DAnyable, max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DNumericable, max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DDateable, max: DDateable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Extract the era component from a date or timestamp	@example era(timestamp '2021-08-03 11:59:44.123456')*/
  era(ts: DDateable): DNumericField;
  /**@description Extract the era component from a date or timestamp	@example era(timestamp '2021-08-03 11:59:44.123456')*/
  era(ts: DOtherable): DNumericField;
  /**@description Throws the given error message	@example error('access_mode')*/
  error(message: DVarcharable): DOtherField;
  /**@description Rounds x to next even number by rounding away from zero	@example even(2.9)*/
  even(x: DNumericable): DNumericField;
  excel_text(col0: DNumericable, col1: DVarcharable): DVarcharField;
  /**@description Computes e to the power of x	@example exp(1)*/
  exp(x: DNumericable): DNumericField;
  /**@description Factorial of x. Computes the product of the current integer and all integers below it	@example 4!*/
  factorial(x: DNumericable): DNumericField;
  family(col0: DOtherable): DNumericField;
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
  from_base64(string: DVarcharable): DBlobField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  from_binary(value: DVarcharable): DBlobField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  from_hex(value: DVarcharable): DBlobField;
  from_json(col0: DJsonable, col1: DVarcharable): DAnyField;
  from_json(col0: DVarcharable, col1: DVarcharable): DAnyField;
  from_json_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  from_json_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  /**@description Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example gamma(5.5)*/
  gamma(x: DNumericable): DNumericField;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  gcd(x: DNumericable, y: DNumericable): DNumericField;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  gen_random_uuid(): DOtherField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(start: DNumericable, stop?: DNumericable | DOtherable, step?: DNumericable | DOtherable): DArrayField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(start: DDateable, stop: DDateable, step: DOtherable): DArrayField;
  /**@description Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0	@example get_bit('0110010'::BIT, 2)*/
  get_bit(bitstring: DOtherable, index: DNumericable): DNumericField;
  get_current_time(): DDateField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  get_current_timestamp(): DDateField;
  get_delta_test_expression(): DArrayField;
  getvariable(col0: DVarcharable): DAnyField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  grade_up(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns the highest value of the set of input parameters	@example greatest(42, 84)*/
  greatest(arg1: DAnyable, ...args: DAnyable[]): DAnyField;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  greatest_common_divisor(x: DNumericable, y: DNumericable): DNumericField;
  h3_are_neighbor_cells(col0: DNumericable, col1: DNumericable): DBoolField;
  h3_are_neighbor_cells(col0: DVarcharable, col1: DVarcharable): DBoolField;
  h3_cell_area(col0: DNumericable, col1: DVarcharable): DNumericField;
  h3_cell_area(col0: DVarcharable, col1: DVarcharable): DNumericField;
  h3_cell_to_boundary_wkt(col0: DNumericable): DVarcharField;
  h3_cell_to_boundary_wkt(col0: DVarcharable): DVarcharField;
  h3_cell_to_center_child(col0: DNumericable, col1: DNumericable): DNumericField;
  h3_cell_to_center_child(col0: DVarcharable, col1: DNumericable): DVarcharField;
  h3_cell_to_child_pos(col0: DNumericable, col1: DNumericable): DNumericField;
  h3_cell_to_child_pos(col0: DVarcharable, col1: DNumericable): DNumericField;
  h3_cell_to_children(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_cell_to_children(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_cell_to_lat(col0: DNumericable): DNumericField;
  h3_cell_to_lat(col0: DVarcharable): DNumericField;
  h3_cell_to_latlng(col0: DNumericable): DArrayField;
  h3_cell_to_latlng(col0: DVarcharable): DArrayField;
  h3_cell_to_lng(col0: DNumericable): DNumericField;
  h3_cell_to_lng(col0: DVarcharable): DNumericField;
  h3_cell_to_local_ij(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_cell_to_local_ij(col0: DVarcharable, col1: DVarcharable): DArrayField;
  h3_cell_to_parent(col0: DNumericable, col1: DNumericable): DNumericField;
  h3_cell_to_parent(col0: DVarcharable, col1: DNumericable): DVarcharField;
  h3_cell_to_vertex(col0: DNumericable, col1: DNumericable): DNumericField;
  h3_cell_to_vertex(col0: DVarcharable, col1: DNumericable): DVarcharField;
  h3_cell_to_vertexes(col0: DNumericable): DArrayField;
  h3_cell_to_vertexes(col0: DVarcharable): DArrayField;
  h3_cells_to_directed_edge(col0: DNumericable, col1: DNumericable): DNumericField;
  h3_cells_to_directed_edge(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  h3_cells_to_multi_polygon_wkt(col0: DArrayable): DVarcharField;
  h3_child_pos_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): DNumericField;
  h3_child_pos_to_cell(col0: DNumericable, col1: DVarcharable, col2: DNumericable): DVarcharField;
  h3_compact_cells(col0: DArrayable): DArrayField;
  h3_directed_edge_to_boundary_wkt(col0: DNumericable): DVarcharField;
  h3_directed_edge_to_boundary_wkt(col0: DVarcharable): DVarcharField;
  h3_directed_edge_to_cells(col0: DNumericable): DArrayField;
  h3_directed_edge_to_cells(col0: DVarcharable): DArrayField;
  h3_edge_length(col0: DNumericable, col1: DVarcharable): DNumericField;
  h3_edge_length(col0: DVarcharable, col1: DVarcharable): DNumericField;
  h3_get_base_cell_number(col0: DNumericable): DNumericField;
  h3_get_base_cell_number(col0: DVarcharable): DNumericField;
  h3_get_directed_edge_destination(col0: DNumericable): DNumericField;
  h3_get_directed_edge_destination(col0: DVarcharable): DVarcharField;
  h3_get_directed_edge_origin(col0: DNumericable): DNumericField;
  h3_get_directed_edge_origin(col0: DVarcharable): DVarcharField;
  h3_get_hexagon_area_avg(col0: DNumericable, col1: DVarcharable): DNumericField;
  h3_get_hexagon_edge_length_avg(col0: DNumericable, col1: DVarcharable): DNumericField;
  h3_get_icosahedron_faces(col0: DNumericable): DArrayField;
  h3_get_icosahedron_faces(col0: DVarcharable): DArrayField;
  h3_get_num_cells(col0: DNumericable): DNumericField;
  h3_get_pentagons(col0: DNumericable): DArrayField;
  h3_get_pentagons_string(col0: DNumericable): DArrayField;
  h3_get_res0_cells(): DArrayField;
  h3_get_res0_cells_string(): DArrayField;
  h3_get_resolution(col0: DNumericable): DNumericField;
  h3_get_resolution(col0: DVarcharable): DNumericField;
  h3_great_circle_distance(col0: DNumericable, col1: DNumericable, col2: DNumericable, col3: DNumericable, col4: DVarcharable): DNumericField;
  h3_grid_disk(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances_safe(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances_safe(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances_unsafe(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_disk_unsafe(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_distance(col0: DNumericable, col1: DNumericable): DNumericField;
  h3_grid_distance(col0: DVarcharable, col1: DVarcharable): DNumericField;
  h3_grid_path_cells(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_path_cells(col0: DVarcharable, col1: DVarcharable): DArrayField;
  h3_grid_ring_unsafe(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_ring_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_h3_to_string(col0: DNumericable): DVarcharField;
  h3_is_pentagon(col0: DNumericable): DBoolField;
  h3_is_pentagon(col0: DVarcharable): DBoolField;
  h3_is_res_class_iii(col0: DNumericable): DBoolField;
  h3_is_res_class_iii(col0: DVarcharable): DBoolField;
  h3_is_valid_cell(col0: DNumericable): DBoolField;
  h3_is_valid_cell(col0: DVarcharable): DBoolField;
  h3_is_valid_directed_edge(col0: DNumericable): DBoolField;
  h3_is_valid_directed_edge(col0: DVarcharable): DBoolField;
  h3_is_valid_vertex(col0: DNumericable): DBoolField;
  h3_is_valid_vertex(col0: DVarcharable): DBoolField;
  h3_latlng_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): DNumericField;
  h3_latlng_to_cell_string(col0: DNumericable, col1: DNumericable, col2: DNumericable): DVarcharField;
  h3_local_ij_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): DNumericField;
  h3_local_ij_to_cell(col0: DVarcharable, col1: DNumericable, col2: DNumericable): DVarcharField;
  h3_origin_to_directed_edges(col0: DNumericable): DArrayField;
  h3_origin_to_directed_edges(col0: DVarcharable): DArrayField;
  h3_polygon_wkt_to_cells(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_polygon_wkt_to_cells_experimental(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField;
  h3_polygon_wkt_to_cells_experimental_string(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField;
  h3_polygon_wkt_to_cells_string(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_string_to_h3(col0: DVarcharable): DNumericField;
  h3_uncompact_cells(col0: DArrayable, col1: DNumericable): DArrayField;
  h3_vertex_to_lat(col0: DNumericable): DNumericField;
  h3_vertex_to_lat(col0: DVarcharable): DNumericField;
  h3_vertex_to_latlng(col0: DNumericable): DArrayField;
  h3_vertex_to_latlng(col0: DVarcharable): DArrayField;
  h3_vertex_to_lng(col0: DNumericable): DNumericField;
  h3_vertex_to_lng(col0: DVarcharable): DNumericField;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  hamming(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example hash('🦆')*/
  hash(param: DAnyable, ...args: DAnyable[]): DNumericField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DNumericable): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DBlobable): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DVarcharable): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DOtherable): DVarcharField;
  host(col0: DOtherable): DVarcharField;
  /**@description Extract the hour component from a date or timestamp	@example hour(timestamp '2021-08-03 11:59:44.123456')*/
  hour(ts: DDateable): DNumericField;
  /**@description Extract the hour component from a date or timestamp	@example hour(timestamp '2021-08-03 11:59:44.123456')*/
  hour(ts: DOtherable): DNumericField;
  html_escape(col0: DVarcharable, col1?: DBoolable | DOtherable): DVarcharField;
  html_unescape(col0: DVarcharable): DVarcharField;
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
  isfinite(x: DDateable): DBoolField;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(x: DNumericable): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(x: DDateable): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(x: DNumericable): DBoolField;
  /**@description Returns true if the floating point value is not a number, false otherwise	@example isnan('NaN'::FLOAT)*/
  isnan(x: DNumericable): DBoolField;
  /**@description Extract the isodow component from a date or timestamp	@example isodow(timestamp '2021-08-03 11:59:44.123456')*/
  isodow(ts: DDateable): DNumericField;
  /**@description Extract the isodow component from a date or timestamp	@example isodow(timestamp '2021-08-03 11:59:44.123456')*/
  isodow(ts: DOtherable): DNumericField;
  /**@description Extract the isoyear component from a date or timestamp	@example isoyear(timestamp '2021-08-03 11:59:44.123456')*/
  isoyear(ts: DDateable): DNumericField;
  /**@description Extract the isoyear component from a date or timestamp	@example isoyear(timestamp '2021-08-03 11:59:44.123456')*/
  isoyear(ts: DOtherable): DNumericField;
  /**@description The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaccard('duck','luck')*/
  jaccard(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_similarity('duck', 'duckdb', 0.5)*/
  jaro_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DNumericable | DOtherable): DNumericField;
  /**@description The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_winkler_similarity('duck', 'duckdb', 0.5)*/
  jaro_winkler_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DNumericable | DOtherable): DNumericField;
  json_array(...args: DAnyable[]): DJsonField;
  json_array_length(col0: DJsonable, col1: DArrayable): DArrayField;
  json_array_length(col0: DJsonable, col1?: DOtherable | DVarcharable): DNumericField;
  json_array_length(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_array_length(col0: DVarcharable, col1?: DOtherable | DVarcharable): DNumericField;
  json_contains(col0: DJsonable, col1: DJsonable | DVarcharable): DBoolField;
  json_contains(col0: DVarcharable, col1: DJsonable | DVarcharable): DBoolField;
  json_deserialize_sql(col0: DJsonable): DVarcharField;
  json_exists(col0: DJsonable, col1: DArrayable): DArrayField;
  json_exists(col0: DJsonable, col1: DVarcharable): DBoolField;
  json_exists(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_exists(col0: DVarcharable, col1: DVarcharable): DBoolField;
  json_extract(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DJsonable, col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_path_text(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DVarcharable, col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_string(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DJsonable, col1: DNumericable | DVarcharable): DVarcharField;
  json_extract_string(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DVarcharable, col1: DNumericable | DVarcharable): DVarcharField;
  json_keys(col0: DJsonable, col1?: DArrayable | DOtherable | DVarcharable): DArrayField;
  json_keys(col0: DVarcharable, col1?: DArrayable | DOtherable | DVarcharable): DArrayField;
  json_merge_patch(...args: DAnyable[]): DJsonField;
  json_object(...args: DAnyable[]): DJsonField;
  json_pretty(col0: DJsonable): DVarcharField;
  json_quote(...args: DAnyable[]): DJsonField;
  json_serialize_plan(col0: DVarcharable, col1?: DBoolable | DOtherable, col2?: DBoolable | DOtherable, col3?: DBoolable | DOtherable, col4?: DBoolable | DOtherable): DJsonField;
  json_serialize_sql(col0: DVarcharable, col1?: DBoolable | DOtherable, col2?: DBoolable | DOtherable, col3?: DBoolable | DOtherable): DJsonField;
  json_structure(col0: DJsonable): DJsonField;
  json_structure(col0: DVarcharable): DJsonField;
  json_transform(col0: DJsonable, col1: DVarcharable): DAnyField;
  json_transform(col0: DVarcharable, col1: DVarcharable): DAnyField;
  json_transform_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  json_transform_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  json_type(col0: DJsonable, col1: DArrayable): DArrayField;
  json_type(col0: DJsonable, col1?: DOtherable | DVarcharable): DVarcharField;
  json_type(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_type(col0: DVarcharable, col1?: DOtherable | DVarcharable): DVarcharField;
  json_valid(col0: DJsonable): DBoolField;
  json_valid(col0: DVarcharable): DBoolField;
  json_value(col0: DJsonable, col1: DArrayable): DArrayField;
  json_value(col0: DJsonable, col1: DNumericable | DVarcharable): DVarcharField;
  json_value(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_value(col0: DVarcharable, col1: DNumericable | DVarcharable): DVarcharField;
  /**@description Extract the Julian Day number from a date or timestamp	@example julian(timestamp '2006-01-01 12:00')*/
  julian(ts: DDateable): DNumericField;
  /**@description Returns the last day of the month	@example last_day(TIMESTAMP '1992-03-22 01:02:03.1234')*/
  last_day(ts: DDateable): DDateField;
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
  list_element(list: DArrayable, index: DNumericable): DAnyField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(list: DVarcharable, index: DNumericable): DVarcharField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(list: DArrayable, index: DNumericable): DAnyField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(list: DVarcharable, index: DNumericable): DVarcharField;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  list_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  list_grade_up(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
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
  list_resize(list: DArrayable, size: DAnyable, value?: DAnyable | DOtherable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  list_reverse_sort(list: DArrayable, col1?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  list_select(valueList: DArrayable, indexList: DArrayable): DArrayField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  list_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step?: DNumericable | DOtherable): DAnyField;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  list_sort(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
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
  log(b: DNumericable, x?: DNumericable | DOtherable): DNumericField;
  /**@description Computes the 10-log of x	@example log10(1000)*/
  log10(x: DNumericable): DNumericField;
  /**@description Computes the 2-log of x	@example log2(8)*/
  log2(x: DNumericable): DNumericField;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lower(string: DVarcharable): DVarcharField;
  /**@description Pads the string with the character from the left until it has count characters	@example lpad('hello', 10, '>')*/
  lpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from the left side of the string	@example ltrim('>>>>test<<', '><')*/
  ltrim(string: DVarcharable, characters?: DOtherable | DVarcharable): DVarcharField;
  /**@description The date for the given parts	@example make_date(1992, 9, 20)*/
  make_date(year: DNumericable, month: DNumericable, day: DNumericable): DDateField;
  make_date(col0: DNumericable): DDateField;
  /**@description The date for the given struct.	@example make_date({'year': 2024, 'month': 11, 'day': 14})*/
  make_date(dateStruct: DNumericable): DDateField;
  /**@description The time for the given parts	@example make_time(13, 34, 27.123456)*/
  make_time(hour: DNumericable, minute: DNumericable, seconds: DNumericable): DDateField;
  /**@description The timestamp for the given parts	@example make_timestamp(1992, 9, 20, 13, 34, 27.123456)*/
  make_timestamp(year: DNumericable, month?: DNumericable | DOtherable, day?: DNumericable | DOtherable, hour?: DNumericable | DOtherable, minute?: DNumericable | DOtherable, seconds?: DNumericable | DOtherable): DDateField;
  /**@description The timestamp for the given nanoseconds since epoch	@example make_timestamp(1732117793000000000)*/
  make_timestamp_ns(nanos: DNumericable): DDateField;
  make_timestamptz(col0: DNumericable, col1?: DNumericable | DOtherable, col2?: DNumericable | DOtherable, col3?: DNumericable | DOtherable, col4?: DNumericable | DOtherable, col5?: DNumericable | DOtherable, col6?: DOtherable | DVarcharable): DDateField;
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
  md5(value: DBlobable): DVarcharField;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(value: DVarcharable): DVarcharField;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(value: DBlobable): DNumericField;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(value: DVarcharable): DNumericField;
  /**@description Extract the microsecond component from a date or timestamp	@example microsecond(timestamp '2021-08-03 11:59:44.123456')*/
  microsecond(ts: DDateable): DNumericField;
  /**@description Extract the microsecond component from a date or timestamp	@example microsecond(timestamp '2021-08-03 11:59:44.123456')*/
  microsecond(ts: DOtherable): DNumericField;
  /**@description Extract the millennium component from a date or timestamp	@example millennium(timestamp '2021-08-03 11:59:44.123456')*/
  millennium(ts: DDateable): DNumericField;
  /**@description Extract the millennium component from a date or timestamp	@example millennium(timestamp '2021-08-03 11:59:44.123456')*/
  millennium(ts: DOtherable): DNumericField;
  /**@description Extract the millisecond component from a date or timestamp	@example millisecond(timestamp '2021-08-03 11:59:44.123456')*/
  millisecond(ts: DDateable): DNumericField;
  /**@description Extract the millisecond component from a date or timestamp	@example millisecond(timestamp '2021-08-03 11:59:44.123456')*/
  millisecond(ts: DOtherable): DNumericField;
  /**@description Extract the minute component from a date or timestamp	@example minute(timestamp '2021-08-03 11:59:44.123456')*/
  minute(ts: DDateable): DNumericField;
  /**@description Extract the minute component from a date or timestamp	@example minute(timestamp '2021-08-03 11:59:44.123456')*/
  minute(ts: DOtherable): DNumericField;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  mismatches(str1: DVarcharable, str2: DVarcharable): DNumericField;
  mod(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@description Extract the month component from a date or timestamp	@example month(timestamp '2021-08-03 11:59:44.123456')*/
  month(ts: DDateable): DNumericField;
  /**@description Extract the month component from a date or timestamp	@example month(timestamp '2021-08-03 11:59:44.123456')*/
  month(ts: DOtherable): DNumericField;
  /**@description The (English) name of the month	@example monthname(TIMESTAMP '1992-09-20')*/
  monthname(ts: DDateable): DVarcharField;
  multiply(col0: DNumericable, col1: DOtherable): DOtherField;
  multiply(col0: DNumericable, col1: DNumericable): DNumericField;
  multiply(col0: DOtherable, col1: DNumericable): DOtherField;
  /**@description Extract the nanosecond component from a date or timestamp	@example nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789*/
  nanosecond(tsns: DDateable): DNumericField;
  /**@description Extract the nanosecond component from a date or timestamp	@example nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789*/
  nanosecond(tsns: DOtherable): DNumericField;
  netmask(col0: DOtherable): DOtherField;
  network(col0: DOtherable): DOtherField;
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
  now(): DDateField;
  /**@description Number of bytes in blob.	@example octet_length('\xAA\xBB'::BLOB)*/
  octet_length(blob: DOtherable): DNumericField;
  /**@description Number of bytes in blob.	@example octet_length('\xAA\xBB'::BLOB)*/
  octet_length(blob: DBlobable): DNumericField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  ord(str: DVarcharable): DNumericField;
  /**@description Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirname('path/to/file.csv', 'system')*/
  parse_dirname(string: DVarcharable, separator?: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirpath('path/to/file.csv', 'system')*/
  parse_dirpath(string: DVarcharable, separator?: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example parse_filename('path/to/file.csv', true, 'forward_slash')*/
  parse_filename(string: DVarcharable, trimExtension?: DBoolable | DOtherable | DVarcharable, separator?: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example parse_path('path/to/file.csv', 'system')*/
  parse_path(string: DVarcharable, separator?: DOtherable | DVarcharable): DArrayField;
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
  quarter(ts: DDateable): DNumericField;
  /**@description Extract the quarter component from a date or timestamp	@example quarter(timestamp '2021-08-03 11:59:44.123456')*/
  quarter(ts: DOtherable): DNumericField;
  /**@description Converts degrees to radians	@example radians(90)*/
  radians(x: DNumericable): DNumericField;
  /**@description Returns a random number between 0 and 1	@example random()*/
  random(): DNumericField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(start: DNumericable, stop?: DNumericable | DOtherable, step?: DNumericable | DOtherable): DArrayField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(start: DDateable, stop: DDateable, step: DOtherable): DArrayField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  reduce(list: DArrayable, lambda: DOtherable): DAnyField;
  /**@description Escapes all potentially meaningful regexp characters in the input string	@example regexp_escape('https://duckdb.org')*/
  regexp_escape(string: DVarcharable): DVarcharField;
  /**@description If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example regexp_extract('abc', '([a-z])(b)', 1)*/
  regexp_extract(string: DVarcharable, pattern: DVarcharable | RegExpable, group0?: DArrayable | DNumericable | DOtherable, options?: DOtherable | DVarcharable): DVarcharField;
  /**@description Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example regexp_extract_all('hello_world', '([a-z ]+)_?', 1)*/
  regexp_extract_all(string: DVarcharable, regex: DVarcharable | RegExpable, group0?: DNumericable | DOtherable, options?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the entire string matches the regex. A set of optional options can be set.	@example regexp_full_match('anabanana', '(an)*')*/
  regexp_full_match(string: DVarcharable, regex: DVarcharable | RegExpable, options?: DOtherable | DVarcharable): DBoolField;
  /**@description Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example regexp_matches('anabanana', '(an)*')*/
  regexp_matches(string: DVarcharable, pattern: DVarcharable | RegExpable, options?: DOtherable | DVarcharable): DBoolField;
  /**@description If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example regexp_replace('hello', '[lo]', '-')*/
  regexp_replace(string: DVarcharable, pattern: DVarcharable | RegExpable, replacement: DVarcharable, options?: DOtherable | DVarcharable): DVarcharField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  regexp_split_to_array(string: DVarcharable, separator: DVarcharable | RegExpable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DArrayable, count: DNumericable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DBlobable, count: DNumericable): DBlobField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description Replaces any occurrences of the source with target in string	@example replace('hello', 'l', '-')*/
  replace(string: DVarcharable, source: DVarcharable, target: DVarcharable): DVarcharField;
  /**@description Reverses the string	@example reverse('hello')*/
  reverse(string: DVarcharable): DVarcharField;
  /**@description Extract the right-most count characters	@example right('Hello🦆', 3)*/
  right(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description Extract the right-most count grapheme clusters	@example right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  right_grapheme(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(x: DNumericable, precision?: DNumericable | DOtherable): DNumericField;
  /**@description Create an unnamed STRUCT (tuple) containing the argument values.	@example row(i, i % 4, i / 4)*/
  row(...args: DAnyable[]): DStructField;
  row_to_json(...args: DAnyable[]): DJsonField;
  /**@description Pads the string with the character from the right until it has count characters	@example rpad('hello', 10, '<')*/
  rpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from the right side of the string	@example rtrim('>>>>test<<', '><')*/
  rtrim(string: DVarcharable, characters?: DOtherable | DVarcharable): DVarcharField;
  /**@description Extract the second component from a date or timestamp	@example second(timestamp '2021-08-03 11:59:44.123456')*/
  second(ts: DDateable): DNumericField;
  /**@description Extract the second component from a date or timestamp	@example second(timestamp '2021-08-03 11:59:44.123456')*/
  second(ts: DOtherable): DNumericField;
  /**@description Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring	@example set_bit('0110010'::BIT, 2, 0)*/
  set_bit(bitstring: DOtherable, index: DNumericable, newValue: DNumericable): DOtherField;
  /**@description Sets the seed to be used for the random function	@example setseed(0.42)*/
  setseed(col0: DNumericable): DOtherField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(value: DBlobable): DVarcharField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(value: DVarcharable): DVarcharField;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(value: DBlobable): DVarcharField;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(value: DVarcharable): DVarcharField;
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
  stem(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  str_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  str_split_regex(string: DVarcharable, separator: DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(data: DDateable, format: DVarcharable): DVarcharField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(data: DVarcharable, format: DDateable): DVarcharField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  string_split_regex(string: DVarcharable, separator: DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_to_array(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Strips accents from string.	@example strip_accents('mühleisen')*/
  strip_accents(string: DVarcharable): DVarcharField;
  /**@description Number of bytes in string.	@example strlen('🦆')*/
  strlen(string: DVarcharable): DNumericField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  strpos(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  /**@description Converts the string text to timestamp according to the format string. Throws an error on failure. To return NULL on failure, use try_strptime.	@example strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  strptime(text: DVarcharable, format: DArrayable | DVarcharable): DDateField;
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
  substr(string: DVarcharable, start: DNumericable, length?: DNumericable | DOtherable): DVarcharField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substring(string: DVarcharable, start: DNumericable, length?: DNumericable | DOtherable): DVarcharField;
  /**@description Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)*/
  substring_grapheme(string: DVarcharable, start: DNumericable, length?: DNumericable | DOtherable): DVarcharField;
  subtract(col0: DNumericable, col1?: DNumericable | DOtherable): DNumericField;
  subtract(col0: DDateable, col1: DNumericable | DOtherable): DDateField;
  subtract(col0: DDateable, col1: DDateable): DNumericField;
  subtract(col0: DOtherable, col1?: DOtherable): DOtherField;
  subtract(col0: DDateable, col1: DOtherable): DDateField;
  subtract(col0: DDateable, col1: DDateable): DOtherField;
  suffix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Computes the tan of x	@example tan(90)*/
  tan(x: DNumericable): DNumericField;
  /**@description Computes the hyperbolic tan of x	@example tanh(1)*/
  tanh(x: DNumericable): DNumericField;
  text(col0: DNumericable, col1: DVarcharable): DVarcharField;
  /**@description Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets	@example time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07')*/
  time_bucket(bucketWidth: DOtherable, timestamp: DDateable, origin?: DDateable | DOtherable | DVarcharable): DDateField;
  /**@description Converts a TIME WITH TIME ZONE to an integer sort key	@example timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)*/
  timetz_byte_comparable(timeTz: DDateable): DNumericField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DDateable): DNumericField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DOtherable, col1: DDateable): DDateField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DOtherable): DNumericField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DVarcharable, col1: DDateable): DDateField;
  /**@description Extract the timezone_hour component from a date or timestamp	@example timezone_hour(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_hour(ts: DDateable): DNumericField;
  /**@description Extract the timezone_hour component from a date or timestamp	@example timezone_hour(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_hour(ts: DOtherable): DNumericField;
  /**@description Extract the timezone_minute component from a date or timestamp	@example timezone_minute(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_minute(ts: DDateable): DNumericField;
  /**@description Extract the timezone_minute component from a date or timestamp	@example timezone_minute(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_minute(ts: DOtherable): DNumericField;
  /**@description Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example to_base(42, 16)*/
  to_base(number: DNumericable, radix: DNumericable, minLength?: DNumericable | DOtherable): DVarcharField;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  to_base64(blob: DBlobable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DNumericable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DVarcharable): DVarcharField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DOtherable): DVarcharField;
  /**@description Construct a century interval	@example to_centuries(5)*/
  to_centuries(integer: DNumericable): DOtherField;
  /**@description Construct a day interval	@example to_days(5)*/
  to_days(integer: DNumericable): DOtherField;
  /**@description Construct a decade interval	@example to_decades(5)*/
  to_decades(integer: DNumericable): DOtherField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DNumericable): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DBlobable): DVarcharField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DVarcharable): DVarcharField;
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
  to_timestamp(sec: DNumericable): DDateField;
  /**@description Construct a week interval	@example to_weeks(5)*/
  to_weeks(integer: DNumericable): DOtherField;
  /**@description Construct a year interval	@example to_years(5)*/
  to_years(integer: DNumericable): DOtherField;
  today(): DDateField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  transaction_timestamp(): DDateField;
  /**@description Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example translate('12345', '143', 'ax')*/
  translate(string: DVarcharable, from: DVarcharable, to: DVarcharable): DVarcharField;
  /**@description Removes any occurrences of any of the characters from either side of the string	@example trim('>>>>test<<', '><')*/
  trim(string: DVarcharable, characters?: DOtherable | DVarcharable): DVarcharField;
  /**@description Truncates the number	@example trunc(17.4)*/
  trunc(x: DNumericable): DNumericField;
  /**@description Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  try_strptime(text: DVarcharable, format: DArrayable | DVarcharable): DDateField;
  /**@description Returns the current transaction’s ID (a BIGINT). It will assign a new one if the current transaction does not have one already	@example txid_current()*/
  txid_current(): DNumericField;
  /**@description Returns the name of the data type of the result of the expression	@example typeof('abc')*/
  typeof(expression: DAnyable): DVarcharField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  ucase(string: DVarcharable): DVarcharField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  unbin(value: DVarcharable): DBlobField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  unhex(value: DVarcharable): DBlobField;
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
  week(ts: DDateable): DNumericField;
  /**@description Extract the week component from a date or timestamp	@example week(timestamp '2021-08-03 11:59:44.123456')*/
  week(ts: DOtherable): DNumericField;
  /**@description Extract the weekday component from a date or timestamp	@example weekday(timestamp '2021-08-03 11:59:44.123456')*/
  weekday(ts: DDateable): DNumericField;
  /**@description Extract the weekday component from a date or timestamp	@example weekday(timestamp '2021-08-03 11:59:44.123456')*/
  weekday(ts: DOtherable): DNumericField;
  /**@description Extract the weekofyear component from a date or timestamp	@example weekofyear(timestamp '2021-08-03 11:59:44.123456')*/
  weekofyear(ts: DDateable): DNumericField;
  /**@description Extract the weekofyear component from a date or timestamp	@example weekofyear(timestamp '2021-08-03 11:59:44.123456')*/
  weekofyear(ts: DOtherable): DNumericField;
  /**@description Writes to the logger	@example write_log('Hello')*/
  write_log(string: DVarcharable, ...args: DAnyable[]): DAnyField;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(left: DNumericable, right: DNumericable): DNumericField;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(left: DOtherable, right: DOtherable): DOtherField;
  /**@description Extract the year component from a date or timestamp	@example year(timestamp '2021-08-03 11:59:44.123456')*/
  year(ts: DDateable): DNumericField;
  /**@description Extract the year component from a date or timestamp	@example year(timestamp '2021-08-03 11:59:44.123456')*/
  year(ts: DOtherable): DNumericField;
  /**@description Extract the yearweek component from a date or timestamp	@example yearweek(timestamp '2021-08-03 11:59:44.123456')*/
  yearweek(ts: DDateable): DNumericField;
  /**@description Extract the yearweek component from a date or timestamp	@example yearweek(timestamp '2021-08-03 11:59:44.123456')*/
  yearweek(ts: DOtherable): DNumericField;
}
export type DGlobalField = _DGlobalField;
interface _DAggregateField {
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DAnyable): DAnyField;
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DNumericable): DNumericField;
  /**@description Computes the approximate count of distinct elements using HyperLogLog.	@example approx_count_distinct(A)*/
  approx_count_distinct(any: DAnyable): DNumericField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DDateable, pos: DNumericable): DDateField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DDateable | DNumericable, pos: DArrayable): DArrayField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DNumericable, pos: DNumericable): DNumericField;
  /**@description Finds the k approximately most occurring values in the data set	@example approx_top_k(x, 5)*/
  approx_top_k(val: DAnyable, k: DNumericable): DArrayField;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DAnyable): DAnyField;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DNumericable): DNumericField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DVarcharField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DVarcharField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DVarcharField;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DVarcharField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DVarcharField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DVarcharField;
  /**@description Returns a LIST containing all the values of a column.	@example list(A)*/
  array_agg(arg: DAnyable): DArrayField;
  /**@description Calculates the average value for all tuples in x.	@example SUM(x) / COUNT(*)*/
  avg(x: DNumericable): DNumericField;
  /**@description Returns the bitwise AND of all bits in a given expression.	@example bit_and(A)*/
  bit_and(arg: DOtherable): DOtherField;
  /**@description Returns the bitwise AND of all bits in a given expression.	@example bit_and(A)*/
  bit_and(arg: DNumericable): DNumericField;
  /**@description Returns the bitwise OR of all bits in a given expression.	@example bit_or(A)*/
  bit_or(arg: DOtherable): DOtherField;
  /**@description Returns the bitwise OR of all bits in a given expression.	@example bit_or(A)*/
  bit_or(arg: DNumericable): DNumericField;
  /**@description Returns the bitwise XOR of all bits in a given expression.	@example bit_xor(A)*/
  bit_xor(arg: DOtherable): DOtherField;
  /**@description Returns the bitwise XOR of all bits in a given expression.	@example bit_xor(A)*/
  bit_xor(arg: DNumericable): DNumericField;
  /**@description Returns a bitstring with bits set for each distinct value.	@example bitstring_agg(A)*/
  bitstring_agg(arg: DNumericable, col1?: DNumericable | DOtherable, col2?: DNumericable | DOtherable): DOtherField;
  /**@description Returns TRUE if every input value is TRUE, otherwise FALSE.	@example bool_and(A)*/
  bool_and(arg: DBoolable): DBoolField;
  /**@description Returns TRUE if any input value is TRUE, otherwise FALSE.	@example bool_or(A)*/
  bool_or(arg: DBoolable): DBoolField;
  /**@description Returns the correlation coefficient for non-null pairs in a group.	@example COVAR_POP(y, x) / (STDDEV_POP(x) * STDDEV_POP(y))*/
  corr(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Returns the number of non-null values in arg.	@example count(A)*/
  count(arg?: DAnyable | DOtherable): DNumericField;
  /**@description Counts the total number of TRUE values for a boolean column	@example count_if(A)*/
  count_if(arg: DBoolable): DNumericField;
  count_star(): DNumericField;
  /**@description Counts the total number of TRUE values for a boolean column	@example count_if(A)*/
  countif(arg: DBoolable): DNumericField;
  /**@description Returns the population covariance of input values.	@example (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)*/
  covar_pop(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Returns the sample covariance for non-null pairs in a group.	@example (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / (COUNT(*) - 1)*/
  covar_samp(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Returns the log-2 entropy of count input-values.*/
  entropy(x: DAnyable): DNumericField;
  /**@description Calculates the average using a more accurate floating point summation (Kahan Sum)	@example favg(A)*/
  favg(x: DNumericable): DNumericField;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  first(arg: DAnyable): DAnyField;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  first(arg: DNumericable): DNumericField;
  /**@description Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example kahan_sum(A)*/
  fsum(arg: DNumericable): DNumericField;
  /**@description Concatenates the column string values with an optional separator.	@example string_agg(A, '-')*/
  group_concat(str: DAnyable, arg?: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns a LIST of STRUCTs with the fields bucket and count.	@example histogram(A)*/
  histogram(arg: DAnyable, col1?: DArrayable | DOtherable): DMapField;
  /**@description Returns a LIST of STRUCTs with the fields bucket and count matching the buckets exactly.	@example histogram_exact(A, [0, 1, 2])*/
  histogram_exact(arg: DAnyable, bins: DArrayable): DMapField;
  /**@description Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example kahan_sum(A)*/
  kahan_sum(arg: DNumericable): DNumericField;
  /**@description Returns the excess kurtosis (Fisher’s definition) of all input values, with a bias correction according to the sample size*/
  kurtosis(x: DNumericable): DNumericField;
  /**@description Returns the excess kurtosis (Fisher’s definition) of all input values, without bias correction*/
  kurtosis_pop(x: DNumericable): DNumericField;
  /**@description Returns the last value of a column. This function is affected by ordering.	@example last(A)*/
  last(arg: DAnyable): DAnyField;
  /**@description Returns the last value of a column. This function is affected by ordering.	@example last(A)*/
  last(arg: DNumericable): DNumericField;
  /**@description Returns a LIST containing all the values of a column.	@example list(A)*/
  list(arg: DAnyable): DArrayField;
  /**@description Concatenates the column string values with an optional separator.	@example string_agg(A, '-')*/
  listagg(str: DAnyable, arg?: DOtherable | DVarcharable): DVarcharField;
  /**@description Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example mad(x)*/
  mad(x: DDateable): DOtherField;
  /**@description Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example mad(x)*/
  mad(x: DNumericable): DNumericField;
  /**@description Returns the maximum value present in arg.	@example max(A)*/
  max(arg: DAnyable): DAnyField;
  /**@description Returns the maximum value present in arg.	@example max(A)*/
  max(arg: DAnyable, col1: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DVarcharField;
  /**@description Calculates the average value for all tuples in x.	@example SUM(x) / COUNT(*)*/
  mean(x: DNumericable): DNumericField;
  /**@description Returns the middle value of the set. NULL values are ignored. For even value counts, quantitative values are averaged and ordinal values return the lower value.	@example median(x)*/
  median(x: DAnyable): DAnyField;
  /**@description Returns the minimum value present in arg.	@example min(A)*/
  min(arg: DAnyable): DAnyField;
  /**@description Returns the minimum value present in arg.	@example min(A)*/
  min(arg: DAnyable, col1: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): DAnyField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): DNumericField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): DVarcharField;
  /**@description Returns the most frequent value for the values within x. NULL values are ignored.*/
  mode(x: DAnyable): DAnyField;
  /**@description Calculates the product of all tuples in arg.	@example product(A)*/
  product(arg: DNumericable): DNumericField;
  /**@description Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example quantile_disc(x, 0.5)*/
  quantile(x: DAnyable, pos?: DArrayable | DNumericable | DOtherable): DAnyField;
  /**@description Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example quantile_cont(x, 0.5)*/
  quantile_cont(x: DDateable, pos: DArrayable | DNumericable): DDateField;
  /**@description Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example quantile_cont(x, 0.5)*/
  quantile_cont(x: DNumericable, pos: DArrayable | DNumericable): DNumericField;
  /**@description Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example quantile_disc(x, 0.5)*/
  quantile_disc(x: DAnyable, pos?: DArrayable | DNumericable | DOtherable): DAnyField;
  /**@description Returns the average of the independent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.*/
  regr_avgx(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Returns the average of the dependent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.*/
  regr_avgy(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Returns the number of non-null number pairs in a group.	@example (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)*/
  regr_count(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Returns the intercept of the univariate linear regression line for non-null pairs in a group.	@example AVG(y)-REGR_SLOPE(y,x)*AVG(x)*/
  regr_intercept(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Returns the coefficient of determination for non-null pairs in a group.*/
  regr_r2(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Returns the slope of the linear regression line for non-null pairs in a group.	@example COVAR_POP(x,y) / VAR_POP(x)*/
  regr_slope(y: DNumericable, x: DNumericable): DNumericField;
  /**@example REGR_COUNT(y, x) * VAR_POP(x)*/
  regr_sxx(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Returns the population covariance of input values	@example REGR_COUNT(y, x) * COVAR_POP(y, x)*/
  regr_sxy(y: DNumericable, x: DNumericable): DNumericField;
  /**@example REGR_COUNT(y, x) * VAR_POP(y)*/
  regr_syy(y: DNumericable, x: DNumericable): DNumericField;
  /**@description Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example reservoir_quantile(A,0.5,1024)*/
  reservoir_quantile(x: DNumericable, quantile: DArrayable, sampleSize?: DNumericable | DOtherable): DArrayField;
  /**@description Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example reservoir_quantile(A,0.5,1024)*/
  reservoir_quantile(x: DNumericable, quantile: DNumericable, sampleSize?: DNumericable | DOtherable): DNumericField;
  /**@description Returns the standard error of the mean*/
  sem(x: DNumericable): DNumericField;
  /**@description Returns the skewness of all input values.	@example skewness(A)*/
  skewness(x: DNumericable): DNumericField;
  /**@description Returns the sample standard deviation	@example sqrt(var_samp(x))*/
  stddev(x: DNumericable): DNumericField;
  /**@description Returns the population standard deviation.	@example sqrt(var_pop(x))*/
  stddev_pop(x: DNumericable): DNumericField;
  /**@description Returns the sample standard deviation	@example sqrt(var_samp(x))*/
  stddev_samp(x: DNumericable): DNumericField;
  /**@description Concatenates the column string values with an optional separator.	@example string_agg(A, '-')*/
  string_agg(str: DAnyable, arg?: DOtherable | DVarcharable): DVarcharField;
  /**@description Calculates the sum value for all tuples in arg.	@example sum(A)*/
  sum(arg: DBoolable | DNumericable): DNumericField;
  /**@description Internal only. Calculates the sum value for all tuples in arg without overflow checks.	@example sum_no_overflow(A)*/
  sum_no_overflow(arg: DNumericable): DNumericField;
  /**@description Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example kahan_sum(A)*/
  sumkahan(arg: DNumericable): DNumericField;
  /**@description Returns the population variance.*/
  var_pop(x: DNumericable): DNumericField;
  /**@description Returns the sample variance of all input values.	@example (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)*/
  var_samp(x: DNumericable): DNumericField;
  /**@description Returns the sample variance of all input values.	@example (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)*/
  variance(x: DNumericable): DNumericField;
}
export type DAggregateField = _DAggregateField;
interface _DTableField {
  arrow_scan(col0: DOtherable, col1: DOtherable, col2: DOtherable): void;
  arrow_scan_dumb(col0: DOtherable, col1: DOtherable, col2: DOtherable): void;
  check_peg_parser(col0: DVarcharable): void;
  checkpoint(col0?: DOtherable | DVarcharable): void;
  delta_scan(col0: DArrayable | DVarcharable, opts?: Partial<{ binaryAsString: DBoolable; compression: DAnyable | DVarcharable; debugUseOpenssl: DAnyable | DBoolable; deltaFileNumber: DBoolable; encryptionConfig: DAnyable; explicitCardinality: DBoolable | DNumericable; fileRowNumber: DBoolable; filename: DAnyable | DBoolable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DVarcharable; hiveTypesAutocast: DBoolable; parquetVersion: DNumericable | DVarcharable; pushdownFilters: DVarcharable; pushdownPartitionInfo: DBoolable; unionByName: DBoolable }>): void;
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
  force_checkpoint(col0?: DOtherable | DVarcharable): void;
  generate_series(col0: DDateable | DNumericable, col1?: DDateable | DNumericable | DOtherable, col2?: DNumericable | DOtherable): void;
  glob(col0: DArrayable | DVarcharable): void;
  iceberg_metadata(col0: DVarcharable, col1: DDateable | DNumericable | DVarcharable, version: DBoolable | DVarcharable, versionNameFormat: DBoolable | DVarcharable, skipSchemaInference: DBoolable | DVarcharable, metadataCompressionCodec: DBoolable | DVarcharable, allowMovedPaths?: DBoolable | DOtherable | DVarcharable): void;
  iceberg_scan(col0: DVarcharable, col1: DDateable | DNumericable | DVarcharable, versionNameFormat: DBoolable | DVarcharable, version: DBoolable | DVarcharable, metadataCompressionCodec: DVarcharable, mode: DBoolable | DVarcharable, allowMovedPaths: DBoolable | DVarcharable, skipSchemaInference?: DBoolable | DOtherable | DVarcharable): void;
  iceberg_snapshots(col0: DVarcharable, opts?: Partial<{ metadataCompressionCodec: DVarcharable; skipSchemaInference: DBoolable; version: DVarcharable; versionNameFormat: DVarcharable }>): void;
  icu_calendar_names(): void;
  json_execute_serialized_sql(col0: DVarcharable): void;
  load_aws_credentials(col0: DBoolable | DVarcharable, opts?: Partial<{ redactSecret: DBoolable; setRegion?: DBoolable | DOtherable }>): void;
  parquet_bloom_probe(col0: DArrayable | DVarcharable, col1: DVarcharable, col2: DAnyable): void;
  parquet_file_metadata(col0: DArrayable | DVarcharable): void;
  parquet_kv_metadata(col0: DArrayable | DVarcharable): void;
  parquet_metadata(col0: DArrayable | DVarcharable): void;
  parquet_scan(col0: DArrayable | DVarcharable, opts?: Partial<{ binaryAsString: DBoolable; compression: DBoolable | DVarcharable; debugUseOpenssl: DBoolable; encryptionConfig: DAnyable; explicitCardinality: DAnyable | DNumericable; fileRowNumber: DAnyable | DBoolable; filename: DAnyable | DNumericable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DAnyable | DBoolable; parquetVersion: DBoolable | DVarcharable; schema: DAnyable | DBoolable; unionByName: DBoolable | DVarcharable }>): void;
  parquet_schema(col0: DArrayable | DVarcharable): void;
  pg_timezone_names(): void;
  pragma_collations(): void;
  pragma_database_size(): void;
  pragma_metadata_info(col0?: DOtherable | DVarcharable): void;
  pragma_platform(): void;
  pragma_rtree_index_info(): void;
  pragma_show(col0: DVarcharable): void;
  pragma_storage_info(col0: DVarcharable): void;
  pragma_table_info(col0: DVarcharable): void;
  pragma_user_agent(): void;
  pragma_version(): void;
  query(col0: DVarcharable): void;
  query_table(col0: DArrayable | DVarcharable, col1?: DBoolable | DOtherable): void;
  range(col0: DDateable | DNumericable, col1?: DDateable | DNumericable | DOtherable, col2?: DNumericable | DOtherable): void;
  read_blob(col0: DArrayable | DVarcharable): void;
  read_csv(
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
        compression: DArrayable | DVarcharable;
        dateformat: DAnyable | DVarcharable;
        decimalSeparator: DVarcharable;
        delim: DBoolable | DVarcharable;
        dtypes: DAnyable | DBoolable;
        encoding: DNumericable | DVarcharable;
        escape: DBoolable | DVarcharable;
        filename: DAnyable | DVarcharable;
        forceNotNull: DArrayable | DVarcharable;
        header: DAnyable | DBoolable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable | DVarcharable;
        hiveTypesAutocast: DBoolable | DVarcharable;
        ignoreErrors: DBoolable | DVarcharable;
        maxLineSize: DAnyable | DVarcharable;
        maximumLineSize: DNumericable | DVarcharable;
        names: DArrayable | DNumericable;
        newLine: DBoolable | DVarcharable;
        normalizeNames: DAnyable | DBoolable;
        nullPadding: DBoolable | DVarcharable;
        nullstr: DAnyable;
        parallel: DBoolable;
        quote: DNumericable | DVarcharable;
        rejectsLimit: DArrayable | DNumericable;
        rejectsScan: DBoolable | DVarcharable;
        rejectsTable: DVarcharable;
        sampleSize: DNumericable | DVarcharable;
        sep: DAnyable | DVarcharable;
        skip: DNumericable | DVarcharable;
        storeRejects: DAnyable | DBoolable;
        strictMode: DBoolable;
        timestampformat: DBoolable | DVarcharable;
        types: DAnyable;
        unionByName: DArrayable | DBoolable;
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
        compression: DArrayable | DVarcharable;
        dateformat: DAnyable | DVarcharable;
        decimalSeparator: DVarcharable;
        delim: DBoolable | DVarcharable;
        dtypes: DAnyable | DBoolable;
        encoding: DNumericable | DVarcharable;
        escape: DBoolable | DVarcharable;
        filename: DAnyable | DVarcharable;
        forceNotNull: DArrayable | DVarcharable;
        header: DAnyable | DBoolable;
        hivePartitioning: DBoolable;
        hiveTypes: DAnyable | DVarcharable;
        hiveTypesAutocast: DBoolable | DVarcharable;
        ignoreErrors: DBoolable | DVarcharable;
        maxLineSize: DAnyable | DVarcharable;
        maximumLineSize: DNumericable | DVarcharable;
        names: DArrayable | DNumericable;
        newLine: DBoolable | DVarcharable;
        normalizeNames: DAnyable | DBoolable;
        nullPadding: DBoolable | DVarcharable;
        nullstr: DAnyable;
        parallel: DBoolable;
        quote: DNumericable | DVarcharable;
        rejectsLimit: DArrayable | DNumericable;
        rejectsScan: DBoolable | DVarcharable;
        rejectsTable: DVarcharable;
        sampleSize: DNumericable | DVarcharable;
        sep: DAnyable | DVarcharable;
        skip: DNumericable | DVarcharable;
        storeRejects: DAnyable | DBoolable;
        strictMode: DBoolable;
        timestampformat: DBoolable | DVarcharable;
        types: DAnyable;
        unionByName: DArrayable | DBoolable;
      }
    >,
  ): void;
  read_json(col0: DArrayable | DVarcharable, opts?: Partial<{ autoDetect: DBoolable; columns: DAnyable | DBoolable; compression: DVarcharable; convertStringsToIntegers: DBoolable; dateFormat: DVarcharable; dateformat: DVarcharable; fieldAppearanceThreshold: DAnyable | DNumericable; filename: DAnyable | DNumericable; format: DNumericable | DVarcharable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DNumericable; hiveTypesAutocast: DBoolable | DVarcharable; ignoreErrors: DBoolable | DNumericable; mapInferenceThreshold: DAnyable | DNumericable; maximumDepth: DNumericable | DVarcharable; maximumObjectSize: DBoolable | DNumericable; maximumSampleFiles: DNumericable; records: DBoolable | DVarcharable; sampleSize: DNumericable; timestampFormat: DVarcharable; timestampformat: DBoolable | DVarcharable; unionByName: DAnyable | DBoolable }>): void;
  read_json_auto(col0: DArrayable | DVarcharable, opts?: Partial<{ autoDetect: DBoolable; columns: DAnyable | DBoolable; compression: DVarcharable; convertStringsToIntegers: DBoolable; dateFormat: DVarcharable; dateformat: DVarcharable; fieldAppearanceThreshold: DAnyable | DNumericable; filename: DAnyable | DNumericable; format: DNumericable | DVarcharable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DNumericable; hiveTypesAutocast: DBoolable | DVarcharable; ignoreErrors: DBoolable | DNumericable; mapInferenceThreshold: DAnyable | DNumericable; maximumDepth: DNumericable | DVarcharable; maximumObjectSize: DBoolable | DNumericable; maximumSampleFiles: DNumericable; records: DBoolable | DVarcharable; sampleSize: DNumericable; timestampFormat: DVarcharable; timestampformat: DBoolable | DVarcharable; unionByName: DAnyable | DBoolable }>): void;
  read_json_objects(col0: DArrayable | DVarcharable, opts?: Partial<{ compression: DVarcharable; filename: DAnyable | DVarcharable; format: DAnyable | DVarcharable; hivePartitioning: DBoolable | DNumericable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DBoolable; ignoreErrors: DBoolable; maximumObjectSize: DBoolable | DNumericable; unionByName: DAnyable | DBoolable }>): void;
  read_json_objects_auto(col0: DArrayable | DVarcharable, opts?: Partial<{ compression: DVarcharable; filename: DAnyable | DVarcharable; format: DAnyable | DVarcharable; hivePartitioning: DBoolable | DNumericable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DBoolable; ignoreErrors: DBoolable; maximumObjectSize: DBoolable | DNumericable; unionByName: DAnyable | DBoolable }>): void;
  read_ndjson(col0: DArrayable | DVarcharable, opts?: Partial<{ autoDetect: DBoolable; columns: DAnyable | DBoolable; compression: DVarcharable; convertStringsToIntegers: DBoolable; dateFormat: DVarcharable; dateformat: DVarcharable; fieldAppearanceThreshold: DAnyable | DNumericable; filename: DAnyable | DNumericable; format: DNumericable | DVarcharable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DNumericable; hiveTypesAutocast: DBoolable | DVarcharable; ignoreErrors: DBoolable | DNumericable; mapInferenceThreshold: DAnyable | DNumericable; maximumDepth: DNumericable | DVarcharable; maximumObjectSize: DBoolable | DNumericable; maximumSampleFiles: DNumericable; records: DBoolable | DVarcharable; sampleSize: DNumericable; timestampFormat: DVarcharable; timestampformat: DBoolable | DVarcharable; unionByName: DAnyable | DBoolable }>): void;
  read_ndjson_auto(col0: DArrayable | DVarcharable, opts?: Partial<{ autoDetect: DBoolable; columns: DAnyable | DBoolable; compression: DVarcharable; convertStringsToIntegers: DBoolable; dateFormat: DVarcharable; dateformat: DVarcharable; fieldAppearanceThreshold: DAnyable | DNumericable; filename: DAnyable | DNumericable; format: DNumericable | DVarcharable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DNumericable; hiveTypesAutocast: DBoolable | DVarcharable; ignoreErrors: DBoolable | DNumericable; mapInferenceThreshold: DAnyable | DNumericable; maximumDepth: DNumericable | DVarcharable; maximumObjectSize: DBoolable | DNumericable; maximumSampleFiles: DNumericable; records: DBoolable | DVarcharable; sampleSize: DNumericable; timestampFormat: DVarcharable; timestampformat: DBoolable | DVarcharable; unionByName: DAnyable | DBoolable }>): void;
  read_ndjson_objects(col0: DArrayable | DVarcharable, opts?: Partial<{ compression: DVarcharable; filename: DAnyable | DVarcharable; format: DAnyable | DVarcharable; hivePartitioning: DBoolable | DNumericable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DBoolable; ignoreErrors: DBoolable; maximumObjectSize: DBoolable | DNumericable; unionByName: DAnyable | DBoolable }>): void;
  read_parquet(col0: DArrayable | DVarcharable, opts?: Partial<{ binaryAsString: DBoolable; compression: DBoolable | DVarcharable; debugUseOpenssl: DBoolable; encryptionConfig: DAnyable; explicitCardinality: DAnyable | DNumericable; fileRowNumber: DAnyable | DBoolable; filename: DAnyable | DNumericable; hivePartitioning: DBoolable | DVarcharable; hiveTypes: DAnyable | DBoolable; hiveTypesAutocast: DAnyable | DBoolable; parquetVersion: DBoolable | DVarcharable; schema: DAnyable | DBoolable; unionByName: DBoolable | DVarcharable }>): void;
  read_text(col0: DArrayable | DVarcharable): void;
  read_xlsx(col0: DVarcharable, opts?: Partial<{ allVarchar: DBoolable; emptyAsVarchar: DBoolable; header: DBoolable; ignoreErrors: DBoolable; normalizeNames: DBoolable; range: DVarcharable; sheet: DVarcharable; stopAtEmpty: DBoolable }>): void;
  register_geoarrow_extensions(): void;
  repeat(col0: DAnyable, col1: DNumericable): void;
  repeat_row(numRows: DNumericable, ...args: DAnyable[]): void;
  rtree_index_dump(col0: DVarcharable): void;
  rtree_index_scan(): void;
  scan_arrow_ipc(col0: DArrayable): void;
  seq_scan(): void;
  shapefile_meta(col0: DArrayable | DVarcharable): void;
  sniff_csv(col0: DVarcharable, opts?: Partial<{ allVarchar: DBoolable; allowQuotedNulls: DBoolable; autoDetect: DBoolable; autoTypeCandidates: DAnyable; bufferSize: DNumericable; columnNames: DArrayable; columnTypes: DAnyable; columns: DAnyable; comment: DVarcharable; compression: DVarcharable; dateformat: DVarcharable; decimalSeparator: DVarcharable; delim: DVarcharable; dtypes: DAnyable; encoding: DVarcharable; escape: DVarcharable; filename: DAnyable; forceMatch: DBoolable; forceNotNull: DArrayable; header: DBoolable; hivePartitioning: DBoolable; hiveTypes: DAnyable; hiveTypesAutocast: DBoolable; ignoreErrors: DBoolable; maxLineSize: DVarcharable; maximumLineSize: DVarcharable; names: DArrayable; newLine: DVarcharable; normalizeNames: DBoolable; nullPadding: DBoolable; nullstr: DAnyable; parallel: DBoolable; quote: DVarcharable; rejectsLimit: DNumericable; rejectsScan: DVarcharable; rejectsTable: DVarcharable; sampleSize: DNumericable; sep: DVarcharable; skip: DNumericable; storeRejects: DBoolable; strictMode: DBoolable; timestampformat: DVarcharable; types: DAnyable; unionByName: DBoolable }>): void;
  sql_auto_complete(col0: DVarcharable): void;
  sqlite_attach(col0: DVarcharable, overwrite: DBoolable): void;
  sqlite_query(col0: DVarcharable, col1: DVarcharable): void;
  sqlite_scan(col0: DVarcharable, col1: DVarcharable): void;
  start_ui(): void;
  start_ui_server(): void;
  stop_ui_server(): void;
  summary(col0: DOtherable): void;
  test_all_types(useLargeEnum: DBoolable): void;
  test_vector_types(col0: DAnyable, allFlat: DBoolable, ...args: DAnyable[]): void;
  to_arrow_ipc(col0: DOtherable): void;
  ui_is_started(): void;
  unnest(col0: DAnyable): void;
  which_secret(col0: DVarcharable, col1: DVarcharable): void;
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
  /**@example IsNull(val)*/
  IsNull(): DBoolField;
  /**@description Returns the name of a given expression	@example alias(42 + 1)*/
  alias(): string & CVarchar;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  array_slice(begin: DAnyable, end: DAnyable, step?: DNumericable | DOtherable): Partial<CAny>;
  /**@description Whether or not we can implicitly cast from the source type to the other type	@example can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)*/
  can_cast_implicitly(targetType: DAnyable): DBoolField;
  /**@description Returns the size of the map (or the number of entries in the map)	@example cardinality( map([4, 2], ['a', 'b']) );*/
  cardinality(...args: DAnyable[]): number & CNumeric;
  /**@description Concatenate many strings together.	@example concat('Hello', ' ', 'World')*/
  concat(...args: DAnyable[]): string & CVarchar;
  /**@description If arg2 is NULL, return NULL. Otherwise, return arg1.	@example constant_or_null(42, NULL)*/
  constant_or_null(arg2: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example create_sort_key('A', 'DESC')*/
  create_sort_key(...args: DAnyable[]): DBlobField;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  element_at(key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns the numeric value backing the given enum value	@example enum_code('happy'::mood)*/
  enum_code(): Partial<CAny>;
  /**@description Returns the first value of the input enum type	@example enum_first(NULL::mood)*/
  enum_first(): string & CVarchar;
  /**@description Returns the last value of the input enum type	@example enum_last(NULL::mood)*/
  enum_last(): string & CVarchar;
  /**@description Returns all values of the input enum type as an array	@example enum_range(NULL::mood)*/
  enum_range(): DArrayField;
  /**@description Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example enum_range_boundary(NULL, 'happy'::mood)*/
  enum_range_boundary(end: DAnyable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Returns the highest value of the set of input parameters	@example greatest(42, 84)*/
  greatest(...args: DAnyable[]): Partial<CAny>;
  /**@description Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example hash('🦆')*/
  hash(...args: DAnyable[]): number & CNumeric;
  /**@description Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example is_histogram_other_bin(v)*/
  is_histogram_other_bin(): DBoolField;
  /**@description Returns the lowest value of the set of input parameters	@example least(42, 84)*/
  least(...args: DAnyable[]): Partial<CAny>;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  list_slice(begin: DAnyable, end: DAnyable, step?: DNumericable | DOtherable): Partial<CAny>;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  map_extract(key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract_value(map(['key'], ['val']), 'key')*/
  map_extract_value(key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example stats(5)*/
  stats(): string & CVarchar;
  /**@description Returns the name of the data type of the result of the expression	@example typeof('abc')*/
  typeof(): string & CVarchar;
  /**@description Returns the VectorType of a given column	@example vector_type(col)*/
  vector_type(): string & CVarchar;
}

export type DAnyComp = Partial<CAny>;

interface CVarchar extends CAny {
  [sInferred]: string;
  /**@example Glob(val, matcher)*/
  Glob(matcher: DAnyable): DBoolField;
  /**@example Ilike(val, matcher)*/
  Ilike(matcher: DAnyable): DBoolField;
  /**@example In(val, matcher)*/
  In(matcher: DAnyable): DBoolField;
  /**@example Like(val, matcher)*/
  Like(matcher: DAnyable): DBoolField;
  /**@example SimilarTo(val, matcher)*/
  SimilarTo(matcher: DAnyable): DBoolField;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(index: DNumericable): string & CVarchar;
  /**@description Returns an integer that represents the Unicode code point of the first character of the string	@example ascii('Ω')*/
  ascii(): number & CNumeric;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(): string & CVarchar;
  bit_length(): number & CNumeric;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(length: DNumericable): DOtherField;
  /**@description Concatenate strings together separated by the specified separator.	@example concat_ws(', ', 'Banana', 'Apple', 'Melon')*/
  concat_ws(string: DAnyable, ...args: DAnyable[]): string & CVarchar;
  /**@description Returns true if search_string is found within string.	@example contains('abc', 'a')*/
  contains(searchString: DVarcharable): DBoolField;
  /**@description Returns the current value of the configuration setting	@example current_setting('access_mode')*/
  current_setting(): Partial<CAny>;
  /**@description Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example currval('my_sequence_name')*/
  currval(): number & CNumeric;
  /**@description Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example damerau_levenshtein('hello', 'world')*/
  damerau_levenshtein(str2: DVarcharable): number & CNumeric;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_diff(startdate: DDateable, enddate: DDateable): number & CNumeric;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(col1: DDateable | DOtherable): number & CNumeric;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_sub(startdate: DDateable, enddate: DDateable): number & CNumeric;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(timestamp: DDateable): DDateField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(timestamp: DOtherable): DOtherField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datediff(startdate: DDateable, enddate: DDateable): number & CNumeric;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(col1: DDateable | DOtherable): number & CNumeric;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datesub(startdate: DDateable, enddate: DDateable): number & CNumeric;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(timestamp: DDateable): DDateField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(timestamp: DOtherable): DOtherField;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  editdist3(str2: DVarcharable): number & CNumeric;
  /**@description Convert varchar to blob. Converts utf-8 characters into literal encoding	@example encode('my_string_with_ü')*/
  encode(): DBlobField;
  ends_with(col1: DVarcharable): DBoolField;
  /**@description Throws the given error message	@example error('access_mode')*/
  error(): DOtherField;
  /**@description Formats a string using fmt syntax	@example format('Benchmark "{}" took {} seconds', 'CSV', 42)*/
  format(...args: DAnyable[]): string & CVarchar;
  /**@description Convert a base64 encoded string to a character string	@example from_base64('QQ==')*/
  from_base64(): DBlobField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  from_binary(): DBlobField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  from_hex(): DBlobField;
  from_json(col1: DVarcharable): Partial<CAny>;
  from_json_strict(col1: DVarcharable): Partial<CAny>;
  getvariable(): Partial<CAny>;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  hamming(str2: DVarcharable): number & CNumeric;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): string & CVarchar;
  html_escape(col1?: DBoolable | DOtherable): string & CVarchar;
  html_unescape(): string & CVarchar;
  icu_sort_key(col1: DVarcharable): string & CVarchar;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example ilike_escape('A%c', 'a$%C', '$')*/
  ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns whether or not the database/schema are in the search path	@example in_search_path('memory', 'main')*/
  in_search_path(schemaName: DVarcharable): DBoolField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  instr(needle: DVarcharable): number & CNumeric;
  /**@description The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaccard('duck','luck')*/
  jaccard(str2: DVarcharable): number & CNumeric;
  /**@description The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_similarity('duck', 'duckdb', 0.5)*/
  jaro_similarity(str2: DVarcharable, scoreCutoff?: DNumericable | DOtherable): number & CNumeric;
  /**@description The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_winkler_similarity('duck', 'duckdb', 0.5)*/
  jaro_winkler_similarity(str2: DVarcharable, scoreCutoff?: DNumericable | DOtherable): number & CNumeric;
  json_array_length(col1: DArrayable): DArrayField;
  json_array_length(col1?: DOtherable | DVarcharable): number & CNumeric;
  json_contains(col1: DJsonable | DVarcharable): DBoolField;
  json_exists(col1: DArrayable): DArrayField;
  json_exists(col1: DVarcharable): DBoolField;
  json_extract(col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col1: DArrayable): DArrayField;
  json_extract_path(col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DArrayable): DArrayField;
  json_extract_path_text(col1: DNumericable | DVarcharable): string & CVarchar;
  json_extract_string(col1: DArrayable): DArrayField;
  json_extract_string(col1: DNumericable | DVarcharable): string & CVarchar;
  json_keys(col1?: DArrayable | DOtherable | DVarcharable): DArrayField;
  json_serialize_plan(col1?: DBoolable | DOtherable, col2?: DBoolable | DOtherable, col3?: DBoolable | DOtherable, col4?: DBoolable | DOtherable): DJsonField;
  json_serialize_sql(col1?: DBoolable | DOtherable, col2?: DBoolable | DOtherable, col3?: DBoolable | DOtherable): DJsonField;
  json_structure(): DJsonField;
  json_transform(col1: DVarcharable): Partial<CAny>;
  json_transform_strict(col1: DVarcharable): Partial<CAny>;
  json_type(col1: DArrayable): DArrayField;
  json_type(col1?: DOtherable | DVarcharable): string & CVarchar;
  json_valid(): DBoolField;
  json_value(col1: DArrayable): DArrayField;
  json_value(col1: DNumericable | DVarcharable): string & CVarchar;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lcase(): string & CVarchar;
  /**@description Extract the left-most count characters	@example left('Hello🦆', 2)*/
  left(count: DNumericable): string & CVarchar;
  /**@description Extract the left-most count grapheme clusters	@example left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  left_grapheme(count: DNumericable): string & CVarchar;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(): number & CNumeric;
  /**@description Number of grapheme clusters in string.	@example length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')*/
  length_grapheme(): number & CNumeric;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  levenshtein(str2: DVarcharable): number & CNumeric;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example like_escape('a%c', 'a$%c', '$')*/
  like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(index: DNumericable): string & CVarchar;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(index: DNumericable): string & CVarchar;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lower(): string & CVarchar;
  /**@description Pads the string with the character from the left until it has count characters	@example lpad('hello', 10, '>')*/
  lpad(count: DNumericable, character: DVarcharable): string & CVarchar;
  /**@description Removes any occurrences of any of the characters from the left side of the string	@example ltrim('>>>>test<<', '><')*/
  ltrim(characters?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(): string & CVarchar;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(): number & CNumeric;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  mismatches(str2: DVarcharable): number & CNumeric;
  /**@description Return the following value of the sequence.	@example nextval('my_sequence_name')*/
  nextval(): number & CNumeric;
  /**@description Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example nfc_normalize('ardèch')*/
  nfc_normalize(): string & CVarchar;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_ilike_escape('A%c', 'a$%C', '$')*/
  not_ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_like_escape('a%c', 'a$%c', '$')*/
  not_like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  ord(): number & CNumeric;
  /**@description Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirname('path/to/file.csv', 'system')*/
  parse_dirname(separator?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirpath('path/to/file.csv', 'system')*/
  parse_dirpath(separator?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example parse_filename('path/to/file.csv', true, 'forward_slash')*/
  parse_filename(trimExtension?: DBoolable | DOtherable | DVarcharable, separator?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example parse_path('path/to/file.csv', 'system')*/
  parse_path(separator?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  position(needle: DVarcharable): number & CNumeric;
  prefix(col1: DVarcharable): DBoolField;
  /**@description Formats a string using printf syntax	@example printf('Benchmark "%s" took %d seconds', 'CSV', 42)*/
  printf(...args: DAnyable[]): string & CVarchar;
  /**@description Escapes all potentially meaningful regexp characters in the input string	@example regexp_escape('https://duckdb.org')*/
  regexp_escape(): string & CVarchar;
  /**@description If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example regexp_extract('abc', '([a-z])(b)', 1)*/
  regexp_extract(pattern: DVarcharable | RegExpable, group0?: DArrayable | DNumericable | DOtherable, options?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example regexp_extract_all('hello_world', '([a-z ]+)_?', 1)*/
  regexp_extract_all(regex: DVarcharable | RegExpable, group0?: DNumericable | DOtherable, options?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the entire string matches the regex. A set of optional options can be set.	@example regexp_full_match('anabanana', '(an)*')*/
  regexp_full_match(regex: DVarcharable | RegExpable, options?: DOtherable | DVarcharable): DBoolField;
  /**@description Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example regexp_matches('anabanana', '(an)*')*/
  regexp_matches(pattern: DVarcharable | RegExpable, options?: DOtherable | DVarcharable): DBoolField;
  /**@description If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example regexp_replace('hello', '[lo]', '-')*/
  regexp_replace(pattern: DVarcharable | RegExpable, replacement: DVarcharable, options?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  regexp_split_to_array(separator: DVarcharable | RegExpable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(count: DNumericable): string & CVarchar;
  /**@description Replaces any occurrences of the source with target in string	@example replace('hello', 'l', '-')*/
  replace(source: DVarcharable, target: DVarcharable): string & CVarchar;
  /**@description Reverses the string	@example reverse('hello')*/
  reverse(): string & CVarchar;
  /**@description Extract the right-most count characters	@example right('Hello🦆', 3)*/
  right(count: DNumericable): string & CVarchar;
  /**@description Extract the right-most count grapheme clusters	@example right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  right_grapheme(count: DNumericable): string & CVarchar;
  /**@description Pads the string with the character from the right until it has count characters	@example rpad('hello', 10, '<')*/
  rpad(count: DNumericable, character: DVarcharable): string & CVarchar;
  /**@description Removes any occurrences of any of the characters from the right side of the string	@example rtrim('>>>>test<<', '><')*/
  rtrim(characters?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(): string & CVarchar;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(): string & CVarchar;
  /**@description Returns true if string begins with search_string	@example starts_with('abc','a')*/
  starts_with(searchString: DVarcharable): DBoolField;
  stem(col1: DVarcharable): string & CVarchar;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  str_split(separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  str_split_regex(separator: DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(format: DDateable): string & CVarchar;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_split(separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  string_split_regex(separator: DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_to_array(separator: DVarcharable): DArrayField;
  /**@description Strips accents from string.	@example strip_accents('mühleisen')*/
  strip_accents(): string & CVarchar;
  /**@description Number of bytes in string.	@example strlen('🦆')*/
  strlen(): number & CNumeric;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  strpos(needle: DVarcharable): number & CNumeric;
  /**@description Converts the string text to timestamp according to the format string. Throws an error on failure. To return NULL on failure, use try_strptime.	@example strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  strptime(format: DArrayable | DVarcharable): DDateField;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substr(start: DNumericable, length?: DNumericable | DOtherable): string & CVarchar;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substring(start: DNumericable, length?: DNumericable | DOtherable): string & CVarchar;
  /**@description Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)*/
  substring_grapheme(start: DNumericable, length?: DNumericable | DOtherable): string & CVarchar;
  suffix(col1: DVarcharable): DBoolField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(col1: DDateable): DDateField;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(): string & CVarchar;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): string & CVarchar;
  /**@description Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example translate('12345', '143', 'ax')*/
  translate(from: DVarcharable, to: DVarcharable): string & CVarchar;
  /**@description Removes any occurrences of any of the characters from either side of the string	@example trim('>>>>test<<', '><')*/
  trim(characters?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  try_strptime(format: DArrayable | DVarcharable): DDateField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  ucase(): string & CVarchar;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  unbin(): DBlobField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  unhex(): DBlobField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  unicode(): number & CNumeric;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  upper(): string & CVarchar;
  /**@description Unescapes the URL encoded input.	@example url_decode('this%20string%20is%2BFencoded')*/
  url_decode(): string & CVarchar;
  /**@description Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example url_encode('this string has/ special+ characters>')*/
  url_encode(): string & CVarchar;
  /**@description Writes to the logger	@example write_log('Hello')*/
  write_log(...args: DAnyable[]): Partial<CAny>;
}

export type DVarcharComp = string & CVarchar;

interface CNumeric extends CAny {
  [sInferred]: number;
  /**@example Between(val, col1, col2)*/
  Between(col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example NotBetween(val, col1, col2)*/
  NotBetween(col1: DNumericable, col2: DNumericable): DBoolField;
  /**@description Absolute value	@example abs(-17.4)*/
  abs(): number & CNumeric;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(): number & CNumeric;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(): number & CNumeric;
  add(col1?: DNumericable | DOtherable): number & CNumeric;
  add(col1: DDateable): DDateField;
  /**@description Computes the arcsine of x	@example asin(0.5)*/
  asin(): number & CNumeric;
  /**@description Computes the inverse hyperbolic sin of x	@example asinh(0.5)*/
  asinh(): number & CNumeric;
  /**@description Computes the arctangent of x	@example atan(0.5)*/
  atan(): number & CNumeric;
  /**@description Computes the arctangent (y, x)	@example atan2(1.0, 0.0)*/
  atan2(x: DNumericable): number & CNumeric;
  /**@description Computes the inverse hyperbolic tan of x	@example atanh(0.5)*/
  atanh(): number & CNumeric;
  /**@description Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example bar(5, 0, 20, 10)*/
  bar(min: DNumericable, max: DNumericable, width?: DNumericable | DOtherable): string & CVarchar;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(): string & CVarchar;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(): number & CNumeric;
  /**@description Returns the cube root of x	@example cbrt(8)*/
  cbrt(): number & CNumeric;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceil(): number & CNumeric;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceiling(): number & CNumeric;
  /**@description Returns a character which is corresponding the ASCII code value or Unicode code point	@example chr(65)*/
  chr(): string & CVarchar;
  /**@description Computes the cos of x	@example cos(90)*/
  cos(): number & CNumeric;
  /**@description Computes the hyperbolic cos of x	@example cosh(1)*/
  cosh(): number & CNumeric;
  /**@description Computes the cotangent of x	@example cot(0.5)*/
  cot(): number & CNumeric;
  /**@description Converts radians to degrees	@example degrees(pi())*/
  degrees(): number & CNumeric;
  divide(col1: DNumericable): number & CNumeric;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(): DDateField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Rounds x to next even number by rounding away from zero	@example even(2.9)*/
  even(): number & CNumeric;
  excel_text(col1: DVarcharable): string & CVarchar;
  /**@description Computes e to the power of x	@example exp(1)*/
  exp(): number & CNumeric;
  /**@description Factorial of x. Computes the product of the current integer and all integers below it	@example 4!*/
  factorial(): number & CNumeric;
  /**@description Rounds the number down	@example floor(17.4)*/
  floor(): number & CNumeric;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example format_bytes(1000 * 16)*/
  formatReadableDecimalSize(): string & CVarchar;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  formatReadableSize(): string & CVarchar;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  format_bytes(): string & CVarchar;
  /**@description Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example gamma(5.5)*/
  gamma(): number & CNumeric;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  gcd(y: DNumericable): number & CNumeric;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(stop?: DNumericable | DOtherable, step?: DNumericable | DOtherable): DArrayField;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  greatest_common_divisor(y: DNumericable): number & CNumeric;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(): string & CVarchar;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(): DBoolField;
  /**@description Returns true if the floating point value is not a number, false otherwise	@example isnan('NaN'::FLOAT)*/
  isnan(): DBoolField;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  lcm(y: DNumericable): number & CNumeric;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  least_common_multiple(y: DNumericable): number & CNumeric;
  /**@description Computes the log of the gamma function	@example lgamma(2)*/
  lgamma(): number & CNumeric;
  /**@description Computes the natural logarithm of x	@example ln(2)*/
  ln(): number & CNumeric;
  /**@description Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example log(2, 64)*/
  log(x?: DNumericable | DOtherable): number & CNumeric;
  /**@description Computes the 10-log of x	@example log10(1000)*/
  log10(): number & CNumeric;
  /**@description Computes the 2-log of x	@example log2(8)*/
  log2(): number & CNumeric;
  /**@description The date for the given parts	@example make_date(1992, 9, 20)*/
  make_date(month: DNumericable, day: DNumericable): DDateField;
  make_date(): DDateField;
  /**@description The date for the given struct.	@example make_date({'year': 2024, 'month': 11, 'day': 14})*/
  make_date(): DDateField;
  /**@description The time for the given parts	@example make_time(13, 34, 27.123456)*/
  make_time(minute: DNumericable, seconds: DNumericable): DDateField;
  /**@description The timestamp for the given parts	@example make_timestamp(1992, 9, 20, 13, 34, 27.123456)*/
  make_timestamp(month?: DNumericable | DOtherable, day?: DNumericable | DOtherable, hour?: DNumericable | DOtherable, minute?: DNumericable | DOtherable, seconds?: DNumericable | DOtherable): DDateField;
  /**@description The timestamp for the given nanoseconds since epoch	@example make_timestamp(1732117793000000000)*/
  make_timestamp_ns(): DDateField;
  make_timestamptz(col1?: DNumericable | DOtherable, col2?: DNumericable | DOtherable, col3?: DNumericable | DOtherable, col4?: DNumericable | DOtherable, col5?: DNumericable | DOtherable, col6?: DOtherable | DVarcharable): DDateField;
  mod(col1: DNumericable): number & CNumeric;
  multiply(col1: DOtherable): DOtherField;
  multiply(col1: DNumericable): number & CNumeric;
  /**@description Returns the next floating point value after x in the direction of y	@example nextafter(1::float, 2::float)*/
  nextafter(y: DNumericable): number & CNumeric;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  pow(y: DNumericable): number & CNumeric;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  power(y: DNumericable): number & CNumeric;
  /**@description Converts degrees to radians	@example radians(90)*/
  radians(): number & CNumeric;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(stop?: DNumericable | DOtherable, step?: DNumericable | DOtherable): DArrayField;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(precision?: DNumericable | DOtherable): number & CNumeric;
  /**@description Sets the seed to be used for the random function	@example setseed(0.42)*/
  setseed(): DOtherField;
  /**@description Returns the sign of x as -1, 0 or 1	@example sign(-349)*/
  sign(): number & CNumeric;
  /**@description Returns whether the signbit is set or not	@example signbit(-0.0)*/
  signbit(): DBoolField;
  /**@description Computes the sin of x	@example sin(90)*/
  sin(): number & CNumeric;
  /**@description Computes the hyperbolic sin of x	@example sinh(1)*/
  sinh(): number & CNumeric;
  /**@description Returns the square root of x	@example sqrt(4)*/
  sqrt(): number & CNumeric;
  subtract(col1?: DNumericable | DOtherable): number & CNumeric;
  /**@description Computes the tan of x	@example tan(90)*/
  tan(): number & CNumeric;
  /**@description Computes the hyperbolic tan of x	@example tanh(1)*/
  tanh(): number & CNumeric;
  text(col1: DVarcharable): string & CVarchar;
  /**@description Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example to_base(42, 16)*/
  to_base(radix: DNumericable, minLength?: DNumericable | DOtherable): string & CVarchar;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(): string & CVarchar;
  /**@description Construct a century interval	@example to_centuries(5)*/
  to_centuries(): DOtherField;
  /**@description Construct a day interval	@example to_days(5)*/
  to_days(): DOtherField;
  /**@description Construct a decade interval	@example to_decades(5)*/
  to_decades(): DOtherField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(): string & CVarchar;
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
  to_timestamp(): DDateField;
  /**@description Construct a week interval	@example to_weeks(5)*/
  to_weeks(): DOtherField;
  /**@description Construct a year interval	@example to_years(5)*/
  to_years(): DOtherField;
  /**@description Truncates the number	@example trunc(17.4)*/
  trunc(): number & CNumeric;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(right: DNumericable): number & CNumeric;
}

export type DNumericComp = number & CNumeric;

interface CGlobal {
  cast(val: DBoolable, destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  cast(val: DAnyable, destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): Partial<CAny>;
  cast(val: DDateable, destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  cast(val: DNumericable, destype: DNUMERIC_NATIVE, ...args: DAnyable[]): number & CNumeric;
  cast(val: DVarcharable, destype: DSTRING_NATIVE, ...args: DAnyable[]): string & CVarchar;
  cast(val: DAnyable, destype: DANY_NATIVE, ...args: DAnyable[]): Partial<CAny>;

  /**@example Array(val)*/
  Array(val: DOtherable): DArrayField;
  /**@example Between(val, col1, col2)*/
  Between(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
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
  /**@example Glob(val, matcher)*/
  Glob(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example Hugeint(val)*/
  Hugeint(val: DOtherable): number & CNumeric;
  /**@example Ilike(val, matcher)*/
  Ilike(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example In(val, matcher)*/
  In(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example Integer(val)*/
  Integer(val: DOtherable): number & CNumeric;
  /**@example Interval(val)*/
  Interval(val: DOtherable): DOtherField;
  /**@example IsNull(val)*/
  IsNull(val: DAnyable): DBoolField;
  /**@example Json(val)*/
  Json(val: DOtherable): DJsonField;
  /**@example Like(val, matcher)*/
  Like(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example List(val)*/
  List(val: DOtherable): DArrayField;
  /**@example Map(val)*/
  Map(val: DOtherable): DMapField;
  /**@example NotBetween(val, col1, col2)*/
  NotBetween(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example Null(val)*/
  Null(val: DOtherable): DOtherField;
  /**@example SimilarTo(val, matcher)*/
  SimilarTo(val: DVarcharable, matcher: DAnyable): DBoolField;
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
  /**@description Absolute value	@example abs(-17.4)*/
  abs(x: DNumericable): number & CNumeric;
  /**@description Computes the arccosine of x	@example acos(0.5)*/
  acos(x: DNumericable): number & CNumeric;
  /**@description Computes the inverse hyperbolic cos of x	@example acosh(2.3)*/
  acosh(x: DNumericable): number & CNumeric;
  add(col0: DArrayable, col1: DArrayable): DArrayField;
  add(col0: DNumericable, col1?: DNumericable | DOtherable): number & CNumeric;
  add(col0: DDateable, col1: DDateable | DNumericable | DOtherable): DDateField;
  add(col0: DNumericable, col1: DDateable): DDateField;
  add(col0: DOtherable, col1: DDateable): DDateField;
  add(col0: DOtherable, col1: DOtherable): DOtherField;
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
  array_cosine_distance(arr1: DArrayable, arr2: DArrayable): number & CNumeric;
  /**@description Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_cosine_similarity([1, 2, 3], [1, 2, 3])*/
  array_cosine_similarity(arr1: DArrayable, arr2: DArrayable): number & CNumeric;
  /**@description Compute the cross product of two arrays of size 3. The array elements can not be NULL.	@example array_cross_product([1, 2, 3], [1, 2, 3])*/
  array_cross_product(arr: DArrayable, arr__01: DArrayable): DArrayField;
  /**@description Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_distance([1, 2, 3], [1, 2, 3])*/
  array_distance(arr1: DArrayable, arr2: DArrayable): number & CNumeric;
  /**@description Removes all duplicates and NULLs from a list. Does not preserve the original order	@example list_distinct([1, 1, NULL, -3, 1, 5])*/
  array_distinct(list: DArrayable): DArrayField;
  /**@description Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_inner_product([1, 2, 3], [1, 2, 3])*/
  array_dot_product(arr1: DArrayable, arr2: DArrayable): number & CNumeric;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DArrayable, index: DNumericable): Partial<CAny>;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DStructable, index: DNumericable | DVarcharable): Partial<CAny>;
  /**@description Extract the indexth (1-based) value from the array.	@example array_extract('DuckDB', 2)*/
  array_extract(list: DVarcharable, index: DNumericable): string & CVarchar;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  array_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  array_grade_up(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  array_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Returns true if all elements of l2 are in l1. NULLs are ignored.	@example list_has_all([1, 2, 3], [2, 3])*/
  array_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns true if the lists have any element in common. NULLs are ignored.	@example list_has_any([1, 2, 3], [2, 3, 4])*/
  array_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_indexof(list: DArrayable, element: DAnyable): number & CNumeric;
  /**@description Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_inner_product([1, 2, 3], [1, 2, 3])*/
  array_inner_product(arr1: DArrayable, arr2: DArrayable): number & CNumeric;
  /**@description Returns the length of the list.	@example array_length([1,2,3])*/
  array_length(list: DArrayable, col1?: DNumericable | DOtherable): number & CNumeric;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_dot_product(arr1: DArrayable, arr2: DArrayable): number & CNumeric;
  /**@description Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example array_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  array_negative_inner_product(arr1: DArrayable, arr2: DArrayable): number & CNumeric;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  array_position(list: DArrayable, element: DAnyable): number & CNumeric;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  array_reduce(list: DArrayable, lambda: DOtherable): Partial<CAny>;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  array_resize(list: DArrayable, size: DAnyable, value?: DAnyable | DOtherable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  array_reverse_sort(list: DArrayable, col1?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  array_select(valueList: DArrayable, indexList: DArrayable): DArrayField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  array_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step?: DNumericable | DOtherable): Partial<CAny>;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  array_sort(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  array_to_json(...args: DAnyable[]): DJsonField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  array_transform(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Counts the unique elements of a list	@example list_unique([1, 1, NULL, -3, 1, 5])*/
  array_unique(list: DArrayable): number & CNumeric;
  /**@description Create an ARRAY containing the argument values.	@example array_value(4, 5, 6)*/
  array_value(...args: DAnyable[]): DArrayField;
  /**@description Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example list_where([10, 20, 30, 40], [true, false, false, true])*/
  array_where(valueList: DArrayable, maskList: DArrayable): DArrayField;
  /**@description Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example list_zip([1, 2], [3, 4], [5, 6])*/
  array_zip(...args: DAnyable[]): DArrayField;
  /**@description Returns an integer that represents the Unicode code point of the first character of the string	@example ascii('Ω')*/
  ascii(string: DVarcharable): number & CNumeric;
  /**@description Computes the arcsine of x	@example asin(0.5)*/
  asin(x: DNumericable): number & CNumeric;
  /**@description Computes the inverse hyperbolic sin of x	@example asinh(0.5)*/
  asinh(x: DNumericable): number & CNumeric;
  /**@description Computes the arctangent of x	@example atan(0.5)*/
  atan(x: DNumericable): number & CNumeric;
  /**@description Computes the arctangent (y, x)	@example atan2(1.0, 0.0)*/
  atan2(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Computes the inverse hyperbolic tan of x	@example atanh(0.5)*/
  atanh(x: DNumericable): number & CNumeric;
  /**@description Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example bar(5, 0, 20, 10)*/
  bar(x: DNumericable, min: DNumericable, max: DNumericable, width?: DNumericable | DOtherable): string & CVarchar;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  base64(blob: DBlobable): string & CVarchar;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(value: DNumericable): string & CVarchar;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(value: DVarcharable): string & CVarchar;
  /**@description Converts the value to binary representation	@example bin(42)*/
  bin(value: DOtherable): string & CVarchar;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(x: DNumericable): number & CNumeric;
  /**@description Returns the number of bits that are set	@example bit_count(31)*/
  bit_count(x: DOtherable): number & CNumeric;
  bit_length(col0: DOtherable): number & CNumeric;
  bit_length(col0: DVarcharable): number & CNumeric;
  /**@description Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1	@example bit_position('010'::BIT, '1110101'::BIT)*/
  bit_position(substring: DOtherable, bitstring: DOtherable): number & CNumeric;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(bitstring: DOtherable, length: DNumericable): DOtherField;
  /**@description Pads the bitstring until the specified length	@example bitstring('1010'::BIT, 7)*/
  bitstring(bitstring: DVarcharable, length: DNumericable): DOtherField;
  broadcast(col0: DOtherable): DOtherField;
  /**@description Whether or not we can implicitly cast from the source type to the other type	@example can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)*/
  can_cast_implicitly(sourceType: DAnyable, targetType: DAnyable): DBoolField;
  /**@description Returns the size of the map (or the number of entries in the map)	@example cardinality( map([4, 2], ['a', 'b']) );*/
  cardinality(map: DAnyable, ...args: DAnyable[]): number & CNumeric;
  /**@description Returns the cube root of x	@example cbrt(8)*/
  cbrt(x: DNumericable): number & CNumeric;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceil(x: DNumericable): number & CNumeric;
  /**@description Rounds the number up	@example ceil(17.4)*/
  ceiling(x: DNumericable): number & CNumeric;
  /**@description Extract the century component from a date or timestamp	@example century(timestamp '2021-08-03 11:59:44.123456')*/
  century(ts: DDateable): number & CNumeric;
  /**@description Extract the century component from a date or timestamp	@example century(timestamp '2021-08-03 11:59:44.123456')*/
  century(ts: DOtherable): number & CNumeric;
  /**@description Returns a character which is corresponding the ASCII code value or Unicode code point	@example chr(65)*/
  chr(codePoint: DNumericable): string & CVarchar;
  combine(col0: DOtherable, col1: DAnyable): DOtherField;
  /**@description Concatenate many strings together.	@example concat('Hello', ' ', 'World')*/
  concat(string: DAnyable, ...args: DAnyable[]): string & CVarchar;
  /**@description Concatenate strings together separated by the specified separator.	@example concat_ws(', ', 'Banana', 'Apple', 'Melon')*/
  concat_ws(separator: DVarcharable, string: DAnyable, ...args: DAnyable[]): string & CVarchar;
  /**@description If arg2 is NULL, return NULL. Otherwise, return arg1.	@example constant_or_null(42, NULL)*/
  constant_or_null(arg1: DAnyable, arg2: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Returns true if the list contains the element.	@example contains([1, 2, NULL], 1)*/
  contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Checks if a map contains a given key.	@example contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')*/
  contains(map: DMapable, key: DAnyable): DBoolField;
  /**@description Returns true if search_string is found within string.	@example contains('abc', 'a')*/
  contains(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description Computes the cos of x	@example cos(90)*/
  cos(x: DNumericable): number & CNumeric;
  /**@description Computes the hyperbolic cos of x	@example cosh(1)*/
  cosh(x: DNumericable): number & CNumeric;
  /**@description Computes the cotangent of x	@example cot(0.5)*/
  cot(x: DNumericable): number & CNumeric;
  /**@example count()*/
  count(): number & CNumeric;
  /**@description Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example create_sort_key('A', 'DESC')*/
  create_sort_key(parameters: DAnyable, ...args: DAnyable[]): DBlobField;
  /**@description Returns the name of the currently active database	@example current_database()*/
  current_database(): string & CVarchar;
  current_date(): DDateField;
  current_localtime(): DDateField;
  current_localtimestamp(): DDateField;
  /**@description Returns the current query as a string	@example current_query()*/
  current_query(): string & CVarchar;
  /**@description Returns the name of the currently active schema. Default is main	@example current_schema()*/
  current_schema(): string & CVarchar;
  /**@description Returns list of schemas. Pass a parameter of True to include implicit schemas	@example current_schemas(true)*/
  current_schemas(includeImplicit: DBoolable): DArrayField;
  /**@description Returns the current value of the configuration setting	@example current_setting('access_mode')*/
  current_setting(settingName: DVarcharable): Partial<CAny>;
  /**@description Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example currval('my_sequence_name')*/
  currval(sequenceName: DVarcharable): number & CNumeric;
  /**@description Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example damerau_levenshtein('hello', 'world')*/
  damerau_levenshtein(str1: DVarcharable, str2: DVarcharable): number & CNumeric;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_diff(part: DVarcharable, startdate: DDateable, enddate: DDateable): number & CNumeric;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(ts: DVarcharable, col1: DDateable | DOtherable): number & CNumeric;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  date_part(ts: DArrayable, col1: DDateable | DOtherable): DStructField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  date_sub(part: DVarcharable, startdate: DDateable, enddate: DDateable): number & CNumeric;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(part: DVarcharable, timestamp: DDateable): DDateField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  date_trunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  /**@description The number of partition boundaries between the timestamps	@example date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datediff(part: DVarcharable, startdate: DDateable, enddate: DDateable): number & CNumeric;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(ts: DVarcharable, col1: DDateable | DOtherable): number & CNumeric;
  /**@description Get subfield (equivalent to extract)	@example date_part('minute', TIMESTAMP '1992-09-20 20:38:40')*/
  datepart(ts: DArrayable, col1: DDateable | DOtherable): DStructField;
  /**@description The number of complete partitions between the timestamps	@example date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')*/
  datesub(part: DVarcharable, startdate: DDateable, enddate: DDateable): number & CNumeric;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(part: DVarcharable, timestamp: DDateable): DDateField;
  /**@description Truncate to specified precision	@example date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')*/
  datetrunc(part: DVarcharable, timestamp: DOtherable): DOtherField;
  /**@description Extract the day component from a date or timestamp	@example day(timestamp '2021-08-03 11:59:44.123456')*/
  day(ts: DDateable): number & CNumeric;
  /**@description Extract the day component from a date or timestamp	@example day(timestamp '2021-08-03 11:59:44.123456')*/
  day(ts: DOtherable): number & CNumeric;
  /**@description The (English) name of the weekday	@example dayname(TIMESTAMP '1992-03-22')*/
  dayname(ts: DDateable): string & CVarchar;
  /**@description Extract the dayofmonth component from a date or timestamp	@example dayofmonth(timestamp '2021-08-03 11:59:44.123456')*/
  dayofmonth(ts: DDateable): number & CNumeric;
  /**@description Extract the dayofmonth component from a date or timestamp	@example dayofmonth(timestamp '2021-08-03 11:59:44.123456')*/
  dayofmonth(ts: DOtherable): number & CNumeric;
  /**@description Extract the dayofweek component from a date or timestamp	@example dayofweek(timestamp '2021-08-03 11:59:44.123456')*/
  dayofweek(ts: DDateable): number & CNumeric;
  /**@description Extract the dayofweek component from a date or timestamp	@example dayofweek(timestamp '2021-08-03 11:59:44.123456')*/
  dayofweek(ts: DOtherable): number & CNumeric;
  /**@description Extract the dayofyear component from a date or timestamp	@example dayofyear(timestamp '2021-08-03 11:59:44.123456')*/
  dayofyear(ts: DDateable): number & CNumeric;
  /**@description Extract the dayofyear component from a date or timestamp	@example dayofyear(timestamp '2021-08-03 11:59:44.123456')*/
  dayofyear(ts: DOtherable): number & CNumeric;
  /**@description Extract the decade component from a date or timestamp	@example decade(timestamp '2021-08-03 11:59:44.123456')*/
  decade(ts: DDateable): number & CNumeric;
  /**@description Extract the decade component from a date or timestamp	@example decade(timestamp '2021-08-03 11:59:44.123456')*/
  decade(ts: DOtherable): number & CNumeric;
  /**@description Convert blob to varchar. Fails if blob is not valid utf-8	@example decode('\xC3\xBC'::BLOB)*/
  decode(blob: DBlobable): string & CVarchar;
  /**@description Converts radians to degrees	@example degrees(pi())*/
  degrees(x: DNumericable): number & CNumeric;
  divide(col0: DNumericable, col1: DNumericable): number & CNumeric;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  editdist3(str1: DVarcharable, str2: DVarcharable): number & CNumeric;
  /**@description Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example map_extract(map(['key'], ['val']), 'key')*/
  element_at(map: DAnyable, key: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Convert varchar to blob. Converts utf-8 characters into literal encoding	@example encode('my_string_with_ü')*/
  encode(string: DVarcharable): DBlobField;
  ends_with(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Returns the numeric value backing the given enum value	@example enum_code('happy'::mood)*/
  enum_code(enm: DAnyable): Partial<CAny>;
  /**@description Returns the first value of the input enum type	@example enum_first(NULL::mood)*/
  enum_first(enm: DAnyable): string & CVarchar;
  /**@description Returns the last value of the input enum type	@example enum_last(NULL::mood)*/
  enum_last(enm: DAnyable): string & CVarchar;
  /**@description Returns all values of the input enum type as an array	@example enum_range(NULL::mood)*/
  enum_range(enm: DAnyable): DArrayField;
  /**@description Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example enum_range_boundary(NULL, 'happy'::mood)*/
  enum_range_boundary(start: DAnyable, end: DAnyable): DArrayField;
  /**@description Extract the epoch component from a temporal type	@example epoch(timestamp '2021-08-03 11:59:44.123456')*/
  epoch(temporal: DDateable): number & CNumeric;
  /**@description Extract the epoch component from a temporal type	@example epoch(timestamp '2021-08-03 11:59:44.123456')*/
  epoch(temporal: DOtherable): number & CNumeric;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DNumericable): DDateField;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DDateable): number & CNumeric;
  /**@description Extract the epoch component in milliseconds from a temporal type	@example epoch_ms(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ms(temporal: DOtherable): number & CNumeric;
  /**@description Extract the epoch component in nanoseconds from a temporal type	@example epoch_ns(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ns(temporal: DDateable): number & CNumeric;
  /**@description Extract the epoch component in nanoseconds from a temporal type	@example epoch_ns(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_ns(temporal: DOtherable): number & CNumeric;
  /**@description Extract the epoch component in microseconds from a temporal type	@example epoch_us(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_us(temporal: DDateable): number & CNumeric;
  /**@description Extract the epoch component in microseconds from a temporal type	@example epoch_us(timestamp '2021-08-03 11:59:44.123456')*/
  epoch_us(temporal: DOtherable): number & CNumeric;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DAnyable, max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DNumericable, max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example equi_width_bins(0, 10, 2, true)*/
  equi_width_bins(min: DDateable, max: DDateable, binCount: DNumericable, niceRounding: DBoolable): DArrayField;
  /**@description Extract the era component from a date or timestamp	@example era(timestamp '2021-08-03 11:59:44.123456')*/
  era(ts: DDateable): number & CNumeric;
  /**@description Extract the era component from a date or timestamp	@example era(timestamp '2021-08-03 11:59:44.123456')*/
  era(ts: DOtherable): number & CNumeric;
  /**@description Throws the given error message	@example error('access_mode')*/
  error(message: DVarcharable): DOtherField;
  /**@description Rounds x to next even number by rounding away from zero	@example even(2.9)*/
  even(x: DNumericable): number & CNumeric;
  excel_text(col0: DNumericable, col1: DVarcharable): string & CVarchar;
  /**@description Computes e to the power of x	@example exp(1)*/
  exp(x: DNumericable): number & CNumeric;
  /**@description Factorial of x. Computes the product of the current integer and all integers below it	@example 4!*/
  factorial(x: DNumericable): number & CNumeric;
  family(col0: DOtherable): number & CNumeric;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  filter(list: DArrayable, lambda: DOtherable): DArrayField;
  finalize(col0: DOtherable): DOtherField;
  /**@description Flatten a nested list by one level	@example flatten([[1, 2, 3], [4, 5]])*/
  flatten(nestedList: DArrayable): DArrayField;
  /**@description Rounds the number down	@example floor(17.4)*/
  floor(x: DNumericable): number & CNumeric;
  /**@description Formats a string using fmt syntax	@example format('Benchmark "{}" took {} seconds', 'CSV', 42)*/
  format(format: DVarcharable, ...args: DAnyable[]): string & CVarchar;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example format_bytes(1000 * 16)*/
  formatReadableDecimalSize(bytes: DNumericable): string & CVarchar;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  formatReadableSize(bytes: DNumericable): string & CVarchar;
  /**@description Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example format_bytes(1000 * 16)*/
  format_bytes(bytes: DNumericable): string & CVarchar;
  /**@description Convert a base64 encoded string to a character string	@example from_base64('QQ==')*/
  from_base64(string: DVarcharable): DBlobField;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  from_binary(value: DVarcharable): DBlobField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  from_hex(value: DVarcharable): DBlobField;
  from_json(col0: DJsonable, col1: DVarcharable): Partial<CAny>;
  from_json(col0: DVarcharable, col1: DVarcharable): Partial<CAny>;
  from_json_strict(col0: DJsonable, col1: DVarcharable): Partial<CAny>;
  from_json_strict(col0: DVarcharable, col1: DVarcharable): Partial<CAny>;
  /**@description Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example gamma(5.5)*/
  gamma(x: DNumericable): number & CNumeric;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  gcd(x: DNumericable, y: DNumericable): number & CNumeric;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  gen_random_uuid(): DOtherField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(start: DNumericable, stop?: DNumericable | DOtherable, step?: DNumericable | DOtherable): DArrayField;
  /**@description Create a list of values between start and stop - the stop parameter is inclusive	@example generate_series(2, 5, 3)*/
  generate_series(start: DDateable, stop: DDateable, step: DOtherable): DArrayField;
  /**@description Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0	@example get_bit('0110010'::BIT, 2)*/
  get_bit(bitstring: DOtherable, index: DNumericable): number & CNumeric;
  get_current_time(): DDateField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  get_current_timestamp(): DDateField;
  get_delta_test_expression(): DArrayField;
  getvariable(col0: DVarcharable): Partial<CAny>;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  grade_up(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns the highest value of the set of input parameters	@example greatest(42, 84)*/
  greatest(arg1: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Computes the greatest common divisor of x and y	@example greatest_common_divisor(42, 57)*/
  greatest_common_divisor(x: DNumericable, y: DNumericable): number & CNumeric;
  h3_are_neighbor_cells(col0: DNumericable, col1: DNumericable): DBoolField;
  h3_are_neighbor_cells(col0: DVarcharable, col1: DVarcharable): DBoolField;
  h3_cell_area(col0: DNumericable, col1: DVarcharable): number & CNumeric;
  h3_cell_area(col0: DVarcharable, col1: DVarcharable): number & CNumeric;
  h3_cell_to_boundary_wkt(col0: DNumericable): string & CVarchar;
  h3_cell_to_boundary_wkt(col0: DVarcharable): string & CVarchar;
  h3_cell_to_center_child(col0: DNumericable, col1: DNumericable): number & CNumeric;
  h3_cell_to_center_child(col0: DVarcharable, col1: DNumericable): string & CVarchar;
  h3_cell_to_child_pos(col0: DNumericable, col1: DNumericable): number & CNumeric;
  h3_cell_to_child_pos(col0: DVarcharable, col1: DNumericable): number & CNumeric;
  h3_cell_to_children(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_cell_to_children(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_cell_to_lat(col0: DNumericable): number & CNumeric;
  h3_cell_to_lat(col0: DVarcharable): number & CNumeric;
  h3_cell_to_latlng(col0: DNumericable): DArrayField;
  h3_cell_to_latlng(col0: DVarcharable): DArrayField;
  h3_cell_to_lng(col0: DNumericable): number & CNumeric;
  h3_cell_to_lng(col0: DVarcharable): number & CNumeric;
  h3_cell_to_local_ij(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_cell_to_local_ij(col0: DVarcharable, col1: DVarcharable): DArrayField;
  h3_cell_to_parent(col0: DNumericable, col1: DNumericable): number & CNumeric;
  h3_cell_to_parent(col0: DVarcharable, col1: DNumericable): string & CVarchar;
  h3_cell_to_vertex(col0: DNumericable, col1: DNumericable): number & CNumeric;
  h3_cell_to_vertex(col0: DVarcharable, col1: DNumericable): string & CVarchar;
  h3_cell_to_vertexes(col0: DNumericable): DArrayField;
  h3_cell_to_vertexes(col0: DVarcharable): DArrayField;
  h3_cells_to_directed_edge(col0: DNumericable, col1: DNumericable): number & CNumeric;
  h3_cells_to_directed_edge(col0: DVarcharable, col1: DVarcharable): string & CVarchar;
  h3_cells_to_multi_polygon_wkt(col0: DArrayable): string & CVarchar;
  h3_child_pos_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): number & CNumeric;
  h3_child_pos_to_cell(col0: DNumericable, col1: DVarcharable, col2: DNumericable): string & CVarchar;
  h3_compact_cells(col0: DArrayable): DArrayField;
  h3_directed_edge_to_boundary_wkt(col0: DNumericable): string & CVarchar;
  h3_directed_edge_to_boundary_wkt(col0: DVarcharable): string & CVarchar;
  h3_directed_edge_to_cells(col0: DNumericable): DArrayField;
  h3_directed_edge_to_cells(col0: DVarcharable): DArrayField;
  h3_edge_length(col0: DNumericable, col1: DVarcharable): number & CNumeric;
  h3_edge_length(col0: DVarcharable, col1: DVarcharable): number & CNumeric;
  h3_get_base_cell_number(col0: DNumericable): number & CNumeric;
  h3_get_base_cell_number(col0: DVarcharable): number & CNumeric;
  h3_get_directed_edge_destination(col0: DNumericable): number & CNumeric;
  h3_get_directed_edge_destination(col0: DVarcharable): string & CVarchar;
  h3_get_directed_edge_origin(col0: DNumericable): number & CNumeric;
  h3_get_directed_edge_origin(col0: DVarcharable): string & CVarchar;
  h3_get_hexagon_area_avg(col0: DNumericable, col1: DVarcharable): number & CNumeric;
  h3_get_hexagon_edge_length_avg(col0: DNumericable, col1: DVarcharable): number & CNumeric;
  h3_get_icosahedron_faces(col0: DNumericable): DArrayField;
  h3_get_icosahedron_faces(col0: DVarcharable): DArrayField;
  h3_get_num_cells(col0: DNumericable): number & CNumeric;
  h3_get_pentagons(col0: DNumericable): DArrayField;
  h3_get_pentagons_string(col0: DNumericable): DArrayField;
  h3_get_res0_cells(): DArrayField;
  h3_get_res0_cells_string(): DArrayField;
  h3_get_resolution(col0: DNumericable): number & CNumeric;
  h3_get_resolution(col0: DVarcharable): number & CNumeric;
  h3_great_circle_distance(col0: DNumericable, col1: DNumericable, col2: DNumericable, col3: DNumericable, col4: DVarcharable): number & CNumeric;
  h3_grid_disk(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances_safe(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances_safe(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances_unsafe(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk_distances_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_disk_unsafe(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_disk_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_grid_distance(col0: DNumericable, col1: DNumericable): number & CNumeric;
  h3_grid_distance(col0: DVarcharable, col1: DVarcharable): number & CNumeric;
  h3_grid_path_cells(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_path_cells(col0: DVarcharable, col1: DVarcharable): DArrayField;
  h3_grid_ring_unsafe(col0: DNumericable, col1: DNumericable): DArrayField;
  h3_grid_ring_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_h3_to_string(col0: DNumericable): string & CVarchar;
  h3_is_pentagon(col0: DNumericable): DBoolField;
  h3_is_pentagon(col0: DVarcharable): DBoolField;
  h3_is_res_class_iii(col0: DNumericable): DBoolField;
  h3_is_res_class_iii(col0: DVarcharable): DBoolField;
  h3_is_valid_cell(col0: DNumericable): DBoolField;
  h3_is_valid_cell(col0: DVarcharable): DBoolField;
  h3_is_valid_directed_edge(col0: DNumericable): DBoolField;
  h3_is_valid_directed_edge(col0: DVarcharable): DBoolField;
  h3_is_valid_vertex(col0: DNumericable): DBoolField;
  h3_is_valid_vertex(col0: DVarcharable): DBoolField;
  h3_latlng_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): number & CNumeric;
  h3_latlng_to_cell_string(col0: DNumericable, col1: DNumericable, col2: DNumericable): string & CVarchar;
  h3_local_ij_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): number & CNumeric;
  h3_local_ij_to_cell(col0: DVarcharable, col1: DNumericable, col2: DNumericable): string & CVarchar;
  h3_origin_to_directed_edges(col0: DNumericable): DArrayField;
  h3_origin_to_directed_edges(col0: DVarcharable): DArrayField;
  h3_polygon_wkt_to_cells(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_polygon_wkt_to_cells_experimental(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField;
  h3_polygon_wkt_to_cells_experimental_string(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField;
  h3_polygon_wkt_to_cells_string(col0: DVarcharable, col1: DNumericable): DArrayField;
  h3_string_to_h3(col0: DVarcharable): number & CNumeric;
  h3_uncompact_cells(col0: DArrayable, col1: DNumericable): DArrayField;
  h3_vertex_to_lat(col0: DNumericable): number & CNumeric;
  h3_vertex_to_lat(col0: DVarcharable): number & CNumeric;
  h3_vertex_to_latlng(col0: DNumericable): DArrayField;
  h3_vertex_to_latlng(col0: DVarcharable): DArrayField;
  h3_vertex_to_lng(col0: DNumericable): number & CNumeric;
  h3_vertex_to_lng(col0: DVarcharable): number & CNumeric;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  hamming(str1: DVarcharable, str2: DVarcharable): number & CNumeric;
  /**@description Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example hash('🦆')*/
  hash(param: DAnyable, ...args: DAnyable[]): number & CNumeric;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DNumericable): string & CVarchar;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DBlobable): string & CVarchar;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DVarcharable): string & CVarchar;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  hex(value: DOtherable): string & CVarchar;
  host(col0: DOtherable): string & CVarchar;
  /**@description Extract the hour component from a date or timestamp	@example hour(timestamp '2021-08-03 11:59:44.123456')*/
  hour(ts: DDateable): number & CNumeric;
  /**@description Extract the hour component from a date or timestamp	@example hour(timestamp '2021-08-03 11:59:44.123456')*/
  hour(ts: DOtherable): number & CNumeric;
  html_escape(col0: DVarcharable, col1?: DBoolable | DOtherable): string & CVarchar;
  html_unescape(col0: DVarcharable): string & CVarchar;
  icu_sort_key(col0: DVarcharable, col1: DVarcharable): string & CVarchar;
  /**@description Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example ilike_escape('A%c', 'a$%C', '$')*/
  ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns whether or not the database/schema are in the search path	@example in_search_path('memory', 'main')*/
  in_search_path(databaseName: DVarcharable, schemaName: DVarcharable): DBoolField;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  instr(haystack: DVarcharable, needle: DVarcharable): number & CNumeric;
  /**@description Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example is_histogram_other_bin(v)*/
  is_histogram_other_bin(val: DAnyable): DBoolField;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(x: DDateable): DBoolField;
  /**@description Returns true if the floating point value is finite, false otherwise	@example isfinite(5.5)*/
  isfinite(x: DNumericable): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(x: DDateable): DBoolField;
  /**@description Returns true if the floating point value is infinite, false otherwise	@example isinf('Infinity'::float)*/
  isinf(x: DNumericable): DBoolField;
  /**@description Returns true if the floating point value is not a number, false otherwise	@example isnan('NaN'::FLOAT)*/
  isnan(x: DNumericable): DBoolField;
  /**@description Extract the isodow component from a date or timestamp	@example isodow(timestamp '2021-08-03 11:59:44.123456')*/
  isodow(ts: DDateable): number & CNumeric;
  /**@description Extract the isodow component from a date or timestamp	@example isodow(timestamp '2021-08-03 11:59:44.123456')*/
  isodow(ts: DOtherable): number & CNumeric;
  /**@description Extract the isoyear component from a date or timestamp	@example isoyear(timestamp '2021-08-03 11:59:44.123456')*/
  isoyear(ts: DDateable): number & CNumeric;
  /**@description Extract the isoyear component from a date or timestamp	@example isoyear(timestamp '2021-08-03 11:59:44.123456')*/
  isoyear(ts: DOtherable): number & CNumeric;
  /**@description The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaccard('duck','luck')*/
  jaccard(str1: DVarcharable, str2: DVarcharable): number & CNumeric;
  /**@description The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_similarity('duck', 'duckdb', 0.5)*/
  jaro_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DNumericable | DOtherable): number & CNumeric;
  /**@description The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example jaro_winkler_similarity('duck', 'duckdb', 0.5)*/
  jaro_winkler_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DNumericable | DOtherable): number & CNumeric;
  json_array(...args: DAnyable[]): DJsonField;
  json_array_length(col0: DJsonable, col1: DArrayable): DArrayField;
  json_array_length(col0: DJsonable, col1?: DOtherable | DVarcharable): number & CNumeric;
  json_array_length(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_array_length(col0: DVarcharable, col1?: DOtherable | DVarcharable): number & CNumeric;
  json_contains(col0: DJsonable, col1: DJsonable | DVarcharable): DBoolField;
  json_contains(col0: DVarcharable, col1: DJsonable | DVarcharable): DBoolField;
  json_deserialize_sql(col0: DJsonable): string & CVarchar;
  json_exists(col0: DJsonable, col1: DArrayable): DArrayField;
  json_exists(col0: DJsonable, col1: DVarcharable): DBoolField;
  json_exists(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_exists(col0: DVarcharable, col1: DVarcharable): DBoolField;
  json_extract(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_path(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  json_extract_path(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DJsonable, col1: DNumericable | DVarcharable): string & CVarchar;
  json_extract_path_text(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_path_text(col0: DVarcharable, col1: DNumericable | DVarcharable): string & CVarchar;
  json_extract_string(col0: DJsonable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DJsonable, col1: DNumericable | DVarcharable): string & CVarchar;
  json_extract_string(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_extract_string(col0: DVarcharable, col1: DNumericable | DVarcharable): string & CVarchar;
  json_keys(col0: DJsonable, col1?: DArrayable | DOtherable | DVarcharable): DArrayField;
  json_keys(col0: DVarcharable, col1?: DArrayable | DOtherable | DVarcharable): DArrayField;
  json_merge_patch(...args: DAnyable[]): DJsonField;
  json_object(...args: DAnyable[]): DJsonField;
  json_pretty(col0: DJsonable): string & CVarchar;
  json_quote(...args: DAnyable[]): DJsonField;
  json_serialize_plan(col0: DVarcharable, col1?: DBoolable | DOtherable, col2?: DBoolable | DOtherable, col3?: DBoolable | DOtherable, col4?: DBoolable | DOtherable): DJsonField;
  json_serialize_sql(col0: DVarcharable, col1?: DBoolable | DOtherable, col2?: DBoolable | DOtherable, col3?: DBoolable | DOtherable): DJsonField;
  json_structure(col0: DJsonable): DJsonField;
  json_structure(col0: DVarcharable): DJsonField;
  json_transform(col0: DJsonable, col1: DVarcharable): Partial<CAny>;
  json_transform(col0: DVarcharable, col1: DVarcharable): Partial<CAny>;
  json_transform_strict(col0: DJsonable, col1: DVarcharable): Partial<CAny>;
  json_transform_strict(col0: DVarcharable, col1: DVarcharable): Partial<CAny>;
  json_type(col0: DJsonable, col1: DArrayable): DArrayField;
  json_type(col0: DJsonable, col1?: DOtherable | DVarcharable): string & CVarchar;
  json_type(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_type(col0: DVarcharable, col1?: DOtherable | DVarcharable): string & CVarchar;
  json_valid(col0: DJsonable): DBoolField;
  json_valid(col0: DVarcharable): DBoolField;
  json_value(col0: DJsonable, col1: DArrayable): DArrayField;
  json_value(col0: DJsonable, col1: DNumericable | DVarcharable): string & CVarchar;
  json_value(col0: DVarcharable, col1: DArrayable): DArrayField;
  json_value(col0: DVarcharable, col1: DNumericable | DVarcharable): string & CVarchar;
  /**@description Extract the Julian Day number from a date or timestamp	@example julian(timestamp '2006-01-01 12:00')*/
  julian(ts: DDateable): number & CNumeric;
  /**@description Returns the last day of the month	@example last_day(TIMESTAMP '1992-03-22 01:02:03.1234')*/
  last_day(ts: DDateable): DDateField;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lcase(string: DVarcharable): string & CVarchar;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  lcm(x: DNumericable, y: DNumericable): number & CNumeric;
  /**@description Returns the lowest value of the set of input parameters	@example least(42, 84)*/
  least(arg1: DAnyable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Computes the least common multiple of x and y	@example least_common_multiple(42, 57)*/
  least_common_multiple(x: DNumericable, y: DNumericable): number & CNumeric;
  /**@description Extract the left-most count characters	@example left('Hello🦆', 2)*/
  left(string: DVarcharable, count: DNumericable): string & CVarchar;
  /**@description Extract the left-most count grapheme clusters	@example left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  left_grapheme(string: DVarcharable, count: DNumericable): string & CVarchar;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(string: DArrayable): number & CNumeric;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(string: DOtherable): number & CNumeric;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  len(string: DVarcharable): number & CNumeric;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  length(string: DArrayable): number & CNumeric;
  /**@description Number of characters in string.	@example length('Hello🦆')*/
  length(string: DOtherable): number & CNumeric;
  /**@description Number of grapheme clusters in string.	@example length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')*/
  length_grapheme(string: DVarcharable): number & CNumeric;
  /**@description The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example levenshtein('duck','db')*/
  levenshtein(str1: DVarcharable, str2: DVarcharable): number & CNumeric;
  /**@description Computes the log of the gamma function	@example lgamma(2)*/
  lgamma(x: DNumericable): number & CNumeric;
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
  list_cosine_distance(list1: DArrayable, list2: DArrayable): number & CNumeric;
  /**@description Compute the cosine similarity between two lists	@example list_cosine_similarity([1, 2, 3], [1, 2, 3])*/
  list_cosine_similarity(list1: DArrayable, list2: DArrayable): number & CNumeric;
  /**@description Compute the distance between two lists	@example list_distance([1, 2, 3], [1, 2, 3])*/
  list_distance(list1: DArrayable, list2: DArrayable): number & CNumeric;
  /**@description Removes all duplicates and NULLs from a list. Does not preserve the original order	@example list_distinct([1, 1, NULL, -3, 1, 5])*/
  list_distinct(list: DArrayable): DArrayField;
  /**@description Compute the inner product between two lists	@example list_inner_product([1, 2, 3], [1, 2, 3])*/
  list_dot_product(list1: DArrayable, list2: DArrayable): number & CNumeric;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(list: DArrayable, index: DNumericable): Partial<CAny>;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_element(list: DVarcharable, index: DNumericable): string & CVarchar;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(list: DArrayable, index: DNumericable): Partial<CAny>;
  /**@description Extract the indexth (1-based) value from the list.	@example list_extract([4, 5, 6], 3)*/
  list_extract(list: DVarcharable, index: DNumericable): string & CVarchar;
  /**@description Constructs a list from those elements of the input list for which the lambda function returns true	@example list_filter([3, 4, 5], x -> x > 4)*/
  list_filter(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Returns the index of their sorted position.	@example list_grade_up([3, 6, 1, 2])*/
  list_grade_up(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the list contains the element.	@example list_contains([1, 2, NULL], 1)*/
  list_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description Returns true if all elements of l2 are in l1. NULLs are ignored.	@example list_has_all([1, 2, 3], [2, 3])*/
  list_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns true if the lists have any element in common. NULLs are ignored.	@example list_has_any([1, 2, 3], [2, 3, 4])*/
  list_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  list_indexof(list: DArrayable, element: DAnyable): number & CNumeric;
  /**@description Compute the inner product between two lists	@example list_inner_product([1, 2, 3], [1, 2, 3])*/
  list_inner_product(list1: DArrayable, list2: DArrayable): number & CNumeric;
  /**@description Compute the negative inner product between two lists	@example list_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  list_negative_dot_product(list1: DArrayable, list2: DArrayable): number & CNumeric;
  /**@description Compute the negative inner product between two lists	@example list_negative_inner_product([1, 2, 3], [1, 2, 3])*/
  list_negative_inner_product(list1: DArrayable, list2: DArrayable): number & CNumeric;
  /**@description Create a LIST containing the argument values	@example list_value(4, 5, 6)*/
  list_pack(...args: DAnyable[]): DArrayField;
  /**@description Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example list_position([1, 2, NULL], 2)*/
  list_position(list: DArrayable, element: DAnyable): number & CNumeric;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  list_reduce(list: DArrayable, lambda: DOtherable): Partial<CAny>;
  /**@description Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example list_resize([1, 2, 3], 5, 0)*/
  list_resize(list: DArrayable, size: DAnyable, value?: DAnyable | DOtherable): DArrayField;
  /**@description Sorts the elements of the list in reverse order	@example list_reverse_sort([3, 6, 1, 2])*/
  list_reverse_sort(list: DArrayable, col1?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list based on the elements selected by the index_list.	@example list_select([10, 20, 30, 40], [1, 4])*/
  list_select(valueList: DArrayable, indexList: DArrayable): DArrayField;
  /**@description list_slice with added step feature.	@example list_slice([4, 5, 6], 1, 3, 2)*/
  list_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step?: DNumericable | DOtherable): Partial<CAny>;
  /**@description Sorts the elements of the list	@example list_sort([3, 6, 1, 2])*/
  list_sort(list: DArrayable, col1?: DOtherable | DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example list_transform([1, 2, 3], x -> x + 1)*/
  list_transform(list: DArrayable, lambda: DOtherable): DArrayField;
  /**@description Counts the unique elements of a list	@example list_unique([1, 1, NULL, -3, 1, 5])*/
  list_unique(list: DArrayable): number & CNumeric;
  /**@description Create a LIST containing the argument values	@example list_value(4, 5, 6)*/
  list_value(...args: DAnyable[]): DArrayField;
  /**@description Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example list_where([10, 20, 30, 40], [true, false, false, true])*/
  list_where(valueList: DArrayable, maskList: DArrayable): DArrayField;
  /**@description Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example list_zip([1, 2], [3, 4], [5, 6])*/
  list_zip(...args: DAnyable[]): DArrayField;
  /**@description Computes the natural logarithm of x	@example ln(2)*/
  ln(x: DNumericable): number & CNumeric;
  /**@description Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example log(2, 64)*/
  log(b: DNumericable, x?: DNumericable | DOtherable): number & CNumeric;
  /**@description Computes the 10-log of x	@example log10(1000)*/
  log10(x: DNumericable): number & CNumeric;
  /**@description Computes the 2-log of x	@example log2(8)*/
  log2(x: DNumericable): number & CNumeric;
  /**@description Convert string to lower case	@example lower('Hello')*/
  lower(string: DVarcharable): string & CVarchar;
  /**@description Pads the string with the character from the left until it has count characters	@example lpad('hello', 10, '>')*/
  lpad(string: DVarcharable, count: DNumericable, character: DVarcharable): string & CVarchar;
  /**@description Removes any occurrences of any of the characters from the left side of the string	@example ltrim('>>>>test<<', '><')*/
  ltrim(string: DVarcharable, characters?: DOtherable | DVarcharable): string & CVarchar;
  /**@description The date for the given parts	@example make_date(1992, 9, 20)*/
  make_date(year: DNumericable, month: DNumericable, day: DNumericable): DDateField;
  make_date(col0: DNumericable): DDateField;
  /**@description The date for the given struct.	@example make_date({'year': 2024, 'month': 11, 'day': 14})*/
  make_date(dateStruct: DNumericable): DDateField;
  /**@description The time for the given parts	@example make_time(13, 34, 27.123456)*/
  make_time(hour: DNumericable, minute: DNumericable, seconds: DNumericable): DDateField;
  /**@description The timestamp for the given parts	@example make_timestamp(1992, 9, 20, 13, 34, 27.123456)*/
  make_timestamp(year: DNumericable, month?: DNumericable | DOtherable, day?: DNumericable | DOtherable, hour?: DNumericable | DOtherable, minute?: DNumericable | DOtherable, seconds?: DNumericable | DOtherable): DDateField;
  /**@description The timestamp for the given nanoseconds since epoch	@example make_timestamp(1732117793000000000)*/
  make_timestamp_ns(nanos: DNumericable): DDateField;
  make_timestamptz(col0: DNumericable, col1?: DNumericable | DOtherable, col2?: DNumericable | DOtherable, col3?: DNumericable | DOtherable, col4?: DNumericable | DOtherable, col5?: DNumericable | DOtherable, col6?: DOtherable | DVarcharable): DDateField;
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
  md5(value: DBlobable): string & CVarchar;
  /**@description Returns the MD5 hash of the value as a string	@example md5('123')*/
  md5(value: DVarcharable): string & CVarchar;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(value: DBlobable): number & CNumeric;
  /**@description Returns the MD5 hash of the value as an INT128	@example md5_number('123')*/
  md5_number(value: DVarcharable): number & CNumeric;
  /**@description Extract the microsecond component from a date or timestamp	@example microsecond(timestamp '2021-08-03 11:59:44.123456')*/
  microsecond(ts: DDateable): number & CNumeric;
  /**@description Extract the microsecond component from a date or timestamp	@example microsecond(timestamp '2021-08-03 11:59:44.123456')*/
  microsecond(ts: DOtherable): number & CNumeric;
  /**@description Extract the millennium component from a date or timestamp	@example millennium(timestamp '2021-08-03 11:59:44.123456')*/
  millennium(ts: DDateable): number & CNumeric;
  /**@description Extract the millennium component from a date or timestamp	@example millennium(timestamp '2021-08-03 11:59:44.123456')*/
  millennium(ts: DOtherable): number & CNumeric;
  /**@description Extract the millisecond component from a date or timestamp	@example millisecond(timestamp '2021-08-03 11:59:44.123456')*/
  millisecond(ts: DDateable): number & CNumeric;
  /**@description Extract the millisecond component from a date or timestamp	@example millisecond(timestamp '2021-08-03 11:59:44.123456')*/
  millisecond(ts: DOtherable): number & CNumeric;
  /**@description Extract the minute component from a date or timestamp	@example minute(timestamp '2021-08-03 11:59:44.123456')*/
  minute(ts: DDateable): number & CNumeric;
  /**@description Extract the minute component from a date or timestamp	@example minute(timestamp '2021-08-03 11:59:44.123456')*/
  minute(ts: DOtherable): number & CNumeric;
  /**@description The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example hamming('duck','luck')*/
  mismatches(str1: DVarcharable, str2: DVarcharable): number & CNumeric;
  mod(col0: DNumericable, col1: DNumericable): number & CNumeric;
  /**@description Extract the month component from a date or timestamp	@example month(timestamp '2021-08-03 11:59:44.123456')*/
  month(ts: DDateable): number & CNumeric;
  /**@description Extract the month component from a date or timestamp	@example month(timestamp '2021-08-03 11:59:44.123456')*/
  month(ts: DOtherable): number & CNumeric;
  /**@description The (English) name of the month	@example monthname(TIMESTAMP '1992-09-20')*/
  monthname(ts: DDateable): string & CVarchar;
  multiply(col0: DNumericable, col1: DOtherable): DOtherField;
  multiply(col0: DNumericable, col1: DNumericable): number & CNumeric;
  multiply(col0: DOtherable, col1: DNumericable): DOtherField;
  /**@description Extract the nanosecond component from a date or timestamp	@example nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789*/
  nanosecond(tsns: DDateable): number & CNumeric;
  /**@description Extract the nanosecond component from a date or timestamp	@example nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789*/
  nanosecond(tsns: DOtherable): number & CNumeric;
  netmask(col0: DOtherable): DOtherField;
  network(col0: DOtherable): DOtherField;
  /**@description Returns the next floating point value after x in the direction of y	@example nextafter(1::float, 2::float)*/
  nextafter(x: DNumericable, y: DNumericable): number & CNumeric;
  /**@description Return the following value of the sequence.	@example nextval('my_sequence_name')*/
  nextval(sequenceName: DVarcharable): number & CNumeric;
  /**@description Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example nfc_normalize('ardèch')*/
  nfc_normalize(string: DVarcharable): string & CVarchar;
  /**@description Normalizes an INTERVAL to an equivalent interval	@example normalized_interval(INTERVAL '30 days')*/
  normalized_interval(interval: DOtherable): DOtherField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_ilike_escape('A%c', 'a$%C', '$')*/
  not_ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example not_like_escape('a%c', 'a$%c', '$')*/
  not_like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  now(): DDateField;
  /**@description Number of bytes in blob.	@example octet_length('\xAA\xBB'::BLOB)*/
  octet_length(blob: DOtherable): number & CNumeric;
  /**@description Number of bytes in blob.	@example octet_length('\xAA\xBB'::BLOB)*/
  octet_length(blob: DBlobable): number & CNumeric;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  ord(str: DVarcharable): number & CNumeric;
  /**@description Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirname('path/to/file.csv', 'system')*/
  parse_dirname(string: DVarcharable, separator?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example parse_dirpath('path/to/file.csv', 'system')*/
  parse_dirpath(string: DVarcharable, separator?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example parse_filename('path/to/file.csv', true, 'forward_slash')*/
  parse_filename(string: DVarcharable, trimExtension?: DBoolable | DOtherable | DVarcharable, separator?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example parse_path('path/to/file.csv', 'system')*/
  parse_path(string: DVarcharable, separator?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns the value of pi	@example pi()*/
  pi(): number & CNumeric;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  position(haystack: DVarcharable, needle: DVarcharable): number & CNumeric;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  pow(x: DNumericable, y: DNumericable): number & CNumeric;
  /**@description Computes x to the power of y	@example pow(2, 3)*/
  power(x: DNumericable, y: DNumericable): number & CNumeric;
  prefix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Formats a string using printf syntax	@example printf('Benchmark "%s" took %d seconds', 'CSV', 42)*/
  printf(format: DVarcharable, ...args: DAnyable[]): string & CVarchar;
  /**@description Extract the quarter component from a date or timestamp	@example quarter(timestamp '2021-08-03 11:59:44.123456')*/
  quarter(ts: DDateable): number & CNumeric;
  /**@description Extract the quarter component from a date or timestamp	@example quarter(timestamp '2021-08-03 11:59:44.123456')*/
  quarter(ts: DOtherable): number & CNumeric;
  /**@description Converts degrees to radians	@example radians(90)*/
  radians(x: DNumericable): number & CNumeric;
  /**@description Returns a random number between 0 and 1	@example random()*/
  random(): number & CNumeric;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(start: DNumericable, stop?: DNumericable | DOtherable, step?: DNumericable | DOtherable): DArrayField;
  /**@description Create a list of values between start and stop - the stop parameter is exclusive	@example range(2, 5, 3)*/
  range(start: DDateable, stop: DDateable, step: DOtherable): DArrayField;
  /**@description Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example list_reduce([1, 2, 3], (x, y) -> x + y)*/
  reduce(list: DArrayable, lambda: DOtherable): Partial<CAny>;
  /**@description Escapes all potentially meaningful regexp characters in the input string	@example regexp_escape('https://duckdb.org')*/
  regexp_escape(string: DVarcharable): string & CVarchar;
  /**@description If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example regexp_extract('abc', '([a-z])(b)', 1)*/
  regexp_extract(string: DVarcharable, pattern: DVarcharable | RegExpable, group0?: DArrayable | DNumericable | DOtherable, options?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example regexp_extract_all('hello_world', '([a-z ]+)_?', 1)*/
  regexp_extract_all(string: DVarcharable, regex: DVarcharable | RegExpable, group0?: DNumericable | DOtherable, options?: DOtherable | DVarcharable): DArrayField;
  /**@description Returns true if the entire string matches the regex. A set of optional options can be set.	@example regexp_full_match('anabanana', '(an)*')*/
  regexp_full_match(string: DVarcharable, regex: DVarcharable | RegExpable, options?: DOtherable | DVarcharable): DBoolField;
  /**@description Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example regexp_matches('anabanana', '(an)*')*/
  regexp_matches(string: DVarcharable, pattern: DVarcharable | RegExpable, options?: DOtherable | DVarcharable): DBoolField;
  /**@description If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example regexp_replace('hello', '[lo]', '-')*/
  regexp_replace(string: DVarcharable, pattern: DVarcharable | RegExpable, replacement: DVarcharable, options?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  regexp_split_to_array(string: DVarcharable, separator: DVarcharable | RegExpable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DArrayable, count: DNumericable): DArrayField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DBlobable, count: DNumericable): DBlobField;
  /**@description Repeats the string count number of times	@example repeat('A', 5)*/
  repeat(string: DVarcharable, count: DNumericable): string & CVarchar;
  /**@description Replaces any occurrences of the source with target in string	@example replace('hello', 'l', '-')*/
  replace(string: DVarcharable, source: DVarcharable, target: DVarcharable): string & CVarchar;
  /**@description Reverses the string	@example reverse('hello')*/
  reverse(string: DVarcharable): string & CVarchar;
  /**@description Extract the right-most count characters	@example right('Hello🦆', 3)*/
  right(string: DVarcharable, count: DNumericable): string & CVarchar;
  /**@description Extract the right-most count grapheme clusters	@example right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)*/
  right_grapheme(string: DVarcharable, count: DNumericable): string & CVarchar;
  /**@description Rounds x to s decimal places	@example round(42.4332, 2)*/
  round(x: DNumericable, precision?: DNumericable | DOtherable): number & CNumeric;
  /**@description Create an unnamed STRUCT (tuple) containing the argument values.	@example row(i, i % 4, i / 4)*/
  row(...args: DAnyable[]): DStructField;
  row_to_json(...args: DAnyable[]): DJsonField;
  /**@description Pads the string with the character from the right until it has count characters	@example rpad('hello', 10, '<')*/
  rpad(string: DVarcharable, count: DNumericable, character: DVarcharable): string & CVarchar;
  /**@description Removes any occurrences of any of the characters from the right side of the string	@example rtrim('>>>>test<<', '><')*/
  rtrim(string: DVarcharable, characters?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Extract the second component from a date or timestamp	@example second(timestamp '2021-08-03 11:59:44.123456')*/
  second(ts: DDateable): number & CNumeric;
  /**@description Extract the second component from a date or timestamp	@example second(timestamp '2021-08-03 11:59:44.123456')*/
  second(ts: DOtherable): number & CNumeric;
  /**@description Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring	@example set_bit('0110010'::BIT, 2, 0)*/
  set_bit(bitstring: DOtherable, index: DNumericable, newValue: DNumericable): DOtherField;
  /**@description Sets the seed to be used for the random function	@example setseed(0.42)*/
  setseed(col0: DNumericable): DOtherField;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(value: DBlobable): string & CVarchar;
  /**@description Returns the SHA1 hash of the value	@example sha1('hello')*/
  sha1(value: DVarcharable): string & CVarchar;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(value: DBlobable): string & CVarchar;
  /**@description Returns the SHA256 hash of the value	@example sha256('hello')*/
  sha256(value: DVarcharable): string & CVarchar;
  /**@description Returns the sign of x as -1, 0 or 1	@example sign(-349)*/
  sign(x: DNumericable): number & CNumeric;
  /**@description Returns whether the signbit is set or not	@example signbit(-0.0)*/
  signbit(x: DNumericable): DBoolField;
  /**@description Computes the sin of x	@example sin(90)*/
  sin(x: DNumericable): number & CNumeric;
  /**@description Computes the hyperbolic sin of x	@example sinh(1)*/
  sinh(x: DNumericable): number & CNumeric;
  /**@description Returns the square root of x	@example sqrt(4)*/
  sqrt(x: DNumericable): number & CNumeric;
  /**@description Returns true if string begins with search_string	@example starts_with('abc','a')*/
  starts_with(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example stats(5)*/
  stats(expression: DAnyable): string & CVarchar;
  stem(col0: DVarcharable, col1: DVarcharable): string & CVarchar;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  str_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  str_split_regex(string: DVarcharable, separator: DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(data: DDateable, format: DVarcharable): string & CVarchar;
  /**@description Converts a date to a string according to the format string.	@example strftime(date '1992-01-01', '%a, %-d %B %Y')*/
  strftime(data: DVarcharable, format: DDateable): string & CVarchar;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_split(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Splits the string along the regex	@example string_split_regex('hello␣world; 42', ';?␣')*/
  string_split_regex(string: DVarcharable, separator: DVarcharable, col2?: DOtherable | DVarcharable): DArrayField;
  /**@description Splits the string along the separator	@example string_split('hello-world', '-')*/
  string_to_array(string: DVarcharable, separator: DVarcharable): DArrayField;
  /**@description Strips accents from string.	@example strip_accents('mühleisen')*/
  strip_accents(string: DVarcharable): string & CVarchar;
  /**@description Number of bytes in string.	@example strlen('🦆')*/
  strlen(string: DVarcharable): number & CNumeric;
  /**@description Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example instr('test test','es')*/
  strpos(haystack: DVarcharable, needle: DVarcharable): number & CNumeric;
  /**@description Converts the string text to timestamp according to the format string. Throws an error on failure. To return NULL on failure, use try_strptime.	@example strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  strptime(text: DVarcharable, format: DArrayable | DVarcharable): DDateField;
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
  substr(string: DVarcharable, start: DNumericable, length?: DNumericable | DOtherable): string & CVarchar;
  /**@description Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring('Hello', 2, 2)*/
  substring(string: DVarcharable, start: DNumericable, length?: DNumericable | DOtherable): string & CVarchar;
  /**@description Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)*/
  substring_grapheme(string: DVarcharable, start: DNumericable, length?: DNumericable | DOtherable): string & CVarchar;
  subtract(col0: DNumericable, col1?: DNumericable | DOtherable): number & CNumeric;
  subtract(col0: DDateable, col1: DNumericable | DOtherable): DDateField;
  subtract(col0: DDateable, col1: DDateable): number & CNumeric;
  subtract(col0: DOtherable, col1?: DOtherable): DOtherField;
  subtract(col0: DDateable, col1: DOtherable): DDateField;
  subtract(col0: DDateable, col1: DDateable): DOtherField;
  suffix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description Computes the tan of x	@example tan(90)*/
  tan(x: DNumericable): number & CNumeric;
  /**@description Computes the hyperbolic tan of x	@example tanh(1)*/
  tanh(x: DNumericable): number & CNumeric;
  text(col0: DNumericable, col1: DVarcharable): string & CVarchar;
  /**@description Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets	@example time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07')*/
  time_bucket(bucketWidth: DOtherable, timestamp: DDateable, origin?: DDateable | DOtherable | DVarcharable): DDateField;
  /**@description Converts a TIME WITH TIME ZONE to an integer sort key	@example timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)*/
  timetz_byte_comparable(timeTz: DDateable): number & CNumeric;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DDateable): number & CNumeric;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DOtherable, col1: DDateable): DDateField;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DOtherable): number & CNumeric;
  /**@description Extract the timezone component from a date or timestamp	@example timezone(timestamp '2021-08-03 11:59:44.123456')*/
  timezone(ts: DVarcharable, col1: DDateable): DDateField;
  /**@description Extract the timezone_hour component from a date or timestamp	@example timezone_hour(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_hour(ts: DDateable): number & CNumeric;
  /**@description Extract the timezone_hour component from a date or timestamp	@example timezone_hour(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_hour(ts: DOtherable): number & CNumeric;
  /**@description Extract the timezone_minute component from a date or timestamp	@example timezone_minute(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_minute(ts: DDateable): number & CNumeric;
  /**@description Extract the timezone_minute component from a date or timestamp	@example timezone_minute(timestamp '2021-08-03 11:59:44.123456')*/
  timezone_minute(ts: DOtherable): number & CNumeric;
  /**@description Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example to_base(42, 16)*/
  to_base(number: DNumericable, radix: DNumericable, minLength?: DNumericable | DOtherable): string & CVarchar;
  /**@description Convert a blob to a base64 encoded string	@example base64('A'::blob)*/
  to_base64(blob: DBlobable): string & CVarchar;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DNumericable): string & CVarchar;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DVarcharable): string & CVarchar;
  /**@description Converts the value to binary representation	@example bin(42)*/
  to_binary(value: DOtherable): string & CVarchar;
  /**@description Construct a century interval	@example to_centuries(5)*/
  to_centuries(integer: DNumericable): DOtherField;
  /**@description Construct a day interval	@example to_days(5)*/
  to_days(integer: DNumericable): DOtherField;
  /**@description Construct a decade interval	@example to_decades(5)*/
  to_decades(integer: DNumericable): DOtherField;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DNumericable): string & CVarchar;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DBlobable): string & CVarchar;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DVarcharable): string & CVarchar;
  /**@description Converts the value to hexadecimal representation	@example hex(42)*/
  to_hex(value: DOtherable): string & CVarchar;
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
  to_timestamp(sec: DNumericable): DDateField;
  /**@description Construct a week interval	@example to_weeks(5)*/
  to_weeks(integer: DNumericable): DOtherField;
  /**@description Construct a year interval	@example to_years(5)*/
  to_years(integer: DNumericable): DOtherField;
  today(): DDateField;
  /**@description Returns the current timestamp	@example get_current_timestamp()*/
  transaction_timestamp(): DDateField;
  /**@description Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example translate('12345', '143', 'ax')*/
  translate(string: DVarcharable, from: DVarcharable, to: DVarcharable): string & CVarchar;
  /**@description Removes any occurrences of any of the characters from either side of the string	@example trim('>>>>test<<', '><')*/
  trim(string: DVarcharable, characters?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Truncates the number	@example trunc(17.4)*/
  trunc(x: DNumericable): number & CNumeric;
  /**@description Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')*/
  try_strptime(text: DVarcharable, format: DArrayable | DVarcharable): DDateField;
  /**@description Returns the current transaction’s ID (a BIGINT). It will assign a new one if the current transaction does not have one already	@example txid_current()*/
  txid_current(): number & CNumeric;
  /**@description Returns the name of the data type of the result of the expression	@example typeof('abc')*/
  typeof(expression: DAnyable): string & CVarchar;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  ucase(string: DVarcharable): string & CVarchar;
  /**@description Converts a value from binary representation to a blob	@example unbin('0110')*/
  unbin(value: DVarcharable): DBlobField;
  /**@description Converts a value from hexadecimal representation to a blob	@example unhex('2A')*/
  unhex(value: DVarcharable): DBlobField;
  /**@description Returns the unicode codepoint of the first character of the string	@example unicode('ü')*/
  unicode(str: DVarcharable): number & CNumeric;
  /**@description Extract the value with the named tags from the union. NULL if the tag is not currently selected	@example union_extract(s, 'k')*/
  union_extract(union: DOtherable, tag: DVarcharable): Partial<CAny>;
  /**@description Retrieve the currently selected tag of the union as an ENUM	@example union_tag(union_value(k := 'foo'))*/
  union_tag(union: DOtherable): Partial<CAny>;
  /**@description Create a single member UNION containing the argument value. The tag of the value will be the bound variable name	@example union_value(k := 'hello')*/
  union_value(...args: DAnyable[]): DOtherField;
  /**@description Identical to list_value, but generated as part of unpivot for better error messages	@example unpivot_list(4, 5, 6)*/
  unpivot_list(...args: DAnyable[]): DArrayField;
  /**@description Convert string to upper case.	@example upper('Hello')*/
  upper(string: DVarcharable): string & CVarchar;
  /**@description Unescapes the URL encoded input.	@example url_decode('this%20string%20is%2BFencoded')*/
  url_decode(input: DVarcharable): string & CVarchar;
  /**@description Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example url_encode('this string has/ special+ characters>')*/
  url_encode(input: DVarcharable): string & CVarchar;
  /**@description Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example uuid()*/
  uuid(): DOtherField;
  /**@description Returns the VectorType of a given column	@example vector_type(col)*/
  vector_type(col: DAnyable): string & CVarchar;
  /**@description Returns the currently active version of DuckDB in this format: v0.3.2		@example version()*/
  version(): string & CVarchar;
  /**@description Extract the week component from a date or timestamp	@example week(timestamp '2021-08-03 11:59:44.123456')*/
  week(ts: DDateable): number & CNumeric;
  /**@description Extract the week component from a date or timestamp	@example week(timestamp '2021-08-03 11:59:44.123456')*/
  week(ts: DOtherable): number & CNumeric;
  /**@description Extract the weekday component from a date or timestamp	@example weekday(timestamp '2021-08-03 11:59:44.123456')*/
  weekday(ts: DDateable): number & CNumeric;
  /**@description Extract the weekday component from a date or timestamp	@example weekday(timestamp '2021-08-03 11:59:44.123456')*/
  weekday(ts: DOtherable): number & CNumeric;
  /**@description Extract the weekofyear component from a date or timestamp	@example weekofyear(timestamp '2021-08-03 11:59:44.123456')*/
  weekofyear(ts: DDateable): number & CNumeric;
  /**@description Extract the weekofyear component from a date or timestamp	@example weekofyear(timestamp '2021-08-03 11:59:44.123456')*/
  weekofyear(ts: DOtherable): number & CNumeric;
  /**@description Writes to the logger	@example write_log('Hello')*/
  write_log(string: DVarcharable, ...args: DAnyable[]): Partial<CAny>;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(left: DNumericable, right: DNumericable): number & CNumeric;
  /**@description Bitwise XOR	@example xor(17, 5)*/
  xor(left: DOtherable, right: DOtherable): DOtherField;
  /**@description Extract the year component from a date or timestamp	@example year(timestamp '2021-08-03 11:59:44.123456')*/
  year(ts: DDateable): number & CNumeric;
  /**@description Extract the year component from a date or timestamp	@example year(timestamp '2021-08-03 11:59:44.123456')*/
  year(ts: DOtherable): number & CNumeric;
  /**@description Extract the yearweek component from a date or timestamp	@example yearweek(timestamp '2021-08-03 11:59:44.123456')*/
  yearweek(ts: DDateable): number & CNumeric;
  /**@description Extract the yearweek component from a date or timestamp	@example yearweek(timestamp '2021-08-03 11:59:44.123456')*/
  yearweek(ts: DOtherable): number & CNumeric;
}

export type DGlobalComp = CGlobal;

interface CAggregate {
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DAnyable): Partial<CAny>;
  /**@description Returns the first non-null value from arg. This function is affected by ordering.*/
  any_value(arg: DNumericable): number & CNumeric;
  /**@description Computes the approximate count of distinct elements using HyperLogLog.	@example approx_count_distinct(A)*/
  approx_count_distinct(any: DAnyable): number & CNumeric;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DDateable, pos: DNumericable): DDateField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DDateable | DNumericable, pos: DArrayable): DArrayField;
  /**@description Computes the approximate quantile using T-Digest.	@example approx_quantile(x, 0.5)*/
  approx_quantile(x: DNumericable, pos: DNumericable): number & CNumeric;
  /**@description Finds the k approximately most occurring values in the data set	@example approx_top_k(x, 5)*/
  approx_top_k(val: DAnyable, k: DNumericable): DArrayField;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DAnyable): Partial<CAny>;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  arbitrary(arg: DNumericable): number & CNumeric;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  arg_max(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): string & CVarchar;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the maximum val. Calculates the arg expression at that row.	@example arg_max_null(A,B)*/
  arg_max_null(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): string & CVarchar;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  arg_min(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): string & CVarchar;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the minimum val. Calculates the arg expression at that row.	@example arg_min_null(A,B)*/
  arg_min_null(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): string & CVarchar;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  argmax(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): string & CVarchar;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  argmin(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): string & CVarchar;
  /**@description Returns a LIST containing all the values of a column.	@example list(A)*/
  array_agg(arg: DAnyable): DArrayField;
  /**@description Calculates the average value for all tuples in x.	@example SUM(x) / COUNT(*)*/
  avg(x: DNumericable): number & CNumeric;
  /**@description Returns the bitwise AND of all bits in a given expression.	@example bit_and(A)*/
  bit_and(arg: DOtherable): DOtherField;
  /**@description Returns the bitwise AND of all bits in a given expression.	@example bit_and(A)*/
  bit_and(arg: DNumericable): number & CNumeric;
  /**@description Returns the bitwise OR of all bits in a given expression.	@example bit_or(A)*/
  bit_or(arg: DOtherable): DOtherField;
  /**@description Returns the bitwise OR of all bits in a given expression.	@example bit_or(A)*/
  bit_or(arg: DNumericable): number & CNumeric;
  /**@description Returns the bitwise XOR of all bits in a given expression.	@example bit_xor(A)*/
  bit_xor(arg: DOtherable): DOtherField;
  /**@description Returns the bitwise XOR of all bits in a given expression.	@example bit_xor(A)*/
  bit_xor(arg: DNumericable): number & CNumeric;
  /**@description Returns a bitstring with bits set for each distinct value.	@example bitstring_agg(A)*/
  bitstring_agg(arg: DNumericable, col1?: DNumericable | DOtherable, col2?: DNumericable | DOtherable): DOtherField;
  /**@description Returns TRUE if every input value is TRUE, otherwise FALSE.	@example bool_and(A)*/
  bool_and(arg: DBoolable): DBoolField;
  /**@description Returns TRUE if any input value is TRUE, otherwise FALSE.	@example bool_or(A)*/
  bool_or(arg: DBoolable): DBoolField;
  /**@description Returns the correlation coefficient for non-null pairs in a group.	@example COVAR_POP(y, x) / (STDDEV_POP(x) * STDDEV_POP(y))*/
  corr(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Returns the number of non-null values in arg.	@example count(A)*/
  count(arg?: DAnyable | DOtherable): number & CNumeric;
  /**@description Counts the total number of TRUE values for a boolean column	@example count_if(A)*/
  count_if(arg: DBoolable): number & CNumeric;
  count_star(): number & CNumeric;
  /**@description Counts the total number of TRUE values for a boolean column	@example count_if(A)*/
  countif(arg: DBoolable): number & CNumeric;
  /**@description Returns the population covariance of input values.	@example (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)*/
  covar_pop(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Returns the sample covariance for non-null pairs in a group.	@example (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / (COUNT(*) - 1)*/
  covar_samp(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Returns the log-2 entropy of count input-values.*/
  entropy(x: DAnyable): number & CNumeric;
  /**@description Calculates the average using a more accurate floating point summation (Kahan Sum)	@example favg(A)*/
  favg(x: DNumericable): number & CNumeric;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  first(arg: DAnyable): Partial<CAny>;
  /**@description Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example first(A)*/
  first(arg: DNumericable): number & CNumeric;
  /**@description Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example kahan_sum(A)*/
  fsum(arg: DNumericable): number & CNumeric;
  /**@description Concatenates the column string values with an optional separator.	@example string_agg(A, '-')*/
  group_concat(str: DAnyable, arg?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns a LIST of STRUCTs with the fields bucket and count.	@example histogram(A)*/
  histogram(arg: DAnyable, col1?: DArrayable | DOtherable): DMapField;
  /**@description Returns a LIST of STRUCTs with the fields bucket and count matching the buckets exactly.	@example histogram_exact(A, [0, 1, 2])*/
  histogram_exact(arg: DAnyable, bins: DArrayable): DMapField;
  /**@description Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example kahan_sum(A)*/
  kahan_sum(arg: DNumericable): number & CNumeric;
  /**@description Returns the excess kurtosis (Fisher’s definition) of all input values, with a bias correction according to the sample size*/
  kurtosis(x: DNumericable): number & CNumeric;
  /**@description Returns the excess kurtosis (Fisher’s definition) of all input values, without bias correction*/
  kurtosis_pop(x: DNumericable): number & CNumeric;
  /**@description Returns the last value of a column. This function is affected by ordering.	@example last(A)*/
  last(arg: DAnyable): Partial<CAny>;
  /**@description Returns the last value of a column. This function is affected by ordering.	@example last(A)*/
  last(arg: DNumericable): number & CNumeric;
  /**@description Returns a LIST containing all the values of a column.	@example list(A)*/
  list(arg: DAnyable): DArrayField;
  /**@description Concatenates the column string values with an optional separator.	@example string_agg(A, '-')*/
  listagg(str: DAnyable, arg?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example mad(x)*/
  mad(x: DDateable): DOtherField;
  /**@description Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example mad(x)*/
  mad(x: DNumericable): number & CNumeric;
  /**@description Returns the maximum value present in arg.	@example max(A)*/
  max(arg: DAnyable): Partial<CAny>;
  /**@description Returns the maximum value present in arg.	@example max(A)*/
  max(arg: DAnyable, col1: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example arg_max(A,B)*/
  max_by(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): string & CVarchar;
  /**@description Calculates the average value for all tuples in x.	@example SUM(x) / COUNT(*)*/
  mean(x: DNumericable): number & CNumeric;
  /**@description Returns the middle value of the set. NULL values are ignored. For even value counts, quantitative values are averaged and ordinal values return the lower value.	@example median(x)*/
  median(x: DAnyable): Partial<CAny>;
  /**@description Returns the minimum value present in arg.	@example min(A)*/
  min(arg: DAnyable): Partial<CAny>;
  /**@description Returns the minimum value present in arg.	@example min(A)*/
  min(arg: DAnyable, col1: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DDateable, val: DBlobable | DDateable | DNumericable | DVarcharable): DDateField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DAnyable, val: DAnyable | DBlobable | DDateable | DNumericable | DVarcharable): Partial<CAny>;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DNumericable, val: DBlobable | DDateable | DNumericable | DVarcharable): number & CNumeric;
  /**@description Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example arg_min(A,B)*/
  min_by(arg: DBlobable | DVarcharable, val: DBlobable | DDateable | DNumericable | DVarcharable): string & CVarchar;
  /**@description Returns the most frequent value for the values within x. NULL values are ignored.*/
  mode(x: DAnyable): Partial<CAny>;
  /**@description Calculates the product of all tuples in arg.	@example product(A)*/
  product(arg: DNumericable): number & CNumeric;
  /**@description Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example quantile_disc(x, 0.5)*/
  quantile(x: DAnyable, pos?: DArrayable | DNumericable | DOtherable): Partial<CAny>;
  /**@description Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example quantile_cont(x, 0.5)*/
  quantile_cont(x: DDateable, pos: DArrayable | DNumericable): DDateField;
  /**@description Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example quantile_cont(x, 0.5)*/
  quantile_cont(x: DNumericable, pos: DArrayable | DNumericable): number & CNumeric;
  /**@description Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example quantile_disc(x, 0.5)*/
  quantile_disc(x: DAnyable, pos?: DArrayable | DNumericable | DOtherable): Partial<CAny>;
  /**@description Returns the average of the independent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.*/
  regr_avgx(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Returns the average of the dependent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.*/
  regr_avgy(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Returns the number of non-null number pairs in a group.	@example (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)*/
  regr_count(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Returns the intercept of the univariate linear regression line for non-null pairs in a group.	@example AVG(y)-REGR_SLOPE(y,x)*AVG(x)*/
  regr_intercept(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Returns the coefficient of determination for non-null pairs in a group.*/
  regr_r2(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Returns the slope of the linear regression line for non-null pairs in a group.	@example COVAR_POP(x,y) / VAR_POP(x)*/
  regr_slope(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@example REGR_COUNT(y, x) * VAR_POP(x)*/
  regr_sxx(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Returns the population covariance of input values	@example REGR_COUNT(y, x) * COVAR_POP(y, x)*/
  regr_sxy(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@example REGR_COUNT(y, x) * VAR_POP(y)*/
  regr_syy(y: DNumericable, x: DNumericable): number & CNumeric;
  /**@description Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example reservoir_quantile(A,0.5,1024)*/
  reservoir_quantile(x: DNumericable, quantile: DArrayable, sampleSize?: DNumericable | DOtherable): DArrayField;
  /**@description Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example reservoir_quantile(A,0.5,1024)*/
  reservoir_quantile(x: DNumericable, quantile: DNumericable, sampleSize?: DNumericable | DOtherable): number & CNumeric;
  /**@description Returns the standard error of the mean*/
  sem(x: DNumericable): number & CNumeric;
  /**@description Returns the skewness of all input values.	@example skewness(A)*/
  skewness(x: DNumericable): number & CNumeric;
  /**@description Returns the sample standard deviation	@example sqrt(var_samp(x))*/
  stddev(x: DNumericable): number & CNumeric;
  /**@description Returns the population standard deviation.	@example sqrt(var_pop(x))*/
  stddev_pop(x: DNumericable): number & CNumeric;
  /**@description Returns the sample standard deviation	@example sqrt(var_samp(x))*/
  stddev_samp(x: DNumericable): number & CNumeric;
  /**@description Concatenates the column string values with an optional separator.	@example string_agg(A, '-')*/
  string_agg(str: DAnyable, arg?: DOtherable | DVarcharable): string & CVarchar;
  /**@description Calculates the sum value for all tuples in arg.	@example sum(A)*/
  sum(arg: DBoolable | DNumericable): number & CNumeric;
  /**@description Internal only. Calculates the sum value for all tuples in arg without overflow checks.	@example sum_no_overflow(A)*/
  sum_no_overflow(arg: DNumericable): number & CNumeric;
  /**@description Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example kahan_sum(A)*/
  sumkahan(arg: DNumericable): number & CNumeric;
  /**@description Returns the population variance.*/
  var_pop(x: DNumericable): number & CNumeric;
  /**@description Returns the sample variance of all input values.	@example (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)*/
  var_samp(x: DNumericable): number & CNumeric;
  /**@description Returns the sample variance of all input values.	@example (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)*/
  variance(x: DNumericable): number & CNumeric;
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
  /**@description The current time zone*/
  TimeZone: string;
  /**@description Attempt to decode/encode geometry data in/as GeoParquet files if the spatial extension is present.*/
  enable_geoparquet_conversion: boolean;
  /**@description The current calendar*/
  Calendar: string;
  /**@description Cache Parquet metadata - useful when reading the same files multiple times*/
  parquet_metadata_cache: boolean;
  /**@description Use the prefetching mechanism for all types of parquet files*/
  prefetch_all_parquet_files: boolean;
  /**@description Disable the prefetching mechanism in Parquet*/
  disable_parquet_prefetching: boolean;
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
