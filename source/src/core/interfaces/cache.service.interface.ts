export interface ICacheService {
    get<T>(key: string): Promise<T>
    set(key: string, value: any): Promise<void>
    delete(key: string): Promise<void>
    flush(): Promise<void>
}
