import {
    Provider,
    Scope,
} from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import axios, { AxiosInstance } from 'axios'
import http from 'http'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { EGovAdapter } from './egov/egov.adapter'

export const httpClientProvider: Provider = {
    provide: ProviderName.HTTP_CLIENT,
    scope: Scope.TRANSIENT,
    useFactory: (): AxiosInstance => {
        const agent = new http.Agent({family: 4})
        return axios.create({
            httpAgent: agent,
        })
    },
}

export const eGovAdapterProvider: Provider = {
    provide: ProviderName.EGOV_ADAPTER,
    inject: [
        ProviderName.HTTP_CLIENT,
        ProviderName.ENVIRONMENT_CONFIG,
        ProviderName.LOGGER_SERVICE,
    ],
    useFactory: (
        httpClient: AxiosInstance,
        config: EnvironmentConfig,
        logger: ILoggerService,
    ) => {

        return new EGovAdapter(
            httpClient,
            config.EGOV_CONSUMER_KEY,
            config.EGOV_CONSUMER_SECRET,
            config.EGOV_DEFAULT_AGENT_ID,
            config.EGOV_TOKEN_URL,
            config.EGOV_VERIFY_MTOKEN_URL,
            logger.setContext(ProviderName.EGOV_ADAPTER),
        )
    },
}

