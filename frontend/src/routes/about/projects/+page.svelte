<script lang="ts">
    import { onMount } from "svelte";
    import { about_selected_menu } from "$lib/stores/globalstore";

    onMount(() => { $about_selected_menu = "projects" });
</script>
<main>
    <div class="mb-5 background-details-wrapper">
        <h1 class="mb-5 text-3xl">Projects</h1>
        <h1 class="text-2xl">2019 - Present</h1>
        <h1 class="mx-5 text-large font-bold">
            💪 I'm the&nbsp;
            <a href="https://neontech.vercel.app" target="_blank" rel="noreferrer">NeonTech IT Solutions</a>.
            <p>Fullstack Web App Development.</p>
            <span class="stack">React</span>
            <span class="stack">Svelte/SvelteKit</span>
            <span class="stack">MongoDB</span>
            <span class="stack">TypeScript</span>
            <span class="stack">Tailwind</span>
            <span class="stack">Vercel</span>
        </h1>
    </div>

    <div class="mb-5 background-details-wrapper">
        <h1 class="text-2xl">2020</h1>
        <h1 class="mx-5 text-large font-bold">
            💪 I developed&nbsp;
            <a href="https://neontech.vercel.app" target="_blank" rel="noreferrer">Skeep (Secret Notes Keeper)</a>.
            <p>A windows desktop application. Simple note keeper, secured.</p>
            <span class="stack">C Win32 API</span>
            <span class="stack">Windows</span>
            <span class="stack">SQLite</span>
        </h1>
    </div>

    <div class="mb-5 background-details-wrapper">
        <h1 class="text-2xl">2016</h1>
        <h1 class="mx-5 text-large font-bold">
            💪 I developed&nbsp;
            <a href="https://neontech.vercel.app" target="_blank" rel="noreferrer">BizWize</a>.
            <p>A POS designed to run both in windows/linux desktop application. It evolved to&nbsp;
            <a href="https://npos.vercel.app" target="_blank" rel="noreferrer">POS22</a>.</p>
            <span class="stack">QT C++</span>
            <span class="stack">MySQL</span>
            <span class="stack">Linux</span>
            <span class="stack">Windows</span>
        </h1>
    </div>
</main>

<style lang="postcss">
    a {
        color: orange;
    }

    .stack {
        background-color: darkgrey;
        padding: 3px 10px;
        border-radius: 50px;
        font-size: small;
        font-weight: 300;
        color: black;
    }
</style>