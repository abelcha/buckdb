import { Buck, from } from '../buckdb'
import { afterAll, describe, expect, it } from 'bun:test'
import { groupBy, } from 'es-toolkit'

// const dbid = `/tmp/testdb-${Date.now().toString(32)}.duckdb`
const dbid = '/tmp/testdb-20241001.123456.duckdb'
const db = Buck(':memory:', {
    access_mode: 'AUTOMATIC',
})
// db.ddb.
describe('Setops', () => {
    it('create', async () => {
        // await Bun.sleep(400)
        await db.create('whatever', { replace: true })
            .as([
                { id: 1, name: 'alice', age: 30 },
                { id: 2, name: 'bob', age: 25 },
                { id: 3, name: 'charlie', age: 35 },
                { id: 4, name: 'dave', age: 40 }
            ])
            .execute()
        const resp = await db.from('whatever').show()
        console.log({ resp })
        const rr = await db.from('whatever').select('id', 'name').exec()
        // await db.
        // console.log({ resp })
        // Buck('/tmp/')
    })

    it('wha', async () => {

        const resp = await Buck('file:///Volumes/dev/fsimrep').from('starbase/*.parquet')
            // .select('id', 'c', 'repo')
            .limit(10)
            .show()

    })

})

