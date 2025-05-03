import { builder } from './src/build';
import * as t from './.buck/types';
import type { AsyncDuckDB, AsyncDuckDBConnection } from '@duckdb/duckdb-wasm';
// @ts-ignore
import * as Duckdb from "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.28.1-dev106.0/+esm";
import { CommandQueue, type DuckdbCon } from './src/utils';

class BuckDBWasm implements DuckdbCon {
   _db: AsyncDuckDB | null = null;
   _con: AsyncDuckDBConnection | null = null;
   _initPromise: Promise<void> | null = null;
  readonly cmdQueue = new CommandQueue();

  private _initDB(): Promise<void> {
    // If initialization is already in progress or done, return the existing promise/resolved promise
    if (this._initPromise) {
      return this._initPromise;
    }
    if (this._db && this._con) {
      return Promise.resolve();
    }

    // Start initialization
    this._initPromise = (async () => {
      console.log("Initializing BuckDB WASM...");
      const JSDELIVR_BUNDLES = Duckdb.getJsDelivrBundles();
      const bundle = await Duckdb.selectBundle(JSDELIVR_BUNDLES);

      const worker_url = URL.createObjectURL(
        new Blob([`importScripts("${bundle.mainWorker}");`], { type: 'text/javascript' })
      );

      const worker = new Worker(worker_url);
      const logger = new Duckdb.ConsoleLogger();
      const db: AsyncDuckDB = new Duckdb.AsyncDuckDB(logger, worker);

      await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
      URL.revokeObjectURL(worker_url);

      await db.open({
        path: ':memory:',
        accessMode: Duckdb.DuckDBAccessMode.READONLY,
        filesystem: {
          allowFullHTTPReads: true,
          reliableHeadRequests: true,
        },
        query: { castTimestampToDate: true, castBigIntToDouble: true }
      });

      this._db = db;
      this._con = await this._db.connect();
      window.db = this._con
      console.log("BuckDB WASM Initialized and Connected.");
      // Don't clear the promise here, let it stay resolved
    })();

    return this._initPromise;
  }

  lazySettings(s: Partial<t.DSettings>) {
    console.log(`Queueing settings ${s}`);
    this.cmdQueue.pushSettings(s);
    return this;
  }

  // Make attach lazy by queueing it
  lazyAttach(path: string, alias: string): this {
    console.log(`Queueing attach ${path} as ${alias}...`);
    this.cmdQueue.pushAttach(path, alias);
    return this;
  }

  lazyExtensions(...extensions: string[]): this {
    console.log('Queueing extensions to load:', extensions);
    this.cmdQueue.pushExtensions(...extensions);
    return this;
  }
  async ensureSchema(uri: string) {
    // todo

  }
  async describe(uri: string) {
    if (uri.includes('://')) {
      uri = `'${uri}'`
    }
    return this.query(`DESCRIBE (FROM ${uri});`)
  }

  private async _executeQueuedCommands(): Promise<void> {
    if (!this._con) throw new Error("Database connection not initialized.");
    const cmds = this.cmdQueue.flush();
    if (cmds.length > 0) {
      console.log("Executing queued commands:", cmds);
      for await (const cmd of cmds) {
        console.log('Running command:', cmd);
        // Use query for setup commands like attach, extensions, settings
        // send might be slightly more appropriate for non-select, but query works
        await this._con.query(cmd);
      }
    }
  }

  async query<T = Record<string, any>>(sql: string, opts: { rows?: boolean, withSchema?: boolean } = {}): Promise<T[]> {
    await this._initDB();
    await this._executeQueuedCommands(); // Ensure setup commands run first
    if (!this._con) throw new Error("Database connection not initialized."); // Should be initialized now

    console.log('Executing query:', sql);
    const reader = await this._con.query(sql);
    let rtn = reader.toArray().map(e => e.toJSON() as T);

    if (opts?.rows) {
      rtn = rtn.map(row => Object.values(row)) as T[];
    }
    if (opts?.withSchema && !sql.trim().toUpperCase().startsWith('COPY')) {
      const schemaReader = await this._con.query('DESCRIBE ' + sql);
      const schema = schemaReader.toArray().map(e => e.toJSON());
      Object.defineProperty(rtn, 'schema', { value: schema, enumerable: false });
    }
    return rtn;
  }

  async run(sql: string): Promise<void> {
    await this._initDB();
    await this._executeQueuedCommands(); // Ensure setup commands run first
    if (!this._con) throw new Error("Database connection not initialized."); // Should be initialized now

    console.log('Executing run:', sql);
    await this._con.send(sql);
  }

  async close(): Promise<void> {
    // Only close if initialized
    if (this._initPromise) {
      await this._initPromise; // Ensure init finishes before closing
    }
    if (this._con) {
      await this._con.close();
      this._con = null;
      console.log("BuckDB WASM Connection closed.");
    }
    if (this._db) {
      await this._db.terminate();
      this._db = null;
      console.log("BuckDB WASM Terminated.");
    }
    this._initPromise = null; // Reset init state
  }
}

// Create a single instance for export

// Pass the instance to the builder
export const Buck = builder(BuckDBWasm);

// Maintain existing export pattern
export const MemoryDB = Buck('');
export const from = MemoryDB.from;

// Optional: Export the instance or class
// export { BuckDBWasm, buckDBWasmInstance };
