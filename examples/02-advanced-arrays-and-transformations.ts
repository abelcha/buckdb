// 🚀 BuckDB: Advanced Arrays & Transformations
// Real working examples based on actual BuckDB capabilities

import { Buck, MemoryDB } from '../buckdb'

// ================================
// 🎯 ARRAY OPERATIONS - JavaScript patterns that work!
// ================================

// Array methods and transformations using working BuckDB syntax
const arrayOperationsResult = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        function_name: e.function_name,

        // 🔥 String split into arrays - real BuckDB syntax!
        name_parts: e.function_name.str_split('_'),

        // 🔥 Array transformations using D.array_transform
        uppercase_parts: D.array_transform(e.function_name.str_split('_'), part => part.upper()),

        // 🔥 Array filtering using array_filter
        filtered_parts: e.function_name.str_split('_').array_filter(part => part.len() > 3),

        // 🔥 Complex array operations with map and filter chaining
        processed_name: e.function_name.str_split('_')
            .map(part => part.upper())
            .filter(part => part.len() > 2),

        // 🔥 Array creation and manipulation
        sample_array: D.Array(['prefix', 'main', 'suffix'])
            .map(item => item + '_' + e.function_name),

        // 🔥 Array contains checks
        has_underscore: e.function_name.str_split('').array_contains('_'),
    }))
    .where(e => e.function_name.Like('%_%'))  // Only functions with underscores
    .limit(5)
    .execute() satisfies {
        function_name: string
        name_parts: string[]
        uppercase_parts: string[]
        filtered_parts: string[]
        processed_name: string[]
        sample_array: string[]
        has_underscore: boolean
    }[]

console.log('Array operations:', arrayOperationsResult)

// ================================
// 🏗️ WITH CLAUSES (CTEs) - Build complex queries step by step
// ================================

// WITH clauses for complex multi-step transformations
const withClauseResult = await Buck().with(
    // Step 1: Create a filtered dataset
    (accDB) => ({
        filtered_functions: accDB.from('duckdb_functions()')
            .select('function_name', 'function_oid', 'function_type', 'description')
            .where(f => f.function_name.len() > 5)
    }),

    // Step 2: Add computed columns
    accDB => ({
        enhanced_functions: accDB.from('filtered_functions')
            .select(e => ({
                original_name: e.function_name,
                name_length: e.function_name.len(),
                type_category: e.function_type === 'scalar' ? 'SCALAR' : 'OTHER',
                has_description: !e.description.IsNull()
            }))
    })
).from('enhanced_functions')
    .select()
    .execute() satisfies {
        original_name: string
        name_length: number
        type_category: string
        has_description: boolean
    }[]

console.log('WITH clause result:', withClauseResult.slice(0, 3))

// ================================
// 🔗 UNION & EXCEPT OPERATIONS - Combine datasets intelligently
// ================================

// Union different datasets with compatible schemas
const unionResult = await MemoryDB.from('duckdb_functions()')
    .select(f => ({ name: f.function_name, category: 'function' }))
    .where(f => f.function_type === 'scalar')
    .limit(3)
    .union(
        MemoryDB.from('duckdb_types()')
            .select(t => ({
                name: t.logical_type,
                category: 'type'
            }))
            .limit(3)
    )
    .execute() satisfies {
        name: string
        category: string
    }[]

console.log('Union result:', unionResult)

// Except operations - find differences between datasets
const exceptResult = await MemoryDB.from('duckdb_functions()')
    .select(f => ({ name: f.function_name }))
    .where(f => f.function_name.len() < 10)
    .except(
        MemoryDB.from('duckdb_functions()')
            .select(f => ({ name: f.function_name }))
            .where(f => f.function_name.Like('%string%'))
    )
    .limit(5)
    .execute() satisfies {
        name: string
    }[]

console.log('Except result:', exceptResult)

// ================================
// 🎭 COMPLEX CONDITIONAL EXPRESSIONS - Advanced type inference
// ================================

