const e=`import * as t from "./types";
export interface Models {
    [""]: {
        [""]: {

        },
        ["duckdb_settings()"]: {
            ["name"]: t.DVarcharField;
            ["value"]: t.DVarcharField;
            ["description"]: t.DVarcharField;
            ["input_type"]: t.DVarcharField;
            ["scope"]: t.DVarcharField;
        };
        ["duckdb_functions()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DVarcharField;
            ["schema_name"]: t.DVarcharField;
            ["function_name"]: t.DVarcharField;
            ["alias_of"]: t.DVarcharField;
            ["function_type"]: t.DVarcharField;
            ["description"]: t.DVarcharField;
            ["comment"]: t.DVarcharField;
            ["tags"]: t.DMapField;
            ["return_type"]: t.DVarcharField;
            ["parameters"]: t.DArrayField<t.DVarcharField>;
            ["parameter_types"]: t.DArrayField<t.DVarcharField>;
            ["varargs"]: t.DVarcharField;
            ["macro_definition"]: t.DVarcharField;
            ["has_side_effects"]: t.DBoolField;
            ["internal"]: t.DBoolField;
            ["function_oid"]: t.DNumericField;
            ["examples"]: t.DArrayField<t.DVarcharField>;
            ["stability"]: t.DVarcharField;
            ["categories"]: t.DArrayField<t.DVarcharField>;
        };
        ["duckdb_types()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DNumericField;
            ["schema_name"]: t.DVarcharField;
            ["schema_oid"]: t.DNumericField;
            ["type_oid"]: t.DNumericField;
            ["type_name"]: t.DVarcharField;
            ["type_size"]: t.DNumericField;
            ["logical_type"]: t.DVarcharField;
            ["type_category"]: t.DVarcharField;
            ["comment"]: t.DVarcharField;
            ["tags"]: t.DMapField;
            ["internal"]: t.DBoolField;
            ["labels"]: t.DArrayField<t.DVarcharField>;
        };
        ["file:///datalake/prestige.csv"]: {
            ["id_address"]: t.DNumericField;
            ["id_country"]: t.DNumericField;
            ["id_state"]: t.DNumericField;
            ["id_customer"]: t.DNumericField;
            ["id_manufacturer"]: t.DNumericField;
            ["id_supplier"]: t.DNumericField;
            ["id_warehouse"]: t.DNumericField;
            ["alias"]: t.DVarcharField;
            ["company"]: t.DVarcharField;
            ["lastname"]: t.DVarcharField;
            ["firstname"]: t.DVarcharField;
            ["address1"]: t.DVarcharField;
            ["address2"]: t.DVarcharField;
            ["postcode"]: t.DVarcharField;
            ["city"]: t.DVarcharField;
            ["other"]: t.DVarcharField;
            ["phone"]: t.DVarcharField;
            ["phone_mobile"]: t.DVarcharField;
            ["vat_number"]: t.DVarcharField;
            ["dni"]: t.DVarcharField;
            ["date_add"]: t.DDateField;
            ["date_upd"]: t.DDateField;
            ["active"]: t.DNumericField;
            ["deleted"]: t.DNumericField;
            ["type"]: t.DNumericField;
        };
        ["/datalake/lamaisonducitron.com-france.csv"]: {
            ["ID"]: t.DVarcharField;
            ["Achet\\u00E9 sur"]: t.DVarcharField;
            ["Date d\\u2019achat"]: t.DVarcharField;
            ["Nom de facturation"]: t.DVarcharField;
            ["Nom de livraison"]: t.DVarcharField;
            ["Total (devise de base)"]: t.DNumericField;
            ["Total (command\\u00E9)"]: t.DNumericField;
            ["Statut"]: t.DVarcharField;
            ["Adresse de facturation"]: t.DVarcharField;
            ["Adresse de livraison"]: t.DVarcharField;
            ["Informations de livraison"]: t.DVarcharField;
            ["Email du client"]: t.DVarcharField;
            ["Groupe de clients"]: t.DVarcharField;
            ["Sous-total"]: t.DNumericField;
            ["Livraison et frais de traitement"]: t.DNumericField;
            ["Nom du client"]: t.DVarcharField;
            ["Mode de paiement"]: t.DVarcharField;
            ["Total rembours\\u00E9"]: t.DNumericField;
            ["Allocated sources"]: t.DVarcharField;
            ["Pickup Location Code"]: t.DVarcharField;
            ["Statut du paiement PayPlug en plusieurs fois"]: t.DVarcharField;
            ["Total d\\u00FB"]: t.DNumericField;
        };
        ["file:///me/dev/buckdb/data/ages.parquet"]: {
            ["name"]: t.DVarcharField;
            ["age"]: t.DNumericField;
        };
        ["/me/dev/buckdb/data/ages.parquet"]: {
            ["name"]: t.DVarcharField;
            ["age"]: t.DNumericField;
        };
        ["glob()"]: {
            ["file"]: t.DVarcharField;
        };
        ["glob('/')"]: {
            ["file"]: t.DVarcharField;
        };
        ["/me/dev/abel/package.json"]: {
            ["name"]: t.DVarcharField;
            ["scripts"]: t.DStructField<{
                ["build:log-server"]: t.DVarcharField;
                ["build:l7z"]: t.DVarcharField;
            }>;
            ["devDependencies"]: t.DStructField<{
                ["@types/lodash"]: t.DVarcharField;
                ["argparse"]: t.DVarcharField;
                ["bun-types"]: t.DVarcharField;
                ["type-fest"]: t.DVarcharField;
            }>;
            ["peerDependencies"]: t.DStructField<{
                ["typescript"]: t.DVarcharField;
            }>;
            ["dependencies"]: t.DStructField<{
                ["@dexaai/dexter"]: t.DVarcharField;
                ["@json2csv/node"]: t.DVarcharField;
                ["@std/fmt"]: t.DVarcharField;
                ["@types/bun"]: t.DVarcharField;
                ["ansis"]: t.DVarcharField;
                ["dex"]: t.DVarcharField;
                ["es-toolkit"]: t.DVarcharField;
                ["hash-object"]: t.DVarcharField;
                ["json-stringify-safe"]: t.DVarcharField;
                ["lodash"]: t.DVarcharField;
                ["moderndash"]: t.DVarcharField;
                ["mri"]: t.DVarcharField;
                ["remeda"]: t.DVarcharField;
                ["simple-zstd"]: t.DVarcharField;
            }>;
        };
    };
    ["file:///Volumes/dev/fsimrep"]: {
        ["repos.parquet"]: {
            ["id"]: t.DNumericField;
            ["name"]: t.DVarcharField;
            ["full_name"]: t.DVarcharField;
            ["default_branch"]: t.DVarcharField;
            ["description"]: t.DVarcharField;
            ["fork"]: t.DBoolField;
            ["created_at"]: t.DDateField;
            ["updated_at"]: t.DDateField;
            ["pushed_at"]: t.DDateField;
            ["homepage"]: t.DVarcharField;
            ["size"]: t.DNumericField;
            ["stargazers_count"]: t.DNumericField;
            ["watchers_count"]: t.DNumericField;
            ["language"]: t.DVarcharField;
            ["has_issues"]: t.DBoolField;
            ["has_projects"]: t.DBoolField;
            ["has_downloads"]: t.DBoolField;
            ["has_wiki"]: t.DBoolField;
            ["has_pages"]: t.DBoolField;
            ["has_discussions"]: t.DBoolField;
            ["forks_count"]: t.DNumericField;
            ["archived"]: t.DBoolField;
            ["disabled"]: t.DBoolField;
            ["open_issues_count"]: t.DNumericField;
            ["watchers"]: t.DNumericField;
            ["allow_forking"]: t.DBoolField;
            ["is_template"]: t.DBoolField;
            ["topics"]: t.DArrayField<t.DVarcharField>;
            ["visibility"]: t.DVarcharField;
            ["forks"]: t.DNumericField;
            ["owner_login"]: t.DVarcharField;
            ["owner_id"]: t.DVarcharField;
            ["rn"]: t.DNumericField;
        };
    };
    ["s3://a1738/akira09.db"]: {
        ["Rental"]: {
            ["rental_id"]: t.DNumericField;
            ["rental_date"]: t.DDateField;
            ["inventory_id"]: t.DNumericField;
            ["customer_id"]: t.DNumericField;
            ["return_date"]: t.DDateField;
            ["staff_id"]: t.DNumericField;
            ["last_update"]: t.DDateField;
        };
        ["Customer"]: {
            ["customer_id"]: t.DNumericField;
            ["store_id"]: t.DNumericField;
            ["first_name"]: t.DVarcharField;
            ["last_name"]: t.DVarcharField;
            ["email"]: t.DVarcharField;
            ["address_id"]: t.DNumericField;
            ["active"]: t.DVarcharField;
            ["create_date"]: t.DDateField;
            ["last_update"]: t.DDateField;
        };
        ["Address"]: {
            ["address_id"]: t.DNumericField;
            ["address"]: t.DVarcharField;
            ["address2"]: t.DVarcharField;
            ["district"]: t.DVarcharField;
            ["city_id"]: t.DNumericField;
            ["postal_code"]: t.DVarcharField;
            ["phone"]: t.DVarcharField;
            ["last_update"]: t.DDateField;
        };
        ["Film"]: {
            ["film_id"]: t.DNumericField;
            ["title"]: t.DVarcharField;
            ["description"]: t.DVarcharField;
            ["release_year"]: t.DVarcharField;
            ["language_id"]: t.DNumericField;
            ["original_language_id"]: t.DNumericField;
            ["rental_duration"]: t.DNumericField;
            ["rental_rate"]: t.DNumericField;
            ["length"]: t.DNumericField;
            ["replacement_cost"]: t.DNumericField;
            ["rating"]: t.DVarcharField;
            ["special_features"]: t.DVarcharField;
            ["last_update"]: t.DDateField;
        };
    };
    ["/mods/data/atuin/history.db"]: {
        ["_sqlx_migrations"]: {
            ["version"]: t.DNumericField;
            ["description"]: t.DAnyField;
            ["installed_on"]: t.DDateField;
            ["success"]: t.DNumericField;
            ["checksum"]: t.DAnyField;
            ["execution_time"]: t.DNumericField;
        };
        ["History"]: {
            ["id"]: t.DAnyField;
            ["timestamp"]: t.DNumericField;
            ["duration"]: t.DNumericField;
            ["exit"]: t.DNumericField;
            ["command"]: t.DAnyField;
            ["cwd"]: t.DAnyField;
            ["session"]: t.DAnyField;
            ["hostname"]: t.DAnyField;
            ["deleted_at"]: t.DNumericField;
        };
        ["Sqlite_stat1"]: {
            ["tbl"]: t.DAnyField;
            ["idx"]: t.DAnyField;
            ["stat"]: t.DAnyField;
        };
        ["Sqlite_stat4"]: {
            ["tbl"]: t.DAnyField;
            ["idx"]: t.DAnyField;
            ["neq"]: t.DAnyField;
            ["nlt"]: t.DAnyField;
            ["ndlt"]: t.DAnyField;
            ["sample"]: t.DAnyField;
        };
    };
}
`;export{e as default};
