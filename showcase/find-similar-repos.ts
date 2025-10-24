import { Buck, from } from '@buckdb/isomorphic'

const repo = 'yamadashy/repomix'

Buck('s3://a1738/fsimrep').with(
    db => ({
        repo_pairs: db.from('starbase/*.parquet', 'a')
            .join('starlite.parquet', 'r1').using('repo')
            .join('starbase/*.parquet', 'b').on(({ a, b }) => a.login === b.login && a.repo !== b.repo)
            .join('starlite.parquet', 'r2').on(e => e.b.repo === e.r2.repo)
            .select(({ r2, a, b, r1 }) => ({
                login: a.login,
                date: a.date,
                repo_a: a.repo,
                repo_b: b.repo,
                repo_a_stars: r1.c,
                repo_b_stars: r2.c
            }))
            .context({ repo })
            .where(({ a }) => a.repo === repo)
    }),
    db => ({
        similarity_metrics: db.from('repo_pairs')
            .select((e, D) => ({
                repo_a: e.repo_a,
                repo_b: e.repo_b,
                common_users: D.count(D.Distinct(e.login)),
                total_stars: e.repo_b_stars,
                earliest_common_star: D.min(e.date),
                latest_common_star: D.max(e.date),
                jaccard_similarity: D.count(D.Distinct(e.login)) / (e.repo_b_stars ?? null)
            }))
            .groupBy('repo_a', 'repo_b', 'repo_b_stars')
            .having((e, D) => D.count(D.Distinct(e.login)) >= 5)
    }),
    db => ({
        results: db.from('similarity_metrics')
            .select((e, D) => ({
                ...e,
                full_name: e.repo_b,
                similarity_score: e.jaccard_similarity.round(3),
            }))
            .where(e => e.jaccard_similarity > 0)
            .orderBy('jaccard_similarity', 'DESC')
    })

)
    .from('results')
    .leftJoin('repos.parquet', 'x').using('full_name')
    .select((e, D) => ({
        full_name: 'github.com/' + e.full_name,
        similarity_score: e.results.similarity_score.round(3),
        common_users: e.common_users,
        total_stars: e.stargazers_count,
        description: e.description ?? '',
        topics: e.topics ?? [],
    }))
    .orderBy('similarity_score', 'DESC')
    .limit(100)
