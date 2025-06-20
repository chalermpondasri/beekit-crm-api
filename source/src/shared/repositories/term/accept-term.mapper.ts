import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'
import { AcceptTermEntity } from '@shared/entities/accept-term.entity'
import { IAcceptTermSchema } from '@shared/repositories/term/accept-term.schema'
import { plainToInstance } from 'class-transformer'

export class AcceptTermMapper implements IRepositoryMapper<AcceptTermEntity, IAcceptTermSchema>{
    public deserialize(schema: IAcceptTermSchema): AcceptTermEntity {
        return plainToInstance(AcceptTermEntity, schema)
    }

    public serialize(model: AcceptTermEntity): IAcceptTermSchema {
        return {
            _id: model._id,
            createdAt: model.createdAt,
        }
    }
}
