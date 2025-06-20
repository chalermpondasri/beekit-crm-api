import { CardEntity } from '@shared/entities/card.entity'
import { ICardSchema } from '@shared/repositories/card/card.schema'
import { plainToInstance } from 'class-transformer'
import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'

export class CardEntityMapper implements IRepositoryMapper<CardEntity, ICardSchema> {
    public deserialize(schema: ICardSchema): CardEntity {
        return plainToInstance(CardEntity, schema)
    }

    public serialize(model: CardEntity): ICardSchema {
        return {
            _id: model._id,
            createdAt: model.createdAt,
        }
    }

}
