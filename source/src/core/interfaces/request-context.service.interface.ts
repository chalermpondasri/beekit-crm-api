export interface IRequestContextService {
    setUserContext(context: any): void
    getPsnId(): string
    getUserId(): string
    getFullName(): string
}
