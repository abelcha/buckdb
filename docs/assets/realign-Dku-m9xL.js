const e=`import { extractReconciledCalls } from "./extractor";
import { PolyfillMapping } from "./typedef";
// todo: crossJoin|copyTo->TO|polyfills|execute|trailing {}|trainling ()|with db => ({
const range = (n: number) => Array.from({ length: n }, (_, i) => i)
const tokenize = (str: string) => str.matchAll(/[a-zA-Z_-]{2,}/g).toArray().map(m => m[0].toLowerCase())

const freplace = (str: string) => (str || '')
    .replaceAll(/\\.(group|key)By/g, 'GROUP BY')
    .replaceAll(/\\.(min|max|order)By/g, 'ORDER BY')
    .replaceAll(/\\.([a-z]+)Join/g, (_, e) => e.toUpperCase() + ' JOIN')
    .replaceAll(/\\.sample/g, 'USING SAMPLE')
    // .replaceAll(/\\s\\?\\s/g, ' THEN ')
    .replaceAll(/\\.(\\w+)\\(/g, (e, a) => {
        if (a === 'join')
            return e
        const r = PolyfillMapping[a] || a
        if (r !== a) {
            // console.log('REPLACED', a, 'WITH', r)
        }
        return \`.\${r}(\` // replace all functions with their SQL equivalents
        return e
    })
    .replaceAll(/\\&\\&/g, 'AND')

export const alignExpressionWithSql = (expression: string, sql: string) => {
    const console = globalThis?.process?.env?.LOG ? globalThis.console : { log: () => { }, info: () => { }, table: () => { }, group: () => { }, groupEnd: () => { } }
    const expressionLines = expression
        .replace(/\\s\\/\\/.+/g, '')
        // .replace(/\\s\\(?\\w+\\)?\\s*\\=\\>\\s*\\(\\{/, ' ')
        .replaceAll(/\\n/g, '↩︎').matchAll(/(↩︎\\s*)([^↩︎]*)/g).toArray()
        .map(m => [m[1] as string, tokenize(freplace(m[2])), m[2]])
    const sqlTokens = sql.split(/\\s+/)
    // console.log({expression,sqlTokens})

    let offset = 0
    let zPrefix = 0
    let prevLinePrefix = ''

    const result: string[] = []
    // console.log()
    console.log('expressionLines:')
    console.table(expressionLines)
    console.log('sqlTokens:')
    console.table(sqlTokens)
    if (!expressionLines.length) {
        return sqlTokens.join(' ')
    }
    for (const [linePrefix, tokens, fullExp] of expressionLines) {
        // console.log({ tokens })
        // if (!tokens[0]) continue
        console.log('FOR EVERY expressionLines', [linePrefix, tokens, fullExp])
        let found = false
        if (tokens.length > 0) {
            for (let i = offset; i < sqlTokens.length; i++) {
                // console.log('LOOKUP MATCHES', )
                // console.group()
                // console.group('SUB sqlTokens', i, 'tokens[0]:', (tokens)[0], 'token:', sqlTokens[i]);
                const sqlTokenTokenized = tokenize(sqlTokens[i])
                // console.group()
                // console.group()
                // console.group()
                console.log(i, 'sqlTokenTokenized', sqlTokenTokenized)
                // console.groupEnd()
                // console.groupEnd()
                // console.groupEnd()
                // console.groupEnd()
                console.log('\\n============= COMPARE', sqlTokenTokenized[0], '\\t', tokens[0], '\\n')
                if (sqlTokenTokenized[0] === tokens[0]) {
                    console.info('                --> MATCH FOUND', offset, i, sqlTokenTokenized);
                    const matchedSql = sqlTokens.slice(Math.max(offset - 1, 0), i).join(' ')
                    if (matchedSql) {
                        // console.log('Matched SQL:', matchedSql)
                        console.log('                  --> PUSHING', [prevLinePrefix, matchedSql])
                        result.push(prevLinePrefix + matchedSql)
                        range(zPrefix).forEach(() => result.push(''))
                        prevLinePrefix = String(linePrefix || '').replace('↩︎', '')

                    }
                    offset = i + 1
                    zPrefix = 0
                    // console.groupEnd()
                    // console.groupEnd()
                    // console.groupEnd()
                    // i++
                    found = true
                    break
                }
                // console.groupEnd()
                // console.groupEnd()
            }
            if (!found) {
                zPrefix++
            }
            // console.log({ found })
        } else {
            // console.log('yyyyyyyya')
            zPrefix++
        }

        // console.groupEnd()
    }

    if (offset < sqlTokens.length) {
        // const offsetPrefix = 
        const rest = sqlTokens.slice(offset - 1).join(' ')
        result.push(prevLinePrefix + rest)
    }

    return result
        .join('\\n')
        // .replace(/^([A-Z\\s]+\\:?)\\n(\\s*)([\\(\\{]+)/img, '$1 $3\\n$2')
}


`;export{e as default};
