export class UpdateUserTermInput {
    public acceptedVersion: string
    constructor(init: {acceptedVersion: string}) {
        this.acceptedVersion = init.acceptedVersion
    }
}
