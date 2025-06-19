import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common'
import {
    ErrorDto,
    ErrorModel,
} from '../models/error.model'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { IAccessLoggerService } from '@core/interfaces/access-logger.service.interface'
import { IRequestContextService } from '@core/interfaces/request-context.service.interface'
import {
    Request,
    Response,
} from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    public constructor(
        private readonly _logger: ILoggerService,
        private readonly _envConfig: EnvironmentConfig,
        private readonly _accessLogger: IAccessLoggerService,
        private readonly _requestContextService: IRequestContextService,
    ) {
        this._logger.setContext(GlobalExceptionFilter.name)
    }

    public catch(exception: Error, host: ArgumentsHost): any {
        const context = host.switchToHttp()
        const response = context.getResponse() as Response
        const request = context.getRequest() as Request



        let statusCode: number = 500
        let message = 'Internal server error'
        let title = 'Internal server error'
        let domainErrorCode = String(statusCode)
        if (exception instanceof HttpException) {
            statusCode = exception.getStatus()
            message = exception.message
            domainErrorCode = String(statusCode)
        } else if (exception instanceof ErrorModel) {
            statusCode = exception.statusCode
            title = exception.error.title
            message = exception.error.message
            domainErrorCode = exception.error.code

        }

        this._accessLogger.log({
            requestId: this._requestContextService.getRequestId(),
            method: request.method,
            url: request.url,
            traceId: this._requestContextService.getTraceId(),
            userAgent: request.headers['user-agent'],
            statusCode: statusCode,
            responseTime: Number((process.hrtime.bigint() - this._requestContextService.getHrTime()))/100000,
            timestamp: new Date(this._requestContextService.getTimestamp()),
            error: exception,
            queryParams: request.query,
        })

        const errorObject = !this._envConfig.isProduction() ? {
            response: exception instanceof HttpException ? (exception.getResponse()) : null,
        } : {}

        const errorDto: ErrorDto = {
            statusCode: statusCode,
            timestamp: new Date().toISOString(),

            error: {
                code: <any>`${domainErrorCode}`,
                title,
                message,
            },
            errorObject: {
                path: request.url,
                ...errorObject,
            }
        }

        return response.setHeader('X-Request-Id', this._requestContextService.getRequestId()).status(statusCode).json(errorDto)

    }
}
