import { ProviderName } from '@constants/provider-name.enum'
import { Provider } from '@nestjs/common'
import { EnvironmentConfig } from '@common/models/environment-config.model'
import { IKeySigner } from '@domains/services/interfaces/tokenization.interface'
import { TokenizationService } from '@domains/services/tokenization.service'

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
