import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SvelteSet } from "svelte/reactivity";

const testSet = new SvelteSet()

beforeEach(() => {
    testSet.clear()
})

vi.mock('$lib/context', async () => {
    const actual = await vi.importActual<typeof import('$lib/context')>('$lib/context')
    return {
        ...actual,
        getLockContext: () => testSet
    }
})

import { getLocker, useLock } from '$lib'

describe('locker', () => {
    it('locks and releases keys', () => {
        const locker = getLocker()

        expect(locker.isLocked(['foo'])).toBe(false)

        const release = locker.lock(['foo'])
        expect(locker.isLocked(['foo'])).toBe(true)

        release()
        expect(locker.isLocked(['foo'])).toBe(false)
    })

    it('locks multiple keys and checks any', () => {
        const locker = getLocker()

        locker.lock(['a'])
        expect(locker.isLocked(['a', 'b'])).toBe(true)

        locker.lock(['b'])
        locker.release(['a'])
        expect(locker.isLocked(['a', 'b'])).toBe(true)

        locker.release(['b'])
        expect(locker.isLocked(['a', 'b'])).toBe(false)
    })

    it('observe returns reactive isLocked', () => {
        const locker = getLocker()

        const obs = locker.observe(['x'])

        expect(obs.isLocked).toBe(false)

        const release = locker.lock(['x'])
        expect(obs.isLocked).toBe(true)

        release()
        expect(obs.isLocked).toBe(false)
    })
})

describe('useLock', () => {
    it('is reactive and controls lock state', () => {
        const lock = useLock(['task'])

        expect(lock.isLocked).toBe(false)

        lock.lock()
        expect(lock.isLocked).toBe(true)

        lock.release()
        expect(lock.isLocked).toBe(false)
    })

    it('works with single key', () => {
        const lock = useLock(Symbol())

        expect(lock.isLocked).toBe(false)
        lock.lock()
        expect(lock.isLocked).toBe(true)
    })
})
