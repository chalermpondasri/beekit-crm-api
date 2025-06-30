export class ValidateRabbitInput {
    citizenId: string
    cardNumber: string
    constructor(fullObject: ValidateRabbitInput) {
        this.citizenId = fullObject.citizenId
        this.cardNumber = fullObject.cardNumber
    }
}
