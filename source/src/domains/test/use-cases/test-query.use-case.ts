import { IQueryUseCase } from '@domains/test/use-cases/use-cases.interface'
import {
    Observable,
    take,
    toArray,
} from 'rxjs'
import { ITestRepository } from '@shared/repositories/interfaces/test.repository.interface'
import {
    Inject,
    Injectable,
} from '@nestjs/common'

@Injectable()
export class TestQueryUseCase implements IQueryUseCase {
    public constructor(
        @Inject('TEST_REPOSITORY')
        private readonly _testRepository: ITestRepository,
    ) {
    }
    public execute(id?: string): Observable<any> {
        if (id) {
            return this._testRepository.findOne({_id: id})
        }

        return this._testRepository.find().pipe(
            take(10),
            toArray(),
        )
    }
}
