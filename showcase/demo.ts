
import { cast_to_type, generate_series, ST_Distance_Spheroid, ST_Point } from "@buckdb/fn";
import { duckdb_functions, range } from "@buckdb/tf";
import { Buck, from, read_csv } from "@buckdb/isomorphic";


const d1 = await from(duckdb_functions())
    .select(e => [e.database_name.lower(), e.database_name.len()])
    .run()

const d2 = await from(range(0, 10000))
    .select(e => ({
        num: e.range,
        steps: generate_series(e.range).array_filter(x => x % 10 == 0)[-1],
    }))
    .run()

const d3 = await from(range(1000))
    .select(e => `${e.range} is ${e.range % 2 === 0 ? 'even' : 'odd'}`)
    .run()


const d4 = await from(range(1000))
    .select(e => ({
        val: {
            zz: [e.range.to_hex()[.1]],
            deep: { nested: 42 }
        }
    }))
    .run()





const d4 =
    await Buck('s3://a1738').loadExtensions('spatial')
        .from(read_csv('geonames-cities-150k.csv', { ignore_errors: true }))
        .select((e, D) => [
            e.Elevation, e.ASCIIName, e.Coordinates,
            ST_Point(D.cast(e.Coordinates[1], 'Int'), D.cast(e.Coordinates[2], 'Int'))
            // ST_Distance_Spheroid(
            //     ,
            //     base_location.center
            // ),




        ])
        // .select(e => ({
        //     name: e.database_name.lower(),
        //     str: `ex:  ${array_to_string(e.examples, ' - ')}`
        // }))
        .run()



// // Example 2: Artist genre analysis with aggregations
// const artistGenreStats = await Buck()
//   .from('../spot/artists.parquet', 'ar')
//   .join('../spot/r_artist_genre.parquet', 'rag', 'ar.id = rag.artist_id')
//   .join('../spot/genres.parquet', 'g', 'rag.genre_id = g.id')
//   .join('../spot/r_track_artist.parquet', 'rta', 'ar.id = rta.artist_id')
//   .join('../spot/tracks.parquet', 't', 'rta.track_id = t.id')
//   .select([
//     'g.name as genre',
//     'COUNT(DISTINCT ar.id) as artist_count',
//     'COUNT(DISTINCT t.id) as track_count',
//     'AVG(ar.popularity) as avg_artist_popularity',
//     'AVG(t.popularity) as avg_track_popularity',
//     'MAX(t.popularity) as max_track_popularity'
//   ])
//   .groupBy('g.name')
//   .having('COUNT(DISTINCT ar.id) > 5')
//   .orderBy('avg_track_popularity', 'DESC')
//   .limit(20)
//   .show()

// // Example 3: Album completeness analysis
// const albumAnalysis = await Buck()
//   .from('../spot/albums.parquet', 'a')
//   .join('../spot/r_albums_tracks.parquet', 'rat', 'a.id = rat.album_id')
//   .join('../spot/tracks.parquet', 't', 'rat.track_id = t.id')
//   .join('../spot/r_albums_artists.parquet', 'raa', 'a.id = raa.album_id')
//   .join('../spot/artists.parquet', 'ar', 'raa.artist_id = ar.id')
//   .leftJoin('../spot/audio_features.parquet', 'af', 't.id = af.id')
//   .select([
//     'a.name as album_name',
//     'ar.name as artist_name',
//     'a.release_date',
//     'COUNT(t.id) as track_count',
//     'AVG(t.popularity) as avg_track_popularity',
//     'AVG(af.danceability) as avg_danceability',
//     'AVG(af.energy) as avg_energy',
//     'SUM(t.duration_ms) / 1000 / 60 as total_duration_minutes'
//   ])
//   .where("a.release_date LIKE '2023%'")
//   .groupBy(['a.id', 'a.name', 'ar.name', 'a.release_date'])
//   .having('COUNT(t.id) >= 5')
//   .orderBy('avg_track_popularity', 'DESC')
//   .limit(50)
//   .show()

// // Example 4: Audio features correlation by genre
// const genreAudioFeatures = await Buck()
//   .from('../spot/genres.parquet', 'g')
//   .join('../spot/r_artist_genre.parquet', 'rag', 'g.id = rag.genre_id')
//   .join('../spot/artists.parquet', 'ar', 'rag.artist_id = ar.id')
//   .join('../spot/r_track_artist.parquet', 'rta', 'ar.id = rta.artist_id')
//   .join('../spot/tracks.parquet', 't', 'rta.track_id = t.id')
//   .join('../spot/audio_features.parquet', 'af', 't.id = af.id')
//   .select([
//     'g.name as genre',
//     'COUNT(*) as track_count',
//     'ROUND(AVG(af.danceability), 3) as avg_danceability',
//     'ROUND(AVG(af.energy), 3) as avg_energy',
//     'ROUND(AVG(af.valence), 3) as avg_valence',
//     'ROUND(AVG(af.acousticness), 3) as avg_acousticness',
//     'ROUND(AVG(af.instrumentalness), 3) as avg_instrumentalness',
//     'ROUND(AVG(af.tempo), 1) as avg_tempo'
//   ])
//   .where('af.danceability IS NOT NULL')
//   .groupBy('g.name')
//   .having('COUNT(*) > 100')
//   .orderBy('avg_energy', 'DESC')
//   .show()

// // Example 5: Popular tracks with full context
// const popularTracksFullContext = await Buck()
//   .with('track_artists', `
//     SELECT 
//       t.id,
//       t.name as track_name,
//       t.popularity,
//       t.duration_ms,
//       STRING_AGG(ar.name, ', ') as artists
//     FROM '../spot/tracks.parquet' t
//     JOIN '../spot/r_track_artist.parquet' rta ON t.id = rta.track_id
//     JOIN '../spot/artists.parquet' ar ON rta.artist_id = ar.id
//     GROUP BY t.id, t.name, t.popularity, t.duration_ms
//   `)
//   .from('track_artists', 'ta')
//   .join('../spot/r_albums_tracks.parquet', 'rat', 'ta.id = rat.track_id')
//   .join('../spot/albums.parquet', 'a', 'rat.album_id = a.id')
//   .leftJoin('../spot/audio_features.parquet', 'af', 'ta.id = af.id')
//   .select([
//     'ta.track_name',
//     'ta.artists',
//     'a.name as album_name',
//     'a.release_date',
//     'ta.popularity',
//     'ta.duration_ms / 1000 / 60 as duration_minutes',
//     'af.danceability',
//     'af.energy',
//     'af.valence'
//   ])
//   .where('ta.popularity > 80')
//   .orderBy('ta.popularity', 'DESC')
//   .limit(25)
//   .show()

// console.log('🎵 Spotify database analysis complete!');