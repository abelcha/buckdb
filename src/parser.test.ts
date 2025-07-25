import { expect, test } from 'bun:test'
import { DMetaField } from '.buck/types'
import jsep from './jsep'
import { parse, parseObject } from './parser'

test('should parse basic condition', () => {
  const result = parse((e, D) => e.age > 12)
  expect(result).toBe('age > 12')
})

test('bool', () => {
  expect(parse((e, D) => (e.isToto === true))).toBe('isToto = true')
  expect(parse((e, D) => (e.isToto === false))).toBe('isToto = false')
})

test('should parse logical AND', () => {
  const result = parse((e, D) => e.age > 12 && e.name === 'test')
  expect(result).toBe("age > 12 AND name = 'test'")
})

test('method call', () => {
  const result = parse((e, D) => e.name.whatever(`toto`) === 'ok')
  expect(result).toBe("name.whatever('toto') = 'ok'")
})

test('should parse logical OR', () => {
  const result = parse((e, D) => e.age > 12 || e.name === 'test' || e.name.whatever(`toto`))
  expect(result).toBe("age > 12 OR name = 'test' OR name.whatever('toto')")
})

test('inlined local var', () => {
  const localVar = 10
  const result = parse((e, D) => e.age === localVar)
  expect(result).toBe('age = 10')
})
test('template litteral', () => {
  let num = 0
  expect(parse((e, D) => e.name === `lol`)).toBe("name = 'lol'")
  expect(parse((e, D) => e.name.contains(`lol`))).toBe("name.contains('lol')")
  // Now we support template literals with expressions
  expect(parse((e, D) => e.name === `abel${e.vrl}`, { num })).toBe("name = ('abel' || vrl)")
  expect(parse((e, D) => e.name === `abel${num}`, { num })).toBe("name = ('abel' || (0))")
  expect(parse((e, D) => e.name === `${num}abel`, { num })).toBe("name = ((0) || 'abel')")
  expect(parse((e, D) => e.name === `prefix${num}suffix`, { num })).toBe("name = ('prefix' || (0) || 'suffix')")
  expect(parse((e, D) => e.name === `${num}${num + 1}`, { num })).toBe('name = ((0) || (0) + 1)')
})

test('should parse complex condition with DuckDB function', () => {
  const result = parse((e, D: DMetaField) =>
    (e.name.match_regex(/[a-z].+/) || e.age > 12)
    && D.levenshtein(e.name, 'duckdb') > 4
  )
  expect(result).toBe(
    "(name.match_regex('[a-z].+') OR age > 12) AND levenshtein(name, 'duckdb') > 4",
  )

  const result2 = parse((e) => (e.name.regexp_matches(/[a-z].+/ig)))

  expect(result2).toBe(
    "name.regexp_matches('[a-z].+', 'gi')",
  )
  expect(parse((e) => e.name.regexp_extract_all(/[a-z](.+)/ig))).toBe(
    "name.regexp_extract_all('[a-z](.+)', 0, 'gi')",
  )

  expect(parse((e, D) => D.regexp_replace(e.name, /\W/m, 'yyy'))).toBe(
    "regexp_replace(name, '\\W', 'yyy', 'm')",
  )
})

test('should throw on local variable usage', () => {
  const whatever = Math.random() > .5 ? 10 : 0
  expect(() => parse((e, D) => e.age > whatever)).toThrow(
    'Undefined variable: whatever, use .context({ whatever }) too pass it down',
  )
  expect(parse((e, D) => e.age > whatever, { whatever: 42 })).toBe('age > (42)')
})

test('operators', () => {
  expect(parse((e, D) => (e.field.x.y === 4 || e.age + 4 > 10) && e.age - 10 > 0)).toBe(
    '(field.x.y = 4 OR age + 4 > 10) AND age - 10 > 0',
  )
})

