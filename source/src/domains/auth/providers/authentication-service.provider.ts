import { Provider } from '@nestjs/common'
import { ProviderName } from '../../../core/constants/provider-name.enum'
import { IErrorFactory } from '../../../core/factories/error/interfaces/error.factory.interface'
import { ILoggerService } from '@domains/auth/interfaces/logger.service.interface'
import { AuthenticationService } from '@domains/auth/services/authentication.service'
import { ICreateJwtTokenUseCase } from '@domains/auth/use-cases/interfaces/create-jwt-token.interface'
import { IAuthenticateUserUseCase } from '@domains/auth/use-cases/interfaces/authenticate-user.interface'

export const authenticationServiceProvider: Provider = {
    provide: ProviderName.AUTHENTICATION_SERVICE,
    inject: [
        ProviderName.USE_CASE_AUTHENTICATION,
        ProviderName.USE_CASE_CREATE_JWT,
        ProviderName.ERROR_FACTORY_SERVICE,
        ProviderName.LOGGER_SERVICE,
    ],
    useFactory: (
        authenticationUseCase: IAuthenticateUserUseCase,
        createJwtUseCase: ICreateJwtTokenUseCase,
        errorFactoryService: IErrorFactory,
        loggerService: ILoggerService,
    ) => {
        return new AuthenticationService(
            errorFactoryService,
            loggerService.setContext(ProviderName.AUTHENTICATION_SERVICE),
            authenticationUseCase,
            createJwtUseCase,
        )
    },
}
