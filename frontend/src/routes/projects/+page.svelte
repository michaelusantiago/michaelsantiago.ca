<script lang="ts">
    import { selected_menu } from "@lib/store";

    selected_menu.set('projects')
</script>

<svelte:head>
    <title>Projects - Michael Santiago</title>
</svelte:head>

<main>
    <h1 class="head-title">Projects</h1>
    <div class="project">
        <h2 class="project-title">2022 - POS22 Client Manager</h2>
        <a
            title="POS22 Client Manager"
            href="https://npos-manager.vercel.app"
            target="_blank"
            rel="noreferrer">
            <img src="/pos22 manager.png" width="500px" alt="pos22 website"/>
        </a>
        <div class="description">
            <div>
                <span class="stack">TypeScript</span>
                +
                <span class="stack">SvelteKit</span>
                +
                <span class="stack">MongoDB</span>
            </div>
        </div>
    </div>

    <div class="project">
        <h2 class="project-title">2021 - POS22 Official Website</h2>
        <a
            title="POS22 Official Website"
            href="https://npos.vercel.app"
            target="_blank"
            rel="noreferrer">
            <img src="/pos22 website.png" width="500px" alt="pos22 website"/>
        </a>
        <div class="description">
            <div>
                <span class="stack">TypeScript</span>
                +
                <span class="stack">SvelteKit</span>
                +
                <span class="stack">MongoDB</span>
            </div>
        </div>
    </div>

    <div class="project">
        <h2 class='project-title'>2019 - POS22 App</h2>
        <div class="extra-info">
            <h3>Sample/Test Account</h3>
            <p>Account ID: 62B4A16A15FB0510FF5EDF57</p>
            <p>Username: TrialMan</p>
            <p>Password: trialman</p>
        </div>
        <a
            title="POS22 App"
            href="https://npos-app.vercel.app"
            target="_blank"
            rel="noreferrer">
            <img src="/pos22 app.png" width="500px" alt="pos22 app"/>
        </a>
        <div class="description">
            <div>
                <span class="stack">ReactJS</span>
                +
                <span class="stack">MongoDB</span>
            </div>
        </div>
    </div>

    <div class="project">
        <h2 class='project-title'>PLAYGROUND</h2>
        <div class="extra-info">
            <p>Demonstrated the use of baserow third party Database/RESt API provider.</p>
            <p>It's a CRUD type of application, which also showcase the use of regex to validate certain required fields.</p>
            <p>The first one I developed was the one in Svelte, then the Vuejs version. That's why the Vuejs version is a little bit more improved in my observation.</p>
            <p>*App is not mobile screen ready or responsive.</p>
        </div>
        <ul>
            <li>
                <a
                    class="just-link"
                    title="Svelte + Baserow"
                    href="https://everneat.vercel.app"
                    target="_blank"
                    rel="noreferrer">
                    On Svelte (Everneat)
                </a>
            </li>
            <li>
                <a
                    class="just-link"
                    title="Vuejs + Baserow"
                    href="https://kumpanya.vercel.app"
                    target="_blank"
                    rel="noreferrer">
                    On Vuejs (Kumpanya)
                </a>
            </li>
        </ul>
    </div>
</main>

<style lang="postcss">
    main { padding: 1rem; }

    .head-title {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .project {
        padding: 1rem 0;
        a {
            font-weight: bold;
            font-size: x-large;
            &:hover { color: var(--green-3); }
        }
    }

    .project .extra-info {
        h3 {
            font-weight: bold;
            font-size: 0.9rem;
        }
        display: flex;
        flex-direction: column;
        gap: 5px;
        color: black;
        padding: 8px;
        background-color: whitesmoke;
        width: 55%;
        font-size: 0.8rem;
        font-weight: 300;
    }

    .project img {
        margin-block: 0.5rem;
        border: 2px solid darkgray;
    }

    .description {
        display: flex;
        flex-direction: column;
        gap: 5px;
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