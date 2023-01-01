<script lang="ts">
    import { user, theme, selected_menu, about_selected_menu, unreadChats } from '$lib/stores/globalstore';
    import ThemeButton from './ThemeButton.svelte';
    import DropDownMenu from './DropDownMenu.svelte'
    let currentY = 0;
</script>

<svelte:window bind:scrollY={currentY}/>

<main>
    <nav 
        class:nav-shadow-white={$theme === 'dark' && currentY >= 11}
        class:nav-shadow-black={$theme === 'light' && currentY >= 11}>
        <ul class="flex">
            <li class="mr-2">
                <a 
                    class:active={$selected_menu === 'dashboard'}
                    on:click={() => $selected_menu = 'dashboard'}
                    href="/">
                    Dashboard
                </a>
            </li>
            <li class="mr-2">
                <a 
                    class:active={$selected_menu === 'background'}
                    on:click={() => $selected_menu = 'background'}
                    href={`/about/${$about_selected_menu}`}>
                    Background
                </a>
            </li>

            {#if $user}
                <li class="mr-2">
                    <a 
                        class="chat"
                        class:active={$selected_menu === 'chat'}
                        on:click={() => $selected_menu = 'chat'}
                        href="/chat">
                        Chat
                        {#if ($unreadChats?.totalCount)}
                            <span>{$unreadChats.totalCount}</span>
                        {/if}
                    </a>
                </li>
            {/if}

        </ul>
        <span class="text-lg me">&copy;&nbsp;MICHAEL SANTIAGO</span>
        <span><ThemeButton /></span>
        <span>
            {#if $user}
                {#if ($user?.role == 1)}
                    <p class="text-sm">{$user?.email}</p>&nbsp;
                {/if}
            {/if}
            <DropDownMenu />
        </span>
    </nav>
</main>

<style lang="postcss">
    nav {
        display: grid;
        padding: 10px 35px;
        grid-template-columns: 1fr auto auto auto;
        gap: 10px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        position: fixed;
        backdrop-filter: blur(6px);
        font-family: "Rajdhani", sans-serif;
        font-weight: 600;
        font-size: 1.3rem;
        top: 0;
        width: 63%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 10;
    }
    nav ul { gap: 10px; }
    nav li, span { padding: 2px; }
    .nav-shadow-black { box-shadow: 0 3.4px 6.3px rgba(0, 0, 0, 0.09), 0 7px 10px rgba(0, 0, 0, 0.09); }
    .nav-shadow-white { box-shadow: 0 3.4px 6.3px rgba(255, 255, 255, 0.09), 0 7px 10px rgba(255, 255, 255, 0.09); }
    nav span {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
    }
    nav li a.chat  {
        display: flex;
        span {
            margin-left: 5px;
            position: relative;
            top: -5px;
            font-weight: 400;
            font-size: small;
            background-color: green;
            border-radius: 50px;
            padding: 0 7px;
            color: white;
        }
    }

    .me {
        /* Animation */
        animation: rolling_text_fill;
        animation-duration: 120s;
        animation-delay: 1s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: alternate-reverse;
        animation-fill-mode: both;

        /* Gradient Fill Color */
        /* background: linear-gradient(90deg, gold, rgb(255, 255, 114), gold); */
        background-size: 400%;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
    }

    @keyframes rolling_text_fill {
        from { background-position: 0%; }
        to { background-position: 400%; }
    }
</style>