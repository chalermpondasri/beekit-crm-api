import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import {
    map,
    Observable,
} from 'rxjs'
import { isNil } from '@nestjs/common/utils/shared.utils'
import { Response } from 'express'

@Injectable()
export class NoContentInterceptor implements NestInterceptor {
    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map( data => {
                if(isNil(data)) {
                    context.switchToHttp()
                        .getResponse<Response>()
                        .status(204)
                    return undefined
                }
                return data
            })
        )
    }

}
