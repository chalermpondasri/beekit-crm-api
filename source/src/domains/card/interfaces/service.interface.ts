import { RegisterCardCommand } from '@domains/card/command-query/register-card.command'
import { Observable } from 'rxjs'

export interface IRabbitCardRegistrationService {
    registerRabbitCard(payload: RegisterCardCommand): Observable<any>
}

export interface IEmvCardRegistrationService {
    registerEmvCard(payload: RegisterCardCommand): Observable<any>
}
