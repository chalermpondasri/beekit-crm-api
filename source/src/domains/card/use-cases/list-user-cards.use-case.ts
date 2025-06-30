import {
    map,
    mergeMap,
    Observable,
    of,
} from 'rxjs'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { HasherService } from '@utils/hasher.service'
import { CardOutput } from '@domains/card/use-cases/input-output/card.output'
import { IUseCase } from '@shared/interfaces/use-case.interface'

export class ListUserCardsUseCase implements IUseCase<string, CardOutput> {
    public constructor(
        private readonly _cardRepository: ICardRepository,
    ) {}
    public execute(citizenId: string): Observable<CardOutput> {
        return of(HasherService.hashSha256toBase64Url(citizenId)).pipe(
            mergeMap(hashedId => this._cardRepository.find({cid: hashedId})),
            map(entity => {
                return new CardOutput({
                    id: entity._id,
                    cardType: entity.cardType,
                    status: entity.registrationStatus,
                    cardNumber: entity.cardNo,
                    registeredAt: entity.registeredDate
                })

            })
        )
    }

}
