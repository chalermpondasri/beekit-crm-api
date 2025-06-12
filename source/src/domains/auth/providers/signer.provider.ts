import { Provider } from '@nestjs/common'
import { ProviderName } from '../../../core/constants/provider-name.enum'
import { EnvironmentConfig } from '../../../core/models/environment-config.model'
import { JwtSignerService } from '@domains/auth/services/signer.service'

export const accessTokenSignerProvider: Provider = {
    provide: ProviderName.ACCESS_TOKEN_SIGNER,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (
        config: EnvironmentConfig,
    ) => {
        return new JwtSignerService(config.JWT_ACCESS_TOKEN_KEY)
    },
}

export const refreshTokenSignerProvider: Provider = {
    provide: ProviderName.REFRESH_TOKEN_SIGNER,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (
        config: EnvironmentConfig,
    ) => {
        return new JwtSignerService(config.JWT_REFRESH_TOKEN_KEY)
    },
}
