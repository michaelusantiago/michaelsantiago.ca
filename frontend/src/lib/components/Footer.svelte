<script lang="ts">
    import { theme } from "$lib/stores/globalstore"
</script>
<main>
    <hr />
    <div class="wrapper">
        <span class:bolder-font={$theme==="light"} class="signature">Michael Santiago &copy; 2022 &nbsp;</span>
        <span class="built-in">
            built in&nbsp;
            <a style:color={($theme === "light") ? "#222" : "gold"} href="https://kit.svelte.dev" target="_blank" rel="noreferrer">SvelteKit</a>
            &nbsp;+&nbsp;
            <a style:color={($theme === "light") ? "#222" : "gold"} href="https://tailwindcss.com" target="_blank" rel="noreferrer">TailwindCSS</a>
            &nbsp;+&nbsp;
            <a style:color={($theme === "light") ? "#222" : "gold"} href="https://pocketbase.io" target="_blank" rel="noreferrer">PocketBase</a>
        </span>
    </div>
</main>

<style lang="postcss">
    hr {
        border-style: dotted;
        margin-top: 2em;
    }
    .wrapper {
        display: flex;
        font-weight: 300;
        padding: 1em;
        font-size: 0.9em;
        white-space: nowrap;
    }
    .wrapper .signature { flex: 1; } 
    .wrapper .built-in { text-align: right; } 
    .bolder-font { font-weight: 300; }

    @media screen and (max-width: 650px) {
    }
</style>