import { UseCaseException } from '@core/models/errors/error.model'

export class RabbitRegisterException extends UseCaseException{
    public constructor(message = 'Rabbit Register Exception') {
        super(message)
    }
}
