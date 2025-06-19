import { IRepositoryMapper } from '@shared/repositories/interfaces/repository.interface'
import { CardEntity } from '@shared/entities/card.entity'
import { ICardSchema } from '@shared/repositories/card/card.schema'
import { plainToInstance } from 'class-transformer'

export class CardEntityMapper implements IRepositoryMapper<CardEntity, ICardSchema> {
    public deserialize(schema: ICardSchema): CardEntity {
        return plainToInstance(CardEntity, schema)
    }

    public serialize(model: CardEntity): ICardSchema {
        return {
            createdAt: model.createdAt
        }
    }

}
