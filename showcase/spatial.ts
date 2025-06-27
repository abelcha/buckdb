import { Buck } from '@buckdb/isomorphic'

const SP = Buck('s3://a1738/spatial_lite.db').loadExtensions('spatial')

const nearbyStorePairs = SP.with(
    db => ({
        base_location: db.from('Center')
            .select((e, D) => ({
                center: D.ST_Point(e.center[2], e.center[1])
            })),
    }),
    db => ({
        nearby_stores: db.from('Fsq_os_places_eu', 'f')
            .crossJoin('base_location')
            .select(({ f, base_location }, D) => ({
                fsq_place_id: f.fsq_place_id,
                name: f.name,
                _longitude: f.longitude,
                _latitude: f.latitude,
                location: D.ST_Point(f.longitude, f.latitude),
                distance_meters: D.round(D.ST_Distance_Spheroid(D.ST_Point(f.longitude, f.latitude), base_location.center), 2)
            }))
            .where(({ f, base_location }, D) =>
                f.date_closed.IsNull() &&
                D.ST_Distance_Spheroid(
                    D.ST_Point(f.longitude, f.latitude),
                    base_location.center
                ) <= 100
            )
    })
)
    .from('nearby_stores', 'a')
    .join('nearby_stores', 'b').on(({ a, b }, D) =>
        a.fsq_place_id < b.fsq_place_id &&
        D.ST_DWithin(a.location, b.location, 2)
    )
    .select(({ a, b }, D) => ({
        store1: a.name,
        location1: a._latitude.as('Varchar') + ', ' + a._longitude.as('Varchar'),
        store2: b.name,
        location2: b._latitude.as('Varchar') + ', ' + b._longitude.as('Varchar'),
        distance_meters: D.round(D.ST_Distance(a.location, b.location), 2)
    }))
    .orderBy('distance_meters')
    .limit(200)

const results = await nearbyStorePairs.execute()
