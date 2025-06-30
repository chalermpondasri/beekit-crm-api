import { ISchema } from '@shared/repositories/base/model.interface'

export interface IAcceptTermSchema extends ISchema {
    termVersion: string
    acceptedAt: Date
}
