import { ISchema } from '@shared/repositories/base/model.interface'

export abstract class BaseSchema implements ISchema {
    public _id: string
    public createdAt: Date
    public createdBy: string
    public deletedAt: Date
    public updatedAt: Date
}
