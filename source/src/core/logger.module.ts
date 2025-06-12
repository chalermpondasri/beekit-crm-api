import {
    Global,
    Module,
} from '@nestjs/common'
import { loggerServiceProvider } from './providers/logger-service.provider'

@Global()
@Module({
    imports: [
    ],
    providers: [
        loggerServiceProvider,
    ],
    exports: [
        loggerServiceProvider,
    ],

})
export class LoggerModule {
}
