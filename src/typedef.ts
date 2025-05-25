import * as t from '../.buck/types'
export interface DNumericType {
  man: 'number & CNumeric'
  comptype: 'number'
  id: 'numeric'
  able: 'DNumericable'
  field: 'DNumericField'
  rawType: 'number'
  inferredTo: 'number'
  anti: 'AntiNumber'
  fieldSuffix: '& number'
}

export interface DVarcharType {
  man: 'string & CVarchar'
  id: 'varchar'
  able: 'DVarcharable'
  field: 'DVarcharField'
  rawType: 'string'
  inferredTo: 'string'
  anti: 'AntiString'
}

export interface DArrayType {
  id: 'array'
  able: 'DArrayable'
  field: 'DArrayField'
  rawType: 'any[]'
  inferredTo: 'any[]'
  anti: 'Array'
  generic: { main: '<T = any>'; inferred: 'T[]' }
}

export interface DStructType {
  id: 'struct'
  able: 'DStructable'
  field: 'DStructField'
  rawType: 'Record<string,any>'
  inferredTo: 'Record<string,any>'
  anti: 'AntiObject'
  generic: { main: '<T = {}>'; inferred: 'T' }
}

export interface DJsonType {
  id: 'json'
  able: 'DJsonable'
  field: 'DJsonField'
  rawType: 'Record<string,any>'
  inferredTo: 'Record<string,any>'
  anti: 'AntiObject'
  generic: { main: '<T = {}>'; inferred: 'T' }
}

export interface DBoolType {
  id: 'bool'
  able: 'DBoolable'
  field: 'DBoolField'
  rawType: 'boolean'
  inferredTo: 'boolean'
  anti: 'AntiBoolean'
}

export interface DBlobType {
  id: 'blob'
  able: 'DBlobable'
  field: 'DBlobField'
  rawType: 'Blob'
  inferredTo: 'string'
  anti: 'AntiBlob'
}

export interface DDateType {
  id: 'date'
  able: 'DDateable'
  field: 'DDateField'
  rawType: 'Date'
  inferredTo: 'Date'
  anti: 'AntiDate'
}

export interface DMapType {
  id: 'map'
  able: 'DMapable'
  field: 'DMapField'
  rawType: 'Map<string,any>'
  inferredTo: 'Map<string,any>'
  anti: 'AntiMap'
}

export interface DOtherType {
  id: 'other'
  able: 'DOtherable'
  field: 'DOtherField'
  rawType: 'any'
  inferredTo: 'any'
}

export interface DAnyType {
  man: 'Partial<CAny>'
  id: 'any'
  able: 'DAnyable'
  field: 'DAnyField'
  rawType: 'any'
  inferredTo: 'any'
}

export const DNumeric: DNumericType = {
  man: 'number & CNumeric',
  comptype: 'number',
  id: 'numeric',
  able: 'DNumericable',
  field: 'DNumericField',
  rawType: 'number',
  inferredTo: 'number',
  anti: 'AntiNumber',
  fieldSuffix: '& number',
}

export const DVarchar: DVarcharType = {
  man: 'string & CVarchar',
  id: 'varchar',
  able: 'DVarcharable',
  field: 'DVarcharField',
  rawType: 'string',
  inferredTo: 'string',
  anti: 'AntiString',
}

export const DArray: DArrayType = { id: 'array', able: 'DArrayable', field: 'DArrayField', rawType: 'any[]', inferredTo: 'any[]', anti: 'Array', generic: { main: '<T = any>', inferred: 'T[]' } }
export const DStruct: DStructType = { id: 'struct', able: 'DStructable', field: 'DStructField', rawType: 'Record<string,any>', inferredTo: 'Record<string,any>', anti: 'AntiObject', generic: { main: '<T = {}>', inferred: 'T' } }
export const DJson: DJsonType = { id: 'json', able: 'DJsonable', field: 'DJsonField', rawType: 'Record<string,any>', inferredTo: 'Record<string,any>', anti: 'AntiObject', generic: { main: '<T = {}>', inferred: 'T' } }
export const DBool: DBoolType = { id: 'bool', able: 'DBoolable', field: 'DBoolField', rawType: 'boolean', inferredTo: 'boolean', anti: 'AntiBoolean' }
export const DBlob: DBlobType = { id: 'blob', able: 'DBlobable', field: 'DBlobField', rawType: 'Blob', inferredTo: 'string', anti: 'AntiBlob' }
export const DDate: DDateType = { id: 'date', able: 'DDateable', field: 'DDateField', rawType: 'Date', inferredTo: 'Date', anti: 'AntiDate' }
export const DMap: DMapType = { id: 'map', able: 'DMapable', field: 'DMapField', rawType: 'Map<string,any>', inferredTo: 'Map<string,any>', anti: 'AntiMap' }
export const DOther: DOtherType = { id: 'other', able: 'DOtherable', field: 'DOtherField', rawType: 'any', inferredTo: 'any' }
export const DAny: DAnyType = { man: 'Partial<CAny>', id: 'any', able: 'DAnyable', field: 'DAnyField', rawType: 'any', inferredTo: 'any' }

