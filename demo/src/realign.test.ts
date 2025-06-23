

import { expect, it } from 'bun:test';
import { alignExpressionWithSql } from './realign';
import { dumpSideBySide } from './dump-compare';


const expectAlignment = (sqlized: string, expression: string, expected: string) => {
    sqlized = sqlized.trim();
    expression = expression.trim();
    expected = expected.trim();
    const aligned = alignExpressionWithSql(expression, sqlized).trim();
    // dumpSideBySideideBySide(expression, aligned);
    // dumpSideBySide(expression, expected, aligned)
    if (aligned !== expected) {
        console.log('###########')
        dumpSideBySide(expression, expected, aligned)
    }
    expect(aligned.split('\n')).toEqual(expected.split('\n'));
}

it('fsimrep', () =>
    expectAlignment(`
WITH  repo_pairs AS (FROM 'file:///Volumes/dev/fsimrep/starbase/*.parquet' AS a
 JOIN 'file:///Volumes/dev/fsimrep/starlite.parquet' AS r1 USING (repo)
 JOIN 'file:///Volumes/dev/fsimrep/starbase/*.parquet' AS b ON (a.login = b.login AND a.repo is distinct from b.repo)
 JOIN 'file:///Volumes/dev/fsimrep/starlite.parquet' AS r2 ON (b.repo = r2.repo)
 SELECT 
 
	login:       a.login,
	date:        a.date,
	repo_a:      a.repo,
	repo_b:      b.repo,
	repo_a_stars: r1.c,
	repo_b_stars: r2.c
 WHERE (a.repo = 'uwdata/mosaic')),  similarity_metrics AS (FROM repo_pairs
 SELECT 
 
	repo_a:              repo_a,
	repo_b:              repo_b,
	common_users:        count(Distinct(login)),
	total_stars:         repo_b_stars,
	earliest_common_star: min(date),
	latest_common_star:  max(date),
	jaccard_similarity:  count(Distinct(login)) / COALESCE(repo_b_stars, NULL)
 GROUP BY (repo_a, repo_b, repo_b_stars)
 HAVING (count(Distinct(login)) >= 5)),  results AS (FROM similarity_metrics
 SELECT 
 *,
	full_name:       repo_b,
	similarity_score: jaccard_similarity.round(3)
 WHERE (jaccard_similarity > 0)
 ORDER BY jaccard_similarity DESC) FROM results LEFT JOIN 'file:///Volumes/dev/fsimrep/repos.parquet' AS x USING (full_name) SELECT   full_name:       ('https://github.com/' || full_name), similarity_score: results.similarity_score.round(3), common_users:    common_users, total_stars:     stargazers_count, desc:            COALESCE(description, ''), topics:          COALESCE(topics, []) ORDER BY similarity_score DESC LIMIT 100`, `
Buck('file:///Volumes/dev/fsimrep').with(
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
            .where(({ a }) => a.repo === 'uwdata/mosaic')
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
        full_name: 'https://github.com/' + e.full_name,
        similarity_score: e.results.similarity_score.round(3),
        common_users: e.common_users,
        total_stars: e.stargazers_count,
        desc: e.description ?? '',
        topics: e.topics ?? [],
    }))
    .orderBy('similarity_score', 'DESC')
    .limit(100)`, `
WITH

        repo_pairs AS (FROM 'file:///Volumes/dev/fsimrep/starbase/*.parquet' AS a
            JOIN 'file:///Volumes/dev/fsimrep/starlite.parquet' AS r1 USING (repo)
            JOIN 'file:///Volumes/dev/fsimrep/starbase/*.parquet' AS b ON (a.login = b.login AND a.repo is distinct from b.repo)
            JOIN 'file:///Volumes/dev/fsimrep/starlite.parquet' AS r2 ON (b.repo = r2.repo)
            SELECT
                login: a.login,
                date: a.date,
                repo_a: a.repo,
                repo_b: b.repo,
                repo_a_stars: r1.c,
                repo_b_stars: r2.c

            WHERE (a.repo = 'uwdata/mosaic')),


        similarity_metrics AS (FROM repo_pairs
            SELECT
                repo_a: repo_a,
                repo_b: repo_b,
                common_users: count(Distinct(login)),
                total_stars: repo_b_stars,
                earliest_common_star: min(date),
                latest_common_star: max(date),
                jaccard_similarity: count(Distinct(login)) / COALESCE(repo_b_stars, NULL)

            GROUP BY (repo_a, repo_b, repo_b_stars)
            HAVING (count(Distinct(login)) >= 5)),


        results AS (FROM similarity_metrics
            SELECT *,

                full_name: repo_b,
                similarity_score: jaccard_similarity.round(3)

            WHERE (jaccard_similarity > 0)
            ORDER BY jaccard_similarity DESC)



    FROM results
    LEFT JOIN 'file:///Volumes/dev/fsimrep/repos.parquet' AS x USING (full_name)
    SELECT
        full_name: ('https://github.com/' || full_name),
        similarity_score: results.similarity_score.round(3),
        common_users: common_users,
        total_stars: stargazers_count,
        desc: COALESCE(description, ''),
        topics: COALESCE(topics, [])

    ORDER BY similarity_score DESC
    LIMIT 100`))
