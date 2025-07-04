import { ICacheService, ISetOptions } from '@core/interfaces/cache.service.interface'
import { OnModuleDestroy } from '@nestjs/common'
import { concatMap, defaultIfEmpty, from, map, mergeMap, Observable, of } from 'rxjs'
import Keyv from 'keyv'
import ms from 'ms'

export class KeyvCacheService implements ICacheService, OnModuleDestroy {
    public constructor(
        private readonly _keyvCache: Keyv,
    ) {
    }

    public delete(key: string): Observable<void> {
        return from(this._keyvCache.delete(key)).pipe(
            map(() => {
            }),
        )
    }

    public flush(): Observable<void> {
        return from(this._keyvCache.clear())
    }

    public get<T>(key: string): Observable<T | null> {
        return from(this._keyvCache.get<T>(key)).pipe(
            defaultIfEmpty(null),
        )
    }

    public getAndSet<T>(key: string, default$: () => Observable<T>, options?: ISetOptions): Observable<T> {
        return from(this.get<T>(key)).pipe(
            defaultIfEmpty(null),
            concatMap(result => {
                if (!!result) {
                    return of(result)
                }
                return of({}).pipe(
                    concatMap(() => default$()),
                    defaultIfEmpty(null),
                    mergeMap((defaultValue) => {
                        if (!defaultValue) {
                            return of(null)
                        }
                        return this.set(key, defaultValue, options).pipe(map(() => defaultValue))
                    }),
                )
            }),
        )
    }

    public onModuleDestroy(): any {
        return from(this._keyvCache.disconnect())
    }

    public set(key: string, value: any, opts?: ISetOptions): Observable<void> {
        return from(this._keyvCache.set(key, value, opts?.ttl ? ms(opts.ttl) : null)).pipe(
            map(() => {
            }),
        )
    }

}