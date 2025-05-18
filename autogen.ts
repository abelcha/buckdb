export type DBOOLEAN_NATIVE = "Bool" | "Boolean" | "Logical";
export type DCOMPOSITE_NATIVE = "List" | "Map" | "Row" | "Struct" | "Union";
export type DDATETIME_NATIVE = "Date" | "Datetime" | "Interval" | "Time" | "Timestamp" | "Timestamptz" | "Timestamp_ms" | "Timestamp_ns" | "Timestamp_s" | "Timestamp_us" | "Timetz";
export type DNUMERIC_NATIVE = "Bigint" | "Dec" | "Decimal" | "Double" | "Float" | "Float4" | "Float8" | "Hugeint" | "Int" | "Int1" | "Int128" | "Int16" | "Int2" | "Int32" | "Int4" | "Int64" | "Int8" | "Integer" | "Integral" | "Long" | "Numeric" | "Oid" | "Real" | "Short" | "Signed" | "Smallint" | "Tinyint" | "Ubigint" | "Uhugeint" | "Uint128" | "Uint16" | "Uint32" | "Uint64" | "Uint8" | "Uinteger" | "Usmallint" | "Utinyint";
export type DSTRING_NATIVE = "Bpchar" | "Char" | "Nvarchar" | "String" | "Text" | "Varchar" | "JSON";
export type DANY_NATIVE = "Binary" | "Bit" | "Bitstring" | "Blob" | "Bytea" | "Enum" | "Guid" | "Null" | "Uuid" | "Varbinary" | "Varint";
export type DAnyable = any | DAnyField;
export type DVarcharable = string | DVarcharField;
export type RegExpable = RegExp | string;
export type DBoolable = boolean | DBoolField;
export type DDateable = Date | DDateField;
export type DArrayable = any[] | DArrayField;
export type DStructable = Record<string, any> | DStructField;
export type DNumericable = number | DNumericField;
export type DJsonable = Record<string, any> | DJsonField;
export declare const sId: unique symbol;
export declare const sComptype: unique symbol;
export declare const sAnti: unique symbol;
export declare const sInferred: unique symbol;

export interface DVarcharField extends DAnyField {
  [sInferred]: string;
  [sComptype]: DVarcharComp;
  /**@example: Glob(val, matcher)	@external: Glob(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Glob(matcher: DAnyable): DBoolField;
  /**@example: Ilike(val, matcher)	@external: Ilike(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Ilike(matcher: DAnyable): DBoolField;
  /**@example: In(val, matcher)	@external: In(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  In(matcher: DAnyable): DBoolField;
  /**@example: Like(val, matcher)	@external: Like(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Like(matcher: DAnyable): DBoolField;
  /**@example: SimilarTo(val, matcher)	@external: SimilarTo(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  SimilarTo(matcher: DAnyable): DBoolField;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  array_extract(index: DNumericable): DVarcharField;
  /**@description: Returns an integer that represents the Unicode code point of the first character of the string	@example: ascii('Ω')	@external: ascii(string:VARCHAR) -> INTEGER*/
  ascii(): DNumericField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:VARCHAR) -> VARCHAR*/
  bin(): DVarcharField;
  /**@external: bit_length(col0:VARCHAR) -> BIGINT*/
  bit_length(): DNumericField;
  /**@description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@external: bitstring(bitstring:VARCHAR, length:INTEGER) -> BIT*/
  bitstring(length: DNumericable): DAnyField;
  /**@description: Concatenate strings together separated by the specified separator.	@example: concat_ws(', ', 'Banana', 'Apple', 'Melon')	@external: concat_ws(separator:VARCHAR, string:ANY) -> VARCHAR*/
  concat_ws(string: DAnyable, ...vargs: DAnyable[]): DVarcharField;
  /**@description: Returns true if search_string is found within string.	@example: contains('abc', 'a')	@external: contains(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  contains(searchString: DVarcharable): DBoolField;
  /**@description: Returns the current value of the configuration setting	@example: current_setting('access_mode')	@external: current_setting(settingName:VARCHAR) -> ANY*/
  current_setting(): DAnyField;
  /**@description: Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example: currval('my_sequence_name')	@external: currval(sequenceName:VARCHAR) -> BIGINT*/
  currval(): DNumericField;
  /**@description: Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example: damerau_levenshtein('hello', 'world')	@external: damerau_levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  damerau_levenshtein(str2: DVarcharable): DNumericField;
  /**@description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: date_diff(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP, enddate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP) -> BIGINT*/
  date_diff(startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: date_part(ts:VARCHAR, col1:TIME | TIMESTAMP | DATE | INTERVAL | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_part(col1: DDateable | DAnyable): DNumericField;
  /**@description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: date_sub(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP, enddate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP) -> BIGINT*/
  date_sub(startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: date_trunc(part:VARCHAR, timestamp:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIMESTAMP*/
  date_trunc(timestamp: DDateable): DDateField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: date_trunc(part:VARCHAR, timestamp:INTERVAL) -> INTERVAL*/
  date_trunc(timestamp: DAnyable): DAnyField;
  /**@description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: datediff(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | TIMESTAMP | TIME | DATE, enddate:TIMESTAMP WITH TIME ZONE | TIMESTAMP | TIME | DATE) -> BIGINT*/
  datediff(startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: datepart(ts:VARCHAR, col1:INTERVAL | DATE | TIME | TIMESTAMP | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datepart(col1: DAnyable | DDateable): DNumericField;
  /**@description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: datesub(part:VARCHAR, startdate:TIME | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE, enddate:TIME | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE) -> BIGINT*/
  datesub(startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: datetrunc(part:VARCHAR, timestamp:TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE) -> TIMESTAMP WITH TIME ZONE*/
  datetrunc(timestamp: DDateable): DDateField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: datetrunc(part:VARCHAR, timestamp:INTERVAL) -> INTERVAL*/
  datetrunc(timestamp: DAnyable): DAnyField;
  /**@description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@external: editdist3(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  editdist3(str2: DVarcharable): DNumericField;
  /**@description: Convert varchar to blob. Converts utf-8 characters into literal encoding	@example: encode('my_string_with_ü')	@external: encode(string:VARCHAR) -> BLOB*/
  encode(): DAnyField;
  /**@external: ends_with(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  ends_with(col1: DVarcharable): DBoolField;
  /**@description: Throws the given error message	@example: error('access_mode')	@external: error(message:VARCHAR) -> "NULL"*/
  error(): DAnyField;
  /**@description: Formats a string using fmt syntax	@example: format('Benchmark "{}" took {} seconds', 'CSV', 42)	@external: format(format:VARCHAR) -> VARCHAR*/
  format(...vargs: DAnyable[]): DVarcharField;
  /**@description: Convert a base64 encoded string to a character string	@example: from_base64('QQ==')	@external: from_base64(string:VARCHAR) -> BLOB*/
  from_base64(): DAnyField;
  /**@description: Converts a value from binary representation to a blob	@example: unbin('0110')	@external: from_binary(value:VARCHAR) -> BLOB*/
  from_binary(): DAnyField;
  /**@description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@external: from_hex(value:VARCHAR) -> BLOB*/
  from_hex(): DAnyField;
  /**@external: from_json(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json(col1: DVarcharable): DAnyField;
  /**@external: from_json_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json_strict(col1: DVarcharable): DAnyField;
  /**@external: getvariable(col0:VARCHAR) -> ANY*/
  getvariable(): DAnyField;
  /**@external: h3_are_neighbor_cells(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  h3_are_neighbor_cells(col1: DVarcharable): DBoolField;
  /**@external: h3_cell_area(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col1: DVarcharable): DNumericField;
  /**@external: h3_cell_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_cell_to_boundary_wkt(): DVarcharField;
  /**@external: h3_cell_to_center_child(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_center_child(col1: DNumericable): DVarcharField;
  /**@external: h3_cell_to_child_pos(col0:VARCHAR, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_children(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_cell_to_children(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_cell_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lat(): DNumericField;
  /**@external: h3_cell_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_cell_to_latlng(): DArrayField<DNumericField>;
  /**@external: h3_cell_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lng(): DNumericField;
  /**@external: h3_cell_to_local_ij(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_local_ij(col1: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_cell_to_parent(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_parent(col1: DNumericable): DVarcharField;
  /**@external: h3_cell_to_vertex(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_vertex(col1: DNumericable): DVarcharField;
  /**@external: h3_cell_to_vertexes(col0:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_vertexes(): DArrayField<DVarcharField>;
  /**@external: h3_cells_to_directed_edge(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  h3_cells_to_directed_edge(col1: DVarcharable): DVarcharField;
  /**@external: h3_directed_edge_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(): DVarcharField;
  /**@external: h3_directed_edge_to_cells(col0:VARCHAR) -> VARCHAR[]*/
  h3_directed_edge_to_cells(): DArrayField<DVarcharField>;
  /**@external: h3_edge_length(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col1: DVarcharable): DNumericField;
  /**@external: h3_get_base_cell_number(col0:VARCHAR) -> INTEGER*/
  h3_get_base_cell_number(): DNumericField;
  /**@external: h3_get_directed_edge_destination(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_destination(): DVarcharField;
  /**@external: h3_get_directed_edge_origin(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_origin(): DVarcharField;
  /**@external: h3_get_icosahedron_faces(col0:VARCHAR) -> INTEGER[]*/
  h3_get_icosahedron_faces(): DArrayField<DNumericField>;
  /**@external: h3_get_resolution(col0:VARCHAR) -> INTEGER*/
  h3_get_resolution(): DNumericField;
  /**@external: h3_grid_disk(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_grid_disk_distances(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_safe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_safe(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_unsafe(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk_unsafe(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_grid_distance(col0:VARCHAR, col1:VARCHAR) -> BIGINT*/
  h3_grid_distance(col1: DVarcharable): DNumericField;
  /**@external: h3_grid_path_cells(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_grid_path_cells(col1: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_grid_ring_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_ring_unsafe(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_is_pentagon(col0:VARCHAR) -> BOOLEAN*/
  h3_is_pentagon(): DBoolField;
  /**@external: h3_is_res_class_iii(col0:VARCHAR) -> BOOLEAN*/
  h3_is_res_class_iii(): DBoolField;
  /**@external: h3_is_valid_cell(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_cell(): DBoolField;
  /**@external: h3_is_valid_directed_edge(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_directed_edge(): DBoolField;
  /**@external: h3_is_valid_vertex(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_vertex(): DBoolField;
  /**@external: h3_local_ij_to_cell(col0:VARCHAR, col1:INTEGER, col2:INTEGER) -> VARCHAR*/
  h3_local_ij_to_cell(col1: DNumericable, col2: DNumericable): DVarcharField;
  /**@external: h3_origin_to_directed_edges(col0:VARCHAR) -> VARCHAR[]*/
  h3_origin_to_directed_edges(): DArrayField<DVarcharField>;
  /**@external: h3_polygon_wkt_to_cells(col0:VARCHAR, col1:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_polygon_wkt_to_cells_experimental(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells_experimental(col1: DVarcharable, col2: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_polygon_wkt_to_cells_experimental_string(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_experimental_string(col1: DVarcharable, col2: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_polygon_wkt_to_cells_string(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_string(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_string_to_h3(col0:VARCHAR) -> UBIGINT*/
  h3_string_to_h3(): DNumericField;
  /**@external: h3_vertex_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lat(): DNumericField;
  /**@external: h3_vertex_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_vertex_to_latlng(): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lng(): DNumericField;
  /**@description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@external: hamming(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  hamming(str2: DVarcharable): DNumericField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:VARCHAR) -> VARCHAR*/
  hex(): DVarcharField;
  /**@external: html_escape(col0:VARCHAR, col1: | BOOLEAN) -> VARCHAR*/
  html_escape(col1?: DAnyable | DBoolable): DVarcharField;
  /**@external: html_unescape(col0:VARCHAR) -> VARCHAR*/
  html_unescape(): DVarcharField;
  /**@external: icu_sort_key(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  icu_sort_key(col1: DVarcharable): DVarcharField;
  /**@description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: ilike_escape('A%c', 'a$%C', '$')	@external: ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns whether or not the database/schema are in the search path	@example: in_search_path('memory', 'main')	@external: in_search_path(databaseName:VARCHAR, schemaName:VARCHAR) -> BOOLEAN*/
  in_search_path(schemaName: DVarcharable): DBoolField;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: instr(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  instr(needle: DVarcharable): DNumericField;
  /**@description: The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaccard('duck','luck')	@external: jaccard(str1:VARCHAR, str2:VARCHAR) -> DOUBLE*/
  jaccard(str2: DVarcharable): DNumericField;
  /**@description: The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_similarity('duck', 'duckdb', 0.5)	@external: jaro_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_similarity(str2: DVarcharable, scoreCutoff?: DNumericable | DAnyable): DNumericField;
  /**@description: The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_winkler_similarity('duck', 'duckdb', 0.5)	@external: jaro_winkler_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_winkler_similarity(str2: DVarcharable, scoreCutoff?: DNumericable | DAnyable): DNumericField;
  /**@external: json_array_length(col0:VARCHAR, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col1: DArrayable): DArrayField<DNumericField>;
  /**@external: json_array_length(col0:VARCHAR, col1: | VARCHAR) -> UBIGINT*/
  json_array_length(col1?: DAnyable | DVarcharable): DNumericField;
  /**@external: json_contains(col0:VARCHAR, col1:VARCHAR | JSON) -> BOOLEAN*/
  json_contains(col1: DVarcharable | DJsonable): DBoolField;
  /**@external: json_exists(col0:VARCHAR, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col1: DArrayable): DArrayField<DBoolField>;
  /**@external: json_exists(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col1: DVarcharable): DBoolField;
  /**@external: json_extract(col0:VARCHAR, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract(col1: DNumericable | DVarcharable): DJsonField;
  /**@external: json_extract(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path(col0:VARCHAR, col1:VARCHAR | BIGINT) -> JSON*/
  json_extract_path(col1: DVarcharable | DNumericable): DJsonField;
  /**@external: json_extract_path(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path_text(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_path_text(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col1: DNumericable | DVarcharable): DVarcharField;
  /**@external: json_extract_string(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_string(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_string(col1: DNumericable | DVarcharable): DVarcharField;
  /**@external: json_keys(col0:VARCHAR, col1: | VARCHAR | VARCHAR[]) -> VARCHAR[]*/
  json_keys(col1?: DAnyable | DVarcharable | DArrayable): DArrayField<DVarcharField>;
  /**@external: json_serialize_plan(col0:VARCHAR, col1:BOOLEAN | , col2:BOOLEAN | , col3:BOOLEAN | , col4:BOOLEAN | ) -> JSON*/
  json_serialize_plan(col1?: DBoolable | DAnyable, col2?: DBoolable | DAnyable, col3?: DBoolable | DAnyable, col4?: DBoolable | DAnyable): DJsonField;
  /**@external: json_serialize_sql(col0:VARCHAR, col1:BOOLEAN | , col2: | BOOLEAN, col3: | BOOLEAN) -> JSON*/
  json_serialize_sql(col1?: DBoolable | DAnyable, col2?: DAnyable | DBoolable, col3?: DAnyable | DBoolable): DJsonField;
  /**@external: json_structure(col0:VARCHAR) -> JSON*/
  json_structure(): DJsonField;
  /**@external: json_transform(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform(col1: DVarcharable): DAnyField;
  /**@external: json_transform_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform_strict(col1: DVarcharable): DAnyField;
  /**@external: json_type(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_type(col0:VARCHAR, col1: | VARCHAR) -> VARCHAR*/
  json_type(col1?: DAnyable | DVarcharable): DVarcharField;
  /**@external: json_valid(col0:VARCHAR) -> BOOLEAN*/
  json_valid(): DBoolField;
  /**@external: json_value(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_value(col0:VARCHAR, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_value(col1: DVarcharable | DNumericable): DVarcharField;
  /**@description: Convert string to lower case	@example: lower('Hello')	@external: lcase(string:VARCHAR) -> VARCHAR*/
  lcase(): DVarcharField;
  /**@description: Extract the left-most count characters	@example: left('Hello🦆', 2)	@external: left(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left(count: DNumericable): DVarcharField;
  /**@description: Extract the left-most count grapheme clusters	@example: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@external: left_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left_grapheme(count: DNumericable): DVarcharField;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: len(string:VARCHAR) -> BIGINT*/
  len(): DNumericField;
  /**@description: Number of grapheme clusters in string.	@example: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')	@external: length_grapheme(string:VARCHAR) -> BIGINT*/
  length_grapheme(): DNumericField;
  /**@description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@external: levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  levenshtein(str2: DVarcharable): DNumericField;
  /**@description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: like_escape('a%c', 'a$%c', '$')	@external: like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_element(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_element(index: DNumericable): DVarcharField;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_extract(index: DNumericable): DVarcharField;
  /**@description: Convert string to lower case	@example: lower('Hello')	@external: lower(string:VARCHAR) -> VARCHAR*/
  lower(): DVarcharField;
  /**@description: Pads the string with the character from the left until it has count characters	@example: lpad('hello', 10, '>')	@external: lpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  lpad(count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description: Removes any occurrences of any of the characters from the left side of the string	@example: ltrim('>>>>test<<', '><')	@external: ltrim(string:VARCHAR, characters: | VARCHAR) -> VARCHAR*/
  ltrim(characters?: DAnyable | DVarcharable): DVarcharField;
  /**@description: Returns the MD5 hash of the value as a string	@example: md5('123')	@external: md5(value:VARCHAR) -> VARCHAR*/
  md5(): DVarcharField;
  /**@description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@external: md5_number(value:VARCHAR) -> HUGEINT*/
  md5_number(): DNumericField;
  /**@description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@external: mismatches(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  mismatches(str2: DVarcharable): DNumericField;
  /**@description: Return the following value of the sequence.	@example: nextval('my_sequence_name')	@external: nextval(sequenceName:VARCHAR) -> BIGINT*/
  nextval(): DNumericField;
  /**@description: Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example: nfc_normalize('ardèch')	@external: nfc_normalize(string:VARCHAR) -> VARCHAR*/
  nfc_normalize(): DVarcharField;
  /**@description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_ilike_escape('A%c', 'a$%C', '$')	@external: not_ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_like_escape('a%c', 'a$%c', '$')	@external: not_like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@external: ord(str:VARCHAR) -> INTEGER*/
  ord(): DNumericField;
  /**@description: Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirname('path/to/file.csv', 'system')	@external: parse_dirname(string:VARCHAR, separator: | VARCHAR) -> VARCHAR*/
  parse_dirname(separator?: DAnyable | DVarcharable): DVarcharField;
  /**@description: Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirpath('path/to/file.csv', 'system')	@external: parse_dirpath(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirpath(separator?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example: parse_filename('path/to/file.csv', true, 'forward_slash')	@external: parse_filename(string:VARCHAR, trimExtension:BOOLEAN |  | VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_filename(trimExtension?: DBoolable | DAnyable | DVarcharable, separator?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_path('path/to/file.csv', 'system')	@external: parse_path(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR[]*/
  parse_path(separator?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: position(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  position(needle: DVarcharable): DNumericField;
  /**@external: prefix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  prefix(col1: DVarcharable): DBoolField;
  /**@description: Formats a string using printf syntax	@example: printf('Benchmark "%s" took %d seconds', 'CSV', 42)	@external: printf(format:VARCHAR) -> VARCHAR*/
  printf(...vargs: DAnyable[]): DVarcharField;
  /**@description: Escapes all potentially meaningful regexp characters in the input string	@example: regexp_escape('https://duckdb.org')	@external: regexp_escape(string:VARCHAR) -> VARCHAR*/
  regexp_escape(): DVarcharField;
  /**@description: If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example: regexp_extract('abc', '([a-z])(b)', 1)	@external: regexp_extract(string:VARCHAR, pattern:VARCHAR, group0:VARCHAR[] | INTEGER | , options:VARCHAR | ) -> VARCHAR*/
  regexp_extract(pattern: DVarcharable, group0?: DArrayable | DNumericable | DAnyable, options?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example: regexp_extract_all('hello_world', '([a-z ]+)_?', 1)	@external: regexp_extract_all(string:VARCHAR, regex:VARCHAR, group0:INTEGER | , options:VARCHAR | ) -> VARCHAR[]*/
  regexp_extract_all(regex: DVarcharable, group0?: DNumericable | DAnyable, options?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns true if the entire string matches the regex. A set of optional options can be set.	@example: regexp_full_match('anabanana', '(an)*')	@external: regexp_full_match(string:VARCHAR, regex:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_full_match(regex: DVarcharable, options?: DVarcharable | DAnyable): DBoolField;
  /**@description: Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example: regexp_matches('anabanana', '(an)*')	@external: regexp_matches(string:VARCHAR, pattern:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_matches(pattern: DVarcharable, options?: DVarcharable | DAnyable): DBoolField;
  /**@description: If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example: regexp_replace('hello', '[lo]', '-')	@external: regexp_replace(string:VARCHAR, pattern:VARCHAR, replacement:VARCHAR, options:VARCHAR | ) -> VARCHAR*/
  regexp_replace(pattern: DVarcharable, replacement: DVarcharable, options?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: regexp_split_to_array(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  regexp_split_to_array(separator: DVarcharable, col2?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Repeats the string count number of times	@example: repeat('A', 5)	@external: repeat(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  repeat(count: DNumericable): DVarcharField;
  /**@description: Replaces any occurrences of the source with target in string	@example: replace('hello', 'l', '-')	@external: replace(string:VARCHAR, source:VARCHAR, target:VARCHAR) -> VARCHAR*/
  replace(source: DVarcharable, target: DVarcharable): DVarcharField;
  /**@description: Reverses the string	@example: reverse('hello')	@external: reverse(string:VARCHAR) -> VARCHAR*/
  reverse(): DVarcharField;
  /**@description: Extract the right-most count characters	@example: right('Hello🦆', 3)	@external: right(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right(count: DNumericable): DVarcharField;
  /**@description: Extract the right-most count grapheme clusters	@example: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@external: right_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right_grapheme(count: DNumericable): DVarcharField;
  /**@description: Pads the string with the character from the right until it has count characters	@example: rpad('hello', 10, '<')	@external: rpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  rpad(count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description: Removes any occurrences of any of the characters from the right side of the string	@example: rtrim('>>>>test<<', '><')	@external: rtrim(string:VARCHAR, characters: | VARCHAR) -> VARCHAR*/
  rtrim(characters?: DAnyable | DVarcharable): DVarcharField;
  /**@description: Returns the SHA1 hash of the value	@example: sha1('hello')	@external: sha1(value:VARCHAR) -> VARCHAR*/
  sha1(): DVarcharField;
  /**@description: Returns the SHA256 hash of the value	@example: sha256('hello')	@external: sha256(value:VARCHAR) -> VARCHAR*/
  sha256(): DVarcharField;
  /**@description: Returns true if string begins with search_string	@example: starts_with('abc','a')	@external: starts_with(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  starts_with(searchString: DVarcharable): DBoolField;
  /**@external: stem(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  stem(col1: DVarcharable): DVarcharField;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: str_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  str_split(separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: str_split_regex(string:VARCHAR, separator:VARCHAR, col2: | VARCHAR) -> VARCHAR[]*/
  str_split_regex(separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**@description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@external: strftime(data:VARCHAR, format:TIMESTAMP_NS | DATE | TIMESTAMP) -> VARCHAR*/
  strftime(format: DDateable): DVarcharField;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: string_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_split(separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: string_split_regex(string:VARCHAR, separator:VARCHAR, col2: | VARCHAR) -> VARCHAR[]*/
  string_split_regex(separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: string_to_array(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_to_array(separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Strips accents from string.	@example: strip_accents('mühleisen')	@external: strip_accents(string:VARCHAR) -> VARCHAR*/
  strip_accents(): DVarcharField;
  /**@description: Number of bytes in string.	@example: strlen('🦆')	@external: strlen(string:VARCHAR) -> BIGINT*/
  strlen(): DNumericField;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: strpos(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  strpos(needle: DVarcharable): DNumericField;
  /**@description: Converts the string text to timestamp according to the format string. Throws an error on failure. To return NULL on failure, use try_strptime.	@example: strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@external: strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  strptime(format: DVarcharable | DArrayable): DDateField;
  /**@description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@external: substr(string:VARCHAR, start:BIGINT, length: | BIGINT) -> VARCHAR*/
  substr(start: DNumericable, length?: DAnyable | DNumericable): DVarcharField;
  /**@description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@external: substring(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring(start: DNumericable, length?: DNumericable | DAnyable): DVarcharField;
  /**@description: Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)	@external: substring_grapheme(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring_grapheme(start: DNumericable, length?: DNumericable | DAnyable): DVarcharField;
  /**@external: suffix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  suffix(col1: DVarcharable): DBoolField;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:VARCHAR, col1:TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIME WITH TIME ZONE*/
  timezone(col1: DDateable): DDateField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:VARCHAR) -> VARCHAR*/
  to_binary(): DVarcharField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:VARCHAR) -> VARCHAR*/
  to_hex(): DVarcharField;
  /**@description: Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example: translate('12345', '143', 'ax')	@external: translate(string:VARCHAR, from:VARCHAR, to:VARCHAR) -> VARCHAR*/
  translate(from: DVarcharable, to: DVarcharable): DVarcharField;
  /**@description: Removes any occurrences of any of the characters from either side of the string	@example: trim('>>>>test<<', '><')	@external: trim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  trim(characters?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example: try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@external: try_strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  try_strptime(format: DVarcharable | DArrayable): DDateField;
  /**@description: Convert string to upper case.	@example: upper('Hello')	@external: ucase(string:VARCHAR) -> VARCHAR*/
  ucase(): DVarcharField;
  /**@description: Converts a value from binary representation to a blob	@example: unbin('0110')	@external: unbin(value:VARCHAR) -> BLOB*/
  unbin(): DAnyField;
  /**@description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@external: unhex(value:VARCHAR) -> BLOB*/
  unhex(): DAnyField;
  /**@description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@external: unicode(str:VARCHAR) -> INTEGER*/
  unicode(): DNumericField;
  /**@description: Convert string to upper case.	@example: upper('Hello')	@external: upper(string:VARCHAR) -> VARCHAR*/
  upper(): DVarcharField;
  /**@description: Unescapes the URL encoded input.	@example: url_decode('this%20string%20is%2BFencoded')	@external: url_decode(input:VARCHAR) -> VARCHAR*/
  url_decode(): DVarcharField;
  /**@description: Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example: url_encode('this string has/ special+ characters>')	@external: url_encode(input:VARCHAR) -> VARCHAR*/
  url_encode(): DVarcharField;
  /**@description: Writes to the logger	@example: write_log('Hello')	@external: write_log(string:VARCHAR) -> ANY*/
  write_log(...vargs: DAnyable[]): DAnyField;
}
export interface _DNumericField extends DAnyField {
  [sInferred]: number;
  [sComptype]: DNumericComp;
  /**@example: Between(val, col1, col2)	@external: Between(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  Between(col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: NotBetween(val, col1, col2)	@external: NotBetween(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  NotBetween(col1: DNumericable, col2: DNumericable): DBoolField;
  /**@description: Absolute value	@example: abs(-17.4)	@external: abs(x:BIGINT) -> BIGINT*/
  abs(): DNumericField;
  /**@description: Computes the arccosine of x	@example: acos(0.5)	@external: acos(x:DOUBLE) -> DOUBLE*/
  acos(): DNumericField;
  /**@description: Computes the inverse hyperbolic cos of x	@example: acosh(2.3)	@external: acosh(x:DOUBLE) -> DOUBLE*/
  acosh(): DNumericField;
  /**@external: add(col0:BIGINT, col1: | BIGINT) -> BIGINT*/
  add(col1?: DAnyable | DNumericable): DNumericField;
  /**@external: add(col0:DECIMAL, col1:DECIMAL | ) -> DECIMAL*/
  add(col1?: DNumericable | DAnyable): DNumericField;
  /**@external: add(col0:INTEGER, col1:DATE) -> DATE*/
  add(col1: DDateable): DDateField;
  /**@description: Computes the arcsine of x	@example: asin(0.5)	@external: asin(x:DOUBLE) -> DOUBLE*/
  asin(): DNumericField;
  /**@description: Computes the inverse hyperbolic sin of x	@example: asinh(0.5)	@external: asinh(x:DOUBLE) -> DOUBLE*/
  asinh(): DNumericField;
  /**@description: Computes the arctangent of x	@example: atan(0.5)	@external: atan(x:DOUBLE) -> DOUBLE*/
  atan(): DNumericField;
  /**@description: Computes the arctangent (y, x)	@example: atan2(1.0, 0.0)	@external: atan2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  atan2(x: DNumericable): DNumericField;
  /**@description: Computes the inverse hyperbolic tan of x	@example: atanh(0.5)	@external: atanh(x:DOUBLE) -> DOUBLE*/
  atanh(): DNumericField;
  /**@description: Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example: bar(5, 0, 20, 10)	@external: bar(x:DOUBLE, min:DOUBLE, max:DOUBLE, width:DOUBLE | ) -> VARCHAR*/
  bar(min: DNumericable, max: DNumericable, width?: DNumericable | DAnyable): DVarcharField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:BIGINT) -> VARCHAR*/
  bin(): DVarcharField;
  /**@description: Returns the number of bits that are set	@example: bit_count(31)	@external: bit_count(x:BIGINT) -> TINYINT*/
  bit_count(): DNumericField;
  /**@description: Returns the cube root of x	@example: cbrt(8)	@external: cbrt(x:DOUBLE) -> DOUBLE*/
  cbrt(): DNumericField;
  /**@description: Rounds the number up	@example: ceil(17.4)	@external: ceil(x:DECIMAL) -> DECIMAL*/
  ceil(): DNumericField;
  /**@description: Rounds the number up	@example: ceil(17.4)	@external: ceiling(x:DECIMAL) -> DECIMAL*/
  ceiling(): DNumericField;
  /**@description: Returns a character which is corresponding the ASCII code value or Unicode code point	@example: chr(65)	@external: chr(codePoint:INTEGER) -> VARCHAR*/
  chr(): DVarcharField;
  /**@description: Computes the cos of x	@example: cos(90)	@external: cos(x:DOUBLE) -> DOUBLE*/
  cos(): DNumericField;
  /**@description: Computes the hyperbolic cos of x	@example: cosh(1)	@external: cosh(x:DOUBLE) -> DOUBLE*/
  cosh(): DNumericField;
  /**@description: Computes the cotangent of x	@example: cot(0.5)	@external: cot(x:DOUBLE) -> DOUBLE*/
  cot(): DNumericField;
  /**@description: Converts radians to degrees	@example: degrees(pi())	@external: degrees(x:DOUBLE) -> DOUBLE*/
  degrees(): DNumericField;
  /**@external: divide(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  divide(col1: DNumericable): DNumericField;
  /**@description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ms(temporal:BIGINT) -> TIMESTAMP*/
  epoch_ms(): DDateField;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:BIGINT, max:BIGINT, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Rounds x to next even number by rounding away from zero	@example: even(2.9)	@external: even(x:DOUBLE) -> DOUBLE*/
  even(): DNumericField;
  /**@external: excel_text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  excel_text(col1: DVarcharable): DVarcharField;
  /**@description: Computes e to the power of x	@example: exp(1)	@external: exp(x:DOUBLE) -> DOUBLE*/
  exp(): DNumericField;
  /**@description: Factorial of x. Computes the product of the current integer and all integers below it	@example: 4!	@external: factorial(x:INTEGER) -> HUGEINT*/
  factorial(): DNumericField;
  /**@description: Rounds the number down	@example: floor(17.4)	@external: floor(x:DECIMAL) -> DECIMAL*/
  floor(): DNumericField;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example: format_bytes(1000 * 16)	@external: formatReadableDecimalSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableDecimalSize(): DVarcharField;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@external: formatReadableSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableSize(): DVarcharField;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@external: format_bytes(bytes:BIGINT) -> VARCHAR*/
  format_bytes(): DVarcharField;
  /**@description: Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example: gamma(5.5)	@external: gamma(x:DOUBLE) -> DOUBLE*/
  gamma(): DNumericField;
  /**@description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@external: gcd(x:BIGINT, y:BIGINT) -> BIGINT*/
  gcd(y: DNumericable): DNumericField;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:BIGINT, stop: | BIGINT, step: | BIGINT) -> BIGINT[]*/
  generate_series(stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /**@description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@external: greatest_common_divisor(x:BIGINT, y:BIGINT) -> BIGINT*/
  greatest_common_divisor(y: DNumericable): DNumericField;
  /**@external: h3_are_neighbor_cells(col0:BIGINT, col1:BIGINT) -> BOOLEAN*/
  h3_are_neighbor_cells(col1: DNumericable): DBoolField;
  /**@external: h3_cell_area(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col1: DVarcharable): DNumericField;
  /**@external: h3_cell_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_cell_to_boundary_wkt(): DVarcharField;
  /**@external: h3_cell_to_center_child(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_center_child(col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_child_pos(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_children(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_cell_to_children(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lat(): DNumericField;
  /**@external: h3_cell_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_cell_to_latlng(): DArrayField<DNumericField>;
  /**@external: h3_cell_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lng(): DNumericField;
  /**@external: h3_cell_to_local_ij(col0:BIGINT, col1:BIGINT) -> INTEGER[]*/
  h3_cell_to_local_ij(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_parent(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_parent(col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_vertex(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_vertex(col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_vertexes(col0:BIGINT) -> BIGINT[]*/
  h3_cell_to_vertexes(): DArrayField<DNumericField>;
  /**@external: h3_cells_to_directed_edge(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_cells_to_directed_edge(col1: DNumericable): DNumericField;
  /**@external: h3_child_pos_to_cell(col0:BIGINT, col1:BIGINT | UBIGINT, col2:INTEGER) -> BIGINT*/
  h3_child_pos_to_cell(col1: DNumericable, col2: DNumericable): DNumericField;
  /**@external: h3_child_pos_to_cell(col0:BIGINT, col1:VARCHAR, col2:INTEGER) -> VARCHAR*/
  h3_child_pos_to_cell(col1: DVarcharable, col2: DNumericable): DVarcharField;
  /**@external: h3_directed_edge_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(): DVarcharField;
  /**@external: h3_directed_edge_to_cells(col0:BIGINT) -> UBIGINT[]*/
  h3_directed_edge_to_cells(): DArrayField<DNumericField>;
  /**@external: h3_edge_length(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col1: DVarcharable): DNumericField;
  /**@external: h3_get_base_cell_number(col0:BIGINT) -> INTEGER*/
  h3_get_base_cell_number(): DNumericField;
  /**@external: h3_get_directed_edge_destination(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_destination(): DNumericField;
  /**@external: h3_get_directed_edge_origin(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_origin(): DNumericField;
  /**@external: h3_get_hexagon_area_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_area_avg(col1: DVarcharable): DNumericField;
  /**@external: h3_get_hexagon_edge_length_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_edge_length_avg(col1: DVarcharable): DNumericField;
  /**@external: h3_get_icosahedron_faces(col0:BIGINT) -> INTEGER[]*/
  h3_get_icosahedron_faces(): DArrayField<DNumericField>;
  /**@external: h3_get_num_cells(col0:INTEGER) -> BIGINT*/
  h3_get_num_cells(): DNumericField;
  /**@external: h3_get_pentagons(col0:INTEGER) -> UBIGINT[]*/
  h3_get_pentagons(): DArrayField<DNumericField>;
  /**@external: h3_get_pentagons_string(col0:INTEGER) -> VARCHAR[]*/
  h3_get_pentagons_string(): DArrayField<DVarcharField>;
  /**@external: h3_get_resolution(col0:BIGINT) -> INTEGER*/
  h3_get_resolution(): DNumericField;
  /**@external: h3_great_circle_distance(col0:DOUBLE, col1:DOUBLE, col2:DOUBLE, col3:DOUBLE, col4:VARCHAR) -> DOUBLE*/
  h3_great_circle_distance(col1: DNumericable, col2: DNumericable, col3: DNumericable, col4: DVarcharable): DNumericField;
  /**@external: h3_grid_disk(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_disk_distances(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_safe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_safe(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_unsafe(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk_unsafe(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_distance(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_grid_distance(col1: DNumericable): DNumericField;
  /**@external: h3_grid_path_cells(col0:BIGINT, col1:BIGINT) -> BIGINT[]*/
  h3_grid_path_cells(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_ring_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_ring_unsafe(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_h3_to_string(col0:BIGINT) -> VARCHAR*/
  h3_h3_to_string(): DVarcharField;
  /**@external: h3_is_pentagon(col0:BIGINT) -> BOOLEAN*/
  h3_is_pentagon(): DBoolField;
  /**@external: h3_is_res_class_iii(col0:BIGINT) -> BOOLEAN*/
  h3_is_res_class_iii(): DBoolField;
  /**@external: h3_is_valid_cell(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_cell(): DBoolField;
  /**@external: h3_is_valid_directed_edge(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_directed_edge(): DBoolField;
  /**@external: h3_is_valid_vertex(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_vertex(): DBoolField;
  /**@external: h3_latlng_to_cell(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> UBIGINT*/
  h3_latlng_to_cell(col1: DNumericable, col2: DNumericable): DNumericField;
  /**@external: h3_latlng_to_cell_string(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> VARCHAR*/
  h3_latlng_to_cell_string(col1: DNumericable, col2: DNumericable): DVarcharField;
  /**@external: h3_local_ij_to_cell(col0:BIGINT, col1:INTEGER, col2:INTEGER) -> BIGINT*/
  h3_local_ij_to_cell(col1: DNumericable, col2: DNumericable): DNumericField;
  /**@external: h3_origin_to_directed_edges(col0:BIGINT) -> UBIGINT[]*/
  h3_origin_to_directed_edges(): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lat(): DNumericField;
  /**@external: h3_vertex_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_vertex_to_latlng(): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lng(): DNumericField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:BIGINT) -> VARCHAR*/
  hex(): DVarcharField;
  /**@description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@external: isfinite(x:DOUBLE) -> BOOLEAN*/
  isfinite(): DBoolField;
  /**@description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@external: isinf(x:DOUBLE) -> BOOLEAN*/
  isinf(): DBoolField;
  /**@description: Returns true if the floating point value is not a number, false otherwise	@example: isnan('NaN'::FLOAT)	@external: isnan(x:DOUBLE) -> BOOLEAN*/
  isnan(): DBoolField;
  /**@description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@external: lcm(x:BIGINT, y:BIGINT) -> BIGINT*/
  lcm(y: DNumericable): DNumericField;
  /**@description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@external: least_common_multiple(x:BIGINT, y:BIGINT) -> BIGINT*/
  least_common_multiple(y: DNumericable): DNumericField;
  /**@description: Computes the log of the gamma function	@example: lgamma(2)	@external: lgamma(x:DOUBLE) -> DOUBLE*/
  lgamma(): DNumericField;
  /**@description: Computes the natural logarithm of x	@example: ln(2)	@external: ln(x:DOUBLE) -> DOUBLE*/
  ln(): DNumericField;
  /**@description: Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example: log(2, 64)	@external: log(b:DOUBLE, x: | DOUBLE) -> DOUBLE*/
  log(x?: DAnyable | DNumericable): DNumericField;
  /**@description: Computes the 10-log of x	@example: log10(1000)	@external: log10(x:DOUBLE) -> DOUBLE*/
  log10(): DNumericField;
  /**@description: Computes the 2-log of x	@example: log2(8)	@external: log2(x:DOUBLE) -> DOUBLE*/
  log2(): DNumericField;
  /**@description: The date for the given parts	@example: make_date(1992, 9, 20)	@external: make_date(year:BIGINT, month:BIGINT, day:BIGINT) -> DATE*/
  make_date(month: DNumericable, day: DNumericable): DDateField;
  /**@external: make_date(col0:INTEGER) -> DATE*/
  make_date(): DDateField;
  /**@description: The time for the given parts	@example: make_time(13, 34, 27.123456)	@external: make_time(hour:BIGINT, minute:BIGINT, seconds:DOUBLE) -> TIME*/
  make_time(minute: DNumericable, seconds: DNumericable): DDateField;
  /**@description: The timestamp for the given parts	@example: make_timestamp(1992, 9, 20, 13, 34, 27.123456)	@external: make_timestamp(year:BIGINT, month: | BIGINT, day: | BIGINT, hour: | BIGINT, minute: | BIGINT, seconds: | DOUBLE) -> TIMESTAMP*/
  make_timestamp(month?: DAnyable | DNumericable, day?: DAnyable | DNumericable, hour?: DAnyable | DNumericable, minute?: DAnyable | DNumericable, seconds?: DAnyable | DNumericable): DDateField;
  /**@description: The timestamp for the given nanoseconds since epoch	@example: make_timestamp(1732117793000000000)	@external: make_timestamp_ns(nanos:BIGINT) -> TIMESTAMP_NS*/
  make_timestamp_ns(): DDateField;
  /**@external: make_timestamptz(col0:BIGINT, col1: | BIGINT, col2: | BIGINT, col3: | BIGINT, col4: | BIGINT, col5: | DOUBLE, col6: | VARCHAR) -> TIMESTAMP WITH TIME ZONE*/
  make_timestamptz(col1?: DAnyable | DNumericable, col2?: DAnyable | DNumericable, col3?: DAnyable | DNumericable, col4?: DAnyable | DNumericable, col5?: DAnyable | DNumericable, col6?: DAnyable | DVarcharable): DDateField;
  /**@external: mod(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  mod(col1: DNumericable): DNumericField;
  /**@external: multiply(col0:BIGINT, col1:INTERVAL) -> INTERVAL*/
  multiply(col1: DAnyable): DAnyField;
  /**@external: multiply(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  multiply(col1: DNumericable): DNumericField;
  /**@description: Returns the next floating point value after x in the direction of y	@example: nextafter(1::float, 2::float)	@external: nextafter(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  nextafter(y: DNumericable): DNumericField;
  /**@description: Computes x to the power of y	@example: pow(2, 3)	@external: pow(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  pow(y: DNumericable): DNumericField;
  /**@description: Computes x to the power of y	@example: pow(2, 3)	@external: power(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  power(y: DNumericable): DNumericField;
  /**@description: Converts degrees to radians	@example: radians(90)	@external: radians(x:DOUBLE) -> DOUBLE*/
  radians(): DNumericField;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  range(stop?: DNumericable | DAnyable, step?: DNumericable | DAnyable): DArrayField<DNumericField>;
  /**@description: Rounds x to s decimal places	@example: round(42.4332, 2)	@external: round(x:DECIMAL, precision: | INTEGER) -> DECIMAL*/
  round(precision?: DAnyable | DNumericable): DNumericField;
  /**@description: Rounds x to s decimal places	@example: round(42.4332, 2)	@external: round(x:DOUBLE, precision:INTEGER | ) -> DOUBLE*/
  round(precision?: DNumericable | DAnyable): DNumericField;
  /**@description: Sets the seed to be used for the random function	@example: setseed(0.42)	@external: setseed(col0:DOUBLE) -> "NULL"*/
  setseed(): DAnyField;
  /**@description: Returns the sign of x as -1, 0 or 1	@example: sign(-349)	@external: sign(x:BIGINT) -> TINYINT*/
  sign(): DNumericField;
  /**@description: Returns whether the signbit is set or not	@example: signbit(-0.0)	@external: signbit(x:DOUBLE) -> BOOLEAN*/
  signbit(): DBoolField;
  /**@description: Computes the sin of x	@example: sin(90)	@external: sin(x:DOUBLE) -> DOUBLE*/
  sin(): DNumericField;
  /**@description: Computes the hyperbolic sin of x	@example: sinh(1)	@external: sinh(x:DOUBLE) -> DOUBLE*/
  sinh(): DNumericField;
  /**@description: Returns the square root of x	@example: sqrt(4)	@external: sqrt(x:DOUBLE) -> DOUBLE*/
  sqrt(): DNumericField;
  /**@external: subtract(col0:BIGINT, col1: | BIGINT) -> BIGINT*/
  subtract(col1?: DAnyable | DNumericable): DNumericField;
  /**@external: subtract(col0:UBIGINT, col1:UBIGINT | ) -> UBIGINT*/
  subtract(col1?: DNumericable | DAnyable): DNumericField;
  /**@description: Computes the tan of x	@example: tan(90)	@external: tan(x:DOUBLE) -> DOUBLE*/
  tan(): DNumericField;
  /**@description: Computes the hyperbolic tan of x	@example: tanh(1)	@external: tanh(x:DOUBLE) -> DOUBLE*/
  tanh(): DNumericField;
  /**@external: text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  text(col1: DVarcharable): DVarcharField;
  /**@description: Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example: to_base(42, 16)	@external: to_base(number:BIGINT, radix:INTEGER, minLength: | INTEGER) -> VARCHAR*/
  to_base(radix: DNumericable, minLength?: DAnyable | DNumericable): DVarcharField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:BIGINT) -> VARCHAR*/
  to_binary(): DVarcharField;
  /**@description: Construct a century interval	@example: to_centuries(5)	@external: to_centuries(integer:INTEGER) -> INTERVAL*/
  to_centuries(): DAnyField;
  /**@description: Construct a day interval	@example: to_days(5)	@external: to_days(integer:INTEGER) -> INTERVAL*/
  to_days(): DAnyField;
  /**@description: Construct a decade interval	@example: to_decades(5)	@external: to_decades(integer:INTEGER) -> INTERVAL*/
  to_decades(): DAnyField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:BIGINT) -> VARCHAR*/
  to_hex(): DVarcharField;
  /**@description: Construct a hour interval	@example: to_hours(5)	@external: to_hours(integer:BIGINT) -> INTERVAL*/
  to_hours(): DAnyField;
  /**@description: Construct a microsecond interval	@example: to_microseconds(5)	@external: to_microseconds(integer:BIGINT) -> INTERVAL*/
  to_microseconds(): DAnyField;
  /**@description: Construct a millenium interval	@example: to_millennia(1)	@external: to_millennia(integer:INTEGER) -> INTERVAL*/
  to_millennia(): DAnyField;
  /**@description: Construct a millisecond interval	@example: to_milliseconds(5.5)	@external: to_milliseconds(double:DOUBLE) -> INTERVAL*/
  to_milliseconds(): DAnyField;
  /**@description: Construct a minute interval	@example: to_minutes(5)	@external: to_minutes(integer:BIGINT) -> INTERVAL*/
  to_minutes(): DAnyField;
  /**@description: Construct a month interval	@example: to_months(5)	@external: to_months(integer:INTEGER) -> INTERVAL*/
  to_months(): DAnyField;
  /**@description: Construct a quarter interval	@example: to_quarters(5)	@external: to_quarters(integer:INTEGER) -> INTERVAL*/
  to_quarters(): DAnyField;
  /**@description: Construct a second interval	@example: to_seconds(5.5)	@external: to_seconds(double:DOUBLE) -> INTERVAL*/
  to_seconds(): DAnyField;
  /**@description: Converts secs since epoch to a timestamp with time zone	@example: to_timestamp(1284352323.5)	@external: to_timestamp(sec:DOUBLE) -> TIMESTAMP WITH TIME ZONE*/
  to_timestamp(): DDateField;
  /**@description: Construct a week interval	@example: to_weeks(5)	@external: to_weeks(integer:INTEGER) -> INTERVAL*/
  to_weeks(): DAnyField;
  /**@description: Construct a year interval	@example: to_years(5)	@external: to_years(integer:INTEGER) -> INTERVAL*/
  to_years(): DAnyField;
  /**@description: Truncates the number	@example: trunc(17.4)	@external: trunc(x:BIGINT) -> BIGINT*/
  trunc(): DNumericField;
  /**@description: Bitwise XOR	@example: xor(17, 5)	@external: xor(left:BIGINT, right:BIGINT) -> BIGINT*/
  xor(right: DNumericable): DNumericField;
}
export type DNumericField = _DNumericField;

export interface DDateField extends DAnyField {
  [sInferred]: Date;
  [sComptype]: Date;
  /**@external: add(col0:DATE, col1:TIME WITH TIME ZONE | TIME | INTERVAL | INTEGER) -> TIMESTAMP WITH TIME ZONE*/
  add(col1: DDateable | DAnyable | DNumericable): DDateField;
  /**@external: add(col0:TIME WITH TIME ZONE, col1:DATE | INTERVAL) -> TIMESTAMP WITH TIME ZONE*/
  add(col1: DDateable | DAnyable): DDateField;
  /**@external: add(col0:TIME, col1:INTERVAL | DATE) -> TIME*/
  add(col1: DAnyable | DDateable): DDateField;
  /**@external: add(col0:TIMESTAMP, col1:INTERVAL) -> TIMESTAMP*/
  add(col1: DAnyable): DDateField;
  /**@description: Subtract arguments, resulting in the time difference between the two timestamps	@example: age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')	@external: age(timestamp:TIMESTAMP WITH TIME ZONE, timestamp__01: | TIMESTAMP WITH TIME ZONE) -> INTERVAL*/
  age(timestamp__01?: DAnyable | DDateable): DAnyField;
  /**@description: Extract the century component from a date or timestamp	@example: century(timestamp '2021-08-03 11:59:44.123456')	@external: century(ts:DATE) -> BIGINT*/
  century(): DNumericField;
  /**@description: Extract the day component from a date or timestamp	@example: day(timestamp '2021-08-03 11:59:44.123456')	@external: day(ts:DATE) -> BIGINT*/
  day(): DNumericField;
  /**@description: The (English) name of the weekday	@example: dayname(TIMESTAMP '1992-03-22')	@external: dayname(ts:DATE) -> VARCHAR*/
  dayname(): DVarcharField;
  /**@description: Extract the dayofmonth component from a date or timestamp	@example: dayofmonth(timestamp '2021-08-03 11:59:44.123456')	@external: dayofmonth(ts:DATE) -> BIGINT*/
  dayofmonth(): DNumericField;
  /**@description: Extract the dayofweek component from a date or timestamp	@example: dayofweek(timestamp '2021-08-03 11:59:44.123456')	@external: dayofweek(ts:DATE) -> BIGINT*/
  dayofweek(): DNumericField;
  /**@description: Extract the dayofyear component from a date or timestamp	@example: dayofyear(timestamp '2021-08-03 11:59:44.123456')	@external: dayofyear(ts:DATE) -> BIGINT*/
  dayofyear(): DNumericField;
  /**@description: Extract the decade component from a date or timestamp	@example: decade(timestamp '2021-08-03 11:59:44.123456')	@external: decade(ts:DATE) -> BIGINT*/
  decade(): DNumericField;
  /**@description: Extract the epoch component from a temporal type	@example: epoch(timestamp '2021-08-03 11:59:44.123456')	@external: epoch(temporal:DATE) -> DOUBLE*/
  epoch(): DNumericField;
  /**@description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ms(temporal:DATE) -> BIGINT*/
  epoch_ms(): DNumericField;
  /**@description: Extract the epoch component in nanoseconds from a temporal type	@example: epoch_ns(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ns(temporal:DATE) -> BIGINT*/
  epoch_ns(): DNumericField;
  /**@description: Extract the epoch component in microseconds from a temporal type	@example: epoch_us(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_us(temporal:DATE) -> BIGINT*/
  epoch_us(): DNumericField;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:TIMESTAMP, max:TIMESTAMP, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(max: DDateable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Extract the era component from a date or timestamp	@example: era(timestamp '2021-08-03 11:59:44.123456')	@external: era(ts:DATE) -> BIGINT*/
  era(): DNumericField;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  generate_series(stop: DDateable, step: DAnyable): DArrayField;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:TIMESTAMP, stop:TIMESTAMP, step:INTERVAL) -> TIMESTAMP[]*/
  generate_series(stop: DDateable, step: DAnyable): DArrayField<DDateField>;
  /**@description: Extract the hour component from a date or timestamp	@example: hour(timestamp '2021-08-03 11:59:44.123456')	@external: hour(ts:DATE) -> BIGINT*/
  hour(): DNumericField;
  /**@description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@external: isfinite(x:DATE) -> BOOLEAN*/
  isfinite(): DBoolField;
  /**@description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@external: isinf(x:DATE) -> BOOLEAN*/
  isinf(): DBoolField;
  /**@description: Extract the isodow component from a date or timestamp	@example: isodow(timestamp '2021-08-03 11:59:44.123456')	@external: isodow(ts:DATE) -> BIGINT*/
  isodow(): DNumericField;
  /**@description: Extract the isoyear component from a date or timestamp	@example: isoyear(timestamp '2021-08-03 11:59:44.123456')	@external: isoyear(ts:DATE) -> BIGINT*/
  isoyear(): DNumericField;
  /**@description: Extract the Julian Day number from a date or timestamp	@example: julian(timestamp '2006-01-01 12:00')	@external: julian(ts:DATE) -> DOUBLE*/
  julian(): DNumericField;
  /**@description: Returns the last day of the month	@example: last_day(TIMESTAMP '1992-03-22 01:02:03.1234')	@external: last_day(ts:DATE) -> DATE*/
  last_day(): DDateField;
  /**@description: Extract the microsecond component from a date or timestamp	@example: microsecond(timestamp '2021-08-03 11:59:44.123456')	@external: microsecond(ts:DATE) -> BIGINT*/
  microsecond(): DNumericField;
  /**@description: Extract the millennium component from a date or timestamp	@example: millennium(timestamp '2021-08-03 11:59:44.123456')	@external: millennium(ts:DATE) -> BIGINT*/
  millennium(): DNumericField;
  /**@description: Extract the millisecond component from a date or timestamp	@example: millisecond(timestamp '2021-08-03 11:59:44.123456')	@external: millisecond(ts:DATE) -> BIGINT*/
  millisecond(): DNumericField;
  /**@description: Extract the minute component from a date or timestamp	@example: minute(timestamp '2021-08-03 11:59:44.123456')	@external: minute(ts:DATE) -> BIGINT*/
  minute(): DNumericField;
  /**@description: Extract the month component from a date or timestamp	@example: month(timestamp '2021-08-03 11:59:44.123456')	@external: month(ts:DATE) -> BIGINT*/
  month(): DNumericField;
  /**@description: The (English) name of the month	@example: monthname(TIMESTAMP '1992-09-20')	@external: monthname(ts:DATE) -> VARCHAR*/
  monthname(): DVarcharField;
  /**@description: Extract the nanosecond component from a date or timestamp	@example: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789	@external: nanosecond(tsns:DATE) -> BIGINT*/
  nanosecond(): DNumericField;
  /**@description: Extract the quarter component from a date or timestamp	@example: quarter(timestamp '2021-08-03 11:59:44.123456')	@external: quarter(ts:DATE) -> BIGINT*/
  quarter(): DNumericField;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  range(stop: DDateable, step: DAnyable): DArrayField;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:TIMESTAMP, stop:TIMESTAMP, step:INTERVAL) -> TIMESTAMP[]*/
  range(stop: DDateable, step: DAnyable): DArrayField<DDateField>;
  /**@description: Extract the second component from a date or timestamp	@example: second(timestamp '2021-08-03 11:59:44.123456')	@external: second(ts:DATE) -> BIGINT*/
  second(): DNumericField;
  /**@description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@external: strftime(data:DATE, format:VARCHAR) -> VARCHAR*/
  strftime(format: DVarcharable): DVarcharField;
  /**@external: subtract(col0:DATE, col1:INTERVAL | INTEGER) -> TIMESTAMP*/
  subtract(col1: DAnyable | DNumericable): DDateField;
  /**@external: subtract(col0:DATE, col1:DATE) -> BIGINT*/
  subtract(col1: DDateable): DNumericField;
  /**@external: subtract(col0:TIME WITH TIME ZONE, col1:INTERVAL) -> TIME WITH TIME ZONE*/
  subtract(col1: DAnyable): DDateField;
  /**@external: subtract(col0:TIMESTAMP, col1:TIMESTAMP) -> INTERVAL*/
  subtract(col1: DDateable): DAnyField;
  /**@description: Converts a TIME WITH TIME ZONE to an integer sort key	@example: timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)	@external: timetz_byte_comparable(timeTz:TIME WITH TIME ZONE) -> UBIGINT*/
  timetz_byte_comparable(): DNumericField;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:DATE) -> BIGINT*/
  timezone(): DNumericField;
  /**@description: Extract the timezone_hour component from a date or timestamp	@example: timezone_hour(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_hour(ts:DATE) -> BIGINT*/
  timezone_hour(): DNumericField;
  /**@description: Extract the timezone_minute component from a date or timestamp	@example: timezone_minute(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_minute(ts:DATE) -> BIGINT*/
  timezone_minute(): DNumericField;
  /**@description: Extract the week component from a date or timestamp	@example: week(timestamp '2021-08-03 11:59:44.123456')	@external: week(ts:DATE) -> BIGINT*/
  week(): DNumericField;
  /**@description: Extract the weekday component from a date or timestamp	@example: weekday(timestamp '2021-08-03 11:59:44.123456')	@external: weekday(ts:DATE) -> BIGINT*/
  weekday(): DNumericField;
  /**@description: Extract the weekofyear component from a date or timestamp	@example: weekofyear(timestamp '2021-08-03 11:59:44.123456')	@external: weekofyear(ts:DATE) -> BIGINT*/
  weekofyear(): DNumericField;
  /**@description: Extract the year component from a date or timestamp	@example: year(timestamp '2021-08-03 11:59:44.123456')	@external: year(ts:DATE) -> BIGINT*/
  year(): DNumericField;
  /**@description: Extract the yearweek component from a date or timestamp	@example: yearweek(timestamp '2021-08-03 11:59:44.123456')	@external: yearweek(ts:DATE) -> BIGINT*/
  yearweek(): DNumericField;
}

export interface DAnyField {
  [sInferred]: any;
  [sComptype]: any;
  as(destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  as(destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): DAnyField;
  as(destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  as(destype: DNUMERIC_NATIVE, ...args: DAnyable[]): DNumericField;
  as(destype: DSTRING_NATIVE, ...args: DAnyable[]): DVarcharField;
  as(destype: DANY_NATIVE, ...args: DAnyable[]): DAnyField;
  /**@example: IsNull(val)	@external: IsNull(val:ANY) -> BOOLEAN*/
  IsNull(): DBoolField;
  /**@description: Returns the name of a given expression	@example: alias(42 + 1)	@external: alias(expr:ANY) -> VARCHAR*/
  alias(): DVarcharField;
  /**@description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@external: array_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  array_slice(begin: DAnyable, end: DAnyable, step?: DNumericable | DAnyable): DAnyField;
  /**@description: Whether or not we can implicitly cast from the source type to the other type	@example: can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)	@external: can_cast_implicitly(sourceType:ANY, targetType:ANY) -> BOOLEAN*/
  can_cast_implicitly(targetType: DAnyable): DBoolField;
  /**@description: Returns the size of the map (or the number of entries in the map)	@example: cardinality( map([4, 2], ['a', 'b']) );	@external: cardinality(map:ANY) -> UBIGINT*/
  cardinality(...vargs: DAnyable[]): DNumericField;
  /**@description: Concatenate many strings together.	@example: concat('Hello', ' ', 'World')	@external: concat(string:ANY) -> VARCHAR*/
  concat(...vargs: DAnyable[]): DVarcharField;
  /**@description: If arg2 is NULL, return NULL. Otherwise, return arg1.	@example: constant_or_null(42, NULL)	@external: constant_or_null(arg1:ANY, arg2:ANY) -> ANY*/
  constant_or_null(arg2: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example: create_sort_key('A', 'DESC')	@external: create_sort_key(parameters:ANY) -> BLOB*/
  create_sort_key(...vargs: DAnyable[]): DAnyField;
  /**@description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@external: element_at(map:ANY, key:ANY) -> ANY*/
  element_at(key: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns the numeric value backing the given enum value	@example: enum_code('happy'::mood)	@external: enum_code(enm:ANY) -> ANY*/
  enum_code(): DAnyField;
  /**@description: Returns the first value of the input enum type	@example: enum_first(NULL::mood)	@external: enum_first(enm:ANY) -> VARCHAR*/
  enum_first(): DVarcharField;
  /**@description: Returns the last value of the input enum type	@example: enum_last(NULL::mood)	@external: enum_last(enm:ANY) -> VARCHAR*/
  enum_last(): DVarcharField;
  /**@description: Returns all values of the input enum type as an array	@example: enum_range(NULL::mood)	@external: enum_range(enm:ANY) -> VARCHAR[]*/
  enum_range(): DArrayField<DVarcharField>;
  /**@description: Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example: enum_range_boundary(NULL, 'happy'::mood)	@external: enum_range_boundary(start:ANY, end:ANY) -> VARCHAR[]*/
  enum_range_boundary(end: DAnyable): DArrayField<DVarcharField>;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:ANY, max:ANY, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Returns the highest value of the set of input parameters	@example: greatest(42, 84)	@external: greatest(arg1:ANY) -> ANY*/
  greatest(...vargs: DAnyable[]): DAnyField;
  /**@description: Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example: hash('🦆')	@external: hash(param:ANY) -> UBIGINT*/
  hash(...vargs: DAnyable[]): DNumericField;
  /**@description: Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example: is_histogram_other_bin(v)	@external: is_histogram_other_bin(val:ANY) -> BOOLEAN*/
  is_histogram_other_bin(): DBoolField;
  /**@description: Returns the lowest value of the set of input parameters	@example: least(42, 84)	@external: least(arg1:ANY) -> ANY*/
  least(...vargs: DAnyable[]): DAnyField;
  /**@description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@external: list_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  list_slice(begin: DAnyable, end: DAnyable, step?: DNumericable | DAnyable): DAnyField;
  /**@description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@external: map_extract(map:ANY, key:ANY) -> ANY*/
  map_extract(key: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract_value(map(['key'], ['val']), 'key')	@external: map_extract_value(map:ANY, key:ANY) -> ANY*/
  map_extract_value(key: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example: stats(5)	@external: stats(expression:ANY) -> VARCHAR*/
  stats(): DVarcharField;
  /**@description: Returns the name of the data type of the result of the expression	@example: typeof('abc')	@external: typeof(expression:ANY) -> VARCHAR*/
  typeof(): DVarcharField;
  /**@description: Returns the VectorType of a given column	@example: vector_type(col)	@external: vector_type(col:ANY) -> VARCHAR*/
  vector_type(): DVarcharField;
}

export interface DArrayField<T = DAnyField> extends Omit<Array<T>, "length" | "map" | "filter" | "reduce"> {
  [sInferred]: T[];
  [sComptype]: any[];
  /**@external: add(col0:ANY[], col1:ANY[]) -> ANY[]*/
  add(col1: DArrayable): DArrayField<T>;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  aggregate(name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  apply(lambda: DAnyable): DArrayField<T>;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: array_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggr(name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: array_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggregate(name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: array_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_apply(lambda: DAnyable): DArrayField<T>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: array_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_cat(list2: DArrayable): DArrayField<T>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: array_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_concat(list2: DArrayable): DArrayField<T>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: array_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  array_contains(element: DAnyable): DBoolField;
  /**@description: Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_distance([1, 2, 3], [1, 2, 3])	@external: array_cosine_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_distance(arr2: DArrayable): DNumericField;
  /**@description: Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_similarity([1, 2, 3], [1, 2, 3])	@external: array_cosine_similarity(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_similarity(arr2: DArrayable): DNumericField;
  /**@description: Compute the cross product of two arrays of size 3. The array elements can not be NULL.	@example: array_cross_product([1, 2, 3], [1, 2, 3])	@external: array_cross_product(arr:DOUBLE[3], arr__01:DOUBLE[3]) -> DOUBLE[3]*/
  array_cross_product(arr__01: DArrayable): DArrayField<T>;
  /**@description: Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_distance([1, 2, 3], [1, 2, 3])	@external: array_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_distance(arr2: DArrayable): DNumericField;
  /**@description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@external: array_distinct(list:ANY[]) -> ANY[]*/
  array_distinct(): DArrayField<T>;
  /**@description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@external: array_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_dot_product(arr2: DArrayable): DNumericField;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:ANY[], index:BIGINT) -> ANY*/
  array_extract(index: DNumericable): DAnyField;
  /**@description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@external: array_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_filter(lambda: DAnyable): DArrayField<T>;
  /**@description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@external: array_grade_up(list:ANY[], col1: | VARCHAR, col2: | VARCHAR) -> ANY[]*/
  array_grade_up(col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<T>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: array_has(list:ANY[], element:ANY) -> BOOLEAN*/
  array_has(element: DAnyable): DBoolField;
  /**@description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@external: array_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_all(l2: DArrayable): DBoolField;
  /**@description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@external: array_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_any(l2: DArrayable): DBoolField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: array_indexof(list:ANY[], element:ANY) -> INTEGER*/
  array_indexof(element: DAnyable): DNumericField;
  /**@description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@external: array_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_inner_product(arr2: DArrayable): DNumericField;
  /**@description: Returns the length of the list.	@example: array_length([1,2,3])	@external: array_length(list:ANY[], col1:BIGINT | ) -> BIGINT*/
  array_length(col1?: DNumericable | DAnyable): DNumericField;
  /**@description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: array_negative_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_dot_product(arr2: DArrayable): DNumericField;
  /**@description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: array_negative_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_inner_product(arr2: DArrayable): DNumericField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: array_position(list:ANY[], element:ANY) -> INTEGER*/
  array_position(element: DAnyable): DNumericField;
  /**@description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@external: array_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  array_reduce(lambda: DAnyable): DAnyField;
  /**@description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@external: array_resize(list:ANY[], size:ANY, value: | ANY) -> ANY[]*/
  array_resize(size: DAnyable, value?: DAnyable): DArrayField<T>;
  /**@description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@external: array_reverse_sort(list:ANY[], col1:VARCHAR | ) -> ANY[]*/
  array_reverse_sort(col1?: DVarcharable | DAnyable): DArrayField<T>;
  /**@description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@external: array_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  array_select(indexList: DArrayable): DArrayField<T>;
  /**@description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@external: array_sort(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  array_sort(col1?: DVarcharable | DAnyable, col2?: DVarcharable | DAnyable): DArrayField<T>;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: array_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_transform(lambda: DAnyable): DArrayField<T>;
  /**@description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@external: array_unique(list:ANY[]) -> UBIGINT*/
  array_unique(): DNumericField;
  /**@description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@external: array_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  array_where(maskList: DArrayable): DArrayField<T>;
  /**@description: Returns true if the list contains the element.	@example: contains([1, 2, NULL], 1)	@external: contains(list:ANY[], element:ANY) -> BOOLEAN*/
  contains(element: DAnyable): DBoolField;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: date_part(ts:VARCHAR[], col1:TIMESTAMP WITH TIME ZONE | DATE | INTERVAL | TIME | TIMESTAMP | TIME WITH TIME ZONE) -> STRUCT()*/
  date_part(col1: DDateable | DAnyable): DStructField;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: datepart(ts:VARCHAR[], col1:TIMESTAMP | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE | DATE | TIME | INTERVAL) -> STRUCT()*/
  datepart(col1: DDateable | DAnyable): DStructField;
  /**@description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@external: filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  filter(lambda: DAnyable): DArrayField<T>;
  /**@description: Flatten a nested list by one level	@example: flatten([[1, 2, 3], [4, 5]])	@external: flatten(nestedList:ANY[][]) -> ANY[]*/
  flatten(): DArrayField<T>;
  /**@description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@external: grade_up(list:ANY[], col1: | VARCHAR, col2: | VARCHAR) -> ANY[]*/
  grade_up(col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<T>;
  /**@external: h3_cells_to_multi_polygon_wkt(col0:BIGINT[]) -> VARCHAR*/
  h3_cells_to_multi_polygon_wkt(): DVarcharField;
  /**@external: h3_compact_cells(col0:BIGINT[]) -> BIGINT[]*/
  h3_compact_cells(): DArrayField<T>;
  /**@external: h3_uncompact_cells(col0:BIGINT[], col1:INTEGER) -> BIGINT[]*/
  h3_uncompact_cells(col1: DNumericable): DArrayField<T>;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: len(string:ANY[]) -> BIGINT*/
  len(): DNumericField;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: length(string:ANY[]) -> BIGINT*/
  length(): DNumericField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: list_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggr(name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: list_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggregate(name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: list_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_apply(lambda: DAnyable): DArrayField<T>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: list_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_cat(list2: DArrayable): DArrayField<T>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: list_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_concat(list2: DArrayable): DArrayField<T>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: list_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  list_contains(element: DAnyable): DBoolField;
  /**@description: Compute the cosine distance between two lists	@example: list_cosine_distance([1, 2, 3], [1, 2, 3])	@external: list_cosine_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_distance(list2: DArrayable): DNumericField;
  /**@description: Compute the cosine similarity between two lists	@example: list_cosine_similarity([1, 2, 3], [1, 2, 3])	@external: list_cosine_similarity(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_similarity(list2: DArrayable): DNumericField;
  /**@description: Compute the distance between two lists	@example: list_distance([1, 2, 3], [1, 2, 3])	@external: list_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_distance(list2: DArrayable): DNumericField;
  /**@description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@external: list_distinct(list:ANY[]) -> ANY[]*/
  list_distinct(): DArrayField<T>;
  /**@description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@external: list_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_dot_product(list2: DArrayable): DNumericField;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_element(list:ANY[], index:BIGINT) -> ANY*/
  list_element(index: DNumericable): DAnyField;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_extract(list:ANY[], index:BIGINT) -> ANY*/
  list_extract(index: DNumericable): DAnyField;
  /**@description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@external: list_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_filter(lambda: DAnyable): DArrayField<T>;
  /**@description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@external: list_grade_up(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  list_grade_up(col1?: DVarcharable | DAnyable, col2?: DVarcharable | DAnyable): DArrayField<T>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: list_has(list:ANY[], element:ANY) -> BOOLEAN*/
  list_has(element: DAnyable): DBoolField;
  /**@description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@external: list_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_all(l2: DArrayable): DBoolField;
  /**@description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@external: list_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_any(l2: DArrayable): DBoolField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: list_indexof(list:ANY[], element:ANY) -> INTEGER*/
  list_indexof(element: DAnyable): DNumericField;
  /**@description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@external: list_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_inner_product(list2: DArrayable): DNumericField;
  /**@description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: list_negative_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_dot_product(list2: DArrayable): DNumericField;
  /**@description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: list_negative_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_inner_product(list2: DArrayable): DNumericField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: list_position(list:ANY[], element:ANY) -> INTEGER*/
  list_position(element: DAnyable): DNumericField;
  /**@description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@external: list_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  list_reduce(lambda: DAnyable): DAnyField;
  /**@description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@external: list_resize(list:ANY[], size:ANY, value: | ANY) -> ANY[]*/
  list_resize(size: DAnyable, value?: DAnyable): DArrayField<T>;
  /**@description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@external: list_reverse_sort(list:ANY[], col1: | VARCHAR) -> ANY[]*/
  list_reverse_sort(col1?: DAnyable | DVarcharable): DArrayField<T>;
  /**@description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@external: list_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  list_select(indexList: DArrayable): DArrayField<T>;
  /**@description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@external: list_sort(list:ANY[], col1: | VARCHAR, col2: | VARCHAR) -> ANY[]*/
  list_sort(col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<T>;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: list_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_transform(lambda: DAnyable): DArrayField<T>;
  /**@description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@external: list_unique(list:ANY[]) -> UBIGINT*/
  list_unique(): DNumericField;
  /**@description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@external: list_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  list_where(maskList: DArrayable): DArrayField<T>;
  /**@description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@external: reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  reduce(lambda: DAnyable): DAnyField;
  /**@description: Repeats the string count number of times	@example: repeat('A', 5)	@external: repeat(string:ANY[], count:BIGINT) -> ANY[]*/
  repeat(count: DNumericable): DArrayField<T>;
}

export interface DStructField<T = {}> {
  [sInferred]: T;
  [sComptype]: Record<string, any>;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:STRUCT, index:VARCHAR | BIGINT) -> ANY*/
  array_extract(index: DVarcharable | DNumericable): DAnyField;
  /**@description: Extract the named entry from the STRUCT.	@example: struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i')	@external: struct_extract(struct:STRUCT, entry:BIGINT | VARCHAR) -> ANY*/
  struct_extract(entry: DNumericable | DVarcharable): DAnyField;
  /**@description: Extract the entry from the STRUCT by position (starts at 1!).	@example: struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2)	@external: struct_extract_at(struct:STRUCT, entry:BIGINT) -> ANY*/
  struct_extract_at(entry: DNumericable): DAnyField;
}

export interface DBoolField extends DAnyField {
  [sInferred]: boolean;
  [sComptype]: boolean;
  /**@description: Returns list of schemas. Pass a parameter of True to include implicit schemas	@example: current_schemas(true)	@external: current_schemas(includeImplicit:BOOLEAN) -> VARCHAR[]*/
  current_schemas(): DArrayField<DVarcharField>;
}
export interface DJsonField<T = {}> {
  [sInferred]: T;
  [sComptype]: Record<string, any>;
  /**@external: from_json(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json(col1: DVarcharable): DAnyField;
  /**@external: from_json_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json_strict(col1: DVarcharable): DAnyField;
  /**@external: json_array_length(col0:JSON, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col1: DArrayable): DArrayField<DNumericField>;
  /**@external: json_array_length(col0:JSON, col1:VARCHAR | ) -> UBIGINT*/
  json_array_length(col1?: DVarcharable | DAnyable): DNumericField;
  /**@external: json_contains(col0:JSON, col1:VARCHAR | JSON) -> BOOLEAN*/
  json_contains(col1: DVarcharable | DJsonable): DBoolField;
  /**@external: json_deserialize_sql(col0:JSON) -> VARCHAR*/
  json_deserialize_sql(): DVarcharField;
  /**@external: json_exists(col0:JSON, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col1: DArrayable): DArrayField<DBoolField>;
  /**@external: json_exists(col0:JSON, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col1: DVarcharable): DBoolField;
  /**@external: json_extract(col0:JSON, col1:VARCHAR | BIGINT) -> JSON*/
  json_extract(col1: DVarcharable | DNumericable): DJsonField;
  /**@external: json_extract(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path(col0:JSON, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract_path(col1: DNumericable | DVarcharable): DJsonField;
  /**@external: json_extract_path(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path_text(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_path_text(col0:JSON, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col1: DNumericable | DVarcharable): DVarcharField;
  /**@external: json_extract_string(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_string(col0:JSON, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_extract_string(col1: DVarcharable | DNumericable): DVarcharField;
  /**@external: json_keys(col0:JSON, col1: | VARCHAR | VARCHAR[]) -> VARCHAR[]*/
  json_keys(col1?: DAnyable | DVarcharable | DArrayable): DArrayField<DVarcharField>;
  /**@external: json_pretty(col0:JSON) -> VARCHAR*/
  json_pretty(): DVarcharField;
  /**@external: json_structure(col0:JSON) -> JSON*/
  json_structure(): DJsonField;
  /**@external: json_transform(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform(col1: DVarcharable): DAnyField;
  /**@external: json_transform_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform_strict(col1: DVarcharable): DAnyField;
  /**@external: json_type(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_type(col0:JSON, col1: | VARCHAR) -> VARCHAR*/
  json_type(col1?: DAnyable | DVarcharable): DVarcharField;
  /**@external: json_valid(col0:JSON) -> BOOLEAN*/
  json_valid(): DBoolField;
  /**@external: json_value(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_value(col0:JSON, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_value(col1: DVarcharable | DNumericable): DVarcharField;
}

export interface DGlobalField {
  cast(val: DBoolable, destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  cast(val: DAnyable, destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): DAnyField;
  cast(val: DDateable, destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  cast(val: DNumericable, destype: DNUMERIC_NATIVE, ...args: DAnyable[]): DNumericField;
  cast(val: DVarcharable, destype: DSTRING_NATIVE, ...args: DAnyable[]): DVarcharField;
  cast(val: DAnyable, destype: DANY_NATIVE, ...args: DAnyable[]): DAnyField;
  /**@example: Array(val)	@external: Array(val:OTHER) -> ARRAY*/
  Array(val: DAnyable): DArrayField;
  /**@example: Between(val, col1, col2)	@external: Between(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  Between(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: Bigint(val)	@external: Bigint(val:OTHER) -> BIGINT*/
  Bigint(val: DAnyable): DNumericField;
  /**@example: Bit(val)	@external: Bit(val:OTHER) -> BIT*/
  Bit(val: DAnyable): DAnyField;
  /**@example: Blob(val)	@external: Blob(val:OTHER) -> BLOB*/
  Blob(val: DAnyable): DAnyField;
  /**@example: Boolean(val)	@external: Boolean(val:OTHER) -> BOOLEAN*/
  Boolean(val: DAnyable): DBoolField;
  /**@example: Date(val)	@external: Date(val:OTHER) -> DATE*/
  Date(val: DAnyable): DDateField;
  /**@example: Decimal(val)	@external: Decimal(val:OTHER) -> DECIMAL*/
  Decimal(val: DAnyable): DNumericField;
  /**@example: Double(val)	@external: Double(val:OTHER) -> DOUBLE*/
  Double(val: DAnyable): DNumericField;
  /**@example: Enum(val)	@external: Enum(val:OTHER) -> ENUM*/
  Enum(val: DAnyable): DAnyField;
  /**@example: Float(val)	@external: Float(val:OTHER) -> FLOAT*/
  Float(val: DAnyable): DNumericField;
  /**@example: Glob(val, matcher)	@external: Glob(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Glob(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: Hugeint(val)	@external: Hugeint(val:OTHER) -> HUGEINT*/
  Hugeint(val: DAnyable): DNumericField;
  /**@example: Ilike(val, matcher)	@external: Ilike(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Ilike(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: In(val, matcher)	@external: In(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  In(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: Integer(val)	@external: Integer(val:OTHER) -> INTEGER*/
  Integer(val: DAnyable): DNumericField;
  /**@example: Interval(val)	@external: Interval(val:OTHER) -> INTERVAL*/
  Interval(val: DAnyable): DAnyField;
  /**@example: IsNull(val)	@external: IsNull(val:ANY) -> BOOLEAN*/
  IsNull(val: DAnyable): DBoolField;
  /**@example: Json(val)	@external: Json(val:OTHER) -> JSON*/
  Json(val: DAnyable): DJsonField;
  /**@example: Like(val, matcher)	@external: Like(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Like(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: List(val)	@external: List(val:OTHER) -> LIST*/
  List(val: DAnyable): DArrayField;
  /**@example: Map(val)	@external: Map(val:OTHER) -> MAP*/
  Map(val: DAnyable): DAnyField;
  /**@example: NotBetween(val, col1, col2)	@external: NotBetween(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  NotBetween(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: Null(val)	@external: Null(val:OTHER) -> NULL*/
  Null(val: DAnyable): DAnyField;
  /**@example: SimilarTo(val, matcher)	@external: SimilarTo(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  SimilarTo(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: Smallint(val)	@external: Smallint(val:OTHER) -> SMALLINT*/
  Smallint(val: DAnyable): DNumericField;
  /**@example: Struct(val)	@external: Struct(val:OTHER) -> STRUCT*/
  Struct(val: DAnyable): DStructField;
  /**@example: Time(val)	@external: Time(val:OTHER) -> TIME*/
  Time(val: DAnyable): DDateField;
  /**@example: Timestamp(val)	@external: Timestamp(val:OTHER) -> TIMESTAMP*/
  Timestamp(val: DAnyable): DDateField;
  /**@example: Timestamp_ms(val)	@external: Timestamp_ms(val:OTHER) -> TIMESTAMP_MS*/
  Timestamp_ms(val: DAnyable): DDateField;
  /**@example: Timestamp_ns(val)	@external: Timestamp_ns(val:OTHER) -> TIMESTAMP_NS*/
  Timestamp_ns(val: DAnyable): DDateField;
  /**@example: Timestamp_s(val)	@external: Timestamp_s(val:OTHER) -> TIMESTAMP_S*/
  Timestamp_s(val: DAnyable): DDateField;
  /**@example: Tinyint(val)	@external: Tinyint(val:OTHER) -> TINYINT*/
  Tinyint(val: DAnyable): DNumericField;
  /**@example: Ubigint(val)	@external: Ubigint(val:OTHER) -> UBIGINT*/
  Ubigint(val: DAnyable): DNumericField;
  /**@example: Uhugeint(val)	@external: Uhugeint(val:OTHER) -> UHUGEINT*/
  Uhugeint(val: DAnyable): DNumericField;
  /**@example: Uinteger(val)	@external: Uinteger(val:OTHER) -> UINTEGER*/
  Uinteger(val: DAnyable): DNumericField;
  /**@example: Union(val)	@external: Union(val:OTHER) -> UNION*/
  Union(val: DAnyable): DAnyField;
  /**@example: Usmallint(val)	@external: Usmallint(val:OTHER) -> USMALLINT*/
  Usmallint(val: DAnyable): DNumericField;
  /**@example: Utinyint(val)	@external: Utinyint(val:OTHER) -> UTINYINT*/
  Utinyint(val: DAnyable): DNumericField;
  /**@example: Uuid(val)	@external: Uuid(val:OTHER) -> UUID*/
  Uuid(val: DAnyable): DAnyField;
  /**@example: Varchar(val)	@external: Varchar(val:OTHER) -> VARCHAR*/
  Varchar(val: DAnyable): DVarcharField;
  /**@example: Varint(val)	@external: Varint(val:OTHER) -> VARINT*/
  Varint(val: DAnyable): DAnyField;
  /**@description: Absolute value	@example: abs(-17.4)	@external: abs(x:BIGINT) -> BIGINT*/
  abs(x: DNumericable): DNumericField;
  /**@description: Computes the arccosine of x	@example: acos(0.5)	@external: acos(x:DOUBLE) -> DOUBLE*/
  acos(x: DNumericable): DNumericField;
  /**@description: Computes the inverse hyperbolic cos of x	@example: acosh(2.3)	@external: acosh(x:DOUBLE) -> DOUBLE*/
  acosh(x: DNumericable): DNumericField;
  /**@external: add(col0:ANY[], col1:ANY[]) -> ANY[]*/
  add(col0: DArrayable, col1: DArrayable): DArrayField<DAnyField>;
  /**@external: add(col0:BIGINT, col1: | BIGINT) -> BIGINT*/
  add(col0: DNumericable, col1?: DAnyable | DNumericable): DNumericField;
  /**@external: add(col0:DATE, col1:TIME WITH TIME ZONE | TIME | INTERVAL | INTEGER) -> TIMESTAMP WITH TIME ZONE*/
  add(col0: DDateable, col1: DDateable | DAnyable | DNumericable): DDateField;
  /**@external: add(col0:DECIMAL, col1:DECIMAL | ) -> DECIMAL*/
  add(col0: DNumericable, col1?: DNumericable | DAnyable): DNumericField;
  /**@external: add(col0:INTEGER, col1:DATE) -> DATE*/
  add(col0: DNumericable, col1: DDateable): DDateField;
  /**@external: add(col0:INTERVAL, col1:TIME WITH TIME ZONE | TIMESTAMP | TIME | DATE) -> TIME WITH TIME ZONE*/
  add(col0: DAnyable, col1: DDateable): DDateField;
  /**@external: add(col0:INTERVAL, col1:INTERVAL) -> INTERVAL*/
  add(col0: DAnyable, col1: DAnyable): DAnyField;
  /**@external: add(col0:TIME WITH TIME ZONE, col1:DATE | INTERVAL) -> TIMESTAMP WITH TIME ZONE*/
  add(col0: DDateable, col1: DDateable | DAnyable): DDateField;
  /**@external: add(col0:TIME, col1:INTERVAL | DATE) -> TIME*/
  add(col0: DDateable, col1: DAnyable | DDateable): DDateField;
  /**@external: add(col0:TIMESTAMP, col1:INTERVAL) -> TIMESTAMP*/
  add(col0: DDateable, col1: DAnyable): DDateField;
  /**@description: Subtract arguments, resulting in the time difference between the two timestamps	@example: age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')	@external: age(timestamp:TIMESTAMP WITH TIME ZONE, timestamp__01: | TIMESTAMP WITH TIME ZONE) -> INTERVAL*/
  age(timestamp: DDateable, timestamp__01?: DAnyable | DDateable): DAnyField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  aggregate(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns the name of a given expression	@example: alias(42 + 1)	@external: alias(expr:ANY) -> VARCHAR*/
  alias(expr: DAnyable): DVarcharField;
  /**@description: Returns the first non-null value from arg. This function is affected by ordering.	@external: any_value(arg:ANY) -> ANY*/
  any_value(arg: DAnyable): DAnyField;
  /**@description: Returns the first non-null value from arg. This function is affected by ordering.	@external: any_value(arg:DECIMAL) -> DECIMAL*/
  any_value(arg: DNumericable): DNumericField;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  apply(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Computes the approximate count of distinct elements using HyperLogLog.	@example: approx_count_distinct(A)	@external: approx_count_distinct(any:ANY) -> BIGINT*/
  approx_count_distinct(any: DAnyable): DNumericField;
  /**@description: Computes the approximate quantile using T-Digest.	@example: approx_quantile(x, 0.5)	@external: approx_quantile(x:DATE | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, pos:FLOAT) -> DATE*/
  approx_quantile(x: DDateable, pos: DNumericable): DDateField;
  /**@description: Computes the approximate quantile using T-Digest.	@example: approx_quantile(x, 0.5)	@external: approx_quantile(x:TIMESTAMP | DATE | TIME WITH TIME ZONE | TIME | DECIMAL | TINYINT | SMALLINT | INTEGER | BIGINT | HUGEINT | FLOAT | DOUBLE | TIMESTAMP WITH TIME ZONE, pos:FLOAT[]) -> TIMESTAMP[]*/
  approx_quantile(x: DDateable | DNumericable, pos: DArrayable): DArrayField<DDateField>;
  /**@description: Computes the approximate quantile using T-Digest.	@example: approx_quantile(x, 0.5)	@external: approx_quantile(x:DECIMAL | SMALLINT | INTEGER | BIGINT | HUGEINT | DOUBLE, pos:FLOAT) -> DECIMAL*/
  approx_quantile(x: DNumericable, pos: DNumericable): DNumericField;
  /**@description: Finds the k approximately most occurring values in the data set	@example: approx_top_k(x, 5)	@external: approx_top_k(val:ANY, k:BIGINT) -> ANY[]*/
  approx_top_k(val: DAnyable, k: DNumericable): DArrayField<DAnyField>;
  /**@description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@external: arbitrary(arg:ANY) -> ANY*/
  arbitrary(arg: DAnyable): DAnyField;
  /**@description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@external: arbitrary(arg:DECIMAL) -> DECIMAL*/
  arbitrary(arg: DNumericable): DNumericField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:DATE | TIMESTAMP WITH TIME ZONE | TIMESTAMP, val:BLOB | TIMESTAMP | TIMESTAMP WITH TIME ZONE | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT | INTEGER) -> DATE*/
  arg_max(arg: DDateable, val: DAnyable | DDateable | DVarcharable | DNumericable): DDateField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:ANY, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  arg_max(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  arg_max(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:DECIMAL | INTEGER | BIGINT | DOUBLE, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> DECIMAL*/
  arg_max(arg: DNumericable, val: DNumericable | DVarcharable | DDateable | DAnyable): DNumericField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:VARCHAR | BLOB, val:HUGEINT | DOUBLE | TIMESTAMP WITH TIME ZONE | BLOB | DATE | VARCHAR | BIGINT | INTEGER | TIMESTAMP) -> VARCHAR*/
  arg_max(arg: DVarcharable | DAnyable, val: DNumericable | DDateable | DAnyable | DVarcharable): DVarcharField;
  /**@description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@external: arg_max_null(arg:TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE, val:TIMESTAMP | INTEGER | BLOB | TIMESTAMP WITH TIME ZONE | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT) -> TIMESTAMP WITH TIME ZONE*/
  arg_max_null(arg: DDateable, val: DDateable | DNumericable | DAnyable | DVarcharable): DDateField;
  /**@description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@external: arg_max_null(arg:ANY, val:BIGINT | INTEGER | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  arg_max_null(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyField;
  /**@description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@external: arg_max_null(arg:INTEGER | DOUBLE | BIGINT | DECIMAL, val:HUGEINT | BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE | VARCHAR | DOUBLE | BIGINT | INTEGER) -> INTEGER*/
  arg_max_null(arg: DNumericable, val: DNumericable | DAnyable | DDateable | DVarcharable): DNumericField;
  /**@description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@external: arg_max_null(arg:VARCHAR | BLOB, val:BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT | INTEGER) -> VARCHAR*/
  arg_max_null(arg: DVarcharable | DAnyable, val: DAnyable | DDateable | DVarcharable | DNumericable): DVarcharField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:TIMESTAMP | DATE | TIMESTAMP WITH TIME ZONE, val:DATE | TIMESTAMP WITH TIME ZONE | INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | TIMESTAMP | BLOB) -> TIMESTAMP*/
  arg_min(arg: DDateable, val: DDateable | DNumericable | DVarcharable | DAnyable): DDateField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:ANY, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  arg_min(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  arg_min(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:INTEGER | BIGINT | DOUBLE | DECIMAL, val:VARCHAR | BIGINT | BLOB | INTEGER | HUGEINT | DOUBLE | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> INTEGER*/
  arg_min(arg: DNumericable, val: DVarcharable | DNumericable | DAnyable | DDateable): DNumericField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:VARCHAR | BLOB, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> VARCHAR*/
  arg_min(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DVarcharField;
  /**@description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@external: arg_min_null(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> DATE*/
  arg_min_null(arg: DDateable, val: DNumericable | DVarcharable | DDateable | DAnyable): DDateField;
  /**@description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@external: arg_min_null(arg:ANY, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  arg_min_null(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyField;
  /**@description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@external: arg_min_null(arg:INTEGER | DECIMAL | BIGINT | DOUBLE, val:BIGINT | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | INTEGER | HUGEINT | DOUBLE | VARCHAR | DATE) -> INTEGER*/
  arg_min_null(arg: DNumericable, val: DNumericable | DDateable | DAnyable | DVarcharable): DNumericField;
  /**@description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@external: arg_min_null(arg:VARCHAR | BLOB, val:BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | INTEGER) -> VARCHAR*/
  arg_min_null(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DVarcharField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> DATE*/
  argmax(arg: DDateable, val: DNumericable | DVarcharable | DDateable | DAnyable): DDateField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:ANY, val:VARCHAR | ANY | BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | INTEGER | BIGINT | HUGEINT | DOUBLE | DATE) -> ANY*/
  argmax(arg: DAnyable, val: DVarcharable | DAnyable | DDateable | DNumericable): DAnyField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  argmax(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:BIGINT | DOUBLE | INTEGER | DECIMAL, val:BLOB | INTEGER | TIMESTAMP WITH TIME ZONE | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT | TIMESTAMP) -> BIGINT*/
  argmax(arg: DNumericable, val: DAnyable | DNumericable | DDateable | DVarcharable): DNumericField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:VARCHAR | BLOB, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> VARCHAR*/
  argmax(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DVarcharField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:TIMESTAMP | DATE | TIMESTAMP WITH TIME ZONE, val:DOUBLE | DATE | INTEGER | BIGINT | HUGEINT | VARCHAR | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> TIMESTAMP*/
  argmin(arg: DDateable, val: DNumericable | DDateable | DVarcharable | DAnyable): DDateField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:ANY, val:DATE | TIMESTAMP | ANY | BLOB | INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | TIMESTAMP WITH TIME ZONE) -> ANY*/
  argmin(arg: DAnyable, val: DDateable | DAnyable | DNumericable | DVarcharable): DAnyField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  argmin(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:BIGINT | INTEGER | DOUBLE | DECIMAL, val:VARCHAR | INTEGER | BIGINT | HUGEINT | DOUBLE | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> BIGINT*/
  argmin(arg: DNumericable, val: DVarcharable | DNumericable | DDateable | DAnyable): DNumericField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:VARCHAR | BLOB, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> VARCHAR*/
  argmin(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DVarcharField;
  /**@description: Returns a LIST containing all the values of a column.	@example: list(A)	@external: array_agg(arg:ANY) -> LIST*/
  array_agg(arg: DAnyable): DArrayField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: array_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggr(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: array_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggregate(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: array_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_apply(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: array_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_cat(list1: DArrayable, list2: DArrayable): DArrayField<DAnyField>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: array_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_concat(list1: DArrayable, list2: DArrayable): DArrayField<DAnyField>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: array_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  array_contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_distance([1, 2, 3], [1, 2, 3])	@external: array_cosine_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_distance(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description: Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_similarity([1, 2, 3], [1, 2, 3])	@external: array_cosine_similarity(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_similarity(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description: Compute the cross product of two arrays of size 3. The array elements can not be NULL.	@example: array_cross_product([1, 2, 3], [1, 2, 3])	@external: array_cross_product(arr:DOUBLE[3], arr__01:DOUBLE[3]) -> DOUBLE[3]*/
  array_cross_product(arr: DArrayable, arr__01: DArrayable): DArrayField;
  /**@description: Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_distance([1, 2, 3], [1, 2, 3])	@external: array_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_distance(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@external: array_distinct(list:ANY[]) -> ANY[]*/
  array_distinct(list: DArrayable): DArrayField<DAnyField>;
  /**@description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@external: array_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_dot_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:ANY[], index:BIGINT) -> ANY*/
  array_extract(list: DArrayable, index: DNumericable): DAnyField;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:STRUCT, index:VARCHAR | BIGINT) -> ANY*/
  array_extract(list: DStructable, index: DVarcharable | DNumericable): DAnyField;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  array_extract(list: DVarcharable, index: DNumericable): DVarcharField;
  /**@description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@external: array_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_filter(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@external: array_grade_up(list:ANY[], col1: | VARCHAR, col2: | VARCHAR) -> ANY[]*/
  array_grade_up(list: DArrayable, col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: array_has(list:ANY[], element:ANY) -> BOOLEAN*/
  array_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@external: array_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@external: array_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: array_indexof(list:ANY[], element:ANY) -> INTEGER*/
  array_indexof(list: DArrayable, element: DAnyable): DNumericField;
  /**@description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@external: array_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_inner_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description: Returns the length of the list.	@example: array_length([1,2,3])	@external: array_length(list:ANY[], col1:BIGINT | ) -> BIGINT*/
  array_length(list: DArrayable, col1?: DNumericable | DAnyable): DNumericField;
  /**@description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: array_negative_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_dot_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: array_negative_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_inner_product(arr1: DArrayable, arr2: DArrayable): DNumericField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: array_position(list:ANY[], element:ANY) -> INTEGER*/
  array_position(list: DArrayable, element: DAnyable): DNumericField;
  /**@description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@external: array_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  array_reduce(list: DArrayable, lambda: DAnyable): DAnyField;
  /**@description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@external: array_resize(list:ANY[], size:ANY, value: | ANY) -> ANY[]*/
  array_resize(list: DArrayable, size: DAnyable, value?: DAnyable): DArrayField<DAnyField>;
  /**@description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@external: array_reverse_sort(list:ANY[], col1:VARCHAR | ) -> ANY[]*/
  array_reverse_sort(list: DArrayable, col1?: DVarcharable | DAnyable): DArrayField<DAnyField>;
  /**@description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@external: array_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  array_select(valueList: DArrayable, indexList: DArrayable): DArrayField<DAnyField>;
  /**@description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@external: array_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  array_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step?: DNumericable | DAnyable): DAnyField;
  /**@description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@external: array_sort(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  array_sort(list: DArrayable, col1?: DVarcharable | DAnyable, col2?: DVarcharable | DAnyable): DArrayField<DAnyField>;
  array_to_json(...vargs: DAnyable[]): DJsonField;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: array_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_transform(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@external: array_unique(list:ANY[]) -> UBIGINT*/
  array_unique(list: DArrayable): DNumericField;
  /**@description: Create an ARRAY containing the argument values.	@example: array_value(4, 5, 6)*/
  array_value(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@external: array_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  array_where(valueList: DArrayable, maskList: DArrayable): DArrayField<DAnyField>;
  /**@description: Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example: list_zip([1, 2], [3, 4], [5, 6])*/
  array_zip(...vargs: DAnyable[]): DArrayField<DStructField>;
  /**@description: Returns an integer that represents the Unicode code point of the first character of the string	@example: ascii('Ω')	@external: ascii(string:VARCHAR) -> INTEGER*/
  ascii(string: DVarcharable): DNumericField;
  /**@description: Computes the arcsine of x	@example: asin(0.5)	@external: asin(x:DOUBLE) -> DOUBLE*/
  asin(x: DNumericable): DNumericField;
  /**@description: Computes the inverse hyperbolic sin of x	@example: asinh(0.5)	@external: asinh(x:DOUBLE) -> DOUBLE*/
  asinh(x: DNumericable): DNumericField;
  /**@description: Computes the arctangent of x	@example: atan(0.5)	@external: atan(x:DOUBLE) -> DOUBLE*/
  atan(x: DNumericable): DNumericField;
  /**@description: Computes the arctangent (y, x)	@example: atan2(1.0, 0.0)	@external: atan2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  atan2(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Computes the inverse hyperbolic tan of x	@example: atanh(0.5)	@external: atanh(x:DOUBLE) -> DOUBLE*/
  atanh(x: DNumericable): DNumericField;
  /**@description: Calculates the average value for all tuples in x.	@example: SUM(x) / COUNT(*)	@external: avg(x:DOUBLE | HUGEINT | BIGINT | INTEGER | SMALLINT | DECIMAL) -> DOUBLE*/
  avg(x: DNumericable): DNumericField;
  /**@description: Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example: bar(5, 0, 20, 10)	@external: bar(x:DOUBLE, min:DOUBLE, max:DOUBLE, width:DOUBLE | ) -> VARCHAR*/
  bar(x: DNumericable, min: DNumericable, max: DNumericable, width?: DNumericable | DAnyable): DVarcharField;
  /**@description: Convert a blob to a base64 encoded string	@example: base64('A'::blob)	@external: base64(blob:BLOB) -> VARCHAR*/
  base64(blob: DAnyable): DVarcharField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:BIGINT) -> VARCHAR*/
  bin(value: DNumericable): DVarcharField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:VARCHAR) -> VARCHAR*/
  bin(value: DVarcharable): DVarcharField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:VARINT) -> VARCHAR*/
  bin(value: DAnyable): DVarcharField;
  /**@description: Returns the bitwise AND of all bits in a given expression.	@example: bit_and(A)	@external: bit_and(arg:BIT) -> BIT*/
  bit_and(arg: DAnyable): DAnyField;
  /**@description: Returns the bitwise AND of all bits in a given expression.	@example: bit_and(A)	@external: bit_and(arg:UINTEGER | TINYINT | USMALLINT | UHUGEINT | UBIGINT | UTINYINT | HUGEINT | BIGINT | INTEGER | SMALLINT) -> UINTEGER*/
  bit_and(arg: DNumericable): DNumericField;
  /**@description: Returns the number of bits that are set	@example: bit_count(31)	@external: bit_count(x:BIGINT) -> TINYINT*/
  bit_count(x: DNumericable): DNumericField;
  /**@description: Returns the number of bits that are set	@example: bit_count(31)	@external: bit_count(x:BIT) -> BIGINT*/
  bit_count(x: DAnyable): DNumericField;
  /**@external: bit_length(col0:BIT) -> BIGINT*/
  bit_length(col0: DAnyable): DNumericField;
  /**@external: bit_length(col0:VARCHAR) -> BIGINT*/
  bit_length(col0: DVarcharable): DNumericField;
  /**@description: Returns the bitwise OR of all bits in a given expression.	@example: bit_or(A)	@external: bit_or(arg:BIT) -> BIT*/
  bit_or(arg: DAnyable): DAnyField;
  /**@description: Returns the bitwise OR of all bits in a given expression.	@example: bit_or(A)	@external: bit_or(arg:SMALLINT | TINYINT | BIGINT | HUGEINT | UTINYINT | USMALLINT | UINTEGER | INTEGER | UBIGINT | UHUGEINT) -> SMALLINT*/
  bit_or(arg: DNumericable): DNumericField;
  /**@description: Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1	@example: bit_position('010'::BIT, '1110101'::BIT)	@external: bit_position(substring:BIT, bitstring:BIT) -> INTEGER*/
  bit_position(substring: DAnyable, bitstring: DAnyable): DNumericField;
  /**@description: Returns the bitwise XOR of all bits in a given expression.	@example: bit_xor(A)	@external: bit_xor(arg:BIT) -> BIT*/
  bit_xor(arg: DAnyable): DAnyField;
  /**@description: Returns the bitwise XOR of all bits in a given expression.	@example: bit_xor(A)	@external: bit_xor(arg:TINYINT | SMALLINT | BIGINT | HUGEINT | UTINYINT | USMALLINT | UINTEGER | UBIGINT | UHUGEINT | INTEGER) -> TINYINT*/
  bit_xor(arg: DNumericable): DNumericField;
  /**@description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@external: bitstring(bitstring:BIT, length:INTEGER) -> BIT*/
  bitstring(bitstring: DAnyable, length: DNumericable): DAnyField;
  /**@description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@external: bitstring(bitstring:VARCHAR, length:INTEGER) -> BIT*/
  bitstring(bitstring: DVarcharable, length: DNumericable): DAnyField;
  /**@description: Returns a bitstring with bits set for each distinct value.	@example: bitstring_agg(A)	@external: bitstring_agg(arg:SMALLINT | BIGINT | INTEGER | TINYINT | HUGEINT | UHUGEINT | UBIGINT | UINTEGER | USMALLINT | UTINYINT, col1:SMALLINT | BIGINT | INTEGER |  | TINYINT | UHUGEINT | UBIGINT | UINTEGER | USMALLINT | UTINYINT | HUGEINT, col2:SMALLINT | BIGINT | INTEGER |  | TINYINT | UHUGEINT | UBIGINT | UINTEGER | USMALLINT | UTINYINT | HUGEINT) -> BIT*/
  bitstring_agg(arg: DNumericable, col1?: DNumericable | DAnyable, col2?: DNumericable | DAnyable): DAnyField;
  /**@description: Returns TRUE if every input value is TRUE, otherwise FALSE.	@example: bool_and(A)	@external: bool_and(arg:BOOLEAN) -> BOOLEAN*/
  bool_and(arg: DBoolable): DBoolField;
  /**@description: Returns TRUE if any input value is TRUE, otherwise FALSE.	@example: bool_or(A)	@external: bool_or(arg:BOOLEAN) -> BOOLEAN*/
  bool_or(arg: DBoolable): DBoolField;
  /**@external: broadcast(col0:INET) -> INET*/
  broadcast(col0: DAnyable): DAnyField;
  /**@description: Whether or not we can implicitly cast from the source type to the other type	@example: can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)	@external: can_cast_implicitly(sourceType:ANY, targetType:ANY) -> BOOLEAN*/
  can_cast_implicitly(sourceType: DAnyable, targetType: DAnyable): DBoolField;
  /**@description: Returns the size of the map (or the number of entries in the map)	@example: cardinality( map([4, 2], ['a', 'b']) );	@external: cardinality(map:ANY) -> UBIGINT*/
  cardinality(map: DAnyable, ...vargs: DAnyable[]): DNumericField;
  /**@description: Returns the cube root of x	@example: cbrt(8)	@external: cbrt(x:DOUBLE) -> DOUBLE*/
  cbrt(x: DNumericable): DNumericField;
  /**@description: Rounds the number up	@example: ceil(17.4)	@external: ceil(x:DECIMAL) -> DECIMAL*/
  ceil(x: DNumericable): DNumericField;
  /**@description: Rounds the number up	@example: ceil(17.4)	@external: ceiling(x:DECIMAL) -> DECIMAL*/
  ceiling(x: DNumericable): DNumericField;
  /**@description: Extract the century component from a date or timestamp	@example: century(timestamp '2021-08-03 11:59:44.123456')	@external: century(ts:DATE) -> BIGINT*/
  century(ts: DDateable): DNumericField;
  /**@description: Extract the century component from a date or timestamp	@example: century(timestamp '2021-08-03 11:59:44.123456')	@external: century(ts:INTERVAL) -> BIGINT*/
  century(ts: DAnyable): DNumericField;
  /**@description: Returns a character which is corresponding the ASCII code value or Unicode code point	@example: chr(65)	@external: chr(codePoint:INTEGER) -> VARCHAR*/
  chr(codePoint: DNumericable): DVarcharField;
  /**@external: combine(col0:AGGREGATE_STATE<?>, col1:ANY) -> AGGREGATE_STATE<?>*/
  combine(col0: DAnyable, col1: DAnyable): DAnyField;
  /**@description: Concatenate many strings together.	@example: concat('Hello', ' ', 'World')	@external: concat(string:ANY) -> VARCHAR*/
  concat(string: DAnyable, ...vargs: DAnyable[]): DVarcharField;
  /**@description: Concatenate strings together separated by the specified separator.	@example: concat_ws(', ', 'Banana', 'Apple', 'Melon')	@external: concat_ws(separator:VARCHAR, string:ANY) -> VARCHAR*/
  concat_ws(separator: DVarcharable, string: DAnyable, ...vargs: DAnyable[]): DVarcharField;
  /**@description: If arg2 is NULL, return NULL. Otherwise, return arg1.	@example: constant_or_null(42, NULL)	@external: constant_or_null(arg1:ANY, arg2:ANY) -> ANY*/
  constant_or_null(arg1: DAnyable, arg2: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns true if the list contains the element.	@example: contains([1, 2, NULL], 1)	@external: contains(list:ANY[], element:ANY) -> BOOLEAN*/
  contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Checks if a map contains a given key.	@example: contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')	@external: contains(map:MAP(ANY, ANY), key:ANY) -> BOOLEAN*/
  contains(map: DAnyable, key: DAnyable): DBoolField;
  /**@description: Returns true if search_string is found within string.	@example: contains('abc', 'a')	@external: contains(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  contains(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description: Returns the correlation coefficient for non-null pairs in a group.	@example: COVAR_POP(y, x) / (STDDEV_POP(x) * STDDEV_POP(y))	@external: corr(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  corr(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Computes the cos of x	@example: cos(90)	@external: cos(x:DOUBLE) -> DOUBLE*/
  cos(x: DNumericable): DNumericField;
  /**@description: Computes the hyperbolic cos of x	@example: cosh(1)	@external: cosh(x:DOUBLE) -> DOUBLE*/
  cosh(x: DNumericable): DNumericField;
  /**@description: Computes the cotangent of x	@example: cot(0.5)	@external: cot(x:DOUBLE) -> DOUBLE*/
  cot(x: DNumericable): DNumericField;
  /**@example: count()*/
  count(): DNumericField;
  /**@description: Returns the number of non-null values in arg.	@example: count(A)	@external: count(arg:ANY | ) -> BIGINT*/
  count(arg?: DAnyable): DNumericField;
  /**@description: Counts the total number of TRUE values for a boolean column	@example: count_if(A)	@external: count_if(arg:BOOLEAN) -> HUGEINT*/
  count_if(arg: DBoolable): DNumericField;
  /**@description: Counts the total number of TRUE values for a boolean column	@example: count_if(A)	@external: countif(arg:BOOLEAN) -> HUGEINT*/
  countif(arg: DBoolable): DNumericField;
  /**@description: Returns the population covariance of input values.	@example: (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)	@external: covar_pop(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  covar_pop(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Returns the sample covariance for non-null pairs in a group.	@example: (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / (COUNT(*) - 1)	@external: covar_samp(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  covar_samp(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example: create_sort_key('A', 'DESC')	@external: create_sort_key(parameters:ANY) -> BLOB*/
  create_sort_key(parameters: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns the name of the currently active database	@example: current_database()*/
  current_database(): DVarcharField;
  /**@description: Returns the current query as a string	@example: current_query()*/
  current_query(): DVarcharField;
  /**@description: Returns the name of the currently active schema. Default is main	@example: current_schema()*/
  current_schema(): DVarcharField;
  /**@description: Returns list of schemas. Pass a parameter of True to include implicit schemas	@example: current_schemas(true)	@external: current_schemas(includeImplicit:BOOLEAN) -> VARCHAR[]*/
  current_schemas(includeImplicit: DBoolable): DArrayField<DVarcharField>;
  /**@description: Returns the current value of the configuration setting	@example: current_setting('access_mode')	@external: current_setting(settingName:VARCHAR) -> ANY*/
  current_setting(settingName: DVarcharable): DAnyField;
  /**@description: Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example: currval('my_sequence_name')	@external: currval(sequenceName:VARCHAR) -> BIGINT*/
  currval(sequenceName: DVarcharable): DNumericField;
  /**@description: Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example: damerau_levenshtein('hello', 'world')	@external: damerau_levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  damerau_levenshtein(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: date_diff(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP, enddate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP) -> BIGINT*/
  date_diff(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: date_part(ts:VARCHAR, col1:TIME | TIMESTAMP | DATE | INTERVAL | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_part(ts: DVarcharable, col1: DDateable | DAnyable): DNumericField;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: date_part(ts:VARCHAR[], col1:TIMESTAMP WITH TIME ZONE | DATE | INTERVAL | TIME | TIMESTAMP | TIME WITH TIME ZONE) -> STRUCT()*/
  date_part(ts: DArrayable, col1: DDateable | DAnyable): DStructField;
  /**@description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: date_sub(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP, enddate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP) -> BIGINT*/
  date_sub(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: date_trunc(part:VARCHAR, timestamp:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIMESTAMP*/
  date_trunc(part: DVarcharable, timestamp: DDateable): DDateField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: date_trunc(part:VARCHAR, timestamp:INTERVAL) -> INTERVAL*/
  date_trunc(part: DVarcharable, timestamp: DAnyable): DAnyField;
  /**@description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: datediff(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | TIMESTAMP | TIME | DATE, enddate:TIMESTAMP WITH TIME ZONE | TIMESTAMP | TIME | DATE) -> BIGINT*/
  datediff(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: datepart(ts:VARCHAR, col1:INTERVAL | DATE | TIME | TIMESTAMP | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datepart(ts: DVarcharable, col1: DAnyable | DDateable): DNumericField;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: datepart(ts:VARCHAR[], col1:TIMESTAMP | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE | DATE | TIME | INTERVAL) -> STRUCT()*/
  datepart(ts: DArrayable, col1: DDateable | DAnyable): DStructField;
  /**@description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: datesub(part:VARCHAR, startdate:TIME | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE, enddate:TIME | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE) -> BIGINT*/
  datesub(part: DVarcharable, startdate: DDateable, enddate: DDateable): DNumericField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: datetrunc(part:VARCHAR, timestamp:TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE) -> TIMESTAMP WITH TIME ZONE*/
  datetrunc(part: DVarcharable, timestamp: DDateable): DDateField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: datetrunc(part:VARCHAR, timestamp:INTERVAL) -> INTERVAL*/
  datetrunc(part: DVarcharable, timestamp: DAnyable): DAnyField;
  /**@description: Extract the day component from a date or timestamp	@example: day(timestamp '2021-08-03 11:59:44.123456')	@external: day(ts:DATE) -> BIGINT*/
  day(ts: DDateable): DNumericField;
  /**@description: Extract the day component from a date or timestamp	@example: day(timestamp '2021-08-03 11:59:44.123456')	@external: day(ts:INTERVAL) -> BIGINT*/
  day(ts: DAnyable): DNumericField;
  /**@description: The (English) name of the weekday	@example: dayname(TIMESTAMP '1992-03-22')	@external: dayname(ts:DATE) -> VARCHAR*/
  dayname(ts: DDateable): DVarcharField;
  /**@description: Extract the dayofmonth component from a date or timestamp	@example: dayofmonth(timestamp '2021-08-03 11:59:44.123456')	@external: dayofmonth(ts:DATE) -> BIGINT*/
  dayofmonth(ts: DDateable): DNumericField;
  /**@description: Extract the dayofmonth component from a date or timestamp	@example: dayofmonth(timestamp '2021-08-03 11:59:44.123456')	@external: dayofmonth(ts:INTERVAL) -> BIGINT*/
  dayofmonth(ts: DAnyable): DNumericField;
  /**@description: Extract the dayofweek component from a date or timestamp	@example: dayofweek(timestamp '2021-08-03 11:59:44.123456')	@external: dayofweek(ts:DATE) -> BIGINT*/
  dayofweek(ts: DDateable): DNumericField;
  /**@description: Extract the dayofweek component from a date or timestamp	@example: dayofweek(timestamp '2021-08-03 11:59:44.123456')	@external: dayofweek(ts:INTERVAL) -> BIGINT*/
  dayofweek(ts: DAnyable): DNumericField;
  /**@description: Extract the dayofyear component from a date or timestamp	@example: dayofyear(timestamp '2021-08-03 11:59:44.123456')	@external: dayofyear(ts:DATE) -> BIGINT*/
  dayofyear(ts: DDateable): DNumericField;
  /**@description: Extract the dayofyear component from a date or timestamp	@example: dayofyear(timestamp '2021-08-03 11:59:44.123456')	@external: dayofyear(ts:INTERVAL) -> BIGINT*/
  dayofyear(ts: DAnyable): DNumericField;
  /**@description: Extract the decade component from a date or timestamp	@example: decade(timestamp '2021-08-03 11:59:44.123456')	@external: decade(ts:DATE) -> BIGINT*/
  decade(ts: DDateable): DNumericField;
  /**@description: Extract the decade component from a date or timestamp	@example: decade(timestamp '2021-08-03 11:59:44.123456')	@external: decade(ts:INTERVAL) -> BIGINT*/
  decade(ts: DAnyable): DNumericField;
  /**@description: Convert blob to varchar. Fails if blob is not valid utf-8	@example: decode('\xC3\xBC'::BLOB)	@external: decode(blob:BLOB) -> VARCHAR*/
  decode(blob: DAnyable): DVarcharField;
  /**@description: Converts radians to degrees	@example: degrees(pi())	@external: degrees(x:DOUBLE) -> DOUBLE*/
  degrees(x: DNumericable): DNumericField;
  /**@external: divide(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  divide(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@external: editdist3(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  editdist3(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@external: element_at(map:ANY, key:ANY) -> ANY*/
  element_at(map: DAnyable, key: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Convert varchar to blob. Converts utf-8 characters into literal encoding	@example: encode('my_string_with_ü')	@external: encode(string:VARCHAR) -> BLOB*/
  encode(string: DVarcharable): DAnyField;
  /**@external: ends_with(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  ends_with(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description: Returns the log-2 entropy of count input-values.	@external: entropy(x:ANY) -> DOUBLE*/
  entropy(x: DAnyable): DNumericField;
  /**@description: Returns the numeric value backing the given enum value	@example: enum_code('happy'::mood)	@external: enum_code(enm:ANY) -> ANY*/
  enum_code(enm: DAnyable): DAnyField;
  /**@description: Returns the first value of the input enum type	@example: enum_first(NULL::mood)	@external: enum_first(enm:ANY) -> VARCHAR*/
  enum_first(enm: DAnyable): DVarcharField;
  /**@description: Returns the last value of the input enum type	@example: enum_last(NULL::mood)	@external: enum_last(enm:ANY) -> VARCHAR*/
  enum_last(enm: DAnyable): DVarcharField;
  /**@description: Returns all values of the input enum type as an array	@example: enum_range(NULL::mood)	@external: enum_range(enm:ANY) -> VARCHAR[]*/
  enum_range(enm: DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example: enum_range_boundary(NULL, 'happy'::mood)	@external: enum_range_boundary(start:ANY, end:ANY) -> VARCHAR[]*/
  enum_range_boundary(start: DAnyable, end: DAnyable): DArrayField<DVarcharField>;
  /**@description: Extract the epoch component from a temporal type	@example: epoch(timestamp '2021-08-03 11:59:44.123456')	@external: epoch(temporal:DATE) -> DOUBLE*/
  epoch(temporal: DDateable): DNumericField;
  /**@description: Extract the epoch component from a temporal type	@example: epoch(timestamp '2021-08-03 11:59:44.123456')	@external: epoch(temporal:INTERVAL) -> DOUBLE*/
  epoch(temporal: DAnyable): DNumericField;
  /**@description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ms(temporal:BIGINT) -> TIMESTAMP*/
  epoch_ms(temporal: DNumericable): DDateField;
  /**@description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ms(temporal:DATE) -> BIGINT*/
  epoch_ms(temporal: DDateable): DNumericField;
  /**@description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ms(temporal:INTERVAL) -> BIGINT*/
  epoch_ms(temporal: DAnyable): DNumericField;
  /**@description: Extract the epoch component in nanoseconds from a temporal type	@example: epoch_ns(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ns(temporal:DATE) -> BIGINT*/
  epoch_ns(temporal: DDateable): DNumericField;
  /**@description: Extract the epoch component in nanoseconds from a temporal type	@example: epoch_ns(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ns(temporal:INTERVAL) -> BIGINT*/
  epoch_ns(temporal: DAnyable): DNumericField;
  /**@description: Extract the epoch component in microseconds from a temporal type	@example: epoch_us(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_us(temporal:DATE) -> BIGINT*/
  epoch_us(temporal: DDateable): DNumericField;
  /**@description: Extract the epoch component in microseconds from a temporal type	@example: epoch_us(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_us(temporal:INTERVAL) -> BIGINT*/
  epoch_us(temporal: DAnyable): DNumericField;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:ANY, max:ANY, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(min: DAnyable, max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:BIGINT, max:BIGINT, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(min: DNumericable, max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:TIMESTAMP, max:TIMESTAMP, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(min: DDateable, max: DDateable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Extract the era component from a date or timestamp	@example: era(timestamp '2021-08-03 11:59:44.123456')	@external: era(ts:DATE) -> BIGINT*/
  era(ts: DDateable): DNumericField;
  /**@description: Extract the era component from a date or timestamp	@example: era(timestamp '2021-08-03 11:59:44.123456')	@external: era(ts:INTERVAL) -> BIGINT*/
  era(ts: DAnyable): DNumericField;
  /**@description: Throws the given error message	@example: error('access_mode')	@external: error(message:VARCHAR) -> "NULL"*/
  error(message: DVarcharable): DAnyField;
  /**@description: Rounds x to next even number by rounding away from zero	@example: even(2.9)	@external: even(x:DOUBLE) -> DOUBLE*/
  even(x: DNumericable): DNumericField;
  /**@external: excel_text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  excel_text(col0: DNumericable, col1: DVarcharable): DVarcharField;
  /**@description: Computes e to the power of x	@example: exp(1)	@external: exp(x:DOUBLE) -> DOUBLE*/
  exp(x: DNumericable): DNumericField;
  /**@description: Factorial of x. Computes the product of the current integer and all integers below it	@example: 4!	@external: factorial(x:INTEGER) -> HUGEINT*/
  factorial(x: DNumericable): DNumericField;
  /**@external: family(col0:INET) -> UTINYINT*/
  family(col0: DAnyable): DNumericField;
  /**@description: Calculates the average using a more accurate floating point summation (Kahan Sum)	@example: favg(A)	@external: favg(x:DOUBLE) -> DOUBLE*/
  favg(x: DNumericable): DNumericField;
  /**@description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@external: filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  filter(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@external: finalize(col0:AGGREGATE_STATE<?>) -> INVALID*/
  finalize(col0: DAnyable): DAnyField;
  /**@description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@external: first(arg:ANY) -> ANY*/
  first(arg: DAnyable): DAnyField;
  /**@description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@external: first(arg:DECIMAL) -> DECIMAL*/
  first(arg: DNumericable): DNumericField;
  /**@description: Flatten a nested list by one level	@example: flatten([[1, 2, 3], [4, 5]])	@external: flatten(nestedList:ANY[][]) -> ANY[]*/
  flatten(nestedList: DArrayable): DArrayField<DAnyField>;
  /**@description: Rounds the number down	@example: floor(17.4)	@external: floor(x:DECIMAL) -> DECIMAL*/
  floor(x: DNumericable): DNumericField;
  /**@description: Formats a string using fmt syntax	@example: format('Benchmark "{}" took {} seconds', 'CSV', 42)	@external: format(format:VARCHAR) -> VARCHAR*/
  format(format: DVarcharable, ...vargs: DAnyable[]): DVarcharField;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example: format_bytes(1000 * 16)	@external: formatReadableDecimalSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableDecimalSize(bytes: DNumericable): DVarcharField;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@external: formatReadableSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableSize(bytes: DNumericable): DVarcharField;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@external: format_bytes(bytes:BIGINT) -> VARCHAR*/
  format_bytes(bytes: DNumericable): DVarcharField;
  /**@description: Convert a base64 encoded string to a character string	@example: from_base64('QQ==')	@external: from_base64(string:VARCHAR) -> BLOB*/
  from_base64(string: DVarcharable): DAnyField;
  /**@description: Converts a value from binary representation to a blob	@example: unbin('0110')	@external: from_binary(value:VARCHAR) -> BLOB*/
  from_binary(value: DVarcharable): DAnyField;
  /**@description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@external: from_hex(value:VARCHAR) -> BLOB*/
  from_hex(value: DVarcharable): DAnyField;
  /**@external: from_json(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json(col0: DJsonable, col1: DVarcharable): DAnyField;
  /**@external: from_json(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json(col0: DVarcharable, col1: DVarcharable): DAnyField;
  /**@external: from_json_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  /**@external: from_json_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  /**@description: Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example: kahan_sum(A)	@external: fsum(arg:DOUBLE) -> DOUBLE*/
  fsum(arg: DNumericable): DNumericField;
  /**@description: Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example: gamma(5.5)	@external: gamma(x:DOUBLE) -> DOUBLE*/
  gamma(x: DNumericable): DNumericField;
  /**@description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@external: gcd(x:BIGINT, y:BIGINT) -> BIGINT*/
  gcd(x: DNumericable, y: DNumericable): DNumericField;
  /**@description: Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example: uuid()*/
  gen_random_uuid(): DAnyField;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:BIGINT, stop: | BIGINT, step: | BIGINT) -> BIGINT[]*/
  generate_series(start: DNumericable, stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  generate_series(start: DDateable, stop: DDateable, step: DAnyable): DArrayField;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:TIMESTAMP, stop:TIMESTAMP, step:INTERVAL) -> TIMESTAMP[]*/
  generate_series(start: DDateable, stop: DDateable, step: DAnyable): DArrayField<DDateField>;
  /**@description: Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0	@example: get_bit('0110010'::BIT, 2)	@external: get_bit(bitstring:BIT, index:INTEGER) -> INTEGER*/
  get_bit(bitstring: DAnyable, index: DNumericable): DNumericField;
  /**@description: Returns the current timestamp	@example: get_current_timestamp()*/
  get_current_timestamp(): DDateField;
  /**@external: getvariable(col0:VARCHAR) -> ANY*/
  getvariable(col0: DVarcharable): DAnyField;
  /**@description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@external: grade_up(list:ANY[], col1: | VARCHAR, col2: | VARCHAR) -> ANY[]*/
  grade_up(list: DArrayable, col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**@description: Returns the highest value of the set of input parameters	@example: greatest(42, 84)	@external: greatest(arg1:ANY) -> ANY*/
  greatest(arg1: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@external: greatest_common_divisor(x:BIGINT, y:BIGINT) -> BIGINT*/
  greatest_common_divisor(x: DNumericable, y: DNumericable): DNumericField;
  /**@description: Concatenates the column string values with an optional separator.	@example: string_agg(A, '-')	@external: group_concat(str:ANY, arg:VARCHAR | ) -> VARCHAR*/
  group_concat(str: DAnyable, arg?: DVarcharable | DAnyable): DVarcharField;
  /**@external: h3_are_neighbor_cells(col0:BIGINT, col1:BIGINT) -> BOOLEAN*/
  h3_are_neighbor_cells(col0: DNumericable, col1: DNumericable): DBoolField;
  /**@external: h3_are_neighbor_cells(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  h3_are_neighbor_cells(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@external: h3_cell_area(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col0: DNumericable, col1: DVarcharable): DNumericField;
  /**@external: h3_cell_area(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col0: DVarcharable, col1: DVarcharable): DNumericField;
  /**@external: h3_cell_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_cell_to_boundary_wkt(col0: DNumericable): DVarcharField;
  /**@external: h3_cell_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_cell_to_boundary_wkt(col0: DVarcharable): DVarcharField;
  /**@external: h3_cell_to_center_child(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_center_child(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_center_child(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_center_child(col0: DVarcharable, col1: DNumericable): DVarcharField;
  /**@external: h3_cell_to_child_pos(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_child_pos(col0:VARCHAR, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col0: DVarcharable, col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_children(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_cell_to_children(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_children(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_cell_to_children(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_cell_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lat(col0: DNumericable): DNumericField;
  /**@external: h3_cell_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lat(col0: DVarcharable): DNumericField;
  /**@external: h3_cell_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_cell_to_latlng(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_cell_to_latlng(col0: DVarcharable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lng(col0: DNumericable): DNumericField;
  /**@external: h3_cell_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lng(col0: DVarcharable): DNumericField;
  /**@external: h3_cell_to_local_ij(col0:BIGINT, col1:BIGINT) -> INTEGER[]*/
  h3_cell_to_local_ij(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_local_ij(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_local_ij(col0: DVarcharable, col1: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_cell_to_parent(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_parent(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_parent(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_parent(col0: DVarcharable, col1: DNumericable): DVarcharField;
  /**@external: h3_cell_to_vertex(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_vertex(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@external: h3_cell_to_vertex(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_vertex(col0: DVarcharable, col1: DNumericable): DVarcharField;
  /**@external: h3_cell_to_vertexes(col0:BIGINT) -> BIGINT[]*/
  h3_cell_to_vertexes(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_vertexes(col0:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_vertexes(col0: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_cells_to_directed_edge(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_cells_to_directed_edge(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@external: h3_cells_to_directed_edge(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  h3_cells_to_directed_edge(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  /**@external: h3_cells_to_multi_polygon_wkt(col0:BIGINT[]) -> VARCHAR*/
  h3_cells_to_multi_polygon_wkt(col0: DArrayable): DVarcharField;
  /**@external: h3_child_pos_to_cell(col0:BIGINT, col1:BIGINT | UBIGINT, col2:INTEGER) -> BIGINT*/
  h3_child_pos_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): DNumericField;
  /**@external: h3_child_pos_to_cell(col0:BIGINT, col1:VARCHAR, col2:INTEGER) -> VARCHAR*/
  h3_child_pos_to_cell(col0: DNumericable, col1: DVarcharable, col2: DNumericable): DVarcharField;
  /**@external: h3_compact_cells(col0:BIGINT[]) -> BIGINT[]*/
  h3_compact_cells(col0: DArrayable): DArrayField<DNumericField>;
  /**@external: h3_compact_cells(col0:VARCHAR[]) -> VARCHAR[]*/
  h3_compact_cells(col0: DArrayable): DArrayField<DVarcharField>;
  /**@external: h3_directed_edge_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(col0: DNumericable): DVarcharField;
  /**@external: h3_directed_edge_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(col0: DVarcharable): DVarcharField;
  /**@external: h3_directed_edge_to_cells(col0:BIGINT) -> UBIGINT[]*/
  h3_directed_edge_to_cells(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_directed_edge_to_cells(col0:VARCHAR) -> VARCHAR[]*/
  h3_directed_edge_to_cells(col0: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_edge_length(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col0: DNumericable, col1: DVarcharable): DNumericField;
  /**@external: h3_edge_length(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col0: DVarcharable, col1: DVarcharable): DNumericField;
  /**@external: h3_get_base_cell_number(col0:BIGINT) -> INTEGER*/
  h3_get_base_cell_number(col0: DNumericable): DNumericField;
  /**@external: h3_get_base_cell_number(col0:VARCHAR) -> INTEGER*/
  h3_get_base_cell_number(col0: DVarcharable): DNumericField;
  /**@external: h3_get_directed_edge_destination(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_destination(col0: DNumericable): DNumericField;
  /**@external: h3_get_directed_edge_destination(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_destination(col0: DVarcharable): DVarcharField;
  /**@external: h3_get_directed_edge_origin(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_origin(col0: DNumericable): DNumericField;
  /**@external: h3_get_directed_edge_origin(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_origin(col0: DVarcharable): DVarcharField;
  /**@external: h3_get_hexagon_area_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_area_avg(col0: DNumericable, col1: DVarcharable): DNumericField;
  /**@external: h3_get_hexagon_edge_length_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_edge_length_avg(col0: DNumericable, col1: DVarcharable): DNumericField;
  /**@external: h3_get_icosahedron_faces(col0:BIGINT) -> INTEGER[]*/
  h3_get_icosahedron_faces(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_get_icosahedron_faces(col0:VARCHAR) -> INTEGER[]*/
  h3_get_icosahedron_faces(col0: DVarcharable): DArrayField<DNumericField>;
  /**@external: h3_get_num_cells(col0:INTEGER) -> BIGINT*/
  h3_get_num_cells(col0: DNumericable): DNumericField;
  /**@external: h3_get_pentagons(col0:INTEGER) -> UBIGINT[]*/
  h3_get_pentagons(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_get_pentagons_string(col0:INTEGER) -> VARCHAR[]*/
  h3_get_pentagons_string(col0: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_get_resolution(col0:BIGINT) -> INTEGER*/
  h3_get_resolution(col0: DNumericable): DNumericField;
  /**@external: h3_get_resolution(col0:VARCHAR) -> INTEGER*/
  h3_get_resolution(col0: DVarcharable): DNumericField;
  /**@external: h3_great_circle_distance(col0:DOUBLE, col1:DOUBLE, col2:DOUBLE, col3:DOUBLE, col4:VARCHAR) -> DOUBLE*/
  h3_great_circle_distance(col0: DNumericable, col1: DNumericable, col2: DNumericable, col3: DNumericable, col4: DVarcharable): DNumericField;
  /**@external: h3_grid_disk(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_disk(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_grid_disk_distances(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances(col0: DNumericable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances(col0: DVarcharable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_safe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_safe(col0: DNumericable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_safe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_safe(col0: DVarcharable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_unsafe(col0: DNumericable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk_unsafe(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_disk_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_grid_distance(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_grid_distance(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@external: h3_grid_distance(col0:VARCHAR, col1:VARCHAR) -> BIGINT*/
  h3_grid_distance(col0: DVarcharable, col1: DVarcharable): DNumericField;
  /**@external: h3_grid_path_cells(col0:BIGINT, col1:BIGINT) -> BIGINT[]*/
  h3_grid_path_cells(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_path_cells(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_grid_path_cells(col0: DVarcharable, col1: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_grid_ring_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_ring_unsafe(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_ring_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_ring_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_h3_to_string(col0:BIGINT) -> VARCHAR*/
  h3_h3_to_string(col0: DNumericable): DVarcharField;
  /**@external: h3_is_pentagon(col0:BIGINT) -> BOOLEAN*/
  h3_is_pentagon(col0: DNumericable): DBoolField;
  /**@external: h3_is_pentagon(col0:VARCHAR) -> BOOLEAN*/
  h3_is_pentagon(col0: DVarcharable): DBoolField;
  /**@external: h3_is_res_class_iii(col0:BIGINT) -> BOOLEAN*/
  h3_is_res_class_iii(col0: DNumericable): DBoolField;
  /**@external: h3_is_res_class_iii(col0:VARCHAR) -> BOOLEAN*/
  h3_is_res_class_iii(col0: DVarcharable): DBoolField;
  /**@external: h3_is_valid_cell(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_cell(col0: DNumericable): DBoolField;
  /**@external: h3_is_valid_cell(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_cell(col0: DVarcharable): DBoolField;
  /**@external: h3_is_valid_directed_edge(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_directed_edge(col0: DNumericable): DBoolField;
  /**@external: h3_is_valid_directed_edge(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_directed_edge(col0: DVarcharable): DBoolField;
  /**@external: h3_is_valid_vertex(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_vertex(col0: DNumericable): DBoolField;
  /**@external: h3_is_valid_vertex(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_vertex(col0: DVarcharable): DBoolField;
  /**@external: h3_latlng_to_cell(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> UBIGINT*/
  h3_latlng_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): DNumericField;
  /**@external: h3_latlng_to_cell_string(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> VARCHAR*/
  h3_latlng_to_cell_string(col0: DNumericable, col1: DNumericable, col2: DNumericable): DVarcharField;
  /**@external: h3_local_ij_to_cell(col0:BIGINT, col1:INTEGER, col2:INTEGER) -> BIGINT*/
  h3_local_ij_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): DNumericField;
  /**@external: h3_local_ij_to_cell(col0:VARCHAR, col1:INTEGER, col2:INTEGER) -> VARCHAR*/
  h3_local_ij_to_cell(col0: DVarcharable, col1: DNumericable, col2: DNumericable): DVarcharField;
  /**@external: h3_origin_to_directed_edges(col0:BIGINT) -> UBIGINT[]*/
  h3_origin_to_directed_edges(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_origin_to_directed_edges(col0:VARCHAR) -> VARCHAR[]*/
  h3_origin_to_directed_edges(col0: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_polygon_wkt_to_cells(col0:VARCHAR, col1:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells(col0: DVarcharable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_polygon_wkt_to_cells_experimental(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells_experimental(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_polygon_wkt_to_cells_experimental_string(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_experimental_string(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_polygon_wkt_to_cells_string(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_string(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_string_to_h3(col0:VARCHAR) -> UBIGINT*/
  h3_string_to_h3(col0: DVarcharable): DNumericField;
  /**@external: h3_uncompact_cells(col0:BIGINT[], col1:INTEGER) -> BIGINT[]*/
  h3_uncompact_cells(col0: DArrayable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_uncompact_cells(col0:VARCHAR[], col1:INTEGER) -> VARCHAR[]*/
  h3_uncompact_cells(col0: DArrayable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_vertex_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lat(col0: DNumericable): DNumericField;
  /**@external: h3_vertex_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lat(col0: DVarcharable): DNumericField;
  /**@external: h3_vertex_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_vertex_to_latlng(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_vertex_to_latlng(col0: DVarcharable): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lng(col0: DNumericable): DNumericField;
  /**@external: h3_vertex_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lng(col0: DVarcharable): DNumericField;
  /**@description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@external: hamming(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  hamming(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description: Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example: hash('🦆')	@external: hash(param:ANY) -> UBIGINT*/
  hash(param: DAnyable, ...vargs: DAnyable[]): DNumericField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:BIGINT) -> VARCHAR*/
  hex(value: DNumericable): DVarcharField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:BLOB) -> VARCHAR*/
  hex(value: DAnyable): DVarcharField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:VARCHAR) -> VARCHAR*/
  hex(value: DVarcharable): DVarcharField;
  /**@description: Returns a LIST of STRUCTs with the fields bucket and count.	@example: histogram(A)	@external: histogram(arg:ANY, col1: | ANY[]) -> MAP*/
  histogram(arg: DAnyable, col1?: DAnyable | DArrayable): DAnyField;
  /**@description: Returns a LIST of STRUCTs with the fields bucket and count matching the buckets exactly.	@example: histogram_exact(A, [0, 1, 2])	@external: histogram_exact(arg:ANY, bins:ANY[]) -> MAP*/
  histogram_exact(arg: DAnyable, bins: DArrayable): DAnyField;
  /**@external: host(col0:INET) -> VARCHAR*/
  host(col0: DAnyable): DVarcharField;
  /**@description: Extract the hour component from a date or timestamp	@example: hour(timestamp '2021-08-03 11:59:44.123456')	@external: hour(ts:DATE) -> BIGINT*/
  hour(ts: DDateable): DNumericField;
  /**@description: Extract the hour component from a date or timestamp	@example: hour(timestamp '2021-08-03 11:59:44.123456')	@external: hour(ts:INTERVAL) -> BIGINT*/
  hour(ts: DAnyable): DNumericField;
  /**@external: html_escape(col0:VARCHAR, col1: | BOOLEAN) -> VARCHAR*/
  html_escape(col0: DVarcharable, col1?: DAnyable | DBoolable): DVarcharField;
  /**@external: html_unescape(col0:VARCHAR) -> VARCHAR*/
  html_unescape(col0: DVarcharable): DVarcharField;
  /**@external: icu_sort_key(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  icu_sort_key(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  /**@description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: ilike_escape('A%c', 'a$%C', '$')	@external: ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns whether or not the database/schema are in the search path	@example: in_search_path('memory', 'main')	@external: in_search_path(databaseName:VARCHAR, schemaName:VARCHAR) -> BOOLEAN*/
  in_search_path(databaseName: DVarcharable, schemaName: DVarcharable): DBoolField;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: instr(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  instr(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  /**@description: Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example: is_histogram_other_bin(v)	@external: is_histogram_other_bin(val:ANY) -> BOOLEAN*/
  is_histogram_other_bin(val: DAnyable): DBoolField;
  /**@description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@external: isfinite(x:DATE) -> BOOLEAN*/
  isfinite(x: DDateable): DBoolField;
  /**@description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@external: isfinite(x:DOUBLE) -> BOOLEAN*/
  isfinite(x: DNumericable): DBoolField;
  /**@description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@external: isinf(x:DATE) -> BOOLEAN*/
  isinf(x: DDateable): DBoolField;
  /**@description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@external: isinf(x:DOUBLE) -> BOOLEAN*/
  isinf(x: DNumericable): DBoolField;
  /**@description: Returns true if the floating point value is not a number, false otherwise	@example: isnan('NaN'::FLOAT)	@external: isnan(x:DOUBLE) -> BOOLEAN*/
  isnan(x: DNumericable): DBoolField;
  /**@description: Extract the isodow component from a date or timestamp	@example: isodow(timestamp '2021-08-03 11:59:44.123456')	@external: isodow(ts:DATE) -> BIGINT*/
  isodow(ts: DDateable): DNumericField;
  /**@description: Extract the isodow component from a date or timestamp	@example: isodow(timestamp '2021-08-03 11:59:44.123456')	@external: isodow(ts:INTERVAL) -> BIGINT*/
  isodow(ts: DAnyable): DNumericField;
  /**@description: Extract the isoyear component from a date or timestamp	@example: isoyear(timestamp '2021-08-03 11:59:44.123456')	@external: isoyear(ts:DATE) -> BIGINT*/
  isoyear(ts: DDateable): DNumericField;
  /**@description: Extract the isoyear component from a date or timestamp	@example: isoyear(timestamp '2021-08-03 11:59:44.123456')	@external: isoyear(ts:INTERVAL) -> BIGINT*/
  isoyear(ts: DAnyable): DNumericField;
  /**@description: The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaccard('duck','luck')	@external: jaccard(str1:VARCHAR, str2:VARCHAR) -> DOUBLE*/
  jaccard(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description: The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_similarity('duck', 'duckdb', 0.5)	@external: jaro_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DNumericable | DAnyable): DNumericField;
  /**@description: The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_winkler_similarity('duck', 'duckdb', 0.5)	@external: jaro_winkler_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_winkler_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DNumericable | DAnyable): DNumericField;
  /**@external: json_array_length(col0:JSON, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col0: DJsonable, col1: DArrayable): DArrayField<DNumericField>;
  /**@external: json_array_length(col0:JSON, col1:VARCHAR | ) -> UBIGINT*/
  json_array_length(col0: DJsonable, col1?: DVarcharable | DAnyable): DNumericField;
  /**@external: json_array_length(col0:VARCHAR, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col0: DVarcharable, col1: DArrayable): DArrayField<DNumericField>;
  /**@external: json_array_length(col0:VARCHAR, col1: | VARCHAR) -> UBIGINT*/
  json_array_length(col0: DVarcharable, col1?: DAnyable | DVarcharable): DNumericField;
  /**@external: json_contains(col0:JSON, col1:VARCHAR | JSON) -> BOOLEAN*/
  json_contains(col0: DJsonable, col1: DVarcharable | DJsonable): DBoolField;
  /**@external: json_contains(col0:VARCHAR, col1:VARCHAR | JSON) -> BOOLEAN*/
  json_contains(col0: DVarcharable, col1: DVarcharable | DJsonable): DBoolField;
  /**@external: json_deserialize_sql(col0:JSON) -> VARCHAR*/
  json_deserialize_sql(col0: DJsonable): DVarcharField;
  /**@external: json_exists(col0:JSON, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col0: DJsonable, col1: DArrayable): DArrayField<DBoolField>;
  /**@external: json_exists(col0:JSON, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col0: DJsonable, col1: DVarcharable): DBoolField;
  /**@external: json_exists(col0:VARCHAR, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col0: DVarcharable, col1: DArrayable): DArrayField<DBoolField>;
  /**@external: json_exists(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@external: json_extract(col0:JSON, col1:VARCHAR | BIGINT) -> JSON*/
  json_extract(col0: DJsonable, col1: DVarcharable | DNumericable): DJsonField;
  /**@external: json_extract(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col0: DJsonable, col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract(col0:VARCHAR, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  /**@external: json_extract(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col0: DVarcharable, col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path(col0:JSON, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract_path(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  /**@external: json_extract_path(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col0: DJsonable, col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path(col0:VARCHAR, col1:VARCHAR | BIGINT) -> JSON*/
  json_extract_path(col0: DVarcharable, col1: DVarcharable | DNumericable): DJsonField;
  /**@external: json_extract_path(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col0: DVarcharable, col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path_text(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_path_text(col0:JSON, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col0: DJsonable, col1: DNumericable | DVarcharable): DVarcharField;
  /**@external: json_extract_path_text(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_path_text(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col0: DVarcharable, col1: DNumericable | DVarcharable): DVarcharField;
  /**@external: json_extract_string(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_string(col0:JSON, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_extract_string(col0: DJsonable, col1: DVarcharable | DNumericable): DVarcharField;
  /**@external: json_extract_string(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_string(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_string(col0: DVarcharable, col1: DNumericable | DVarcharable): DVarcharField;
  /**@external: json_keys(col0:JSON, col1: | VARCHAR | VARCHAR[]) -> VARCHAR[]*/
  json_keys(col0: DJsonable, col1?: DAnyable | DVarcharable | DArrayable): DArrayField<DVarcharField>;
  /**@external: json_keys(col0:VARCHAR, col1: | VARCHAR | VARCHAR[]) -> VARCHAR[]*/
  json_keys(col0: DVarcharable, col1?: DAnyable | DVarcharable | DArrayable): DArrayField<DVarcharField>;
  /**@external: json_pretty(col0:JSON) -> VARCHAR*/
  json_pretty(col0: DJsonable): DVarcharField;
  /**@external: json_serialize_plan(col0:VARCHAR, col1:BOOLEAN | , col2:BOOLEAN | , col3:BOOLEAN | , col4:BOOLEAN | ) -> JSON*/
  json_serialize_plan(col0: DVarcharable, col1?: DBoolable | DAnyable, col2?: DBoolable | DAnyable, col3?: DBoolable | DAnyable, col4?: DBoolable | DAnyable): DJsonField;
  /**@external: json_serialize_sql(col0:VARCHAR, col1:BOOLEAN | , col2: | BOOLEAN, col3: | BOOLEAN) -> JSON*/
  json_serialize_sql(col0: DVarcharable, col1?: DBoolable | DAnyable, col2?: DAnyable | DBoolable, col3?: DAnyable | DBoolable): DJsonField;
  /**@external: json_structure(col0:JSON) -> JSON*/
  json_structure(col0: DJsonable): DJsonField;
  /**@external: json_structure(col0:VARCHAR) -> JSON*/
  json_structure(col0: DVarcharable): DJsonField;
  /**@external: json_transform(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform(col0: DJsonable, col1: DVarcharable): DAnyField;
  /**@external: json_transform(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform(col0: DVarcharable, col1: DVarcharable): DAnyField;
  /**@external: json_transform_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform_strict(col0: DJsonable, col1: DVarcharable): DAnyField;
  /**@external: json_transform_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform_strict(col0: DVarcharable, col1: DVarcharable): DAnyField;
  /**@external: json_type(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_type(col0:JSON, col1: | VARCHAR) -> VARCHAR*/
  json_type(col0: DJsonable, col1?: DAnyable | DVarcharable): DVarcharField;
  /**@external: json_type(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_type(col0:VARCHAR, col1: | VARCHAR) -> VARCHAR*/
  json_type(col0: DVarcharable, col1?: DAnyable | DVarcharable): DVarcharField;
  /**@external: json_valid(col0:JSON) -> BOOLEAN*/
  json_valid(col0: DJsonable): DBoolField;
  /**@external: json_valid(col0:VARCHAR) -> BOOLEAN*/
  json_valid(col0: DVarcharable): DBoolField;
  /**@external: json_value(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_value(col0:JSON, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_value(col0: DJsonable, col1: DVarcharable | DNumericable): DVarcharField;
  /**@external: json_value(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_value(col0:VARCHAR, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_value(col0: DVarcharable, col1: DVarcharable | DNumericable): DVarcharField;
  /**@description: Extract the Julian Day number from a date or timestamp	@example: julian(timestamp '2006-01-01 12:00')	@external: julian(ts:DATE) -> DOUBLE*/
  julian(ts: DDateable): DNumericField;
  /**@description: Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example: kahan_sum(A)	@external: kahan_sum(arg:DOUBLE) -> DOUBLE*/
  kahan_sum(arg: DNumericable): DNumericField;
  /**@description: Returns the excess kurtosis (Fisher’s definition) of all input values, with a bias correction according to the sample size	@external: kurtosis(x:DOUBLE) -> DOUBLE*/
  kurtosis(x: DNumericable): DNumericField;
  /**@description: Returns the excess kurtosis (Fisher’s definition) of all input values, without bias correction	@external: kurtosis_pop(x:DOUBLE) -> DOUBLE*/
  kurtosis_pop(x: DNumericable): DNumericField;
  /**@description: Returns the last value of a column. This function is affected by ordering.	@example: last(A)	@external: last(arg:ANY) -> ANY*/
  last(arg: DAnyable): DAnyField;
  /**@description: Returns the last value of a column. This function is affected by ordering.	@example: last(A)	@external: last(arg:DECIMAL) -> DECIMAL*/
  last(arg: DNumericable): DNumericField;
  /**@description: Returns the last day of the month	@example: last_day(TIMESTAMP '1992-03-22 01:02:03.1234')	@external: last_day(ts:DATE) -> DATE*/
  last_day(ts: DDateable): DDateField;
  /**@description: Convert string to lower case	@example: lower('Hello')	@external: lcase(string:VARCHAR) -> VARCHAR*/
  lcase(string: DVarcharable): DVarcharField;
  /**@description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@external: lcm(x:BIGINT, y:BIGINT) -> BIGINT*/
  lcm(x: DNumericable, y: DNumericable): DNumericField;
  /**@description: Returns the lowest value of the set of input parameters	@example: least(42, 84)	@external: least(arg1:ANY) -> ANY*/
  least(arg1: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@external: least_common_multiple(x:BIGINT, y:BIGINT) -> BIGINT*/
  least_common_multiple(x: DNumericable, y: DNumericable): DNumericField;
  /**@description: Extract the left-most count characters	@example: left('Hello🦆', 2)	@external: left(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description: Extract the left-most count grapheme clusters	@example: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@external: left_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left_grapheme(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: len(string:ANY[]) -> BIGINT*/
  len(string: DArrayable): DNumericField;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: len(string:BIT) -> BIGINT*/
  len(string: DAnyable): DNumericField;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: len(string:VARCHAR) -> BIGINT*/
  len(string: DVarcharable): DNumericField;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: length(string:ANY[]) -> BIGINT*/
  length(string: DArrayable): DNumericField;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: length(string:BIT) -> BIGINT*/
  length(string: DAnyable): DNumericField;
  /**@description: Number of grapheme clusters in string.	@example: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')	@external: length_grapheme(string:VARCHAR) -> BIGINT*/
  length_grapheme(string: DVarcharable): DNumericField;
  /**@description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@external: levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  levenshtein(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@description: Computes the log of the gamma function	@example: lgamma(2)	@external: lgamma(x:DOUBLE) -> DOUBLE*/
  lgamma(x: DNumericable): DNumericField;
  /**@description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: like_escape('a%c', 'a$%c', '$')	@external: like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns a LIST containing all the values of a column.	@example: list(A)	@external: list(arg:ANY) -> LIST*/
  list(arg: DAnyable): DArrayField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: list_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggr(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: list_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggregate(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: list_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_apply(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: list_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_cat(list1: DArrayable, list2: DArrayable): DArrayField<DAnyField>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: list_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_concat(list1: DArrayable, list2: DArrayable): DArrayField<DAnyField>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: list_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  list_contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Compute the cosine distance between two lists	@example: list_cosine_distance([1, 2, 3], [1, 2, 3])	@external: list_cosine_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_distance(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description: Compute the cosine similarity between two lists	@example: list_cosine_similarity([1, 2, 3], [1, 2, 3])	@external: list_cosine_similarity(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_similarity(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description: Compute the distance between two lists	@example: list_distance([1, 2, 3], [1, 2, 3])	@external: list_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_distance(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@external: list_distinct(list:ANY[]) -> ANY[]*/
  list_distinct(list: DArrayable): DArrayField<DAnyField>;
  /**@description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@external: list_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_dot_product(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_element(list:ANY[], index:BIGINT) -> ANY*/
  list_element(list: DArrayable, index: DNumericable): DAnyField;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_element(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_element(list: DVarcharable, index: DNumericable): DVarcharField;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_extract(list:ANY[], index:BIGINT) -> ANY*/
  list_extract(list: DArrayable, index: DNumericable): DAnyField;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_extract(list: DVarcharable, index: DNumericable): DVarcharField;
  /**@description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@external: list_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_filter(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@external: list_grade_up(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  list_grade_up(list: DArrayable, col1?: DVarcharable | DAnyable, col2?: DVarcharable | DAnyable): DArrayField<DAnyField>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: list_has(list:ANY[], element:ANY) -> BOOLEAN*/
  list_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@external: list_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@external: list_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: list_indexof(list:ANY[], element:ANY) -> INTEGER*/
  list_indexof(list: DArrayable, element: DAnyable): DNumericField;
  /**@description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@external: list_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_inner_product(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: list_negative_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_dot_product(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: list_negative_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_inner_product(list1: DArrayable, list2: DArrayable): DNumericField;
  /**@description: Create a LIST containing the argument values	@example: list_value(4, 5, 6)*/
  list_pack(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: list_position(list:ANY[], element:ANY) -> INTEGER*/
  list_position(list: DArrayable, element: DAnyable): DNumericField;
  /**@description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@external: list_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  list_reduce(list: DArrayable, lambda: DAnyable): DAnyField;
  /**@description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@external: list_resize(list:ANY[], size:ANY, value: | ANY) -> ANY[]*/
  list_resize(list: DArrayable, size: DAnyable, value?: DAnyable): DArrayField<DAnyField>;
  /**@description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@external: list_reverse_sort(list:ANY[], col1: | VARCHAR) -> ANY[]*/
  list_reverse_sort(list: DArrayable, col1?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**@description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@external: list_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  list_select(valueList: DArrayable, indexList: DArrayable): DArrayField<DAnyField>;
  /**@description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@external: list_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  list_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step?: DNumericable | DAnyable): DAnyField;
  /**@description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@external: list_sort(list:ANY[], col1: | VARCHAR, col2: | VARCHAR) -> ANY[]*/
  list_sort(list: DArrayable, col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: list_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_transform(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@external: list_unique(list:ANY[]) -> UBIGINT*/
  list_unique(list: DArrayable): DNumericField;
  /**@description: Create a LIST containing the argument values	@example: list_value(4, 5, 6)*/
  list_value(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@external: list_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  list_where(valueList: DArrayable, maskList: DArrayable): DArrayField<DAnyField>;
  /**@description: Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example: list_zip([1, 2], [3, 4], [5, 6])*/
  list_zip(...vargs: DAnyable[]): DArrayField<DStructField>;
  /**@description: Concatenates the column string values with an optional separator.	@example: string_agg(A, '-')	@external: listagg(str:ANY, arg: | VARCHAR) -> VARCHAR*/
  listagg(str: DAnyable, arg?: DAnyable | DVarcharable): DVarcharField;
  /**@description: Computes the natural logarithm of x	@example: ln(2)	@external: ln(x:DOUBLE) -> DOUBLE*/
  ln(x: DNumericable): DNumericField;
  /**@description: Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example: log(2, 64)	@external: log(b:DOUBLE, x: | DOUBLE) -> DOUBLE*/
  log(b: DNumericable, x?: DAnyable | DNumericable): DNumericField;
  /**@description: Computes the 10-log of x	@example: log10(1000)	@external: log10(x:DOUBLE) -> DOUBLE*/
  log10(x: DNumericable): DNumericField;
  /**@description: Computes the 2-log of x	@example: log2(8)	@external: log2(x:DOUBLE) -> DOUBLE*/
  log2(x: DNumericable): DNumericField;
  /**@description: Convert string to lower case	@example: lower('Hello')	@external: lower(string:VARCHAR) -> VARCHAR*/
  lower(string: DVarcharable): DVarcharField;
  /**@description: Pads the string with the character from the left until it has count characters	@example: lpad('hello', 10, '>')	@external: lpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  lpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description: Removes any occurrences of any of the characters from the left side of the string	@example: ltrim('>>>>test<<', '><')	@external: ltrim(string:VARCHAR, characters: | VARCHAR) -> VARCHAR*/
  ltrim(string: DVarcharable, characters?: DAnyable | DVarcharable): DVarcharField;
  /**@description: Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example: mad(x)	@external: mad(x:TIMESTAMP WITH TIME ZONE | TIME | TIME WITH TIME ZONE | TIMESTAMP | DATE) -> INTERVAL*/
  mad(x: DDateable): DAnyField;
  /**@description: Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example: mad(x)	@external: mad(x:DOUBLE | FLOAT | DECIMAL) -> DOUBLE*/
  mad(x: DNumericable): DNumericField;
  /**@description: The date for the given parts	@example: make_date(1992, 9, 20)	@external: make_date(year:BIGINT, month:BIGINT, day:BIGINT) -> DATE*/
  make_date(year: DNumericable, month: DNumericable, day: DNumericable): DDateField;
  /**@external: make_date(col0:INTEGER) -> DATE*/
  make_date(col0: DNumericable): DDateField;
  /**@description: The date for the given struct.	@example: make_date({'year': 2024, 'month': 11, 'day': 14})	@external: make_date(dateStruct:STRUCT("year" BIGINT, "month" BIGINT, "day" BIGINT)) -> DATE*/
  make_date(dateStruct: DNumericable): DDateField;
  /**@description: The time for the given parts	@example: make_time(13, 34, 27.123456)	@external: make_time(hour:BIGINT, minute:BIGINT, seconds:DOUBLE) -> TIME*/
  make_time(hour: DNumericable, minute: DNumericable, seconds: DNumericable): DDateField;
  /**@description: The timestamp for the given parts	@example: make_timestamp(1992, 9, 20, 13, 34, 27.123456)	@external: make_timestamp(year:BIGINT, month: | BIGINT, day: | BIGINT, hour: | BIGINT, minute: | BIGINT, seconds: | DOUBLE) -> TIMESTAMP*/
  make_timestamp(year: DNumericable, month?: DAnyable | DNumericable, day?: DAnyable | DNumericable, hour?: DAnyable | DNumericable, minute?: DAnyable | DNumericable, seconds?: DAnyable | DNumericable): DDateField;
  /**@description: The timestamp for the given nanoseconds since epoch	@example: make_timestamp(1732117793000000000)	@external: make_timestamp_ns(nanos:BIGINT) -> TIMESTAMP_NS*/
  make_timestamp_ns(nanos: DNumericable): DDateField;
  /**@external: make_timestamptz(col0:BIGINT, col1: | BIGINT, col2: | BIGINT, col3: | BIGINT, col4: | BIGINT, col5: | DOUBLE, col6: | VARCHAR) -> TIMESTAMP WITH TIME ZONE*/
  make_timestamptz(col0: DNumericable, col1?: DAnyable | DNumericable, col2?: DAnyable | DNumericable, col3?: DAnyable | DNumericable, col4?: DAnyable | DNumericable, col5?: DAnyable | DNumericable, col6?: DAnyable | DVarcharable): DDateField;
  /**@description: Creates a map from a set of keys and values	@example: map(['key1', 'key2'], ['val1', 'val2'])*/
  map(...vargs: DAnyable[]): DAnyField;
  /**@description: Returns a map created from merging the input maps, on key collision the value is taken from the last map with that key	@example: map_concat(map([1,2], ['a', 'b']), map([2,3], ['c', 'd']));*/
  map_concat(...vargs: DAnyable[]): DArrayField;
  /**@description: Checks if a map contains a given key.	@example: map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')	@external: map_contains(map:MAP(ANY, ANY), key:ANY) -> BOOLEAN*/
  map_contains(map: DAnyable, key: DAnyable): DBoolField;
  /**@description: Returns the map entries as a list of keys/values	@example: map_entries(map(['key'], ['val']))*/
  map_entries(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@external: map_extract(map:ANY, key:ANY) -> ANY*/
  map_extract(map: DAnyable, key: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract_value(map(['key'], ['val']), 'key')	@external: map_extract_value(map:ANY, key:ANY) -> ANY*/
  map_extract_value(map: DAnyable, key: DAnyable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Returns a map created from the entries of the array	@example: map_from_entries([{k: 5, v: 'val1'}, {k: 3, v: 'val2'}]);*/
  map_from_entries(...vargs: DAnyable[]): DAnyField;
  /**@description: Returns the keys of a map as a list	@example: map_keys(map(['key'], ['val']))*/
  map_keys(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns the values of a map as a list	@example: map_values(map(['key'], ['val']))*/
  map_values(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns the maximum value present in arg.	@example: max(A)	@external: max(arg:ANY) -> ANY*/
  max(arg: DAnyable): DAnyField;
  /**@description: Returns the maximum value present in arg.	@example: max(A)	@external: max(arg:ANY, col1:BIGINT) -> ANY[]*/
  max(arg: DAnyable, col1: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:DATE | TIMESTAMP WITH TIME ZONE | TIMESTAMP, val:BIGINT | BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE | VARCHAR | DOUBLE | HUGEINT | INTEGER) -> DATE*/
  max_by(arg: DDateable, val: DNumericable | DAnyable | DDateable | DVarcharable): DDateField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:ANY, val:ANY | BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT | INTEGER) -> ANY*/
  max_by(arg: DAnyable, val: DAnyable | DDateable | DVarcharable | DNumericable): DAnyField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  max_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:BIGINT | INTEGER | DECIMAL | DOUBLE, val:VARCHAR | DOUBLE | BIGINT | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | INTEGER | HUGEINT) -> BIGINT*/
  max_by(arg: DNumericable, val: DVarcharable | DNumericable | DDateable | DAnyable): DNumericField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:VARCHAR | BLOB, val:BLOB | INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> VARCHAR*/
  max_by(arg: DVarcharable | DAnyable, val: DAnyable | DNumericable | DVarcharable | DDateable): DVarcharField;
  /**@description: Returns the MD5 hash of the value as a string	@example: md5('123')	@external: md5(value:BLOB) -> VARCHAR*/
  md5(value: DAnyable): DVarcharField;
  /**@description: Returns the MD5 hash of the value as a string	@example: md5('123')	@external: md5(value:VARCHAR) -> VARCHAR*/
  md5(value: DVarcharable): DVarcharField;
  /**@description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@external: md5_number(value:BLOB) -> HUGEINT*/
  md5_number(value: DAnyable): DNumericField;
  /**@description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@external: md5_number(value:VARCHAR) -> HUGEINT*/
  md5_number(value: DVarcharable): DNumericField;
  /**@description: Calculates the average value for all tuples in x.	@example: SUM(x) / COUNT(*)	@external: mean(x:DECIMAL | SMALLINT | INTEGER | BIGINT | HUGEINT | DOUBLE) -> DECIMAL*/
  mean(x: DNumericable): DNumericField;
  /**@description: Returns the middle value of the set. NULL values are ignored. For even value counts, quantitative values are averaged and ordinal values return the lower value.	@example: median(x)	@external: median(x:ANY) -> ANY*/
  median(x: DAnyable): DAnyField;
  /**@description: Extract the microsecond component from a date or timestamp	@example: microsecond(timestamp '2021-08-03 11:59:44.123456')	@external: microsecond(ts:DATE) -> BIGINT*/
  microsecond(ts: DDateable): DNumericField;
  /**@description: Extract the microsecond component from a date or timestamp	@example: microsecond(timestamp '2021-08-03 11:59:44.123456')	@external: microsecond(ts:INTERVAL) -> BIGINT*/
  microsecond(ts: DAnyable): DNumericField;
  /**@description: Extract the millennium component from a date or timestamp	@example: millennium(timestamp '2021-08-03 11:59:44.123456')	@external: millennium(ts:DATE) -> BIGINT*/
  millennium(ts: DDateable): DNumericField;
  /**@description: Extract the millennium component from a date or timestamp	@example: millennium(timestamp '2021-08-03 11:59:44.123456')	@external: millennium(ts:INTERVAL) -> BIGINT*/
  millennium(ts: DAnyable): DNumericField;
  /**@description: Extract the millisecond component from a date or timestamp	@example: millisecond(timestamp '2021-08-03 11:59:44.123456')	@external: millisecond(ts:DATE) -> BIGINT*/
  millisecond(ts: DDateable): DNumericField;
  /**@description: Extract the millisecond component from a date or timestamp	@example: millisecond(timestamp '2021-08-03 11:59:44.123456')	@external: millisecond(ts:INTERVAL) -> BIGINT*/
  millisecond(ts: DAnyable): DNumericField;
  /**@description: Returns the minimum value present in arg.	@example: min(A)	@external: min(arg:ANY) -> ANY*/
  min(arg: DAnyable): DAnyField;
  /**@description: Returns the minimum value present in arg.	@example: min(A)	@external: min(arg:ANY, col1:BIGINT) -> ANY[]*/
  min(arg: DAnyable, col1: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BLOB | INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> DATE*/
  min_by(arg: DDateable, val: DAnyable | DNumericable | DVarcharable | DDateable): DDateField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:ANY, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  min_by(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  min_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:INTEGER | BIGINT | DOUBLE | DECIMAL, val:INTEGER | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | BIGINT | HUGEINT | DOUBLE) -> INTEGER*/
  min_by(arg: DNumericable, val: DNumericable | DVarcharable | DDateable | DAnyable): DNumericField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:VARCHAR | BLOB, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> VARCHAR*/
  min_by(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DVarcharField;
  /**@description: Extract the minute component from a date or timestamp	@example: minute(timestamp '2021-08-03 11:59:44.123456')	@external: minute(ts:DATE) -> BIGINT*/
  minute(ts: DDateable): DNumericField;
  /**@description: Extract the minute component from a date or timestamp	@example: minute(timestamp '2021-08-03 11:59:44.123456')	@external: minute(ts:INTERVAL) -> BIGINT*/
  minute(ts: DAnyable): DNumericField;
  /**@description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@external: mismatches(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  mismatches(str1: DVarcharable, str2: DVarcharable): DNumericField;
  /**@external: mod(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  mod(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@description: Returns the most frequent value for the values within x. NULL values are ignored.	@external: mode(x:ANY) -> ANY*/
  mode(x: DAnyable): DAnyField;
  /**@description: Extract the month component from a date or timestamp	@example: month(timestamp '2021-08-03 11:59:44.123456')	@external: month(ts:DATE) -> BIGINT*/
  month(ts: DDateable): DNumericField;
  /**@description: Extract the month component from a date or timestamp	@example: month(timestamp '2021-08-03 11:59:44.123456')	@external: month(ts:INTERVAL) -> BIGINT*/
  month(ts: DAnyable): DNumericField;
  /**@description: The (English) name of the month	@example: monthname(TIMESTAMP '1992-09-20')	@external: monthname(ts:DATE) -> VARCHAR*/
  monthname(ts: DDateable): DVarcharField;
  /**@external: multiply(col0:BIGINT, col1:INTERVAL) -> INTERVAL*/
  multiply(col0: DNumericable, col1: DAnyable): DAnyField;
  /**@external: multiply(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  multiply(col0: DNumericable, col1: DNumericable): DNumericField;
  /**@external: multiply(col0:INTERVAL, col1:BIGINT) -> INTERVAL*/
  multiply(col0: DAnyable, col1: DNumericable): DAnyField;
  /**@description: Extract the nanosecond component from a date or timestamp	@example: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789	@external: nanosecond(tsns:DATE) -> BIGINT*/
  nanosecond(tsns: DDateable): DNumericField;
  /**@description: Extract the nanosecond component from a date or timestamp	@example: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789	@external: nanosecond(tsns:INTERVAL) -> BIGINT*/
  nanosecond(tsns: DAnyable): DNumericField;
  /**@external: netmask(col0:INET) -> INET*/
  netmask(col0: DAnyable): DAnyField;
  /**@external: network(col0:INET) -> INET*/
  network(col0: DAnyable): DAnyField;
  /**@description: Returns the next floating point value after x in the direction of y	@example: nextafter(1::float, 2::float)	@external: nextafter(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  nextafter(x: DNumericable, y: DNumericable): DNumericField;
  /**@description: Return the following value of the sequence.	@example: nextval('my_sequence_name')	@external: nextval(sequenceName:VARCHAR) -> BIGINT*/
  nextval(sequenceName: DVarcharable): DNumericField;
  /**@description: Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example: nfc_normalize('ardèch')	@external: nfc_normalize(string:VARCHAR) -> VARCHAR*/
  nfc_normalize(string: DVarcharable): DVarcharField;
  /**@description: Normalizes an INTERVAL to an equivalent interval	@example: normalized_interval(INTERVAL '30 days')	@external: normalized_interval(interval:INTERVAL) -> INTERVAL*/
  normalized_interval(interval: DAnyable): DAnyField;
  /**@description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_ilike_escape('A%c', 'a$%C', '$')	@external: not_ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_like_escape('a%c', 'a$%c', '$')	@external: not_like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns the current timestamp	@example: get_current_timestamp()*/
  now(): DDateField;
  /**@description: Number of bytes in blob.	@example: octet_length('\xAA\xBB'::BLOB)	@external: octet_length(blob:BIT) -> BIGINT*/
  octet_length(blob: DAnyable): DNumericField;
  /**@description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@external: ord(str:VARCHAR) -> INTEGER*/
  ord(str: DVarcharable): DNumericField;
  /**@description: Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirname('path/to/file.csv', 'system')	@external: parse_dirname(string:VARCHAR, separator: | VARCHAR) -> VARCHAR*/
  parse_dirname(string: DVarcharable, separator?: DAnyable | DVarcharable): DVarcharField;
  /**@description: Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirpath('path/to/file.csv', 'system')	@external: parse_dirpath(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirpath(string: DVarcharable, separator?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example: parse_filename('path/to/file.csv', true, 'forward_slash')	@external: parse_filename(string:VARCHAR, trimExtension:BOOLEAN |  | VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_filename(string: DVarcharable, trimExtension?: DBoolable | DAnyable | DVarcharable, separator?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_path('path/to/file.csv', 'system')	@external: parse_path(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR[]*/
  parse_path(string: DVarcharable, separator?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns the value of pi	@example: pi()*/
  pi(): DNumericField;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: position(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  position(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  /**@description: Computes x to the power of y	@example: pow(2, 3)	@external: pow(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  pow(x: DNumericable, y: DNumericable): DNumericField;
  /**@description: Computes x to the power of y	@example: pow(2, 3)	@external: power(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  power(x: DNumericable, y: DNumericable): DNumericField;
  /**@external: prefix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  prefix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description: Formats a string using printf syntax	@example: printf('Benchmark "%s" took %d seconds', 'CSV', 42)	@external: printf(format:VARCHAR) -> VARCHAR*/
  printf(format: DVarcharable, ...vargs: DAnyable[]): DVarcharField;
  /**@description: Calculates the product of all tuples in arg.	@example: product(A)	@external: product(arg:DOUBLE) -> DOUBLE*/
  product(arg: DNumericable): DNumericField;
  /**@description: Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example: quantile_disc(x, 0.5)	@external: quantile(x:ANY, pos:DOUBLE | DOUBLE[] | ) -> ANY*/
  quantile(x: DAnyable, pos?: DNumericable | DArrayable | DAnyable): DAnyField;
  /**@description: Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example: quantile_cont(x, 0.5)	@external: quantile_cont(x:TIMESTAMP WITH TIME ZONE | TIME WITH TIME ZONE | DATE | TIME | TIMESTAMP, pos:DOUBLE[] | DOUBLE) -> TIMESTAMP WITH TIME ZONE*/
  quantile_cont(x: DDateable, pos: DArrayable | DNumericable): DDateField;
  /**@description: Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example: quantile_cont(x, 0.5)	@external: quantile_cont(x:DECIMAL | INTEGER | BIGINT | HUGEINT | SMALLINT | DOUBLE | FLOAT | TINYINT, pos:DOUBLE | DOUBLE[]) -> DECIMAL*/
  quantile_cont(x: DNumericable, pos: DNumericable | DArrayable): DNumericField;
  /**@description: Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example: quantile_disc(x, 0.5)	@external: quantile_disc(x:ANY, pos: | DOUBLE[] | DOUBLE) -> ANY*/
  quantile_disc(x: DAnyable, pos?: DAnyable | DArrayable | DNumericable): DAnyField;
  /**@description: Extract the quarter component from a date or timestamp	@example: quarter(timestamp '2021-08-03 11:59:44.123456')	@external: quarter(ts:DATE) -> BIGINT*/
  quarter(ts: DDateable): DNumericField;
  /**@description: Extract the quarter component from a date or timestamp	@example: quarter(timestamp '2021-08-03 11:59:44.123456')	@external: quarter(ts:INTERVAL) -> BIGINT*/
  quarter(ts: DAnyable): DNumericField;
  /**@description: Converts degrees to radians	@example: radians(90)	@external: radians(x:DOUBLE) -> DOUBLE*/
  radians(x: DNumericable): DNumericField;
  /**@description: Returns a random number between 0 and 1	@example: random()*/
  random(): DNumericField;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  range(start: DNumericable, stop?: DNumericable | DAnyable, step?: DNumericable | DAnyable): DArrayField<DNumericField>;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  range(start: DDateable, stop: DDateable, step: DAnyable): DArrayField;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:TIMESTAMP, stop:TIMESTAMP, step:INTERVAL) -> TIMESTAMP[]*/
  range(start: DDateable, stop: DDateable, step: DAnyable): DArrayField<DDateField>;
  /**@description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@external: reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  reduce(list: DArrayable, lambda: DAnyable): DAnyField;
  /**@description: Escapes all potentially meaningful regexp characters in the input string	@example: regexp_escape('https://duckdb.org')	@external: regexp_escape(string:VARCHAR) -> VARCHAR*/
  regexp_escape(string: DVarcharable): DVarcharField;
  /**@description: If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example: regexp_extract('abc', '([a-z])(b)', 1)	@external: regexp_extract(string:VARCHAR, pattern:VARCHAR, group0:VARCHAR[] | INTEGER | , options:VARCHAR | ) -> VARCHAR*/
  regexp_extract(string: DVarcharable, pattern: DVarcharable, group0?: DArrayable | DNumericable | DAnyable, options?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example: regexp_extract_all('hello_world', '([a-z ]+)_?', 1)	@external: regexp_extract_all(string:VARCHAR, regex:VARCHAR, group0:INTEGER | , options:VARCHAR | ) -> VARCHAR[]*/
  regexp_extract_all(string: DVarcharable, regex: DVarcharable, group0?: DNumericable | DAnyable, options?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns true if the entire string matches the regex. A set of optional options can be set.	@example: regexp_full_match('anabanana', '(an)*')	@external: regexp_full_match(string:VARCHAR, regex:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_full_match(string: DVarcharable, regex: DVarcharable, options?: DVarcharable | DAnyable): DBoolField;
  /**@description: Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example: regexp_matches('anabanana', '(an)*')	@external: regexp_matches(string:VARCHAR, pattern:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_matches(string: DVarcharable, pattern: DVarcharable, options?: DVarcharable | DAnyable): DBoolField;
  /**@description: If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example: regexp_replace('hello', '[lo]', '-')	@external: regexp_replace(string:VARCHAR, pattern:VARCHAR, replacement:VARCHAR, options:VARCHAR | ) -> VARCHAR*/
  regexp_replace(string: DVarcharable, pattern: DVarcharable, replacement: DVarcharable, options?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: regexp_split_to_array(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  regexp_split_to_array(string: DVarcharable, separator: DVarcharable, col2?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns the average of the independent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.	@external: regr_avgx(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_avgx(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Returns the average of the dependent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.	@external: regr_avgy(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_avgy(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Returns the number of non-null number pairs in a group.	@example: (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)	@external: regr_count(y:DOUBLE, x:DOUBLE) -> UINTEGER*/
  regr_count(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Returns the intercept of the univariate linear regression line for non-null pairs in a group.	@example: AVG(y)-REGR_SLOPE(y,x)*AVG(x)	@external: regr_intercept(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_intercept(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Returns the coefficient of determination for non-null pairs in a group.	@external: regr_r2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_r2(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Returns the slope of the linear regression line for non-null pairs in a group.	@example: COVAR_POP(x,y) / VAR_POP(x)	@external: regr_slope(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_slope(y: DNumericable, x: DNumericable): DNumericField;
  /**@example: REGR_COUNT(y, x) * VAR_POP(x)	@external: regr_sxx(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_sxx(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Returns the population covariance of input values	@example: REGR_COUNT(y, x) * COVAR_POP(y, x)	@external: regr_sxy(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_sxy(y: DNumericable, x: DNumericable): DNumericField;
  /**@example: REGR_COUNT(y, x) * VAR_POP(y)	@external: regr_syy(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_syy(y: DNumericable, x: DNumericable): DNumericField;
  /**@description: Repeats the string count number of times	@example: repeat('A', 5)	@external: repeat(string:ANY[], count:BIGINT) -> ANY[]*/
  repeat(string: DArrayable, count: DNumericable): DArrayField<DAnyField>;
  /**@description: Repeats the string count number of times	@example: repeat('A', 5)	@external: repeat(string:BLOB, count:BIGINT) -> BLOB*/
  repeat(string: DAnyable, count: DNumericable): DAnyField;
  /**@description: Repeats the string count number of times	@example: repeat('A', 5)	@external: repeat(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  repeat(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description: Replaces any occurrences of the source with target in string	@example: replace('hello', 'l', '-')	@external: replace(string:VARCHAR, source:VARCHAR, target:VARCHAR) -> VARCHAR*/
  replace(string: DVarcharable, source: DVarcharable, target: DVarcharable): DVarcharField;
  /**@description: Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example: reservoir_quantile(A,0.5,1024)	@external: reservoir_quantile(x:FLOAT | DOUBLE | TINYINT | SMALLINT | BIGINT | HUGEINT | INTEGER | DECIMAL, quantile:DOUBLE[], sampleSize: | INTEGER) -> TINYINT[]*/
  reservoir_quantile(x: DNumericable, quantile: DArrayable, sampleSize?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /**@description: Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example: reservoir_quantile(A,0.5,1024)	@external: reservoir_quantile(x:BIGINT | DOUBLE | TINYINT | SMALLINT | INTEGER | HUGEINT | FLOAT | DECIMAL, quantile:DOUBLE, sampleSize:INTEGER | ) -> BIGINT*/
  reservoir_quantile(x: DNumericable, quantile: DNumericable, sampleSize?: DNumericable | DAnyable): DNumericField;
  /**@description: Reverses the string	@example: reverse('hello')	@external: reverse(string:VARCHAR) -> VARCHAR*/
  reverse(string: DVarcharable): DVarcharField;
  /**@description: Extract the right-most count characters	@example: right('Hello🦆', 3)	@external: right(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description: Extract the right-most count grapheme clusters	@example: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@external: right_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right_grapheme(string: DVarcharable, count: DNumericable): DVarcharField;
  /**@description: Rounds x to s decimal places	@example: round(42.4332, 2)	@external: round(x:DECIMAL, precision: | INTEGER) -> DECIMAL*/
  round(x: DNumericable, precision?: DAnyable | DNumericable): DNumericField;
  /**@description: Rounds x to s decimal places	@example: round(42.4332, 2)	@external: round(x:DOUBLE, precision:INTEGER | ) -> DOUBLE*/
  round(x: DNumericable, precision?: DNumericable | DAnyable): DNumericField;
  /**@description: Create an unnamed STRUCT (tuple) containing the argument values.	@example: row(i, i % 4, i / 4)*/
  row(...vargs: DAnyable[]): DStructField;
  /**@description: Pads the string with the character from the right until it has count characters	@example: rpad('hello', 10, '<')	@external: rpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  rpad(string: DVarcharable, count: DNumericable, character: DVarcharable): DVarcharField;
  /**@description: Removes any occurrences of any of the characters from the right side of the string	@example: rtrim('>>>>test<<', '><')	@external: rtrim(string:VARCHAR, characters: | VARCHAR) -> VARCHAR*/
  rtrim(string: DVarcharable, characters?: DAnyable | DVarcharable): DVarcharField;
  /**@description: Extract the second component from a date or timestamp	@example: second(timestamp '2021-08-03 11:59:44.123456')	@external: second(ts:DATE) -> BIGINT*/
  second(ts: DDateable): DNumericField;
  /**@description: Extract the second component from a date or timestamp	@example: second(timestamp '2021-08-03 11:59:44.123456')	@external: second(ts:INTERVAL) -> BIGINT*/
  second(ts: DAnyable): DNumericField;
  /**@description: Returns the standard error of the mean	@external: sem(x:DOUBLE) -> DOUBLE*/
  sem(x: DNumericable): DNumericField;
  /**@description: Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring	@example: set_bit('0110010'::BIT, 2, 0)	@external: set_bit(bitstring:BIT, index:INTEGER, newValue:INTEGER) -> BIT*/
  set_bit(bitstring: DAnyable, index: DNumericable, newValue: DNumericable): DAnyField;
  /**@description: Sets the seed to be used for the random function	@example: setseed(0.42)	@external: setseed(col0:DOUBLE) -> "NULL"*/
  setseed(col0: DNumericable): DAnyField;
  /**@description: Returns the SHA1 hash of the value	@example: sha1('hello')	@external: sha1(value:BLOB) -> VARCHAR*/
  sha1(value: DAnyable): DVarcharField;
  /**@description: Returns the SHA1 hash of the value	@example: sha1('hello')	@external: sha1(value:VARCHAR) -> VARCHAR*/
  sha1(value: DVarcharable): DVarcharField;
  /**@description: Returns the SHA256 hash of the value	@example: sha256('hello')	@external: sha256(value:BLOB) -> VARCHAR*/
  sha256(value: DAnyable): DVarcharField;
  /**@description: Returns the SHA256 hash of the value	@example: sha256('hello')	@external: sha256(value:VARCHAR) -> VARCHAR*/
  sha256(value: DVarcharable): DVarcharField;
  /**@description: Returns the sign of x as -1, 0 or 1	@example: sign(-349)	@external: sign(x:BIGINT) -> TINYINT*/
  sign(x: DNumericable): DNumericField;
  /**@description: Returns whether the signbit is set or not	@example: signbit(-0.0)	@external: signbit(x:DOUBLE) -> BOOLEAN*/
  signbit(x: DNumericable): DBoolField;
  /**@description: Computes the sin of x	@example: sin(90)	@external: sin(x:DOUBLE) -> DOUBLE*/
  sin(x: DNumericable): DNumericField;
  /**@description: Computes the hyperbolic sin of x	@example: sinh(1)	@external: sinh(x:DOUBLE) -> DOUBLE*/
  sinh(x: DNumericable): DNumericField;
  /**@description: Returns the skewness of all input values.	@example: skewness(A)	@external: skewness(x:DOUBLE) -> DOUBLE*/
  skewness(x: DNumericable): DNumericField;
  /**@description: Returns the square root of x	@example: sqrt(4)	@external: sqrt(x:DOUBLE) -> DOUBLE*/
  sqrt(x: DNumericable): DNumericField;
  /**@description: Returns true if string begins with search_string	@example: starts_with('abc','a')	@external: starts_with(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  starts_with(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description: Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example: stats(5)	@external: stats(expression:ANY) -> VARCHAR*/
  stats(expression: DAnyable): DVarcharField;
  /**@description: Returns the sample standard deviation	@example: sqrt(var_samp(x))	@external: stddev(x:DOUBLE) -> DOUBLE*/
  stddev(x: DNumericable): DNumericField;
  /**@description: Returns the population standard deviation.	@example: sqrt(var_pop(x))	@external: stddev_pop(x:DOUBLE) -> DOUBLE*/
  stddev_pop(x: DNumericable): DNumericField;
  /**@description: Returns the sample standard deviation	@example: sqrt(var_samp(x))	@external: stddev_samp(x:DOUBLE) -> DOUBLE*/
  stddev_samp(x: DNumericable): DNumericField;
  /**@external: stem(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  stem(col0: DVarcharable, col1: DVarcharable): DVarcharField;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: str_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  str_split(string: DVarcharable, separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: str_split_regex(string:VARCHAR, separator:VARCHAR, col2: | VARCHAR) -> VARCHAR[]*/
  str_split_regex(string: DVarcharable, separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**@description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@external: strftime(data:DATE, format:VARCHAR) -> VARCHAR*/
  strftime(data: DDateable, format: DVarcharable): DVarcharField;
  /**@description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@external: strftime(data:VARCHAR, format:TIMESTAMP_NS | DATE | TIMESTAMP) -> VARCHAR*/
  strftime(data: DVarcharable, format: DDateable): DVarcharField;
  /**@description: Concatenates the column string values with an optional separator.	@example: string_agg(A, '-')	@external: string_agg(str:ANY, arg: | VARCHAR) -> VARCHAR*/
  string_agg(str: DAnyable, arg?: DAnyable | DVarcharable): DVarcharField;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: string_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_split(string: DVarcharable, separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: string_split_regex(string:VARCHAR, separator:VARCHAR, col2: | VARCHAR) -> VARCHAR[]*/
  string_split_regex(string: DVarcharable, separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: string_to_array(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_to_array(string: DVarcharable, separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Strips accents from string.	@example: strip_accents('mühleisen')	@external: strip_accents(string:VARCHAR) -> VARCHAR*/
  strip_accents(string: DVarcharable): DVarcharField;
  /**@description: Number of bytes in string.	@example: strlen('🦆')	@external: strlen(string:VARCHAR) -> BIGINT*/
  strlen(string: DVarcharable): DNumericField;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: strpos(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  strpos(haystack: DVarcharable, needle: DVarcharable): DNumericField;
  /**@description: Converts the string text to timestamp according to the format string. Throws an error on failure. To return NULL on failure, use try_strptime.	@example: strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@external: strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  strptime(text: DVarcharable, format: DVarcharable | DArrayable): DDateField;
  /**@description: Merge the multiple STRUCTs into a single STRUCT.	@example: struct_concat(struct_pack(i := 4), struct_pack(s := 'string'))*/
  struct_concat(...vargs: DAnyable[]): DStructField;
  /**@description: Extract the named entry from the STRUCT.	@example: struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i')	@external: struct_extract(struct:STRUCT, entry:BIGINT | VARCHAR) -> ANY*/
  struct_extract(struct: DStructable, entry: DNumericable | DVarcharable): DAnyField;
  /**@description: Extract the entry from the STRUCT by position (starts at 1!).	@example: struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2)	@external: struct_extract_at(struct:STRUCT, entry:BIGINT) -> ANY*/
  struct_extract_at(struct: DStructable, entry: DNumericable): DAnyField;
  /**@description: Adds field(s)/value(s) to an existing STRUCT with the argument values. The entry name(s) will be the bound variable name(s)	@example: struct_insert({'a': 1}, b := 2)*/
  struct_insert(...vargs: DAnyable[]): DStructField;
  /**@description: Create a STRUCT containing the argument values. The entry name will be the bound variable name.	@example: struct_pack(i := 4, s := 'string')*/
  struct_pack(...vargs: DAnyable[]): DStructField;
  /**@description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@external: substr(string:VARCHAR, start:BIGINT, length: | BIGINT) -> VARCHAR*/
  substr(string: DVarcharable, start: DNumericable, length?: DAnyable | DNumericable): DVarcharField;
  /**@description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@external: substring(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring(string: DVarcharable, start: DNumericable, length?: DNumericable | DAnyable): DVarcharField;
  /**@description: Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)	@external: substring_grapheme(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring_grapheme(string: DVarcharable, start: DNumericable, length?: DNumericable | DAnyable): DVarcharField;
  /**@external: subtract(col0:BIGINT, col1: | BIGINT) -> BIGINT*/
  subtract(col0: DNumericable, col1?: DAnyable | DNumericable): DNumericField;
  /**@external: subtract(col0:DATE, col1:INTERVAL | INTEGER) -> TIMESTAMP*/
  subtract(col0: DDateable, col1: DAnyable | DNumericable): DDateField;
  /**@external: subtract(col0:DATE, col1:DATE) -> BIGINT*/
  subtract(col0: DDateable, col1: DDateable): DNumericField;
  /**@external: subtract(col0:INTERVAL, col1: | INTERVAL) -> INTERVAL*/
  subtract(col0: DAnyable, col1?: DAnyable): DAnyField;
  /**@external: subtract(col0:TIME WITH TIME ZONE, col1:INTERVAL) -> TIME WITH TIME ZONE*/
  subtract(col0: DDateable, col1: DAnyable): DDateField;
  /**@external: subtract(col0:TIMESTAMP, col1:TIMESTAMP) -> INTERVAL*/
  subtract(col0: DDateable, col1: DDateable): DAnyField;
  /**@external: subtract(col0:UBIGINT, col1:UBIGINT | ) -> UBIGINT*/
  subtract(col0: DNumericable, col1?: DNumericable | DAnyable): DNumericField;
  /**@external: suffix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  suffix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description: Calculates the sum value for all tuples in arg.	@example: sum(A)	@external: sum(arg:DOUBLE | DECIMAL | BOOLEAN | SMALLINT | INTEGER | BIGINT | HUGEINT) -> DOUBLE*/
  sum(arg: DNumericable | DBoolable): DNumericField;
  /**@description: Internal only. Calculates the sum value for all tuples in arg without overflow checks.	@example: sum_no_overflow(A)	@external: sum_no_overflow(arg:INTEGER | DECIMAL | BIGINT) -> HUGEINT*/
  sum_no_overflow(arg: DNumericable): DNumericField;
  /**@description: Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example: kahan_sum(A)	@external: sumkahan(arg:DOUBLE) -> DOUBLE*/
  sumkahan(arg: DNumericable): DNumericField;
  /**@description: Computes the tan of x	@example: tan(90)	@external: tan(x:DOUBLE) -> DOUBLE*/
  tan(x: DNumericable): DNumericField;
  /**@description: Computes the hyperbolic tan of x	@example: tanh(1)	@external: tanh(x:DOUBLE) -> DOUBLE*/
  tanh(x: DNumericable): DNumericField;
  /**@external: text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  text(col0: DNumericable, col1: DVarcharable): DVarcharField;
  /**@description: Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets	@example: time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07')	@external: time_bucket(bucketWidth:INTERVAL, timestamp:TIMESTAMP | TIMESTAMP WITH TIME ZONE | DATE, origin: | INTERVAL | TIMESTAMP | VARCHAR | TIMESTAMP WITH TIME ZONE | DATE) -> TIMESTAMP WITH TIME ZONE*/
  time_bucket(bucketWidth: DAnyable, timestamp: DDateable, origin?: DAnyable | DDateable | DVarcharable): DDateField;
  /**@description: Converts a TIME WITH TIME ZONE to an integer sort key	@example: timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)	@external: timetz_byte_comparable(timeTz:TIME WITH TIME ZONE) -> UBIGINT*/
  timetz_byte_comparable(timeTz: DDateable): DNumericField;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:DATE) -> BIGINT*/
  timezone(ts: DDateable): DNumericField;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:INTERVAL, col1:TIME WITH TIME ZONE) -> TIME WITH TIME ZONE*/
  timezone(ts: DAnyable, col1: DDateable): DDateField;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:INTERVAL) -> BIGINT*/
  timezone(ts: DAnyable): DNumericField;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:VARCHAR, col1:TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIME WITH TIME ZONE*/
  timezone(ts: DVarcharable, col1: DDateable): DDateField;
  /**@description: Extract the timezone_hour component from a date or timestamp	@example: timezone_hour(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_hour(ts:DATE) -> BIGINT*/
  timezone_hour(ts: DDateable): DNumericField;
  /**@description: Extract the timezone_hour component from a date or timestamp	@example: timezone_hour(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_hour(ts:INTERVAL) -> BIGINT*/
  timezone_hour(ts: DAnyable): DNumericField;
  /**@description: Extract the timezone_minute component from a date or timestamp	@example: timezone_minute(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_minute(ts:DATE) -> BIGINT*/
  timezone_minute(ts: DDateable): DNumericField;
  /**@description: Extract the timezone_minute component from a date or timestamp	@example: timezone_minute(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_minute(ts:INTERVAL) -> BIGINT*/
  timezone_minute(ts: DAnyable): DNumericField;
  /**@description: Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example: to_base(42, 16)	@external: to_base(number:BIGINT, radix:INTEGER, minLength: | INTEGER) -> VARCHAR*/
  to_base(number: DNumericable, radix: DNumericable, minLength?: DAnyable | DNumericable): DVarcharField;
  /**@description: Convert a blob to a base64 encoded string	@example: base64('A'::blob)	@external: to_base64(blob:BLOB) -> VARCHAR*/
  to_base64(blob: DAnyable): DVarcharField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:BIGINT) -> VARCHAR*/
  to_binary(value: DNumericable): DVarcharField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:VARCHAR) -> VARCHAR*/
  to_binary(value: DVarcharable): DVarcharField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:VARINT) -> VARCHAR*/
  to_binary(value: DAnyable): DVarcharField;
  /**@description: Construct a century interval	@example: to_centuries(5)	@external: to_centuries(integer:INTEGER) -> INTERVAL*/
  to_centuries(integer: DNumericable): DAnyField;
  /**@description: Construct a day interval	@example: to_days(5)	@external: to_days(integer:INTEGER) -> INTERVAL*/
  to_days(integer: DNumericable): DAnyField;
  /**@description: Construct a decade interval	@example: to_decades(5)	@external: to_decades(integer:INTEGER) -> INTERVAL*/
  to_decades(integer: DNumericable): DAnyField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:BIGINT) -> VARCHAR*/
  to_hex(value: DNumericable): DVarcharField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:BLOB) -> VARCHAR*/
  to_hex(value: DAnyable): DVarcharField;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:VARCHAR) -> VARCHAR*/
  to_hex(value: DVarcharable): DVarcharField;
  /**@description: Construct a hour interval	@example: to_hours(5)	@external: to_hours(integer:BIGINT) -> INTERVAL*/
  to_hours(integer: DNumericable): DAnyField;
  /**@description: Construct a microsecond interval	@example: to_microseconds(5)	@external: to_microseconds(integer:BIGINT) -> INTERVAL*/
  to_microseconds(integer: DNumericable): DAnyField;
  /**@description: Construct a millenium interval	@example: to_millennia(1)	@external: to_millennia(integer:INTEGER) -> INTERVAL*/
  to_millennia(integer: DNumericable): DAnyField;
  /**@description: Construct a millisecond interval	@example: to_milliseconds(5.5)	@external: to_milliseconds(double:DOUBLE) -> INTERVAL*/
  to_milliseconds(double: DNumericable): DAnyField;
  /**@description: Construct a minute interval	@example: to_minutes(5)	@external: to_minutes(integer:BIGINT) -> INTERVAL*/
  to_minutes(integer: DNumericable): DAnyField;
  /**@description: Construct a month interval	@example: to_months(5)	@external: to_months(integer:INTEGER) -> INTERVAL*/
  to_months(integer: DNumericable): DAnyField;
  /**@description: Construct a quarter interval	@example: to_quarters(5)	@external: to_quarters(integer:INTEGER) -> INTERVAL*/
  to_quarters(integer: DNumericable): DAnyField;
  /**@description: Construct a second interval	@example: to_seconds(5.5)	@external: to_seconds(double:DOUBLE) -> INTERVAL*/
  to_seconds(double: DNumericable): DAnyField;
  /**@description: Converts secs since epoch to a timestamp with time zone	@example: to_timestamp(1284352323.5)	@external: to_timestamp(sec:DOUBLE) -> TIMESTAMP WITH TIME ZONE*/
  to_timestamp(sec: DNumericable): DDateField;
  /**@description: Construct a week interval	@example: to_weeks(5)	@external: to_weeks(integer:INTEGER) -> INTERVAL*/
  to_weeks(integer: DNumericable): DAnyField;
  /**@description: Construct a year interval	@example: to_years(5)	@external: to_years(integer:INTEGER) -> INTERVAL*/
  to_years(integer: DNumericable): DAnyField;
  /**@description: Returns the current timestamp	@example: get_current_timestamp()*/
  transaction_timestamp(): DDateField;
  /**@description: Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example: translate('12345', '143', 'ax')	@external: translate(string:VARCHAR, from:VARCHAR, to:VARCHAR) -> VARCHAR*/
  translate(string: DVarcharable, from: DVarcharable, to: DVarcharable): DVarcharField;
  /**@description: Removes any occurrences of any of the characters from either side of the string	@example: trim('>>>>test<<', '><')	@external: trim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  trim(string: DVarcharable, characters?: DVarcharable | DAnyable): DVarcharField;
  /**@description: Truncates the number	@example: trunc(17.4)	@external: trunc(x:BIGINT) -> BIGINT*/
  trunc(x: DNumericable): DNumericField;
  /**@description: Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example: try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@external: try_strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  try_strptime(text: DVarcharable, format: DVarcharable | DArrayable): DDateField;
  /**@description: Returns the current transaction’s ID (a BIGINT). It will assign a new one if the current transaction does not have one already	@example: txid_current()*/
  txid_current(): DNumericField;
  /**@description: Returns the name of the data type of the result of the expression	@example: typeof('abc')	@external: typeof(expression:ANY) -> VARCHAR*/
  typeof(expression: DAnyable): DVarcharField;
  /**@description: Convert string to upper case.	@example: upper('Hello')	@external: ucase(string:VARCHAR) -> VARCHAR*/
  ucase(string: DVarcharable): DVarcharField;
  /**@description: Converts a value from binary representation to a blob	@example: unbin('0110')	@external: unbin(value:VARCHAR) -> BLOB*/
  unbin(value: DVarcharable): DAnyField;
  /**@description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@external: unhex(value:VARCHAR) -> BLOB*/
  unhex(value: DVarcharable): DAnyField;
  /**@description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@external: unicode(str:VARCHAR) -> INTEGER*/
  unicode(str: DVarcharable): DNumericField;
  /**@description: Extract the value with the named tags from the union. NULL if the tag is not currently selected	@example: union_extract(s, 'k')	@external: union_extract(union:UNION, tag:VARCHAR) -> ANY*/
  union_extract(union: DAnyable, tag: DVarcharable): DAnyField;
  /**@description: Retrieve the currently selected tag of the union as an ENUM	@example: union_tag(union_value(k := 'foo'))	@external: union_tag(union:UNION) -> ANY*/
  union_tag(union: DAnyable): DAnyField;
  /**@description: Create a single member UNION containing the argument value. The tag of the value will be the bound variable name	@example: union_value(k := 'hello')*/
  union_value(...vargs: DAnyable[]): DAnyField;
  /**@description: Identical to list_value, but generated as part of unpivot for better error messages	@example: unpivot_list(4, 5, 6)*/
  unpivot_list(...vargs: DAnyable[]): DArrayField;
  /**@description: Convert string to upper case.	@example: upper('Hello')	@external: upper(string:VARCHAR) -> VARCHAR*/
  upper(string: DVarcharable): DVarcharField;
  /**@description: Unescapes the URL encoded input.	@example: url_decode('this%20string%20is%2BFencoded')	@external: url_decode(input:VARCHAR) -> VARCHAR*/
  url_decode(input: DVarcharable): DVarcharField;
  /**@description: Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example: url_encode('this string has/ special+ characters>')	@external: url_encode(input:VARCHAR) -> VARCHAR*/
  url_encode(input: DVarcharable): DVarcharField;
  /**@description: Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example: uuid()*/
  uuid(): DAnyField;
  /**@description: Returns the population variance.	@external: var_pop(x:DOUBLE) -> DOUBLE*/
  var_pop(x: DNumericable): DNumericField;
  /**@description: Returns the sample variance of all input values.	@example: (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)	@external: var_samp(x:DOUBLE) -> DOUBLE*/
  var_samp(x: DNumericable): DNumericField;
  /**@description: Returns the sample variance of all input values.	@example: (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)	@external: variance(x:DOUBLE) -> DOUBLE*/
  variance(x: DNumericable): DNumericField;
  /**@description: Returns the VectorType of a given column	@example: vector_type(col)	@external: vector_type(col:ANY) -> VARCHAR*/
  vector_type(col: DAnyable): DVarcharField;
  /**@description: Returns the currently active version of DuckDB in this format: v0.3.2		@example: version()*/
  version(): DVarcharField;
  /**@description: Extract the week component from a date or timestamp	@example: week(timestamp '2021-08-03 11:59:44.123456')	@external: week(ts:DATE) -> BIGINT*/
  week(ts: DDateable): DNumericField;
  /**@description: Extract the week component from a date or timestamp	@example: week(timestamp '2021-08-03 11:59:44.123456')	@external: week(ts:INTERVAL) -> BIGINT*/
  week(ts: DAnyable): DNumericField;
  /**@description: Extract the weekday component from a date or timestamp	@example: weekday(timestamp '2021-08-03 11:59:44.123456')	@external: weekday(ts:DATE) -> BIGINT*/
  weekday(ts: DDateable): DNumericField;
  /**@description: Extract the weekday component from a date or timestamp	@example: weekday(timestamp '2021-08-03 11:59:44.123456')	@external: weekday(ts:INTERVAL) -> BIGINT*/
  weekday(ts: DAnyable): DNumericField;
  /**@description: Extract the weekofyear component from a date or timestamp	@example: weekofyear(timestamp '2021-08-03 11:59:44.123456')	@external: weekofyear(ts:DATE) -> BIGINT*/
  weekofyear(ts: DDateable): DNumericField;
  /**@description: Extract the weekofyear component from a date or timestamp	@example: weekofyear(timestamp '2021-08-03 11:59:44.123456')	@external: weekofyear(ts:INTERVAL) -> BIGINT*/
  weekofyear(ts: DAnyable): DNumericField;
  /**@description: Writes to the logger	@example: write_log('Hello')	@external: write_log(string:VARCHAR) -> ANY*/
  write_log(string: DVarcharable, ...vargs: DAnyable[]): DAnyField;
  /**@description: Bitwise XOR	@example: xor(17, 5)	@external: xor(left:BIGINT, right:BIGINT) -> BIGINT*/
  xor(left: DNumericable, right: DNumericable): DNumericField;
  /**@description: Bitwise XOR	@example: xor(17, 5)	@external: xor(left:BIT, right:BIT) -> BIT*/
  xor(left: DAnyable, right: DAnyable): DAnyField;
  /**@description: Extract the year component from a date or timestamp	@example: year(timestamp '2021-08-03 11:59:44.123456')	@external: year(ts:DATE) -> BIGINT*/
  year(ts: DDateable): DNumericField;
  /**@description: Extract the year component from a date or timestamp	@example: year(timestamp '2021-08-03 11:59:44.123456')	@external: year(ts:INTERVAL) -> BIGINT*/
  year(ts: DAnyable): DNumericField;
  /**@description: Extract the yearweek component from a date or timestamp	@example: yearweek(timestamp '2021-08-03 11:59:44.123456')	@external: yearweek(ts:DATE) -> BIGINT*/
  yearweek(ts: DDateable): DNumericField;
  /**@description: Extract the yearweek component from a date or timestamp	@example: yearweek(timestamp '2021-08-03 11:59:44.123456')	@external: yearweek(ts:INTERVAL) -> BIGINT*/
  yearweek(ts: DAnyable): DNumericField;
}

export interface DAnyComp {
  [sInferred]: any;
  [sComptype]: any;
  as(destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  as(destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): DAnyComp;
  as(destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  as(destype: DNUMERIC_NATIVE, ...args: DAnyable[]): DNumericComp;
  as(destype: DSTRING_NATIVE, ...args: DAnyable[]): DVarcharComp;
  as(destype: DANY_NATIVE, ...args: DAnyable[]): DAnyComp;
  /**@example: IsNull(val)	@external: IsNull(val:ANY) -> BOOLEAN*/
  IsNull(): DBoolField;
  /**@description: Returns the name of a given expression	@example: alias(42 + 1)	@external: alias(expr:ANY) -> VARCHAR*/
  alias(): string & _DVarcharComp;
  /**@description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@external: array_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  array_slice(begin: DAnyable, end: DAnyable, step?: DNumericable | DAnyable): DAnyComp;
  /**@description: Whether or not we can implicitly cast from the source type to the other type	@example: can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)	@external: can_cast_implicitly(sourceType:ANY, targetType:ANY) -> BOOLEAN*/
  can_cast_implicitly(targetType: DAnyable): DBoolField;
  /**@description: Returns the size of the map (or the number of entries in the map)	@example: cardinality( map([4, 2], ['a', 'b']) );	@external: cardinality(map:ANY) -> UBIGINT*/
  cardinality(...vargs: DAnyable[]): number & _DNumericComp;
  /**@description: Concatenate many strings together.	@example: concat('Hello', ' ', 'World')	@external: concat(string:ANY) -> VARCHAR*/
  concat(...vargs: DAnyable[]): string & _DVarcharComp;
  /**@description: If arg2 is NULL, return NULL. Otherwise, return arg1.	@example: constant_or_null(42, NULL)	@external: constant_or_null(arg1:ANY, arg2:ANY) -> ANY*/
  constant_or_null(arg2: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example: create_sort_key('A', 'DESC')	@external: create_sort_key(parameters:ANY) -> BLOB*/
  create_sort_key(...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@external: element_at(map:ANY, key:ANY) -> ANY*/
  element_at(key: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns the numeric value backing the given enum value	@example: enum_code('happy'::mood)	@external: enum_code(enm:ANY) -> ANY*/
  enum_code(): DAnyComp;
  /**@description: Returns the first value of the input enum type	@example: enum_first(NULL::mood)	@external: enum_first(enm:ANY) -> VARCHAR*/
  enum_first(): string & _DVarcharComp;
  /**@description: Returns the last value of the input enum type	@example: enum_last(NULL::mood)	@external: enum_last(enm:ANY) -> VARCHAR*/
  enum_last(): string & _DVarcharComp;
  /**@description: Returns all values of the input enum type as an array	@example: enum_range(NULL::mood)	@external: enum_range(enm:ANY) -> VARCHAR[]*/
  enum_range(): DArrayField<DVarcharField>;
  /**@description: Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example: enum_range_boundary(NULL, 'happy'::mood)	@external: enum_range_boundary(start:ANY, end:ANY) -> VARCHAR[]*/
  enum_range_boundary(end: DAnyable): DArrayField<DVarcharField>;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:ANY, max:ANY, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Returns the highest value of the set of input parameters	@example: greatest(42, 84)	@external: greatest(arg1:ANY) -> ANY*/
  greatest(...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example: hash('🦆')	@external: hash(param:ANY) -> UBIGINT*/
  hash(...vargs: DAnyable[]): number & _DNumericComp;
  /**@description: Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example: is_histogram_other_bin(v)	@external: is_histogram_other_bin(val:ANY) -> BOOLEAN*/
  is_histogram_other_bin(): DBoolField;
  /**@description: Returns the lowest value of the set of input parameters	@example: least(42, 84)	@external: least(arg1:ANY) -> ANY*/
  least(...vargs: DAnyable[]): DAnyComp;
  /**@description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@external: list_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  list_slice(begin: DAnyable, end: DAnyable, step?: DNumericable | DAnyable): DAnyComp;
  /**@description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@external: map_extract(map:ANY, key:ANY) -> ANY*/
  map_extract(key: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract_value(map(['key'], ['val']), 'key')	@external: map_extract_value(map:ANY, key:ANY) -> ANY*/
  map_extract_value(key: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example: stats(5)	@external: stats(expression:ANY) -> VARCHAR*/
  stats(): string & _DVarcharComp;
  /**@description: Returns the name of the data type of the result of the expression	@example: typeof('abc')	@external: typeof(expression:ANY) -> VARCHAR*/
  typeof(): string & _DVarcharComp;
  /**@description: Returns the VectorType of a given column	@example: vector_type(col)	@external: vector_type(col:ANY) -> VARCHAR*/
  vector_type(): string & _DVarcharComp;
}

export interface _DVarcharComp extends DAnyComp {
  /**@example: Glob(val, matcher)	@external: Glob(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Glob(matcher: DAnyable): DBoolField;
  /**@example: Ilike(val, matcher)	@external: Ilike(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Ilike(matcher: DAnyable): DBoolField;
  /**@example: In(val, matcher)	@external: In(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  In(matcher: DAnyable): DBoolField;
  /**@example: Like(val, matcher)	@external: Like(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Like(matcher: DAnyable): DBoolField;
  /**@example: SimilarTo(val, matcher)	@external: SimilarTo(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  SimilarTo(matcher: DAnyable): DBoolField;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  array_extract(index: DNumericable): string & _DVarcharComp;
  /**@description: Returns an integer that represents the Unicode code point of the first character of the string	@example: ascii('Ω')	@external: ascii(string:VARCHAR) -> INTEGER*/
  ascii(): number & _DNumericComp;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:VARCHAR) -> VARCHAR*/
  bin(): string & _DVarcharComp;
  /**@external: bit_length(col0:VARCHAR) -> BIGINT*/
  bit_length(): number & _DNumericComp;
  /**@description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@external: bitstring(bitstring:VARCHAR, length:INTEGER) -> BIT*/
  bitstring(length: DNumericable): DAnyComp;
  /**@description: Concatenate strings together separated by the specified separator.	@example: concat_ws(', ', 'Banana', 'Apple', 'Melon')	@external: concat_ws(separator:VARCHAR, string:ANY) -> VARCHAR*/
  concat_ws(string: DAnyable, ...vargs: DAnyable[]): string & _DVarcharComp;
  /**@description: Returns true if search_string is found within string.	@example: contains('abc', 'a')	@external: contains(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  contains(searchString: DVarcharable): DBoolField;
  /**@description: Returns the current value of the configuration setting	@example: current_setting('access_mode')	@external: current_setting(settingName:VARCHAR) -> ANY*/
  current_setting(): DAnyComp;
  /**@description: Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example: currval('my_sequence_name')	@external: currval(sequenceName:VARCHAR) -> BIGINT*/
  currval(): number & _DNumericComp;
  /**@description: Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example: damerau_levenshtein('hello', 'world')	@external: damerau_levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  damerau_levenshtein(str2: DVarcharable): number & _DNumericComp;
  /**@description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: date_diff(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP, enddate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP) -> BIGINT*/
  date_diff(startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: date_part(ts:VARCHAR, col1:TIME | TIMESTAMP | DATE | INTERVAL | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_part(col1: DDateable | DAnyable): number & _DNumericComp;
  /**@description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: date_sub(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP, enddate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP) -> BIGINT*/
  date_sub(startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: date_trunc(part:VARCHAR, timestamp:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIMESTAMP*/
  date_trunc(timestamp: DDateable): DDateField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: date_trunc(part:VARCHAR, timestamp:INTERVAL) -> INTERVAL*/
  date_trunc(timestamp: DAnyable): DAnyComp;
  /**@description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: datediff(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | TIMESTAMP | TIME | DATE, enddate:TIMESTAMP WITH TIME ZONE | TIMESTAMP | TIME | DATE) -> BIGINT*/
  datediff(startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: datepart(ts:VARCHAR, col1:INTERVAL | DATE | TIME | TIMESTAMP | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datepart(col1: DAnyable | DDateable): number & _DNumericComp;
  /**@description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: datesub(part:VARCHAR, startdate:TIME | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE, enddate:TIME | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE) -> BIGINT*/
  datesub(startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: datetrunc(part:VARCHAR, timestamp:TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE) -> TIMESTAMP WITH TIME ZONE*/
  datetrunc(timestamp: DDateable): DDateField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: datetrunc(part:VARCHAR, timestamp:INTERVAL) -> INTERVAL*/
  datetrunc(timestamp: DAnyable): DAnyComp;
  /**@description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@external: editdist3(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  editdist3(str2: DVarcharable): number & _DNumericComp;
  /**@description: Convert varchar to blob. Converts utf-8 characters into literal encoding	@example: encode('my_string_with_ü')	@external: encode(string:VARCHAR) -> BLOB*/
  encode(): DAnyComp;
  /**@external: ends_with(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  ends_with(col1: DVarcharable): DBoolField;
  /**@description: Throws the given error message	@example: error('access_mode')	@external: error(message:VARCHAR) -> "NULL"*/
  error(): DAnyComp;
  /**@description: Formats a string using fmt syntax	@example: format('Benchmark "{}" took {} seconds', 'CSV', 42)	@external: format(format:VARCHAR) -> VARCHAR*/
  format(...vargs: DAnyable[]): string & _DVarcharComp;
  /**@description: Convert a base64 encoded string to a character string	@example: from_base64('QQ==')	@external: from_base64(string:VARCHAR) -> BLOB*/
  from_base64(): DAnyComp;
  /**@description: Converts a value from binary representation to a blob	@example: unbin('0110')	@external: from_binary(value:VARCHAR) -> BLOB*/
  from_binary(): DAnyComp;
  /**@description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@external: from_hex(value:VARCHAR) -> BLOB*/
  from_hex(): DAnyComp;
  /**@external: from_json(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json(col1: DVarcharable): DAnyComp;
  /**@external: from_json_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json_strict(col1: DVarcharable): DAnyComp;
  /**@external: getvariable(col0:VARCHAR) -> ANY*/
  getvariable(): DAnyComp;
  /**@external: h3_are_neighbor_cells(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  h3_are_neighbor_cells(col1: DVarcharable): DBoolField;
  /**@external: h3_cell_area(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_cell_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_cell_to_boundary_wkt(): string & _DVarcharComp;
  /**@external: h3_cell_to_center_child(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_center_child(col1: DNumericable): string & _DVarcharComp;
  /**@external: h3_cell_to_child_pos(col0:VARCHAR, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_children(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_cell_to_children(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_cell_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lat(): number & _DNumericComp;
  /**@external: h3_cell_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_cell_to_latlng(): DArrayField<DNumericField>;
  /**@external: h3_cell_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lng(): number & _DNumericComp;
  /**@external: h3_cell_to_local_ij(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_local_ij(col1: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_cell_to_parent(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_parent(col1: DNumericable): string & _DVarcharComp;
  /**@external: h3_cell_to_vertex(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_vertex(col1: DNumericable): string & _DVarcharComp;
  /**@external: h3_cell_to_vertexes(col0:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_vertexes(): DArrayField<DVarcharField>;
  /**@external: h3_cells_to_directed_edge(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  h3_cells_to_directed_edge(col1: DVarcharable): string & _DVarcharComp;
  /**@external: h3_directed_edge_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(): string & _DVarcharComp;
  /**@external: h3_directed_edge_to_cells(col0:VARCHAR) -> VARCHAR[]*/
  h3_directed_edge_to_cells(): DArrayField<DVarcharField>;
  /**@external: h3_edge_length(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_get_base_cell_number(col0:VARCHAR) -> INTEGER*/
  h3_get_base_cell_number(): number & _DNumericComp;
  /**@external: h3_get_directed_edge_destination(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_destination(): string & _DVarcharComp;
  /**@external: h3_get_directed_edge_origin(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_origin(): string & _DVarcharComp;
  /**@external: h3_get_icosahedron_faces(col0:VARCHAR) -> INTEGER[]*/
  h3_get_icosahedron_faces(): DArrayField<DNumericField>;
  /**@external: h3_get_resolution(col0:VARCHAR) -> INTEGER*/
  h3_get_resolution(): number & _DNumericComp;
  /**@external: h3_grid_disk(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_grid_disk_distances(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_safe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_safe(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_unsafe(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk_unsafe(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_grid_distance(col0:VARCHAR, col1:VARCHAR) -> BIGINT*/
  h3_grid_distance(col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_grid_path_cells(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_grid_path_cells(col1: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_grid_ring_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_ring_unsafe(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_is_pentagon(col0:VARCHAR) -> BOOLEAN*/
  h3_is_pentagon(): DBoolField;
  /**@external: h3_is_res_class_iii(col0:VARCHAR) -> BOOLEAN*/
  h3_is_res_class_iii(): DBoolField;
  /**@external: h3_is_valid_cell(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_cell(): DBoolField;
  /**@external: h3_is_valid_directed_edge(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_directed_edge(): DBoolField;
  /**@external: h3_is_valid_vertex(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_vertex(): DBoolField;
  /**@external: h3_local_ij_to_cell(col0:VARCHAR, col1:INTEGER, col2:INTEGER) -> VARCHAR*/
  h3_local_ij_to_cell(col1: DNumericable, col2: DNumericable): string & _DVarcharComp;
  /**@external: h3_origin_to_directed_edges(col0:VARCHAR) -> VARCHAR[]*/
  h3_origin_to_directed_edges(): DArrayField<DVarcharField>;
  /**@external: h3_polygon_wkt_to_cells(col0:VARCHAR, col1:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_polygon_wkt_to_cells_experimental(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells_experimental(col1: DVarcharable, col2: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_polygon_wkt_to_cells_experimental_string(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_experimental_string(col1: DVarcharable, col2: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_polygon_wkt_to_cells_string(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_string(col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_string_to_h3(col0:VARCHAR) -> UBIGINT*/
  h3_string_to_h3(): number & _DNumericComp;
  /**@external: h3_vertex_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lat(): number & _DNumericComp;
  /**@external: h3_vertex_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_vertex_to_latlng(): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lng(): number & _DNumericComp;
  /**@description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@external: hamming(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  hamming(str2: DVarcharable): number & _DNumericComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:VARCHAR) -> VARCHAR*/
  hex(): string & _DVarcharComp;
  /**@external: html_escape(col0:VARCHAR, col1: | BOOLEAN) -> VARCHAR*/
  html_escape(col1?: DAnyable | DBoolable): string & _DVarcharComp;
  /**@external: html_unescape(col0:VARCHAR) -> VARCHAR*/
  html_unescape(): string & _DVarcharComp;
  /**@external: icu_sort_key(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  icu_sort_key(col1: DVarcharable): string & _DVarcharComp;
  /**@description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: ilike_escape('A%c', 'a$%C', '$')	@external: ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns whether or not the database/schema are in the search path	@example: in_search_path('memory', 'main')	@external: in_search_path(databaseName:VARCHAR, schemaName:VARCHAR) -> BOOLEAN*/
  in_search_path(schemaName: DVarcharable): DBoolField;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: instr(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  instr(needle: DVarcharable): number & _DNumericComp;
  /**@description: The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaccard('duck','luck')	@external: jaccard(str1:VARCHAR, str2:VARCHAR) -> DOUBLE*/
  jaccard(str2: DVarcharable): number & _DNumericComp;
  /**@description: The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_similarity('duck', 'duckdb', 0.5)	@external: jaro_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_similarity(str2: DVarcharable, scoreCutoff?: DNumericable | DAnyable): number & _DNumericComp;
  /**@description: The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_winkler_similarity('duck', 'duckdb', 0.5)	@external: jaro_winkler_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_winkler_similarity(str2: DVarcharable, scoreCutoff?: DNumericable | DAnyable): number & _DNumericComp;
  /**@external: json_array_length(col0:VARCHAR, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col1: DArrayable): DArrayField<DNumericField>;
  /**@external: json_array_length(col0:VARCHAR, col1: | VARCHAR) -> UBIGINT*/
  json_array_length(col1?: DAnyable | DVarcharable): number & _DNumericComp;
  /**@external: json_contains(col0:VARCHAR, col1:VARCHAR | JSON) -> BOOLEAN*/
  json_contains(col1: DVarcharable | DJsonable): DBoolField;
  /**@external: json_exists(col0:VARCHAR, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col1: DArrayable): DArrayField<DBoolField>;
  /**@external: json_exists(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col1: DVarcharable): DBoolField;
  /**@external: json_extract(col0:VARCHAR, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract(col1: DNumericable | DVarcharable): DJsonField;
  /**@external: json_extract(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path(col0:VARCHAR, col1:VARCHAR | BIGINT) -> JSON*/
  json_extract_path(col1: DVarcharable | DNumericable): DJsonField;
  /**@external: json_extract_path(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path_text(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_path_text(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col1: DNumericable | DVarcharable): string & _DVarcharComp;
  /**@external: json_extract_string(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_string(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_string(col1: DNumericable | DVarcharable): string & _DVarcharComp;
  /**@external: json_keys(col0:VARCHAR, col1: | VARCHAR | VARCHAR[]) -> VARCHAR[]*/
  json_keys(col1?: DAnyable | DVarcharable | DArrayable): DArrayField<DVarcharField>;
  /**@external: json_serialize_plan(col0:VARCHAR, col1:BOOLEAN | , col2:BOOLEAN | , col3:BOOLEAN | , col4:BOOLEAN | ) -> JSON*/
  json_serialize_plan(col1?: DBoolable | DAnyable, col2?: DBoolable | DAnyable, col3?: DBoolable | DAnyable, col4?: DBoolable | DAnyable): DJsonField;
  /**@external: json_serialize_sql(col0:VARCHAR, col1:BOOLEAN | , col2: | BOOLEAN, col3: | BOOLEAN) -> JSON*/
  json_serialize_sql(col1?: DBoolable | DAnyable, col2?: DAnyable | DBoolable, col3?: DAnyable | DBoolable): DJsonField;
  /**@external: json_structure(col0:VARCHAR) -> JSON*/
  json_structure(): DJsonField;
  /**@external: json_transform(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform(col1: DVarcharable): DAnyComp;
  /**@external: json_transform_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform_strict(col1: DVarcharable): DAnyComp;
  /**@external: json_type(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_type(col0:VARCHAR, col1: | VARCHAR) -> VARCHAR*/
  json_type(col1?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@external: json_valid(col0:VARCHAR) -> BOOLEAN*/
  json_valid(): DBoolField;
  /**@external: json_value(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_value(col0:VARCHAR, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_value(col1: DVarcharable | DNumericable): string & _DVarcharComp;
  /**@description: Convert string to lower case	@example: lower('Hello')	@external: lcase(string:VARCHAR) -> VARCHAR*/
  lcase(): string & _DVarcharComp;
  /**@description: Extract the left-most count characters	@example: left('Hello🦆', 2)	@external: left(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left(count: DNumericable): string & _DVarcharComp;
  /**@description: Extract the left-most count grapheme clusters	@example: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@external: left_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left_grapheme(count: DNumericable): string & _DVarcharComp;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: len(string:VARCHAR) -> BIGINT*/
  len(): number & _DNumericComp;
  /**@description: Number of grapheme clusters in string.	@example: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')	@external: length_grapheme(string:VARCHAR) -> BIGINT*/
  length_grapheme(): number & _DNumericComp;
  /**@description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@external: levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  levenshtein(str2: DVarcharable): number & _DNumericComp;
  /**@description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: like_escape('a%c', 'a$%c', '$')	@external: like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_element(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_element(index: DNumericable): string & _DVarcharComp;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_extract(index: DNumericable): string & _DVarcharComp;
  /**@description: Convert string to lower case	@example: lower('Hello')	@external: lower(string:VARCHAR) -> VARCHAR*/
  lower(): string & _DVarcharComp;
  /**@description: Pads the string with the character from the left until it has count characters	@example: lpad('hello', 10, '>')	@external: lpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  lpad(count: DNumericable, character: DVarcharable): string & _DVarcharComp;
  /**@description: Removes any occurrences of any of the characters from the left side of the string	@example: ltrim('>>>>test<<', '><')	@external: ltrim(string:VARCHAR, characters: | VARCHAR) -> VARCHAR*/
  ltrim(characters?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@description: Returns the MD5 hash of the value as a string	@example: md5('123')	@external: md5(value:VARCHAR) -> VARCHAR*/
  md5(): string & _DVarcharComp;
  /**@description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@external: md5_number(value:VARCHAR) -> HUGEINT*/
  md5_number(): number & _DNumericComp;
  /**@description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@external: mismatches(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  mismatches(str2: DVarcharable): number & _DNumericComp;
  /**@description: Return the following value of the sequence.	@example: nextval('my_sequence_name')	@external: nextval(sequenceName:VARCHAR) -> BIGINT*/
  nextval(): number & _DNumericComp;
  /**@description: Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example: nfc_normalize('ardèch')	@external: nfc_normalize(string:VARCHAR) -> VARCHAR*/
  nfc_normalize(): string & _DVarcharComp;
  /**@description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_ilike_escape('A%c', 'a$%C', '$')	@external: not_ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_ilike_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_like_escape('a%c', 'a$%c', '$')	@external: not_like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_like_escape(likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@external: ord(str:VARCHAR) -> INTEGER*/
  ord(): number & _DNumericComp;
  /**@description: Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirname('path/to/file.csv', 'system')	@external: parse_dirname(string:VARCHAR, separator: | VARCHAR) -> VARCHAR*/
  parse_dirname(separator?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@description: Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirpath('path/to/file.csv', 'system')	@external: parse_dirpath(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirpath(separator?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example: parse_filename('path/to/file.csv', true, 'forward_slash')	@external: parse_filename(string:VARCHAR, trimExtension:BOOLEAN |  | VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_filename(trimExtension?: DBoolable | DAnyable | DVarcharable, separator?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_path('path/to/file.csv', 'system')	@external: parse_path(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR[]*/
  parse_path(separator?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: position(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  position(needle: DVarcharable): number & _DNumericComp;
  /**@external: prefix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  prefix(col1: DVarcharable): DBoolField;
  /**@description: Formats a string using printf syntax	@example: printf('Benchmark "%s" took %d seconds', 'CSV', 42)	@external: printf(format:VARCHAR) -> VARCHAR*/
  printf(...vargs: DAnyable[]): string & _DVarcharComp;
  /**@description: Escapes all potentially meaningful regexp characters in the input string	@example: regexp_escape('https://duckdb.org')	@external: regexp_escape(string:VARCHAR) -> VARCHAR*/
  regexp_escape(): string & _DVarcharComp;
  /**@description: If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example: regexp_extract('abc', '([a-z])(b)', 1)	@external: regexp_extract(string:VARCHAR, pattern:VARCHAR, group0:VARCHAR[] | INTEGER | , options:VARCHAR | ) -> VARCHAR*/
  regexp_extract(pattern: DVarcharable, group0?: DArrayable | DNumericable | DAnyable, options?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example: regexp_extract_all('hello_world', '([a-z ]+)_?', 1)	@external: regexp_extract_all(string:VARCHAR, regex:VARCHAR, group0:INTEGER | , options:VARCHAR | ) -> VARCHAR[]*/
  regexp_extract_all(regex: DVarcharable, group0?: DNumericable | DAnyable, options?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns true if the entire string matches the regex. A set of optional options can be set.	@example: regexp_full_match('anabanana', '(an)*')	@external: regexp_full_match(string:VARCHAR, regex:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_full_match(regex: DVarcharable, options?: DVarcharable | DAnyable): DBoolField;
  /**@description: Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example: regexp_matches('anabanana', '(an)*')	@external: regexp_matches(string:VARCHAR, pattern:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_matches(pattern: DVarcharable, options?: DVarcharable | DAnyable): DBoolField;
  /**@description: If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example: regexp_replace('hello', '[lo]', '-')	@external: regexp_replace(string:VARCHAR, pattern:VARCHAR, replacement:VARCHAR, options:VARCHAR | ) -> VARCHAR*/
  regexp_replace(pattern: DVarcharable, replacement: DVarcharable, options?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: regexp_split_to_array(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  regexp_split_to_array(separator: DVarcharable, col2?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Repeats the string count number of times	@example: repeat('A', 5)	@external: repeat(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  repeat(count: DNumericable): string & _DVarcharComp;
  /**@description: Replaces any occurrences of the source with target in string	@example: replace('hello', 'l', '-')	@external: replace(string:VARCHAR, source:VARCHAR, target:VARCHAR) -> VARCHAR*/
  replace(source: DVarcharable, target: DVarcharable): string & _DVarcharComp;
  /**@description: Reverses the string	@example: reverse('hello')	@external: reverse(string:VARCHAR) -> VARCHAR*/
  reverse(): string & _DVarcharComp;
  /**@description: Extract the right-most count characters	@example: right('Hello🦆', 3)	@external: right(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right(count: DNumericable): string & _DVarcharComp;
  /**@description: Extract the right-most count grapheme clusters	@example: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@external: right_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right_grapheme(count: DNumericable): string & _DVarcharComp;
  /**@description: Pads the string with the character from the right until it has count characters	@example: rpad('hello', 10, '<')	@external: rpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  rpad(count: DNumericable, character: DVarcharable): string & _DVarcharComp;
  /**@description: Removes any occurrences of any of the characters from the right side of the string	@example: rtrim('>>>>test<<', '><')	@external: rtrim(string:VARCHAR, characters: | VARCHAR) -> VARCHAR*/
  rtrim(characters?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@description: Returns the SHA1 hash of the value	@example: sha1('hello')	@external: sha1(value:VARCHAR) -> VARCHAR*/
  sha1(): string & _DVarcharComp;
  /**@description: Returns the SHA256 hash of the value	@example: sha256('hello')	@external: sha256(value:VARCHAR) -> VARCHAR*/
  sha256(): string & _DVarcharComp;
  /**@description: Returns true if string begins with search_string	@example: starts_with('abc','a')	@external: starts_with(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  starts_with(searchString: DVarcharable): DBoolField;
  /**@external: stem(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  stem(col1: DVarcharable): string & _DVarcharComp;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: str_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  str_split(separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: str_split_regex(string:VARCHAR, separator:VARCHAR, col2: | VARCHAR) -> VARCHAR[]*/
  str_split_regex(separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**@description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@external: strftime(data:VARCHAR, format:TIMESTAMP_NS | DATE | TIMESTAMP) -> VARCHAR*/
  strftime(format: DDateable): string & _DVarcharComp;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: string_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_split(separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: string_split_regex(string:VARCHAR, separator:VARCHAR, col2: | VARCHAR) -> VARCHAR[]*/
  string_split_regex(separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: string_to_array(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_to_array(separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Strips accents from string.	@example: strip_accents('mühleisen')	@external: strip_accents(string:VARCHAR) -> VARCHAR*/
  strip_accents(): string & _DVarcharComp;
  /**@description: Number of bytes in string.	@example: strlen('🦆')	@external: strlen(string:VARCHAR) -> BIGINT*/
  strlen(): number & _DNumericComp;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: strpos(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  strpos(needle: DVarcharable): number & _DNumericComp;
  /**@description: Converts the string text to timestamp according to the format string. Throws an error on failure. To return NULL on failure, use try_strptime.	@example: strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@external: strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  strptime(format: DVarcharable | DArrayable): DDateField;
  /**@description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@external: substr(string:VARCHAR, start:BIGINT, length: | BIGINT) -> VARCHAR*/
  substr(start: DNumericable, length?: DAnyable | DNumericable): string & _DVarcharComp;
  /**@description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@external: substring(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring(start: DNumericable, length?: DNumericable | DAnyable): string & _DVarcharComp;
  /**@description: Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)	@external: substring_grapheme(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring_grapheme(start: DNumericable, length?: DNumericable | DAnyable): string & _DVarcharComp;
  /**@external: suffix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  suffix(col1: DVarcharable): DBoolField;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:VARCHAR, col1:TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIME WITH TIME ZONE*/
  timezone(col1: DDateable): DDateField;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:VARCHAR) -> VARCHAR*/
  to_binary(): string & _DVarcharComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:VARCHAR) -> VARCHAR*/
  to_hex(): string & _DVarcharComp;
  /**@description: Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example: translate('12345', '143', 'ax')	@external: translate(string:VARCHAR, from:VARCHAR, to:VARCHAR) -> VARCHAR*/
  translate(from: DVarcharable, to: DVarcharable): string & _DVarcharComp;
  /**@description: Removes any occurrences of any of the characters from either side of the string	@example: trim('>>>>test<<', '><')	@external: trim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  trim(characters?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example: try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@external: try_strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  try_strptime(format: DVarcharable | DArrayable): DDateField;
  /**@description: Convert string to upper case.	@example: upper('Hello')	@external: ucase(string:VARCHAR) -> VARCHAR*/
  ucase(): string & _DVarcharComp;
  /**@description: Converts a value from binary representation to a blob	@example: unbin('0110')	@external: unbin(value:VARCHAR) -> BLOB*/
  unbin(): DAnyComp;
  /**@description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@external: unhex(value:VARCHAR) -> BLOB*/
  unhex(): DAnyComp;
  /**@description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@external: unicode(str:VARCHAR) -> INTEGER*/
  unicode(): number & _DNumericComp;
  /**@description: Convert string to upper case.	@example: upper('Hello')	@external: upper(string:VARCHAR) -> VARCHAR*/
  upper(): string & _DVarcharComp;
  /**@description: Unescapes the URL encoded input.	@example: url_decode('this%20string%20is%2BFencoded')	@external: url_decode(input:VARCHAR) -> VARCHAR*/
  url_decode(): string & _DVarcharComp;
  /**@description: Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example: url_encode('this string has/ special+ characters>')	@external: url_encode(input:VARCHAR) -> VARCHAR*/
  url_encode(): string & _DVarcharComp;
  /**@description: Writes to the logger	@example: write_log('Hello')	@external: write_log(string:VARCHAR) -> ANY*/
  write_log(...vargs: DAnyable[]): DAnyComp;
}
export type DVarcharComp = string & _DVarcharComp;

export interface _DNumericComp extends DAnyComp {
  /**@example: Between(val, col1, col2)	@external: Between(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  Between(col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: NotBetween(val, col1, col2)	@external: NotBetween(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  NotBetween(col1: DNumericable, col2: DNumericable): DBoolField;
  /**@description: Absolute value	@example: abs(-17.4)	@external: abs(x:BIGINT) -> BIGINT*/
  abs(): number & _DNumericComp;
  /**@description: Computes the arccosine of x	@example: acos(0.5)	@external: acos(x:DOUBLE) -> DOUBLE*/
  acos(): number & _DNumericComp;
  /**@description: Computes the inverse hyperbolic cos of x	@example: acosh(2.3)	@external: acosh(x:DOUBLE) -> DOUBLE*/
  acosh(): number & _DNumericComp;
  /**@external: add(col0:BIGINT, col1: | BIGINT) -> BIGINT*/
  add(col1?: DAnyable | DNumericable): number & _DNumericComp;
  /**@external: add(col0:DECIMAL, col1:DECIMAL | ) -> DECIMAL*/
  add(col1?: DNumericable | DAnyable): number & _DNumericComp;
  /**@external: add(col0:INTEGER, col1:DATE) -> DATE*/
  add(col1: DDateable): DDateField;
  /**@description: Computes the arcsine of x	@example: asin(0.5)	@external: asin(x:DOUBLE) -> DOUBLE*/
  asin(): number & _DNumericComp;
  /**@description: Computes the inverse hyperbolic sin of x	@example: asinh(0.5)	@external: asinh(x:DOUBLE) -> DOUBLE*/
  asinh(): number & _DNumericComp;
  /**@description: Computes the arctangent of x	@example: atan(0.5)	@external: atan(x:DOUBLE) -> DOUBLE*/
  atan(): number & _DNumericComp;
  /**@description: Computes the arctangent (y, x)	@example: atan2(1.0, 0.0)	@external: atan2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  atan2(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the inverse hyperbolic tan of x	@example: atanh(0.5)	@external: atanh(x:DOUBLE) -> DOUBLE*/
  atanh(): number & _DNumericComp;
  /**@description: Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example: bar(5, 0, 20, 10)	@external: bar(x:DOUBLE, min:DOUBLE, max:DOUBLE, width:DOUBLE | ) -> VARCHAR*/
  bar(min: DNumericable, max: DNumericable, width?: DNumericable | DAnyable): string & _DVarcharComp;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:BIGINT) -> VARCHAR*/
  bin(): string & _DVarcharComp;
  /**@description: Returns the number of bits that are set	@example: bit_count(31)	@external: bit_count(x:BIGINT) -> TINYINT*/
  bit_count(): number & _DNumericComp;
  /**@description: Returns the cube root of x	@example: cbrt(8)	@external: cbrt(x:DOUBLE) -> DOUBLE*/
  cbrt(): number & _DNumericComp;
  /**@description: Rounds the number up	@example: ceil(17.4)	@external: ceil(x:DECIMAL) -> DECIMAL*/
  ceil(): number & _DNumericComp;
  /**@description: Rounds the number up	@example: ceil(17.4)	@external: ceiling(x:DECIMAL) -> DECIMAL*/
  ceiling(): number & _DNumericComp;
  /**@description: Returns a character which is corresponding the ASCII code value or Unicode code point	@example: chr(65)	@external: chr(codePoint:INTEGER) -> VARCHAR*/
  chr(): string & _DVarcharComp;
  /**@description: Computes the cos of x	@example: cos(90)	@external: cos(x:DOUBLE) -> DOUBLE*/
  cos(): number & _DNumericComp;
  /**@description: Computes the hyperbolic cos of x	@example: cosh(1)	@external: cosh(x:DOUBLE) -> DOUBLE*/
  cosh(): number & _DNumericComp;
  /**@description: Computes the cotangent of x	@example: cot(0.5)	@external: cot(x:DOUBLE) -> DOUBLE*/
  cot(): number & _DNumericComp;
  /**@description: Converts radians to degrees	@example: degrees(pi())	@external: degrees(x:DOUBLE) -> DOUBLE*/
  degrees(): number & _DNumericComp;
  /**@external: divide(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  divide(col1: DNumericable): number & _DNumericComp;
  /**@description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ms(temporal:BIGINT) -> TIMESTAMP*/
  epoch_ms(): DDateField;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:BIGINT, max:BIGINT, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Rounds x to next even number by rounding away from zero	@example: even(2.9)	@external: even(x:DOUBLE) -> DOUBLE*/
  even(): number & _DNumericComp;
  /**@external: excel_text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  excel_text(col1: DVarcharable): string & _DVarcharComp;
  /**@description: Computes e to the power of x	@example: exp(1)	@external: exp(x:DOUBLE) -> DOUBLE*/
  exp(): number & _DNumericComp;
  /**@description: Factorial of x. Computes the product of the current integer and all integers below it	@example: 4!	@external: factorial(x:INTEGER) -> HUGEINT*/
  factorial(): number & _DNumericComp;
  /**@description: Rounds the number down	@example: floor(17.4)	@external: floor(x:DECIMAL) -> DECIMAL*/
  floor(): number & _DNumericComp;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example: format_bytes(1000 * 16)	@external: formatReadableDecimalSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableDecimalSize(): string & _DVarcharComp;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@external: formatReadableSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableSize(): string & _DVarcharComp;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@external: format_bytes(bytes:BIGINT) -> VARCHAR*/
  format_bytes(): string & _DVarcharComp;
  /**@description: Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example: gamma(5.5)	@external: gamma(x:DOUBLE) -> DOUBLE*/
  gamma(): number & _DNumericComp;
  /**@description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@external: gcd(x:BIGINT, y:BIGINT) -> BIGINT*/
  gcd(y: DNumericable): number & _DNumericComp;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:BIGINT, stop: | BIGINT, step: | BIGINT) -> BIGINT[]*/
  generate_series(stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /**@description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@external: greatest_common_divisor(x:BIGINT, y:BIGINT) -> BIGINT*/
  greatest_common_divisor(y: DNumericable): number & _DNumericComp;
  /**@external: h3_are_neighbor_cells(col0:BIGINT, col1:BIGINT) -> BOOLEAN*/
  h3_are_neighbor_cells(col1: DNumericable): DBoolField;
  /**@external: h3_cell_area(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_cell_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_cell_to_boundary_wkt(): string & _DVarcharComp;
  /**@external: h3_cell_to_center_child(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_center_child(col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_child_pos(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_children(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_cell_to_children(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lat(): number & _DNumericComp;
  /**@external: h3_cell_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_cell_to_latlng(): DArrayField<DNumericField>;
  /**@external: h3_cell_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lng(): number & _DNumericComp;
  /**@external: h3_cell_to_local_ij(col0:BIGINT, col1:BIGINT) -> INTEGER[]*/
  h3_cell_to_local_ij(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_parent(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_parent(col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_vertex(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_vertex(col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_vertexes(col0:BIGINT) -> BIGINT[]*/
  h3_cell_to_vertexes(): DArrayField<DNumericField>;
  /**@external: h3_cells_to_directed_edge(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_cells_to_directed_edge(col1: DNumericable): number & _DNumericComp;
  /**@external: h3_child_pos_to_cell(col0:BIGINT, col1:BIGINT | UBIGINT, col2:INTEGER) -> BIGINT*/
  h3_child_pos_to_cell(col1: DNumericable, col2: DNumericable): number & _DNumericComp;
  /**@external: h3_child_pos_to_cell(col0:BIGINT, col1:VARCHAR, col2:INTEGER) -> VARCHAR*/
  h3_child_pos_to_cell(col1: DVarcharable, col2: DNumericable): string & _DVarcharComp;
  /**@external: h3_directed_edge_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(): string & _DVarcharComp;
  /**@external: h3_directed_edge_to_cells(col0:BIGINT) -> UBIGINT[]*/
  h3_directed_edge_to_cells(): DArrayField<DNumericField>;
  /**@external: h3_edge_length(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_get_base_cell_number(col0:BIGINT) -> INTEGER*/
  h3_get_base_cell_number(): number & _DNumericComp;
  /**@external: h3_get_directed_edge_destination(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_destination(): number & _DNumericComp;
  /**@external: h3_get_directed_edge_origin(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_origin(): number & _DNumericComp;
  /**@external: h3_get_hexagon_area_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_area_avg(col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_get_hexagon_edge_length_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_edge_length_avg(col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_get_icosahedron_faces(col0:BIGINT) -> INTEGER[]*/
  h3_get_icosahedron_faces(): DArrayField<DNumericField>;
  /**@external: h3_get_num_cells(col0:INTEGER) -> BIGINT*/
  h3_get_num_cells(): number & _DNumericComp;
  /**@external: h3_get_pentagons(col0:INTEGER) -> UBIGINT[]*/
  h3_get_pentagons(): DArrayField<DNumericField>;
  /**@external: h3_get_pentagons_string(col0:INTEGER) -> VARCHAR[]*/
  h3_get_pentagons_string(): DArrayField<DVarcharField>;
  /**@external: h3_get_resolution(col0:BIGINT) -> INTEGER*/
  h3_get_resolution(): number & _DNumericComp;
  /**@external: h3_great_circle_distance(col0:DOUBLE, col1:DOUBLE, col2:DOUBLE, col3:DOUBLE, col4:VARCHAR) -> DOUBLE*/
  h3_great_circle_distance(col1: DNumericable, col2: DNumericable, col3: DNumericable, col4: DVarcharable): number & _DNumericComp;
  /**@external: h3_grid_disk(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_disk_distances(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_safe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_safe(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_unsafe(col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk_unsafe(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_distance(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_grid_distance(col1: DNumericable): number & _DNumericComp;
  /**@external: h3_grid_path_cells(col0:BIGINT, col1:BIGINT) -> BIGINT[]*/
  h3_grid_path_cells(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_ring_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_ring_unsafe(col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_h3_to_string(col0:BIGINT) -> VARCHAR*/
  h3_h3_to_string(): string & _DVarcharComp;
  /**@external: h3_is_pentagon(col0:BIGINT) -> BOOLEAN*/
  h3_is_pentagon(): DBoolField;
  /**@external: h3_is_res_class_iii(col0:BIGINT) -> BOOLEAN*/
  h3_is_res_class_iii(): DBoolField;
  /**@external: h3_is_valid_cell(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_cell(): DBoolField;
  /**@external: h3_is_valid_directed_edge(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_directed_edge(): DBoolField;
  /**@external: h3_is_valid_vertex(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_vertex(): DBoolField;
  /**@external: h3_latlng_to_cell(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> UBIGINT*/
  h3_latlng_to_cell(col1: DNumericable, col2: DNumericable): number & _DNumericComp;
  /**@external: h3_latlng_to_cell_string(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> VARCHAR*/
  h3_latlng_to_cell_string(col1: DNumericable, col2: DNumericable): string & _DVarcharComp;
  /**@external: h3_local_ij_to_cell(col0:BIGINT, col1:INTEGER, col2:INTEGER) -> BIGINT*/
  h3_local_ij_to_cell(col1: DNumericable, col2: DNumericable): number & _DNumericComp;
  /**@external: h3_origin_to_directed_edges(col0:BIGINT) -> UBIGINT[]*/
  h3_origin_to_directed_edges(): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lat(): number & _DNumericComp;
  /**@external: h3_vertex_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_vertex_to_latlng(): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lng(): number & _DNumericComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:BIGINT) -> VARCHAR*/
  hex(): string & _DVarcharComp;
  /**@description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@external: isfinite(x:DOUBLE) -> BOOLEAN*/
  isfinite(): DBoolField;
  /**@description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@external: isinf(x:DOUBLE) -> BOOLEAN*/
  isinf(): DBoolField;
  /**@description: Returns true if the floating point value is not a number, false otherwise	@example: isnan('NaN'::FLOAT)	@external: isnan(x:DOUBLE) -> BOOLEAN*/
  isnan(): DBoolField;
  /**@description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@external: lcm(x:BIGINT, y:BIGINT) -> BIGINT*/
  lcm(y: DNumericable): number & _DNumericComp;
  /**@description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@external: least_common_multiple(x:BIGINT, y:BIGINT) -> BIGINT*/
  least_common_multiple(y: DNumericable): number & _DNumericComp;
  /**@description: Computes the log of the gamma function	@example: lgamma(2)	@external: lgamma(x:DOUBLE) -> DOUBLE*/
  lgamma(): number & _DNumericComp;
  /**@description: Computes the natural logarithm of x	@example: ln(2)	@external: ln(x:DOUBLE) -> DOUBLE*/
  ln(): number & _DNumericComp;
  /**@description: Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example: log(2, 64)	@external: log(b:DOUBLE, x: | DOUBLE) -> DOUBLE*/
  log(x?: DAnyable | DNumericable): number & _DNumericComp;
  /**@description: Computes the 10-log of x	@example: log10(1000)	@external: log10(x:DOUBLE) -> DOUBLE*/
  log10(): number & _DNumericComp;
  /**@description: Computes the 2-log of x	@example: log2(8)	@external: log2(x:DOUBLE) -> DOUBLE*/
  log2(): number & _DNumericComp;
  /**@description: The date for the given parts	@example: make_date(1992, 9, 20)	@external: make_date(year:BIGINT, month:BIGINT, day:BIGINT) -> DATE*/
  make_date(month: DNumericable, day: DNumericable): DDateField;
  /**@external: make_date(col0:INTEGER) -> DATE*/
  make_date(): DDateField;
  /**@description: The time for the given parts	@example: make_time(13, 34, 27.123456)	@external: make_time(hour:BIGINT, minute:BIGINT, seconds:DOUBLE) -> TIME*/
  make_time(minute: DNumericable, seconds: DNumericable): DDateField;
  /**@description: The timestamp for the given parts	@example: make_timestamp(1992, 9, 20, 13, 34, 27.123456)	@external: make_timestamp(year:BIGINT, month: | BIGINT, day: | BIGINT, hour: | BIGINT, minute: | BIGINT, seconds: | DOUBLE) -> TIMESTAMP*/
  make_timestamp(month?: DAnyable | DNumericable, day?: DAnyable | DNumericable, hour?: DAnyable | DNumericable, minute?: DAnyable | DNumericable, seconds?: DAnyable | DNumericable): DDateField;
  /**@description: The timestamp for the given nanoseconds since epoch	@example: make_timestamp(1732117793000000000)	@external: make_timestamp_ns(nanos:BIGINT) -> TIMESTAMP_NS*/
  make_timestamp_ns(): DDateField;
  /**@external: make_timestamptz(col0:BIGINT, col1: | BIGINT, col2: | BIGINT, col3: | BIGINT, col4: | BIGINT, col5: | DOUBLE, col6: | VARCHAR) -> TIMESTAMP WITH TIME ZONE*/
  make_timestamptz(col1?: DAnyable | DNumericable, col2?: DAnyable | DNumericable, col3?: DAnyable | DNumericable, col4?: DAnyable | DNumericable, col5?: DAnyable | DNumericable, col6?: DAnyable | DVarcharable): DDateField;
  /**@external: mod(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  mod(col1: DNumericable): number & _DNumericComp;
  /**@external: multiply(col0:BIGINT, col1:INTERVAL) -> INTERVAL*/
  multiply(col1: DAnyable): DAnyComp;
  /**@external: multiply(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  multiply(col1: DNumericable): number & _DNumericComp;
  /**@description: Returns the next floating point value after x in the direction of y	@example: nextafter(1::float, 2::float)	@external: nextafter(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  nextafter(y: DNumericable): number & _DNumericComp;
  /**@description: Computes x to the power of y	@example: pow(2, 3)	@external: pow(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  pow(y: DNumericable): number & _DNumericComp;
  /**@description: Computes x to the power of y	@example: pow(2, 3)	@external: power(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  power(y: DNumericable): number & _DNumericComp;
  /**@description: Converts degrees to radians	@example: radians(90)	@external: radians(x:DOUBLE) -> DOUBLE*/
  radians(): number & _DNumericComp;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  range(stop?: DNumericable | DAnyable, step?: DNumericable | DAnyable): DArrayField<DNumericField>;
  /**@description: Rounds x to s decimal places	@example: round(42.4332, 2)	@external: round(x:DECIMAL, precision: | INTEGER) -> DECIMAL*/
  round(precision?: DAnyable | DNumericable): number & _DNumericComp;
  /**@description: Rounds x to s decimal places	@example: round(42.4332, 2)	@external: round(x:DOUBLE, precision:INTEGER | ) -> DOUBLE*/
  round(precision?: DNumericable | DAnyable): number & _DNumericComp;
  /**@description: Sets the seed to be used for the random function	@example: setseed(0.42)	@external: setseed(col0:DOUBLE) -> "NULL"*/
  setseed(): DAnyComp;
  /**@description: Returns the sign of x as -1, 0 or 1	@example: sign(-349)	@external: sign(x:BIGINT) -> TINYINT*/
  sign(): number & _DNumericComp;
  /**@description: Returns whether the signbit is set or not	@example: signbit(-0.0)	@external: signbit(x:DOUBLE) -> BOOLEAN*/
  signbit(): DBoolField;
  /**@description: Computes the sin of x	@example: sin(90)	@external: sin(x:DOUBLE) -> DOUBLE*/
  sin(): number & _DNumericComp;
  /**@description: Computes the hyperbolic sin of x	@example: sinh(1)	@external: sinh(x:DOUBLE) -> DOUBLE*/
  sinh(): number & _DNumericComp;
  /**@description: Returns the square root of x	@example: sqrt(4)	@external: sqrt(x:DOUBLE) -> DOUBLE*/
  sqrt(): number & _DNumericComp;
  /**@external: subtract(col0:BIGINT, col1: | BIGINT) -> BIGINT*/
  subtract(col1?: DAnyable | DNumericable): number & _DNumericComp;
  /**@external: subtract(col0:UBIGINT, col1:UBIGINT | ) -> UBIGINT*/
  subtract(col1?: DNumericable | DAnyable): number & _DNumericComp;
  /**@description: Computes the tan of x	@example: tan(90)	@external: tan(x:DOUBLE) -> DOUBLE*/
  tan(): number & _DNumericComp;
  /**@description: Computes the hyperbolic tan of x	@example: tanh(1)	@external: tanh(x:DOUBLE) -> DOUBLE*/
  tanh(): number & _DNumericComp;
  /**@external: text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  text(col1: DVarcharable): string & _DVarcharComp;
  /**@description: Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example: to_base(42, 16)	@external: to_base(number:BIGINT, radix:INTEGER, minLength: | INTEGER) -> VARCHAR*/
  to_base(radix: DNumericable, minLength?: DAnyable | DNumericable): string & _DVarcharComp;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:BIGINT) -> VARCHAR*/
  to_binary(): string & _DVarcharComp;
  /**@description: Construct a century interval	@example: to_centuries(5)	@external: to_centuries(integer:INTEGER) -> INTERVAL*/
  to_centuries(): DAnyComp;
  /**@description: Construct a day interval	@example: to_days(5)	@external: to_days(integer:INTEGER) -> INTERVAL*/
  to_days(): DAnyComp;
  /**@description: Construct a decade interval	@example: to_decades(5)	@external: to_decades(integer:INTEGER) -> INTERVAL*/
  to_decades(): DAnyComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:BIGINT) -> VARCHAR*/
  to_hex(): string & _DVarcharComp;
  /**@description: Construct a hour interval	@example: to_hours(5)	@external: to_hours(integer:BIGINT) -> INTERVAL*/
  to_hours(): DAnyComp;
  /**@description: Construct a microsecond interval	@example: to_microseconds(5)	@external: to_microseconds(integer:BIGINT) -> INTERVAL*/
  to_microseconds(): DAnyComp;
  /**@description: Construct a millenium interval	@example: to_millennia(1)	@external: to_millennia(integer:INTEGER) -> INTERVAL*/
  to_millennia(): DAnyComp;
  /**@description: Construct a millisecond interval	@example: to_milliseconds(5.5)	@external: to_milliseconds(double:DOUBLE) -> INTERVAL*/
  to_milliseconds(): DAnyComp;
  /**@description: Construct a minute interval	@example: to_minutes(5)	@external: to_minutes(integer:BIGINT) -> INTERVAL*/
  to_minutes(): DAnyComp;
  /**@description: Construct a month interval	@example: to_months(5)	@external: to_months(integer:INTEGER) -> INTERVAL*/
  to_months(): DAnyComp;
  /**@description: Construct a quarter interval	@example: to_quarters(5)	@external: to_quarters(integer:INTEGER) -> INTERVAL*/
  to_quarters(): DAnyComp;
  /**@description: Construct a second interval	@example: to_seconds(5.5)	@external: to_seconds(double:DOUBLE) -> INTERVAL*/
  to_seconds(): DAnyComp;
  /**@description: Converts secs since epoch to a timestamp with time zone	@example: to_timestamp(1284352323.5)	@external: to_timestamp(sec:DOUBLE) -> TIMESTAMP WITH TIME ZONE*/
  to_timestamp(): DDateField;
  /**@description: Construct a week interval	@example: to_weeks(5)	@external: to_weeks(integer:INTEGER) -> INTERVAL*/
  to_weeks(): DAnyComp;
  /**@description: Construct a year interval	@example: to_years(5)	@external: to_years(integer:INTEGER) -> INTERVAL*/
  to_years(): DAnyComp;
  /**@description: Truncates the number	@example: trunc(17.4)	@external: trunc(x:BIGINT) -> BIGINT*/
  trunc(): number & _DNumericComp;
  /**@description: Bitwise XOR	@example: xor(17, 5)	@external: xor(left:BIGINT, right:BIGINT) -> BIGINT*/
  xor(right: DNumericable): number & _DNumericComp;
}
export type DNumericComp = string & _DNumericComp;

export interface DGlobalComp {
  cast(val: DBoolable, destype: DBOOLEAN_NATIVE, ...args: DAnyable[]): DBoolField;
  cast(val: DAnyable, destype: DCOMPOSITE_NATIVE, ...args: DAnyable[]): DAnyComp;
  cast(val: DDateable, destype: DDATETIME_NATIVE, ...args: DAnyable[]): DDateField;
  cast(val: DNumericable, destype: DNUMERIC_NATIVE, ...args: DAnyable[]): DNumericComp;
  cast(val: DVarcharable, destype: DSTRING_NATIVE, ...args: DAnyable[]): DVarcharComp;
  cast(val: DAnyable, destype: DANY_NATIVE, ...args: DAnyable[]): DAnyComp;
  /**@example: Array(val)	@external: Array(val:OTHER) -> ARRAY*/
  Array(val: DAnyable): DArrayField;
  /**@example: Between(val, col1, col2)	@external: Between(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  Between(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: Bigint(val)	@external: Bigint(val:OTHER) -> BIGINT*/
  Bigint(val: DAnyable): number & _DNumericComp;
  /**@example: Bit(val)	@external: Bit(val:OTHER) -> BIT*/
  Bit(val: DAnyable): DAnyComp;
  /**@example: Blob(val)	@external: Blob(val:OTHER) -> BLOB*/
  Blob(val: DAnyable): DAnyComp;
  /**@example: Boolean(val)	@external: Boolean(val:OTHER) -> BOOLEAN*/
  Boolean(val: DAnyable): DBoolField;
  /**@example: Date(val)	@external: Date(val:OTHER) -> DATE*/
  Date(val: DAnyable): DDateField;
  /**@example: Decimal(val)	@external: Decimal(val:OTHER) -> DECIMAL*/
  Decimal(val: DAnyable): number & _DNumericComp;
  /**@example: Double(val)	@external: Double(val:OTHER) -> DOUBLE*/
  Double(val: DAnyable): number & _DNumericComp;
  /**@example: Enum(val)	@external: Enum(val:OTHER) -> ENUM*/
  Enum(val: DAnyable): DAnyComp;
  /**@example: Float(val)	@external: Float(val:OTHER) -> FLOAT*/
  Float(val: DAnyable): number & _DNumericComp;
  /**@example: Glob(val, matcher)	@external: Glob(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Glob(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: Hugeint(val)	@external: Hugeint(val:OTHER) -> HUGEINT*/
  Hugeint(val: DAnyable): number & _DNumericComp;
  /**@example: Ilike(val, matcher)	@external: Ilike(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Ilike(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: In(val, matcher)	@external: In(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  In(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: Integer(val)	@external: Integer(val:OTHER) -> INTEGER*/
  Integer(val: DAnyable): number & _DNumericComp;
  /**@example: Interval(val)	@external: Interval(val:OTHER) -> INTERVAL*/
  Interval(val: DAnyable): DAnyComp;
  /**@example: IsNull(val)	@external: IsNull(val:ANY) -> BOOLEAN*/
  IsNull(val: DAnyable): DBoolField;
  /**@example: Json(val)	@external: Json(val:OTHER) -> JSON*/
  Json(val: DAnyable): DJsonField;
  /**@example: Like(val, matcher)	@external: Like(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  Like(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: List(val)	@external: List(val:OTHER) -> LIST*/
  List(val: DAnyable): DArrayField;
  /**@example: Map(val)	@external: Map(val:OTHER) -> MAP*/
  Map(val: DAnyable): DAnyComp;
  /**@example: NotBetween(val, col1, col2)	@external: NotBetween(val:INT, col1:INT, col2:INT) -> BOOLEAN*/
  NotBetween(val: DNumericable, col1: DNumericable, col2: DNumericable): DBoolField;
  /**@example: Null(val)	@external: Null(val:OTHER) -> NULL*/
  Null(val: DAnyable): DAnyComp;
  /**@example: SimilarTo(val, matcher)	@external: SimilarTo(val:VARCHAR, matcher:ANY) -> BOOLEAN*/
  SimilarTo(val: DVarcharable, matcher: DAnyable): DBoolField;
  /**@example: Smallint(val)	@external: Smallint(val:OTHER) -> SMALLINT*/
  Smallint(val: DAnyable): number & _DNumericComp;
  /**@example: Struct(val)	@external: Struct(val:OTHER) -> STRUCT*/
  Struct(val: DAnyable): DStructField;
  /**@example: Time(val)	@external: Time(val:OTHER) -> TIME*/
  Time(val: DAnyable): DDateField;
  /**@example: Timestamp(val)	@external: Timestamp(val:OTHER) -> TIMESTAMP*/
  Timestamp(val: DAnyable): DDateField;
  /**@example: Timestamp_ms(val)	@external: Timestamp_ms(val:OTHER) -> TIMESTAMP_MS*/
  Timestamp_ms(val: DAnyable): DDateField;
  /**@example: Timestamp_ns(val)	@external: Timestamp_ns(val:OTHER) -> TIMESTAMP_NS*/
  Timestamp_ns(val: DAnyable): DDateField;
  /**@example: Timestamp_s(val)	@external: Timestamp_s(val:OTHER) -> TIMESTAMP_S*/
  Timestamp_s(val: DAnyable): DDateField;
  /**@example: Tinyint(val)	@external: Tinyint(val:OTHER) -> TINYINT*/
  Tinyint(val: DAnyable): number & _DNumericComp;
  /**@example: Ubigint(val)	@external: Ubigint(val:OTHER) -> UBIGINT*/
  Ubigint(val: DAnyable): number & _DNumericComp;
  /**@example: Uhugeint(val)	@external: Uhugeint(val:OTHER) -> UHUGEINT*/
  Uhugeint(val: DAnyable): number & _DNumericComp;
  /**@example: Uinteger(val)	@external: Uinteger(val:OTHER) -> UINTEGER*/
  Uinteger(val: DAnyable): number & _DNumericComp;
  /**@example: Union(val)	@external: Union(val:OTHER) -> UNION*/
  Union(val: DAnyable): DAnyComp;
  /**@example: Usmallint(val)	@external: Usmallint(val:OTHER) -> USMALLINT*/
  Usmallint(val: DAnyable): number & _DNumericComp;
  /**@example: Utinyint(val)	@external: Utinyint(val:OTHER) -> UTINYINT*/
  Utinyint(val: DAnyable): number & _DNumericComp;
  /**@example: Uuid(val)	@external: Uuid(val:OTHER) -> UUID*/
  Uuid(val: DAnyable): DAnyComp;
  /**@example: Varchar(val)	@external: Varchar(val:OTHER) -> VARCHAR*/
  Varchar(val: DAnyable): string & _DVarcharComp;
  /**@example: Varint(val)	@external: Varint(val:OTHER) -> VARINT*/
  Varint(val: DAnyable): DAnyComp;
  /**@description: Absolute value	@example: abs(-17.4)	@external: abs(x:BIGINT) -> BIGINT*/
  abs(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the arccosine of x	@example: acos(0.5)	@external: acos(x:DOUBLE) -> DOUBLE*/
  acos(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the inverse hyperbolic cos of x	@example: acosh(2.3)	@external: acosh(x:DOUBLE) -> DOUBLE*/
  acosh(x: DNumericable): number & _DNumericComp;
  /**@external: add(col0:ANY[], col1:ANY[]) -> ANY[]*/
  add(col0: DArrayable, col1: DArrayable): DArrayField<DAnyField>;
  /**@external: add(col0:BIGINT, col1: | BIGINT) -> BIGINT*/
  add(col0: DNumericable, col1?: DAnyable | DNumericable): number & _DNumericComp;
  /**@external: add(col0:DATE, col1:TIME WITH TIME ZONE | TIME | INTERVAL | INTEGER) -> TIMESTAMP WITH TIME ZONE*/
  add(col0: DDateable, col1: DDateable | DAnyable | DNumericable): DDateField;
  /**@external: add(col0:DECIMAL, col1:DECIMAL | ) -> DECIMAL*/
  add(col0: DNumericable, col1?: DNumericable | DAnyable): number & _DNumericComp;
  /**@external: add(col0:INTEGER, col1:DATE) -> DATE*/
  add(col0: DNumericable, col1: DDateable): DDateField;
  /**@external: add(col0:INTERVAL, col1:TIME WITH TIME ZONE | TIMESTAMP | TIME | DATE) -> TIME WITH TIME ZONE*/
  add(col0: DAnyable, col1: DDateable): DDateField;
  /**@external: add(col0:INTERVAL, col1:INTERVAL) -> INTERVAL*/
  add(col0: DAnyable, col1: DAnyable): DAnyComp;
  /**@external: add(col0:TIME WITH TIME ZONE, col1:DATE | INTERVAL) -> TIMESTAMP WITH TIME ZONE*/
  add(col0: DDateable, col1: DDateable | DAnyable): DDateField;
  /**@external: add(col0:TIME, col1:INTERVAL | DATE) -> TIME*/
  add(col0: DDateable, col1: DAnyable | DDateable): DDateField;
  /**@external: add(col0:TIMESTAMP, col1:INTERVAL) -> TIMESTAMP*/
  add(col0: DDateable, col1: DAnyable): DDateField;
  /**@description: Subtract arguments, resulting in the time difference between the two timestamps	@example: age(TIMESTAMP '2001-04-10', TIMESTAMP '1992-09-20')	@external: age(timestamp:TIMESTAMP WITH TIME ZONE, timestamp__01: | TIMESTAMP WITH TIME ZONE) -> INTERVAL*/
  age(timestamp: DDateable, timestamp__01?: DAnyable | DDateable): DAnyComp;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  aggregate(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns the name of a given expression	@example: alias(42 + 1)	@external: alias(expr:ANY) -> VARCHAR*/
  alias(expr: DAnyable): string & _DVarcharComp;
  /**@description: Returns the first non-null value from arg. This function is affected by ordering.	@external: any_value(arg:ANY) -> ANY*/
  any_value(arg: DAnyable): DAnyComp;
  /**@description: Returns the first non-null value from arg. This function is affected by ordering.	@external: any_value(arg:DECIMAL) -> DECIMAL*/
  any_value(arg: DNumericable): number & _DNumericComp;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  apply(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Computes the approximate count of distinct elements using HyperLogLog.	@example: approx_count_distinct(A)	@external: approx_count_distinct(any:ANY) -> BIGINT*/
  approx_count_distinct(any: DAnyable): number & _DNumericComp;
  /**@description: Computes the approximate quantile using T-Digest.	@example: approx_quantile(x, 0.5)	@external: approx_quantile(x:DATE | TIME | TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, pos:FLOAT) -> DATE*/
  approx_quantile(x: DDateable, pos: DNumericable): DDateField;
  /**@description: Computes the approximate quantile using T-Digest.	@example: approx_quantile(x, 0.5)	@external: approx_quantile(x:TIMESTAMP | DATE | TIME WITH TIME ZONE | TIME | DECIMAL | TINYINT | SMALLINT | INTEGER | BIGINT | HUGEINT | FLOAT | DOUBLE | TIMESTAMP WITH TIME ZONE, pos:FLOAT[]) -> TIMESTAMP[]*/
  approx_quantile(x: DDateable | DNumericable, pos: DArrayable): DArrayField<DDateField>;
  /**@description: Computes the approximate quantile using T-Digest.	@example: approx_quantile(x, 0.5)	@external: approx_quantile(x:DECIMAL | SMALLINT | INTEGER | BIGINT | HUGEINT | DOUBLE, pos:FLOAT) -> DECIMAL*/
  approx_quantile(x: DNumericable, pos: DNumericable): number & _DNumericComp;
  /**@description: Finds the k approximately most occurring values in the data set	@example: approx_top_k(x, 5)	@external: approx_top_k(val:ANY, k:BIGINT) -> ANY[]*/
  approx_top_k(val: DAnyable, k: DNumericable): DArrayField<DAnyField>;
  /**@description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@external: arbitrary(arg:ANY) -> ANY*/
  arbitrary(arg: DAnyable): DAnyComp;
  /**@description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@external: arbitrary(arg:DECIMAL) -> DECIMAL*/
  arbitrary(arg: DNumericable): number & _DNumericComp;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:DATE | TIMESTAMP WITH TIME ZONE | TIMESTAMP, val:BLOB | TIMESTAMP | TIMESTAMP WITH TIME ZONE | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT | INTEGER) -> DATE*/
  arg_max(arg: DDateable, val: DAnyable | DDateable | DVarcharable | DNumericable): DDateField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:ANY, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  arg_max(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyComp;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  arg_max(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:DECIMAL | INTEGER | BIGINT | DOUBLE, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> DECIMAL*/
  arg_max(arg: DNumericable, val: DNumericable | DVarcharable | DDateable | DAnyable): number & _DNumericComp;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: arg_max(arg:VARCHAR | BLOB, val:HUGEINT | DOUBLE | TIMESTAMP WITH TIME ZONE | BLOB | DATE | VARCHAR | BIGINT | INTEGER | TIMESTAMP) -> VARCHAR*/
  arg_max(arg: DVarcharable | DAnyable, val: DNumericable | DDateable | DAnyable | DVarcharable): string & _DVarcharComp;
  /**@description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@external: arg_max_null(arg:TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE, val:TIMESTAMP | INTEGER | BLOB | TIMESTAMP WITH TIME ZONE | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT) -> TIMESTAMP WITH TIME ZONE*/
  arg_max_null(arg: DDateable, val: DDateable | DNumericable | DAnyable | DVarcharable): DDateField;
  /**@description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@external: arg_max_null(arg:ANY, val:BIGINT | INTEGER | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  arg_max_null(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyComp;
  /**@description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@external: arg_max_null(arg:INTEGER | DOUBLE | BIGINT | DECIMAL, val:HUGEINT | BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE | VARCHAR | DOUBLE | BIGINT | INTEGER) -> INTEGER*/
  arg_max_null(arg: DNumericable, val: DNumericable | DAnyable | DDateable | DVarcharable): number & _DNumericComp;
  /**@description: Finds the row with the maximum val. Calculates the arg expression at that row.	@example: arg_max_null(A,B)	@external: arg_max_null(arg:VARCHAR | BLOB, val:BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT | INTEGER) -> VARCHAR*/
  arg_max_null(arg: DVarcharable | DAnyable, val: DAnyable | DDateable | DVarcharable | DNumericable): string & _DVarcharComp;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:TIMESTAMP | DATE | TIMESTAMP WITH TIME ZONE, val:DATE | TIMESTAMP WITH TIME ZONE | INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | TIMESTAMP | BLOB) -> TIMESTAMP*/
  arg_min(arg: DDateable, val: DDateable | DNumericable | DVarcharable | DAnyable): DDateField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:ANY, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  arg_min(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyComp;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  arg_min(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:INTEGER | BIGINT | DOUBLE | DECIMAL, val:VARCHAR | BIGINT | BLOB | INTEGER | HUGEINT | DOUBLE | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> INTEGER*/
  arg_min(arg: DNumericable, val: DVarcharable | DNumericable | DAnyable | DDateable): number & _DNumericComp;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: arg_min(arg:VARCHAR | BLOB, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> VARCHAR*/
  arg_min(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): string & _DVarcharComp;
  /**@description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@external: arg_min_null(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> DATE*/
  arg_min_null(arg: DDateable, val: DNumericable | DVarcharable | DDateable | DAnyable): DDateField;
  /**@description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@external: arg_min_null(arg:ANY, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  arg_min_null(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyComp;
  /**@description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@external: arg_min_null(arg:INTEGER | DECIMAL | BIGINT | DOUBLE, val:BIGINT | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | INTEGER | HUGEINT | DOUBLE | VARCHAR | DATE) -> INTEGER*/
  arg_min_null(arg: DNumericable, val: DNumericable | DDateable | DAnyable | DVarcharable): number & _DNumericComp;
  /**@description: Finds the row with the minimum val. Calculates the arg expression at that row.	@example: arg_min_null(A,B)	@external: arg_min_null(arg:VARCHAR | BLOB, val:BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | INTEGER) -> VARCHAR*/
  arg_min_null(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): string & _DVarcharComp;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> DATE*/
  argmax(arg: DDateable, val: DNumericable | DVarcharable | DDateable | DAnyable): DDateField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:ANY, val:VARCHAR | ANY | BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | INTEGER | BIGINT | HUGEINT | DOUBLE | DATE) -> ANY*/
  argmax(arg: DAnyable, val: DVarcharable | DAnyable | DDateable | DNumericable): DAnyComp;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  argmax(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:BIGINT | DOUBLE | INTEGER | DECIMAL, val:BLOB | INTEGER | TIMESTAMP WITH TIME ZONE | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT | TIMESTAMP) -> BIGINT*/
  argmax(arg: DNumericable, val: DAnyable | DNumericable | DDateable | DVarcharable): number & _DNumericComp;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: argmax(arg:VARCHAR | BLOB, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> VARCHAR*/
  argmax(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): string & _DVarcharComp;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:TIMESTAMP | DATE | TIMESTAMP WITH TIME ZONE, val:DOUBLE | DATE | INTEGER | BIGINT | HUGEINT | VARCHAR | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> TIMESTAMP*/
  argmin(arg: DDateable, val: DNumericable | DDateable | DVarcharable | DAnyable): DDateField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:ANY, val:DATE | TIMESTAMP | ANY | BLOB | INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | TIMESTAMP WITH TIME ZONE) -> ANY*/
  argmin(arg: DAnyable, val: DDateable | DAnyable | DNumericable | DVarcharable): DAnyComp;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  argmin(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:BIGINT | INTEGER | DOUBLE | DECIMAL, val:VARCHAR | INTEGER | BIGINT | HUGEINT | DOUBLE | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> BIGINT*/
  argmin(arg: DNumericable, val: DVarcharable | DNumericable | DDateable | DAnyable): number & _DNumericComp;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: argmin(arg:VARCHAR | BLOB, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> VARCHAR*/
  argmin(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): string & _DVarcharComp;
  /**@description: Returns a LIST containing all the values of a column.	@example: list(A)	@external: array_agg(arg:ANY) -> LIST*/
  array_agg(arg: DAnyable): DArrayField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: array_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggr(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: array_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  array_aggregate(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: array_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_apply(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: array_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_cat(list1: DArrayable, list2: DArrayable): DArrayField<DAnyField>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: array_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  array_concat(list1: DArrayable, list2: DArrayable): DArrayField<DAnyField>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: array_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  array_contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Compute the cosine distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_distance([1, 2, 3], [1, 2, 3])	@external: array_cosine_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_distance(arr1: DArrayable, arr2: DArrayable): number & _DNumericComp;
  /**@description: Compute the cosine similarity between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_cosine_similarity([1, 2, 3], [1, 2, 3])	@external: array_cosine_similarity(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_cosine_similarity(arr1: DArrayable, arr2: DArrayable): number & _DNumericComp;
  /**@description: Compute the cross product of two arrays of size 3. The array elements can not be NULL.	@example: array_cross_product([1, 2, 3], [1, 2, 3])	@external: array_cross_product(arr:DOUBLE[3], arr__01:DOUBLE[3]) -> DOUBLE[3]*/
  array_cross_product(arr: DArrayable, arr__01: DArrayable): DArrayField;
  /**@description: Compute the distance between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_distance([1, 2, 3], [1, 2, 3])	@external: array_distance(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_distance(arr1: DArrayable, arr2: DArrayable): number & _DNumericComp;
  /**@description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@external: array_distinct(list:ANY[]) -> ANY[]*/
  array_distinct(list: DArrayable): DArrayField<DAnyField>;
  /**@description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@external: array_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_dot_product(arr1: DArrayable, arr2: DArrayable): number & _DNumericComp;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:ANY[], index:BIGINT) -> ANY*/
  array_extract(list: DArrayable, index: DNumericable): DAnyComp;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:STRUCT, index:VARCHAR | BIGINT) -> ANY*/
  array_extract(list: DStructable, index: DVarcharable | DNumericable): DAnyComp;
  /**@description: Extract the indexth (1-based) value from the array.	@example: array_extract('DuckDB', 2)	@external: array_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  array_extract(list: DVarcharable, index: DNumericable): string & _DVarcharComp;
  /**@description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@external: array_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_filter(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@external: array_grade_up(list:ANY[], col1: | VARCHAR, col2: | VARCHAR) -> ANY[]*/
  array_grade_up(list: DArrayable, col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: array_has(list:ANY[], element:ANY) -> BOOLEAN*/
  array_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@external: array_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@external: array_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  array_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: array_indexof(list:ANY[], element:ANY) -> INTEGER*/
  array_indexof(list: DArrayable, element: DAnyable): number & _DNumericComp;
  /**@description: Compute the inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_inner_product([1, 2, 3], [1, 2, 3])	@external: array_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_inner_product(arr1: DArrayable, arr2: DArrayable): number & _DNumericComp;
  /**@description: Returns the length of the list.	@example: array_length([1,2,3])	@external: array_length(list:ANY[], col1:BIGINT | ) -> BIGINT*/
  array_length(list: DArrayable, col1?: DNumericable | DAnyable): number & _DNumericComp;
  /**@description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: array_negative_dot_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_dot_product(arr1: DArrayable, arr2: DArrayable): number & _DNumericComp;
  /**@description: Compute the negative inner product between two arrays of the same size. The array elements can not be NULL. The arrays can have any size as long as the size is the same for both arguments.	@example: array_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: array_negative_inner_product(arr1:DOUBLE[ANY], arr2:DOUBLE[ANY]) -> DOUBLE*/
  array_negative_inner_product(arr1: DArrayable, arr2: DArrayable): number & _DNumericComp;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: array_position(list:ANY[], element:ANY) -> INTEGER*/
  array_position(list: DArrayable, element: DAnyable): number & _DNumericComp;
  /**@description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@external: array_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  array_reduce(list: DArrayable, lambda: DAnyable): DAnyComp;
  /**@description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@external: array_resize(list:ANY[], size:ANY, value: | ANY) -> ANY[]*/
  array_resize(list: DArrayable, size: DAnyable, value?: DAnyable): DArrayField<DAnyField>;
  /**@description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@external: array_reverse_sort(list:ANY[], col1:VARCHAR | ) -> ANY[]*/
  array_reverse_sort(list: DArrayable, col1?: DVarcharable | DAnyable): DArrayField<DAnyField>;
  /**@description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@external: array_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  array_select(valueList: DArrayable, indexList: DArrayable): DArrayField<DAnyField>;
  /**@description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@external: array_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  array_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step?: DNumericable | DAnyable): DAnyComp;
  /**@description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@external: array_sort(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  array_sort(list: DArrayable, col1?: DVarcharable | DAnyable, col2?: DVarcharable | DAnyable): DArrayField<DAnyField>;
  array_to_json(...vargs: DAnyable[]): DJsonField;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: array_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  array_transform(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@external: array_unique(list:ANY[]) -> UBIGINT*/
  array_unique(list: DArrayable): number & _DNumericComp;
  /**@description: Create an ARRAY containing the argument values.	@example: array_value(4, 5, 6)*/
  array_value(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@external: array_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  array_where(valueList: DArrayable, maskList: DArrayable): DArrayField<DAnyField>;
  /**@description: Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example: list_zip([1, 2], [3, 4], [5, 6])*/
  array_zip(...vargs: DAnyable[]): DArrayField<DStructField>;
  /**@description: Returns an integer that represents the Unicode code point of the first character of the string	@example: ascii('Ω')	@external: ascii(string:VARCHAR) -> INTEGER*/
  ascii(string: DVarcharable): number & _DNumericComp;
  /**@description: Computes the arcsine of x	@example: asin(0.5)	@external: asin(x:DOUBLE) -> DOUBLE*/
  asin(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the inverse hyperbolic sin of x	@example: asinh(0.5)	@external: asinh(x:DOUBLE) -> DOUBLE*/
  asinh(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the arctangent of x	@example: atan(0.5)	@external: atan(x:DOUBLE) -> DOUBLE*/
  atan(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the arctangent (y, x)	@example: atan2(1.0, 0.0)	@external: atan2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  atan2(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Computes the inverse hyperbolic tan of x	@example: atanh(0.5)	@external: atanh(x:DOUBLE) -> DOUBLE*/
  atanh(x: DNumericable): number & _DNumericComp;
  /**@description: Calculates the average value for all tuples in x.	@example: SUM(x) / COUNT(*)	@external: avg(x:DOUBLE | HUGEINT | BIGINT | INTEGER | SMALLINT | DECIMAL) -> DOUBLE*/
  avg(x: DNumericable): number & _DNumericComp;
  /**@description: Draws a band whose width is proportional to (x - min) and equal to width characters when x = max. width defaults to 80	@example: bar(5, 0, 20, 10)	@external: bar(x:DOUBLE, min:DOUBLE, max:DOUBLE, width:DOUBLE | ) -> VARCHAR*/
  bar(x: DNumericable, min: DNumericable, max: DNumericable, width?: DNumericable | DAnyable): string & _DVarcharComp;
  /**@description: Convert a blob to a base64 encoded string	@example: base64('A'::blob)	@external: base64(blob:BLOB) -> VARCHAR*/
  base64(blob: DAnyable): string & _DVarcharComp;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:BIGINT) -> VARCHAR*/
  bin(value: DNumericable): string & _DVarcharComp;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:VARCHAR) -> VARCHAR*/
  bin(value: DVarcharable): string & _DVarcharComp;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: bin(value:VARINT) -> VARCHAR*/
  bin(value: DAnyable): string & _DVarcharComp;
  /**@description: Returns the bitwise AND of all bits in a given expression.	@example: bit_and(A)	@external: bit_and(arg:BIT) -> BIT*/
  bit_and(arg: DAnyable): DAnyComp;
  /**@description: Returns the bitwise AND of all bits in a given expression.	@example: bit_and(A)	@external: bit_and(arg:UINTEGER | TINYINT | USMALLINT | UHUGEINT | UBIGINT | UTINYINT | HUGEINT | BIGINT | INTEGER | SMALLINT) -> UINTEGER*/
  bit_and(arg: DNumericable): number & _DNumericComp;
  /**@description: Returns the number of bits that are set	@example: bit_count(31)	@external: bit_count(x:BIGINT) -> TINYINT*/
  bit_count(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the number of bits that are set	@example: bit_count(31)	@external: bit_count(x:BIT) -> BIGINT*/
  bit_count(x: DAnyable): number & _DNumericComp;
  /**@external: bit_length(col0:BIT) -> BIGINT*/
  bit_length(col0: DAnyable): number & _DNumericComp;
  /**@external: bit_length(col0:VARCHAR) -> BIGINT*/
  bit_length(col0: DVarcharable): number & _DNumericComp;
  /**@description: Returns the bitwise OR of all bits in a given expression.	@example: bit_or(A)	@external: bit_or(arg:BIT) -> BIT*/
  bit_or(arg: DAnyable): DAnyComp;
  /**@description: Returns the bitwise OR of all bits in a given expression.	@example: bit_or(A)	@external: bit_or(arg:SMALLINT | TINYINT | BIGINT | HUGEINT | UTINYINT | USMALLINT | UINTEGER | INTEGER | UBIGINT | UHUGEINT) -> SMALLINT*/
  bit_or(arg: DNumericable): number & _DNumericComp;
  /**@description: Returns first starting index of the specified substring within bits, or zero if it is not present. The first (leftmost) bit is indexed 1	@example: bit_position('010'::BIT, '1110101'::BIT)	@external: bit_position(substring:BIT, bitstring:BIT) -> INTEGER*/
  bit_position(substring: DAnyable, bitstring: DAnyable): number & _DNumericComp;
  /**@description: Returns the bitwise XOR of all bits in a given expression.	@example: bit_xor(A)	@external: bit_xor(arg:BIT) -> BIT*/
  bit_xor(arg: DAnyable): DAnyComp;
  /**@description: Returns the bitwise XOR of all bits in a given expression.	@example: bit_xor(A)	@external: bit_xor(arg:TINYINT | SMALLINT | BIGINT | HUGEINT | UTINYINT | USMALLINT | UINTEGER | UBIGINT | UHUGEINT | INTEGER) -> TINYINT*/
  bit_xor(arg: DNumericable): number & _DNumericComp;
  /**@description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@external: bitstring(bitstring:BIT, length:INTEGER) -> BIT*/
  bitstring(bitstring: DAnyable, length: DNumericable): DAnyComp;
  /**@description: Pads the bitstring until the specified length	@example: bitstring('1010'::BIT, 7)	@external: bitstring(bitstring:VARCHAR, length:INTEGER) -> BIT*/
  bitstring(bitstring: DVarcharable, length: DNumericable): DAnyComp;
  /**@description: Returns a bitstring with bits set for each distinct value.	@example: bitstring_agg(A)	@external: bitstring_agg(arg:SMALLINT | BIGINT | INTEGER | TINYINT | HUGEINT | UHUGEINT | UBIGINT | UINTEGER | USMALLINT | UTINYINT, col1:SMALLINT | BIGINT | INTEGER |  | TINYINT | UHUGEINT | UBIGINT | UINTEGER | USMALLINT | UTINYINT | HUGEINT, col2:SMALLINT | BIGINT | INTEGER |  | TINYINT | UHUGEINT | UBIGINT | UINTEGER | USMALLINT | UTINYINT | HUGEINT) -> BIT*/
  bitstring_agg(arg: DNumericable, col1?: DNumericable | DAnyable, col2?: DNumericable | DAnyable): DAnyComp;
  /**@description: Returns TRUE if every input value is TRUE, otherwise FALSE.	@example: bool_and(A)	@external: bool_and(arg:BOOLEAN) -> BOOLEAN*/
  bool_and(arg: DBoolable): DBoolField;
  /**@description: Returns TRUE if any input value is TRUE, otherwise FALSE.	@example: bool_or(A)	@external: bool_or(arg:BOOLEAN) -> BOOLEAN*/
  bool_or(arg: DBoolable): DBoolField;
  /**@external: broadcast(col0:INET) -> INET*/
  broadcast(col0: DAnyable): DAnyComp;
  /**@description: Whether or not we can implicitly cast from the source type to the other type	@example: can_implicitly_cast(NULL::INTEGER, NULL::BIGINT)	@external: can_cast_implicitly(sourceType:ANY, targetType:ANY) -> BOOLEAN*/
  can_cast_implicitly(sourceType: DAnyable, targetType: DAnyable): DBoolField;
  /**@description: Returns the size of the map (or the number of entries in the map)	@example: cardinality( map([4, 2], ['a', 'b']) );	@external: cardinality(map:ANY) -> UBIGINT*/
  cardinality(map: DAnyable, ...vargs: DAnyable[]): number & _DNumericComp;
  /**@description: Returns the cube root of x	@example: cbrt(8)	@external: cbrt(x:DOUBLE) -> DOUBLE*/
  cbrt(x: DNumericable): number & _DNumericComp;
  /**@description: Rounds the number up	@example: ceil(17.4)	@external: ceil(x:DECIMAL) -> DECIMAL*/
  ceil(x: DNumericable): number & _DNumericComp;
  /**@description: Rounds the number up	@example: ceil(17.4)	@external: ceiling(x:DECIMAL) -> DECIMAL*/
  ceiling(x: DNumericable): number & _DNumericComp;
  /**@description: Extract the century component from a date or timestamp	@example: century(timestamp '2021-08-03 11:59:44.123456')	@external: century(ts:DATE) -> BIGINT*/
  century(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the century component from a date or timestamp	@example: century(timestamp '2021-08-03 11:59:44.123456')	@external: century(ts:INTERVAL) -> BIGINT*/
  century(ts: DAnyable): number & _DNumericComp;
  /**@description: Returns a character which is corresponding the ASCII code value or Unicode code point	@example: chr(65)	@external: chr(codePoint:INTEGER) -> VARCHAR*/
  chr(codePoint: DNumericable): string & _DVarcharComp;
  /**@external: combine(col0:AGGREGATE_STATE<?>, col1:ANY) -> AGGREGATE_STATE<?>*/
  combine(col0: DAnyable, col1: DAnyable): DAnyComp;
  /**@description: Concatenate many strings together.	@example: concat('Hello', ' ', 'World')	@external: concat(string:ANY) -> VARCHAR*/
  concat(string: DAnyable, ...vargs: DAnyable[]): string & _DVarcharComp;
  /**@description: Concatenate strings together separated by the specified separator.	@example: concat_ws(', ', 'Banana', 'Apple', 'Melon')	@external: concat_ws(separator:VARCHAR, string:ANY) -> VARCHAR*/
  concat_ws(separator: DVarcharable, string: DAnyable, ...vargs: DAnyable[]): string & _DVarcharComp;
  /**@description: If arg2 is NULL, return NULL. Otherwise, return arg1.	@example: constant_or_null(42, NULL)	@external: constant_or_null(arg1:ANY, arg2:ANY) -> ANY*/
  constant_or_null(arg1: DAnyable, arg2: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns true if the list contains the element.	@example: contains([1, 2, NULL], 1)	@external: contains(list:ANY[], element:ANY) -> BOOLEAN*/
  contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Checks if a map contains a given key.	@example: contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')	@external: contains(map:MAP(ANY, ANY), key:ANY) -> BOOLEAN*/
  contains(map: DAnyable, key: DAnyable): DBoolField;
  /**@description: Returns true if search_string is found within string.	@example: contains('abc', 'a')	@external: contains(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  contains(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description: Returns the correlation coefficient for non-null pairs in a group.	@example: COVAR_POP(y, x) / (STDDEV_POP(x) * STDDEV_POP(y))	@external: corr(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  corr(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Computes the cos of x	@example: cos(90)	@external: cos(x:DOUBLE) -> DOUBLE*/
  cos(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the hyperbolic cos of x	@example: cosh(1)	@external: cosh(x:DOUBLE) -> DOUBLE*/
  cosh(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the cotangent of x	@example: cot(0.5)	@external: cot(x:DOUBLE) -> DOUBLE*/
  cot(x: DNumericable): number & _DNumericComp;
  /**@example: count()*/
  count(): number & _DNumericComp;
  /**@description: Returns the number of non-null values in arg.	@example: count(A)	@external: count(arg:ANY | ) -> BIGINT*/
  count(arg?: DAnyable): number & _DNumericComp;
  /**@description: Counts the total number of TRUE values for a boolean column	@example: count_if(A)	@external: count_if(arg:BOOLEAN) -> HUGEINT*/
  count_if(arg: DBoolable): number & _DNumericComp;
  /**@description: Counts the total number of TRUE values for a boolean column	@example: count_if(A)	@external: countif(arg:BOOLEAN) -> HUGEINT*/
  countif(arg: DBoolable): number & _DNumericComp;
  /**@description: Returns the population covariance of input values.	@example: (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)	@external: covar_pop(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  covar_pop(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Returns the sample covariance for non-null pairs in a group.	@example: (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / (COUNT(*) - 1)	@external: covar_samp(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  covar_samp(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Constructs a binary-comparable sort key based on a set of input parameters and sort qualifiers	@example: create_sort_key('A', 'DESC')	@external: create_sort_key(parameters:ANY) -> BLOB*/
  create_sort_key(parameters: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns the name of the currently active database	@example: current_database()*/
  current_database(): string & _DVarcharComp;
  /**@description: Returns the current query as a string	@example: current_query()*/
  current_query(): string & _DVarcharComp;
  /**@description: Returns the name of the currently active schema. Default is main	@example: current_schema()*/
  current_schema(): string & _DVarcharComp;
  /**@description: Returns list of schemas. Pass a parameter of True to include implicit schemas	@example: current_schemas(true)	@external: current_schemas(includeImplicit:BOOLEAN) -> VARCHAR[]*/
  current_schemas(includeImplicit: DBoolable): DArrayField<DVarcharField>;
  /**@description: Returns the current value of the configuration setting	@example: current_setting('access_mode')	@external: current_setting(settingName:VARCHAR) -> ANY*/
  current_setting(settingName: DVarcharable): DAnyComp;
  /**@description: Return the current value of the sequence. Note that nextval must be called at least once prior to calling currval.	@example: currval('my_sequence_name')	@external: currval(sequenceName:VARCHAR) -> BIGINT*/
  currval(sequenceName: DVarcharable): number & _DNumericComp;
  /**@description: Extension of Levenshtein distance to also include transposition of adjacent characters as an allowed edit operation. In other words, the minimum number of edit operations (insertions, deletions, substitutions or transpositions) required to change one string to another. Different case is considered different	@example: damerau_levenshtein('hello', 'world')	@external: damerau_levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  damerau_levenshtein(str1: DVarcharable, str2: DVarcharable): number & _DNumericComp;
  /**@description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: date_diff(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP, enddate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP) -> BIGINT*/
  date_diff(part: DVarcharable, startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: date_part(ts:VARCHAR, col1:TIME | TIMESTAMP | DATE | INTERVAL | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  date_part(ts: DVarcharable, col1: DDateable | DAnyable): number & _DNumericComp;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: date_part(ts:VARCHAR[], col1:TIMESTAMP WITH TIME ZONE | DATE | INTERVAL | TIME | TIMESTAMP | TIME WITH TIME ZONE) -> STRUCT()*/
  date_part(ts: DArrayable, col1: DDateable | DAnyable): DStructField;
  /**@description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: date_sub(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP, enddate:TIMESTAMP WITH TIME ZONE | DATE | TIME | TIMESTAMP) -> BIGINT*/
  date_sub(part: DVarcharable, startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: date_trunc(part:VARCHAR, timestamp:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIMESTAMP*/
  date_trunc(part: DVarcharable, timestamp: DDateable): DDateField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: date_trunc(part:VARCHAR, timestamp:INTERVAL) -> INTERVAL*/
  date_trunc(part: DVarcharable, timestamp: DAnyable): DAnyComp;
  /**@description: The number of partition boundaries between the timestamps	@example: date_diff('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: datediff(part:VARCHAR, startdate:TIMESTAMP WITH TIME ZONE | TIMESTAMP | TIME | DATE, enddate:TIMESTAMP WITH TIME ZONE | TIMESTAMP | TIME | DATE) -> BIGINT*/
  datediff(part: DVarcharable, startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: datepart(ts:VARCHAR, col1:INTERVAL | DATE | TIME | TIMESTAMP | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE) -> BIGINT*/
  datepart(ts: DVarcharable, col1: DAnyable | DDateable): number & _DNumericComp;
  /**@description: Get subfield (equivalent to extract)	@example: date_part('minute', TIMESTAMP '1992-09-20 20:38:40')	@external: datepart(ts:VARCHAR[], col1:TIMESTAMP | TIME WITH TIME ZONE | TIMESTAMP WITH TIME ZONE | DATE | TIME | INTERVAL) -> STRUCT()*/
  datepart(ts: DArrayable, col1: DDateable | DAnyable): DStructField;
  /**@description: The number of complete partitions between the timestamps	@example: date_sub('hour', TIMESTAMPTZ '1992-09-30 23:59:59', TIMESTAMPTZ '1992-10-01 01:58:00')	@external: datesub(part:VARCHAR, startdate:TIME | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE, enddate:TIME | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE) -> BIGINT*/
  datesub(part: DVarcharable, startdate: DDateable, enddate: DDateable): number & _DNumericComp;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: datetrunc(part:VARCHAR, timestamp:TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE) -> TIMESTAMP WITH TIME ZONE*/
  datetrunc(part: DVarcharable, timestamp: DDateable): DDateField;
  /**@description: Truncate to specified precision	@example: date_trunc('hour', TIMESTAMPTZ '1992-09-20 20:38:40')	@external: datetrunc(part:VARCHAR, timestamp:INTERVAL) -> INTERVAL*/
  datetrunc(part: DVarcharable, timestamp: DAnyable): DAnyComp;
  /**@description: Extract the day component from a date or timestamp	@example: day(timestamp '2021-08-03 11:59:44.123456')	@external: day(ts:DATE) -> BIGINT*/
  day(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the day component from a date or timestamp	@example: day(timestamp '2021-08-03 11:59:44.123456')	@external: day(ts:INTERVAL) -> BIGINT*/
  day(ts: DAnyable): number & _DNumericComp;
  /**@description: The (English) name of the weekday	@example: dayname(TIMESTAMP '1992-03-22')	@external: dayname(ts:DATE) -> VARCHAR*/
  dayname(ts: DDateable): string & _DVarcharComp;
  /**@description: Extract the dayofmonth component from a date or timestamp	@example: dayofmonth(timestamp '2021-08-03 11:59:44.123456')	@external: dayofmonth(ts:DATE) -> BIGINT*/
  dayofmonth(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the dayofmonth component from a date or timestamp	@example: dayofmonth(timestamp '2021-08-03 11:59:44.123456')	@external: dayofmonth(ts:INTERVAL) -> BIGINT*/
  dayofmonth(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the dayofweek component from a date or timestamp	@example: dayofweek(timestamp '2021-08-03 11:59:44.123456')	@external: dayofweek(ts:DATE) -> BIGINT*/
  dayofweek(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the dayofweek component from a date or timestamp	@example: dayofweek(timestamp '2021-08-03 11:59:44.123456')	@external: dayofweek(ts:INTERVAL) -> BIGINT*/
  dayofweek(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the dayofyear component from a date or timestamp	@example: dayofyear(timestamp '2021-08-03 11:59:44.123456')	@external: dayofyear(ts:DATE) -> BIGINT*/
  dayofyear(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the dayofyear component from a date or timestamp	@example: dayofyear(timestamp '2021-08-03 11:59:44.123456')	@external: dayofyear(ts:INTERVAL) -> BIGINT*/
  dayofyear(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the decade component from a date or timestamp	@example: decade(timestamp '2021-08-03 11:59:44.123456')	@external: decade(ts:DATE) -> BIGINT*/
  decade(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the decade component from a date or timestamp	@example: decade(timestamp '2021-08-03 11:59:44.123456')	@external: decade(ts:INTERVAL) -> BIGINT*/
  decade(ts: DAnyable): number & _DNumericComp;
  /**@description: Convert blob to varchar. Fails if blob is not valid utf-8	@example: decode('\xC3\xBC'::BLOB)	@external: decode(blob:BLOB) -> VARCHAR*/
  decode(blob: DAnyable): string & _DVarcharComp;
  /**@description: Converts radians to degrees	@example: degrees(pi())	@external: degrees(x:DOUBLE) -> DOUBLE*/
  degrees(x: DNumericable): number & _DNumericComp;
  /**@external: divide(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  divide(col0: DNumericable, col1: DNumericable): number & _DNumericComp;
  /**@description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@external: editdist3(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  editdist3(str1: DVarcharable, str2: DVarcharable): number & _DNumericComp;
  /**@description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@external: element_at(map:ANY, key:ANY) -> ANY*/
  element_at(map: DAnyable, key: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Convert varchar to blob. Converts utf-8 characters into literal encoding	@example: encode('my_string_with_ü')	@external: encode(string:VARCHAR) -> BLOB*/
  encode(string: DVarcharable): DAnyComp;
  /**@external: ends_with(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  ends_with(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description: Returns the log-2 entropy of count input-values.	@external: entropy(x:ANY) -> DOUBLE*/
  entropy(x: DAnyable): number & _DNumericComp;
  /**@description: Returns the numeric value backing the given enum value	@example: enum_code('happy'::mood)	@external: enum_code(enm:ANY) -> ANY*/
  enum_code(enm: DAnyable): DAnyComp;
  /**@description: Returns the first value of the input enum type	@example: enum_first(NULL::mood)	@external: enum_first(enm:ANY) -> VARCHAR*/
  enum_first(enm: DAnyable): string & _DVarcharComp;
  /**@description: Returns the last value of the input enum type	@example: enum_last(NULL::mood)	@external: enum_last(enm:ANY) -> VARCHAR*/
  enum_last(enm: DAnyable): string & _DVarcharComp;
  /**@description: Returns all values of the input enum type as an array	@example: enum_range(NULL::mood)	@external: enum_range(enm:ANY) -> VARCHAR[]*/
  enum_range(enm: DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns the range between the two given enum values as an array. The values must be of the same enum type. When the first parameter is NULL, the result starts with the first value of the enum type. When the second parameter is NULL, the result ends with the last value of the enum type	@example: enum_range_boundary(NULL, 'happy'::mood)	@external: enum_range_boundary(start:ANY, end:ANY) -> VARCHAR[]*/
  enum_range_boundary(start: DAnyable, end: DAnyable): DArrayField<DVarcharField>;
  /**@description: Extract the epoch component from a temporal type	@example: epoch(timestamp '2021-08-03 11:59:44.123456')	@external: epoch(temporal:DATE) -> DOUBLE*/
  epoch(temporal: DDateable): number & _DNumericComp;
  /**@description: Extract the epoch component from a temporal type	@example: epoch(timestamp '2021-08-03 11:59:44.123456')	@external: epoch(temporal:INTERVAL) -> DOUBLE*/
  epoch(temporal: DAnyable): number & _DNumericComp;
  /**@description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ms(temporal:BIGINT) -> TIMESTAMP*/
  epoch_ms(temporal: DNumericable): DDateField;
  /**@description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ms(temporal:DATE) -> BIGINT*/
  epoch_ms(temporal: DDateable): number & _DNumericComp;
  /**@description: Extract the epoch component in milliseconds from a temporal type	@example: epoch_ms(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ms(temporal:INTERVAL) -> BIGINT*/
  epoch_ms(temporal: DAnyable): number & _DNumericComp;
  /**@description: Extract the epoch component in nanoseconds from a temporal type	@example: epoch_ns(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ns(temporal:DATE) -> BIGINT*/
  epoch_ns(temporal: DDateable): number & _DNumericComp;
  /**@description: Extract the epoch component in nanoseconds from a temporal type	@example: epoch_ns(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_ns(temporal:INTERVAL) -> BIGINT*/
  epoch_ns(temporal: DAnyable): number & _DNumericComp;
  /**@description: Extract the epoch component in microseconds from a temporal type	@example: epoch_us(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_us(temporal:DATE) -> BIGINT*/
  epoch_us(temporal: DDateable): number & _DNumericComp;
  /**@description: Extract the epoch component in microseconds from a temporal type	@example: epoch_us(timestamp '2021-08-03 11:59:44.123456')	@external: epoch_us(temporal:INTERVAL) -> BIGINT*/
  epoch_us(temporal: DAnyable): number & _DNumericComp;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:ANY, max:ANY, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(min: DAnyable, max: DAnyable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:BIGINT, max:BIGINT, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(min: DNumericable, max: DNumericable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Generates bin_count equi-width bins between the min and max. If enabled nice_rounding makes the numbers more readable/less jagged	@example: equi_width_bins(0, 10, 2, true)	@external: equi_width_bins(min:TIMESTAMP, max:TIMESTAMP, binCount:BIGINT, niceRounding:BOOLEAN) -> ANY[]*/
  equi_width_bins(min: DDateable, max: DDateable, binCount: DNumericable, niceRounding: DBoolable): DArrayField<DAnyField>;
  /**@description: Extract the era component from a date or timestamp	@example: era(timestamp '2021-08-03 11:59:44.123456')	@external: era(ts:DATE) -> BIGINT*/
  era(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the era component from a date or timestamp	@example: era(timestamp '2021-08-03 11:59:44.123456')	@external: era(ts:INTERVAL) -> BIGINT*/
  era(ts: DAnyable): number & _DNumericComp;
  /**@description: Throws the given error message	@example: error('access_mode')	@external: error(message:VARCHAR) -> "NULL"*/
  error(message: DVarcharable): DAnyComp;
  /**@description: Rounds x to next even number by rounding away from zero	@example: even(2.9)	@external: even(x:DOUBLE) -> DOUBLE*/
  even(x: DNumericable): number & _DNumericComp;
  /**@external: excel_text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  excel_text(col0: DNumericable, col1: DVarcharable): string & _DVarcharComp;
  /**@description: Computes e to the power of x	@example: exp(1)	@external: exp(x:DOUBLE) -> DOUBLE*/
  exp(x: DNumericable): number & _DNumericComp;
  /**@description: Factorial of x. Computes the product of the current integer and all integers below it	@example: 4!	@external: factorial(x:INTEGER) -> HUGEINT*/
  factorial(x: DNumericable): number & _DNumericComp;
  /**@external: family(col0:INET) -> UTINYINT*/
  family(col0: DAnyable): number & _DNumericComp;
  /**@description: Calculates the average using a more accurate floating point summation (Kahan Sum)	@example: favg(A)	@external: favg(x:DOUBLE) -> DOUBLE*/
  favg(x: DNumericable): number & _DNumericComp;
  /**@description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@external: filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  filter(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@external: finalize(col0:AGGREGATE_STATE<?>) -> INVALID*/
  finalize(col0: DAnyable): DAnyComp;
  /**@description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@external: first(arg:ANY) -> ANY*/
  first(arg: DAnyable): DAnyComp;
  /**@description: Returns the first value (null or non-null) from arg. This function is affected by ordering.	@example: first(A)	@external: first(arg:DECIMAL) -> DECIMAL*/
  first(arg: DNumericable): number & _DNumericComp;
  /**@description: Flatten a nested list by one level	@example: flatten([[1, 2, 3], [4, 5]])	@external: flatten(nestedList:ANY[][]) -> ANY[]*/
  flatten(nestedList: DArrayable): DArrayField<DAnyField>;
  /**@description: Rounds the number down	@example: floor(17.4)	@external: floor(x:DECIMAL) -> DECIMAL*/
  floor(x: DNumericable): number & _DNumericComp;
  /**@description: Formats a string using fmt syntax	@example: format('Benchmark "{}" took {} seconds', 'CSV', 42)	@external: format(format:VARCHAR) -> VARCHAR*/
  format(format: DVarcharable, ...vargs: DAnyable[]): string & _DVarcharComp;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 16.0 KB)	@example: format_bytes(1000 * 16)	@external: formatReadableDecimalSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableDecimalSize(bytes: DNumericable): string & _DVarcharComp;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@external: formatReadableSize(bytes:BIGINT) -> VARCHAR*/
  formatReadableSize(bytes: DNumericable): string & _DVarcharComp;
  /**@description: Converts bytes to a human-readable presentation (e.g. 16000 -> 15.6 KiB)	@example: format_bytes(1000 * 16)	@external: format_bytes(bytes:BIGINT) -> VARCHAR*/
  format_bytes(bytes: DNumericable): string & _DVarcharComp;
  /**@description: Convert a base64 encoded string to a character string	@example: from_base64('QQ==')	@external: from_base64(string:VARCHAR) -> BLOB*/
  from_base64(string: DVarcharable): DAnyComp;
  /**@description: Converts a value from binary representation to a blob	@example: unbin('0110')	@external: from_binary(value:VARCHAR) -> BLOB*/
  from_binary(value: DVarcharable): DAnyComp;
  /**@description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@external: from_hex(value:VARCHAR) -> BLOB*/
  from_hex(value: DVarcharable): DAnyComp;
  /**@external: from_json(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json(col0: DJsonable, col1: DVarcharable): DAnyComp;
  /**@external: from_json(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json(col0: DVarcharable, col1: DVarcharable): DAnyComp;
  /**@external: from_json_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  from_json_strict(col0: DJsonable, col1: DVarcharable): DAnyComp;
  /**@external: from_json_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  from_json_strict(col0: DVarcharable, col1: DVarcharable): DAnyComp;
  /**@description: Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example: kahan_sum(A)	@external: fsum(arg:DOUBLE) -> DOUBLE*/
  fsum(arg: DNumericable): number & _DNumericComp;
  /**@description: Interpolation of (x-1) factorial (so decimal inputs are allowed)	@example: gamma(5.5)	@external: gamma(x:DOUBLE) -> DOUBLE*/
  gamma(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@external: gcd(x:BIGINT, y:BIGINT) -> BIGINT*/
  gcd(x: DNumericable, y: DNumericable): number & _DNumericComp;
  /**@description: Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example: uuid()*/
  gen_random_uuid(): DAnyComp;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:BIGINT, stop: | BIGINT, step: | BIGINT) -> BIGINT[]*/
  generate_series(start: DNumericable, stop?: DAnyable | DNumericable, step?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  generate_series(start: DDateable, stop: DDateable, step: DAnyable): DArrayField;
  /**@description: Create a list of values between start and stop - the stop parameter is inclusive	@example: generate_series(2, 5, 3)	@external: generate_series(start:TIMESTAMP, stop:TIMESTAMP, step:INTERVAL) -> TIMESTAMP[]*/
  generate_series(start: DDateable, stop: DDateable, step: DAnyable): DArrayField<DDateField>;
  /**@description: Extracts the nth bit from bitstring; the first (leftmost) bit is indexed 0	@example: get_bit('0110010'::BIT, 2)	@external: get_bit(bitstring:BIT, index:INTEGER) -> INTEGER*/
  get_bit(bitstring: DAnyable, index: DNumericable): number & _DNumericComp;
  /**@description: Returns the current timestamp	@example: get_current_timestamp()*/
  get_current_timestamp(): DDateField;
  /**@external: getvariable(col0:VARCHAR) -> ANY*/
  getvariable(col0: DVarcharable): DAnyComp;
  /**@description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@external: grade_up(list:ANY[], col1: | VARCHAR, col2: | VARCHAR) -> ANY[]*/
  grade_up(list: DArrayable, col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**@description: Returns the highest value of the set of input parameters	@example: greatest(42, 84)	@external: greatest(arg1:ANY) -> ANY*/
  greatest(arg1: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Computes the greatest common divisor of x and y	@example: greatest_common_divisor(42, 57)	@external: greatest_common_divisor(x:BIGINT, y:BIGINT) -> BIGINT*/
  greatest_common_divisor(x: DNumericable, y: DNumericable): number & _DNumericComp;
  /**@description: Concatenates the column string values with an optional separator.	@example: string_agg(A, '-')	@external: group_concat(str:ANY, arg:VARCHAR | ) -> VARCHAR*/
  group_concat(str: DAnyable, arg?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@external: h3_are_neighbor_cells(col0:BIGINT, col1:BIGINT) -> BOOLEAN*/
  h3_are_neighbor_cells(col0: DNumericable, col1: DNumericable): DBoolField;
  /**@external: h3_are_neighbor_cells(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  h3_are_neighbor_cells(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@external: h3_cell_area(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col0: DNumericable, col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_cell_area(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_cell_area(col0: DVarcharable, col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_cell_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_cell_to_boundary_wkt(col0: DNumericable): string & _DVarcharComp;
  /**@external: h3_cell_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_cell_to_boundary_wkt(col0: DVarcharable): string & _DVarcharComp;
  /**@external: h3_cell_to_center_child(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_center_child(col0: DNumericable, col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_center_child(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_center_child(col0: DVarcharable, col1: DNumericable): string & _DVarcharComp;
  /**@external: h3_cell_to_child_pos(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col0: DNumericable, col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_child_pos(col0:VARCHAR, col1:INTEGER) -> BIGINT*/
  h3_cell_to_child_pos(col0: DVarcharable, col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_children(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_cell_to_children(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_children(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_cell_to_children(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_cell_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lat(col0: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lat(col0: DVarcharable): number & _DNumericComp;
  /**@external: h3_cell_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_cell_to_latlng(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_cell_to_latlng(col0: DVarcharable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_cell_to_lng(col0: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_cell_to_lng(col0: DVarcharable): number & _DNumericComp;
  /**@external: h3_cell_to_local_ij(col0:BIGINT, col1:BIGINT) -> INTEGER[]*/
  h3_cell_to_local_ij(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_local_ij(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_local_ij(col0: DVarcharable, col1: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_cell_to_parent(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_parent(col0: DNumericable, col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_parent(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_parent(col0: DVarcharable, col1: DNumericable): string & _DVarcharComp;
  /**@external: h3_cell_to_vertex(col0:BIGINT, col1:INTEGER) -> BIGINT*/
  h3_cell_to_vertex(col0: DNumericable, col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cell_to_vertex(col0:VARCHAR, col1:INTEGER) -> VARCHAR*/
  h3_cell_to_vertex(col0: DVarcharable, col1: DNumericable): string & _DVarcharComp;
  /**@external: h3_cell_to_vertexes(col0:BIGINT) -> BIGINT[]*/
  h3_cell_to_vertexes(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_cell_to_vertexes(col0:VARCHAR) -> VARCHAR[]*/
  h3_cell_to_vertexes(col0: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_cells_to_directed_edge(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_cells_to_directed_edge(col0: DNumericable, col1: DNumericable): number & _DNumericComp;
  /**@external: h3_cells_to_directed_edge(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  h3_cells_to_directed_edge(col0: DVarcharable, col1: DVarcharable): string & _DVarcharComp;
  /**@external: h3_cells_to_multi_polygon_wkt(col0:BIGINT[]) -> VARCHAR*/
  h3_cells_to_multi_polygon_wkt(col0: DArrayable): string & _DVarcharComp;
  /**@external: h3_child_pos_to_cell(col0:BIGINT, col1:BIGINT | UBIGINT, col2:INTEGER) -> BIGINT*/
  h3_child_pos_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): number & _DNumericComp;
  /**@external: h3_child_pos_to_cell(col0:BIGINT, col1:VARCHAR, col2:INTEGER) -> VARCHAR*/
  h3_child_pos_to_cell(col0: DNumericable, col1: DVarcharable, col2: DNumericable): string & _DVarcharComp;
  /**@external: h3_compact_cells(col0:BIGINT[]) -> BIGINT[]*/
  h3_compact_cells(col0: DArrayable): DArrayField<DNumericField>;
  /**@external: h3_compact_cells(col0:VARCHAR[]) -> VARCHAR[]*/
  h3_compact_cells(col0: DArrayable): DArrayField<DVarcharField>;
  /**@external: h3_directed_edge_to_boundary_wkt(col0:BIGINT) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(col0: DNumericable): string & _DVarcharComp;
  /**@external: h3_directed_edge_to_boundary_wkt(col0:VARCHAR) -> VARCHAR*/
  h3_directed_edge_to_boundary_wkt(col0: DVarcharable): string & _DVarcharComp;
  /**@external: h3_directed_edge_to_cells(col0:BIGINT) -> UBIGINT[]*/
  h3_directed_edge_to_cells(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_directed_edge_to_cells(col0:VARCHAR) -> VARCHAR[]*/
  h3_directed_edge_to_cells(col0: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_edge_length(col0:BIGINT, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col0: DNumericable, col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_edge_length(col0:VARCHAR, col1:VARCHAR) -> DOUBLE*/
  h3_edge_length(col0: DVarcharable, col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_get_base_cell_number(col0:BIGINT) -> INTEGER*/
  h3_get_base_cell_number(col0: DNumericable): number & _DNumericComp;
  /**@external: h3_get_base_cell_number(col0:VARCHAR) -> INTEGER*/
  h3_get_base_cell_number(col0: DVarcharable): number & _DNumericComp;
  /**@external: h3_get_directed_edge_destination(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_destination(col0: DNumericable): number & _DNumericComp;
  /**@external: h3_get_directed_edge_destination(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_destination(col0: DVarcharable): string & _DVarcharComp;
  /**@external: h3_get_directed_edge_origin(col0:BIGINT) -> BIGINT*/
  h3_get_directed_edge_origin(col0: DNumericable): number & _DNumericComp;
  /**@external: h3_get_directed_edge_origin(col0:VARCHAR) -> VARCHAR*/
  h3_get_directed_edge_origin(col0: DVarcharable): string & _DVarcharComp;
  /**@external: h3_get_hexagon_area_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_area_avg(col0: DNumericable, col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_get_hexagon_edge_length_avg(col0:INTEGER, col1:VARCHAR) -> DOUBLE*/
  h3_get_hexagon_edge_length_avg(col0: DNumericable, col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_get_icosahedron_faces(col0:BIGINT) -> INTEGER[]*/
  h3_get_icosahedron_faces(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_get_icosahedron_faces(col0:VARCHAR) -> INTEGER[]*/
  h3_get_icosahedron_faces(col0: DVarcharable): DArrayField<DNumericField>;
  /**@external: h3_get_num_cells(col0:INTEGER) -> BIGINT*/
  h3_get_num_cells(col0: DNumericable): number & _DNumericComp;
  /**@external: h3_get_pentagons(col0:INTEGER) -> UBIGINT[]*/
  h3_get_pentagons(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_get_pentagons_string(col0:INTEGER) -> VARCHAR[]*/
  h3_get_pentagons_string(col0: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_get_resolution(col0:BIGINT) -> INTEGER*/
  h3_get_resolution(col0: DNumericable): number & _DNumericComp;
  /**@external: h3_get_resolution(col0:VARCHAR) -> INTEGER*/
  h3_get_resolution(col0: DVarcharable): number & _DNumericComp;
  /**@external: h3_great_circle_distance(col0:DOUBLE, col1:DOUBLE, col2:DOUBLE, col3:DOUBLE, col4:VARCHAR) -> DOUBLE*/
  h3_great_circle_distance(col0: DNumericable, col1: DNumericable, col2: DNumericable, col3: DNumericable, col4: DVarcharable): number & _DNumericComp;
  /**@external: h3_grid_disk(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_disk(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_grid_disk_distances(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances(col0: DNumericable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances(col0: DVarcharable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_safe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_safe(col0: DNumericable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_safe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_safe(col0: DVarcharable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[][]*/
  h3_grid_disk_distances_unsafe(col0: DNumericable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_distances_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[][]*/
  h3_grid_disk_distances_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField;
  /**@external: h3_grid_disk_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_disk_unsafe(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_disk_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_disk_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_grid_distance(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  h3_grid_distance(col0: DNumericable, col1: DNumericable): number & _DNumericComp;
  /**@external: h3_grid_distance(col0:VARCHAR, col1:VARCHAR) -> BIGINT*/
  h3_grid_distance(col0: DVarcharable, col1: DVarcharable): number & _DNumericComp;
  /**@external: h3_grid_path_cells(col0:BIGINT, col1:BIGINT) -> BIGINT[]*/
  h3_grid_path_cells(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_path_cells(col0:VARCHAR, col1:VARCHAR) -> VARCHAR[]*/
  h3_grid_path_cells(col0: DVarcharable, col1: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_grid_ring_unsafe(col0:BIGINT, col1:INTEGER) -> BIGINT[]*/
  h3_grid_ring_unsafe(col0: DNumericable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_grid_ring_unsafe(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_grid_ring_unsafe(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_h3_to_string(col0:BIGINT) -> VARCHAR*/
  h3_h3_to_string(col0: DNumericable): string & _DVarcharComp;
  /**@external: h3_is_pentagon(col0:BIGINT) -> BOOLEAN*/
  h3_is_pentagon(col0: DNumericable): DBoolField;
  /**@external: h3_is_pentagon(col0:VARCHAR) -> BOOLEAN*/
  h3_is_pentagon(col0: DVarcharable): DBoolField;
  /**@external: h3_is_res_class_iii(col0:BIGINT) -> BOOLEAN*/
  h3_is_res_class_iii(col0: DNumericable): DBoolField;
  /**@external: h3_is_res_class_iii(col0:VARCHAR) -> BOOLEAN*/
  h3_is_res_class_iii(col0: DVarcharable): DBoolField;
  /**@external: h3_is_valid_cell(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_cell(col0: DNumericable): DBoolField;
  /**@external: h3_is_valid_cell(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_cell(col0: DVarcharable): DBoolField;
  /**@external: h3_is_valid_directed_edge(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_directed_edge(col0: DNumericable): DBoolField;
  /**@external: h3_is_valid_directed_edge(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_directed_edge(col0: DVarcharable): DBoolField;
  /**@external: h3_is_valid_vertex(col0:BIGINT) -> BOOLEAN*/
  h3_is_valid_vertex(col0: DNumericable): DBoolField;
  /**@external: h3_is_valid_vertex(col0:VARCHAR) -> BOOLEAN*/
  h3_is_valid_vertex(col0: DVarcharable): DBoolField;
  /**@external: h3_latlng_to_cell(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> UBIGINT*/
  h3_latlng_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): number & _DNumericComp;
  /**@external: h3_latlng_to_cell_string(col0:DOUBLE, col1:DOUBLE, col2:INTEGER) -> VARCHAR*/
  h3_latlng_to_cell_string(col0: DNumericable, col1: DNumericable, col2: DNumericable): string & _DVarcharComp;
  /**@external: h3_local_ij_to_cell(col0:BIGINT, col1:INTEGER, col2:INTEGER) -> BIGINT*/
  h3_local_ij_to_cell(col0: DNumericable, col1: DNumericable, col2: DNumericable): number & _DNumericComp;
  /**@external: h3_local_ij_to_cell(col0:VARCHAR, col1:INTEGER, col2:INTEGER) -> VARCHAR*/
  h3_local_ij_to_cell(col0: DVarcharable, col1: DNumericable, col2: DNumericable): string & _DVarcharComp;
  /**@external: h3_origin_to_directed_edges(col0:BIGINT) -> UBIGINT[]*/
  h3_origin_to_directed_edges(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_origin_to_directed_edges(col0:VARCHAR) -> VARCHAR[]*/
  h3_origin_to_directed_edges(col0: DVarcharable): DArrayField<DVarcharField>;
  /**@external: h3_polygon_wkt_to_cells(col0:VARCHAR, col1:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells(col0: DVarcharable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_polygon_wkt_to_cells_experimental(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> UBIGINT[]*/
  h3_polygon_wkt_to_cells_experimental(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_polygon_wkt_to_cells_experimental_string(col0:VARCHAR, col1:VARCHAR, col2:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_experimental_string(col0: DVarcharable, col1: DVarcharable, col2: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_polygon_wkt_to_cells_string(col0:VARCHAR, col1:INTEGER) -> VARCHAR[]*/
  h3_polygon_wkt_to_cells_string(col0: DVarcharable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_string_to_h3(col0:VARCHAR) -> UBIGINT*/
  h3_string_to_h3(col0: DVarcharable): number & _DNumericComp;
  /**@external: h3_uncompact_cells(col0:BIGINT[], col1:INTEGER) -> BIGINT[]*/
  h3_uncompact_cells(col0: DArrayable, col1: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_uncompact_cells(col0:VARCHAR[], col1:INTEGER) -> VARCHAR[]*/
  h3_uncompact_cells(col0: DArrayable, col1: DNumericable): DArrayField<DVarcharField>;
  /**@external: h3_vertex_to_lat(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lat(col0: DNumericable): number & _DNumericComp;
  /**@external: h3_vertex_to_lat(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lat(col0: DVarcharable): number & _DNumericComp;
  /**@external: h3_vertex_to_latlng(col0:BIGINT) -> DOUBLE[]*/
  h3_vertex_to_latlng(col0: DNumericable): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_latlng(col0:VARCHAR) -> DOUBLE[]*/
  h3_vertex_to_latlng(col0: DVarcharable): DArrayField<DNumericField>;
  /**@external: h3_vertex_to_lng(col0:BIGINT) -> DOUBLE*/
  h3_vertex_to_lng(col0: DNumericable): number & _DNumericComp;
  /**@external: h3_vertex_to_lng(col0:VARCHAR) -> DOUBLE*/
  h3_vertex_to_lng(col0: DVarcharable): number & _DNumericComp;
  /**@description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@external: hamming(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  hamming(str1: DVarcharable, str2: DVarcharable): number & _DNumericComp;
  /**@description: Returns an integer with the hash of the value. Note that this is not a cryptographic hash	@example: hash('🦆')	@external: hash(param:ANY) -> UBIGINT*/
  hash(param: DAnyable, ...vargs: DAnyable[]): number & _DNumericComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:BIGINT) -> VARCHAR*/
  hex(value: DNumericable): string & _DVarcharComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:BLOB) -> VARCHAR*/
  hex(value: DAnyable): string & _DVarcharComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: hex(value:VARCHAR) -> VARCHAR*/
  hex(value: DVarcharable): string & _DVarcharComp;
  /**@description: Returns a LIST of STRUCTs with the fields bucket and count.	@example: histogram(A)	@external: histogram(arg:ANY, col1: | ANY[]) -> MAP*/
  histogram(arg: DAnyable, col1?: DAnyable | DArrayable): DAnyComp;
  /**@description: Returns a LIST of STRUCTs with the fields bucket and count matching the buckets exactly.	@example: histogram_exact(A, [0, 1, 2])	@external: histogram_exact(arg:ANY, bins:ANY[]) -> MAP*/
  histogram_exact(arg: DAnyable, bins: DArrayable): DAnyComp;
  /**@external: host(col0:INET) -> VARCHAR*/
  host(col0: DAnyable): string & _DVarcharComp;
  /**@description: Extract the hour component from a date or timestamp	@example: hour(timestamp '2021-08-03 11:59:44.123456')	@external: hour(ts:DATE) -> BIGINT*/
  hour(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the hour component from a date or timestamp	@example: hour(timestamp '2021-08-03 11:59:44.123456')	@external: hour(ts:INTERVAL) -> BIGINT*/
  hour(ts: DAnyable): number & _DNumericComp;
  /**@external: html_escape(col0:VARCHAR, col1: | BOOLEAN) -> VARCHAR*/
  html_escape(col0: DVarcharable, col1?: DAnyable | DBoolable): string & _DVarcharComp;
  /**@external: html_unescape(col0:VARCHAR) -> VARCHAR*/
  html_unescape(col0: DVarcharable): string & _DVarcharComp;
  /**@external: icu_sort_key(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  icu_sort_key(col0: DVarcharable, col1: DVarcharable): string & _DVarcharComp;
  /**@description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: ilike_escape('A%c', 'a$%C', '$')	@external: ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns whether or not the database/schema are in the search path	@example: in_search_path('memory', 'main')	@external: in_search_path(databaseName:VARCHAR, schemaName:VARCHAR) -> BOOLEAN*/
  in_search_path(databaseName: DVarcharable, schemaName: DVarcharable): DBoolField;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: instr(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  instr(haystack: DVarcharable, needle: DVarcharable): number & _DNumericComp;
  /**@description: Whether or not the provided value is the histogram "other" bin (used for values not belonging to any provided bin)	@example: is_histogram_other_bin(v)	@external: is_histogram_other_bin(val:ANY) -> BOOLEAN*/
  is_histogram_other_bin(val: DAnyable): DBoolField;
  /**@description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@external: isfinite(x:DATE) -> BOOLEAN*/
  isfinite(x: DDateable): DBoolField;
  /**@description: Returns true if the floating point value is finite, false otherwise	@example: isfinite(5.5)	@external: isfinite(x:DOUBLE) -> BOOLEAN*/
  isfinite(x: DNumericable): DBoolField;
  /**@description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@external: isinf(x:DATE) -> BOOLEAN*/
  isinf(x: DDateable): DBoolField;
  /**@description: Returns true if the floating point value is infinite, false otherwise	@example: isinf('Infinity'::float)	@external: isinf(x:DOUBLE) -> BOOLEAN*/
  isinf(x: DNumericable): DBoolField;
  /**@description: Returns true if the floating point value is not a number, false otherwise	@example: isnan('NaN'::FLOAT)	@external: isnan(x:DOUBLE) -> BOOLEAN*/
  isnan(x: DNumericable): DBoolField;
  /**@description: Extract the isodow component from a date or timestamp	@example: isodow(timestamp '2021-08-03 11:59:44.123456')	@external: isodow(ts:DATE) -> BIGINT*/
  isodow(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the isodow component from a date or timestamp	@example: isodow(timestamp '2021-08-03 11:59:44.123456')	@external: isodow(ts:INTERVAL) -> BIGINT*/
  isodow(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the isoyear component from a date or timestamp	@example: isoyear(timestamp '2021-08-03 11:59:44.123456')	@external: isoyear(ts:DATE) -> BIGINT*/
  isoyear(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the isoyear component from a date or timestamp	@example: isoyear(timestamp '2021-08-03 11:59:44.123456')	@external: isoyear(ts:INTERVAL) -> BIGINT*/
  isoyear(ts: DAnyable): number & _DNumericComp;
  /**@description: The Jaccard similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaccard('duck','luck')	@external: jaccard(str1:VARCHAR, str2:VARCHAR) -> DOUBLE*/
  jaccard(str1: DVarcharable, str2: DVarcharable): number & _DNumericComp;
  /**@description: The Jaro similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_similarity('duck', 'duckdb', 0.5)	@external: jaro_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DNumericable | DAnyable): number & _DNumericComp;
  /**@description: The Jaro-Winkler similarity between two strings. Different case is considered different. Returns a number between 0 and 1	@example: jaro_winkler_similarity('duck', 'duckdb', 0.5)	@external: jaro_winkler_similarity(str1:VARCHAR, str2:VARCHAR, scoreCutoff:DOUBLE | ) -> DOUBLE*/
  jaro_winkler_similarity(str1: DVarcharable, str2: DVarcharable, scoreCutoff?: DNumericable | DAnyable): number & _DNumericComp;
  /**@external: json_array_length(col0:JSON, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col0: DJsonable, col1: DArrayable): DArrayField<DNumericField>;
  /**@external: json_array_length(col0:JSON, col1:VARCHAR | ) -> UBIGINT*/
  json_array_length(col0: DJsonable, col1?: DVarcharable | DAnyable): number & _DNumericComp;
  /**@external: json_array_length(col0:VARCHAR, col1:VARCHAR[]) -> UBIGINT[]*/
  json_array_length(col0: DVarcharable, col1: DArrayable): DArrayField<DNumericField>;
  /**@external: json_array_length(col0:VARCHAR, col1: | VARCHAR) -> UBIGINT*/
  json_array_length(col0: DVarcharable, col1?: DAnyable | DVarcharable): number & _DNumericComp;
  /**@external: json_contains(col0:JSON, col1:VARCHAR | JSON) -> BOOLEAN*/
  json_contains(col0: DJsonable, col1: DVarcharable | DJsonable): DBoolField;
  /**@external: json_contains(col0:VARCHAR, col1:VARCHAR | JSON) -> BOOLEAN*/
  json_contains(col0: DVarcharable, col1: DVarcharable | DJsonable): DBoolField;
  /**@external: json_deserialize_sql(col0:JSON) -> VARCHAR*/
  json_deserialize_sql(col0: DJsonable): string & _DVarcharComp;
  /**@external: json_exists(col0:JSON, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col0: DJsonable, col1: DArrayable): DArrayField<DBoolField>;
  /**@external: json_exists(col0:JSON, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col0: DJsonable, col1: DVarcharable): DBoolField;
  /**@external: json_exists(col0:VARCHAR, col1:VARCHAR[]) -> BOOLEAN[]*/
  json_exists(col0: DVarcharable, col1: DArrayable): DArrayField<DBoolField>;
  /**@external: json_exists(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  json_exists(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@external: json_extract(col0:JSON, col1:VARCHAR | BIGINT) -> JSON*/
  json_extract(col0: DJsonable, col1: DVarcharable | DNumericable): DJsonField;
  /**@external: json_extract(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col0: DJsonable, col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract(col0:VARCHAR, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract(col0: DVarcharable, col1: DNumericable | DVarcharable): DJsonField;
  /**@external: json_extract(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract(col0: DVarcharable, col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path(col0:JSON, col1:BIGINT | VARCHAR) -> JSON*/
  json_extract_path(col0: DJsonable, col1: DNumericable | DVarcharable): DJsonField;
  /**@external: json_extract_path(col0:JSON, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col0: DJsonable, col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path(col0:VARCHAR, col1:VARCHAR | BIGINT) -> JSON*/
  json_extract_path(col0: DVarcharable, col1: DVarcharable | DNumericable): DJsonField;
  /**@external: json_extract_path(col0:VARCHAR, col1:VARCHAR[]) -> JSON[]*/
  json_extract_path(col0: DVarcharable, col1: DArrayable): DArrayField<DJsonField>;
  /**@external: json_extract_path_text(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_path_text(col0:JSON, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col0: DJsonable, col1: DNumericable | DVarcharable): string & _DVarcharComp;
  /**@external: json_extract_path_text(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_path_text(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_path_text(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_path_text(col0: DVarcharable, col1: DNumericable | DVarcharable): string & _DVarcharComp;
  /**@external: json_extract_string(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_string(col0:JSON, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_extract_string(col0: DJsonable, col1: DVarcharable | DNumericable): string & _DVarcharComp;
  /**@external: json_extract_string(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_extract_string(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_extract_string(col0:VARCHAR, col1:BIGINT | VARCHAR) -> VARCHAR*/
  json_extract_string(col0: DVarcharable, col1: DNumericable | DVarcharable): string & _DVarcharComp;
  /**@external: json_keys(col0:JSON, col1: | VARCHAR | VARCHAR[]) -> VARCHAR[]*/
  json_keys(col0: DJsonable, col1?: DAnyable | DVarcharable | DArrayable): DArrayField<DVarcharField>;
  /**@external: json_keys(col0:VARCHAR, col1: | VARCHAR | VARCHAR[]) -> VARCHAR[]*/
  json_keys(col0: DVarcharable, col1?: DAnyable | DVarcharable | DArrayable): DArrayField<DVarcharField>;
  /**@external: json_pretty(col0:JSON) -> VARCHAR*/
  json_pretty(col0: DJsonable): string & _DVarcharComp;
  /**@external: json_serialize_plan(col0:VARCHAR, col1:BOOLEAN | , col2:BOOLEAN | , col3:BOOLEAN | , col4:BOOLEAN | ) -> JSON*/
  json_serialize_plan(col0: DVarcharable, col1?: DBoolable | DAnyable, col2?: DBoolable | DAnyable, col3?: DBoolable | DAnyable, col4?: DBoolable | DAnyable): DJsonField;
  /**@external: json_serialize_sql(col0:VARCHAR, col1:BOOLEAN | , col2: | BOOLEAN, col3: | BOOLEAN) -> JSON*/
  json_serialize_sql(col0: DVarcharable, col1?: DBoolable | DAnyable, col2?: DAnyable | DBoolable, col3?: DAnyable | DBoolable): DJsonField;
  /**@external: json_structure(col0:JSON) -> JSON*/
  json_structure(col0: DJsonable): DJsonField;
  /**@external: json_structure(col0:VARCHAR) -> JSON*/
  json_structure(col0: DVarcharable): DJsonField;
  /**@external: json_transform(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform(col0: DJsonable, col1: DVarcharable): DAnyComp;
  /**@external: json_transform(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform(col0: DVarcharable, col1: DVarcharable): DAnyComp;
  /**@external: json_transform_strict(col0:JSON, col1:VARCHAR) -> ANY*/
  json_transform_strict(col0: DJsonable, col1: DVarcharable): DAnyComp;
  /**@external: json_transform_strict(col0:VARCHAR, col1:VARCHAR) -> ANY*/
  json_transform_strict(col0: DVarcharable, col1: DVarcharable): DAnyComp;
  /**@external: json_type(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_type(col0:JSON, col1: | VARCHAR) -> VARCHAR*/
  json_type(col0: DJsonable, col1?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@external: json_type(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_type(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_type(col0:VARCHAR, col1: | VARCHAR) -> VARCHAR*/
  json_type(col0: DVarcharable, col1?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@external: json_valid(col0:JSON) -> BOOLEAN*/
  json_valid(col0: DJsonable): DBoolField;
  /**@external: json_valid(col0:VARCHAR) -> BOOLEAN*/
  json_valid(col0: DVarcharable): DBoolField;
  /**@external: json_value(col0:JSON, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col0: DJsonable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_value(col0:JSON, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_value(col0: DJsonable, col1: DVarcharable | DNumericable): string & _DVarcharComp;
  /**@external: json_value(col0:VARCHAR, col1:VARCHAR[]) -> VARCHAR[]*/
  json_value(col0: DVarcharable, col1: DArrayable): DArrayField<DVarcharField>;
  /**@external: json_value(col0:VARCHAR, col1:VARCHAR | BIGINT) -> VARCHAR*/
  json_value(col0: DVarcharable, col1: DVarcharable | DNumericable): string & _DVarcharComp;
  /**@description: Extract the Julian Day number from a date or timestamp	@example: julian(timestamp '2006-01-01 12:00')	@external: julian(ts:DATE) -> DOUBLE*/
  julian(ts: DDateable): number & _DNumericComp;
  /**@description: Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example: kahan_sum(A)	@external: kahan_sum(arg:DOUBLE) -> DOUBLE*/
  kahan_sum(arg: DNumericable): number & _DNumericComp;
  /**@description: Returns the excess kurtosis (Fisher’s definition) of all input values, with a bias correction according to the sample size	@external: kurtosis(x:DOUBLE) -> DOUBLE*/
  kurtosis(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the excess kurtosis (Fisher’s definition) of all input values, without bias correction	@external: kurtosis_pop(x:DOUBLE) -> DOUBLE*/
  kurtosis_pop(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the last value of a column. This function is affected by ordering.	@example: last(A)	@external: last(arg:ANY) -> ANY*/
  last(arg: DAnyable): DAnyComp;
  /**@description: Returns the last value of a column. This function is affected by ordering.	@example: last(A)	@external: last(arg:DECIMAL) -> DECIMAL*/
  last(arg: DNumericable): number & _DNumericComp;
  /**@description: Returns the last day of the month	@example: last_day(TIMESTAMP '1992-03-22 01:02:03.1234')	@external: last_day(ts:DATE) -> DATE*/
  last_day(ts: DDateable): DDateField;
  /**@description: Convert string to lower case	@example: lower('Hello')	@external: lcase(string:VARCHAR) -> VARCHAR*/
  lcase(string: DVarcharable): string & _DVarcharComp;
  /**@description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@external: lcm(x:BIGINT, y:BIGINT) -> BIGINT*/
  lcm(x: DNumericable, y: DNumericable): number & _DNumericComp;
  /**@description: Returns the lowest value of the set of input parameters	@example: least(42, 84)	@external: least(arg1:ANY) -> ANY*/
  least(arg1: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Computes the least common multiple of x and y	@example: least_common_multiple(42, 57)	@external: least_common_multiple(x:BIGINT, y:BIGINT) -> BIGINT*/
  least_common_multiple(x: DNumericable, y: DNumericable): number & _DNumericComp;
  /**@description: Extract the left-most count characters	@example: left('Hello🦆', 2)	@external: left(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left(string: DVarcharable, count: DNumericable): string & _DVarcharComp;
  /**@description: Extract the left-most count grapheme clusters	@example: left_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@external: left_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  left_grapheme(string: DVarcharable, count: DNumericable): string & _DVarcharComp;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: len(string:ANY[]) -> BIGINT*/
  len(string: DArrayable): number & _DNumericComp;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: len(string:BIT) -> BIGINT*/
  len(string: DAnyable): number & _DNumericComp;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: len(string:VARCHAR) -> BIGINT*/
  len(string: DVarcharable): number & _DNumericComp;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: length(string:ANY[]) -> BIGINT*/
  length(string: DArrayable): number & _DNumericComp;
  /**@description: Number of characters in string.	@example: length('Hello🦆')	@external: length(string:BIT) -> BIGINT*/
  length(string: DAnyable): number & _DNumericComp;
  /**@description: Number of grapheme clusters in string.	@example: length_grapheme('🤦🏼‍♂️🤦🏽‍♀️')	@external: length_grapheme(string:VARCHAR) -> BIGINT*/
  length_grapheme(string: DVarcharable): number & _DNumericComp;
  /**@description: The minimum number of single-character edits (insertions, deletions or substitutions) required to change one string to the other. Different case is considered different	@example: levenshtein('duck','db')	@external: levenshtein(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  levenshtein(str1: DVarcharable, str2: DVarcharable): number & _DNumericComp;
  /**@description: Computes the log of the gamma function	@example: lgamma(2)	@external: lgamma(x:DOUBLE) -> DOUBLE*/
  lgamma(x: DNumericable): number & _DNumericComp;
  /**@description: Returns true if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: like_escape('a%c', 'a$%c', '$')	@external: like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns a LIST containing all the values of a column.	@example: list(A)	@external: list(arg:ANY) -> LIST*/
  list(arg: DAnyable): DArrayField;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: list_aggr(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggr(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Executes the aggregate function name on the elements of list	@example: list_aggregate([1, 2, NULL], 'min')	@external: list_aggregate(list:ANY[], name:VARCHAR) -> ANY*/
  list_aggregate(list: DArrayable, name: DVarcharable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: list_apply(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_apply(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: list_cat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_cat(list1: DArrayable, list2: DArrayable): DArrayField<DAnyField>;
  /**@description: Concatenates two lists.	@example: list_concat([2, 3], [4, 5, 6])	@external: list_concat(list1:ANY[], list2:ANY[]) -> ANY[]*/
  list_concat(list1: DArrayable, list2: DArrayable): DArrayField<DAnyField>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: list_contains(list:ANY[], element:ANY) -> BOOLEAN*/
  list_contains(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Compute the cosine distance between two lists	@example: list_cosine_distance([1, 2, 3], [1, 2, 3])	@external: list_cosine_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_distance(list1: DArrayable, list2: DArrayable): number & _DNumericComp;
  /**@description: Compute the cosine similarity between two lists	@example: list_cosine_similarity([1, 2, 3], [1, 2, 3])	@external: list_cosine_similarity(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_cosine_similarity(list1: DArrayable, list2: DArrayable): number & _DNumericComp;
  /**@description: Compute the distance between two lists	@example: list_distance([1, 2, 3], [1, 2, 3])	@external: list_distance(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_distance(list1: DArrayable, list2: DArrayable): number & _DNumericComp;
  /**@description: Removes all duplicates and NULLs from a list. Does not preserve the original order	@example: list_distinct([1, 1, NULL, -3, 1, 5])	@external: list_distinct(list:ANY[]) -> ANY[]*/
  list_distinct(list: DArrayable): DArrayField<DAnyField>;
  /**@description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@external: list_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_dot_product(list1: DArrayable, list2: DArrayable): number & _DNumericComp;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_element(list:ANY[], index:BIGINT) -> ANY*/
  list_element(list: DArrayable, index: DNumericable): DAnyComp;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_element(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_element(list: DVarcharable, index: DNumericable): string & _DVarcharComp;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_extract(list:ANY[], index:BIGINT) -> ANY*/
  list_extract(list: DArrayable, index: DNumericable): DAnyComp;
  /**@description: Extract the indexth (1-based) value from the list.	@example: list_extract([4, 5, 6], 3)	@external: list_extract(list:VARCHAR, index:BIGINT) -> VARCHAR*/
  list_extract(list: DVarcharable, index: DNumericable): string & _DVarcharComp;
  /**@description: Constructs a list from those elements of the input list for which the lambda function returns true	@example: list_filter([3, 4, 5], x -> x > 4)	@external: list_filter(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_filter(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Returns the index of their sorted position.	@example: list_grade_up([3, 6, 1, 2])	@external: list_grade_up(list:ANY[], col1:VARCHAR | , col2:VARCHAR | ) -> ANY[]*/
  list_grade_up(list: DArrayable, col1?: DVarcharable | DAnyable, col2?: DVarcharable | DAnyable): DArrayField<DAnyField>;
  /**@description: Returns true if the list contains the element.	@example: list_contains([1, 2, NULL], 1)	@external: list_has(list:ANY[], element:ANY) -> BOOLEAN*/
  list_has(list: DArrayable, element: DAnyable): DBoolField;
  /**@description: Returns true if all elements of l2 are in l1. NULLs are ignored.	@example: list_has_all([1, 2, 3], [2, 3])	@external: list_has_all(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_all(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description: Returns true if the lists have any element in common. NULLs are ignored.	@example: list_has_any([1, 2, 3], [2, 3, 4])	@external: list_has_any(l1:ANY[], l2:ANY[]) -> BOOLEAN*/
  list_has_any(l1: DArrayable, l2: DArrayable): DBoolField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: list_indexof(list:ANY[], element:ANY) -> INTEGER*/
  list_indexof(list: DArrayable, element: DAnyable): number & _DNumericComp;
  /**@description: Compute the inner product between two lists	@example: list_inner_product([1, 2, 3], [1, 2, 3])	@external: list_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_inner_product(list1: DArrayable, list2: DArrayable): number & _DNumericComp;
  /**@description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: list_negative_dot_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_dot_product(list1: DArrayable, list2: DArrayable): number & _DNumericComp;
  /**@description: Compute the negative inner product between two lists	@example: list_negative_inner_product([1, 2, 3], [1, 2, 3])	@external: list_negative_inner_product(list1:DOUBLE[], list2:DOUBLE[]) -> DOUBLE*/
  list_negative_inner_product(list1: DArrayable, list2: DArrayable): number & _DNumericComp;
  /**@description: Create a LIST containing the argument values	@example: list_value(4, 5, 6)*/
  list_pack(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns the index of the element if the list contains the element. If the element is not found, it returns NULL.	@example: list_position([1, 2, NULL], 2)	@external: list_position(list:ANY[], element:ANY) -> INTEGER*/
  list_position(list: DArrayable, element: DAnyable): number & _DNumericComp;
  /**@description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@external: list_reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  list_reduce(list: DArrayable, lambda: DAnyable): DAnyComp;
  /**@description: Resizes the list to contain size elements. Initializes new elements with value or NULL if value is not set.	@example: list_resize([1, 2, 3], 5, 0)	@external: list_resize(list:ANY[], size:ANY, value: | ANY) -> ANY[]*/
  list_resize(list: DArrayable, size: DAnyable, value?: DAnyable): DArrayField<DAnyField>;
  /**@description: Sorts the elements of the list in reverse order	@example: list_reverse_sort([3, 6, 1, 2])	@external: list_reverse_sort(list:ANY[], col1: | VARCHAR) -> ANY[]*/
  list_reverse_sort(list: DArrayable, col1?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**@description: Returns a list based on the elements selected by the index_list.	@example: list_select([10, 20, 30, 40], [1, 4])	@external: list_select(valueList:ANY[], indexList:BIGINT[]) -> ANY[]*/
  list_select(valueList: DArrayable, indexList: DArrayable): DArrayField<DAnyField>;
  /**@description: list_slice with added step feature.	@example: list_slice([4, 5, 6], 1, 3, 2)	@external: list_slice(list:ANY, begin:ANY, end:ANY, step:BIGINT | ) -> ANY*/
  list_slice(list: DAnyable, begin: DAnyable, end: DAnyable, step?: DNumericable | DAnyable): DAnyComp;
  /**@description: Sorts the elements of the list	@example: list_sort([3, 6, 1, 2])	@external: list_sort(list:ANY[], col1: | VARCHAR, col2: | VARCHAR) -> ANY[]*/
  list_sort(list: DArrayable, col1?: DAnyable | DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DAnyField>;
  /**@description: Returns a list that is the result of applying the lambda function to each element of the input list. See the Lambda Functions section for more details	@example: list_transform([1, 2, 3], x -> x + 1)	@external: list_transform(list:ANY[], lambda:LAMBDA) -> ANY[]*/
  list_transform(list: DArrayable, lambda: DAnyable): DArrayField<DAnyField>;
  /**@description: Counts the unique elements of a list	@example: list_unique([1, 1, NULL, -3, 1, 5])	@external: list_unique(list:ANY[]) -> UBIGINT*/
  list_unique(list: DArrayable): number & _DNumericComp;
  /**@description: Create a LIST containing the argument values	@example: list_value(4, 5, 6)*/
  list_value(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns a list with the BOOLEANs in mask_list applied as a mask to the value_list.	@example: list_where([10, 20, 30, 40], [true, false, false, true])	@external: list_where(valueList:ANY[], maskList:BOOLEAN[]) -> ANY[]*/
  list_where(valueList: DArrayable, maskList: DArrayable): DArrayField<DAnyField>;
  /**@description: Zips k LISTs to a new LIST whose length will be that of the longest list. Its elements are structs of k elements from each list list_1, …, list_k, missing elements are replaced with NULL. If truncate is set, all lists are truncated to the smallest list length.	@example: list_zip([1, 2], [3, 4], [5, 6])*/
  list_zip(...vargs: DAnyable[]): DArrayField<DStructField>;
  /**@description: Concatenates the column string values with an optional separator.	@example: string_agg(A, '-')	@external: listagg(str:ANY, arg: | VARCHAR) -> VARCHAR*/
  listagg(str: DAnyable, arg?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@description: Computes the natural logarithm of x	@example: ln(2)	@external: ln(x:DOUBLE) -> DOUBLE*/
  ln(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the logarithm of x to base b. b may be omitted, in which case the default 10	@example: log(2, 64)	@external: log(b:DOUBLE, x: | DOUBLE) -> DOUBLE*/
  log(b: DNumericable, x?: DAnyable | DNumericable): number & _DNumericComp;
  /**@description: Computes the 10-log of x	@example: log10(1000)	@external: log10(x:DOUBLE) -> DOUBLE*/
  log10(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the 2-log of x	@example: log2(8)	@external: log2(x:DOUBLE) -> DOUBLE*/
  log2(x: DNumericable): number & _DNumericComp;
  /**@description: Convert string to lower case	@example: lower('Hello')	@external: lower(string:VARCHAR) -> VARCHAR*/
  lower(string: DVarcharable): string & _DVarcharComp;
  /**@description: Pads the string with the character from the left until it has count characters	@example: lpad('hello', 10, '>')	@external: lpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  lpad(string: DVarcharable, count: DNumericable, character: DVarcharable): string & _DVarcharComp;
  /**@description: Removes any occurrences of any of the characters from the left side of the string	@example: ltrim('>>>>test<<', '><')	@external: ltrim(string:VARCHAR, characters: | VARCHAR) -> VARCHAR*/
  ltrim(string: DVarcharable, characters?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@description: Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example: mad(x)	@external: mad(x:TIMESTAMP WITH TIME ZONE | TIME | TIME WITH TIME ZONE | TIMESTAMP | DATE) -> INTERVAL*/
  mad(x: DDateable): DAnyComp;
  /**@description: Returns the median absolute deviation for the values within x. NULL values are ignored. Temporal types return a positive INTERVAL.		@example: mad(x)	@external: mad(x:DOUBLE | FLOAT | DECIMAL) -> DOUBLE*/
  mad(x: DNumericable): number & _DNumericComp;
  /**@description: The date for the given parts	@example: make_date(1992, 9, 20)	@external: make_date(year:BIGINT, month:BIGINT, day:BIGINT) -> DATE*/
  make_date(year: DNumericable, month: DNumericable, day: DNumericable): DDateField;
  /**@external: make_date(col0:INTEGER) -> DATE*/
  make_date(col0: DNumericable): DDateField;
  /**@description: The date for the given struct.	@example: make_date({'year': 2024, 'month': 11, 'day': 14})	@external: make_date(dateStruct:STRUCT("year" BIGINT, "month" BIGINT, "day" BIGINT)) -> DATE*/
  make_date(dateStruct: DNumericable): DDateField;
  /**@description: The time for the given parts	@example: make_time(13, 34, 27.123456)	@external: make_time(hour:BIGINT, minute:BIGINT, seconds:DOUBLE) -> TIME*/
  make_time(hour: DNumericable, minute: DNumericable, seconds: DNumericable): DDateField;
  /**@description: The timestamp for the given parts	@example: make_timestamp(1992, 9, 20, 13, 34, 27.123456)	@external: make_timestamp(year:BIGINT, month: | BIGINT, day: | BIGINT, hour: | BIGINT, minute: | BIGINT, seconds: | DOUBLE) -> TIMESTAMP*/
  make_timestamp(year: DNumericable, month?: DAnyable | DNumericable, day?: DAnyable | DNumericable, hour?: DAnyable | DNumericable, minute?: DAnyable | DNumericable, seconds?: DAnyable | DNumericable): DDateField;
  /**@description: The timestamp for the given nanoseconds since epoch	@example: make_timestamp(1732117793000000000)	@external: make_timestamp_ns(nanos:BIGINT) -> TIMESTAMP_NS*/
  make_timestamp_ns(nanos: DNumericable): DDateField;
  /**@external: make_timestamptz(col0:BIGINT, col1: | BIGINT, col2: | BIGINT, col3: | BIGINT, col4: | BIGINT, col5: | DOUBLE, col6: | VARCHAR) -> TIMESTAMP WITH TIME ZONE*/
  make_timestamptz(col0: DNumericable, col1?: DAnyable | DNumericable, col2?: DAnyable | DNumericable, col3?: DAnyable | DNumericable, col4?: DAnyable | DNumericable, col5?: DAnyable | DNumericable, col6?: DAnyable | DVarcharable): DDateField;
  /**@description: Creates a map from a set of keys and values	@example: map(['key1', 'key2'], ['val1', 'val2'])*/
  map(...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns a map created from merging the input maps, on key collision the value is taken from the last map with that key	@example: map_concat(map([1,2], ['a', 'b']), map([2,3], ['c', 'd']));*/
  map_concat(...vargs: DAnyable[]): DArrayField;
  /**@description: Checks if a map contains a given key.	@example: map_contains(MAP {'key1': 10, 'key2': 20, 'key3': 30}, 'key2')	@external: map_contains(map:MAP(ANY, ANY), key:ANY) -> BOOLEAN*/
  map_contains(map: DAnyable, key: DAnyable): DBoolField;
  /**@description: Returns the map entries as a list of keys/values	@example: map_entries(map(['key'], ['val']))*/
  map_entries(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns a list containing the value for a given key or an empty list if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract(map(['key'], ['val']), 'key')	@external: map_extract(map:ANY, key:ANY) -> ANY*/
  map_extract(map: DAnyable, key: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns the value for a given key or NULL if the key is not contained in the map. The type of the key provided in the second parameter must match the type of the map’s keys else an error is returned	@example: map_extract_value(map(['key'], ['val']), 'key')	@external: map_extract_value(map:ANY, key:ANY) -> ANY*/
  map_extract_value(map: DAnyable, key: DAnyable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns a map created from the entries of the array	@example: map_from_entries([{k: 5, v: 'val1'}, {k: 3, v: 'val2'}]);*/
  map_from_entries(...vargs: DAnyable[]): DAnyComp;
  /**@description: Returns the keys of a map as a list	@example: map_keys(map(['key'], ['val']))*/
  map_keys(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns the values of a map as a list	@example: map_values(map(['key'], ['val']))*/
  map_values(...vargs: DAnyable[]): DArrayField;
  /**@description: Returns the maximum value present in arg.	@example: max(A)	@external: max(arg:ANY) -> ANY*/
  max(arg: DAnyable): DAnyComp;
  /**@description: Returns the maximum value present in arg.	@example: max(A)	@external: max(arg:ANY, col1:BIGINT) -> ANY[]*/
  max(arg: DAnyable, col1: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:DATE | TIMESTAMP WITH TIME ZONE | TIMESTAMP, val:BIGINT | BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE | VARCHAR | DOUBLE | HUGEINT | INTEGER) -> DATE*/
  max_by(arg: DDateable, val: DNumericable | DAnyable | DDateable | DVarcharable): DDateField;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:ANY, val:ANY | BLOB | TIMESTAMP WITH TIME ZONE | TIMESTAMP | DATE | VARCHAR | DOUBLE | HUGEINT | BIGINT | INTEGER) -> ANY*/
  max_by(arg: DAnyable, val: DAnyable | DDateable | DVarcharable | DNumericable): DAnyComp;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  max_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:BIGINT | INTEGER | DECIMAL | DOUBLE, val:VARCHAR | DOUBLE | BIGINT | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | INTEGER | HUGEINT) -> BIGINT*/
  max_by(arg: DNumericable, val: DVarcharable | DNumericable | DDateable | DAnyable): number & _DNumericComp;
  /**@description: Finds the row with the maximum val. Calculates the non-NULL arg expression at that row.	@example: arg_max(A,B)	@external: max_by(arg:VARCHAR | BLOB, val:BLOB | INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> VARCHAR*/
  max_by(arg: DVarcharable | DAnyable, val: DAnyable | DNumericable | DVarcharable | DDateable): string & _DVarcharComp;
  /**@description: Returns the MD5 hash of the value as a string	@example: md5('123')	@external: md5(value:BLOB) -> VARCHAR*/
  md5(value: DAnyable): string & _DVarcharComp;
  /**@description: Returns the MD5 hash of the value as a string	@example: md5('123')	@external: md5(value:VARCHAR) -> VARCHAR*/
  md5(value: DVarcharable): string & _DVarcharComp;
  /**@description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@external: md5_number(value:BLOB) -> HUGEINT*/
  md5_number(value: DAnyable): number & _DNumericComp;
  /**@description: Returns the MD5 hash of the value as an INT128	@example: md5_number('123')	@external: md5_number(value:VARCHAR) -> HUGEINT*/
  md5_number(value: DVarcharable): number & _DNumericComp;
  /**@description: Calculates the average value for all tuples in x.	@example: SUM(x) / COUNT(*)	@external: mean(x:DECIMAL | SMALLINT | INTEGER | BIGINT | HUGEINT | DOUBLE) -> DECIMAL*/
  mean(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the middle value of the set. NULL values are ignored. For even value counts, quantitative values are averaged and ordinal values return the lower value.	@example: median(x)	@external: median(x:ANY) -> ANY*/
  median(x: DAnyable): DAnyComp;
  /**@description: Extract the microsecond component from a date or timestamp	@example: microsecond(timestamp '2021-08-03 11:59:44.123456')	@external: microsecond(ts:DATE) -> BIGINT*/
  microsecond(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the microsecond component from a date or timestamp	@example: microsecond(timestamp '2021-08-03 11:59:44.123456')	@external: microsecond(ts:INTERVAL) -> BIGINT*/
  microsecond(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the millennium component from a date or timestamp	@example: millennium(timestamp '2021-08-03 11:59:44.123456')	@external: millennium(ts:DATE) -> BIGINT*/
  millennium(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the millennium component from a date or timestamp	@example: millennium(timestamp '2021-08-03 11:59:44.123456')	@external: millennium(ts:INTERVAL) -> BIGINT*/
  millennium(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the millisecond component from a date or timestamp	@example: millisecond(timestamp '2021-08-03 11:59:44.123456')	@external: millisecond(ts:DATE) -> BIGINT*/
  millisecond(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the millisecond component from a date or timestamp	@example: millisecond(timestamp '2021-08-03 11:59:44.123456')	@external: millisecond(ts:INTERVAL) -> BIGINT*/
  millisecond(ts: DAnyable): number & _DNumericComp;
  /**@description: Returns the minimum value present in arg.	@example: min(A)	@external: min(arg:ANY) -> ANY*/
  min(arg: DAnyable): DAnyComp;
  /**@description: Returns the minimum value present in arg.	@example: min(A)	@external: min(arg:ANY, col1:BIGINT) -> ANY[]*/
  min(arg: DAnyable, col1: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE, val:BLOB | INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> DATE*/
  min_by(arg: DDateable, val: DAnyable | DNumericable | DVarcharable | DDateable): DDateField;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:ANY, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | ANY) -> ANY*/
  min_by(arg: DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): DAnyComp;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:ANY, val:ANY, col2:BIGINT) -> ANY[]*/
  min_by(arg: DAnyable, val: DAnyable, col2: DNumericable): DArrayField<DAnyField>;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:INTEGER | BIGINT | DOUBLE | DECIMAL, val:INTEGER | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB | BIGINT | HUGEINT | DOUBLE) -> INTEGER*/
  min_by(arg: DNumericable, val: DNumericable | DVarcharable | DDateable | DAnyable): number & _DNumericComp;
  /**@description: Finds the row with the minimum val. Calculates the non-NULL arg expression at that row.	@example: arg_min(A,B)	@external: min_by(arg:VARCHAR | BLOB, val:INTEGER | BIGINT | HUGEINT | DOUBLE | VARCHAR | DATE | TIMESTAMP | TIMESTAMP WITH TIME ZONE | BLOB) -> VARCHAR*/
  min_by(arg: DVarcharable | DAnyable, val: DNumericable | DVarcharable | DDateable | DAnyable): string & _DVarcharComp;
  /**@description: Extract the minute component from a date or timestamp	@example: minute(timestamp '2021-08-03 11:59:44.123456')	@external: minute(ts:DATE) -> BIGINT*/
  minute(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the minute component from a date or timestamp	@example: minute(timestamp '2021-08-03 11:59:44.123456')	@external: minute(ts:INTERVAL) -> BIGINT*/
  minute(ts: DAnyable): number & _DNumericComp;
  /**@description: The number of positions with different characters for 2 strings of equal length. Different case is considered different	@example: hamming('duck','luck')	@external: mismatches(str1:VARCHAR, str2:VARCHAR) -> BIGINT*/
  mismatches(str1: DVarcharable, str2: DVarcharable): number & _DNumericComp;
  /**@external: mod(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  mod(col0: DNumericable, col1: DNumericable): number & _DNumericComp;
  /**@description: Returns the most frequent value for the values within x. NULL values are ignored.	@external: mode(x:ANY) -> ANY*/
  mode(x: DAnyable): DAnyComp;
  /**@description: Extract the month component from a date or timestamp	@example: month(timestamp '2021-08-03 11:59:44.123456')	@external: month(ts:DATE) -> BIGINT*/
  month(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the month component from a date or timestamp	@example: month(timestamp '2021-08-03 11:59:44.123456')	@external: month(ts:INTERVAL) -> BIGINT*/
  month(ts: DAnyable): number & _DNumericComp;
  /**@description: The (English) name of the month	@example: monthname(TIMESTAMP '1992-09-20')	@external: monthname(ts:DATE) -> VARCHAR*/
  monthname(ts: DDateable): string & _DVarcharComp;
  /**@external: multiply(col0:BIGINT, col1:INTERVAL) -> INTERVAL*/
  multiply(col0: DNumericable, col1: DAnyable): DAnyComp;
  /**@external: multiply(col0:BIGINT, col1:BIGINT) -> BIGINT*/
  multiply(col0: DNumericable, col1: DNumericable): number & _DNumericComp;
  /**@external: multiply(col0:INTERVAL, col1:BIGINT) -> INTERVAL*/
  multiply(col0: DAnyable, col1: DNumericable): DAnyComp;
  /**@description: Extract the nanosecond component from a date or timestamp	@example: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789	@external: nanosecond(tsns:DATE) -> BIGINT*/
  nanosecond(tsns: DDateable): number & _DNumericComp;
  /**@description: Extract the nanosecond component from a date or timestamp	@example: nanosecond(timestamp_ns '2021-08-03 11:59:44.123456789') => 44123456789	@external: nanosecond(tsns:INTERVAL) -> BIGINT*/
  nanosecond(tsns: DAnyable): number & _DNumericComp;
  /**@external: netmask(col0:INET) -> INET*/
  netmask(col0: DAnyable): DAnyComp;
  /**@external: network(col0:INET) -> INET*/
  network(col0: DAnyable): DAnyComp;
  /**@description: Returns the next floating point value after x in the direction of y	@example: nextafter(1::float, 2::float)	@external: nextafter(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  nextafter(x: DNumericable, y: DNumericable): number & _DNumericComp;
  /**@description: Return the following value of the sequence.	@example: nextval('my_sequence_name')	@external: nextval(sequenceName:VARCHAR) -> BIGINT*/
  nextval(sequenceName: DVarcharable): number & _DNumericComp;
  /**@description: Convert string to Unicode NFC normalized string. Useful for comparisons and ordering if text data is mixed between NFC normalized and not.	@example: nfc_normalize('ardèch')	@external: nfc_normalize(string:VARCHAR) -> VARCHAR*/
  nfc_normalize(string: DVarcharable): string & _DVarcharComp;
  /**@description: Normalizes an INTERVAL to an equivalent interval	@example: normalized_interval(INTERVAL '30 days')	@external: normalized_interval(interval:INTERVAL) -> INTERVAL*/
  normalized_interval(interval: DAnyable): DAnyComp;
  /**@description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-insensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_ilike_escape('A%c', 'a$%C', '$')	@external: not_ilike_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_ilike_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns false if the string matches the like_specifier (see Pattern Matching) using case-sensitive matching. escape_character is used to search for wildcard characters in the string.	@example: not_like_escape('a%c', 'a$%c', '$')	@external: not_like_escape(string:VARCHAR, likeSpecifier:VARCHAR, escapeCharacter:VARCHAR) -> BOOLEAN*/
  not_like_escape(string: DVarcharable, likeSpecifier: DVarcharable, escapeCharacter: DVarcharable): DBoolField;
  /**@description: Returns the current timestamp	@example: get_current_timestamp()*/
  now(): DDateField;
  /**@description: Number of bytes in blob.	@example: octet_length('\xAA\xBB'::BLOB)	@external: octet_length(blob:BIT) -> BIGINT*/
  octet_length(blob: DAnyable): number & _DNumericComp;
  /**@description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@external: ord(str:VARCHAR) -> INTEGER*/
  ord(str: DVarcharable): number & _DNumericComp;
  /**@description: Returns the top-level directory name. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirname('path/to/file.csv', 'system')	@external: parse_dirname(string:VARCHAR, separator: | VARCHAR) -> VARCHAR*/
  parse_dirname(string: DVarcharable, separator?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@description: Returns the head of the path similarly to Python's os.path.dirname. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_dirpath('path/to/file.csv', 'system')	@external: parse_dirpath(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_dirpath(string: DVarcharable, separator?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Returns the last component of the path similarly to Python's os.path.basename. If trim_extension is true, the file extension will be removed (it defaults to false). separator options: system, both_slash (default), forward_slash, backslash	@example: parse_filename('path/to/file.csv', true, 'forward_slash')	@external: parse_filename(string:VARCHAR, trimExtension:BOOLEAN |  | VARCHAR, separator:VARCHAR | ) -> VARCHAR*/
  parse_filename(string: DVarcharable, trimExtension?: DBoolable | DAnyable | DVarcharable, separator?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Returns a list of the components (directories and filename) in the path similarly to Python's pathlib.PurePath::parts. separator options: system, both_slash (default), forward_slash, backslash	@example: parse_path('path/to/file.csv', 'system')	@external: parse_path(string:VARCHAR, separator:VARCHAR | ) -> VARCHAR[]*/
  parse_path(string: DVarcharable, separator?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns the value of pi	@example: pi()*/
  pi(): number & _DNumericComp;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: position(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  position(haystack: DVarcharable, needle: DVarcharable): number & _DNumericComp;
  /**@description: Computes x to the power of y	@example: pow(2, 3)	@external: pow(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  pow(x: DNumericable, y: DNumericable): number & _DNumericComp;
  /**@description: Computes x to the power of y	@example: pow(2, 3)	@external: power(x:DOUBLE, y:DOUBLE) -> DOUBLE*/
  power(x: DNumericable, y: DNumericable): number & _DNumericComp;
  /**@external: prefix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  prefix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description: Formats a string using printf syntax	@example: printf('Benchmark "%s" took %d seconds', 'CSV', 42)	@external: printf(format:VARCHAR) -> VARCHAR*/
  printf(format: DVarcharable, ...vargs: DAnyable[]): string & _DVarcharComp;
  /**@description: Calculates the product of all tuples in arg.	@example: product(A)	@external: product(arg:DOUBLE) -> DOUBLE*/
  product(arg: DNumericable): number & _DNumericComp;
  /**@description: Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example: quantile_disc(x, 0.5)	@external: quantile(x:ANY, pos:DOUBLE | DOUBLE[] | ) -> ANY*/
  quantile(x: DAnyable, pos?: DNumericable | DArrayable | DAnyable): DAnyComp;
  /**@description: Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example: quantile_cont(x, 0.5)	@external: quantile_cont(x:TIMESTAMP WITH TIME ZONE | TIME WITH TIME ZONE | DATE | TIME | TIMESTAMP, pos:DOUBLE[] | DOUBLE) -> TIMESTAMP WITH TIME ZONE*/
  quantile_cont(x: DDateable, pos: DArrayable | DNumericable): DDateField;
  /**@description: Returns the interpolated quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding interpolated quantiles.		@example: quantile_cont(x, 0.5)	@external: quantile_cont(x:DECIMAL | INTEGER | BIGINT | HUGEINT | SMALLINT | DOUBLE | FLOAT | TINYINT, pos:DOUBLE | DOUBLE[]) -> DECIMAL*/
  quantile_cont(x: DNumericable, pos: DNumericable | DArrayable): number & _DNumericComp;
  /**@description: Returns the exact quantile number between 0 and 1 . If pos is a LIST of FLOATs, then the result is a LIST of the corresponding exact quantiles.	@example: quantile_disc(x, 0.5)	@external: quantile_disc(x:ANY, pos: | DOUBLE[] | DOUBLE) -> ANY*/
  quantile_disc(x: DAnyable, pos?: DAnyable | DArrayable | DNumericable): DAnyComp;
  /**@description: Extract the quarter component from a date or timestamp	@example: quarter(timestamp '2021-08-03 11:59:44.123456')	@external: quarter(ts:DATE) -> BIGINT*/
  quarter(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the quarter component from a date or timestamp	@example: quarter(timestamp '2021-08-03 11:59:44.123456')	@external: quarter(ts:INTERVAL) -> BIGINT*/
  quarter(ts: DAnyable): number & _DNumericComp;
  /**@description: Converts degrees to radians	@example: radians(90)	@external: radians(x:DOUBLE) -> DOUBLE*/
  radians(x: DNumericable): number & _DNumericComp;
  /**@description: Returns a random number between 0 and 1	@example: random()*/
  random(): number & _DNumericComp;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:BIGINT, stop:BIGINT | , step:BIGINT | ) -> BIGINT[]*/
  range(start: DNumericable, stop?: DNumericable | DAnyable, step?: DNumericable | DAnyable): DArrayField<DNumericField>;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:TIMESTAMP WITH TIME ZONE, stop:TIMESTAMP WITH TIME ZONE, step:INTERVAL) -> TIMESTAMP WITH TIME ZONE[]*/
  range(start: DDateable, stop: DDateable, step: DAnyable): DArrayField;
  /**@description: Create a list of values between start and stop - the stop parameter is exclusive	@example: range(2, 5, 3)	@external: range(start:TIMESTAMP, stop:TIMESTAMP, step:INTERVAL) -> TIMESTAMP[]*/
  range(start: DDateable, stop: DDateable, step: DAnyable): DArrayField<DDateField>;
  /**@description: Returns a single value that is the result of applying the lambda function to each element of the input list, starting with the first element and then repeatedly applying the lambda function to the result of the previous application and the next element of the list.	@example: list_reduce([1, 2, 3], (x, y) -> x + y)	@external: reduce(list:ANY[], lambda:LAMBDA) -> ANY*/
  reduce(list: DArrayable, lambda: DAnyable): DAnyComp;
  /**@description: Escapes all potentially meaningful regexp characters in the input string	@example: regexp_escape('https://duckdb.org')	@external: regexp_escape(string:VARCHAR) -> VARCHAR*/
  regexp_escape(string: DVarcharable): string & _DVarcharComp;
  /**@description: If string contains the regexp pattern, returns the capturing group specified by optional parameter group. The group must be a constant value. If no group is given, it defaults to 0. A set of optional options can be set.	@example: regexp_extract('abc', '([a-z])(b)', 1)	@external: regexp_extract(string:VARCHAR, pattern:VARCHAR, group0:VARCHAR[] | INTEGER | , options:VARCHAR | ) -> VARCHAR*/
  regexp_extract(string: DVarcharable, pattern: DVarcharable, group0?: DArrayable | DNumericable | DAnyable, options?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Split the string along the regex and extract all occurrences of group. A set of optional options can be set.	@example: regexp_extract_all('hello_world', '([a-z ]+)_?', 1)	@external: regexp_extract_all(string:VARCHAR, regex:VARCHAR, group0:INTEGER | , options:VARCHAR | ) -> VARCHAR[]*/
  regexp_extract_all(string: DVarcharable, regex: DVarcharable, group0?: DNumericable | DAnyable, options?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns true if the entire string matches the regex. A set of optional options can be set.	@example: regexp_full_match('anabanana', '(an)*')	@external: regexp_full_match(string:VARCHAR, regex:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_full_match(string: DVarcharable, regex: DVarcharable, options?: DVarcharable | DAnyable): DBoolField;
  /**@description: Returns true if string contains the regexp pattern, false otherwise. A set of optional options can be set.	@example: regexp_matches('anabanana', '(an)*')	@external: regexp_matches(string:VARCHAR, pattern:VARCHAR, options:VARCHAR | ) -> BOOLEAN*/
  regexp_matches(string: DVarcharable, pattern: DVarcharable, options?: DVarcharable | DAnyable): DBoolField;
  /**@description: If string contains the regexp pattern, replaces the matching part with replacement. A set of optional options can be set.	@example: regexp_replace('hello', '[lo]', '-')	@external: regexp_replace(string:VARCHAR, pattern:VARCHAR, replacement:VARCHAR, options:VARCHAR | ) -> VARCHAR*/
  regexp_replace(string: DVarcharable, pattern: DVarcharable, replacement: DVarcharable, options?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: regexp_split_to_array(string:VARCHAR, separator:VARCHAR, col2:VARCHAR | ) -> VARCHAR[]*/
  regexp_split_to_array(string: DVarcharable, separator: DVarcharable, col2?: DVarcharable | DAnyable): DArrayField<DVarcharField>;
  /**@description: Returns the average of the independent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.	@external: regr_avgx(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_avgx(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Returns the average of the dependent variable for non-null pairs in a group, where x is the independent variable and y is the dependent variable.	@external: regr_avgy(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_avgy(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Returns the number of non-null number pairs in a group.	@example: (SUM(x*y) - SUM(x) * SUM(y) / COUNT(*)) / COUNT(*)	@external: regr_count(y:DOUBLE, x:DOUBLE) -> UINTEGER*/
  regr_count(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Returns the intercept of the univariate linear regression line for non-null pairs in a group.	@example: AVG(y)-REGR_SLOPE(y,x)*AVG(x)	@external: regr_intercept(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_intercept(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Returns the coefficient of determination for non-null pairs in a group.	@external: regr_r2(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_r2(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Returns the slope of the linear regression line for non-null pairs in a group.	@example: COVAR_POP(x,y) / VAR_POP(x)	@external: regr_slope(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_slope(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@example: REGR_COUNT(y, x) * VAR_POP(x)	@external: regr_sxx(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_sxx(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Returns the population covariance of input values	@example: REGR_COUNT(y, x) * COVAR_POP(y, x)	@external: regr_sxy(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_sxy(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@example: REGR_COUNT(y, x) * VAR_POP(y)	@external: regr_syy(y:DOUBLE, x:DOUBLE) -> DOUBLE*/
  regr_syy(y: DNumericable, x: DNumericable): number & _DNumericComp;
  /**@description: Repeats the string count number of times	@example: repeat('A', 5)	@external: repeat(string:ANY[], count:BIGINT) -> ANY[]*/
  repeat(string: DArrayable, count: DNumericable): DArrayField<DAnyField>;
  /**@description: Repeats the string count number of times	@example: repeat('A', 5)	@external: repeat(string:BLOB, count:BIGINT) -> BLOB*/
  repeat(string: DAnyable, count: DNumericable): DAnyComp;
  /**@description: Repeats the string count number of times	@example: repeat('A', 5)	@external: repeat(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  repeat(string: DVarcharable, count: DNumericable): string & _DVarcharComp;
  /**@description: Replaces any occurrences of the source with target in string	@example: replace('hello', 'l', '-')	@external: replace(string:VARCHAR, source:VARCHAR, target:VARCHAR) -> VARCHAR*/
  replace(string: DVarcharable, source: DVarcharable, target: DVarcharable): string & _DVarcharComp;
  /**@description: Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example: reservoir_quantile(A,0.5,1024)	@external: reservoir_quantile(x:FLOAT | DOUBLE | TINYINT | SMALLINT | BIGINT | HUGEINT | INTEGER | DECIMAL, quantile:DOUBLE[], sampleSize: | INTEGER) -> TINYINT[]*/
  reservoir_quantile(x: DNumericable, quantile: DArrayable, sampleSize?: DAnyable | DNumericable): DArrayField<DNumericField>;
  /**@description: Gives the approximate quantile using reservoir sampling, the sample size is optional and uses 8192 as a default size.	@example: reservoir_quantile(A,0.5,1024)	@external: reservoir_quantile(x:BIGINT | DOUBLE | TINYINT | SMALLINT | INTEGER | HUGEINT | FLOAT | DECIMAL, quantile:DOUBLE, sampleSize:INTEGER | ) -> BIGINT*/
  reservoir_quantile(x: DNumericable, quantile: DNumericable, sampleSize?: DNumericable | DAnyable): number & _DNumericComp;
  /**@description: Reverses the string	@example: reverse('hello')	@external: reverse(string:VARCHAR) -> VARCHAR*/
  reverse(string: DVarcharable): string & _DVarcharComp;
  /**@description: Extract the right-most count characters	@example: right('Hello🦆', 3)	@external: right(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right(string: DVarcharable, count: DNumericable): string & _DVarcharComp;
  /**@description: Extract the right-most count grapheme clusters	@example: right_grapheme('🤦🏼‍♂️🤦🏽‍♀️', 1)	@external: right_grapheme(string:VARCHAR, count:BIGINT) -> VARCHAR*/
  right_grapheme(string: DVarcharable, count: DNumericable): string & _DVarcharComp;
  /**@description: Rounds x to s decimal places	@example: round(42.4332, 2)	@external: round(x:DECIMAL, precision: | INTEGER) -> DECIMAL*/
  round(x: DNumericable, precision?: DAnyable | DNumericable): number & _DNumericComp;
  /**@description: Rounds x to s decimal places	@example: round(42.4332, 2)	@external: round(x:DOUBLE, precision:INTEGER | ) -> DOUBLE*/
  round(x: DNumericable, precision?: DNumericable | DAnyable): number & _DNumericComp;
  /**@description: Create an unnamed STRUCT (tuple) containing the argument values.	@example: row(i, i % 4, i / 4)*/
  row(...vargs: DAnyable[]): DStructField;
  /**@description: Pads the string with the character from the right until it has count characters	@example: rpad('hello', 10, '<')	@external: rpad(string:VARCHAR, count:INTEGER, character:VARCHAR) -> VARCHAR*/
  rpad(string: DVarcharable, count: DNumericable, character: DVarcharable): string & _DVarcharComp;
  /**@description: Removes any occurrences of any of the characters from the right side of the string	@example: rtrim('>>>>test<<', '><')	@external: rtrim(string:VARCHAR, characters: | VARCHAR) -> VARCHAR*/
  rtrim(string: DVarcharable, characters?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@description: Extract the second component from a date or timestamp	@example: second(timestamp '2021-08-03 11:59:44.123456')	@external: second(ts:DATE) -> BIGINT*/
  second(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the second component from a date or timestamp	@example: second(timestamp '2021-08-03 11:59:44.123456')	@external: second(ts:INTERVAL) -> BIGINT*/
  second(ts: DAnyable): number & _DNumericComp;
  /**@description: Returns the standard error of the mean	@external: sem(x:DOUBLE) -> DOUBLE*/
  sem(x: DNumericable): number & _DNumericComp;
  /**@description: Sets the nth bit in bitstring to newvalue; the first (leftmost) bit is indexed 0. Returns a new bitstring	@example: set_bit('0110010'::BIT, 2, 0)	@external: set_bit(bitstring:BIT, index:INTEGER, newValue:INTEGER) -> BIT*/
  set_bit(bitstring: DAnyable, index: DNumericable, newValue: DNumericable): DAnyComp;
  /**@description: Sets the seed to be used for the random function	@example: setseed(0.42)	@external: setseed(col0:DOUBLE) -> "NULL"*/
  setseed(col0: DNumericable): DAnyComp;
  /**@description: Returns the SHA1 hash of the value	@example: sha1('hello')	@external: sha1(value:BLOB) -> VARCHAR*/
  sha1(value: DAnyable): string & _DVarcharComp;
  /**@description: Returns the SHA1 hash of the value	@example: sha1('hello')	@external: sha1(value:VARCHAR) -> VARCHAR*/
  sha1(value: DVarcharable): string & _DVarcharComp;
  /**@description: Returns the SHA256 hash of the value	@example: sha256('hello')	@external: sha256(value:BLOB) -> VARCHAR*/
  sha256(value: DAnyable): string & _DVarcharComp;
  /**@description: Returns the SHA256 hash of the value	@example: sha256('hello')	@external: sha256(value:VARCHAR) -> VARCHAR*/
  sha256(value: DVarcharable): string & _DVarcharComp;
  /**@description: Returns the sign of x as -1, 0 or 1	@example: sign(-349)	@external: sign(x:BIGINT) -> TINYINT*/
  sign(x: DNumericable): number & _DNumericComp;
  /**@description: Returns whether the signbit is set or not	@example: signbit(-0.0)	@external: signbit(x:DOUBLE) -> BOOLEAN*/
  signbit(x: DNumericable): DBoolField;
  /**@description: Computes the sin of x	@example: sin(90)	@external: sin(x:DOUBLE) -> DOUBLE*/
  sin(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the hyperbolic sin of x	@example: sinh(1)	@external: sinh(x:DOUBLE) -> DOUBLE*/
  sinh(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the skewness of all input values.	@example: skewness(A)	@external: skewness(x:DOUBLE) -> DOUBLE*/
  skewness(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the square root of x	@example: sqrt(4)	@external: sqrt(x:DOUBLE) -> DOUBLE*/
  sqrt(x: DNumericable): number & _DNumericComp;
  /**@description: Returns true if string begins with search_string	@example: starts_with('abc','a')	@external: starts_with(string:VARCHAR, searchString:VARCHAR) -> BOOLEAN*/
  starts_with(string: DVarcharable, searchString: DVarcharable): DBoolField;
  /**@description: Returns a string with statistics about the expression. Expression can be a column, constant, or SQL expression	@example: stats(5)	@external: stats(expression:ANY) -> VARCHAR*/
  stats(expression: DAnyable): string & _DVarcharComp;
  /**@description: Returns the sample standard deviation	@example: sqrt(var_samp(x))	@external: stddev(x:DOUBLE) -> DOUBLE*/
  stddev(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the population standard deviation.	@example: sqrt(var_pop(x))	@external: stddev_pop(x:DOUBLE) -> DOUBLE*/
  stddev_pop(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the sample standard deviation	@example: sqrt(var_samp(x))	@external: stddev_samp(x:DOUBLE) -> DOUBLE*/
  stddev_samp(x: DNumericable): number & _DNumericComp;
  /**@external: stem(col0:VARCHAR, col1:VARCHAR) -> VARCHAR*/
  stem(col0: DVarcharable, col1: DVarcharable): string & _DVarcharComp;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: str_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  str_split(string: DVarcharable, separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: str_split_regex(string:VARCHAR, separator:VARCHAR, col2: | VARCHAR) -> VARCHAR[]*/
  str_split_regex(string: DVarcharable, separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**@description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@external: strftime(data:DATE, format:VARCHAR) -> VARCHAR*/
  strftime(data: DDateable, format: DVarcharable): string & _DVarcharComp;
  /**@description: Converts a date to a string according to the format string.	@example: strftime(date '1992-01-01', '%a, %-d %B %Y')	@external: strftime(data:VARCHAR, format:TIMESTAMP_NS | DATE | TIMESTAMP) -> VARCHAR*/
  strftime(data: DVarcharable, format: DDateable): string & _DVarcharComp;
  /**@description: Concatenates the column string values with an optional separator.	@example: string_agg(A, '-')	@external: string_agg(str:ANY, arg: | VARCHAR) -> VARCHAR*/
  string_agg(str: DAnyable, arg?: DAnyable | DVarcharable): string & _DVarcharComp;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: string_split(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_split(string: DVarcharable, separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the regex	@example: string_split_regex('hello␣world; 42', ';?␣')	@external: string_split_regex(string:VARCHAR, separator:VARCHAR, col2: | VARCHAR) -> VARCHAR[]*/
  string_split_regex(string: DVarcharable, separator: DVarcharable, col2?: DAnyable | DVarcharable): DArrayField<DVarcharField>;
  /**@description: Splits the string along the separator	@example: string_split('hello-world', '-')	@external: string_to_array(string:VARCHAR, separator:VARCHAR) -> VARCHAR[]*/
  string_to_array(string: DVarcharable, separator: DVarcharable): DArrayField<DVarcharField>;
  /**@description: Strips accents from string.	@example: strip_accents('mühleisen')	@external: strip_accents(string:VARCHAR) -> VARCHAR*/
  strip_accents(string: DVarcharable): string & _DVarcharComp;
  /**@description: Number of bytes in string.	@example: strlen('🦆')	@external: strlen(string:VARCHAR) -> BIGINT*/
  strlen(string: DVarcharable): number & _DNumericComp;
  /**@description: Returns location of first occurrence of needle in haystack, counting from 1. Returns 0 if no match found	@example: instr('test test','es')	@external: strpos(haystack:VARCHAR, needle:VARCHAR) -> BIGINT*/
  strpos(haystack: DVarcharable, needle: DVarcharable): number & _DNumericComp;
  /**@description: Converts the string text to timestamp according to the format string. Throws an error on failure. To return NULL on failure, use try_strptime.	@example: strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@external: strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  strptime(text: DVarcharable, format: DVarcharable | DArrayable): DDateField;
  /**@description: Merge the multiple STRUCTs into a single STRUCT.	@example: struct_concat(struct_pack(i := 4), struct_pack(s := 'string'))*/
  struct_concat(...vargs: DAnyable[]): DStructField;
  /**@description: Extract the named entry from the STRUCT.	@example: struct_extract({'i': 3, 'v2': 3, 'v3': 0}, 'i')	@external: struct_extract(struct:STRUCT, entry:BIGINT | VARCHAR) -> ANY*/
  struct_extract(struct: DStructable, entry: DNumericable | DVarcharable): DAnyComp;
  /**@description: Extract the entry from the STRUCT by position (starts at 1!).	@example: struct_extract_at({'i': 3, 'v2': 3, 'v3': 0}, 2)	@external: struct_extract_at(struct:STRUCT, entry:BIGINT) -> ANY*/
  struct_extract_at(struct: DStructable, entry: DNumericable): DAnyComp;
  /**@description: Adds field(s)/value(s) to an existing STRUCT with the argument values. The entry name(s) will be the bound variable name(s)	@example: struct_insert({'a': 1}, b := 2)*/
  struct_insert(...vargs: DAnyable[]): DStructField;
  /**@description: Create a STRUCT containing the argument values. The entry name will be the bound variable name.	@example: struct_pack(i := 4, s := 'string')*/
  struct_pack(...vargs: DAnyable[]): DStructField;
  /**@description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@external: substr(string:VARCHAR, start:BIGINT, length: | BIGINT) -> VARCHAR*/
  substr(string: DVarcharable, start: DNumericable, length?: DAnyable | DNumericable): string & _DVarcharComp;
  /**@description: Extract substring of length characters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring('Hello', 2, 2)	@external: substring(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring(string: DVarcharable, start: DNumericable, length?: DNumericable | DAnyable): string & _DVarcharComp;
  /**@description: Extract substring of length grapheme clusters starting from character start. Note that a start value of 1 refers to the first character of the string.	@example: substring_grapheme('🦆🤦🏼‍♂️🤦🏽‍♀️🦆', 3, 2)	@external: substring_grapheme(string:VARCHAR, start:BIGINT, length:BIGINT | ) -> VARCHAR*/
  substring_grapheme(string: DVarcharable, start: DNumericable, length?: DNumericable | DAnyable): string & _DVarcharComp;
  /**@external: subtract(col0:BIGINT, col1: | BIGINT) -> BIGINT*/
  subtract(col0: DNumericable, col1?: DAnyable | DNumericable): number & _DNumericComp;
  /**@external: subtract(col0:DATE, col1:INTERVAL | INTEGER) -> TIMESTAMP*/
  subtract(col0: DDateable, col1: DAnyable | DNumericable): DDateField;
  /**@external: subtract(col0:DATE, col1:DATE) -> BIGINT*/
  subtract(col0: DDateable, col1: DDateable): number & _DNumericComp;
  /**@external: subtract(col0:INTERVAL, col1: | INTERVAL) -> INTERVAL*/
  subtract(col0: DAnyable, col1?: DAnyable): DAnyComp;
  /**@external: subtract(col0:TIME WITH TIME ZONE, col1:INTERVAL) -> TIME WITH TIME ZONE*/
  subtract(col0: DDateable, col1: DAnyable): DDateField;
  /**@external: subtract(col0:TIMESTAMP, col1:TIMESTAMP) -> INTERVAL*/
  subtract(col0: DDateable, col1: DDateable): DAnyComp;
  /**@external: subtract(col0:UBIGINT, col1:UBIGINT | ) -> UBIGINT*/
  subtract(col0: DNumericable, col1?: DNumericable | DAnyable): number & _DNumericComp;
  /**@external: suffix(col0:VARCHAR, col1:VARCHAR) -> BOOLEAN*/
  suffix(col0: DVarcharable, col1: DVarcharable): DBoolField;
  /**@description: Calculates the sum value for all tuples in arg.	@example: sum(A)	@external: sum(arg:DOUBLE | DECIMAL | BOOLEAN | SMALLINT | INTEGER | BIGINT | HUGEINT) -> DOUBLE*/
  sum(arg: DNumericable | DBoolable): number & _DNumericComp;
  /**@description: Internal only. Calculates the sum value for all tuples in arg without overflow checks.	@example: sum_no_overflow(A)	@external: sum_no_overflow(arg:INTEGER | DECIMAL | BIGINT) -> HUGEINT*/
  sum_no_overflow(arg: DNumericable): number & _DNumericComp;
  /**@description: Calculates the sum using a more accurate floating point summation (Kahan Sum).	@example: kahan_sum(A)	@external: sumkahan(arg:DOUBLE) -> DOUBLE*/
  sumkahan(arg: DNumericable): number & _DNumericComp;
  /**@description: Computes the tan of x	@example: tan(90)	@external: tan(x:DOUBLE) -> DOUBLE*/
  tan(x: DNumericable): number & _DNumericComp;
  /**@description: Computes the hyperbolic tan of x	@example: tanh(1)	@external: tanh(x:DOUBLE) -> DOUBLE*/
  tanh(x: DNumericable): number & _DNumericComp;
  /**@external: text(col0:DOUBLE, col1:VARCHAR) -> VARCHAR*/
  text(col0: DNumericable, col1: DVarcharable): string & _DVarcharComp;
  /**@description: Truncate TIMESTAMPTZ by the specified interval bucket_width. Buckets are aligned relative to origin TIMESTAMPTZ. The origin defaults to 2000-01-03 00:00:00+00 for buckets that do not include a month or year interval, and to 2000-01-01 00:00:00+00 for month and year buckets	@example: time_bucket(INTERVAL '2 weeks', TIMESTAMP '1992-04-20 15:26:00-07', TIMESTAMP '1992-04-01 00:00:00-07')	@external: time_bucket(bucketWidth:INTERVAL, timestamp:TIMESTAMP | TIMESTAMP WITH TIME ZONE | DATE, origin: | INTERVAL | TIMESTAMP | VARCHAR | TIMESTAMP WITH TIME ZONE | DATE) -> TIMESTAMP WITH TIME ZONE*/
  time_bucket(bucketWidth: DAnyable, timestamp: DDateable, origin?: DAnyable | DDateable | DVarcharable): DDateField;
  /**@description: Converts a TIME WITH TIME ZONE to an integer sort key	@example: timetz_byte_comparable('18:18:16.21-07:00'::TIME_TZ)	@external: timetz_byte_comparable(timeTz:TIME WITH TIME ZONE) -> UBIGINT*/
  timetz_byte_comparable(timeTz: DDateable): number & _DNumericComp;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:DATE) -> BIGINT*/
  timezone(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:INTERVAL, col1:TIME WITH TIME ZONE) -> TIME WITH TIME ZONE*/
  timezone(ts: DAnyable, col1: DDateable): DDateField;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:INTERVAL) -> BIGINT*/
  timezone(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the timezone component from a date or timestamp	@example: timezone(timestamp '2021-08-03 11:59:44.123456')	@external: timezone(ts:VARCHAR, col1:TIME WITH TIME ZONE | TIMESTAMP | TIMESTAMP WITH TIME ZONE) -> TIME WITH TIME ZONE*/
  timezone(ts: DVarcharable, col1: DDateable): DDateField;
  /**@description: Extract the timezone_hour component from a date or timestamp	@example: timezone_hour(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_hour(ts:DATE) -> BIGINT*/
  timezone_hour(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the timezone_hour component from a date or timestamp	@example: timezone_hour(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_hour(ts:INTERVAL) -> BIGINT*/
  timezone_hour(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the timezone_minute component from a date or timestamp	@example: timezone_minute(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_minute(ts:DATE) -> BIGINT*/
  timezone_minute(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the timezone_minute component from a date or timestamp	@example: timezone_minute(timestamp '2021-08-03 11:59:44.123456')	@external: timezone_minute(ts:INTERVAL) -> BIGINT*/
  timezone_minute(ts: DAnyable): number & _DNumericComp;
  /**@description: Converts a value to a string in the given base radix, optionally padding with leading zeros to the minimum length	@example: to_base(42, 16)	@external: to_base(number:BIGINT, radix:INTEGER, minLength: | INTEGER) -> VARCHAR*/
  to_base(number: DNumericable, radix: DNumericable, minLength?: DAnyable | DNumericable): string & _DVarcharComp;
  /**@description: Convert a blob to a base64 encoded string	@example: base64('A'::blob)	@external: to_base64(blob:BLOB) -> VARCHAR*/
  to_base64(blob: DAnyable): string & _DVarcharComp;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:BIGINT) -> VARCHAR*/
  to_binary(value: DNumericable): string & _DVarcharComp;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:VARCHAR) -> VARCHAR*/
  to_binary(value: DVarcharable): string & _DVarcharComp;
  /**@description: Converts the value to binary representation	@example: bin(42)	@external: to_binary(value:VARINT) -> VARCHAR*/
  to_binary(value: DAnyable): string & _DVarcharComp;
  /**@description: Construct a century interval	@example: to_centuries(5)	@external: to_centuries(integer:INTEGER) -> INTERVAL*/
  to_centuries(integer: DNumericable): DAnyComp;
  /**@description: Construct a day interval	@example: to_days(5)	@external: to_days(integer:INTEGER) -> INTERVAL*/
  to_days(integer: DNumericable): DAnyComp;
  /**@description: Construct a decade interval	@example: to_decades(5)	@external: to_decades(integer:INTEGER) -> INTERVAL*/
  to_decades(integer: DNumericable): DAnyComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:BIGINT) -> VARCHAR*/
  to_hex(value: DNumericable): string & _DVarcharComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:BLOB) -> VARCHAR*/
  to_hex(value: DAnyable): string & _DVarcharComp;
  /**@description: Converts the value to hexadecimal representation	@example: hex(42)	@external: to_hex(value:VARCHAR) -> VARCHAR*/
  to_hex(value: DVarcharable): string & _DVarcharComp;
  /**@description: Construct a hour interval	@example: to_hours(5)	@external: to_hours(integer:BIGINT) -> INTERVAL*/
  to_hours(integer: DNumericable): DAnyComp;
  /**@description: Construct a microsecond interval	@example: to_microseconds(5)	@external: to_microseconds(integer:BIGINT) -> INTERVAL*/
  to_microseconds(integer: DNumericable): DAnyComp;
  /**@description: Construct a millenium interval	@example: to_millennia(1)	@external: to_millennia(integer:INTEGER) -> INTERVAL*/
  to_millennia(integer: DNumericable): DAnyComp;
  /**@description: Construct a millisecond interval	@example: to_milliseconds(5.5)	@external: to_milliseconds(double:DOUBLE) -> INTERVAL*/
  to_milliseconds(double: DNumericable): DAnyComp;
  /**@description: Construct a minute interval	@example: to_minutes(5)	@external: to_minutes(integer:BIGINT) -> INTERVAL*/
  to_minutes(integer: DNumericable): DAnyComp;
  /**@description: Construct a month interval	@example: to_months(5)	@external: to_months(integer:INTEGER) -> INTERVAL*/
  to_months(integer: DNumericable): DAnyComp;
  /**@description: Construct a quarter interval	@example: to_quarters(5)	@external: to_quarters(integer:INTEGER) -> INTERVAL*/
  to_quarters(integer: DNumericable): DAnyComp;
  /**@description: Construct a second interval	@example: to_seconds(5.5)	@external: to_seconds(double:DOUBLE) -> INTERVAL*/
  to_seconds(double: DNumericable): DAnyComp;
  /**@description: Converts secs since epoch to a timestamp with time zone	@example: to_timestamp(1284352323.5)	@external: to_timestamp(sec:DOUBLE) -> TIMESTAMP WITH TIME ZONE*/
  to_timestamp(sec: DNumericable): DDateField;
  /**@description: Construct a week interval	@example: to_weeks(5)	@external: to_weeks(integer:INTEGER) -> INTERVAL*/
  to_weeks(integer: DNumericable): DAnyComp;
  /**@description: Construct a year interval	@example: to_years(5)	@external: to_years(integer:INTEGER) -> INTERVAL*/
  to_years(integer: DNumericable): DAnyComp;
  /**@description: Returns the current timestamp	@example: get_current_timestamp()*/
  transaction_timestamp(): DDateField;
  /**@description: Replaces each character in string that matches a character in the from set with the corresponding character in the to set. If from is longer than to, occurrences of the extra characters in from are deleted	@example: translate('12345', '143', 'ax')	@external: translate(string:VARCHAR, from:VARCHAR, to:VARCHAR) -> VARCHAR*/
  translate(string: DVarcharable, from: DVarcharable, to: DVarcharable): string & _DVarcharComp;
  /**@description: Removes any occurrences of any of the characters from either side of the string	@example: trim('>>>>test<<', '><')	@external: trim(string:VARCHAR, characters:VARCHAR | ) -> VARCHAR*/
  trim(string: DVarcharable, characters?: DVarcharable | DAnyable): string & _DVarcharComp;
  /**@description: Truncates the number	@example: trunc(17.4)	@external: trunc(x:BIGINT) -> BIGINT*/
  trunc(x: DNumericable): number & _DNumericComp;
  /**@description: Converts the string text to timestamp according to the format string. Returns NULL on failure.	@example: try_strptime('Wed, 1 January 1992 - 08:38:40 PM', '%a, %-d %B %Y - %I:%M:%S %p')	@external: try_strptime(text:VARCHAR, format:VARCHAR | VARCHAR[]) -> TIMESTAMP*/
  try_strptime(text: DVarcharable, format: DVarcharable | DArrayable): DDateField;
  /**@description: Returns the current transaction’s ID (a BIGINT). It will assign a new one if the current transaction does not have one already	@example: txid_current()*/
  txid_current(): number & _DNumericComp;
  /**@description: Returns the name of the data type of the result of the expression	@example: typeof('abc')	@external: typeof(expression:ANY) -> VARCHAR*/
  typeof(expression: DAnyable): string & _DVarcharComp;
  /**@description: Convert string to upper case.	@example: upper('Hello')	@external: ucase(string:VARCHAR) -> VARCHAR*/
  ucase(string: DVarcharable): string & _DVarcharComp;
  /**@description: Converts a value from binary representation to a blob	@example: unbin('0110')	@external: unbin(value:VARCHAR) -> BLOB*/
  unbin(value: DVarcharable): DAnyComp;
  /**@description: Converts a value from hexadecimal representation to a blob	@example: unhex('2A')	@external: unhex(value:VARCHAR) -> BLOB*/
  unhex(value: DVarcharable): DAnyComp;
  /**@description: Returns the unicode codepoint of the first character of the string	@example: unicode('ü')	@external: unicode(str:VARCHAR) -> INTEGER*/
  unicode(str: DVarcharable): number & _DNumericComp;
  /**@description: Extract the value with the named tags from the union. NULL if the tag is not currently selected	@example: union_extract(s, 'k')	@external: union_extract(union:UNION, tag:VARCHAR) -> ANY*/
  union_extract(union: DAnyable, tag: DVarcharable): DAnyComp;
  /**@description: Retrieve the currently selected tag of the union as an ENUM	@example: union_tag(union_value(k := 'foo'))	@external: union_tag(union:UNION) -> ANY*/
  union_tag(union: DAnyable): DAnyComp;
  /**@description: Create a single member UNION containing the argument value. The tag of the value will be the bound variable name	@example: union_value(k := 'hello')*/
  union_value(...vargs: DAnyable[]): DAnyComp;
  /**@description: Identical to list_value, but generated as part of unpivot for better error messages	@example: unpivot_list(4, 5, 6)*/
  unpivot_list(...vargs: DAnyable[]): DArrayField;
  /**@description: Convert string to upper case.	@example: upper('Hello')	@external: upper(string:VARCHAR) -> VARCHAR*/
  upper(string: DVarcharable): string & _DVarcharComp;
  /**@description: Unescapes the URL encoded input.	@example: url_decode('this%20string%20is%2BFencoded')	@external: url_decode(input:VARCHAR) -> VARCHAR*/
  url_decode(input: DVarcharable): string & _DVarcharComp;
  /**@description: Escapes the input string by encoding it so that it can be included in a URL query parameter.	@example: url_encode('this string has/ special+ characters>')	@external: url_encode(input:VARCHAR) -> VARCHAR*/
  url_encode(input: DVarcharable): string & _DVarcharComp;
  /**@description: Returns a random UUID similar to this: eeccb8c5-9943-b2bb-bb5e-222f4e14b687	@example: uuid()*/
  uuid(): DAnyComp;
  /**@description: Returns the population variance.	@external: var_pop(x:DOUBLE) -> DOUBLE*/
  var_pop(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the sample variance of all input values.	@example: (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)	@external: var_samp(x:DOUBLE) -> DOUBLE*/
  var_samp(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the sample variance of all input values.	@example: (SUM(x^2) - SUM(x)^2 / COUNT(x)) / (COUNT(x) - 1)	@external: variance(x:DOUBLE) -> DOUBLE*/
  variance(x: DNumericable): number & _DNumericComp;
  /**@description: Returns the VectorType of a given column	@example: vector_type(col)	@external: vector_type(col:ANY) -> VARCHAR*/
  vector_type(col: DAnyable): string & _DVarcharComp;
  /**@description: Returns the currently active version of DuckDB in this format: v0.3.2		@example: version()*/
  version(): string & _DVarcharComp;
  /**@description: Extract the week component from a date or timestamp	@example: week(timestamp '2021-08-03 11:59:44.123456')	@external: week(ts:DATE) -> BIGINT*/
  week(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the week component from a date or timestamp	@example: week(timestamp '2021-08-03 11:59:44.123456')	@external: week(ts:INTERVAL) -> BIGINT*/
  week(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the weekday component from a date or timestamp	@example: weekday(timestamp '2021-08-03 11:59:44.123456')	@external: weekday(ts:DATE) -> BIGINT*/
  weekday(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the weekday component from a date or timestamp	@example: weekday(timestamp '2021-08-03 11:59:44.123456')	@external: weekday(ts:INTERVAL) -> BIGINT*/
  weekday(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the weekofyear component from a date or timestamp	@example: weekofyear(timestamp '2021-08-03 11:59:44.123456')	@external: weekofyear(ts:DATE) -> BIGINT*/
  weekofyear(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the weekofyear component from a date or timestamp	@example: weekofyear(timestamp '2021-08-03 11:59:44.123456')	@external: weekofyear(ts:INTERVAL) -> BIGINT*/
  weekofyear(ts: DAnyable): number & _DNumericComp;
  /**@description: Writes to the logger	@example: write_log('Hello')	@external: write_log(string:VARCHAR) -> ANY*/
  write_log(string: DVarcharable, ...vargs: DAnyable[]): DAnyComp;
  /**@description: Bitwise XOR	@example: xor(17, 5)	@external: xor(left:BIGINT, right:BIGINT) -> BIGINT*/
  xor(left: DNumericable, right: DNumericable): number & _DNumericComp;
  /**@description: Bitwise XOR	@example: xor(17, 5)	@external: xor(left:BIT, right:BIT) -> BIT*/
  xor(left: DAnyable, right: DAnyable): DAnyComp;
  /**@description: Extract the year component from a date or timestamp	@example: year(timestamp '2021-08-03 11:59:44.123456')	@external: year(ts:DATE) -> BIGINT*/
  year(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the year component from a date or timestamp	@example: year(timestamp '2021-08-03 11:59:44.123456')	@external: year(ts:INTERVAL) -> BIGINT*/
  year(ts: DAnyable): number & _DNumericComp;
  /**@description: Extract the yearweek component from a date or timestamp	@example: yearweek(timestamp '2021-08-03 11:59:44.123456')	@external: yearweek(ts:DATE) -> BIGINT*/
  yearweek(ts: DDateable): number & _DNumericComp;
  /**@description: Extract the yearweek component from a date or timestamp	@example: yearweek(timestamp '2021-08-03 11:59:44.123456')	@external: yearweek(ts:INTERVAL) -> BIGINT*/
  yearweek(ts: DAnyable): number & _DNumericComp;
}
