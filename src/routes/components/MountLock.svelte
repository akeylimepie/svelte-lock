<script lang="ts">
    import { useLock } from '$lib'
    import type { LockKey } from '$lib/context'

    let { id }: { id: LockKey } = $props();

    $effect(() => useLock(id).lock())
</script>

<p>mount-locked</p>

<style>
    p {
        background: aqua;
    }
</style>

