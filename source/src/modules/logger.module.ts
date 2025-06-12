import { Module } from '@nestjs/common'
import { loggerServiceProvider } from '@providers/logger-service.provider'

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
