import { Provider } from '@nestjs/common'
import { ProviderName } from '@core/constants/provider-name.enum'
import { CardRegistrationService } from '@domains/card/services/card-registration.service'
import {
    IEmvCardRegistrationService,
    IRabbitCardRegistrationService,
} from '@domains/card/interfaces/service.interface'

export const serviceProviders: Provider[] = [
    {
        provide: ProviderName.RABBIT_CARD_REGISTRATION_SERVICE,
        inject: [

        ],
        useFactory: (): IRabbitCardRegistrationService => {
            return new CardRegistrationService()
        }
    },
    {
        provide: ProviderName.EMV_CARD_REGISTRATION_SERVICE,
        inject: [],
        useFactory: (): IEmvCardRegistrationService => {
            return new CardRegistrationService()
        }
    }
]
