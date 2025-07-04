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
    concatMap,
    from,
    map,
    Observable,
    Observer,
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

export interface IRepositorySetupContext<S> {
    collection: Collection<S>
    setupIdGenerator: (generator:() => string) => void
}


export abstract class AbstractMongoRepository<M extends IEntity, S extends ISchema> implements IRepository<M> {
    protected constructor(
        protected readonly _collection: Collection<S>,
        private readonly _mapper: IRepositoryMapper<M, S>,
        private readonly _session?: ClientSession,
        private _idGenerator: () => string = null,
    ) {
    }

    public async setup(setupFn: (context: IRepositorySetupContext<S>) => Promise<void>): Promise<this> {
        await setupFn({
            collection: this._collection,
            setupIdGenerator: (generator: () => string) => {
                this._idGenerator = generator
            },
        })

        return this
    }

    protected toDocument(model: M): S {
        return this._mapper.serialize(model)
    }

    protected toModel(schema: S): M {
        return this._mapper.deserialize(schema)
    }

    protected toObservable(source: AbstractCursor | Promise<WithId<S>> | Promise<WithoutId<S>>): Observable<M> {

        if (Object(source).constructor === Promise) {
            return from(source).pipe(
                map((document: S) => this.toModel(document)),
            )
        }
        return new Observable((observer: Observer<M>) => {
            const cursor = <AbstractCursor<S>>source
            const stream = cursor.stream()

            stream
                .on('data', (document: any) => {
                    observer.next(this.toModel(document))
                })
                .on('end', () => {
                    cursor.close().then(() => observer.complete())
                })
                .on('error', (err: Error) => {
                    cursor.close().then(() => observer.error(err))
                })

            return () => {
                stream.removeAllListeners()
                cursor.close().catch(console.error)
            }

        })
    }

    public getById(id: string): Observable<M> {
        const filter = <Filter<S>>{
            _id: this.ensureObjectId(id),
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
            return this.update(entity, true)
        }

        return from(
            this._collection.deleteOne(<Filter<S>>{_id: this.ensureObjectId(entity._id)}),
        ).pipe(map(() => entity))
    }

    private _generateIdIfNeeded(schema: S) {
        if (this._idGenerator && !schema._id) {
            schema._id = this._idGenerator()
        }
    }

    public save(entity: M): Observable<string> {
        const doc = this.toDocument(entity)
        this._generateIdIfNeeded(doc)

        // @ts-ignore
        return from(this._collection.insertOne(doc)).pipe(
            map((res) => res.insertedId.toString()),
        )
    }

    public update(entity: M, showDeleted: boolean = false): Observable<M> {
        const id = this.ensureObjectId(entity._id)
        entity.updatedAt = new Date()
        const schema = this.toDocument(entity)
        delete schema._id

        return from(
            this._collection.updateOne(
                // @ts-ignore
                {_id: id},
                {$set: schema},
            ),
        ).pipe(
            concatMap(() => {
                return this.findOne({_id: id, deletedAt: showDeleted ? {$ne: null} : null})
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

    public findOne(where: FilterOpts<M> = {}): Observable<M | null> {
        const filter = { deletedAt: null, ...where}
        // @ts-ignore
        return from(this._collection.findOne(filter))
            .pipe(
                map((data: any) => {
                    return !data ? null : this.toModel(data)
                }),
            )
    }

    public increaseBy(id: string, field: keyof M | string, value: number): Observable<M> {
        const incrementObject = {}
        incrementObject[String(field)] = value
        const promise = this._collection.updateOne(
            // @ts-ignore
            {
                _id: this.ensureObjectId(id),
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
                _id: this.ensureObjectId(id),
            },
            {
                $inc: decrementObject,
            },
        )

        return from(promise).pipe(concatMap(() => this.getById(id)))
    }

    protected ensureObjectId(string: string): ObjectId | string {
        if (ObjectId.isValid(string)) {
            return new ObjectId(string)
        }
        return string
    }
}
