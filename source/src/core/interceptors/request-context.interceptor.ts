import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { extractTokenFromHeader } from '@utils/bearer-extract.util'
import { Request } from 'express'
import { Jwt } from 'jsonwebtoken'
import { ProviderName } from '../constants/provider-name.enum'
import { ITokenizationService } from '@domains/auth/interfaces/tokenization.interface'
import { IRequestContextService } from '../interfaces/request-context.service.interface'
import { ILoggerService } from '@domains/auth/interfaces/logger.service.interface'

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
    public constructor(
        @Inject(ProviderName.REQUEST_CONTEXT_SERVICE)
        private readonly _requestContextService: IRequestContextService,
        @Inject(ProviderName.TOKENIZATION_SERVICE)
        private readonly _tokenizationService: ITokenizationService,
        @Inject(ProviderName.LOGGER_SERVICE)
        private readonly _logger: ILoggerService,
    ) {
        this._logger.setContext(RequestContextInterceptor.name)
    }
    public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest() as Request

        const token = extractTokenFromHeader(request.headers?.authorization)
        if(!token) {
            return next.handle()
        }

        try {
            const jwt = <Jwt> this._tokenizationService.decode(token, 'accessToken')
            this._requestContextService.setUserContext(jwt.payload)
        } catch (err){
            this._logger.error(err)
        }

        return next.handle()

    }
}
