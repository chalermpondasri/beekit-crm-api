import {
    Global,
    Module,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { environmentConfigProvider } from '@providers/config.provider'
import { errorFactoryServiceProvider } from '@providers/service.provider'

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                '.env',
                '.local.env',
                '.development.env',
                '.uat.env',
                '.production.env',
            ],
        }),
    ],
    providers: [
        environmentConfigProvider,
        errorFactoryServiceProvider,
    ],
    exports: [
        environmentConfigProvider,
        errorFactoryServiceProvider,
    ],
})
export class ApplicationConfigModule {}
