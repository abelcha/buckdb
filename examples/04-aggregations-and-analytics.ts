// 📊 BuckDB: Aggregations & Analytics Powerhouse
// Transform data into insights with JavaScript-native syntax

import { MemoryDB } from '../buckdb'

// ================================
// 🎯 BASIC AGGREGATIONS - Statistical insights made simple
// ================================

// Analyze DuckDB function characteristics
const functionStats = await MemoryDB.from('duckdb_functions()')
    .select((f, D) => ({
        // 🔥 Count and basic stats
        totalFunctions: D.count(),
        avgNameLength: D.avg(f.function_name.len()),
        maxNameLength: D.max(f.function_name.len()),
        minNameLength: D.min(f.function_name.len()),

        // 🔥 Advanced statistical functions
        stdDevNameLength: D.stddev(f.function_name.len()),
        varianceNameLength: D.var_pop(f.function_name.len()),

        // 🔥 String aggregations
        longestFunctionName: D.max_by(f.function_name, f.function_name.len()),
        shortestFunctionName: D.min_by(f.function_name, f.function_name.len()),

        // 🔥 Array aggregations  
        allFunctionTypes: D.array_agg(D.Distinct(f.function_type)),
        sampleFunctions: D.array_agg(f.function_name),

        // 🔥 Advanced calculations
        complexityScore: D.sum(f.function_name.len() * f.parameters.len()),
        avgComplexity: D.avg(f.function_name.len() * f.parameters.len())
    }))
    .execute()

console.log('Function Statistics:', functionStats)

// ================================
// 🚀 GROUP BY ANALYTICS - Segment your data powerfully
// ================================

// Analyze functions by type with rich statistics
const functionsByType = await MemoryDB.from('duckdb_functions()')
    .select((f, D) => ({
        functionType: f.function_type,

        // 🔥 Count and distribution
        functionCount: D.count(),

        // 🔥 Name analysis
        avgNameLength: D.round(D.avg(f.function_name.len()), 2),
        nameVariation: D.round(D.stddev(f.function_name.len()), 2),

        // 🔥 Representative examples
        exampleFunctions: D.array_agg(f.function_name),
        longestName: D.max_by(f.function_name, f.function_name.len()),

        // 🔥 Complexity metrics
        totalComplexity: D.sum(f.function_name.len() + f.parameters.len()),
        avgComplexity: D.round(D.avg(f.function_name.len() + f.parameters.len()), 2),

        // 🔥 Advanced aggregations
        distinctReturnTypes: D.count(D.Distinct(f.return_type)),

        // 🔥 Conditional statistics
        hasDocumentation: D.count().filter(!f.description.IsNull()),
        withUnderscores: D.count().filter(f.function_name.Like('%_%'))
    }))
    .groupBy('function_type')
    .having((f, D) => D.count() > 5)  // Only significant groups
    .orderBy((f, D) => D.count(), 'DESC')
    .execute()

console.log('Functions by Type:', functionsByType)

// ================================
// 🌟 WINDOW FUNCTIONS - Advanced analytical operations  
// ================================

// Rank and analyze functions with window functions
const functionRankings = await MemoryDB.from('duckdb_functions()')
    .select((f, D) => ({
        functionName: f.function_name,
        functionType: f.function_type,
        nameLength: f.function_name.len(),

        // 🔥 Ranking functions
        overallRank: D.row_number().over().orderBy(f.function_name.len(), 'DESC'),
        lengthRank: D.rank().over().orderBy(f.function_name.len(), 'DESC'),
        denseRank: D.dense_rank().over().orderBy(f.function_name.len(), 'DESC'),

        // 🔥 Percentile functions
        lengthPercentile: D.percent_rank().over().orderBy(f.function_name.len()),
        lengthQuartile: D.ntile(4).over().orderBy(f.function_name.len()),

        // 🔥 Window aggregations
        avgLengthInType: D.avg(f.function_name.len()).over().partitionBy(f.function_type),
        maxLengthInType: D.max(f.function_name.len()).over().partitionBy(f.function_type),
        countInType: D.count().over().partitionBy(f.function_type),

        // 🔥 Lag/Lead functions
        previousFunction: D.lag(f.function_name, 1).over().orderBy(f.function_name.len()),
        nextFunction: D.lead(f.function_name, 1).over().orderBy(f.function_name.len()),

        // 🔥 Running calculations
        runningCount: D.count().over().orderBy(f.function_name.len()),
        runningAvgLength: D.avg(f.function_name.len()).over().orderBy(f.function_name.len()),

        // 🔥 Complex window expressions
        lengthDifferenceFromAvg: f.function_name.len() - D.avg(f.function_name.len()).over().partitionBy(f.function_type),
        isAboveTypeAverage: f.function_name.len() > D.avg(f.function_name.len()).over().partitionBy(f.function_type)
    }))
    .where(f => f.function_name.len() > 5)
    .orderBy(f => f.function_name.len(), 'DESC')
    .limit(25)
    .execute()

console.log('Function Rankings:', functionRankings)

