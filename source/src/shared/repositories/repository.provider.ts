import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { CardRepository } from '@shared/repositories/card/card.repository'
import { CardEntityMapper } from '@shared/repositories/card/card.mapper'
import { Db } from 'mongodb'
import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'
import { AcceptTermMapper } from '@shared/repositories/term/accept-term.mapper'
import { AcceptTermRepository } from '@shared/repositories/term/accept-term.repository'


export const entityMappers: Provider[] = [
    {
        provide: ProviderName.CARD_ENTITY_MAPPER,
        useClass: CardEntityMapper
    },
    {
        provide: ProviderName.ACCEPT_TERM_MAPPER,
        useClass:AcceptTermMapper,
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
    {
        provide: ProviderName.ACCEPT_TERM_REPOSITORY,
        inject: [
            ProviderName.MONGO_DATASOURCE,
            ProviderName.ACCEPT_TERM_MAPPER,
        ],

        useFactory: (db: Db, mapper: IRepositoryMapper<any, any>) => new AcceptTermRepository(db, mapper),
    }
]
