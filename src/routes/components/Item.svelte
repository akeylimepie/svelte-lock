<script lang="ts">
    import { getLocker } from '$lib'
    import type { Key } from '$lib/context'

    export let lockingKeys: Key[]
    export let name: string

    const locker = getLocker()

    const isLocked = locker.observe(lockingKeys)
</script>

{#if $isLocked}
    <s>{name}</s>
{:else}
    {name}
{/if}