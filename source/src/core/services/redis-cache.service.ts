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
import {
    ConsoleLogger,
    OnModuleDestroy,
} from '@nestjs/common'
import { WinstonConsoleLogger } from '@core/services/logger.service'
import { ILoggerService } from '@core/interfaces/logger.service.interface'

export class RedisCacheService implements ICacheService, OnModuleDestroy {
    private readonly _ttlInMs: number = ms('1h')
    private _isConnected = true
    private readonly _logger: ILoggerService = new WinstonConsoleLogger('console')

    public constructor(
        private readonly _redisClient: RedisClientType) {

        this.setupEventHandlers()
    }

    private setupEventHandlers() {
        this._redisClient.on('connect', () => {
            this._isConnected = true
            this._logger.log('Redis connected')
        })

        this._redisClient.on('error', (error) => {
            this._isConnected = false
            this._logger.error(`Redis error: ${error.message}`)
        })

        this._redisClient.on('end', () => {
            this._isConnected = false
            this._logger.warn('Redis connection ended')
        })

        this._redisClient.on('reconnecting', () => {
            this._isConnected = false
            this._logger.log('Redis reconnecting...')
        })

        this._redisClient.on('ready', () => {
            this._isConnected = true
            this._logger.log('Redis ready')
        })
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
            expiration: opts?.isForever ? {
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
