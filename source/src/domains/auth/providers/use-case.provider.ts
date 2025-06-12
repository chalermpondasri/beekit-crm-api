import { Provider } from '@nestjs/common'
import { ProviderName } from '../../../core/constants/provider-name.enum'
import { ITokenizationService } from '@domains/auth/interfaces/tokenization.interface'
import { CreateJwtTokenUseCase } from '@domains/auth/use-cases/create-jwt-token.use-case'
import { AuthenticationUseCase } from '@domains/auth/use-cases/authentication.use-case'
import { IEGovAdapter } from '../../../shared/adapters/egov/interfaces/egov.interface'

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
