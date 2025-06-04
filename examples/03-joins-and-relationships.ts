// 🔗 BuckDB: Joins & Relationships Made Beautiful
// Complex data relationships with simple JavaScript syntax

import { Buck, MemoryDB } from '../buckdb'

// Use the memory database with DuckDB's built-in system tables
const db = MemoryDB

// ================================
// 🎯 BASIC JOINS - Connect system tables effortlessly
// ================================

// Join DuckDB functions with their types - real system data!
const functionTypes = await MemoryDB.from('duckdb_functions()')
    .join('duckdb_types()', 'types', ({ duckdb_functions, types }) => 
        duckdb_functions.return_type === types.logical_type
    )
    .select(({ duckdb_functions, types }) => ({
        // 🔥 Access fields from multiple tables
        functionName: duckdb_functions.function_name,
        returnType: duckdb_functions.return_type,
        typeCategory: types.type_category,
        
        // 🔥 Cross-table calculations
        complexity: duckdb_functions.function_name.len() + types.logical_type.len(),
        
        // 🔥 Conditional logic across tables
        isStringFunction: types.logical_type === 'VARCHAR' ? 'Text Processing' : 'Other',
        
        // 🔥 Template literals with multiple table data
        summary: `${duckdb_functions.function_name}() -> ${types.logical_type} (${types.type_category})`
    }))
    .where(({ duckdb_functions }) => 
        duckdb_functions.function_name.Like('%string%') ||
        duckdb_functions.function_name.Like('%text%')
    )
    .limit(10)
    .execute()

console.log('Function-Type Relationships:', functionTypes)

// ================================
// 🌟 ADVANCED JOINS - Multiple tables with complex logic
// ================================

// Join functions, types, and settings for comprehensive analysis
const systemAnalysis = await MemoryMemoryDB.from('duckdb_functions()', 'f')
    .join('duckdb_types()', 't', ({ f, t }) => f.return_type === t.logical_type)
    .join('duckdb_settings()', 's', ({ f, s }) => 
        f.function_name.upper().includes(s.name.upper())
    )
    .select(({ f, t, s }, D) => ({
        // 🔥 Complex field access
        functionName: f.function_name,
        returnType: t.logical_type,
        settingName: s.name,
        
        // 🔥 Advanced string operations
        namePattern: f.function_name.regexp_extract(/[a-z]+/, 0),
        settingPattern: s.name.regexp_replace(/_/g, '-'),
        
        // 🔥 Mathematical calculations
        nameLength: f.function_name.len(),
        similarity: f.function_name.levenshtein(s.name),
        
        // 🔥 Complex conditions with multiple tables
        isCompatible: f.function_name.len() > 5 && 
                     t.logical_type !== 'UNKNOWN' &&
                     s.input_type === 'VARCHAR',
        
        // 🔥 Nested ternary operations
        category: f.function_type === 'scalar' ? 'Simple' :
                 f.function_type === 'aggregate' ? 'Advanced' : 'Complex',
        
        // 🔥 Cross-table template literals
        description: `Function ${f.function_name} returns ${t.logical_type} - relates to setting ${s.name}`
    }))
    .where(({ f, t, s }) => 
        f.function_name.len() > 3 &&
        t.logical_type !== 'UNKNOWN' &&
        s.name.len() > 2
    )
    .orderBy(({ f }) => f.function_name.len(), 'DESC')
    .limit(15)
    .execute()

console.log('System Analysis:', systemAnalysis)

// ================================
// 🚀 SELF-JOINS - Advanced relationship discovery
// ================================

// Find functions that share similar characteristics
const functionSimilarity = await MemoryDB.from('duckdb_functions()', 'f1')
    .join('duckdb_functions()', 'f2', ({ f1, f2 }) => 
        f1.function_name !== f2.function_name &&
        f1.function_type === f2.function_type &&
        f1.return_type === f2.return_type
    )
    .select(({ f1, f2 }, D) => ({
        // 🔥 Comparing similar functions
        function1: f1.function_name,
        function2: f2.function_name,
        sharedType: f1.function_type,
        sharedReturn: f1.return_type,
        
        // 🔥 String distance calculations
        nameSimilarity: f1.function_name.levenshtein(f2.function_name),
        
        // 🔥 Advanced string analysis
        commonPrefix: f1.function_name[1.3] === f2.function_name[1.3] ? 'Similar Start' : 'Different',
        
        // 🔥 Complex similarity scoring
        similarityScore: f1.function_name.levenshtein(f2.function_name) / 
                        D.greatest(f1.function_name.len(), f2.function_name.len()),
        
        // 🔥 Pattern analysis
        bothHaveUnderscore: f1.function_name.Like('%_%') && f2.function_name.Like('%_%'),
        
        // 🔥 Multi-criteria comparison
        relationship: f1.function_name.levenshtein(f2.function_name) < 3 ? 'Very Similar' :
                     f1.function_name.levenshtein(f2.function_name) < 6 ? 'Somewhat Similar' : 'Different'
    }))
    .where(({ f1, f2 }, D) => 
        f1.function_name.levenshtein(f2.function_name) < 8 &&
        f1.function_name.len() > 4 &&
        f2.function_name.len() > 4
    )
    .orderBy(({ f1, f2 }) => f1.function_name.levenshtein(f2.function_name))
    .limit(20)
    .execute()

console.log('Function Similarities:', functionSimilarity)

// ================================
// 🎪 AGGREGATED JOINS - Statistical analysis across tables
// ================================