test('ternary', () => {
  expect(parse((e, D) => (e.num > 3 ? e.isWhatever() : false))).toBe(
    '(CASE WHEN (num > 3) THEN isWhatever() ELSE false END)',
  )
  expect(parse((e, D) => (e.desc ? e.desc : 'xy'))).toBe(
    "(CASE WHEN (desc IS NOT NULL) THEN desc ELSE 'xy' END)",
  )

  expect(parse((e, D) => (!e.desc ? e.desc : 'xy'))).toBe(
    "(CASE WHEN (desc IS NULL) THEN desc ELSE 'xy' END)",
  )
  expect(parse((e, D) => (e.desc.whatever() ? e.desc : 'xy'))).toBe(
    "(CASE WHEN (desc.whatever()) THEN desc ELSE 'xy' END)",
  )
  expect(parseObject(({ description }) => ({
    description: description ? description : 'def',
  }))).toEqual([
    ['description', `(CASE WHEN (description IS NOT NULL) THEN description ELSE 'def' END)`],
  ])
  expect(parse((e, D) => (!!e.desc && !!e.comment ? e.desc : 'xy'))).toBe(
    "(CASE WHEN (desc IS NOT NULL AND comment IS NOT NULL) THEN desc ELSE 'xy' END)",
  )
})

test('singlevalue', () => {
  expect(parse((e, D) => e.num)).toEqual('num')
  expect(parse((e, D) => (e.num + 1))).toBe('num + 1')
  expect(parse((e, D) => e.num - 1)).toBe('num - 1')
  expect(parse((e, D) => e.num * 2)).toBe('num * 2')
  expect(parse((e, D) => e.num / 2)).toBe('num / 2')
  expect(parse((e, D) => e.num % 2)).toBe('num % 2')
  expect(parse((e, D) => e.num % 2 + 1)).toBe('num % 2 + 1')
  expect(parse((e, D) => e.num > 0 ? e.num : 1)).toBe(`(CASE WHEN (num > 0) THEN num ELSE 1 END)`)
  expect(parseObject((e, D) => e.num + 2)).toEqual([['', 'num + 2']])
  expect(parseObject((e, D) => e.num > 0 ? e.num : 1)).toEqual([['', '(CASE WHEN (num > 0) THEN num ELSE 1 END)']])

  expect(parseObject((geo, D) => geo.function_oid ? geo.function_oid.round(2) : D.Integer(0)))
    .toEqual([['', `(CASE WHEN (function_oid IS NOT NULL) THEN function_oid.round(2) ELSE CAST(0 AS INTEGER) END)`]])
})

test('coalesce', () => {
  expect(parse((e, D) => e.num ?? 123)).toBe('COALESCE(num, 123)')
  expect(parse((e, D) => e.num ?? e.desc ?? 123)).toBe('COALESCE(COALESCE(num, desc), 123)')
})

test('lambda', () => {
  expect(parseObject((e, D) => ({ ll: e.parameters.map(z => z.upper()) })))
    .toEqual([['ll', 'parameters.list_transform((z) -> z.upper())']])
  expect(parseObject((e, D) => ({ ll: e.parameters.filter(z => z.len() > 12) })))
    .toEqual([['ll', 'parameters.list_filter((z) -> z.len() > 12)']])
  expect(parseObject((e, D) => ({ ll: e.whatever.x.parameters.filter(z => z.xxx.len() > 12) })))
    .toEqual([['ll', 'whatever.x.parameters.list_filter((z) -> z.xxx.len() > 12)']])
})
test.todo('closure var redeclratation', () => {
  expect(parse(e => e.deep.str.split('.').map(e => e.toUpperCase()))).toEqual("deep.str.string_split('.').list_transform((x) -> e.upper())")
})
test.todo('.charCodeAt()', () => {
  expect(parse(e => e.str.charCodeAt(42))).toEqual("array_extract(str, 42).ascii()")
  expect(parse(e => e.x.y.z.str.charCodeAt(12))).toEqual("array_extract(x.y.z.str, 12).ascii()")
})
test('unmethod-mapping', () => {
  expect(parse(e => e.deep.str.toUpperCase())).toEqual("deep.str.upper()")
  expect(parse(e => e.arr.array_transform(x => x.toUpperCase()))).toEqual("arr.array_transform((x) -> x.upper())")
})

test('accessor', () => {
  expect(parse((e, D) => e.num[2])).toBe('num[2]')
  expect(parse((e, D) => e.num[-3])).toBe('num[-3]')
  // expect(parse((e, D) => e.num[3. - .5])).toBe("num[-44]");
})

