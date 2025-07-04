import { Module } from '@nestjs/common'
import {
    httpClientProvider,
} from './adapters.provider'

@Module({
    providers: [
        httpClientProvider,
    ],
    exports: [
    ],
})
export class AdapterModule {

}
