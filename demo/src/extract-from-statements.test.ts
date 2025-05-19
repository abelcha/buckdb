import { test, expect, describe } from 'bun:test';
import { extractFromStatementsAST, extractBuckStatement } from './extract-from-statements'; // Import the new function

describe('extractFromStatementsAST', () => {
    test('should handle simple property access .from()', () => {
        const testCode = `
            const buckCon = Buck(':memory:')
            buckCon.from('data/final.csv')
        `;
        const expected = [{
            chain: "Buck(':memory:')",
            param: "data/final.csv",
            fromChain: "from('data/final.csv')",
            cleanFromChain: "from('data/final.csv')",
            resource: ":memory:", // Added expected resource
            lineStart: 3,
            lineEnd: 3
        }];
        expect(extractFromStatementsAST(testCode)).toEqual(expected);
    })

    test('should handle preceding chained calls before .from()', () => {
        const testCode = `
            const buckCon = Buck(':memory:')
            buckCon.settings({ endpoint: 'xxx' }).from('data/settings.csv')
        `;
        const expected = [{
            chain: "Buck(':memory:').settings({ endpoint: 'xxx' })",
            param: "data/settings.csv",
            fromChain: "from('data/settings.csv')",
            cleanFromChain: "from('data/settings.csv')",
            resource: ":memory:", // Added expected resource
            lineStart: 3,
            lineEnd: 3
        }];
        expect(extractFromStatementsAST(testCode)).toEqual(expected);
    });

    test('should handle direct from() call with subsequent chain and remove .execute()', () => {
        const testCode = `
            await from('http://example.com/test.csv')
                // test comment"
                .select('comment', 'database_name')
                .execute()
        `;
        const expected = [{
            chain: null,
            param: "http://example.com/test.csv",
            fromChain: "from('http://example.com/test.csv')\n                // test comment\"\n                .select('comment', 'database_name')\n                .execute()",
            cleanFromChain: "from('http://example.com/test.csv').select('comment', 'database_name')",
            resource: null, // No Buck() call involved
            lineStart: 2,
            lineEnd: 5
        }];
        const actual = extractFromStatementsAST(testCode);
        expect(actual).toEqual(expected);
    });

    test('should handle variable assignment and inline Buck()', () => {
        const testCode = `
            const buckCon = Buck(':memory:');
            let anotherVar = buckCon;
            anotherVar.from('data/another.csv');
        `;
        const expected = [{
            chain: "Buck(':memory:')", // Inlined
            param: "data/another.csv",
            fromChain: "from('data/another.csv')",
            cleanFromChain: "from('data/another.csv')",
            resource: ":memory:", // Added expected resource (inlined)
            lineStart: 4,
            lineEnd: 4
        }];
        expect(extractFromStatementsAST(testCode)).toEqual(expected);
    });

    test('should handle variable assignment without Buck() initializer', () => {
        const testCode = `
            const someOtherVar = getDb();
            someOtherVar.from('other_data.csv');
        `;
        const expected = [{
            chain: "someOtherVar", // Not inlined
            param: "other_data.csv",
            fromChain: "from('other_data.csv')",
            cleanFromChain: "from('other_data.csv')",
            resource: null, // No Buck() initializer found
            lineStart: 3,
            lineEnd: 3
        }];
        expect(extractFromStatementsAST(testCode)).toEqual(expected);
    });

    test('should handle calls within functions', () => {
        const testCode = `
            function test() {
              const localDb = Buck('local');
              localDb.from('local_data');
              from('global_func').filter(x);
            }
        `;
        const expected = [
            {
                chain: "Buck('local')",
                param: "local_data",
                fromChain: "from('local_data')",
                cleanFromChain: "from('local_data')",
                resource: "local", // Added expected resource
                lineStart: 4,
                lineEnd: 4
            },
            {
                chain: null,
                param: "global_func",
                fromChain: "from('global_func').filter(x)",
                cleanFromChain: "from('global_func').filter(x)",
                resource: null, // No Buck() call involved
                lineStart: 5,
                lineEnd: 5
            }
        ];
        expect(extractFromStatementsAST(testCode)).toEqual(expected);
    });

    test('should handle assignment with from() call', () => {
        const testCode = `
            const assignedResult = from('source').select('id');
        `;
        const expected = [{
            chain: null,
            param: "source",
            fromChain: "from('source').select('id')",
            cleanFromChain: "from('source').select('id')",
            resource: null, // No Buck() call involved
            lineStart: 2,
            lineEnd: 2
        }];
        expect(extractFromStatementsAST(testCode)).toEqual(expected);
    });

    test('should handle direct from() call without assignment', () => {
        const testCode = `
            from('direct_table');
        `;
        const expected = [{
            chain: null,
            param: "direct_table",
            fromChain: "from('direct_table')",
            cleanFromChain: "from('direct_table')",
            resource: null, // No Buck() call involved
            lineStart: 2,
            lineEnd: 2
        }];
        expect(extractFromStatementsAST(testCode)).toEqual(expected);
    });

    test('should handle trailing .show() and .toSql()', () => {
        const testCode = `
            from('table1').show();
            from('table2').toSql();
        `;
        const expected = [
            {
                chain: null,
                param: "table1",
                fromChain: "from('table1').show()",
                cleanFromChain: "from('table1')",
                resource: null, // No Buck() call involved
                lineStart: 2,
                lineEnd: 2
            },
            {
                chain: null,
                param: "table2",
                fromChain: "from('table2').toSql()",
                cleanFromChain: "from('table2')",
                resource: null, // No Buck() call involved
                lineStart: 3,
                lineEnd: 3
            }
        ];
        expect(extractFromStatementsAST(testCode)).toEqual(expected);
    });

    test('should handle multiple statements with f', () => {
        const testCode = `
            const g = Buck('').from('duckdb_functions()')
            // test comment
            g.select().execute()

            g.select('description', 'comment').execute()
        `;
        expect(extractFromStatementsAST(testCode)).toHaveLength(2)
        // expect(extractFromStatementsAST(testCode)).toEqual([]);
    });
});

