<script lang="ts">
    import { selected_menu, theme, admin, posts, current_user } from "@lib/store"
    import Posts from "@lib/components/Posts.svelte"
    import { type Age, exactAge } from "$lib/utilities"
    import { enhance } from "$app/forms";
    import * as db from '$lib/Database'
    import { onMount } from "svelte";

    selected_menu.set('dashboard')

    let textAreaContent: string = ''
    let loading = false
    let is_posting = false
    let textArea: HTMLTextAreaElement

    const my_bd = new Date("April 22, 1982 16:30:00 GMT+8:00").toLocaleString("en-us", { dateStyle: "medium", timeStyle: "long" })
    const myAge: Age =  exactAge(my_bd)

    const onDeletePost = async (e: CustomEvent) => {
        const post_id = e.detail
        await db.deletePost(post_id)
    }

    onMount(async () => {
        loading = true
        $posts = await db.getPost();
        loading = false
    })
</script>

<svelte:head>
    <title>Dashboard - Michael Santiago</title>
</svelte:head>

<main>
    <div class="me-container">
        <div class="me-img">
            <img src="./me.jpg" alt="Michael Santiago" width="300px"/>
        </div>
        <div class="me-details-container">
            <h1 style:color={($theme === "light") ? "brown" : "orange"}>Michael Santiago</h1>
            <h3>Software Developer</h3>
            <div class="info-wrapper">
                <h4>
                    👨‍💼
                    {#if myAge.year > 1}
                    <span>{myAge.year} years</span>
                    {:else}
                        <span>{myAge.year} year</span>
                    {/if}
                    {#if myAge.months_over > 1}
                        <span>{myAge.months_over} months</span>
                    {:else}
                        <span>{myAge.months_over} month</span>
                    {/if}
                    {#if myAge.weeks_over > 1} 
                        <span>{myAge.weeks_over} weeks</span>
                    {:else}
                        <span>{myAge.weeks_over} week</span>
                    {/if}
                    and
                    {#if myAge.days_over > 1}
                        <span>{myAge.days_over} days</span>
                    {:else}
                        <span>{myAge.days_over} day</span>
                    {/if}
                    of life existence.
                </h4>
                <h4>🏝️ Puerto Princesa City, Palawan, Philippines</h4>

                <span>📧 <a href="mailto:contact@michaelsantiago.au">contact@michaelsantiago.au</a> (don't do it now)</span>

                <span
                    class="my-status"
                    class:online={$admin?.is_online}>
                    { $admin.is_online ? "On-line" : "Off-line" }
                </span>
            </div>
            <div class="links">
                <a href="https://github.com/michaelusantiago" target="_blank" rel="noreferrer">
                    <i class="ri-github-fill"/>
                </a>
                <a href="https://twitter.com/mus_e" target="_blank" rel="noreferrer">
                    <i class="ri-twitter-fill"/>
                </a>
                <a href="https://www.linkedin.com/in/michaelusantiago" target="_blank" rel="noreferrer">
                    <i class="ri-linkedin-box-fill"/>
                </a>
            </div>
        </div>
    </div>

    <h2 class="post-title">What's Up?</h2>

    <!--  Posting will only be available when it's an admin user -->
    {#if ($current_user?.role === 0)}
        <form
            method="POST"
            use:enhance={() => {
                is_posting = true
                return async ({result}) => {
                    is_posting = false
                    textArea.value = ''
                    textArea.focus()
                }
            }}>
            <textarea
                bind:this={textArea}
                bind:value={textAreaContent}
                name="content"
            />
            <button
                disabled={!textAreaContent || is_posting}
                formaction="/?/post">
                {is_posting ? "Posting..." : "Post"}
            </button>
        </form>
    {/if}

    <div class="post">
        {#if loading}
            <div class="loading-indicator">Loading latest post...</div>
        {:else}
            <Posts on:delete={onDeletePost} posts={$posts} />
        {/if}
    </div>

</main>

<style lang="postcss">
   main {
        display: flex;
        flex-direction: column;
        padding: 2rem 1rem;
    }

    /* Animating link begin*/
    a {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        position: relative;
        color: black;
        text-decoration: none
    }
    a:after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background: blue;
        transform: rotateY(90deg);
        transform-origin: 0 0;
        transform-origin: right top;
        transition: height 200ms, transform 200ms;
    }
    a:hover:after {
        transform: rotateX(0deg);
        transform-origin: left top;
    }
    /** Animating link end*/

    form {
        textarea {
            padding: 15px 20px;
            border-radius: 5px;
            border: solid 1px black;
            box-sizing: border-box;
            width: 100%;
            min-height: 80px;
            resize: vertical;
            font-family: inherit;
            font-size: inherit;
        }
        button {
            float: right;
            padding: 10px 30px;
            background-color: darkgreen;
            border-radius: 5px;
            color: white;
            &:disabled {
                opacity: 0.5;
                color: lightgray;
                cursor: auto;
            }
        }
        padding: 10px;
        margin-bottom: 3em;
    }
   
    .post .loading-indicator {
        display: flex;
        width: 100%;
        place-content: center;
    }
    .post-title {
        font-size: 1.75rem;
        font-weight: bold;
    }

    h1 {
        font-size: 2.75rem;
        font-weight: 700;
        white-space: nowrap;
    }

    h3 {
        font-size: 1.5rem;
        font-weight: 700;
    }

    .me-container {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto;
        margin-bottom: 4em;
    }

    .me-details-container {
        width: 100%;
        align-items: center;
        margin: auto;
        padding: 1rem;
    }

    .me-img {
        padding: 1rem;
        img {
            border-radius: 100%;
            align-self: center;
        }
    }
    
    a:not(.links a) {
        color: cadetblue;
    }

    .links {
        display: flex;
        gap: 10px;
        padding-block: 10px;
        a {
            transition: transform ease-in-out 0.2s;
            font-size: 2rem;
        }
        a:hover { 
            transform: scale(1.2);
        }
    }

    .info-wrapper {
        display: flex;
        flex-direction: column;
        .my-status {
            font-weight: bold;
            color: gray;
        }
        .my-status.online {
            color: var(--green-5);
        }
    }

    @media screen and (max-width: 650px) {
        main { padding: 1rem; }
        .me-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            align-self: center;
        }
        h2 { padding-inline: 10px; }
    }
</style>