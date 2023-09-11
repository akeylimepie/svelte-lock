import { describe, it, expect } from 'vitest'
import { isLocked, lock, observeLock, release } from '$lib'
import { locked } from '$lib/store'
import { get } from 'svelte/store'

describe('lock test', () => {
    it('lock', () => {
        expect(lock('foo')).instanceOf(Function)
        expect(get(locked).has('foo')).toBe(true)
    })

    it('release', () => {
        get(locked).add('bar')
        release('bar')
        expect(get(locked).has('bar')).toBe(false)
    })

    it('toggle', () => {
        const key = 'toggle'

        const release = lock(key)
        expect(get(locked).has(key)).toBe(true)

        release()
        expect(get(locked).has(key)).toBe(false)
    })

    it('isLocked', () => {
        get(locked).add('baz')
        expect(isLocked('baz')).toBe(true)
    })

    it('observeLock', () => {
        expect(observeLock(undefined)).toBe(undefined)
        expect(observeLock('')).toBeTypeOf('object')
    })
})
