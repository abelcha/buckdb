// 🚀 BuckDB: Getting Started - Real Working Examples
// All examples use actual DuckDB system tables with realistic operations

import { Buck, MemoryDB } from '@buckdb/isomorphic'

// ================================
// 🎯 TYPE-SAFE QUERYING - The Foundation
// ================================

// Basic query with type checking using satisfies
const basicResult = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        function_type: e.function_type,
    }))
    .execute() satisfies {
        function_name: string
        function_type: string
    }[]

console.log('Basic query:', basicResult)


// ================================
// 🎪 WHERE CLAUSES - Boolean operations used correctly
// ================================

// Boolean operations in WHERE clauses - this is the correct way!
const whereClausesResult = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        function_type: e.function_type,
        name_length: e.function_name.len(),
    }))
    .where(e => e.function_name.Like('%sum%') && e.function_name.len().Between(3, 15))
    .execute() satisfies {
        function_name: string
        function_type: string
        name_length: number
    }[]

// console.log('WHERE with Like and Between:', whereClausesResult)

// Using array values
const notNullResult = await MemoryDB.from('duckdb_functions()')
    .select(e => [e.function_name, e.function_type, e.function_name.len()])
    .where(e => !e.description.IsNull())
    .limit(5)
    .execute() satisfies [string, string, number][]

console.log('Functions with descriptions:', notNullResult)


// String WHERE clause
const stringWhereResult = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
    }))
    .where("function_name LIKE '%array%'")
    .limit(3)
    .execute() satisfies {
        function_name: string
    }[]

console.log('String WHERE clause:', stringWhereResult)

// ================================
// 🌟 STRING OPERATIONS - Text processing
// ================================

// String methods in SELECT - non-boolean operations
const stringOpsResult = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        original: e.function_name,
        upper_name: e.function_name.upper(),
        name_length: e.function_name.len(),
        prefix_3: e.function_name[0.3],
        suffix_3: e.function_name[-3],
        starts_with_a: e.function_name.starts_with('a')
    }))
    .where(e => e.function_name.len() < 10)
    .limit(5)
    .execute() satisfies {
        original: string
        upper_name: string
        name_length: number
        prefix_3: string
        suffix_3: string
        starts_with_a: boolean
    }[]

console.log('String operations:', stringOpsResult)

// ================================
// 📊 GROUPBY WITH AGGREGATIONS - Keyed results
// ================================

// GroupBy returns Record<string, Array> - very powerful!
const groupedResult = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        function_count: D.count(),
        shortest_name: D.min(e.function_name),
        avg_name_length: D.avg(e.function_name.len()),
    }))
    .groupBy('function_type')
    .execute() satisfies Record<string, {
        function_count: number
        shortest_name: string
        avg_name_length: number
    }[]>

console.log('Function types:', Object.keys(groupedResult))
console.log('Scalar functions count:', groupedResult.scalar?.[0]?.function_count)

// ================================
// 🎯 SINGLE ROW OPERATIONS - minBy/maxBy
// ================================

// minBy/maxBy return single objects, not arrays!
const shortestFunctionResult = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        function_type: e.function_type,
        name_length: e.function_name.len(),
    }))
    .minBy(e => e.function_name.len())
    .execute() satisfies {
        function_name: string
        function_type: string
        name_length: number
    }

console.log('Shortest function name:', shortestFunctionResult)

// ================================
// 🎲 SAMPLING AND PAGINATION
// ================================

// Sample and pagination work together
const sampleResult = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        function_type: e.function_type,
    }))
    .where(e => e.function_type === 'scalar')
    .sample(10)
    .limit(3)
    .execute() satisfies {
        function_name: string
        function_type: string
    }[]

console.log('Sample result:', sampleResult)

// ================================
// 🧮 NUMERIC OPERATIONS - Mathematical expressions
// ================================

// Numeric operations on function metadata
const numericResult = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        name_length: e.function_name.len(),
        length_squared: e.function_name.len() * e.function_name.len(),
        length_plus_ten: e.function_name.len() + 10,
        length_mod_3: e.function_name.len() % 3,
    }))
    .where(e => e.function_name.len().Between(5, 15))
    .limit(5)
    .execute() satisfies {
        function_name: string
        name_length: number
        length_squared: number
        length_plus_ten: number
        length_mod_3: number
    }[]

console.log('Numeric operations:', numericResult)

// ================================
// 🎭 CONDITIONAL EXPRESSIONS - Ternary operators
// ================================

// Ternary operators compile to SQL CASE statements
const conditionalResult = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        category: e.function_type === 'scalar' ? 'SCALAR_FUNC' : 'OTHER_FUNC',
        size_category: e.function_name.len() > 10 ? 'LONG' :
            e.function_name.len() > 5 ? 'MEDIUM' : 'SHORT',
        mixed_result: e.function_name === 'sum' ? 42 : e.function_name,
    }))
    .limit(5)
    .execute() satisfies {
        function_name: string
        category: string
        size_category: string
        mixed_result: string | number
    }[]

