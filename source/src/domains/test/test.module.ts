import { Module } from '@nestjs/common'
import { TestController } from '@domains/test/controllers/test.controller'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { RepositoryModule } from '@shared/repositories/repository.module'
import { testRepositoryProviders } from '@shared/repositories/repository.provider'
import { TestService } from '@domains/test/services/test.service'
import { DatabaseModule } from '@core/database.module'
import { TestMapper } from '@shared/repositories/test/test.mapper'
import { TestCommandUseCase } from '@domains/test/use-cases/test-command.use-case'
import { TestQueryUseCase } from '@domains/test/use-cases/test-query.use-case'

@Module({
    imports: [
        DatabaseModule,
        TokenizationModule,
    ],
    controllers: [
        TestController,
    ],
    providers: [
        TestMapper,
        TestCommandUseCase,
        TestQueryUseCase,
        testRepositoryProviders,
        TestService,
    ]
})
export class TestModule {}
