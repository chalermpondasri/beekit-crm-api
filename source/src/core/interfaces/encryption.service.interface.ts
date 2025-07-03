
export interface IEncryptionService {
    encrypt(data: Record<any, any>):string
    decrypt(data: string): Record<any, any>
}