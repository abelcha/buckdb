// similar to | match | startsWith | endsWith | includes
// b
// from
// copy
// export
// union
// grouping set/cube etc
// offset
// limit 10%
// using sample
// count filter
// case when
// union
// intercept
// except all
// casting
// IN
// NOT
// select all
// columns
// update
// turn ... and into wildcard, replace etc
// + as a string concat operator

// interface DuckDBClient {
//   query<T = any>(sql: string, params?: any[]): Promise<T[]>;
//   close(): Promise<void>;
// }
// import type { DuckDBBundles } from '@duckdb/duckdb-wasm';
import { DSettings } from './.buck/types';
import { builder } from './src/build'
import { CommandQueue, DuckdbCon } from './src/utils';
import {generateInterface} from './interface-generator'

const tempJsonFix = e => JSON.parse(JSON.stringify(e, (key, value) => {
    switch (value?.constructor?.name) {
        case 'DuckDBListValue':
            return value.items
        case 'DuckDBDecimalValue':
            return value.toDouble()
    }
            
    
    if (typeof value === 'bigint') {
        return Number(value);
    }
    return value
}
))

// const duckDBNodeAdapter = async (handle: string): Promise<DuckdbFactory> => {
export const duckDBNodeAdapter = async (handle?: string, settings?: Partial<DSettings>): Promise<DuckdbCon> => { // Use t.DSettings
        const cmdQueue = new CommandQueue().pushSettings(settings)
        const {DuckDBInstance} = await import('@duckdb/node-api')
        const instance = await DuckDBInstance.create(handle); // In-memory DB
        const connection = await instance.connect();
        return {
            cmdQueue,
            upsertSchema: async (model:string, schema: Record<string, string>) => {
                const tableFile = Bun.file(`./.buck/table.json`)
                const tableContent = await tableFile.json()
                if (!tableContent[handle || '']) {
                    tableContent[handle || ''] = {};
                }
                tableContent[handle || ''][model] = schema
                console.log({tableContent})
                await tableFile.write(JSON.stringify(tableContent, null, 2))
                const tsfile = generateInterface(tableContent)
                await Bun.file('./.buck/table3.ts').write(tsfile)
                console.log({tsfile})
            },
            loadExtensions: (...extensions:   string[]) => {
                console.log('loading extensions...', extensions)
                cmdQueue.pushExtensions(...extensions)
                return this;
            },
            settings: (s: Partial<DSettings>) => {
                cmdQueue.pushSettings(s)
                return this;
            },
            query:async function(sql: string, opts = {}) {
                // const cmds = ;
                const cmds = cmdQueue.flush()
                if (cmds?.length) {
                    console.log('Flushing ', cmds, '...')
                    // console.log('loading settings:', cmds)
                    const sresp= await connection.run(cmds)
                    // console.log('settings loaded:', sresp)
                }
                const reader = await    connection.runAndReadAll(sql);
                if (opts?.rows) {
                    return reader.getRowsJson()
                }
                return tempJsonFix(reader.getRowObjects())
            },
            run: async function(sql: string) {
                return connection.run(sql);
            }
        }
}

export const Buck = builder(await duckDBNodeAdapter())
export const MemoryDB = Buck('')
// console.log({MemoryDB})
export const from = MemoryDB.from


// export class DuckDBWrapper {
//     private settingsEntries: [string, any][] = [];
//     private extensions: string[] = [];
//     private handle: string;
//     private client: DuckDBClient;
//     private isInitialized = false;

//     constructor(handle: string = ':memory:', settings: Record<string, any> = {}) {
//         this.handle = handle;
//         this.setSettings(settings);
//     }
//     load(...extensions: string[]) {
//         this.isInitialized = false;
//         this.extensions.push(...extensions)
//     }
//     async setSettings(settings: Record<string, any>) {
//         this.settingsEntries = Object.entries(settings)
//     }
//     async initialize() {
//         this.client = await duckDBNodeAdapter(this.handle)
//         if (this.settingsEntries.length) {
//             const q = this.settingsEntries.map(([key, value]) => `SET ${key} = ${value};`).join(';')
//             const resp = await this.client.run(q);
//             console.log({resp})
//         }
//         if (this.extensions.length) {
//             const str = this.extensions.map(e => `INSTALL ${e}; LOAD ${e}`).join(';')
//             const resp = await this.client.run(str);
//         }

