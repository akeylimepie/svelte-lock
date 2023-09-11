import { get, readonly, derived } from 'svelte/store'
import { locked } from './store.js'

export function lock (name: string) {
    locked.update((set) => {
        set.add(name)

        return set
    })

    return release.bind(undefined, name)
}

export function release (name: string) {
    locked.update((set) => {
        set.delete(name)

        return set
    })
}

export function observeLock (name: string | undefined) {
    return typeof name === 'undefined' ? undefined : readonly(derived(locked, ($set) => $set.has(name)))
}

export function isLocked (name: string) {
    return get(locked).has(name)
}