import crypto from 'crypto'

export class HasherService {
    public static hashSha256toBase64Url(value: string): string {
        return crypto
            .createHash('sha256')
            .update(value)
            .digest('base64url')
    }
}
