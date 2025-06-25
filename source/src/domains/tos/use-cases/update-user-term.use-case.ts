import { IUpdateUserAcceptedTermUseCase } from '@domains/tos/interfaces/use-case.interface'
import {
    concatMap,
    map,
    Observable,
    of,
} from 'rxjs'
import { UpdateUserTermInput } from '../input-output/update-user-term.input'
import { HasherService } from '@domains/tos/services/hasher.service'
import { IAcceptTermRepository } from '@shared/repositories/interfaces/term.repository.interface'
import { AcceptedTermOutput } from '@domains/tos/input-output/accepted-term.output'
import { AcceptTermEntity } from '@shared/entities/accept-term.entity'

export class UpdateUserTermUseCase implements IUpdateUserAcceptedTermUseCase {
    public constructor(
        private readonly _acceptTermRepository: IAcceptTermRepository,
    ) {
    }

    public execute(citizenId: string, data: UpdateUserTermInput): Observable<AcceptedTermOutput> {
        const citizenIdHash = HasherService.hashSha256toBase64Url(citizenId)
        return this._acceptTermRepository.getById(citizenIdHash).pipe(
            concatMap(entity => {
                if(data.acceptedVersion === entity?.termVersion) {
                    return of(entity)
                }

                if (!entity) {
                    entity = new AcceptTermEntity()
                }

                entity.termVersion = data.acceptedVersion
                entity.acceptedAt = new Date()

                if (entity._id) {
                    return this._acceptTermRepository.update(entity)
                }

                entity._id = citizenIdHash
                return this._acceptTermRepository.save(entity).pipe(
                    concatMap(id => this._acceptTermRepository.getById(id)),
                )
            }),
            map(result => {
                return new AcceptedTermOutput({
                    acceptedDate: result.acceptedAt,
                    acceptedVersion: result.termVersion,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                })
            }),
        )
    }
}
