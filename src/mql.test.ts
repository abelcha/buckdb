import { describe, expect, it } from 'bun:test'
import { Buck } from '@buckdb/isomorphic'
import { expectSQL } from './utils.test'

const TestDB = Buck(':memory:')

describe('MQL where queries - SQL generation', () => {
    const sqlTests = [
        {
            name: '$gt operator',
            query: { function_oid: { $gt: 100 } },
            expected: 'FROM duckdb_functions() SELECT function_name WHERE (function_oid > 100)'
        },
        {
            name: '$gte operator',
            query: { function_oid: { $gte: 50 } },
            expected: 'FROM duckdb_functions() SELECT function_name WHERE (function_oid >= 50)'
        },
        {
            name: '$lt operator',
            query: { function_oid: { $lt: 200 } },
            expected: 'FROM duckdb_functions() SELECT function_name WHERE (function_oid < 200)'
        },
        {
            name: '$lte operator',
            query: { function_oid: { $lte: 150 } },
            expected: 'FROM duckdb_functions() SELECT function_name WHERE (function_oid <= 150)'
        },
        {
            name: '$eq operator',
            query: { function_type: { $eq: 'scalar' } },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (function_type = 'scalar')"
        },
        {
            name: '$ne operator',
            query: { function_type: { $ne: 'aggregate' } },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (function_type != 'aggregate')"
        },
        {
            name: '$in operator',
            query: { function_type: { $in: ['scalar', 'aggregate'] } },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (function_type IN ('scalar', 'aggregate'))"
        },
        {
            name: '$nin operator',
            query: { function_type: { $nin: ['table', 'window'] } },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (function_type NOT IN ('table', 'window'))"
        },
        {
            name: 'multiple operators on same field',
            query: { function_oid: { $gt: 10, $lt: 100 } },
            expected: 'FROM duckdb_functions() SELECT function_name WHERE (function_oid > 10 AND function_oid < 100)'
        },
        {
            name: 'multiple fields',
            query: { function_oid: { $gt: 10 }, function_type: { $eq: 'scalar' } },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (function_oid > 10 AND function_type = 'scalar')"
        },
        {
            name: 'direct value comparison',
            query: { function_type: 'scalar' },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (function_type = 'scalar')"
        },
    ]

    sqlTests.forEach(({ name, query, expected }) => {
        it(`should handle ${name}`, () => {
            const result = TestDB.from('duckdb_functions()')
                .select('function_name')
                .where(query)
            expectSQL(result.toSql(), expected)
        })
    })

    it('should handle boolean values', () => {
        const query = (TestDB as any).from('test_table')
            .select('name')
            .where({ is_active: true })
        expectSQL(query.toSql(), "FROM test_table SELECT name WHERE (is_active = true)")
    })

    it('should handle numeric values', () => {
        const query = (TestDB as any).from('test_table')
            .select('name')
            .where({ age: 25 })
        expectSQL(query.toSql(), "FROM test_table SELECT name WHERE (age = 25)")
    })

    it('should work with chained where conditions', () => {
        const query = TestDB.from('duckdb_functions()')
            .select('function_name')
            .where({ function_oid: { $gt: 10 } })
            .where(e => e.function_type === 'scalar')
        expectSQL(query.toSql(), "FROM duckdb_functions() SELECT function_name WHERE (function_oid > 10) AND (function_type = 'scalar')")
    })
})

describe('MQL where queries - $regex', () => {
    const regexTests = [
        {
            name: '$regex operator with string',
            query: { function_name: { $regex: '^sum.*' } },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (regexp_matches(function_name, '^sum.*'))"
        },
        {
            name: '$regex operator with RegExp',
            query: { function_name: { $regex: /^count/i } },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (regexp_matches(function_name, '^count'))"
        },
        {
            name: 'RegExp literal directly',
            query: { function_name: /sum|count/ },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (regexp_matches(function_name, 'sum|count'))"
        },
        {
            name: '$regex with special characters',
            query: { function_name: { $regex: 'test.*value' } },
            expected: "FROM duckdb_functions() SELECT function_name WHERE (regexp_matches(function_name, 'test.*value'))"
        },
    ]

    regexTests.forEach(({ name, query, expected }) => {
        it(`should handle ${name}`, () => {
            const result = TestDB.from('duckdb_functions()')
                .select('function_name')
                .where(query)
            expectSQL(result.toSql(), expected)
        })
    })
})

describe('MQL where queries - execution', () => {
    it('should execute MQL query', async () => {
        await TestDB.create('test_mongo_query', { replace: true })
            .as([
                { id: 1, name: 'Alice', age: 25 },
                { id: 2, name: 'Bob', age: 30 },
                { id: 3, name: 'Charlie', age: 35 }
            ])
            .execute()

        const result = await TestDB.from('test_mongo_query')
            .select()
            .where({ age: { $gt: 25 } })
            .execute()

        expect(result.length).toBe(2)
        expect(result.every((r: any) => r.age > 25)).toBe(true)
    })

    it('should execute MQL query with $in', async () => {
        const result = await TestDB.from('test_mongo_query')
            .select()
            .where({ name: { $in: ['Alice', 'Bob'] } })
            .execute()

        expect(result.length).toBe(2)
        expect(result.map((r: any) => r.name).sort()).toEqual(['Alice', 'Bob'])
    })

    it('should execute MQL query with multiple conditions', async () => {
        const result = await TestDB.from('test_mongo_query')
            .select()
            .where({ age: { $gte: 25, $lte: 30 } })
            .execute()

        expect(result.length).toBe(2)
        expect(result.every((r: any) => r.age >= 25 && r.age <= 30)).toBe(true)
    })

    it('should execute $regex query', async () => {
        const result = await TestDB.from('test_mongo_query')
            .select()
            .where({ name: { $regex: '^[AB]' } })
            .execute()

        expect(result.length).toBe(2)
        expect(result.map((r: any) => r.name).sort()).toEqual(['Alice', 'Bob'])
    })

    it('should execute regex literal query', async () => {
        const result = await TestDB.from('test_mongo_query')
            .select()
            .where({ name: /^C/ })
            .execute()

        expect(result.length).toBe(1)
        expect((result[0] as any).name).toBe('Charlie')
    })
})

