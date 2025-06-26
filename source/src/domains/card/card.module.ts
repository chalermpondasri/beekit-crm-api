import { Module } from '@nestjs/common'
import { CardController } from '@domains/card/controllers/card.controller'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { serviceProviders } from '@domains/card/providers/service.provider'
import { useCaseProviders } from '@domains/card/providers/use-case.provider'
import { RepositoryModule } from '@shared/repositories/repository.module'

@Module({
    imports: [
        TokenizationModule,
        RepositoryModule,
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
