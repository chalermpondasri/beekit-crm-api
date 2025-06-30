import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import {
    Observable,
    tap,
} from 'rxjs'
import {
    Request,
    Response,
} from 'express'
import { ProviderName } from '../constants/provider-name.enum'
import { IRequestContextService } from '../interfaces/request-context.service.interface'
import { IAccessLoggerService } from '@core/interfaces/access-logger.service.interface'

@Injectable()
export class AccessRequestInterceptor implements NestInterceptor {
    public constructor(
        @Inject(ProviderName.REQUEST_CONTEXT_SERVICE)
        private readonly _requestContextService: IRequestContextService,
        @Inject(ProviderName.ACCESS_LOGGER_SERVICE)
        private readonly _accessLogger: IAccessLoggerService,
    ) {
    }
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const requestStartTime  = process.hrtime.bigint();
        const startTime = new Date()

        const httpContext = context.switchToHttp()
        const request =httpContext.getRequest<Request>()
        const response = httpContext.getResponse<Response>()

        return next.handle().pipe(
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
