import { Models } from '../.buck/table3'
import * as t from '../.buck/types'
import { DuckdbCon } from '../buckdb.core'
import { DDirection } from './build'
import { CopyToInterface } from './copy'
import { FromPlain, ToPlain } from './deep-map'
import { Flatten, KeyIntersection, Merge, NestedKeyOf, PArray, PRecord, Primitive, TripleMerge } from './generic-utils'
import type { DeriveName } from './utils'

type TRessource = keyof Models | (string & {})

type StrictCollection = { catalog: string; uri: string; alias: string }
// Utility type to merge two types into a frame object

type DefaultizeCollection<C> = // Renamed 'Collection' to 'C' for clarity
    // 1. If all properties (catalog, uri, alias) are present, return as is.
    C extends { catalog: string; uri: string; alias: string } ? C
    // 2. If alias is missing, infer uri as T, merge C with { alias: DeriveName<T> }.
    : C extends { catalog: string; uri: infer T extends string } ? Merge<C, { alias: DeriveName<T> }>
    : C extends { alias: string; uri: string } ? Merge<C, { catalog: '' }>
    // 3. If catalog and alias are missing, infer uri as T, merge C with { catalog: '', alias: DeriveName<T> }.
    : C extends { uri: infer T extends string } ? Merge<C, { catalog: ''; alias: DeriveName<T> }>
    // 4. Otherwise, it's not a valid input structure.
    : never

type ModelForCollection<Mods extends Models, C extends StrictCollection> = C extends { catalog: infer R; uri: infer T } // Use uri T for lookup
    ? R extends keyof Mods ? T extends keyof Mods[R] ? Mods[R][T] : T extends keyof Mods[''] ? Mods[''][T] : {} : {}
    : {}

export const v__ = Symbol('alias')

type ShallowModel<T extends Record<string, any>> = {
    [K in keyof T as T[K] extends Record<typeof v__, 1> ? never : K]: T[K]
}
interface TFlag {
    [v__]: never
}
type ModelFromCollectionList<Mods extends Models, C extends StrictCollection[]> =
    C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]]
    ? TripleMerge<{ [K in F['alias']]: TFlag & ModelForCollection<Mods, F> }, ModelForCollection<Mods, F>, ModelFromCollectionList<Mods, Rest>>
    : {} // Base case should be an empty object for merging
// Recursive type to merge all models from collections, using alias as key
type ShallowModelFromCollectionList<Mods extends Models, C extends StrictCollection[]> = C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ? ModelForCollection<Mods, F> & ModelFromCollectionList<Mods, Rest>
    : {} // Base case should be an empty object for merging

type DRawField = t.DAnyField

type DPrimitiveField = t.DVarcharField | t.DNumericField | t.DDateField | t.DBoolField
type DNestedField = t.DArrayField | t.DStructField | t.DJsonField | t.DMapField
export type GField = DPrimitiveField | DNestedField | DRawField | t.DArrayField<DNestedField | DPrimitiveField>

interface GenericRecursive<T> {
    [key: string]: T | GenericRecursive<T> | string | number | boolean | unknown
}
export type SelectModel = GenericRecursive<GField>
export type MetaModel = GenericRecursive<GField>

type PrimitiveField<T> = T extends number ? t.DNumericField
    : T extends string ? t.DVarcharField
    : T extends boolean ? t.DBoolField
    : t.DAnyField

export type VTypes = 'frame' | 'records' | 'values' | 'grouped' | 'keyed' | 'row'

// ====================================================================================================
// ====================================================================================================

type FnMap<Available extends MetaModel, MetaField extends t.DMetaField, Selected extends SelectModel = {}, SelectedValues = []> = {
    row: (this: MS<'row', MetaField, Available, Selected, SelectedValues>) => Promise<SelectedValues extends [] ? ToPlain<Selected> : ToPlain<SelectedValues>>
    values: (this: MS<'values', MetaField, Available, Selected, SelectedValues>) => PArray<ToPlain<SelectedValues>>
    records: (this: MS<'records', MetaField, Available, Selected, SelectedValues>) => PArray<ToPlain<Selected>>

    grouped: (this: MS<'grouped', MetaField, Available, Selected, SelectedValues>) => PRecord<ToPlain<Selected>[]>
    keyed: (this: MS<'keyed', MetaField, Available, Selected, SelectedValues>) => PRecord<ToPlain<Selected>>
    frame: (this: MS<'frame', MetaField, Available, Selected, SelectedValues>) => PArray<ToPlain<SelectedValues extends [infer F] ? F : any>>
}

