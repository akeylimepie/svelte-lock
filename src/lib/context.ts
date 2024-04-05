import { writable, type Writable } from 'svelte/store'
import { getContext, hasContext, setContext } from 'svelte'

const contextKey = Symbol()

type LockAware = Writable<Set<string>>

export function initLockContext () {
    return setContext<LockAware>(contextKey, writable(new Set<string>))
}

export function getLockContext () {
    if (!hasContext(contextKey))
        throw new Error('Locker context is not initialized')

    return getContext<LockAware>(contextKey)
}