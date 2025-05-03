// import { all, createEmphasize } from 'emphasize';
// import { sInferred, DNumericField, DVarcharField, DArrayField, DDateField, DStructField, DJsonField, DBoolField, DMapField, DOtherField, sComptype, DAnyComp, DAnyField } from './.buck/types';
import * as t from '../.buck/types'

export const wrap = (value: string, charA: string, charB = charA): string => {
  if (value[0] === charA && value[value.length - 1] === charB) {
    return value;
  }
  return `${charA}${value}${charB}`;
}

export type DRawField = t.DAnyField
export type DRawComp = t.DAnyComp

export type DField = t.DVarcharField | t.DNumericField | t.DOtherField | t.DArrayField | t.DDateField | t.DStructField | t.DJsonField | t.DBoolField |
  DRawField


export const formatSource = (source: string) => {
  return source?.match(/\.(parquet|csv|jsonl?|tsv)(\W(gz|zst|xz))?$/) ?
    wrap(source, "'") : source
}


export const Ω = (...values: (string | number)[]) => {
  const rtn = {}
  for (let i in values) {
    rtn[values[i]] = +i + 1
  }
  return rtn
}


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
    ])
)

export const LiteralTypes = LitteralTypesMap.keys()

export interface DuckDBClient {
  query<T = any>(sql: string, params?: Record<string, any>): Promise<T[]>;
  run(sql: string): Promise<any>;
  load(...extensions: string[]): any;
  dump(sql: string): void
  // close(): Promise<void>;
}

export type DFindType<
  F extends readonly { type_name: string; type_category: any }[], // Changed constraint
  T extends F[number]["type_name"] // Adjusted T constraint based on F being an array
> = Extract<
  F[number], // Access elements of the array F
  { type_name: T }
>["type_category"];


export const keyBy = <T extends object, K extends keyof T>(array: T[], key: K): Record<string, T> => {
  return array.reduce((acc, obj) => {
    const keyValue = obj[key];
    acc[keyValue as unknown as string] = obj;
    return acc;
  }, {} as Record<string, T>);
}

