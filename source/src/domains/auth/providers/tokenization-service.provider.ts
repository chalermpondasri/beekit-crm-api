import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { IKeySigner } from '@domains/auth/interfaces/tokenization.interface'
import { TokenizationService } from '@domains/auth/services/tokenization.service'

export const tokenizationServiceProvider: Provider = {
    provide: ProviderName.TOKENIZATION_SERVICE,
    inject: [
        ProviderName.ACCESS_TOKEN_SIGNER,
        ProviderName.REFRESH_TOKEN_SIGNER,
    ],
    useFactory: (
        accessTokenSigner: IKeySigner,
        refreshTokenSigner: IKeySigner,
    ) => {
        return new TokenizationService(
            accessTokenSigner,
            refreshTokenSigner,
        )
    },
}
