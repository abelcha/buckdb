import * as duckdb from '@duckdb/duckdb-wasm';
// @ts-ignore

import { builder } from './src/build'
import * as t from './.buck/types'; // Import types with alias 't'

const resolve = (path = "") => import.meta.resolve(path).replace('file://', '')

// const duckDBWasmAdapter = async (handle: string): Promise<DuckdbFactory> => {
//     const duckdb = await import('@duckdb/duckdb-wasm');

//     const MANUAL_BUNDLES: DuckDBBundles =  {
//         mvp: {
//             mainModule: (await import('@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm?url')).default,
//             mainWorker: (await import('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js?url')).default,
//         },
//         eh: {
//             mainModule: (await import('@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url')).default,
//             mainWorker: (await import('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?url')).default,
//         },
//     };
//     console.log({ MANUAL_BUNDLES })
//     // Select a bundle based on browser checks
//     const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
//     // Instantiate the asynchronus version of DuckDB-wasm
//     const worker = new Worker(bundle.mainWorker!);
//     const logger = new duckdb.ConsoleLogger();
//     const db = new duckdb.AsyncDuckDB(logger, worker);
//     await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
//     const connection = await db.connect();
//     return {
//         query: async function (sql: string, opts = {}) {
//             const result = await connection.query(sql);
//             return result.toArray();
//         },
//         run: async function (sql: string) {
//             return connection.send(sql);
//         }
//     }
// }


// export const database = builder(duckDBWasmAdapter)
// export const MemoryDB = database('')
// // console.log({MemoryDB})
// export const from = MemoryDB.from



import { CommandQueue, type DuckdbCon } from './src/utils'; // Import necessary types from utils

const getDB = async () => {
  var logger = new duckdb.ConsoleLogger()

  if (typeof Bun !== 'undefined') {
    const DD = {
      mvp: {
        mainModule: resolve('@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm'),
        mainWorker: resolve('@duckdb/duckdb-wasm/dist/duckdb-node-mvp.worker.cjs')
      },
      eh: {
        mainModule: resolve('@duckdb/duckdb-wasm/dist/duckdb-eh.wasm'),
        mainWorker: resolve('@duckdb/duckdb-wasm/dist/duckdb-node-eh.worker.cjs'),
      }
    }
    const bundle = await duckdb.selectBundle(DD);
    const worker = new Worker(bundle.mainWorker!);
    const db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    return db
  }
  // @ts-ignore
  const { default: duckdb_worker } = await import('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js?worker&inline')
  const { default: duckdb_wasm } = await import('@duckdb/duckdb-wasm/dist/duckdb-eh.wasm?url')
  const worker = new duckdb_worker()
  const db = new duckdb.AsyncDuckDB(logger, worker)
  await db.instantiate(duckdb_wasm)
  return db
}

// Wrapper function to adapt DuckDBWasmAdapter to the DConstructor signature
const duckDBWasmAdapter = async (handle?: string, settings?: Partial<t.DSettings>): Promise<DuckdbCon> => { // Use t.DSettings
  const cmdQueue = new CommandQueue()

  // await db.open({
  //   path: 'opfs://duckdb-wasm-parquet.db',
  //   accessMode: duckdb.DuckDBAccessMode.READ_WRITE,
  // })
  const db = await getDB()
  const con = await db.connect()
  console.log({ con })
  // const resp = await con.query('SELECT * FROM duckdb_settings()')
  // console.log([...resp.toArray()])

  return {
    cmdQueue,
    upsertSchema: async (model: string, schema: Record<string, string>) => {
      console.log('xxx', 'upsertSchema',)
    },
    settings: (s) => {
      cmdQueue.pushSettings(s)
      return this;
    },
    loadExtensions: (...extensions: string[]) => {
      console.log('loading extensions...', extensions)
      cmdQueue.pushExtensions(...extensions)
      return this;
    },
    query: async function (sql: string, opts = {}) {
      const cmds = cmdQueue.flush()
      if (cmds?.length) {
        console.log('Flushing ', cmds, '...')
        // console.log('loading settings:', cmds)
        const sresp = await con.query(cmds)
        // console.log('settings loaded:', sresp)
      }
      const reader = await con.query(sql)
      // reader.
      if (opts?.rows) {
        return reader.toArray().map(row => Object.values(row))
      }
      return reader.toArray().map(e => e.toJSON())
    },
    run: async function (sql: string) {
      return con.send(sql)
    }
  }
};


// declare class DuckDBWasmFaker {
//     constructor(handle: string, settings: Record<string, any>)
//     initialize(): Promise<void>
//     load(...extensions: string[]): Promise<void>
//     query<T = any>(sql: string, params: any[]): Promise<T[]>
//     run(sql: string): Promise<any>
//     dump(sql: string): void
//     close(): Promise<void>
// }
// // @ts-ignore
// // const DAdapter = typeof globalThis.DuckDBWasmAdapter === 'undefined' ? DuckDBWasmFaker : globalThis.DuckDBWasmAdapter)

// Pass the adapter factory function to the builder.
export const Buck = builder(await duckDBWasmAdapter())
export const MemoryDB = Buck('') // Call the function returned by builder
export const from = MemoryDB.from
// // const resp = await from('duckdb_settings()').select().execute()

// // console.log(resp[0])
// // console.log({  })



// // const duckdb = require('@duckdb/duckdb-wasm');
// // const path = require('path');
// // const Worker = require('web-worker');
// // const DUCKDB_DIST = path.dirname(require.resolve('@duckdb/duckdb-wasm'));

// // (async () => {
// //     try {
// //         const DUCKDB_CONFIG = await duckdb.selectBundle({
// //             mvp: {
// //                 mainModule: path.resolve(DUCKDB_DIST, 'duckdb-mvp.wasm'),
// //                 mainWorker: path.resolve(DUCKDB_DIST, 'duckdb-node-mvp.worker.cjs'),
// //             },
// //             eh: {
// //                 mainModule: path.resolve(DUCKDB_DIST, 'duckdb-eh.wasm'),
// //                 mainWorker: path.resolwve(DUCKDB_DIST, 'duckdb-node-eh.worker.cjs'),
// //             },
// //         });

// //         const logger = new duckdb.ConsoleLogger();
// //         const worker = new Worker(DUCKDB_CONFIG.mainWorker);
// //         const db = new duckdb.AsyncDuckDB(logger, worker);
// //         await db.instantiate(DUCKDB_CONFIG.mainModule, DUCKDB_CONFIG.pthreadWorker);

// //         const conn = await db.connect();
// //         await conn.query(`SELECT count(*)::INTEGER as v FROM generate_series(0, 100) t(v)`);

// //         await conn.close();
// //         await db.terminate();
// //         await worker.terminate();
// //     } catch (e) {
// //         console.error(e);
// //     }
// // })();
