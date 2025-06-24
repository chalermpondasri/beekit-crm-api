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
import { AcceptTermEntity } from '@shared/entities/accept-term.entity'
import { HasherService } from '@domains/tos/services/hasher.service'

export class GetUserAcceptedTermUseCase implements IGetUserAcceptedTermUseCase {
    public constructor(
        private readonly _acceptTermRepository: IAcceptTermRepository,
    ) {
    }

    public execute(citizenId: string): Observable<AcceptedTermOutput | null> {
        return of(citizenId).pipe(
            map(citizenId => HasherService.hashSha256toBase64Url(citizenId)),
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
