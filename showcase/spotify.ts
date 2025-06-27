import { Buck } from "@buckdb/remote";

const completeTrackInfo = await Buck('/me/dev/buckdb')
    .from('spot/tracks.parquet', 'track')
    .join('spot/r_albums_tracks.parquet', 'rat').on(e => e.rat.track_id === e.track.id)
    .join('spot/albums.parquet', 'album').on(e => e.rat.album_id === e.album.id)
    .join('spot/r_albums_artists.parquet', 'raa').on(e => e.album.id === e.raa.album_id)
    .join('spot/artists.parquet', 'artist').on(e => e.artist.id === e.raa.artist_id)
    .leftJoin('spot/audio_features.parquet', 'af').on(e => e.af.id === e.track.id)
    .select()
    //   .select([
    //     't.name as track_name',
    //     't.popularity as track_popularity',
    //     't.duration_ms',
    //     'a.name as album_name',
    //     'a.release_date',
    //     'ar.name as artist_name',
    //     'ar.popularity as artist_popularity',
    //     'af.danceability',
    //     'af.energy',
    //     'af.valence'
    //   ])
    .where(e => e.track.popularity > 90)
    .orderBy('track.popularity', 'DESC')
    .limit(100)
    .show()


