import { Buck, from, MemoryDB } from "./buckdb";
import { copy } from "./src/copy";

const BS = Buck('s3://a1738/')

BS.from('Stations')


const Akira = Buck('s3://a1738/akira09.db')


const respxx = await from('duckdb_functions()')
    .select(e => `__${e.function_name}_${e.return_type}__`)
    .where(e => !!e.function_name && !!e.return_type)
    .dump()
    .execute()

const rx
    = await Akira.from('Customer').select(e => e.Customer.active).execute()



// SELECT CONCAT(customer.last_name, ', ', customer.first_name) AS customer,
// address.phone, film.title
// FROM rental INNER JOIN customer ON rental.customer_id = customer.customer_id
// INNER JOIN address ON customer.address_id = address.address_id
// INNER JOIN inventory ON rental.inventory_id = inventory.inventory_id
// INNER JOIN film ON inventory.film_id = film.film_id
// WHERE rental.return_date IS NULL
// AND rental_date + INTERVAL film.rental_duration DAY < CURRENT_DATE()
// ORDER BY title
// LIMIT 5;
from('duckdb_functions()')
    .select(e => `__${e.function_name}_${e.return_type}__`)
    .where(e => !!e.function_name && !!e.return_type)
    .execute()

const r = Akira.from('Rental')
    .innerJoin('Customer', 'customer_id')
    .innerJoin('Address', 'address_id')
    .innerJoin('Film', e => e.Rental.customer_id === e.Customer.customer_id)
    .select(e => `${e.Customer.last_name}, ${e.Customer.first_name}`)
    .where(e => (
        e.Rental.rental_date === null
        // && e.rental_date !== e.Film.rental_duration
    ))
    .orderBy('title')
    .limit(5)
    .exec()
// .distinctOn('Address.city_id')




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
        .where(c => c.population > 1000_000 && c.timezone.match(/^Europe/m))
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

