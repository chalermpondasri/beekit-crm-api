import { Module } from '@nestjs/common'
import { HealthcheckController } from '@domains/healthcheck/controllers/healthcheck.controller'

@Module({
    imports: [
    ],
    controllers: [
        HealthcheckController,
    ],
    providers: [
    ],
    exports: [
    ],
})
export class HealthcheckModule {}
