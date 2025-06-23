
export const DuckDBTypeId = {
  INVALID: 0,
  BOOLEAN: 1,
  TINYINT: 2,
  SMALLINT: 3,
  INTEGER: 4,
  BIGINT: 5,
  UTINYINT: 6,
  USMALLINT: 7,
  UINTEGER: 8,
  UBIGINT: 9,
  FLOAT: 10,
  DOUBLE: 11,
  TIMESTAMP: 12,
  DATE: 13,
  TIME: 14,
  INTERVAL: 15,
  HUGEINT: 16,
  UHUGEINT: 32,
  VARCHAR: 17,
  BLOB: 18,
  DECIMAL: 19,
  TIMESTAMP_S: 20,
  TIMESTAMP_MS: 21,
  TIMESTAMP_NS: 22,
  ENUM: 23,
  LIST: 24,
  STRUCT: 25,
  MAP: 26,
  ARRAY: 33,
  UUID: 27,
  UNION: 28,
  BIT: 29,
  TIME_TZ: 30,
  TIMESTAMP_TZ: 31,
  ANY: 34,
  VARINT: 35,
  SQLNULL: 36
}

export const DNumeric = {
  comptype: 'number',
  id: 'numeric',
  able: 'DNumericable',
  field: 'DNumericField',
  rawType: 'number',
}

export const DVarchar = {
  id: 'varchar',
  able: 'DVarcharable',
  field: 'DVarcharField',
  rawType: 'string',
}

export const DArray = {
  id: 'array',
  able: 'DArrayable',
  field: 'DArrayField',
  rawType: 'any[]',
}
export const DStruct = {
  id: 'struct',
  able: 'DStructable',
  field: 'DStructField',
  rawType: 'Record<string,any>',
}
export const DJson = {
  id: 'json',
  able: 'DJsonable',
  field: 'DJsonField',
  rawType: 'Record<string,any>',
}
export const DBool = {
  id: 'bool',
  able: 'DBoolable',
  field: 'DBoolField',
  rawType: 'boolean',

}
export const DBlob = {
  id: 'blob',
  able: 'DBlobable',
  field: 'DBlobField',
  rawType: 'Blob',

}
export const DDate = {
  id: 'date',
  able: 'DDateable',
  field: 'DDateField',
  rawType: 'Date',

}
export const DMap = {
  id: 'map',
  able: 'DMapable',
  field: 'DMapField',
  rawType: 'Map<string,any>',

}
export const DOther = {
  id: 'other',
  able: 'DOtherable',
  field: 'DOtherField',
  rawType: 'any',
}
export const DAny = {
  id: 'any',
  able: 'DAnyable',
  field: 'DAnyField',
  rawType: 'any',
}

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

export const DuckDBTypeIdMap = {
  [DuckDBTypeId.INVALID]: 'DAny',
  [DuckDBTypeId.BOOLEAN]: 'DBool',
  [DuckDBTypeId.TINYINT]: 'DNumeric',
  [DuckDBTypeId.SMALLINT]: 'DNumeric',
  [DuckDBTypeId.INTEGER]: 'DNumeric',
  [DuckDBTypeId.BIGINT]: 'DNumeric',
  [DuckDBTypeId.UTINYINT]: 'DNumeric',
  [DuckDBTypeId.USMALLINT]: 'DNumeric',
  [DuckDBTypeId.UINTEGER]: 'DNumeric',
  [DuckDBTypeId.UBIGINT]: 'DNumeric',
  [DuckDBTypeId.FLOAT]: 'DNumeric',
  [DuckDBTypeId.DOUBLE]: 'DNumeric',
  [DuckDBTypeId.TIMESTAMP]: 'DDate',
  [DuckDBTypeId.DATE]: 'DDate',
  [DuckDBTypeId.TIME]: 'DDate',
  [DuckDBTypeId.INTERVAL]: 'DDate',
  [DuckDBTypeId.HUGEINT]: 'DNumeric',
  [DuckDBTypeId.UHUGEINT]: 'DNumeric',
  [DuckDBTypeId.VARCHAR]: 'DVarchar',
  [DuckDBTypeId.BLOB]: 'DBlob',
  [DuckDBTypeId.DECIMAL]: 'DNumeric',
  [DuckDBTypeId.TIMESTAMP_S]: 'DDate',
  [DuckDBTypeId.TIMESTAMP_MS]: 'DDate',
  [DuckDBTypeId.TIMESTAMP_NS]: 'DDate',
  [DuckDBTypeId.ENUM]: 'DVarchar',
  [DuckDBTypeId.LIST]: 'DArray',
  [DuckDBTypeId.STRUCT]: 'DStruct',
  [DuckDBTypeId.MAP]: 'DMap',
  [DuckDBTypeId.ARRAY]: 'DArray',
  [DuckDBTypeId.UUID]: 'DVarchar',
  [DuckDBTypeId.UNION]: 'DAny',
  [DuckDBTypeId.BIT]: 'DNumeric',
  [DuckDBTypeId.TIME_TZ]: 'DDate',
  [DuckDBTypeId.TIMESTAMP_TZ]: 'DDate',
  [DuckDBTypeId.ANY]: 'DAny',
  [DuckDBTypeId.VARINT]: 'DNumeric',
  [DuckDBTypeId.SQLNULL]: 'DAny'
}

