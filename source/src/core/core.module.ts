import {
    Global,
    Module,
    Scope,
} from '@nestjs/common'
import { environmentConfigProvider } from './providers/config.provider'
import { errorFactoryServiceProvider } from './providers/error-factory.provider'
import { requestContextServiceProvider } from './providers/request-context-service.provider'
import {
    APP_FILTER,
    APP_INTERCEPTOR,
} from '@nestjs/core'
import { RequestContextInterceptor } from '@core/interceptors/request-context.interceptor'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { GlobalExceptionFilter } from '@core/filters/global-exception.filter'
import {
    accessLoggerServiceProvider,
    loggerServiceProvider,
} from '@core/providers/logger-service.provider'
import { exceptionFilters } from '@core/providers/filters.provider'
@Global()
@Module({
    imports: [
        TokenizationModule,
    ],
    providers: [
        environmentConfigProvider,
        loggerServiceProvider,
        accessLoggerServiceProvider,
        ...exceptionFilters,
        requestContextServiceProvider,
        errorFactoryServiceProvider,

        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: RequestContextInterceptor,
        },
    ],
    exports: [
        requestContextServiceProvider,
        environmentConfigProvider,
        errorFactoryServiceProvider,
        loggerServiceProvider,
        ...exceptionFilters,
    ],
})
export class CoreModule {
}
