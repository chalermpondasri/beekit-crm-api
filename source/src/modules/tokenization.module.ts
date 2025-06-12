import { Module } from '@nestjs/common'
import {
    accessTokenSignerProvider,
    refreshTokenSignerProvider,
} from '@providers/signer.provider'
import { ApplicationConfigModule } from '@modules/application-config.module'
import { tokenizationServiceProvider } from '@providers/tokenization-service.provider'

@Module({
    imports: [
        ApplicationConfigModule,
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
