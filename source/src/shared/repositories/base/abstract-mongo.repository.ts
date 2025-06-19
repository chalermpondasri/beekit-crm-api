import {
    AbstractCursor,
    ClientSession,
    Collection,
    Filter,
    ObjectId,
    Sort,
    WithId,
    WithoutId,
} from 'mongodb'
import {
    Observable,
    Observer,
    concatMap,
    from,
    map,
    mergeMap,
} from 'rxjs'
import {
    IEntity,
    ISchema,
} from '@shared/repositories/base/model.interface'
import {
    FilterOpts,
    IDeleteOptions,
    IRepository,
    IRepositoryMapper,
    SortOpts,
} from '@shared/repositories/interfaces/base.repository.interface'


export abstract class AbstractMongoRepository<M extends IEntity, S extends ISchema> implements IRepository<M> {
    protected constructor(
        protected readonly _collection: Collection<S>,
        private readonly _mapper: IRepositoryMapper<M, S>,
        private readonly _session?: ClientSession,
    ) {
    }

    public async createIndexes(): Promise<this> {
        return this
    }

    protected toDocument(model: M): S {
        return this._mapper.serialize(model)
    }

    protected toModel(schema: S): M {
        return this._mapper.deserialize(schema)
    }

    protected toObservable(source: AbstractCursor | Promise<WithId<S>> | Promise<WithoutId<S>>): Observable<M> {
        const self = this

        if (Object(source).constructor === Promise) {
            return from(source)
        }
        return new Observable((observer: Observer<M>) => {
            const cursor = <AbstractCursor>source
            cursor
                .stream()
                .on('data', (document: any) => {
                    observer.next(self.toModel(document))
                })
                .on('end', () => {
                    cursor.close().then(() => observer.complete())
                })
                .on('error', (err: Error) => {
                    cursor.close().then(() => observer.error(err))
                })
        })
    }

    public getById(id: string): Observable<M> {
        const filter = <Filter<S>>{
            _id: new ObjectId(id),
            deletedAt: null,
        }
        return from(this._collection.findOne(filter)).pipe(
            map((schema) => {
                // @ts-ignore
                return this.toModel(schema)
            }),
        )
    }

    public list(where: FilterOpts<M> = {}, page = 1, limit = 20): Observable<M> {
        const filter: FilterOpts<M> = {...where, deletedAt: null}
        return this.toObservable(
            this._collection.find(
                <Filter<S>>filter,
                {
                    limit: limit,
                    skip: limit * (page - 1),
                },
            ),
        )
    }

    public delete(entity: M, deleteOptions: IDeleteOptions): Observable<M> {
        if (deleteOptions?.softDelete) {
            entity.deletedAt = new Date()
            return this.update(entity)
        }

        return from(
            this._collection.deleteOne(<Filter<S>>{_id: new ObjectId(entity._id)}),
        ).pipe(map(() => entity))
    }

    public save(entity: M): Observable<M> {
        const doc = this.toDocument(entity)

        // @ts-ignore
        return from(this._collection.insertOne(doc)).pipe(
            mergeMap(async (result) => {
                const filter = <Filter<S>>{_id: result.insertedId}
                return this._collection.findOne(filter)
            }),
            // @ts-ignore
            map((r) => this.toModel(r)),
        )
    }

    public update(entity: M): Observable<M> {
        const id = entity._id.toString()
        entity.updatedAt = new Date()
        const schema = this.toDocument(entity)
        delete schema._id

        return from(
            this._collection.updateOne(
                // @ts-ignore
                {_id: new ObjectId(id)},
                {$set: schema},
            ),
        ).pipe(
            concatMap(() => {
                return this.findOne({_id: new ObjectId(id)})
            }),
        )
    }

    public find(where: FilterOpts<M> = {}, sortOpts?: SortOpts<M>): Observable<M> {
        const filter: FilterOpts<M> = {...where, deletedAt: null}

        const sortKey = sortOpts?.sortBy ?? '_id'

        const sort: Sort = {
            [sortKey]: sortOpts?.sortDirection ?? 'asc',
        }

        return this.toObservable(
            this._collection.find(
                filter as Filter<S>,
                {
                    sort,
                },
            ),
        )
    }

    public count(where: FilterOpts<M> = {}): Observable<number> {
        const filter = Object.assign(where, {deletedAt: null})
        return from(this._collection.countDocuments(filter as Filter<S>))
    }

    public updateMany(where: FilterOpts<M>, schema: Partial<S>): Observable<number> {
        const filter = {...where, deletedAt: null}

        const update: Partial<S> = {
            updatedAt: new Date(),
            ...schema,
        }

        return from(this._collection.updateMany(<Filter<S>>filter, {$set: update})).pipe(map((res) => res.modifiedCount))
    }

    public findOne(where: FilterOpts<M> = {}): Observable<M> {
        const filter = {...where, deletedAt: null}
        // @ts-ignore
        return from(this._collection.findOne(filter)).pipe(map((data: any) => this.toModel(data)))
    }

    public increaseBy(id: string, field: keyof M | string, value: number): Observable<M> {
        const incrementObject = {}
        incrementObject[String(field)] = value
        const promise = this._collection.updateOne(
            // @ts-ignore
            {
                _id: new ObjectId(id),
            },
            {
                $inc: incrementObject,
            },
        )

        return from(promise).pipe(concatMap(() => this.getById(id)))
    }

    public decreaseBy(id: string, field: keyof M, value: number): Observable<M> {
        const decrementObject = {}
        decrementObject[String(field)] = -value
        const promise = this._collection.updateOne(
            // @ts-ignore
            {
                _id: new ObjectId(id),
            },
            {
                $inc: decrementObject,
            },
        )

        return from(promise).pipe(concatMap(() => this.getById(id)))
    }
}
