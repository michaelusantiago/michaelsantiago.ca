<script lang="ts">
    import ThemeButton from "./ThemeButton.svelte";
    import DropDownMenu from "./DropDownMenu.svelte";
    import { selected_menu, current_user, theme, unread_chats } from "@lib/store";

    $: total_unread_chats = $unread_chats.length
    let currentY = 0
</script>

<svelte:window bind:scrollY={currentY}/>

<nav
    class:nav-shadow-white={$theme === 'dark' && currentY >= 11}
    class:nav-shadow-black={$theme === 'light' && currentY >= 11}>
    <ul>
        <li>
            <a
                class:active={$selected_menu === "dashboard"}
                on:click={() => $selected_menu = "dashboard"}
                href="/">
                Dashboard
            </a>
        </li>
        <li>
            <a
                class:active={$selected_menu === "projects"}
                on:click={() => $selected_menu = "projects"}
                href="/projects">
                Projects
            </a>
        </li>
        {#if $current_user}
            <li>
                <a
                    class:active={$selected_menu === "background"}
                    on:click={() => $selected_menu = "background"}
                    href="/background">
                    Background
                </a>
            </li>
            <li>
                <a
                    class:active={$selected_menu === "chat"}
                    on:click={() => $selected_menu = "chat"}
                    href="/chat">
                    Chat
                    {#if total_unread_chats}
                        &nbsp;<span class="total-unread-chats">{total_unread_chats}</span>
                    {/if}
                </a>
            </li>
        {/if}
    </ul>
    <span class="me">&copy;&nbsp;MICHAEL SANTIAGO</span>
    <span><ThemeButton /></span>
    
    <span class="current-user">
        {#if $current_user}
            {#if ($current_user?.role == 1)}
                <p>{`${$current_user?.first_name[0]}${$current_user?.last_name[0]}`}</p>&nbsp;
            {/if}
        {/if}
        <DropDownMenu />
    </span>
</nav>

<style lang="postcss">
    nav {
        padding: 10px 35px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        font-family: "Rajdhani", sans-serif;
        display: flex;
        gap: 15px;
        position: sticky;
        align-items: center;
        backdrop-filter: blur(6px);
        font-weight: 600;
        font-size: 1.3rem;
        top: 0;
        z-index: 1
    }

    nav ul {
        display: flex;
        gap: 1rem;
    }

    nav ul { flex: 1; }

    nav .me {
        display: flex;;
        white-space: nowrap;
        align-items: center;
        justify-content: center;
        margin: auto;
        /* padding: 2px; */
        
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

    nav .current-user {
        display: flex;
        align-items: center;
    }

    .nav-shadow-black {
        box-shadow: 0 3.4px 6.3px rgba(0, 0, 0, 0.09), 0 7px 10px rgba(0, 0, 0, 0.09);
    }
    .nav-shadow-white {
        box-shadow: 0 3.4px 6.3px rgba(255, 255, 255, 0.09), 0 7px 10px rgba(255, 255, 255, 0.09);
    }

    a {
        display: flex;
        white-space: nowrap;
    }
    .total-unread-chats {
        display: flex;
        font-family: 'Courier New', Courier, monospace;
        font-size: small;
        height: 20px;
        width: 20px;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        color: #222;
        background-color: yellowgreen;
    }

    @keyframes rolling_text_fill {
        from { background-position: 0%; }
        to { background-position: 400%; }
    }

    @media screen and (max-width: 650px) {
        nav .me { display: none; }
    }
</style>