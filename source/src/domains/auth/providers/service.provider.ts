import { Provider } from "@nestjs/common";
import { ProviderName } from '@core/constants/provider-name.enum'
import { AuthenticationService } from '@domains/auth/services/authentication.service'

export const authenticationServiceProvider: Provider = {
    provide: ProviderName.AUTHENTICATION_SERVICE,
    useClass: AuthenticationService,
}
