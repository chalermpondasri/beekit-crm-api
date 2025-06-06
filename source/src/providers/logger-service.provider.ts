import {
    Provider,
    Scope,
} from '@nestjs/common'
import { ProviderName } from '@constants/provider-name.enum'
import { WinstonConsoleLogger } from '@domains/services/logger.service'
import { EnvironmentConfig } from '@common/models/environment-config.model'
import { ILoggerService } from '@domains/services/interfaces/logger.service.interface'

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
