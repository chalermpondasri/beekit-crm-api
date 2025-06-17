import {
    CreateJwtAccessTokenInput,
    CreateJwtRefreshTokenInput,
} from '@domains/auth/use-cases/input-output/create-jwt.input'
import { CreateJwtOutput } from '@domains/auth/use-cases/input-output/create-jwt.output'

export interface ICreateJwtTokenUseCase {
    execute(accessTokenData: CreateJwtAccessTokenInput, refreshTokenObject: CreateJwtRefreshTokenInput): CreateJwtOutput
}
