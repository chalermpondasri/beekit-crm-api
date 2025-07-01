import { IUseCase } from '@shared/interfaces/use-case.interface'
import {
    defaultIfEmpty,
    map,
    mergeMap,
    Observable,
    of,
    throwError,
} from 'rxjs'
import { HasherService } from '@utils/hasher.service'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { TransitCardType } from '@domains/card/models/card-type.enum'
import { ValidateEmvInput } from '@domains/card/use-cases/input-output/validate-emv.input'
import { CardRegisteredException } from '@core/models/errors/card/card-registered.exception'

/**
 * Validate if card valid to register
 * any invalid condition will throw `UseCaseException`
 */
export class ValidateEmvCardUseCase implements IUseCase<ValidateEmvInput, void> {
    public constructor(
        private readonly _cardRepository: ICardRepository,
    ) {
    }

    public execute(input: ValidateEmvInput): Observable<void> {
        return this._checkIfUserHasEmvCardRegistered(input.citizenId).pipe(
            mergeMap(userHasEmvRegistered => {
                if (userHasEmvRegistered) {
                    return throwError(() => new CardRegisteredException(input.cardNumber, TransitCardType.EMV))
                }
                return this._checkIfCardIsRegistered(input.cardNumber)
            }),
            mergeMap(cardWasRegistered => {
                if (cardWasRegistered) {
                    return throwError(() => new CardRegisteredException(input.cardNumber, TransitCardType.EMV))
                }
                return of(null)
            }),
        )
    }


    private _checkIfUserHasEmvCardRegistered(citizenId: string): Observable<boolean> {
        return of(HasherService.hashSha256toBase64Url(citizenId)).pipe(
            mergeMap(hashedCitizenId => this._cardRepository.findOne({
                cid: hashedCitizenId,
                cardType: TransitCardType.EMV,
            })),
            defaultIfEmpty(null),
            map(entity => {
                return !!entity
            }),
        )
    }

    private _checkIfCardIsRegistered(emvCardNumber: string): Observable<boolean> {
        return of(HasherService.hashSha256toBase64Url(emvCardNumber)).pipe(
            mergeMap(hashedCardNumber => this._cardRepository.findOne({
                hashedCardNumber,
                cardType: TransitCardType.EMV,
            })),
            defaultIfEmpty(null),
            map(entity => {
                return !!entity
            }),
        )
    }

}
