import * as t from "./types";
export interface Models {
    [""]: {
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
        ["tbl"]: {
            ["id"]: t.DNumericField;
            ["name"]: t.DVarcharField;
            ["age"]: t.DNumericField;
        };
        ["duckdb_indexes()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DNumericField;
            ["schema_name"]: t.DVarcharField;
            ["schema_oid"]: t.DNumericField;
            ["index_name"]: t.DVarcharField;
            ["index_oid"]: t.DNumericField;
            ["table_name"]: t.DVarcharField;
            ["table_oid"]: t.DNumericField;
            ["comment"]: t.DVarcharField;
            ["tags"]: t.DMapField;
            ["is_unique"]: t.DBoolField;
            ["is_primary"]: t.DBoolField;
            ["expressions"]: t.DVarcharField;
            ["sql"]: t.DVarcharField;
        };
        ["pragma_storage_info()"]: {
            ["row_group_id"]: t.DNumericField;
            ["column_name"]: t.DVarcharField;
            ["column_id"]: t.DNumericField;
            ["column_path"]: t.DVarcharField;
            ["segment_id"]: t.DNumericField;
            ["segment_type"]: t.DVarcharField;
            ["start"]: t.DNumericField;
            ["count"]: t.DNumericField;
            ["compression"]: t.DVarcharField;
            ["stats"]: t.DVarcharField;
            ["has_updates"]: t.DBoolField;
            ["persistent"]: t.DBoolField;
            ["block_id"]: t.DNumericField;
            ["block_offset"]: t.DNumericField;
            ["segment_info"]: t.DVarcharField;
            ["additional_block_ids"]: t.DArrayField<t.DNumericField>;
        };
        ["pragma_table_info()"]: {
            ["cid"]: t.DNumericField;
            ["name"]: t.DVarcharField;
            ["type"]: t.DVarcharField;
            ["notnull"]: t.DBoolField;
            ["dflt_value"]: t.DVarcharField;
            ["pk"]: t.DBoolField;
        };
        ["pragma_show()"]: {
            ["column_name"]: t.DVarcharField;
            ["column_type"]: t.DVarcharField;
            ["null"]: t.DVarcharField;
            ["key"]: t.DVarcharField;
            ["default"]: t.DVarcharField;
            ["extra"]: t.DVarcharField;
        };
        ["check_peg_parser()"]: {
            ["success"]: t.DBoolField;
        };
        ["checkpoint()"]: {
            ["Success"]: t.DBoolField;
        };
        ["force_checkpoint()"]: {
            ["Success"]: t.DBoolField;
        };
        ["generate_series()"]: {
            ["generate_series"]: t.DNumericField;
        };
        ["glob()"]: {
            ["file"]: t.DVarcharField;
        };
        ["json_each()"]: {
            ["key"]: t.DVarcharField;
            ["value"]: t.DJsonField;
            ["type"]: t.DVarcharField;
            ["atom"]: t.DJsonField;
            ["id"]: t.DNumericField;
            ["parent"]: t.DNumericField;
            ["fullkey"]: t.DVarcharField;
            ["path"]: t.DVarcharField;
        };
        ["json_tree()"]: {
            ["key"]: t.DVarcharField;
            ["value"]: t.DJsonField;
            ["type"]: t.DVarcharField;
            ["atom"]: t.DJsonField;
            ["id"]: t.DNumericField;
            ["parent"]: t.DNumericField;
            ["fullkey"]: t.DVarcharField;
            ["path"]: t.DVarcharField;
        };
        ["parquet_bloom_probe()"]: {
            ["file_name"]: t.DVarcharField;
            ["row_group_id"]: t.DNumericField;
            ["bloom_filter_excludes"]: t.DBoolField;
        };
        ["parquet_file_metadata()"]: {
            ["file_name"]: t.DVarcharField;
            ["created_by"]: t.DVarcharField;
            ["num_rows"]: t.DNumericField;
            ["num_row_groups"]: t.DNumericField;
            ["format_version"]: t.DNumericField;
            ["encryption_algorithm"]: t.DVarcharField;
            ["footer_signing_key_metadata"]: t.DVarcharField;
        };
        ["parquet_kv_metadata()"]: {
            ["file_name"]: t.DVarcharField;
            ["key"]: t.DAnyField;
            ["value"]: t.DAnyField;
        };
        ["parquet_metadata()"]: {
            ["file_name"]: t.DVarcharField;
            ["row_group_id"]: t.DNumericField;
            ["row_group_num_rows"]: t.DNumericField;
            ["row_group_num_columns"]: t.DNumericField;
            ["row_group_bytes"]: t.DNumericField;
            ["column_id"]: t.DNumericField;
            ["file_offset"]: t.DNumericField;
            ["num_values"]: t.DNumericField;
            ["path_in_schema"]: t.DVarcharField;
            ["type"]: t.DVarcharField;
            ["stats_min"]: t.DVarcharField;
            ["stats_max"]: t.DVarcharField;
            ["stats_null_count"]: t.DNumericField;
            ["stats_distinct_count"]: t.DNumericField;
            ["stats_min_value"]: t.DVarcharField;
            ["stats_max_value"]: t.DVarcharField;
            ["compression"]: t.DVarcharField;
            ["encodings"]: t.DVarcharField;
            ["index_page_offset"]: t.DNumericField;
            ["dictionary_page_offset"]: t.DNumericField;
            ["data_page_offset"]: t.DNumericField;
            ["total_compressed_size"]: t.DNumericField;
            ["total_uncompressed_size"]: t.DNumericField;
            ["key_value_metadata"]: t.DMapField;
            ["bloom_filter_offset"]: t.DNumericField;
            ["bloom_filter_length"]: t.DNumericField;
            ["min_is_exact"]: t.DBoolField;
            ["max_is_exact"]: t.DBoolField;
        };
        ["parquet_schema()"]: {
            ["file_name"]: t.DVarcharField;
            ["name"]: t.DVarcharField;
            ["type"]: t.DVarcharField;
            ["type_length"]: t.DVarcharField;
            ["repetition_type"]: t.DVarcharField;
            ["num_children"]: t.DNumericField;
            ["converted_type"]: t.DVarcharField;
            ["scale"]: t.DNumericField;
            ["precision"]: t.DNumericField;
            ["field_id"]: t.DNumericField;
            ["logical_type"]: t.DVarcharField;
        };
        ["range()"]: {
            ["range"]: t.DNumericField;
        };
        ["sql_auto_complete()"]: {
            ["suggestion"]: t.DVarcharField;
            ["suggestion_start"]: t.DNumericField;
        };
        ["test_all_types()"]: {
            ["bool"]: t.DBoolField;
            ["tinyint"]: t.DNumericField;
            ["smallint"]: t.DNumericField;
            ["int"]: t.DNumericField;
            ["bigint"]: t.DNumericField;
            ["hugeint"]: t.DNumericField;
            ["uhugeint"]: t.DNumericField;
            ["utinyint"]: t.DNumericField;
            ["usmallint"]: t.DNumericField;
            ["uint"]: t.DNumericField;
            ["ubigint"]: t.DNumericField;
            ["varint"]: t.DAnyField;
            ["date"]: t.DDateField;
            ["time"]: t.DDateField;
            ["timestamp"]: t.DDateField;
            ["timestamp_s"]: t.DDateField;
            ["timestamp_ms"]: t.DDateField;
            ["timestamp_ns"]: t.DDateField;
            ["time_tz"]: t.DDateField;
            ["timestamp_tz"]: t.DDateField;
            ["float"]: t.DNumericField;
            ["double"]: t.DNumericField;
            ["dec_4_1"]: t.DNumericField;
            ["dec_9_4"]: t.DNumericField;
            ["dec_18_6"]: t.DNumericField;
            ["dec38_10"]: t.DNumericField;
            ["uuid"]: t.DAnyField;
            ["interval"]: t.DAnyField;
            ["varchar"]: t.DVarcharField;
            ["blob"]: t.DAnyField;
            ["bit"]: t.DAnyField;
            ["small_enum"]: t.DAnyField;
            ["medium_enum"]: t.DAnyField;
            ["large_enum"]: t.DAnyField;
            ["int_array"]: t.DArrayField<t.DNumericField>;
            ["double_array"]: t.DArrayField<t.DNumericField>;
            ["date_array"]: t.DArrayField<t.DDateField>;
            ["timestamp_array"]: t.DArrayField<t.DDateField>;
            ["timestamptz_array"]: t.DArrayField<t.DDateField>;
            ["varchar_array"]: t.DArrayField<t.DVarcharField>;
            ["nested_int_array"]: t.DArrayField<t.DArrayField>;
            ["struct"]: t.DStructField<{
                ["a"]: t.DNumericField;
                ["b"]: t.DVarcharField;
            }>;
            ["struct_of_arrays"]: t.DStructField<{
                ["a"]: t.DArrayField<t.DNumericField>;
                ["b"]: t.DArrayField<t.DVarcharField>;
            }>;
            ["array_of_structs"]: t.DArrayField<t.DStructField<{
                ["a"]: t.DNumericField;
                ["b"]: t.DVarcharField;
            }>>;
            ["map"]: t.DMapField;
            ["union"]: t.DNumericField;
            ["fixed_int_array"]: t.DArrayField;
            ["fixed_varchar_array"]: t.DArrayField;
            ["fixed_nested_int_array"]: t.DArrayField;
            ["fixed_nested_varchar_array"]: t.DArrayField;
            ["fixed_struct_array"]: t.DNumericField;
            ["struct_of_fixed_array"]: t.DStructField<{
                ["a"]: t.DArrayField;
                ["b"]: t.DArrayField;
            }>;
            ["fixed_array_of_int_list"]: t.DNumericField;
            ["list_of_fixed_int_array"]: t.DArrayField<t.DArrayField>;
        };
        ["which_secret()"]: {
            ["name"]: t.DVarcharField;
            ["persistent"]: t.DVarcharField;
            ["storage"]: t.DVarcharField;
        };
        ["load_aws_credentials()"]: {
            ["loaded_access_key_id"]: t.DVarcharField;
            ["loaded_secret_access_key"]: t.DVarcharField;
            ["loaded_session_token"]: t.DVarcharField;
            ["loaded_region"]: t.DVarcharField;
        };
        ["rtree_index_dump()"]: {
            ["level"]: t.DNumericField;
            ["bounds"]: t.DAnyField;
            ["row_id"]: t.DNumericField;
        };
        ["shapefile_meta()"]: {
            ["name"]: t.DVarcharField;
            ["shape_type"]: t.DAnyField;
            ["bounds"]: t.DAnyField;
            ["count"]: t.DNumericField;
        };
        ["sqlite_attach()"]: {
            ["Success"]: t.DBoolField;
        };
        ["duckdb_columns()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DNumericField;
            ["schema_name"]: t.DVarcharField;
            ["schema_oid"]: t.DNumericField;
            ["table_name"]: t.DVarcharField;
            ["table_oid"]: t.DNumericField;
            ["column_name"]: t.DVarcharField;
            ["column_index"]: t.DNumericField;
            ["comment"]: t.DVarcharField;
            ["internal"]: t.DBoolField;
            ["column_default"]: t.DVarcharField;
            ["is_nullable"]: t.DBoolField;
            ["data_type"]: t.DVarcharField;
            ["data_type_id"]: t.DNumericField;
            ["character_maximum_length"]: t.DNumericField;
            ["numeric_precision"]: t.DNumericField;
            ["numeric_precision_radix"]: t.DNumericField;
            ["numeric_scale"]: t.DNumericField;
        };
        ["duckdb_constraints()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DNumericField;
            ["schema_name"]: t.DVarcharField;
            ["schema_oid"]: t.DNumericField;
            ["table_name"]: t.DVarcharField;
            ["table_oid"]: t.DNumericField;
            ["constraint_index"]: t.DNumericField;
            ["constraint_type"]: t.DVarcharField;
            ["constraint_text"]: t.DVarcharField;
            ["expression"]: t.DVarcharField;
            ["constraint_column_indexes"]: t.DArrayField<t.DNumericField>;
            ["constraint_column_names"]: t.DArrayField<t.DVarcharField>;
            ["constraint_name"]: t.DVarcharField;
            ["referenced_table"]: t.DVarcharField;
            ["referenced_column_names"]: t.DArrayField<t.DVarcharField>;
        };
        ["duckdb_databases()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DNumericField;
            ["path"]: t.DVarcharField;
            ["comment"]: t.DVarcharField;
            ["tags"]: t.DMapField;
            ["internal"]: t.DBoolField;
            ["type"]: t.DVarcharField;
            ["readonly"]: t.DBoolField;
        };
        ["duckdb_dependencies()"]: {
            ["classid"]: t.DNumericField;
            ["objid"]: t.DNumericField;
            ["objsubid"]: t.DNumericField;
            ["refclassid"]: t.DNumericField;
            ["refobjid"]: t.DNumericField;
            ["refobjsubid"]: t.DNumericField;
            ["deptype"]: t.DVarcharField;
        };
        ["duckdb_extensions()"]: {
            ["extension_name"]: t.DVarcharField;
            ["loaded"]: t.DBoolField;
            ["installed"]: t.DBoolField;
            ["install_path"]: t.DVarcharField;
            ["description"]: t.DVarcharField;
            ["aliases"]: t.DArrayField<t.DVarcharField>;
            ["extension_version"]: t.DVarcharField;
            ["install_mode"]: t.DVarcharField;
            ["installed_from"]: t.DVarcharField;
        };
        ["duckdb_external_file_cache()"]: {
            ["path"]: t.DVarcharField;
            ["nr_bytes"]: t.DNumericField;
            ["location"]: t.DNumericField;
            ["loaded"]: t.DBoolField;
        };
        ["duckdb_keywords()"]: {
            ["keyword_name"]: t.DVarcharField;
            ["keyword_category"]: t.DVarcharField;
        };
        ["duckdb_log_contexts()"]: {
            ["context_id"]: t.DNumericField;
            ["scope"]: t.DVarcharField;
            ["connection_id"]: t.DNumericField;
            ["transaction_id"]: t.DNumericField;
            ["query_id"]: t.DNumericField;
            ["thread_id"]: t.DNumericField;
        };
        ["duckdb_logs()"]: {
            ["context_id"]: t.DNumericField;
            ["timestamp"]: t.DDateField;
            ["type"]: t.DVarcharField;
            ["log_level"]: t.DVarcharField;
            ["message"]: t.DVarcharField;
        };
        ["duckdb_memory()"]: {
            ["tag"]: t.DVarcharField;
            ["memory_usage_bytes"]: t.DNumericField;
            ["temporary_storage_bytes"]: t.DNumericField;
        };
        ["duckdb_optimizers()"]: {
            ["name"]: t.DVarcharField;
        };
        ["duckdb_prepared_statements()"]: {
            ["name"]: t.DVarcharField;
            ["statement"]: t.DVarcharField;
            ["parameter_types"]: t.DArrayField<t.DVarcharField>;
            ["result_types"]: t.DArrayField<t.DVarcharField>;
        };
        ["duckdb_schemas()"]: {
            ["oid"]: t.DNumericField;
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DNumericField;
            ["schema_name"]: t.DVarcharField;
            ["comment"]: t.DVarcharField;
            ["tags"]: t.DMapField;
            ["internal"]: t.DBoolField;
            ["sql"]: t.DVarcharField;
        };
        ["duckdb_secret_types()"]: {
            ["type"]: t.DVarcharField;
            ["default_provider"]: t.DVarcharField;
            ["extension"]: t.DVarcharField;
        };
        ["duckdb_secrets()"]: {
            ["name"]: t.DVarcharField;
            ["type"]: t.DVarcharField;
            ["provider"]: t.DVarcharField;
            ["persistent"]: t.DBoolField;
            ["storage"]: t.DVarcharField;
            ["scope"]: t.DArrayField<t.DVarcharField>;
            ["secret_string"]: t.DVarcharField;
        };
        ["duckdb_sequences()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DNumericField;
            ["schema_name"]: t.DVarcharField;
            ["schema_oid"]: t.DNumericField;
            ["sequence_name"]: t.DVarcharField;
            ["sequence_oid"]: t.DNumericField;
            ["comment"]: t.DVarcharField;
            ["tags"]: t.DMapField;
            ["temporary"]: t.DBoolField;
            ["start_value"]: t.DNumericField;
            ["min_value"]: t.DNumericField;
            ["max_value"]: t.DNumericField;
            ["increment_by"]: t.DNumericField;
            ["cycle"]: t.DBoolField;
            ["last_value"]: t.DNumericField;
            ["sql"]: t.DVarcharField;
        };
        ["duckdb_settings()"]: {
            ["name"]: t.DVarcharField;
            ["value"]: t.DVarcharField;
            ["description"]: t.DVarcharField;
            ["input_type"]: t.DVarcharField;
            ["scope"]: t.DVarcharField;
        };
        ["duckdb_tables()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DNumericField;
            ["schema_name"]: t.DVarcharField;
            ["schema_oid"]: t.DNumericField;
            ["table_name"]: t.DVarcharField;
            ["table_oid"]: t.DNumericField;
            ["comment"]: t.DVarcharField;
            ["tags"]: t.DMapField;
            ["internal"]: t.DBoolField;
            ["temporary"]: t.DBoolField;
            ["has_primary_key"]: t.DBoolField;
            ["estimated_size"]: t.DNumericField;
            ["column_count"]: t.DNumericField;
            ["index_count"]: t.DNumericField;
            ["check_constraint_count"]: t.DNumericField;
            ["sql"]: t.DVarcharField;
        };
        ["duckdb_temporary_files()"]: {
            ["path"]: t.DVarcharField;
            ["size"]: t.DNumericField;
        };
        ["duckdb_variables()"]: {
            ["name"]: t.DVarcharField;
            ["value"]: t.DVarcharField;
            ["type"]: t.DVarcharField;
        };
        ["duckdb_views()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_oid"]: t.DNumericField;
            ["schema_name"]: t.DVarcharField;
            ["schema_oid"]: t.DNumericField;
            ["view_name"]: t.DVarcharField;
            ["view_oid"]: t.DNumericField;
            ["comment"]: t.DVarcharField;
            ["tags"]: t.DMapField;
            ["internal"]: t.DBoolField;
            ["temporary"]: t.DBoolField;
            ["column_count"]: t.DNumericField;
            ["sql"]: t.DVarcharField;
        };
        ["pragma_collations()"]: {
            ["collname"]: t.DVarcharField;
        };
        ["pragma_database_size()"]: {
            ["database_name"]: t.DVarcharField;
            ["database_size"]: t.DVarcharField;
            ["block_size"]: t.DNumericField;
            ["total_blocks"]: t.DNumericField;
            ["used_blocks"]: t.DNumericField;
            ["free_blocks"]: t.DNumericField;
            ["wal_size"]: t.DVarcharField;
            ["memory_usage"]: t.DVarcharField;
            ["memory_limit"]: t.DVarcharField;
        };
        ["pragma_metadata_info()"]: {
            ["block_id"]: t.DNumericField;
            ["total_blocks"]: t.DNumericField;
            ["free_blocks"]: t.DNumericField;
            ["free_list"]: t.DArrayField<t.DNumericField>;
        };
        ["pragma_platform()"]: {
            ["platform"]: t.DVarcharField;
        };
        ["pragma_rtree_index_info()"]: {
            ["catalog_name"]: t.DVarcharField;
            ["schema_name"]: t.DVarcharField;
            ["index_name"]: t.DVarcharField;
            ["table_name"]: t.DVarcharField;
        };
        ["pragma_user_agent()"]: {
            ["user_agent"]: t.DVarcharField;
        };
        ["pragma_version()"]: {
            ["library_version"]: t.DVarcharField;
            ["source_id"]: t.DVarcharField;
            ["codename"]: t.DVarcharField;
        };
        ["icu_calendar_names()"]: {
            ["name"]: t.DVarcharField;
        };
        ["pg_timezone_names()"]: {
            ["name"]: t.DVarcharField;
            ["abbrev"]: t.DVarcharField;
            ["utc_offset"]: t.DAnyField;
            ["is_dst"]: t.DBoolField;
        };
        ["register_geoarrow_extensions()"]: {
            ["registered"]: t.DBoolField;
        };
        ["ST_Drivers()"]: {
            ["short_name"]: t.DVarcharField;
            ["long_name"]: t.DVarcharField;
            ["can_create"]: t.DBoolField;
            ["can_copy"]: t.DBoolField;
            ["can_open"]: t.DBoolField;
            ["help_url"]: t.DVarcharField;
        };
    };
}