// ====================

it('realign 01-getting-started.ts #0', () =>
    expectAlignment(`
FROM Stations SELECT  *`, `
Buck('s3://a1738/files').from('Stations')`, `
FROM Stations SELECT *`))
// ====================
it('42', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT  * WHERE (function_name LIKE '%str%' AND function_name.len() BETWEEN 3 AND 12 AND description IS NOT NULL)`, `
Buck().from('duckdb_functions()')
    .select()
    .where(e =>
        e.function_name.Like('%str%') &&
        e.function_name.len().Between(3, 12) &&
        !e.description.IsNull()
    )
    `, `
FROM duckdb_functions()
    SELECT *
    WHERE
        (function_name LIKE '%str%' AND
        function_name.len() BETWEEN 3 AND 12 AND
        description IS NOT NULL)`))
// ====================
// it('s0', () => )

// it('s1', () =>
//     expectAlignment(`
// FROM duckdb_functions() SELECT   function_name: function_name, function_type: function_type`, `
// Buck().from('duckdb_functions()')
//     .select(e => ({
//         function_name: e.function_name,

//         function_type: e.function_type,
//     }))
//     `, `
// FROM duckdb_functions()
//     SELECT
//         function_name: function_name,

//         function_type: function_type
// `))

// it('s2', () =>
//     expectAlignment(`
// FROM duckdb_functions() SELECT   function_name: nnn.xxx(), function_type: function_type`, `
// Buck().from('duckdb_functions()')
//     .select(e => ({
//         function_name: e.function_name,
//     // toto
//         function_type: e.function_type,
//     }))
//     `, `
// FROM duckdb_functions()
//     SELECT
//         function_name: nnn.xxx(),

//         function_type: function_type
// `))


// it('realign 01-getting-started.ts #[0]', () =>
//     expectAlignment(`
// FROM duckdb_functions() SELECT   function_name: function_name, function_type: function_type`, `
// Buck().from('duckdb_functions()')
//     .select(e => ({
//         function_name: e.function_name,
//         function_type: e.function_type,
//     }))
//     `, `
// FROM duckdb_functions()
//     SELECT
//         function_name: function_name,
//         function_type: function_type
// `))
// // ====================
// it('realign 01-getting-started.ts #[1]', () =>
//     expectAlignment(`
// FROM duckdb_functions() SELECT   function_name: function_name, function_type: function_type, name_length:  function_name.len() WHERE (function_name LIKE '%sum%' AND function_name.len() BETWEEN 3 AND 15)`, `
// Buck().from('duckdb_functions()')
//     .select(e => ({
//         function_name: e.function_name,
//         function_type: e.function_type,
//         name_length: e.function_name.len(),
//     }))
//     .where(e => e.function_name.Like('%sum%') && e.function_name.len().Between(3, 15))
//     `, `
// FROM duckdb_functions()
//     SELECT
//         function_name: function_name,
//         function_type: function_type,
//         name_length: function_name.len()

//     WHERE (function_name LIKE '%sum%' AND function_name.len() BETWEEN 3 AND 15)
// `))
// // ====================
// it('realign 01-getting-started.ts #[2]', () =>
//     expectAlignment(`
// FROM duckdb_functions() SELECT   function_name, function_type, function_name.len() WHERE (description IS NOT NULL) LIMIT 5`, `
// Buck().from('duckdb_functions()')
//     .select(e => [e.function_name, e.function_type, e.function_name.len()])
//     .where(e => !e.description.IsNull())
//     .limit(5)
//     `, `
// FROM duckdb_functions()
//     SELECT function_name, function_type, function_name.len()
//     WHERE (description IS NOT NULL)
//     LIMIT 5
// `))
// // ====================
// it('realign 01-getting-started.ts #[3]', () =>
//     expectAlignment(`
// FROM duckdb_functions() SELECT   function_name: function_name WHERE (function_name LIKE '%array%') LIMIT 3`, `
// Buck().from('duckdb_functions()')
//     .select(e => ({
//         function_name: e.function_name,
//     }))
//     .where("function_name LIKE '%array%'")
//     .limit(3)
//     `, `
// FROM duckdb_functions()
//     SELECT
//         function_name: function_name

//     WHERE (function_name LIKE '%array%')
//     LIMIT 3
// `))
// ====================
it('realign 01-getting-started.ts #4', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   original:     function_name, upper_name:   function_name.upper(), name_length:  function_name.len(), prefix_3:     function_name[0:3], suffix_3:     function_name[-3], starts_with_a: function_name.starts_with('a') WHERE (function_name.len() < 10) LIMIT 5`, `
Buck().from('duckdb_functions()')
    .select(e => ({
        original: e.function_name,
        upper_name: e.function_name.upper(),
        name_length: e.function_name.len(),
        prefix_3: e.function_name[0.3],
        suffix_3: e.function_name[-3],
        starts_with_a: e.function_name.starts_with('a')
    }))
    .where(e => e.function_name.len() < 10)
    .limit(5)
    `, `
FROM duckdb_functions()
    SELECT
        original: function_name,
        upper_name: function_name.upper(),
        name_length: function_name.len(),
        prefix_3: function_name[0:3],
        suffix_3: function_name[-3],
        starts_with_a: function_name.starts_with('a')

    WHERE (function_name.len() < 10)
    LIMIT 5`))
// ====================
it('realign 01-getting-started.ts #5', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   function_count: count(), shortest_name:  min(function_name), avg_name_length: avg(function_name.len()) GROUP BY function_type`, `
Buck().from('duckdb_functions()')
    .select((e, D) => ({
        function_count: D.count(),
        shortest_name: D.min(e.function_name),
        avg_name_length: D.avg(e.function_name.len()),
    }))
    .groupBy('function_type')
    `, `
FROM duckdb_functions()
    SELECT
        function_count: count(),
        shortest_name: min(function_name),
        avg_name_length: avg(function_name.len())

    GROUP BY function_type`))
