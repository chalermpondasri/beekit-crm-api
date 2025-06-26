export class ValidateRabbitOutput {
    public citizenAlreadyHasCard: boolean = null
    public cardAlreadyRegistered: boolean = null

    public constructor(partial?: Partial<ValidateRabbitOutput>) {
        this.citizenAlreadyHasCard = partial?.citizenAlreadyHasCard || null
        this.cardAlreadyRegistered = partial?.cardAlreadyRegistered || null
    }

    public canRegister(): boolean {
        return this.cardAlreadyRegistered === false && this.citizenAlreadyHasCard === false
    }
}
