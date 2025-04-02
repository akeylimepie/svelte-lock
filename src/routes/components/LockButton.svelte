<script lang="ts">
    import { type LockKey, useLock } from '$lib'

    let { id }: { id: LockKey } = $props();

    const key = useLock(id)

    const toggleLock = () => {
        if (key.isLocked)
            key.release()
        else
            key.lock()
    }
</script>

<button onclick={()=>toggleLock()}>
    {#if key.isLocked}unlock{:else}lock{/if}
</button>