import {
    Global,
    Module,
} from '@nestjs/common'
import { environmentConfigProvider } from './providers/config.provider'
import { errorFactoryServiceProvider } from './providers/error-factory.provider'
import { LoggerModule } from './logger.module'
import { requestContextServiceProvider } from './providers/request-context-service.provider'
import { APP_FILTER } from '@nestjs/core'
import { GlobalExceptionFilter } from '@core/filters/global-exception.filter'

@Global()
@Module({
    imports: [
        LoggerModule,
    ],
    providers: [
        requestContextServiceProvider,
        environmentConfigProvider,
        errorFactoryServiceProvider,
        { provide: APP_FILTER, useClass: GlobalExceptionFilter}
    ],
    exports: [
        requestContextServiceProvider,
        environmentConfigProvider,
        errorFactoryServiceProvider,
    ],
})
export class CoreModule {}
