import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { CardRepository } from '@shared/repositories/card/card.repository'
import { CardEntityMapper } from '@shared/repositories/card/card.mapper'
import {
    Db,
    IndexDescription,
    MongoClient,
} from 'mongodb'
import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'
import { AcceptTermMapper } from '@shared/repositories/term/accept-term.mapper'
import { AcceptTermRepository } from '@shared/repositories/term/accept-term.repository'
import { v4 } from 'uuid'
import { TestRepository } from '@shared/repositories/test/test.repository'
import { TestMapper } from '@shared/repositories/test/test.mapper'
import crypto from 'crypto'

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
        useFactory: (db: Db, mapper: IRepositoryMapper<any, any>) => {
            return new CardRepository(db, mapper).setup(async (context) => {
                context.setupIdGenerator(() => v4())
                const indexDescriptions: IndexDescription[] = [
                    {
                        key: {
                            deletedAt: 1,
                            cid: 1,
                            cardType: 1
                        },
                        partialFilterExpression: { deletedAt: null },
                        name: 'idx_active_cid_cardtype',
                    },
                    {
                        key: {
                            deletedAt: 1,
                            hashedCardNumber: 1,
                            cardType: 1
                        },
                        partialFilterExpression: { deletedAt: null },
                        name: 'idx_active_hashedcard_cardtype',
                    },
                    {
                        key: {
                            deletedAt: 1,
                            transactionId: 1,
                        },
                        unique: true,
                        partialFilterExpression: { deletedAt: null, transactionId: { $exists: true} },
                        name: 'idx_uniq_active_transaction'
                    },
                    {
                        key: {
                            deletedAt: 1,
                            tokenizedMediaIdRabbit: 1,
                        },
                        partialFilterExpression: { deletedAt: null },
                        name: 'idx_active_tokenized_rabbit',
                    },
                    {
                        key: {
                            deletedAt: 1,
                            tokenizedMediaIdBem: 1,
                        },
                        partialFilterExpression: { deletedAt: null },
                        name: 'idx_active_tokenized_bem',
                    },
                    {
                        key: {
                            deletedAt: 1,
                            tokenizedMediaIdKtb: 1,
                        },
                        partialFilterExpression: { deletedAt: null },
                        name: 'idx_active_tokenized_ktb',
                    },
                ]
                await context.collection.createIndexes(indexDescriptions)
            })
        },
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

                await collection.createIndex({
                    _id: 'hashed',
                })
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

export const testRepositoryProviders: Provider = {
    provide: 'TEST_REPOSITORY',
    inject: [
        ProviderName.MONGO_DATASOURCE,
        TestMapper,
        ProviderName.MONGO_CLIENT,
    ],
    useFactory: async (
        db: Db,
        mapper: IRepositoryMapper<any, any>,
        client: MongoClient,
        ) => {
        const repository = new TestRepository(db, mapper)
        await repository.setup(async (ctx) => {
            ctx.setupIdGenerator(() => crypto.createHash('sha256').update(v4()).digest('base64url'))

            await ctx.collection.createIndex({
                _id: 'hashed',
            })
            const result = await detectClusterType(db)

            if (result === 'sharded') {
                await client.db('admin').command({
                    shardCollection: `${db.namespace}.${ctx.collection.collectionName}`,
                    key: {
                        _id: 'hashed',
                    },
                })
            }
        })
        return repository
    },
}
