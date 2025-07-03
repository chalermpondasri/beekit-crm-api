import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import KeyvRedis from '@keyv/redis'
import Keyv from 'keyv'
import { KeyvCacheService } from '@core/services/keyv-cache.service'
import { ICacheService } from '@core/interfaces/cache.service.interface'
import ms from 'ms'

export const cacheServiceProvider: Provider = {
    provide: ProviderName.CACHE_SERVICE,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (config: EnvironmentConfig): ICacheService => {
        return new KeyvCacheService(
            new Keyv({
                    store: !config.REDIS_CONNECTION_STRING
                        ? null
                        : new KeyvRedis(config.REDIS_CONNECTION_STRING),
                    namespace: 'est',
                    ttl: ms('3h'),
                },
            ),
        )

    },
}
