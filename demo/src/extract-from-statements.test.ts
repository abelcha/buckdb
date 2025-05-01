import { test, expect, describe } from 'bun:test';
import { extractFromStatementsAST } from './extract-from-statements';

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
    });

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

});
