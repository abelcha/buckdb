import { DConstructor, DeriveName, DField, DRawField, DuckDBClient, DuckdbCon, DuckdbFactory, formatSource, keyBy } from "./utils";
import { Models } from '../.buck/table3';
import * as t from "../.buck/types";
import { parse, parseObject } from './parser';

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};


export type NestedKeyOf<ObjectType extends Record<string, any>> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends { [t.sInferred]: infer V }
    ? `${Key}`
    : ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type DMetaComp = t.DAggregateComp & t.DGlobalComp
export type DMetaField = t.DAggregateField & t.DGlobalField & { raw: (template: TemplateStringsArray) => DRawField }


export interface GenericRecursive<T> {
    [key: string]: T | GenericRecursive<T>;
}
export type SelectModel = GenericRecursive<DField>
export type MetaModel = GenericRecursive<DField>


export type StrictCollection = { catalog: string, uri: string, alias: string }
// Utility type to merge two types into a single object
export type Merge<T, U> = {
    [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};
export type FirstValue<T extends Record<string, any>> = T[keyof T] | undefined;
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
    R extends keyof Models ?
    T extends keyof Models[R] ?
    Models[R][T] :
    T extends keyof Models[''] ? Models[''][T] : {} :// Return never if resource name R is invalid
    {} : // Return never if uri T is invalid
    {} // Should not happen if C extends StrictCollection



export type ModelFromCollectionList<C extends StrictCollection[]> =
    C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ?
    ModelForCollection<F> & { [K in F['alias']]: ModelForCollection<F> } & ModelFromCollectionList<Rest> :
    {} // Base case should be an empty object for merging
// Recursive type to merge all models from collections, using alias as key


export type ToExecuted<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField | string> ? {
    [P in keyof SelectedFields]: SelectedFields[P] extends DField ? (SelectedFields[P] extends { [t.sInferred]: infer V } ? V : SelectedFields[P]) :
    SelectedFields[P] extends SelectModel ? ToExecuted<SelectedFields[P]> : never
} : never;


export type ToComp<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField | string> ? {
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
    singleCol?: boolean,
    single?: boolean,
    // orderBy?: string[],
}

export interface MaterializedResult<S extends MState, C extends StrictCollection[]> {
    // execute(): Promise<MapInferredType<ModelFromCollectionList<C>>>
    groupBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaComp) => Z): MaterializedGroupByResult<S & { grouped: Z }, C>
    groupBy<U extends (NestedKeyOf<S['available'] & S['selected']>)>(...key: U[]): MaterializedGroupByResult<S, C>

    keyBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaComp) => Z): MaterializedGroupByResult<S & { keyed: true }, C>
    keyBy<U extends (NestedKeyOf<S['available'] & S['selected']>)>(key: U): MaterializedGroupByResult<S & { keyed: true }, C>

    minBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaComp) => Z): MaterializedResult<S & { single: true }, C>
    minBy<U extends (NestedKeyOf<S['available'] & S['selected']>)>(key: U): MaterializedResult<S & { single: true }, C>

    maxBy: this['minBy']

    where<X>(fn: (p: ToComp<S['available'] & S['selected']>, D: DMetaComp) => X): MaterializedResult<S, C>
    where<X>(...fn: string[]): MaterializedResult<S, C>
    // execute(this: MaterializedResult<S & { keyed: true }, C>): Promise<Record<string, ToExecuted<S['selected']>>>; // <-- Specify the correct keyed return type here
    execute(this: MaterializedResult<S, C>): Promise<
        S['singleCol'] extends true ?
        FirstValue<ToExecuted<S['selected']>> :
        S['single'] extends true ?
        ToExecuted<S['selected']> :
        S['keyed'] extends true ?
        Record<string, ToExecuted<S['selected']>> : ToExecuted<S['selected']
        >[]>
    toSql({ pretty }: { pretty?: boolean }): string
    toSql(): string
    orderBy: this['groupBy'],
    // having: this['where'],
    limit: (n: number) => this,
    sample: (n: number | `${number}%`) => this,
    offset: (n: number) => this,
    dump: () => this,
    show: () => this,
}
export interface MaterializedWhereResult<S extends MState, C extends StrictCollection[]> extends MaterializedResult<S, C> {
    orWhere: this['where']
}
export interface MaterializedGroupByResult<S extends MState, C extends StrictCollection[]> extends MaterializedResult<S, C> {
    having: this['where']
}

