import { ISODateTime } from '../../types/datestring.type'
import { ApplicationErrorCode } from '../../constants/error-code.enum'
import {
    ApiProperty,
} from '@nestjs/swagger'

interface IErrorDetails {
    code: ApplicationErrorCode
    title: string
    message: string
}

export class ErrorModel extends Error {
    public constructor(
        public statusCode: number,
        public error: IErrorDetails,
        public timestamp: ISODateTime = new Date().toISOString(),
        public errorObject?: any,
    ) {
        super(error.message)
        Object.setPrototypeOf(this, ErrorModel.prototype)
    }
}

export class ErrorDto {
    @ApiProperty()
    public statusCode: number
    @ApiProperty({
        example: {
            code: ApplicationErrorCode.AUTHENTICATION_AUTH_FAILED,
            title: 'Error Title',
            message: 'Error Message',
        },
    })
    public error: IErrorDetails
    @ApiProperty({
        type: String, format: 'date-time',
        example: '2025-05-15T10:18:38.133Z',
    })
    public timestamp: ISODateTime = new Date().toISOString()
    @ApiProperty()
    public errorObject?: any

}
