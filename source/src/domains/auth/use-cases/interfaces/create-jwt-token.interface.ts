import {
    CreateJwtAccessTokenInput,
    CreateJwtRefreshTokenInput,
} from '@domains/auth/use-cases/input-output/create-jwt.input'
import { CreateJwtOutput } from '@domains/auth/use-cases/input-output/create-jwt.output'
import { Observable } from 'rxjs'

export interface ICreateJwtTokenUseCase {
    execute(accessTokenData: CreateJwtAccessTokenInput, refreshTokenObject: CreateJwtRefreshTokenInput): Observable<CreateJwtOutput>
}
