import {
    ICacheService,
    ISetOptions,
} from '@core/interfaces/cache.service.interface'
import {
    catchError,
    from,
    map,
    mergeMap,
    Observable,
    of,
} from 'rxjs'
import {
    RedisClientType,
    SetOptions,
} from '@redis/client'
import ms from 'ms'
import { OnModuleDestroy } from '@nestjs/common'

export class RedisCacheService implements ICacheService, OnModuleDestroy {
    private readonly _ttlInMs: number = ms('1h')

    public constructor(
        private readonly _redisClient: RedisClientType) {

    }

    public async onModuleDestroy() {
        this._redisClient.destroy()
    }

    public get<T>(key: string): Observable<T | null> {
        return from(this._get(key))
    }

    private async _get(key: string): Promise<any> {
        const raw = <string>await this._redisClient.get(key)
        try {
            return JSON.parse(raw)
        } catch (e) {
            return raw
        }
    }

    public set(key: string, value: any, opts?: ISetOptions): Observable<void> {
        let preValue = value
        if (typeof value !== 'string') {
            preValue = JSON.stringify(value)
        }

        const options: SetOptions = {
            expiration: opts?.extendTTL ? {
                type: 'KEEPTTL',
            } : {
                type: 'PX',
                value: opts?.ttl ? ms(opts.ttl) : this._ttlInMs,
            },
        }

        return from(this._redisClient.set(key, preValue, options)).pipe(
            map(() => {}),
            catchError(() => of(null)),
        )
    }

    public getAndSet<T>(key: string, $defaultValue: () => Observable<T>, options?: ISetOptions): Observable<T> {
        return this.get<T>(key).pipe(
            mergeMap((value) => {
                if (!!value) {
                    return of(value)
                }
                return of({}).pipe(
                    mergeMap($defaultValue),
                    mergeMap((defaultValue) => {
                        return this.set(key, defaultValue, options).pipe(map(() => defaultValue))
                    }),
                )
            }),
        )
    }

    public delete(key: string): Observable<void> {
        return from(this._redisClient.del(key)).pipe(
            map(() => {
            }),
        )
    }

    public flush(): Observable<void> {
        return from(this._redisClient.flushAll()).pipe(
            map(() => {
            }),
        )
    }

}
