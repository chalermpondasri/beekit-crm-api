import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { ValidateRabbitCardRegistrationUseCase } from '@domains/card/use-cases/validate-rabbit-card.use-case'
import { RegisterNewRabbitCardUseCase } from '@domains/card/use-cases/register-rabbit-card.use-case'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { IRabbitTransitAdapter } from '@shared/adapters/interfaces/rabbit-transit.interface'
import { ICchAdapter } from '@shared/adapters/interfaces/cch.adapter'
import { ListUserCardsUseCase } from '@domains/card/use-cases/list-user-cards.use-case'
import { IUseCase } from '@shared/interfaces/use-case.interface'
import { UnregisterCardUseCase } from '@domains/card/use-cases/unregister-card.use-case'

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
            validateRabbitUseCase: IUseCase<any, any>,
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
    },
    {
        provide: ProviderName.USE_CASE_LIST_CARDS,
        inject: [
            ProviderName.CARD_REPOSITORY,
        ],
        useFactory: (
            cardRepository: ICardRepository,
        ) => {
            return new ListUserCardsUseCase(
                cardRepository,
            )
        }
    },
    {
        provide: ProviderName.USE_CASE_UNREGISTER_CARD,
        inject: [
            ProviderName.CARD_REPOSITORY,
            ProviderName.RABBIT_TRANSIT_ADAPTER,
        ],
        useFactory: (
            cardRepository: ICardRepository,
            rabbitTransitAdapter: IRabbitTransitAdapter,
        ) => {
            return new UnregisterCardUseCase(
                cardRepository,
                rabbitTransitAdapter,
            )
        }
    }
]
