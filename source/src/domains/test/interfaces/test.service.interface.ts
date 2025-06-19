import { Observable } from 'rxjs'
import { TestCommand } from '@domains/test/command-query/test.command'

export interface ITestService {
    testQuery(): Observable<any>;
    testCommand(command: TestCommand): Observable<any>;
}
