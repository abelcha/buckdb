import { expect, test } from 'bun:test'
import { sortBy } from 'es-toolkit'
import * as t from '.buck/types'
import { Buck, MemoryDB } from '@buckdb/isomorphic'
import { builder } from './build'
import { DBuilderResult, FromResultModel, Withor } from './build.types'
import { FromPlain } from './deep-map'
import { Models } from '@buckdb/.buck/table3'

const fns = await MemoryDB.from('duckdb_functions()').select().execute()
type E<T> = T

test('basic tests', async () => {
    const result1 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
            description: e.description,
        }))
        .execute() satisfies E<{
            function_name: string
            description: string
        }[]>

    expect(result1).toBeInstanceOf(Array)
    expect(result1.length).toBeGreaterThan(0)
    expect(result1[0]).toHaveProperty('function_name')
    expect(result1[0]).toHaveProperty('description')

    const z = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .execute() satisfies E<{
            function_name: string
        }[]>

    expect(z).toBeInstanceOf(Array)
    expect(z.length).toBeGreaterThan(0)
    expect(z[0]).toHaveProperty('function_name')
})

test('full tests', async () => {
    const result = await MemoryDB.from('duckdb_functions()')
        .join('duckdb_types()', 'ttt').on((a) => a.duckdb_functions.description === a.ttt.comment)
        .select(e => ({
            a: e.ttt.logical_type,
            b: e.duckdb_functions.function_name.levenshtein(e.function_type),
        }))
        .execute() satisfies {
            a: string
            b: number
        }[]

    expect(result).toBeInstanceOf(Array)
    if (result.length > 0) {
        expect(result[0]).toHaveProperty('a')
        expect(result[0]).toHaveProperty('b')
        expect(typeof result[0].a).toBe('string')
        expect(typeof result[0].b).toBe('number')
    }
})

test('where clause type checking', async () => {
    // Using a simple string for the where clause
    const result1 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .where("function_name LIKE '%sum%'")
        .execute() satisfies E<{
            function_name: string
        }[]>

    expect(result1).toBeInstanceOf(Array)
    result1.forEach(item => {
        expect(item).toHaveProperty('function_name')
        expect(typeof item.function_name).toBe('string')
        expect(item.function_name.toLowerCase()).toContain('sum')
    })

    expect(() =>
        MemoryDB.from('duckdb_functions()')
            .select(e => ({
                function_name: e.function_name,
            }))
            // @ts-expect-error - nonexistent field
            .where(e => e.nonexistent_field === 'value')
            .execute()
    ).toThrow()
})

test('string operations type checking', async () => {
    const result1 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            upper_name: e.function_name.upper(),
            name_length: e.function_name.len(),
        }))
        .execute() satisfies E<{
            upper_name: string
            name_length: number
        }[]>

    expect(result1).toBeInstanceOf(Array)
    expect(result1.length).toBeGreaterThan(0)
    expect(result1[0]).toHaveProperty('upper_name')
    expect(result1[0]).toHaveProperty('name_length')
    expect(typeof result1[0].upper_name).toBe('string')
    expect(typeof result1[0].name_length).toBe('number')

    const result2 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            upper_name: e.function_name.len(),
        }))
        .execute() satisfies E<{
            upper_name: number
        }[]>

    expect(result2).toBeInstanceOf(Array)
    expect(result2.length).toBeGreaterThan(0)
    expect(result2[0]).toHaveProperty('upper_name')
    expect(typeof result2[0].upper_name).toBe('number')
})

test('orderBy type checking', async () => {
    expect(
        await MemoryDB.from('duckdb_functions()')
            .select('function_name', 'function_oid', 'description')
            .orderBy('function_oid')
            .execute(),
    ).toEqual(
        sortBy(fns, ['function_oid'])
            .map(({ function_name, description, function_oid }) => ({ function_name, description, function_oid })),
        // fns.toSorted((a, b) => a.function_oid - b.function_oid)
    )
    expect(() =>
        MemoryDB.from('duckdb_functions()')
            .select(e => ({
                function_name: e.function_name,
                description: e.description,
            }))
            // @ts-expect-error - nonexistent field
            .orderBy('nonexistent_field')
            .execute()
    ).toThrow()
})

