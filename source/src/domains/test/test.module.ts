import { Module } from '@nestjs/common'
import { TestController } from '@domains/test/controllers/test.controller'
import { useCaseProviders } from '@domains/test/providers/use-case.provider'
import { serviceProviders } from '@domains/test/providers/service.provider'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { RepositoryModule } from '@shared/repositories/repository.module'

@Module({
    imports: [
        TokenizationModule,
        RepositoryModule,
    ],
    controllers: [
        TestController,
    ],
    providers: [
        ...useCaseProviders,
        ...serviceProviders,
    ]
})
export class TestModule {}
