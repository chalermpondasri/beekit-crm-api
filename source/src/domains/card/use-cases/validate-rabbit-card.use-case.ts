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
import { IUseCase } from '@shared/interfaces/use-case.interface'
import { ValidateRabbitInput } from '@domains/card/use-cases/input-output/validate-rabbit.input'

export class ValidateRabbitCardRegistrationUseCase implements IUseCase<ValidateRabbitInput, ValidateRabbitOutput> {
    public constructor(
        private readonly _cardRepository: ICardRepository,
    ) {
    }

    public execute(data: ValidateRabbitInput): Observable<ValidateRabbitOutput> {
        const {citizenId, cardNumber} = data
        return this._checkIfUserAlreadyHasRabbitCardRegistered(citizenId, new ValidateRabbitOutput()).pipe(
            mergeMap(result => {
                if(result.citizenAlreadyHasCard) {
                    return throwError(() => new CitizenHasCardException(citizenId, TransitCardType.ABT))
                }

                return this._checkIfCardWasRegistered(cardNumber, result)
            }),
            mergeMap(result => {
                if(result.cardAlreadyRegistered) {
                    return throwError(() => new CardRegisteredException(cardNumber, TransitCardType.ABT))
                }
                return of(result)
            }),
        )
    }

    private _checkIfUserAlreadyHasRabbitCardRegistered(citizenId: string, result?: ValidateRabbitOutput): Observable<ValidateRabbitOutput> {
        return of(HasherService.hashSha256toBase64Url(citizenId)).pipe(
            mergeMap(hashedId => this._cardRepository.findOne({cid: hashedId, cardType: TransitCardType.ABT})),
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
                cardType: TransitCardType.ABT,
            })),
            map(registeredData => {
                result = result ? result : new ValidateRabbitOutput()
                result.cardAlreadyRegistered = !!registeredData

                return result
            })
        )
    }
}
