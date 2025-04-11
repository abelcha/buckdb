import { DeriveName, DField, DRawComp, DRawField, MapDeepCompType, MapInferredType, TypeEq } from "./utils"
import * as t from "./.buck/types"
// import { IsEqual, Simplify } from "type-fest";
`--sql SELECT
- selectFields (...basetable, baseTableAlias + joinsTables)
- condition (...basetable, baseTableAlias + joinsTables + selectedFields return )
- result selectfields returns
`

type DMetaComp = t.DAggregateComp & t.DGlobalComp
type DMetaField = t.DAggregateField & t.DGlobalField & { raw: (template: TemplateStringsArray) => DRawField }


type peopleModel = {
    firstname: t.DVarcharField,
    age: t.DNumericField,
    total: t.DNumericField,
    city_id: t.DVarcharField,
}
type cityModel = {
    id: t.DVarcharField,
    geo: {
        lng: t.DNumericField,
        lat: t.DNumericField,
    }
    zipcode: t.DNumericField,
    countryCode: t.DVarcharField,
}
type countryModel = {
    id: t.DVarcharField,
    countryCode: t.DVarcharField,
    name: t.DVarcharField,
}
interface GenericRecursive<T> {
    [key: string]: T | GenericRecursive<T>;
}
type SelectModel = GenericRecursive<DField>
type MetaModel = GenericRecursive<DField>

type PartOf<T> = T extends SelectModel ? true : false
type ress = PartOf<peopleModel>
type ress4 = PartOf<{ lol: 123 }>

type Models = {
    ['']: {
        ['https://whatever/people.json']: peopleModel,
        ['https://whatever/country.json']: countryModel,
        ['https://whatever/city.json']: cityModel,
    },
    ['s3://insee.ddb']: {
        cities: cityModel,
        countries: countryModel,
        peoples: peopleModel
    },
}

