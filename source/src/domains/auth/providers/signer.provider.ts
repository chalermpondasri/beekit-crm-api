import { Provider } from '@nestjs/common'
import { JwtSignerService } from '@domains/auth/services/signer.service'
import { ProviderName } from '@core/constants/provider-name.enum'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { Algorithm } from 'fast-jwt'
import ms from 'ms'

export const accessTokenSignerProvider: Provider = {
    provide: ProviderName.ACCESS_TOKEN_SIGNER,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (
        config: EnvironmentConfig,
    ) => {
        return new JwtSignerService(
            config.JWT_ACCESS_TOKEN_PRIVATE_KEY,
            config.JWT_ACCESS_TOKEN_PUBLIC_KEY,
            config.JWT_ACCESS_KEY_ALGORITHM as Algorithm,
            config.JWT_ACCESS_TOKEN_TTL as ms.StringValue,
        )
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
        return new JwtSignerService(
            config.JWT_REFRESH_TOKEN_PRIVATE_KEY,
            config.JWT_REFRESH_TOKEN_PUBLIC_KEY,
            config.JWT_REFRESH_KEY_ALGORITHM as Algorithm,
            config.JWT_REFRESH_TOKEN_TTL as ms.StringValue,
        )
    },
}
