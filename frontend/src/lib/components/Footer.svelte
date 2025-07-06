<script lang="ts">

</script>

<footer>
    <span>Michael Santiago &copy; 2022 - {new Date().getFullYear()}</span>
    <ul>
        <span>Powered by</span>
        &nbsp;
        <li><a href="https://kit.svelte.dev" target="_blank">SvelteKit</a></li>
        &nbsp;+&nbsp;
        <li><a href="https://pocketbase.io" target="_blank">PocketBase</a></li>
        &nbsp;+&nbsp;
        <li><a href="https://pockethost.io" target="_blank">PocketHost</a></li>
    </ul>
</footer>

<style lang="postcss">
    footer {
        display: flex;
        font-size: 0.9rem;
        span{
            flex: 1;
            white-space: nowrap;
        }
        ul {
            display: flex;
            align-self: flex-end;
        }
        padding: 0.5rem;
        margin-bottom: 1rem;
        border-top: dotted 1px slategray;
    }

    @media (max-width: 600px) {
        footer {
            flex-direction: column;
            ul {
                align-self: flex-start;
            }
        }
    }
</style>