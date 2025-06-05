import { IRequestContextService } from '@domains/services/interfaces/request-context.service.interface'
import { UserContext } from '@common/models/user-context.model'
import { plainToInstance } from 'class-transformer'

export class RequestContextService  implements IRequestContextService{
    private _userContext: UserContext

    public setUserContext(userContext: any) {
        const data = Object.assign({}, {...userContext})
        this._userContext = plainToInstance(UserContext, data)
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
