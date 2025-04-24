// import { all, createEmphasize } from 'emphasize';
// import { sInferred, DNumericField, DVarcharField, DArrayField, DDateField, DStructField, DJsonField, DBoolField, DMapField, DOtherField, sComptype, DAnyComp, DAnyField } from './.buck/types';
import * as t from '../.buck/types'


export type DuckdbCon = {
  cmdQueue: CommandQueue;
  run: (sql: string) => Promise<any>;
  query: (sql: string, opts?: Record<string, any>) => Promise<any[]>;
  upsertSchema: (model: string, schema: Record<string, any>) => Promise<void>;
  settings?: (s: Partial<t.DSettings>) => DuckdbCon;
  loadExtensions: (...extensions: string[]) => DuckdbCon;
}

export class CommandQueue {
  constructor() {
    this.queue = []
  }
  queue: string[]
  pushSettings(settings: Partial<t.DSettings> = {}) {
    // const q = 
    this.queue.push(...Object.entries(settings).map(([key, value]) => `SET ${key} = '${value}';`))
    return this;
  }
  pushExtensions(...extensions: string[]) {
    this.queue.push(...extensions.map(e => `INSTALL '${e}';LOAD '${e}';`))
    return this
  }
  flush() {
    const s = this.queue.join('\n')
    this.queue = []
    return s
  }

}



export const wrap = (value: string, charA: string, charB = charA): string => {
  if (value[0] === charA && value[value.length - 1] === charB) {
    return value;
  }
  return `${charA}${value}${charB}`;
}

export const TypeProps = {
  'DNumeric': {
    man: 'Partial<number> & Partial<CNumeric>',
    comptype: 'number', id: 'numeric', able: 'DNumericable', field: 'DNumericField', rawType: 'number', inferredTo: 'number', anti: 'AntiNumber'
  },
  'DVarchar': {
    man: 'Partial<CVarchar>',
    id: 'varchar', able: 'DVarcharable', field: 'DVarcharField', rawType: 'string', inferredTo: 'string', anti: 'AntiString'
  },
  'DArray': { id: 'array', able: 'DArrayable', field: 'DArrayField', rawType: 'any[]', inferredTo: 'any[]', anti: 'Array' },
  'DStruct': { id: 'struct', able: 'DStructable', field: 'DStructField', rawType: 'Record<string,any>', inferredTo: 'Record<string,any>', anti: 'AntiObject' },
  'DJson': { id: 'json', able: 'DJsonable', field: 'DJsonField', rawType: 'Record<string,any>', inferredTo: 'Record<string,any>', anti: 'AntiObject' },
  'DBool': { id: 'bool', able: 'DBoolable', field: 'DBoolField', rawType: 'boolean', inferredTo: 'boolean', anti: 'AntiBoolean' },
  'DBlob': { id: 'blob', able: 'DBlobable', field: 'DBlobField', rawType: 'Blob', inferredTo: 'string', anti: 'AntiBlob' },
  'DDate': { id: 'date', able: 'DDateable', field: 'DDateField', rawType: 'Date', inferredTo: 'Date', anti: 'AntiDate' },
  'DMap': { id: 'map', able: 'DMapable', field: 'DMapField', rawType: 'Map<string,any>', inferredTo: 'Map<string,any>', anti: 'AntiMap' },
  'DOther': { id: 'other', able: 'DOtherable', field: 'DOtherField', rawType: 'any', inferredTo: 'any' },
  'DAny': { man: 'Partial<CAny>', id: 'any', able: 'DAnyable', field: 'DAnyField', rawType: 'any', inferredTo: 'any' },
}
export type DeriveName<Path extends string> =
  Path extends `${infer _}/${infer Rest}`
  ? DeriveName<Rest>
  : Path extends `${infer Name}.${string}`
  ? StripSpecialChars<Name>
  : StripSpecialChars<Path>;

type StripSpecialChars<S extends string> =
  S extends `${infer First}${infer Rest}`
  ? First extends AlphaNumeric
  ? `${First}${StripSpecialChars<Rest>}`
  : StripSpecialChars<Rest>
  : '';