// ================================
// 🎪 MULTI-LEVEL GROUPING - Hierarchical analysis
// ================================

// Multi-dimensional analysis of function characteristics
const hierarchicalAnalysis = await MemoryDB.from('duckdb_functions()')
    .select((f, D) => ({
        functionType: f.function_type,
        returnType: f.return_type,
        lengthCategory: f.function_name.len() < 6 ? 'Short' :
            f.function_name.len() < 12 ? 'Medium' : 'Long',

        // 🔥 Basic counts
        functionCount: D.count(),

        // 🔥 Descriptive statistics
        avgNameLength: D.round(D.avg(f.function_name.len()), 2),
        medianNameLength: D.median(f.function_name.len()),

        // 🔥 Distribution analysis
        minLength: D.min(f.function_name.len()),
        maxLength: D.max(f.function_name.len()),
        lengthRange: D.max(f.function_name.len()) - D.min(f.function_name.len()),

        // 🔥 Sample data
        exampleFunctions: D.string_agg(f.function_name, ', '),
        representativeFunction: D.arbitrary(f.function_name),

        // 🔥 Pattern detection
        underscoreCount: D.count().filter(f.function_name.Like('%_%')),
        numberCount: D.count().filter(f.function_name.regexp_matches('[0-9]')),

        // 🔥 Conditional aggregations
        documentedCount: D.count().filter(!f.description.IsNull()),

        // 🔥 Advanced metrics
        uniqueReturnTypes: D.count(D.Distinct(f.return_type)),
        avgParameterCount: D.round(D.avg(f.parameters.len()), 2),

        // 🔥 Complexity scoring
        totalComplexity: D.sum(
            f.function_name.len() +
            f.parameters.len() * 2 +
            (f.description.IsNull() ? 0 : f.description.len() / 10)
        ),
        avgComplexity: D.round(D.avg(
            f.function_name.len() +
            f.parameters.len() * 2 +
            (f.description.IsNull() ? 0 : f.description.len() / 10)
        ), 2)
    }))
    .groupBy('function_type', 'return_type', 'lengthCategory')
    .having((f, D) => D.count() >= 2)
    .orderBy([(f, D) => D.count(), 'DESC'], ['function_type', 'ASC'], ['return_type', 'ASC'])
    .limit(30)
    .execute()

console.log('Hierarchical Analysis:', hierarchicalAnalysis)

// ================================
// 🌊 ADVANCED AGGREGATIONS - Custom analytical functions
// ================================

// Complex analytical operations combining multiple techniques
const advancedAnalytics = await MemoryDB.from('duckdb_functions()')
    .select((f, D) => ({
        functionType: f.function_type,

        // 🔥 Advanced statistical measures
        geometricMean: D.exp(D.avg(D.ln(f.function_name.len()))),
        harmonicMean: D.count() / D.sum(1.0 / f.function_name.len()),

        // 🔥 Distribution characteristics
        skewness: D.skewness(f.function_name.len()),
        kurtosis: D.kurtosis(f.function_name.len()),

        // 🔥 Quantile analysis
        q1: D.quantile_disc(f.function_name.len(), 0.25),
        median: D.quantile_disc(f.function_name.len(), 0.5),
        q3: D.quantile_disc(f.function_name.len(), 0.75),
        iqr: D.quantile_disc(f.function_name.len(), 0.75) - D.quantile_disc(f.function_name.len(), 0.25),

        // 🔥 Entropy and information theory
        nameEntropy: D.entropy(f.function_name),
        returnTypeEntropy: D.entropy(f.return_type),

        // 🔥 Advanced string analytics
        avgEditDistance: D.avg(f.function_name.levenshtein('function')),
        maxSimilarity: D.max(f.function_name.jaro_winkler_similarity('aggregate')),

        // 🔥 Pattern frequency analysis
        vowelRatio: D.avg(D.regexp_extract_all(f.function_name, /[aeiou]/).len() / f.function_name.len()),
        consonantRatio: D.avg(D.regexp_extract_all(f.function_name, /[bcdfghjklmnpqrstvwxyz]/).len() / f.function_name.len()),

        // 🔥 Complexity distribution
        simpleCount: D.count().filter(f.function_name.len() <= 6 && f.parameters.len() <= 2),
        complexCount: D.count().filter(f.function_name.len() > 10 && f.parameters.len() > 3),

        // 🔥 Function density analysis
        functionDensity: D.count() / (D.max(f.function_oid) - D.min(f.function_oid) + 1),

        // 🔥 Character analysis
        avgUppercaseRatio: D.avg(D.regexp_extract_all(f.function_name, /[A-Z]/).len() / f.function_name.len()),
        specialCharCount: D.sum(D.regexp_extract_all(f.function_name, /[^a-zA-Z0-9_]/).len()),

        // 🔥 Semantic grouping
        mathFunctions: D.count().filter(f.function_name.Like('%math%') || f.function_name.Like('%calc%')),
        stringFunctions: D.count().filter(f.function_name.Like('%str%') || f.function_name.Like('%text%')),
        dateFunctions: D.count().filter(f.function_name.Like('%date%') || f.function_name.Like('%time%'))
    }))
    .groupBy('function_type')
    .having((f, D) => D.count() > 3)
    .orderBy((f, D) => D.count(), 'DESC')
    .execute()

