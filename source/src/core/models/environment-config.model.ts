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

    @IsNotEmpty()
    public readonly DB_PROTOCOL: string
    @IsNotEmpty()
    public readonly DB_HOSTS: string

    @IsNotEmpty()
    public readonly DB_NAME: string

    public readonly DB_USERNAME: string
    public readonly DB_PASSWORD: string
    public readonly DB_REPL_NAME: string

    @IsNotEmpty()
    public readonly TOS_VERSION: string

    @IsNumber()
    @Transform(({ value }) => Number(value))
    public readonly DB_GLOBAL_MAX_POOL_SIZE: number

    @IsOptional()
    public readonly REDIS_CONNECTION_STRING: string

    @IsNumber()
    @Transform(({ value }) => Number(value))
    public readonly POD_TO_SCALE: number

    @IsNotEmpty()
    public readonly RABBIT_SECRET: string
    @IsNotEmpty()
    public readonly RABBIT_BASE_URL: string

    public isProduction() {
        return this.APP_ENV === 'production'
    }

    public getDatabaseClusterMode(): 'replicaSet' | 'sharded' {
        return this.DB_HOSTS.includes('shard') ?  'sharded': 'replicaSet'

    }
}
