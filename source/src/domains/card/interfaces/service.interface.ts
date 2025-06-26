import {
    RegisterEmvCardCommand,
    RegisterRabbitCardCommand,
} from '@domains/card/command-query/register-card.command'
import { Observable } from 'rxjs'

export interface IRabbitCardRegistrationService {
    registerRabbitCard(psnId: string,command: RegisterRabbitCardCommand): Observable<any>
}

export interface IEmvCardRegistrationService {
    registerEmvCard(psnId: string, command: RegisterEmvCardCommand): Observable<any>
}
