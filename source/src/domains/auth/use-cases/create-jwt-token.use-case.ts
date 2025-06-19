import { ICreateJwtTokenUseCase } from '@domains/auth/use-cases/interfaces/create-jwt-token.interface'
import {
    CreateJwtAccessTokenInput,
    CreateJwtRefreshTokenInput,
} from '@domains/auth/use-cases/input-output/create-jwt.input'
import { CreateJwtOutput } from '@domains/auth/use-cases/input-output/create-jwt.output'
import { ITokenizationService } from '@domains/auth/interfaces/tokenization.interface'
import { plainToInstance } from 'class-transformer'
import {
    forkJoin,
    map,
    Observable,
} from 'rxjs'

export class CreateJwtTokenUseCase implements ICreateJwtTokenUseCase {
    public constructor(
        private readonly _tokenizationService: ITokenizationService,
    ) {
    }

    public execute(accessTokenData: CreateJwtAccessTokenInput, refreshTokenObject: CreateJwtRefreshTokenInput): Observable<CreateJwtOutput> {
        return forkJoin([
            this._tokenizationService.createAccessToken(accessTokenData),
            // this._tokenizationService.createRefreshToken(refreshTokenObject)
        ]).pipe(
         map(([accessToken]) => plainToInstance(CreateJwtOutput, {
             accessToken,
             refreshToken: ''
         }))
        )

    }

}
