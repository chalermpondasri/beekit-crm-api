import { ITermOfServiceService } from '@domains/tos/interfaces/service.interface'
import {
    map,
    mergeMap,
    Observable,
    of,
    throwError,
} from 'rxjs'
import { UserAcceptedTermResponse } from '@domains/tos/response/user-accepted-term.response'
import {
    IGetUserAcceptedTermUseCase,
    IUpdateUserAcceptedTermUseCase,
} from '@domains/tos/interfaces/use-case.interface'
import { plainToInstance } from 'class-transformer'
import { UpdateUserTermCommand } from '@domains/tos/command-query/update-user-term.command'
import { ApplicationErrorCode } from '@core/constants/error-code.enum'
import { IErrorFactory } from '@core/factories/error/interfaces/error.factory.interface'

export class TosService implements ITermOfServiceService {
    public constructor(
        private readonly _errorFactoryService: IErrorFactory,
        private readonly _currentTermVersion: string,
        private readonly _getUserAcceptedTermUseCase: IGetUserAcceptedTermUseCase,
        private readonly _updateUserAcceptedTermUseCase: IUpdateUserAcceptedTermUseCase,
    ) {
    }

    public getUserAcceptTerm(citizenId: string): Observable<UserAcceptedTermResponse> {
        return this._getUserAcceptedTermUseCase.execute(citizenId).pipe(
            map(result => {
                const data: UserAcceptedTermResponse = {
                    isOk: this._currentTermVersion === result?.acceptedVersion,
                    accepted: result?.acceptedVersion || null,
                    required: this._currentTermVersion || null,
                }

                return plainToInstance(UserAcceptedTermResponse, data, {
                    exposeUnsetFields: true,
                    excludeExtraneousValues: true,
                })
            }),
        )
    }

    public updateUserTerm(citizenId: string, command: UpdateUserTermCommand): Observable<{ success: boolean }> {
        return of(command).pipe(
            mergeMap(command => {
                if (command.version !== this._currentTermVersion) {
                    return throwError(() => this._errorFactoryService.createBadRequestError(ApplicationErrorCode.TERM_VERSION_MISMATCH))
                }
                return this._updateUserAcceptedTermUseCase.execute(citizenId, {acceptedVersion: command.version}).pipe(
                    map((success) => ({success})),
                )

            }),
        )
    }
}
