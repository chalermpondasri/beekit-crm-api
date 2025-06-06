import { CitizenIdTransformer } from '@utils/citizen-id.transformer'

describe('citizen-id-transformer', () => {
    it('should not reformat invalid citizen id but still return as string', () => {
        const result = CitizenIdTransformer({value: 123123123})
        expect(result).toEqual('123123123')
    })

    it('should not reformat invalid citizen id but still return as string', () => {
        const result = CitizenIdTransformer({value: '123123123'})
        expect(result).toEqual('123123123')
    })

    it('should reformat valid citizen id', () => {
        const result = CitizenIdTransformer({value: '1234567890123'})
        expect(result).toEqual('1-2345-67890-12-3')
    })
    it('should remove existing hyphen before reformatting', () => {
        const result = CitizenIdTransformer({value: '1-2345-67890-12-3'})
        expect(result).toEqual('1-2345-67890-12-3')
    })
    it('should remove hyphen or white space before reformatting', () => {
        const result = CitizenIdTransformer({value: '1 2345 67890 12 3'})
        expect(result).toEqual('1-2345-67890-12-3')
    })

    it('should return empty string if citizen id is empty', () => {
            const result = CitizenIdTransformer({value: ''})
            expect(result).toEqual('')
        },
    )

    it('should return empty string if citizen id is undefined', () => {
        const result = CitizenIdTransformer({value: undefined})
        expect(result).toEqual('')
    })

    it('should return empty string if citizen id is null', () => {
        const result = CitizenIdTransformer({value: null})
        expect(result).toEqual('')
    })

})
