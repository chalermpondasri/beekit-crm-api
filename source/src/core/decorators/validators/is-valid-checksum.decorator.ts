import {
    registerDecorator,
    ValidationArguments,
} from 'class-validator'
import { NumberUtil } from '@utils/number-util/number.util'

export function IsValidChecksum() {
    return function (target: unknown, propertyName: string) {
        registerDecorator({
            name: IsValidChecksum.name,
            target: target.constructor,
            propertyName,
            validator: {
                validate(value: any, validationArguments?: ValidationArguments): boolean {
                    try {
                        return NumberUtil.validateCheckSum(value)
                    } catch {
                        return false
                    }
                },
                defaultMessage(validationArguments?: ValidationArguments): string {
                    return `Invalid Checksum for ${propertyName}`
                },
            }
        })
    }
}
