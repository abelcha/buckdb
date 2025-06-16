import { it, describe, expect } from 'bun:test'
import { Extracted, extractAssignations, extractReconciledCalls, extractSpecialCalls } from './extractor'
import { parse } from './parser'
import { MemoryDB } from '@buckdb/node'

const testCode = `
            // Covers lines 109-115, 117-122 (collectDefinitions)
            // Covers lines 109-115, 117-122 (collectDefinitions)
            const def1 = Buck('res1').from('param1');
            const someVar = {}; // Define someVar for the test
            const def2 = someVar.from('param2'); // someVar not Buck initialized
            const def3 = Buck('res3').settings().with('param3');

            // Covers lines 124-132, 134-136, 138-148 (visitExecutableChains - isOutermost, stmtParentSearch)
            function wrapper() {
                return def1.select().execute();
            }
            const x = def1.filter().show();
            if (true) {
                def3.map().toSql();
            }

            // Covers 169-170, 173-174 (visitExecutableChains - baseIdentifierOfChain, buckFromDefinitions.has)
            // Already covered by 'should handle simple property access .from()' and others

            // Covers 204-205, 207-217 (visitExecutableChains - tracer logic for direct from())
            from('direct_from').select().execute();
            
            // Covers 219-220, 222-224 (visitExecutableChains - expressionLeadingToFrom, baseOfLeadingExpr)
            const anotherBuck = Buck('another_res');
            anotherBuck.settings().from('leading_expr').filter().execute();

            // Covers 250 (visitExecutableChains - fromCallTargetNode.expression.name for property access 'from')
            // Covered by most existing tests like 'should handle simple property access .from()'

            // Covers 314-329 (extractBuckStatement - various argument combinations)
            // Already covered by 'extractBuckStatement' describe block
            Buck({opt: 1});
            Buck('resOnly');
            Buck('resWithOptions', {opt: true});
            Buck(123); // Non-string, non-object first arg
            
        `
it('test assignation extraction', () => {
    const result = extractAssignations(testCode, { positions: false, chain: true })
    expect(Object.entries(result)).toEqual([
        ["def1",
            {
                expression: "Buck('res1').from('param1')",
                method: "from",
                chain: [
                    ["Buck", ["'res1'"], 3],
                    ["from", ["'param1'"], 3]
                ],
                base: null,
            }
        ],
        ["def2",
            {
                expression: "someVar.from('param2')",
                method: "from",
                chain: [
                    ["from", ["'param2'"], 5]
                ],
                base: "someVar",
            }
        ],
        ["def3",
            {
                expression: "Buck('res3').settings().with('param3')",
                method: "with",
                chain: [
                    ["Buck", ["'res3'"], 6], ["settings", [], 6], ["with", ["'param3'"], 6]
                ],
                base: null,
            }
        ],
        ["x",
            {
                expression: "def1.filter().show()",
                method: "show",
                chain: [
                    ["filter", [], 12], ["show", [], 12]
                ],
                base: "def1",
            }
        ],
        ["anotherBuck",
            {
                expression: "Buck('another_res')",
                method: "Buck",
                chain: [
                    ["Buck", ["'another_res'"], 24]
                ],
                base: null,
            }
        ],
    ])
    // expect(result).toEqual([
    //     ['def1', `Buck('res1').from('param1')`],
    //     ['someVar', '{}'],
    //     ['def2', `someVar.from('param2')`],
    //     ['def3', `Buck('res3').settings().with('param3')`],
    //     ['x', 'def1.filter().show()'],
    //     ['anotherBuck', `Buck('another_res')`]
    // ])
})

// it('test assignation reconstitution', () => {
//     const assignations = extractAssignations(testCode)
//     const result = reconstituteAssignations(assignations)
//     const expected = new Map([
//         ['def1', `Buck('res1').from('param1')`],
//         ['someVar', '{}'],
//         ['def2', `{}.from('param2')`],
//         ['def3', `Buck('res3').settings().with('param3')`],
//         ['x', `Buck('res1').from('param1').filter().show()`],
//         ['anotherBuck', `Buck('another_res')`]
//     ])
//     expect([...result.entries()]).toEqual([...expected.entries()])
// })

it('test special calls extraction', () => {
    const result = extractSpecialCalls(testCode, { chain: false })
    expect(result).toEqual([
        {
            expression: `Buck('res1').from('param1')`,
            method: 'from',
            start: { line: 4, column: 26, charPos: 158 },
            end: { line: 4, column: 53, charPos: 185 }
        },
        {
            expression: `someVar.from('param2')`,
            method: 'from',
            start: { line: 6, column: 26, charPos: 275 },
            end: { line: 6, column: 48, charPos: 297 }
        },
        {
            expression: `Buck('res3').settings().with('param3')`,
            method: 'with',
            start: { line: 7, column: 26, charPos: 356 },
            end: { line: 7, column: 64, charPos: 394 }
        },
        {
            expression: `from('direct_from').select().execute()`,
            method: 'from',
            start: { line: 22, column: 13, charPos: 1034 },
            end: { line: 22, column: 51, charPos: 1072 }
        },
        {
            expression: `anotherBuck.settings().from('leading_expr').filter().execute()`,
            method: 'from',
            start: { line: 26, column: 13, charPos: 1260 },
            end: { line: 26, column: 75, charPos: 1322 }
        }
    ])
})

