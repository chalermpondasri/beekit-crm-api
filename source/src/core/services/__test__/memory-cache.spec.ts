import { MemoryCacheService } from '@core/services/memory-cache.service'
import {
    forkJoin,
    map,
    mergeMap,
    of,
} from 'rxjs'

describe('MemoryCache', () => {
    let memoryCacheService: MemoryCacheService
    beforeEach(() => {
        memoryCacheService = new MemoryCacheService()
    })
    it('should set value',(done) => {
        memoryCacheService.set('test', 'test').pipe(
            mergeMap(() => memoryCacheService.get('test')),
            map(value => expect(value).toEqual('test')),
        ).subscribe({complete: done})
    })

    it('should return null if key not found', (done) => {
        memoryCacheService.get('test').pipe(
            map(value => expect(value).toEqual(null)),
        ).subscribe({complete: done})
    })

    it('should delete key', (done) => {

        memoryCacheService.set('test', 'test').pipe(
            mergeMap(() => memoryCacheService.delete('test')),
            mergeMap(() => memoryCacheService.get('test')),
            map(value => expect(value).toEqual(null)),
        ).subscribe({complete: done})
    })

    it('should flush all keys', (done) => {
        forkJoin([
            memoryCacheService.set('test', 'test'),
            memoryCacheService.set('test2', 'test2'),
            memoryCacheService.getAndSet('test3', () => of('test3')),
        ]).pipe(
            mergeMap(() => memoryCacheService.flush()),
            mergeMap(() => forkJoin([
                memoryCacheService.get<string>('test'),
                memoryCacheService.get<string>('test2'),
                memoryCacheService.get<string>('test3'),
            ])),
            map(([test, test2, test3]) => {
                expect(test).toEqual(null)
                expect(test2).toEqual(null)
                expect(test3).toEqual(null)
            })
        ).subscribe({complete: done})
    })
})
