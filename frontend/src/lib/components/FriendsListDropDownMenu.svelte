<script lang="ts">
    import FriendsListWindow from "./FriendsListWindow.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    let is_dropdown_menu = false

    const handle_keydown = (e: any) => {
        if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== ' ') is_dropdown_menu = false;
    }

    const onClickFriend = async (event: CustomEvent) => {
        // Just forward it to the parent component
        dispatch('click', event.detail)
        is_dropdown_menu = false
    }
</script> 

<svelte:window on:keydown={handle_keydown}/>

<main
    on:focus={() => is_dropdown_menu = true}
    on:mouseover={() => is_dropdown_menu = true}
    on:mouseleave={() => is_dropdown_menu = false}>
    <button on:focus={() => is_dropdown_menu = true}>
        <span class="icon">
            <i class="ri-chat-new-line"/>
        </span>
    </button>
    {#if is_dropdown_menu}
        <div class="friends-list-wrapper">
            <FriendsListWindow on:click={onClickFriend}/>
        </div>
    {/if}
</main>

<style lang="postcss">
    button {
        padding: 0;
        background-color: transparent;
        border-radius: 100%;
    }
    .friends-list-wrapper {
        box-shadow: var(--shadow-3);
        display: flex;
        position: absolute;
        right: 0;
    }
    button .icon {
        background-color: rgba(169, 169, 169, 0.411);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.7rem;
        border-radius: 100%;
        margin: auto;
        transition: background-color 0.2s ease-in-out; 
        font-size: 1.2rem;
    }
    button .icon:hover {
        background-color: rgba(169, 169, 169, 1);
    }
</style>