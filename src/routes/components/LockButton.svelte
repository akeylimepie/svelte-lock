<script lang="ts">
    import { getLocker, type LockKey } from '$lib'

    let { id }: { id: LockKey } = $props();

    const locker = getLocker()

    let state = locker.observe([id])

    const toggleLock = () => {
        if (state.isLocked)
            locker.release([id])
        else
            locker.lock([id])
    }
</script>

<button onclick={()=>toggleLock()}>
    {#if state.isLocked}unlock{:else}lock{/if}
</button>