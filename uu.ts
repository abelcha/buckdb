type People = { name: DVarcharField; male: DBoolField; age: DNumericField };
import { Simplify, SimplifyDeep } from 'type-fest';
// import SchemaData from './.buck/table.json' with { type: "json" };
// type dxx = typeof SchemaData
import { dataSchemas } from './.buck/table.ts'
type Schema = typeof dataSchemas;
import { DNumericField, DVarcharField, DArrayField, DStructField, DJsonField, DBoolField, DMapField, DOtherField, DGlobalField } from './.buck/types';
import { makeProxy } from './sts';
// import type { pro } from 'type-fest'
// dataSchemas['']['duckdb_functions();'].
const duckdbFunctions = makeProxy() as unknown as DGlobalField


function createSchemaProxy<T>(schema: Record<keyof T, string>): T {
    const proxy = {} as T;

    for (const key in schema) {
        console.log('key', key, schema[key]);
        const fieldType = schema[key];

        if (fieldType === 'DVarchar') {
            console.log('MAKE PROXY DVARCHAR', key);
            (proxy as any)[key] = makeProxy(key) as unknown as DVarcharField //new IVarchar(key as string);
        } else if (fieldType === 'DNumeric') {
            (proxy as any)[key] = makeProxy(key) as unknown as DNumericField //new INumeric(key as string);
        } else if (fieldType === 'DOther') {
            (proxy as any)[key] = makeProxy(key) as unknown as DOtherField //new IOther(key as string);
        } else if (fieldType === 'DArray') {
            (proxy as any)[key] = makeProxy(key) as unknown as DArrayField //new IArray(key as string);
        } else if (fieldType === 'DStruct') {
            (proxy as any)[key] = makeProxy(key) as unknown as DStructField //new IStruct(key as string);
        } else if (fieldType === 'DJson') {
            (proxy as any)[key] = makeProxy(key) as unknown as DJsonField //new IJson(key as string);
        } else if (fieldType === 'DBool') {
            (proxy as any)[key] = makeProxy(key) as unknown as DBoolField //new IBool(key as string);
        } else if (fieldType === 'DMap') {
            (proxy as any)[key] = makeProxy(key) as unknown as DMapField //new IMap(key as string);
        }
        // Add more types as needed
    }

    return proxy;
}
type TableSchema<Columns> = {
    [K in keyof Columns]: Columns[K] extends keyof TypeMapping ? TypeMapping[Columns[K]] : bigint;
};
// type SchemaData = TableSchema<typeof _SchemaData>;
// type Schema = SchemaData;

// Type mappings for DuckDB types → TypeScript
type TypeMapping = {
    DVarchar: DVarcharField;
    DNumeric: DNumericField;
    DArray: DArrayField;
    DStruct: DStructField;
    DJson: DJsonField;
    DBool: DBoolField;
    DMap: DMapField;
    DOther: DOtherField;
};

// Convert schema definitions into actual TypeScript types


class From<T, S = T> {
    private table: string;
    // private schema: TableSchema<T>;
    private dbName: string;
    private selectFields: string[][] = [];
    private whereClauses: string[] = [];

    constructor(source: string, dbName = "") {
        this.table = source;
        this.dbName = dbName;
        // this.schema = SchemaData[dbName][source]
        // type z = Schema[typeof dbName]
        // return this as unknown as From;
    }

    /**
     * select<U> allows selecting specific fields and computed ones.
     * - `S` now represents only the selected fields.
     */
    // select<U>(fn: (item: T) => U): From<T, U> {
    //     // const
    //     const fields = Object.keys(fn({} as unknown as TableSchema<T>));
    //     this.selectFields = fields;
    //     return this as unknown as From<T, U>; // Narrow type to only selected fields
    // }
    select<U>(fn: (p: T, D: DGlobalField) => U): From<T, U> {
        const tableConfig = dataSchemas[this.dbName][this.table]
        const schemaProxy = createSchemaProxy(
            tableConfig as Record<string, string>
        );
        this.selectFields = Object.entries(fn(schemaProxy as T, duckdbFunctions));
        return this as unknown as From<T, U>;
    }

    /**
     * where applies filters, allowing access to both original and selected fields.
     */
    where(fn: (item: T & S) => boolean): this {
        const condition = this.parseCondition(fn.toString());
        if (condition) this.whereClauses.push(condition);
        return this;
    }

    /**
     * Executes the query and returns an empty array typed with only the selected fields.
     */
    execute(): S[] {
        return [] as S[];
    }

    /**
     * Converts the query builder state to an SQL string.
     */
    toSql(): string {
        const selectPart = this.selectFields.length ? this.selectFields.map(([k, v]) => `${v} AS ${k}`).join(", ") : "*";
        const wherePart = this.whereClauses.length ? `WHERE ${this.whereClauses.join(" AND ")}` : "";
        return `SELECT ${selectPart} FROM ${this.table} ${wherePart}`.trim();
    }

    /**
     * Parses a function into an SQL WHERE condition.
     */
    private parseCondition(fnString: string): string | null {
        if (fnString.includes("p.b === 0")) return "b = 0";
        if (fnString.includes("p.male")) return "male = TRUE";
        return null;
    }
}

class Database<dbName extends keyof Schema> {
    private dbName: dbName;

    constructor(name: dbName) {
        this.dbName = name;
    }

    from<TableName extends keyof Schema[dbName]>(table: TableName) {
        // type TableType = Simplify<TableSchema<Schema[dbName][TableName]>>;
        // type ZZ = SimplifyDeep<>
        // TableType[]
        return new From<TableSchema<Schema[dbName][TableName]>>(table as string, this.dbName);
    }
}

const database = <dbName extends keyof Schema>(name: dbName) => new Database(name);

const q = database('ex.duckdb')
    // .from(d => d.sfr.join(d.whatever, ))
    // groupBy(p => p.lastname)
    .from('sfr')
    .select((p, D) => ({
        xdd: D.upper(p.latitude.to_base(8).ascii().to_hex()),
        rr: p.lastname.concat(' - ', p.firstname),
        zz: `${p.phone.ascii().abs()} + 3`,
        oo: `(select cast(parameters AS string) from duckdb_functions() order by len(parameters) LIMIT 1)`,
        dd: p.address,
        eee: p.lastname.array_extract(13)
    }))
console.log(q.toSql({ pretty: true }))

// new Drom('')


// Usage Example:
const result = new From<People>("peoples.csv")
    .select((p, D) => ({
        dd: p.age,
        b: 0, // Only selecting `b`
        civility: p.male ? "Mr" : "Me", // Only selecting `civility`
    })) // Now type is { b: number; civility: string }
    .where((p) => p.b === 0) // `p` has access to `b` and `civility`
    .execute(); // Returns []

console.log(result.map(e => e.civility)); // Expected output: []

