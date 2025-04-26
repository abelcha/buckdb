import { DNumericField, DVarcharField, sInferred } from "../.buck/types";
import { Assert, ExpectEqual, GenericRecursive, SelectModel } from "./build.types";
import { DField } from "./utils";


export type ToExecuted<SelectedFields extends SelectModel> = SelectedFields extends GenericRecursive<DField | string> ? {
  [P in keyof SelectedFields]: SelectedFields[P] extends DField
  ? (SelectedFields[P] extends { [sInferred]: infer V } ? V : SelectedFields[P])
  : SelectedFields[P] extends SelectModel
  ? ToExecuted<SelectedFields[P]> :
  never
} : never;


export type ToExecutedArray<SelectedFields extends readonly any[]> = {
  [P in keyof SelectedFields]: SelectedFields[P] extends DField
  ? (SelectedFields[P] extends { [sInferred]: infer V } ? V : SelectedFields[P])
  : SelectedFields[P] extends SelectModel
  ? ToExecuted<SelectedFields[P]>
  : never
};

type t1 = ToExecuted<{ name: DVarcharField, age: DNumericField }>;
type xx = Assert<ExpectEqual<t1, { name: string; age: number }>>;


type t2 = ToExecutedArray<[DVarcharField, DNumericField]>;

type xx2 = Assert<ExpectEqual<t2, [string, number]>>;





// // Re-define ToRecord for the generic fallback case
// export type ToRecord<T> =
//   T extends readonly unknown[]
//   ? { [K in keyof T & `${number}`]: T[K] } // keep only numeric keys
//   : T;

// // Re-define TupleToRecord helper for overload clarity
// type TupleToRecord<T extends readonly unknown[]> = { [K in keyof T & `${number}`]: T[K] };

// // Example usage for ExpectEqual using TupleToRecord
// type exampleData = TupleToRecord<[123, "test"]>;
// type result = Assert<ExpectEqual<exampleData, { 0: 123; 1: "test" }>>



// interface Database<XModel = PeopleModel> {
//   // Overloads for specific tuple lengths (1 to 10)
//   // select<T1>(fn: () => [T1]): TupleToRecord<[T1]>;

//   select<T1, T2>(fn: (e: XModel) => [T1, T2]): [T1, T2];

//   // Generic fallback for >10 elements or non-tuples.
//   // Requires 'as const' inside 'fn' for tuple type preservation.
//   select<U>(fn: () => U): ToRecord<U>;
// }

// export function test(db: Database) {
//   // Use the original function call - should match the 3-element overload
//   const response = db.select((e) => [e.age, e.name]);
//   // Type should be inferred as { 0: number; 1: string; 2: RegExp }

//   // Example for >10 elements requiring 'as const'
//   // const responseLong = db.select(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const);
//   // responseLong[10]; // number

//   // return response['0'].toFixed() // Should work
//   //   && response['1'].trim() // Should work
//   //   && response['2'].exec("abc"); // Should work
// }
