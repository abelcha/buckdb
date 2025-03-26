import { DuckDBInstance, DOUBLE, VARCHAR } from '@duckdb/node-api';
import { camelCase, countBy, maxBy, omitBy, uniq, uniqBy } from 'es-toolkit';
import { every } from 'es-toolkit/compat';
// console.log({DOUBLE, VARCHAR})
const instance = await DuckDBInstance.create();
const connection = await instance.connect();
const res = await connection.runAndReadAll(`SUMMARIZE SELECT * FROM duckdb_functions();`);

const mapTypes = (type: string) => {
    if (type.match(/\b((U)?(BIG|HUGE|TINY|SMALL)?INT(EGER)?|DOUBLE|DECIMAL|FLOAT)\b/)) {
        return 'DNUMERIC';
    }
    if (type.match(/^(VARCHAR|CHAR|TEXT)$/)) {
        return 'DVARCHAR';
    }
    if (type.endsWith('[]') || type === 'LIST' || type === 'ARRAY') {
        return 'DARRAY';
    }
    if (type.startsWith('STRUCT')) {
        return 'DSTRUCT';
    }
    if (type.startsWith('JSON')) {
        return 'DJSON';
    }
    if (type.startsWith('BOOLEAN')) {
        return 'DBOOL';
    }
    if (type.startsWith('MAP')) {
        return 'DMAP';
    }
    return 'DOTHER';
}


res.getRowObjectsJson().forEach((row: any) => {
    console.log(row.column_type, mapTypes(row.column_type), row.column_name);
})