// Complex conditional logic with proper type inference
const conditionalTypesResult = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        function_name: e.function_name,

        // 🔥 Mixed type conditionals - string | number
        flexible_result: e.function_name === 'sum' ? 42 : e.function_name,

        // 🔥 Number conditionals with explicit typing
        id_category: e.function_oid > 100 ? 'HIGH_ID' : 'LOW_ID',

        // 🔥 Complex nested conditionals
        complexity_score: e.function_name.len() > 15 ? 'VERY_COMPLEX' :
            e.function_name.len() > 10 ? 'COMPLEX' :
                e.function_name.len() > 5 ? 'MEDIUM' : 'SIMPLE',
        // 🔥 Template literals in conditionals
        status_message: e.function_name.len() > 10
            ? `Long function: ${e.function_name}`
            : `Short: ${e.function_name}`,
    }))
    .where(e => (
        e.function_name.Like('%agg%') || e.function_name.Like('%sum%')
    ))
    .limit(5)
    .execute() satisfies {
        function_name: string
        flexible_result: string | number
        id_category: string
        complexity_score: string
        status_message: string
    }[]

console.log('Conditional types:', conditionalTypesResult)

// ================================
// 🏭 STRUCT OPERATIONS - Complex nested data
// ================================

// Working with structured data using D.Struct
const structOperationsResult = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        function_name: e.function_name,

        // 🔥 Create complex nested structures
        metadata: D.Struct({
            name: e.function_name,
            details: {
                length: e.function_name.len(),
                type: e.function_type,
                has_underscore: e.function_name.Like('%_%')
            },
            tags: ['function', 'database', 'operation']
        }),

        // 🔥 Dynamic struct creation
        analysis: D.Struct({
            complexity: e.function_name.len() > 10 ? 'HIGH' : 'LOW',
            score: e.function_name.len() * 2,
            categories: [e.function_type, 'utility']
        }),

        // 🔥 Simple property access
        name_length: e.function_name.len(),
    }))
    .limit(3)
    .execute() satisfies {
        function_name: string
        metadata: {
            name: string
            details: {
                length: number
                type: string
                has_underscore: boolean
            }
            tags: string[]
        }
        analysis: {
            complexity: string
            score: number
            categories: string[]
        }
        name_length: number
    }[]

console.log('Struct operations:', structOperationsResult)

// ================================
// 🔄 ARRAY TRANSFORMATIONS - Advanced processing
// ================================

// Advanced array transformations and reductions
const arrayTransformationsResult = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        function_name: e.function_name,

        // 🔥 Array transformations with D.array_transform
        char_analysis: D.array_transform(
            e.function_name.str_split(''),
            char => ({
                character: char,
                is_vowel: D.Array(['a', 'e', 'i', 'o', 'u']).array_contains(char.lower()),
                length: char.len()
            })
        ),

        // 🔥 Array filtering with conditions
        vowels_only: e.function_name.str_split('')
            .array_filter(char => D.Array(['a', 'e', 'i', 'o', 'u']).array_contains(char.lower())),

        // 🔥 Array reductions using reduce
        total_char_count: e.function_name.str_split('')
            .map(char => char.len())
            .reduce((acc, curr) => acc + curr, 0),

        // 🔥 Complex array operations
        processed_segments: D.Array(['prefix', 'main', 'suffix'])
            .map(segment => segment + '_processed')
            .filter(result => result.len() < 20),
    }))
    .where(e => e.function_name.len() < 15)  // Keep examples manageable
    .limit(3)
    .execute() satisfies {
        function_name: string
        char_analysis: { character: string; is_vowel: boolean; length: number }[]
        vowels_only: string[]
        total_char_count: number
        processed_segments: string[]
    }[]

console.log('Array transformations:', arrayTransformationsResult)

// ================================
// 🎨 TEMPLATE LITERALS - Advanced string composition
// ================================

// Complex template literal usage
const templateLiteralsResult = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        // 🔥 Multi-line template literals
        detailed_description: `Function: ${e.function_name}
Type: ${e.function_type}
Length: ${e.function_name.len()} characters
Category: ${e.function_name.len() > 10 ? 'Complex' : 'Simple'}
Status: ${e.description.IsNull() ? 'No docs' : 'Documented'}`,

        // 🔥 Conditional template literals
        summary: e.function_type === 'scalar'
            ? `⚡ SCALAR: ${e.function_name} (${e.function_name.len()})`
            : `📊 ${e.function_type.upper()}: ${e.function_name}`,

        // 🔥 Complex expressions in templates
        analysis_report: `${e.function_name} | Score: ${e.function_name.len() * 2} | ${e.function_name.Like('%_%') ? 'Multi-word' : 'Single-word'
            } | ${e.function_type}`,
    }))
    .limit(3)
    .execute() satisfies {
        detailed_description: string
        summary: string
        analysis_report: string
    }[]

