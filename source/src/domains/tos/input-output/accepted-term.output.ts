export class AcceptedTermOutput {
    public acceptedVersion: string
    public acceptedDate: Date
    public createdAt: Date
    public updatedAt: Date

    public constructor(init?: Partial<AcceptedTermOutput>) {
        this.acceptedVersion = init?.acceptedVersion
        this.acceptedDate = init?.acceptedDate
        this.createdAt = init?.createdAt
        this.updatedAt = init?.updatedAt
    }
}
