import {
    IEmvCardRegistrationService,
    IRabbitCardRegistrationService,
} from '@domains/card/interfaces/service.interface'
import {
    catchError,
    mergeMap,
    Observable,
    of,
    throwError,
} from 'rxjs'
import { InternalServerErrorException } from '@nestjs/common'
import {
    RegisterEmvCardCommand,
    RegisterRabbitCardCommand,
} from '@domains/card/command-query/register-card.command'
import { IRegisterNewRabbitCardUseCase } from '@domains/card/interfaces/use-case.interface'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'
import { ApplicationErrorCode } from '@core/constants/error-code.enum'
import { CardRegisteredException } from '@core/models/errors/card/card-registered.exception'
import { CitizenHasCardException } from '@core/models/errors/card/citizen-has-card.exception'
import { UseCaseException } from '@core/models/errors/error.model'

export class CardRegistrationService implements IRabbitCardRegistrationService, IEmvCardRegistrationService {
    public constructor(
        private readonly _errorFactory: IErrorFactory,
        private readonly _registerRabbitUseCase: IRegisterNewRabbitCardUseCase,
    ) {
    }

    public registerEmvCard(psnId: string, command: RegisterEmvCardCommand): Observable<any> {
        throw new InternalServerErrorException('not implemented')
    }

    public registerRabbitCard(psnId: string, command: RegisterRabbitCardCommand): Observable<any> {
        return of(command).pipe(
            mergeMap(command => this._registerRabbitUseCase.execute({cardId: psnId, citizenId: command.cardNumber})),
            catchError((err: UseCaseException) => {
                if(err instanceof CardRegisteredException) {
                    return throwError(() => this._errorFactory.createBadRequestError(ApplicationErrorCode.CARD_WAS_REGISTERED))
                }
                if(err instanceof CitizenHasCardException) {
                    return throwError(() => this._errorFactory.createBadRequestError(ApplicationErrorCode.CARD_MAX_TYPE_ALLOWED))
                }
                return throwError(() => this._errorFactory.createInternalServerError(ApplicationErrorCode.INTERNAL_SERVER_ERROR))
            }),
        )
    }

}
