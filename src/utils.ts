
export const wrap = (value: string, charA: string, charB = charA): string => {
  if (value[0] === charA && value[value.length - 1] === charB) {
    return value;
  }
  return `${charA}${value}${charB}`;
}

export const formatSource = (source: string) => {
  return source?.match(/\.(parquet|csv|jsonl?|tsv)(\W(gz|zst|xz))?$/) ?
    wrap(source, "'") : source
}

export const upperFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const last = (arr: any[]) => {
  return arr[arr.length - 1];
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


export interface DuckDBClient {
  query<T = any>(sql: string, params?: Record<string, any>): Promise<T[]>;
  run(sql: string): Promise<any>;
  load(...extensions: string[]): any;
  dump(sql: string): void
  // close(): Promise<void>;
}

export const keyBy = <T extends object, K extends keyof T>(array: T[], key: K): Record<string, T> => {
  return array.reduce((acc, obj) => {
    const keyValue = obj[key];
    acc[keyValue as unknown as string] = obj;
    return acc;
  }, {} as Record<string, T>);
}

