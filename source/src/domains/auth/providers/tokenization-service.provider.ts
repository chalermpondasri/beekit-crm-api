import { ProviderName } from '../../../core/constants/provider-name.enum'
import { Provider } from '@nestjs/common'
import { EnvironmentConfig } from '../../../core/models/environment-config.model'
import { IKeySigner } from '@domains/auth/interfaces/tokenization.interface'
import { TokenizationService } from '@domains/auth/services/tokenization.service'

export const tokenizationServiceProvider: Provider = {
    provide: ProviderName.TOKENIZATION_SERVICE,
    inject: [
        ProviderName.ACCESS_TOKEN_SIGNER,
        ProviderName.REFRESH_TOKEN_SIGNER,
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (
        accessTokenSigner: IKeySigner,
        refreshTokenSigner: IKeySigner,
        config: EnvironmentConfig,
    ) => {
        return new TokenizationService(
            accessTokenSigner,
            refreshTokenSigner,
            config.JWT_ACCESS_TOKEN_TTL,
            config.JWT_REFRESH_TOKEN_TTL,
        )
    },
}
