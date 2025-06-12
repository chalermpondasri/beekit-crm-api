import { Observable } from 'rxjs'
import { AuthenticationInput } from '../input-output/authentication.input'
import { AuthenticationOutput } from '../input-output/authentication.output'

export interface IAuthenticateUserUseCase {
    execute(input: AuthenticationInput): Observable<AuthenticationOutput>
}
