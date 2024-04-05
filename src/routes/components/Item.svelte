<script lang="ts">
    import { getLocker } from '$lib'

    export let group: string
    export let name: string

    const locker = getLocker()

    const isLocked = locker.observe(group)
</script>

{#if $isLocked}
    <s>{name}</s>
{:else}
    {name}
{/if}