export const TypeProps = {
  DNumeric,
  DVarchar,
  DArray,
  DStruct,
  DJson,
  DBool,
  DBlob,
  DDate,
  DMap,
  DOther,
  DAny,
}

export const mapTypes = (type: string) => {
  if (!type) return 'DOther'
  const t = type.toUpperCase()
  if (t.match(/^(ANY)$/)) return 'DAny'
  if (t.match(/(\[\]$|^LIST$|^ARRAY$|\w+\[\w+\])/)) return 'DArray'
  if (t.match(/\b((U)?(BIG|HUGE|TINY|SMALL)?INT(EGER)?|DOUBLE|DECIMAL|FLOAT)\b/)) return 'DNumeric'
  if (t.match(/^(VARCHAR|CHAR|TEXT)$/)) return 'DVarchar'
  if (t.match(/^STRUCT/)) return 'DStruct'
  if (t.match(/^JSON/)) return 'DJson'
  if (t.match(/^BOOLEAN/)) return 'DBool'
  if (t.match(/^MAP/)) return 'DMap'
  if (t.match(/^BLOB/)) return 'DBlob'
  if (t.match(/^(DATE|TIME)[\w\s]*/)) return 'DDate'
  return 'DOther'
}

export const mapTypesProps = (type: string, details = false) => {
  const mtype = mapTypes(type)
  if (mtype === 'DArray' && details === true) {
    const [_, subtype] = type.match(/^([A-Z]+)\[\]$/) || []
    if (subtype) {
      const s = mapTypesProps(subtype)
      const rtn = {
        ...DArray,
        rawType: s.rawType + '[]',
        inferredTo: !s.inferredTo ? 'any[]' : s.inferredTo + '[]',
        field: `DArrayField<${mapTypes(subtype)}Field>`,
      }
      // console.log({ subtype, rtn })
      return rtn
    }
    return DArray
  }
  switch (mtype) {
    case 'DNumeric':
      return DNumeric
    case 'DVarchar':
      return DVarchar
    case 'DArray':
      return DArray
    case 'DStruct':
      return DStruct
    case 'DJson':
      return DJson
    case 'DBool':
      return DBool
    // case 'DBlob': return DBlob;
    case 'DDate':
      return DDate
    // case 'DMap': return DMap;
    // case 'DOther': return DOther;
    // case 'DAny': return DAny;
    default:
      return DAny
  }
}

export const NativeMap = {
  BOOLEAN: 'DBool',
  NUMERIC: 'DNumeric',
  STRING: 'DVarchar',
  DATETIME: 'DDate',
}
export const NativeInverseMap = Object.fromEntries(Object.entries(NativeMap).map(([k, v]) => [v, k]))

// Simpler assertion helpers
const basePatternMatcher = {
  keyword: '',
  joinWith: ', ',
  return_type: 'BOOLEAN',
  params: { val: 'VARCHAR', matcher: 'ANY' } as Record<string, string>,
}
type TPatternMatcher = typeof basePatternMatcher

