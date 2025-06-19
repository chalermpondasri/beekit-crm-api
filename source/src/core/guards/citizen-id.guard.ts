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

@Injectable({scope: Scope.DEFAULT})
export class CitizenIdGuard implements CanActivate {
    public constructor(
        @Inject(ProviderName.TOKENIZATION_SERVICE)
        private readonly _tokenizationService: ITokenizationService,
    ) {
    }

    public canActivate(context: ExecutionContext): Observable<boolean> {
        return of(context.switchToHttp().getRequest() as Request).pipe(
            map(req => req.headers['authorization']),
            mergeMap(rawToken => {
                if (!rawToken) {
                    return throwError(() => new Error('Authorization header is missing'))
                }
                return of(extractTokenFromHeader(rawToken))

            }),
            mergeMap(token => {
                return this._tokenizationService.verifyAccessToken(token).pipe(
                    map(data => !!data),
                )
            }),
            catchError(() => of(false)),
        )
    }

}
