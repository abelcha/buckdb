const o=`import { MemoryDB, Buck, read_csv, from } from "@buckdb/isomorphic";
import { copy } from "../src/copy";
import { duckdb_settings } from "../tf";

await from('data/final.csv').show()

const db =
    Buck('/Volumes/T9/gh-2025')

// db.from('').show()
// .settings({ search_path: '/Volumes/T9/gh-2025' })


// from(duckdb_settings())
// db.from
// console.log('===>', read_csv('*/*.descs.tsv', { all_varchar: true }))
// const vv = 
db.from(read_csv('*/*.tsv', { column_names: ['repo', "description"] }))
    .distinctOn('repo')
    .orderBy('repo')
    .copyTo('repos.parquet')
    .execute()

db.from(read_csv('*/*.csv', { column_names: ['login', 'repo', 'ts'] }))
    .orderBy(['repo'], ['ts'])
    .copyTo('watchev.parquet').execute()
// .select('login', 'repo', 'ts')
// .select((e, D) => [D.count(), e.repo])
// .groupBy('repo')
// .orderBy('count()', 'DESC')
// .limit(1000)
// .select()
// db.from(read_csv('*/*.descs.tsv', { all_varchar: true })).show()`;export{o as default};
