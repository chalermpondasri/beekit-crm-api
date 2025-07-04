import { Module } from '@nestjs/common'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { AuthController } from '@domains/auth/controllers/auth.controller'
import {
    createJwtUseCaseProvider,
} from '@domains/auth/providers/use-case.provider'
import { AdapterModule } from '@shared/adapters/adapter.module'
import { authenticationServiceProvider } from '@domains/auth/providers/service.provider'

@Module({
    imports: [
        TokenizationModule,
        AdapterModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        authenticationServiceProvider,
        createJwtUseCaseProvider,
    ],
    exports: [
        createJwtUseCaseProvider,
    ],
})
export class AuthModule {
}
