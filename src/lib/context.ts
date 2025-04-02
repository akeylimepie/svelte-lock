import { getContext, hasContext, setContext } from 'svelte'
import { SvelteSet } from "svelte/reactivity";

const contextKey = Symbol('svelte-locker')

export type LockKey = string | symbol

type LockAware = SvelteSet<LockKey>

export function initLockContext() {
    setContext<LockAware>(contextKey, new SvelteSet())
}

export function getLockContext() {
    if (!hasContext(contextKey))
        throw new Error('Locker context is not initialized')

    return getContext<LockAware>(contextKey)
}