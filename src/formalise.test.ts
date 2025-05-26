import { describe, expect, it } from 'bun:test'
import { formatOptions } from './formalise'

describe('formatOptions', () => {
    it('should handle auto field_ids', () => {
        const result = formatOptions({ field_ids: 'auto' })
        expect(result).toBe("FIELD_IDS 'auto'")
    })

    it('should handle single column field_ids', () => {
        const result = formatOptions({ field_ids: { i: 42 } })
        expect(result).toBe('FIELD_IDS {i: 42}')
    })

    it('should handle multiple columns field_ids', () => {
        const result = formatOptions({ field_ids: { i: 42, j: 43 } })
        expect(result).toBe('FIELD_IDS {i: 42, j: 43}')
    })

    it('should handle nested struct field_ids', () => {
        const result = formatOptions({
            field_ids: {
                my_struct: {
                    __duckdb_field_id: 42,
                    i: 43,
                },
            },
        })
        expect(result).toBe('FIELD_IDS {my_struct: {__duckdb_field_id: 42, i: 43}}')
    })

    it('should handle list field_ids', () => {
        const result = formatOptions({
            field_ids: {
                my_list: {
                    __duckdb_field_id: 42,
                    element: 43,
                },
            },
        })
        expect(result).toBe('FIELD_IDS {my_list: {__duckdb_field_id: 42, element: 43}}')
    })

    it('should handle map field_ids', () => {
        const result = formatOptions({
            field_ids: {
                my_map: {
                    __duckdb_field_id: 42,
                    key: 43,
                    value: 44,
                },
            },
        })
        expect(result).toBe('FIELD_IDS {my_map: {__duckdb_field_id: 42, key: 43, value: 44}}')
    })

    it('should handle multiple options', () => {
        const result = formatOptions({
            field_ids: { i: 42 },
            compression: 'snappy',
            row_group_size: 100000,
        })
        expect(result).toBe("FIELD_IDS {i: 42},\nCOMPRESSION 'snappy',\nROW_GROUP_SIZE 100000")
    })
})
