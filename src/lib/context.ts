import { writable, type Writable } from 'svelte/store'
import { getContext, hasContext, setContext } from 'svelte'

const contextKey = Symbol()

export type Key = string | object | symbol

type LockAware = Writable<Set<Key>>

export function initLockContext () {
    return setContext<LockAware>(contextKey, writable(new Set<Key>))
}

export function getLockContext () {
    if (!hasContext(contextKey))
        throw new Error('Locker context is not initialized')

    return getContext<LockAware>(contextKey)
}