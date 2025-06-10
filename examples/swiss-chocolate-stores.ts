import { Buck } from '@buckdb/isomorphic'
import { array_contains, round, ST_Distance_Spheroid, ST_Point } from '../fn'

const SP = Buck('file:///me/dev/buckdb/data/spatial_lite.db', {
    access_mode: 'READ_WRITE'
})
    .loadExtensions('spatial')

// Create temporary city centers data
await SP.create('swiss_cities', { ifNotExists: true })
    .as([
        { city_name: 'Zurich', center_lon: 8.5417, center_lat: 47.3769 },
        { city_name: 'Geneva', center_lon: 6.1432, center_lat: 46.2044 },
        { city_name: 'Bern', center_lon: 7.4474, center_lat: 46.9480 },
        { city_name: 'Basel', center_lon: 7.5886, center_lat: 47.5596 },
        { city_name: 'Luzern', center_lon: 8.3093, center_lat: 47.0505 }
    ]).execute()


const swissChocolateStores =
    SP.with(
        db => ({
            city_centers: db.from('swiss_cities')
                .select((e, D) => ({
                    city_name: e.city_name,
                    center: ST_Point(e.center_lon, e.center_lat),
                    lon_min: e.center_lon - 0.05,
                    lon_max: e.center_lon + 0.05,
                    lat_min: e.center_lat - 0.05,
                    lat_max: e.center_lat + 0.05
                }))
        }),
        db => ({
            stores_by_city: db.from('Fsq_os_places_eu', 'p')
                .crossJoin('city_centers', 'c')
                .select(({ p, c }, D) => ({
                    city_name: c.city_name,
                    store_name: p.name,
                    distance_from_center: round(
                        ST_Distance_Spheroid(
                            ST_Point(p.longitude, p.latitude),
                            c.center
                        ),
                        2
                    )
                }))
                .where(({ p, c }, D) =>
                    array_contains(p.fsq_category_ids, '52f2ab2ebcbc57f1066b8b31')
                    && p.country === 'CH'
                    && p.longitude >= c.lon_min && p.longitude <= c.lon_max
                    && p.latitude >= c.lat_min && p.latitude <= c.lat_max
                    && ST_Distance_Spheroid(ST_Point(p.longitude, p.latitude), c.center) <= 5000
                )
        })
    )
        .from('stores_by_city', 's')
        .select(({ s }, D) => ({
            city_name: s.city_name,
            total_stores: D.count(),
            stores_per_km2: round(D.count() / 78.54, 2),
            closest_stores: D.Raw(`(SELECT string_agg(store_name) FROM (
                SELECT store_name FROM stores_by_city s2 
                WHERE s2.city_name = s.city_name 
                ORDER BY distance_from_center LIMIT 3
            ))`),
        }))
        .groupBy(({ s }) => s.city_name)
        .orderBy('total_stores', 'DESC')

const results = await swissChocolateStores.execute()
console.log(`Found chocolate store analysis for ${results.length} Swiss cities`)
console.table(results)
