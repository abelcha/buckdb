const t=`import { describe, expect, it } from 'bun:test'
import { wrap, upperFirst, last, isPlainObject, Σ, keyBy, isBucket } from './utils'
import { formatSource } from './formalise'
export const normalizeSQL = (sql: string): string =>
    sql.replace(/\\n/g, ' ').replace(/\\s+/g, ' ').trim()

export const expectSQL = (actual: string | { toString: () => string }, expected: string) =>
    expect(normalizeSQL(actual.toString())).toEqual(normalizeSQL(expected))


describe('utils', () => {
    it('should wrap strings', () => {
        expect(wrap('test', '"')).toBe('"test"')
        expect(wrap('"test"', '"')).toBe('"test"')
        expect(wrap('test', '(', ')')).toBe('(test)')
    })

    it('should format sources', () => {
        // This test reveals a bug - S3 paths are being quoted when they shouldn't be
        expect(formatSource({ catalog: 's3://bucket/', uri: 'file.csv' })).toBe("'s3://bucket/file.csv'") // BUG: should be unquoted
        expect(formatSource({ catalog: '', uri: 'data.parquet' })).toBe("'data.parquet'")
        expect(formatSource({ catalog: '', uri: 'function()' })).toBe('function()')
    })

    it('should handle utilities', () => {
        expect(upperFirst('test')).toBe('Test')
        expect(last([1, 2, 3])).toBe(3)
        expect(isPlainObject({})).toBe(true)
        expect(isPlainObject([])).toBe(false)
        expect(isBucket('s3://bucket/')).toBeTruthy()
        expect(isBucket('local/path')).toBeFalsy()
    })
})
`;export{t as default};