// ====================
it('realign 01-getting-started.ts #6', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   function_name: function_name, function_type: function_type, name_length:  function_name.len() ORDER BY function_name.len() ASC LIMIT 1`, `
Buck().from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        function_type: e.function_type,
        name_length: e.function_name.len(),
    }))
    .minBy(e => e.function_name.len())
    `, `
FROM duckdb_functions()
    SELECT
        function_name: function_name,
        function_type: function_type,
        name_length: function_name.len()

    ORDER BY function_name.len() ASC LIMIT 1`))
// ====================
it('realign 01-getting-started.ts #7', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   function_name: function_name, function_type: function_type WHERE (function_type = 'scalar') USING SAMPLE 10 LIMIT 3`, `
Buck().from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        function_type: e.function_type,
    }))
    .where(e => e.function_type === 'scalar')
    .sample(10)
    .limit(3)
    `, `
FROM duckdb_functions()
    SELECT
        function_name: function_name,
        function_type: function_type

    WHERE (function_type = 'scalar')
    USING SAMPLE 10
    LIMIT 3`))
// ====================
it('realign 01-getting-started.ts #8', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   function_name:  function_name, name_length:    function_name.len(), length_squared: function_name.len() * function_name.len(), length_plus_ten: function_name.len() + 10, length_mod_3:   function_name.len() % 3 WHERE (function_name.len() BETWEEN 5 AND 15) LIMIT 5`, `
Buck().from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        name_length: e.function_name.len(),
        length_squared: e.function_name.len() * e.function_name.len(),
        length_plus_ten: e.function_name.len() + 10,
        length_mod_3: e.function_name.len() % 3,
    }))
    .where(e => e.function_name.len().Between(5, 15))
    .limit(5)
    `, `
