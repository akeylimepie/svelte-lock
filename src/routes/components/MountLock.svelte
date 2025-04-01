<script lang="ts">
    import { onMount } from 'svelte'
    import { getLocker } from '$lib'
    import type { LockKey } from '$lib/context'

    let { id }: { id: LockKey } = $props();

    const locker = getLocker()

    onMount(() => {
        return locker.lock([id])
    })
</script>

<p>mount-locked</p>

<style>
    p {
        background: aqua;
    }
</style>

