import { IUpdateUserAcceptedTermUseCase } from '@domains/tos/interfaces/use-case.interface'
import {
    concatMap,
    map,
    Observable,
    of,
} from 'rxjs'
import { UpdateUserTermInput } from '../input-output/update-user-term.input';
import { HasherService } from '@domains/tos/services/hasher.service'
import { IAcceptTermRepository } from '@shared/repositories/interfaces/term.repository.interface'
import { AcceptedTermOutput } from '@domains/tos/input-output/accepted-term.output'

export class UpdateUserTermUseCase implements IUpdateUserAcceptedTermUseCase {
    public constructor(
        private readonly _acceptTermRepository: IAcceptTermRepository,
    ) {}
    public execute(citizenId: string, data: UpdateUserTermInput): Observable<AcceptedTermOutput> {
        return of(citizenId).pipe(
            map(citizenId => HasherService.hashSha256toBase64Url(citizenId)),
            concatMap(hashed => this._acceptTermRepository.getById(hashed)),
            concatMap(entity => {
                entity.termVersion = data.acceptedVersion
                entity.acceptedAt = new Date()
                return this._acceptTermRepository.update(entity)
            }),
            map(result => {
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
