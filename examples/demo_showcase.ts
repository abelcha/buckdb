import { Buck, from } from '@buckdb/isomorphic' // Assuming buckdb is in the same directory or adjust path

// Optional: Configure connection if needed, otherwise uses default
// const buckCon = Buck({ /* credentials */ });

console.log('--- BuckDB TypeScript Parser Showcase ---')

// --- SELECT Clause Showcase ---
console.log('\n--- SELECT Showcase ---')
try {
    await from('duckdb_settings()', 's')
        .select((s, D) => ({
            setting_name: s.name,
            description_upper: D.upper(s.description),
            value_type: s.input_type,
            is_numeric: s.input_type.Like('%INTEGER%') || s.input_type.Like('%FLOAT%'),
            config_info: D.Varchar(`Setting: ${s.name} - Type: ${s.input_type}`), // Template literal example
            example_struct: { name: s.name, value: D.Integer(123), nested: { flag: D.Boolean(true) } }, // Struct/Object
            example_list: D.List([s.name, s.description, D.Varchar('literal')]), // List/Array
            casted_name: s.name.as('Varchar', 50), // Simple Cast
            complex_cast: D.cast(s.name, 'Varchar', 50), // Complex Cast
            conditional_desc: s.description !== null ? s.description : D.Varchar('No description'), // Ternary/CASE WHEN
            numeric_example: D.abs(-5).add(D.sqrt(16)).multiply(2), // Arithmetic and Functions
            regex_example: D.regexp_replace(s.name, /_/, '-'), // Regex function
            json_literal: D.Json({ key: 'value', num: 1 }), // JSON Literal
            date_literal: D.Date('2024-01-01'), // Date Literal
        }))
        .limit(5)
        .execute()
    console.log('SELECT Showcase executed successfully.')
} catch (error) {
    console.error('Error during SELECT Showcase:', error)
}

// --- WHERE Clause Showcase ---
console.log('\n--- WHERE Showcase ---')
try {
    const thresholdOid = 16000 // Example context variable
    const excludePattern = '%internal%' // Example context variable
    const allowedSchemas = ['main', 'pg_catalog', 'information_schema'] // Example context variable
    const minParams = 1

    await from('duckdb_functions()', 'f')
        .context({ thresholdOid, excludePattern, allowedSchemas, minParams }) // Pass external variables
        .select(f => ({
            name: f.function_name,
            params: f.parameters,
            return: f.return_type,
            schema: f.schema_name,
        }))
        .where((f, D) =>
            f.schema_name.In(allowedSchemas) // IN operator with context array
            && (f.parameters.length >= minParams || f.return_type === 'BOOLEAN') // Logical OR, >=, context number
            && !f.function_name.Like(excludePattern) // NOT LIKE with context string
            && D.Between(1, 12, 41)
            && f.description !== null // IS NOT NULL
            && f.function_oid > D.Bigint(thresholdOid) // Greater than with context number + explicit type
            && f.function_name.SimilarTo(/^[a-z_]+$/i) // SimilarTo with Regex (case-insensitive flag)
            && !f.return_type.In(['UNKNOWN', 'INVALID']) // NOT IN
            && f.function_type === 'immutable' // Equality check
            && f.function_oid.Between(10000, 20000) // BETWEEN operator
        )
        .orderBy(f => f.function_name) // Simple ORDER BY
        .limit(10)
        .execute()
    console.log('WHERE Showcase executed successfully.')
} catch (error) {
    console.error('Error during WHERE Showcase:', error)
}

// --- ORDER BY and OFFSET Showcase ---
console.log('\n--- ORDER BY / OFFSET Showcase ---')
try {
    await from('duckdb_types()', 't')
        .select(t => ({ type_name: t.type_name, oid: t.type_oid, category: t.type_category }))
        .orderBy(['category', 'ASC NULLS LAST']) // ORDER BY ASC NULLS FIRST
        // .orderBy(t => t.type_oid, 'DESC') // Multiple ORDER BY clauses
        .limit(5)
        .offset(2) // OFFSET clause
        .execute()
    console.log('ORDER BY / OFFSET Showcase executed successfully.')
} catch (error) {
    console.error('Error during ORDER BY / OFFSET Showcase:', error)
}
