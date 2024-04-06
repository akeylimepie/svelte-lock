<script lang="ts">
    import { getLocker } from '$lib'
    import type { LockKey } from '$lib/context'

    export let lockingKeys: LockKey[]
    export let name: string

    const locker = getLocker()

    const isLocked = locker.observe(lockingKeys)
</script>

{#if $isLocked}
    <s>{name}</s>
{:else}
    {name}
{/if}