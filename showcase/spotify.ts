import { Buck } from "@buckdb/remote";

const completeTrackInfo = await Buck('s3://a1738/')
    .from('spotify/tracks.parquet', 'track')
    .join('spotify/r_albums_tracks.parquet', 'rat').on(e => e.rat.track_id === e.track.id)
    .join('spotify/albums.parquet', 'album').on(e => e.rat.album_id === e.album.id)
    .join('spotify/r_albums_artists.parquet', 'raa').on(e => e.album.id === e.raa.album_id)
    .join('spotify/artists.parquet', 'artist').on(e => e.artist.id === e.raa.artist_id)
    .leftJoin('spotify/audio_features.parquet', 'af').on(e => e.af.id === e.track.id)
    .select()
    .orderBy('track.popularity', 'DESC')
    .limit(100)
    .show()


