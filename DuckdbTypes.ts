import { isString } from "es-toolkit";
import { wrap } from "./utils";

/**
 * Interface for string field operations
 * Defines methods that can be called on string fields in DuckDB
 */
export interface StringField {
    /** Convert string to lowercase */
    lower(): StringField;
    /** Convert string to uppercase */
    upper(): StringField;
    /** Calculate Levenshtein distance between this string and another */
    levenshtein_distance(other: string | StringField): NumericField;
    // Add more string operations as needed
    /** Convert the operation chain to a SQL string */
    toString(): string;
}

/**
 * Interface for numeric field operations
 * Defines methods that can be called on numeric fields in DuckDB
 */
export interface NumericField {
    /** Add a value to this number */
    add(value: number): NumericField;
    /** Subtract a value from this number */
    subtract(value: number): NumericField;
    /** Multiply this number by a value */
    multiply(value: number): NumericField;
    /** Divide this number by a value */
    divide(value: number): NumericField;
    /** Convert number to hexadecimal string */
    to_hex(): StringField;
    // Add more numeric operations as needed
    /** Convert the operation chain to a SQL string */
    toString(): string;
}

/**
 * Interface for global DuckDB functions
 * These functions can be used directly without chaining to a field
 */
export interface DuckDBFunctions {
    /** Convert string to lowercase */
    lower(value: string | StringField): StringField;
    /** Convert string to uppercase */
    upper(value: string | StringField): StringField;
    /** Calculate Levenshtein distance between two strings */
    levenshtein_distance(value1: string | StringField, value2: string | StringField): NumericField;
    /** Convert number to hexadecimal string */
    to_hex(value: number | NumericField): StringField;
    // Add more global functions as needed
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

    levenshtein_distance(other: string | StringField): NumericField {
        return new NumericFieldImpl('').withOperation({
            field: this.ops.field,
            method: 'levenshtein_distance',
            args: [other],
            chain: this.ops.method ? this.ops : undefined
        });
    }

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

const valueWrap = (value: string | StringField): string => {
    return isString(value) ? wrap(value, "'") : value.toString();
}

/**
 * Implementation of global DuckDB functions
 * Provides concrete implementations of the DuckDBFunctions interface
 */
export class DuckDBFunctionsImpl implements DuckDBFunctions {
    lower(value: string | StringField): StringField {
        return new StringFieldImpl('').withOperation({
            field: '',
            method: 'lower',
            args: [valueWrap(value)]
        });
    }

    upper(value: string | StringField): StringField {
        return new StringFieldImpl('').withOperation({
            field: '',
            method: 'upper',
            args: [(value)]
        });
    }

    levenshtein_distance(value1: string | StringField, value2: string | StringField): NumericField {
        return new NumericFieldImpl('').withOperation({
            field: '',
            method: 'levenshtein_distance',
            args: [value1, value2]
        });
    }

    to_hex(value: number | NumericField): StringField {
        return new StringFieldImpl('').withOperation({
            field: '',
            method: 'to_hex',
            args: [value]
        });
    }
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