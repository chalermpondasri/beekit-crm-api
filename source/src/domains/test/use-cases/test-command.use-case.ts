import { ICommandUseCase } from '@domains/test/use-cases/use-cases.interface'
import { Observable } from 'rxjs'
import { TestEntity } from '@shared/entities/test.entity'
import { ITestRepository } from '@shared/repositories/interfaces/test.repository.interface'
import {
    Inject,
    Injectable,
} from '@nestjs/common'

@Injectable()
export class TestCommandUseCase implements ICommandUseCase {
    public constructor(
        @Inject('TEST_REPOSITORY')
        private readonly _testRepository: ITestRepository,
    ) {}

    public execute(): Observable<any> {
        return this._testRepository.save(new TestEntity())
    }
}
