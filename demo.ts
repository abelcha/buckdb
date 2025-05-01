import { from, Buck } from './buckdb'
const toto = ""

const buckCon = Buck('', {
    // s3_access_key_id: '003c75dcbeca6a00000000007',
    // s3_endpoint: 's3.eu-central-003.backblazeb2.com',
    // s3_secret_access_key: 'K003n5UU4CoY2I/D6fG369raprkO3uM',
    s3_access_key_id: 'GXSS9O33ILIPZ9YVSKE0',
    s3_secret_access_key: 'Uqs1er2IXhzd9mcdnPKEzNzzaCy4f1EhEbX30ufE',
    s3_endpoint: 's3.eu-west-2.wasabisys.com',
})

// buckCon.from('s3://dallas/xx.parquet').select().execute()

const rr = await buckCon.from('duckdb_functions()')
    .select(() => `*, 123 as namex, 'toto' as database_name`)
    // .where(e => e.function_name === 'len')
    // .copyTo('s3://dallas/uu.csv', {
    //     delim: '\\t',
    // })
    .copyTo('xxx.parquet', {
        partition_by: ['data', 'xx']
    })
    .execute()

await buckCon.from('duckdb_functions()')
    .select(({database_name, database_oid, ...fns}) => ({ ...fns, schema_name: 'xxxx'  }))
    // .where(e => e.function_name === 'len')
    // .copyTo('s3://dallas/uu.csv', {
    //     delim: '\\t',
    // })
    .execute()
    


await buckCon.from('duckdb_functions()', 'ddf')
    .join('data/final.csv', e => e.final.pid === e.ddf.database_oid)
    .select((e, D) => ({
        // ['zz']: e.parameters['abel'],
        name: e.function_name,
        xxx: D.Varchar("ab'el"),
        zz: e.parameters,
        // zz: D.List([{lol:'123'}, {lol:'yoyo'}])
        uu: D.Json({ toot: 12 })
    }))
    .copyTo('s3://dallas/zzz.parquet')
    //  .where(e => e.examples.len() > 0)
    //  .orderBy()
    //  .limit(10)

    .execute()


await from('duckdb_settings()').select((p, D) => [p.name, p.description, D.SimilarTo(p.name, /.+ll.+/g) ? 'en' : 'ko'])


await from('duckdb_functions()')
    .select(e => ({
        at: e.function_name.regexp_extract_all(/(e)/g, 1),
        ggg: e.database_name + 'lol',
        ggx: `${e.database_name}lol${'123'}`,
        xxz: e.database_name.len() + 12,
        uuu: 12,
        _: e.function_name
    }))
    // .where(e => e.database_name === 'lol' && e.xxz > 12 && e.function_oid.Between(12, 41))
    // .where(e => 12 > 3 && e.uuu)
    .execute()

from('s3://dallas/zzz.parquet')



await from('https://m.abe.lc/public/opendata/geopop.csv', 'leo')
    .select((p, D) => ({
        l: D.SimilarTo(p.name, /12\d+/) ? p.lat : D.Bigint(42),
        lg: p.lng,
        nm: p.name,
        dd: D.Bigint(12)
    }))
    .where(e => e.name.Like('%nn%') && e.lat > 12 && e.name.SimilarTo(/cxxx/img) && e.name !== '123')
    .where(e => e.lat.abs() > 12 && e.lng.abs() === 12 && e.lng.abs().subtract(421) > 12)
    // .where((e, D) => e.lat.as('Bigint') ===  D.cast(e.lng.abs(), 'Bigint'))
    // .where(e => !e.leo.pop.isfinite())
    .execute()

await from('duckdb_settings()', 's')
    .select((s, D) => ({
        setting_name: s.name,
        description_upper: D.upper(s.description),
        value_type: s.input_type,
        match: s.name.regexp_extract_all(/\d+/),
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
    .where(s => s.input_type.Like('%INTEGER%') || s.input_type.Like('%FLOAT%'))
    .execute()





const thresholdOid = 16000; // Example context variable 
const excludePattern = '%internal%'; // Example context variable 
const allowedSchemas = ['main', 'pg_catalog', 'information_schema']; // Example context variable 
const minParams = 1;



await from('duckdb_functions()', 'f')
    .context({ thresholdOid: 16000, excludePattern: '%intern%', allowedSchemas: ['main', 'pg_catalog', 'information_schema'], minParams: 1, }) // Pass external variables
    .select(f => ({
        name: f.function_name,
        params: f.parameters,
        return: f.return_type,
        schema: f.schema_name
    }))
    .where((f, D) =>
        f.schema_name.In(allowedSchemas) && // IN operator with context array
        (D.Array(f.parameters).len() >= minParams || f.return_type === 'BOOLEAN') && // Logical OR, >=, context number
        !f.function_name.Like(excludePattern) && // NOT LIKE with context string
        // D(1, 12, 41) &&
        f.description !== null && // IS NOT NULL
        f.function_oid > D.Bigint(thresholdOid) && // Greater than with context number + explicit type
        f.function_name.SimilarTo(/^[a-z_]+$/i) && // SimilarTo with Regex (case-insensitive flag)
        !f.return_type.In(['UNKNOWN', 'INVALID']) && // NOT IN
        f.function_type === 'immutable' && // Equality check
        f.function_oid.Between(10000, 20000) // BETWEEN operator
    )
    .or('21>12')
    // .orderBy(f => f.function_name) // Simple ORDER BY
    .limit(10)
    .execute();