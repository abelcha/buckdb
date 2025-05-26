import { describe, expect, it } from 'bun:test'
import { CommandQueue } from './bindings'

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

    it('should handle empty settings', () => {
        const queue = new CommandQueue()
        queue.pushSettings({})
        expect(queue.queue).toEqual([])
    })

    it('should handle undefined settings', () => {
        const queue = new CommandQueue()
        queue.pushSettings()
        expect(queue.queue).toEqual([])
    })

    it('should push attach with readonly option', () => {
        const queue = new CommandQueue()
        queue.pushAttach('/path/to/db', 'mydb', { readonly: true })
        expect(queue.queue).toEqual([
            `ATTACH '/path/to/db' AS mydb (READONLY)`,
            `USE mydb`
        ])
    })

    it('should push attach without readonly option', () => {
        const queue = new CommandQueue()
        queue.pushAttach('/path/to/db', 'mydb')
        expect(queue.queue).toEqual([
            `ATTACH '/path/to/db' AS mydb `,
            `USE mydb`
        ])
    })

    it('should push attach with readonly false', () => {
        const queue = new CommandQueue()
        queue.pushAttach('/path/to/db', 'mydb', { readonly: false })
        expect(queue.queue).toEqual([
            `ATTACH '/path/to/db' AS mydb `,
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

    it('should push community extensions', () => {
        const queue = new CommandQueue()
        queue.pushExtensions('custom_ext')
        expect(queue.queue).toEqual([
            `INSTALL 'custom_ext' FROM community;LOAD 'custom_ext';`
        ])
    })

    it('should filter broken extensions', () => {
        const queue = new CommandQueue()
        queue.pushExtensions('wireduck', 'json', 'vortex', 'parquet')
        expect(queue.queue).toEqual([
            `INSTALL 'json' ;LOAD 'json';`,
            `INSTALL 'parquet' ;LOAD 'parquet';`
        ])
    })

    it('should handle mix of official, community, and broken extensions', () => {
        const queue = new CommandQueue()
        queue.pushExtensions('json', 'custom_ext', 'wireduck', 'parquet')
        expect(queue.queue).toEqual([
            `INSTALL 'json' ;LOAD 'json';`,
            `INSTALL 'custom_ext' FROM community;LOAD 'custom_ext';`,
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
            `ATTACH '/db' AS test `,
            `USE test`
        ])
        expect(queue.queue).toEqual([]) // should be empty after flush
    })

    it('should chain methods correctly', () => {
        const queue = new CommandQueue()
        const result = queue
            .pushSettings({ threads: 2 })
            .pushAttach('/db', 'test')
            .pushExtensions('json')
        
        expect(result).toBe(queue)
        expect(queue.queue.length).toBeGreaterThan(0)
    })

    it('should handle all broken extensions', () => {
        const queue = new CommandQueue()
        queue.pushExtensions('wireduck', 'vortex', 'tarfs', 'scrooge')
        expect(queue.queue).toEqual([]) // all should be filtered out
    })

    it('should handle empty extensions array', () => {
        const queue = new CommandQueue()
        queue.pushExtensions()
        expect(queue.queue).toEqual([])
    })
})