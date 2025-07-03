import {Module} from '@nestjs/common'
import {cacheServiceProvider} from '@core/providers/cache-service.provider'

@Module({
    providers: [
        cacheServiceProvider,
    ],
    exports: [
        cacheServiceProvider,
    ],
})
export class CacheModule {
}
