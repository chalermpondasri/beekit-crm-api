import {
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common'
import { CoreModule } from '@core/modules/core.module'
import { HealthcheckModule } from '@domains/healthcheck/healthcheck.module'
import { AuthModule } from '@domains/auth/auth.module'
import { exceptionFilters } from '@core/providers/filters.provider'
import { RepositoryModule } from '@shared/repositories/repository.module'
import { TokenizationModule } from '@domains/auth/tokenization.module'
import { TosModule } from '@domains/tos/tos.module'
import { RequestContextMiddleware } from '@core/middlewares/request-context.middleware'

@Module({
    imports: [
        TokenizationModule,
        CoreModule,
        HealthcheckModule,
        AuthModule,
        RepositoryModule,
        TosModule,
    ],
    providers: [
        ...exceptionFilters,
    ],
    controllers: [],
    exports: [],
})
export class MainModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestContextMiddleware).forRoutes('*')
    }
}
