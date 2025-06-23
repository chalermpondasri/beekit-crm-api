import { Observable } from 'rxjs'
import { AcceptedTermOutput } from '@domains/tos/input-output/accepted-term.output'

export interface IGetUserAcceptedTermUseCase {
  execute(citizenId: string): Observable<AcceptedTermOutput | null>
}