test('pattermatcher', () => {
  expect(parse((e) => e.num.SimilarTo(/.+\w+/img))).toBe("regexp_matches(num, '.+\\w+', 'gim')")

  expect(parse((e) => e.num.Like('%12'))).toBe("num LIKE '%12'")
  expect(parse((e) => e.num.SimilarTo(/.+\w+/))).toBe("num SIMILAR TO '.+\\w+'")
  expect(parse((e) => e.num.Between(12, 52))).toBe('num BETWEEN 12 AND 52')
  expect(parse((e) => e.num.NotBetween(12, 52))).toBe('num NOT BETWEEN 12 AND 52')
  expect(parse((e) => !e.num.IsNull())).toBe('num IS NOT NULL')
  expect(parseObject((p, D) => ({
    l: D.SimilarTo(p.lat, /12.+/) ? p.lat : D.Bigint(42),
    // lg: p.lng, nm: p.name, dd: D.Bigint(12)
  }))).toEqual([
    ['l', "(CASE WHEN (lat SIMILAR TO '12.+') THEN lat ELSE CAST(42 AS BIGINT) END)"],
  ])
})

test('polyfills', () => {
  expect(parse((e) => e.whatever.num.startsWith('toto'))).toBe("whatever.num.starts_with('toto')")
})

test('ternary', () => {
  const tata = () => 123 == ~123
  expect(parseObject((e, D) => ({ xxx: (e.num > 3 ? e.isWhatever() : false) }))).toEqual([
    ['xxx', '(CASE WHEN (num > 3) THEN isWhatever() ELSE false END)'],
  ])
})

test('cast', () => {
  expect(parseObject((e, D) => ({ date: D.Cast(e.ts, 'Date') }))).toEqual([["date", "CAST(ts AS Date)"]])
  expect(parse((e, D) => e.num.as('Bigint'))).toBe('(num::Bigint)')
  expect(parse((e, D) => e.num.as('Decimal(1, 4)'))).toBe('(num::Decimal(1, 4))')
  expect(parse((e, D) => e.num.as('Decimal', 1, 3))).toBe('(num::Decimal(1, 3))')
  expect(parse((e, D) => D.Cast(e.num, 'Bigint'))).toBe('CAST(num AS Bigint)')
  expect(parse((e, D) => D.Cast(e.num, 'Decimal', 12, 42))).toBe('CAST(num AS Decimal(12, 42))')
  expect(parse((e, D) => D.Cast(e.num, 'Map', 'Varchar', 'Float'))).toBe('CAST(num AS Map(Varchar, Float))')
  expect(parse((e, D) => e.lat.as('Bigint') === D.Cast(e.lng.abs(), 'Bigint')))
    .toBe('(lat::Bigint) = CAST(lng.abs() AS Bigint)')
})

test('object', () => {
  expect(parseObject((p, D) => ({
    l: D.SimilarTo(p.name, /\w+mode/) ? p.description.len() < 3 ? p.value : p.scope : D.Varchar(42),
    lg: p.geo.lng,
    nm: p.name,
    dd: D.Float(12),
  }))).toEqual([
    ['l', "(CASE WHEN (name SIMILAR TO '\\w+mode') THEN (CASE WHEN (description.len() < 3) THEN value ELSE scope END) ELSE CAST(42 AS VARCHAR) END)"],
    ['lg', 'geo.lng'],
    ['nm', 'name'],
    ['dd', 'CAST(12 AS FLOAT)'],
  ])
})
test('string', () => {
  expect(parse((e, D) => ('  ' + e.str + '  ').trim())).toBe("('  ' || str || '  ').trim()")
  // reeturn

  expect(parse((e, D) => e.arr === 'abel')).toBe("arr = 'abel'")

  expect(parse((e, D) => e.arr === "'abel")).toBe(`arr = '''abel'`)
  expect(parseObject((e, D) => ({
    xxx: D.Varchar('lol'),
  }))).toEqual([['xxx', "CAST('lol' AS VARCHAR)"]])

  // Basic template literal tests
  const lol = 42
  expect(parse((e, D) => `abel${lol}`, { lol })).toBe("('abel' || (42))")

  // Additional template literal tests
  expect(parse((e, D) => `${e.firstName} ${e.lastName}`)).toBe("(firstName || ' ' || lastName)")
  expect(parse((e, D) => `User: ${e.name}, Age: ${e.age}`)).toBe("('User: ' || name || ', Age: ' || age)")
  expect(parse((e, D) => `Count: ${e.count + 1}`)).toBe("('Count: ' || (count + 1))")
  expect(parse((e, D) => `${e.value}%`)).toBe("(value || '%')")
  expect(parse((e, D) => `${e.prefix}-${e.id}-${e.suffix}`)).toBe("(prefix || '-' || id || '-' || suffix)")

  // Empty template literal
  expect(parse((e, D) => ``)).toBe("''")

  // Template literal with expressions but no text
  expect(parse((e, D) => `${e.name}`)).toBe('(name)')

  // Test string concatenation with + operator
  expect(parse((e, D) => e.name + '---' + e.age)).toBe("(name || '---' || age)")
  expect(parse((e, D) => e.name + 42 + '---')).toBe("(name || 42 || '---')")
  expect(parse((e, D) => 'prefix-' + e.name + '-suffix')).toBe("('prefix-' || name || '-suffix')")

  // Additional string concatenation tests
  expect(parse((e, D) => 'Hello, ' + e.name + '! Your score is ' + e.score)).toBe(
    "('Hello, ' || name || '! Your score is ' || score)",
  )
  expect(parse((e, D) => e.firstName + ' ' + e.lastName)).toBe("(firstName || ' ' || lastName)")
  expect(parse((e, D) => e.value + '%')).toBe("(value || '%')")
  expect(parse((e, D) => e.count + ' items')).toBe("(count || ' items')")

  // Mixed string concatenation and arithmetic
  expect(parse((e, D) => 'Total: ' + (e.price * e.quantity))).toBe("('Total: ' || price * quantity)")
  expect(parse((e, D) => e.prefix + (e.a + e.b) + e.suffix)).toBe('prefix + (a + b) + suffix')
  // expect(parse((e, D) =>  D.raw`['123', 'tata', 'yoyo']`)).toBe(`arr = '\\'abel'`);
})

