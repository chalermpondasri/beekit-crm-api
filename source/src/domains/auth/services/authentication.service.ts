import { IAuthenticationService } from '@domains/auth/interfaces/authentication.service.interface'
import { RegisterCommand } from '@domains/auth/command-query/register.command'
import { Observable } from 'rxjs'
import { RegisterResponse } from '@domains/auth/response/register.response'

export class AuthenticationService implements IAuthenticationService{
    public register(command: RegisterCommand): Observable<RegisterResponse> {
        return undefined
    }
}
