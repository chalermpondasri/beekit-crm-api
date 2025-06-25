import { registerDecorator } from 'class-validator'
import { NumberUtil } from '@utils/number-util/number.util'

export function IsValidChecksum() {
    return function (target: unknown, propertyName: string) {
        registerDecorator({
            name: IsValidChecksum.name,
            target: target.constructor,
            propertyName,
            validator: {
                validate(value: any): boolean {
                    try {
                        return NumberUtil.validateCheckSum(value)
                    } catch {
                        return false
                    }
                },
                defaultMessage(): string {
                    return `Invalid Checksum for ${propertyName}`
                },
            }
        })
    }
}
