import * as duckdb from '@duckdb/duckdb-wasm';
// @ts-ignore
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm';
// @ts-ignore
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm';

export class DuckDBWasmAdapter  {
  private db: duckdb.AsyncDuckDB | null = null;
  private connection: duckdb.AsyncDuckDBConnection | null = null;
  private isInitialized = false;

  async initialize() {
    const BUNDLES: duckdb.DuckDBBundles = {
      mvp: {
        mainModule: duckdb_wasm,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js', import.meta.url).toString(),
      },
      eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js', import.meta.url).toString(),
      },
    };

    const bundle = await duckdb.selectBundle(BUNDLES);
    const worker = new Worker(bundle.mainWorker!);
    const logger = new duckdb.ConsoleLogger();
    this.db = new duckdb.AsyncDuckDB(logger, worker);
    await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    this.connection = await this.db.connect();
    this.isInitialized = true;
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    if (!this.connection) {
      throw new Error('Database connection is not initialized');
    }
    const result = await this.connection.query(sql); // Note: params not supported in this basic example
    return result.toArray() as T[];
  }
  async run(sql: string) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    if (!this.connection) {
      throw new Error('Database connection is not initialized');
    }
    return this.connection.send(sql);
  }

  async close(): Promise<void> {
    if (this.connection) await this.connection.close();
    if (this.db) await this.db.terminate();
  }
  dump(sql: string) {
   "" console.log(sql);
    return this;
  }
}