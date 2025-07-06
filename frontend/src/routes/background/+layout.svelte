<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { selected_background_menu, selected_menu } from "@lib/store";

    if (browser) {
        if ($selected_background_menu)
            goto(`/background/${$selected_background_menu}`)
        else
            goto(`/background/workexperience`)
    }
    selected_menu.set('background')
</script>

<main>
    <nav>
        <ul>
            <li>
                <a
                    class:active={$selected_background_menu === 'workexperience'}
                    href="/background/workexperience">
                    Work Experiences
                </a>
            </li>
            <li>
                <a
                    class:active={$selected_background_menu === 'education'}
                    href="/background/education">
                    Education
                </a>
            </li>
            <li>
                <a
                    class:active={$selected_background_menu === 'biography'}
                    href="/background/biography">
                    Biography
                </a>
            </li>
        </ul>
    </nav>
    <section>
        <slot/>
    </section>
</main>

<style lang="postcss">
    main {
        display: flex;
        padding-block: 1rem;
    }

    main nav {
        display: flex;
        padding: 0 1rem;
        white-space: nowrap;
    }

    main nav ul li {
        padding-block: 5px;
    }

    section {
        padding: 0 2rem;
        border-left: solid 1px slategrey;
    }

    @media screen and (max-width: 650px) {
        main {
            display: grid;
            grid-template-rows: auto 1fr;
            margin: 0 2rem;
            padding-block: 0;

        }
        main nav { padding: 1rem 0; }
        main nav ul {
            display: flex;
            gap: 1rem;
        }
        main section {
            border: none;
            padding: 0;
        }
    }
</style>
