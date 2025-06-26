import { ISchema } from '@shared/repositories/base/model.interface'

export interface ICardSchema extends ISchema {
    cid: string
    cardNo: string
    cardType: string
    tokenizedMediaId: {
        rabbit: string
        ktb: string
        bem: string
    }
    birthYear: number
    registeredDate: Date
}
