import {
    CanActivate,
    Inject,
    Injectable,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { IRequestContextService } from '@core/interfaces/request-context.service.interface'
import { ProviderName } from '@core/constants/provider-name.enum'

@Injectable()
export class AcceptTermGuard implements CanActivate {
    public constructor(
        @Inject(ProviderName.REQUEST_CONTEXT_SERVICE)
        private readonly _requestContextService: IRequestContextService,
    ) {
    }

    public canActivate(): Observable<boolean> {
        return this._requestContextService.isTermAccepted()

    }

}
