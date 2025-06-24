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

export class UpdateUserTermUseCase implements IUpdateUserAcceptedTermUseCase {
    public constructor(
        private readonly _acceptTermRepository: IAcceptTermRepository,
    ) {}
    public execute(citizenId: string, data: UpdateUserTermInput): Observable<boolean> {
        return of(citizenId).pipe(
            map(citizenId => HasherService.hashSha256toBase64Url(citizenId)),
            concatMap(hashed => this._acceptTermRepository.getById(hashed)),
            concatMap(entity => {
                entity.termVersion = data.acceptedVersion
                entity.acceptedAt = new Date()
                return this._acceptTermRepository.update(entity)
            }),
            map(() =>true)
        )
    }
}
