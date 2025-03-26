import { describe, test, expect } from "bun:test";
import { from } from "./builder";
import { mapValue } from "@duckdb/node-api";
// todo:
/*
  from(e => e.read_csv('test.csv'))


*/
// const queryselect = (fn: )=> from('test.csv').selectMany()

describe("TextEncoder", () => {
  test("selectMany", () => {
    expect(from('test.csv')
      .selectMany((p, D) => ({
        // '': D.distinct
        // zz:p.age.ceiling()
        xx:D.levenshtein('test', p.name),
        uu: D.levenshtein(p.age.to_hex(), D.upper(p.name)),
        zz: D.levenshtein('ab', 'cd'),
        aa: p.name.levenshtein(D.to_hex(p.age.add(12)).upper()).subtract(-12),
        })).asSelector())
      .toBe("levenshtein('test', name) AS xx, levenshtein(age.to_hex(), upper(name)) AS uu, levenshtein('ab', 'cd') AS zz, name.levenshtein(to_hex(age.add(12)).upper()).subtract(-12) AS aa");

    expect(from('test.csv')
      .selectMany(p => ({ name: p.name })).asSelector())
      .toBe("name AS name");
    expect(from('test.csv')
      .selectMany(p => ({ ...p })).asSelector())
      .toBe("name AS name, age AS age");
    expect(from('test.csv')
      .selectMany(p => ({ age: p.age.add(2024) })).asSelector())
      .toBe("age.add(2024) AS age");
    expect(from('test.csv')
      .selectMany(p => ({ age: p.age.add(2024).to_hex().levenshtein('toto') })).asSelector())
      .toBe("age.add(2024).to_hex().levenshtein('toto') AS age");
    expect(from('test.csv')
      .selectMany((p, { levenshtein, to_hex }) => ({ w: levenshtein(to_hex(p.age), p.name) })).asSelector())
      .toBe("levenshtein(to_hex(age), name) AS w");
    expect(from('test.csv')
      .selectMany(p => ({
        cond: `IF(age>60, 'SENIOR', 'ADULT')`,
      })).asSelector())
      .toBe("IF(age>60, 'SENIOR', 'ADULT') AS cond");
    expect(from('test.csv')
      .selectMany(p => ({
        sub: from('test.csv').selectMany(p => ({ name: p.name })),
      })).toSql())
      .toBe("SELECT (SELECT name AS name FROM 'test.csv') AS sub FROM 'test.csv'");
    expect(from('test.csv')
      .selectMany((p, D) => ({
        name: D.lower('abel'),
        a: D.levenshtein('abel', p.name),
        z: `IFNULL(${p.age},  40)`,

      })).asSelector())
      .toBe("lower('abel') AS name, levenshtein('abel', name) AS a, IFNULL(age,  40) AS z");
      
  })
  test('asFrom', () => {
    expect(from('test.csv').asFrom()).toBe("'test.csv'");
    expect(from('test.json.gz').asFrom()).toBe("'test.json.gz'");
    expect(from('db.groups').asFrom()).toBe("db.groups");
    expect(from('tablename').asFrom()).toBe("tablename");
    // expect(from(D => D.read_csv('test.csv')).asFrom()).toBe("FROM read_csv('test.csv')");
  })
  test('execute', async () => {
    // const resp = ;
    expect(() => from('s3://my-bucket/test.csv').selectMany(p => ({ lolname: p.name })).execute())
    .toThrow()
    expect(() => from('tablename')
    // .selectMany(p => ({dd: p.name.}))
    .selectMany((p, D) => ({
      d: D.hour(p.age)
    }))
    .asFrom().where((e, D) => (
      D.and(
        e.name.similarTo(/abc|dec/),
        e.name.like('ABC%'),
        D.or(e.name.eq('abc'), e.name.eq('def')),
      )
    ))).toThrow();

    // expect(from('test.csv').execute()).toBeInstanceOf(Promise);
  })
  // test('join', () => {
  //   expect(from('test.csv')
  //   .joinAs()
  //     .join('test2.csv', 'name', 'name')
  //     .selectMany(p => ({ name: p.name }))
  //     .asFrom()).toBe("FROM 'test.csv' JOIN 'test2.csv' ON name = name");
  //   expect(from('test.csv')
  //     .join('test2.csv', 'name', 'name')
  //     .selectMany(p => ({ name: p.name }))
  //     .asSelector()).toBe("name AS name");
  // })



  // test("can encode a string", async () => {
  //   const query = from('test.csv')
  //     .selectMany((p, { lower, }) => ({
  //       name: lower(p.name).lower(),
  //       zage: p.age,
  //       age: p.age.add(1).multiply(2),
  //       ageHex: p.age.to_hex().upper(),
  //       xx: `IF(age>40, 'VIEUX', 'JEUNE')`,
  //     }))

  //   console.log(query.toSql())
  //   expect(12).toBe(12);
  // .where((p) => p.age.multiply(p.), '>', 41)  // Basic comparison
  // .where(p => p.name, 'LIKE', '%john%')  // LIKE operator
  // .orWhere(p => p.age, 'BETWEEN', [18, 30])  // BETWEEN with OR logic

  // Example of executing the query and using the typed results
  // const results = await query.execute();
  // // Results are typed based on selectMany
  // for (const row of results) {
  //   // row.age + 1
  //   console.log(row);
  // }

  // buck.with({
  //   response: from('./people.parquet').select(({ age }) => ({ age })).toSql(),
  // })

  // Show the results
  // console.log('Selections array:', query.getSelections());
  // console.log('SQL query:', query.toSql());
  // console.log('Formatted SQL:', emphasize.highlight('sql', format(query.toSql(), 'xx.sql')).value);

  // });
});