import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { ValidateRabbitCardRegistrationUseCase } from '@domains/card/use-cases/validate-rabbit-card.use-case'
import { RegisterNewRabbitCardUseCase } from '@domains/card/use-cases/register-rabbit-card.use-case'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { IRabbitTransitAdapter } from '@shared/adapters/interfaces/rabbit-transit.interface'
import { IValidateRabbitCardRegistrationUseCase } from '@domains/card/interfaces/use-case.interface'
import { ICchAdapter } from '@shared/adapters/interfaces/cch.adapter'

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
    {
        provide: ProviderName.USE_CASE_REGISTER_RABBIT_CARD,
        inject: [
            ProviderName.LOGGER_SERVICE,
            ProviderName.RABBIT_TRANSIT_ADAPTER,
            ProviderName.USE_CASE_VALIDATE_RABBIT_CARD,
            ProviderName.CARD_REPOSITORY,
        ],
        useFactory: (
            logger: ILoggerService,
            rabbitTransitAdapter: IRabbitTransitAdapter,
            validateRabbitUseCase: IValidateRabbitCardRegistrationUseCase,
            cardRepository: ICardRepository,
            cchAdapter: ICchAdapter,
        ) => {
            return new RegisterNewRabbitCardUseCase(
                logger,
                rabbitTransitAdapter,
                validateRabbitUseCase,
                cardRepository,
                cchAdapter,
            )
        }
    }
]
