import { describe, expect, it } from 'bun:test'
import {
    Fncx,
    read_csv,
    read_json,
    read_json_objects,
    read_parquet,
    delta_scan,
    parquet_scan,
    read_xlsx,
    read_text
} from './readers'

describe('Fncx reader functions', () => {
    it('should serialize read_csv with single file', () => {
        const result = Fncx.read_csv('test.csv') satisfies "read_csv(['test.csv'])"
        expect(result).toBe("read_csv(['test.csv'])")
    })

    it('should serialize read_csv with options', () => {
        // Test with alphabetical key ordering
        const result = Fncx.read_csv('test.csv', { delim: ';', header: true }) satisfies "read_csv(['test.csv'],delim=';',header=true)"
        expect(result).toBe("read_csv(['test.csv'],delim=';',header=true)")
    })

    it('should serialize read_json with single file', () => {
        const result = Fncx.read_json('data.json') as string
        expect(result).toBe("read_json(['data.json'])")
    })

    it('should serialize read_json with options', () => {
        const result = Fncx.read_json('data.json', { auto_detect: false }) as string
        expect(result).toContain("read_json(['data.json']")
        expect(result).toContain("auto_detect=false")
    })

    it('should serialize read_json_objects with options', () => {
        const result = Fncx.read_json_objects('objects.json', {
            format: 'array',
            filename: true
        }) as string
        expect(result).toContain("read_json_objects(['objects.json']")
        expect(result).toContain("format='array'")
        expect(result).toContain("filename=true")
    })

    it('should serialize read_parquet with basic options', () => {
        const result = Fncx.read_parquet('data.parquet', {
            binary_as_string: true
        }) as string
        expect(result).toContain("read_parquet(['data.parquet']")
        expect(result).toContain("binary_as_string=true")
    })

    it('should serialize delta_scan with options', () => {
        const result = Fncx.delta_scan('delta_table', {
            binary_as_string: true,
            file_row_number: true
        }) as string
        expect(result).toContain("delta_scan(['delta_table']")
        expect(result).toContain("binary_as_string=true")
        expect(result).toContain("file_row_number=true")
    })

    it('should serialize parquet_scan', () => {
        const result = Fncx.parquet_scan('*.parquet', { union_by_name: true }) as string
        expect(result).toContain("parquet_scan(['*.parquet']")
        expect(result).toContain("union_by_name=true")
    })

    it('should serialize read_text', () => {
        const result = Fncx.read_text('document.txt') as string
        expect(result).toBe("read_xlsx(['document.txt'])")
    })

    it('should handle empty options object', () => {
        const result = Fncx.read_csv('test.csv', {}) as string
        expect(result).toBe("read_csv(['test.csv'])")
    })

    it('should handle array options', () => {
        const result = Fncx.read_csv('test.csv', {
            auto_type_candidates: ['VARCHAR', 'INTEGER', 'DOUBLE'],
            column_names: ['col1', 'col2', 'col3']
        }) as string
        expect(result).toContain("read_csv(['test.csv']")
        expect(result).toContain("auto_type_candidates=['VARCHAR','INTEGER','DOUBLE']")
        expect(result).toContain("column_names=['col1','col2','col3']")
    })

    it('should handle boolean options', () => {
        const result = Fncx.read_csv('test.csv', {
            header: true,
            ignore_errors: false,
            auto_detect: true
        }) as string
        expect(result).toContain("read_csv(['test.csv']")
        expect(result).toContain("header=true")
        expect(result).toContain("ignore_errors=false")
        expect(result).toContain("auto_detect=true")
    })

    it('should handle numeric options', () => {
        const result = Fncx.read_csv('test.csv', {
            sample_size: 1000,
            max_line_size: 2048,
            skip: 5
        }) as string
        expect(result).toContain("read_csv(['test.csv']")
        expect(result).toContain("sample_size=1000")
        expect(result).toContain("max_line_size=2048")
        expect(result).toContain("skip=5")
    })
})

describe('Exported reader functions', () => {
    it('should export read_csv function', () => {
        expect(read_csv).toBe(Fncx.read_csv)
    })

    it('should export read_json function', () => {
        expect(read_json).toBe(Fncx.read_json)
    })

    it('should export read_json_objects function', () => {
        expect(read_json_objects).toBe(Fncx.read_json_objects)
    })

    it('should export read_parquet function', () => {
        expect(read_parquet).toBe(Fncx.read_parquet)
    })

    it('should export delta_scan function', () => {
        expect(delta_scan).toBe(Fncx.delta_scan)
    })

    it('should export parquet_scan function', () => {
        expect(parquet_scan).toBe(Fncx.parquet_scan)
    })

    it('should export read_xlsx function', () => {
        expect(read_xlsx).toBe(Fncx.read_xlsx)
    })

    it('should export read_text function', () => {
        expect(read_text).toBe(Fncx.read_text)
    })
})

describe('Complex option combinations', () => {
    it('should handle CSV with major options', () => {
        const result = read_csv('complex.csv', {
            header: true,
            delim: '|',
            auto_detect: false,
            compression: 'gzip'
        }) as string
        expect(result).toContain("read_csv(['complex.csv']")
        expect(result).toContain("header=true")
        expect(result).toContain("delim='|'")
        expect(result).toContain("auto_detect=false")
        expect(result).toContain("compression='gzip'")
    })

    it('should handle JSON with complex options', () => {
        const result = read_json('complex.json', {
            auto_detect: false,
            maximum_depth: 10,
            sample_size: 2048
        }) as string
        expect(result).toContain("read_json(['complex.json']")
        expect(result).toContain("auto_detect=false")
        expect(result).toContain("maximum_depth=10")
        expect(result).toContain("sample_size=2048")
    })

    it('should handle Parquet with partitioning', () => {
        const result = read_parquet('data.parquet', {
            binary_as_string: false,
            hive_partitioning: true,
            union_by_name: true,
            filename: true
        }) as string
        expect(result).toContain("read_parquet(['data.parquet']")
        expect(result).toContain("binary_as_string=false")
        expect(result).toContain("hive_partitioning=true")
        expect(result).toContain("union_by_name=true")
        expect(result).toContain("filename=true")
    })
})