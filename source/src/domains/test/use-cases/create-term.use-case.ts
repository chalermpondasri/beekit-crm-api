import { IAcceptTermUseCase } from '@domains/test/use-cases/use-cases.interface'
import { Observable } from 'rxjs'
import { AcceptTermEntity } from '@shared/entities/accept-term.entity'
import crypto from 'crypto'
import { v4 } from 'uuid'
import { IAcceptTermRepository } from '@shared/repositories/interfaces/term.repository.interface'

export class AcceptTermUseCase implements IAcceptTermUseCase {
    public constructor(
        private readonly _acceptTermRepository: IAcceptTermRepository,
    ) {}
    public execute(): Observable<any> {

        const model = new AcceptTermEntity()
        model._id = crypto.createHash('sha256').update(v4()).digest('base64')
        return this._acceptTermRepository.save(model)
    }
}
