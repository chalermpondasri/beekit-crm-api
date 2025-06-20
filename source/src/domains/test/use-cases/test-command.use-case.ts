import { ICommandUseCase } from '@domains/test/use-cases/use-cases.interface'
import { Observable } from 'rxjs'
import { CardEntity } from '@shared/entities/card.entity'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import crypto from 'crypto'
import { v4 } from 'uuid'

export class TestCommandUseCase implements ICommandUseCase {
    public constructor(
        private readonly _cardRepository: ICardRepository
    ) {}

    public execute(): Observable<any> {
        const card = new CardEntity()
        card._id = crypto.createHash('sha256').update(v4()).digest('base64')

        return this._cardRepository.save(new CardEntity())
    }
}
