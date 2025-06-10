// TypeScript API Tutorial for MemoryDB
// Each section matches a category/subcategory in demo.txt.
// For every missing example, a // TODO is left as a placeholder.

import { Buck, MemoryDB } from '@buckdb/isomorphic'

// # Select typexxzz
// - .select()
await MemoryDB.from('duckdb_functions()').select().execute() // Select all columns

// - .select(geo => p.id)
await MemoryDB.from('duckdb_functions()').select(e => e.function_name).execute() // Select one column

// - .select(geo => [geo.lat, geo.lng])
await MemoryDB.from('duckdb_functions()').select(e => [e.function_name, e.function_type]).execute() // Select tuple

// - .select('lat', 'lng')
await MemoryDB.from('duckdb_functions()').select('function_name', 'function_type').execute() // Select by names

// - .select(geo => ({ title: geo.name + ' ' + geo }))
await MemoryDB.from('duckdb_functions()').select(e => ({ title: e.function_name + ' ' + e.description })).execute() // Select with computed property

// - (TODO) Chained Select
// TODO

// # Exclude/Replace
// - Omit Pattern
/*
 * Exclude/Replace
 * Omit Pattern: If you want to exclude a field, destructure it out.
 * Note: The 'definition' field may not exist on all tables; adjust as needed for your schema.
 */
// TODO: Replace with a real field from your schema, e.g. 'description'
await MemoryDB.from('duckdb_functions()').select(({ description, ...rest }) => rest).execute() // Exclude a field
await MemoryDB.from('duckdb_functions()').select(({ description, comment, ...rest }) => ({ ...rest, comment: comment ?? 123 })).execute() // Exclude a field

// - Replace pattern
// TODO

// # Closures
// - context
const threshold = 4
await MemoryDB.from('duckdb_functions()')
    .context({ threshold })
    .where(e => e.function_name.len() > threshold)
    .execute() // Use external variable safely

// - statements
// TODO

// # distinctOn
// - basic cae
await MemoryDB.from('duckdb_functions()')
    .select('function_name', 'function_oid')
    .distinctOn('function_name')
    .execute() // Keep first row per function_name

// # CopyTo
// - bucket ex
await MemoryDB.from('duckdb_functions()')
    .copyTo('s3://my-bucket/fns.parquet', { format: 'parquet', overwrite: true })
// Export to S3

// - options
// (see above, options object)
// No extra example needed

// # Update
// - template string
// - operations
// - concatenations
// - ternaries
/*
 * Update
 * This is a conceptual example. The MemoryDB API may not have a .table() or .update() method.
 * If your API supports updates, use the correct method. Otherwise, this is a placeholder.
 */
// TODO: Provide a real update example if your API supports it
// await MemoryDB.table('people')
//   .update(e => ({
//     total: e.total + 1, // arithmetic
//     tag: e.name.upper() + ` (${e.age})`, // template + concat
//     status: e.age > 18 ? 'ADULT' : 'MINOR' // ternary
//   }))
//   .where(e => e.id === 42)
//   .execute(); // Update with various JS expressions

// # Arrays
// - elements[1.]
await MemoryDB.from('geo()')
// TODO: Provide a real array field example if your schema supports arrays
// .select(e => ({ first: e.coords[1] }))
// .execute(); // Array index

// - elements[0.5]
await MemoryDB.from('geo()')
// TODO: Provide a real array field example if your schema supports arrays
// .select(e => ({ frac: e.coords[.1] }))
// .execute(); // Array slice

// - (TODO) - map/filter
// TODO

// # Records/Struct/Json
// - access nested props
// TODO

// -  D.Json({ field: e.function_name }).json_extract('$.field')
await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        nested: D.Json({ field: e.function_name }).json_extract('$.field'),
    }))
    .execute() // JSON extraction

// - w≈
/* TODO */

// # Functions
// - methods type
await MemoryDB.from('duckdb_functions()')
    .select(e => ({ upper: e.function_name.upper() }))
    .execute() // String method

// - scalar functions (D)
await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({ dist: D.levenshtein(e.function_name, 'duckdb') }))
    .execute() // Scalar helper

