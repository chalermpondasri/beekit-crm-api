import { RootFilterOperators } from 'mongodb'
import { Observable } from 'rxjs'
import {
    IEntity,
    ISchema,
} from '@shared/repositories/base/model.interface'

export type FilterOpts<T> = {
    [Property in keyof T]?: any
} & RootFilterOperators<T>

export type SortOpts<T> = {
    sortBy: keyof T
    sortDirection: 'asc' | 'desc'
}

export interface IRepository<T extends IEntity, S extends ISchema = any> {
    createIndexes(): Promise<this>
    getById(id: string): Observable<T>

    find(where?: FilterOpts<T>, sortOpts?: SortOpts<T>): Observable<T>

    count(where?: FilterOpts<T>): Observable<number>

    save(entity: T): Observable<T>

    update(entity: T): Observable<T>

    list(where?: FilterOpts<T>, page?: number, limit?: number): Observable<T>

    delete(entity: T, options?: IDeleteOptions): Observable<T>

    updateMany(where: FilterOpts<T>, schema: Partial<S>): Observable<number>

    findOne(where: FilterOpts<T>): Observable<T>
    increaseBy(id: string, field: keyof T | string, value: number): Observable<T>
    decreaseBy(id: string, field: keyof T, value: number): Observable<T>
}

export interface IDeleteOptions {
    softDelete?: boolean
}

export interface IRepositoryMapper<M extends IEntity, S extends ISchema> {
    serialize(model: M): S

    deserialize(schema: S): M
}
