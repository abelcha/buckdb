import { expect, test } from 'bun:test';
import { builder } from './build';
import { MemoryDB } from '../buckdb';
import * as t from '../.buck/types';

const fns = await MemoryDB.from('duckdb_functions()').select().execute()
type E<T> = T

test('basic tests', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name, description: e.description
    }))
    .execute() satisfies E<{
      function_name: string; description: string
    }[]>;

  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name
    }))
    // @ts-expect-error
    .execute() satisfies E<{
      description: string
    }[]>;
});

test('full tests', async () => {
  await MemoryDB.from('duckdb_functions()')
    .join('duckdb_types()', 'ttt', (a, b) => a.duckdb_functions.comment === a.ttt.comment)
    .select(e => ({
      a: e.ttt.logical_type,
      b: e.duckdb_functions.function_name.levenshtein(e.function_type)
    }))
    .execute() satisfies {
      a: string; b: number
    }[];
});

test('where clause type checking', async () => {
  // Using a simple string for the where clause
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name
    }))
    .where("function_name LIKE '%sum%'")
    .execute() satisfies E<{
      function_name: string
    }[]>;

  expect(() =>
    MemoryDB.from('duckdb_functions()')
      .select(e => ({
        function_name: e.function_name
      }))
      // @ts-expect-error - nonexistent field
      .where(e => e.nonexistent_field === 'value')
      .execute()
  ).toThrow()
});

test('string operations type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      upper_name: e.function_name.upper(),
      name_length: e.function_name.len()
    }))
    .execute() satisfies E<{
      upper_name: string;
      name_length: number;
    }[]>;

  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      upper_name: e.function_name.len()
    }))
    // @ts-expect-error - numeric operation returning number being assigned to string
    .execute() satisfies E<{
      upper_name: string;
    }[]>;
});

test('numeric operations type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      name_length: e.function_name.len(),
      length_squared: e.function_name.len().pow(2),
      length_sqrt: e.function_name.len().sqrt()
    }))
    .execute() satisfies E<{
      name_length: number;
      length_squared: number;
      length_sqrt: number;
    }[]>;
});

test('orderBy type checking', async () => {
  expect(
    await MemoryDB.from('duckdb_functions()')
      .select(e => ({
        function_name: e.function_name,
        description: e.description
      }))
      .orderBy('function_oid')
      .execute()
  ).toEqual(
    fns.toSorted((a, b) => a.function_oid - b.function_oid)
      .map(({ function_name, description }) => ({ function_name, description }))
  );
  expect(() =>
    MemoryDB.from('duckdb_functions()')
      .select(e => ({
        function_name: e.function_name,
        description: e.description
      }))
      // @ts-expect-error - nonexistent field
      .orderBy('nonexistent_field')
      .execute()
  ).toThrow()
});

test('groupBy type checking', async () => {
  await MemoryDB
  .from('duckdb_functions()')
    .select((e, D) => ({
      function_type: e.function_type,
      function_name: D.min_by(e.function_name, 'len'),
    }))
    .groupBy('function_type')
    .execute() satisfies E<{
      function_type: string;
      function_name: string;
    }[]>;
});

test('single row result type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name,
      description: e.description
    }))
    .minBy('function_name')
    .execute() satisfies E<{
      function_name: string;
      description: string;
    }[]>;

  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name,
      description: e.description
    }))
    .maxBy('function_name')
    .execute() satisfies E<{
      function_name: string;
      description: string;
    }[]>;
});

test('keyed result type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
      function_name: e.function_name,
      description: D.array_agg(e.description)
    }))
    .keyBy('function_name')
    .execute() satisfies E<Record<string, {
      function_name: string;
      description: string[];
    }[]>>;
});

test('limit and offset type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name
    }))
    .limit(10)
    .offset(5)
    .execute() satisfies E<{
      function_name: string;
    }[]>;
});

test('nested structure type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      main: {
        name: e.function_name,
        details: {
          'descx': e.description,
          type: e.function_type
        }
      }
    }))
    .execute() satisfies E<{
      main: {
        name: string;
        details: {
          descx: string;
          type: string;
        }
      }
    }[]>;
});

