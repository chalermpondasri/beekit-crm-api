import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { GetUserAcceptedTermUseCase } from '@domains/tos/use-cases/get-user-accepted-term.use-case'
import { IAcceptTermRepository } from '@shared/repositories/interfaces/term.repository.interface'
import { UpdateUserTermUseCase } from '@domains/tos/use-cases/update-user-term.use-case'

export const useCaseProviders : Provider[] = [
    {
        provide: ProviderName.USE_CASE_GET_ACCEPT_TERM,
        inject: [
            ProviderName.ACCEPT_TERM_REPOSITORY,
        ],
        useFactory: (
            acceptTermRepository: IAcceptTermRepository,
        ) => new GetUserAcceptedTermUseCase(acceptTermRepository),
    },
    {
      provide: ProviderName.USE_CASE_UPDATE_USER_TERM,
      inject: [
          ProviderName.ACCEPT_TERM_REPOSITORY,
          ProviderName.CACHE_SERVICE,
      ],
        useFactory: (
            acceptTermRepository: IAcceptTermRepository,
        ) => new UpdateUserTermUseCase(
            acceptTermRepository,
        ),
    }
]
