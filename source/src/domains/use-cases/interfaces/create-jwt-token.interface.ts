import {
    CreateJwtAccessTokenInput,
    CreateJwtRefreshTokenInput,
} from '@domains/use-cases/input-output/create-jwt.input'
import { CreateJwtOutput } from '@domains/use-cases/input-output/create-jwt.output'

export interface ICreateJwtTokenUseCase {
    execute(accessTokenData: CreateJwtAccessTokenInput, refreshTokenObject: CreateJwtRefreshTokenInput): CreateJwtOutput
}
