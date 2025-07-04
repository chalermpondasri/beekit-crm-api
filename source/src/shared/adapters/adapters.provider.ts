import {
    Provider,
    Scope,
} from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import axios, { AxiosInstance } from 'axios'
import http from 'http'

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

