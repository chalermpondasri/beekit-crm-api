import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { MemoryCacheService } from '@core/services/memory-cache.service'

export const cacheServiceProvider: Provider = {
    provide: ProviderName.CACHE_SERVICE,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (config: EnvironmentConfig) => {
        return new MemoryCacheService()
    }
}
