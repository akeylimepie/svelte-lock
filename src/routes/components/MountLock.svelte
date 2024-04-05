<script lang="ts">
    import { onMount } from 'svelte'
    import { getLocker } from '$lib'

    export let id: string

    const locker = getLocker()

    onMount(() => {
        return locker.lock(id)
    })
</script>

<p>{id} mount-locked</p>

<style>
    p {
        background: aqua;
    }
</style>

