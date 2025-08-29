import { Models } from '../.buck/models'
import * as t from '../.buck/types'
import { DuckdbCon } from '../core'
import { DDirection } from './typedef'
import { CopyToInterface } from './copy'
import { FromPlainDict, ToCompDict, ToPlain } from './deep-map'
import { Flatten, KeyIntersection, NestedKeyOf, PArray, PRecord, Primitive, TripleMerge, TripleUnion } from './generic-utils'
import type { DeriveName } from './utils'

type TRessource = keyof Models | (string & {})

type StrictCollection = { catalog: string; uri: string; alias: string }
// Utility type to merge two types into a frame object

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

type MergedModel<Mods extends Models, C extends StrictCollection[]> =
    C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]]
    ? TripleUnion<{ [K in F['alias']]: TFlag & ModelForCollection<Mods, F> }, ModelForCollection<Mods, F>, MergedModel<Mods, Rest>>
    : {} // Base case should be an empty object for merging
// Recursive type to merge all models from collections, using alias as key
type ShallowMergedModel<Mods extends Models, C extends StrictCollection[]> = C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ? ModelForCollection<Mods, F> & MergedModel<Mods, Rest>
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


type FnMap<A extends MetaModel, GF extends t.DMetaField, S extends SelectModel = {}, SV = []> = {
    row: () => Promise<SV extends [] ? ToPlain<S> : ToPlain<SV>>
    values: () => PArray<ToPlain<SV>>
    records: () => PArray<ToPlain<S>>
    grouped: () => PRecord<ToPlain<S>[]>
    keyed: () => PRecord<ToPlain<S>>
    frame: () => PArray<ToPlain<SV extends [infer F] ? F : any>>
}

type MSR<A extends MetaModel, GF extends t.DMetaField, S extends SelectModel = {}, SV = []> = MS<'records', GF, A, S, SV>
type MSV<A extends MetaModel, GF extends t.DMetaField, S extends SelectModel = {}, SV = []> = MS<'values', GF, A, S, SV>
type MSF<A extends MetaModel, GF extends t.DMetaField, S extends SelectModel = {}, SV = []> = MS<'frame', GF, A, S, SV>


type KeyPicker<A extends Record<string, any>, S extends Record<string, any>, Rest = never> = NestedKeyOf<A> | NestedKeyOf<S> | ((p: A & S, D: t.DMetaField) => GField) | Rest
type Awaited<T> = T extends PRecord<infer Z> ? (Z extends [infer D] ? D : Z) : T extends PArray<infer X> ? X : T extends Promise<infer M> ? M : never
// type Awaited<T> = T extends Promise<infer U> ? U extends Array<infer U2> ? U2 : U extends Record<string, infer V> ? V : U : T



export interface MS<V extends VTypes, GF extends t.DMetaField, A extends MetaModel, S extends SelectModel = ShallowModel<A>, SV = []> extends Selectors<S, GF> {
    returnType: Awaited<ReturnType<this['execute']>>
    // compType: 

    execute: FnMap<A, GF, S, SV>[V]
    exec: this['execute']
    run: this['execute']
    show: this['execute']
    dump: (opts?: { state?: boolean }) => this

    orderBy<U_ extends ([KeyPicker<A, S>, DDirection?][])>(...key: U_): MS<V, GF, A, S, SV>
    orderBy<U extends ('ALL' | KeyPicker<A, S>)>(k: U, d?: DDirection): MS<V, GF, A, S, SV>
    orderBy<Z>(_callback: (p: A & S, D: GF) => Z, d?: DDirection): MS<V, GF, A, S, SV>
    groupBy<G extends KeyPicker<A, S, 'ALL'>>(...keys: G[] | G[][] | (['GROUPING SETS', G[][]] | ['CUBE' | 'ROLLUP', G[]])): MS<'grouped', GF, A, S, SV>
    countBy<G extends (KeyPicker<A, S>)>(key: G): MS<'values', GF, A, S, [string, number]>

    count(): Resultor<[number]>