export interface MaterializedSelectResult<S extends MState, C extends StrictCollection[]> extends MaterializedResult<S, C> {
    distinctOn: this['groupBy'],
}



export interface FromResult<T extends keyof Models & string, C extends StrictCollection[] = []> {
    join<K extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>, A extends string>(table: K, alias: A, fn?: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: T, uri: K, alias: A }>]>>, D: DMetaComp) => any):
        FromResult<T, [...C, DefaultizeCollection<{ catalog: T, uri: K, alias: A }>]>;
    join<K extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>, Z extends string>(table: K, fn?: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: T, uri: K, alias: DeriveName<K> }>]>>, D: DMetaComp) => any):
        FromResult<T, [...C, DefaultizeCollection<{ catalog: T, uri: K, alias: DeriveName<K> }>]>;
    leftJoin: this['join'],
    rightJoin: this['join'],
    crossJoin: this['join'],
    naturalJoin: this['join'],
    select<U extends (NestedKeyOf<ModelFromCollectionList<C>>)[]>(...keys: U & (NestedKeyOf<ModelFromCollectionList<C>>)[]): MaterializedSelectResult<{
        selected: { [K in U[number] & keyof ModelFromCollectionList<C>]: ModelFromCollectionList<C>[K] },
        available: ModelFromCollectionList<C>,
    }, C>
    select<U extends DField>(fn: (p: ModelFromCollectionList<C>, D: DMetaField) => U): MaterializedSelectResult<{
        singleCol: true,
        selected: { '': U },
        available: ModelFromCollectionList<C>,
    }, C>
    select<U extends SelectModel>(fn: (p: ModelFromCollectionList<C>, D: DMetaField) => U): MaterializedSelectResult<{
        selected: U,
        available: ModelFromCollectionList<C>,
    }, C>

}

// DBuilder('').from('data/people.parquet').select(e => e.age).execute().then(e => e)

// function With<
//     T extends keyof Models & string,
//     C extends StrictCollection[],
//     R extends FromResult<T, C> | MaterializedSelectResult<any, C>,
//     U
// >(
//     result: R,
//     callback: (value: R) => FromResult<T, C>
// ): U {
//     return callback(result);
// }
// With(DBuilder('').from('data/people.parquet').select(e => ({ toto: e.age.acos() })), e => e)
// DBuilder('').from('data/people.parquet').select(e => ({ toto: e.age.acos() })).groupBy('toto').execute().then(e => e[0].toto))

// Define the type alias before DBuilder
export type InitialMaterializedResult<C extends StrictCollection[]> = MaterializedResult<{
    // selected: ['*'], // Assuming '*' is the default selection
    selected: ModelFromCollectionList<C>,
    available: ModelFromCollectionList<C>,
}, C>;

export type DExtensionsId = typeof t.DExtensions[number]['extension_name']
// Updated DBuilder declaration
export declare function DBuilder<T extends keyof Models>(catalog: T, settings?: Partial<t.DSettings>): {
    ddb: DuckdbCon,
    settings(s: t.DSettings): DuckdbCon,
    // loadExtension(s: t.DSettings): typeof DBuilder<T>,
    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>>, A extends string>(table: K1, alias: A):
        FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: A }>]> &
        InitialMaterializedResult<[DefaultizeCollection<{ catalog: T, uri: K1, alias: A }>]>; // Use the alias

    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>> & string>(table: K1):
        FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: DeriveName<K1> }>]> &
        InitialMaterializedResult<[DefaultizeCollection<{ catalog: T, uri: K1, alias: DeriveName<K1> }>]>; // Use the alias
    
    loadExtensions(...ext: DExtensionsId[]): ReturnType<typeof DBuilder<T>>
    fetchSchema(id: string): Promise<Models>
};

// const xdb = DBuilder('data/ex.duckdb').load('autocomplete', 'arrow')
// xdb.from('')
