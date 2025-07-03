import {Module} from '@nestjs/common'
import { cacheServiceProvider, keyvRedisProvider } from '@core/providers/cache-service.provider'

@Module({
    providers: [
        keyvRedisProvider,
        ...cacheServiceProvider,
    ],
    exports: [
        ...cacheServiceProvider,
    ],
})
export class CacheModule {
}
