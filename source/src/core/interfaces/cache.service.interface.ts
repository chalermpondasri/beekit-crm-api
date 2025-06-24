import ms from 'ms'

export interface ICacheService {
    get<T>(key: string): Promise<T | null>
    set(key: string, value: any, ttl?: ms.StringValue): Promise<void>
    delete(key: string): Promise<void>
    flush(): Promise<void>
}
