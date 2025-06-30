import {
    CardRegistrationStatus,
    TransitCardType,
} from '@domains/card/models/card-type.enum'

export class CardOutput {
    public id: string
    public cardNumber: string
    public cardType: TransitCardType
    public registeredAt: Date
    public status: CardRegistrationStatus
    public constructor(partial: {id: string} & Partial<CardOutput>) {
        this.id = partial.id
        this.cardNumber = partial.cardNumber
        this.cardType = partial.cardType
        this.registeredAt = partial.registeredAt
        this.status = partial.status
    }
}
