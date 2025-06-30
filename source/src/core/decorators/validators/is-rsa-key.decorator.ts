import {
    registerDecorator,
    ValidationOptions,
} from 'class-validator'

import crypto from 'crypto'

export function IsRSAKey(keyType: 'public' | 'private', transformFunction: ({value}) => Buffer, validationOptions?: ValidationOptions) {
    return function (target: unknown, propertyKey: string) {
        registerDecorator({
            name: 'IsRSAKey',
            target: target.constructor,
            propertyName: propertyKey,
            options: validationOptions,
            validator: {
                validate(value: any): boolean {
                    try {

                        const key = {
                            key: transformFunction({value}),
                            padding: crypto.constants.RSA_PKCS1_PADDING,
                        }
                        const testMessage = Buffer.from('test message')
                        if (keyType === 'public') {

                            const data = crypto.publicDecrypt(
                                key,
                                crypto.publicEncrypt(key, testMessage))
                            return data.toString() === testMessage.toString()
                        }

                        if (keyType === 'private') {
                            return crypto.verify('sha256', testMessage, key,
                                crypto.sign('sha256', testMessage, key),
                            )
                        }
                        return false
                    } catch  {
                        return false
                    }
                },
                defaultMessage: () => `Invalid RSA ${keyType} key for ${propertyKey}`,
            },
        })
    }
}
