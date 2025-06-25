import { Module } from '@nestjs/common'
import { CardController } from '@domains/card/controllers/card.controller'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { serviceProviders } from '@domains/card/providers/service.provider'

@Module({
    imports: [
        TokenizationModule,
    ],
    controllers: [
        CardController,
    ],
    providers: [
        ...serviceProviders,
    ],
    exports: [
    ],
})
export class CardModule {}
