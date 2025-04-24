import { test, expect } from 'bun:test';
//  import { ConditionParser } from './condition-parser';
import { parse, parseObject } from './parser'
import jsep from './jsep';


test('should parse basic condition', () => {
    const result = parse((e, D) => e.age > 12);
    expect(result).toBe('age > 12');
});

test('bool', () => {
    expect(parse((e, D) => (e.isToto === true))).toBe('isToto = true');
    expect(parse((e, D) => (e.isToto === false))).toBe('isToto = false');
});

test('should parse logical AND', () => {
    const result = parse((e, D) => e.age > 12 && e.name === 'test');
    expect(result).toBe("age > 12 AND name = 'test'");
});

test('method call', () => {
    const result = parse((e, D) => e.name.whatever(`toto`) === "ok");
    expect(result).toBe("name.whatever('toto') = 'ok'");
});

test('should parse logical OR', () => {
    const result = parse((e, D) => e.age > 12 || e.name === 'test' || e.name.whatever(`toto`));
    expect(result).toBe("age > 12 OR name = 'test' OR name.whatever('toto')");
});

test('inlined local var', () => {
    const localVar = 10;
    const result = parse((e, D) => e.age === localVar);
    expect(result).toBe("age = 10");
});
test('template litteral', () => {
    let num = 0
    expect(parse((e, D) => e.name === `lol`)).toBe("name = 'lol'");
    expect(parse((e, D) => e.name.match(`lol`))).toBe("name.match('lol')");
    // Now we support template literals with expressions
    expect(parse((e, D) => e.name === `abel${e.vrl}`, { num })).toBe("name = 'abel' || vrl");
    expect(parse((e, D) => e.name === `abel${num}`, { num })).toBe("name = 'abel' || (0)");
    expect(parse((e, D) => e.name === `${num}abel`, { num })).toBe("name = (0) || 'abel'");
    expect(parse((e, D) => e.name === `prefix${num}suffix`, { num })).toBe("name = 'prefix' || (0) || 'suffix'");
    expect(parse((e, D) => e.name === `${num}${num + 1}`, { num })).toBe("name = (0) || (0) + 1");
})
test('should parse logical NOT', () => {
    let num = 0
    const result = parse((e, D) => (e.age > 12 || e.name.tata.includes("tata", e.age)) && D.upper(e.name.whatever(`toto`)));
    expect(result).toBe("(age > 12 OR name.tata.includes('tata', age)) AND upper(name.whatever('toto'))");
});

test('should parse complex condition with DuckDB function', () => {
    const result = parse((e, D) =>
        (e.name.match_regex(/[a-z].+/) || e.age > 12) &&
        D.levenstein_distance(e.name, "duckdb") > 4
    );
    expect(result).toBe(
        "(name.match_regex('[a-z].+') OR age > 12) AND levenstein_distance(name, 'duckdb') > 4"
    );
});

// test('should throw on invalid parameter count', () => {
//     expect(() => parse((e) => e.age > 12)).toThrow(
//         'Expected exactly 2 parameters (e, D)'
//     );
// });

// test('should throw on invalid parameter names', () => {
//     expect(() => parse((x, y) => x.age > 12)).toThrow(
//         'First parameter must be named "e"'
//     );
// });


test('should throw on local variable usage', () => {
    //   const localVar = 10;
    //   console.log('-------->', parse((e, D) => e.age > localVar))
    expect(() => parse((e, D) => e.age > whatever)).toThrow(
        "Undefined variable: whatever, use .context({ whatever }) too pass it down"
    );
    expect(parse((e, D) => e.age > whatever, { whatever: 42 })).toBe('age > (42)')
});

test('operators', () => {
    expect(parse((e, D) => (e.field.x.y === 4 || e.age + 4 > 10) && e.age - 10 > 0)).toBe(
        "(field.x.y = 4 OR age + 4 > 10) AND age - 10 > 0"
    );
});


test('ternary', () => {
    expect(parse((e, D) => (e.num > 3 ? e.isWhatever() : false))).toBe(
        "(CASE WHEN (num > 3) THEN isWhatever() ELSE false END)"
    );
});


test('pattermatcher', () => {
    expect(parse((e, D) => e.num.SimilarTo(/.+\w+/img))).toBe("regexp_match(num, '.+\\w+', 'gim')");

    expect(parse((e, D) => e.num.Like('%12'))).toBe("num LIKE '%12'");
    expect(parse((e, D) => e.num.SimilarTo(/.+\w+/))).toBe("num SIMILAR TO '.+\\w+'");
    expect(parse((e, D) => e.num.Between(12, 52))).toBe("num BETWEEN 12 AND 52");
    expect(parse((e, D) => e.num.NotBetween(12, 52))).toBe("num NOT BETWEEN 12 AND 52");
    expect(parse((e, D) => e.num.IsNot(null))).toBe("num IS NOT NULL");
    expect(parseObject((p, D) => ({
        l: D.SimilarTo(p.lat, /12.+/) ? p.lat : D.Bigint(42),
        // lg: p.lng, nm: p.name, dd: D.Bigint(12)
    }))).toEqual([
        ["l", "(CASE WHEN (lat SIMILAR TO '12.+') THEN lat ELSE CAST(42 AS BIGINT) END)"]
    ]);

});


test('ternary', () => {
    const tata = () => 123 == ~123
    expect(parseObject((e, D) => ({ xxx: (e.num > 3 ? e.isWhatever() : false) }))).toEqual([
        ['xxx', "(CASE WHEN (num > 3) THEN isWhatever() ELSE false END)"]
    ]);
});


