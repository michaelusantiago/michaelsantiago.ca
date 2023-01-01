<script lang='ts'>
    import Fa from 'svelte-fa'
    import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
    import { fly, fade } from 'svelte/transition'
    export let success: boolean;
</script>

<style lang="postcss">
    .main {
        display: block;
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
</style>

<div class="main" in:fly="{{ y: -50, duration: 500 }}" out:fade="{{ delay: 250, duration: 300 }}">
    <div class="flex items-center">
        <div class="flex-grow p-2"><slot name="message">No message</slot></div>
        {#if success}
            <Fa icon={faCheckCircle} color="green"/>
        {:else}
            <Fa icon={faTimesCircle} color="red"/>
        {/if}
    </div>
</div>