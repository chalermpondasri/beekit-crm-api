import {
    Body,
    Controller,
    Inject,
    Post,
} from '@nestjs/common'
import { IAuthenticationService } from '@domains/auth/interfaces/authentication.service.interface'
import { ProviderName } from '@core/constants/provider-name.enum'
import { AuthenticationCommand } from '@domains/auth/command-query/authentication.command'
import {
    ApiOperation,
    ApiResponse,
} from '@nestjs/swagger'
import { AuthenticationResponse } from '@domains/auth/response/authentication.response'

@Controller('/auth')
export class AuthController {
    public constructor(
        @Inject(ProviderName.AUTHENTICATION_SERVICE)
        private readonly _authenticationService: IAuthenticationService
    ) {}

    @ApiOperation({
        summary: 'Login',
        description: 'Login using mToken and appId, returning JWT access token'
    })
    @ApiResponse({
        type: AuthenticationResponse,
    })
    @Post('/login')
    public doLogin(
        @Body() body: AuthenticationCommand
    ) {
        return this._authenticationService.authenticate(body)
    }
}
