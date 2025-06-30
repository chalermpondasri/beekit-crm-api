import {
    IKeySigner,
    ITokenizationService,
} from '@domains/auth/interfaces/tokenization.interface'
import { Observable } from 'rxjs'

export class TokenizationService implements ITokenizationService {
    public constructor(
        private readonly _accessTokenSigner: IKeySigner,
        private readonly _refreshTokenSigner: IKeySigner,
    ) {
    }

    public createAccessToken(data: Record<string, any>): Observable<string> {
        return this._accessTokenSigner.sign(data)
    }

    public createRefreshToken(data: Record<string, any>): Observable<string> {
        return this._refreshTokenSigner.sign(data)
    }

    public verifyRefreshToken<T>(token: string): Observable<T> {
        return this._refreshTokenSigner.verify<T>(token)
    }

    public verifyAccessToken<T>(token: string): Observable<T> {
        return this._accessTokenSigner.verify<T>(token)
    }

    public decode(token: string, keyType: 'accessToken' | 'refreshToken'): Observable<Record<any, any>> {
        return keyType === 'accessToken' ? this._accessTokenSigner.decode(token) : this._refreshTokenSigner.decode(token)
    }
}