const parseBody = (expr: Function | string, context = {}) => {
  try {
    return parse('(p, D) => (' + expr + ')', context)
  } catch (err: any) {
    console.error('Error parsing body:', err.message)
    console.log('-------------')
    console.log(
      require('util').inspect(jsep(expr), {
        depth: Infinity,
        colors: true,
        showHidden: false,
      }),
    )
    console.log('---------------')
  }
}
test('arrays', () => {
  expect(parse(`(e, D) => e.arr['abel']`)).toBe("arr['abel']")
  // expect(parse((e, D) => e.arr[1.])).toBe("arr[1:]");
  // expect(parse((e, D) => e.arr['1'])).toBe("arr.1");
  expect(parse((e, D) => e.arr[1])).toBe('arr[1]')
  expect(parse((e, D) => e.arr[.1])).toBe('arr[0:1]')
  expect(parse((e, D) => e.arr[43.55])).toBe('arr[43:55]')
})

test('properties', () => {
  expect(parseBody(`{'toto':"43"}`)).toBe("{'toto': '43'}")
  expect(parseBody(`{toto:/45/g, x:15}`)).toBe("{toto: '45', x: 15}")
  expect(parseBody(`{['toto']:42}`)).toBe("{'toto': 42}")
})
test('parseObject destructuring', () => {
  //  xx.select(({ comment, description, database_oid, ...rest }) => rest).toSql()

  expect(parseObject(({ elem, ...rest }, DDD) => ({ ...rest, toto: rest.tata }))).toEqual([
    ['', '', '* EXCLUDE(elem)'],
    ['toto', 'tata'],
  ])
  expect(parseObject(({ elem, abcd, ...rest }, DDD) => ({ ...rest, toto: rest.tata, abcd }))).toEqual([
    ['', '', '* EXCLUDE(elem, abcd)'],
    ['toto', 'tata'],
    ['abcd', 'abcd'],
  ])
  expect(parseObject(({ ...rest }, DDD) => ({ ...rest }))).toEqual([
    ['', '', '*'],
  ])
  expect(parseObject(({ ...rest }, DDD) => ({ ...rest, abc: DDD.add(12, 10) }))).toEqual([
    ['', '', '*'],
    ['abc', 'add(12, 10)'],
  ])
  expect(parseObject(({ ...rest }, DDD) => rest)).toEqual([
    ['', '', '*'],
  ])
  expect(parseObject((rest, DDD) => rest)).toEqual([
    ['', '', '*'],
  ])
  expect(parseObject((rest, DDD) => rest.toto)).toEqual([
    [null, 'toto'],
  ])
  expect(parseObject(({ elem, xxx, toto, ...rest }) => rest)).toEqual([
    ['', '', '* EXCLUDE(elem, xxx, toto)'],
  ])
  expect(parseObject((geo) => ({ ...geo }))).toEqual([
    ['', '', '*'],
  ])
  expect(parseObject(({ vvv, ...geo }) => ({ ...geo, vvv }))).toEqual([
    ['', '', '* EXCLUDE(vvv)'],
    ['vvv', 'vvv'],
  ])
})

