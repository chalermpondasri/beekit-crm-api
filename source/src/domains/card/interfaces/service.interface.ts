import {
    RegisterCardCommandWithOptions,
} from '@domains/card/command-query/register-card.command'
import { Observable } from 'rxjs'
import { CardResponse } from '@domains/card/response/card.response'
import { UnregisterCardCommand } from '@domains/card/command-query/unregister-card.command'

export interface IRabbitCardRegistrationService {
    registerRabbitCard(psnId: string,command: RegisterCardCommandWithOptions): Observable<{success: boolean}>
}

export interface IEmvCardRegistrationService {
    registerEmvCard(psnId: string, command: RegisterCardCommandWithOptions): Observable<{success: boolean}>
}

export interface ICardRegistrationService extends IRabbitCardRegistrationService, IEmvCardRegistrationService {
    getRegisteredCards(citizenId: string): Observable<CardResponse[]>
    unregisterCard(psnId: string, command: UnregisterCardCommand): Observable<{success: boolean}>
}
