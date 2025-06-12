import { Observable } from 'rxjs'
import { AuthenticationResponse } from '@domains/auth/response/authentication.response'
import { AuthenticationCommand } from '@domains/auth/command-query/authentication.command'

export interface IAuthenticationService {
    authenticate(command: AuthenticationCommand): Observable<AuthenticationResponse>
}