type Collection = { catalog?: string, uri: string, alias?: string }
type StrictCollection = { catalog: string, uri: string, alias: string }
// Utility type to merge two types into a single object
type Merge<T, U> = {
    [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};
type ResolveCollection<C extends StrictCollection> = C extends { catalog: infer T, uri: infer U } ?
    T extends keyof Models ?
    U extends keyof Models[T] ?
    C :
    U extends keyof Models[''] ?
    Merge<C, { catalog: '' }> :
    C : C : C


type DefaultizeCollection<C> = // Renamed 'Collection' to 'C' for clarity
    // 1. If all properties (catalog, uri, alias) are present, return as is.
    C extends { catalog: string, uri: string, alias: string } ? C :
    // 2. If alias is missing, infer uri as T, merge C with { alias: DeriveName<T> }.
    C extends { catalog: string, uri: infer T extends string } ? Merge<C, { alias: DeriveName<T> }> :
    C extends { alias: string, uri: string } ? Merge<C, { catalog: '' }> :
    // 3. If catalog and alias are missing, infer uri as T, merge C with { catalog: '', alias: DeriveName<T> }.
    C extends { uri: infer T extends string } ? Merge<C, { catalog: '', alias: DeriveName<T> }> :
    // 4. Otherwise, it's not a valid input structure.
    never;


type DefaultizeCollectionList<C extends Collection[], R extends StrictCollection[] = []> =
    C extends [infer F extends Collection, ...infer Rest extends Collection[]] ?
    DefaultizeCollectionList<Rest, [...R, ResolveCollection<DefaultizeCollection<F>>]> :
    R // Return the accumulated StrictCollection array R


// Helper type to check type equality
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;

// ExpectIsEqual type that triggers a TypeScript error when false
type ExpectIsEqual<A, B> = IsEqual<A, B> extends true
    ? true // Passes if types are equal
    : { error: "Types are not equal", expected: A, received: B }; // Triggers error if types are not equal
type IsTrue<T extends true> = T;

// type ExpectEqual<A, B > = IsEqual<A, B> extends true


type ModelForCollection<C extends StrictCollection> = C extends { catalog: infer R, uri: infer T } ? // Use uri T for lookup
    R extends keyof Models ?
    T extends keyof Models[R] ?
    Models[R][T] :
    {} : // Return never if resource name R is invalid
    {} : // Return never if uri T is invalid
    {} // Should not happen if C extends StrictCollection



type ModelFromCollectionList<C extends StrictCollection[]> =
    C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ?
    ModelForCollection<F> & { [K in F['alias']]: ModelForCollection<F> } & ModelFromCollectionList<Rest> :
    {} // Base case should be an empty object for merging
// Recursive type to merge all models from collections, using alias as key

type qsdsqsd = ModelFromCollectionList<uuuu>

type ___x = IsTrue<ExpectIsEqual<
    DefaultizeCollection<{ uri: 'https://whatever/people.json', alias: 'PPL' }>,
    { catalog: '', uri: 'https://whatever/people.json', alias: 'PPL' }>
> &
    IsTrue<ExpectIsEqual<
        DefaultizeCollection<{ catalog: 's3://insee.ddb', uri: 'cities' }>,
        { catalog: 's3://insee.ddb', uri: 'cities', alias: 'cities' }>
    >
    &
    IsTrue<ExpectIsEqual<
        DefaultizeCollection<{ uri: 'https://whatever/people.json' }>,
        { catalog: '', uri: 'https://whatever/people.json', alias: 'people' }>
    >
    &
    IsTrue<ExpectIsEqual<
        ResolveCollection<DefaultizeCollection<{
            catalog: 's3://insee.ddb', uri: 'https://whatever/people.json'
        }>>
        , { catalog: '', uri: 'https://whatever/people.json', alias: 'people' }>>

// const z = (xx: qsdsqsd[]) => 
// type xx = 


type dftz = DefaultizeCollection<{ catalog: 's3://insee.ddb', uri: 'cities' }>

type qsdqsd = ModelForCollection<dftz>
// type dftz = DefaultizeCollection<{ catalog: 'https://whatever/people.json', uri: 'people.json' }>

// Corrected uri from 'cities' to 'city' to match Models definition
type uuuu = DefaultizeCollectionList<[{ uri: 'https://whatever/people.json', alias: 'ppl' }, { catalog: 's3://insee.ddb', uri: 'cities' }]>

type result = IsTrue<TypeEq<qsdsqsd, peopleModel & { ppl: peopleModel } & cityModel & { cities: cityModel }>>
// type result2 = IsTrue<ExpectIsEqual<qsdsqsd, { ppl: peopleModel, city: cityModel }>>; // Corrected expectation and set to true


// type ModelKey<T extends keyof Models[T extends keyof Models] | keyof Models[''] & string> = T


type ToExecuted<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField | string> ? {
    [P in keyof SelectedFields]: SelectedFields[P] extends DField ? (SelectedFields[P] extends { [t.sInferred]: infer V } ? V : SelectedFields[P]) :
    SelectedFields[P] extends SelectModel ? ToExecuted<SelectedFields[P]> : never
} : never;


type ToComp<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField | string> ? {
    [P in keyof SelectedFields]: SelectedFields[P] extends DField ? (SelectedFields[P] extends { [t.sComptype]: infer V } ? V : never) :
    SelectedFields[P] extends SelectModel ? ToComp<SelectedFields[P]> : never
} : never;


type rrrzz = ToExecuted<peopleModel & { city: cityModel }>
type rrrdzz = ToComp<peopleModel & { city: cityModel }>


type MState = {
    available: MetaModel,
    // selected: SelectModel,
    selected: Record<string, any>, // Relaxed constraint to allow Pick result
    // selected: Record<string, DField>,
    // grouped?: DField | string,
    condition?: string[],
    // limit?: number,
    // orderBy?: string[],
}

interface MaterializedResult<S extends MState, C extends StrictCollection[]> {
    // execute(): Promise<MapInferredType<ModelFromCollectionList<C>>>
    groupBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaComp) => Z): MaterializedResult<S & { grouped: Z }, C>
    where<X>(fn: (p: ToComp<S['available'] & S['selected']>, D: DMetaComp) => X): MaterializedResult<S, C & [...S['condition'], X]>
    execute(): Promise<ToExecuted<S['selected']>[]>
}

type PickRecursive<T, U extends (keyof T)[]> = {
    [K in U[number]]: T[K];
}

