import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { CardRepository } from '@shared/repositories/card/card.repository'
import { CardEntityMapper } from '@shared/repositories/card/card.mapper'
import { Db } from 'mongodb'
import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'


export const entityMappers: Provider[] = [
    {
        provide: ProviderName.CARD_ENTITY_MAPPER,
        useClass: CardEntityMapper
    }
]


export const repositoryProviders: Provider[] = [
    {
        provide: ProviderName.CARD_REPOSITORY,
        inject: [
            ProviderName.MONGO_DATASOURCE,
            ProviderName.CARD_ENTITY_MAPPER,
        ],
        useFactory: (db:Db, mapper: IRepositoryMapper<any, any>) => new CardRepository(db, mapper),
    },
]
