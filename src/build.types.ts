import type { DuckdbCon } from "./build";
import { DField, DPrimitiveField, DRawField } from "./typedef";
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

export type ToComp<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField> ? {
    [P in keyof SelectedFields]: SelectedFields[P] extends DField ? (SelectedFields[P] extends { [t.sComptype]: infer V } ? V : never) :
    SelectedFields[P] extends SelectModel ? ToComp<SelectedFields[P]> : never
} : never;



type VTypes = 'single' | 'records' | 'values' | 'grouped' | 'keyed' | 'row'


type PArray<X> = Promise<Array<X>>
type PRecord<X> = Promise<Record<string, X>>

type FnMap<Available extends MetaModel, Selected extends SelectModel = {}, SelectedValues = [], SelectedSingle extends DField = t.DAnyField> = {
    single: (this: MS<'single', Available, Selected, SelectedValues, SelectedSingle>) => PArray<ToExecutedValue<SelectedSingle>>;
    values: (this: MS<'values', Available, Selected, SelectedValues, SelectedSingle>) => PArray<ToExecutedArray<SelectedValues>>;
    records: (this: MS<'records', Available, Selected, SelectedValues, SelectedSingle>) => PArray<ToExecutedObject<Selected>>;

    grouped: (this: MS<'grouped', Available, Selected, SelectedValues, SelectedSingle>) => PRecord<ToExecutedObject<Selected>[]>;
    keyed: (this: MS<'keyed', Available, Selected, SelectedValues, SelectedSingle>) => PRecord<ToExecutedObject<Selected>>
    row: (this: MS<'row', Available, Selected, SelectedValues, SelectedSingle>) => Promise<ToExecutedObject<Selected>>;
};

interface MS<V extends VTypes, Available extends MetaModel, Selected extends SelectModel = {}, SelectedValues = [], SelectedSingle extends DField = t.DAnyField> {
    execute: FnMap<Available, Selected, SelectedValues, SelectedSingle>[V];

    orderBy<U_ extends ([NestedKeyOf<Available & Selected>, DDirection?][])>(...key: U_): MS<V, Available, Selected, SelectedValues, SelectedSingle>
    orderBy<U extends ('ALL' | NestedKeyOf<Available & Selected>)>(k: U, d?: DDirection): MS<V, Available, Selected, SelectedValues, SelectedSingle>
    orderBy<Z>(_callback: (p: Available & Selected, D: DMetaField) => Z, d?: DDirection): MS<V, Available, Selected, SelectedValues, SelectedSingle>


    groupBy<U extends ('ALL' | NestedKeyOf<Available & Selected>)>(...keys: U[]): MS<'grouped', Available, Selected, SelectedValues, SelectedSingle>
    groupBy<U extends DField>(_fn: (p: Available & Selected, D: DMetaComp) => U): MS<'grouped', Available, Selected, SelectedValues, SelectedSingle>
    groupBy<Z>(f: (p: Available & Selected, D: DMetaField) => Z, d?: DDirection): MS<'grouped', Available, Selected, SelectedValues, SelectedSingle>

    countBy: this['groupBy']

    keyBy<Z>(__fn: (p: Available & Selected, D: DMetaComp) => Z): MS<'keyed', Available, Selected, SelectedValues, SelectedSingle>
    keyBy<U extends (NestedKeyOf<Available & Selected>)>(key: U): MS<'keyed', Available, Selected, SelectedValues, SelectedSingle>

    minBy<Z>(__fn: (p: Available & Selected, D: DMetaComp) => Z): MS<'single', Available, Selected, SelectedValues, SelectedSingle>
    minBy<U extends (NestedKeyOf<Available & Selected>)>(key: U): MS<'single', Available, Selected, SelectedValues, SelectedSingle>

    maxBy: this['minBy']

    where<X>(fn: (p: ToComp<Available & Selected>, D: DMetaComp) => X): MS<V, Available, Selected, SelectedValues, SelectedSingle>
    where(...callback: string[]): MS<V, Available, Selected, SelectedValues, SelectedSingle>

    having: this['where']
    distinctOn: this['groupBy'],


    limit: (n: number) => this,
    offset: (n: number) => this,
    context: (cb: Record<string, any>) => this,
    sample: (n: number | `${number}%`) => this,
    toSql(): string
    copyTo: CopyTo<Available & Selected>['copyTo'] // Pass available fields to CopyTo
}

