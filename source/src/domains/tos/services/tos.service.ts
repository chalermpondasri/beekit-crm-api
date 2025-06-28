import { ITermOfServiceService } from '@domains/tos/interfaces/service.interface'
import {
    concatMap,
    map,
    mergeMap,
    Observable,
    of,
    tap,
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
import { ICacheService } from '@core/interfaces/cache.service.interface'
import { HasherService } from '@utils/hasher.service'

interface ICacheResult {
    accepted: string | null
    required: string | null
    isOk: boolean
}

export class TosService implements ITermOfServiceService {
    public constructor(
        private readonly _errorFactoryService: IErrorFactory,
        private readonly _currentTermVersion: string,
        private readonly _getUserAcceptedTermUseCase: IGetUserAcceptedTermUseCase,
        private readonly _updateUserAcceptedTermUseCase: IUpdateUserAcceptedTermUseCase,
        private readonly _cacheService: ICacheService,
    ) {
    }

    public getUserAcceptTerm(citizenId: string): Observable<UserAcceptedTermResponse> {

        const getUserAcceptTermToCache$ = () => this._getUserAcceptedTermUseCase.execute(citizenId).pipe(
            map(result => {
                    const data: ICacheResult = {
                        isOk: this._currentTermVersion === result?.acceptedVersion,
                        accepted: result?.acceptedVersion || null,
                        required: this._currentTermVersion || null,
                    }
                    return data
                },
            ),
        )

        return of(HasherService.hashSha256toBase64Url(citizenId)).pipe(
            concatMap(hashed => this._cacheService.getAndSet<ICacheResult>(`tos_${hashed}`, getUserAcceptTermToCache$, {ttl: '1d'})),
            map(result => {
                const data: UserAcceptedTermResponse = {
                    isOk: result.isOk,
                    accepted: result.accepted,
                    required: result.required
                }

                return plainToInstance(UserAcceptedTermResponse, data, {
                    exposeUnsetFields: true,
                    excludeExtraneousValues: true,
                })
            })
        )
    }

    public updateUserTerm(citizenId: string, command: UpdateUserTermCommand): Observable<{ success: boolean }> {
        return of(command).pipe(
            mergeMap(command => {
                if (command.version !== this._currentTermVersion) {
                    return throwError(() => this._errorFactoryService.createBadRequestError(ApplicationErrorCode.TERM_VERSION_MISMATCH))
                }
                return this._updateUserAcceptedTermUseCase.execute(citizenId, {acceptedVersion: command.version})
            }),
            tap((out) => {
                const schema: ICacheResult = {
                    isOk: true,
                    accepted: out.acceptedVersion,
                    required: this._currentTermVersion,
                }
                this._cacheService.set(`tos_${HasherService.hashSha256toBase64Url(citizenId)}`, schema, {ttl: '1d'})
            }),
            map(() => ({success: true})),
        )
    }
}
