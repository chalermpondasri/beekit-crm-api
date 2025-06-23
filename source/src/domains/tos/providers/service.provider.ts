import { Provider } from "@nestjs/common";
import { ProviderName } from '@core/constants/provider-name.enum'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { IGetUserAcceptedTermUseCase } from '@domains/tos/interfaces/use-case.interface'
import { TosService } from '@domains/tos/services/tos.service'

export const serviceProviders: Provider[] = [
    {
        provide: ProviderName.TERM_OF_SERVICE_SERVICE,
        inject: [
            ProviderName.ENVIRONMENT_CONFIG,
            ProviderName.USE_CASE_GET_ACCEPT_TERM,
        ],
        useFactory: (
            config: EnvironmentConfig,
            getUserTermUseCase: IGetUserAcceptedTermUseCase,
        ) => {
            return new TosService(
                config.TOS_VERSION,
                getUserTermUseCase,
            )
        }

    }
]
