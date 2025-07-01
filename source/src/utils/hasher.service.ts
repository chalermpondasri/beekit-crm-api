import crypto from 'crypto'
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util'

export class HasherService {
    public static hashSha256toBase64Url(value: string): string {
        return crypto
            .createHash('sha256')
            .update(value)
            .digest('base64url')
    }

    public static generateTransactionIdAsBase64Url(): string {
        return crypto.createHash('sha256')
            .update(`${Date.now()}${randomStringGenerator()}`)
            .digest('base64url')
            .replaceAll(/[_\-+]/g, '')
    }
}
