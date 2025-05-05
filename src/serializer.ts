type Sep = ','
type Sep2 = '='

// Helper to convert literals to strings
type ToString<T> = T extends string
  ? `'${T}'`
  : T extends number
  ? `${T}`
  : T extends boolean
  ? `${T}`
  : never;

// Helper to check if a type is an object
type IsObject<T> = T extends Record<string, any> ? T : never;

// --- Recursive Serialization Helpers ---

// Helper type to map and join array elements recursively
type SerializeValueArrayHelper<A extends any[]> = // Removed Depth
  // Removed depth check
  A extends [infer Head, ...infer Tail]
  ? `${SerializeValue<Head>}${Tail extends [] ? '' : Sep}${SerializeValueArrayHelper<Tail>}` // Removed Decrement
  : '';

// Helper to serialize any value (primitive, object, or array)
export type SerializeValue<T> = // Removed Depth default
  // Removed depth check
  T extends string | number | boolean
  ? ToString<T> // Handle primitives
  : T extends readonly any[] // Handle readonly arrays first
  ? `[${SerializeValueArrayHelper<[...T]>}]` // Removed Depth
  : T extends any[] // Handle mutable arrays
  ? `[${SerializeValueArrayHelper<T>}]` // Removed Depth
  : T extends Record<string, any> // Handle objects
  ? `{${Serialize<T>}}` // Removed Decrement
  : 'unknown'; // Fallback for other types (e.g., null, undefined handled by runtime)


// --- Original Types Modified ---

// Helper to create key-value pair strings
type KeyValuePairsMap<T extends Record<string, any>> = { // Removed Depth
  [K in keyof T as K extends string ? K : never]: K extends string
  ? `${K}${Sep2}${SerializeValue<T[K]>}` // Removed Depth from SerializeValue call
  : never
};

// Extract the values as a union
type KeyValuePairs<T extends Record<string, any>> = KeyValuePairsMap<T>[keyof KeyValuePairsMap<T>]; // Removed Depth

// Helpers for union-to-tuple and joining
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? [...UnionToTuple<Exclude<T, R>>, R]
  : [];

type JoinUnion<T extends string, Delimiter extends string = ","> = UnionToTuple<T> extends infer Tuple
  ? Tuple extends [infer First, ...infer Rest] // Matches one or more
  ? Rest extends [] // Is Rest empty? (i.e., Tuple had only one element)
  ? First & string // If yes, just return First
  : Rest extends string[] // Is Rest non-empty?
  ? `${First & string}${Delimiter}${JoinUnion<Rest[number], Delimiter>}` // If yes, add delimiter and recurse
  : never // Should not happen
  : "" // Tuple was empty
  : never;

// Main type
export type Serialize<
  T extends Record<string, any>
> = JoinUnion<KeyValuePairs<T>>; // Removed Depth logic



export function __serialize<T>(value: T, depth = 0): string { // Removed depth parameter
  // Removed depth check

  if (value === null || value === undefined) {
    return 'null';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[${value.map(item => __serialize(item, depth + 1)).join(',')}]`; // Removed depth from recursive call
  }

  if (typeof value === 'object') {
    const pairs = Object.entries(value)
      .map(([key, val]) => `${key}${depth === 0 ? '=' : ':'}${__serialize(val, depth + 1)}`) // Removed depth from recursive call
      .join(',');

    return depth === 0 ? pairs : `{${pairs}}`;
  }
  return 'unknown';
}
export function serialize<
  const T extends Record<string, any>
>(obj: T) { // Removed Depth parameter
  return __serialize(obj) as unknown as JoinUnion<KeyValuePairs<T>>; // Removed Depth logic from return type
};


// console.log(__serialize(['toto', 'tata', { lol: 123, xx: "12" }]))


const obj = { d: 1, z: { a: 1, b: '2' }, x: ['toto'], u: true } as const
const t4 = serialize(obj) satisfies
  `d=1,z={a:1,b:'2'},x=['toto'],u=true`
const type_check: `d=1,z={a:1,b:'2'},x=['toto'],u=true` = serialize(obj) // should be ok


