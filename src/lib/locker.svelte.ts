import { getLockContext, type LockKey } from '$lib/context'

export function getLocker() {
    const locked = getLockContext()

    return {
        lock(values: LockKey[]) {
            values.forEach(value => locked.add(value))

            return () => this.release(values)
        },
        release(values: LockKey[]) {
            values.forEach(value => locked.delete(value))
        },
        observe(values: LockKey[]) {
            let isLocked = $derived.by(() => {
                return values.some(value => locked.has(value))
            })

            return {
                get isLocked() {
                    return isLocked
                }
            }
        },
        isLocked(values: LockKey[]) {
            return values.some(value => locked.has(value))
        }
    }
}