import { writable, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

const contextKey = Symbol()

type LockAware = Writable<Set<string>>

export function initLockContext () {
    return setContext<LockAware>(contextKey, writable(new Set<string>))
}

export function getLockContext () {
    return getContext<LockAware>(contextKey)
}