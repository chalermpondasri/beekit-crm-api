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
import { CardEntity } from '@shared/entities/card.entity'
import {
    CardRegistrationStatus,
    TransitCardType,
} from '@domains/card/models/card-type.enum'
import { HasherService } from '@utils/hasher.service'
import { rethrow } from '@nestjs/core/helpers/rethrow'
import { ICchAdapter } from '@shared/adapters/interfaces/cch.adapter'
import { toThaiBuddhistEraDateString } from '@utils/thai-date-parser/thai-date-parser'
import { IUseCase } from '@shared/interfaces/use-case.interface'
import { ValidateRabbitInput } from '@domains/card/use-cases/input-output/validate-rabbit.input'
import { ValidateRabbitOutput } from '@domains/card/use-cases/input-output/validate-rabbit.output'

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
        return this._validateUseCase.execute(new ValidateRabbitInput({citizenId: input.citizenId, cardNumber: input.cardId})).pipe(
            mergeMap(() => {
                return this._rabbitTransitAdapter.registerSelectedCard({
                    cardId: input.cardId,
                    citizenId: input.citizenId,
                })
            }),
            catchError(err => {
                this._logger.error(err)
                return rethrow(err)
            })
        ).pipe(
            mergeMap(result => of(result).pipe(

                mergeMap(result => {
                    const birthYear =  toThaiBuddhistEraDateString(input.birthDate).split('/').pop()
                    const card = new CardEntity()

                    card.cardType = TransitCardType.ABT
                    card.cardNo = result.cardId
                    card.hashedCardNumber = HasherService.hashSha256toBase64Url(result.cardId)
                    card.cid = HasherService.hashSha256toBase64Url(input.citizenId)
                    card.registeredDate = new Date()
                    card.tokenizedMedia = {rabbit: result.transitToken ,ktb: null, bem: null}
                    card.registrationStatus = CardRegistrationStatus.COMPLETED
                    card.birthYear = Number(birthYear)

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
                        mergeMap(() => rethrow(err))
                    )
                })
            )),
        )
    }
}
