import { IErrorFactory } from '@domains/factories/error/interfaces/error.factory.interface'
import { ApplicationErrorCode } from '@constants/error-code.enum'
import { ErrorModel } from '@common/models/error.model'
import { ILocaleErrorMessage } from '@constants/error-message.constant'

export class ErrorFactoryService implements IErrorFactory {
    public constructor(
        private readonly _errorMessages: Record<ApplicationErrorCode, ILocaleErrorMessage>
    ) {
    }

    private _getErrorMessage(code: ApplicationErrorCode): ILocaleErrorMessage {
        const result = this._errorMessages[code]
        if (!result) {
            return {
                title: 'เกิดข้อผิดพลาด',
                message: `เกิดข้อผิดพลาด (${code})`,
            }
        }
        return result
    }
    public createBadRequestError(code: ApplicationErrorCode,  errorObject?: any): ErrorModel {
        const { title, message } = this._getErrorMessage(code)
        return new ErrorModel(400, {
                code,
                title,
                message,
            },
            errorObject,
        )
    }

    public createInternalServerError(code: ApplicationErrorCode,  errorObject?: any): ErrorModel {
        const { title, message } = this._getErrorMessage(code)
        return new ErrorModel(500, {
                code,
                title,
                message,
            },
            errorObject,
        )
    }

    public createNotfoundError(code: ApplicationErrorCode,  errorObject?: any): ErrorModel {
        const { title, message } = this._getErrorMessage(code)
        return new ErrorModel(404, {
                code,
                title,
                message,
            },
            errorObject,
        )
    }

    public createUnauthorizedError(code: ApplicationErrorCode,  errorObject?: any): ErrorModel {
        const { title, message } = this._getErrorMessage(code)
        return new ErrorModel(401, {
                code,
                title,
                message,
            },
            errorObject,
        )
    }

}
