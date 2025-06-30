import { IRepository } from '@shared/repositories/interfaces/base.repository.interface'
import { TestEntity } from '@shared/entities/test.entity'

export interface ITestRepository extends IRepository<TestEntity> {}
