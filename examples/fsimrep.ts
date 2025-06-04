import { Buck, from } from '../buckdb'

const db = Buck('file:///Volumes/dev/fsimrep')

// db.from('starlite.parquet')
const q = Buck('file:///Volumes/dev/fsimrep').with(
    db => ({
        repo_pairs: db.from('starbase/*.parquet', 'a')
            .join('starlite.parquet', 'r1', 'repo')
            .join('starbase/*.parquet', 'b', ({ a, b }) => a.login === b.login && a.repo !== b.repo)
            .join('starlite.parquet', 'r2', 'repo')
            .select(({ r2, a, b, r1 }) => ({
                login: a.login,
                date: a.date,
                repo_a: a.repo,
                repo_b: b.repo,
                repo_a_stars: r1.c,
                repo_b_stars: r2.c
            }))
            .where(({ a }) => a.repo === 'duckdb/duckdb')
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
                jaccard_similarity: D.cast(D.count(D.Distinct(e.login)), 'Float').divide(D.nullif(e.repo_b_stars, 0).as('Bigint'))
            }))
            .groupBy('repo_a', 'repo_b', 'repo_b_stars')
            .having((e, D) => D.count(D.Distinct(e.login)) >= 10)
    }),
    db => ({
        results: db.from('similarity_metrics')
            .select((e, D) => ({
                ...e,
                full_name: e.repo_b,
                similarity_score: e.jaccard_similarity,
            }))
            .where(e => e.jaccard_similarity > 0)
            .orderBy('jaccard_similarity', 'DESC')
            .limit(100)
    })

)
    .from('results')
    .leftJoin('repos.parquet', 'x', 'full_name')
    .select((e, D) => ({
        full_name: e.full_name,
        similarity_score:  e.results.similarity_score.round(3),
        common_users: e.common_users,
        total_stars:e.total_stars,
        topics: e.topics ?? [],
        desc: e.description ?? '',
    }))
    .orderBy('similarity_score', 'DESC')
    .limit(100)