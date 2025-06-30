import { Observable } from 'rxjs'

export interface IQueryUseCase {
    execute(id?: string): Observable<any>
}

export interface ICommandUseCase {
    execute(): Observable<any>
}
