<script lang="ts">
    import Fa from 'svelte-fa';
    import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
    import { user, show_dropdown_menu, show_login_form, show_sign_up_form, show_profile_form } from '$lib/stores/globalstore';

    const handle_keydown = (e: any) => {
        if (e.key !== 'Tab' && e.key !== 'Shift' && e.key !== ' ') $show_dropdown_menu = false;
    }

    const onclickLogin = (e: any) => {
        $show_dropdown_menu = false;
        $show_login_form = true;
    }

    const onClickSignUp = (e: any) => {
        $show_dropdown_menu = false;
        $show_sign_up_form = true;
    }

    const onClickProfile = (e: any) => {
        $show_dropdown_menu = false;
        $show_profile_form = true;
    }
</script> 

<svelte:window on:keydown={handle_keydown}/>

<main
    on:focus={() => $show_dropdown_menu = true}
    on:mouseover={() => $show_dropdown_menu = true}
    on:mouseleave={() => $show_dropdown_menu = false}>
    <button on:focus={() => $show_dropdown_menu = true}>
        <span class="icon"><Fa icon={faCaretDown}/></span>
    </button>
    {#if $show_dropdown_menu}
        {#if !$user}
            <div class="dd-menu">
                <button on:click={onclickLogin}>Login</button>
                <button
                    title="If you do, you can chat with me privately and securely. Just you and me, nothing in between."
                    on:blur={() => $show_dropdown_menu = false}
                    on:click={onClickSignUp}>
                    Friend Me
                </button>
            </div>
        {:else}
            <div class="dd-menu">
                <form method="POST">
                    <button formaction="/?/log_out">Log Out</button>
                </form>
                <button
                    title="Update your profile"
                    on:blur={() => $show_dropdown_menu = false}
                    on:click={onClickProfile}>
                    Profile
                </button>
            </div>
        {/if}
    {/if}
</main>

<style lang="postcss">
    .dd-menu {
        form button { width: 100%; }
        button {
            text-align: left;
            padding: 3px 7px;
        }
        display: flex;
        gap: 5px;
        flex-direction: column;
        position: absolute;
        padding: 17px;
        width: 12rem; 
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        font-size: large;
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
    }
    button .icon:hover {
        background-color: rgba(169, 169, 169, 0.411);
    }
</style>