interface FromResult<T extends keyof Models & string, C extends StrictCollection[] = []> {
    join<K extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>, A extends string>(table: K, alias: A, fn?: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: T, uri: K, alias: A }>]>>, D: DMetaComp) => any):
        FromResult<T, [...C, DefaultizeCollection<{ catalog: T, uri: K, alias: A }>]>;
    join<K extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>, Z extends string>(table: K, fn?: (p: ToComp<ModelFromCollectionList<[...C, DefaultizeCollection<{ catalog: T, uri: K, alias: DeriveName<K> }>]>>, D: DMetaComp) => any):
        FromResult<T, [...C, DefaultizeCollection<{ catalog: T, uri: K, alias: DeriveName<K> }>]>;
    leftJoin: this['join'],
    rightJoin: this['join'],
    select<U extends (keyof ModelFromCollectionList<C>)[]>(...keys: U & (keyof ModelFromCollectionList<C>)[]): MaterializedResult<{
        selected: { [K in U[number] & keyof ModelFromCollectionList<C>]: ModelFromCollectionList<C>[K] },
        available: ModelFromCollectionList<C>,
    }, C>
    select<U extends SelectModel>(fn: (p: ModelFromCollectionList<C>, D: DMetaField) => U): MaterializedResult<{
        selected: U,
        available: ModelFromCollectionList<C>,
    }, C>
    // whatever(a: string, b   : number): string
}


declare function database<T extends keyof Models>(catalog: T): {
    from<K1 extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>, A extends string>(table: K1, alias: A): FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: A }>]>;
    from<K1 extends Extract<keyof Models[T], string> | Extract<keyof Models[''], string>>(table: K1): FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: DeriveName<K1> }>]>;
    // from<T extends keyof Models & string, FR extends FromResult<T>>(table: FR): FR;
};

const from = database('').from

database('s3://insee.ddb').from('peoples').join('cities').join('countries')
    .select('age', 'firstname', 'countryCode', 'countries')
    // .select(e => ({ age: e.age.abs() }))
    .where(e => e.age === 123)
    .execute()
    .then(([e]) => e.firstname && e.countries)

from('https://whatever/people.json')
    .select((e, D) => ({ c: D.count('*'), avg: D.avg(e.age), city: e.city_id }))
    .where(e => e.age > 12)
    .groupBy(e => e.city_id)

from('https://whatever/people.json', 'pppl')
    .join('https://whatever/city.json', ({ city, pppl }) => city.id.substring(0, 4) === pppl.city_id.concat(''))
    .select(e => ({ zage: e.pppl.age.abs() }))
    .where(e => e.zage > 12 && e.city_id && e.pppl.total > 12 && e.city.geo.lng > 30 && e.city.id === 'arez')

const qqqqqq = database('s3://insee.ddb')
    .from('countries', 'c')
    .select(e => ({ zage: e.c.name, ddd: e.id }))
    // .where(e => )

// from(qqqqqq)
//     // .join()
//     .select(e => e.)


from('https://whatever/people.json')
    .select((e, D) => ({
        uuu: D.raw`select whatever from test`,
        zzz: D.raw`select whatever from test`,
    }))
    .where(e => e.uuu > 'lol')
    .groupBy(e => e.city_id)


// function read_csv<T>(url: T extends string ? T : never, options ): T {
//     return url as T
// }

from('https://whatever/people.json')
.join('https://whatever/country.json')
// .select('city_id', '')
.select((e, D) => ({
    uuu: D.raw`select whatever from test`,
    nn: e.age,
    zzz: D.generate_series(12, 30, 1)
}))
.where(e => e.age % 4 === 3)

const zzdd = (
    database('s3://insee.ddb')
        .from('peoples')
        // Corrected typo: e.p.city_id -> e.peoples.city_id
        // Removed non-existent .cardinality() call
        .join('cities', e => e.cities.id == e.peoples.city_id)
        .leftJoin('countries', 'C', e => e.C.id === e.cities.countryCode)
        .select((e, D) => ({
            zzz: e.peoples.age,
            llll: e.cities.countryCode,
            cc: e.countryCode,
            country: e.C,
            zz: e.age,
            uuu: D.raw`select whatever from test`,
            rr: e.firstname,
            ggg: D.max(e.age, e.cities.zipcode),
            h3_index: D.h3_latlng_to_cell(e.cities.geo.lat, e.cities.geo.lng, 5)
        }))
        .where((e, D) => e.cities.countryCode === 'FR' && e.h3_index > 123 && e.uuu === 'lol')
        .groupBy(e => e.zz)
        .execute()
        .then(([e]) => e && e.country.name && e.h3_index && e.uuu)
)