type MSR<A extends MetaModel, M extends t.DMetaField, S extends SelectModel = {}, SV = []> = MS<'records', M, A, S, SV>
type MSV<A extends MetaModel, M extends t.DMetaField, S extends SelectModel = {}, SV = []> = MS<'values', M, A, S, SV>
type MSF<A extends MetaModel, M extends t.DMetaField, S extends SelectModel = {}, SV = []> = MS<'frame', M, A, S, SV>


type KeyPicker<A extends Record<string, any>, S extends Record<string, any>, Rest = never> = NestedKeyOf<A> | NestedKeyOf<S> | ((p: A & S, D: t.DMetaField) => GField) | Rest

export interface MS<V extends VTypes, M extends t.DMetaField, A extends MetaModel, S extends SelectModel = ShallowModel<A>, SV = []> extends Selectors<S, M> {
    execute: FnMap<A, M, S, SV>[V]
    exec: this['execute']
    show: this['execute']
    dump: (opts?: { state?: boolean }) => this

    orderBy<U_ extends ([KeyPicker<A, S>, DDirection?][])>(...key: U_): MS<V, M, A, S, SV>
    orderBy<U extends ('ALL' | KeyPicker<A, S>)>(k: U, d?: DDirection): MS<V, M, A, S, SV>
    orderBy<Z>(_callback: (p: A & S, D: M) => Z, d?: DDirection): MS<V, M, A, S, SV>
    // zby(fn: (x: A, f: UUU) => any): this
    groupBy<G extends KeyPicker<A, S, 'ALL'>>(...keys: G[] | G[][] | (['GROUPING SETS', G[][]] | ['CUBE' | 'ROLLUP', G[]])): MS<'grouped', M, A, S, SV>

    countBy<G extends (KeyPicker<A, S>)>(key: G): MS<'values', M, A, S, [string, number]>


    keyBy<G extends (KeyPicker<A, S>)>(key: G): MS<'keyed', M, A, S, SV>

    minBy<G extends (KeyPicker<A, S>)>(key: G): MS<'row', M, A, S, SV>

    maxBy: this['minBy']

    where(fn: (p: A & S, D: M) => any): MS<V, M, A, S, SV>
    where(rawStr: string): MS<V, M, A, S, SV>

    having: this['where']
    distinctOn<G extends KeyPicker<A, S>>(...key: G[] | G[][]): MS<V, M, A, S, SV>

    // except<VV extends V, A extends MetaModel, S extends Selected>(a: MS<VV, A, S>): MS<VV, A, S>
    union<V2 extends VTypes, A2 extends MetaModel, S2 extends SelectModel>(a: MS<V2, M, A2, S2>): MS<V2, M, A & A2, S & S2>
    unionAll: this['union']
    unionByName: this['union']
    unionAllByName: this['union']
    except(a: MS<any, any, any>): MS<V, M, A, S, SV>
    exceptAll: this['except']
    intersect: this['except']
    intersectAll: this['except']

    limit: (n: number) => this
    offset: (n: number) => this
    context: (cb: Record<string, any>) => this
    sample: (n: number | `${number}%`) => this
    toSql(opts?: any): string
    copyTo: CopyToInterface<A, S>['to'] // Pass available fields to CopyToInterface
}





export interface UpdateResult<Mods extends Models, T extends keyof Mods, C extends StrictCollection[] = [], P extends MetaModel = ModelFromCollectionList<Mods, C>> {
    set<U extends SelectModel>(fn: (p: P & Record<string, any>, D: t.DMetaField) => U): UpdateResult<Mods, T, C, P>
    where<X>(fn: (p: P, D: t.DMetaField) => X): UpdateResult<Mods, T, C, P>
    where(...callback: string[]): UpdateResult<Mods, T, C, P>
}

