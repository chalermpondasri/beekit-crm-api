import { Observable } from 'rxjs'

export interface IUseCase<TInput, TOutput> {
    execute(input: TInput): Observable<TOutput>
}