test('inoperator', () => {
  expect(parse((e, D) => e.database_name in ['lol', 'toto', 42, null])).toBe("database_name IN ('lol', 'toto', 42, NULL)")
  expect(() => parse<{ arr: number[] }>((e, D) => e.arr.map(x => x + 1))).not.toThrowError()
})

test('lenx', () => {
  ;[
    // [e => ({x:e.function_name + 'lol'}), "function_name || 'lol'"],
    [e => ({ x: e.whatever.toto.length }), 'whatever.toto.len()'],
    //  [e => ({ x: e.whatever['length'] }), "whatever.toto.len()"],
  ].forEach(item => {
    const [fn, expected] = item
    expect(parseObject(fn)).toEqual([['x', expected]])
  })
})

test('should parse logical NOT', () => {
  let num = 0
  const result = parse((e, D) => (e.toto.tata.tata.tata.contain('t')))
  expect(result).toBe("toto.tata.tata.tata.contain('t')")
})

test('complex member expression with function call', () => {
  expect(parse((e, D) => e.data.nested.items[0].value.upper())).toBe("data.nested.items[0].value.upper()")
})

test('function call with multiple argument types', () => {
  expect(parse((e, D) => D.concat(e.name, 123, 'suffix', e.age))).toBe("concat(name, 123, 'suffix', age)")
})

test('function call with fn function', () => {
  expect(parse('() => add(12, 341)')).toBe("add(12, 341)")
})

test('function call with nested function calls as arguments', () => {
  expect(parse((e, D) => D.add(e.num.abs(), D.len(e.str)))).toBe("add(num.abs(), len(str))")
})

test('function call with array literal as argument', () => {
  expect(parse((e, D) => D.array_agg([e.name, e.age]))).toBe("array_agg([name, age])")
})

test('function call with object literal as argument', () => {
  expect(parse((e, D) => D.json_object({ name: e.name, age: e.age }))).toBe("json_object({name: name, age: age})")
})

test('decimal separator', () => {
  let num = 0
  const result = parse(`c => c.pop> 100_001`)
  expect(result).toBe("pop > 100001")
})
test('count(*)', () => {
  const result = parse((e, D) => D.count('*'))
  expect(result).toBe('count(*)')
})

test('alias.*', () => {
  expect(parse((e, D) => e.whatever["*"])).toBe('whatever.*')
  expect(parse((e, D) => e.toto.whatever["*"])).toBe('toto.whatever.*')
})
test('array slicer', () => {
  expect(parse(e => e.timezone.string_split('/')[1])).toBe("timezone.string_split('/')[1]")
})
test('Equal/isnull', () => {
  expect(parse(e => e.Rental.rental_date === null)).toBe("Rental.rental_date IS NULL")
  expect(parse(e => e.function_type == 'table')).toBe("function_type = 'table'")
  expect(parse(e => e.function_type != 'table')).toBe("function_type != 'table'")
  expect(parse(e => e.function_type !== 'table')).toBe("function_type is distinct from 'table'")
})
test('literral', () => {
  expect(parseObject(e => `_a_${e.comment}_b_`)).toEqual([['', '', "('_a_' || comment || '_b_')"]])
})

// describe('jsep plugin coverage', () => { // TODO: fix describe is not defined
test('jsep plugin coverage: ternary operator with high precedence left side', () => {
  expect(() => parse('e.a = e.b ? e.c : e.d')).toThrow('Unexpected "=" at character 4')
})

test('jsep plugin coverage: arrow function with sequence expression params', () => {
  // jsep parses (e.a, e.b) as a SequenceExpression, which is valid JS but not typical for arrow func params
  // The main parser then simplifies this. For jsep direct test, this is the expected raw output.
  expect(jsep('(e.a, e.b) => e.a + e.b').type).toBe('ArrowFunctionExpression')
})

test('jsep plugin coverage: object literal with computed property name and spread', () => {
  const prop = 'dynamicProp'
  // parseObject needs a function, so this one remains as a function
  // This test is more about the main parser's handling of jsep output.
  expect(() => parseObject((e, D) => ({ [prop]: e.value, ...e.rest }))).toThrow()
})

test('jsep plugin coverage: regex literal with escape characters and flags', () => {
  // Note: .match is not a standard SQL function, this tests jsep's regex parsing.
  // The transformation to regexp_matches happens in the main parser logic, not jsep itself.
  expect(jsep('e.text.match(/\\/\\\\[\\w\\s]+\\//gi)').type).toBe('CallExpression')
})

