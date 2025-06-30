export interface ILoggerService {
    setContext(context: string): this
    error(message: any, trace?: string, context?: string): any
    error(message: any, data?: Record<any, any>, context?: string): any
    warn(message: any, context?: string): any
    log(message: any, context?: string, args?: Record<any, any>): any
    log(message: any, args?: Record<any, any>): any
    debug(message: any, context?: string): any
    verbose(message: any, context?: string): any
}
