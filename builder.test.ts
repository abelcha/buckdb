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
        xx:D.levenshtein_distance('test', p.name),
        uu: D.levenshtein_distance(p.age.to_hex(), D.upper(p.name)),
        zz: D.levenshtein_distance('ab', 'cd'),
        })).asSelector())
      .toBe("levenshtein_distance('test', name) AS xx, levenshtein_distance(age.to_hex(), upper(name)) AS uu, levenshtein_distance('ab', 'cd') AS zz");

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
      .selectMany(p => ({ age: p.age.add(2024).to_hex().levenshtein_distance('toto') })).asSelector())
      .toBe("age.add(2024).to_hex().levenshtein_distance('toto') AS age");
    expect(from('test.csv')
      .selectMany((p, { levenshtein_distance, to_hex }) => ({ w: levenshtein_distance(to_hex(p.age), p.name) })).asSelector())
      .toBe("levenshtein_distance(to_hex(age), name) AS w");
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
        a: D.levenshtein_distance('abel', p.name),
        z: `IFNULL(${p.age},  40)`,

      })).asSelector())
      .toBe("lower('abel') AS name, levenshtein_distance('abel', name) AS a, IFNULL(age,  40) AS z");
  })
  test('asFrom', () => {
    expect(from('test.csv').asFrom()).toBe("'test.csv'");
    expect(from('test.json.gz').asFrom()).toBe("'test.json.gz'");
    expect(from('db.groups').asFrom()).toBe("db.groups");
    expect(from('tablename').asFrom()).toBe("tablename");
    // expect(from(D => D.read_csv('test.csv')).asFrom()).toBe("FROM read_csv('test.csv')");
  })
  test('execute', async () => {
    const resp = await from('test.csv').selectMany(p => ({ lolname: p.name })).execute();

    expect(resp).toBeInstanceOf(Promise);
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