test('error cases with incorrect type assertions', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name
    }))
    // @ts-expect-error - wrong return type (number instead of string)
    .execute() satisfies E<{
      function_name: number;
    }[]>;

  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name
    }))
    // @ts-expect-error - missing field in return type
    .execute() satisfies E<{
      missing_field: string;
    }[]>;
});

test('sample method type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name
    }))
    .sample(10)
    .execute() satisfies E<{
      function_name: string;
    }[]>;

  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name
    }))
    .sample('50%')
    .execute() satisfies E<{
      function_name: string;
    }[]>;
});

test('context method type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      function_name: e.function_name
    }))
    .context({ some_param: 'value' })
    .execute() satisfies E<{
      function_name: string;
    }[]>;
});

test('multiple joins type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .join('duckdb_types()', 'types1', (a, b) => a.duckdb_functions.function_name === a.types1.logical_type)
    .join('duckdb_types()', 'types2', (a, b) => a.duckdb_functions.function_type === a.types2.logical_type)
    .select(e => ({
      function_name: e.duckdb_functions.function_name,
      type1: e.types1.logical_type,
      type2: e.types2.logical_type
    }))
    .execute() satisfies {
      function_name: string;
      type1: string;
      type2: string;
    }[];
});

test('ambiguous type inference - conditional expressions', async () => {
  // Test case where a conditional expression could result in different types
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      // This should be inferred as string | number
      conditional_result: e.function_name.Is(null) ? 'TEST' : e.function_name
    }))
    .execute() satisfies E<{
      conditional_result: string | number;
    }[]>;
});

test('ambiguous type inference - function overloads', async () => {
  // Test case where a function can return different types based on input
  const rrrr = await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
      // json_extract can return different types based on the path
      json_result: D.Json({ field: e.function_name }).json_extract('$.field')
    }))
    .execute();

  // Test with functions that accept multiple argument types
  // MemoryDB.from('duckdb_functions()')
  //   .select(e => ({
  //     // date_part can accept different types of arguments
  //     date_part_result: e.function_name.date_part(e.function_name)
  //   }))
  //   .execute();
});

test('ambiguous type inference - complex expressions', async () => {
  // Test with complex expressions that involve multiple operations
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      // Complex expression with multiple operations
      complex_result: e.function_name.upper().len().pow(2).sqrt()
    }))
    .execute() satisfies E<{
      complex_result: number;
    }[]>;

  // Test with nested function calls that might have ambiguous types
  await MemoryDB.from('duckdb_functions()')
    .select((e, D) => ({
      // Nested function calls
      nested_result: D.Json({ field: e.function_name }).json_extract('$.field')
    }))
    .execute() satisfies E<{
      nested_result: Record<string, any>;
    }[]>
});

test('ambiguous type inference - type conversions', async () => {
  // Test with explicit type conversions
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      // Converting between types
      converted_result: e.function_name.len().to_base(16)
    }))
    .execute() satisfies E<{
      converted_result: string;
    }[]>;

  // Test with implicit type conversions
  await MemoryDB.from('duckdb_functions()')
    .select(e => ({
      // Implicit conversion in arithmetic operation
      xxx: e.function_name + 'dsl',
      implicit_result: e.function_name.len() + 123,
      zzz: e.function_name + '12'
    }))
    .execute() satisfies E<{
      xxx: string;
      implicit_result: number;
    }[]>;
});

test('complex query type checking', async () => {
  await MemoryDB.from('duckdb_functions()')
    .join('duckdb_types()', 'types', (a, b) => a.duckdb_functions.function_name === a.types.logical_type)
    .select(e => ({
      function_name: e.duckdb_functions.function_name,
      type_name: e.types.logical_type,
      combined: e.duckdb_functions.function_name.concat_ws(' - ', e.types.logical_type)
    }))
    .where("duckdb_functions.function_name LIKE '%sum%'")
    // .orderBy(e => e.duckdb_functions.function_name.len())
    .execute() satisfies {
      function_name: string;
      type_name: string;
      combined: string;
    }[];
});
