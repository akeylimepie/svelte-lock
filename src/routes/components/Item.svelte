<script lang="ts">
    import { observeLock } from '$lib'

    export let group: string
    export let name: string

    const isLocked = observeLock(group)
</script>

{#if $isLocked}
    <s>{name}</s>
{:else}
    {name}
{/if}