const e=`import { describe, expect, it } from 'bun:test'
import { __serialize, serialize } from './serializer'
import { read_csv } from '../io'

describe('__serialize', () => {
    it('should serialize null and undefined', () => {
        expect(__serialize(null)).toBe('null')
        expect(__serialize(undefined)).toBe('null')
    })

    it('should serialize strings with quotes', () => {
        expect(__serialize('hello')).toBe("'hello'")
        expect(__serialize('')).toBe("''")
        expect(__serialize('with spaces')).toBe("'with spaces'")
    })

    it('should serialize numbers', () => {
        expect(__serialize(42)).toBe('42')
        expect(__serialize(0)).toBe('0')
        expect(__serialize(-123)).toBe('-123')
        expect(__serialize(3.14)).toBe('3.14')
    })

    it('should serialize booleans', () => {
        expect(__serialize(true)).toBe('true')
        expect(__serialize(false)).toBe('false')
    })

    it('should serialize empty arrays', () => {
        expect(__serialize([])).toBe('[]')
    })

    it('should serialize arrays with primitives', () => {
        expect(__serialize([1, 2, 3])).toBe('[1,2,3]')
        expect(__serialize(['a', 'b'])).toBe("['a','b']")
        expect(__serialize([true, false])).toBe('[true,false]')
        expect(__serialize([1, 'test', true])).toBe("[1,'test',true]")
    })

    it('should serialize nested arrays', () => {
        expect(__serialize([[1, 2], [3, 4]])).toBe('[[1,2],[3,4]]')
        expect(__serialize([['a'], ['b', 'c']])).toBe("[['a'],['b','c']]")
    })

    it('should serialize objects at depth 0 with = separator', () => {
        expect(__serialize({ key: 'value' })).toBe("key='value'")
        expect(__serialize({ a: 1, b: 2 })).toBe('a=1,b=2')
        expect(__serialize({ str: 'test', num: 42, bool: true })).toBe("str='test',num=42,bool=true")
    })

    it('should serialize nested objects with : separator', () => {
        const nested = { outer: { inner: 'value' } }
        expect(__serialize(nested)).toBe("outer={inner:'value'}")
    })

    it('should serialize complex nested structures', () => {
        const complex = {
            array: [1, 2, 3],
            nested: { key: 'value', num: 42 },
            simple: 'test'
        }
        expect(__serialize(complex)).toBe("array=[1,2,3],nested={key:'value',num:42},simple='test'")
    })

    it('should serialize arrays with objects', () => {
        const arrayWithObjects = [{ a: 1 }, { b: 2 }]
        expect(__serialize(arrayWithObjects)).toBe("[{a:1},{b:2}]")
    })

    it('should handle deep nesting', () => {
        const deep = {
            level1: {
                level2: {
                    level3: 'deep'
                }
            }
        }
        expect(__serialize(deep)).toBe("level1={level2:{level3:'deep'}}")
    })

    it('should serialize objects with arrays containing objects', () => {
        const complex = {
            items: [
                { id: 1, name: 'first' },
                { id: 2, name: 'second' }
            ]
        }
        expect(__serialize(complex)).toBe("items=[{id:1,name:'first'},{id:2,name:'second'}]")
    })

    it('should handle mixed types in arrays', () => {
        const mixed = {
            data: [1, 'text', { nested: true }, [1, 2]]
        }
        expect(__serialize(mixed)).toBe("data=[1,'text',{nested:true},[1,2]]")
    })

    it('should handle empty objects', () => {
        expect(__serialize({})).toBe('')
        expect(__serialize({ outer: {} })).toBe('outer={}')
    })
})

describe('serialize', () => {
    it('should return typed serialization for simple objects', () => {
        // Test serialize with exact literal types (alphabetical order)
        const simple = serialize({ count: 5, name: 'test' } as const) satisfies "count=5,name='test'"
        expect(simple).toBe("count=5,name='test'")
        
        const nested = serialize({ config: { enabled: true } } as const) satisfies "config={enabled:true}"
        expect(nested).toBe("config={enabled:true}")
    })

    it('should test literal string types with readers', () => {
        // Test readers with literal string types
        const csvSimple = read_csv('test.csv') satisfies "read_csv(['test.csv'])"
        expect(csvSimple).toBe("read_csv(['test.csv'])")
        
        // Complex example with alphabetical key ordering
        const csvComplex = read_csv('s3://tddo.csv', {
            all_varchar: true,
            allow_quoted_nulls: true,
            auto_detect: true,
            auto_type_candidates: ['VARCHAR', 'BIGINT', 'DOUBLE'],
            buffer_size: 1024,
            compression: 'brotli',
            comment: '#',
            dateformat: 'iso',
            decimal_separator: '.',
        }) satisfies \`read_csv(['s3://tddo.csv'],all_varchar=true,allow_quoted_nulls=true,auto_detect=true,auto_type_candidates=['VARCHAR','BIGINT','DOUBLE'],buffer_size=1024,comment='#',compression='brotli',dateformat='iso',decimal_separator='.')\`
        
        expect(csvComplex).toContain("all_varchar=true")
        expect(csvComplex).toContain("compression='brotli'")
        expect(csvComplex).toContain("auto_type_candidates=['VARCHAR','BIGINT','DOUBLE']")
    })
})`;export{e as default};
