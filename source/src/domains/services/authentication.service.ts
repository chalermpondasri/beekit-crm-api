import { IAuthenticateUserUseCase } from '../use-cases/interfaces/authenticate-user.interface'
import { AuthenticationResponse } from './response/authentication.response'
import {
    catchError,
    map,
    Observable,
    throwError,
} from 'rxjs'
import {
    instanceToPlain,
    plainToInstance,
} from 'class-transformer'
import { ApplicationErrorCode } from '@constants/error-code.enum'
import { ICreateJwtTokenUseCase } from '@domains/use-cases/interfaces/create-jwt-token.interface'
import { AuthenticatedJwtPayload } from '@common/models/authenticated-jwt-payload.model'
import { IErrorFactory } from '@domains/factories/error/interfaces/error.factory.interface'
import { ILoggerService } from '@domains/services/interfaces/logger.service.interface'
import { IAuthenticationService } from '@domains/services/interfaces/authentication.service.interface'
import { AuthenticationCommand } from '@domains/services/command-query/authentication.command'

export class AuthenticationService implements IAuthenticationService {
    public constructor(
        private readonly _errorFactoryService: IErrorFactory,
        private readonly _logger: ILoggerService,
        private readonly _authUseCase: IAuthenticateUserUseCase,
        private readonly _createJwtUseCase: ICreateJwtTokenUseCase,
    ) {
    }

    public authenticate(command: AuthenticationCommand): Observable<AuthenticationResponse> {
        return this._authUseCase.execute(command).pipe(
            map(result => {

                const jwtPayload = plainToInstance(AuthenticatedJwtPayload, {
                    sub: result.userId,
                    citizenId: result.citizenId,
                    firstName: result.firstName,
                    middleName: '',
                    lastName: result.lastName,
                    dateOfBirth: result.dateOfBirthString,
                    mobile: result.mobile,
                    email: result.email,
                } )

                const token = this._createJwtUseCase.execute(
                    instanceToPlain(jwtPayload),
                    {
                        userId: result.userId,
                    },
                )
                return plainToInstance(AuthenticationResponse, instanceToPlain(token), {excludeExtraneousValues: true})
            }),
            catchError(error => {
                this._logger.error(error)
                return throwError(() => this._errorFactoryService.createUnauthorizedError(
                    ApplicationErrorCode.AUTHENTICATION_AUTH_FAILED,
                ))
            }),
        )
    }

}
