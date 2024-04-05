<script lang="ts">
    import Item from './components/Item.svelte'
    import LockButton from './components/LockButton.svelte'
    import MountLock from './components/MountLock.svelte'
    import { initLockContext } from '$lib'

    const list = [
        {
            id: 'foo',
            items: [
                'Lorem Ipsum',
                'is simply dummy text',
                'of the printing',
            ]
        },
        {
            id: 'bar',
            items: [
                'and typesetting industry',
                'Lorem Ipsum',
                'has been the industry\'s standard',
                'dummy text ever',
                'since the 1500s',
            ]
        }
    ]

    let autoLock = false

    initLockContext()
</script>

{#each list as group}
    <LockButton id={group.id}/>
    <ul>
        {#each group.items as item}
            <li>
                <Item name={item} group={group.id}/>
            </li>
        {/each}
    </ul>
{/each}

{#if autoLock}
    <button on:click={()=>autoLock=false}>remove mount-lock</button>
    {#each list as group}
        <MountLock id={group.id}/>
    {/each}
{:else}
    <button on:click={()=>autoLock=true}>add mount-lock</button>
{/if}