//         this.isInitialized = true
//     }
//     async dump(sql: string) {
//         // const { all, createEmphasize }= await import('emphasize');
//         // const emphasize = createEmphasize(all)
//         // console.log(emphasize.highlightAuto(sql, { subset: ['sql'] }).value)
//         console.log(sql)
//         return this;
//     }
//     async query<T = any>(sql: string, opts: Record<string, any> = {}): Promise<T[]> {
//         if (!this.isInitialized) {
//             await this.initialize();
//         }
//         return this.client.query(sql, opts) as unknown as Promise<T[]>;
//     }
//     async run(sql: string) {
//         if (!this.isInitialized) {
//             await this.initialize();
//         }
//         return this.client.run(sql);
//     }
// }





// const getX e = (e) => {
// }

// if (import.meta.main) {
//   // from('')
//   // MemoryDB
//   // .from().show()
//   // MemoryDB.from('data/people.parquet')
//   //   .crossJoin('data/test.csv', e => e.people.age === e.test.age)
//   //   .select('age', 'name')
//   //   .where(e => e.age > 12)
//   //   .dump()
//   //   .limit(100)
//   //   .offset(100)
//   //   .dump()

  // const q = from('data/people.parquet')
  // // .select((p, D) => D.round(p.age).add(13))
  // // .select('age', 'name')
  // // .show()
//   // .execute().then(e => console.log('==>', e))
//   // .show()
//   // const zz = from('data/people.parquet').select().where


//   // const resp = await from('duckdb_types()')
//   //   .select((e, D) => ({
//   //     cx: D.count(),//.filter(e.type_category === 'NUMERIC'),
//   //     typenames: D.array_agg(e.type_name),
//   //     c: D.count()
//   //   }))
//   //   // .distinctOn('type_name')
//   //   .keyBy(e => e.type_category)
//   //   // .having(e => e.c > 10)
//   //   // .show()
//   //   .execute()
//   // // console.log({ resp })
//   // // console.log('===', )
//   // for (let i in resp) {
//   //   let e = resp[i]
//   //   const enms = uniq(resp[i].typenames.map(upperFirst).map(e => wrap(e, "'"))).join(' | ')
//   //   // console.log({ e })
//   //   const tmap = {
//   //     BOOLEAN: 'DBool',
//   //     NUMERIC: 'DNumeric',
//   //     STRING: 'DVarchar',
//   //     DATETIME: 'DDate',
//   //   }

//   //   const dest = tmap[i.toUpperCase()] || 'DAny'
//   //   // console.log({ dest })
//   //   const wildcard = '`${string}(${number}, ${number})` | `${string}[]` |  `[${string}]`'
//   //   console.log(` as(destype: ${enms} | ${wildcard}): ${dest}Field;`)
    
//   // }



//   const q= from('duckdb_types()')
//     .select((e, D) => ({
//       tc: e.type_name,
//       xx: e.type_size.as('Decimal'),
//       // zz: e.schema_oid.zas('Binary'),
//       // cx: D.count(),//.filter(e.type_category === 'NUMERIC'),
//       // c: D.count()
//     }))
//     // .where(e => e.type_oid.as('Varchar') === 'LOL')
//     .limit(10)
//     .dump()
// console.log(await q.execute())




//     // .keyBy(e => e.tc)
//     // .groupBy(e => e[''])
//     // .groupBy(e => e.tc)
//     // .having(e => e.c > 10)
//     // .having(e => e.c < 30)
//     // .dump()
//     .show()





//   // from('data/people.parquet')
//   //   // .select((e, D) => ({ c: D.count(), ageCat: e.age.divide(10), avg: D.avg(e.age).round(0), fl: D.approx_count_distinct(e.name)}))
//   //   .select((e, D) => ({ xage: e.age.divide(10), zz:D.count() }))
//   //   .where(e => e.age > 20)
//   //   .keyBy(e => e.xage)
//   //   .show()
//   //   .execute().then(e => console.log('==>', e))
//   // .execute().then(e => e)

//   // database('')

//   // .orWhere()
//   // .toSql({ pretty: true }))
//   // .dump()
//   // const resp = await from('data/people.parquet').select('age', 'name').execute()
//   // console.log({ resp })

//   // export const BuckDB = () => {

//   // }

//   // export class Database {
//   //   constructor(private client: DuckDBClient) { }

//   //   async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
//   //     return this.client.query<T>(sql, params);
//   //   }

//   //   // async close(): Promise<void> {
//   //   //   await this.client.close();
//   //   // }
//   // }
//   // Ddatabase
//   /*
  
//   const db = Buckdb({ s3_access_key: , s3_secret_key: , s3_region: 'us-east-1' });
//   .attach('s3://bucket/path/to/file.db', 'file' ,{ type: 'sqlite', mode: 'readwrite })
//   .from('file.people')
//   .join('file.orders')
  
//   from('./local/file.csv')
  
//   */
// }