import { AbstractEntity } from '@shared/entities/abstract.entity'

export class AcceptTermEntity extends AbstractEntity{
    public termVersion: string
    public acceptedAt: Date
}
