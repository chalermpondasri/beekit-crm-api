import { IUseCase } from '@shared/interfaces/use-case.interface'
import { UnregisterCardInput } from '@domains/card/use-cases/input-output/unregister-card.input'
import {
    defaultIfEmpty,
    mergeMap,
    Observable,
    of,
    throwError,
} from 'rxjs'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { HasherService } from '@utils/hasher.service'
import { CardNotFoundException } from '@core/models/errors/card/card-not-found.exception'
import {
    CampaignBlockStatus,
    CampaignRegisterStatus,
    IRabbitTransitAdapter,
} from '@shared/adapters/interfaces/rabbit-transit.interface'
import { TransitCardType } from '@domains/card/models/card-type.enum'

export class UnregisterCardUseCase implements IUseCase<UnregisterCardInput, any> {
    public constructor(
        private readonly _cardRepository: ICardRepository,
        private readonly _rabbitTransitAdapter: IRabbitTransitAdapter,
    ) {
    }

    public execute(input: UnregisterCardInput): Observable<any> {
        return of(input).pipe(
            mergeMap(input => {
                return this._cardRepository.findOne({
                    _id: input.cardId,
                    cid: HasherService.hashSha256toBase64Url(input.citizenId),
                })
            }),
            defaultIfEmpty(null),
            mergeMap(card => {
                if (!card) {
                    return throwError(() => new CardNotFoundException(input.cardId))
                }

                return this._cardRepository.delete(card, {softDelete: true})
            }),
        ).pipe(
            mergeMap(deletedEntity => {
                if(deletedEntity.cardType === TransitCardType.ABT) {
                    return this._rabbitTransitAdapter.updateCardStatus({
                        cardId: deletedEntity.cardNo,
                        campaignBlockStatus: CampaignBlockStatus.NOT_BLOCK,
                        campaignRegisterStatus: CampaignRegisterStatus.UNREGISTERED,
                        transitToken: deletedEntity.tokenizedMedia.rabbit,
                    })
                }

                return throwError(() => new Error('Card type not supported'))
            })
        )
    }
}
