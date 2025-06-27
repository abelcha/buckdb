import { Cast, Json, lower, regexp_replace, Timestamp, upper } from '@buckdb/fn'
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

            date_literal: D.Date('2024-01-01'), // Date Literal
        }))
        .limit(5)
        .execute()
    console.log('SELECT Showcase executed successfully.')
} catch (error) {
    console.error('Error during SELECT Showcase:', error)
}

const thresholdOid = 16000 // Example context variable
const minParams = 1

await from('duckdb_functions()', 'f')
    .context({ minParams, thresholdOid })
    .select(f => ({
        name: f.function_name ?? 'default',
        params: f.parameters === null ? [] : f.parameters,
        return: upper(f.return_type[.1]) + '' + lower(f.return_type[2.]),
        oidPlus: f.function_oid + 12,
        nullCheck: !f.description ? 'default' : f.description,
        lastEx: f.examples[-1],
        casted: f.database_oid.as('Bigint'),
        json_literal: Json({ key: 'value', num: 1 }), // JSON Literal
        xxx: `hello`,
        regex_example: regexp_replace(f.function_name, /_/, '-'), // Regex function
    }))
    .where((f, D) =>
        f.schema_name in ['main', 'pg_catalog', 'information_schema'] // IN operator with context array
        && (f.parameters.len() >= minParams) // Logical OR, >=, context number
        && !f.function_name.Like('%internal%') // NOT LIKE with context string
        && f.description !== null // IS NOT NULL
        && f.function_oid > 100 // Greater than with context number + explicit type
        && f.function_name.SimilarTo(/^[a-z_]+$/i) // SimilarTo with Regex (case-insensitive flag)
        && f.return in ['Double', 'Varchar'] // NOT IN
        && f.function_type === 'scalar'  // Equality check
        && f.function_oid.Between(0, thresholdOid) // BETWEEN operator
    )
    .orderBy(f => f.function_name) // Simple ORDER BY
    .limit(10)
    .execute()
console.log('WHERE Showcase executed successfully.')

// --- ORDER BY and OFFSET Showcase ---
await from('duckdb_types()', 't')
    .select(t => ({ type_name: t.type_name, oid: t.type_oid, category: t.type_category }))
    .orderBy(['category', 'ASC NULLS LAST']) // ORDER BY ASC NULLS FIRST
    // .orderBy(t => t.type_oid, 'DESC') // Multiple ORDER BY clauses
    .limit(5)
    .offset(2) // OFFSET clause
    .execute()
console.log('ORDER BY / OFFSET Showcase executed successfully.')
