<script lang="ts">
    import { onMount } from 'svelte'
    import { lock } from '$lib'

    export let id: string

    onMount(lock.bind(undefined, id))
</script>

<p>{id} mount-locked</p>

<style>
    p {
        background: aqua;
    }
</style>

