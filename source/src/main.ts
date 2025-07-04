import { MainModule } from '@modules/main.module'
import { NestFactory } from '@nestjs/core'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { ProviderName } from '@core/constants/provider-name.enum'
import {
    PipeTransform,
    ValidationPipe,
} from '@nestjs/common'
import {
    DocumentBuilder,
    SwaggerModule,
} from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import { ErrorDto } from '@core/models/errors/error.model'
import { ILoggerService } from '@core/interfaces/logger.service.interface'
import { NoContentInterceptor } from '@core/interceptors/no-content.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(MainModule, {
        cors: true,
        bufferLogs: true,
        bodyParser: true,
        forceCloseConnections: true,
    })

    const envConfig: EnvironmentConfig = app.get(ProviderName.ENVIRONMENT_CONFIG)
    const logger = await app.resolve<ILoggerService>(ProviderName.LOGGER_SERVICE)

    app.useLogger(logger)

    const nestValidationPipes: PipeTransform[] = [
        new ValidationPipe({
            transform: true,
        }),
    ]
    app.setGlobalPrefix(envConfig.APP_PREFIX)
    app.useGlobalPipes(...nestValidationPipes)
    app.useGlobalInterceptors(new NoContentInterceptor())
    app.enableShutdownHooks()

    if (envConfig.APP_ENV !== 'production') {
        const config = new DocumentBuilder()
            .setTitle(envConfig.APP_NAME)
            .setVersion(envConfig.APP_VERSION)
            .addBearerAuth({in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT'}, 'access-token')
            .build()

        const documentFactory = () => SwaggerModule.createDocument(
            app,
            config,
            {
                extraModels: [ErrorDto],
            },
        )
        SwaggerModule.setup('', app, documentFactory(),
            {
                jsonDocumentUrl: `/openapi.json`,
                swaggerUiEnabled: false,
                useGlobalPrefix: true,
            })

        app.use(`${envConfig.APP_PREFIX}/documentation`,
            apiReference({
                theme: 'bluePlanet',

                url: `${envConfig.APP_PREFIX}/openapi.json`,
            }),
        )

    }

    const port = envConfig.APP_PORT || 3000

    try {
        await app.listen(port)
        logger.setContext('NestApplication').log(`Application is running on: ${await app.getUrl()}`)
    } catch (e) {
        console.error(e)
    }

}
bootstrap()
