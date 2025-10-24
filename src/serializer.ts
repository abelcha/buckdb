
type Sep = ','
type Sep2 = '='

// Helper to convert literals to strings
type ToString<T> = T extends string ? `'${T}'`
    : T extends number ? `${T}`
    : T extends boolean ? `${T}`
    : never

// Helper to check if a type is an object
type IsObject<T> = T extends Record<string, any> ? T : never

// --- Recursive Serialization Helpers ---

// Helper type to map and join array elements recursively
type SerializeValueArrayHelper<A extends any[]> = // Removed Depth
    // Removed depth check
    A extends [infer Head, ...infer Tail] ? `${SerializeValue<Head>}${Tail extends [] ? '' : Sep}${SerializeValueArrayHelper<Tail>}` // Removed Decrement
        : ''

// Helper to serialize any value (primitive, object, or array)
export type SerializeValue<T> = // Removed Depth default
    // Removed depth check
    T extends string | number | boolean ? ToString<T> // Handle primitives
        : T extends readonly any[] // Handle readonly arrays first
            ? `[${SerializeValueArrayHelper<[...T]>}]` // Removed Depth
        : T extends any[] // Handle mutable arrays
            ? `[${SerializeValueArrayHelper<T>}]`
        : T extends Record<string, any> // Handle objects
            ? `{${SerializeNested<T>}}` // Use SerializeNested for object contents
        : 'unknown' // Fallback for other types (e.g., null, undefined handled by runtime)

// --- Original Types Modified ---

type SepNested = ':'

// Helper to create key-value pair strings for NESTED objects (uses ':')
type KeyValuePairsMapNested<T extends Record<string, any>> = {
    [K in keyof T as K extends string ? K : never]: K extends string ? `${K}${SepNested}${SerializeValue<T[K]>}` // Nested uses SepNested (:)
        : never
}

// Helper to create key-value pair strings for TOP LEVEL (uses '=')
type KeyValuePairsMap<T extends Record<string, any>> = {
    [K in keyof T as K extends string ? K : never]: K extends string ? `${K}${Sep2}${SerializeValue<T[K]>}` // Top level uses Sep2 (=)
        : never
}

// Extract the values as a union
type KeyValuePairs<T extends Record<string, any>> = KeyValuePairsMap<T>[keyof KeyValuePairsMap<T>] // Removed Depth

// Helpers for union-to-tuple and joining
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I,
) => void ? I
    : never

type UnionToTuple<T> = UnionToIntersection<
    T extends any ? () => T : never
> extends () => infer R ? [...UnionToTuple<Exclude<T, R>>, R]
    : []

type JoinUnion<T extends string, Delimiter extends string = ','> = UnionToTuple<T> extends infer Tuple ? Tuple extends [infer First, ...infer Rest] // Matches one or more
        ? Rest extends [] // Is Rest empty? (i.e., Tuple had only one element)
            ? First & string // If yes, just return First
        : Rest extends string[] // Is Rest non-empty?
            ? `${First & string}${Delimiter}${JoinUnion<Rest[number], Delimiter>}` // If yes, add delimiter and recurse
        : never // Should not happen
    : '' // Tuple was empty
    : never

// Type to extract and join key-value pairs for NESTED objects (uses KeyValuePairsMapNested with ':')
type SerializeNested<
    T extends Record<string, any>,
> = JoinUnion<KeyValuePairsMapNested<T>[keyof KeyValuePairsMapNested<T>]>

// Main type for TOP LEVEL serialization (uses KeyValuePairsMap with '=')
export type Serialize<
    T extends Record<string, any>,
> = JoinUnion<KeyValuePairs<T>>

export function __serialize<T>(value: T, depth = 0): string { // Removed depth parameter
    // Removed depth check

    if (value === null || value === undefined) {
        return 'null'
    }

    if (typeof value === 'string') {
        if (value.includes("'")) {
            return `e'${value.replaceAll("'", "\\'")}'`
        }
        return `'${value}'`
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value)
    }

    if (Array.isArray(value)) {
        if (value.length === 0) return '[]'
        return `[${value.map(item => __serialize(item, depth + 1)).join(',')}]` // Removed depth from recursive call
    }

    if (typeof value === 'object') {
        const pairs = Object.entries(value)
            .map(([key, val]) => `${key}${depth === 0 ? '=' : ':'}${__serialize(val, depth + 1)}`) // Removed depth from recursive call
            .join(',')

        return depth === 0 ? pairs : `{${pairs}}`
    }
    return 'unknown'
}
export function serialize<
    const T extends Record<string, any>,
>(obj: T) { // Removed Depth parameter
    return __serialize(obj) as unknown as JoinUnion<KeyValuePairs<T>> // Removed Depth logic from return type
}

// console.log(__serialize(['toto', 'tata', { lol: 123, xx: "12" }]))

