import {
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

    @Transform(({ value }) =>Number(value))
    @IsNumber()
    public readonly APP_PORT: number

    @IsNotEmpty()
    public readonly APP_VERSION: string

    @IsOptional()
    public readonly APP_PREFIX: string = ''

}