FROM duckdb_functions()
    SELECT
        function_name: function_name,
        name_length: function_name.len(),
        length_squared: function_name.len() * function_name.len(),
        length_plus_ten: function_name.len() + 10,
        length_mod_3: function_name.len() % 3

    WHERE (function_name.len() BETWEEN 5 AND 15)
    LIMIT 5`))
// ====================
it('realign 01-getting-started.ts #9', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   function_name: function_name, category:     (CASE WHEN (function_type = 'scalar') THEN 'SCALAR_FUNC' ELSE 'OTHER_FUNC' END), size_category: (CASE WHEN (function_name.len() > 10) THEN 'LONG' ELSE (CASE WHEN (function_name.len() > 5) THEN 'MEDIUM' ELSE 'SHORT' END) END), mixed_result: (CASE WHEN (function_name = 'sum') THEN 42 ELSE function_name END) LIMIT 5`, `
Buck().from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        category: e.function_type === 'scalar' ? 'SCALAR_FUNC' : 'OTHER_FUNC',
        size_category: e.function_name.len() > 10 ? 'LONG' :
            e.function_name.len() > 5 ? 'MEDIUM' : 'SHORT',
        mixed_result: e.function_name === 'sum' ? 42 : e.function_name,
    }))
    .limit(5)
    `, `
FROM duckdb_functions()
    SELECT
        function_name: function_name,
        category: (CASE WHEN (function_type = 'scalar') THEN 'SCALAR_FUNC' ELSE 'OTHER_FUNC' END),
        size_category: (CASE WHEN
            (function_name.len() > 10) THEN 'LONG' ELSE (CASE WHEN (function_name.len() > 5) THEN 'MEDIUM' ELSE 'SHORT' END) END),
        mixed_result: (CASE WHEN (function_name = 'sum') THEN 42 ELSE function_name END)

    LIMIT 5`))
// ====================
it('realign 01-getting-started.ts #10', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   metadata: {name: function_name, type: function_type, analysis: {length: function_name.len(), category: (CASE WHEN (function_name.len() > 10) THEN 'long' ELSE 'short' END), first_char: function_name[0:1]}} WHERE (function_type = 'scalar') LIMIT 3`, `
Buck().from('duckdb_functions()')
    .select(e => ({
        metadata: {
            name: e.function_name,
            type: e.function_type,
            analysis: {
                length: e.function_name.len(),
                category: e.function_name.len() > 10 ? 'long' : 'short',
                first_char: e.function_name[0.1],
            },
        },
    }))
    .where(e => e.function_type === 'scalar')
    .limit(3)
    `, `
FROM duckdb_functions()
    SELECT
        metadata:
            {name: function_name,
            type: function_type,
            analysis:
                {length: function_name.len(),
                category: (CASE WHEN (function_name.len() > 10) THEN 'long' ELSE 'short' END),
                first_char: function_name[0:1]}}



    WHERE (function_type = 'scalar')
    LIMIT 3`))
// ====================
it('realign 01-getting-started.ts #11', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   function_name: function_name, name_length:  function_name.len(), function_type: function_type WHERE (function_name LIKE '%str%' AND function_name.len() BETWEEN 3 AND 12 AND description IS NOT NULL)`, `
Buck().from('duckdb_functions()')
    .select(e => ({
        function_name: e.function_name,
        name_length: e.function_name.len(),
        function_type: e.function_type,
    }))
    .where(e =>
        e.function_name.Like('%str%') &&
        e.function_name.len().Between(3, 12) &&
        !e.description.IsNull()
    )
    `, `
FROM duckdb_functions()
    SELECT
        function_name: function_name,
        name_length: function_name.len(),
        function_type: function_type

    WHERE
        (function_name LIKE '%str%' AND
        function_name.len() BETWEEN 3 AND 12 AND
        description IS NOT NULL)`))
