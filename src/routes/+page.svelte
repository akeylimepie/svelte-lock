<script lang="ts">
    import Item from './components/Item.svelte'
    import LockButton from './components/LockButton.svelte'
    import MountLock from './components/MountLock.svelte'
    import { initLockContext } from '$lib'

    const list = [
        {
            id: 'foobar',
            items: [
                'Lorem Ipsum',
                'is simply dummy text',
                'of the printing',
            ]
        },
        {
            id: Symbol(),
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
    const autoLockKey = Symbol()

    initLockContext()
</script>

{#each list as group}
    <LockButton id={group.id}/>
    <ul>
        {#each group.items as item}
            <li>
                <Item name={item} lockingKeys={[autoLockKey,group.id]}/>
            </li>
        {/each}
    </ul>
{/each}

{#if autoLock}
    <button on:click={()=>autoLock=false}>remove mount-lock</button>
    <MountLock id={autoLockKey}/>
{:else}
    <button on:click={()=>autoLock=true}>add mount-lock</button>
{/if}