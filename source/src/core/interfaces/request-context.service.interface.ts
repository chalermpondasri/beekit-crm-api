import { Observable } from 'rxjs'

export interface IRequestContextService {
    setUserContext(context: any): void
    getPsnId(): string
    isTermAccepted(): Observable<boolean>
    getUserId(): string
    getFullName(): string
    getRequestId(): string
    getTraceId(): string
    getTimestamp(): number
    getHrTime(): bigint
    validated: boolean
    isValid: boolean
}