    keyBy<G extends (KeyPicker<A, S>)>(key: G): MS<'keyed', GF, A, S, SV>
    minBy<G extends (KeyPicker<A, S>)>(key: G): MS<'row', GF, A, S, SV>
    maxBy: this['minBy']
    where(fn: (p: ToCompDict<A & S>, D: t.DMetaComp) => any): MS<V, GF, A, S, SV>
    where(rawStr: string): MS<V, GF, A, S, SV>
    having: this['where']
    distinctOn<G extends KeyPicker<A, S>>(...key: G[] | G[][]): MS<V, GF, A, S, SV>

    union<V2 extends VTypes, A2 extends MetaModel, S2 extends SelectModel>(a: MS<V2, GF, A2, S2>): MS<V2, GF, A & A2, S & S2>
    unionAll: this['union']
    unionByName: this['union']
    unionAllByName: this['union']
    except(a: MS<any, any, any, any>): MS<V, GF, A, S, SV>
    exceptAll: this['except']
    intersect: this['except']
    intersectAll: this['except']

    limit: (n: number) => this
    offset: (n: number) => this
    context: (cb: Record<string, any>) => this
    sample: (n: number | `${number}%`) => this
    toSql(opts?: { trim: boolean }): string
    copyTo: CopyToInterface<A, S>['to'] // Pass available fields to CopyToInterface
}


export interface UpdateResult<Mods extends Models, T extends keyof Mods & string, C extends StrictCollection[] = [], P extends MetaModel = MergedModel<Mods, C>> {
    set<U extends SelectModel>(fn: (p: P & Record<string, any>, D: t.DMetaField) => U): UpdateResult<Mods, T, C, P>
    where<X>(fn: (p: P, D: t.DMetaField) => X): UpdateResult<Mods, T, C, P>
    where(...callback: string[]): UpdateResult<Mods, T, C, P>
}

type ExtractSelectModel<T> = T extends MS<any, any, any, infer S, any> ? S : T extends Record<string, MS<any, any, any, any, any>> ? { [K in keyof T]: ExtractSelectModel<T[K]> } : SelectModel
type WithResult<Mods extends Models, T extends keyof Mods & string, Schema, GF extends t.DMetaField> = DBuilderResult<Mods & Record<T, Schema>, T, GF>
type WithAccDB<Mods extends Models, T extends keyof Mods & string, Schema, GF extends t.DMetaField> = DBuilderResult<Mods & Record<T, Schema>, T, GF>
type MSRecord = Record<string, MS<any, any, any, any, any>>

// type InitialMaterializedResult<C extends StrictCollection[]> = MS<'records', MergedModel<C>>
export interface Withor<Mods extends Models, T extends keyof Mods & string, GF extends t.DMetaField = t.DMetaField> {
    with<O extends MSRecord>(fn: (accDB: DBuilderResult<Mods, T, GF>) => O): WithResult<Mods, T, ExtractSelectModel<O>, GF>

    with<O1 extends MSRecord, O2 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T, GF>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>, GF>) => O2
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2>, GF>

    with<O1 extends MSRecord, O2 extends MSRecord, O3 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T, GF>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>, GF>) => O2,
        fn3: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O2>, GF>) => O3
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2 & O3>, GF>

    with<O1 extends MSRecord, O2 extends MSRecord, O3 extends MSRecord, O4 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T, GF>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>, GF>) => O2,
        fn3: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O2>, GF>) => O3,
        fn4: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O3>, GF>) => O4
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2 & O3 & O4>, GF>

    with<O1 extends MSRecord, O2 extends MSRecord, O3 extends MSRecord, O4 extends MSRecord, O5 extends MSRecord>(
        fn1: (accDB: DBuilderResult<Mods, T, GF>) => O1,
        fn2: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O1>, GF>) => O2,
        fn3: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O2>, GF>) => O3,
        fn4: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O3>, GF>) => O4,
        fn5: (accDB: WithAccDB<Mods, T, ExtractSelectModel<O4>, GF>) => O5
    ): WithResult<Mods, T, ExtractSelectModel<O1 & O2 & O3 & O4 & O5>, GF>
}


