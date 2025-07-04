import { RegisterCommand } from '@domains/auth/command-query/register.command'
import { Observable } from 'rxjs'
import { RegisterResponse } from '@domains/auth/response/register.response'

export interface IAuthenticationService {
    register(command: RegisterCommand): Observable<RegisterResponse>
}
