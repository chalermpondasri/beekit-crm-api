import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { CardRegistrationService } from '@domains/card/services/card-registration.service'
import { IRabbitCardRegistrationService } from '@domains/card/interfaces/service.interface'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'
import { IUseCase } from '@shared/interfaces/use-case.interface'
import { ICacheService } from '@core/interfaces/cache.service.interface'

export const serviceProviders: Provider[] = [
    {
        provide: ProviderName.CARD_REGISTRATION_SERVICE,
        inject: [
            ProviderName.CACHE_SERVICE,
            ProviderName.ERROR_FACTORY_SERVICE,
            ProviderName.USE_CASE_REGISTER_RABBIT_CARD,
            ProviderName.USE_CASE_LIST_CARDS,
            ProviderName.USE_CASE_UNREGISTER_CARD,
            ProviderName.USE_CASE_REGISTER_EMV_CARD,
        ],
        useFactory: (
            cacheService: ICacheService,
            efs: IErrorFactory,
            registerUseCase: IUseCase<any, any>,
            listCardUseCase: IUseCase<any, any>,
            unregisterUseCase: IUseCase<any, any>,
            registerEmvCardUseCase: IUseCase<any, any>,
        ): IRabbitCardRegistrationService => {
            return new CardRegistrationService(
                cacheService,
                efs,
                registerUseCase,
                listCardUseCase,
                unregisterUseCase,
                registerEmvCardUseCase,
            )
        },
    },
]
