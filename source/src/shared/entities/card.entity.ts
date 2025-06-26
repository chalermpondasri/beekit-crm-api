import { AbstractEntity } from '@shared/entities/abstract.entity'

enum CardType {
    RABBIT = 'RABBIT',
    EMV = 'EMV',
}


export class CardEntity extends AbstractEntity {
    public cid: string
    public uuid: string
    public cardNo: string
    public cardType: CardType

    public tokenizedMedia: {
        rabbit: string
        ktb: string
        bem: string
    }

    public birthYear: number
    public registeredDate: Date
}
