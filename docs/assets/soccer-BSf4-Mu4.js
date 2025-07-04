const a="import { Buck, from } from '@buckdb/isomorphic'\n\nconst SC = Buck('/me/dev/buckdb/data/european_soccer_database.sqlite')\n\n// Get top 10 players with their highest overall rating\nconst topPlayersByRating = SC.from('Player', 'p')\n    .join('Player_Attributes', 'pa').on(({ p, pa }) => pa.player_api_id === p.player_api_id)\n    .select(({ p, pa }, D) => ({\n        player_name: p.player_name,\n        overall_rating: D.arg_max(pa.overall_rating, pa.date)\n    }))\n    .where(({ pa }) => !pa.overall_rating.IsNull())\n    .groupBy(({ p }) => p.player_name)\n    .orderBy(['overall_rating', 'DESC'], ['player_name', 'ASC'])\n    .limit(10)\n\nconst results = await topPlayersByRating.execute()\nconsole.log('Top 10 Players by Overall Rating:')\nconsole.table(results)\n";export{a as default};
