import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { GetUserAcceptedTermUseCase } from '@domains/tos/use-cases/get-user-accepted-term.use-case'

export const useCaseProviders : Provider[] = [
    {
        provide: ProviderName.USE_CASE_GET_ACCEPT_TERM,
        inject: [
            ProviderName.ACCEPT_TERM_REPOSITORY,
        ],
        useFactory: (
            acceptTermRepository,
        ) => new GetUserAcceptedTermUseCase(acceptTermRepository),
    }
]