test('groupBy type checking', async () => {
    const zz = (await MemoryDB
        .from('duckdb_functions()')
        .select((e, D) => ({
            // function_type: e.function_type,
            function_name: D.min_by(e.function_name, 'len'),
        }))
        .groupBy('function_type')
        .execute()) satisfies Record<string, {
            // function_type: string;
            function_name: string
        }[]>

    expect(zz).toBeInstanceOf(Object)
    expect(typeof zz).toBe('object')
    const keys = Object.keys(zz)
    expect(keys.length).toBeGreaterThan(0)
    keys.forEach(key => {
        // console.log('-->', key, zz[key])
        // expect(zz[key]).toBeInstanceOf(Array)
        if (zz[key].length > 0) {
            expect(zz[key][0]).toHaveProperty('function_name')
            expect(typeof zz[key][0].function_name).toBe('string')
        }
    })
})

test('single row result type checking', async () => {
    const result1 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
            description: e.description,
        }))
        .minBy('function_name')
        .execute() satisfies E<{
            function_name: string
            description: string
        }>

    expect(result1).toBeDefined()
    expect(result1).toHaveProperty('function_name')
    expect(result1).toHaveProperty('description')
    expect(typeof result1.function_name).toBe('string')
    expect(typeof result1.description).toBe('string')

    const result2 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
            description: e.description,
        }))
        .maxBy('function_name')
        .where(e => !e.description.IsNull())
        .execute() satisfies E<{
            function_name: string
            description: string
        }>

    expect(result2).toBeDefined()
    expect(result2).toHaveProperty('function_name')
    expect(result2).toHaveProperty('description')
    expect(typeof result2.function_name).toBe('string')
    expect(typeof result2.description).toBe('string')
})

test('keyed result type checking', async () => {
    const r = await MemoryDB.from('duckdb_functions()')
        .select((e, D) => ({
            function_name: e.function_name,
            description: D.array_agg(e.description),
        }))
        .keyBy('function_name')
        .execute() satisfies E<
            Record<string, {
                function_name: string
                description: string[]
            }>
        >

    expect(r).toBeInstanceOf(Object)
    expect(typeof r).toBe('object')
    const keys = Object.keys(r)
    expect(keys.length).toBeGreaterThan(0)
    keys.forEach(key => {
        expect(r[key]).toHaveProperty('function_name')
        expect(r[key]).toHaveProperty('description')
        expect(typeof r[key].function_name).toBe('string')
        expect(r[key].description).toBeInstanceOf(Array)
    })
})

test('limit and offset type checking', async () => {
    const result = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .limit(10)
        .offset(5)
        .execute() satisfies E<{
            function_name: string
        }[]>

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBeLessThanOrEqual(10)
    result.forEach(item => {
        expect(item).toHaveProperty('function_name')
        expect(typeof item.function_name).toBe('string')
    })
})

test('nested structure type checking', async () => {
    const result = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            main: {
                name: e.function_name,
                details: {
                    'descx': e.description,
                    type: e.function_type,
                },
            },
        }))
        .where('description IS NOT NULL')
        .execute() satisfies E<{
            main: {
                name: string
                details: {
                    descx: string
                    type: string
                }
            }
        }[]>

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBeGreaterThan(0)
    expect(result[0]).toHaveProperty('main')
    expect(result[0].main).toHaveProperty('name')
    expect(result[0].main).toHaveProperty('details')
    expect(result[0].main.details).toHaveProperty('descx')
    expect(result[0].main.details).toHaveProperty('type')
    expect(typeof result[0].main.name).toBe('string')
    expect(typeof result[0].main.details.descx).toBe('string')
    expect(typeof result[0].main.details.type).toBe('string')
})