export interface FromResult<T extends keyof Models, C extends StrictCollection[] = [], P extends MetaModel = ModelFromCollectionList<C>> {
    join<K extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>, A extends string>(table: K, alias: A, fn?: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: T, uri: K, alias: A }>]>>, D: DMetaComp) => any):
        FromResult<T, [...C, DefaultizeCollection<{ catalog: T, uri: K, alias: A }>]>;
    join<K extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>>(table: K, fn: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: T, uri: K, alias: DeriveName<K> }>]>>, D: DMetaComp) => any):
        FromResult<T, [...C, DefaultizeCollection<{ catalog: T, uri: K, alias: DeriveName<K> }>]>;
    leftJoin: this['join'],
    rightJoin: this['join'],
    crossJoin: this['join'],
    naturalJoin: this['join'],
    // A: select()
    select(): MS<'records', P, ShallowModelFromCollectionList<C>>
    // B: select('name', 'age')
    select<U extends (NestedKeyOf<P> & string)[]>(...keys: U & (NestedKeyOf<P>)[]): MS<'records', P, { [K in U[number] & keyof P]: P[K] }>
    // C select(e => [e.name, e.age])
    select<T________________________________1>(fn: (p: P, D: DMetaField) => [T________________________________1]): MS<'values', P, {}, [T________________________________1]>
    select<T______________1, T______________2>(fn: (p: P, D: DMetaField) => [T______________1, T______________2]): MS<'values', P, {}, [T______________1, T______________2]>
    select<T_________1, T_______2, T________3>(fn: (p: P, D: DMetaField) => [T_________1, T_______2, T________3]): MS<'values', P, {}, [T_________1, T_______2, T________3]>
    select<T_____1, T_____2, T_____3, T_____4>(fn: (p: P, D: DMetaField) => [T_____1, T_____2, T_____3, T_____4]): MS<'values', P, {}, [T_____1, T_____2, T_____3, T_____4]>
    select<T___1, T____2, T___3, T___4, T___5>(fn: (p: P, D: DMetaField) => [T___1, T____2, T___3, T___4, T___5]): MS<'values', P, {}, [T___1, T____2, T___3, T___4, T___5]>
    select<T__1, T__2, T__3, T__4, T__5, T__6>(fn: (p: P, D: DMetaField) => [T__1, T__2, T__3, T__4, T__5, T__6]): MS<'values', P, {}, [T__1, T__2, T__3, T__4, T__5, T__6]>
    select<T_1, T_2, T_3, T__4, T_5, T_6, T_7>(fn: (p: P, D: DMetaField) => [T_1, T_2, T_3, T__4, T_5, T_6, T_7]): MS<'values', P, {}, [T_1, T_2, T_3, T__4, T_5, T_6, T_7]>
    select<T_1, T_2, T3, T4, T5, T6, T_7, T_8>(fn: (p: P, D: DMetaField) => [T_1, T_2, T3, T4, T5, T6, T_7, T_8]): MS<'values', P, {}, [T_1, T_2, T3, T4, T5, T6, T_7, T_8]>
    select<T1, T2, T3, T4, T5, T6, T7, T8, T9>(fn: (p: P, D: DMetaField) => [T1, T2, T3, T4, T5, T6, T7, T8, T9]): MS<'values', P, {}, [T1, T2, T3, T4, T5, T6, T7, T8, T9]>
    // D: select(e => e.age)
    select<U extends DPrimitiveField>(fn: (p: P, D: DMetaField) => U): MS<'single', P, {}, [], U>;
    // E: select(e => ({ name: e.name, age: e.age }))
    select<U extends SelectModel>(fn: (p: P & Record<string, any>, D: DMetaField) => U): MS<'records', P, U>



    ensureSchemas(): Promise<void>

}


export type InitialMaterializedResult<C extends StrictCollection[]> = MS<'records', ModelFromCollectionList<C>>

export type DExtensionsId = typeof t.DExtensions[number]['extension_name']

export interface UpdateResult<T extends keyof Models, C extends StrictCollection[] = [], P extends MetaModel = ModelFromCollectionList<C>> {
    set<U extends SelectModel>(fn: (p: P & Record<string, any>, D: DMetaField) => U): UpdateResult<T, C, P>
    where<X>(fn: (p: ToComp<P>, D: DMetaComp) => X): UpdateResult<T, C, P>
    where(...callback: string[]): UpdateResult<T, C, P>
    execute(): Promise<any>
    toSql(): string
}


// Define the return type for DBuilder
type DBuilderResult<T extends keyof Models> = {
    ddb: DuckdbCon,
    settings(s: Partial<t.DSettings>): DBuilderResult<T>,

    create(s: string, opts?: Record<'replace', any>): {
        as<U extends Record<string, any>>(...items: U[]): {
            execute(): Promise<any>
            toSql(): string
        }
    },

    update<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string> & string>>(table: K1):
        UpdateResult<T, [DefaultizeCollection<{ catalog: T, uri: K1 }>]>


    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>> | (string & {}), A extends string>(table: K1, alias: A):
        FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: A }>]> &
        InitialMaterializedResult<[DefaultizeCollection<{ catalog: T, uri: K1, alias: A }>]>; // Use the alias

    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>> | (string & {})>(table: K1):
        FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: DeriveName<K1> }>]> &
        InitialMaterializedResult<[DefaultizeCollection<{ catalog: T, uri: K1, alias: DeriveName<K1> }>]>; // Use the alias

    from<K extends keyof Models['error']>(x: K): Models['error'][K];

    loadExtensions(...ext: DExtensionsId[]): DBuilderResult<T> // Use the defined type here
    fetchSchema(id: string): Promise<Models>
    describe(id: string): Promise<any>
};

// Overload for settings only
export declare function DBuilder(settings?: Partial<t.DSettings>): DBuilderResult<''>;
export declare function DBuilder(): DBuilderResult<''>;

// Updated DBuilder declaration with catalog
export declare function DBuilder<T extends TRessource>(catalog: T, settings?: Partial<t.DSettings>): DBuilderResult<T extends keyof Models ? T : ''>;
// DBuilder()('s')