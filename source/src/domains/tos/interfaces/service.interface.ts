import { UserAcceptedTermResponse } from '@domains/tos/response/user-accepted-term.response'
import { Observable } from 'rxjs'

export interface ITermOfServiceService {
    getUserAcceptTerm(citizenId: string): Observable<UserAcceptedTermResponse>
}
