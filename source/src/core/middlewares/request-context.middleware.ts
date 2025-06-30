import {
    Inject,
    Injectable,
    NestMiddleware,
} from '@nestjs/common'
import {
    NextFunction,
    Request,
    Response,
} from 'express'
import { IRequestContextService } from '@core/interfaces/request-context.service.interface'
import { extractTokenFromHeader } from '@utils/bearer-extract.util'
import {
    catchError,
    lastValueFrom,
    mergeMap,
    of,
    tap,
} from 'rxjs'
import { ProviderName } from '@core/constants/provider-name.enum'
import { ITokenizationService } from '@domains/auth/interfaces/tokenization.interface'
import { ILoggerService } from '@core/interfaces/logger.service.interface'

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    public constructor(
        @Inject(ProviderName.REQUEST_CONTEXT_SERVICE)
        private readonly _requestContextService: IRequestContextService,
        @Inject(ProviderName.TOKENIZATION_SERVICE)
        private readonly _tokenizationService: ITokenizationService,
        @Inject(ProviderName.LOGGER_SERVICE)
        private readonly _logger: ILoggerService,
    ) {
    }

    public use(request: Request, response: Response, next: NextFunction) {
        response.setHeader('X-Request-Id', this._requestContextService.getRequestId())
        const token = extractTokenFromHeader(request.headers?.authorization)

        const tokenProcessing$ = token
            ? of(token).pipe(
                mergeMap((token) => this._tokenizationService.verifyAccessToken(token)),
                tap(data => {
                    this._requestContextService.validated = true
                    this._requestContextService.isValid = true
                    this._requestContextService.setUserContext(data)
                }),
                catchError(err => {
                    this._logger.error('Token decode failed:', err, RequestContextMiddleware.name)
                    this._requestContextService.validated = true
                    this._requestContextService.isValid = false
                    return of(null)
                }),
            )
            : of(null)

        lastValueFrom(tokenProcessing$)
            .finally(() => next())

    }
}
