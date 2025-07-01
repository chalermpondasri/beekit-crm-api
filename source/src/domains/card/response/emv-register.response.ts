export class EmvRegisterResponse {
    public transactionId: string
    public reference1: string
    public reference2: string
    public payType: string = 'N'
    public payMethod: string = 'CC'
    public merchantId: string = 'MERCHANT_ID'
    public securityKey: string = 'SECURITY_KEY'
    public amount: string = '1'
    public currencyCode: string = '764'
    public language: string = 'T'

    public constructor(init: Pick<EmvRegisterResponse, 'transactionId' | 'reference1' | 'reference2' >) {
        this.transactionId = init.transactionId
        this.reference1 = init.reference1
        this.reference2 = init.reference2
    }

}
