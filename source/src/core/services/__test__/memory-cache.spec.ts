import { MemoryCacheService } from '@core/services/memory-cache.service'

describe('MemoryCache', () => {
    let memoryCacheService: MemoryCacheService
    beforeEach(() => {
        memoryCacheService = new MemoryCacheService()
    })
    it('should set value',async () => {
        await memoryCacheService.set('test', 'test')
        expect( await memoryCacheService.get('test')).toEqual('test')
    })

    it('should return null if key not found', async () => {
        expect(await memoryCacheService.get('test')).toEqual(null)
    })

    it('should delete key', async () => {
        await memoryCacheService.set('test', 'test')
        await memoryCacheService.delete('test')
        expect(await memoryCacheService.get('test')).toEqual(null)
    })

    it('should flush all keys', async () => {
        await memoryCacheService.set('test', 'test')
        await memoryCacheService.set('test2', 'test2')
        await memoryCacheService.flush()
        expect(await memoryCacheService.get('test')).toEqual(null)
        expect(await memoryCacheService.get('test2')).toEqual(null)
    })
})
