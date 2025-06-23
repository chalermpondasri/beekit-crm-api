import { IQueryUseCase } from '@domains/test/use-cases/use-cases.interface'
import {
    Observable,
    take,
    toArray,
} from 'rxjs'
import { IAcceptTermRepository } from '@shared/repositories/interfaces/term.repository.interface'

export class TestQueryUseCase implements IQueryUseCase {
    public constructor(
        private readonly _termRepository: IAcceptTermRepository
    ) {
    }
    public execute(): Observable<any> {
        return this._termRepository.find().pipe(
            take(10),
            toArray(),
        )
    }
}
