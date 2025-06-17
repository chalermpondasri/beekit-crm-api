import {
    IKeySigner,
    ITokenizationService,
} from '@domains/auth/interfaces/tokenization.interface'
import { Jwt } from 'jsonwebtoken'

export class TokenizationService implements ITokenizationService {
    public constructor(
        private readonly _accessTokenSigner: IKeySigner,
        private readonly _refreshTokenSigner: IKeySigner,
        private readonly _accessTokenTTL: string,
        private readonly _refreshTokenTTL: string,
    ) {
    }

    public createAccessToken(data: object, ttl?: string): string {
        return this._accessTokenSigner.sign(data, ttl || this._accessTokenTTL)
    }

    public createRefreshToken(data: object, ttl?: string): string {
        return this._refreshTokenSigner.sign(data, ttl || this._refreshTokenTTL)
    }

    public verifyRefreshToken(token: string): Jwt {
        return this._refreshTokenSigner.verify(token)
    }

    public verifyAccessToken(token: string): Jwt {
        return this._accessTokenSigner.verify(token)
    }

    public decode(token: string, keyType: 'accessToken' | 'refreshToken'): Jwt {
        switch (keyType) {
            case 'accessToken':
                return this._accessTokenSigner.decode(token)
            case 'refreshToken':
                return this._refreshTokenSigner.decode(token)
        }
    }
}
