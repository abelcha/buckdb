import { test, expect } from 'bun:test';
//  import { ConditionParser } from './condition-parser';
import { builder } from './build'

test('order', () => {
    console.log()
    expect(builder({settings: () => 42 })('dallas').from('toto').select('abe', 'cd').orderBy('toto').limit(10).toSql())
    .toBe(`FROM toto \n SELECT abe, cd \n \n ORDER BY toto LIMIT 10`)
});