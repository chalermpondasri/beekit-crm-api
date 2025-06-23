import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { CardRepository } from '@shared/repositories/card/card.repository'
import { CardEntityMapper } from '@shared/repositories/card/card.mapper'
import {
    Db,
    MongoClient,
} from 'mongodb'
import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'
import { AcceptTermMapper } from '@shared/repositories/term/accept-term.mapper'
import { AcceptTermRepository } from '@shared/repositories/term/accept-term.repository'

const detectClusterType = async (db: Db) => {
    try {
        const serverStatus = await db.admin().command({serverStatus: 1})

        // Check if this is a mongos (shard router)
        if (serverStatus.process === 'mongos') {
            return 'sharded'
        }

        // Check if replicaSet is configured
        const replSetStatus = await db.admin().command({replSetGetStatus: 1})
        if (replSetStatus.ok) {
            return 'replicaSet'
        }

        return 'standalone'
    } catch (error) {
        console.warn('Could not detect cluster type:', error)
        return 'replicaSet' // Default fallback
    }

}

export const entityMappers: Provider[] = [
    {
        provide: ProviderName.CARD_ENTITY_MAPPER,
        useClass: CardEntityMapper,
    },
    {
        provide: ProviderName.ACCEPT_TERM_MAPPER,
        useClass: AcceptTermMapper,
    },
]


export const repositoryProviders: Provider[] = [
    {
        provide: ProviderName.CARD_REPOSITORY,
        inject: [
            ProviderName.MONGO_DATASOURCE,
            ProviderName.CARD_ENTITY_MAPPER,
        ],
        useFactory: (db: Db, mapper: IRepositoryMapper<any, any>) => new CardRepository(db, mapper),
    },
    {
        provide: ProviderName.ACCEPT_TERM_REPOSITORY,
        inject: [
            ProviderName.MONGO_CLIENT,
            ProviderName.MONGO_DATASOURCE,
            ProviderName.ACCEPT_TERM_MAPPER,
        ],

        useFactory: (
            client: MongoClient,
            db: Db,
            mapper: IRepositoryMapper<any, any>,
        ) => {
            const repository = new AcceptTermRepository(db, mapper)

            return repository.setup(async ({collection}) => {
                const result = await detectClusterType(db)

                if (result === 'sharded') {
                    await client.db('admin').command({
                        shardCollection: `${db.namespace}.${collection.collectionName}`,
                        key: {
                            _id: 'hashed',
                        },
                    })
                }

            })
        },
    },
]

