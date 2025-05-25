import { Models } from '../.buck/table3'
import * as t from '../.buck/types'
import { DuckdbCon } from './bindings'
import { DDirection } from './build'
import { CopyToInterface } from './copy' // Import the interface
import { ToPlain } from './deep-map'

type StripSpecialChars<S> = S extends `${infer First}${infer Rest}` ? First extends AlphaNumeric ? `${First}${StripSpecialChars<Rest>}` : StripSpecialChars<Rest> : ''
type DeriveName<Path> = Path extends `${infer _}/${infer Rest}` ? DeriveName<Rest> : Path extends `${infer Name}.${string}` ? StripSpecialChars<Name> : StripSpecialChars<Path>

type TRessource = keyof Models | (string & {})

type AlphaNumeric = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '_'
export const deriveName = <T extends string>(value: T): DeriveName<T> => {
    const result = value.split('/').pop()?.split('.').shift() || value
    return result.replace(/[^a-zA-Z0-9_]/g, '') as DeriveName<T>
}

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
// Utility type to merge two types into a single object
export type Merge<T, U> = { [K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never }
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

export type ModelForCollection<C extends StrictCollection> = C extends { catalog: infer R; uri: infer T } // Use uri T for lookup
    ? R extends keyof Models ? T extends keyof Models[R] ? Models[R][T] : T extends keyof Models[''] ? Models[''][T] : {} : {}
    : {}

export type ModelFromCollectionList<C extends StrictCollection[]> = C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ? Simplify<Merge<Merge<{ [K in F['alias']]: ModelForCollection<F> }, ModelForCollection<F>>, ModelFromCollectionList<Rest>>>
    : {} // Base case should be an empty object for merging
// Recursive type to merge all models from collections, using alias as key
export type ShallowModelFromCollectionList<C extends StrictCollection[]> = C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ? ModelForCollection<F> & ModelFromCollectionList<Rest>
    : {} // Base case should be an empty object for merging

export type DRawField = t.DAnyField

export type DPrimitiveField = t.DVarcharField | t.DNumericField | t.DDateField | t.DBoolField
export type DNestedField = t.DArrayField | t.DStructField | t.DJsonField | t.DMapField
export type GField = DPrimitiveField | DNestedField | DRawField | t.DArrayField<DNestedField | DPrimitiveField>

export interface GenericRecursive<T> {
    [key: string]: T | GenericRecursive<T> | string | number
}
export type SelectModel = GenericRecursive<GField>
export type MetaModel = GenericRecursive<GField>


type ToComp<x> = x

export type VTypes = 'single' | 'records' | 'values' | 'grouped' | 'keyed' | 'row'

type PArray<X> = Promise<X[]>
type PRecord<X> = Promise<Record<string, X>>

type FnMap<Available extends MetaModel, Selected extends SelectModel = {}, SelectedValues = [], SelectedSingle extends GField = t.DAnyField> = {
    single: (this: MS<'single', Available, Selected, SelectedValues, SelectedSingle>) => PArray<ToPlain<SelectedSingle>>
    values: (this: MS<'values', Available, Selected, SelectedValues, SelectedSingle>) => PArray<ToPlain<SelectedValues>>
    records: (this: MS<'records', Available, Selected, SelectedValues, SelectedSingle>) => PArray<ToPlain<Selected>>

    grouped: (this: MS<'grouped', Available, Selected, SelectedValues, SelectedSingle>) => PRecord<ToPlain<Selected>[]>
    keyed: (this: MS<'keyed', Available, Selected, SelectedValues, SelectedSingle>) => PRecord<ToPlain<Selected>>
    row: (this: MS<'row', Available, Selected, SelectedValues, SelectedSingle>) => Promise<ToPlain<Selected>>
}

type MSR<A extends MetaModel, S extends SelectModel = {}, SV = [], SS extends GField = t.DAnyField> = MS<'records', A, S, SV, SS>
type MSV<A extends MetaModel, S extends SelectModel = {}, SV = [], SS extends GField = t.DAnyField> = MS<'values', A, S, SV, SS>
type MSS<A extends MetaModel, S extends SelectModel = {}, SV = [], SS extends GField = t.DAnyField> = MS<'single', A, S, SV, SS>


export type KeyPicker<A extends Record<string, any>, S extends Record<string, any>, Rest = never> = NestedKeyOf<A> | NestedKeyOf<S> | ((p: A & S, D: t.DMetaField) => GField) | Rest

export interface MS<V extends VTypes, A extends MetaModel, S extends SelectModel = {}, SV = [], SS extends GField = t.DAnyField> {
    execute: FnMap<A, S, SV, SS>[V]
    exec: this['execute']

    orderBy<U_ extends ([KeyPicker<A, S>, DDirection?][])>(...key: U_): MS<V, A, S, SV, SS>
    orderBy<U extends ('ALL' | KeyPicker<A, S>)>(k: U, d?: DDirection): MS<V, A, S, SV, SS>
    orderBy<Z>(_callback: (p: A & S, D: t.DMetaField) => Z, d?: DDirection): MS<V, A, S, SV, SS>

    groupBy<G extends KeyPicker<A, S, 'ALL'>>(...keys: G[] | G[][] | (['GROUPING SETS', G[][]] | ['CUBE' | 'ROLLUP', G[]])): MS<'grouped', A, S, SV, SS>

    countBy: this['groupBy']

    keyBy<G extends (KeyPicker<A, S>)>(key: G): MS<'keyed', A, S, SV, SS>

    minBy<G extends (KeyPicker<A, S>)>(key: G): MS<'single', A, S, SV, SS>

    maxBy: this['minBy']

    where(fn: (p: ToComp<Merge<A, S>>, D: t.DMetaComp) => any): MS<V, A, S, SV, SS>
    where(rawStr: string): MS<V, A, S, SV, SS>

    having: this['where']
    distinctOn<G extends KeyPicker<A, S>>(...key: G[] | G[][]): MS<V, A, S, SV, SS>

    // except<VV extends V, A extends MetaModel, S extends Selected>(a: MS<VV, A, S>): MS<VV, A, S>
    union<V2 extends VTypes, A2 extends MetaModel, S2 extends SelectModel>(a: MS<V2, A2, S2>): MS<V2, A & A2, S & S2>
    unionAll: this['union']
    unionByName: this['union']
    unionAllByName: this['union']
    except(a: MS<any, any, any>): MS<V, A, S, SV, SS>
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

export type Strish = string | {}
export type Primitive = null | undefined | string | number | boolean | symbol | bigint
export type IsPrimitive<T> = [T] extends [Primitive] ? true : false

type PrimitiveField<T> = T extends number ? t.DNumericField
    : T extends string ? t.DVarcharField
    : T extends boolean ? t.DBoolField
    : t.DAnyField



export interface FromResult<Ressource extends keyof Models, C extends StrictCollection[] = [], P extends MetaModel = ModelFromCollectionList<C>> {
    join<K extends Extract<keyof Models[Ressource], string> | Extract<keyof Models[''], string>, A extends string>(table: K, alias: A, fn?: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>]>>, D: t.DMetaComp) => any): FromResult<Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: A }>]>
    join<K extends Extract<keyof Models[Ressource], string> | Extract<keyof Models[''], string>>(table: K, fn: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>]>>, D: t.DMetaComp) => any): FromResult<Ressource, [...C, DefaultizeCollection<{ catalog: Ressource; uri: K; alias: DeriveName<K> }>]>
    leftJoin: this['join']
    rightJoin: this['join']
    crossJoin: this['join']
    naturalJoin: this['join']

    // A: select()
    select(): MSR<P, ShallowModelFromCollectionList<C>>
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
    select<U extends DPrimitiveField>(fn: (p: P, D: t.DMetaField) => U): MSS<P, {}, [], U>
    // F: select(e => `${e.name}__${e.total}`)
    select<U extends Primitive>(fn: (p: P, D: t.DMetaField) => U): MSS<P, {}, [], PrimitiveField<U>>
    // E: select(e => ({ name: e.name, age: e.age }))
    select<U extends SelectModel>(fn: (p: P & Record<string, any>, D: t.DMetaField) => U): MSR<P, U>

    // X: from('xxx').execute() === from('xxx').select().execute()
    execute(): ReturnType<Simplify<MSR<P, ShallowModelFromCollectionList<C>>>['execute']>
    ensureSchemas(): Promise<void>
}


