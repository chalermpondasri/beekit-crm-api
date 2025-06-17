import { ILoggerService } from '@core/interfaces/logger.service.interface'
import winston, { LogEntry } from 'winston'
import * as os from 'node:os'
import { LogLevel } from '@nestjs/common'

export class WinstonConsoleLogger implements ILoggerService {
    private readonly _hostInfo: Record<string, string>
    private readonly _logger: winston.Logger
    private _context: string = null

    public constructor(
        logOutput: 'console' | 'json',
        args: object = {},
    ) {
        this._hostInfo = {
            hostName: os.hostname(),
        }

        let logFormat: winston.Logform.Format
        switch (logOutput) {
            case 'json':
                logFormat = winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json(),
                )
                break

            case 'console':
            default:
                logFormat = winston.format.combine(
                    winston.format.timestamp({format: 'YYYY-MM-DDTHH:mm:ss Z'}),
                    winston.format.errors({stack: true}),
                    winston.format.splat(),
                    winston.format.colorize(),
                    winston.format.align(),
                    winston.format.printf(info => {
                        const {timestamp, level, message, ...args} = info
                        const ctx = info.context || this._context || 'APP'

                        const {trace} = args
                        const stackTrace = (<any>trace)?._stacktrace as string[] || []
                        return `${timestamp} ${level} [${ctx}]: ${message} ${(trace ? '\n' + stackTrace?.join('\n') : '')}`
                    }),
                )
                break
        }

        this._logger = winston.createLogger({
            defaultMeta: args,
            format: logFormat,
            transports: [
                new winston.transports.Console({}),
            ],
        })
    }

    public verbose(message: any, context?: string) {
        this._logger.log(this._buildMessage(message, 'verbose', context))
    }

    public setContext(context: string): this {
        this._context = context
        return this
    }

    private _mapLogLevel(level: LogLevel): string {
        switch (level) {
            case 'fatal':
                return 'emerg'
            case 'error':
                return 'error'
            case 'warn':
                return 'warn'
            case 'log':
                return 'info'
            case 'verbose':
                return 'debug'
            case 'debug':
                return 'debug'
        }
    }

    public error(message: any, traceOrData?: string | Record<any, any>, context?: string): any {
        if (typeof traceOrData === 'string') {
            return this._logger.log(this._buildMessage(message, 'error', context, traceOrData?.split('\n')))
        }
        return this._logger.log(this._buildMessage(message, 'error', context, traceOrData))
    }

    public warn(message: any, context?: string): any {
        this._logger.log(this._buildMessage(message, 'warn', context))
    }

    public log(message: any, args?: string | Record<any, any>, args2?: Record<any, any>): any {
        if (typeof args === 'string') {
            return this._logger.log(this._buildMessage(message, 'log', args, args2))
        }
        return this._logger.log(this._buildMessage(message, 'log', null, <Record<any, any>>args))
    }

    public debug(message: any, context?: string): any {
        this._logger.log(this._buildMessage(message, 'debug', context))
    }

    private _buildMessage(errorObject: string | Error | null, level?: LogLevel, context?: string, args?: Record<any, any>): LogEntry {
        const isTextMessage = typeof errorObject === 'string'
        return {
            message: isTextMessage ? errorObject : errorObject?.message,
            level: level ? this._mapLogLevel(level) : 'log',
            context: context || this._context,
            hostInfo: this._hostInfo,
            trace: !isTextMessage && errorObject ? Object.assign({}, args, {_stacktrace: errorObject.stack?.split('\n')}) : args,
        }
    }
}

