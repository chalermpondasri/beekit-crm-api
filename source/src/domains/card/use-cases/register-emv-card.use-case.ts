import { RegisterEmvCardInput } from '@domains/card/use-cases/input-output/register-emv-card.input'
import { IUseCase } from '@shared/interfaces/use-case.interface'
import {
    map,
    mergeMap,
    Observable,
} from 'rxjs'
import { ValidateEmvInput } from '@domains/card/use-cases/input-output/validate-emv.input'
import { CardFactory } from '@shared/factories/card.factory'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { RegisterEmvCardOutput } from '@domains/card/use-cases/input-output/register-emv-card.output'

export class RegisterEmvCardUseCase implements IUseCase<RegisterEmvCardInput, RegisterEmvCardOutput> {
    public constructor(
        private readonly _validateEmvCardUseCase: IUseCase<ValidateEmvInput, void>,
        private readonly _cardRepository: ICardRepository,
    ) {
    }

    public execute(input: RegisterEmvCardInput): Observable<RegisterEmvCardOutput> {
        return this._validateEmvCardUseCase.execute({cardNumber: input.cardNumber, citizenId: input.citizenId}).pipe(
            map(() => CardFactory.createEmvCard({
                citizenId: input.citizenId,
                cardNumber: input.cardNumber,
                birthDate: input.birthDate,
            })),
            mergeMap(newCard => this._cardRepository.save(newCard)),
            mergeMap(id => this._cardRepository.getById(id)),
            map(card => {
                return new RegisterEmvCardOutput({
                    transactionId: card.transactionId,
                    reference1: card._id,
                    reference2: card.cid,
                })
            }),

        )
    }
}
