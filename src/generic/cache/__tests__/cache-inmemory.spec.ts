import { CacheInMemory } from "../cache-inmemory"

describe('CacheInMemory', () => {
    it('should be a singleton', () => {
        const cache1 = new CacheInMemory()
        const cache2 = new CacheInMemory()
        expect(cache1).toBe(cache2)
    })

    it('should set and get value', async () => {
        const cache = new CacheInMemory()
        await cache.set('key', 'value')
        const result = await cache.get('key')
        expect(result).toBe('value')
    })

    it('should delete value', async () => {
        const cache = new CacheInMemory()
        await cache.set('key', 'value')
        await cache.delete('key')
        const result = await cache.get('key')
        expect(result).toBeNull()
    })

    it('should get null if key not found', async () => {
        const cache = new CacheInMemory()
        const result = await cache.get('key')
        expect(result).toBeNull()
    })

    it('should get null if key not found', async () => {
        const cache = new CacheInMemory()
        const result = await cache.get('key')
        expect(result).toBeNull()
    })
})