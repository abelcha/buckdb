import { test, expect, mock } from 'bun:test';
// Import from the correct location
import { copy } from './copy';
import type { MS } from './build.types'

// Helper function to create a mock MaterializedResult and return the mock function
// Use 'any' for the mock function type as Bun's specific mock type isn't readily available/needed here
const createMockResult = (sourceSql: string, expectedCopySql: string): [MS<any, any>, any] => {
    const mockExecute = mock((sql: string) => {
        // Normalize whitespace for comparison
        const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
        expect(normalize(sql)).toBe(normalize(expectedCopySql));
        return Promise.resolve(); // Mock execute returning a promise
    });

    const mockResult = {
        // Mock methods needed by copy.ts
        toSql: () => sourceSql, // Mock the toSql method
        toState: () => ({       // Mock the toState structure needed to find ddb
            ddb: {
                // Use 'query' as seen in buckdb.ts adapter, assuming copy.ts uses it via ddb object
                query: mockExecute,
            },
        }),
        // Mock other methods if they were needed by the copy function itself
        execute: () => Promise.resolve([]), // Example: Mock execute returning empty result array
    } as unknown as MS<any, any>; // Cast to MS type

    return [mockResult, mockExecute]; // Return both the mock result and the mock function
};

test('basic copy to file', async () => {
    const sourceSql = 'SELECT * FROM mock_table';
    // Updated expected SQL: FORMAT PARQUET (uppercase, no quotes)
    const expectedCopySql = `COPY (${sourceSql}) TO 'output.parquet' (FORMAT PARQUET)`;
    // Destructure the mock result and the mock function
    const [mockResult, mockExecuteFn] = createMockResult(sourceSql, expectedCopySql);

    // Simulate the chain: copy(mockResult).to(...)
    await copy(mockResult).to('output.parquet', { format: 'parquet' });

    // Assertion is inside createMockResult's mockExecute
    // Check if the mocked execute function was called
    expect(mockExecuteFn).toHaveBeenCalledTimes(1);
});

test('copy to file with compression', async () => {
    const sourceSql = 'SELECT * FROM mock_table_compress';
    // Updated expected SQL: FORMAT PARQUET, COMPRESSION ZSTD (uppercase, no quotes)
    const expectedCopySql = `COPY (${sourceSql}) TO 'output_compressed.parquet' (FORMAT PARQUET, COMPRESSION ZSTD)`;
    const [mockResult, mockExecuteFn] = createMockResult(sourceSql, expectedCopySql);

    await copy(mockResult).to('output_compressed.parquet', { format: 'parquet', compression: 'zstd' });
    expect(mockExecuteFn).toHaveBeenCalledTimes(1);
});

test('copy to S3', async () => {
    const sourceSql = 'SELECT id, name FROM s3_source';
    // Updated expected SQL: FORMAT CSV (uppercase, no quotes), HEADER TRUE (uppercase boolean)
    const expectedCopySql = `COPY (${sourceSql}) TO 's3://bucket/data.csv' (FORMAT CSV, HEADER TRUE)`;
    const [mockResult, mockExecuteFn] = createMockResult(sourceSql, expectedCopySql);

    await copy(mockResult).to('s3://bucket/data.csv', { format: 'csv', header: true });
    expect(mockExecuteFn).toHaveBeenCalledTimes(1);
});

test('copy with different format (JSON)', async () => {
    const sourceSql = 'SELECT event_data FROM events';
    // Updated expected SQL: FORMAT JSON (uppercase, no quotes)
    const expectedCopySql = `COPY (${sourceSql}) TO 'events.json' (FORMAT JSON)`;
    const [mockResult, mockExecuteFn] = createMockResult(sourceSql, expectedCopySql);

    await copy(mockResult).to('events.json', { format: 'json' });
    expect(mockExecuteFn).toHaveBeenCalledTimes(1);
});

test('copy with multiple options', async () => {
    const sourceSql = 'SELECT * FROM complex_data';
    // Updated expected SQL: FORMAT CSV, COMPRESSION GZIP (uppercase, no quotes), HEADER TRUE (uppercase boolean)
    // Note: Order might differ slightly due to Object.entries iteration, but content should match.
    // Adjusted expected order based on the updated copy.ts logic (format, compression first)
    const expectedCopySql = `COPY (${sourceSql}) TO 'complex_output.csv' (FORMAT CSV, COMPRESSION GZIP, DELIMITER ';', HEADER TRUE)`;
    const [mockResult, mockExecuteFn] = createMockResult(sourceSql, expectedCopySql);

    await copy(mockResult).to('complex_output.csv', {
        format: 'csv', // These are passed to the function
        compression: 'gzip',
        delimiter: ';', // These are handled by the loop
        header: true
    });
    expect(mockExecuteFn).toHaveBeenCalledTimes(1);
});

test('copy with numeric and boolean options', async () => {
    const sourceSql = 'SELECT col1, col2 FROM numeric_bool_table';
    // Updated expected SQL: ALLOW_OVERWRITE TRUE (uppercase boolean)
    const expectedCopySql = `COPY (${sourceSql}) TO 'numeric_bool.parquet' (ROW_GROUP_SIZE 100000, ALLOW_OVERWRITE TRUE)`;
    const [mockResult, mockExecuteFn] = createMockResult(sourceSql, expectedCopySql);

    await copy(mockResult).to('numeric_bool.parquet', {
        row_group_size: 100000,
        allow_overwrite: true
    });
    expect(mockExecuteFn).toHaveBeenCalledTimes(1);
});

// Example of testing a potential error case (if applicable, e.g., invalid options)
// This depends heavily on how error handling is implemented in copy.ts
// test('copy with invalid option (example)', async () => {
//     const sourceSql = 'SELECT * FROM error_case';
//     // No expected SQL as it should throw
//     const mockResult = createMockResult(''); // SQL doesn't matter here
//     mockResult.toState = () => ({ ...mockResult.toState(), sql: sourceSql } as any);

//     // Assuming 'to' throws an error for invalid options
//     await expect(
//         copy(mockResult).to('error.parquet', { invalid_option: true } as any)
//     ).toThrow(); // Or specific error message/type
// });
