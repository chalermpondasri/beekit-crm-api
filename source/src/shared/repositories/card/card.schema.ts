import { ISchema } from '@shared/repositories/base/model.interface'
import { HashedString } from '@core/types/hashed.type'

export interface ICardSchema extends ISchema {
    cid: HashedString
    cardNo: string
    hashedCardNumber: HashedString
    cardType: string
    tokenizedMediaIdKtb: HashedString
    tokenizedMediaIdBem: HashedString
    tokenizedMediaIdRabbit: HashedString
    birthYear: number
    registeredDate: Date
}
