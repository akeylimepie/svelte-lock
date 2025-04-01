<script lang="ts">
    import { getLocker, type LockKey } from '$lib'

    let { lockingKeys = [], name }: { lockingKeys: LockKey[], name: string } = $props()

    const locker = getLocker()

    const state = locker.observe(lockingKeys)
</script>

{#if state.isLocked}
    <s>{name}</s>
{:else}
    {name}
{/if}