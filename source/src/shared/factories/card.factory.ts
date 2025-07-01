import { CardEntity } from '@shared/entities/card.entity'
import {
    CardRegistrationStatus,
    TransitCardType,
} from '@domains/card/models/card-type.enum'
import { HasherService } from '@utils/hasher.service'
import { toThaiBuddhistEraDateString } from '@utils/thai-date-parser/thai-date-parser'

export interface IEmvCardInput {
    citizenId: string
    cardNumber: string
    birthDate: Date

}
export interface IABTCardInput {
    citizenId: string
    cardNumber: string
    birthDate: Date
    tokenizedMedia: string

}
export class CardFactory {
    public static createEmvCard(input: IEmvCardInput) {
        const entity = new CardEntity()
        entity.cardType = TransitCardType.EMV
        entity.cid = HasherService.hashSha256toBase64Url(input.citizenId)
        entity.hashedCardNumber = HasherService.hashSha256toBase64Url(input.cardNumber)
        entity.registrationStatus = CardRegistrationStatus.PENDING
        entity.transactionId = HasherService.generateTransactionIdAsBase64Url()
        entity.birthYear = this._getBirthYear(input.birthDate)
        entity.registeredDate = new Date()

        return entity
    }

    public  static createABTCard(input : IABTCardInput) {
        const entity = new CardEntity()
        entity.cardType = TransitCardType.ABT
        entity.registrationStatus = CardRegistrationStatus.COMPLETED
        entity.birthYear = this._getBirthYear(input.birthDate)
        entity.registeredDate = new Date()
        entity.cid = HasherService.hashSha256toBase64Url(input.citizenId)
        entity.cardNo = input.cardNumber
        entity.hashedCardNumber = HasherService.hashSha256toBase64Url(input.cardNumber)
        entity.tokenizedMedia = {
            rabbit: input.tokenizedMedia,
            ktb: null,
            bem: null,
        }

        return entity
    }

    private static _getBirthYear(birthDate: Date) {
        return Number(toThaiBuddhistEraDateString(birthDate).split('/').pop())
    }
}
