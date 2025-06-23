import { ITestService } from '@domains/test/interfaces/test.service.interface'
import {
    map,
    Observable,
} from 'rxjs'
import {
    IAcceptTermUseCase,
    ICommandUseCase,
    IQueryUseCase,
} from '@domains/test/use-cases/use-cases.interface'
import { TestCommand } from '@domains/test/command-query/test.command'

export class TestService implements ITestService{
    public constructor(
        private readonly _commandUseCase: ICommandUseCase,
        private readonly _queryUseCase: IQueryUseCase,
        private readonly _acceptTermUseCase: IAcceptTermUseCase,
        private readonly _clusterCollectionCommandUseCase: ICommandUseCase,
        private readonly _clusterCollectionQueryUseCase: IQueryUseCase,
    ) {}
    public testCommand(testCommand: TestCommand): Observable<any> {
        return this._acceptTermUseCase.execute().pipe(
            map(result => ({
                id: result,
                ...testCommand,
            })),
        )
    }

    public testQuery(id?: string): Observable<any> {

        return this._queryUseCase.execute(id)
    }

    public testClusterCollectionCommand(command: TestCommand): Observable<any> {
        return this._clusterCollectionCommandUseCase.execute()
    }

    public testClusterCollectionQuery(id?: string): Observable<any> {
        return this._clusterCollectionQueryUseCase.execute(id)
    }
}
