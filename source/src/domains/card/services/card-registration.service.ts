import {
    IEmvCardRegistrationService,
    IRabbitCardRegistrationService,
} from '@domains/card/interfaces/service.interface'
import { RegisterCardCommand } from '@domains/card/command-query/register-card.command'
import { Observable } from 'rxjs'
import { InternalServerErrorException } from '@nestjs/common'

export class CardRegistrationService implements IRabbitCardRegistrationService, IEmvCardRegistrationService {
    public registerEmvCard(payload: RegisterCardCommand): Observable<any> {
        throw new InternalServerErrorException('not implemented')
    }

    public registerRabbitCard(payload: RegisterCardCommand): Observable<any> {
        return undefined
    }

}
