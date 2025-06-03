import { describe, expect, it } from 'bun:test'
import { CommandQueue } from '../buckdb.core'

describe('CommandQueue', () => {
    it('should initialize with empty queue', () => {
        const queue = new CommandQueue()
        expect(queue.queue).toEqual([])
    })

    it('should push settings correctly', () => {
        const queue = new CommandQueue()
        const result = queue.pushSettings({ 'memory_limit': '1GB', 'threads': 4 })
        expect(result).toBe(queue) // returns this for chaining
        expect(queue.queue).toEqual([`SET memory_limit = '1GB'; SET threads = '4'`])
    })

    it('should push attach with readonly option', () => {
        const queue = new CommandQueue()
        queue.pushAttach('/path/to/db', 'mydb', { readonly: true })
        expect(queue.queue).toEqual([
            `ATTACH IF NOT EXISTS '/path/to/db' AS mydb (READONLY)`,
            `USE mydb`
        ])
    })

    it('should push official extensions', () => {
        const queue = new CommandQueue()
        queue.pushExtensions('json', 'parquet')
        expect(queue.queue).toEqual([
            `INSTALL 'json' ;LOAD 'json';`,
            `INSTALL 'parquet' ;LOAD 'parquet';`
        ])
    })

    it('should flush and reset queue', () => {
        const queue = new CommandQueue()
        queue.pushSettings({ threads: 4 })
        queue.pushAttach('/db', 'test')
        
        const flushed = queue.flush()
        expect(flushed).toEqual([
            `SET threads = '4'`,
            `ATTACH IF NOT EXISTS '/db' AS test `,
            `USE test`
        ])
        expect(queue.queue).toEqual([]) // should be empty after flush
    })
})
