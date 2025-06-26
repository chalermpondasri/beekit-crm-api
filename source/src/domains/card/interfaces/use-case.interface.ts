import { Observable } from 'rxjs'
import { RegisterRabbitCardInput } from '@domains/card/use-cases/input-output/register-rabbit-card.input'
import { ValidateRabbitOutput } from '@domains/card/use-cases/input-output/validate-rabbit.output'

export interface IValidateRabbitCardRegistrationUseCase {
    execute(citizenId: string, cardNumber: string): Observable<ValidateRabbitOutput>
}


export interface IRegisterNewRabbitCardUseCase {
    execute(input: RegisterRabbitCardInput): Observable<any>
}