test('error cases with incorrect type assertions', async () => {
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        // @ts-expect-error - incorrect type assertion
        .execute() satisfies E<{
            function_name: number
        }[]>

    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        // @ts-expect-error - incorrect type assertion
        .execute() satisfies E<{
            missing_field: string
        }[]>
})

test('sample method type checking', async () => {
    const result1 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .sample(10)
        .execute() satisfies E<{
            function_name: string
        }[]>

    expect(result1).toBeInstanceOf(Array)
    expect(result1.length).toBeLessThanOrEqual(10)
    result1.forEach(item => {
        expect(item).toHaveProperty('function_name')
        expect(typeof item.function_name).toBe('string')
    })

    const result2 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .sample('50%')
        .execute() satisfies E<{
            function_name: string
        }[]>

    expect(result2).toBeInstanceOf(Array)
    result2.forEach(item => {
        expect(item).toHaveProperty('function_name')
        expect(typeof item.function_name).toBe('string')
    })
})

test('context method type checking', async () => {
    const result = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .context({ some_param: 'value' })
        .execute() satisfies E<{
            function_name: string
        }[]>

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBeGreaterThan(0)
    result.forEach(item => {
        expect(item).toHaveProperty('function_name')
        expect(typeof item.function_name).toBe('string')
    })
})

test('multiple joins type checking', async () => {
    const r = await MemoryDB.from('duckdb_functions()')
        .join('duckdb_types()', 'types1').on((a) => a.duckdb_functions.function_name === a.types1.logical_type)
        .join('duckdb_types()', 'types2').on((a) => a.duckdb_functions.function_type === a.types2.logical_type)
        .select(e => ({
            function_name: e.duckdb_functions.function_name,
            type1: e.types1.logical_type,
            type2: e.types2.logical_type,
        }))
        .execute() satisfies {
            function_name: string
            type1: string
            type2: string
        }[]

    expect(r).toBeInstanceOf(Array)
    r.forEach(item => {
        expect(item).toHaveProperty('function_name')
        expect(item).toHaveProperty('type1')
        expect(item).toHaveProperty('type2')
        expect(typeof item.function_name).toBe('string')
        expect(typeof item.type1).toBe('string')
        expect(typeof item.type2).toBe('string')
    })
})

test('complex query type checking', async () => {
    const result = await MemoryDB.from('duckdb_functions()')
        .join('duckdb_types()', 'types').on((a) => a.duckdb_functions.function_name === a.types.logical_type)
        .select(e => ({
            function_name: e.duckdb_functions.function_name,
            type_name: e.types.logical_type,
            combined: e.duckdb_functions.function_name.concat_ws(' - ', e.types.logical_type),
        }))
        .where("duckdb_functions.function_name LIKE '%sum%'")
        // .orderBy(e => e.duckdb_functions.function_name.len())
        .execute() satisfies {
            function_name: string
            type_name: string
            combined: string
        }[]

    expect(result).toBeInstanceOf(Array)
    result.forEach(item => {
        expect(item).toHaveProperty('function_name')
        expect(item).toHaveProperty('type_name')
        expect(item).toHaveProperty('combined')
        expect(typeof item.function_name).toBe('string')
        expect(typeof item.type_name).toBe('string')
        expect(typeof item.combined).toBe('string')
        expect(item.function_name.toLowerCase()).toContain('sum')
        expect(item.combined).toContain(' - ')
    })
})

