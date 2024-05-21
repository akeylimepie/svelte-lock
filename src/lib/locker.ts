import { get, readonly, derived, type Readable } from 'svelte/store'
import { getLockContext, type LockKeys } from '$lib/context'

export { initLockContext } from './context'

export function getLocker () {
    const locked = getLockContext()

    return {
        lock (values: LockKeys) {
            locked.update((collection) => {
                values.forEach(value => collection.add(value))
                return collection
            })

            return () => this.release(values)
        },
        release (values: LockKeys) {
            locked.update((collection) => {
                values.forEach(value => collection.delete(value))
                return collection
            })
        },
        observe (values: Readable<LockKeys>) {
            return readonly(derived([locked, values], ([collection, values], set) => {
                set(values.some((value) => collection.has(value)))
            }, false))
        },
        isLocked (values: LockKeys) {
            const collection = get(locked)

            return values.some((value) => collection.has(value))
        }
    }
}