import { test, expect } from 'bun:test';
//  import { ConditionParser } from './condition-parser';
import { builder } from './build'
// import { DuckDBNodeAdapter } from '../adapters/DuckDBNodeAdapter';
import { Buck, from, MemoryDB } from '../buckdb';
const xx = from('duckdb_functions()')
const clean = a => a.replaceAll(/\n/g, '').replaceAll(/\s+/g, ' ')
const cexpect = (a, b) => expect(clean(a.toSql())).toEqual(clean('FROM duckdb_functions() ' + b))
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
    xx.select(({ comment, description, ...rest }) => `*, "tata" as xxx, 123 as yyy`)
    , 'SELECT *, "tata" as xxx, 123 as yyy'
  )
  cexpect(
    xx.select(({ comment, description, ...rest }) => ({ lol: 13, ...rest, description: 'xxx' }))
    , `SELECT 13 AS lol, * EXCLUDE(comment, description), 'xxx' AS description`
  )
  // // cexpect(                                         SELECT  * EXCLUDE(comment, description) 

  cexpect(
    xx.select(({ comment, description, ...rest }) => rest)
    , 'SELECT *'
  )
});