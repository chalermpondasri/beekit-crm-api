import { Module } from '@nestjs/common'
import { LoggerModule } from '@modules/logger.module'
import { TokenizationModule } from '@modules/tokenization.module'
import { AuthController } from '@controllers/auth.controller'
import { authenticationServiceProvider } from '@providers/authentication-service.provider'
import {
    authenticationUseCaseProvider,
    createJwtUseCaseProvider,
} from '@providers/use-case.provider'

@Module({
    imports: [
        TokenizationModule,
        LoggerModule,
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        authenticationUseCaseProvider,
        createJwtUseCaseProvider,
        authenticationServiceProvider,
    ],
    exports: [
        authenticationServiceProvider,
    ],
})
export class AuthModule {


}
