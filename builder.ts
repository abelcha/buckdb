/**
 * TypeScript implementation for DuckDB query building with autocomplete
 * 
 * This module provides a type-safe way to build DuckDB SQL queries using TypeScript.
 * It allows for autocomplete on table fields and SQL functions, and transforms
 * method chains into SQL query strings.
 */
import { DuckDBInstance } from '@duckdb/node-api';
import init, { format } from '@fmt/sql-fmt';
import { createEmphasize, all } from 'emphasize'
import { DuckDBFunctionsImpl, NumericFieldImpl, StringFieldImpl, type DuckDBFunctions, type NumericField, type StringField } from './generated-typed';
import { wrap } from './utils';
const emphasize = createEmphasize(all)

await init();

/**
 * Schema for the people table
 * This is a static schema for demonstration purposes
 */
interface PeopleSchema {
  name: StringField;
  age: NumericField;
}


// Create a singleton instance of DuckDBFunctions
const duckdbFunctions = new DuckDBFunctionsImpl();


/**
 * Query builder class
 * Builds a SQL query using a fluent API
 */
export class QueryBuilder<T, R = Record<string, any>> {
  /** The path to the table (file path for Parquet files) */
  private tablePath: string;
  /** Array of selected expressions */
  private selections: string[] = [];
  /** Array of WHERE conditions */
  private conditions: string[] = [];
  /** Schema proxy for the table */
  private schema: T;
  /** Result type for the query */
  private resultType: R = {} as R;

  /**
   * Create a new query builder
   * @param tablePath Path to the table (file path for Parquet files)
   * @param schema Schema proxy for the table
   */
  constructor(tablePath: string, schema: T) {
    this.tablePath = tablePath;
    this.schema = schema;
  }

  /**
   * Add a selection to the query
   * @param selector Function that selects a field and applies operations
   * @returns This query builder for chaining
   */
  select<K extends keyof T>(selector: (schema: T, D?: DuckDBFunctions) => any): QueryBuilder<T> {
    const result = selector(this.schema, duckdbFunctions);
    this.selections.push(result.toString());
    return this;
  }

  /**
   * Add multiple selections to the query with aliases
   * @param selector Function that returns an object with field names as keys and field expressions as values
   * @returns This query builder for chaining
   */
  selectMany<S extends Record<string, any>>(
    selector: (schema: T, D?: DuckDBFunctions) => S
  ): QueryBuilder<T, S> {
    const result = selector(this.schema, duckdbFunctions);

    for (const [alias, value] of Object.entries(result)) {
      // console.log({ value, alias }, )
      const val = value instanceof QueryBuilder ?
        wrap(value.toSql(), '(', ')')
        : (value).toString()
      this.selections.push(`${val} AS ${alias}`);
    }

    // Update the result type to match the selector's return type
    this.resultType = result as unknown as R;

    return this as unknown as QueryBuilder<T, S>;
  }

  /**
   * Get the selections as an array of SQL expressions
   * @returns Array of SQL expressions
   */
  getSelections(): string[] {
    return this.selections;
  }

  /**
   * Add a WHERE condition to the query
   * @param fieldSelector Function that selects a field
   * @param operator Comparison operator (e.g., '>', '<', '=', '!=', 'IN', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL')
   * @param value Value to compare against (can be omitted for NULL checks)
   * @returns This query builder for chaining
   */
  where<K extends keyof T>(
    fieldSelector: (schema: T) => any,
    operator: string,
    value?: any
  ): QueryBuilder<T> {
    const field = fieldSelector(this.schema);
    let condition: string;

    // Handle different operators
    if (operator.toUpperCase() === 'IS NULL' || operator.toUpperCase() === 'IS NOT NULL') {
      // NULL checks don't need a value
      condition = `${field.toString()} ${operator}`;
    } else if (operator.toUpperCase() === 'IN') {
      // IN operator expects an array
      if (Array.isArray(value)) {
        const formattedValues = value.map(v => {
          if (typeof v === 'string') return `'${v}'`;
          return v;
        }).join(', ');
        condition = `${field.toString()} IN (${formattedValues})`;
      } else {
        throw new Error('IN operator requires an array value');
      }
    } else if (operator.toUpperCase() === 'BETWEEN') {
      // BETWEEN operator expects an array with two values
      if (Array.isArray(value) && value.length === 2) {
        const [start, end] = value;
        const formattedStart = typeof start === 'string' ? `'${start}'` : start;
        const formattedEnd = typeof end === 'string' ? `'${end}'` : end;
        condition = `${field.toString()} BETWEEN ${formattedStart} AND ${formattedEnd}`;
      } else {
        throw new Error('BETWEEN operator requires an array with two values');
      }
    } else {
      // Standard operators
      let formattedValue = value;

      // Format the value based on its type
      if (typeof value === 'string') {
        formattedValue = `'${value}'`;
      } else if (value && typeof value === 'object' && 'toString' in value) {
        formattedValue = value.toString();
      }

      condition = `${field.toString()} ${operator} ${formattedValue}`;
    }

    this.conditions.push(condition);
    return this;
  }


  /**
   * Generate the final SQL query
   * @returns SQL query string
   */
  toSql(): string {
    let sql = `SELECT ${this.asSelector()} FROM ${this.asFrom()}`;

    // Add WHERE clause if there are conditions
    if (this.conditions.length > 0) {
      sql += ` WHERE ${this.conditions.join(' AND ')}`;
    }

    return sql;
  }
  asFrom() {
    return this.tablePath.match(/\.(parquet|csv|jsonl?|tsv)(.(gz|zst|xz))?$/) ?
      wrap(this.tablePath, "'") : this.tablePath
  }
  asSelector(): string {
    return this.selections.join(', ');
  }

  /**
   * Execute the query and return the results
   * @returns Promise with the query results
   */
  async execute(): Promise<R[]> {
    // Create a DuckDB instance
    const instance = await DuckDBInstance.create();

    // Connect to the instance
    const connection = await instance.connect();

    // Run the query
    const result = await connection.runAndReadAll(this.toSql());

    // Get the results as JSON objects
    const rows = result.getRowObjectsJson() as R[];

    return rows;
  }
}

/**
 * Create a schema proxy for a table
 * This proxy provides autocomplete for table fields
 * 
 * @param schema Record mapping field names to their types
 * @returns Proxy object with field implementations
 */
function createSchemaProxy<T>(schema: Record<keyof T, string>): T {
  const proxy = {} as T;

  for (const key in schema) {
    const fieldType = schema[key];

    if (fieldType === 'varchar') {
      (proxy as any)[key] = new StringFieldImpl(key as string);
    } else if (fieldType === 'int') {
      (proxy as any)[key] = new NumericFieldImpl(key as string);
    }
    // Add more types as needed
  }

  return proxy;
}

/**
 * Start a query on a table
 * This is the main entry point for the query builder
 * 
 * @param tablePath Path to the table (file path for Parquet files)
 * @returns Query builder for the table
 */
export function from(tablePath: string) {

  // For now, we're using a static schema as specified
  const peopleSchema = {
    name: 'varchar',
    age: 'int'
  };

  const schemaProxy = createSchemaProxy<PeopleSchema>(peopleSchema);
  return new QueryBuilder<PeopleSchema>(tablePath, schemaProxy);
}