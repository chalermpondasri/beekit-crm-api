import { ICacheService } from '@core/interfaces/cache.service.interface'
import ms from 'ms'
import NodeCache from 'node-cache'

export class MemoryCacheService implements ICacheService {
    private _cacheStorage: NodeCache
    public constructor() {
        this._cacheStorage = new NodeCache({
            checkperiod: 6000,
            stdTTL: 6000,
            useClones: true,
        })
    }

    public async get<T>(key: string): Promise<T | null> {
        try {
            return <T> this._cacheStorage.get(key) || null
        } catch {
            return null
        }

    }
    public async set(key: string, value: any, ttl?: ms.StringValue): Promise<void> {
        const ttlInSeconds = ms(ttl || '1h') / 1000
        this._cacheStorage.set(key, value, ttlInSeconds)
    }

    public async delete(key: string): Promise<void> {
        this._cacheStorage.del(key)
    }

    public async flush(): Promise<void> {
        this._cacheStorage.flushAll()
    }



}
