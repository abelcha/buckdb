import { isString } from "es-toolkit";
import { wrap } from "./utils";

type Numericable = number | NumericField
type Stringable = string | StringField
type Whateverable = any | WhateverField


export interface WhateverField {
    /*WhateverInterface*/

    /*WhateverInterface*/
    /** Convert the operation chain to a SQL string */
    toString(): string;
}


/**
 * Interface for string field operations
 * Defines methods that can be called on string fields in DuckDB
 */
export interface StringField {
    /*StringInterface*/
    /** Convert string to lowercase */
    lower(): StringField;
    /** Convert string to uppercase */
    upper(): StringField;
    /** Calculate Levenshtein distance between this string and another */
    levenshtein(other: Stringable): NumericField;
    /*StringInterface*/
    // Add more string operations as needed
    /** Convert the operation chain to a SQL string */
    toString(): string;
}

/**
 * Interface for numeric field operations
 * Defines methods that can be called on numeric fields in DuckDB
 */
export interface NumericField {
    /*NumericInterface*/
    /** Add a value to this number */
    add(value: Numericable): NumericField;
    /** Subtract a value from this number */
    subtract(value: Numericable): NumericField;
    /** Multiply this number by a value */
    multiply(value: Numericable): NumericField;
    /** Divide this number by a value */
    divide(value: Numericable): NumericField;
    /** Convert number to hexadecimal string */
    to_hex(): StringField;
    /*NumericInterface*/
    // Add more numeric operations as needed
    /** Convert the operation chain to a SQL string */
    toString(): string;
}

/**
 * Interface for global DuckDB functions
 * These functions can be used directly without chaining to a field
 */
export interface DuckDBFunctions {
    /*globalInterface*/
    /** Convert string to lowercase */
    lower(value: Stringable): StringField;
    /** Convert string to uppercase */
    upper(value: Stringable): StringField;
    /** Calculate Levenshtein distance between two strings */
    levenshtein(value1: Stringable, value2: Stringable): NumericField;
    /** Convert number to hexadecimal string */
    to_hex(value: Numericable): StringField;
    // Add more global functions as needed
    /*globalInterface*/
}

type ReadCsvOptions = {
    union_by_name: boolean;
    compression: 'zstd' | 'gzip' | 'lzma';
    ignore_errors: boolean;
};

/**
 * Interface for global DuckDB functions
 * These functions can be used directly without chaining to a field
 */
export interface DDBTableFunctions {
    /** Convert string to lowercase */
    read_csv(path: string, opts?: ReadCsvOptions): StringField;
    duckdb_databases(): StringField;
    range(start: number, end?: number): StringField;
}


/**
 * Implementation of string operations
 * Provides concrete implementations of the StringField interface
 */
export class WhateverFieldImpl implements WhateverField {
    /** Tracks the operation chain for this field */
    private ops: Operation;

    /**
     * Create a new string field
     * @param fieldName The name of the field in the database
     */
    constructor(fieldName: string) {
        this.ops = { field: fieldName, method: '', args: [] };
    }
    /*WhateverFieldImpl*/

    /*WhateverFieldImpl*/
    toString(): string {
        return operationToSql(this.ops);
    }

    /**
     * Set the operation chain for this field
     * @param ops The operation to set
     * @returns This field instance for chaining
     */
    withOperation(ops: Operation): WhateverFieldImpl {
        this.ops = ops;
        return this;
    }
}


/**
 * Implementation of string operations
 * Provides concrete implementations of the StringField interface
 */
export class StringFieldImpl implements StringField {
    /** Tracks the operation chain for this field */
    private ops: Operation;

    /**
     * Create a new string field
     * @param fieldName The name of the field in the database
     */
    constructor(fieldName: string) {
        this.ops = { field: fieldName, method: '', args: [] };
    }
    /*StringFieldImpl*/
    lower(): StringField {
        return new StringFieldImpl('').withOperation({
            field: this.ops.field,
            method: 'lower',
            args: [],
            chain: this.ops.method ? this.ops : undefined
        });
    }

