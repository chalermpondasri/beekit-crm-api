import { AbstractMongoRepository } from '@shared/repositories/base/abstract-mongo.repository'
import { CardEntity } from '@shared/entities/card.entity'
import { ICardSchema } from '@shared/repositories/card/card.schema'
import { ICardRepository } from '@shared/repositories/interfaces/card.repository.interface'
import { Db } from 'mongodb'
import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'

export class CardRepository extends AbstractMongoRepository<CardEntity, ICardSchema> implements ICardRepository {
    public constructor(
        db:Db,
        mapper: IRepositoryMapper<CardEntity, ICardSchema>
    ) {
        super(db.collection('cards'), mapper)
    }
}
