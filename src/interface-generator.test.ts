import { describe, it, expect } from 'bun:test';
import { serializeSchema, generateInterface } from './interface-generator';

// Helper to compare TS output strings, ignoring whitespace and semicolons, and comments
const compareTsOutput = (str1: string, str2: string): boolean => {
    const normalize = (s: string) => s.replace(/\/\/.*$/gm, '').replace(/[;\s]+/g, '');
    return normalize(str1) === normalize(str2);
};

describe('SQL Schema to TypeScript Interface', () => {

    // --- Test serializeSchema ---
    describe('serializeSchema', () => {
        it('should serialize basic types', () => {
            const stmt = `CREATE TABLE basic(col_int INT, col_vc VARCHAR, col_bool BOOLEAN)`;
            const expected = {
                col_int: 'DNumeric',
                col_vc: 'DVarchar',
                col_bool: 'DBool'
            };
            expect(serializeSchema(stmt)).toEqual(expected);
        });

        it('should serialize standard JSON type', () => {
            const stmt = `CREATE TABLE data(payload JSON, timestamp TIMESTAMP, id UUID)`;
            const expected = {
                payload: { __type: 'json' as const }, // Expect the intermediate marker
                timestamp: 'DDate', // Assuming TIMESTAMP maps to DDate
                id: 'DOther'      // Assuming UUID maps to DOther
            };
            expect(serializeSchema(stmt)).toEqual(expected);
        });

        it('should serialize arrays with intermediate marker', () => {
            const stmt = `CREATE TABLE arrays(int_arr INT[], vc_arr VARCHAR[], list_arr LIST(DOUBLE))`;
            const expected = {
                int_arr: { __type: 'array' as const, elementType: 'DNumeric' },
                vc_arr: { __type: 'array' as const, elementType: 'DVarchar' },
                list_arr: { __type: 'array' as const, elementType: 'DNumeric' }
            };
            expect(serializeSchema(stmt)).toEqual(expected);
        });

        it('should serialize STRUCT types with marker', () => {
            const stmt = `CREATE TABLE structs(user STRUCT(id INT, name VARCHAR), settings STRUCT(theme VARCHAR, notify BOOLEAN))`;
            const expected = {
                user: {
                    __type: 'struct' as const, // Use 'as const' for literal type
                    id: 'DNumeric',
                    name: 'DVarchar'
                },
                settings: {
                    __type: 'struct' as const, // Use 'as const' for literal type
                    theme: 'DVarchar',
                    notify: 'DBool'
                }
            };
            expect(serializeSchema(stmt)).toEqual(expected);
        });

        it('should serialize nested STRUCT types', () => {
            const stmt = `CREATE TABLE nested(data STRUCT(a INT, b STRUCT(c VARCHAR, d DATE)))`;
            const expected = {
                data: {
                    __type: 'struct' as const, // Use 'as const' for literal type
                    a: 'DNumeric',
                    b: {
                        __type: 'struct' as const, // Use 'as const' for literal type
                        c: 'DVarchar',
                        d: 'DDate'
                    }
                }
            };
            expect(serializeSchema(stmt)).toEqual(expected);
        });

        it('should serialize arrays of STRUCTs with intermediate marker', () => {
            const stmt = `CREATE TABLE struct_arrays(items STRUCT(sku VARCHAR, qty INT)[], logs LIST(STRUCT(ts TIMESTAMP, msg TEXT)))`;
            const expected = {
                items: {
                    __type: 'array' as const,
                    elementType: {
                        __type: 'struct' as const,
                        sku: 'DVarchar',
                        qty: 'DNumeric'
                    }
                },
                logs: {
                     __type: 'array' as const,
                     elementType: {
                         __type: 'struct' as const,
                         ts: 'DDate',
                         msg: 'DVarchar'
                     }
                }
            };
            expect(serializeSchema(stmt)).toEqual(expected);
        });

         it('should serialize quoted identifiers correctly', () => {
            const stmt = `CREATE TABLE "Quoted Table"("col 1" INT, "type" VARCHAR, "with-hyphen" BOOLEAN)`;
            const expected = {
                'col 1': 'DNumeric', // Keys are cleaned
                'type': 'DVarchar',
                'with-hyphen': 'DBool'
            };
            expect(serializeSchema(stmt)).toEqual(expected);
        });

        it('should handle the original complex dirigeants statement with array markers', () => {
             const stmt = `CREATE TABLE dirigeants(dateCreation DATE, codeJuridique VARCHAR, formeJuridique VARCHAR, zipCode VARCHAR, cc VARCHAR, locations VARCHAR[], city VARCHAR, denomination VARCHAR, codeApe VARCHAR, siren VARCHAR, street VARCHAR, sirets VARCHAR[], activities VARCHAR[], ownerCount BIGINT, owners STRUCT(roleEntreprise VARCHAR, typeDePersonne VARCHAR, representantId UUID, qualiteArtisan VARCHAR, "type" VARCHAR, dateDeNaissance VARCHAR, "role" VARCHAR, nom VARCHAR, prenoms VARCHAR[], genre VARCHAR, nationalite VARCHAR, codeNationalite VARCHAR, situationMatrimoniale VARCHAR, pays VARCHAR, codePays VARCHAR, codePostal VARCHAR, commune VARCHAR, codeInseeCommune VARCHAR, rolename VARCHAR, nomUsage VARCHAR, secondRoleEntreprise VARCHAR, libelleSecondRoleEntreprise VARCHAR, dateEffetRoleDeclarant DATE)[], primarySiret VARCHAR, enseigne VARCHAR);`;
             const result = serializeSchema(stmt);
             expect(result.dateCreation).toBe('DDate');
             expect(result.locations).toEqual({ __type: 'array' as const, elementType: 'DVarchar' });
             expect(result.sirets).toEqual({ __type: 'array' as const, elementType: 'DVarchar' });
             expect(result.activities).toEqual({ __type: 'array' as const, elementType: 'DVarchar' });
             expect(result.ownerCount).toBe('DNumeric');
             expect(result.owners).toEqual({
                 __type: 'array' as const,
                 elementType: {
                     __type: 'struct' as const,
                     roleEntreprise: 'DVarchar',
                     typeDePersonne: 'DVarchar',
                     representantId: 'DOther',
                     qualiteArtisan: 'DVarchar',
                     type: 'DVarchar', // Quoted keyword cleaned
                     dateDeNaissance: 'DVarchar',
                     role: 'DVarchar', // Quoted keyword cleaned
                     nom: 'DVarchar',
                     prenoms: { __type: 'array' as const, elementType: 'DVarchar' }, // Nested array
                     genre: 'DVarchar',
                     nationalite: 'DVarchar',
                     codeNationalite: 'DVarchar',
                     situationMatrimoniale: 'DVarchar',
                     pays: 'DVarchar',
                     codePays: 'DVarchar',
                     codePostal: 'DVarchar',
                     commune: 'DVarchar',
                     codeInseeCommune: 'DVarchar',
                     rolename: 'DVarchar',
                     nomUsage: 'DVarchar',
                     secondRoleEntreprise: 'DVarchar',
                     libelleSecondRoleEntreprise: 'DVarchar',
                     dateEffetRoleDeclarant: 'DDate'
                 }
             });
             expect(result.enseigne).toBe('DVarchar');
        });

        it('should return empty object for empty table definition', () => {
            const stmt = `CREATE TABLE empty()`;
            expect(serializeSchema(stmt)).toEqual({});
        });

        it('should throw error for invalid statement', () => {
             const stmt = `SELECT * FROM table`;
             expect(() => serializeSchema(stmt)).toThrow();
        });

        it('should serialize JSON with inline structure', () => {
            const stmt = `CREATE TABLE config(settings JSON(theme VARCHAR, notifications BOOLEAN))`;
            const expected = {
                settings: {
                    __type: 'json' as const,
                    theme: 'DVarchar',
                    notifications: 'DBool'
                }
            };
            expect(serializeSchema(stmt)).toEqual(expected);
        });

        it('should serialize nested JSON/STRUCT within JSON', () => {
             const stmt = `CREATE TABLE complex_json(data JSON(a INT, b STRUCT(c VARCHAR), d JSON(e BOOLEAN)))`;
             const expected = {
                 data: {
                     __type: 'json' as const,
                     a: 'DNumeric',
                     b: { __type: 'struct' as const, c: 'DVarchar' },
                     d: { __type: 'json' as const, e: 'DBool' }
                 }
             };
             expect(serializeSchema(stmt)).toEqual(expected);
        });
    });

    // --- Test generateInterface ---
    describe('generateInterface', () => {
        it('should generate TS for basic schema structure', () => {
            const input = {
                "": { // Resource key
                    "users": { // Table name
                        id: 'DNumeric',
                        name: 'DVarchar'
                    }
                }
            };
            const expected = `
import * as t from "./types";
export interface Models {
    [""]: {
        ["users"]: {
            ["id"]: t.DNumericField; // Reverted
            ["name"]: t.DVarcharField; // Reverted
        };
    };
}`;
            expect(compareTsOutput(generateInterface(input), expected)).toBe(true);
        });

        it('should generate TS for schema with struct', () => {
            const input = {
                 "data/source.db": {
                     "orders": {
                         order_id: 'DOther',
                         customer: {
                             __type: 'struct',
                             name: 'DVarchar',
                             address: {
                                 __type: 'struct',
                                 street: 'DVarchar',
                                 city: 'DVarchar'
                             }
                         },
                         total: 'DNumeric'
                     }
                 }
            };
            const expected = `
import * as t from "./types";
export interface Models {
    ["data/source.db"]: {
        ["orders"]: {
            ["order_id"]: t.DOtherField; // Reverted
            ["customer"]: t.DStructField<{
                ["name"]: t.DVarcharField; // Reverted
                ["address"]: t.DStructField<{
                    ["street"]: t.DVarcharField; // Reverted
                    ["city"]: t.DVarcharField; // Reverted
                }>;
            }>;
            ["total"]: t.DNumericField; // Reverted
        };
    };
}`;
            expect(compareTsOutput(generateInterface(input), expected)).toBe(true);
        });

        it('should generate TS for standard json type marker', () => {
            const input = {
                "": {
                    "configs": {
                        id: 'DNumeric',
                        settings: { __type: 'json' } // Standard JSON, no fields
                    }
                }
            };
            const expected = `
import * as t from "./types";
export interface Models {
    [""]: {
        ["configs"]: {
            ["id"]: t.DNumericField;
            ["settings"]: t.DJsonField; // Expect DJsonField
        };
    };
}`;
            expect(compareTsOutput(generateInterface(input), expected)).toBe(true);
        });

        it('should generate TS for json with inline structure', () => {
             const input = {
                 "": {
                     "app_settings": {
                         config: {
                             __type: 'json',
                             theme: 'DVarchar',
                             featureFlags: {
                                 __type: 'json', // Nested JSON
                                 newUI: 'DBool'
                             }
                         }
                     }
                 }
             };
             const expected = `
import * as t from "./types";
export interface Models {
    [""]: {
        ["app_settings"]: {
            ["config"]: t.DJsonField<{
                ["theme"]: t.DVarcharField;
                ["featureFlags"]: t.DJsonField<{ // Nested generic
                    ["newUI"]: t.DBoolField;
                }>;
            }>;
        };
    };
}`;
             expect(compareTsOutput(generateInterface(input), expected)).toBe(true);
        });

         it('should generate TS for schema with arrays and standard JSON', () => {
             const input = {
                 "": {
                     "products": {
                         sku: 'DVarchar',
                         tags: { __type: 'array', elementType: 'DVarchar' },
                         ratings: { __type: 'array', elementType: 'DNumeric' },
                         config: { __type: 'json' }
                     }
                 }
             };
             const expected = `
import * as t from "./types";
export interface Models {
    [""]: {
        ["products"]: {
            ["sku"]: t.DVarcharField;
            ["tags"]: t.DArrayField<t.DVarcharField>;
            ["ratings"]: t.DArrayField<t.DNumericField>;
            ["config"]: t.DJsonField;
        };
    };
}`;
             expect(compareTsOutput(generateInterface(input), expected)).toBe(true);
         });

         it('should handle multiple tables and resources with complex types', () => {
             const input = {
                 "db1": {
                     "users": { id: 'DNumeric', name: 'DVarchar', roles: { __type: 'array', elementType: 'DVarchar'} },
                     "products": { sku: 'DVarchar', price: 'DNumeric', details: { __type: 'json', weight: 'DNumeric', dims: { __type: 'array', elementType: 'DNumeric'} } }
                 },
                 "s3://bucket/data.parquet": {
                     "logs": { timestamp: 'DDate', message: 'DVarchar', context: { __type: 'json'} }
                 }
             };
             const expected = `
import * as t from "./types";
export interface Models {
    ["db1"]: {
        ["users"]: {
            ["id"]: t.DNumericField;
            ["name"]: t.DVarcharField;
            ["roles"]: t.DArrayField<t.DVarcharField>;
        };
        ["products"]: {
            ["sku"]: t.DVarcharField;
            ["price"]: t.DNumericField;
            ["details"]: t.DJsonField<{
                ["weight"]: t.DNumericField;
                ["dims"]: t.DArrayField<t.DNumericField>;
            }>;
        };
    };
    ["s3://bucket/data.parquet"]: {
        ["logs"]: {
            ["timestamp"]: t.DDateField;
            ["message"]: t.DVarcharField;
            ["context"]: t.DJsonField;
        };
    };
}`;
             expect(compareTsOutput(generateInterface(input), expected)).toBe(true);
         });

         it('should generate TS for empty input', () => {
             const input = {};
             const expected = `
import * as t from "./types";
export interface Models {
}`;
             expect(compareTsOutput(generateInterface(input), expected)).toBe(true);
         });
    });
});
