<script lang="ts">
    import Fa from 'svelte-fa';
    import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
    import { show_dropdown_menu, theme } from '$lib/stores/globalstore';

    let theme_icon = faSun;
    let animate = false;

    $: {
        theme_icon = ($theme === 'dark') ? faMoon : faSun;
    }

    const onChangeTheme = () => {
        /** Animate theme icon */
        animate = true;
        setTimeout(() => animate = false, 1000);
        $theme = ($theme === 'dark') ? 'light' : 'dark';
        theme_icon = ($theme === 'dark') ? faMoon : faSun;

        // this is no longer effective
        // document.body.classList.toggle('dark-theme');

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
</script>

<main>
    <button
        on:focus={() => $show_dropdown_menu = false}
        on:click={onChangeTheme} title="switch theme">
        <!-- <div class="icon-wrapper"> -->
            <span class:animate={animate} class="icon"><Fa icon={theme_icon}/></span>
            <!-- <span class:animate={animate} class="icon">&#9728</span> -->
        <!-- </div> -->
    </button>
</main>

<style lang="postcss">
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    button .icon {
        color: rgb(255, 255, 0);
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