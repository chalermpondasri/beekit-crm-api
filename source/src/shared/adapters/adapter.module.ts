import { Module } from '@nestjs/common'
import {
    eGovAdapterProvider,
    httpClientProvider,
} from './adapters.provider'

@Module({
    providers: [
        httpClientProvider,
        eGovAdapterProvider,
    ],
    exports: [
        eGovAdapterProvider,
    ],
})
export class AdapterModule {

}
