import { IGetUserAcceptedTermUseCase } from '@domains/tos/interfaces/use-case.interface'
import {
    concatMap,
    defaultIfEmpty,
    map,
    Observable,
    of,
} from 'rxjs'
import { AcceptedTermOutput } from '@domains/tos/input-output/accepted-term.output'
import { IAcceptTermRepository } from '@shared/repositories/interfaces/term.repository.interface'
import crypto from 'crypto'
import { AcceptTermEntity } from '@shared/entities/accept-term.entity'

export class GetUserAcceptedTermUseCase implements IGetUserAcceptedTermUseCase {
    public constructor(
        private readonly _acceptTermRepository: IAcceptTermRepository,
    ) {
    }

    public execute(citizenId: string): Observable<AcceptedTermOutput | null> {
        return of(citizenId).pipe(
            map(citizenId =>
                crypto
                    .createHash('sha256')
                    .update(citizenId)
                    .digest('base64url')
            ),
            concatMap(hashed => this._acceptTermRepository.findOne({_id: hashed})),
            defaultIfEmpty(null as AcceptTermEntity),
            map((result) => {
                if(!result) {
                    return null
                }
                return new AcceptedTermOutput({
                    acceptedDate: result.acceptedAt,
                    acceptedVersion: result.termVersion,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                })
            })
        )
    }

}
