<script lang="ts">
    export let source: string;
</script>

<main>
    <div class={source}>
        <div class="message">
            <slot name="message"/>
            <p class="chat-date">
                <slot name="chat-date"/>
            </p>
        </div>
    </div>
</main>

<style lang="postcss">
    .from .message, .to .message {
        color: black;
        padding: 7px 15px ;
        margin: 5px 0;
        max-width: 48%;
        width: fit-content;
        .chat-date { font-size: x-small; }
    }
    .from .message {
        border-top-left-radius: var(--message-border-radius);
        border-top-right-radius: var(--message-border-radius);
        border-bottom-left-radius: var(--message-border-radius);
        background-color: lightgray;
        justify-self: right;
        float: right;
        .chat-date { text-align: right; }
    }
    .to .message {
        border-top-left-radius: var(--message-border-radius);
        border-top-right-radius: var(--message-border-radius);
        border-bottom-right-radius: var(--message-border-radius);
        background-color: lightblue;
        justify-self: left;
        .chat-date { text-align: left; }
    }
</style>