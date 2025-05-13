import { DField, DRawField, DuckDBClient, DuckdbCon, formatSource, keyBy } from "./utils";
import { Models } from '../.buck/table3';
import * as t from "../.buck/types";
import { DDirection } from "./build";
import { CopyTo } from "./copy"; // Import the generic CopyTo

type StripSpecialChars<S extends string> = S extends `${infer First}${infer Rest}` ? First extends AlphaNumeric ? `${First}${StripSpecialChars<Rest>}` : StripSpecialChars<Rest> : '';
type DeriveName<Path extends string> = Path extends `${infer _}/${infer Rest}` ? DeriveName<Rest> : Path extends `${infer Name}.${string}` ? StripSpecialChars<Name> : StripSpecialChars<Path>;

type TRessource = keyof Models | (string & {});

type AlphaNumeric = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '_' | '-'
export const deriveName = <T extends string>(value: T): DeriveName<T> => {
    const result = value.split('/').pop()?.split('.').shift() || value;
    return result.replace(/[^a-zA-Z0-9_\-]/g, '') as DeriveName<T>;
}

export type ObjectToValuesTuple<T> = T extends Record<string, any> ? Array<T[keyof T]> : never;

export type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};
export type ToRecord<T> = T extends readonly any[]
    ? { [K in keyof T as K extends `${number}` ? K : never]: T[K] }
    : T
export type ExpectEqual<A, B> =
    (<G>() => G extends A ? 1 : 2) extends
    (<G>() => G extends B ? 1 : 2)
    ? (<G>() => G extends B ? 1 : 2) extends (<G>() => G extends A ? 1 : 2)
    ? true
    : { error: 'Types are not equal'; expected: B; got: A }
    : { error: 'Types are not equal'; expected: B; got: A };

