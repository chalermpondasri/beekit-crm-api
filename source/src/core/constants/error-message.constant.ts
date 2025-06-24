import { ApplicationErrorCode as Code } from './error-code.enum'

export interface ILocaleErrorMessage {
    title: string
    message: string
}

export const errorMessages: Record<Code, ILocaleErrorMessage> = {
    [Code.AUTHENTICATION_AUTH_FAILED]: {
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถเชื่อมโยงข้อมูลกับฐานข้อมูลทางรัฐได้',
    },
    [Code.TERM_ACCEPTED_REQUIRED]: {
        title: 'Error',
        message: 'Term Accept Required'
    },
    [Code.TERM_VERSION_MISMATCH]: {
        title: 'Error',
        message: 'Term Version Mismatch'
    },
}
