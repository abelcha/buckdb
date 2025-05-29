import { describe, expect, it } from 'bun:test'
import { mapTypes, mapTypesProps, TypeProps, PatternMatchers } from './typedef'

describe('typedef', () => {
    it('mapTypesProps', () => {
        expect(mapTypesProps('[]', true)).toHaveProperty('rawType', 'any[]')
        expect(mapTypesProps('VARCHAR[]', true)).toHaveProperty('rawType', 'string[]')
        expect(mapTypesProps('VARCHAR[]', false)).toHaveProperty('rawType', 'any[]')
        expect(mapTypesProps('TIMESTAMP', true)).toHaveProperty('rawType', 'Date')
        expect(mapTypesProps('INTEGER', true)).toHaveProperty('rawType', 'number')
        expect(mapTypesProps('BOOLEAN', true)).toHaveProperty('rawType', 'boolean')
        expect(mapTypesProps('STRUCT', true)).toHaveProperty('rawType', 'Record<string,any>')
        expect(mapTypesProps('VARCHAR', true)).toHaveProperty('rawType', 'string')
    })
    it('should map SQL types correctly', () => {
        expect(mapTypes('VARCHAR')).toBe('DVarchar')
        expect(mapTypes('INTEGER')).toBe('DNumeric')
        expect(mapTypes('BOOLEAN')).toBe('DBool')
        
        // Test array types
        expect(mapTypes('VARCHAR[]')).toBe('DArray')
        expect(mapTypes('STRUCT')).toBe('DStruct')
        
        // Type system test - checking TypeProps has expected structure
        const hasExpectedProps = TypeProps.DVarchar.field === 'DVarcharField'
        expect(hasExpectedProps satisfies boolean).toBe(true)
    })

    it('should handle pattern matchers', () => {
        expect(PatternMatchers.Like.keyword).toBe('LIKE')
        expect(PatternMatchers.Between.keyword).toBe('BETWEEN')
        expect(PatternMatchers.IsNull.keyword).toBe('IS NULL')
    })
})