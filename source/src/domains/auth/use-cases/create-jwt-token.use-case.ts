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
import { IUseCase } from '@shared/interfaces/use-case.interface'

export class CreateJwtTokenUseCase implements IUseCase<any, any> {
    public constructor(
        private readonly _tokenizationService: ITokenizationService,
    ) {
    }

    public execute(tokenData: {accessTokenData: CreateJwtAccessTokenInput, refreshTokenObject: CreateJwtRefreshTokenInput}): Observable<CreateJwtOutput> {
        const {accessTokenData, refreshTokenObject} = tokenData
        return forkJoin([
            this._tokenizationService.createAccessToken(accessTokenData),
            // this._tokenizationService.createRefreshToken(refreshTokenObject)
        ]).pipe(
            map(([accessToken]) => plainToInstance(CreateJwtOutput, {
                accessToken,
                refreshToken: '',
            })),
        )

    }

}
