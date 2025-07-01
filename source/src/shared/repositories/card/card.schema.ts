import { ISchema } from '@shared/repositories/base/model.interface'
import { HashedString } from '@core/types/hashed.type'
import { CardRegistrationStatus } from '@domains/card/models/card-type.enum'

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
    registrationStatus: CardRegistrationStatus
    transactionId: string
}
