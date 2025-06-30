import {
    Provider,
    Scope,
} from '@nestjs/common'
import { ProviderName } from '../constants/provider-name.enum'
import { RequestContextService } from '../services/request-context.service'
import { IGetUserAcceptedTermUseCase } from '@domains/tos/interfaces/use-case.interface'
import { EnvironmentConfig } from '@core/models/environment-config.model'

export const requestContextServiceProvider: Provider = {
    provide: ProviderName.REQUEST_CONTEXT_SERVICE,
    scope: Scope.REQUEST,
    inject: [
        ProviderName.USE_CASE_GET_ACCEPT_TERM,
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (
        getUserAcceptTermUseCase: IGetUserAcceptedTermUseCase,
        config: EnvironmentConfig,
    ) => {
        return new RequestContextService(
            getUserAcceptTermUseCase,
            config.TOS_VERSION,
        )
    },
}
