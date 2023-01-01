<script lang="ts">
    import { admin, selected_menu} from '$lib/stores/globalstore';
    import { onMount } from 'svelte';
    onMount(() => $selected_menu = "chat");
</script>
<svelte:head>
    <title>Chat - Michael Santiago</title>
</svelte:head>

<slot/>