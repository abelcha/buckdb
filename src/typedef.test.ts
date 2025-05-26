import { describe, expect, it } from 'bun:test'
import { mapTypes, mapTypesProps, TypeProps, PatternMatchers } from './typedef'

describe('typedef', () => {
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