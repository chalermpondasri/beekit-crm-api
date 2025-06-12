import {
    Global,
    Module,
} from '@nestjs/common'
import { environmentConfigProvider } from './providers/config.provider'
import { errorFactoryServiceProvider } from './providers/error-factory.provider'
import { LoggerModule } from './logger.module'

@Global()
@Module({
    imports: [
        LoggerModule,
    ],
    providers: [
        environmentConfigProvider,
        errorFactoryServiceProvider,
    ],
    exports: [
        environmentConfigProvider,
        errorFactoryServiceProvider,
    ],
})
export class CoreModule {}
