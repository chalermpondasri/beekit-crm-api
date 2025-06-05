import {
    BuddhistDateTransformer,
    LongBuddhistDateTransformer,
} from '@utils/buddhist-date.transformer'

describe('BuddhistDateTransformer', () => {
    it('can transform Date into buddhist date format', () => {
        const dateToTransform = new Date(Date.parse('2021-01-03T07:00:00.000Z'))
        const result = BuddhistDateTransformer({value: dateToTransform})
        expect(result).toEqual('03/01/2564')
    })

    it('can transform YYYY-MM-DD date string into buddhist date format ', () => {
        const result = BuddhistDateTransformer({value: '1987-07-21'})
        expect(result).toEqual('21/07/2530')
    })

    it('would not transform invalid date string and throw error', () => {
        expect(() => BuddhistDateTransformer({value: 'Random Value'})).toThrow()
    })
    it('should transform YYYYMMDD string into buddhist date format ', () => {
        const result = BuddhistDateTransformer({value: '19870721'})
        expect(result).toEqual('21/07/2530')
    })

    it('should not transform if input is already in buddhist date format', () => {
        const result = BuddhistDateTransformer({value: '21/07/2530'})
        expect(result).toEqual('21/07/2530')
    })
})

describe('LongBuddhistDateTransformer', () => {
    it('can transform Date into buddhist date format', () => {
        const dateToTransform = new Date(Date.parse('2021-01-03T07:00:00.000Z'))
        const result = LongBuddhistDateTransformer({value: dateToTransform})
        expect(result).toEqual('3 มกราคม 2564')
    })
    it('can transform YYYY-MM-DD date string into buddhist date format ', () => {
        const result = LongBuddhistDateTransformer({value: '2021-01-03'})
        expect(result).toEqual('3 มกราคม 2564')
    })

    it('would not transform invalid date string and throw error', () => {
        expect(() => LongBuddhistDateTransformer({value: 'Random Value'})).toThrow()
    })
    it('should return empty string if value is null or empty string', () => {
        expect(LongBuddhistDateTransformer({value: ''})).toEqual('')
        expect(LongBuddhistDateTransformer({value: null})).toEqual('')
    })
    it('should transform YYYYMMDD string into buddhist date format ', () => {
        const result = BuddhistDateTransformer({value: '19870721'})
        expect(result).toEqual('21/07/2530')
    })
})
