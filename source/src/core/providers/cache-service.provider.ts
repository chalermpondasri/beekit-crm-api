import { Provider, Scope } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import KeyvRedis, { createClient } from '@keyv/redis'
import Keyv from 'keyv'
import { KeyvCacheService } from '@core/services/keyv-cache.service'
import { ICacheService } from '@core/interfaces/cache.service.interface'
import ms from 'ms'
import { IEncryptionService } from '@core/interfaces/encryption.service.interface'

export const keyvRedisProvider: Provider = {
    provide: ProviderName.KEYV_REDIS,
    scope: Scope.TRANSIENT,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory(config: EnvironmentConfig) {
        return new Keyv({
                store: !config.REDIS_CONNECTION_STRING
                    ? null
                    : new KeyvRedis(createClient({url: config.REDIS_CONNECTION_STRING})),
                ttl: ms('3h'),
            },
        )
    },
}

export const cacheServiceProvider: Provider[] = [
    {
        provide: ProviderName.CACHE_SERVICE,
        inject: [
            ProviderName.ENVIRONMENT_CONFIG,
            ProviderName.KEYV_REDIS,
        ],
        useFactory: (
            config: EnvironmentConfig,
            keyv: Keyv,
        ): ICacheService => {
            keyv.namespace = `${config.APP_ENV}:${config.APP_NAME}:plain`
            return new KeyvCacheService(keyv)
        },
    },
    {
        provide: ProviderName.ENCRYPTED_CACHE_SERVICE,
        inject: [
            ProviderName.ENVIRONMENT_CONFIG,
            ProviderName.ENCRYPTION_SERVICE,
            ProviderName.KEYV_REDIS,
        ],
        useFactory: (
            config: EnvironmentConfig,
            encryptionService: IEncryptionService,
            keyv: Keyv,
        ): ICacheService => {
            keyv.namespace = `${config.APP_ENV}:${config.APP_NAME}:enc`
            keyv.serialize = encryptionService.encrypt.bind(encryptionService)
            keyv.deserialize = encryptionService.decrypt.bind(encryptionService)

            return new KeyvCacheService(keyv)
        },
    },
]
