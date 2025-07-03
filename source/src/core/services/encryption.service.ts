import crypto from 'crypto'
import {IEncryptionService} from "@core/interfaces/encryption.service.interface";

export class EncryptionService implements IEncryptionService {
    private readonly _key: Buffer

    public constructor(secret: string, salt?: string) {
        if (salt) {
            // Use scrypt for key derivation when salt is provided
            this._key = crypto.scryptSync(secret, salt, 32)
        } else {
            // Assume secret is already a base64url-encoded 32-byte key
            this._key = Buffer.from(secret, 'utf8')
            if (this._key.length !== 32) {
                throw new Error('Secret must be exactly 32 bytes when encoded as base64url')
            }
        }

    }

    public encrypt(data: Record<any, any>): string {
        const initVector = crypto.randomBytes(12)
        const cipher = crypto.createCipheriv('aes-256-gcm', this._key, initVector)
        const stringData = JSON.stringify(data)
        const encrypted = Buffer.concat([
                cipher.update(stringData),
                cipher.final(),
            ]
        )
        const tag = cipher.getAuthTag()
        return Buffer.concat([initVector,encrypted,tag]).toString('base64')
    }

    public decrypt(input: string): Record<any, any> {
        const encrypted = Buffer.from(input, 'base64')
        const iv = encrypted.subarray(0, 12)
        const authTag = encrypted.subarray(encrypted.length - 16)
        const content = encrypted.subarray(12, encrypted.length - 16)
        const decipher = crypto.createDecipheriv('aes-256-gcm', this._key, iv).setAuthTag(authTag)
        const result = Buffer.concat([decipher.update(content), decipher.final()]).toString()
        return JSON.parse(result)
    }
}
