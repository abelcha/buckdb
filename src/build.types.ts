import { Models } from '../.buck/table3'
import * as t from '../.buck/types'
import { DuckdbCon } from '../buckdb.core'
import { DDirection } from './build'
import { CopyToInterface } from './copy'
import { ToPlain } from './deep-map'
import type { DeriveName } from './utils'

type TRessource = keyof Models | (string & {})
export type AnyString = (string | {})

export type ObjectToValuesTuple<T> = T extends Record<string, any> ? Array<T[keyof T]> : never

export type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}
export type ToRecord<T> = T extends readonly any[] ? { [K in keyof T as K extends `${number}` ? K : never]: T[K] }
    : T
export type ExpectEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends (<G>() => G extends B ? 1 : 2) ? (<G>() => G extends B ? 1 : 2) extends (<G>() => G extends A ? 1 : 2) ? true
    : { error: 'Types are not equal'; expected: B; got: A }
    : { error: 'Types are not equal'; expected: B; got: A }

// Helper to force TypeScript to evaluate and reveal the error
export type Assert<T extends true> = T
export type NestedKeyOf<ObjectType extends Record<string, any>> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends { [t.sInferred]: infer V } ? `${Key}` : ObjectType[Key] extends object ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}` : `${Key}`
}[keyof ObjectType & (string | number)]

export type StrictCollection = { catalog: string; uri: string; alias: string }
// Utility type to merge two types into a frame object
export type Merge<T, U> = { [K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never }
export type TripleMerge<T, U, V> = { [K in keyof T | keyof U | keyof V]: K extends keyof V ? V[K] : K extends keyof U ? U[K] : K extends keyof T ? T[K] : never }

export type DefaultizeCollection<C> = // Renamed 'Collection' to 'C' for clarity
    // 1. If all properties (catalog, uri, alias) are present, return as is.
    C extends { catalog: string; uri: string; alias: string } ? C
    // 2. If alias is missing, infer uri as T, merge C with { alias: DeriveName<T> }.
    : C extends { catalog: string; uri: infer T extends string } ? Merge<C, { alias: DeriveName<T> }>
    : C extends { alias: string; uri: string } ? Merge<C, { catalog: '' }>
    // 3. If catalog and alias are missing, infer uri as T, merge C with { catalog: '', alias: DeriveName<T> }.
    : C extends { uri: infer T extends string } ? Merge<C, { catalog: ''; alias: DeriveName<T> }>
    // 4. Otherwise, it's not a valid input structure.
    : never

export type ModelForCollection<Mods extends Models, C extends StrictCollection> = C extends { catalog: infer R; uri: infer T } // Use uri T for lookup
    ? R extends keyof Mods ? T extends keyof Mods[R] ? Mods[R][T] : T extends keyof Mods[''] ? Mods[''][T] : {} : {}
    : {}

export const v__ = Symbol('alias')

export type ShallowModel<T extends Record<string, any>> = {
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
export type ShallowModelFromCollectionList<Mods extends Models, C extends StrictCollection[]> = C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ? ModelForCollection<Mods, F> & ModelFromCollectionList<Mods, Rest>
    : {} // Base case should be an empty object for merging

export type DRawField = t.DAnyField

export type DPrimitiveField = t.DVarcharField | t.DNumericField | t.DDateField | t.DBoolField
export type DNestedField = t.DArrayField | t.DStructField | t.DJsonField | t.DMapField
export type GField = DPrimitiveField | DNestedField | DRawField | t.DArrayField<DNestedField | DPrimitiveField>

export interface GenericRecursive<T> {
    [key: string]: T | GenericRecursive<T> | string | number | boolean | unknown
}
export type SelectModel = GenericRecursive<GField>
export type MetaModel = GenericRecursive<GField>
export type Strish = string | {}
export type Primitive = null | undefined | string | number | boolean | symbol | bigint
export type IsPrimitive<T> = [T] extends [Primitive] ? true : false

type PrimitiveField<T> = T extends number ? t.DNumericField
    : T extends string ? t.DVarcharField
    : T extends boolean ? t.DBoolField
    : t.DAnyField

type KeyIntersection<A, B> = {
    [K in keyof A & keyof B]: K
}[keyof A & keyof B]


type ToComp<x> = x

export type VTypes = 'frame' | 'records' | 'values' | 'grouped' | 'keyed' | 'row'

type PArray<X> = Promise<X[]>
type PRecord<X> = Promise<Record<string, X>>

type FirstElement<T> = T extends [infer F, ...any[]] ? F : never

// ====================================================================================================
// ====================================================================================================

type FnMap<Available extends MetaModel, Selected extends SelectModel = {}, SelectedValues = []> = {
    row: (this: MS<'row', Available, Selected, SelectedValues>) => Promise<SelectedValues extends [] ? ToPlain<Selected> : ToPlain<SelectedValues>>
    values: (this: MS<'values', Available, Selected, SelectedValues>) => PArray<ToPlain<SelectedValues>>
    records: (this: MS<'records', Available, Selected, SelectedValues>) => PArray<ToPlain<Selected>>

    grouped: (this: MS<'grouped', Available, Selected, SelectedValues>) => PRecord<ToPlain<Selected>[]>
    keyed: (this: MS<'keyed', Available, Selected, SelectedValues>) => PRecord<ToPlain<Selected>>
    frame: (this: MS<'frame', Available, Selected, SelectedValues>) => PArray<ToPlain<SelectedValues extends [infer F] ? F : any>>
}

type MSR<A extends MetaModel, S extends SelectModel = {}, SV = []> = MS<'records', A, S, SV>
type MSV<A extends MetaModel, S extends SelectModel = {}, SV = []> = MS<'values', A, S, SV>
type MSF<A extends MetaModel, S extends SelectModel = {}, SV = []> = MS<'frame', A, S, SV>


export type KeyPicker<A extends Record<string, any>, S extends Record<string, any>, Rest = never> = NestedKeyOf<A> | NestedKeyOf<S> | ((p: A & S, D: t.DMetaField) => GField) | Rest

export interface MS<V extends VTypes, A extends MetaModel, S extends SelectModel = ShallowModel<A>, SV = []> extends Selectors<S> {
    execute: FnMap<A, S, SV>[V]
    exec: this['execute']
    show: this['execute']
    dump: (opts?: { state?: boolean }) => this

    orderBy<U_ extends ([KeyPicker<A, S>, DDirection?][])>(...key: U_): MS<V, A, S, SV>
    orderBy<U extends ('ALL' | KeyPicker<A, S>)>(k: U, d?: DDirection): MS<V, A, S, SV>
    orderBy<Z>(_callback: (p: A & S, D: t.DMetaField) => Z, d?: DDirection): MS<V, A, S, SV>

    groupBy<G extends KeyPicker<A, S, 'ALL'>>(...keys: G[] | G[][] | (['GROUPING SETS', G[][]] | ['CUBE' | 'ROLLUP', G[]])): MS<'grouped', A, S, SV>

    countBy<G extends (KeyPicker<A, S>)>(key: G): MS<'values', A, S, [string, number]>


    keyBy<G extends (KeyPicker<A, S>)>(key: G): MS<'keyed', A, S, SV>

    minBy<G extends (KeyPicker<A, S>)>(key: G): MS<'row', A, S, SV>

    maxBy: this['minBy']

    where(fn: (p: A & S, D: t.DMetaField) => any): MS<V, A, S, SV>
    where(rawStr: string): MS<V, A, S, SV>

    having: this['where']
    distinctOn<G extends KeyPicker<A, S>>(...key: G[] | G[][]): MS<V, A, S, SV>

    // except<VV extends V, A extends MetaModel, S extends Selected>(a: MS<VV, A, S>): MS<VV, A, S>
    union<V2 extends VTypes, A2 extends MetaModel, S2 extends SelectModel>(a: MS<V2, A2, S2>): MS<V2, A & A2, S & S2>
    unionAll: this['union']
    unionByName: this['union']
    unionAllByName: this['union']
    except(a: MS<any, any, any>): MS<V, A, S, SV>
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


export interface FrameSelectors<G> {
    select<U extends DPrimitiveField>(fn: (p: FirstElement<G>, D: t.DMetaField) => U): MS<'frame', {}, {}, [U]>

}

export interface Selectors<P extends MetaModel> {

    // A: select()
    select(): MSR<P, ShallowModel<P>>
    // B: select('name', 'age')
    select<U extends (NestedKeyOf<P> & string)[]>(...keys: U & (NestedKeyOf<P>)[]): MSR<P, { [K in U[number] & keyof P]: P[K] }>
    // C select(e => [e.name, e.age])
    select<T______________1, T______________2>(fn: (p: P, D: t.DMetaField) => [T______________1, T______________2]): MSV<P, {}, [T______________1, T______________2]>
    select<T_________1, T_______2, T________3>(fn: (p: P, D: t.DMetaField) => [T_________1, T_______2, T________3]): MSV<P, {}, [T_________1, T_______2, T________3]>
    select<T_____1, T_____2, T_____3, T_____4>(fn: (p: P, D: t.DMetaField) => [T_____1, T_____2, T_____3, T_____4]): MSV<P, {}, [T_____1, T_____2, T_____3, T_____4]>
    select<T___1, T____2, T___3, T___4, T___5>(fn: (p: P, D: t.DMetaField) => [T___1, T____2, T___3, T___4, T___5]): MSV<P, {}, [T___1, T____2, T___3, T___4, T___5]>
    select<T__1, T__2, T__3, T__4, T__5, T__6>(fn: (p: P, D: t.DMetaField) => [T__1, T__2, T__3, T__4, T__5, T__6]): MSV<P, {}, [T__1, T__2, T__3, T__4, T__5, T__6]>
    select<T_1, T_2, T_3, T__4, T_5, T_6, T_7>(fn: (p: P, D: t.DMetaField) => [T_1, T_2, T_3, T__4, T_5, T_6, T_7]): MSV<P, {}, [T_1, T_2, T_3, T__4, T_5, T_6, T_7]>
    select<T_1, T_2, T3, T4, T5, T6, T_7, T_8>(fn: (p: P, D: t.DMetaField) => [T_1, T_2, T3, T4, T5, T6, T_7, T_8]): MSV<P, {}, [T_1, T_2, T3, T4, T5, T6, T_7, T_8]>
    select<A____, D, E, F, G, H, I, J, _____L>(fn: (p: P, D: t.DMetaField) => [A____, D, E, F, G, H, I, J, _____L]): MSV<P, {}, [A____, D, E, F, G, H, I, J, _____L]>
    select<A___, C, D, E, F, G, H, I, J, ___L>(fn: (p: P, D: t.DMetaField) => [A___, C, D, E, F, G, H, I, J, ___L]): MSV<P, {}, [A___, C, D, E, F, G, H, I, J, ___L]>
    select<A__, C, D, E, F, G, H, I, J, K, _L>(fn: (p: P, D: t.DMetaField) => [A__, C, D, E, F, G, H, I, J, K, _L]): MSV<P, {}, [A__, C, D, E, F, G, H, I, J, K, _L]>
    select<A, B, C, D, E, F, G, H, I, J, K, L>(fn: (p: P, D: t.DMetaField) => [A, B, C, D, E, F, G, H, I, J, K, L]): MSV<P, {}, [A, B, C, D, E, F, G, H, I, J, K, L]>
    // Cbis: select(e => [e.name, e.age, e.total,... 421 more items])
    select<T extends readonly GField[]>(fn: (p: P, D: t.DMetaField) => [...T]): MSV<P, {}, T>
    // D: select(e => e.age)
    select<U extends DPrimitiveField>(fn: (p: P, D: t.DMetaField) => U): MSF<P, {}, [U]>
    // F: select(e => `${e.name}__${e.total}`)
    select<U extends Primitive>(fn: (p: P, D: t.DMetaField) => U): MSF<P, {}, [PrimitiveField<U>]>
    // E: select(e => ({ name: e.name, age: e.age }))
    select<U extends SelectModel>(fn: (p: P & Record<string, any>, D: t.DMetaField) => U): MSR<P, ShallowModel<U>>

}


export type FromResultModel<Ressource extends keyof Models, C extends StrictCollection[] = [], P extends MetaModel = ModelFromCollectionList<Models, C>> = FromResult<Models, Ressource, C, P>

export interface FromResult<Mods extends Models, Ressource extends keyof Mods, C extends StrictCollection[] = [], P extends MetaModel = ModelFromCollectionList<Mods, C>> extends Selectors<P> {
    join<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>, A extends string>(table: K, alias: A, using: KeyIntersection<P, ModelForCollection<Mods, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>>>)
        : FromResult<Mods, Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>]>
    join<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>>(table: K, using: KeyIntersection<P, ModelForCollection<Mods, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>>>)
        : FromResult<Mods, Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>]>
    join<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>, A extends string>(table: K, alias: A, fn: (p: ToComp<ModelFromCollectionList<Mods, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>]>>, D: t.DMetaField) => any)
        : FromResult<Mods, Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>]>
    join<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>>(table: K, fn: (p: ToComp<ModelFromCollectionList<Mods, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>]>>, D: t.DMetaField) => any)
        : FromResult<Mods, Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>]>
    leftJoin: this['join']
    rightJoin: this['join']
    crossJoin: this['join']
    naturalJoin: this['join']
    innerJoin: this['join']

    execute(): ReturnType<Simplify<MSR<P, ShallowModelFromCollectionList<Models, C>>>['execute']>
    ensureSchemas(): Promise<void>
}


export interface UpdateResult<Mods extends Models, T extends keyof Mods, C extends StrictCollection[] = [], P extends MetaModel = ModelFromCollectionList<Mods, C>> {
    set<U extends SelectModel>(fn: (p: P & Record<string, any>, D: t.DMetaField) => U): UpdateResult<Mods, T, C, P>
    where<X>(fn: (p: ToComp<P>, D: t.DMetaField) => X): UpdateResult<Mods, T, C, P>
    where(...callback: string[]): UpdateResult<Mods, T, C, P>
    execute(): Promise<any>
    toSql(opts?: any): string
}

type ExtractSelectModel<T> = T extends MS<any, any, infer S, any> ? S : T extends Record<string, MS<any, any, any, any>> ? { [K in keyof T]: ExtractSelectModel<T[K]> } : SelectModel
type WithResult<Mods extends Models, T extends keyof Mods & string, Schema> = DBuilderResult<Mods & Record<T, Schema>, T>
type WithAccDB<Mods extends Models, T extends keyof Mods & string, Schema> = DBuilderResult<Mods & Record<T, Schema>, T>
type MSRecord = Record<string, MS<any, any, any>>

// type InitialMaterializedResult<C extends StrictCollection[]> = MS<'records', ModelFromCollectionList<C>>
export interface Withor<Mods extends Models, T extends keyof Mods & string> {
    with<O extends MSRecord>(fn: (accDB: DBuilderResult<Mods, T>) => O): WithResult<Mods, T, ExtractSelectModel<O>>

    with<O1 extends MSRecord, O2 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>>) => O2
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2>>

    with<O1 extends MSRecord, O2 extends MSRecord, O3 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>>) => O2,
        fn3: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O2>>) => O3
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2 & O3>>

    with<O1 extends MSRecord, O2 extends MSRecord, O3 extends MSRecord, O4 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>>) => O2,
        fn3: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O2>>) => O3,
        fn4: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O3>>) => O4
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2 & O3 & O4>>

    with<O1 extends MSRecord, O2 extends MSRecord, O3 extends MSRecord, O4 extends MSRecord, O5 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>>) => O2,
        fn3: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O2>>) => O3,
        fn4: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O3>>) => O4,
        fn5: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O4>>) => O5
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2 & O3 & O4 & O5>>
}



// Define the return type for DBuilder
export interface DBuilderResult<Mods extends Models, T extends keyof Mods & string> extends Withor<Mods, T> {
    ddb: DuckdbCon
    settings(s: Partial<t.DSettings>): DBuilderResult<Mods, T>
    fetchTables: () => Promise<[string, any][]>

    create(s: string, opts?: Partial<{ replace: boolean; ifNotExists: boolean }>): {
        as<U extends Record<string, any>>(...items: U[]): {
            execute(): Promise<any>
            toSql(opts?: any): string
        }
    }

    update<K1 extends Simplify<Extract<keyof Mods[T], string> | Extract<keyof Mods[''], string> & string>>(table: K1): UpdateResult<Mods, T, [DefaultizeCollection<{ catalog: T; uri: K1 }>]>

    from<K1 extends Simplify<Extract<keyof Mods[T], string> | Extract<keyof Mods[''], string>>, A extends string>(table: K1, alias: A):
        & FromResult<Mods, T, [DefaultizeCollection<{ catalog: T; uri: K1; alias: A }>]>
        & MS<'records', ModelFromCollectionList<Mods, DefaultizeCollection<{ catalog: T; uri: K1; alias: A }[]>>>

    from<K1 extends Extract<keyof Mods[''], string> | Extract<keyof Mods[T], string>>(table: K1):
        & FromResult<Mods, T, [DefaultizeCollection<{ catalog: T; uri: K1; alias: DeriveName<K1> }>]>
        & MS<'records', ModelFromCollectionList<Models, [{ catalog: T; uri: K1; alias: DeriveName<K1> }]>>


    // from<K extends keyof Mods['error']>(x: K): Mods['error'][K]

    from<TT extends keyof Mods, SS extends StrictCollection[]>(obj: FromResult<Mods, TT, SS>): FromResult<Mods, TT, SS>
    from<V1 extends VTypes, A1 extends MetaModel, S1 extends SelectModel = {}>(obj: MS<V1, A1, S1>): MS<V1, A1, S1>

    loadExtensions(...ext: string[]): DBuilderResult<Mods, T> // Use the defined type here
    // fetchSchema(id: string): Promise<Mods>
    describe(id: string): Promise<any>

}


declare function Buck<T extends keyof Models>(catalog: T, settings?: Partial<t.DSettings>): DBuilderResult<Models, ''>
// const r =
//     Buck('')
//         .from('xxx')
//         // .select(e => ({ xxx: e.database_name, yyy: 'e.database_size' }))
//         .where(e => e.)

// Overload for settings only
export declare function DBuilder(settings?: Partial<t.DSettings>): DBuilderResult<Models, ''>
export declare function DBuilder(): DBuilderResult<Models, ''>

// Updated DBuilder declaration with catalog
export declare function DBuilder<T extends TRessource>(catalog: T, settings?: Partial<t.DSettings>):
    T extends keyof Models ? DBuilderResult<Models, T> : DBuilderResult<Models, ''>
