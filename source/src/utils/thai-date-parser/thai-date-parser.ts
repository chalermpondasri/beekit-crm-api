import dayjs from 'dayjs'
import 'dayjs/locale/th'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
dayjs.extend(buddhistEra)

/**
 * transform thai datetime into Date using dayjs
 * @param {string} thaiDate eg. 18/07/2022
 * @param {string} thaiTime eg. 16:30
 * @returns {Date}
 *
 */
export const parseThaiDate = (thaiDate: string, thaiTime: string): Date => {
    return dayjs(`${thaiDate} ${thaiTime} +0700`, 'DD/MM/YYYY HH:mm ZZ').toDate()
}

export const parseBuddhistDate = (thaiDate: string, thaiTime: string = '00:00'): Date => {
    if(!thaiDate) {
        return null
    }
    const [day, month, buddhistYear] = thaiDate.split('/')
    const gregorianYear = parseInt(buddhistYear) - 543

    const monthNumber = Number(month)
    if(monthNumber > 12 || monthNumber < 1) {
        return null
    }
    const gregorianDate = `${day}/${month}/${gregorianYear}`

    const result = dayjs(`${gregorianDate} ${thaiTime} +0700`, 'DD/MM/YYYY HH:mm ZZ').toDate()

    if (Number.isNaN(result.getTime())) {
        return null
    }

    return result
}

/**
 * transform date into Thai buddhist calendar string format
 * @param {Date} date
 * @returns {string}
 * @example '18/07/2564 16:30'
 */
export const toThaiBuddhistEraDateTimeString = (date: Date): string => {
    return dayjs(date).locale('th').format('DD/MM/BBBB HH:mm')
}

/**
 * transform date into Thai buddhist calendar string format
 * @param date
 * @returns string
 * @example '18/07/2564'
 */
export const toThaiBuddhistEraDateString = (date: Date): string => {
    return dayjs(date).locale('th').format('DD/MM/BBBB')
}

export const toLongThaiBuddhistEraDateString = (date: Date): string => {
    return dayjs(date).locale('th').format('D MMMM BBBB')
}
