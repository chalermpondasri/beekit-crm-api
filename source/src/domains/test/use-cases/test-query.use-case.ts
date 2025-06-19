import { IQueryUseCase } from '@domains/test/use-cases/use-cases.interface'
import {
    Observable,
    take,
    toArray,
} from 'rxjs'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'

export class TestQueryUseCase implements IQueryUseCase {
    public constructor(
        private readonly _cardRepository: ICardRepository
    ) {
    }
    public execute(): Observable<any> {
        return this._cardRepository.find().pipe(
            take(10),
            toArray(),
        )
    }
}
