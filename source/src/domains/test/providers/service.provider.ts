import { Provider } from '@nestjs/common'
import { TestService } from '@domains/test/services/test.service'

export const serviceProviders: Provider[] = [
    {
        provide: 'TEST_SERVICE',
        inject: [
            'TEST_COMMAND',
            'TEST_QUERY',
        ],

        useFactory: (command, query) => new TestService(command, query),
    }
]
