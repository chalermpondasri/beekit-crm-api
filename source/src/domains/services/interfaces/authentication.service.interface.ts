import { Observable } from 'rxjs'
import { AuthenticationResponse } from '../response/authentication.response'
import { AuthenticationCommand } from '@domains/services/command-query/authentication.command'

export interface IAuthenticationService {
    authenticate(command: AuthenticationCommand): Observable<AuthenticationResponse>
}
