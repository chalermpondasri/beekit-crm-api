import { Observable } from 'rxjs'
import { BuddhismDateString } from '@common/types/datestring.type'

export interface IEGovAdapter {
    getToken(agentId?: string): Observable<{ result: string }>

    verifyMToken(payload: IVerifyMTokenRequest): Observable<IVerifyMTokenResponse>

}

export interface IGetContractByPsnIdResponse {
    status: boolean
    result: {
        contractDate: BuddhismDateString | null
        reqOcc: string
        contractCount: number
        brwFullName: string
        brwIdCard: string
        contractStatus: string
    }
}

export interface IContractDetailsResponse {
    status: boolean
    result: IContractDetails[]
}

export interface IContractDetails {
    contractNo: string
    contProvinceCode: string
    contractDateStr: BuddhismDateString | null
    brwIdCard: string
    brwFullName: string
    loanAmountStr: string
    currentRemainAmountStr: string
    contractStatus: string
    accountStatusLabel: string
    periodAllStr: string
    payPerPeriodStr: string
    lastPayDateStr: BuddhismDateString | null
    reqTypeLabel: string
    reqOccTypeLabel: string
    brwFullAddress: string
    brwTel: string
    bmanIdCard: string
    bmanFullName: string
    bmanFullAddress: string
    bmanTel: string
    qrCode64: string
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
