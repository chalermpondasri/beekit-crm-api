import { ICreateJwtTokenUseCase } from '@domains/use-cases/interfaces/create-jwt-token.interface'
import {
    CreateJwtAccessTokenInput,
    CreateJwtRefreshTokenInput,
} from '@domains/use-cases/input-output/create-jwt.input'
import { CreateJwtOutput } from '@domains/use-cases/input-output/create-jwt.output'
import { ITokenizationService } from '@domains/services/interfaces/tokenization.interface'
import { plainToInstance } from 'class-transformer'

export class CreateJwtTokenUseCase implements ICreateJwtTokenUseCase {
    public constructor(
        private readonly _tokenizationService: ITokenizationService,
    ) {
    }

    public execute(accessTokenData: CreateJwtAccessTokenInput, refreshTokenObject: CreateJwtRefreshTokenInput): CreateJwtOutput {
        const accessToken = this._tokenizationService.createAccessToken(accessTokenData)
        const refreshToken = this._tokenizationService.createRefreshToken(refreshTokenObject)
        return plainToInstance(CreateJwtOutput, {
            accessToken,
            refreshToken,
        })
    }

}
