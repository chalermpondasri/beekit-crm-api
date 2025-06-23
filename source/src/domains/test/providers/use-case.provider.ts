import { Provider } from '@nestjs/common'
import { TestQueryUseCase } from '@domains/test/use-cases/test-query.use-case'
import { TestCommandUseCase } from '@domains/test/use-cases/test-command.use-case'
import { ProviderName } from '@core/constants/provider-name.enum'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { AcceptTermUseCase } from '@domains/test/use-cases/create-term.use-case'
import { IAcceptTermRepository } from '@shared/repositories/interfaces/term.repository.interface'

export const useCaseProviders: Provider[] = [
    {
        provide: 'TEST_QUERY',
        inject: [
            ProviderName.ACCEPT_TERM_REPOSITORY,
        ],
        useFactory: (acceptTermRepository: IAcceptTermRepository) => new TestQueryUseCase(acceptTermRepository),
    },
    {
        provide: 'TEST_COMMAND',
        inject: [
            ProviderName.CARD_REPOSITORY,
        ],
        useFactory: (cardRepository: ICardRepository) => new TestCommandUseCase(cardRepository)
    },
    {
        provide: ProviderName.USE_CASE_ACCEPT_TERM,
        inject: [
            ProviderName.ACCEPT_TERM_REPOSITORY,
        ],
        useFactory: (acceptTermRepository) => new AcceptTermUseCase(acceptTermRepository),
    },
    {
        provide: ProviderName.USE_CASE_ACCEPT_TERM_CC,
        inject: [
            ProviderName.ACCEPT_TERM_CLUSTER_REPOSITORY
        ],
        useFactory: (acceptTermClusterRepository) => new AcceptTermUseCase(acceptTermClusterRepository),
    },
    {
        provide: ProviderName.USE_CASE_ACCEPT_TERM_QUERY_CC,
        inject: [
            ProviderName.ACCEPT_TERM_CLUSTER_REPOSITORY
        ],
        useFactory: (acceptTermClusterRepository) => new TestQueryUseCase(acceptTermClusterRepository),
    }
]