// ====================
it('realign 01-getting-started.ts #12', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   description:  ('Function "' || function_name || '" is of type ' || function_type), simple_concat: (function_name || '_func'), detailed_info: ('Name: ' || function_name || ', Length: ' || function_name.len()) WHERE (function_type = 'scalar') LIMIT 3`, `
Buck().from('duckdb_functions()')
        .select(e => ({
            // Template literal style
            description: \`Function "\${e.function_name}" is of type \${e.function_type}\`,

            // Plus operator concatenation
            simple_concat: e.function_name + '_func',

            // Mixed operations
            detailed_info: 'Name: ' + e.function_name + ', Length: ' + e.function_name.len(),
        }))
        .where(e => e.function_type === 'scalar')
        .limit(3)
        `, `
FROM duckdb_functions()
        SELECT

            description: ('Function "' || function_name || '" is of type ' || function_type),


            simple_concat: (function_name || '_func'),


            detailed_info: ('Name: ' || function_name || ', Length: ' || function_name.len())

        WHERE (function_type = 'scalar')
        LIMIT 3`))
// ====================
it('realign 01-getting-started.ts #13', () =>
    expectAlignment(`
FROM duckdb_functions() SELECT   function_type:  function_type, total_functions: count(), function_names: array_agg(function_name), avg_name_length: avg(function_name.len()), longest_name:   max(function_name), shortest_name:  min(function_name) GROUP BY function_type`, `
Buck().from('duckdb_functions()')
    .select((e, D) => ({
        function_type: e.function_type,
        total_functions: D.count(),
        function_names: D.array_agg(e.function_name),
        avg_name_length: D.avg(e.function_name.len()),
        longest_name: D.max(e.function_name),
        shortest_name: D.min(e.function_name),
    }))
    .groupBy('function_type')
    `, `
FROM duckdb_functions()
    SELECT
        function_type: function_type,
        total_functions: count(),
        function_names: array_agg(function_name),
        avg_name_length: avg(function_name.len()),
        longest_name: max(function_name),
        shortest_name: min(function_name)

    GROUP BY function_type`))
// ====================
it('realign 01-getting-started.ts #14', () =>
    expectAlignment(`
FROM duckdb_functions() JOIN duckdb_types() AS types ON (true) SELECT   function_name: duckdb_functions.function_name, type_name:    types.logical_type, combination:  (duckdb_functions.function_name || '_' || types.logical_type) WHERE (duckdb_functions.function_type = 'scalar' AND types.logical_type LIKE '%INT%') LIMIT 5`, `
Buck().from('duckdb_functions()')
    .join('duckdb_types()', 'types').on((a, b) => true) // Cross join
    .select(e => ({
        function_name: e.duckdb_functions.function_name,
        type_name: e.types.logical_type,
        combination: e.duckdb_functions.function_name + '_' + e.types.logical_type,
    }))
    .where(e => e.duckdb_functions.function_type === 'scalar' && e.types.logical_type.Like('%INT%'))
    .limit(5)
    `, `
FROM duckdb_functions()
    JOIN duckdb_types() AS types ON (true)
    SELECT
        function_name: duckdb_functions.function_name,
        type_name: types.logical_type,
        combination: (duckdb_functions.function_name || '_' || types.logical_type)

    WHERE (duckdb_functions.function_type = 'scalar' AND types.logical_type LIKE '%INT%')
    LIMIT 5`))
// ====================
