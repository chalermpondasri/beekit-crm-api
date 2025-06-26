import {
    IEmvCardRegistrationService,
    IRabbitCardRegistrationService,
} from '@domains/card/interfaces/service.interface'
import {
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
import { IValidateRabbitCardRegistrationUseCase } from '@domains/card/interfaces/use-case.interface'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'
import { ApplicationErrorCode } from '@core/constants/error-code.enum'

export class CardRegistrationService implements IRabbitCardRegistrationService, IEmvCardRegistrationService {
    public constructor(
        private readonly _errorFactory: IErrorFactory,
        private readonly _validateRabbitCardUseCase: IValidateRabbitCardRegistrationUseCase
    ) {
    }
    public registerEmvCard(psnId: string, command: RegisterEmvCardCommand): Observable<any> {
        throw new InternalServerErrorException('not implemented')
    }

    public registerRabbitCard(psnId: string, command: RegisterRabbitCardCommand): Observable<any> {
        return of(command).pipe(
            mergeMap(command => this._validateRabbitCardUseCase.execute(psnId, command.cardNumber)),
            mergeMap(validationResult => {
                if(!validationResult.canRegister()) {
                    if(validationResult.citizenAlreadyHasCard) {
                        return throwError(() => this._errorFactory.createBadRequestError(ApplicationErrorCode.AUTHENTICATION_AUTH_FAILED))
                    }

                    if(validationResult.cardAlreadyRegistered) {
                        return throwError(() => this._errorFactory.createBadRequestError(ApplicationErrorCode.CARD_WAS_REGISTERED))
                    }
                    return throwError(() => this._errorFactory.createInternalServerError(ApplicationErrorCode.INTERNAL_SERVER_ERROR))
                }

                return
            })
        )
    }

}
