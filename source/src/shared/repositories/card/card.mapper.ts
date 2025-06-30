import {
    CardEntity,
} from '@shared/entities/card.entity'
import { ICardSchema } from '@shared/repositories/card/card.schema'
import { plainToInstance } from 'class-transformer'
import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'
import { TransitCardType } from '@domains/card/models/card-type.enum'

export class CardEntityMapper implements IRepositoryMapper<CardEntity, ICardSchema> {
    public deserialize(schema: ICardSchema): CardEntity {
        const entitySchema: CardEntity = {
            _id: schema._id,
            birthYear: schema.birthYear,
            cardNo: schema.cardNo,
            cardType: <TransitCardType>schema.cardType,
            cid: schema.cid,
            createdAt: schema.createdAt,
            deletedAt: schema.deletedAt,
            hashedCardNumber: schema.hashedCardNumber,
            registeredDate: schema.registeredDate,
            tokenizedMedia: {
                bem: schema.tokenizedMediaIdBem,
                ktb: schema.tokenizedMediaIdKtb,
                rabbit: schema.tokenizedMediaIdRabbit,
            },
            updatedAt: schema.updatedAt,
            registrationStatus: schema.registrationStatus,
        }

        return plainToInstance(CardEntity, entitySchema)
    }

    public serialize(model: CardEntity): ICardSchema {
        return {
            _id: model._id,
            cid: model.cid,
            cardNo: model.cardNo,
            hashedCardNumber: model.hashedCardNumber,
            cardType: model.cardType,
            birthYear: model.birthYear,
            registeredDate: model.registeredDate,
            tokenizedMediaIdRabbit: model.tokenizedMedia.rabbit,
            tokenizedMediaIdBem: model.tokenizedMedia.bem,
            tokenizedMediaIdKtb: model.tokenizedMedia.ktb,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            deletedAt: model.deletedAt,
            registrationStatus: model.registrationStatus,
        }
    }

}
