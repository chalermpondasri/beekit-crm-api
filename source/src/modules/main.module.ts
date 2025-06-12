import { Module } from '@nestjs/common'
import { CoreModule } from '../core/core.module'
import { HealthcheckModule } from '@domains/healthcheck/healthcheck.module'
import { AuthModule } from '@domains/auth/auth.module'

@Module({
    imports: [
        CoreModule,
        HealthcheckModule,
        AuthModule,
    ],
    controllers: [
    ],
    exports: [],
})
export class MainModule {}
