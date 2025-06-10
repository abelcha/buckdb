import { Buck, from, read_parquet } from '@buckdb/isomorphic'

// Parse command line argument
// const msg = process.argv[2] || ''
// console.log(`Hello ${msg}`)

// Initialize BuckDB with remote connection

// await from(read_parquet('/datasets/sources/*.parquet', { union_by_name: true }), 'T1')
//     .leftJoin('/datasets/communes.parquet', 'geo', ({ T1, geo }) => T1.zipcode === geo.code_postal)
//     .select((e, D) => ({
//         ...e,
//         lat: D.nullif(e.lat.as('Double'), D.cast(e.latitude, 'Double')),
//         lng: D.nullif(e.lng.as('Double'), D.cast(e.longitude, 'Double')),
//     }))
//     .copyTo('/datasets/sources.v4.parquet')


// Define macros using BuckDB's macros API
let XD = Buck('rein.duckdb', {
    preserve_insertion_order: false,
    max_memory: '32GB',
    threads: 4,
    memory_limit: '128GB'
})

const rr = await XD
    .macros(D => ({
        phone_clean: (a) => D.regexp_replace(a, '[^0-9+]', '', 'g'),
        phone_fmt2: (a) => D.regexp_replace(a, '^0', ''),
        phone_fmt3: (a) => D.starts_with(a, '33') ? D.concat('+', a) : a,
        phone_fmt4: (a) => D.len(a) === 9 ? D.concat('+33', a) : a,
        phone_fmtn: (a) => D.len(a) < 8 ? null : D.phone_fmt4(D.phone_fmt3(D.phone_fmt2(a))),
        phormat: (a) => D.phone_fmtn(D.phone_clean(a)),
        email_clean: (a) => D.regexp_replace(a, '[^a-zA-Z0-9@._-]', '', 'g').lower(),
        DEBURR: (e) => D.lower(e).strip_accents().regexp_extract_all('[a-z]+').array_to_string(' ').trim(),
        PHENCODE: (phone) => D.multiply(D.cast(D.substr(phone, 5), 'Bigint'), D.cast(D.right(phone, 4), 'Smallint')),
        PHDECODE: (phonehash, pr) => D.concat(pr[0], D.cast(D.divide(D.cast(D.cast(phonehash, 'Varchar'), 'Bigint'), D.cast(pr[1], 'Int')), 'Varchar')),
        ISPHONEOK: (p) => D.regexp_matches(p, '^\\+33[67]\\d{8}$')
    })).with(
        db => ({
            T3: db.from('/datasets/sources.v4.parquet')
                .select((e, D) => ({
                    rid: D.concat(e.dsid, D.md5(e.id)).lower(),
                    ...e,
                    email: D.email_clean(e.Email),
                    phone: D.phormat(e.phone),
                    firstname: D.DEBURR(e.FirstName),
                    lastname: D.DEBURR(e.LastName),
                    lat: D.round(e.lat.as('Double'), 3),
                    lng: D.round(e.lng.as('Double'), 3),
                }))
        }),
        db => ({
            T4: db.from('T3')
                .select((e, D) => ({
                    ...e,
                    pr: [D.left(e.phone, 4), D.right(e.phone, 4)],
                    pid: D.PHENCODE(e.phone),
                    phone: e.phone,
                }))
                .where(e => e.phone.SimilarTo(/^\+33[67]\d{8}$/))
                .union(
                    db.from('T3')
                        .select((e, D) => ({
                            ...e,
                            phone: null,
                            pr: null,
                            pid: null
                        }))
                        .where(e => !e.phone.SimilarTo(/^\+33[67]\d{8}$/))

                )
        }),
        db => ({
            T5: db.from('T4')

                .select((e, D) => ({
                    ...e,
                    rid: D.left(e.rid, 14),
                    tokens: D.list_distinct(
                        D.regexp_extract_all(
                            D.concat(
                                D.replace(D.replace(D.string_split(e.email, '@')[0], e.firstname, ':'), e.lastname, ':'),
                                ' ',
                                e.firstname,
                                ' ',
                                e.lastname
                            ),
                            '[a-z]+'
                        )
                    ),
                    location: D.concat(e.address, e.location, e.City),
                    infos: D.struct_pack(e.occupation, e.birthdate, e.company, e.siret, e.vat)
                }))
                .where((e, D) =>
                    D.len(e.firstname) > 2 && D.len(e.firstname) < 30 && D.len(e.lastname) > 2 && D.len(e.lastname) < 30
                )
                .orderBy('firstname')
        }),
        db => ({
            final: db.from('T5')
                .select((e, D) => ({
                    seqid: D.Raw('row_number() over()'),
                    ...e
                }))
        })
    ).from('final').copyTo('/datasets/final.v8.parquet')
    .execute()
console.log({ rr })




// await q.from('final').select().exec()

// console.log({ rrr })
// .from('final').copyTo('/datasets/final.v8.parquet').execute()

// Copy results to local files
// await result

// Create token index
// await result.from('final')
//     .select((e, D) => ({
//         t: D.unnest(e.tokens),
//         seqid: e.seqid
//     }))
//     .orderBy('t')
//     .copyTo('/datasets/tindex.v8.parquet')

// // Create mobile subset
// await result.from('final')
//     .where(e => e.pr[0] === '+336' || e.pr[0] === '+337')
//     .copyTo('/datasets/mobile.v8.parquet')

// console.log('Data transformation completed successfully')
