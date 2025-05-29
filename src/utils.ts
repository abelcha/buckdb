
type StripSpecialChars<S> = S extends `${infer First}${infer Rest}` ? First extends AlphaNumeric ? `${First}${StripSpecialChars<Rest>}` : StripSpecialChars<Rest> : ''
export type DeriveName<Path> = Path extends `${infer _}/${infer Rest}` ? DeriveName<Rest> : Path extends `${infer Name}.${string}` ? StripSpecialChars<Name> : StripSpecialChars<Path>


type AlphaNumeric = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '_'
export const deriveName = <T extends string>(value: T): DeriveName<T> => {
    const result = value.split('/').pop()?.split('.').shift() || value
    return result.replace(/[^a-zA-Z0-9_]/g, '') as DeriveName<T>
}

export type Dict = Record<string, any>

export const wrap = (value: string, charA: string, charB = charA): string => {
    if (value[0] === charA && value[value.length - 1] === charB) {
        return value
    }
    return `${charA}${value}${charB}`
}

export const formatSource = ({ catalog = '', uri = '' }) => {
    if (!uri.trim().endsWith(')')) {
        if (isBucket(catalog) && uri.match(/^\w/) && !uri.includes('://')) {
            uri = catalog.replace(/\/*$/, '/' + uri)
        }
        if (uri.match(/\.\w{2,10}$/)) {
            uri = `'${uri}'`
        }
    }
    return uri
}

export const upperFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const last = (arr: any[]) => {
    return arr[arr.length - 1]
}

export const isPlainObject = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

export const Ω = (...values: any[]) => {
    const rtn: Record<string, any> = {}
    for (let i in values) {
        rtn[values[i]] = +i + 1
    }
    return rtn
}

export const keyBy = <T extends object, K extends keyof T>(array: T[], key: K): Record<string, T> => {
    return array.reduce((acc, obj) => {
        const keyValue = obj[key]
        acc[keyValue as unknown as string] = obj
        return acc
    }, {} as Record<string, T>)
}


export const isBucket = e => e?.match(/^s3\:\/\/[^\/]+\/?$/)