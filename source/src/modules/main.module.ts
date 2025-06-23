import { Module } from '@nestjs/common'
import { CoreModule } from '@core/core.module'
import { HealthcheckModule } from '@domains/healthcheck/healthcheck.module'
import { AuthModule } from '@domains/auth/auth.module'
import { exceptionFilters } from '@core/providers/filters.provider'
import { RepositoryModule } from '@shared/repositories/repository.module'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { TosModule } from '@domains/tos/tos.module'

@Module({
    imports: [
        TokenizationModule,
        CoreModule,
        HealthcheckModule,
        AuthModule,
        RepositoryModule,
        // TestModule,
        TosModule,
    ],
    providers: [
        ...exceptionFilters,
    ],
    controllers: [
    ],
    exports: [],
})
export class MainModule {}
