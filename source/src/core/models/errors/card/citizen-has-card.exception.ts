import { UseCaseException } from '@core/models/errors/error.model'
import { TransitCardType } from '@domains/card/models/card-type.enum'

export class CitizenHasCardException extends UseCaseException {
    public constructor(
        public readonly citizenId: string,
        public readonly cardType: TransitCardType,
        public readonly message = 'Citizen already has card registered',
    ) {
        super(message)
        Object.setPrototypeOf(this, CitizenHasCardException.prototype)
    }
}