test('jsep plugin coverage: template literal with various escape sequences', () => {
  expect(parse('e => `\\n\\r\\t\\b\\f\\v\\`\\$`')).toBe("'\n\r\t\b\f\v`$'")
})

test('jsep plugin coverage: tagged template literal with member expression tag', () => {
  expect(jsep('e.tag.sub`template`').type).toBe('TaggedTemplateExpression')
})

test('jsep plugin coverage: empty or invalid expressions', () => {
  expect(() => jsep('')).toThrow('Empty expression') // Compound
  expect(() => jsep('e.fn(e.a,,e.c)')).toThrow('Unexpected token ,') // gobbleArguments in call
  expect(jsep('[e.a,,e.c]').type).toBe("ArrayExpression") // gobbleArguments in array
  expect(() => jsep('({a:})')).toThrow('unexpected object property') // gobbleObjectExpression
  expect(() => jsep('/invalid\\/`')).toThrow('Unclosed Regex') // gobbleRegexLiteral
})

test('jsep plugin coverage: gobbleIdentifier error cases', () => {
  expect(() => jsep('e + #')).toThrow("Expected expression after +")
})

test('jsep plugin coverage: gobbleNumericLiteral error cases', () => {
  expect(() => parse('e => 123.e')).toThrow("Expected exponent (123.e)")
  expect(() => parse('e => 123e')).toThrow("Expected exponent (123e)")
  expect(() => parse('e => 123.ef')).toThrow("Expected exponent (123.ef)")
  expect(() => parse('e => 123abc')).toThrow("Variable names cannot start with a number (123a)")
  expect(() => parse('e => e.a + .')).toThrow("Unexpected period")
})

test('jsep plugin coverage: gobbleStringLiteral error cases', () => {
  expect(() => parse('e => "unclosed string')).toThrow('Unclosed quote after "unclosed string')
})

test('jsep plugin coverage: gobbleGroup error cases', () => {
  expect(() => parse('e => (e.a + e.b')).toThrow('Unclosed (')
  expect(() => parse('e => ()')).toThrow('Empty group expression')
})

test('jsep plugin coverage: gobbleToken error cases', () => {
  expect(() => parse('e => -')).toThrow("missing unaryOp argument")
})


test('split+len', () => {
  expect(parse(e => e.str.split(':').lol)).toEqual(`str.string_split(':').lol`)
  expect(parse(e => e.arr.length)).toEqual(`arr.len()`)
  // expect(parse(e => e.str.split(':').length)).toEqual(`str.string_split(':').len()`)
})


test('prop spaces', () => {
  expect(parse(e => e.arr['prop space'])).toEqual(`arr."prop space"`)
  expect(parse(e => e['First Name'])).toEqual(`"First Name"`)
})


test('raw', () => {
  expect(parseObject((e, D) => ({ uuu: D.raw`'Math' IN (SELECT course FROM grades)` }))).toEqual([[
    "uuu",
    "('Math' IN (SELECT course FROM grades))"
  ]])
  expect(parseObject((e, D) => ({ uuu: D.raw`HELLO` }))).toEqual([["uuu", '(HELLO)']])
})

test('comma', () => {
  expect(parse((e) => e.f1.function_name.Like('%_%'))).toEqual(`f1.function_name LIKE '%_%'`)
  expect(parse(({ e }) => e._latitude.as('Varchar') + ', ' + e._longitude.as('Varchar'))).toEqual(`((e._latitude::Varchar) || ', ' || (e._longitude::Varchar))`)
  expect(parse((e) => e.ff._latitude.as('Varchar'))).toEqual(`(ff._latitude::Varchar)`)


})

test.todo('xxx', () => {
  console.log('";;;;;;;;;', jsep(`read_csv(['2025-01/2025-01-04.descs.tsv'])`))
})

test(('comments'), () => {
  jsep.Jsep.parse(`MemoryDB.from('duckdb_functions()').select(e => ({
            /* */
            detailed_info: 'Name: ',
        }))
`)
})

test('count filter', () => {
  expect(parse((e, D) => D.count().filter(e.function_name.len() > 10)))
    .toEqual(`count() FILTER (function_name.len() > 10)`)
  expect(parse((e, D) => D.count(e.total).filter(e.function_name.len() > 10)))
    .toEqual(`count(total) FILTER (function_name.len() > 10)`)
})