export type InitialMaterializedResult<C extends StrictCollection[]> = MS<'records', ModelFromCollectionList<C>>

export interface UpdateResult<T extends keyof Models, C extends StrictCollection[] = [], P extends MetaModel = ModelFromCollectionList<C>> {
    set<U extends SelectModel>(fn: (p: P & Record<string, any>, D: t.DMetaField) => U): UpdateResult<T, C, P>
    where<X>(fn: (p: ToComp<P>, D: t.DMetaComp) => X): UpdateResult<T, C, P>
    where(...callback: string[]): UpdateResult<T, C, P>
    execute(): Promise<any>
    toSql(opts?: any): string
}

// Define the return type for DBuilder
type DBuilderResult<T extends keyof Models> = {
    ddb: DuckdbCon
    settings(s: Partial<t.DSettings>): DBuilderResult<T>

    create(s: string, opts?: Partial<{ replace: boolean; ifNotExists: boolean }>): {
        as<U extends Record<string, any>>(...items: U[]): {
            execute(): Promise<any>
            toSql(opts?: any): string
        }
    }

    update<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string> & string>>(table: K1): UpdateResult<T, [DefaultizeCollection<{ catalog: T; uri: K1 }>]>

    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>>, A extends string>(table: K1, alias: A):
        & FromResult<T, [DefaultizeCollection<{ catalog: T; uri: K1; alias: A }>]>
        & InitialMaterializedResult<[DefaultizeCollection<{ catalog: T; uri: K1; alias: A }>]> // Use the alias

    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>>>(table: K1):
        & FromResult<T, [DefaultizeCollection<{ catalog: T; uri: K1; alias: DeriveName<K1> }>]>
        & InitialMaterializedResult<[DefaultizeCollection<{ catalog: T; uri: K1; alias: DeriveName<K1> }>]> // Use the alias

    from<K extends keyof Models['error']>(x: K): Models['error'][K]

    loadExtensions(...ext: string[]): DBuilderResult<T> // Use the defined type here
    fetchSchema(id: string): Promise<Models>
    describe(id: string): Promise<any>
}

// Overload for settings only
export declare function DBuilder(settings?: Partial<t.DSettings>): DBuilderResult<''>
export declare function DBuilder(): DBuilderResult<''>

// Updated DBuilder declaration with catalog
export declare function DBuilder<T extends TRessource>(catalog: T, settings?: Partial<t.DSettings>): DBuilderResult<T>
// DBuilder()('s')