test('kitchen_sink', async () => {
    type PClean = { name: string; age: number; total: number }
    type People = { name: t.DVarcharField; age: t.DNumericField; total: t.DNumericField }
    type RecPeople = People & { people: People }
    type Setting = {
        name: t.DVarcharField
        value: t.DVarcharField
        description: t.DVarcharField
        input_type: t.DVarcharField
        scope: t.DVarcharField
    }

    async function checkSelect(db: FromResultModel<'', [{ catalog: ''; uri: 'data/people.parquet'; alias: 'people' }]>) {
        db.select(e => e satisfies RecPeople)

        db.join('duckdb_settings()', 'oo').using('name').select(e => e satisfies RecPeople & { oo: Setting })

        db.join('duckdb_settings()').on((a) => a.people.name === a.duckdb_settings.name)
            .join('duckdb_types()', 'xxx').on((p) => p.input_type.Like('%%'))
            .select(e => e satisfies RecPeople & { duckdb_settings: Setting } & { xxx: any })

        db.select(e => ({ zz: e.name })).where(e => e satisfies RecPeople & { zz: t.DVarcharField })
            ; (await db.select().groupBy(e => (e satisfies RecPeople).age).execute()) satisfies Record<string, PClean[]>
            ; (await db.select().keyBy(e => (e satisfies RecPeople).name).execute()) satisfies Record<string, PClean>

        // E
        const xcheck01 = await db.select(({ people, ...e }) => e).execute() satisfies { name: string; age: number; total: number }[]
        const check01 = await db.select(e => ({ a: e.age, t: e.total })).execute() satisfies { a: number; t: number }[]

        const check4 = await db.select(e => ({ zz: e.name, x: `${e.age} and - ${e.total} count` })).execute() satisfies { zz: string; x: string }[]

        const check2 = await db.select(e => ({ zz: e.name, x: 123 })).execute() satisfies { zz: string; x: number }[]
        const check7 = await db.select(e => ({ a: e.age, n: e.name })).execute() satisfies { a: number; n: string }[]

        // D
        const xcheck0 = await db.select(e => e.total).execute() satisfies number[]
        // C
        const _checdk0 = await db.select(e => [e.total]).execute() satisfies [number][]
        const check5 = await db.select(e => [e.name, 'super longg query']).execute() satisfies [string, any][]
        const check1 = await db.select(e => [e.age, e.total]).execute() satisfies [number, number][]
        const check6 = await db.select(e => [e.age, e.people.name, e.total]).execute() satisfies [number, string, number][]

        // B
        const d_check01 = await db.select('age', 'name').execute() satisfies { name: string; age: number }[]
        const d_check02 = await db.select('age').execute() satisfies { age: number }[]
        // A
        const zcheck0 = await db.select().execute() satisfies { name: string; age: number; total: number }[]

        // db.select(e => ({ xxx: e.people })).where(z => z.xxx.age == 123 && z.

        const check026 = await db.select(e => ({ zz: e.name, x: e.total })).groupBy([e => e.name]).execute() satisfies Record<string, { zz: string; x: number }[]>
        const check1026 = await db.select(e => ({ zz: e.name, x: 123 })).groupBy('name').execute() satisfies Record<string, { zz: string; x: number }[]>
        const check1036 = await db.select(e => ({ zz: e.name, x: 123 })).groupBy('ALL').execute() satisfies Record<string, { zz: string; x: number }[]>

        const check025 = await db.select(e => ({ zz: e.name, x: e.total })).keyBy(e => e.name).execute() satisfies Record<string, { zz: string; x: number }>
        const check1025 = await db.select(e => ({ zz: e.name, x: 123 })).keyBy('name').execute() satisfies Record<string, { zz: string; x: number }>
    }
})

test('numeric operations type checking', async () => {
    const result = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            name_length: e.function_name.len(),
            length_squared: e.function_name.len().pow(2),
            length_sqrt: e.function_name.len().sqrt(),
        }))
        .execute() satisfies E<{
            name_length: number
            length_squared: number
            length_sqrt: number
        }[]>

    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBeGreaterThan(0)
    result.forEach(item => {
        expect(item).toHaveProperty('name_length')
        expect(item).toHaveProperty('length_squared')
        expect(item).toHaveProperty('length_sqrt')
        expect(typeof item.name_length).toBe('number')
        expect(typeof item.length_squared).toBe('number')
        expect(typeof item.length_sqrt).toBe('number')
        expect(item.name_length).toBeGreaterThan(0)
        expect(item.length_squared).toBeGreaterThanOrEqual(item.name_length)
    })
})