type ExtractSelectModel<T> = T extends MS<any, any, any, infer S, any> ? S : T extends Record<string, MS<any, any, any, any, any>> ? { [K in keyof T]: ExtractSelectModel<T[K]> } : SelectModel
type WithResult<Mods extends Models, T extends keyof Mods & string, Schema, M extends t.DMetaField> = DBuilderResult<Mods & Record<T, Schema>, T, M>
type WithAccDB<Mods extends Models, T extends keyof Mods & string, Schema, M extends t.DMetaField> = DBuilderResult<Mods & Record<T, Schema>, T, M>
type MSRecord = Record<string, MS<any, any, any, any, any>>

// type InitialMaterializedResult<C extends StrictCollection[]> = MS<'records', ModelFromCollectionList<C>>
export interface Withor<Mods extends Models, T extends keyof Mods & string, M extends t.DMetaField = t.DMetaField> {
    with<O extends MSRecord>(fn: (accDB: DBuilderResult<Mods, T, M>) => O): WithResult<Mods, T, ExtractSelectModel<O>, M>

    with<O1 extends MSRecord, O2 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T, M>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>, M>) => O2
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2>, M>

    with<O1 extends MSRecord, O2 extends MSRecord, O3 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T, M>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>, M>) => O2,
        fn3: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O2>, M>) => O3
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2 & O3>, M>

    with<O1 extends MSRecord, O2 extends MSRecord, O3 extends MSRecord, O4 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T, M>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>, M>) => O2,
        fn3: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O2>, M>) => O3,
        fn4: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O3>, M>) => O4
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2 & O3 & O4>, M>

    with<O1 extends MSRecord, O2 extends MSRecord, O3 extends MSRecord, O4 extends MSRecord, O5 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T, M>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>, M>) => O2,
        fn3: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O2>, M>) => O3,
        fn4: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O3>, M>) => O4,
        fn5: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O4>, M>) => O5
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2 & O3 & O4 & O5>, M>
}
declare function Buck<T extends keyof Models & string = '', M extends t.DMetaField = t.DMetaField>(uri?: T, opts?: { settings?: Partial<t.DSettings>; macros?: Record<string, (...args: any[]) => any>; extensions?: string[] }): DBuilderResult<Models, T, M>



interface Resultor<T> {
    toSql: (opts?: any) => string,
    execute: () => Promise<T>
    exec: this['execute']
    show: this['execute']
    dump: (opts?: { state?: boolean }) => this
}



export interface Selectors<P extends MetaModel, M extends t.DMetaField> {

