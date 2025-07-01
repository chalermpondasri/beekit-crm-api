import { RegisterRabbitCardInput } from '@domains/card/use-cases/input-output/register-rabbit-card.input'
import {
    catchError,
    mergeMap,
    Observable,
    of,
} from 'rxjs'
import {
    CampaignBlockStatus,
    CampaignRegisterStatus,
    IRabbitTransitAdapter,
} from '@shared/adapters/interfaces/rabbit-transit.interface'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { rethrow } from '@nestjs/core/helpers/rethrow'
import { ICchAdapter } from '@shared/adapters/interfaces/cch.adapter'
import { IUseCase } from '@shared/interfaces/use-case.interface'
import { ValidateRabbitInput } from '@domains/card/use-cases/input-output/validate-rabbit.input'
import { ValidateRabbitOutput } from '@domains/card/use-cases/input-output/validate-rabbit.output'
import { CardFactory } from '@shared/factories/card.factory'

export class RegisterNewRabbitCardUseCase implements IUseCase<RegisterRabbitCardInput, any> {
    public constructor(
        private readonly _logger: ILoggerService,
        private readonly _rabbitTransitAdapter: IRabbitTransitAdapter,
        private readonly _validateUseCase: IUseCase<ValidateRabbitInput, ValidateRabbitOutput>,
        private readonly _cardRepository: ICardRepository,
        private readonly _cchAdapter: ICchAdapter,
    ) {
        this._logger.setContext(RegisterNewRabbitCardUseCase.name)
    }

    public execute(input: RegisterRabbitCardInput): Observable<any> {
        return this._validateUseCase.execute(new ValidateRabbitInput({
            citizenId: input.citizenId,
            cardNumber: input.cardId,
        })).pipe(
            mergeMap(() => {
                return this._rabbitTransitAdapter.registerSelectedCard({
                    cardId: input.cardId,
                    citizenId: input.citizenId,
                })
            }),
            catchError(err => {
                this._logger.error(err)
                return rethrow(err)
            }),
        ).pipe(
            mergeMap(result => of(result).pipe(
                mergeMap(result => {
                    const card = CardFactory.createABTCard({
                        birthDate: input.birthDate,
                        cardNumber: result.cardId,
                        citizenId: input.citizenId,
                        tokenizedMedia: result.transitToken,

                    })
                    return this._cardRepository.save(card)
                }),
                catchError(err => {
                    // unexpected error, rollback
                    this._logger.error(err)
                    this._logger.warn(`Rollback: ${input}`)
                    return this._rabbitTransitAdapter.updateCardStatus({
                        cardId: result.cardId,
                        transitToken: result.transitToken,
                        campaignRegisterStatus: CampaignRegisterStatus.UNREGISTERED,
                        campaignBlockStatus: CampaignBlockStatus.NOT_BLOCK,
                    }).pipe(
                        mergeMap(() => rethrow(err)),
                    )
                }),
            )),
        )
    }
}
