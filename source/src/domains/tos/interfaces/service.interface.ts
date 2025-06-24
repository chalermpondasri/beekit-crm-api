import { UserAcceptedTermResponse } from '@domains/tos/response/user-accepted-term.response'
import { Observable } from 'rxjs'
import { UpdateUserTermCommand } from '@domains/tos/command-query/update-user-term.command'

export interface ITermOfServiceService {
    getUserAcceptTerm(citizenId: string): Observable<UserAcceptedTermResponse>
    updateUserTerm(citizenId: string, command: UpdateUserTermCommand): Observable<{ success: boolean }>
}
