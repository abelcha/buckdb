import * as t from "../.buck/types";

type Assert<T extends true> = T;
type ExpectEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends (<G>() => G extends B ? 1 : 2) ? (<G>() => G extends B ? 1 : 2) extends (<G>() => G extends A ? 1 : 2) ? true
  : { error: "Types are not equal"; expected: B; got: A }
  : { error: "Types are not equal"; expected: B; got: A };

// type nativ = ToJSON<Source>
type res1 =
  & Assert<ExpectEqual<ToPlain<t.DVarcharField>, string>>
  & Assert<ExpectEqual<ToPlain<string>, string>>
  & Assert<ExpectEqual<ToPlain<t.DNumericField>, number>>
  & Assert<ExpectEqual<ToPlain<t.DBoolField>, boolean>>
  & Assert<ExpectEqual<ToPlain<t.DDateField>, Date>>
  & Assert<ExpectEqual<ToPlain<t.DAnyField>, any>>
  & Assert<ExpectEqual<ToPlain<t.DMapField>, Map<any, any>>>
  & Assert<ExpectEqual<ToPlain<t.DArrayField<t.DNumericField>>, number[]>>
  & Assert<ExpectEqual<ToPlain<t.DArrayField<t.DArrayField<t.DNumericField>>>, number[][]>>
  & Assert<ExpectEqual<ToPlain<t.DNumericField[]>, number[]>>
  & Assert<ExpectEqual<ToPlain<{ xx: t.DNumericField }[]>, { xx: number }[]>>
  & Assert<ExpectEqual<ToPlain<{ xx: { zz: t.DNumericField }[] }>, { xx: { zz: number }[] }>>
  & Assert<
    ExpectEqual<
      ToPlain<
        t.DStructField<{ xx: t.DArrayField<t.DStructField<{ zz: t.DNumericField }>> }>
      >,
      { xx: { zz: number }[] }
    >
  >
  & Assert<
    ExpectEqual<
      ToPlain<
        t.DStructField<{ xx: t.DStructField<{ zz: t.DVarcharField }>[] }>
      >,
      { xx: { zz: string }[] }
    >
  >
  & Assert<
    ExpectEqual<
      ToPlain<
        t.DStructField<{ xx: t.DStructField<string> }>
      >,
      { xx: string }
    >
  >
  & Assert<
    ExpectEqual<
      ToPlain<
        t.DStructField<{ xx: t.DStructField<{ zz: t.DStructField<{}> }> }>
      >,
      { xx: { zz: {} } }
    >
  >
  & Assert<
    ExpectEqual<
      ToPlain<
        t.DStructField<{ xx: t.DStructField<{ zz: t.DStructField<{}> }> }>
      >,
      { xx: { zz: {} } }
    >
  >
  & Assert<
    ExpectEqual<
      ToPlain<
        t.DStructField<{ xx: t.DStructField<{ zz: t.DStructField<{ u: t.DNumericField[] }> }> }>
      >,
      { xx: { zz: { u: number[] } } }
    >
  >
  & Assert<ExpectEqual<ToPlain<null>, null>>
  & Assert<ExpectEqual<ToPlain<undefined>, undefined>>
  & Assert<ExpectEqual<ToPlain<[t.DVarcharField, t.DNumericField]>, [string, number]>>;

export type ToPlain<T> =
  /* 1. arrays first so we “peel off” outer [] layers  */
  T extends null | undefined ? T
  : T extends readonly [any, ...any[]] ? { [K in keyof T]: ToPlain<T[K]> } // tuple handling
  : T extends t.DArrayField<infer U> ? ToPlain<U>[]
  : T extends Array<infer U> ? ToPlain<U>[]
  /* 2. structs: rebuild an object, recursing on every member */
  : T extends t.DStructField<infer S> ? { [K in keyof S]: ToPlain<S[K]> }
  // T extends t.DJsonField<infer S> ? ToPlain<S> : //{ [K in keyof S]: ToPlain<S[K]> } :
  /* 3. primitive wrappers */
  : T extends t.DVarcharField | t.DJsonField | string ? string
  : T extends t.DNumericField | number ? number
  : T extends t.DBoolField | boolean ? boolean
  : T extends t.DDateField | Date ? Date
  : T extends t.DMapField | Map<any, any> ? Map<any, any>
  : T extends t.DAnyField ? any
  : T extends object ? { [K in keyof T]: ToPlain<T[K]> }
  /* 4. everything else is a mistake */
  : never;

export type FromPlain<T> =
  // T extends null | undefined ? T :
  // T extends t.DArrayField<infer U> ? FromPlain<U>[] :
  // T extends Array<infer U> ? FromPlain<U>[] :
  // T extends t.DStructField<infer S> ? { [K in keyof S]: FromPlain<S[K]> } :
  // T extends t.DJsonField<infer S> ? { [K in keyof S]: FromPlain<S[K]> } :
  /* 3. primitive wrappers */
  // T extends readonly [any, ...any[]] ? { [K in keyof T]: FromPlain<T[K]> } : // tuple handling
  T extends t.DArrayField<infer U> ? t.DArrayField<FromPlain<U>>
  : T extends Array<infer U> ? t.DArrayField<FromPlain<U>>
  : T extends t.DStructField ? { [K in keyof T]: FromPlain<T[K]> }
  : T extends t.DVarcharField | string ? t.DVarcharField
  : T extends t.DMapField | Map<any, any> ? t.DMapField
  : T extends t.DNumericField | number ? t.DNumericField
  : T extends t.DBoolField | boolean ? t.DBoolField
  : T extends t.DDateField | Date ? t.DDateField
  : T extends t.DAnyField ? t.DAnyField
  : T extends object ? t.DStructField<{ [K in keyof T]: FromPlain<T[K]> }>
  /* 4. everything else is a mistake */
  : never;
type res2 =
  & Assert<ExpectEqual<FromPlain<string>, t.DVarcharField>>
  & Assert<ExpectEqual<FromPlain<number>, t.DNumericField>>
  & Assert<ExpectEqual<FromPlain<{ xx: number }>, t.DStructField<{ xx: t.DNumericField }>>>
  & Assert<ExpectEqual<FromPlain<{ xx: number }[]>, t.DArrayField<t.DStructField<{ xx: t.DNumericField }>>>>
  & Assert<ExpectEqual<FromPlain<[number, string]>, t.DArrayField<t.DVarcharField | t.DNumericField>>> // ??
  & Assert<
    ExpectEqual<
      FromPlain<{ xx: { zz: 12; xx: "123" }[] }>,
      t.DStructField<{ xx: t.DArrayField<t.DStructField<{ zz: t.DNumericField; xx: t.DVarcharField }>> }>
    >
  >;

type res = Assert<
  ExpectEqual<
    ToPlain<t.DArrayField<t.DStructField<{ id: t.DVarcharField; value: t.DNumericField }>>>,
    { id: string; value: number }[]
  >
>;

function xxx(zz: FromPlain<{ lol: t.DArrayField<t.DVarcharField> }>) {
  const uuu = zz
}


function xx(id: t.DVarcharField & Partial<string>) {
  // const zz = id.
  id.endsWith
  const uuu = id + "sdq"
  ""
  // id.
  return id === '123'
}
