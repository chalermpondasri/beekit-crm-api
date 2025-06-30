import { Module } from '@nestjs/common'
import { useCaseProviders } from '@domains/tos/providers/use-case.provider'
import { RepositoryModule } from '@shared/repositories/repository.module'
import { TermController } from '@domains/tos/controllers/term.controller'
import { serviceProviders } from '@domains/tos/providers/service.provider'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { CacheModule } from '@core/cache.module'

@Module({
    imports: [
        CacheModule,
        TokenizationModule,
        RepositoryModule,
    ],
    controllers: [
        TermController,
    ],
    providers: [
        ...useCaseProviders,
        ...serviceProviders,
    ],
    exports: [
        ...useCaseProviders,
    ],
})
export class TosModule {

}
