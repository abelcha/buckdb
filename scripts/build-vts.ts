import * as uilder from '../src/builder.ts'
import * as arser from '../src/parser.ts'
import * as tils from '../src/utils.ts'
import * as darser from '../src/parser.ts'
import * as roxy from '../src/proxy.ts'
import * as sep from '../src/jsep.ts'
import * as bcuck from '../src/.buck/table.ts'
import * as buck from '../src/.buck/types.ts'
import * as dd from '../src/demo.ts'
import fs from 'fs'
import { isString } from 'es-toolkit'
const files = [
    'demo.ts',
    // 'duckdb.ts',
    'builder.ts',
    'utils.ts',
    'parser.ts',
    'proxy.ts',
    'jsep.ts',
    '.buck/table.ts',
    ['.buck/types.ts', 'src/.buck/minitypes.ts'],
    // ['duckdb-wasm.ts', 'node_modules/@duckdb/duckdb-wasm/dist/duckdb-browser.mjs']
].map(e => Array.isArray(e) ? e : [e, import.meta.dirname +  '/../src/' + e])
// .map(e =>  , '/' + e ])
const go = async () => {
    console.log({ uilder, arser, tils, darser, roxy, sep, bcuck, buck, dd })
    console.log({ files })
    const out = files.map(p => {

        return ['/' + p[0], fs.readFileSync(p[1], 'utf-8')]
    })
    // console.log(out)
    console.log(new Date(), 'writing...')

    await Bun.file('/me/dev/playground/demo/output.json').write(JSON.stringify(out, null, 2))

}


go()
// console.log(JSON.stringify(out, null, 2))