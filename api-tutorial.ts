import { Buck, from, MemoryDB } from "./buckdb";
import { copy } from "./src/copy";

const BS = Buck('s3://a1738')





const Akira = Buck('s3://a1738/akira09.db')

Akira.from('Staff').select(e => e.first_name)
// SELECT first_name, last_name, count(*) films
// FROM actor AS a
// JOIN film_actor AS fa USING (actor_id)
// GROUP BY actor_id, first_name, last_name
// ORDER BY films DESC
// LIMIT 1;
// Actor with most films (ignoring ties)
const mostFilmActor =
    await Akira.from('Actor')
        .join('Film_actor', 'actor_id')
        .select(({ first_name, last_name }, D) => ({
            first_name,
            last_name,
            films: D.count('*')
        }))
        .groupBy('actor_id', 'first_name', 'last_name')
        .orderBy('films', 'DESC')
        .limit(1)
        .execute()

const mostFilmActor2 =
    await Akira.from('Actor')
        .join('Film_actor', 'actor_id')
        .select(({ first_name, last_name }, D) => [first_name, last_name, D.count()])
        .groupBy('ALL')
        .orderBy([(e, D) => D.count('*'), 'DESC'])
        .limit(1)
        .execute()



const resp =
    await BS.from('geo/cities.parquet').select(e => e.label_en).exec()


const z =
    await BS.from('geo/cities.parquet').select('ascii_name', 'population').exec()


const robj =
    await BS.from('geo/cities.parquet').select(e => [e.ascii_name, e.population.stats()]).exec()

// whatever

const z2 =
    await BS.from('geo/cities.parquet').select((e, D) => ({
        roundpop: `${D.round(e.population / 1000, 2)}K - ${e.ascii_name}`,
    }))
        .where(c => c.population > 1000_000 && c.timezone.regexp_matches(/^Europe/))
        .orderBy('population', 'DESC')
        .exec()


const rsingle =
    await BS.from('geo/cities.parquet')
        .select((e, D) => ({ name: e.cou_name_en, countx: D.count() }))
        .groupBy('cou_name_en')
        .having(x => x.countx > 1000)
        .exec()


const rarr = await copy(
    BS.from('geo/cities.parquet').select('name', 'elevation', 'population', 'country_code')
).to('s3://a1738/cities_parts', { partition_by: 'country_code', format: 'parquet' }).execute()



const rax =
    await BS.from('s3://a1738/geo/cities.parquet')
        .select(({ timezone, ...e }) => ({ ...e, continent: timezone.string_split('/')[0] }))
        .copyTo('s3://a1738/parts', { partition_by: 'continent' })
        .execute()

const c2 =
    await BS.from('geo/cities.parquet')
        .select((e, D) => e.alternate_names.split(',').join('|') ?? '<default>')
        .exec()

const c3 =
    await BS.from('geo/cities.parquet')
        .select((e, D) => ({
            ev: D.cast(e.elevation, 'Bigint') ?? 0,
            pos: e.elevation.as('Int') > 1000 ? 'hi' : 'low',
        }))
        .exec()

