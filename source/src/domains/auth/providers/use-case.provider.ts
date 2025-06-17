import { Provider } from '@nestjs/common'
import { ITokenizationService } from '@domains/auth/interfaces/tokenization.interface'
import { CreateJwtTokenUseCase } from '@domains/auth/use-cases/create-jwt-token.use-case'
import { AuthenticationUseCase } from '@domains/auth/use-cases/authentication.use-case'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { ProviderName } from '@core/constants/provider-name.enum'
import { IEGovAdapter } from '@shared/adapters/egov/interfaces/egov.interface'
import { ILoggerService } from '@core/interfaces/logger.service.interface'

export const createJwtUseCaseProvider: Provider = {
    provide: ProviderName.USE_CASE_CREATE_JWT,
    inject: [
        ProviderName.TOKENIZATION_SERVICE,
    ],
    useFactory: (
        tokenizationService: ITokenizationService,
    ) => {
        return new CreateJwtTokenUseCase(tokenizationService)
    },
}

export const authenticationUseCaseProvider: Provider = {
    provide: ProviderName.USE_CASE_AUTHENTICATION,
    inject: [
        ProviderName.EGOV_ADAPTER,
        ProviderName.ENVIRONMENT_CONFIG,
        ProviderName.LOGGER_SERVICE,
    ],
    useFactory: (
        eGovAdapter: IEGovAdapter,
        config: EnvironmentConfig,
        loggerService: ILoggerService,
    ) => {

        return new AuthenticationUseCase(
            eGovAdapter,
            config,
            loggerService.setContext(ProviderName.USE_CASE_AUTHENTICATION),
        )
    },
}
