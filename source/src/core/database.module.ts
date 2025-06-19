import {
    Module,
    OnApplicationShutdown,
    OnModuleDestroy,
} from '@nestjs/common'
import { databaseProvider } from '@core/providers/database.provider'
import { ProviderName } from '@core/constants/provider-name.enum'
import { ModuleRef } from '@nestjs/core'

@Module({
    providers: [
        databaseProvider,
    ],
    exports: [
        databaseProvider,
    ]
})
export class DatabaseModule implements OnApplicationShutdown, OnModuleDestroy {
    constructor(private readonly moduleRef: ModuleRef) {}


    async onModuleDestroy() {
        console.log(`Database module destroyed`)

        // Access the client through the database object if stored
        console.log(this.moduleRef.get(ProviderName.MONGO_DATASOURCE))
    }

    async onApplicationShutdown(signal?: string) {
        console.log(`Database module shutting down (${signal})`)

        // Access the client through the database object if stored
        console.log(this.moduleRef.get(ProviderName.MONGO_DATASOURCE))
    }

}
