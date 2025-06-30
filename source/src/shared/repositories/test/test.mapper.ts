import { IRepositoryMapper } from '@shared/repositories/interfaces/base.repository.interface'
import { ITestSchema } from '@shared/repositories/test/test.schema'
import { TestEntity } from '@shared/entities/test.entity'
import { plainToInstance } from 'class-transformer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class TestMapper implements IRepositoryMapper<TestEntity, ITestSchema> {
    public deserialize(schema: ITestSchema): TestEntity {
        const entity: TestEntity = {
            _id: schema._id,
            createdAt: schema.createdAt,
            updatedAt: schema.updatedAt,
            deletedAt: schema.deletedAt,
        }
        return plainToInstance(TestEntity, entity)
    }

    public serialize(model: TestEntity): ITestSchema {
        return {
            _id: model._id,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            deletedAt: model.deletedAt,
        }
    }

}
