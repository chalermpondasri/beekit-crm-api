import { Module } from '@nestjs/common'
import {
    accessTokenSignerProvider,
    refreshTokenSignerProvider,
} from '@providers/signer.provider'
import { tokenizationServiceProvider } from '@providers/tokenization-service.provider'

@Module({
    imports: [
    ],
    providers: [
        accessTokenSignerProvider,
        refreshTokenSignerProvider,
        tokenizationServiceProvider,
    ],
    exports: [
        tokenizationServiceProvider,
    ],
})
export class TokenizationModule {

}