describe('extractBuckStatement', () => {
    test('should extract Buck() with no arguments', () => {
        const testCode = `
            const db = Buck();
            db.from('something'); // Should be ignored by extractBuckStatement
        `;
        const expected = [{
            resource: null,
            options: null,
            fullCall: "Buck()",
            lineStart: 2,
            lineEnd: 2
        }];
        expect(extractBuckStatement(testCode)).toEqual(expected);
    });

    test('should extract Buck() with one string argument', () => {
        const testCode = `
            const db = Buck('my_resource.db');
        `;
        const expected = [{
            resource: "my_resource.db",
            options: null,
            fullCall: "Buck('my_resource.db')",
            lineStart: 2,
            lineEnd: 2
        }];
        expect(extractBuckStatement(testCode)).toEqual(expected);
    });

    test('should extract Buck() with template literal argument', () => {
        const testCode = "const db = Buck(`template_resource`);"; // Use template literal
        const expected = [{
            resource: "template_resource",
            options: null,
            fullCall: "Buck(`template_resource`)",
            lineStart: 1,
            lineEnd: 1
        }];
        expect(extractBuckStatement(testCode)).toEqual(expected);
    });


    test('should extract Buck() with string and options object', () => {
        const testCode = `
            const db = Buck('another/db', { setting1: 'xxx', readOnly: true, nested: { num: 1, arr: [10, "a", null] } });
        `;
        const expected = [{
            resource: "another/db",
            options: { setting1: 'xxx', readOnly: true, nested: { num: 1, arr: [10, "a", null] } }, // Expect JS object
            fullCall: "Buck('another/db', { setting1: 'xxx', readOnly: true, nested: { num: 1, arr: [10, \"a\", null] } })", // Full call string remains
            lineStart: 2,
            lineEnd: 2
        }];
        expect(extractBuckStatement(testCode)).toEqual(expected);
    });

    test('should extract multiple Buck() calls', () => {
        const testCode = `
            const db1 = Buck(':memory:');
            function setup() {
                const db2 = Buck('persistent.db', { log: false }); // Options object
            }
            Buck(); // Direct call
            Buck('unsupported', myVar); // Unsupported options type
            Buck('shorthand', { shorthand }); // Unsupported shorthand
        `;
        const shorthand = 1; // Define for test code validity
        const myVar = {}; // Define for test code validity
        const expected = [
            {
                resource: ":memory:",
                options: null, // No options object
                fullCall: "Buck(':memory:')",
                lineStart: 2,
                lineEnd: 2
            },
            {
                resource: "persistent.db",
                options: { log: false }, // Expect JS object
                fullCall: "Buck('persistent.db', { log: false })",
                lineStart: 4,
                lineEnd: 4
            },
            {
                resource: null, // Direct call Buck()
                options: null, // No options
                fullCall: "Buck()",
                lineStart: 6,
                lineEnd: 6
            },
            { // Buck('unsupported', myVar) - options should be null as myVar is not an object literal
                resource: "unsupported",
                options: null,
                fullCall: "Buck('unsupported', myVar)",
                lineStart: 7,
                lineEnd: 7
            },
            { // Buck('shorthand', { shorthand }) - options should be null as shorthand is not supported
                resource: "shorthand",
                options: null, // Evaluation fails due to shorthand
                fullCall: "Buck('shorthand', { shorthand })",
                lineStart: 8,
                lineEnd: 8
            }
        ];
        // Sort results by lineStart for consistent comparison
        const actual = extractBuckStatement(testCode).sort((a, b) => a.lineStart - b.lineStart);
        expect(actual).toEqual(expected);
    });

    test('should ignore non-Buck calls', () => {
        const testCode = `
            const x = NotBuck();
            const y = from('table');
            const z = Buckaroo('hello');
        `;
        const expected: any[] = []; // Expect empty array
        expect(extractBuckStatement(testCode)).toEqual(expected);
    });

    test('should handle Buck call with only options object as first argument', () => {
        const testCode = `
            const db = Buck({ config: true, path: './data', nested: { count: 5 } });
        `;
        const expected = [{
            resource: null, // No string resource provided
            options: { config: true, path: './data', nested: { count: 5 } }, // Expect JS object
            fullCall: "Buck({ config: true, path: './data', nested: { count: 5 } })",
            lineStart: 2,
            lineEnd: 2
        }];
        expect(extractBuckStatement(testCode)).toEqual(expected);
    });

    test('should handle Buck call with string and non-object second arg', () => {
        const testCode = `
            const db = Buck('my.db', 123); // Second arg is not object literal
        `;
        const expected = [{
            resource: "my.db",
            options: null, // Second arg is not object literal
            fullCall: "Buck('my.db', 123)",
            lineStart: 2,
            lineEnd: 2
        }];
        expect(extractBuckStatement(testCode)).toEqual(expected);
    });
});