// Analyze function distribution by type and return type
const functionDistribution = await MemoryDB.from('duckdb_functions()', 'f')
    .join('duckdb_types()', 't', ({ f, t }) => f.return_type === t.logical_type)
    .select(({ f, t }, D) => ({
        functionType: f.function_type,
        returnType: t.logical_type,
        typeCategory: t.type_category,
        
        // 🔥 Aggregation functions
        functionCount: D.count(),
        avgNameLength: D.avg(f.function_name.len()),
        maxNameLength: D.max(f.function_name.len()),
        minNameLength: D.min(f.function_name.len()),
        
        // 🔥 String aggregations
        longestName: D.max_by(f.function_name, f.function_name.len()),
        shortestName: D.min_by(f.function_name, f.function_name.len()),
        
        // 🔥 Complex aggregated calculations
        totalComplexity: D.sum(f.function_name.len() + t.logical_type.len()),
        avgComplexity: D.avg(f.function_name.len() + t.logical_type.len()),
        
        // 🔥 Statistical measures
        nameVariance: D.var_pop(f.function_name.len()),
        
        // 🔥 Conditional aggregations
        longNameCount: D.count().filter(f.function_name.len() > 10)
    }))
    .groupBy('ALL')
    .having(({ f }, D) => D.count() > 2)  // Only groups with multiple functions
    .orderBy(({ f }, D) => D.count(), 'DESC')
    .limit(15)
    .execute()

console.log('Function Distribution Analysis:', functionDistribution)

// ================================
// 🌊 OUTER JOINS - Handle missing relationships gracefully
// ================================

// Left join to find functions without matching types (edge cases)
const functionsWithoutTypes = await MemoryDB.from('duckdb_functions()', 'f')
    .leftJoin('duckdb_types()', 't', ({ f, t }) => f.return_type === t.logical_type)
    .select(({ f, t }, D) => ({
        functionName: f.function_name,
        declaredReturnType: f.return_type,
        
        // 🔥 Handle nullable data from LEFT JOIN
        actualType: t.logical_type ?? 'UNMAPPED',
        typeExists: !!t?.logical_type ? 'EXIST' : 'NOPE',
        
        // 🔥 Conditional expressions with nulls
        typeStatus: t.logical_type ? `Mapped to ${t.logical_type}` : 'No type mapping found',
        
        // 🔥 Complex null handling
        category: !t.logical_type ? 'Orphaned Function' :
                 t.type_category === 'NUMERIC' ? 'Number Function' :
                 t.type_category === 'STRING' ? 'Text Function' : 'Other Function',
        
        // 🔥 Null-safe operations
        typeLength: t?.logical_type?.len() ?? 0,
    }))
    .where(({ f, t }) => 
        f.function_name.len() > 3 &&
        (t?.logical_type.IsNull() || t?.logical_type.len() > 2)
    )
    .orderBy(({ t }) => t?.logical_type.IsNull() ? 0 : 1)  // Unmapped first
    .limit(25)
    .execute()

console.log('Functions Without Type Mappings:', functionsWithoutTypes)

// ================================
// 🎯 CONDITIONAL JOINS - Dynamic relationship building
// ================================

// Join based on complex conditions and pattern matching
const dynamicRelationships = await MemoryDB.from('duckdb_functions()', 'f')
    .join('duckdb_settings()', 's', ({ f, s }) => 
        // 🔥 Complex join conditions with multiple criteria
        f.function_name.regexp_matches('[a-z]+_[a-z]+') &&
        s.name.regexp_matches('[a-z]+_[a-z]+') &&
        f.function_name.substr(0, 4) === s.name.substr(0, 4)
    )
    .select(({ f, s }, D) => ({
        functionName: f.function_name,
        settingName: s.name,
        
        // 🔥 Pattern-based analysis
        sharedPrefix: f.function_name.substr(0, 4),
        functionPattern: f.function_name.regexp_extract('([a-z]+)_([a-z]+)', 0),
        settingPattern: s.name.regexp_extract('([a-z]+)_([a-z]+)', 0),
        
        // 🔥 Advanced similarity metrics
        editDistance: f.function_name.levenshtein(s.name),
        jaroWinkler: f.function_name.jaro_winkler_similarity(s.name),
        
        // 🔥 Semantic relationship scoring
        relationshipStrength: 
            f.function_name.levenshtein(s.name) < 5 ? 'Strong' :
            f.function_name.levenshtein(s.name) < 10 ? 'Moderate' : 'Weak',
        
        // 🔥 Context-aware descriptions
        relationship: `${f.function_name} function relates to ${s.name} setting with ${f.function_name.levenshtein(s.name)} edit distance`
    }))
    .where(({ f, s }) => 
        f.function_name.levenshtein(s.name) < 15 &&
        f.function_name.len() > 5 &&
        s.name.len() > 5
    )
    .orderBy(({ f, s }) => f.function_name.levenshtein(s.name))
    .limit(20)
    .execute()

console.log('Dynamic Relationships:', dynamicRelationships)

/*
🚀 What makes BuckDB joins magical?

✨ NATURAL SYNTAX: JavaScript arrow functions for join conditions
✨ MULTI-TABLE ACCESS: Clean destructuring of joined table data  
✨ CROSS-TABLE OPERATIONS: Calculations and logic spanning multiple tables
✨ SMART TYPE INFERENCE: TypeScript knows your joined data structure
✨ FLEXIBLE CONDITIONS: Complex join logic with regex, math, and string ops
✨ NULL HANDLING: Graceful handling of outer joins and missing data
✨ AGGREGATION POWER: Statistical analysis across related tables

🎯 Next: Explore aggregations, window functions, and data transformations!
*/

console.log('🔗 Master-level joins accomplished!')
