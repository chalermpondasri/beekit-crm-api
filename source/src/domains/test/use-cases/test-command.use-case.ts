import { ICommandUseCase } from '@domains/test/use-cases/use-cases.interface'
import { Observable } from 'rxjs'
import { CardEntity } from '@shared/entities/card.entity'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'

export class TestCommandUseCase implements ICommandUseCase {
    public constructor(
        private readonly _cardRepository: ICardRepository
    ) {
    }
    public execute(): Observable<any> {
        return this._cardRepository.save(new CardEntity())
    }
}
