import { deriveName, DeriveName, DField, DRawField, DuckDBClient, formatSource, prettifyPrintSQL, wrap } from "./utils"
import { Models } from './.buck/table2'
import * as t from "./.buck/types"
import { parse, parseObject } from './parser';
import { groupBy } from "es-toolkit";
import { ObjectValue } from "type-fest/source/internal";

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};


export type NestedKeyOf<ObjectType extends NonNullable<unknown>> = {
    [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends { [t.sInferred]: infer V }
    ? `${Key}`
    : `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`;

}[keyof ObjectType & (string | number)];

type DMetaComp = t.DAggregateComp & t.DGlobalComp
type DMetaField = t.DAggregateField & t.DGlobalField & { raw: (template: TemplateStringsArray) => DRawField }


interface GenericRecursive<T> {
    [key: string]: T | GenericRecursive<T>;
}
type SelectModel = GenericRecursive<DField>
type MetaModel = GenericRecursive<DField>


type StrictCollection = { catalog: string, uri: string, alias: string }
// Utility type to merge two types into a single object
type Merge<T, U> = {
    [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};
type FirstValue<T extends Record<string, any>> = T[keyof T] | undefined;
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



type ModelForCollection<C extends StrictCollection> = C extends { catalog: infer R, uri: infer T } ? // Use uri T for lookup
    R extends keyof Models ?
    T extends keyof Models[R] ?
    Models[R][T] :
    T extends keyof Models[''] ? Models[''][T] : {} :// Return never if resource name R is invalid
    {} : // Return never if uri T is invalid
    {} // Should not happen if C extends StrictCollection



type ModelFromCollectionList<C extends StrictCollection[]> =
    C extends [infer F extends StrictCollection, ...infer Rest extends StrictCollection[]] ?
    ModelForCollection<F> & { [K in F['alias']]: ModelForCollection<F> } & ModelFromCollectionList<Rest> :
    {} // Base case should be an empty object for merging
// Recursive type to merge all models from collections, using alias as key


type ToExecuted<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField | string> ? {
    [P in keyof SelectedFields]: SelectedFields[P] extends DField ? (SelectedFields[P] extends { [t.sInferred]: infer V } ? V : SelectedFields[P]) :
    SelectedFields[P] extends SelectModel ? ToExecuted<SelectedFields[P]> : never
} : never;


type ToComp<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField | string> ? {
    [P in keyof SelectedFields]: SelectedFields[P] extends DField ? (SelectedFields[P] extends { [t.sComptype]: infer V } ? V : never) :
    SelectedFields[P] extends SelectModel ? ToComp<SelectedFields[P]> : never
} : never;



type MState = {
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

interface MaterializedResult<S extends MState, C extends StrictCollection[]> {
    // execute(): Promise<MapInferredType<ModelFromCollectionList<C>>>
    groupBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaComp) => Z): MaterializedResult<S & { grouped: Z }, C>
    groupBy<U extends (NestedKeyOf<S['available'] & S['selected']>)>(...key: U[]): MaterializedResult<S, C>

    keyBy<Z>(fn: (p: S['available'] & S['selected'], D: DMetaComp) => Z): MaterializedResult<S & { keyed: true }, C>
    keyBy<U extends (NestedKeyOf<S['available'] & S['selected']>)>(key: U): MaterializedResult<S & { keyed: true }, C>

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
    offset: (n: number) => this,
    dump: () => this,
    show: () => this,
}
interface MaterializedWhereResult<S extends MState, C extends StrictCollection[]> extends MaterializedResult<S, C> {
    orWhere: this['where']
}
interface MaterializedGroupByResult<S extends MState, C extends StrictCollection[]> extends MaterializedResult<S, C> {
    having: this['where']
}

interface MaterializedSelectResult<S extends MState, C extends StrictCollection[]> extends MaterializedResult<S, C> {
    distinctOn: this['groupBy'],
}



interface FromResult<T extends keyof Models & string, C extends StrictCollection[] = []> {
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
type InitialMaterializedResult<C extends StrictCollection[]> = MaterializedResult<{
    // selected: ['*'], // Assuming '*' is the default selection
    selected: ModelFromCollectionList<C>,
    available: ModelFromCollectionList<C>,
}, C>;

// Updated DBuilder declaration
declare function DBuilder<T extends keyof Models>(catalog: T): {
    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>>, A extends string>(table: K1, alias: A):
        FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: A }>]> &
        InitialMaterializedResult<[DefaultizeCollection<{ catalog: T, uri: K1, alias: A }>]>; // Use the alias

    from<K1 extends Simplify<Extract<keyof Models[T], string> | Extract<keyof Models[''], string>> & string>(table: K1):
        FromResult<T, [DefaultizeCollection<{ catalog: T, uri: K1, alias: DeriveName<K1> }>]> &
        InitialMaterializedResult<[DefaultizeCollection<{ catalog: T, uri: K1, alias: DeriveName<K1> }>]>; // Use the alias
};



