import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
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
        return 'standalone' // Default fallback
    }

}

export const entityMappers: Provider[] = [
    {
        provide: ProviderName.ACCEPT_TERM_MAPPER,
        useClass: AcceptTermMapper,
    },
]

export const repositoryProviders: Provider[] = [
    {
        provide: ProviderName.ACCEPT_TERM_REPOSITORY,
        inject: [
            ProviderName.MONGO_CLIENT,
            ProviderName.MONGO_DATASOURCE,
            ProviderName.ACCEPT_TERM_MAPPER,
        ],

        useFactory: async (
            client: MongoClient,
            db: Db,
            mapper: IRepositoryMapper<any, any>,
        ) => {
            const repository = new AcceptTermRepository(db, mapper)

            return repository.setup(async ({collection}) => {

                await collection.createIndex({
                    _id: 'hashed',
                })

            })
        },
    },
]
