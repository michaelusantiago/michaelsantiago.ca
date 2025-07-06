<script lang="ts">
    import { enhance } from "$app/forms";
    import { current_user } from "@lib/store";
    type Post = {
        id: string,
        content: string,
        created: string
    }

    let is_deleting: (null | string) = null
    export let posts: Post[]
</script>

<main>
    {#each posts as post (post.id)}
        <div class="news-updates-container">
            <form
                method="POST"
                use:enhance={() => {
                    is_deleting = post.id 
                    // return async ({ result }) => is_deleting = null 
                }}>
                {#if ($current_user?.role == 0)}
                    <button
                        class="delete-post-btn"
                        id={post.id}
                        formaction="/?/delete_post">
                        <i class="ri-close-line" />
                    </button>
                {/if}
                <input hidden name="post_id" value={post.id}/>
            </form>
            <div class="content">{@html post.content}</div>
            <div class="date text-sm text-right">{new Date(post.created).toLocaleString('en-us', { timeZone: "Asia/Manila", dateStyle: "medium", timeStyle: "long" })}</div>
            {#if (is_deleting == post.id)}
                <div class="delete-notification">deleting post...</div>
            {/if}
        </div>
    {/each}
</main>

<style lang="postcss">
    main .news-updates-container {
        position: relative;
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
    .date {
        font-size: small;
        text-align: right;
    }

    .delete-notification {
        display: flex;
        position: absolute;
        background-color: rgba(55, 55, 55, 0.9);
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
    }

    .delete-post-btn {
        position: absolute;
        left: 0;
        top: 0;
        color: black;
        border-radius: 100%;
        height: 25px;
        width: 25px;
        transition: background-color 0.5s ease-in-out;
    }
    .delete-post-btn:hover {
        background-color: var(--red-7);
    }

    @media screen and (max-width: 450px) {
        .content { font-size: medium; }
    }
</style>