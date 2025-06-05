export interface ILoggerService {
    setContext(context: string): this
    error(message: any, trace?: string, context?: string): any
    warn(message: any, context?: string): any
    log(message: any, context?: string): any
    debug(message: any, context?: string): any
    verbose(message: any, context?: string): any
}
