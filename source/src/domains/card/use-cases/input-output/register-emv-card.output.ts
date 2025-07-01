export class RegisterEmvCardOutput {
    public transactionId: string
    public reference1: string
    public reference2: string
    public constructor(init: RegisterEmvCardOutput) {
        this.reference1 = init.reference1
        this.reference2 = init.reference2
        this.transactionId = init.transactionId
    }
}
