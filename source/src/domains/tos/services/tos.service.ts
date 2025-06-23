import { ITermOfServiceService } from '@domains/tos/interfaces/service.interface'
import {
    map,
    Observable,
} from 'rxjs'
import { UserAcceptedTermResponse } from '@domains/tos/response/user-accepted-term.response'
import { IGetUserAcceptedTermUseCase } from '@domains/tos/interfaces/use-case.interface'
import { plainToInstance } from 'class-transformer'

export class TosService implements ITermOfServiceService {
    public constructor(
        private readonly _currentTermVersion: string,
        private readonly _getUserAcceptedTermUseCase: IGetUserAcceptedTermUseCase,
    ) {
    }

    public getUserAcceptTerm(citizenId: string): Observable<UserAcceptedTermResponse> {
        return this._getUserAcceptedTermUseCase.execute(citizenId).pipe(
            map(result => {
                const data: UserAcceptedTermResponse = {
                    isOk: this._currentTermVersion === result?.acceptedVersion,
                    acceptedDate: result?.acceptedDate || null,
                    acceptedVersion: result?.acceptedVersion || null,
                    requiredVersion: this._currentTermVersion || null,
                }

                return plainToInstance(UserAcceptedTermResponse, data, {exposeUnsetFields: true, excludeExtraneousValues: true})
            }),
        )
    }

}
