import { ThaiMobilePhoneTransformer } from '@utils/phone-number.transformer'

describe('PhoneNumberTransformer', () => {
    it('should transform all digits into hyphens delimiter', () => {
        const result = ThaiMobilePhoneTransformer({value: '0812345678'})
        expect(result).toEqual('081-234-5678')
    })

    it('should transform number that missing leading zero', () => {
        const result = ThaiMobilePhoneTransformer({value: 812345678})
        expect(result).toEqual('081-234-5678')
    })

    it('should transform number string that missing leading zero', () => {
        const result = ThaiMobilePhoneTransformer({value: '812345678'})
        expect(result).toEqual('081-234-5678')
    })

    it('should remove leading country code', () => {
        const result = ThaiMobilePhoneTransformer({value: '+66812345678'})
        expect(result).toEqual('081-234-5678')
    })

    it('should handle provincial phone number correctly', () => {
        expect(ThaiMobilePhoneTransformer({value: '053150153'})).toEqual('053-150-153')
    })
    it('should handle already corrected provincial phone number ', () => {
        expect(ThaiMobilePhoneTransformer({value: '053-150-153'})).toEqual('053-150-153')
    })
    it('should be able to transform comma separated phone number', () => {
        expect(ThaiMobilePhoneTransformer({value: '053150153,0812345678'})).toEqual('053-150-153, 081-234-5678')
    })

});