it('reconciliation', () => {
    const result = extractReconciledCalls(testCode, { positions: false })
    expect(result).toEqual([
        {
            expression: `Buck('res1').from('param1')`,
            base: null,
            chain: [["Buck", ["'res1'"], 3], ["from", ["'param1'"], 3]],
            method: 'from',
        },
        {
            expression: `someVar.from('param2')`,
            base: 'someVar',
            chain: [["from", ["'param2'"], 5]],
            method: 'from',
        },
        {
            base: null,
            expression: `Buck('res3').settings().with('param3')`,
            chain: [["Buck", ["'res3'"], 6], ["settings", [], 6], ["with", ["'param3'"], 6]],
            method: 'with',
        },
        {
            base: null,
            expression: `from('direct_from').select().execute()`,
            chain: [['from', ["'direct_from'"], 21], ['select', [], 21], ['execute', [], 21]],
            method: 'from',
        },
        {
            base: 'anotherBuck',
            chain: [['Buck', ["'another_res'"], 24], ["settings", [], 25], ["from", ["'leading_expr'"], 25], ["filter", [], 25], ["execute", [], 25]],
            // chain: [["settings", []], ["from", ["'leading_expr'"]], ["filter", []], ["execute", []]],
            expression: `Buck('another_res').settings().from('leading_expr').filter().execute()`,
            // expression: `anotherBuck.settings().from('leading_expr').filter().execute()`,
            method: 'from',
        }
    ])
})
it('test spaces', () => {
    expect(
        extractSpecialCalls(`def3\n .from('xxx')`, { positions: false, chain: false, })
    ).toEqual([{
        expression: "def3\n .from('xxx')",
        method: 'from',
    }
    ])
})

it('test spaces2', () => {
    expect(
        extractSpecialCalls(`def3\n .from('xxx').select(e => ({...e}))`, { positions: true, chain: false, })
    ).toEqual([{
        expression: "def3\n .from('xxx').select(e => ({...e}))",
        method: 'from',
    }
    ])
})


it('test nested extract', () => {
    const code = `
    Buck('file:///Volumes/dev/fsimrep').with(
        db => ({
            repo_pairs: db

            .from('starbase/*.parquet', 'a')
        })
    )
    // comment
    `
    expect(extractSpecialCalls(code, { positions: false, chain: false })).toEqual([
        {
            method: 'with',
            children: [
                {
                    expression: "db\n\n            .from('starbase/*.parquet', 'a')",
                    method: "from",
                }
            ],
            expression: `Buck('file:///Volumes/dev/fsimrep').with(
        db => ({
            repo_pairs: db

            .from('starbase/*.parquet', 'a')
        })
    )`,
        }]
    )
})

it('test nested extract', () => {
    const code = `
const q = 
Buck('file:///Volumes/dev/fsimrep').with(
    db => ({
        results: db.from('similarity_metrics')
        .select(e => ({
            ...e,
            // comment
        }))
    }),
    db => ({
        results: db.from('xx')
    }),

)
    .from('results')
    .leftJoin('repos.parquet', 'x').using('full_name')
    .limit(100)`
    const rr = extractSpecialCalls(code, { chain: true })
    console.log({ rr })
    // console.log(extractSpecialCalls(rr[0].expression))
    // expect()
    //     .toEqual([

    //     ])

})

// it('extractChains', async () => {
//     // console.log(extractReconciledCalls(await Bun.file('./examples/fsimrep.ts').text()))
//     expect(
//         extractReconciledCalls(`
//         db.from('leading_expr')
//         .select(e => ({ 
//             gg: e.toto().lol('xxx'),
//             zz: u.tata
//          })).groupBy('tata').execute()`, { positions: true })
//     )
//         .toEqual([
//             {
//                 base: "db",
//                 chain: [
//                     ["from", ["'leading_expr'"], 1],
//                     ["select", ["e => ({ \n            gg: e.toto().lol('xxx'),\n            zz: u.tata\n         })"], 2],
//                     ["groupBy", ["'tata'"], 5],
//                     ["execute", [], 5]
//                 ],
//                 end: { charPos: 156, column: 39, line: 6, },
//                 expression: "db.from('leading_expr')\n        .select(e => ({ \n            gg: e.toto().lol('xxx'),\n            zz: u.tata\n         })).groupBy('tata').execute()",
//                 method: "from",
//                 start: { charPos: 9, column: 9, line: 2, },
//             }
//         ])
// })

it.only('whatever', async () => {
    const testCodee = `
// String concatenation using multiple patterns
const stringConcatResult =
    await MemoryDB.from('duckdb_functions()')
        .select(e => ({
            // Template literal style
            description: \`Function "\${e.function_name}" is of type \${e.function_type}\`,

            // Plus operator concatenation
            simple_concat: e.function_name + '_func',

            // Mixed operations
            detailed_info: 'Name: ' + e.function_name + ', Length: ' + e.function_name.len(),
        }))
        .where(e => e.function_type === 'scalar')
        .limit(3)
        .execute() satisfies {
            description: string
            simple_concat: string
            detailed_info: string
        }[]
`
    const r = extractReconciledCalls(await Bun.file('./examples/01-getting-started.ts').text())
    r.forEach(e => {
        // MemoryDB
        console.log('---', MemoryDB)
        const fn = new Function(`return ${e.expression.replace('.execute()', '')}.toSql() `)
        console.log(fn())
    })
    // console.log({  })
    // expect(r).toEqual([])

})