// import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
// import { TSCompleter } from './completions'
// import * as x from './build.types'
// import * as dd from './deep-map'
// import * as ts from 'typescript'; // Import ts for ts.sys
// if (!x || !dd)
//     console.log()

// let tester: TSCompleter;

// describe('Sxetops', function () {
//     beforeEach(() => {
//         tester = new TSCompleter();
//         tester.addImport("* as x", './build.types');

//     })
//     // it.only('import', async () => {
//     //     const tester = new TSCompleter();
//     //     const suggestions1 = tester.getSuggestions(`
//     // import {Path} from './path-type'; // This import is in src/virtual.ts
//     // interface User { id: number; name: string; }
//     // const path: Path<User> = ''`, 1);
//     //     expect(suggestions1).toEqual(['id', 'name']);
//     // })


//     it('test comptype still got everything', () => {
//         expect(tester.getSuggestions(() => x.Buck('').from('tusr').select('age').compType['']))
//             .toEqual(['age', 'jobid', 'name', 'tusr'])
//         expect(tester.getSuggestions(() => x.Buck('').from('tusr').select('age').compType.tusr['']))
//             .toEqual(['age', 'jobid', 'name'])
//     })
//     it.only('test returnType', () => {
//         expect(tester.getSuggestions(`x.Buck('').from('tusr').select('age').returnType['']`)).toEqual(['age'])
//     })
//     it.only('test returnType', () => {
//         expect(tester.getSuggestions(() => x.Buck('').from('tusr').select(e => ({ age: e.age, zz: e.name })).returnType[''])).toEqual(['age', 'zz'])
//     })
//     it.only('test returnType', () => {
//         expect(tester.getSuggestions(() => x.Buck('').from('tusr').select(e => ({ gg: e.tusr.age, name: e.tusr.name })).returnType[''])).toEqual(['gg', 'name'])
//     })
//     it('tetd2', () => {
//         // const tester = new TSCompleter();
//         // const sgg = tester.getSuggestions(`t.Buck('').from('`)

//         // o.sjoin/****** */ = tester.getSuggestions(`x.Buck('').from('data/people.parquet').join('test_usr', 'name').select('')`)

//         // x.Buck('').from('tusr').select('age').where(e => e)
//         // o.joinUsing2/** */ = tester.getSuggestions(`x.Buck('').from('tusr').select('age').returnType['']`)




//         expect(tester.getSuggestions(() => x.Buck('').from('tusr').select('age').returnType['']))
//             .toEqual(['age', 'jobid', 'name'])

//         const joinUsing/** */ = tester.getSuggestions(() => x.Buck('').from('tusr', 'PP').join('tjob', 'NN', 'name').select(''))
//         expect(joinUsing).toEqual(["NN.jobid", "NN.name", "PP.age", "PP.jobid", "PP.name", "age", "jobid", "name"])

//         const joinUsingAlias = tester.getSuggestions(() => x.Buck('').from('tusr').join('tjob', 'jobid').select(''))
//         expect(joinUsingAlias).toEqual(["age", "jobid", "name", "tjob.jobid", "tjob.name", "tusr.age", "tusr.jobid", "tusr.name"])

//         const joinFunc = /***/ tester.getSuggestions(() => x.Buck('').from('tusr').join('tjob', e => e.tusr.age === e.tjob.jobid).select(''))
//         expect(joinFunc).toEqual(["age", "jobid", "name", "tjob.jobid", "tjob.name", "tusr.age", "tusr.jobid", "tusr.name"])


//         const joinFuncAliass = tester.getSuggestions(() => x.Buck('').from('tusr', 'PP').join('tjob', 'TT', e => e.TT.name === e.PP.name).select(''))
//         expect(joinFuncAliass).toEqual(["PP.age", "PP.jobid", "PP.name", "TT.jobid", "TT.name", "age", "jobid", "name"])





//         // o.a = tester.getSuggestions(`x.Buck('').from('test_usr').select('')`)
//         // o.b = tester.getSuggestions(`x.Buck('local.duckdb').from('items', 'I').select('')`)
//         // o.based = tester.getSuggestions(`x.Buck('').from('test_usr').select(e => [e.])`, 2)
//         // o.based2 = tester.getSuggestions(`x.Buck('').from('test_usr').select(e => ({ uu: e.})`, 2)



//         // const sgg1 = tester.getSuggestions(`(xx: x.XZModel<'test_usr'>) => xx['']`, 2)
//         // console.log({ sgg1 })
//         // const sgg = tester.getSuggestions(`(xx: x.ZZZ<x.XZModel<'test_usr'>>) => xx.sel('')`)
//         // const sgg = tester.getSuggestions(`(xx: x.ZZZ<x.XZModel<'test_usr'>>) => xx.select('')`)


//         // const sgg = tester.getSuggestions(`(x:XZModel) => x.`)
//         // console.log(o)
//         // console.time('getSuggestions2');
//         // const sgxg = tester.getSuggestions(`import { Buck } from './build.types'; Buck(':memory:').from('duckdb_functions()').select('')`, 2)
//         // console.log({ sgxg })
//         // console.timeEnd('getSuggestions2');

//     })

//     // it.only('inline', async () => {
//     //     try {
//     //         // const buildTypesContent = await Bun.file('./src/build.types.ts').text();
//     //         // const suggestions1 = tester.getSuggestions(`
//     //         // ${buildTypesContent}
//     //         // function dd(zz: any) {
//     //         //     zz.select('')
//     //         // }`, 4);
//     //         const suggestions1 = tester.getSuggestions(`

//     //         Record<string, any>`, 2);
//     //         expect(Array.isArray(suggestions1)).toBe(true);
//     //     } catch (error) {
//     //         // If there are type errors, that's expected - just make sure the function doesn't crash
//     //         console.log('Expected type checking errors:', error);
//     //         expect(true).toBe(true);
//     //     }
//     // })
// })