test('ambiguous type inference - conditional expressions', async () => {
    // Test case where a conditional expression could result in different types
    const rrr = await MemoryDB.from('duckdb_functions()')
        .select((e, D) => ({
            // This should be inferred as string | number
            conditional_result: e.function_name === D.Varchar('342') ? 'TEST' : e.function_name,
            conditional_result2: D.Integer(e.function_oid) === 23 ? 'TEST' : e.function_name,
            conditional_result3: D.Integer(e.function_oid) > 23 ? 'TEST' : e.function_name,
        }))
        .execute() satisfies E<{
            conditional_result: string | number
        }[]>
})

test('ambiguous type inference - function overloads', async () => {
    // Test case where a function can return different types based on input
    const rrrr = await MemoryDB.from('duckdb_functions()')
        .select((e, D) => ({
            // json_extract can return different types based on the path
            json_result: D.Json({ field: e.function_name }).json_extract('$.field'),
        }))
        .execute()

    // Test with functions that accept multiple argument types
    // MemoryDB.from('duckdb_functions()')
    //   .select(e => ({
    //     // date_part can accept different types of arguments
    //     date_part_result: e.function_name.date_part(e.function_name)
    //   }))
    //   .execute();
})

test('ambiguous type inference - complex expressions', async () => {
    // Test with complex expressions that involve multiple operations
    const result1 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            // Complex expression with multiple operations
            complex_result: e.function_name.upper().len().pow(2).sqrt(),
        }))
        .execute() satisfies E<{
            complex_result: number
        }[]>

    expect(result1).toBeInstanceOf(Array)
    expect(result1.length).toBeGreaterThan(0)
    result1.forEach(item => {
        expect(item).toHaveProperty('complex_result')
        expect(typeof item.complex_result).toBe('number')
        expect(item.complex_result).toBeGreaterThan(0)
    })

    // Test with nested function calls that might have ambiguous types
    const r =
        await MemoryDB.from('duckdb_functions()')
            .select((e, D) => ({
                // Nested function calls
                nested_result: D.Json({ field: e.function_name }).json_extract('$.field'),
            }))
            .execute() satisfies E<{
                // todo: fix json parsing
                nested_result: Record<string, any> | string
            }[]>

    expect(r).toBeInstanceOf(Array)
    r.forEach(item => {
        expect(item).toHaveProperty('nested_result')
        expect(item.nested_result).toBeDefined()
    })
})

test('ambiguous type inference - type conversions', async () => {
    // Test with explicit type conversions
    const result1 = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            // Converting between types
            converted_result: e.function_name.len().to_base(16),
        }))
        .execute() satisfies E<{
            converted_result: string
        }[]>

    expect(result1).toBeInstanceOf(Array)
    expect(result1.length).toBeGreaterThan(0)
    result1.forEach(item => {
        expect(item).toHaveProperty('converted_result')
        expect(typeof item.converted_result).toBe('string')
    })

    // Test with implicit type conversions
    const r = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            // Implicit conversion in arithmetic operation
            xxx: e.function_name + 'dsl',
            implicit_result: e.function_name.len() + 123,
            zzz: e.function_name + '12',
        }))
        .execute() satisfies E<{
            xxx: string
            implicit_result: number
        }[]>

    expect(r).toBeInstanceOf(Array)
    expect(r.length).toBeGreaterThan(0)
    r.forEach(item => {
        expect(item).toHaveProperty('xxx')
        expect(item).toHaveProperty('implicit_result')
        expect(item).toHaveProperty('zzz')
        expect(typeof item.xxx).toBe('string')
        expect(typeof item.implicit_result).toBe('number')
        expect(typeof item.zzz).toBe('string')
        expect(item.xxx).toContain('dsl')
        expect(item.zzz).toContain('12')
    })
})

