// from
// copy
// export
// union
// grouping set/cube etc
// offset
//limit 10%
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
// similar to | match | startsWith | endsWith | includes
// update
// turn ... and into wildcard, replace etc

// interface DuckDBClient {
//   query<T = any>(sql: string, params?: any[]): Promise<T[]>;
//   close(): Promise<void>;
// }

import { DuckDBClient, mapTypes, wrap } from './src/utils';
import { builder } from './src/build-v2'
import { DuckDBNodeAdapter } from './adapters/DuckDBNodeAdapter';
import { uniq, upperFirst } from 'es-toolkit';


export const database = builder(new DuckDBNodeAdapter(), {})
export const MemoryDB = database('')
export const from = MemoryDB.from

// const getX e = (e) => {
// }

if (import.meta.main) {
  // from('')
  // MemoryDB
  // .from().show()
  // MemoryDB.from('data/people.parquet')
  //   .crossJoin('data/test.csv', e => e.people.age === e.test.age)
  //   .select('age', 'name')
  //   .where(e => e.age > 12)
  //   .dump()
  //   .limit(100)
  //   .offset(100)
  //   .dump()

  // const q = from('data/people.parquet')
  // // .select((p, D) => D.round(p.age).add(13))
  // // .select('age', 'name')
  // // .show()
  // .execute().then(e => console.log('==>', e))
  // .show()
  // const zz = from('data/people.parquet').select().where


  // const resp = await from('duckdb_types()')
  //   .select((e, D) => ({
  //     cx: D.count(),//.filter(e.type_category === 'NUMERIC'),
  //     typenames: D.array_agg(e.type_name),
  //     c: D.count()
  //   }))
  //   // .distinctOn('type_name')
  //   .keyBy(e => e.type_category)
  //   // .having(e => e.c > 10)
  //   // .show()
  //   .execute()
  // // console.log({ resp })
  // // console.log('===', )
  // for (let i in resp) {
  //   let e = resp[i]
  //   const enms = uniq(resp[i].typenames.map(upperFirst).map(e => wrap(e, "'"))).join(' | ')
  //   // console.log({ e })
  //   const tmap = {
  //     BOOLEAN: 'DBool',
  //     NUMERIC: 'DNumeric',
  //     STRING: 'DVarchar',
  //     DATETIME: 'DDate',
  //   }

  //   const dest = tmap[i.toUpperCase()] || 'DAny'
  //   // console.log({ dest })
  //   const wildcard = '`${string}(${number}, ${number})` | `${string}[]` |  `[${string}]`'
  //   console.log(` as(destype: ${enms} | ${wildcard}): ${dest}Field;`)
    
  // }



  await from('duckdb_types()')
    .select((e, D) => ({
      tc: e.type_name,
      xx: e.type_size.as('Decimal'),
      // zz: e.schema_oid.zas('Binary'),
      // cx: D.count(),//.filter(e.type_category === 'NUMERIC'),
      // c: D.count()
    }))
    .where(e => e.type_oid.as('Varchar') === 'LOL')
    .limit(10)
    // .keyBy(e => e.tc)
    // .groupBy(e => e[''])
    // .groupBy(e => e.tc)
    // .having(e => e.c > 10)
    // .having(e => e.c < 30)
    // .dump()
    .show()





  // from('data/people.parquet')
  //   // .select((e, D) => ({ c: D.count(), ageCat: e.age.divide(10), avg: D.avg(e.age).round(0), fl: D.approx_count_distinct(e.name)}))
  //   .select((e, D) => ({ xage: e.age.divide(10), zz:D.count() }))
  //   .where(e => e.age > 20)
  //   .keyBy(e => e.xage)
  //   .show()
  //   .execute().then(e => console.log('==>', e))
  // .execute().then(e => e)

  // database('')

  // .orWhere()
  // .toSql({ pretty: true }))
  // .dump()
  // const resp = await from('data/people.parquet').select('age', 'name').execute()
  // console.log({ resp })

  // export const BuckDB = () => {

  // }

  // export class Database {
  //   constructor(private client: DuckDBClient) { }

  //   async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  //     return this.client.query<T>(sql, params);
  //   }

  //   // async close(): Promise<void> {
  //   //   await this.client.close();
  //   // }
  // }
  // Ddatabase
  /*
  
  const db = Buckdb({ s3_access_key: , s3_secret_key: , s3_region: 'us-east-1' });
  .attach('s3://bucket/path/to/file.db', 'file' ,{ type: 'sqlite', mode: 'readwrite })
  .from('file.people')
  .join('file.orders')
  
  from('./local/file.csv')
  
  */
}