import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { CardRegistrationService } from '@domains/card/services/card-registration.service'
import { IRabbitCardRegistrationService } from '@domains/card/interfaces/service.interface'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'
import { IValidateRabbitCardRegistrationUseCase } from '@domains/card/interfaces/use-case.interface'

export const serviceProviders: Provider[] = [
    {
        provide: ProviderName.RABBIT_CARD_REGISTRATION_SERVICE,
        inject: [
            ProviderName.ERROR_FACTORY_SERVICE,
            ProviderName.USE_CASE_VALIDATE_RABBIT_CARD,
        ],
        useFactory: (
            efs: IErrorFactory,
            validateRabbitUseCase: IValidateRabbitCardRegistrationUseCase,
        ): IRabbitCardRegistrationService => {
            return new CardRegistrationService(
                efs,
                validateRabbitUseCase,
            )
        }
    },
    {
        provide: ProviderName.EMV_CARD_REGISTRATION_SERVICE,
        inject: [
            ProviderName.ERROR_FACTORY_SERVICE,
            ProviderName.USE_CASE_VALIDATE_RABBIT_CARD,
        ],
        useFactory: (
            efs: IErrorFactory,
            validateRabbitUseCase: IValidateRabbitCardRegistrationUseCase,
        ): IRabbitCardRegistrationService => {
            return new CardRegistrationService(
                efs,
                validateRabbitUseCase,
            )
        }
    }
]
