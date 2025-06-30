import { Observable } from 'rxjs'

export interface ITokenizationService {
    createAccessToken(data: Record<string, any>, ttl?: string): Observable<string>
    createRefreshToken(data: Record<string, any>, ttl?: string): Observable<string>
    verifyAccessToken<T>(token: string): Observable<T>
    verifyRefreshToken<T>(token: string): Observable<T>
    decode(token: string, keyType: 'accessToken' | 'refreshToken'): Observable<Record<string,any>>
}

export interface IKeySigner {
    sign(data: Record<string, any>): Observable<string>
    verify<T>(token: string): Observable<T>
    decode<T>(token: string): Observable<T>
}
