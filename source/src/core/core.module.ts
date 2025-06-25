import {
    Global,
    Module,
    Scope,
} from '@nestjs/common'
import { environmentConfigProvider } from './providers/config.provider'
import { errorFactoryServiceProvider } from './providers/error-factory.provider'
import { requestContextServiceProvider } from './providers/request-context-service.provider'
import { APP_INTERCEPTOR } from '@nestjs/core'
import {
    accessLoggerServiceProvider,
    loggerServiceProvider,
} from '@core/providers/logger-service.provider'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { AccessRequestInterceptor } from '@core/interceptors/access-request.interceptor'
import { TosModule } from '@domains/tos/tos.module'

@Global()
@Module({
    imports: [
        TokenizationModule,
        TosModule,
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
            useClass: AccessRequestInterceptor,
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
