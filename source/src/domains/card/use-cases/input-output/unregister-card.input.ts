export class UnregisterCardInput {
    public cardId: string
    public citizenId: string
    constructor(init: UnregisterCardInput) {
        this.cardId = init.cardId
        this.citizenId = init.citizenId
    }
}
