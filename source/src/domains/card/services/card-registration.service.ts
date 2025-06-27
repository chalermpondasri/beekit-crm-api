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
import {
    RegisterEmvCardCommand,
    RegisterRabbitCardCommand,
} from '@domains/card/command-query/register-card.command'
import {
    IListRegisteredCardsUseCase,
    IRegisterNewRabbitCardUseCase,
} from '@domains/card/interfaces/use-case.interface'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'
import { ApplicationErrorCode } from '@core/constants/error-code.enum'
import { CardRegisteredException } from '@core/models/errors/card/card-registered.exception'
import { CitizenHasCardException } from '@core/models/errors/card/citizen-has-card.exception'
import { UseCaseException } from '@core/models/errors/error.model'
import { CardResponse } from '@domains/card/response/card.response'
import { plainToInstance } from 'class-transformer'

export class CardRegistrationService implements ICardRegistrationService {
    public constructor(
        private readonly _errorFactory: IErrorFactory,
        private readonly _registerRabbitUseCase: IRegisterNewRabbitCardUseCase,
        private readonly _listCardUseCase: IListRegisteredCardsUseCase,
    ) {
    }

    public getRegisteredCards(citizenId: string): Observable<CardResponse[]> {
        return this._listCardUseCase.execute(citizenId).pipe(
            map(output => {
                const response:CardResponse = {
                    id: output.id,
                    cardNumber: output.cardNumber,
                    registeredAt: output.registeredAt,
                    cardType: output.cardType,
                    status: output.status
                }

                return plainToInstance(CardResponse, response)
            }),
            toArray()
        )
    }

    public registerEmvCard(psnId: string, command: RegisterEmvCardCommand): Observable<any> {
        throw new InternalServerErrorException('not implemented')
    }

    public registerRabbitCard(psnId: string, command: RegisterRabbitCardCommand): Observable<any> {
        return of(command).pipe(
            mergeMap(command => this._registerRabbitUseCase.execute({cardId: command.cardNumber, citizenId: psnId})),
            catchError((err: UseCaseException) => {
                if(err instanceof CardRegisteredException) {
                    return throwError(() => this._errorFactory.createBadRequestError(ApplicationErrorCode.CARD_WAS_REGISTERED))
                }
                if(err instanceof CitizenHasCardException) {
                    return throwError(() => this._errorFactory.createBadRequestError(ApplicationErrorCode.CARD_MAX_TYPE_ALLOWED))
                }
                return throwError(() => this._errorFactory.createInternalServerError(ApplicationErrorCode.INTERNAL_SERVER_ERROR))
            }),
            map(() => ({success: true})),
        )
    }

}
