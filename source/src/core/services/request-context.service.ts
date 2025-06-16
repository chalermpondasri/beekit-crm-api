import { plainToInstance } from 'class-transformer'
import { UserContext } from '../models/user-context.model'
import { IRequestContextService } from '../interfaces/request-context.service.interface'

export class RequestContextService  implements IRequestContextService{
    private _userContext: UserContext

    public setUserContext(userContext: any) {
        this._userContext = plainToInstance(UserContext, {...userContext})
    }
    public getPsnId(): string {
        return this._userContext.citizenId?.replaceAll('-','') || ''
    }

    public getFullName(): string {
        return `${this._userContext.firstName} ${this._userContext.lastName}`
    }

    public getUserId(): string {
        return this._userContext.sub
    }
}
