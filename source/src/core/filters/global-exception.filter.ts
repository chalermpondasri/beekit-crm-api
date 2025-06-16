import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
} from '@nestjs/common'
import {
    ErrorDto,
    ErrorModel,
} from '../models/error.model'
import { ILoggerService } from '@domains/auth/interfaces/logger.service.interface'
import { ProviderName } from '../constants/provider-name.enum'
import { EnvironmentConfig } from '@core/models/environment-config.model'

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
    public constructor(
        @Inject(ProviderName.LOGGER_SERVICE)
        private readonly _logger: ILoggerService,
        @Inject(ProviderName.ENVIRONMENT_CONFIG)
        private readonly _envConfig: EnvironmentConfig,
    ) {
        this._logger.setContext(GlobalExceptionFilter.name)
    }

    public catch(exception: Error, host: ArgumentsHost): any {
        const context = host.switchToHttp()
        const response = context.getResponse()
        const request = context.getRequest()

        if (exception instanceof ErrorModel) {
            this._logger.error(`[${exception.error.code}] ${exception.message}`, exception.stack )
            return response.status(exception.statusCode).json(exception)
        }

        const errorObject = !this._envConfig.isProduction() ? {
            response: exception instanceof HttpException ? (exception.getResponse()) : null,
        } : {}

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR

        const message =
            exception instanceof HttpException
                ? exception.message
                : 'Internal server error'

        this._logger.error(
            `[${status}] ${message} - ${request.method} ${request.url}`,
            exception?.stack,
        )

        const errorDto: ErrorDto = {
            statusCode: status,
            timestamp: new Date().toISOString(),

            error: {
                code: <any>`${status}`,
                title: 'Unexpected Error',
                message: message,
            },
            errorObject: {
                path: request.url,
                ...errorObject,
            }
        }

        return response.status(status).json(errorDto)

    }
}
