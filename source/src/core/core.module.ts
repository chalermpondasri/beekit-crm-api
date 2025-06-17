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
import { TokenizationModule } from '@domains/auth/tokenization.module'
import {
    accessLoggerServiceProvider,
    loggerServiceProvider,
} from '@core/providers/logger-service.provider'

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
    ],
})
export class CoreModule {
}
