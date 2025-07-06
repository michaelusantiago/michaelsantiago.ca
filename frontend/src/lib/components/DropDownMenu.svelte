<script lang="ts">
    import { current_user, selected_drop_down_menu } from "@lib/store"
    import { Circle } from "svelte-loading-spinners"
    import { enhance } from "$app/forms"

    let is_dropdown_menu = false
    let is_logging_out = false

    const handle_keydown = (e: any) => {
        if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== ' ') is_dropdown_menu = false;
    }

    const onclickLogin = () => {
        is_dropdown_menu = false
        selected_drop_down_menu.set('login')
    }

    const onClickSignUp = (e: any) => {
        is_dropdown_menu = false
        selected_drop_down_menu.set('signup')
    }

    const onClickProfile = (e: any) => {
        is_dropdown_menu = false
        selected_drop_down_menu.set('profile')
    }
</script> 

<svelte:window on:keydown={handle_keydown}/>

<main
    on:focus={() => is_dropdown_menu = true}
    on:mouseover={() => is_dropdown_menu = true}
    on:mouseleave={() => is_dropdown_menu = false}>
    <button on:focus={() => is_dropdown_menu = true}>
        <span class="icon"><i class="ri-arrow-down-s-fill"/></span>
    </button>
    {#if is_dropdown_menu}
        {#if !$current_user}
            <div class="dd-menu">
                <button on:click={onclickLogin}>Login</button>
                <button
                    title="If you do, you can chat with me privately and securely. Just you and me, nothing in between."
                    on:blur={() => is_dropdown_menu = false}
                    on:click={onClickSignUp}>
                    Friend Me
                </button>
            </div>
        {:else}
            <div class="dd-menu">
                <form action="/?/log_out" method="POST">
                    <button
                        type="submit"
                        on:click|once={() => is_logging_out = true}>
                        <span>Log Out</span>
                        {#if is_logging_out}
                            <Circle size="15" color="#FFF" unit="px" duration="1s"/>
                        {/if}
                    </button>
                </form>
                <button
                    disabled={is_logging_out}
                    title="Update your profile"
                    on:blur={() => is_dropdown_menu = false}
                    on:click={onClickProfile}>
                    Profile
                </button>
            </div>
        {/if}
    {/if}
</main>

<style lang="postcss">
    button {
        padding: 0;
        background-color: transparent;
        border-radius: 100%;
    }
    .dd-menu {
        button {
            display: flex;
            justify-content: space-between;
            width: 100%;
            text-align: left;
            padding: 3px 7px;
            font-size: 1rem;
            border-radius: 0;
            &:disabled {
                color: lightgray;
                opacity: 0.3;
            }
        }
        display: flex;
        flex-direction: column;
        position: absolute;
        padding: 17px;
        width: 10rem; 
        right: 1rem;
        gap: 10px;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        box-shadow: 0 3.4px 6.3px rgba(50, 50, 50, 0.09), 0 7px 10px rgba(50, 50, 50, 0.09);
        z-index: 13;
    }

    button .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        width: 32px;
        border-radius: 100%;
        transition: background-color 0.5s ease-in-out; 
        font-size: 1.5rem;
    }
    button .icon:hover {
        background-color: rgba(169, 169, 169, 0.411);
    }
</style>