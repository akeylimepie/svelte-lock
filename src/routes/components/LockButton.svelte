<script lang="ts">
    import { getLocker, type LockKeys } from '$lib'
    import type { LockKey } from '$lib/context'
    import { writable } from 'svelte/store'

    export let id: LockKey

    const locker = getLocker()

    const lockingKeysStore = writable<LockKeys>([id])

    const isLocked = locker.observe(lockingKeysStore)

    const toggleLock = () => {
        if ($isLocked)
            locker.release([id])
        else
            locker.lock([id])
    }
</script>

<button on:click={toggleLock}>
    {#if $isLocked}unlock{:else}lock{/if}
</button>