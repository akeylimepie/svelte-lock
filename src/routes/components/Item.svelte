<script lang="ts">
    import { getLocker, type LockKeys } from '$lib'
    import { writable } from 'svelte/store'

    export let lockingKeys: LockKeys = []
    export let name: string

    const locker = getLocker()

    const lockingKeysStore = writable<LockKeys>(lockingKeys)

    $: $lockingKeysStore = lockingKeys

    const isLocked = locker.observe(lockingKeysStore)
</script>

{#if $isLocked}
    <s>{name}</s>
{:else}
    {name}
{/if}