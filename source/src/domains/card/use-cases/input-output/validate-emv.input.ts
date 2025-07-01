export class ValidateEmvInput {
    public cardNumber: string
    public citizenId: string

    public constructor(init: ValidateEmvInput) {
        this.cardNumber = init.cardNumber
        this.citizenId = init.citizenId
    }

}
