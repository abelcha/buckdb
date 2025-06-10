import { expect, test } from 'bun:test'
import { from } from '@buckdb/isomorphic'
const xx = from('duckdb_functions()')
const xz = from('duckdb_types()')
const clean = (a: string) => a.replaceAll(/\n/g, '').replaceAll(/\s+/g, ' ')
const cexpect = (a: any, b: any) => expect(clean(a.toSql())).toEqual(clean('FROM duckdb_functions() ' + b))
test('order', () => {
    // console.log('==>', xx.select(({ comment, description, database_oid, ...rest }) => rest).toSql())
    // return
    cexpect(
        xx.select(`database_name`)
            .orderBy('description')
            .limit(10),
        'SELECT database_name ORDER BY description LIMIT 10',
    )
    cexpect(
        xx.select().orderBy(['database_name'], ['description', 'ASC NULLS LAST']),
        'SELECT * ORDER BY database_name, description ASC NULLS LAST',
    )

    cexpect(
        xx.select(({ comment, description, ...rest }) => ({ lol: 13, ...rest, description: 'xxx' })),
        `SELECT 13 AS lol, * EXCLUDE(comment, description), 'xxx' AS description`,
    )
    // // cexpect(                                         SELECT  * EXCLUDE(comment, description)

    cexpect(
        xx.select(({ comment, description, ...rest }) => rest),
        'SELECT * EXCLUDE(comment, description)',
    )
})
test.only('setop', () => {
    expect(
        xz.select('type_name')
            .unionAll(
                xx.select(`database_name`),
            ).toSql({trim:true}),
    ).toEqual(`( FROM duckdb_types() SELECT type_name ) UNION ALL (FROM duckdb_functions() SELECT database_name)`)
})
