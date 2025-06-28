import { plainToInstance } from 'class-transformer'
import { UserContext } from '../models/user-context.model'
import { IRequestContextService } from '../interfaces/request-context.service.interface'
import { v4 } from 'uuid'
import * as process from 'node:process'
import {
    map,
    Observable,
    of,
} from 'rxjs'
import { IGetUserAcceptedTermUseCase } from '@domains/tos/interfaces/use-case.interface'

export class RequestContextService  implements IRequestContextService {
    private _userContext: UserContext
    private readonly _ts: number
    private readonly _requestId: string
    private readonly _hrTime: bigint
    public validated: boolean = false
    public isValid: boolean = false
    private _isUserAcceptedTerm: boolean | null = null

    public constructor(
        private readonly _acceptTermUseCase: IGetUserAcceptedTermUseCase,
        private readonly _requiredTermVersion: string,
    ) {
        this._requestId = v4()
        this._ts = Date.now()
        this._hrTime = process.hrtime.bigint()
    }
    public getTimestamp(): number {
        return this._ts
    }

    public getHrTime(): bigint {
        return this._hrTime
    }
    public setUserContext(userContext: any) {
        this._userContext = plainToInstance(UserContext, {...userContext})
    }
    public getPsnId(): string {
        return this._userContext.citizenId?.replaceAll('-','') || ''
    }

    public getFullName(): string {
        return `${this._userContext.firstName} ${this._userContext.lastName}`
    }

    public getUserId(): string | null {
        return this._userContext?.sub || null
    }

    public getRequestId(): string | null {
        return this._requestId || null
    }

    public getTraceId(): string | null {
        return this._userContext?.traceId || null
    }

    public isTermAccepted():  Observable<boolean> {
        if(this._isUserAcceptedTerm !== null) {
            return of(this._isUserAcceptedTerm)
        }
        return this._acceptTermUseCase.execute(this.getPsnId()).pipe(
            map(termOutput => {

                const result = termOutput && this._requiredTermVersion === termOutput?.acceptedVersion
                this._isUserAcceptedTerm = result
                return  result
            })
        )
    }
}
