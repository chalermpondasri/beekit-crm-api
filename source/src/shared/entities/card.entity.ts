import { AbstractEntity } from '@shared/entities/abstract.entity'
import {
    CardRegistrationStatus,
    TransitCardType,
} from '@domains/card/models/card-type.enum'

export class CardEntity extends AbstractEntity {
    public cid: string
    public cardNo: string
    public hashedCardNumber: string
    public cardType: TransitCardType
    public registrationStatus: CardRegistrationStatus
    public transactionId: string
    public tokenizedMedia: {
        rabbit: string
        ktb: string
        bem: string
    } = {bem: null, rabbit: null, ktb: null}

    public birthYear: number
    public registeredDate: Date
}
