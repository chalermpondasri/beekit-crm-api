import {
    Provider,
    Scope,
} from '@nestjs/common'
import { ProviderName } from '../constants/provider-name.enum'
import { WinstonConsoleLogger } from '@core/services/logger.service'
import { EnvironmentConfig } from '../models/environment-config.model'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { IRequestContextService } from '@core/interfaces/request-context.service.interface'
import { AccessLoggerService } from '@core/services/access-logger.service'
import * as process from 'node:process'
import { Logger } from 'winston'

export const loggerServiceProvider: Provider = {
    provide: ProviderName.LOGGER_SERVICE,
    scope: Scope.TRANSIENT,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
        ProviderName.REQUEST_CONTEXT_SERVICE,
    ],
    useFactory: (
        env: EnvironmentConfig,
        requestContextService: IRequestContextService,
        ): ILoggerService => {

        const args = {
            appId: env.APP_ID,
            appName: env.APP_NAME,
            requestId: requestContextService.getRequestId(),
            traceId: requestContextService.getTraceId(),
            userId: requestContextService.getUserId(),
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
