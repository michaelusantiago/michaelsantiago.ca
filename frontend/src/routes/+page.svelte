<script lang="ts">
    import NewsUpdates from "$lib/components/NewsUpdates.svelte";
    import Fa from "svelte-fa";
    import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons"
    import { admin, theme, selected_menu } from "$lib/stores/globalstore";
    import { exactAge } from "$lib/utilities";
    import type { Age } from "$lib/utilities";
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";

    const my_bd = new Date("April 22, 1982 16:30:00 GMT+8:00").toLocaleString("en-us", { dateStyle: "medium", timeStyle: "long" });
    const myAge: Age =  exactAge(my_bd);

    onMount(() => { $selected_menu = "dashboard"; })

    import type { PageData } from './$types';
    import { faCircle } from "@fortawesome/free-solid-svg-icons";

    // careful not to destruct values from data, it will fail and will confuse you
    export let data: PageData;

</script>

<main>
    <div class="me-container">
        <div>
            <img src="./me.jpg" alt="Michael Santiago" width="300px"/>
        </div>
        <div class="me-details-container">
            <h1 style:color={($theme === "light") ? "brown" : "orange"}>Michael Santiago</h1>
            <h3>Software Developer</h3>
            <div class="text-sm">
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

                {#if ($admin?.is_online)}
                    <div class="flex items-center gap-2 font-extrabold text-lg">
                        <Fa icon={faCircle} color="green" size="1x"/>
                        <span class="text-green-500">Online</span>
                    </div>
                {:else}
                    <div class="flex items-center gap-2 font-extrabold text-lg">
                        <Fa icon={faCircle} color="gray" size="1x"/>
                        <span class="text-gray-500">Offline</span>
                    </div>
                {/if}
            </div>
            <div class="links flex gap-5 my-5">
                <a href="https://github.com/michaelusantiago" target="_blank" rel="noreferrer">
                    <Fa icon={faGithub} size="2x"/>
                </a>
                <a href="https://twitter.com/mus_e" target="_blank" rel="noreferrer">
                    <Fa icon={faTwitter} size="2x"/>
                </a>
                <a href="https://www.linkedin.com/in/michaelusantiago" target="_blank" rel="noreferrer">
                    <Fa icon={faLinkedin} size="2x"/>
                </a>
            </div>
        </div>
    </div>

    <h2 class="text-3xl font-bold mb-2">What's Up?</h2>

    <!--  Posting will only be available when it's an admin user -->
    {#if (data.user?.role === 0)}
        <form method="POST" action="/#whatsup" use:enhance>
            <textarea name="content"/>
            <button formaction="?/post">Post</button>
        </form>
    {/if}

    <div id="whatsup">
        <NewsUpdates posts={data?.posts} />
    </div>
</main>

<svelte:head><title>Home - Michael Santiago</title></svelte:head>

<style lang="postcss">
    main {
        display: flex;
        flex-direction: column;
    }

    form {
        textarea {
            padding: 15px 20px;
            border-radius: 5px;
            border: solid 1px black;
            width: 100%;
        }
        button {
            float: right;
            padding: 10px 30px;
            background-color: darkgreen;
            border-radius: 5px;
            color: white;
        }
        padding: 10px;
        margin-bottom: 3em;
    }

    h1 {
        font-size: 2.75rem;
        font-weight: 700;
    }

    h3 {
        font-size: 1.5rem;
        font-weight: 700;
    }

    .me-container {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto;
        gap: 5rem;
        /* margin-top: 3rem; */
        margin-bottom: 4em;
    }

    .me-details-container {
        align-items: center;
        margin: auto;
        margin-left: 0;
    }

    img { border-radius: 100%; }
    
    a:not(.links a) {
        color: cadetblue;
    }

    .links a { transition: transform ease-in-out 0.2s; }
    .links a:hover { transform: scale(1.2); }
    /* input::placeholder { color: green; } */
</style>