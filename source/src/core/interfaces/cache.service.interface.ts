import ms from 'ms'
import { Observable } from 'rxjs'


export interface ISetOptions {
    ttl?: ms.StringValue
    /**
     * forever TTL duration, redis only
     */
    isForever?: boolean
}
export interface ICacheService {
    get<T>(key: string): Observable<T | null>
    set(key: string, value: any, opts?: ISetOptions): Observable<void>
    delete(key: string): Observable<void>
    flush(): Observable<void>
    /**
     * get value by key if it has value return it or else set value before return it
     */
    getAndSet<T>(key: string, default$: () => Observable<T>, options?: ISetOptions): Observable<T>
}
