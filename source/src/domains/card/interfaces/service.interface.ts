import {
    RegisterEmvCardCommand,
    RegisterRabbitCardCommand,
} from '@domains/card/command-query/register-card.command'
import { Observable } from 'rxjs'

export interface IRabbitCardRegistrationService {
    registerRabbitCard(payload: RegisterRabbitCardCommand): Observable<any>
}

export interface IEmvCardRegistrationService {
    registerEmvCard(payload: RegisterEmvCardCommand): Observable<any>
}
