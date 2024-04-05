<script lang="ts">
    import { getLocker } from '$lib'

    export let id: string

    const locker = getLocker()
    const isLocked = locker.observe(id)

    const toggleLock = () => {
        if ($isLocked)
            locker.release(id)
        else
            locker.lock(id)
    }
</script>

<button on:click={toggleLock}>
    {#if $isLocked}unlock{:else}lock{/if}
</button>