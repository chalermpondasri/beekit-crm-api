import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { CardRegistrationService } from '@domains/card/services/card-registration.service'
import { IRabbitCardRegistrationService } from '@domains/card/interfaces/service.interface'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'
import { IRegisterNewRabbitCardUseCase } from '@domains/card/interfaces/use-case.interface'

export const serviceProviders: Provider[] = [
    {
        provide: ProviderName.RABBIT_CARD_REGISTRATION_SERVICE,
        inject: [
            ProviderName.ERROR_FACTORY_SERVICE,
            ProviderName.USE_CASE_REGISTER_RABBIT_CARD,
        ],
        useFactory: (
            efs: IErrorFactory,
            registerUseCase: IRegisterNewRabbitCardUseCase,
        ): IRabbitCardRegistrationService => {
            return new CardRegistrationService(
                efs,
                registerUseCase,
            )
        }
    },
    {
        provide: ProviderName.EMV_CARD_REGISTRATION_SERVICE,
        inject: [
            ProviderName.ERROR_FACTORY_SERVICE,
            ProviderName.USE_CASE_REGISTER_RABBIT_CARD,
        ],
        useFactory: (
            efs: IErrorFactory,
            registerUseCase: IRegisterNewRabbitCardUseCase,
        ): IRabbitCardRegistrationService => {
            return new CardRegistrationService(
                efs,
                registerUseCase,
            )
        }
    }
]
