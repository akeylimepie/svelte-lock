import { get, readonly, derived } from 'svelte/store'
import { getLockContext, type LockKey } from '$lib/context'

export { initLockContext } from './context'

export function getLocker () {
    const locked = getLockContext()

    return {
        lock (values: Array<LockKey>) {
            locked.update((collection) => {
                values.forEach(value => collection.add(value))
                return collection
            })

            return () => this.release(values)
        },
        release (values: Array<LockKey>) {
            locked.update((collection) => {
                values.forEach(value => collection.delete(value))
                return collection
            })
        },
        observe (values: Array<LockKey>) {
            return readonly(derived(locked, (collection, set) => {
                set(values.some((value) => collection.has(value)))
            }, false))
        },
        isLocked (values: Array<LockKey>) {
            const collection = get(locked)

            return values.some((value) => collection.has(value))
        }
    }
}