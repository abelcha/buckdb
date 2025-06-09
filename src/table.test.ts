import { describe, it, expect, beforeAll } from 'bun:test'
import { from, MemoryDB } from '../buckdb'

describe('Table Functions Return Schema Tests', () => {
  beforeAll(async () => {
    MemoryDB.loadExtensions('h3', 'aws', 'azure', 'delta', 'excel', 'fts', 'httpfs', 'iceberg', 'inet', 'spatial', 'sqlite_scanner', 'ui')
    await MemoryDB.create('tbl').as(
      [
        {
          id: 1,
          name: 'John Doe',
          age: 30,
        }
      ]
    ).execute()
  })
  it('duckdb_secrets() → array', () =>
    expect(async () => MemoryDB.describe(`duckdb_secrets()`)).not.toThrow()
  )
  it('pragma_metadata_info(name) → array', () =>
    expect(async () => MemoryDB.describe(`pragma_metadata_info()`)).not.toThrow()
  )
  it('pragma_show(name) → array', () =>
    expect(async () => MemoryDB.describe(`pragma_show('tbl')`)).not.toThrow()
  )
  it('pragma_storage_info(name) → array', () =>
    expect(async () => MemoryDB.describe(`pragma_storage_info('tbl')`)).not.toThrow()
  )
  it('pragma_table_info(name) → array', () =>
    expect(async () => MemoryDB.describe(`pragma_table_info('tbl')`)).not.toThrow()
  )
  it('check_peg_parser(pattern) → array', () =>
    expect(async () => MemoryDB.describe(`check_peg_parser('')`)).not.toThrow()
  )
  it('checkpoint(path?) → array', () =>
    expect(async () => MemoryDB.describe(`checkpoint()`)).not.toThrow()
  )
  it('force_checkpoint(path?) → array', () =>
    expect(async () => MemoryDB.describe(`force_checkpoint()`)).not.toThrow()
  )
  it('generate_series(start,end,step) → array', () =>
    expect(async () => MemoryDB.describe(`generate_series(1,3,1)`)).not.toThrow()
  )
  it('glob(pattern) → array', () =>
    expect(async () => MemoryDB.describe(`glob('*')`)).not.toThrow()
  )
  it('json_each(json,path?) → array', () =>
    expect(async () => MemoryDB.describe(`json_each('[]')`)).not.toThrow()
  )
  it('json_execute_serialized_sql(sql) → array', () =>
    expect(async () => MemoryDB.describe(`json_execute_serialized_sql(json_serialize_sql('SELECT 1 + 2'))`)).not.toThrow()
  )
  it('json_tree(json,path?) → array', () =>
    expect(async () => MemoryDB.describe(`json_tree('{}')`)).not.toThrow()
  )
  it('parquet_bloom_probe(files,col,val) → array', () =>
    expect(async () => MemoryDB.describe(`parquet_bloom_probe('data/people.parquet','age',1)`)).not.toThrow()
  )
  it('parquet_file_metadata(files) → array', () =>
    expect(async () => MemoryDB.describe(`parquet_file_metadata('data/people.parquet')`)).not.toThrow()
  )
  it('parquet_kv_metadata(files) → array', () =>
    expect(async () => MemoryDB.describe(`parquet_kv_metadata('data/people.parquet')`)).not.toThrow()
  )
  it('parquet_metadata(files) → array', () =>
    expect(async () => MemoryDB.describe(`parquet_metadata('data/people.parquet')`)).not.toThrow()
  )
  it('parquet_schema(files) → array', () =>
    expect(async () => MemoryDB.describe(`parquet_schema('data/people.parquet')`)).not.toThrow()
  )
  it('range(start,end,step) → array', () =>
    expect(async () => MemoryDB.describe(`range(1,2,1)`)).not.toThrow()
  )
  it('sql_auto_complete(sql) → array', () =>
    expect(async () => MemoryDB.describe(`sql_auto_complete('SEL')`)).not.toThrow()
  )
  it('test_all_types(useLargeEnum) → array', () =>
    expect(async () => MemoryDB.describe(`test_all_types()`)).not.toThrow()
  )
  it('which_secret(type,name) → array', () =>
    expect(async () => MemoryDB.describe(`which_secret('t','n')`)).not.toThrow()
  )
  it('load_aws_credentials(creds,redact) → array', () =>
    expect(async () => MemoryDB.describe(`load_aws_credentials('c')`)).not.toThrow()
  )
  it('rtree_index_dump(idx) → array', () =>
    expect(async () => MemoryDB.describe(`rtree_index_dump('idx')`)).not.toThrow()
  )
  it('shapefile_meta(files) → array', () =>
    expect(async () => MemoryDB.describe(`shapefile_meta('s.shp')`)).not.toThrow()
  )
  it('sqlite_attach(path,overwrite) → array', () =>
    expect(async () => MemoryDB.describe(`sqlite_attach('data/chinook.db')`)).not.toThrow()
  )
  it('ST_GeneratePoints(box,count) → array', () =>
    expect(async () => MemoryDB.describe(`ST_GeneratePoints({min_x: 0, min_y:0, max_x:10, max_y:10}::BOX_2D, 5, 42)`)).not.toThrow()
  )
})