export const mapTypes = (type: string) => {
  if (!type) return 'DAny'
  const t = type.toUpperCase()
  if (t.match(/^(ANY)$/)) return 'DAny'
  if (t.match(/(\[\]$|^LIST$|^ARRAY$|\w+\[\w+\])/)) return 'DArray'
  if (t.match(/\b((U)?(BIG|HUGE|TINY|SMALL)?INT(EGER)?|DOUBLE|DECIMAL|FLOAT)\b/)) return 'DNumeric'
  if (t.match(/^(VARCHAR|CHAR|TEXT)$/)) return 'DVarchar'
  if (t.match(/^STRUCT/)) return 'DStruct'
  if (t.match(/^JSON/)) return 'DJson'
  if (t.match(/^BOOLEAN/)) return 'DBool'
  if (t.match(/^MAP/)) return 'DMap'
  // if (t.match(/^BLOB/)) return 'DBlob'
  if (t.match(/^(DATE|TIME)[\w\s]*/)) return 'DDate'
  return 'DAny'
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
  'map': `list_transform`,
  'reduce': `list_reduce`,
  'join': `array_to_string`,
  'filter': `list_filter`,
}


export const PolyfillMapping = Object.assign(PolyfillNumberMapping, PolyfillStringMapping, PolyfillArrayMapping)


export const AggregateFunctions = 'entropy mode first arg_max list listagg sum bit_or countif min_by min mean max_by max bit_xor corr regr_r2 mad argmax last avg bit_and var_pop bool_or count sem median arg_min stddev product favg fsum argmin'.split(' ')






export type DAction = 'select' | 'update' | 'upsert' | 'create'
export type DCondition = { condition: string; operator?: 'OR' | 'AND' }
export type DSelectee = { field: string; as?: string | number; raw?: string }
export type DDirection = 'ASC' | 'DESC' | 'ASC NULLS FIRST' | 'DESC NULLS FIRST' | 'ASC NULLS LAST' | 'DESC NULLS LAST'
export type DSetOpType = 'UNION' | 'UNION ALL' | 'UNION BY NAME' | 'UNION ALL BY NAME' | 'EXCEPT' | 'EXCEPT ALL' | 'INTERSECT' | 'INTERSECT ALL'
export type DSetOp = { type: DSetOpType, value: string }
export type DOrder = { field: string; direction?: DDirection }
export type DDatasource = { catalog: string; uri: string; alias?: string; using?: string, joinOn?: string; join?: 'JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'CROSS JOIN' | 'NATURAL JOIN' | 'INNER JOIN' }
export type DCopyTo = { uri: string; options?: Record<string, any> }
export type DCte = { query: { toState: () => DState, toSQL: () => string } & Record<string, any>; name?: string }
export type Parseable = string | Function
export const dstate = {
  copyTo: [] as DCopyTo[],
  context: {} as Record<string, any>,
  datasources: [] as DDatasource[],
  selected: [] as DSelectee[],
  conditions: [] as DCondition[],
  having: [] as DCondition[],
  groupBy: [] as string[],
  distinctOn: [] as string[],
  limit: null as number | null,
  sample: null as number | `${number}%` | null,
  offset: null as number | null,
  orderBy: [] as DOrder[],
  keyBy: null as string | null,
  countBy: null as string | null,
  agg: null as string | null,
  action: 'select' as DAction,
  updated: [] as DSelectee[],
  ctes: [] as DCte[],
  setops: [] as DSetOp[],
}

export type DState = typeof dstate

export const triggerMethods = ['exec', 'execute', 'show', 'describe']
export const RessourceOps = ['from', 'leftJoin', 'join', 'rightJoin', 'naturalJoin', 'innerJoin']
export const InstanceOps = ['Buck', 'settings', 'loadExtensions']

const compressExtensions = ['.gz', '.zst', '.brotli', '.lz4', '.lzma', '.zlib', '']
const fileExtensions = ['parquet', 'csv', 'json', 'orc', 'avro', 'tsv', 'json', 'ndjson', 'jsonl']
const dbExtension = ['sqlite', 'sqlite3', 'duckdb', 'ddb', 'db']

export const ReadableFileRegexp = new RegExp(`\\.(${[...fileExtensions, ...dbExtension].join('|')})(${compressExtensions.join('|')})$`)
export const DirectoryRegexp = /^[^\.]+$/