// # Joins
// - ON as a callback
await MemoryDB.from('duckdb_functions()', 'a')
    .join('duckdb_types()', 't').on(({ t, a }) => a.function_type === t.logical_type)
    .select(e => ({
        fn: e.a.function_name,
        type: e.t.logical_type,
    }))
    .execute() // Join with callback

// - default alias & named alias
// TODO

// - named join
// TODO

// - INNER/LEFT/RIGHT ETC
// TODO

// # WHERE
// - || && clause
await MemoryDB.from('duckdb_functions()')
    .where(e => e.function_name.Like('%sum%') && e.function_oid.Between(10, 20))
    .where(e => !e.description.IsNull())
    .execute() // Logical AND/OR

// - type comparaison
// TODO

// - ternaries
// TODO

// - orWhere
// (see above)

// - chaining where
// TODO

// - Between
// (see above)

// - Negation
// TODO

// # Pattern Matching
// - Native Regexp
// - Regexp Flag
// - Similar to
// - Like
// - IsNull / === null
// (All shown below)
/*
 * Pattern Matching
 * These are parser-level examples, not direct MemoryDB calls.
 * If you want to see the SQL translation, use your parser/test utilities.
 */
// TODO: Show pattern matching via MemoryDB if supported
// parse((e, D) => e.name.match_regex(/[a-z].+/));
// parse((e) => e.name.SimilarTo(/.+\w+/ig));
// parse((e) => !e.id.IsNull());

// # OrderBY
// - fn
// TODO

// - str
await MemoryDB.from('duckdb_functions()')
    .select('function_name', 'function_oid')
    .orderBy('function_oid', 'DESC')
    .execute() // Order by string

// - ASC/DESC
// (see above)

// # GroupBy
// - Basic Case
await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        type: e.function_type,
        cnt: D.count(),
    }))
    .groupBy('function_type')
    .execute() // Group by

// - Having
await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
        type: e.function_type,
        cnt: D.count(),
    }))
    .groupBy('function_type')
    .having(e => e.cnt > 5)
    .execute() // Group by with having

// - (TODO) rollup/CUBE whatever
// TODO

// - (TODO) count(filter)
// TODO

// # CASTING
// - D.Varchar(12)
await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({ asVar: D.Varchar('hello') }))
    .execute()

// - .as('Decimal(1, 4)')
await MemoryDB.from('duckdb_functions()')
    .select(e => ({ asDec: e.function_oid.as('Decimal', 10, 2) }))
    .execute()

// - .as('Varchar')
// TODO

// - D.Cast()
// TODO

// # SHORTCUTS
// - maxBy
await MemoryDB.from('duckdb_functions()').maxBy('function_name').execute()

// - minBy
// TODO

// - countBy
// TODO

// - keyBy
await MemoryDB.from('duckdb_functions()')
    .select('function_name', 'description')
    .keyBy('function_name')
    .execute()

// # Cli Usage
// - Buck() constructor
/*
 * CLI Usage
 * The Buck() constructor may not accept 'extensions' directly.
 * Adjust according to your actual API.
 */
// TODO: Show correct Buck() usage for your environment
// const db = await Buck({ extensions: ['json', 'parquet'] });

// - extensions
// (see above)

// - settings
// TODO

// - attach
/*
 * CLI Usage - attach
 * The .attach() method may not exist on your Buck instance.
 * Adjust according to your actual API.
 */
// TODO: Show correct attach usage for your environment
// await db.attach('s3://my-data/*.parquet');

// # execute
// - stream
/*
 * execute - stream
 * The .stream() method may not exist on your MemoryDB instance.
 * Adjust according to your actual API.
 */
// TODO: Show correct streaming usage for your environment
// for await (const page of MemoryDB.from('big_table()').select().stream()) {
//   console.log(page.length, 'rows in this chunk');
// }

// - native
const rows = await MemoryDB.from('duckdb_functions()').select().execute()

// # JS Languagetic
// - (TODO) .length
// TODO

// # Table Functions
// read_csv/read_json ...
await MemoryDB.from("read_csv_auto('people.csv')").select().execute()
await MemoryDB.from("read_json('events.json')").select().execute()
