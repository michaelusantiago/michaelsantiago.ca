<!-- This version is no longer dependent on GTToggleButton component -->
<script lang="ts">
    export let header_title: string
    export let open = false;
</script>

<main>
    <label class:header-br={!open} class="header">
        <input type="checkbox" bind:checked={open}/>
        {header_title}
        <span><div class="greater-arrow"></div></span>
    </label>
    <div class:hide-container={!open} class="container">
        <slot/>
    </div>
</main>

<style lang="postcss">
    :root {
        --container-height: 150px;
        --border-color: blue;
        --header-bg-color: lightseagreen;
        --header-bg-hover-color: green;
        --header-text-color: white;
        --icon-size: 10px;
        --icon-position: 30%;
        --icon-color: black;
    }
    /* Main */
    main {
        border: solid 1px var(--border-color);
        border-radius: 5px;
    }

    /* Header */
    .header input[type="checkbox"] { display: none; }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--header-bg-color);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        color: var(--header-text-color);
        padding: 15px;
        cursor: pointer;
    }
    .header:hover { --header-bg-color: var(--header-bg-hover-color); }
    .header-br {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        transition: border-radius linear 0.5s;
    }
    .header span {
        display: flex;
        justify-content: center;
        align-items: center;
        transform: rotate(0deg);
        transition: transform linear 0.2s;
    }
    .header input[type="checkbox"]:checked ~ span {
        transform: rotate(90deg);
        transition: transform linear 0.2s;
    }

    /* Greater Than Icon */
    .greater-arrow {
        position: relative;
        padding: 0 18px;
    }
    .greater-arrow:before,
    .greater-arrow:after {
        content: '';
        left: var(--icon-position);
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
    }
    .greater-arrow:after {
        border-left-color: var(--header-bg-color);
        border-width: var(--icon-size);
        margin-top: calc(var(--icon-size) * -1);
    }
    .greater-arrow:before {
        border-left-color: var(--icon-color);
        border-width: calc(var(--icon-size) + 5px);
        margin-top: calc((var(--icon-size) + 5px) * -1);
    }

    /* Container */
    .container {
        height: var(--container-height);
        overflow: hidden;
        transition: height linear 0.2s;
    }
    .hide-container {
        height: 0;
        transition: height linear 0.2s;
    }
</style>