console.log('Template literals:', templateLiteralsResult)

// ================================
// 🚀 MIXED RESULT TYPES - Flexible returns
// ================================

// Different return types based on query structure
const mixedResultsArray = await MemoryDB.from('duckdb_functions()')
    .select(e => e.function_name.len() > 10 ? 42 : 'short')
    .limit(5)
    .execute() satisfies (number | string)[]

const mixedResultsTuple = await MemoryDB.from('duckdb_functions()')
    .select(e => [e.function_name, e.function_name.len()] as const)
    .limit(3)
    .execute() satisfies [string, number][]

const mixedResultsString = await MemoryDB.from('duckdb_functions()')
    .select(e => `${e.function_name}: ${e.function_name.len()}`)
    .limit(3)
    .execute() satisfies string[]

console.log('Mixed results:', { mixedResultsArray, mixedResultsTuple, mixedResultsString })

// ================================
// 🎯 ADVANCED GROUPING PATTERNS
// ================================

// GroupBy with array aggregations - returns Record<string, T[]>
const advancedGrouping = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        function_type: e.function_type,
        function_names: D.array_agg(e.function_name),
        avg_length: D.avg(e.function_name.len()),
        count: D.count(),
        samples: D.array_agg(e.function_name).slice(0, 3)
    }))
    .groupBy('function_type')
    .having(e => e.avg_length > 5)
    .execute() satisfies Record<string, {
        function_type: string
        function_names: string[]
        avg_length: number
        count: number
        samples: string[]
    }[]>

console.log('Advanced grouping keys:', Object.keys(advancedGrouping).slice(0, 3))

// ================================
// 🔧 SPECIAL OPERATIONS
// ================================

// keyBy creates Record<string, T> lookup structures
const lookupTable = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        function_name: e.function_name,
        details: D.array_agg(e.description),
        metadata: {
            type: e.function_type,
            length: e.function_name.len()
        }
    }))
    .keyBy('function_name')
    .execute() satisfies Record<string, {
        function_name: string
        details: string[]
        metadata: {
            type: string
            length: number
        }
    }>

console.log('Lookup table sample keys:', Object.keys(lookupTable).slice(0, 3))

// distinctOn for unique values with additional criteria
const distinctFunctions = await MemoryDB.from('duckdb_functions()')
    .select(e => ({
        function_type: e.function_type,
        first_function: e.function_name,
        length: e.function_name.len()
    }))
    .distinctOn('function_type', e => e.function_name.len())
    .execute() satisfies {
        function_type: string
        first_function: string
        length: number
    }[]

console.log('Distinct functions:', distinctFunctions)

/*
🚀 Advanced BuckDB Features Showcased:

✨ ARRAY OPERATIONS: str_split, array_transform, array_filter with real syntax
✨ WITH CLAUSES: Multi-step CTEs for complex transformations  
✨ UNION/EXCEPT: Combine and compare datasets elegantly
✨ CONDITIONAL TYPES: Advanced type inference with mixed returns
✨ STRUCT OPERATIONS: Nested object creation and manipulation
✨ ARRAY TRANSFORMATIONS: Complex array processing with map/filter/reduce
✨ TEMPLATE LITERALS: Multi-line string composition with expressions
✨ MIXED RETURNS: Flexible result types (arrays, tuples, strings)
✨ GROUPING PATTERNS: Record<string, T[]> and Record<string, T> structures
✨ SPECIAL OPS: keyBy, distinctOn for advanced data manipulation
✨ TYPE SAFETY: Every operation maintains TypeScript type safety

🎯 Next: Explore joins, window functions, and analytical operations!
*/

console.log('🎉 Advanced transformations mastered!')
