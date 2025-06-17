import {
    Provider,
    Scope,
} from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { GlobalExceptionFilter } from '@core/filters/global-exception.filter'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { IAccessLoggerService } from '@core/interfaces/access-logger.service.interface'
import { IRequestContextService } from '@core/interfaces/request-context.service.interface'
import { APP_FILTER } from '@nestjs/core'

export const exceptionFilters: Provider[] = [
    {
        provide: APP_FILTER,
        scope: Scope.REQUEST,
        inject: [
            ProviderName.LOGGER_SERVICE,
            ProviderName.ENVIRONMENT_CONFIG,
            ProviderName.ACCESS_LOGGER_SERVICE,
            ProviderName.REQUEST_CONTEXT_SERVICE,
        ],
        useFactory: (
            logger: ILoggerService,
            config: EnvironmentConfig,
            accessLogger: IAccessLoggerService,
            requestContext: IRequestContextService,
        ) => {
            return new GlobalExceptionFilter(
                logger,
                config,
                accessLogger,
                requestContext,
            )
        },
    }
]
