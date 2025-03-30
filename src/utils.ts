import { isString, omit } from "es-toolkit";
import { all, createEmphasize } from 'emphasize'
import { initSync } from "@fmt/sql-fmt";
import { DNumericField, DVarcharField, DArrayField, DStructField, DJsonField, DBoolField, DMapField, DOtherField } from './.buck/types';
/**
 * Operation tracking for SQL generation
 * Represents a single operation in the chain
 */
export type Operation = {
  /** The field name this operation is applied to */
  field?: string;
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
  const args = operation.args.map(arg => isString(arg) ? wrap(arg, "'") : arg.toString()).join(', ');

  // Recursively build the chain
  if (operation.chain) {
    return `${operationToSql(operation.chain)}.${operation.method}(${args})`;
  }

  // For global functions (no field name)
  if (!operation.field) {
    return `${operation.method}(${args})`;
  }

  return `${operation.field}.${operation.method}(${args})`;
}

export abstract class BaseFieldImpl<T> {
  /** Tracks the operation chain for this field */
  protected ops: Operation;

  /**
   * Create a new field
   * @param fieldName The name of the field in the database
   */
  constructor(fieldName = '') {
    this.ops = { field: fieldName, method: '', args: [] };
  }

  toString(): string {
    return operationToSql(this.ops);
  }

  /**
   * Set the operation chain for this field
   * @param ops The operation to set
   * @returns This field instance for chaining
   */
  withOperation({ chain, ...ops }: Partial<Operation> = {}): T {
    this.ops = ops;
    if (chain?.method) {
      this.ops.chain = chain
    } else {
      this.ops.field = chain?.field
    }
    // if (ops.method) {
    // } else {
    //   this.ops = {...omit(ops, ['chain'])};
    // }
    return this as unknown as T;
  }
}

export const wrap = (value: string, charA: string, charB = charA): string => {
  if (value[0] === charA && value[value.length - 1] === charB) {
    return value;
  }
  return `${charA}${value}${charB}`;
}

export const TypeProps = {
  'DNumeric': { able: 'DNumericable', field: 'DNumericField', rawType: 'number' },
  'DVarchar': { able: 'DVarcharable', field: 'DVarcharField', rawType: 'string' },
  'DArray': { able: 'DArrayable', field: 'DArrayField', rawType: 'any[]' },
  'DStruct': { able: 'DStructable', field: 'DStructField', rawType: 'Record<string,any>' },
  'DJson': { able: 'DJsonable', field: 'DJsonField', rawType: 'Record<string,any>' },
  'DBool': { able: 'DBoolable', field: 'DBoolField', rawType: 'boolean' },
  'DMap': { able: 'DMapable', field: 'DMapField', rawType: 'Map<string,any>' },
  'DOther': { able: 'DOtherable', field: 'DOtherField', rawType: 'any' },
  'DAny': { able: 'DAnyable', field: 'DAnyField', rawType: 'any' },
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


export type NativeFieldTypes<R> = {
  [K in keyof R]: R[K] extends DVarcharField ? string :
  R[K] extends DNumericField ? number :
  R[K] extends DBoolField ? boolean :
  R[K] extends DArrayField ? any[] :
  R[K] extends DOtherField ? any :
  R[K]
}

export type TableSchema<Columns> = {
  [K in keyof Columns]: Columns[K] extends keyof TypeMapping ? TypeMapping[Columns[K]] : bigint;
};

export const formatSource = (source: string) => {
  return source?.match(/\.(parquet|csv|jsonl?|tsv)(.(gz|zst|xz))?$/) ?
    wrap(source, "'") : source
}