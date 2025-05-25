import { expect, test } from 'bun:test'
import { sortBy } from 'es-toolkit'
import * as t from '../.buck/types'
import { MemoryDB } from '../buckdb'
import { builder } from './build'
import { FromResult } from './build.types'
import { FromPlain } from './deep-map'

const fns = await MemoryDB.from('duckdb_functions()').select().execute()
type E<T> = T

test('basic tests', async () => {
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
            description: e.description,
        }))
        .execute() satisfies E<{
            function_name: string
            description: string
        }[]>

    const z = await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .execute() satisfies E<{
            function_name: string
        }[]>
})

test('full tests', async () => {
    await MemoryDB.from('duckdb_functions()')
        .join('duckdb_types()', 'ttt', (a, b) => a.duckdb_functions.description === a.ttt.comment)
        .select(e => ({
            a: e.ttt.logical_type,
            b: e.duckdb_functions.function_name.levenshtein(e.function_type),
        }))
        .execute() satisfies {
            a: string
            b: number
        }[]
})

test('where clause type checking', async () => {
    // Using a simple string for the where clause
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .where("function_name LIKE '%sum%'")
        .execute() satisfies E<{
            function_name: string
        }[]>

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
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            upper_name: e.function_name.upper(),
            name_length: e.function_name.len(),
        }))
        .execute() satisfies E<{
            upper_name: string
            name_length: number
        }[]>

    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            upper_name: e.function_name.len(),
        }))
        .execute() satisfies E<{
            upper_name: number
        }[]>
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
})

test('single row result type checking', async () => {
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
            description: e.description,
        }))
        .minBy('function_name')
        .execute() satisfies E<{
            function_name: string
            description: string
        }[]>

    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
            description: e.description,
        }))
        .maxBy('function_name')
        .execute() satisfies E<{
            function_name: string
            description: string
        }[]>
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
})

test('limit and offset type checking', async () => {
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .limit(10)
        .offset(5)
        .execute() satisfies E<{
            function_name: string
        }[]>
})

test('nested structure type checking', async () => {
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            main: {
                name: e.function_name,
                details: {
                    'descx': e.description,
                    type: e.function_type,
                },
            },
        }))
        .execute() satisfies E<{
            main: {
                name: string
                details: {
                    descx: string
                    type: string
                }
            }
        }[]>
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
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .sample(10)
        .execute() satisfies E<{
            function_name: string
        }[]>

    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .sample('50%')
        .execute() satisfies E<{
            function_name: string
        }[]>
})

test('context method type checking', async () => {
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            function_name: e.function_name,
        }))
        .context({ some_param: 'value' })
        .execute() satisfies E<{
            function_name: string
        }[]>
})

test('multiple joins type checking', async () => {
    const r = await MemoryDB.from('duckdb_functions()')
        .join('duckdb_types()', 'types1', (a, b) => a.duckdb_functions.function_name === a.types1.logical_type)
        .join('duckdb_types()', 'types2', (a, b) => a.duckdb_functions.function_type === a.types2.logical_type)
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
})

test('complex query type checking', async () => {
    await MemoryDB.from('duckdb_functions()')
        .join('duckdb_types()', 'types', (a, b) => a.duckdb_functions.function_name === a.types.logical_type)
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

    async function checkSelect(db: FromResult<'', [{ catalog: ''; uri: 'data/people.parquet'; alias: 'people' }]>) {
        db.select(e => e satisfies RecPeople)

        db.join('duckdb_settings()', 'oo').select(e => e satisfies RecPeople & { oo: Setting })

        db.join('duckdb_settings()', (a) => a.people.name === a.duckdb_settings.name)
            .join('duckdb_types()', 'xxx', (p) => p.input_type.Like('%%'))
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
    await MemoryDB.from('duckdb_functions()')
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
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            // Complex expression with multiple operations
            complex_result: e.function_name.upper().len().pow(2).sqrt(),
        }))
        .execute() satisfies E<{
            complex_result: number
        }[]>

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
})

test('ambiguous type inference - type conversions', async () => {
    // Test with explicit type conversions
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            // Converting between types
            converted_result: e.function_name.len().to_base(16),
        }))
        .execute() satisfies E<{
            converted_result: string
        }[]>

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
})

test('build-tests', () => {
    async function checkSelect(db: FromResult<'', [{ catalog: ''; uri: 'data/people.parquet'; alias: 'people' }]>, db2: FromResult<'', [{ catalog: ''; uri: 'duckdb_functions()'; alias: 'duckdb_functions' }]>) {

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
            .union(db2.select(e => ({ name: e.function_name, toto: 12 })))
            .execute() satisfies { age: number; name: string, toto: number }[]


        const resp2 = await db.select(e => [e.age, e.name] as const)
            .except(db2.select(e => ({ name: e.function_name, age: 12 })))
            .execute()
    }
})

test('kitchen_sing2', async () => {
    async function checkSelect3(db: FromResult<'', [{ catalog: ''; uri: 'duckdb_functions()'; alias: 'tt' }]>, D: t.DMetaField) {
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
            D.Struct(null as { toto: t.DNumericField; lol: t.DArrayField<t.DVarcharField> }) satisfies { toto: t.DNumericField; lol: t.DArrayField<t.DVarcharField> }

        const __ =
            D.Struct({ toto: 123, z: ['a', 'b', 'c'] }) satisfies { toto: t.DNumericField; z: t.DArrayField<t.DVarcharField> }

        const __q =
            D.Struct({ toto: 123, z: ['a', 'b', 'c'] }).toto satisfies number
        const __xq =
            D.Struct({ toto: 123, z: 'lol' }) satisfies t.DStructField<{ toto: t.DNumericField; z: t.DVarcharField }>

    }

})

test('META type checking ', async () => {
    const errs = await Bun.$`tsgo --pretty false|grep -E  'deep-map.ts|type-system.test.ts'`.nothrow().text();
    expect(errs).toBeEmpty();
})