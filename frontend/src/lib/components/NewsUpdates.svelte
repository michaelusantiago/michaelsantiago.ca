<script lang="ts">
    type Post = {
        content: string,
        created: string
    };
    export let posts: Post[];
</script>

<main>
    {#each posts as post}
        <div class="news-updates-container">
            <div class="content">{@html post.content}</div>
            <div class="date text-sm text-right">{new Date(post.created).toLocaleString('en-us', { timeZone: "Asia/Manila", dateStyle: "medium", timeStyle: "long" })}</div>
        </div>
    {/each}
</main>

<style lang="postcss">
    /* main .news-updates-container:not(:last-child) { margin-bottom: 3em; } */
    main .news-updates-container {
        margin: 1rem 1em 0em 1em;
        background-color: rgba(22, 22, 22, 0.8);
        border-radius: 10px;
        padding: 2rem;
        color: white;
    }
    main .news-updates-container .date { font-weight: 300; }
    .content {
        text-indent: 3ex;
        font-size: large;
        margin-bottom: 1em;
    }

    @media screen and (max-width: 450px) {
        .content { font-size: medium; }
    }
</style>