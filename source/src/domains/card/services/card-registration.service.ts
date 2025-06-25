import {
    IEmvCardRegistrationService,
    IRabbitCardRegistrationService,
} from '@domains/card/interfaces/service.interface'
import { Observable } from 'rxjs'
import { InternalServerErrorException } from '@nestjs/common'
import {
    RegisterEmvCardCommand,
    RegisterRabbitCardCommand,
} from '@domains/card/command-query/register-card.command'

export class CardRegistrationService implements IRabbitCardRegistrationService, IEmvCardRegistrationService {
    public registerEmvCard(payload: RegisterEmvCardCommand): Observable<any> {
        throw new InternalServerErrorException('not implemented')
    }

    public registerRabbitCard(payload: RegisterRabbitCardCommand): Observable<any> {
        return undefined
    }

}
