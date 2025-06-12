import { Provider } from '@nestjs/common'
import { ProviderName } from '@constants/provider-name.enum'
import { ITokenizationService } from '@domains/services/interfaces/tokenization.interface'
import { CreateJwtTokenUseCase } from '@domains/use-cases/create-jwt-token.use-case'
import { AuthenticationUseCase } from '@domains/use-cases/authentication.use-case'
import { IEGovAdapter } from '@adapters/egov/interfaces/egov.interface'

export const createJwtUseCaseProvider: Provider = {
    provide: ProviderName.USE_CASE_CREATE_JWT,
    inject: [
        ProviderName.TOKENIZATION_SERVICE,
    ],
    useFactory: (
        tokenizationService: ITokenizationService,
    ) => {
        return new CreateJwtTokenUseCase(tokenizationService)
    },
}

export const authenticationUseCaseProvider: Provider = {
    provide: ProviderName.USE_CASE_AUTHENTICATION,
    inject: [
        ProviderName.EGOV_ADAPTER,
    ],
    useFactory: (eGovAdapter: IEGovAdapter) => {
        return new AuthenticationUseCase(eGovAdapter)
    },
}
