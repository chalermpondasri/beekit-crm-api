import { UseCaseException } from '@core/models/errors/error.model'

export class CardNotFoundException extends UseCaseException {
    public constructor(
        public readonly cardId: string,
        message = 'Card not found',
    ) {
        super(message)
        Object.setPrototypeOf(this, CardNotFoundException.prototype)
    }
}
