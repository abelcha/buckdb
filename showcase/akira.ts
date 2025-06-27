import { Buck } from "@buckdb/isomorphic";


const Akira = Buck('s3://a1738/akira09.db')


const mostFilmActor =
    await Akira.from('Actor')
        .join('Film_actor').using('actor_id')
        .select(({ first_name, last_name }, D) => [first_name, last_name, D.count()])
        .groupBy('ALL')
        .orderBy([(e, D) => D.count('*'), 'DESC'])
        .limit(1)
        .execute()



const maxtime = Date.now()
const r = Akira.from('Rental')
    .join('Customer').using('customer_id')
    .join('Address').using('address_id')
    .join('Film').on(e => e.Rental.customer_id === e.Customer.customer_id)
    .select(e => `${e.Customer.last_name}, ${e.Customer.first_name}`)
    .context({ maxtime: Date.now() })
    .where((e, D) => e.Rental.rental_date.epoch_ms() + (e.Film.rental_duration * 24 * 60 * 60 * 1000) < maxtime)
    .orderBy('title')
    .limit(5)
    .exec()
