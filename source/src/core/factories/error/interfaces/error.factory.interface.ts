import { ApplicationErrorCode } from '@core/constants/error-code.enum'
import { ErrorModel } from '@core/models/error.model'

export interface IErrorFactory {
    createUnauthorizedError(code: ApplicationErrorCode,  errorObject?: any): ErrorModel
    createNotfoundError(code: ApplicationErrorCode,  errorObject?: any): ErrorModel
    createBadRequestError(code: ApplicationErrorCode,  errorObject?: any): ErrorModel
    createInternalServerError(code: ApplicationErrorCode,  errorObject?: any): ErrorModel
}
