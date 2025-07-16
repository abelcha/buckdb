import * as t from '.buck/types'
export type ObjectToValuesTuple<T> = T extends Record<string, any> ? Array<T[keyof T]> : never

export type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
export type Flatten<T> = { [KeyType in keyof T]: T[KeyType] } & {}
export type ToRecord<T> = T extends readonly any[] ? { [K in keyof T as K extends `${number}` ? K : never]: T[K] }
  : T
export type ExpectEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends (<G>() => G extends B ? 1 : 2) ? (<G>() => G extends B ? 1 : 2) extends (<G>() => G extends A ? 1 : 2) ? true
  : { error: 'Types are not equal'; expected: B; got: A }
  : { error: 'Types are not equal'; expected: B; got: A }

// Helper to force TypeScript to evaluate and reveal the error
export type Assert<T extends true> = T

export type IsPlainObject<T> = T extends object
  ? T extends Array<any> | Map<any, any> | Set<any> | Date | RegExp | Function | Promise<any>
  ? false
  : true
  : false

export type NestedKeyOf<ObjectType extends Record<string, any>> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends { [t.sInferred]: infer V } ? `${Key}` : IsPlainObject<ObjectType[Key]> extends true ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}` : `${Key}`
}[keyof ObjectType & (string | number)]


export type Merge<T, U> = { [K in keyof T | keyof U]: K extends keyof U ? U[K] : K extends keyof T ? T[K] : never }
export type TripleMerge<T, U, V> = { [K in keyof T | keyof U | keyof V]: K extends keyof V ? V[K] : K extends keyof U ? U[K] : K extends keyof T ? T[K] : never }

export type TripleUnion<T, U, V> = V & U & T

export type Strish = string | {}
export type Primitive = null | undefined | string | number | boolean | symbol | bigint
export type IsPrimitive<T> = [T] extends [Primitive] ? true : false

export type KeyIntersection<A, B> = {
  [K in keyof A & keyof B]: K
}[keyof A & keyof B]



export type PArray<X> = Promise<X[]>
export type PRecord<X> = Promise<Record<string, X>>

export type FirstElement<T> = T extends [infer F, ...any[]] ? F : never
