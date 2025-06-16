import {
    IsBase64,
    IsNotEmpty,
    IsNumber,
    IsOptional,
} from 'class-validator'
import { Transform } from 'class-transformer'
import { IsRSAKey } from '../decorators/validators/is-rsa-key.decorator'

export class EnvironmentConfig {

    @IsNotEmpty()
    public readonly APP_ENV: string

    public isProduction() {
        return this.APP_ENV === 'production'
    }

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

    @IsNotEmpty()
    public readonly EGOV_TOKEN_URL: string

    @IsNotEmpty()
    public readonly EGOV_VERIFY_MTOKEN_URL: string

    @IsNotEmpty()
    public readonly EGOV_CONSUMER_KEY: string
    @IsNotEmpty()
    public readonly EGOV_CONSUMER_SECRET: string
    @IsNotEmpty()
    public readonly EGOV_DEFAULT_AGENT_ID: string

}