type DCondition = { condition: string, operator?: 'OR' | 'AND' }
type DSelectee = { field: string, as?: string }
type DOrder = { field: string, direction?: 'ASC' | 'DESC' }
type DDatasource = { catalog: string, uri: string, alias?: string, joinOn?: string, join?: 'JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'CROSS JOIN' | 'NATURAL JOIN' }

const dstate = {
    datasources: [] as DDatasource[],
    selected: [] as DSelectee[],
    conditions: [] as DCondition[],
    having: [] as DCondition[],
    groupBy: [] as string[],
    distinctOn: [] as string[],
    limit: null as number | null,
    offset: null as number | null,
    orderBy: [] as DOrder[],
    keyBy: null as string | null,
    agg: null as string | null,
}
type DState = typeof dstate

const serializeTuple = (id: string) => (p: string[]) => p.length ? `${id} (${p.join(', ')})` : ''
const serializeValue = (id: string) => (p: number | null) => p !== null ? `${id} ${p}` : ''

const serializeConditions = (id = 'WHERE') => (conditions: DCondition[]) => {
    return conditions.map((e, i) => {
        const prefix = i === 0 ? id : (e.operator || 'AND')
        return `${prefix} (${e.condition})`
    }).join(' ')
}
const serializeOrder = (id: string) => (orders: DOrder[]) => {
    const m = orders.map((e, i) => {
        // const prefix = i === 0 ? id : (e.direction)
        return `${e.field} ${e.direction || ''}`.trim()
    })
    return m.length ? `${id} ${m.join(', ')}` : ''
}

const formatAlias = (source: { alias?: string, uri: string }) => {
    if (source.alias) {
        return `${formatSource(source.uri)} AS ${source.alias}\n`
    }
    return formatSource(source.uri)
}
const formatAs = (source: { field: string, as?: string }) => {
    if (source.as && typeof source.as === 'string') {
        return `${source.field} AS ${source.as}\n`
    }
    return source.field
}
const serializeDatasource = (datasources: DDatasource[]) => {
    return datasources.map((d) => d.join ? `${d.join} ${formatAlias(d)} ON (${d.joinOn})` : formatAlias(d)).join('\n ') + '\n'
}
const serializeSelected = (selected: DSelectee[]) => {
    if (!selected.length) {
        return '*'
    }
    return selected.map(formatAs).join(', ')
    // return prettifyPrintSQL(selected.map(([v, k]) => !k?.match(/[^\d]/) ? v : `${v} AS ${k}`).join(", ") || "*", pretty);
}
function toSql(state: DState) {
    // console.log({ state })
    const components = [
        'FROM',
        serializeDatasource(state.datasources),
        ' SELECT',
        serializeSelected(state.selected),
        serializeConditions('WHERE')(state.conditions),
        serializeTuple('GROUP BY')(state.groupBy),
        serializeConditions('HAVING')(state.having),
        serializeOrder('ORDER BY')(state.orderBy),
        serializeValue('LIMIT')(state.limit),
        serializeValue('OFFSET')(state.offset),
    ]
    // const add = settings ? (settings.join(';') + '\n') : ''
    return components.filter(Boolean).join(' ').trim();
    // }
}
type Parseable = string | Function

const deriveState = (s: any, kmap: Record<keyof DState | string, any | any[]>, format = e => e) => {
    return Object.entries(kmap).reduce((acc, [key, values]) => {
        if (!Array.isArray(values)) {
            return { ...acc, [key]: values }
        }
        const newVals = values.map(e => typeof e === 'function' ? parse(e) : e).map(format)
        return Object.assign(acc, { [key]: (s[key] || []).concat(newVals) })
    }, s) as DState
}

export const builder = (ddb: DuckDBClient) => {

    const fromRes = (state = dstate) => {
        const _join = (joinType: DDatasource['join'] = 'JOIN') => function (table, alias, fn = undefined) {
            if (typeof fn === 'undefined') {
                fn = alias
                alias = undefined
            }
            const joinOn = typeof fn === 'function' ? parse(fn) : fn
            return fromRes(deriveState(state, { datasources: [{ catalog: '', uri: table, alias, join: joinType, joinOn }] }))
        }
        return {
            // _join: ,
            join: _join('JOIN'),
            leftJoin: _join('LEFT JOIN'),
            rightJoin: _join('RIGHT JOIN'),
            crossJoin: _join('CROSS JOIN'),
            naturalJoin: _join('NATURAL JOIN'),
            select: function (...keys: Parseable[]) {
                console.log({ keys })
                const selected = keys.flatMap(k => {
                    if (typeof k === 'function') {
                        const res = parseObject(k)
                        // if (res.every(([e]) => typeof e === 'number')) {
                        //     console.log('EVERYYYY', res)
                        //     // return res.map(e => ({ field: e }))
                        // }
                        return res.map(([value, key]) => ({ field: key, as: value })) as DSelectee[]
                    }
                    return { field: k }
                })
                return fromRes({ ...state, selected })
            },
            where: function (...conditions: Parseable[]) {
                return fromRes(deriveState(state, { conditions }, condition => ({ condition, operator: 'AND' })))
            },
            orderBy: function (field: Parseable[], type?: 'ASC' | 'DESC') {
                return fromRes(deriveState(state, { orderBy: { field, type } }))
            },
            groupBy: function (...groupBy: Parseable[]) {
                return fromRes(deriveState(state, { groupBy }))
            },
            keyBy: function (...groupBy: Parseable[]) {
                return fromRes(deriveState({ ...state, keyBy: groupBy }, { groupBy }))
            },
            minBy: function (...fields: Parseable[]) {
                // return this.orderBy(fields, 'ASC').limit(10)
                return fromRes(deriveState({ ...state, agg: 'min', limit: 1 }, { orderBy: fields }, field => ({ field, direction: 'ASC' })))
            },
            maxBy: function (...fields: Parseable[]) {
                // return this.orderBy(fields, 'ASC')
                return fromRes(deriveState({ ...state, agg: 'max', limit: 1 }, { orderBy: fields }, field => ({ field, direction: 'DESC' })))
            },
            having: function (...having: Parseable[]) {
                return fromRes(deriveState(state, { having }, condition => ({ condition, operator: 'AND' })))
            },
            limit: function (limit: number) {
                return fromRes({ ...state, limit })
            },
            offset: function (offset: number) {
                return fromRes({ ...state, offset })
            },
            execute: async function (props: Record<string, any> = {}) {
                const str = toSql(Object.assign(state, props))
                if (props?.dump || props?.pretty) {
                    ddb.dump(str)
                }
                if (state.selected.length === 1 && !state.selected[0].as) {
                    return ddb.query(str, { rows: true }).then(e => e.map(e => e[0]))
                }
                if (state.selected.length && state.selected.every((e) => typeof e.as === 'number')) {
                    return ddb.query(str, { rows: true })
                }
                const resp = await ddb.query(str)
                if (state.agg) {
                    return resp[0]
                }
                if (state?.keyBy?.length) {
                    return groupBy(resp, e => e[state.groupBy[0]])
                }
                return resp
            },
            toState: function () {
                return state
            },
            dump: () => {
                ddb.dump(toSql(state))
                return fromRes(state)
            },
            show: function () {
                // console.log('GPPPP', state.groupBy)
                ddb.dump(toSql(state))
                const res = fromRes(state).execute().then(e => console.log(e))
                // console.log(res)
                return fromRes(state)

            },
            toSql: function (props = { pretty: false }) {
                return toSql(Object.assign(state, props))
            },
            toString: function () {
                return this.toSql()
            }
        }
    }
    return function __DBuilder(catalog = '') {
        return {
            from: (table: string, alias?: string) => fromRes({
                ...dstate,
                datasources: [{
                    catalog: catalog,
                    uri: table,
                    alias: alias,// || deriveName(table),
                }]
            })
        }
    } as unknown as typeof DBuilder
    // return fromRes as unknown as typeof DBuilder
}
// builder({} as unknown as DuckDBClient)('s3://insee.ddb').from().

// function __database(catalog = '') {
//     return {
//         from: (table, alias) => fromRes({
//             ...dstate,
//             datasources: [{
//                 catalog: catalog,
//                 uri: table,
//                 alias: alias,// || deriveName(table),
//             }]
//         })
//     }
//     // return new 
// }
// export const database = __database as unknown as typeof Ddatabase
// export const from = database('').from

// // database('data/ex.duckdb').from('')

// const zz = async () => {
//     const db = database('data/ex.duckdb')
//     const q = db.from('https://whatever/people.json')
//         .join('https://whatever/city.json', e => e.city.id === e.people.city_id)
//         .select('age', 'people', 'total')
//         .distinctOn('age')
//         .where(e => e.age > 18)
//         .groupBy('city_id', 'age')
//         // .groupBy('')
//         .having(e => e.people.age > 14)
//         .orderBy('people', 'total')
//         .limit(100)
//         .offset(42)


//     console.log('=======<', q.toSql())
//     // const resp = await q.execute({ pretty: true })
//     // console.log({ resp })
// }

// zz()





// // database('s3://insee.ddb').from('cities').join('countries', 'cccc').select('cities.countryCode', 'cccc.countryCode', 'geo')
// // const xx = await database('').from('data/test.csv', 'testxx')
// //     .join('data/final.csv', e => e.testxx.name === e.final.name)
// //     // .select('age', 'final')
// //     .select((e, D) => ({ age: e.testxx.age, final: e.final.email, oo: D.levenshtein(e.email, e.pid) }))
// //     .toSql()
// // console.log({ xx })
// // // xx[0].final.firstname.toLocaleLowerCase()
// // database('s3://insee.ddb').from('peoples', 'zzz').join('https://whatever/country.json')
// // .select(e => e.zzz.)

// // database('data/ex.duckdb').from('data/test.csv', 'zzz').join('data/people.parquet', 'iii', e => e.iii.)
// // .select(e => e.iii)