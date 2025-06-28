import { IValidateRabbitCardRegistrationUseCase } from '@domains/card/interfaces/use-case.interface'
import {
    map,
    mergeMap,
    Observable,
    of,
    throwError,
} from 'rxjs'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { ValidateRabbitOutput } from '@domains/card/use-cases/input-output/validate-rabbit.output'
import { HasherService } from '@utils/hasher.service'
import { TransitCardType } from '@domains/card/models/card-type.enum'
import { CitizenHasCardException } from '@core/models/errors/card/citizen-has-card.exception'
import { CardRegisteredException } from '@core/models/errors/card/card-registered.exception'

export class ValidateRabbitCardRegistrationUseCase implements IValidateRabbitCardRegistrationUseCase {
    public constructor(
        private readonly _cardRepository: ICardRepository,
    ) {
    }

    public execute(citizenId: string, cardNumber: string): Observable<ValidateRabbitOutput> {
        return this._checkIfUserAlreadyHasRabbitCardRegistered(citizenId, new ValidateRabbitOutput()).pipe(
            mergeMap(result => {
                if(result.citizenAlreadyHasCard) {
                    return throwError(() => new CitizenHasCardException(citizenId, TransitCardType.RABBIT))
                }

                return this._checkIfCardWasRegistered(cardNumber, result)
            }),
            mergeMap(result => {
                if(result.cardAlreadyRegistered) {
                    return throwError(() => new CardRegisteredException(cardNumber, TransitCardType.RABBIT))
                }
                return of(result)
            }),
        )
    }

    private _checkIfUserAlreadyHasRabbitCardRegistered(citizenId: string, result?: ValidateRabbitOutput): Observable<ValidateRabbitOutput> {
        return of(HasherService.hashSha256toBase64Url(citizenId)).pipe(
            mergeMap(hashedId => this._cardRepository.findOne({cid: hashedId})),
            map(registeredData => {
                result = result ? result : new ValidateRabbitOutput()
                result.citizenAlreadyHasCard = !!registeredData
                return result
            }),
        )
    }

    private _checkIfCardWasRegistered(cardNumber: string, result?: ValidateRabbitOutput): Observable<ValidateRabbitOutput> {
        return of(HasherService.hashSha256toBase64Url(cardNumber)).pipe(
            mergeMap(hashedCardNumber => this._cardRepository.findOne({
                hashedCardNumber,
                cardType: TransitCardType.RABBIT,
            })),
            map(registeredData => {
                result = result ? result : new ValidateRabbitOutput()
                result.cardAlreadyRegistered = !!registeredData

                return result
            })
        )
    }
}
