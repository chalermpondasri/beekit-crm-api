import { Module } from '@nestjs/common'
import { ApplicationConfigModule } from '@modules/application-config.module'
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
        ApplicationConfigModule,
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
