import { plainToInstance } from 'class-transformer'
import { UserContext } from '../models/user-context.model'
import { IRequestContextService } from '../interfaces/request-context.service.interface'
import { v4 } from 'uuid'

export class RequestContextService  implements IRequestContextService {
    private _userContext: UserContext
    private readonly _ts
    private readonly _requestId: string
    public constructor() {
        this._requestId = v4()
        this._ts = Date.now()
    }

    public getTimestamp(): number {
        return this._ts
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
}
