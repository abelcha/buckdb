import { from, Buck } from './buckdb'

const buckCon = Buck({
    s3_access_key_id: 'GXSS9O33ILIPZ9YVSKE0',
    s3_secret_access_key: 'Uqs1er2IXhzd9mcdnPKEzNzzaCy4f1EhEbX30ufE',
    s3_endpoint: 's3.eu-west-2.wasabisys.com',
})

await buckCon.from('s3://dallas/turf.fr.parquet')
    .select()
    .limit(1000)
    .execute()

await from('duckdb_functions()')
    .select('comment', 'database_name', 'database_oid', 'description')
    .execute()


await from('duckdb_functions()')
    .select((e, D) => ({
        // ['zz']: e.parameters['abel'],
        name: e.function_name,
        xxx: D.Varchar("ab'el"),
        // zz: D.List([{lol:'123'}, {lol:'yoyo'}])
        uu: D.Json({toot:12})
     }))
    //  .where(e => e.examples.len() > 0)
    //  .orderBy()
    //  .limit(10)
     
    .execute()



await from('duckdb_functions()')
    .select(e => e.function_name)
    .execute()



await from('https://m.abe.lc/public/opendata/geopop.csv', 'leo')
    .select((p, D) => ({
        l: D.SimilarTo(p.name, /12\d+/) ? p.lat : D.Bigint(42),
        lg: p.lng,
        nm: p.name,
        dd: D.Bigint(12)
    }))
    .where(e => e.name.Like('%nn%') && e.lat > 12 && e.name.SimilarTo(/cxxx/img))
    // .where((e, D) => e.lat.as('Bigint') ===  D.cast(e.lng.abs(), 'Bigint'))
    // .where(e => !e.leo.pop.isfinite())
    .execute()

    await from('duckdb_settings()', 's')
        .select((s, D) => ({
            setting_name: s.name,
            description_upper: D.upper(s.description),
            value_type: s.input_type,
            match: s.name.regexp_extract_all(/\d+/),
            is_numeric: s.input_type.Like('%INTEGER%') || s.input_type.Like('%FLOAT%'),
            config_info: D.Varchar(`Setting: ${s.name} - Type: ${s.input_type}`), // Template literal example
            example_struct: { name: s.name, value: D.Integer(123), nested: { flag: D.Boolean(true) } }, // Struct/Object
            example_list: D.List([s.name, s.description, D.Varchar('literal')]), // List/Array
            casted_name: s.name.as('Varchar', 50), // Simple Cast
            // complex_cast: D.cast(s.name, 'Varchar', 50), // Complex Cast
            conditional_desc: s.description !== null ? s.description : D.Varchar('No description'), // Ternary/CASE WHEN
            numeric_example: D.abs(-5).add(D.sqrt(16)).multiply(2), // Arithmetic and Functions
            regex_example: D.regexp_replace(s.name, /_/, '-'), // Regex function
            json_literal: D.Json({ key: 'value', num: 1 }), // JSON Literal
            date_literal: D.Date('2024-01-01'), // Date Literal
        }))
        .execute()