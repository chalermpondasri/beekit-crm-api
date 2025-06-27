import { UseCaseException } from '@core/models/errors/error.model'
import { TransitCardType } from '@domains/card/models/card-type.enum'

export class CardRegisteredException extends UseCaseException {
    public constructor(
        public readonly cardNumber: string,
        public readonly cardType: TransitCardType,
        public readonly message = 'Card already registered'
    ) {
        super(message)
        Object.setPrototypeOf(this, CardRegisteredException.prototype)
    }
}
