import { Provider } from '@nestjs/common'
import { TestService } from '@domains/test/services/test.service'
import { ProviderName } from '@core/constants/provider-name.enum'

export const serviceProviders: Provider[] = [
    {
        provide: 'TEST_SERVICE',
        inject: [
            'TEST_COMMAND',
            'TEST_QUERY',
            ProviderName.USE_CASE_ACCEPT_TERM,
        ],

        useFactory: (command, query, accept) => new TestService(command, query, accept),
    },
]
