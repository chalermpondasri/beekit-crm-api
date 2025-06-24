import {
    Global,
    Module,
    Scope,
} from '@nestjs/common'
import { environmentConfigProvider } from './providers/config.provider'
import { errorFactoryServiceProvider } from './providers/error-factory.provider'
import { requestContextServiceProvider } from './providers/request-context-service.provider'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { RequestContextInterceptor } from '@core/interceptors/request-context.interceptor'
import {
    accessLoggerServiceProvider,
    loggerServiceProvider,
} from '@core/providers/logger-service.provider'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { cacheServiceProvider } from '@core/providers/cache-service.provider'

@Global()
@Module({
    imports: [
        TokenizationModule,
    ],
    providers: [
        environmentConfigProvider,
        loggerServiceProvider,
        accessLoggerServiceProvider,
        requestContextServiceProvider,
        errorFactoryServiceProvider,
        cacheServiceProvider,

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
        accessLoggerServiceProvider,
        cacheServiceProvider,
    ],
})
export class CoreModule {
}
