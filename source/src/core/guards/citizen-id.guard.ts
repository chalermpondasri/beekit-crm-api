import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from '@nestjs/common'
import {
    catchError,
    map,
    Observable,
    of,
} from 'rxjs'
import { extractTokenFromHeader } from '@utils/bearer-extract.util'
import { ProviderName } from '@core/constants/provider-name.enum'
import { ITokenizationService } from '@domains/auth/interfaces/tokenization.interface'

@Injectable()
export class CitizenIdGuard implements CanActivate {
    public constructor(
        @Inject(ProviderName.TOKENIZATION_SERVICE)
        private readonly _tokenizationService: ITokenizationService,
    ) {
    }

    public canActivate(context: ExecutionContext): Observable<boolean>{
        const request = context.switchToHttp().getRequest() as Request

        return of(extractTokenFromHeader(request.headers['authorization'])).pipe(
            map(token => {

                return !!token  && !!this._tokenizationService.verifyAccessToken(token)
            }),
            catchError(() => of(false)),
        )
    }

}
