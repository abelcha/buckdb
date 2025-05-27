import { expect, test } from 'bun:test'
import { copy } from './copy'
import { from } from '../buckdb'

test('basic copy to file', async () => {
    expect(
        copy(from('duckdb_types()').select()).to('output.parquet', { format: 'parquet' }).toSql({ trim: true })
    ).toBe(`COPY (FROM duckdb_types() SELECT *) TO 'output.parquet' (FORMAT PARQUET)`)
})

test('copy to file with compression', async () => {
    expect(
        copy(from('duckdb_types()').select()).to('output_compressed.parquet', { format: 'parquet', compression: 'zstd' }).toSql({ trim: true })
    ).toBe(`COPY (FROM duckdb_types() SELECT *) TO 'output_compressed.parquet' (FORMAT PARQUET, COMPRESSION ZSTD)`)
})

test('copy to S3', async () => {
    expect(
        copy(from('duckdb_functions()').select('function_oid', 'function_name')).to('s3://bucket/data.csv', { format: 'csv', header: true }).toSql({ trim: true })
    ).toBe(`COPY (FROM duckdb_functions() SELECT function_oid, function_name) TO 's3://bucket/data.csv' (FORMAT CSV, HEADER TRUE)`)
})

test('direclty from', async () => {
    expect(
        from('duckdb_functions()').select('function_oid', 'function_name')
            .copyTo('s3://bucket/data.csv', { format: 'csv', header: true }).toSql({ trim: true })
    ).toBe(`COPY (FROM duckdb_functions() SELECT function_oid, function_name) TO 's3://bucket/data.csv' (FORMAT CSV, HEADER TRUE)`)
})


test('copy with different format (JSON)', async () => {
    expect(
        copy(from('duckdb_types()').select()).to('events.json', { format: 'json' }).toSql({ trim: true })
    ).toBe(`COPY (FROM duckdb_types() SELECT *) TO 'events.json' (FORMAT JSON)`)
})

test('copy with multiple options', async () => {
    expect(
        copy(from('duckdb_types()').select()).to('complex_output.csv', {
            format: 'csv',
            compression: 'gzip',
            delim: ';',
            header: true,
        }).toSql({ trim: true })
    ).toBe(`COPY (FROM duckdb_types() SELECT *) TO 'complex_output.csv' (FORMAT CSV, COMPRESSION GZIP, DELIM ';', HEADER TRUE)`)
})

test('copy with numeric and boolean options', async () => {
    expect(
        copy(from('duckdb_functions()').select(e => [e.database_name, e.description])).to('numeric_bool.csv', {
            compression: 'brotli',
            sqd: true,
        }).toSql({ trim: true })
    ).toBe(`COPY (FROM duckdb_functions() SELECT database_name, description) TO 'numeric_bool.csv' (COMPRESSION BROTLI, SQD TRUE)`)
})


test('real copy', async () => {
    const q = from('duckdb_types()')
        .select('logical_type', 'type_oid')
        .orderBy('type_oid')
        .limit(2)
    const resp = await q.copyTo('/tmp/test-copy.csv')
        .execute()
    expect(await Bun.file('/tmp/test-copy.csv').text()).toEqual(
        `logical_type,type_oid\nNULL,1\nBOOLEAN,10\n`)
    await copy(q).to('/tmp/test-copy.jsonl').execute()
    expect(await Bun.file('/tmp/test-copy.jsonl').text()).toEqual(`{"logical_type":"NULL","type_oid":1}\n{"logical_type":"BOOLEAN","type_oid":10}\n`)
})
