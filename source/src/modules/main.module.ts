import { Module } from '@nestjs/common'
import { ApplicationConfigModule } from './application-config.module'
import { HealthcheckController } from '@controllers/healthcheck.controller'
import { LoggerModule } from '@modules/logger.module'

@Module({
    imports: [
        ApplicationConfigModule,
        LoggerModule,
    ],
    controllers: [
        HealthcheckController,
    ],
    exports: [],
})
export class MainModule {}