console.log('Conditional expressions:', conditionalResult)

// ================================
// 🏗️ NESTED STRUCTURES - Complex objects
// ================================

// Deep object nesting in select clauses
const nestedResult = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        metadata: {
            name: e.function_name,
            type: e.function_type,
            analysis: {
                length: e.function_name.len(),
                category: e.function_name.len() > 10 ? 'long' : 'short',
                first_char: e.function_name[0.1],
            },
        },
    }))
    .where(e => e.function_type === 'scalar')
    .limit(3)
    .execute() satisfies {
        metadata: {
            name: string
            type: string
            analysis: {
                length: number
                category: string
                first_char: string
            }
        }
    }[]

console.log('Nested structure:', nestedResult)

// ================================
// 🔗 PATTERN MATCHING - WHERE clause patterns
// ================================

// xxzPattern matching with Like, Between, IsNull used correctly in WHERE
const patternResult = await MemoryDB.from('duckdb_functions()')
    .select()
    .where(e =>
        e.function_name.Like('%str%') &&
        e.function_name.len().Between(3, 12) &&
        !e.description.IsNull()
    )
    .execute() satisfies {
        function_name: string
        name_length: number
        function_type: string
    }[]

console.log('Pattern matching in WHERE:', patternResult)

// ================================
// ➕ STRING CONCATENATION - Template literals
// ================================

// String concatenation using multiple patterns
const stringConcatResult =
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            // Template literal style
            description: `Function "${e.function_name}" is of type ${e.function_type}`,

            // Plus operator concatenation
            simple_concat: e.function_name + '_func',

            // Mixed operations
            detailed_info: 'Name: ' + e.function_name + ', Length: ' + e.function_name.len(),
        }))
        .where(e => e.function_type === 'scalar')
        .limit(3)
        .execute() satisfies {
            description: string
            simple_concat: string
            detailed_info: string
        }[]

console.log('String concatenation:', stringConcatResult)

// ================================
// 🎯 ADVANCED AGGREGATIONS
// ================================

// Advanced aggregation patterns
const advancedAggResult = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        function_type: e.function_type,
        total_functions: D.count(),
        function_names: D.array_agg(e.function_name),
        avg_name_length: D.avg(e.function_name.len()),
        longest_name: D.max(e.function_name),
        shortest_name: D.min(e.function_name),
    }))
    .groupBy('function_type')
    .execute() satisfies Record<string, {
        function_type: string
        total_functions: number
        function_names: string[]
        avg_name_length: number
        longest_name: string
        shortest_name: string
    }[]>

console.log('Advanced aggregations by type:')
Object.entries(advancedAggResult).forEach(([type, data]) => {
    console.log(`${type}: ${data[0].total_functions} functions, avg length: ${data[0].avg_name_length.toFixed(1)}`)
})

// ================================
// 🔗 REALISTIC JOINS
// ================================

// Cross join to demonstrate multi-table operations
const joinResult = await MemoryDB.from('duckdb_functions()')
    .leftJoin('duckdb_types()', 'types').on((a, b) => true)
    .select(e => ({
        function_name: e.duckdb_functions.function_name,
        type_name: e.types.logical_type,
        combination: e.duckdb_functions.function_name + '_' + e.types.logical_type,
    }))
    .where(e => e.duckdb_functions.function_type === 'scalar' && e.types.logical_type.Like('%INT%'))
    .limit(5)
    .execute() satisfies {
        function_name: string
        type_name: string
        combination: string
    }[]

console.log('Join result:', joinResult)

/*
🚀 What makes BuckDB extraordinary?

✨ TYPE SAFETY: Full TypeScript integration with satisfies checks
✨ COMPLEX JOINS: Multi-table operations with intelligent aliases
✨ STRING OPERATIONS: levenshtein, damerau_levenshtein, concat_ws, etc.
✨ AGGREGATION POWER: groupBy returns Record<string, T[]> structures
✨ SINGLE ROW OPS: minBy/maxBy return single objects, not arrays
✨ KEYED RESULTS: keyBy creates Record<string, T> lookups
✨ SAMPLING: sample(N) or sample('50%') for data sampling
✨ NESTED OBJECTS: Deep object structures in select clauses
✨ NUMERIC OPS: pow, sqrt, to_hex, to_base with type safety
✨ CONDITIONALS: Ternary operators with proper type inference
✨ MIXED TYPES: Implicit conversions handled intelligently

🎯 Next: Explore CTEs, unions, array operations, and advanced patterns!
*/

console.log('🎉 BuckDB: Where JavaScript truly meets SQL!')
