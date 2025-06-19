import { Observable } from 'rxjs'

export interface IQueryUseCase {
    execute(): Observable<any>
}

export interface ICommandUseCase {
    execute(): Observable<any>
}
