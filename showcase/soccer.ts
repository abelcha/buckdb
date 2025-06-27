import { Buck, from } from '@buckdb/isomorphic'

const SC = Buck('s3://a1738/european_soccer_database.sqlite')

// Get top 10 players with their highest overall rating
const topPlayersByRating = SC.from('Player', 'p')
    .join('Player_Attributes', 'pa').using('player_api_id')
    .select(({ p, pa }, D) => ({
        player_name: p.player_name,
        overall_rating: D.arg_max(pa.overall_rating, pa.date)
    }))
    .where(({ pa }) => !pa.overall_rating.IsNull())
    .groupBy(({ p }) => p.player_name)
    .orderBy(['overall_rating', 'DESC'], ['player_name', 'ASC'])
    .limit(10)

const results = await topPlayersByRating.execute()
console.log('Top 10 Players by Overall Rating:')
console.table(results)
