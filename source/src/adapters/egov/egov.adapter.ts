import {
    from,
    map,
    mergeMap,
    Observable,
    of,
    retry,
    throwError,
} from 'rxjs'
import { AxiosInstance } from 'axios'
import {
    IEGovAdapter,
    IVerifyMTokenRequest,
    IVerifyMTokenResponse,
} from './interfaces/egov.interface'
import { ILoggerService } from '@domains/services/interfaces/logger.service.interface'

export class EGovAdapter implements IEGovAdapter {

    private readonly _fundQueryUrl: string

    public constructor(
        private readonly _httpClient: AxiosInstance,
        private readonly _consumerKey: string,
        private readonly _consumerSecret: string,
        private readonly _defaultAgentId: string,
        private readonly _tokenUrl: string,
        private readonly _verifyMTokenUrl: string,
        private readonly _disabilityBaseUrl: string,
        private readonly _egovUsername: string,
        private readonly _egovPassword: string,
        protected readonly _logger: ILoggerService,
    ) {
        this._httpClient.defaults.headers.common['Content-Type'] = 'application/json'
        this._httpClient.defaults.headers.common['Consumer-Key'] = this._consumerKey
        this._fundQueryUrl = `${this._disabilityBaseUrl}/disability/fund`
        this._httpClient.interceptors.response.use(response => response, async error => {
            this._logger.error(error)
            return Promise.reject(error)
        })
    }

    public getToken(agentId: string = this._defaultAgentId): Observable<{ result: string }> {
        const url = `${this._tokenUrl}/ws/auth/validate?ConsumerSecret=${this._consumerSecret}&AgentID=${agentId}`

        const retryCount = 3
        return of({}).pipe(
            mergeMap(() => {
                return from(this._httpClient.get(url))
            }),
            retry({
                count: 3,
                delay: (error, current) => {
                    const delayAmount = Math.pow(2, current - 1) * 1000
                    const jitter = delayAmount * 0.1 * Math.random()
                    this._logger.log(`Retrying in ${delayAmount}ms, ${retryCount - current} attempts left.`)
                    return of(delayAmount + jitter)
                },
            }),
            map(response => {
                return {result: response.data.Result}
            }),
        )
    }

    public verifyMToken(payload: IVerifyMTokenRequest): Observable<IVerifyMTokenResponse> {
        const url = `${this._verifyMTokenUrl}/v1/core/shield/data/deproc`
        const headers = {
            'Token': payload.token,
        }
        const data = {
            mToken: payload.mToken,
            appId: payload.appId,
        }
        return from(this._httpClient.post(
            url,
            data,
            {headers},
        )).pipe(
            mergeMap(({data}) => {
                if (!data.result) {
                    return throwError(() => new Error(data.message))
                }
                return of(data)
            }),
        )
    }
}
