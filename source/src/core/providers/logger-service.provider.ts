import { Provider } from '@nestjs/common'
import { ProviderName } from '../constants/provider-name.enum'
import { WinstonConsoleLogger } from '@core/services/logger.service'
import { EnvironmentConfig } from '../models/environment-config.model'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { AccessLoggerService } from '@core/services/access-logger.service'

export const loggerServiceProvider: Provider = {
    provide: ProviderName.LOGGER_SERVICE,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    useFactory: (
        env: EnvironmentConfig,
        ): ILoggerService => {

        const args = {
            appId: env.APP_ID,
            appName: env.APP_NAME,
        }

        return new WinstonConsoleLogger( env.APP_ENV === 'local' ? 'console': 'json', args)
    },

}

export const accessLoggerServiceProvider: Provider = {
    provide: ProviderName.ACCESS_LOGGER_SERVICE,
    inject: [
    ],
    useFactory: (
    ) => {
        return new AccessLoggerService()
    },
}
