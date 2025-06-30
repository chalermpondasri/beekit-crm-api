import { Observable } from 'rxjs'

export interface IEGovAdapter {
    getToken(agentId?: string): Observable<{ result: string }>

    verifyMToken(payload: IVerifyMTokenRequest): Observable<IVerifyMTokenResponse>

}

export interface IVerifyMTokenResponse {
    requestTimeStamp: number
    messageCode: number
    message: string
    result: any
}

export interface IVerifyMTokenRequest {
    mToken: string
    appId: string
    /**
     * UUID Token from GetToken
     */
    token: string
}