test('build-tests', () => {
    async function checkSelect(db: FromResultModel<'', [{ catalog: ''; uri: 'data/people.parquet'; alias: 'people' }]>, db2: FromResultModel<'', [{ catalog: ''; uri: 'duckdb_functions()'; alias: 'duckdb_functions' }]>) {

        const respk = await db.select(e => e).execute() satisfies
            { name: string; age: number; total: number, people?: never }[]


        const respz = await db.select().execute() satisfies { name: string; age: number; total: number, people?: never }[]
        const respu = await db.execute() satisfies { name: string; age: number; total: number, people?: never }[]

        const respx = await db.select(e => e.age === 12 ? 42 : '12').execute() satisfies (number | string)[]

        const resp4 = await db.select((e, D) => ({
            gg: e.name.str_split('').map((e) => e.upper()),
        })).execute() satisfies { gg: string[] }[]

        const resp3 = await db.select((e, D) => [e.age.add(12), e.total.to_hex()]).execute() satisfies [number, string][]

        const resp5 = await db.select((e, D) => `${e.name}__${e.total}`).execute() satisfies string[]

        const resp = await db.select('age', 'name')
            .union(db2.select(e => ({ name: e.function_name, age: 42, toto: 12 })))
            .execute() satisfies { age: number; name: string, toto: number }[]


        const resp2 = await db.select(e => [e.age, e.name] as const)
            .except(db2.select(e => ({ name: e.function_name, age: 12 })))
            .execute()
    }
})

test('kitchen_sing2', async () => {
    async function checkSelect3(db: FromResultModel<'', [{ catalog: ''; uri: 'duckdb_functions()'; alias: 'tt' }]>, D: t.DMetaField) {
        const rv = await db.select((e, D) => ({
            // function_name: e.function_oid,
            function_name: e.function_oid,
            // xx : e.examples.array_apply(e => e.upper()).array_contains('ok'),
        }))
            // .keyBy(e => e.database_name)
            // .groupBy(e => e.examples[0].upper(), 'database_name', 'sqd', e => e.comment, e => e.comment)

            .groupBy([e => e.database_name, 'database_name', 'comment'])
            .groupBy(e => e.database_name, 'database_name', 'comment', e => e.internal, e => e.return_type.damerau_levenshtein('str2'))
            .groupBy(['examples'])
            .groupBy('GROUPING SETS', [['internal', e => e.function_oid]])
            .groupBy('CUBE', ['internal', 'description'])
            .groupBy('ROLLUP', ['internal', 'description'])
            .having(e => e.database_name.levenshtein('xx').acosh() === 12)
            .minBy(e => e.comment)
            .maxBy('comment')
            .keyBy(e => e.comment)
            .distinctOn('database_name', e => e.internal)
            .where(e => e.function_name === 123 && e.examples.array_contains('sqd'))
            .where('function_name = 123 AND whatever=true')
            // .groupBy('GROUPING SETS', [[]])
            // .groupBy('has_side_effects')
            .execute()

        // const r = await db.select(e => ({ xid: e.xxx.toto.map(x => x) })).execute()
    }

})

