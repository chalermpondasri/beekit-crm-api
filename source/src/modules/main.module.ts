import { Module } from '@nestjs/common'
import { ApplicationConfigModule } from './application-config.module'
import { HealthcheckController } from '@controllers/healthcheck.controller'

@Module({
    imports: [
        ApplicationConfigModule,
    ],
    controllers: [
        HealthcheckController,
    ],
    exports: [],
})
export class MainModule {}
