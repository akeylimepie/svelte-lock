import { get, readonly, derived, readable } from 'svelte/store'
import { getLockContext } from '$lib/context'

export function getLocker () {
    const locked = getLockContext()

    return {
        lock (name: string) {
            locked.update((set) => set.add(name))

            return () => this.release(name)
        },
        release (name: string) {
            locked.update((set) => {
                set.delete(name)

                return set
            })
        },
        observe (name?: string) {
            if (name) {
                const locked = getLockContext()

                return readonly(derived(locked, ($locked) => $locked.has(name)))
            }

            return readable(false)
        },
        isLocked (name: string) {
            return get(locked).has(name)
        }
    }
}