test('d.test.ts', async () => {

    function xx(D: t.DMetaField, vc: t.DVarcharField, str: t.DVarcharComp, num: t.DNumericComp) {
        const yyy = ({} as FromPlain<{ to: number; l: string[] }>) satisfies { to: t.DNumericField; l: t.DArrayField<t.DVarcharField> }
            ; ((
                x: FromPlain<{
                    to: t.DNumericField
                    l: t.DVarcharField[]
                    nested: [{ lol: t.DNumericField }, { lol: t.DNumericField }]
                }>,
            ) => x)('' as any) satisfies { to: t.DNumericField; l: t.DArrayField<t.DVarcharField>; nested: t.DArrayField<{ lol: t.DNumericField }> }

        const xx = ((x: FromPlain<{ to: number; l: string[]; nested: [{ lol: 42 }, { lol: 1 }] }>) => x)('' as any) satisfies { to: t.DNumericField; l: t.DArrayField<t.DVarcharField>; nested: t.DArrayField<{ lol: t.DNumericField }> }
        const r =
            D.Struct({ ok: 'lol', toto: [123, 31, 41] }).toto.map(x => x + 1).filter(z => z > 12) satisfies
            t.DArrayField<t.DNumericField>
        const r2 = r.reduce((acc, curr) => acc + curr, 0) satisfies t.DNumericField
        const resp = D.array_transform(D.Array(['lol', 'xxx', 'ddd']), z => z.len()) satisfies
            t.DArrayField<t.DNumericField>
        const resp2 =
            D.array_transform(['lol', 'xxx', 'ddd'], z => ({ ok: 'ok', zz: z.lower(), x: z.upper().damerau_levenshtein('xxx') })) satisfies
            t.DArrayField<{ ok: t.DVarcharField; zz: t.DVarcharField; x: t.DNumericField }>
        const toto = num.abs().as('Bigint').ceil().toExponential()
        const str2 = vc.damerau_levenshtein('xxx').ceil()[t.sInferred] satisfies number
        const zzz = str.damerau_levenshtein('xxx') > 12 satisfies boolean
        const zzz2 = (str === 'str') satisfies boolean

        const ggg = D.Array(['lol', 'xxx', 'ddd']).array_filter(z => z.includes('toto')) satisfies t.DArrayField<t.DVarcharField>
        const arr = D.Varchar('lol').str_split(';').map(z => [z.trim()]).filter(z => z[1].len() > 41).map(z => z[0].len() === 1) satisfies t.DArrayField<t.DBoolField>

        const uuuuuuu = D.Array([{ lol: 123 }, { lol: 2 }]) // .list_transform(x => ({ ...x, zz: x.lol * 2 }))

        const ___ = D.Struct({ toto: 123, lol: [{ xx: 123 }] }) satisfies { toto: t.DNumericField; lol: t.DArrayField<{ xx: t.DNumericField }> }

        const _x__ =
            D.Struct(null as unknown as { toto: t.DNumericField; lol: t.DArrayField<t.DVarcharField> }) satisfies { toto: t.DNumericField; lol: t.DArrayField<t.DVarcharField> }

        const __ =
            D.Struct({ toto: 123, z: ['a', 'b', 'c'] }) satisfies { toto: t.DNumericField; z: t.DArrayField<t.DVarcharField> }

        const __q =
            D.Struct({ toto: 123, z: ['a', 'b', 'c'] }).toto satisfies number
        const __xq =
            D.Struct({ toto: 123, z: 'lol' }) satisfies t.DStructField<{ toto: t.DNumericField; z: t.DVarcharField }>

    }

})

test('unshallowing', async () => {
    const xxx = async function xx(db: FromResultModel<'', [{ catalog: ''; uri: 'data/people.parquet'; alias: 'people' }]>) {
        const resp = await db.select(e => e).execute() satisfies { name: string; age: number; total: number }[]
        const respX = await db.select().execute() satisfies { name: string; age: number; total: number }[]
    }
})

