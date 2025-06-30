import { Module } from '@nestjs/common'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { AuthController } from '@domains/auth/controllers/auth.controller'
import { authenticationServiceProvider } from '@domains/auth/providers/authentication-service.provider'
import {
    authenticationUseCaseProvider,
    createJwtUseCaseProvider,
} from '@domains/auth/providers/use-case.provider'
import { AdapterModule } from '@shared/adapters/adapter.module'

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
        authenticationUseCaseProvider,
        createJwtUseCaseProvider,
    ],
    exports: [
        authenticationUseCaseProvider,
        createJwtUseCaseProvider,
    ],
})
export class AuthModule {
}
