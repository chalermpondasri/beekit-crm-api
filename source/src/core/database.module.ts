import {
    Module,
    OnModuleDestroy,
} from '@nestjs/common'
import {
    databaseProvider,
    mongoClientProvider,
} from '@core/providers/database.provider'
import { ModuleRef } from '@nestjs/core'
import { ProviderName } from '@core/constants/provider-name.enum'
import {
    MongoClient,
} from 'mongodb'

@Module({
    providers: [
        mongoClientProvider,
        databaseProvider,
    ],
    exports: [
        databaseProvider,
    ]
})
export class DatabaseModule implements OnModuleDestroy{
    public constructor(
        private readonly _moduleRef: ModuleRef
    ) {}
    async onModuleDestroy() {
        const client = await this._moduleRef.resolve<MongoClient>(ProviderName.MONGO_CLIENT)
        client.close()
    }
}