    // A: select()
    select(): MSR<P, M, ShallowModel<P>>
    // B: select('name', 'age')
    select<U extends (NestedKeyOf<P> & string)[]>(...keys: U & (NestedKeyOf<P>)[]): MSR<P, M, { [K in U[number] & keyof P]: P[K] }>
    // C select(e => [e.name, e.age])
    select<T______________1, T______________2>(fn: (p: P, D: M) => [T______________1, T______________2]): MSV<P, M, {}, [T______________1, T______________2]>
    select<T_________1, T_______2, T________3>(fn: (p: P, D: M) => [T_________1, T_______2, T________3]): MSV<P, M, {}, [T_________1, T_______2, T________3]>
    select<T_____1, T_____2, T_____3, T_____4>(fn: (p: P, D: M) => [T_____1, T_____2, T_____3, T_____4]): MSV<P, M, {}, [T_____1, T_____2, T_____3, T_____4]>
    select<T___1, T____2, T___3, T___4, T___5>(fn: (p: P, D: M) => [T___1, T____2, T___3, T___4, T___5]): MSV<P, M, {}, [T___1, T____2, T___3, T___4, T___5]>
    select<T__1, T__2, T__3, T__4, T__5, T__6>(fn: (p: P, D: M) => [T__1, T__2, T__3, T__4, T__5, T__6]): MSV<P, M, {}, [T__1, T__2, T__3, T__4, T__5, T__6]>
    select<T_1, T_2, T_3, T__4, T_5, T_6, T_7>(fn: (p: P, D: M) => [T_1, T_2, T_3, T__4, T_5, T_6, T_7]): MSV<P, M, {}, [T_1, T_2, T_3, T__4, T_5, T_6, T_7]>
    select<T_1, T_2, T3, T4, T5, T6, T_7, T_8>(fn: (p: P, D: M) => [T_1, T_2, T3, T4, T5, T6, T_7, T_8]): MSV<P, M, {}, [T_1, T_2, T3, T4, T5, T6, T_7, T_8]>
    select<A____, D, E, F, G, H, I, J, _____L>(fn: (p: P, D: M) => [A____, D, E, F, G, H, I, J, _____L]): MSV<P, M, {}, [A____, D, E, F, G, H, I, J, _____L]>
    select<A___, C, D, E, F, G, H, I, J, ___L>(fn: (p: P, D: M) => [A___, C, D, E, F, G, H, I, J, ___L]): MSV<P, M, {}, [A___, C, D, E, F, G, H, I, J, ___L]>
    select<A__, C, D, E, F, G, H, I, J, K, _L>(fn: (p: P, D: M) => [A__, C, D, E, F, G, H, I, J, K, _L]): MSV<P, M, {}, [A__, C, D, E, F, G, H, I, J, K, _L]>
    select<A, B, C, D, E, F, G, H, I, J, K, L>(fn: (p: P, D: M) => [A, B, C, D, E, F, G, H, I, J, K, L]): MSV<P, M, {}, [A, B, C, D, E, F, G, H, I, J, K, L]>
    // Cbis: select(e => [e.name, e.age, e.total,... 421 more items])
    select<T extends readonly GField[]>(fn: (p: P, D: M) => [...T]): MSV<P, M, {}, T>
    // D: select(e => e.age)
    select<U extends DPrimitiveField>(fn: (p: P, D: M) => U): MSF<P, M, {}, [U]>
    // F: select(e => `${e.name}__${e.total}`)
    select<U extends Primitive>(fn: (p: P, D: M) => U): MSF<P, M, {}, [PrimitiveField<U>]>
    // E: select(e => ({ name: e.name, age: e.age }))
    select<U extends SelectModel>(fn: (p: P & Record<string, any>, D: M) => U): MSR<P, M, ShallowModel<FromPlain<U>>>

}


// export type FromResultModel<Ressource extends keyof Models, C extends StrictCollection[] = [], M extends t.DMetaField = t.DMetaField, P extends MetaModel = ModelFromCollectionList<Models, C>> = FromResult<Models, Ressource, C, M, P>

export interface FromResult<Mods extends Models, Ressource extends keyof Mods, C extends StrictCollection[] = [], M extends t.DMetaField = t.DMetaField, P extends MetaModel = ModelFromCollectionList<Mods, C>> extends Selectors<P, M> {
    join<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>, A extends string>(table: K, alias: A, using: KeyIntersection<P, ModelForCollection<Mods, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>>>)
        : FromResult<Mods, Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>], M>
    join<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>>(table: K, using: KeyIntersection<P, ModelForCollection<Mods, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>>>)
        : FromResult<Mods, Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>], M>
    join<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>, A extends string>(table: K, alias: A, fn: (p: ModelFromCollectionList<Mods, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>]>, D: M) => any)
        : FromResult<Mods, Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>], M>
    join<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>>(table: K, fn: (p: ModelFromCollectionList<Mods, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>]>, D: M) => any)
        : FromResult<Mods, Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>], M>

    leftJoin: this['join']
    rightJoin: this['join']
    naturalJoin: this['join']
    innerJoin: this['join']

    crossJoin<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>, A extends string = DeriveName<K>>(table: K, a?: A)
        : FromResult<Mods, Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>], M>

    execute(): ReturnType<Flatten<MSR<P, M, ShallowModelFromCollectionList<Models, C>>>['execute']>
    ensureSchemas(): Promise<void>
}



