import { isString } from "es-toolkit";
import { wrap } from "./utils";
import { DGlobalField, DVarcharField, DNumericField } from "./.buck/types";

export type Operation = {
    field?: string;
    method?: string;
    args: (string | number)[];
    chain?: Operation;
}

const mapArg = (arg: string | any) => {

    if (typeof arg === 'object' && Object.entries(arg).length) {
        return Object.entries(arg).map(([k, v]) => {
            return `${k} = ${mapArg(v)}`
        }).join(', ')

    }
    return isString(arg) ? wrap(arg, "'") : arg.toString()
}
export function opToString(operation: Operation, debug = false): string {
    const w = (s?: string, a?: string, b?: string) => {
        if (debug) {
            return wrap(s, a, b);
        }
        return s;
    }
    if (!operation.method) {
        return operation.field
    }
    const args = operation.args.map(mapArg).join(', ');


    if (operation.chain) {
        const zop = opToString(operation.chain)
        return `${zop ? zop + '.' : ''}${operation.method}(${args})`;
    }

    if (!operation.field) {
        return `${operation.method}(${args})`;
    }

    return `${operation.method}(${args})`;
}


export function makeProxy<T>(field?: string, chain?: Operation) {

    return new Proxy({}, {
        get(target, prop, receiver) {
            if (prop === 'toString' || prop === Symbol.toPrimitive) {
                if (!chain?.method) {
                    return () => field
                }
                if (!field) {
                    return () => opToString(chain)
                }
                return () => field + '.' + opToString(chain);
            }
            return (...args) => makeProxy(field, { field, method: String(prop), args, chain });
        },
    }) as unknown as T;
}


async function main() {
    const D = makeProxy() as unknown as DGlobalField;
    const p = {
        name: makeProxy('name') as unknown as DVarcharField,
        age: makeProxy('age') as unknown as DNumericField,
    }
    const { name, age } = p;
    const { add, subtract, lower, upper, levenshtein } = D;
}

if (import.meta.main) {
    main()
}