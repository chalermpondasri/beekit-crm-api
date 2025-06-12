import {
    Provider,
    Scope,
} from '@nestjs/common'
import { ProviderName } from '../constants/provider-name.enum'
import { WinstonConsoleLogger } from '@domains/auth/services/logger.service'
import { EnvironmentConfig } from '../models/environment-config.model'
import { ILoggerService } from '@domains/auth/interfaces/logger.service.interface'

export const loggerServiceProvider: Provider = {
    provide: ProviderName.LOGGER_SERVICE,
    scope: Scope.TRANSIENT,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (env: EnvironmentConfig): ILoggerService => {
        return new WinstonConsoleLogger( env.APP_ENV === 'local' ? 'console': 'json')
    },

}
