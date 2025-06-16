import {
    Global,
    Module,
} from '@nestjs/common'
import { environmentConfigProvider } from './providers/config.provider'
import { errorFactoryServiceProvider } from './providers/error-factory.provider'
import { LoggerModule } from './logger.module'
import { requestContextServiceProvider } from './providers/request-context-service.provider'

@Global()
@Module({
    imports: [
        LoggerModule,
    ],
    providers: [
        requestContextServiceProvider,
        environmentConfigProvider,
        errorFactoryServiceProvider,
    ],
    exports: [
        requestContextServiceProvider,
        environmentConfigProvider,
        errorFactoryServiceProvider,
    ],
})
export class CoreModule {}
