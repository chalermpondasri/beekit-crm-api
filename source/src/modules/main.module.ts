import { Module } from '@nestjs/common'
import { CoreModule } from '@core/core.module'
import { HealthcheckModule } from '@domains/healthcheck/healthcheck.module'
import { AuthModule } from '@domains/auth/auth.module'
import { exceptionFilters } from '@core/providers/filters.provider'

@Module({
    imports: [
        CoreModule,
        HealthcheckModule,
        AuthModule,
    ],
    providers: [
        ...exceptionFilters,
    ],
    controllers: [
    ],
    exports: [],
})
export class MainModule {}
