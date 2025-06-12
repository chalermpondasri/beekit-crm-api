import { ProviderName } from '../constants/provider-name.enum'
import { Provider } from '@nestjs/common'
import { ErrorFactoryService } from '../factories/error/error.factory'
import { errorMessages } from '../constants/error-message.constant'

export const errorFactoryServiceProvider: Provider = {
    provide: ProviderName.ERROR_FACTORY_SERVICE,
    useFactory: () => {
        return new ErrorFactoryService(errorMessages)
    },
}
