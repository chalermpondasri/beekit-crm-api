import { Module } from '@nestjs/common'
import { CardController } from '@domains/card/controllers/card.controller'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { serviceProviders } from '@domains/card/providers/service.provider'
import { useCaseProviders } from '@domains/card/providers/use-case.provider'
import { RepositoryModule } from '@shared/repositories/repository.module'
import { AdapterModule } from '@shared/adapters/adapter.module'

@Module({
    imports: [
        TokenizationModule,
        RepositoryModule,
        AdapterModule,
    ],
    controllers: [
        CardController,
    ],
    providers: [
        ...useCaseProviders,
        ...serviceProviders,
    ],
    exports: [
    ],
})
export class CardModule {}
