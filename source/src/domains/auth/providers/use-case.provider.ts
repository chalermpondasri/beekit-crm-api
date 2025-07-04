import { Provider } from '@nestjs/common'
import { ITokenizationService } from '@domains/auth/interfaces/tokenization.interface'
import { CreateJwtTokenUseCase } from '@domains/auth/use-cases/create-jwt-token.use-case'
import { ProviderName } from '@core/constants/provider-name.enum'

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