// const obj = { d: 1, z: { a: 1, b: '2' }, x: ['toto'], u: true } as const
// const t4 = serialize(obj) satisfies
//   `d=1,z={a:1,b:'2'},x=['toto'],u=true`
// const type_check: `d=1,z={a:1,b:'2'},x=['toto'],u=true` = serialize(obj) // should be ok

// --- New Ordered Serialization based on Key Tuple ---

// Helper to stringify array elements recursively for the joiner (for Ordered)
type Ordered_StringifyArrayRest<A extends readonly any[]> = A extends readonly [] ? ''
    : A extends readonly [infer First, ...infer Rest] ? `${Sep}${Ordered_StringifyValue<First>}${Ordered_StringifyArrayRest<Rest>}`
    : string // Fallback for non-tuple arrays

// Helper to stringify array literals into a JSON-like string literal (for Ordered)
type Ordered_StringifyArray<A extends readonly any[]> = A extends readonly [] ? '[]'
    : A extends readonly [infer First, ...infer Rest] ? `[${Ordered_StringifyValue<First>}${Ordered_StringifyArrayRest<Rest>}]`
    : string // Fallback for non-tuple arrays

// Helper to stringify individual values into string literals (for Ordered)
// (Handles primitives, null, undefined, arrays, and NESTED objects using ':' separator)
type Ordered_StringifyValue<V> = V extends string ? `'${V}'` // Use single quotes for strings
    : V extends number | boolean ? `${V}` // Handle numbers and booleans directly
    : V extends null ? 'null' // Handle null
    : V extends undefined ? 'undefined' // Handle undefined
    : V extends readonly any[] ? Ordered_StringifyArray<V> // Handle arrays/tuples recursively
    : V extends object ? `{${SerializeNested<V>}}` // Reuse original SerializeNested (uses ':')
    : 'unknown' // Default fallback

// Helper to filter keys from K that exist in O
export type FilterKeys<K extends readonly string[], O = {}> = O extends Record<string, any> ? K extends readonly [infer F, ...infer R extends readonly string[]] // Ensure R is string[]
        ? F extends keyof O ? [F, ...FilterKeys<R, O>] // Keep F if it's in O
        : FilterKeys<R, O> // Discard F if it's not in O
    : [] // Base case: empty tuple
    : 321

// type res = FilterKeys<['a', 'b', 'c'], {}>; // Should be ['a', 'b']

// Core recursive serializer using filtered keys
type SerializeOrderedCore<O, FK extends readonly (keyof O)[]> = FK extends readonly [infer First extends keyof O, ...infer Rest extends (keyof O)[]]
    // Construct "key=value" pair for the first element using O
    ? `${First & string}${Sep2}${Ordered_StringifyValue<O[First]>}${
        // Check if there are more keys in Rest
        Rest extends readonly []
            // If Rest is empty, we're done
            ? ''
            // If Rest is not empty, add a comma and recurse
            : `${Sep}${SerializeOrderedCore<O, Rest>}`}`
    // Base case: If FK is empty, return an empty string
    : ''

/**
 * Serializes properties of O specified by the keys present in both tuple K and O,
 * into a string literal. The order of keys in the output string matches the order in K.
 *
 * @template K A tuple containing potential keys, defining the order.
 * @template O The object containing the actual values to serialize.
 */
export type SerializeOrdered<
    K extends readonly string[],
    O extends Record<string, any>,
> = SerializeOrderedCore<O, K> // Use FilterKeys and Core (Removed assertion)

// --- Example Usage for SerializeOrdered ---

// // Define an example object type

// // Define the keys and order
// type KeysExample = ['toto', 'tata', 'nothing'];

// // Apply the new Serialize type
// type ResultExample = SerializeOrdered<MyObjectExample, KeysExample>;

// //   ^? type ResultExample = "toto=123,tata=[\"zz\",true,null],nothing=undefined"

// // Another example
// type ResultExample2 = SerializeOrdered<MyObjectExample, KeysExample2>;
// //   ^? type ResultExample2 = "extra=\"extra\",config={...},toto=123"

// // Empty keys
// type ResultExampleEmpty = SerializeOrdered<MyObjectExample, []>;
// //   ^? type ResultExampleEmpty = ""

// // Single key
// type ResultExampleSingle = SerializeOrdered<MyObjectExample, ['tata']>;

// type Keys = ['a', 'b', 'c', 'd', 'e', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

type Model = {
    a: string
    b: number
    c: boolean
    d: string[]
    e: { nested: number[] }
}

// Use the updated 2-argument signature for SerializeOrdered
// type Result1 = SerializeOrdered<Keys, { c: false, a: 'toto', g: { lol: 123, toto: 'xx' } }>;
// type Result2 = SerializeOrdered<Keys, { sdq: 123, a:11, }>;
// Nested object 'g' should now use ':' internally. Test if Result1 extends the union of possible orders.
// type test_case = Assert<Result1 extends ("a='toto',c=false,g={lol:123,toto:'xx'}" | "a='toto',c=false,g={toto:'xx',lol:123}") ? true : false>;
