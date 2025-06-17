import {
    AccessLogData,
    IAccessLoggerService,
} from '@core/interfaces/access-logger.service.interface'

export class AccessLoggerService implements IAccessLoggerService {
    public constructor() {
    }

    public log(data: AccessLogData): void {
        const message = data.error?.message
        const obj = {
            ...data, error: message, type: 'ACCESS_LOG',
        }
        console.log(JSON.stringify(obj))
    }

}