test('with', async () => {
    async function checkSelect3(db: DBuilderResult<Models, ''>) {

        const i3 = await Buck().with(
            (accDB) => ({ titi: accDB.from('duckdb_functions()').select('function_name', 'function_oid') }),
            accDB => ({ tata: accDB.from('titi').select(e => ({ xfname: e.function_name })) })
        ).from('tata').select().orderBy(x => x.xfname.len()).limit(1).execute() satisfies { xfname: string }[]

        expect(i3).toEqual([{ xfname: '%' }])

        const i4 =
            await db.with(
                (accDB) => ({ titi: accDB.from('duckdb_functions()').select() }),
                accDB => ({ tata: accDB.from('titi').select(e => ({ last_name: e.function_name, first_name: e.database_name.split('') })) }),
                accDB => ({ tutu: accDB.from('tata').select(({ last_name, first_name }) => ({last_name, first_name,  last_name_len: last_name.len() })).where(e => e.last_name.SimilarTo(/\W+/)) }),
            )
                .from('tutu')
                .select()
                .orderBy('last_name_len', 'DESC')
                .limit(1)
                .exec() satisfies {
                    last_name: string;
                    first_name: string[];
                    last_name_len: number;
                }[]
        expect(i4).toEqual([
            {
                last_name: "!~~*",
                first_name: ["s", "y", "s", "t", "e", "m"],
                last_name_len: 4,
            }
        ])
    }
    async function __(www: Withor<Models, 's3://a1738/akira09.db'>, xdb: DBuilderResult<Models, 's3://a1738/akira09.db'>) {
        const z = xdb.from('Actor', 'qd')

        const r =
            await www.with(
                accDB => ({ titi: accDB.from('Actor').select('first_name', 'last_name') }),
            ).from('titi').select().execute() satisfies { first_name: string; last_name: string }[]
        const r2 =
            await www.with(
                accDB => ({ titi: accDB.from('Actor').select('first_name', 'last_name', 'last_update') }),
                accDB => ({ tata: accDB.from('titi').select(e => ({ xfname: e.first_name })) })
            ).from('tata').select().execute() satisfies { xfname: string }[]
        const r3 =
            await www.with(
                accDB => ({ titi: accDB.from('Actor').select('first_name', 'last_name', 'Actor.actor_id') }),
                accDB => ({ tata: accDB.from('titi').select(e => ({ xfname: e.first_name })) })
            ).from('titi').select().execute() satisfies { first_name: string; last_name: string }[]
        const r4 = await www.with(
            accDB => ({ titi: accDB.from('Actor').select('first_name', 'last_name', 'Actor.actor_id') }),
            accDB => ({ tata: accDB.from('titi').select(e => ({ xfname: e.first_name })) }),
            accDB => ({ tutu: accDB.from('tata').select(e => ({ xlen: e.xfname.len() })) })
        ).from('tutu').select().execute() satisfies { xlen: number }[]
        const r5 = await www.with(
            accDB => ({ titi: accDB.from('Actor').select('first_name', 'last_name', 'Actor.actor_id') }),
            accDB => ({ tata: accDB.from('titi').select(e => ({ ...e, xfname: e.first_name })) }),
            accDB => ({ tutu: accDB.from('tata').select(e => ({ dbname: e.last_name, xlen: e.xfname.len() })) }),
            accDB => ({ toto: accDB.from('tutu').select((e, D) => ({ l: e.dbname, cnt: D.avg(e.xlen) })).groupBy('l') })
        ).from('tutu').select().execute() satisfies { xlen: number, dbname: string }[]
        const r6 =
            await www.with(
                accDB => ({
                    films: accDB.from('Film').select().where(e => e.rental_rate > 10),
                    cat: accDB.from('Film_category').select('category_id', 'film_id')
                }),
                // accDB => ({ tata: accDB.from('titi').select(e => ({ xfname: e.first_name })) })
            ).from('films').join('cat').on(e => e.cat.category_id === e.films.film_id).select('cat.category_id', 'category_id', 'film_id', 'rental_rate').exec()
        // .from('titi').select().execute() satisfies { first_name: string; last_name: string }[]
    }

    await checkSelect3(MemoryDB)
})


test('META type checking ', async () => {
    const res = await Bun.$`tsgo  --noEmit --skipLibCheck |grep -E  'deep-map.ts|test.ts'`.quiet().nothrow()
    // if (res.exitCode !== 0) {
    //     console.log('Error in command execution:', res.stderr.toString(),res.stdout.toString())
    //     console.error(res.stderr.toString())
    //     return
    // }
    const errs = res.text();
    console.log(errs)
    // if (errs) {
    //     console.log(errs)
    // }
    expect(errs).toHaveLength(0)
})
