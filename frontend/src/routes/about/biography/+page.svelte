<script lang="ts">
    import { onMount } from "svelte";
    import { admin, user, about_selected_menu } from "$lib/stores/globalstore";
    const date_created = "Nov. 07, 2022 12:33 PM GMT+08:00"
    const date_modified = "Dec. 26, 2022 10:06 PM GMT+08:00"

    onMount(() => { $about_selected_menu = "biography" });
</script>
<main>
    {#if $user}
        <h1 class="text-3xl">Biography</h1>
        <p>
            My name is <b>Michael Ursante Santiago</b>. I was born on April 22, 1982 in the Philippines. I'm a Filipino.
            I speak Tagalog and English language.
        </p>
        <p>
            I graduated with a bachelor degree in Computer Science on 2005 from Palawan State University.
            Prior to that I studied Computer Programming in Systems Technology Institute for about a year
            and 3 months and recieved a Certicate (see my <a href="/about/education">education</a>).
        </p>
        <p>
            I built, manage and still developing
            <a href="https://neontech.vercel.app" target="_blank" rel="noreferrer">NeonTech I.T. Solutions</a>.
        </p>
        <p>
            Aside being a fullstack web app developer, I am also a fulltime dad.
            I have a son, his name is Neon and the inspiration behind <b>NeonTech</b>.
        </p>
        <p>
            I got employed immediately after finishing college in 2005 and I didn't even attended graduation.
            I experience working in private company and in the goverment as well.
            My last work experience was in 2011 when I was a <b>Computer Programmer I</b> in Palawan
            Provincial Health Office I.T. department. We are responsible in any I.T. matters including
            telecommunication sytems and is not limited to maintaining and developing new system for the office.
            I even became a Head I.T. in that department at some point.
        </p>
        <p>
            I decided to leaved employment in 2011 of June when I meet network marketing business hypes.
        </p>
        <p>
            In 2012, me and my son's mother pursued a cellphone and accessories store business. We sell, class C's
            to class A's cellphones and cellphones accessories for about a year or two which was located at one
            of known establishment/mall at the heart of Puerto Princesa City.
            There I began developing BizWize POS (see my <a href="/about/projects">projects</a>).
            The system was successful and I was able to officially deploy it in early of 2016. I'm doing part time on this
            project. Learning time and applying what I've learn all inclusive.
            The application didn't last long though.
        </p>
        <p>
            I chose not to get a job since 2011 and that is by my personal choice, for the reason that I wanted to
            build my own company/business instead. Lately I accepted a part time job
            (see my <a href="/about/workexperience">work experience</a>).
        </p>
        <p>
            Though I have experience developing and deploying my first website project in 2010 using PHP and MySQL,
            it was only in 2018 when I finally decided to continue and pursue web app development. It was the time when
            I have a friend who has a car and motorbike rental business asked me to create a website for his business.
            My first attempt was successful and I used Wordpress to develop that. It no longer exist in the web though.
            It can accept booking, with embeded chat plugin on it and can received payment online using PayPal gateway.
        </p>
        <p>
            The same friend after his first website expires in 2019, asked me to re-create again the same website, but
            I did a total rebuild using NextJS this time. I actually finished it but my friend didn't pay my hardwork
            and it wasn't deployed, then pandemic happened too. It seems time was wasted on my part but not really.
            This time, I started to developed POS22. My first attempt is vanilla Javascript. I can't believe it, I 
            learned and dived into NextJS without full grasp of React yet. I later converted POS22 into React and the
            API backend using Express. It was React + Express + MongoDB.  They call it <b>MERN</b> really if we include
            Node. Of course there is Node.
        </p>
        <p>
            I didn't attempt to work fulltime on this project though, because I am doing and targetting to finish
            another project I called Skeep. I used Skeep personally as my note keeper so I'm having two projects that
            time. Halfway through POS22 development, I pause and continue on Skeep. These are all my personal project
            by the way. After I finished Skeep, I continue developing POS22 until now.
        </p>
        <p>
            It was like late of 2021 when I started to get interested in Svelte. I'm loving using it since then.
            My succeeding web projects were all written in Svelte/SvelteKit after that and up to this point. I even
            converted the POS22 API backend written in Express into SvelteKit instead. So the POS22 website is also
            the backend API endpoint. These are all now deployed temporarily in Vercel. All in all POS22 is 3 different
            modules. 
        </p>
        <ol class="ml-5">
            <li>1. <a href="https://npos.vercel.app" target="_blank" rel="noreferrer">Official Website (API endpoint)</a></li>
            <li>2. <a href="https://npos-app.vercel.app" target="_blank" rel="noreferrer">POS22 WebApp (Core App)</a></li>
            <li>3. <a href="https://npos-manager.vercel.app" target="_blank" rel="noreferrer">The POS22 Manager - (Administrator POS22 Client's Controller/Manager)</a></li>
        </ol>
        <p>
            At this moment. POS22 is still on development and not yet officially deployed but my plan is to release it in 2023.
        </p>
        <!-- <p>
            Lately I realized I wanted to go abroad. This is then another goal for me.
        </p> -->
        <div class="text-right mt-10">
            <div class="text-sm">Mike S.</div>
            <div class="text-xs font-light"><b>Last modified:</b> {new Date(date_modified).toLocaleString("en-us", { dateStyle: "full", timeStyle: "long"})}</div>
        </div>
    {:else}
        <p>Limited to friends... Please sign-up and log-in to see this page.</p>
    {/if}
</main>

<style lang="postcss">
    /* p:not(:first-child) { margin: 1rem 0; } */
    p { margin: 1rem 0; }
    p:last-child { margin: 0; }
    p { text-indent: 2rem; }
    a { color: orange; }
</style>