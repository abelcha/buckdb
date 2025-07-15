import * as t from ".buck/types";

type Assert<T extends true> = T;
type ExpectEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends (<G>() => G extends B ? 1 : 2) ? (<G>() => G extends B ? 1 : 2) extends (<G>() => G extends A ? 1 : 2) ? true
  : { error: "Types are not equal"; expected: B; got: A }
  : { error: "Types are not equal"; expected: B; got: A };

// Original NestedKeyOf - recurses into all objects (includes prototype methods)
export type NestedKeyOf<ObjectType extends Record<string, any>> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
  ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
  : `${Key}`
}[keyof ObjectType & (string | number)]

// Option 1: Exclude common built-in types (Array, Map, Set, Date, etc.)
export type NestedKeyOf1<ObjectType extends Record<string, any>> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Array<any> | Map<any, any> | Set<any> | Date | RegExp | Function
  ? `${Key}`
  : ObjectType[Key] extends object
  ? `${Key}` | `${Key}.${NestedKeyOf1<ObjectType[Key]>}`
  : `${Key}`
}[keyof ObjectType & (string | number)]

// Option 2: Only recurse into plain objects (Record<string, any>) that aren't built-ins
export type NestedKeyOf2<ObjectType extends Record<string, any>> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends Record<string, any>
  ? ObjectType[Key] extends Array<any> | Map<any, any> | Set<any> | Date | RegExp | Function
  ? `${Key}`
  : `${Key}` | `${Key}.${NestedKeyOf2<ObjectType[Key]>}`
  : `${Key}`
}[keyof ObjectType & (string | number)]



// Option 4: Check if it has a prototype that's not Object.prototype (more strict)
type IsPlainObject<T> = T extends object
  ? T extends Array<any> | Map<any, any> | Set<any> | Date | RegExp | Function | Promise<any>
  ? false
  : true
  : false

export type NestedKeyOf4<ObjectType extends Record<string, any>> = {
  [Key in keyof ObjectType & (string | number)]: IsPlainObject<ObjectType[Key]> extends true
  ? `${Key}` | `${Key}.${NestedKeyOf4<ObjectType[Key]>}`
  : `${Key}`
}[keyof ObjectType & (string | number)]

// Option 5: More comprehensive built-in type exclusion
export type NestedKeyOf5<ObjectType extends Record<string, any>> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends
  | Array<any>
  | Map<any, any>
  | Set<any>
  | WeakMap<any, any>
  | WeakSet<any>
  | Date
  | RegExp
  | Function
  | Promise<any>
  | Error
  | Number
  | String
  | Boolean
  ? `${Key}`
  : ObjectType[Key] extends object
  ? `${Key}` | `${Key}.${NestedKeyOf5<ObjectType[Key]>}`
  : `${Key}`
}[keyof ObjectType & (string | number)]

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
  // /* 2. structs: rebuild an object, recursing on every member */
  : T extends t.DStructField<infer S> ? { [K in keyof S]: ToPlain<S[K]> }
  // /* 3. primitive wrappers */
  : T extends t.DVarcharField | t.DJsonField | string ? string
  : T extends t.DNumericField | number ? number
  : T extends t.DBoolField | boolean ? boolean
  : T extends t.DDateField | Date ? Date
  : T extends t.DMapField ? Map<any, any>
  : T extends Map<any, any> ? T
  : T extends t.DAnyField ? any
  // : T extends { [Symbol('__V')]: never } ? never :
  : T extends object ? { [K in keyof T]: ToPlain<T[K]> }
  /* 4. everything else is a mistake */
  : never;

export type UnPlain<T> =
  T extends t.DArrayField<infer U> ? t.DArrayField<UnPlain<U>>
  : T extends Array<infer U> ? t.DArrayField<UnPlain<U>>
  : T extends string ? t.DVarcharField
  : T extends number ? t.DNumericField
  : T extends boolean ? t.DBoolField
  // : T extends object ? t.DStructField<{ [K in keyof T]: UnPlain<T[K]> }>
  : T
export type FromPlainDict<T extends object> = { [K in keyof T]: UnPlain<T[K]> }

export type FromPlain<T> =
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
  > & Assert<
    ExpectEqual<
      ToPlain<t.DArrayField<t.DStructField<{ id: t.DVarcharField; value: t.DNumericField }>>>,
      { id: string; value: number }[]
    >
  >;


export type ToComp<T> =
  T extends t.DArrayField<infer U> ? t.DArrayField<ToComp<U>>
  : T extends Array<infer U> ? t.DArrayField<ToComp<U>>
  : T extends t.DVarcharField ? t.DVarcharComp
  : T extends t.DNumericField ? t.DNumericComp
  : T extends object ? t.DStructField<{ [K in keyof T]: ToComp<T[K]> }>
  : T
export type ToCompDict<T extends object> = { [K in keyof T]: ToComp<T[K]> }