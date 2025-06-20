import { AbstractMongoRepository } from '@shared/repositories/base/abstract-mongo.repository'
import { AcceptTermEntity } from '@shared/entities/accept-term.entity'
import { IAcceptTermSchema } from '@shared/repositories/term/accept-term.schema'
import { IAcceptTermRepository } from '@shared/repositories/interfaces/term.repository.interface'
import { Db } from 'mongodb'
import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'

export class AcceptTermRepository extends AbstractMongoRepository<AcceptTermEntity, IAcceptTermSchema> implements IAcceptTermRepository{
    public constructor(
        db: Db,
        mapper: IRepositoryMapper<any, any>
    ) {
        super(db.collection('accept_terms'), mapper)
    }
}
