import { DArrayField, DBoolField, DMetaField, DNumericComp, DNumericField, DVarcharComp, DVarcharField } from '.buck/types'
import * as t from '.buck/types'
import { Buck, from } from '@buckdb/isomorphic'
import { FromPlain, ToPlain } from '../src/deep-map'

const staff = {
    _id: '5830bf4042bcf30004f4e27b',
    firstName: 'Sam',
    lastName: 'Picques',
}
const pack = {
    _id: '587fcaded4872100046ce8fd',
    title: 'Mariage',
    category: 'Mariage',
    type: 'technic',

    tags: ['Wedding', 'Bridal'],
    tagIds: [12, 42],
    itemType: 'package',
    shopID: 'c3e1dab7-5b69-4378-a384-229192fce2e7',
    price: {
        name: 'Mariage',
        value: 65,
        _id: '587fcaded4872100046ce8fe',
    },
    staff,
    taxRate: 20,
    quantity: 1,
    discounts: [
        {
            type: 'relative',
            value: 10,
            name: 'student discount',
        },
    ],
    items: [
        {
            _id: '586b633370fd7800041155be',
            title: 'Coupe',
            type: 'haircut',
            price: {
                value: 19,
                name: 'Court',
            },
            staff,
            taxRate: 20,
            quantity: 1,
            discounts: [],
            itemType: 'service',
        },
        {
            _id: '586b634770fd7800041155c3',
            title: 'Shampoing',
            type: 'shampoo',
            price: {
                value: 7,
                name: '',
            },
            staff,
            taxRate: 20,
            quantity: 1,
            discounts: [],
            itemType: 'service',
        },
        {
            _id: '586b636270fd7800041155c6',
            title: 'Brushing',
            type: 'brushing',
            price: {
                name: 'Carré',
                value: 15,
            },
            staff,
            taxRate: 20,
            quantity: 1,
            discounts: [],
            itemType: 'service',
        },
        {
            _id: '587fc68ed4872100046ccbe2',
            title: 'Couleur',
            type: 'colouring',
            price: {
                name: 'Couleur',
                value: 20,
            },
            staff,
            taxRate: 20,
            quantity: 1,
            discounts: [],
            itemType: 'service',
        },
    ],
}

console.log(new Date())
const db = Buck('../local.duckdb')
const q = await db.create('items', { replace: true }).as(pack).execute()
await db.from('items').select((e, D) => ({ ...e, version: D.Json({ version: 42 }), tagmap: D.map_from_entries([{ k: 12, v: 'Wedding' }, { k: 42, v: 'Bridal' }]) }))
    .copyTo('demo.parquet').execute()
// console.log(q.toSql())
// const resp = await q.execute()
// const rz
//     = await db.from('items')
//         .select(e => ({ name: `___${e._id}___${e.title}__` }))
//         .execute()
// // console.log(rz)

// // const resp =
// //     await db
// //         .from('duckdb_extensions()')
// //         .execute()
// // const q = db.create('testjson', { replace: true }).as()

// const resp2 = await db.from('tjson').select(e => e.id === 'ol').execute()
// console.log({ resp2 })

// // console.log({ resp })


// const og =
//     [
//         { name: 'contains', args: ['varchar', 'array'] },
//         { name: 'array_contains', args: ['varchar', 'array'] },
//     ]
