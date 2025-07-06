<script lang='ts'>
    import { fly, fade } from 'svelte/transition'
    export let success: boolean;
</script>

<main>
    <div class="main" in:fly="{{ y: -50, duration: 500 }}" out:fade="{{ delay: 250, duration: 300 }}">
        <div class="body-wrapper">
            <div class="message"><slot name="message">No message</slot></div>
            {#if success}
                <i class="green ri-checkbox-circle-fill"></i>
            {:else}
                <i class="red ri-close-circle-fill"></i>
            {/if}
        </div>
    </div>
</main>

<style lang="postcss">
    main {
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 12;
    }
    .main {
        display: flex;
        position: absolute;
        background-color: whitesmoke;
        color: #222;
        padding: 10px 20px;
        max-width: 25em;
        min-width: 10em;
        right: 5px;
        top: 50px;
        border-radius: 10px;
        box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12);
        z-index: 12;
    } 
    .main .body-wrapper {
        display: flex;
        gap: 10px;
        .message {
            flex: 2;
            margin: auto 0;
        }
        i { font-size: x-large; }
    }
    .green { color: var(--green-6); }
    .red { color: var(--red-6); }
</style>