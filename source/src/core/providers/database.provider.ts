import { ProviderName } from '@core/constants/provider-name.enum'
import {
    Provider,
    Scope,
} from '@nestjs/common'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import {
    Db,
    MongoClient,
} from 'mongodb'

export const mongoClientProvider: Provider = {
    provide: ProviderName.MONGO_CLIENT,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    scope: Scope.DEFAULT,
    useFactory: async (
        config: EnvironmentConfig,
    ): Promise<MongoClient> => {
        try {
            const servers = config.DB_HOSTS
            const dbName = config.DB_NAME
            const url = `${config.DB_PROTOCOL}://${servers}/${dbName}`
            return await MongoClient.connect(url, {
                auth: config.DB_USERNAME
                    ? {
                        username: encodeURIComponent(config.DB_USERNAME),
                        password: encodeURIComponent(config.DB_PASSWORD),
                    }
                    : null,
                // connectTimeoutMS: 10000,
                // socketTimeoutMS: 10000,
                // serverSelectionTimeoutMS: 30000,
                maxPoolSize: 140,
                minPoolSize: 100,
                maxIdleTimeMS: 30000,   // Close idle connections after 30s
                // retryWrites: true,
                // writeConcern: {w: 'majority'},
                // replicaSet: config.DB_REPL_NAME ?? null,
                readPreference: 'secondaryPreferred',
            })
        } catch (e) {
            throw e
        }
    },
}


export const databaseProvider: Provider = {
    provide: ProviderName.MONGO_DATASOURCE,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
        ProviderName.MONGO_CLIENT,
    ],
    scope: Scope.DEFAULT,
    useFactory: async (
        config: EnvironmentConfig,
        client: MongoClient,
    ): Promise<Db> => {
        const dbName = config.DB_NAME
        return client.db(dbName)
    },
}
