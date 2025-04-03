import { describe, test, expect } from "bun:test";
import { database, from } from "./builder";
import { IGlobal, DNumericField, DVarcharField } from "./.buck/types";
import { makeProxy } from "./proxy";

const expectCompare = async (x) => {
  const st = new Error().stack?.split('\n')
  const line = st?.[3]?.split(':')[1]
  const r = (await Bun.$`sed -n ${line}p ${import.meta.path}`.text()).trim()
    .replace('expectCompare', '').slice(1, -1)
  expect(x.toString()).toBe(r)
}
describe("select", () => {
  test("selectMany", () => {
    expect(from('data/test.csv')
      .selectMany((p, D) => ({
        xx: D.levenshtein('test', p.name),
        uu: D.levenshtein(p.age.to_hex(), D.upper(p.name)),
        zz: D.levenshtein('ab', 'cd'),
        aa: p.name.levenshtein(D.to_hex(p.age.add(12)).upper()).subtract(-12),
      })).asSelector())
      .toBe("levenshtein('test', name) AS xx, levenshtein(age.to_hex(), upper(name)) AS uu, levenshtein('ab', 'cd') AS zz, " +
        "name.levenshtein(to_hex(age.add(12)).upper()).subtract(-12) AS aa");

    expect(from('data/test.csv')
      .selectMany(p => ({ name: p.name })).asSelector())
      .toBe("name AS name");
    expect(from('data/test.csv')
      .selectMany(p => ({ ...p })).asSelector())
      .toBe("name AS name, age AS age, total AS total");
    expect(from('data/test.csv')
      .selectMany(p => ({ age: p.age.add(2024) })).asSelector())
      .toBe("age.add(2024) AS age");
    expect(from('data/test.csv')
      .selectMany(p => ({ age: p.age.add(2024).to_hex().levenshtein('toto') })).asSelector())
      .toBe("age.add(2024).to_hex().levenshtein('toto') AS age");
    expect(from('data/test.csv')
      .selectMany((p, { levenshtein, to_hex }) => ({ w: levenshtein(to_hex(p.age), p.name) })).asSelector())
      .toBe("levenshtein(to_hex(age), name) AS w");
    expect(from('data/test.csv')
      .selectMany(p => ({
        cond: `IF(age>60, 'SENIOR', 'ADULT')`,
      })).asSelector())
      .toBe("IF(age>60, 'SENIOR', 'ADULT') AS cond");
    expect(from('data/test.csv')
      .selectMany((p, D) => ({
        name: D.lower('abel'),
        a: D.levenshtein('abel', p.name),
        z: `IFNULL(${p.age}, 40)`,

      })).asSelector())
      .toBe("lower('abel') AS name, levenshtein('abel', name) AS a, IFNULL(age, 40) AS z");
  })

  test("expectCompare", () => {
    const D = makeProxy() as unknown as IGlobal;
    const p = {
      name: makeProxy('name') as unknown as DVarcharField,
      age: makeProxy('age') as unknown as DNumericField,
    }
    const { name, age } = p;
    const { add, subtract, lower, upper, levenshtein } = D;
    const x = subtract(name.lower().levenshtein('tata').to_hex().levenshtein(age.to_hex()), 12)
    expectCompare(subtract(name.lower().levenshtein('tata').to_hex().levenshtein(age.to_hex()), 12))
    expectCompare(age.subtract(lower(upper('tatat').levenshtein(name).to_hex()).levenshtein('lol')))
    expectCompare(add(age, 42))
    expectCompare(age.add(2024).to_hex().levenshtein('toto'))
    expectCompare(age.add(2024).abs().add(4).to_hex().left(1000))
  })

  test('large', () => {
    const q = database('data/ex.duckdb')
      .from('sfr')
      .select((p, D) => ({
        xdd: D.lower(D.abs(31).add(44).to_base(8)).concat(p.latitude.to_base(8).ascii().to_hex()),
        rr: p.lastname.concat(' - ', p.firstname),
        zz: `${p.phone.ascii().abs()} + 3`,
        oo: `(select cast(parameters AS string) from duckdb_functions() order by len(parameters) LIMIT 1)`,
        dd: p.address,
        eee: p.lastname.array_extract(13)
      }))
    expect(q.toSql()).toEqual(
      "SELECT " +
      "lower(abs(31).add(44).to_base(8)).concat(latitude.to_base(8).ascii().to_hex()) AS xdd, " +
      "lastname.concat(' - ', firstname) AS rr, " +
      "phone.ascii().abs() + 3 AS zz, " +
      "(select cast(parameters AS string) from duckdb_functions() order by len(parameters) LIMIT 1) AS oo, " +
      "address AS dd, " +
      "lastname.array_extract(13) AS eee FROM sfr")
  })

  test("database('data/ex.duckdb')", () => {
    const q = database('data/ex.duckdb').from('wavy').select((p, D) => ({
      name: D.upper(p.firstName.concat(' - ', p.lastName.upper()))
    })).limit(10)
    expect(q.toSql()).toBe("SELECT upper(firstName.concat(' - ', lastName.upper())) AS name FROM wavy LIMIT 10");
  })
  test('asFrom', () => {
    expect(from('data/test.csv').asFrom()).toBe("'data/test.csv'");
  })
  test('execute', async () => {
    const q2 = from('data/people.parquet')
      .select(p => ({ hh: p.name.replace('lol', 'toto'), xname: p.name }))
      .where(p => p.age === 12 && p.age > 12 && p.total.abs() > 3 && p.name.levenshtein('xx') === 4)
      .where(p => p.name.replace('lol', 'toto') === 'lol' && p.name === 'lol' && p.hh === 'lol' && p.name === p.total.to_hex())
      .where((p, D) => D.abs(p.age) === p.total && p.hh.regexp_matches(/123/, '') && D.cos(99) === 12 && D.regexp_matches(p.name, /abel/, ''))
    expect(q2.toSql()).toBe("SELECT name.replace('lol', 'toto') AS hh, name AS xname FROM 'data/people.parquet' " +
      "WHERE (age = 12 AND age > 12 AND total.abs() > 3 AND name.levenshtein('xx') = 4) " +
      "AND (name.replace('lol', 'toto') = 'lol' AND name = 'lol' AND hh = 'lol' AND name = total.to_hex()) " +
      "AND (abs(age) = total AND hh.regexp_matches('123', '') AND cos(99) = 12 AND regexp_matches(name, 'abel', ''))")
  })
});