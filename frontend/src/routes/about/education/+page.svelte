<script lang="ts">
    import { onMount } from "svelte";
    import { about_selected_menu } from "$lib/stores/globalstore";

    onMount(() => { $about_selected_menu = "education" });
</script>

<main>
    <h1 class="mb-5 text-3xl">Education</h1>
    <div class="education-container">
        <h1>2001-2005</h1>
        <h2>Bachelor of Science in Computer Science</h2>
        <h3><a href="https://www.psu.palawan.edu.ph/" target="_blank" rel="noreferrer">Palawan State University</a></h3>
    </div>
    <div class="education-container">
        <h1>1999-2000</h1>
        <h2>Certificate in Information Systems</h2>
        <h3><a href="https://sti.edu" target="_blank" rel="noreferrer">Systems Technology Institute </a></h3>
    </div>
    <div class="education-container">
        <h1>1995-1999</h1>
        <h3><a href="https://pns.edu.ph" target="_blank" rel="noreferrer">Palawan National High School</a></h3>
        <h3>Secondary</h3>
    </div>
    <div class="education-container">
        <h1>1989-1995</h1>
        <h3>East Elementary School</h3>
        <h3>Primary</h3>
    </div>
</main>

<style lang="postcss">
    .education-container:not(:last-child) {
        margin-bottom: 2rem;
    }
    .education-container h2 {
        font-size: larger;
        font-weight: bold;
    }
    .education-container h1 {
        font-weight: bold;
    }

    a {
        color: darkorange;
        text-decoration: underline;
    }
</style>