import { Module } from '@nestjs/common'
import { CardController } from '@domains/card/card.controller'
import { TokenizationModule } from '@domains/auth/tokenization.module'

@Module({
    imports: [
        TokenizationModule,
    ],
    controllers: [
        CardController,
    ],
    providers: [
    ],
    exports: [
    ],
})
export class CardModule {}
