import {
    Algorithm,
    Bufferable,
    createDecoder,
    createSigner,
    createVerifier,
} from 'fast-jwt'
import ms from 'ms'
import { IKeySigner } from '@domains/auth/interfaces/tokenization.interface'
import {
    Observable,
    of,
} from 'rxjs'

export class JwtSignerService implements IKeySigner {
    private readonly _signer: (payload: any) => string
    private readonly _verifier: (token: string) => any
    private readonly _decoder: (token: string) => any

    public constructor(base64PrivateKey: string, base64PublicKey: string, algorithm: Algorithm = 'RS256', ttl: ms.StringValue = '15Min') {
        this._signer = createSigner({
            algorithm,
            key: Buffer.from(base64PrivateKey, 'base64'),
            expiresIn: ms(ttl),
        })

        this._verifier = createVerifier({
            algorithms: [algorithm],
            cacheTTL: ms(ttl) / 5,
            cache: true,
            key: Buffer.from(base64PublicKey, 'base64'),
        })

        this._decoder = createDecoder()
    }

    public decode<T>(token: string): Observable<T> {
        return of(this._decoder(token))
    }

    public sign(data: Record<string, any>): Observable<string> {
        return of(this._signer(data))
    }

    public verify<T>(token: string): Observable<T> {
        try {
            return of(this._verifier(token))
        } catch {
            return of(null)
        }
    }
}
