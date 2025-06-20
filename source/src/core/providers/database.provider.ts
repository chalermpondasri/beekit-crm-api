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

export const databaseProvider: Provider = {
    provide: ProviderName.MONGO_DATASOURCE,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
    ],
    scope: Scope.DEFAULT,
    useFactory: async (
        config: EnvironmentConfig,
    ): Promise<Db> => {
        try {
            const servers = config.DB_HOSTS
            const dbName = config.DB_NAME
            const url = `${config.DB_PROTOCOL}://${servers}/${dbName}`
            const client = await MongoClient.connect(url, {
                auth: config.DB_USERNAME
                    ? {
                        username: encodeURIComponent(config.DB_USERNAME),
                        password: encodeURIComponent(config.DB_PASSWORD),
                    }
                    : null,
                // connectTimeoutMS: 10000,
                // socketTimeoutMS: 10000,
                // serverSelectionTimeoutMS: 30000,
                maxPoolSize: 100,
                minPoolSize: 20,
                maxIdleTimeMS: 30000,   // Close idle connections after 30s
                // retryWrites: true,
                // writeConcern: {w: 'majority'},
                // replicaSet: config.DB_REPL_NAME ?? null,
                readPreference: 'secondaryPreferred',
            })
            const db = client.db(dbName);
            (db as any).__client = client // Store client for cleanup
            return db
        } catch (e) {
            throw e
        }

    },
}
