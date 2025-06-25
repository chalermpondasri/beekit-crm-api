import { NumberUtil } from '@utils/number-util/number.util'

describe('Number Util', () => {
    it('can checksum thai citizen id', () => {
        expect(NumberUtil.validateCheckSum('1329900130656')).toBe(true)
    })
    it('can checksum formatted number', () => {
        expect(NumberUtil.validateCheckSum('1-3299-00130-656')).toBe(true)
    })
})
