import { getLockContext, type LockKey } from '$lib/context'

export function getLocker() {
    const locked = getLockContext()

    const locker = {
        lock(keys: LockKey[]) {
            keys.forEach(key => locked.add(key))

            return () => locker.release(keys)
        },
        release(keys: LockKey[]) {
            keys.forEach(key => locked.delete(key))
        },
        observe(keys: LockKey[]) {
            let isLocked = $derived(keys.some(key => locked.has(key)))

            return {
                get isLocked() {
                    return isLocked
                }
            }
        },
        isLocked(keys: LockKey[]) {
            return locker.observe(keys).isLocked
        }
    }

    return locker
}

export function useLock(keys: LockKey | LockKey[] = Symbol()) {
    const normalizedKeys = Array.isArray(keys) ? keys : [keys]

    const locker = getLocker()

    const observer = locker.observe(normalizedKeys)

    return {
        keys: normalizedKeys,
        get isLocked() {
            return observer.isLocked
        },
        lock: () => locker.lock(normalizedKeys),
        release: () => locker.release(normalizedKeys)
    }
}
