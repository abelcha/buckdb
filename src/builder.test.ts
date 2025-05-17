import { test, expect } from 'bun:test';
import { from} from '../buckdb';
const xx = from('duckdb_functions()')
const clean = (a: string) => a.replaceAll(/\n/g, '').replaceAll(/\s+/g, ' ')
const cexpect = (a: any, b: any) => expect(clean(a.toSql())).toEqual(clean('FROM duckdb_functions() ' + b))
test('order', () => {

    cexpect(
        xx.select(`database_name`)
            .orderBy('description')
            .limit(10)
        ,
        'SELECT database_name ORDER BY description LIMIT 10'
    )
    cexpect(
        xx.select().orderBy(['database_name'], ['description', 'ASC NULLS LAST'])
        , 'SELECT * ORDER BY database_name, description ASC NULLS LAST'
    )

    cexpect(
        xx.select(({ comment, description, ...rest }) => ({ lol: 13, ...rest, description: 'xxx' }))
        , `SELECT 13 AS lol, * EXCLUDE(comment, description), 'xxx' AS description`
    )
    // // cexpect(                                         SELECT  * EXCLUDE(comment, description) 

    cexpect(
        xx.select(({ comment, description, ...rest }) => rest)
        , 'SELECT * EXCLUDE(comment, description)'
    )
});