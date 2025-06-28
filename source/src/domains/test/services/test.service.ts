import { ITestService } from '@domains/test/interfaces/test.service.interface'
import {
    map,
    Observable,
} from 'rxjs'
import {
    ICommandUseCase,
    IQueryUseCase,
} from '@domains/test/use-cases/use-cases.interface'
import { TestCommand } from '@domains/test/command-query/test.command'
import {
    Inject,
    Injectable,
} from '@nestjs/common'
import { TestCommandUseCase } from '@domains/test/use-cases/test-command.use-case'
import { TestQueryUseCase } from '@domains/test/use-cases/test-query.use-case'

@Injectable()
export class TestService implements ITestService{
    public constructor(
        @Inject(TestCommandUseCase)
        private readonly _commandUseCase: ICommandUseCase,
        @Inject(TestQueryUseCase)
        private readonly _queryUseCase: IQueryUseCase,
    ) {}
    public testCommand(testCommand: TestCommand): Observable<any> {
        return this._commandUseCase.execute().pipe(
            map(id => ({id}))
        )
    }

    public testQuery(id?: string): Observable<any> {
        return this._queryUseCase.execute(id)
    }
}