test('cast', () => {
    expect(parse((e, D) => e.num.as('Bigint'))).toBe("num::Bigint");
    expect(parse((e, D) => e.num.as('Decimal(1, 4)'))).toBe("num::Decimal(1, 4)");
    expect(parse((e, D) => e.num.as('Decimal', 1, 3))).toBe("num::Decimal(1, 3)");
    expect(parse((e, D) => D.cast(e.num, 'Bigint'))).toBe("CAST(num AS Bigint)");
    expect(parse((e, D) => D.cast(e.num, 'Decimal(12, 42)'))).toBe("CAST(num AS Decimal(12, 42))");
    expect(parse((e, D) => D.cast(e.num, 'Map(Varchar, Float)'))).toBe("CAST(num AS Map(Varchar, Float))");
    expect(parse((e, D) => e.lat.as('Bigint') === D.cast(e.lng.abs(), 'Array[string]')))
        .toBe("lat::Bigint = CAST(lng.abs() AS Array[string])");

});

test('object', () => {
    expect(parseObject((p, D) => ({
        l: D.SimilarTo(p.name, /\w+mode/) ? p.description.len() < 3 ? p.value : p.scope : D.Varchar(42),
        lg: p.geo.lng,
        nm: p.name,
        dd: D.Float(12)
    }))).toEqual([
        ["l", "(CASE WHEN (name SIMILAR TO '\\w+mode') THEN (CASE WHEN (description.len() < 3) THEN value ELSE scope END) ELSE CAST(42 AS VARCHAR) END)"],
        ["lg", "geo.lng"],
        ["nm", "name"],
        ["dd", "CAST(12 AS FLOAT)"]
    ]);
})
test('string', () => {
    expect(parse((e, D) => e.arr === "abel")).toBe("arr = 'abel'");

    expect(parse((e, D) => e.arr === "'abel")).toBe(`arr = '''abel'`);
    expect(parseObject((e, D) => ({
        xxx: D.Varchar('lol')
    }))).toEqual([['xxx', "CAST('lol' AS VARCHAR)"]])

    // Basic template literal tests
    const lol = 42
    expect(parse((e, D) => `abel${lol}`, { lol })).toBe("'abel' || (42)");

    // Additional template literal tests
    expect(parse((e, D) => `${e.firstName} ${e.lastName}`)).toBe("firstName || ' ' || lastName");
    expect(parse((e, D) => `User: ${e.name}, Age: ${e.age}`)).toBe("'User: ' || name || ', Age: ' || age");
    expect(parse((e, D) => `Count: ${e.count + 1}`)).toBe("'Count: ' || (count + 1)");
    expect(parse((e, D) => `${e.value}%`)).toBe("value || '%'");
    expect(parse((e, D) => `${e.prefix}-${e.id}-${e.suffix}`)).toBe("prefix || '-' || id || '-' || suffix");

    // Empty template literal
    expect(parse((e, D) => ``)).toBe("''");

    // Template literal with expressions but no text
    expect(parse((e, D) => `${e.name}`)).toBe("name");

    // Test string concatenation with + operator
    expect(parse((e, D) => e.name + '---' + e.age)).toBe("name || '---' || age");
    expect(parse((e, D) => e.name + 42 + '---')).toBe("name || 42 || '---'");
    expect(parse((e, D) => 'prefix-' + e.name + '-suffix')).toBe("'prefix-' || name || '-suffix'");

    // Additional string concatenation tests
    expect(parse((e, D) => 'Hello, ' + e.name + '! Your score is ' + e.score)).toBe(
        "'Hello, ' || name || '! Your score is ' || score"
    );
    expect(parse((e, D) => e.firstName + ' ' + e.lastName)).toBe("firstName || ' ' || lastName");
    expect(parse((e, D) => e.value + '%')).toBe("value || '%'");
    expect(parse((e, D) => e.count + ' items')).toBe("count || ' items'");

    // Mixed string concatenation and arithmetic
    expect(parse((e, D) => 'Total: ' + (e.price * e.quantity))).toBe("'Total: ' || price * quantity");
    expect(parse((e, D) => e.prefix + (e.a + e.b) + e.suffix)).toBe("prefix + (a + b) + suffix");
    // expect(parse((e, D) =>  D.raw`['123', 'tata', 'yoyo']`)).toBe(`arr = '\\'abel'`);
})

const parseBody = (expr: Function | string, context = {}) => {
    try {

        return parse('(p, D) => (' + expr + ')', context)
    } catch (err) {
        console.error('Error parsing body:', err.message);
        console.log('-------------')
        console.log(require('util').inspect(jsep(expr), {
            depth: Infinity,
            colors: true,
            showHidden: false
        }))
        console.log('---------------')
    }
}
test('arrays', () => {

    expect(parse((e, D) => e.arr['abel'])).toBe("arr.abel");
    // expect(parse((e, D) => e.arr[1.])).toBe("arr[1:]");
    // expect(parse((e, D) => e.arr['1'])).toBe("arr.1");
    expect(parse((e, D) => e.arr[1])).toBe("arr[1]");
    expect(parse((e, D) => e.arr[.1])).toBe("arr[0:1]");
    expect(parse((e, D) => e.arr[43.55])).toBe("arr[43:55]");
})

test('properties', () => {
    expect(parseBody(`{'toto':"43"}`)).toBe("{'toto': '43'}");
    expect(parseBody(`{toto:/45/g, x:15}`)).toBe("{toto: '45', x: 15}");
    expect(parseBody(`{['toto']:42}`)).toBe("{'toto': 42}");
})

// test('+ sign', () => {
//     [
//         // [e => ({x:e.function_name + 'lol'}), "function_name || 'lol'"],
//         [e => ({x:`${e.function_name}lol`}), "function_name || 'lol'"],
//     ].forEach(item => {
//         const [fn, expected] = item;
//         expect(parseObject(fn)).toEqual([['x', expected]]);
//     });
// })