import {
    CardRegistrationStatus,
    TransitCardType,
} from '@domains/card/models/card-type.enum'

export class CardResponse {
    public id: string
    public cardNumber: string
    public cardType: TransitCardType
    public registeredAt: Date
    public status: CardRegistrationStatus

}
