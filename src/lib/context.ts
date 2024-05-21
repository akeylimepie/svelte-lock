import { writable, type Writable } from 'svelte/store'
import { getContext, hasContext, setContext } from 'svelte'

const contextKey = Symbol()

export type LockKey = string | symbol
export type LockKeys = Array<LockKey>

type LockAware = Writable<Set<LockKey>>

export function initLockContext () {
    return setContext<LockAware>(contextKey, writable(new Set<LockKey>))
}

export function getLockContext () {
    if (!hasContext(contextKey))
        throw new Error('Locker context is not initialized')

    return getContext<LockAware>(contextKey)
}