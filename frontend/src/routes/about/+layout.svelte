<script lang="ts">
    import { selected_menu, about_selected_menu } from '$lib/stores/globalstore';
    import { onMount } from 'svelte';
    onMount(() => { $selected_menu = "background"; })
</script>

<svelte:head>
    <title>About - Michael Santiago</title>
</svelte:head>

<main>
    <!-- <div class="nav"> -->
    <nav>
        <ul>
            <li>
                <a
                    class:active = {$about_selected_menu === "projects"}
                    on:click={() => $about_selected_menu = "projects"}
                    href="/about/projects/">
                    Projects
                </a>
            </li>
            <li>
                <a
                    class:active = {$about_selected_menu === "workexperience"}
                    on:click={() => $about_selected_menu = "workexperience"}
                    href="/about/workexperience/">
                    Work Experience 
                </a>
            </li>
            <li>
                <a
                    class:active = {$about_selected_menu === "education"}
                    on:click={() => $about_selected_menu = "education"}
                    href="/about/education/">
                    Education 
                </a>
            </li>
            <li>
                <a
                    class:active = {$about_selected_menu === "biography"}
                    on:click={() => $about_selected_menu = "biography"}
                    href="/about/biography/">
                    Biography 
                </a>
            </li>
        </ul>
    </nav>
    <div class="content">
        <slot/>
    </div>
</main>

<style lang="postcss">
    main { display: flex; }

    nav {
        border-right: solid 1px gold;
        margin-right: 1rem;
        flex: 0.75;
    }
    nav a {
        font-family: "Rajdhani", sans-serif;
        font-size: 1.15rem;
    }
    nav a:hover, nav a.active {
        color: block;
        font-weight: bold;
    }

    .content { flex: 3; }

    @media screen and (max-width: 650px) {
        main {
            display: grid;
            grid-template-rows: auto 1fr;
            /* margin: 0; */
            padding: 0 2rem;
        }
        nav { margin-bottom: 1rem; }
        nav ul {
            display: flex;
            gap: 1rem;
        }
    }
</style>