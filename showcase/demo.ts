
import { generate_series, Json, lower, regexp_replace, upper } from "@buckdb/fn";
import { duckdb_functions, range } from "@buckdb/tf";
import { from, read_csv } from "@buckdb/isomorphic";



from(read_csv('../data/final.csv', {column_names: ['auuu', 'boooozz', 'x', 'd', 'r']}))
.select('auuu', 'd', 'd')

from(('../data/final.csv'))


const d1 = await from(duckdb_functions())
    .select(e => [e.database_name.lower(), e.database_name.len()])
    .run()

const d2 = await from(range(0, 1000))
    .select(e => ({
        num: e.range,
        steps: generate_series(e.range).array_filter(x => x % 10 == 0)[-1],
    }))
    .run()

const d3 = await from(range(1000))

    .select(e => `${e.range} is ${e.range % 2 === 0 ? 'even' : 'odd'}`)
    .run()


const d4 = await from(range(1000))
    .select(e => ({
        val: {
            zz: [e.range.to_hex()[.1]],
            deep: { nested: 42 }
        }
    }))
    .run()



const thresholdOid = 16000 // Example context variable
const minParams = 1

const kitchenSink =
    await from(duckdb_functions(), 'f')
        .context({ minParams, thresholdOid })
        .distinctOn('function_name')
        .select(f => ({
            name: f.function_name.upper(),
            params: f.parameters ?? [],
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