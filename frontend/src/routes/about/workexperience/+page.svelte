<script lang="ts">
    import { onMount } from "svelte";
    import { about_selected_menu } from "$lib/stores/globalstore";

    onMount(() => { $about_selected_menu = "workexperience" });
</script>
<main>
    <h1 class="mb-5 head-title text-3xl">Work Experience</h1>
    <div class="work-experience-container mb-3">
        <h1>
            Systems Technical Support
            <span>June 07, 2022 - Present</span>
        </h1>
        <h2>
            <a href="http://fadoms.com.ph" target="_blank" rel="noreferrer">FADOMS</a>
            <span>
                Web Software Application Services
            </span>
        </h2>
        <div class="details">
            <ul>
                <li>First level technical support and service on call on all clients.</li>
                <li>Monthly maintenance of all workstations as needed.</li>
                <li>Linux Server regular maintenance and stability checking such as server's errors logs and databases logs (MySQL) as needed.</li>
            </ul>
        </div>
    </div>

    <div class="work-experience-container mb-3">
        <h1>
            Computer Programmer I
            <span>May 17, 2010 - June 30, 2011</span>
        </h1>
        <h2>
            <a href="https://palawan.gov.ph" target="_blank" rel="noreferrer">Palawan Provincial Health Office</a>
            <span>
                @ Information & Communication Technology Unit/Administrative Division,
                Puerto Princesa City, Palawan, Philippines
            </span>
        </h2>
        <div class="details">
            <ul>
                <li>Maintain and troubleshoot ICT hardware and software.</li>
                <li>Assist in the formulation of Unit plans and implements, monitors and evaluates Units plans.</li>
                <li>Assist in the development and implementation of various computerized system.</li>
                <li>Implements, monitors & troubleshoots various computerized system developed by the DOH & other special projects.</li>
                <li>Facilitates computer literacy trainings to health personnel.</li>
                <li>Develops training modules.</li>
                <li>Conducts other ICT related activities.</li>
                <li>Assist in graphics layouts and development.</li>
                <li>Network with other agencies.</li>
            </ul>
        </div>
    </div>

    <div class="work-experience-container">
        <h1>
            Computer Programmer I
            <span>June 01, 2009 - December 31, 2009</span>
        </h1>
        <h2>
            <a href="https://onp.doh.gov.ph" target="_blank" rel="noreferrer">Ospital Ng Palawan (DOH)</a>
            <span>
                @ Information & Communication Technology Unit/Administrative Division,
                Puerto Princesa City, Palawan, Philippines
            </span>
        </h2>
        <div class="details">
            <ul>
                <li>Assist in the implementation of various Information Systems in the Hospital such as the Hospital Operations and Management System (HOMIS) and other system that will be implemented by the DOH such as Personal Information System (PIS), Payroll System, etc..</li>
                <li>Troubleshoots and conducts regular monthly monitoring and maintenance of computer (hardware and software), network and telecommunications system installed.</li>
                <li>Designs and develops computerized system when needed.</li>
                <li>Provide technical assistance to Ospital Ng Palawan personnel on matters regarding Information and Communication Technology.</li>
                <li>Perform other task as maybe assigned by the immediate supervisor/higher supervisor.</li>
                <li>Submission of monthly accomplishment report.</li>
            </ul>
        </div>
    </div>
</main>

<style lang="postcss">
    h1:not(.head-title) {
        font-size: large;
        font-weight: bold;
        span {
            font-size: small;
            font-weight: normal;
        }
    }

    h2 {
        font-weight: 400;
        span { font-weight: 200; }
    }

    ul {
        list-style-type: square;
        margin-left: 2rem;
        font-size: medium;
    }
    a {
        color: darkorange;
        text-decoration: underline;
    }
</style>