console.log('Advanced Analytics:', advancedAnalytics)

// ================================
// 🚀 ROLLING ANALYTICS - Time-series style analysis
// ================================

// Simulate time-series analysis using function_oid as a sequence
const rollingAnalysis = await MemoryDB.from('duckdb_functions()')
    .select((f, D) => ({
        functionName: f.function_name,
        functionOid: f.function_oid,
        nameLength: f.function_name.len(),

        // 🔥 Rolling window calculations
        rollingAvg3: D.avg(f.function_name.len()).over()
            .orderBy(f.function_oid)
            .rowsBetween(2, 'CURRENT ROW'),

        rollingMax5: D.max(f.function_name.len()).over()
            .orderBy(f.function_oid)
            .rowsBetween(4, 'CURRENT ROW'),

        rollingSum: D.sum(f.function_name.len()).over()
            .orderBy(f.function_oid)
            .rowsBetween('UNBOUNDED PRECEDING', 'CURRENT ROW'),

        // 🔥 Moving statistics
        movingStdDev: D.stddev(f.function_name.len()).over()
            .orderBy(f.function_oid)
            .rowsBetween(9, 'CURRENT ROW'),

        movingVariance: D.var_pop(f.function_name.len()).over()
            .orderBy(f.function_oid)
            .rowsBetween(9, 'CURRENT ROW'),

        // 🔥 Trend analysis
        deltaFromPrevious: f.function_name.len() - D.lag(f.function_name.len(), 1).over().orderBy(f.function_oid),

        deltaFromNext: D.lead(f.function_name.len(), 1).over().orderBy(f.function_oid) - f.function_name.len(),

        // 🔥 Percentile tracking
        runningPercentile: D.percent_rank().over().orderBy(f.function_name.len()),

        // 🔥 Sequential patterns
        isLocalMaxima: f.function_name.len() > D.lag(f.function_name.len(), 1).over().orderBy(f.function_oid) &&
            f.function_name.len() > D.lead(f.function_name.len(), 1).over().orderBy(f.function_oid),

        sequentialId: D.row_number().over().orderBy(f.function_oid),

        // 🔥 Growth patterns
        cumulativeComplexity: D.sum(f.function_name.len() * f.parameters.len()).over()
            .orderBy(f.function_oid)
            .rowsBetween('UNBOUNDED PRECEDING', 'CURRENT ROW')
    }))
    .where(f => f.function_oid > 0)
    .orderBy('function_oid')
    .limit(50)
    .execute()

console.log('Rolling Analysis:', rollingAnalysis)

// ================================
// 🎯 GROUPING SETS - Advanced grouping techniques
// ================================

// Multiple grouping levels in a single query
const groupingSetsAnalysis = await MemoryDB.from('duckdb_functions()')
    .select((f, D) => ({
        functionType: f.function_type,
        returnType: f.return_type,

        // 🔥 Flexible aggregations
        totalFunctions: D.count(),
        avgComplexity: D.avg(f.function_name.len() + f.parameters.len()),
        maxNameLength: D.max(f.function_name.len()),

        // 🔥 Statistical measures
        stdDevLength: D.stddev(f.function_name.len()),

        // 🔥 Pattern counts
        withUnderscores: D.count().filter(f.function_name.Like('%_%')),
        withNumbers: D.count().filter(f.function_name.regexp_matches('[0-9]')),

        // 🔥 Representative samples
        longestFunction: D.max_by(f.function_name, f.function_name.len()),
        mostComplex: D.max_by(f.function_name, f.function_name.len() + f.parameters.len())
    }))
    .groupBy('GROUPING SETS', [
        ['function_type', 'return_type'],  // Detailed breakdown
        ['function_type'],                 // By function type only
        ['return_type'],                   // By return type only
        []                                 // Grand total
    ])
    .orderBy(['function_type', 'return_type'])
    .execute()

console.log('Grouping Sets Analysis:', groupingSetsAnalysis)

/*
🚀 What makes BuckDB aggregations extraordinary?

✨ NATURAL SYNTAX: JavaScript functions that compile to optimal SQL aggregations
✨ STATISTICAL POWER: Advanced functions like stddev, kurtosis, entropy built-in
✨ WINDOW FUNCTIONS: Powerful analytical operations with intuitive syntax
✨ FLEXIBLE GROUPING: GROUPING SETS, CUBE, ROLLUP support for complex analysis
✨ TYPE SAFETY: TypeScript knows your aggregation result types
✨ PERFORMANCE: Optimized SQL generation for maximum query efficiency
✨ COMPLEX EXPRESSIONS: Combine multiple aggregation techniques seamlessly

🎯 Next: Explore data transformations, CTEs, and advanced query patterns!
*/

console.log('📊 Advanced analytics mastered!')
