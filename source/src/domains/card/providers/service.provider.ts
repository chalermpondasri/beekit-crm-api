import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { CardRegistrationService } from '@domains/card/services/card-registration.service'
import { IRabbitCardRegistrationService } from '@domains/card/interfaces/service.interface'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'
import {
    IListRegisteredCardsUseCase,
    IRegisterNewRabbitCardUseCase,
} from '@domains/card/interfaces/use-case.interface'

export const serviceProviders: Provider[] = [
    {
        provide: ProviderName.CARD_REGISTRATION_SERVICE,
        inject: [
            ProviderName.ERROR_FACTORY_SERVICE,
            ProviderName.USE_CASE_REGISTER_RABBIT_CARD,
            ProviderName.USE_CASE_LIST_CARDS,
        ],
        useFactory: (
            efs: IErrorFactory,
            registerUseCase: IRegisterNewRabbitCardUseCase,
            listCardUseCase: IListRegisteredCardsUseCase,
        ): IRabbitCardRegistrationService => {
            return new CardRegistrationService(
                efs,
                registerUseCase,
                listCardUseCase,
            )
        }
    },
]
