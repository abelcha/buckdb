import { all, createEmphasize } from 'emphasize';
import { sInferred, sAnti, DNumericField, DVarcharField, DArrayField, DStructField, DJsonField, DBoolField, DMapField, DOtherField } from './.buck/types';

export const wrap = (value: string, charA: string, charB = charA): string => {
  if (value[0] === charA && value[value.length - 1] === charB) {
    return value;
  }
  return `${charA}${value}${charB}`;
}

export const TypeProps = {
  'DNumeric': { id: 'numeric', able: 'DNumericable', field: 'DNumericField', rawType: 'number', inferredTo: 'number', anti: 'AntiNumber' },
  'DVarchar': { id: 'varchar', able: 'DVarcharable', field: 'DVarcharField', rawType: 'string', inferredTo: 'string', anti: 'AntiString' },
  'DArray': { id: 'array', able: 'DArrayable', field: 'DArrayField', rawType: 'any[]', inferredTo: 'any[]', anti: 'Array' },
  'DStruct': { id: 'struct', able: 'DStructable', field: 'DStructField', rawType: 'Record<string,any>', inferredTo: 'Record<string,any>', anti: 'AntiObject' },
  'DJson': { id: 'json', able: 'DJsonable', field: 'DJsonField', rawType: 'Record<string,any>', inferredTo: 'Record<string,any>', anti: 'AntiObject' },
  'DBool': { id: 'bool', able: 'DBoolable', field: 'DBoolField', rawType: 'boolean', inferredTo: 'boolean', anti: 'AntiBoolean' },
  'DMap': { id: 'map', able: 'DMapable', field: 'DMapField', rawType: 'Map<string,any>', inferredTo: 'Map<string,any>', anti: 'AntiMap' },
  'DOther': { id: 'other', able: 'DOtherable', field: 'DOtherField', rawType: 'any', inferredTo: 'any' },
  'DAny': { id: 'any', able: 'DAnyable', field: 'DAnyField', rawType: 'any', inferredTo: 'any' },
}

export const mapTypes = (type: string) => {
  if (type === 'ANY') {
    return 'DAny';
  }
  if (!type) {
    return 'DOther';
  }
  if (type?.match(/\b((U)?(BIG|HUGE|TINY|SMALL)?INT(EGER)?|DOUBLE|DECIMAL|FLOAT)\b/)) {
    return 'DNumeric';
  }
  if (type?.match(/^(VARCHAR|CHAR|TEXT)$/)) {
    return 'DVarchar';
  }
  if (type.endsWith('[]') || type === 'LIST' || type === 'ARRAY') {
    return 'DArray';
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
  return 'DOther';
}




const emphasize = createEmphasize(all)

export const prettifyPrintSQL = (sql: string, pretty = false) => {
  return !pretty ? sql : emphasize.highlightAuto(sql, { subset: ['sql'] }).value
}


// console.log(emphasize.listLanguages().filter(e => e.match(/SQL/img)))
export type DField = DVarcharField | DNumericField | DOtherField | DArrayField | DStructField | DJsonField | DBoolField | DMapField
export type TypeMapping = {
  DVarchar: DVarcharField;
  DNumeric: DNumericField;
  DArray: DArrayField;
  DStruct: DStructField;
  DJson: DJsonField;
  DBool: DBoolField;
  DMap: DMapField;
  DOther: DOtherField;
};

export type GetInferredType<T> = T extends { [sInferred]: infer U } ? U : never;
export type GetAntiType<T> = T extends { [sInferred]: infer V } ? V | bigint : never;


export type MapAntiType<T> = T extends object
  ? { [K in keyof T]: GetAntiType<T[K]> } & T
  : never;
// Main generic type transformer
export type MapInferredType<T> = T extends boolean[]
  ? { [K in keyof T]: GetInferredType<T[K]> }
  : T extends object
  ? { [K in keyof T]: GetInferredType<T[K]> }
  : never;


type xxdx = MapAntiType<{ toto: DNumericField, test: DVarcharField }>

function lol(e: xxdx) {
  e.test.toString()
}
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
  return source?.match(/\.(parquet|csv|jsonl?|tsv)(.(gz|zst|xz))?$/) ?
    wrap(source, "'") : source
}


export const Ω = (...values: (string | number)[]) => {
  const rtn = {}
  for (let i in values) {
    rtn[values[i]] = +i + 1
  }
  return rtn
}