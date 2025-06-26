import { AbstractEntity } from '@shared/entities/abstract.entity'
import { TransitCardType } from '@domains/card/models/card-type.enum'

export class CardEntity extends AbstractEntity {
    public cid: string
    public cardNo: string
    public hashedCardNumber: string
    public cardType: TransitCardType

    public tokenizedMedia: {
        rabbit: string
        ktb: string
        bem: string
    }

    public birthYear: number
    public registeredDate: Date
}