type AlphaNumeric =
  | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j'
  | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't'
  | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'
  | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T'
  | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export const deriveName = <T extends string>(value: T): DeriveName<T> => {
  const result = value.split('/').pop()?.split('.').shift() || value;
  return result.replace(/[^a-zA-Z0-9]/g, '') as DeriveName<T>;
}
export const mapTypes = (type: string) => {
  if (type === 'ANY') {
    return 'DAny';
  }
  if (!type) {
    return 'DOther';
  }
  if (type.endsWith('[]') || type === 'LIST' || type === 'ARRAY' || type.match(/\w+\[\w+\]/)) {
    return 'DArray';
  }
  if (type?.match(/\b((U)?(BIG|HUGE|TINY|SMALL)?INT(EGER)?|DOUBLE|DECIMAL|FLOAT)\b/)) {
    return 'DNumeric';
  }
  if (type?.match(/^(VARCHAR|CHAR|TEXT)$/)) {
    return 'DVarchar';
  }
  if (type.startsWith('STRUCT')) {
    return 'DStruct';
  }
  if (type.startsWith('JSON')) {
    return 'DJson';
  }
  if (type.startsWith('BOOLEAN')) {
    return 'DBool';
  }
  if (type.startsWith('MAP')) {
    return 'DMap';
  }
  if (type.startsWith('BLOB')) {
    return 'DBlob';
  }
  if (type.match(/^(DATE|TIME)[\w\s]*/)) {
    return 'DDate'
  }
  return 'DOther';
}




// const emphasize = createEmphasize(all)

// export const prettifyPrintSQL = (sql: string, pretty = false) => {
//   return !pretty ? sql : emphasize.highlightAuto(sql, { subset: ['sql'] }).value
// }


// console.log(emphasize.listLanguages().filter(e => e.match(/SQL/img)))

export type DRawField = t.DAnyField
export type DRawComp = t.DAnyComp


export type DField = t.DVarcharField | t.DNumericField | t.DOtherField | t.DArrayField | t.DDateField | t.DStructField | t.DJsonField | t.DBoolField | t.DMapField |
  DRawField
export type TypeMapping = {
  DVarchar: t.DVarcharField;
  DNumeric: t.DNumericField;
  DArray: t.DArrayField;
  DStruct: t.DStructField;
  DDate: t.DDateField;
  DJson: t.DJsonField;
  DBool: t.DBoolField;
  DMap: t.DMapField;
  DOther: t.DOtherField;
};

export type GetInferredType<T> = T extends { [t.sInferred]: infer U } ? U : never;
// export type GetAntiType<T> = T extends { [t.sComptype]: infer V } ? V & T : never;
export type GetCompType<T> = T extends { [t.sComptype]: infer V } ? V : T;
// export type GetXType<T> = T extends DNumericField ? Partial<number> & Partial<DNumericField> & Partial<T> : Partial<T>;


export type MapReturnString<T, V> = T extends object
  ? {
    [K in keyof T]: T[K] extends (...args: any[]) => infer R
    ? (...args: Parameters<T[K]>) => V
    : T[K]; // Recursively transform non-method properties
  }
  : T; // Base case: leave primitives unchanged
export type MapCompType<T> = T extends object
  ? { [K in keyof T]: GetCompType<T[K]> }
  : T;

export type MapDeepCompType<T> = T extends object
  ? { [K in keyof T]: GetCompType<T[K]> extends object ? MapDeepCompType<GetCompType<T[K]>> : GetCompType<T[K]> }
  : T;




// export type MapAntiType<T> = T extends object
//   ? { [K in keyof T]: GetXType<T[K]> }
//   : T;
// Main generic type transformer
export type MapInferredType<T> = T extends object
  ? { [K in keyof T]: GetInferredType<T[K]> extends object ? MapInferredType<T[K]> : GetInferredType<T[K]> }
  : T;



// type xxdx = MapAntiType<{ toto: DNumericField, test: DVarcharField }>

// function lol(e: xxdx) {
//   e.test.toString()
// }
// export type NativeFieldTypes<R> = {
//   [K in keyof R]: R[K] extends DVarcharField ? string :
//   R[K] extends DNumericField ? number :
//   R[K] extends DBoolField ? boolean :
//   R[K] extends DArrayField ? any[] :
//   R[K] extends DOtherField ? any :
//   R[K] extends (infer U)[] ? NativeFieldTypes<U>[] :
//   R[K] extends object ? { [P in keyof R[K]]: NativeFieldTypes<R[K][P]> } :
//   R[K]
// }

export type TableSchema<Columns> = {
  [K in keyof Columns]: Columns[K] extends keyof TypeMapping ? TypeMapping[Columns[K]] : bigint;
};

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

export type IsNull<T> = [T] extends [null] ? true : false;

export type IfNull<T, TypeIfNull = true, TypeIfNotNull = false> = (
  IsNull<T> extends true ? TypeIfNull : TypeIfNotNull
);
export type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

export function assertType<_T extends true>() { }
export function assertNotType<_T extends false>() { }


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
  'Is': { ...basePatternMatcher, keyword: 'IS', params: { val: 'ANY', matcher: 'ANY' } },
  'IsNot': { ...basePatternMatcher, keyword: 'IS NOT', params: { val: 'ANY', matcher: 'ANY' } },
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