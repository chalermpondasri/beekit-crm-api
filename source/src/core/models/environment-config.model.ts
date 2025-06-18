import {
    IsBase64,
    IsNotEmpty,
    IsNumber,
    IsOptional,
} from 'class-validator'
import { Transform } from 'class-transformer'

export class EnvironmentConfig {

    @IsNotEmpty()
    public readonly APP_ENV: string

    public isProduction() {
        return this.APP_ENV === 'production'
    }

    @IsNotEmpty()
    public readonly APP_NAME: string

    @IsNotEmpty()
    public readonly APP_ID: string

    @Transform(({ value }) =>Number(value))
    @IsNumber()
    public readonly APP_PORT: number

    @IsNotEmpty()
    public readonly APP_VERSION: string

    @IsOptional()
    public readonly APP_PREFIX: string = ''

    @IsNotEmpty()
    public readonly JWT_ACCESS_KEY_ALGORITHM: string

    @IsNotEmpty()
    @IsBase64()
    public readonly JWT_ACCESS_TOKEN_PRIVATE_KEY: string

    @IsNotEmpty()
    @IsBase64()
    public readonly JWT_ACCESS_TOKEN_PUBLIC_KEY: string

    @IsNotEmpty()
    public readonly JWT_ACCESS_TOKEN_TTL: string

    @IsNotEmpty()
    public readonly JWT_REFRESH_KEY_ALGORITHM: string

    @IsNotEmpty()
    @IsBase64()
    public readonly JWT_REFRESH_TOKEN_PRIVATE_KEY: string

    @IsNotEmpty()
    @IsBase64()
    public readonly JWT_REFRESH_TOKEN_PUBLIC_KEY: string

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
