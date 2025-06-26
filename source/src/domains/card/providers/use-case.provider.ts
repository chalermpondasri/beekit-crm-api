import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { ValidateRabbitCardRegistrationUseCase } from '@domains/card/use-cases/validate-rabbit-card.use-case'

export const useCaseProviders: Provider[] = [
    {
        provide: ProviderName.USE_CASE_VALIDATE_RABBIT_CARD,
        inject: [
            ProviderName.CARD_REPOSITORY,
        ],
        useFactory: (
            cardRepository: ICardRepository,
        ) => new ValidateRabbitCardRegistrationUseCase(
            cardRepository,
        ),
    },
]
