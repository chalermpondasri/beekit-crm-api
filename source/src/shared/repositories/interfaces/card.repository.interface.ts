import { IRepository } from '@shared/repositories/interfaces/base.repository.interface'
import { CardEntity } from '@shared/entities/card.entity'

export interface ICardRepository extends IRepository<CardEntity>{}
