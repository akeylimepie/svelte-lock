import { get, readonly, derived } from 'svelte/store'
import { getLockContext, type Key } from '$lib/context'

export { initLockContext } from './context'

export function getLocker () {
    const locked = getLockContext()

    return {
        lock (values: Array<Key>) {
            locked.update((collection) => {
                values.forEach(value => collection.add(value))
                return collection
            })

            return () => this.release(values)
        },
        release (values: Array<Key>) {
            locked.update((collection) => {
                values.forEach(value => collection.delete(value))
                return collection
            })
        },
        observe (values: Array<Key>) {
            return readonly(derived(locked, (collection, set) => {
                set(values.some((value) => collection.has(value)))
            }, false))
        },
        isLocked (values: Array<Key>) {
            const collection = get(locked)

            return values.some((value) => collection.has(value))
        }
    }
}