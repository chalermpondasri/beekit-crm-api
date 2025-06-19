import { Module } from '@nestjs/common'
import { databaseProvider } from '@core/providers/database.provider'

@Module({
    providers: [
        databaseProvider,
    ],
    exports: [
        databaseProvider,
    ]
})
export class DatabaseModule {}
