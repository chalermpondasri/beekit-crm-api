import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { EncryptionService } from '@core/services/encryption.service'
import { EnvironmentConfig } from '@core/models/environment-config.model'

export const encryptionServiceProvider: Provider = {
    provide: ProviderName.ENCRYPTION_SERVICE,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (config: EnvironmentConfig) => {

        return new EncryptionService(
            'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        )
    },
}