    upper(): StringField {
        return new StringFieldImpl('').withOperation({
            field: this.ops.field,
            method: 'upper',
            args: [],
            chain: this.ops.method ? this.ops : undefined
        });
    }

    levenshtein(other: Stringable): NumericField {
        return new NumericFieldImpl('').withOperation({
            field: this.ops.field,
            method: 'levenshtein',
            args: [other],
            chain: this.ops.method ? this.ops : undefined
        });
    }
    /*StringFieldImpl*/
    toString(): string {
        return operationToSql(this.ops);
    }

    /**
     * Set the operation chain for this field
     * @param ops The operation to set
     * @returns This field instance for chaining
     */
    withOperation(ops: Operation): StringFieldImpl {
        this.ops = ops;
        return this;
    }
}

/**
 * Implementation of numeric operations
 * Provides concrete implementations of the NumericField interface
 */
export class NumericFieldImpl implements NumericField {
    /** Tracks the operation chain for this field */
    private ops: Operation;

    /**
     * Create a new numeric field
     * @param fieldName The name of the field in the database
     */
    constructor(fieldName: string) {
        this.ops = { field: fieldName, method: '', args: [] };
    }
    /*NumericFieldImpl*/
    add(value: number): NumericField {
        return new NumericFieldImpl('').withOperation({
            field: this.ops.field,
            method: 'add',
            args: [value],
            chain: this.ops.method ? this.ops : undefined
        });
    }

    subtract(value: number): NumericField {
        return new NumericFieldImpl('').withOperation({
            field: this.ops.field,
            method: 'subtract',
            args: [value],
            chain: this.ops.method ? this.ops : undefined
        });
    }

    multiply(value: number): NumericField {
        return new NumericFieldImpl('').withOperation({
            field: this.ops.field,
            method: 'multiply',
            args: [value],
            chain: this.ops.method ? this.ops : undefined
        });
    }

    divide(value: number): NumericField {
        return new NumericFieldImpl('').withOperation({
            field: this.ops.field,
            method: 'divide',
            args: [value],
            chain: this.ops.method ? this.ops : undefined
        });
    }

    to_hex(): StringField {
        return new StringFieldImpl('').withOperation({
            field: this.ops.field,
            method: 'to_hex',
            args: [],
            chain: this.ops.method ? this.ops : undefined
        });
    }
    /*NumericFieldImpl*/

    toString(): string {
        return operationToSql(this.ops);
    }

    /**
     * Set the operation chain for this field
     * @param ops The operation to set
     * @returns This field instance for chaining
     */
    withOperation(ops: Operation): NumericFieldImpl {
        this.ops = ops;
        return this;
    }
}

const valueWrap = (value: Stringable): string => {
    return isString(value) ? wrap(value, "'") : value.toString();
}

/**
 * Implementation of global DuckDB functions
 * Provides concrete implementations of the DuckDBFunctions interface
 */
export class DuckDBFunctionsImpl implements DuckDBFunctions {
    /*DuckDBFunctionsImpl*/
    lower(value: Stringable): StringField {
        return new StringFieldImpl('').withOperation({
            field: '',
            method: 'lower',
            args: [valueWrap(value)]
        });
    }

    upper(value: Stringable): StringField {
        return new StringFieldImpl('').withOperation({
            field: '',
            method: 'upper',
            args: [(value)]
        });
    }

    levenshtein(value1: Stringable, value2: Stringable): NumericField {
        return new NumericFieldImpl('').withOperation({
            field: '',
            method: 'levenshtein',
            args: [value1, value2]
        });
    }

    to_hex(value: Numericable): StringField {
        return new StringFieldImpl('').withOperation({
            field: '',
            method: 'to_hex',
            args: [value]
        });
    }
    /*DuckDBFunctionsImpl*/
}


/**
 * Operation tracking for SQL generation
 * Represents a single operation in the chain
 */
type Operation = {
    /** The field name this operation is applied to */
    field: string;
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
    if (operation.field === '') {
        return `${operation.method}(${args})`;
    }

    return `${operation.field}.${operation.method}(${args})`;
}