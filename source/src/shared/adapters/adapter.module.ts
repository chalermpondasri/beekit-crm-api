import { Module } from '@nestjs/common'
import {
    eGovAdapterProvider,
    httpClientProvider,
    rabbitTransitAdapterProvider,
} from './adapters.provider'

@Module({
    providers: [
        httpClientProvider,
        eGovAdapterProvider,
        rabbitTransitAdapterProvider,
    ],
    exports: [
        eGovAdapterProvider,
        rabbitTransitAdapterProvider,
    ],
})
export class AdapterModule {

}
