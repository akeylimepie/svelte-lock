import { getContext, hasContext, setContext } from 'svelte'
import { SvelteSet } from "svelte/reactivity";

const contextKey = Symbol('svelte-locker')

export type LockKey = string | symbol

type LockAware = SvelteSet<LockKey>

export function initLockContext() {
    return setContext<LockAware>(contextKey, new SvelteSet())
}

export function getLockContext() {
    if (!hasContext(contextKey))
        return initLockContext()

    return getContext<LockAware>(contextKey)
}