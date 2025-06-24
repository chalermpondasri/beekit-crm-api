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

        try {
            let redisClient: RedisClientType = createClient({
                url: config.REDIS_CONNECTION_STRING,

                socket: {
                    timeout: 5000,
                    connectTimeout: 5000,
                    reconnectStrategy: (retries: number, cause) => {
                        console.log(cause)
                        if (retries < 5) {
                            return Math.min((retries+1) * 1000, 3000)
                        } else if (retries < 15) {
                            return Math.min((retries+1) * 3000, 10000)
                        } else if (retries < 25) {
                            return 30000
                        } else {
                            console.error('Redis connection failed permanently after 25 retries')
                            return false
                        }
                    },

                },
                disableOfflineQueue: true,
            })
            await redisClient.connect()
            return new RedisCacheService(redisClient)
        } catch (error) {
            console.error('Failed to connect to Redis:', error)
            return new MemoryCacheService()
        }

    },
}