export const PatternMatchers: Record<string, TPatternMatcher> = {
  'Like': { ...basePatternMatcher, keyword: 'LIKE' },
  // 'NotLike': { ...basePatternMatcher, keyword: 'NOT LIKE' },
  'Ilike': { ...basePatternMatcher, keyword: 'ILIKE' },
  // 'NotIlike': { ...basePatternMatcher, keyword: 'NOT ILIKE' },
  'SimilarTo': { ...basePatternMatcher, keyword: 'SIMILAR TO' },
  // 'NotSimilarTo': { ...basePatternMatcher, keyword: 'NOT SIMILAR TO' },
  'Glob': { ...basePatternMatcher, keyword: 'GLOB' },
  // 'NotGlob': { ...basePatternMatcher, keyword: 'NOT GLOB' },
  'IsNull': { ...basePatternMatcher, keyword: 'IS NULL', params: { val: 'ANY' } },
  // 'IsNot': { ...basePatternMatcher, keyword: 'IS NOT', params: { val: 'ANY', matcher: 'ANY' } },
  'Between': { ...basePatternMatcher, keyword: 'BETWEEN', params: { val: 'INT', col1: 'INT', col2: 'INT' }, joinWith: ' AND ' },
  'In': { ...basePatternMatcher, keyword: 'IN', joinWith: ', ' },
  'NotBetween': { ...basePatternMatcher, keyword: 'NOT BETWEEN', params: { val: 'INT', col1: 'INT', col2: 'INT' }, joinWith: ' AND ' },
}
export const DefaultLiteralTypes = ['Bit', 'Integer', 'Timestamp', 'Tinyint', 'Smallint', 'Json', 'Struct', 'Time', 'Timestamp_ms', 'Timestamp_s', 'Float', 'Map', 'Union', 'Blob', 'Date', 'Enum', 'Hugeint', 'Boolean', 'Varchar', 'Uuid', 'Ubigint', 'Bigint', 'Interval', 'Uinteger', 'Usmallint', 'Utinyint', 'Varint', 'Decimal', 'Double', 'Null', 'Timestamp_ns', 'Uhugeint']

export const LitteralTypesMap = new Map(
  DefaultLiteralTypes.map(e => [e, e.toUpperCase()] as [string, string])
    .concat([
      ['List', ''],
      ['Array', ''],
      ['Struct', ''],
    ]),
)

export const LiteralTypes = LitteralTypesMap.keys()

export const PolyfillNumberMapping = {
  // 'toExponential': 'toExponential',
  // 'toFixed': e => `round(${e})::varchar`,
  // 'toLocaleString': 'toLocaleString',
  'toPrecision': 'round',
  // 'toString': 'toString',
  'valueOf': 'add',
}

export const PolyfillStringMapping = {
  'at': 'array_extract',
  'charAt': 'array_extract',
  // 'charCodeAt': body => `array_extract(${body}).ascii()`,
  // 'codePointAt': body => `array_extract(${body}).ord()`,
  // 'concat ':
  'endsWith': 'ends_with',
  'includes': 'contains',
  'startsWith': 'starts_with',
  'indexOf': 'strpos',
  // 'lastIndexOf': null,
  // 'isWellFormed': null,
  // 'toWellFormed': null,
  // 'localeCompare': null,
  'toLocaleLowerCase': 'lower',
  'toLocaleUpperCase': 'upper',
  'match': 'regexp_matches',
  'matchAll': 'regexp_matches',
  'search': 'position',
  'padEnd': 'rpad',
  'padStart': 'lpad',
  'repeat': 'repeat',
  'replace': 'replace',
  'replaceAll': 'replace',
  'slice': 'array_slice',
  'substring': 'substring',
  'split': 'string_split',
  'normalize': 'nfc_normalize',
  'toLowerCase': 'lower',
  'toUpperCase': 'upper',
  'toString': 'format',
  'valueOf': 'format',
  'trim': 'trim',
  'trimEnd': 'rtrim',
  'trimStart': 'ltrim',
}
export const PolyfillArrayMapping = {
}

export const UnmethodMapping = {
  'map': e => `list_transform(${e})`,
  'reduce': e => `array_reduce(${e})`,
  'filter': e => `list_filter(${e})`,
  'charCodeAt': e => `array_extract(${e}).ascii()`,
  'codePointAt': e => `array_extract(${e}).ord()`,
} as Record<string, (body: any) => string>



export const PolyfillMapping = Object.assign(PolyfillNumberMapping, PolyfillStringMapping, PolyfillArrayMapping)
