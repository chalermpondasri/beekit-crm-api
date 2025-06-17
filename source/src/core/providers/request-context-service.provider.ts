import {
    Provider,
    Scope,
} from '@nestjs/common'
import { ProviderName } from '../constants/provider-name.enum'
import { RequestContextService } from '../services/request-context.service'

export const requestContextServiceProvider: Provider = {
    provide: ProviderName.REQUEST_CONTEXT_SERVICE,
    scope: Scope.REQUEST,
    useFactory: () => {
        console.log('init new request context')
        return new RequestContextService()
    }
}
