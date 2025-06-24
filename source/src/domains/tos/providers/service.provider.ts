import { Provider } from "@nestjs/common";
import { ProviderName } from '@core/constants/provider-name.enum'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import {
    IGetUserAcceptedTermUseCase,
    IUpdateUserAcceptedTermUseCase,
} from '@domains/tos/interfaces/use-case.interface'
import { TosService } from '@domains/tos/services/tos.service'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'
import { ICacheService } from '@core/interfaces/cache.service.interface'

export const serviceProviders: Provider[] = [
    {
        provide: ProviderName.TERM_OF_SERVICE_SERVICE,
        inject: [
            ProviderName.ERROR_FACTORY_SERVICE,
            ProviderName.ENVIRONMENT_CONFIG,
            ProviderName.USE_CASE_GET_ACCEPT_TERM,
            ProviderName.USE_CASE_UPDATE_USER_TERM,
            ProviderName.CACHE_SERVICE,
        ],
        useFactory: (
            errorFactoryService: IErrorFactory,
            config: EnvironmentConfig,
            getUserTermUseCase: IGetUserAcceptedTermUseCase,
            updateUserTermUseCase: IUpdateUserAcceptedTermUseCase,
            cacheService: ICacheService,
        ) => {
            return new TosService(
                errorFactoryService,
                config.TOS_VERSION,
                getUserTermUseCase,
                updateUserTermUseCase,
                cacheService,
            )
        }

    }
]
