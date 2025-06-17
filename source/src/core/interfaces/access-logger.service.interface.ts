
export interface AccessLogData {
    url: string
    method: string
    statusCode: number
    responseTime: number
    userAgent: string
    timestamp: Date
    requestId: string
    userId?: string
    traceId?: string
    queryParams?: Record<any, any>
    error?: Error
}
export interface IAccessLoggerService {
    log(data: AccessLogData): void
}
