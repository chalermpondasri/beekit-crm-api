import {
    toLongThaiBuddhistEraDateString,
    toThaiBuddhistEraDateString,
} from '@utils/thai-date-parser/thai-date-parser'

export function BuddhistDateTransformer({value}: { value: Date | string }) {

    if (!value || value === '') {
        return ''
    }
    const formattedDate = /\d{2}\/\d{2}\/\d{4}/
    if(typeof value === 'string' && value.length === 10 && formattedDate.test(value) ) {
        return value
    }

    const date = createDateFromString(value)
    if (date.toString() === 'Invalid Date') {
        throw new Error('Invalid date. Should be in YYYY-MM-DD format or Date object.')
    }
    return toThaiBuddhistEraDateString(date)
}

export function LongBuddhistDateTransformer({value}: { value: Date | string }) {

    if (!value || value === '') {
        return ''
    }

    const date = createDateFromString(value)

    if (date.toString() === 'Invalid Date') {
        throw new Error('Invalid date. Should be in YYYY-MM-DD format or Date object.')
    }
    return toLongThaiBuddhistEraDateString(date)
}

function createDateFromString(value: string | Date) {
    if (typeof value === 'string' && value.length === 8) {
        const supportedFormat = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
        return new Date(supportedFormat)
    } else {
        return new Date(value)
    }

}

