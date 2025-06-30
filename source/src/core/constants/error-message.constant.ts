import { ApplicationErrorCode as Code } from './error-code.enum'

export interface ILocaleErrorMessage {
    title: string
    message: string
}

export const errorMessages: Record<Code, ILocaleErrorMessage> = {
    [Code.INTERNAL_SERVER_ERROR]: {
        title: 'Internal Server Error',
        message: 'Unexpected error occurred',
    },
    [Code.AUTHENTICATION_AUTH_FAILED]: {
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถเชื่อมโยงข้อมูลกับฐานข้อมูลทางรัฐได้',
    },
    [Code.TERM_ACCEPTED_REQUIRED]: {
        title: 'Error',
        message: 'Term Accept Required',
    },
    [Code.TERM_VERSION_MISMATCH]: {
        title: 'Error',
        message: 'Term Version Mismatch',
    },
    [Code.CARD_MAX_TYPE_ALLOWED]: {
        title: 'Error',
        message: 'Maximum card of a type reached',
    },
    [Code.CARD_WAS_REGISTERED]: {
        title: 'Error',
        message: 'Card was registered',
    },
    [Code.CARD_NOT_FOUND]: {
        title: 'Card Not Found',
        message: 'Card Not Found',
    }
}
