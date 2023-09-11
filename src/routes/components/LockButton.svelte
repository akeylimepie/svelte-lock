<script lang="ts">
    import { lock, observeLock, release } from '$lib'

    export let id: string

    const isLocked = observeLock(id)

    const toggleLock = () => {
        if ($isLocked)
            release(id)
        else
            lock(id)
    }
</script>

<button on:click={toggleLock}>
    {#if $isLocked}unlock{:else}lock{/if}
</button>