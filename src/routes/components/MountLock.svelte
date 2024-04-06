<script lang="ts">
    import { onMount } from 'svelte'
    import { getLocker } from '$lib'
    import type { Key } from '$lib/context'

    export let id: Key

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

