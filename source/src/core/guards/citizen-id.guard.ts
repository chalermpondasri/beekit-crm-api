import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    Scope,
} from '@nestjs/common'
import {
    catchError,
    map,
    mergeMap,
    Observable,
    of,
    throwError,
} from 'rxjs'
import { extractTokenFromHeader } from '@utils/bearer-extract.util'
import { ProviderName } from '@core/constants/provider-name.enum'
import { ITokenizationService } from '@domains/auth/interfaces/tokenization.interface'
import { Request } from 'express'
import { IRequestContextService } from '@core/interfaces/request-context.service.interface'

@Injectable({scope: Scope.DEFAULT})
export class CitizenIdGuard implements CanActivate {
    public constructor(
        @Inject(ProviderName.TOKENIZATION_SERVICE)
        private readonly _tokenizationService: ITokenizationService,
        @Inject(ProviderName.REQUEST_CONTEXT_SERVICE)
        private readonly _requestContextService: IRequestContextService,
    ) {
    }

    public canActivate(context: ExecutionContext): Observable<boolean> {
        if(this._requestContextService.validated && this._requestContextService.isValid) {
            return of(true)
        }

        return of(context.switchToHttp().getRequest<Request>()).pipe(
            map(req => req.headers['authorization']),
            mergeMap(rawToken => {
                if (!rawToken) {
                    return throwError(() => new Error('Authorization header is missing'))
                }
                return of(extractTokenFromHeader(rawToken))
            }),
            mergeMap(token => {
                return this._tokenizationService.verifyAccessToken(token).pipe(
                    map(data => {
                        this._requestContextService.validated = true
                        this._requestContextService.isValid = !!data
                        return this._requestContextService.isValid
                    }),
                )
            }),
            catchError(() => {
                this._requestContextService.validated = true
                this._requestContextService.isValid = false
                return of(false)
            }),
        )
    }

}
