import {
    ICacheService,
    ISetOptions,
} from '@core/interfaces/cache.service.interface'
import ms from 'ms'
import NodeCache from 'node-cache'
import {
    catchError,
    map,
    mergeMap,
    Observable,
    of,
} from 'rxjs'

export class MemoryCacheService implements ICacheService {
    private _cacheStorage: NodeCache

    public constructor() {
        this._cacheStorage = new NodeCache({
            checkperiod: 6000,
            stdTTL: 6000,
            useClones: true,
        })
    }

    public get<T>(key: string): Observable<T | null> {

        return of(key).pipe(
            map(key => <T>this._cacheStorage.get(key) || null),
            catchError(() => of(null)),
        )

    }

    public set(key: string, value: any, opts?: ISetOptions): Observable<void> {
        const ttlInSeconds = ms(opts?.ttl || '1h') / 1000
        return of(this._cacheStorage.set(key, value, ttlInSeconds)).pipe(
            map(() => {}),
        )
    }

    public delete(key: string): Observable<void> {
        return of(this._cacheStorage.del(key)).pipe(
            map(() => {}),
        )
    }

    public flush(): Observable<void> {
        return of({}).pipe(
            map(() => {
                this._cacheStorage.flushAll()
            })
        )
    }

    public getAndSet<T>(key: string, defaultValue$: () => Observable<T>, options?: ISetOptions): Observable<T> {
        return this.get<T>(key).pipe(
            mergeMap((value) => {
                if (!!value) {
                    return of(value)
                }

                return of({}).pipe(
                    mergeMap(defaultValue$),
                    mergeMap((defaultValue) => {
                        return this.set(key, defaultValue, options).pipe(map(() => defaultValue))
                    }),
                )
            }),
        )
    }


}
