import { AbstractMongoRepository } from '@shared/repositories/base/abstract-mongo.repository'
import { TestEntity } from '@shared/entities/test.entity'
import { ITestSchema } from '@shared/repositories/test/test.schema'
import { Db } from 'mongodb'
import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'
import { ITestRepository } from '@shared/repositories/interfaces/test.repository.interface'

export class TestRepository extends AbstractMongoRepository<TestEntity, ITestSchema> implements ITestRepository{
    constructor(db: Db, mapper: IRepositoryMapper<TestEntity, ITestSchema>) {
        super(db.collection('ticket20_test'), mapper)
    }
}
