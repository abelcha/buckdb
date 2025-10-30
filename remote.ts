
import { builder } from './src/build'
import { delta_scan, parquet_scan, read_csv, read_json, read_json_objects, read_parquet, read_text, read_xlsx } from './io.ts'
export { delta_scan, parquet_scan, read_csv, read_json, read_json_objects, read_parquet, read_text, read_xlsx }
import { BuckDBBase } from './core'

class BuckDBRemote extends BuckDBBase {
    readonly type = 'remote' as const


    async ensureSchema(_uri: string) {
        // todo
    }

    async remoteQuery(query: string): Promise<{ data: Record<string, any>[]; meta: { name: string, type: string }[] }> {
        const uri = import.meta.env.VITE_REMOTE_URI || '/duckdb'
        const resp = await fetch(`${uri}?default_format=JSONCompact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: query
        })

        if (!resp.ok) {
            const text = await resp.text()
            throw new Error(`Remote query failed (${resp.status}): ${text}`)
        }

        return resp.json()
    }

    private async _executeQueuedCommands(): Promise<void> {
        const cmds = this.queue.flush()
        if (cmds.length > 0) {
            for await (const cmd of cmds) {
                await this.remoteQuery(cmd)
            }
        }
    }


    async query(sql: string, opts: { rows?: boolean; withSchema?: boolean } = {}): Promise<Record<string, any>[]> {
        await this._executeQueuedCommands() // Ensure setup commands run first
        const { data, meta } = await this.remoteQuery(this.queue.getUsedDB() + sql)
        const rtn = opts?.rows ? data : data.map(row => {
            const result: Record<string, any> = {}
            for (let i = 0; i < meta.length; i++) {
                result[meta[i].name] = row[i]
            }
            return result
        })
        if (opts?.withSchema && !sql.trim().toUpperCase().startsWith('COPY')) {
            const schema = meta.map(({ name, type }) => ({ column_name: name, column_type: type }))
            Object.defineProperty(rtn, 'schema', { value: schema, enumerable: false })
        }
        return rtn
    }

    async run(sql: string): Promise<void> {
        await this._executeQueuedCommands() // Ensure setup commands run first
        await this.remoteQuery(sql)
    }
}
export const Buck = builder(BuckDBRemote)
export const MemoryDB = Buck('')
export const from = MemoryDB.from
