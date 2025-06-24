import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { MemoryCacheService } from '@core/services/memory-cache.service'
import { RedisCacheService } from '@core/services/redis-cache.service'
import {
    createClient,
    RedisClientType,
} from '@redis/client'


export const cacheServiceProvider: Provider = {
    provide: ProviderName.CACHE_SERVICE,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: async (config: EnvironmentConfig) => {

        if (!config.REDIS_CONNECTION_STRING) {
            return new MemoryCacheService()
        }

        const redisClient: RedisClientType = createClient({ url: config.REDIS_CONNECTION_STRING })
        await redisClient.connect()
        return new RedisCacheService(redisClient)
    },
}
