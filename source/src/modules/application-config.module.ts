import {
    Global,
    Module,
} from '@nestjs/common'
import { environmentConfigProvider } from '@providers/config.provider'
import { errorFactoryServiceProvider } from '@providers/service.provider'

@Global()
@Module({
    imports: [
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
