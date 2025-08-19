import { getLockContext, type LockKey } from '$lib/context'

export function getLocker() {
    const lock = getLockContext()

    const locker = {
        lock(keys: LockKey[]) {
            keys.forEach(key => lock.add(key))

            return () => locker.release(keys)
        },
        release(keys: LockKey[]) {
            keys.forEach(key => lock.delete(key))
        },
        observe(keys: LockKey[]) {
            let locked = $derived(keys.some(key => lock.has(key)))

            return {
                /**
                 * @deprecated Use `locked` instead
                 */
                get isLocked() {
                    return locked
                },
                get locked() {
                    return locked
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
        /**
         * @deprecated Use `locked` instead
         */
        get isLocked() {
            return observer.locked
        },
        get locked() {
            return observer.locked
        },
        lock: () => locker.lock(normalizedKeys),
        release: () => locker.release(normalizedKeys)
    }
}
