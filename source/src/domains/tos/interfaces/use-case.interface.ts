import { Observable } from 'rxjs'
import { AcceptedTermOutput } from '@domains/tos/input-output/accepted-term.output'
import { UpdateUserTermInput } from '@domains/tos/input-output/update-user-term.input'

export interface IGetUserAcceptedTermUseCase {
  execute(citizenId: string): Observable<AcceptedTermOutput | null>
}

export interface IUpdateUserAcceptedTermUseCase {
  execute(citizenId: string, data: UpdateUserTermInput): Observable<boolean>
}
