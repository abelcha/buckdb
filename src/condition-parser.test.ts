import { test, expect } from 'bun:test';
import { ConditionParser } from './condition-parser';

const parser = new ConditionParser();

test('should parse basic condition', () => {
    const result = parser.parseWhereClause((e, D) => e.age > 12);
    expect(result).toBe('age > 12');
});

test('should parse logical AND', () => {
    const result = parser.parseWhereClause((e, D) => e.age > 12 && e.name === 'test');
    expect(result).toBe("age > 12 AND name = 'test'");
});

test('method call', () => {
    const result = parser.parseWhereClause((e, D) => e.name.whatever(`toto`) === "ok");
    expect(result).toBe("name.whatever('toto') = 'ok'");
});

test('should parse logical OR', () => {
    const result = parser.parseWhereClause((e, D) => e.age > 12 || e.name === 'test' || e.name.whatever(`toto`));
    expect(result).toBe("age > 12 OR name = 'test' OR name.whatever('toto')");
});

test('inlined local var', () => {
    const localVar = 10;
    const result = parser.parseWhereClause((e, D) => e.age === localVar);
    expect(result).toBe("age = 10");
});
test('template litteral', () => {
    let num = 0
    expect(parser.parseWhereClause((e, D) => e.name === `lol`)).toBe("name = 'lol'");
    expect(parser.parseWhereClause((e, D) => e.name.match(`lol`))).toBe("name.match('lol')");
    expect(() => parser.parseWhereClause((e, D) => e.name === `lol ${num}`)).toThrow('Unsupported node type: TemplateExpression')
})
test('should parse logical NOT', () => {
    let num = 0
    const result = parser.parseWhereClause((e, D) => (e.age > 12 || e.name.tata.includes("tata", e.age)) && D.upper(e.name.whatever(`toto`)));
    expect(result).toBe("(age > 12 OR name.tata.includes('tata', age)) AND upper(name.whatever('toto'))");
});

test('should parse complex condition with DuckDB function', () => {
    const result = parser.parseWhereClause((e, D) =>
        (e.name.match_regex(/[a-z].+/) || e.age > 12) &&
        D.levenstein_distance(e.name, "duckdb") > 4
    );
    expect(result).toBe(
        "(name.match_regex('[a-z].+') OR age > 12) AND levenstein_distance(name, 'duckdb') > 4"
    );
});

// test('should throw on invalid parameter count', () => {
//     expect(() => parser.parseWhereClause((e) => e.age > 12)).toThrow(
//         'Expected exactly 2 parameters (e, D)'
//     );
// });

// test('should throw on invalid parameter names', () => {
//     expect(() => parser.parseWhereClause((x, y) => x.age > 12)).toThrow(
//         'First parameter must be named "e"'
//     );
// });


test('should throw on local variable usage', () => {
    //   const localVar = 10;
    //   console.log('-------->', parser.parseWhereClause((e, D) => e.age > localVar))
    expect(() => parser.parseWhereClause((e, D) => e.age > whatever)).toThrow(
        "Local variable references are not allowed"
    );
});

test('operators', () => {
    expect(parser.parseWhereClause((e, D) => (e.field.x.y === 4 || e.age + 4 > 10) && e.age - 10 > 0)).toBe(
        "(field.x.y = 4 OR age + 4 > 10) AND age - 10 > 0"
    );
});
