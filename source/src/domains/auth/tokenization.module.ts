import { Module } from '@nestjs/common'
import {
    accessTokenSignerProvider,
    refreshTokenSignerProvider,
} from '@domains/auth/providers/signer.provider'
import { tokenizationServiceProvider } from '@domains/auth/providers/tokenization-service.provider'

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
