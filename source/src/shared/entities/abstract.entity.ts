import { Transform } from 'class-transformer'
import { IEntity } from '@shared/repositories/base/model.interface'

class AbstractBaseEntity {
    public readonly createdAt: Date = new Date()
    public updatedAt: Date
    public deletedAt: Date
}

export abstract class AbstractEntity extends AbstractBaseEntity implements IEntity {
    @Transform((value) => value?.obj?._id?.toString())
    public _id: string
}
