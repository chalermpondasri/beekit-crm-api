import {
    Jwt,
    decode,
    sign,
    verify,
    Secret,
} from 'jsonwebtoken'
import { v4 } from 'uuid'
import ms from 'ms'
import { IKeySigner } from '@domains/auth/interfaces/tokenization.interface'

export class JwtSignerService implements IKeySigner {
    private readonly _secret: Secret

    public constructor(base64Key: string) {
        this._secret = Buffer.from(base64Key, 'base64')
    }

    public decode(token: string): Jwt | null {
        return decode(token, { json: true, complete: true })
    }

    public sign(data: object, ttl = '15Min'): string {
        return sign(data, this._secret, {
            jwtid: v4(),
            algorithm: 'RS256',
            expiresIn: ttl as ms.StringValue,
        })
    }

    public verify(token: string): Jwt | null {
        try {
            return verify(token, this._secret, {
                ignoreExpiration: false,
                complete: true,
            })
        } catch {
            return null
        }
    }
}