declare function Buck<T extends keyof Models>(catalog: T, settings?: Partial<t.DSettings>): DBuilderResult<Models, ''>
// const r =
//     Buck('')
//         .from('data/people.parquet')
//         .crossJoin('data/str-test.jsonl', 'sssssss')
//         .select('sssssss.str')
// //     // .from('duckdb_functions()')
//         .from('data/people.parquet')
//         .crossJoin('data/str-test.jsonl')
//         // .select(e => e.)
//         // .select(e => e.)
//         // .select('')
//         // .select('people')
//         // .crossJoin('/datasets/communes.parquet', 'XX')
//         // .select('')
// const r =
//     Buck('')
//         .from('data/people.parquet', 'P')
//         .select(e => e.P.total)
//         .exec()
// .from('data/str-test.jsonl')
// .select('')
// .select(e => ({ xxx: e.database_name, yyy: 'e.database_size' }))
// .where(e => e.str === 123)

// Define the return type for DBuilder
export interface DBuilderResult<Mods extends Models, T extends keyof Mods & string, M extends t.DMetaField = t.DMetaField> extends Withor<Mods, T, M> {
    ddb: DuckdbCon
    settings(s: Partial<t.DSettings>): DBuilderResult<Mods, T, M>
    fetchTables: () => Promise<[string, any][]>
    // select<U extends SelectModel>(fn: (p: P & Record<string, any>, D: t.DMetaField) => U): MSR<P, ShallowModel<U>>

    macros: <U extends Record<string, (...args: any[]) => any>>(
        fn: (D: t.DMetaField & Record<string, (...args: any[]) => any>) => U
    ) => DBuilderResult<Mods, '', U & M>

    create(s: string, opts?: Partial<{ replace: boolean; ifNotExists: boolean }>): {
        as<U extends Record<string, any>>(...items: U[]): Resultor<any>
    }

    update<K1 extends Flatten<Extract<keyof Mods[T], string> | Extract<keyof Mods[''], string> & string>>(table: K1): UpdateResult<Mods, T, [DefaultizeCollection<{ catalog: T; uri: K1 }>]> & Resultor<any>

    // from<K1 extends Extract<keyof Mods[T], string> | Extract<keyof Mods[''], string>, A extends string>(table: K1, alias: A):
    //     & FromResult<Mods, T, [DefaultizeCollection<{ catalog: T; uri: K1; alias: A }>], M>
    //     & MS<'records', M, ModelFromCollectionList<Mods, DefaultizeCollection<{ catalog: T; uri: K1; alias: A }[]>>>

    from<K1 extends Extract<keyof Mods[T], string> | Extract<keyof Mods[''], string>, A extends string = DeriveName<K1>>(table: K1, alias?: A):
        & FromResult<Mods, T, [DefaultizeCollection<{ catalog: T; uri: K1; alias: A }>], M>
        & MS<'records', M, ModelFromCollectionList<Mods, [{ catalog: T; uri: K1; alias: A }]>>


    // from<K extends keyof Mods['error']>(x: K): Mods['error'][K]

    from<TT extends keyof Mods, SS extends StrictCollection[]>(obj: FromResult<Mods, TT, SS, M>): FromResult<Mods, TT, SS, M>
    from<V1 extends VTypes, A1 extends MetaModel, S1 extends SelectModel = {}>(obj: MS<V1, M, A1, S1>): MS<V1, M, A1, S1>

    loadExtensions(...ext: string[]): DBuilderResult<Mods, T, M> // Use the defined type here
    // fetchSchema(id: string): Promise<Mods>
    describe(id: string): Promise<any>

}





// Overload for settings only
export declare function DBuilder(settings?: Partial<t.DSettings>): DBuilderResult<Models, ''>
export declare function DBuilder(): DBuilderResult<Models, ''>

// Updated DBuilder declaration with catalog
export declare function DBuilder<T extends TRessource>(catalog: T, settings?: Partial<t.DSettings>):
    T extends keyof Models ? DBuilderResult<Models, T> : DBuilderResult<Models, ''>



