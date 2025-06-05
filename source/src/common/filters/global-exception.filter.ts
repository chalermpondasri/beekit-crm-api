import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
} from '@nestjs/common'
import { ErrorModel } from '../models/error.model'
import { ILoggerService } from '@domains/services/interfaces/logger.service.interface'
import { ProviderName } from '@constants/provider-name.enum'

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
    public constructor(
        @Inject(ProviderName.LOGGER_SERVICE)
        private readonly _logger: ILoggerService
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

        return response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: {
                code: `${status}`,
                message: message,
            },
            message: 'An unexpected error occurred',
        })

    }
}
