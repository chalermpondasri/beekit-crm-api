import { IAuthenticateUserUseCase } from './interfaces/authenticate-user.interface'
import { AuthenticationInput } from './input-output/authentication.input'
import {
    map,
    mergeMap,
    Observable,
} from 'rxjs'
import { AuthenticationOutput } from './input-output/authentication.output'
import { plainToInstance } from 'class-transformer'
import {
    IEGovAdapter,
    IVerifyMTokenRequest,
} from '../../../shared/adapters/egov/interfaces/egov.interface'

export class AuthenticationUseCase implements IAuthenticateUserUseCase {
    public constructor(
        private readonly _eGovAdapter: IEGovAdapter,
    ) {
    }

    public execute(input: AuthenticationInput): Observable<AuthenticationOutput> {
        return this._eGovAdapter.getToken().pipe(
            mergeMap(response => {
                const payload: IVerifyMTokenRequest = {
                    mToken: input.mToken,
                    appId: input.appId,
                    token: response.result,
                }

                return this._eGovAdapter.verifyMToken(payload).pipe(
                    map(verifyResult => ({token: response.result, result: verifyResult})),
                )
            }),
            map(({token,result}) => {
                return plainToInstance(AuthenticationOutput, {
                    ...result.result,
                    token,
                })
            }),
        )
    }
}
