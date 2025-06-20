import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import {
    catchError,
    mergeMap,
    Observable,
    of,
    tap,
} from 'rxjs'
import { extractTokenFromHeader } from '@utils/bearer-extract.util'
import {
    Request,
    Response,
} from 'express'
import { ProviderName } from '../constants/provider-name.enum'
import { ITokenizationService } from '@domains/auth/interfaces/tokenization.interface'
import { IRequestContextService } from '../interfaces/request-context.service.interface'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { IAccessLoggerService } from '@core/interfaces/access-logger.service.interface'

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
    public constructor(
        @Inject(ProviderName.REQUEST_CONTEXT_SERVICE)
        private readonly _requestContextService: IRequestContextService,
        @Inject(ProviderName.TOKENIZATION_SERVICE)
        private readonly _tokenizationService: ITokenizationService,
        @Inject(ProviderName.LOGGER_SERVICE)
        private readonly _logger: ILoggerService,
        @Inject(ProviderName.ACCESS_LOGGER_SERVICE)
        private readonly _accessLogger: IAccessLoggerService,
    ) {
    }
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const requestStartTime  = process.hrtime.bigint();
        const startTime = new Date()

        const request = context.switchToHttp().getRequest() as Request

        const response = context.switchToHttp().getResponse() as Response
        response.setHeader('X-Request-Id', this._requestContextService.getRequestId())

        const token = extractTokenFromHeader(request.headers?.authorization)


        const tokenProcessing$ = token
            ? this._tokenizationService.decode(token, 'accessToken').pipe(
                tap(data => this._requestContextService.setUserContext(data)),
                catchError(err => {
                    this._logger.error('Token validation failed:', err, RequestContextInterceptor.name)
                    return of(null)
                })
            )
            : of(null)

        return tokenProcessing$.pipe(
            mergeMap(() => next.handle()),
            tap(() => {
                this._accessLogger.log({
                    requestId: this._requestContextService.getRequestId(),
                    method: request.method,
                    url: request.url,
                    userId: this._requestContextService.getUserId(),
                    traceId: this._requestContextService.getTraceId(),
                    queryParams: request.query,
                    userAgent: request.headers?.['user-agent'] || 'unknown',
                    statusCode: response.statusCode,
                    responseTime:  Number(process.hrtime.bigint() - requestStartTime)/100000,
                    timestamp: startTime,
                })
            }),
        )


    }
}
