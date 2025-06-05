import { parseBuddhistDate, parseThaiDate, toThaiBuddhistEraDateTimeString, } from '../thai-date-parser';

describe('date utils', () => {
    it('can transform date', () => {
        const result = parseThaiDate('21/07/1987', '16:30')
        expect(result).toEqual(new Date('1987-07-21T09:30:00.000Z'))
    })

    it('can parse date into thai date format', () => {
        const d = parseThaiDate('21/07/1987', '16:30')
        const result = toThaiBuddhistEraDateTimeString(d)
        expect(result).toEqual('21/07/2530 16:30')
    })
})

describe(' buddhism date utils', () => {
    it('should transform buddhism date', () => {
        const result = parseBuddhistDate('21/07/2530', '16:30')
        expect(result).toEqual(new Date('1987-07-21T09:30:00.000Z'))
    })

    it('should transform buddhism date without time', () => {
        const result = parseBuddhistDate('18/01/2564')
        expect(result).toEqual(new Date('2021-01-17T17:00:00.000Z'))
    })

    it('should return null if date is invalid', () => {
        const result = parseBuddhistDate('')
        expect(result).toBeNull()
    })

    it('should return null if date is invalid', () => {
        expect(parseBuddhistDate(null)).toBeNull()
        expect(parseBuddhistDate('12/34/5678')).toBeNull()
        expect(parseBuddhistDate('12/30/2543')).toBeNull()
        expect(parseBuddhistDate('33/22/2543')).toBeNull()
        expect(parseBuddhistDate('2543/22/2543')).toBeNull()
        expect(parseBuddhistDate('22-2-2544')).toBeNull()
    })

})
