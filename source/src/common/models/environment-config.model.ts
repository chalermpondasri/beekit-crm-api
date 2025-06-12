import {
    IsBase64,
    IsNotEmpty,
    IsNumber,
    IsOptional,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { IsRSAKey } from '@decorators/validators/is-rsa-key.decorator'

export class EnvironmentConfig {

    @IsNotEmpty()
    public readonly APP_ENV: string

    @IsNotEmpty()
    public readonly APP_NAME: string

    @Transform(({ value }) =>Number(value))
    @IsNumber()
    public readonly APP_PORT: number

    @IsNotEmpty()
    public readonly APP_VERSION: string

    @IsOptional()
    public readonly APP_PREFIX: string = ''

    @IsNotEmpty()
    @IsBase64()
    @IsRSAKey('private', ({value}) => Buffer.from(value, 'base64'),)
    public readonly JWT_ACCESS_TOKEN_KEY: string
    @IsNotEmpty()
    public readonly JWT_ACCESS_TOKEN_TTL: string

    @IsNotEmpty()
    @IsBase64()
    @IsRSAKey('private', ({value}) => Buffer.from(value, 'base64'),)
    public readonly JWT_REFRESH_TOKEN_KEY: string
    @IsNotEmpty()
    public readonly JWT_REFRESH_TOKEN_TTL: string

}
