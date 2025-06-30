import { IAuthenticateUserUseCase } from './interfaces/authenticate-user.interface'
import { AuthenticationInput } from './input-output/authentication.input'
import {
    catchError,
    map,
    mergeMap,
    Observable,
    throwError,
} from 'rxjs'
import { AuthenticationOutput } from './input-output/authentication.output'
import { plainToInstance } from 'class-transformer'
import {
    IEGovAdapter,
    IVerifyMTokenRequest,
} from '@shared/adapters/interfaces/egov.interface'
import { EnvironmentConfig } from '@core/models/environment-config.model'
import { extractAppIndicator } from '@utils/app-indicator-extractor.util'
import { ILoggerService } from '@core/interfaces/logger.service.interface'

export class AuthenticationUseCase implements IAuthenticateUserUseCase {
    public constructor(
        private readonly _eGovAdapter: IEGovAdapter,
        private readonly _config: EnvironmentConfig,
        private readonly _logger: ILoggerService,
    ) {
    }

    public execute(input: AuthenticationInput): Observable<AuthenticationOutput> {
        if(input.appId !== this._config.APP_ID) {
            this._logger.error(`Invalid App ID: ${input.appId}`)
            return throwError(() => new Error('Invalid App ID'))
        }

        const traceId = this._generateTraceId(input.mToken)
        return this._eGovAdapter.getToken(traceId).pipe(
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
                    traceId,
                })
            }),
            catchError(error => {
                return throwError(() => new Error(`Authentication Failed: ${error.message}`))
            })
        )
    }

    private _generateTraceId(mToken: string): string {
        const appIndicator = extractAppIndicator(this._config.APP_NAME)
        return `dga-czp-${appIndicator}-${mToken}`
    }
}