interface Resultor<T> {
    toSql: (opts?: { trim: boolean }) => string,
    execute: () => Promise<T>
    exec: this['execute']
    run: this['execute']
    show: this['execute']
    dump: (opts?: { state?: boolean }) => this
}


// Option 3: Use constructor check to detect plain objects
export type NestedKey42<ObjectType extends Record<string, any>> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends TFlag | t.DStructField //{ constructor: ObjectConstructor } 
    ? `${Key}.${NestedKey42<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)]

type Split<S extends string, D extends string = "."> =
    S extends `${infer Head}${D}${infer Tail}`
    ? [Head, ...Split<Tail, D>]
    : [S];

type Get<T, K extends readonly string[]> =
    K extends [infer Head extends keyof T, ...infer Rest extends string[]]
    ? Get<T[Head], Rest>
    : T;

type Project<T, Keys extends readonly string[]> = Flatten<{
    [K in Keys[number]as K extends `${string}.${infer Leaf}` ? Leaf : K]:
    Get<T, Split<K>>
}>;

export interface Selectors<AV extends MetaModel, GF extends t.DMetaField> {
    // A: select()
    select(): MSR<AV, GF, ShallowModel<AV>>
    // B: select('name', 'age')
    select<U extends readonly (NestedKey42<AV>)[]>(...keys: U):
        MSR<AV, GF, Project<AV, U>>
    // { [K in U[number] & keyof P]: P[K] } //MSR<P, GF, { [K in U[number] & keyof P]: P[K] }>
    // select<U extends (NestedKey42<A> & string)[]>(...keys: U & (NestedKey42<A>)[]): DeepPick<A, MapStringArrayKeepBeforeDot<U>> //MSR<P, GF, { [K in U[number] & keyof P]: P[K] }>
    // C select(e => [e.name, e.age])
    select<T______________1, T______________2>(fn: (p: AV, D: GF) => [T______________1, T______________2]): MSV<AV, GF, {}, [T______________1, T______________2]>
    select<T_________1, T_______2, T________3>(fn: (p: AV, D: GF) => [T_________1, T_______2, T________3]): MSV<AV, GF, {}, [T_________1, T_______2, T________3]>
    select<T_____1, T_____2, T_____3, T_____4>(fn: (p: AV, D: GF) => [T_____1, T_____2, T_____3, T_____4]): MSV<AV, GF, {}, [T_____1, T_____2, T_____3, T_____4]>
    select<T___1, T____2, T___3, T___4, T___5>(fn: (p: AV, D: GF) => [T___1, T____2, T___3, T___4, T___5]): MSV<AV, GF, {}, [T___1, T____2, T___3, T___4, T___5]>
    select<T__1, T__2, T__3, T__4, T__5, T__6>(fn: (p: AV, D: GF) => [T__1, T__2, T__3, T__4, T__5, T__6]): MSV<AV, GF, {}, [T__1, T__2, T__3, T__4, T__5, T__6]>
    select<T_1, T_2, T_3, T__4, T_5, T_6, T_7>(fn: (p: AV, D: GF) => [T_1, T_2, T_3, T__4, T_5, T_6, T_7]): MSV<AV, GF, {}, [T_1, T_2, T_3, T__4, T_5, T_6, T_7]>
    select<T_1, T_2, T3, T4, T5, T6, T_7, T_8>(fn: (p: AV, D: GF) => [T_1, T_2, T3, T4, T5, T6, T_7, T_8]): MSV<AV, GF, {}, [T_1, T_2, T3, T4, T5, T6, T_7, T_8]>
    select<A____, D, E, F, G, H, I, J, _____L>(fn: (p: AV, D: GF) => [A____, D, E, F, G, H, I, J, _____L]): MSV<AV, GF, {}, [A____, D, E, F, G, H, I, J, _____L]>
    select<A___, C, D, E, F, G, H, I, J, ___L>(fn: (p: AV, D: GF) => [A___, C, D, E, F, G, H, I, J, ___L]): MSV<AV, GF, {}, [A___, C, D, E, F, G, H, I, J, ___L]>
    select<A__, C, D, E, F, G, H, I, J, K, _L>(fn: (p: AV, D: GF) => [A__, C, D, E, F, G, H, I, J, K, _L]): MSV<AV, GF, {}, [A__, C, D, E, F, G, H, I, J, K, _L]>
    select<A, B, C, D, E, F, G, H, I, J, K, L>(fn: (p: AV, D: GF) => [A, B, C, D, E, F, G, H, I, J, K, L]): MSV<AV, GF, {}, [A, B, C, D, E, F, G, H, I, J, K, L]>
    // Cbis: select(e => [e.name, e.age, e.total,... 421 more items])
    select<T extends readonly GField[]>(fn: (p: AV, D: GF) => [...T]): MSV<AV, GF, {}, T>
    // D: select(e => e.age)
    select<U extends DPrimitiveField>(fn: (p: AV, D: GF) => U): MSF<AV, GF, {}, [U]>
    // F: select(e => `${ e.name }__${ e.total } `)
    select<U extends Primitive>(fn: (p: AV, D: GF) => U): MSF<AV, GF, {}, [PrimitiveField<U>]>
    // E: select(e => ({ name: e.name, age: e.age }))
    // select<U extends TFlag>(fn: (p: AV & Record<string, any>, D: GF) => U): 42 //''
    select<U extends SelectModel>(fn: (p: AV, D: GF) => U):
        // U extends Record<string, infer FF extends TFlag> ? MSR<AV, GF, Omit<FF, keyof TFlag>> :
        MSR<AV, GF, FromPlainDict<ShallowModel<U>>>

}


export type FromResultModel<Ressource extends keyof Models, C extends StrictCollection[] = [], GF extends t.DMetaField = t.DMetaField, P extends MetaModel = MergedModel<Models, C>> = FromResult<Models, Ressource, C, GF, P>
export type From<Ressource extends keyof Models, S extends StrictCollection[]> = FromResultModel<Ressource, S>

type ToModel<Mods extends Models, Ressource extends string, Uri extends string, A extends string = DeriveName<Uri>> =
    MergedModel<Mods, [{ catalog: Ressource; uri: Uri; alias: A }]>
type PushCollection<C extends StrictCollection[], Ressource extends string, Uri extends string, A extends string = DeriveName<Uri>> =
    [...C, { catalog: Ressource; uri: Uri; alias: A }]


type ModKeys<Mods extends Models, Ressource extends keyof Mods & string> = Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>

// Utility type to dynamically add schema to Models
type AddSchemaToModels<Mods extends Models, TableName extends string, TSchema extends MetaModel> =
    Mods & { '': Mods[''] & Record<TableName, TSchema> }


export interface FromResult<Mods extends Models, Ressource extends keyof Mods & string, C extends StrictCollection[] = [], GF extends t.DMetaField = t.DMetaField, P extends MetaModel = MergedModel<Mods, C>> extends Selectors<P, GF> {
    join<K extends ModKeys<Mods, Ressource> /*| (string & {})*/, A extends string = DeriveName<K>>(
        table: K,
        alias?: A,
    ): {
        using: (o: KeyIntersection<P, ToModel<Mods, Ressource, K, A>>) =>
            K extends ModKeys<Mods, Ressource> ?
            FromResult<Mods, Ressource, PushCollection<C, Ressource, K, A>, GF>
            : FromResult<Mods, Ressource, PushCollection<C, '', '', A>, GF>
        on: (fn: (p: MergedModel<Mods, PushCollection<C, Ressource, K, A>>, D: GF) => any) =>
            K extends ModKeys<Mods, Ressource> ?
            FromResult<Mods, Ressource, PushCollection<C, Ressource, K, A>, GF>
            : FromResult<Mods, Ressource, PushCollection<C, '', '', A>, GF>
    },

    // Type override overload for join - allows specifying custom schema for table
    join<TSchema extends MetaModel>(table: string, alias?: string): {
        using: (o: KeyIntersection<P, TSchema>) =>
            FromResult<AddSchemaToModels<Mods, string, TSchema>, Ressource, PushCollection<C, '', string, string>, GF>
        on: (fn: (p: MergedModel<AddSchemaToModels<Mods, string, TSchema>, PushCollection<C, '', string, string>>, D: GF) => any) =>
            FromResult<AddSchemaToModels<Mods, string, TSchema>, Ressource, PushCollection<C, '', string, string>, GF>
    }

    leftJoin: this['join']
    rightJoin: this['join']
    naturalJoin: this['join']
    innerJoin: this['join']

    crossJoin<K extends Extract<keyof Mods[Ressource], string> | Extract<keyof Mods[''], string>, A extends string = DeriveName<K>>(table: K, a?: A)
        : FromResult<Mods, Ressource, PushCollection<C, Ressource, K>, GF>

    execute(): ReturnType<Flatten<MSR<P, GF, ShallowMergedModel<Models, C>>>['execute']>
    ensureSchemas(): Promise<void>
}



export declare function Buck<T extends keyof Models>(catalog: T, settings?: Partial<t.DSettings>): DBuilderResult<Models, ''>

// Define the return type for DBuilder
export interface DBuilderResult<Mods extends Models, Ressource extends keyof Mods & string, GF extends t.DMetaField = t.DMetaField> extends Withor<Mods, Ressource, GF> {
    ddb: DuckdbCon
    settings(s: Partial<t.DSettings>): DBuilderResult<Mods, Ressource, GF>
    fetchTables: () => Promise<[string, any][]>

    macros: <U extends Record<string, (...args: any[]) => any>>(
        fn: (D: t.DMetaField & Record<string, (...args: any[]) => any>) => U
    ) => DBuilderResult<Mods, '', U & GF>

    create(s: string, opts?: Partial<{ replace: boolean; ifNotExists: boolean }>): {
        as<U extends Record<string, any>>(...items: U[]): Resultor<any>
    }

    update<K1 extends (ModKeys<Mods, Ressource>) & string>(table: K1): UpdateResult<Mods, Ressource, PushCollection<[], Ressource, K1>> & Resultor<any>
    
    from<K1 extends ModKeys<Mods, Ressource> | (string & {}), A extends string = DeriveName<K1>>(table: K1, alias?: A):
        K1 extends ModKeys<Mods, Ressource> ?
        (FromResult<Mods, Ressource, PushCollection<[], Ressource, K1, A>, GF> & MS<'records', GF, MergedModel<Mods, PushCollection<[], Ressource, K1, A>>>)
        : (FromResult<Mods, Ressource, PushCollection<[], '', '', A>, GF> & MS<'records', GF, MergedModel<Mods, PushCollection<[], '', '', A>>>)
    // from(table: string): 123
    // from<K extends keyof Mods['error']>(x: K): Mods['error'][K]

    from<MM extends Mods, TT extends keyof Mods & string, SS extends StrictCollection[]>(obj: FromResult<MM, TT, SS, GF>): FromResult<Mods, TT, SS, GF>
    from<V1 extends VTypes, A1 extends MetaModel, S1 extends SelectModel = {}>(obj: MS<V1, GF, A1, S1>): MS<V1, GF, A1, S1>
    
    // Type override overload - allows specifying custom schema for table
    // This dynamically adds Mods[''][table] = TSchema to the Models type
    // Must come last to ensure proper overload resolution
    from<TSchema extends MetaModel>(table: string, alias?: string):
        FromResult<AddSchemaToModels<Mods, string, TSchema>, Ressource, PushCollection<[], '', string, string>, GF> & MS<'records', GF, MergedModel<AddSchemaToModels<Mods, string, TSchema>, PushCollection<[], '', string, string>>>

    loadExtensions(...ext: string[]): DBuilderResult<Mods, Ressource, GF> // Use the defined type here
    // fetchSchema(id: string): Promise<Mods>
    describe(id: string): Promise<any>
    run(sql: string): Promise<any>
}

// Overload for settings only
export declare function DBuilder(settings?: Partial<t.DSettings>): DBuilderResult<Models, ''>
export declare function DBuilder(): DBuilderResult<Models, ''>

// Updated DBuilder declaration with catalog
export declare function DBuilder<T extends TRessource>(catalog: T, settings?: Partial<t.DSettings>):
    T extends keyof Models ? DBuilderResult<Models, T> : DBuilderResult<Models, ''>



