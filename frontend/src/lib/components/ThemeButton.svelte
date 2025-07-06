<script lang="ts">
    import { theme } from "@lib/store";
    import { onMount } from "svelte";
    
    let animate = false;

    function setTheme() {
        if ($theme === 'dark') {
            if (document.body.classList.contains('light-theme'))
                document.body.classList.remove(`light-theme`);
            document.body.classList.add(`dark-theme`);
        } else {
            if (document.body.classList.contains('dark-theme'))
                document.body.classList.remove(`dark-theme`);
            document.body.classList.add('light-theme');
        }
    }

    onMount(() => { setTheme() })

    const onChangeTheme = () => {
        /** Animate theme icon */
        animate = true;
        setTimeout(() => animate = false, 1000);
        $theme = ($theme === 'dark') ? 'light' : 'dark';
        setTheme()
    }
</script>

<main>
    <button
        on:click={onChangeTheme} title="switch theme">
        <span class:animate={animate} class="icon">
            {#if $theme === 'dark'}
                <i class="ri-moon-clear-fill"/>
            {:else}
                <i class="ri-sun-fill black"/>
            {/if}
        </span>
    </button>
</main>

<style lang="postcss">
    main:active button {
        outline: none;
    }

    main:focus-within {
        button {
            outline: solid 1px inherit;
        }
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        padding: 0;
        border-radius: 100%;
        background-color: transparent;
    }

    .black {
        color: black;
    }

    button .icon {
        color: rgb(255, 255, 255);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        width: 32px;
        border-radius: 100%;
        font-size: 1.25rem;
        transition: background-color 0.5s ease-in-out; 
    }
    button .icon:hover {
        background-color: rgba(169, 169, 169, 0.411);
    }

    .animate {
        animation-name: swing;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: initial;
    }
    @keyframes swing {
        0% { transform: rotate(0deg); }
        20% { transform: rotate(45deg); }
        40% { transform: rotate(0deg); }
        60% { transform: rotate(-45deg); }
        100% { transform: rotate(0deg); }
    }
</style>