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
    public execute(id?: string): Observable<any> {
        if (id) {
            return this._termRepository.findOne({_id: id})
        }

        return this._termRepository.find().pipe(
            take(10),
            toArray(),
        )
    }
}
