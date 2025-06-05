import {
    Provider,
    Scope,
} from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import http from 'http'
import { ProviderName } from '@constants/provider-name.enum'

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
