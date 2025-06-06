import { Module } from '@nestjs/common'
import { ApplicationConfigModule } from '@modules/application-config.module'
import { loggerServiceProvider } from '@providers/logger-service.provider'

@Module({
    imports: [
        ApplicationConfigModule,
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
