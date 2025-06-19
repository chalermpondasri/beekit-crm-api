import { Provider } from '@nestjs/common'
import { TestQueryUseCase } from '@domains/test/use-cases/test-query.use-case'
import { TestCommandUseCase } from '@domains/test/use-cases/test-command.use-case'
import { ProviderName } from '@core/constants/provider-name.enum'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'

export const useCaseProviders: Provider[] = [
    {
        provide: 'TEST_QUERY',
        inject: [
            ProviderName.CARD_REPOSITORY,
        ],
        useFactory: (cardRepository: ICardRepository) => new TestQueryUseCase(cardRepository),
    },
    {
        provide: 'TEST_COMMAND',
        inject: [
            ProviderName.CARD_REPOSITORY,
        ],
        useFactory: (cardRepository: ICardRepository) => new TestCommandUseCase(cardRepository)
    }
]
