import dotenv from 'dotenv'
import {
    InternalServerErrorException,
    Provider,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import * as process from 'node:process'
import { validateSync } from 'class-validator'
import { ProviderName } from '@constants/provider-name.enum'
import { EnvironmentConfig } from '@common/models/environment-config.model'

dotenv.config()
export const environmentConfigProvider: Provider = {
    provide: ProviderName.ENVIRONMENT_CONFIG,
    useFactory: () => {
        const env =  plainToInstance(EnvironmentConfig, process.env)
        const errors = validateSync(env)
        if (errors.length !== 0) {
            throw new InternalServerErrorException(errors.join(','))
        }

        return env
    },

}
