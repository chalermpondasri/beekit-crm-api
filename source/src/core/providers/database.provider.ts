import { ProviderName } from '@core/constants/provider-name.enum'
import { Provider } from '@nestjs/common'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import {
    Db,
    MongoClient,
} from 'mongodb'
import { ILoggerService } from '@core/interfaces/logger.service.interface'

export const databaseProvider: Provider = {
    provide: ProviderName.MONGO_DATASOURCE,
    inject: [
        ProviderName.ENVIRONMENT_CONFIG,
        ProviderName.LOGGER_SERVICE,
    ],
    useFactory: async (
        config: EnvironmentConfig,
        logger: ILoggerService,
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
                connectTimeoutMS: 3000,
                socketTimeoutMS: 10000,
                serverSelectionTimeoutMS: 5000,
                maxPoolSize: 10,
                minPoolSize: 1,
                maxIdleTimeMS: 30000,
                retryWrites: true,
                writeConcern: {w: 'majority'},
                replicaSet: config.DB_REPL_NAME ?? null,
                readPreference: 'secondaryPreferred',
            })
            const db = client.db(dbName);
            (db as any).__client = client // Store client for cleanup
            return db
        } catch (e) {
            logger.setContext(ProviderName.MONGO_DATASOURCE).error(e)
            throw e
        }

    },
}
