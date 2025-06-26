import {
    RegisterEmvCardCommand,
    RegisterRabbitCardCommand,
} from '@domains/card/command-query/register-card.command'
import { Observable } from 'rxjs'

export interface IRabbitCardRegistrationService {
    registerRabbitCard(command: RegisterRabbitCardCommand): Observable<any>
}

export interface IEmvCardRegistrationService {
    registerEmvCard(command: RegisterEmvCardCommand): Observable<any>
}
