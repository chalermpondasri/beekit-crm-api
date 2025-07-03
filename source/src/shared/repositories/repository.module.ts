import { Module } from '@nestjs/common'
import {
    entityMappers,
    repositoryProviders,
} from '@shared/repositories/repository.provider'
import { DatabaseModule } from '@core/modules/database.module'

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        ...entityMappers,
        ...repositoryProviders,
    ],
    exports: [
        ...repositoryProviders,
    ],
})
export class RepositoryModule {}
