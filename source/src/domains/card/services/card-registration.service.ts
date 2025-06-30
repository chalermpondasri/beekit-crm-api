import { ICardRegistrationService } from '@domains/card/interfaces/service.interface'
import {
    catchError,
    map,
    mergeMap,
    Observable,
    of,
    throwError,
    toArray,
} from 'rxjs'
import { InternalServerErrorException } from '@nestjs/common'
import { RegisterCardCommandWithOptions } from '@domains/card/command-query/register-card.command'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'
import { ApplicationErrorCode } from '@core/constants/error-code.enum'
import { CardRegisteredException } from '@core/models/errors/card/card-registered.exception'
import { CitizenHasCardException } from '@core/models/errors/card/citizen-has-card.exception'
import { UseCaseException } from '@core/models/errors/error.model'
import { CardResponse } from '@domains/card/response/card.response'
import { plainToInstance } from 'class-transformer'
import { UnregisterCardCommand } from '@domains/card/command-query/unregister-card.command'
import { IUseCase } from '@shared/interfaces/use-case.interface'
import { RegisterRabbitCardInput } from '@domains/card/use-cases/input-output/register-rabbit-card.input'
import { CardOutput } from '@domains/card/use-cases/input-output/card.output'
import { UnregisterCardInput } from '@domains/card/use-cases/input-output/unregister-card.input'
import { CardNotFoundException } from '@core/models/errors/card/card-not-found.exception'

export class CardRegistrationService implements ICardRegistrationService {
    public constructor(
        private readonly _errorFactory: IErrorFactory,
        private readonly _registerRabbitUseCase: IUseCase<RegisterRabbitCardInput, any>,
        private readonly _listCardUseCase: IUseCase<string, CardOutput>,
        private readonly _unregisterCardUseCase: IUseCase<UnregisterCardInput, any>
    ) {
    }

    public getRegisteredCards(citizenId: string): Observable<CardResponse[]> {
        return this._listCardUseCase.execute(citizenId).pipe(
            map(output => {
                const response: CardResponse = {
                    id: output.id,
                    cardNumber: output.cardNumber,
                    registeredAt: output.registeredAt,
                    cardType: output.cardType,
                    status: output.status,
                }

                return plainToInstance(CardResponse, response)
            }),
            toArray(),
        )
    }

    public registerEmvCard(psnId: string, command: RegisterCardCommandWithOptions): Observable<any> {
        throw new InternalServerErrorException('not implemented')
    }

    public registerRabbitCard(psnId: string, command: RegisterCardCommandWithOptions): Observable<any> {
        return of(command).pipe(
            mergeMap(command => this._registerRabbitUseCase.execute({
                    cardId: command.cardNumber,
                    citizenId: psnId,
                    birthDate: command.birthDate,
                },
            )),
            catchError((err: UseCaseException) => {
                if (err instanceof CardRegisteredException) {
                    return throwError(() => this._errorFactory.createBadRequestError(ApplicationErrorCode.CARD_WAS_REGISTERED))
                }
                if (err instanceof CitizenHasCardException) {
                    return throwError(() => this._errorFactory.createBadRequestError(ApplicationErrorCode.CARD_MAX_TYPE_ALLOWED))
                }
                return throwError(() => this._errorFactory.createInternalServerError(ApplicationErrorCode.INTERNAL_SERVER_ERROR))
            }),
            map(() => ({success: true})),
        )
    }
    public unregisterCard(psnId: string, command: UnregisterCardCommand): Observable<{ success: boolean }> {
        return this._unregisterCardUseCase.execute(new UnregisterCardInput({
            cardId: command.cardId,
            citizenId: psnId,
        })).pipe(
            map(() => ({success: true})),
            catchError(err => {
                if(err instanceof CardNotFoundException) {
                    return throwError(() => this._errorFactory.createNotfoundError(ApplicationErrorCode.CARD_NOT_FOUND))
                }
                return throwError(() => this._errorFactory.createInternalServerError(ApplicationErrorCode.INTERNAL_SERVER_ERROR))
            })
        )

    }

}