// Helper to force TypeScript to evaluate and reveal the error
export type Assert<T extends true> = T;
export type NestedKeyOf<ObjectType extends Record<string, any>> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends { [t.sInferred]: infer V }
    ? `${Key}` : ObjectType[Key] extends object ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}` : `${Key}`;
}[keyof ObjectType & (string | number)];

export type DMetaComp = t.DAggregateComp & t.DGlobalComp
export type DMetaField = t.DAggregateField & t.DGlobalField & { _: t.DAggregateField } & { raw: (template: TemplateStringsArray) => DRawField }


export interface GenericRecursive<T> {
    [key: string]: T | GenericRecursive<T> | string | number;
}
export type SelectModel = GenericRecursive<DField>
export type MetaModel = GenericRecursive<DField>


export type StrictCollection = { catalog: string, uri: string, alias: string }
// Utility type to merge two types into a single object
export type Merge<T, U> = { [K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never;
};
export type DefaultizeCollection<C> = // Renamed 'Collection' to 'C' for clarity
    // 1. If all properties (catalog, uri, alias) are present, return as is.
    C extends { catalog: string, uri: string, alias: string } ? C :
    // 2. If alias is missing, infer uri as T, merge C with { alias: DeriveName<T> }.
    C extends { catalog: string, uri: infer T extends string } ? Merge<C, { alias: DeriveName<T> }> :
    C extends { alias: string, uri: string } ? Merge<C, { catalog: '' }> :
    // 3. If catalog and alias are missing, infer uri as T, merge C with { catalog: '', alias: DeriveName<T> }.
    C extends { uri: infer T extends string } ? Merge<C, { catalog: '', alias: DeriveName<T> }> :
    // 4. Otherwise, it's not a valid input structure.
    never;



export type ModelForCollection<C extends StrictCollection> = C extends { catalog: infer R, uri: infer T } ? // Use uri T for lookup
    R extends keyof Models ? T extends keyof Models[R] ? Models[R][T] : T extends keyof Models[''] ? Models[''][T] : {} : {} : {}



export type ModelFromCollectionList<C extends StrictCollection[]> =
    C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ?
    ModelForCollection<F> & { [K in F['alias']]: ModelForCollection<F> } & ModelFromCollectionList<Rest> :
    {} // Base case should be an empty object for merging
// Recursive type to merge all models from collections, using alias as key
export type ShallowModelFromCollectionList<C extends StrictCollection[]> =
    C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ?
    ModelForCollection<F> & ModelFromCollectionList<Rest> :
    {} // Base case should be an empty object for merging
// Recursive type to merge all models from collections, using alias as key

type NestedField<V> = V extends SelectModel ? ToExecutedObject<V> : (V extends any[] ? ToExecutedArrayValues<V> : V)

export type ToExecutedObject<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField> ? {
    [P in keyof SelectedFields]:
    SelectedFields[P] extends DField ? (SelectedFields[P] extends { [t.sInferred]: infer V } ? NestedField<V> : SelectedFields[P]) :
    SelectedFields[P] extends SelectModel ? ToExecutedObject<SelectedFields[P]>
    : SelectedFields[P] extends string ? any
    : SelectedFields[P] extends number ? number
    : never
} : never;

export type ToExecutedValue<field extends DField> = field extends { [t.sInferred]: infer V } ? NestedField<V> : field;

// export type ToExecutedValue2<field extends DField> = ;
export type ToExecutedArrayValues<FieldArray extends any[]> = {
    [P in keyof FieldArray]: FieldArray[P] extends SelectModel ? ToExecutedObject<FieldArray[P]> : FieldArray[P] extends { [t.sInferred]: infer V } ? V : FieldArray[P]  //ToExecutedValue2<FieldArray[P]>
};

export type ToExecutedArray<SelectedRows> = {
    [P in keyof SelectedRows]: SelectedRows[P] extends DField
    ? (SelectedRows[P] extends { [t.sInferred]: infer V } ? NestedField<V> : SelectedRows[P])
    : SelectedRows[P] extends SelectModel ? ToExecutedObject<SelectedRows[P]>
    : SelectedRows[P] extends string ? any
    : never
};

export type ToExecuted<S extends MState> = S['selectedRows'] extends any[] ? ToExecutedArray<S['selectedRows']> : ToExecutedObject<S['selected']>;

// type res = Assert<ExpectEqual<ToExecutedObject<{ xxx: t.DJsonField<{ ["lol"]: t.DVarcharField;["ss"]: t.DStructField<{ nested: t.DBoolField }>;["toto"]: t.DArrayField<t.DNumericField>;["tata"]: t.DArrayField<{ vgvg: t.DVarcharField, ll: t.DStructField<{ nested: t.DBoolField }> }>; }>; }>, { xxx: { lol: string; ss: { nested: boolean; }; toto: number[]; tata: { vgvg: string; ll: { nested: boolean; }; }[]; }; }>>


type RemoveSymbolKeys<T> = T extends object
  ? T extends (...args: any[]) => any
  ? T
  : {
    [K in keyof T as K extends symbol ? never : K]: RemoveSymbolKeys<T[K]>
  }
  : T;

export type ToComp<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField> ? {
    [P in keyof SelectedFields]: SelectedFields[P] extends DField ? (SelectedFields[P] extends { [t.sComptype]: infer V } ? V : never) :
    SelectedFields[P] extends SelectModel ? ToComp<SelectedFields[P]> : never
} : never;



export type MState = {
    available: MetaModel,
    // selected: SelectModel,
    selected: Record<string, any>, // Relaxed constraint to allow Pick result
    // selected: Record<string, DField>,
    // grouped?: DField | string,
    condition?: string[],
    // limit?: number,
    keyed?: boolean,
    selectedValue?: DField,
    // rows?: boolean,
    // single?: boolean,
    selectedRows?: any[],
    // orderBy?: string[],
}
type ObjectToTuple<T extends { [K in number]: any }> = [
    ...{ [K in keyof T]: T[K] } extends infer O
    ? O[keyof O][]
    : never
];

export interface MaterializedWhereResult<S extends MState, C extends StrictCollection[]> extends MaterializedResult<S, C> {
    or: this['where']
    and: this['where']
}
export interface MaterializedGroupByResult<S extends MState, C extends StrictCollection[]> extends MaterializedResult<S, C> {
    having: this['where']
}

export interface MSR<S extends MState, C extends StrictCollection[]> extends MaterializedResult<S, C> {
    distinctOn: this['groupBy'],
}

export interface MaterializedResult<S extends MState, C extends StrictCollection[], Ky extends 'single' | 'map' | 'array' = 'array'> {
    // execute(): Promise<MapInferredType<ModelFromCollectionList<C>>>
    groupBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaComp) => Z): MaterializedGroupByResult<S & { grouped: Z }, C>
    groupBy<U extends ('ALL' | NestedKeyOf<S['available'] & S['selected']>)>(...key: U[]): MaterializedGroupByResult<S, C>
    countBy: this['groupBy']
    keyBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaComp) => Z): MaterializedResult<S, C, 'map'>
    keyBy<U extends (NestedKeyOf<S['available'] & S['selected']>)>(key: U): MaterializedResult<S, C, 'map'>

    minBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaComp) => Z): MaterializedResult<S & { single: true }, C>
    minBy<U extends (NestedKeyOf<S['available'] & S['selected']>)>(key: U): MaterializedResult<S & { single: true }, C>

    maxBy: this['minBy']

    where<X>(fn: (p: ToComp<S['available'] & S['selected']>, D: DMetaComp) => X): MaterializedWhereResult<S, C>
    where<X>(...fn: string[]): MaterializedWhereResult<S, C>
    // execute(this: MaterializedResult<S & { keyed: true }, C>): Promise<Record<string, ToExecuted<S['selected']>>>; // <-- Specify the correct keyed return type here

    toSql({ pretty }: { pretty?: boolean }): string
    toSql(): string
    // orderBy: this['groupBy'],
    orderBy<U extends ([NestedKeyOf<S['available'] & S['selected']>, DDirection?][])>(...key: U): MaterializedResult<S, C>
    orderBy<U extends (NestedKeyOf<S['available'] & S['selected']>)>(key: U, d?: DDirection): MaterializedResult<S, C>
    orderBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaField) => Z, d?: DDirection): MaterializedResult<S, C>

    // orderBy<U extends ([NestedKeyOf<S['available'] & S['selected']> | DDirection])>(...key: [U]): MaterializedResult<S, C>

    // having: this['where'],
    limit: (n: number) => this,
    context: (n: Record<string, any>) => this,
    sample: (n: number | `${number}%`) => this,
    offset: (n: number) => this,
    dump: () => this,
    show: () => this,
    execute(this: MaterializedResult<S, C>, opts?: Record<string, any>): Promise<
        S['selectedValue'] extends DField ?
        ToExecutedValue<S['selectedValue']> :
        S['keyed'] extends true ?
        Record<string, ToExecuted<S>[]> :
        ToExecuted<S>[]
    >
    copyTo: CopyTo<S['available'] & S['selected']>['copyTo'] // Pass available fields to CopyTo
    // Overload 1: Matches destinations ending in .csv
    // copyTo:
    // ... other methods
    // copyTo: (destination: `${string}.csv`, options?: CopyOptions) => Promise<void>,
    // copyTo: (destination: Exclude<string, `${string}.csv`>, options?: CopyOptions) => Promise<void>
}


// DBuilder('').from('data/people.parquet').select(e => ({ toto: e.age.acos() }))
// .copyTo('s3://dallas/uu.csv', { partition_by: ['toto'],  })
//     .copyTo('toot.jsonl.gz', {
//         array: true
//     }).execute()
//     .copyTo('toto.parquet', {
//         rowGroupSize: 1000,

//     })
//     .copyTo('toto.csv.gz', {
//         delim: ',',


//     })
//     .copyTo('xxx.json', {

//     })

// .copyTo()


export type ToRecord2<T> = T extends readonly any[]
    ? { [K in keyof T as K extends `${number}` | number ? K : never]: T[K] }
    : T
export type ToRecord3<T> = T extends readonly (infer U)[]
    ? { [K in keyof T as K extends `${number}` | number ? K : never]: T[K] }
    : T
export type ToRecord4<T extends any[]> = {
    [K in keyof T as K extends `${number}` | number ? K : never]: T[K]
}
type TupleToRecord<T extends readonly unknown[]> = { [K in keyof T & `${number}`]: T[K] };
type DFieldTuple = readonly [...DField[]];


export interface FromResult<T extends keyof Models, C extends StrictCollection[] = [], P extends MetaModel = ModelFromCollectionList<C>> {
    join<K extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>, A extends string>(table: K, alias: A, fn?: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: T, uri: K, alias: A }>]>>, D: DMetaComp) => any):
        FromResult<T, [...C, DefaultizeCollection<{ catalog: T, uri: K, alias: A }>]>;
    join<K extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>, Z extends string>(table: K, fn?: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: T, uri: K, alias: DeriveName<K> }>]>>, D: DMetaComp) => any):
        FromResult<T, [...C, DefaultizeCollection<{ catalog: T, uri: K, alias: DeriveName<K> }>]>;
    leftJoin: this['join'],
    rightJoin: this['join'],
    crossJoin: this['join'],
    naturalJoin: this['join'],
    select(): MSR<{ selected: ShallowModelFromCollectionList<C>, available: P }, C>;
    select<U extends SelectModel>/*   */(fn: (p: P & Record<string, any>, D: DMetaField) => U): MSR<{ selected: U, available: P }, C>;
    select<U extends (NestedKeyOf<P>)[]>(...keys: U & (NestedKeyOf<P>)[]): MSR<{ selected: { [K in U[number] & keyof P]: P[K] }, available: P }, C>
    select<T1/**//**//**//**/>(fn: (p: P, D: DMetaField) => [T1/**//**//**//**/]): MSR<{ selected: {}, selectedRows: [T1/**//**//**//**/], available: P }, C>;
    select<T1, T2/**//**//**/>(fn: (p: P, D: DMetaField) => [T1, T2/**//**//**/]): MSR<{ selected: {}, selectedRows: [T1, T2/**//**//**/], available: P }, C>;
    select<T1, T2, T3/**//**/>(fn: (p: P, D: DMetaField) => [T1, T2, T3/**//**/]): MSR<{ selected: {}, selectedRows: [T1, T2, T3/**//**/], available: P }, C>;
    select<T1, T2, T3, T4/**/>(fn: (p: P, D: DMetaField) => [T1, T2, T3, T4/**/]): MSR<{ selected: {}, selectedRows: [T1, T2, T3, T4/**/], available: P }, C>;
    select<T1, T2, T3, T4, T5>(fn: (p: P, D: DMetaField) => [T1, T2, T3, T4, T5]): MSR<{ selected: {}, selectedRows: [T1, T2, T3, T4, T5], available: P }, C>;

    select<U extends string>/*        */(fn: (p: P, D: DMetaField) => U): MaterializedResult<{ selectedValue: t.DAnyField, selected: {}, available: P }, C>;
    select<U extends DField>/*        */(fn: (p: P, D: DMetaField) => U): MaterializedResult<{ selectedValue: U, selected: {}, available: P }, C>;
    select<U extends (NestedKeyOf<P>)[]>(...keys: U & (NestedKeyOf<P>)[]): MSR<{ selected: { [K in U[number] & keyof P]: P[K] }, available: P, }, C>
    ensureSchemas(): Promise<void>

}



async function checkNested(db: FromResult<'', [{ catalog: '', uri: 's3://a1738/testxs2.jsonl', alias: 'tt' }]>) {
    // const check1 = await db.select(e => e)/************************************/.execute() satisfies string
    // const check3 = await db.select(e => [e.xxx.toto])/***************&********/.execute() satisfies { lol: t.DVarcharField }
    // const check45 = await db.select(e => ({ zzz: e.ss }))/***************&********/.execute() satisfies { lol: t.DVarcharField }
    // // check45[0].xxx.

    // const check2 = await db.select(e => ({ zz: e.name, x: 123 }))/*****************/.execute() satisfies { zz: string, x: number }[]
    // const check4 = await db.select(e => ({ zz: e.name, x: 'custom query' }))/******/.execute() satisfies { zz: string, x: any }[]
    // const check5 = await db.select(e => [e.name, 'super longg query'])/************/.execute() satisfies [string, any][]
    // const check6 = await db.select(e => [e.age, e.people.name, e.total])/**********/.execute() satisfies [number, string, number][]
    // const check7 = await db.select(e => ({ a: e.age, n: e.name }))/****************/.execute() satisfies { a: number, n: string }[]
    // const check8 = await db.select(e => ({ a: e.age, n: e.name })).keyBy(e => e.age).execute() satisfies Record<string, { a: number, n: string }[]>
    // db.select().where(e => e.name).and('name > 12').and('toot')
}
async function checkSelect(db: FromResult<'', [{ catalog: '', uri: 'data/people.parquet', alias: 'people' }]>) {
    const check1 = await db.select(e => e.age)/************************************/.execute() satisfies number
    const check3 = await db.select(e => 'super logn query')/***********************/.execute() satisfies any
    const check2 = await db.select(e => ({ zz: e.name, x: 123 }))/*****************/.execute() satisfies { zz: string, x: number }[]
    const check4 = await db.select(e => ({ zz: e.name, x: 'custom query' }))/******/.execute() satisfies { zz: string, x: any }[]
    const check5 = await db.select(e => [e.name, 'super longg query'])/************/.execute() satisfies [string, any][]
    const check6 = await db.select(e => [e.age, e.people.name, e.total])/**********/.execute() satisfies [number, string, number][]
    const check7 = await db.select(e => ({ a: e.age, n: e.name }))/****************/.execute() satisfies { a: number, n: string }[]
    const check8 = await db.select(e => ({ a: e.age, n: e.name })).keyBy(e => e.age).execute() satisfies Record<string, { a: number, n: string }[]>
    db.select().where(e => e.name).and('name > 12').and('toot')
}


// DBuilder('').from('duckdb_functions()')
//     .select(e => [e.comment, e.database_name, e.description])
//     // .where(e => e.function_name === 'len')
//     .copyTo('s3://dallas/uu.csv', {

//     })
//     .execute()

// DBuilder('').from('data/people.parquet').select(e => ({ toto: e.age.acos() })).groupBy('toto').execute().then(e => e[0].toto))

// Define the type alias before DBuilder
export type InitialMaterializedResult<C extends StrictCollection[]> = MaterializedResult<{
    selected: ModelFromCollectionList<C>,
    available: ModelFromCollectionList<C>,
}, C>;

export type DExtensionsId = typeof t.DExtensions[number]['extension_name']

// Define the return type for DBuilder
type DBuilderResult<T extends keyof Models> = {
    ddb: DuckdbCon,
    settings(s: Partial<t.DSettings>): DBuilderResult<T>,
    // loadExtension(s: t.DSettings): typeof DBuilder<T>,
    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>>, A extends string>(table: K1, alias: A):
        FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: A }>]> &
        InitialMaterializedResult<[DefaultizeCollection<{ catalog: T, uri: K1, alias: A }>]>; // Use the alias

    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>> & string>(table: K1):
        FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: DeriveName<K1> }>]> &
        InitialMaterializedResult<[DefaultizeCollection<{ catalog: T, uri: K1, alias: DeriveName<K1> }>]>; // Use the alias
    loadExtensions(...ext: DExtensionsId[]): DBuilderResult<T> // Use the defined type here
    fetchSchema(id: string): Promise<Models>
    describe(id: string): Promise<any>
};

// Overload for settings only
export declare function DBuilder(settings?: Partial<t.DSettings>): DBuilderResult<''>;
export declare function DBuilder(): DBuilderResult<''>;

// Updated DBuilder declaration with catalog
export declare function DBuilder<T extends TRessource>(catalog: T, settings?: Partial<t.DSettings>): DBuilderResult<T>;
// DBuilder('s3://duckdb-blobs/databases/stations.duckdb', {}).from('')

// const xdb = DBuilder('data/ex.duckdb').load('autocomplete', 'arrow')
// xdb.from('')
// 
// DBuilder()('s')