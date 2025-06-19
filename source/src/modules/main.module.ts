import { Module } from '@nestjs/common'
import { CoreModule } from '@core/core.module'
import { HealthcheckModule } from '@domains/healthcheck/healthcheck.module'
import { AuthModule } from '@domains/auth/auth.module'
import { exceptionFilters } from '@core/providers/filters.provider'
import { RepositoryModule } from '@shared/repositories/repository.module'
import { TestModule } from '@domains/test/test.module'
import { TokenizationModule } from '@domains/auth/tokenization.module'

@Module({
    imports: [
        TokenizationModule,
        CoreModule,
        HealthcheckModule,
        AuthModule,
        RepositoryModule,
        TestModule,
    ],
    providers: [
        ...exceptionFilters,
    ],
    controllers: [
    ],
    exports: [],
})
export class MainModule {}
