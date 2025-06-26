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
    public registerEmvCard(command: RegisterEmvCardCommand): Observable<any> {
        throw new InternalServerErrorException('not implemented')
    }

    public registerRabbitCard(command: RegisterRabbitCardCommand): Observable<any> {
        return
    }

}
